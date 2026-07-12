import type {
  CompilerContext,
  CompilerResult,
  CompilerError,
} from "./types.js";
import { generateErrorId } from "./types.js";
import type {
  PassID,
  PassResult,
  CompilerPhase,
  CompilerPass,
  PassDescriptor,
} from "@knowledge-compiler/plugins";
import { PluginRegistry } from "@knowledge-compiler/plugins";
import { CompilerDebugger } from "./debug.js";
import pino from "pino";

const logger = pino({ name: "pipeline", level: "info" });

export class PipelineOrchestrator {
  private phases: CompilerPhase[] = [
    "INIT",
    "PARSING",
    "ANALYSIS",
    "GRAPH_CONSTRUCTION",
    "EMBEDDING",
    "CLUSTERING",
    "OPTIMIZATION",
    "GENERATION",
    "COMPLETE",
  ];

  constructor(
    private ctx: CompilerContext,
    private passRegistry: PluginRegistry,
    private debugInstance?: CompilerDebugger,
  ) {}

  async execute(options?: { passes?: PassID[]; skipPasses?: PassID[] }): Promise<CompilerResult> {
    const startTime = Date.now();
    const phaseTiming: Record<CompilerPhase, number> = {} as Record<CompilerPhase, number>;

    for (const phase of this.phases) {
      this.ctx.phase = phase;
      this.ctx.phaseStartTime.set(phase, Date.now());
      logger.info({ phase }, "Starting phase");

      try {
        await this.executePhase(phase);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        this.ctx.addError({
          id: generateErrorId(),
          severity: "fatal",
          phase,
          message: `Phase ${phase} failed: ${error.message}`,
          recoverable: false,
          retryCount: 0,
          timestamp: Date.now(),
        });
        this.ctx.phase = "ERROR";
      }
    }

    const durationMs = Date.now() - startTime;
    const irStore = this.ctx.getIRStore();
    const stats = irStore.getStats();

    const hasFatalErrors = this.ctx.errors.some(
      (e) => e.severity === "fatal" || !e.recoverable,
    );
    const status: "success" | "partial" | "failed" = hasFatalErrors
      ? "failed"
      : this.ctx.errors.length > 0
        ? "partial"
        : "success";

    const outputDir = this.ctx.config.output.dir;

    return {
      status,
      errors: this.ctx.errors,
      warnings: this.ctx.warnings,
      artifactsWritten: 0,
      documentsProcessed: stats.documentCount,
      sectionsProcessed: stats.sectionCount,
      conceptsProcessed: stats.conceptCount,
      durationMs,
      phaseTiming,
      outputDir,
    };
  }

  private async executePhase(phase: CompilerPhase): Promise<void> {
    this.ctx.phase = phase;
    const passes = this.passRegistry.getByPhase(phase);

    if (passes.length === 0) {
      return;
    }

    const skipPasses: PassID[] = this.ctx.config.pipeline.skipPasses ?? [];

    for (const pass of passes) {
      if (skipPasses.includes(pass.descriptor.id)) {
        continue;
      }

      const passId = pass.descriptor.id;

      try {
        const passCtx = this.createPassContext();

        if (this.debugInstance) {
          this.debugInstance.snapshot(
            `pre-${passId}`,
            phase,
            new Map(this.ctx.getPassStateMap()),
            new Map(this.ctx.getPassStateMap()),
            null,
          );
        }

        await pass.initialize(passCtx);
        const result = await pass.execute(passCtx);
        await pass.finalize(passCtx);

        if (this.debugInstance) {
          this.debugInstance.snapshot(
            passId,
            phase,
            new Map(this.ctx.getPassStateMap()),
            new Map(this.ctx.getPassStateMap()),
            result,
          );
        }

        if (result.status === "success" || result.status === "partial") {
          for (const warning of result.warnings ?? []) {
            this.ctx.addWarning(warning);
          }
        }

        if (result.status === "failed") {
          for (const error of result.errors ?? []) {
            this.ctx.addError({
              id: generateErrorId(),
              severity: "transient",
              passId,
              phase,
              message: error,
              recoverable: true,
              retryCount: 0,
              timestamp: Date.now(),
            });
          }
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        this.ctx.addError({
          id: generateErrorId(),
          severity: "transient",
          passId,
          phase,
          message: error.message,
          recoverable: true,
          retryCount: 0,
          timestamp: Date.now(),
        });
      }
    }
  }

  private createPassContext(): any {
    return {
      getPassState: <T>(passId: PassID): T | undefined =>
        this.ctx.getPassState<T>(passId),
      setPassState: <T>(passId: PassID, state: T): void =>
        this.ctx.setPassState<T>(passId, state),
      config: this.ctx.config,
      errors: this.ctx.errors,
      warnings: this.ctx.warnings,
      getIRStore: () => this.ctx.getIRStore(),
    };
  }

  private async transitionPhase(from: CompilerPhase, to: CompilerPhase): Promise<void> {
    const fromDuration = Date.now() - (this.ctx.phaseStartTime.get(from) ?? Date.now());
    this.ctx.phaseStartTime.set(from, fromDuration);
    this.ctx.phaseStartTime.set(to, Date.now());
    this.ctx.phase = to;
  }

  private resolvePassDAG(passes: PassDescriptor[], skipPasses: PassID[]): PassDescriptor[] {
    const skipSet = new Set(skipPasses);
    const descriptors = passes.filter((p) => !skipSet.has(p.id));
    return descriptors;
  }
}
