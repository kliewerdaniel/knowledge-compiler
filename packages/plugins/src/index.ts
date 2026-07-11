import type { CompilerConfig } from "@knowledge-compiler/config";

// ── Pass Descriptors ────────────────────────────────────────
export type CompilerPhase =
  | "INIT"
  | "PARSING"
  | "ANALYSIS"
  | "GRAPH_CONSTRUCTION"
  | "EMBEDDING"
  | "CLUSTERING"
  | "OPTIMIZATION"
  | "GENERATION"
  | "COMPLETE"
  | "ERROR";

export type ExecutionPolicy =
  | { type: "singleton" }
  | { type: "perDocument" }
  | { type: "parallel" };

export type CachePolicy = {
  read: boolean;
  write: boolean;
  ttl: number;
};

export type PassID = string;

export interface PassConfig {
  enabled: boolean;
  priority: number;
  timeout: number;
  retryCount: number;
  params: Record<string, unknown>;
  onError: "fail" | "retry" | "skip" | "degraded";
}

export interface PassDescriptor {
  id: PassID;
  name: string;
  version: number;
  phase: CompilerPhase;
  dependencies: PassID[];
  optionalDependencies: PassID[];
  executionPolicy: ExecutionPolicy;
  config: PassConfig;
  cachePolicy: CachePolicy;
}

// ── Pass Lifecycle Hooks ───────────────────────────────────
export interface PassContext {
  getPassState<T>(passId: PassID): T | undefined;
  setPassState<T>(passId: PassID, state: T): void;
  config: CompilerConfig;
}

export interface PassResult {
  status: "success" | "partial" | "failed" | "skipped";
  data?: unknown;
  errors: string[];
  warnings: string[];
  timing?: { durationMs: number };
}

export interface CompilerPass {
  descriptor: PassDescriptor;
  initialize(ctx: PassContext): Promise<void>;
  execute(ctx: PassContext): Promise<PassResult>;
  finalize(ctx: PassContext): Promise<void>;
  validate(ctx: PassContext): Promise<PassResult>;
  cacheKey(ctx: PassContext): string | null;
}

// ── Plugin Types ────────────────────────────────────────────
export interface PluginManifest {
  name: string;
  version: string;
  description?: string;
  author?: string;
  entryPoint: string;
  passes: PassDescriptor[];
  permissions: ("filesystem" | "network" | "process")[];
  dependencies: string[];
  runtime: "node" | "wasm" | "native";
}

export interface PluginInstance {
  manifest: PluginManifest;
  passes: CompilerPass[];
  dispose(): Promise<void>;
}

// ── Plugin Registry ─────────────────────────────────────────
export class PluginRegistry {
  private passes = new Map<PassID, CompilerPass>();
  private descriptors = new Map<PassID, PassDescriptor>();

  register(pass: CompilerPass): void {
    const desc = pass.descriptor;
    if (this.passes.has(desc.id)) {
      throw new Error(`Pass '${desc.id}' is already registered`);
    }
    this.passes.set(desc.id, pass);
    this.descriptors.set(desc.id, desc);
  }

  unregister(passId: PassID): boolean {
    this.passes.delete(passId);
    return this.descriptors.delete(passId);
  }

  get(passId: PassID): CompilerPass | undefined {
    return this.passes.get(passId);
  }

  getDescriptor(passId: PassID): PassDescriptor | undefined {
    return this.descriptors.get(passId);
  }

  getAll(): CompilerPass[] {
    return Array.from(this.passes.values());
  }

  getAllDescriptors(): PassDescriptor[] {
    return Array.from(this.descriptors.values());
  }

  getByPhase(phase: CompilerPhase): CompilerPass[] {
    return this.getAll().filter((p) => p.descriptor.phase === phase);
  }

  has(passId: PassID): boolean {
    return this.passes.has(passId);
  }

  count(): number {
    return this.passes.size;
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    for (const desc of this.descriptors.values()) {
      for (const dep of desc.dependencies) {
        if (!this.descriptors.has(dep)) {
          errors.push(
            `Pass '${desc.id}' depends on '${dep}' which is not registered`,
          );
        }
      }
    }

    // Detect cycles using DFS
    const visited = new Set<PassID>();
    const inStack = new Set<PassID>();

    const hasCycle = (passId: PassID): boolean => {
      if (inStack.has(passId)) return true;
      if (visited.has(passId)) return false;
      visited.add(passId);
      inStack.add(passId);
      const desc = this.descriptors.get(passId);
      if (desc) {
        for (const dep of desc.dependencies) {
          if (hasCycle(dep)) return true;
        }
      }
      inStack.delete(passId);
      return false;
    };

    for (const id of this.descriptors.keys()) {
      if (hasCycle(id)) {
        errors.push(`Cycle detected in pass dependency graph involving '${id}'`);
      }
    }

    return { valid: errors.length === 0, errors };
  }
}
