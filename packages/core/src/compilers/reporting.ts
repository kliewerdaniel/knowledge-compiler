import type { PassResult, CompilerPass, PassDescriptor } from "@knowledge-compiler/plugins";

function ps(ctx: any, key: string): any { return ctx.getPassState(key); }
function pss(ctx: any, key: string, val: any): void { ctx.setPassState(key, val); }

export class ReportPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "report", name: "Compilation Report", version: 1, phase: "COMPLETE", dependencies: [], optionalDependencies: [], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 0, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const irStore = ctx.getIRStore();
      const stats = irStore.getStats();
      const kg = ps(ctx, "knowledgeGraph") ?? null;
      const ca = ps(ctx, "clusterAssignments") ?? null;
      const ch = ps(ctx, "conceptHierarchy") ?? null;
      const gs = ps(ctx, "graphStatistics") ?? null;
      const dr = ps(ctx, "deduplicationResult") ?? null;
      const cd = ps(ctx, "compressionData") ?? null;
      const manifest = ps(ctx, "manifest") ?? null;

      const report = {
        generatedAt: new Date().toISOString(), compilerVersion: "0.1.0",
        status: ctx.errors.length === 0 ? "success" : ctx.errors.some((e: any) => e.severity === "fatal") ? "failed" : "partial",
        timing: { totalDurationMs: Date.now() - startTime },
        statistics: { ...stats, knowledgeGraphNodes: kg?.nodes?.size ?? 0, knowledgeGraphEdges: kg?.totalEdges ?? 0, clusterCount: ca?.clusterCount ?? 0, conceptCount: ch?.totalConcepts ?? 0, uniqueDocuments: dr?.uniqueItems ?? stats.documentCount, duplicateDocuments: dr?.duplicateCount ?? 0, graphDensity: gs?.density ?? 0, graphDiameter: gs?.diameter ?? 0, compressionRatio: cd?.compressionRatio ?? 1.0 },
        errors: ctx.errors.map((e: any) => ({ id: e.id, severity: e.severity, phase: e.phase, message: e.message, recoverable: e.recoverable })),
        warnings: ctx.warnings,
        artifacts: { manifestPath: manifest?.manifestPath ?? null },
      };
      pss(ctx, "compilationReport", report);
      return { status: "success", data: report, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Report generation failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}
