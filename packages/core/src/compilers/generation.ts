import type { PassResult, CompilerPass, PassDescriptor } from "@knowledge-compiler/plugins";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { createHash } from "node:crypto";

function ps(ctx: any, key: string): any { return ctx.getPassState(key); }
function pss(ctx: any, key: string, val: any): void { ctx.setPassState(key, val); }

export class ArtifactSerializerPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "artifact-serializer", name: "Artifact Serializer", version: 1, phase: "GENERATION", dependencies: ["knowledge-graph-builder", "cluster-assigner", "concept-hierarchy"], optionalDependencies: ["graph-statistics"], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 0, timeout: 60000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const outputDir = ctx.config.output.dir;
      const kg = ps(ctx, "knowledgeGraph") ?? null;
      const cg = ps(ctx, "clusterGraph") ?? null;
      const ch = ps(ctx, "conceptHierarchy") ?? null;
      const gs = ps(ctx, "graphStatistics") ?? null;
      mkdirSync(outputDir, { recursive: true });

      const graphPath = kg ? join(outputDir, "knowledge-graph.json") : undefined;
      const clusterPath = cg ? join(outputDir, "cluster-graph.json") : undefined;
      const conceptPath = ch ? join(outputDir, "concept-hierarchy.json") : undefined;
      const statsPath = gs ? join(outputDir, "graph-statistics.json") : undefined;

      if (kg) writeFileSync(graphPath!, JSON.stringify({ version: kg.version, upstreamGraphs: kg.upstreamGraphs, nodeTypeDistribution: kg.nodeTypeDistribution, totalEdges: kg.totalEdges, averageImportance: kg.averageImportance, createdAt: kg.createdAt, nodes: Array.from(kg.nodes.values()), edges: Array.from(kg.edges.values()), adjacency: Object.fromEntries(kg.adjacency) }, null, 2));
      if (cg) writeFileSync(clusterPath!, JSON.stringify({ totalClusters: cg.totalClusters, maxDepth: cg.maxDepth, averageClusterSize: cg.averageClusterSize, hierarchyRoots: cg.hierarchyRoots, nodes: cg.nodes, edges: Array.from(cg.edges.values()), adjacency: Object.fromEntries(cg.adjacency) }, null, 2));
      if (ch) writeFileSync(conceptPath!, JSON.stringify({ maxLevel: ch.maxLevel, totalConcepts: ch.totalConcepts, rootConceptIds: ch.rootConceptIds, leafCount: ch.leafCount, averageDepth: ch.averageDepth, maxChildren: ch.maxChildren, nodes: ch.nodes, edges: ch.edges, adjacency: Object.fromEntries(ch.adjacency) }, null, 2));
      if (gs) writeFileSync(statsPath!, JSON.stringify(gs, null, 2));

      pss(ctx, "artifactPaths", { graphPath, clusterPath, conceptPath, statsPath });
      return { status: "success", data: { artifactsWritten: [kg, cg, ch, gs].filter(Boolean).length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Artifact serialization failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class ManifestBuilderPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "manifest-builder", name: "Manifest Builder", version: 1, phase: "GENERATION", dependencies: ["artifact-serializer"], optionalDependencies: [], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 1, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const outputDir = ctx.config.output.dir;
      const irStore = ctx.getIRStore();
      const stats = irStore.getStats();
      const artifactPaths = ps(ctx, "artifactPaths") ?? {};
      const manifest: any = {
        version: 1, generatedAt: new Date().toISOString(), compilerVersion: "0.1.0",
        config: { source: { patterns: ctx.config.source.patterns, baseDir: ctx.config.source.baseDir }, output: { dir: ctx.config.output.dir, compress: ctx.config.output.compress }, embedding: { provider: ctx.config.embedding.provider, model: ctx.config.embedding.model, dimensions: ctx.config.embedding.dimensions }, clustering: { algorithm: ctx.config.clustering.algorithm, resolution: ctx.config.clustering.resolution }, graph: { layoutAlgorithm: ctx.config.graph.layoutAlgorithm } },
        statistics: { documentCount: stats.documentCount, sectionCount: stats.sectionCount, conceptCount: stats.conceptCount, edgeCount: stats.edgeCount, embeddingCount: stats.embeddingCount },
        artifacts: { knowledgeGraph: artifactPaths.graphPath ?? null, clusterGraph: artifactPaths.clusterPath ?? null, conceptHierarchy: artifactPaths.conceptPath ?? null, graphStatistics: artifactPaths.statsPath ?? null },
      };
      if (artifactPaths.graphPath) { try { const { readFileSync } = require("node:fs"); manifest.artifacts.knowledgeGraphHash = createHash("sha256").update(readFileSync(artifactPaths.graphPath)).digest("hex"); } catch { manifest.artifacts.knowledgeGraphHash = "unavailable"; } }
      const manifestPath = join(outputDir, "manifest.json");
      mkdirSync(dirname(manifestPath), { recursive: true });
      writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      pss(ctx, "manifest", { manifestPath });
      return { status: "success", data: { manifestPath }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Manifest building failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}
