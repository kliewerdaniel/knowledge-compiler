import type {
  PassDescriptor,
  PassResult,
  CompilerPass,
  PassContext,
} from "@knowledge-compiler/plugins";

export class Scheduler {
  constructor(private maxConcurrency: number) {}

  async schedule(
    passDescriptors: PassDescriptor[],
    ctx: PassContext,
    passInstances: Map<string, CompilerPass>,
  ): Promise<Map<string, PassResult>> {
    const sorted = this.topoSort(passDescriptors);
    const results = new Map<string, PassResult>();
    const executed = new Set<string>();

    for (const pass of sorted) {
      if (executed.has(pass.id)) continue;

      const depsMet = pass.dependencies.every((dep) => executed.has(dep));
      const optionalDepsMet = pass.optionalDependencies.every(
        (dep) => !executed.has(dep) || (results.get(dep)?.status === "success"),
      );

      if (!depsMet) {
        const missing = pass.dependencies.filter((d) => !executed.has(d));
        results.set(pass.id, {
          status: "failed",
          errors: [`Unsatisfied dependencies: ${missing.join(", ")}`],
          warnings: [],
        });
        executed.add(pass.id);
        continue;
      }

      if (!optionalDepsMet) {
        const missingDeps = pass.optionalDependencies.filter(
          (d) => results.get(d)?.status !== "success",
        );
        results.set(pass.id, {
          status: "partial",
          errors: [],
          warnings: [`Optional dependencies not met: ${missingDeps.join(", ")}`],
        });
        executed.add(pass.id);
        continue;
      }

      const instance = passInstances.get(pass.id);
      if (!instance) {
        results.set(pass.id, {
          status: "failed",
          errors: [`Pass instance not found for '${pass.id}'`],
          warnings: [],
        });
        executed.add(pass.id);
        continue;
      }

      const result = await this.executePass(instance, pass, ctx);
      results.set(pass.id, result);
      executed.add(pass.id);
    }

    return results;
  }

  private topoSort(passes: PassDescriptor[]): PassDescriptor[] {
    const inDegree = new Map<string, number>();
    const adjList = new Map<string, string[]>();

    for (const pass of passes) {
      if (!inDegree.has(pass.id)) inDegree.set(pass.id, 0);
      if (!adjList.has(pass.id)) adjList.set(pass.id, []);
      for (const dep of pass.dependencies) {
        if (!inDegree.has(dep)) inDegree.set(dep, 0);
        if (!adjList.has(dep)) adjList.set(dep, []);
        adjList.get(dep)!.push(pass.id);
        inDegree.set(pass.id, (inDegree.get(pass.id) ?? 0) + 1);
      }
    }

    const queue: string[] = [];
    for (const [id, degree] of inDegree.entries()) {
      if (degree === 0) queue.push(id);
    }

    const sorted: PassDescriptor[] = [];
    const passMap = new Map<string, PassDescriptor>();
    for (const pass of passes) passMap.set(pass.id, pass);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const pass = passMap.get(current);
      if (!pass) continue;
      sorted.push(pass);

      const neighbors = adjList.get(current) ?? [];
      for (const neighbor of neighbors) {
        const newDegree = (inDegree.get(neighbor) ?? 1) - 1;
        inDegree.set(neighbor, newDegree);
        if (newDegree === 0) queue.push(neighbor);
      }
    }

    const sortedSet = new Set(sorted.map((p) => p.id));
    for (const pass of passes) {
      if (!sortedSet.has(pass.id)) sorted.push(pass);
    }

    return sorted;
  }

  private async executePass(
    pass: CompilerPass,
    descriptor: PassDescriptor,
    ctx: PassContext,
  ): Promise<PassResult> {
    const passCtx: PassContext = {
      getPassState: ctx.getPassState,
      setPassState: ctx.setPassState,
      config: ctx.config,
    };

    try {
      await pass.initialize(passCtx);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return {
        status: "failed",
        errors: [`Initialization failed: ${error.message}`],
        warnings: [],
      };
    }

    const startTime = Date.now();
    try {
      return await pass.execute(passCtx);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return {
        status: "failed",
        errors: [`Execution failed: ${error.message}`],
        warnings: [],
      };
    } finally {
      try {
        await pass.finalize(passCtx);
      } catch (err) {
        void err;
      }
    }
  }

  private async executeBatch(batch: PassDescriptor[], ctx: PassContext): Promise<void> {
    const batchSize = Math.min(this.maxConcurrency, batch.length);
    for (let i = 0; i < batch.length; i += batchSize) {
      const chunk = batch.slice(i, i + batchSize);
      await Promise.all(
        chunk.map((pass) => {
          const fakePass: CompilerPass = {
            descriptor: pass,
            initialize: async () => {},
            execute: async () => ({ status: "success", errors: [], warnings: [] }),
            finalize: async () => {},
            validate: async () => ({ status: "success", errors: [], warnings: [] }),
            cacheKey: () => null,
          };
          return this.executePass(fakePass, pass, ctx);
        }),
      );
    }
  }
}
