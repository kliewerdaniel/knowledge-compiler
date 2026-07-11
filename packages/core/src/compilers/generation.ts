import type { PassResult, CompilerPass, PassDescriptor } from "@knowledge-compiler/plugins";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { createHash } from "node:crypto";

function ps(ctx: any, key: string): any { return ctx.getPassState(key); }
function pss(ctx: any, key: string, val: any): void { ctx.setPassState(key, val); }

function extractPlainText(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (node.value && typeof node.value === "string") return node.value;
  if (node.children && Array.isArray(node.children)) return node.children.map((c: any) => extractPlainText(c)).join(" ");
  return "";
}

function computeHash(filePath: string): string {
  try {
    return createHash("sha256").update(readFileSync(filePath)).digest("hex");
  } catch {
    return "unavailable";
  }
}

function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).filter(Boolean).length * 1.3);
}

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
      const textChunks = ps(ctx, "textChunks") ?? {};
      const embeddings = ps(ctx, "embeddings") ?? {};
      const frontmatterResults = ps(ctx, "frontmatterResults") ?? {};
      const mdastResults = ps(ctx, "mdastResults") ?? {};
      const pagerankScores = ps(ctx, "pagerankScores") ?? new Map();
      const irStore = ctx.getIRStore();
      const stats = irStore.getStats();

      mkdirSync(outputDir, { recursive: true });
      const writtenFiles: string[] = [];

      // --- knowledge-graph.json (frontend format: { documents, edges }) ---
      if (kg && kg.nodes) {
        const docs = Array.from(kg.nodes.values()).map((node: any) => {
          const meta = node.metadata || {};
          const pr = pagerankScores.get(node.id) ?? 0;
          return {
            id: node.id,
            title: meta.label || node.id,
            name: meta.label || node.id,
            type: meta.type || "unknown",
            importance: meta.importance ?? pr,
            clusterId: null,
          };
        });
        const allEdges = Array.from((kg.edges?.values?.() ?? kg.edges ?? [])).map((edge: any) => ({
          source: edge.sourceId,
          from: edge.sourceId,
          target: edge.targetId,
          to: edge.targetId,
          importance: edge.weight ?? 0.5,
          weight: edge.weight ?? 0.5,
          type: edge.type ?? "related",
          id: edge.id,
        }));
        const kgData = { documents: docs, edges: allEdges };
        const kgPath = join(outputDir, "knowledge-graph.json");
        writeFileSync(kgPath, JSON.stringify(kgData, null, 2));
        writtenFiles.push("knowledge-graph.json");
        irStore.setKnowledgeGraph(kgData);
      }

      // --- section-index.json (frontend format: { sections: [...] }) ---
      const sectionEntries = new Map<string, any>();
      for (const [filePath, chunks] of Object.entries(textChunks as Record<string, any[]>)) {
        const fm = (frontmatterResults as Record<string, any>)[filePath]?.frontmatter ?? {};
        const mdast = mdastResults[filePath]?.ast ?? null;
        const title = (fm.title as string) || (mdast?.children?.[0]?.children?.[0]?.value) || filePath.split("/").pop()?.replace(/\.md$/, "") || filePath;
        const tags = (fm.tags as string[]) || (fm.categories as string[]) || [];
        const date = (fm.date as string) || "";
        for (const chunk of chunks) {
          sectionEntries.set(chunk.sectionId, {
            id: chunk.sectionId,
            title,
            headingPath: [title],
            docId: filePath,
            summary: chunk.content?.slice(0, 200) ?? "",
            startOffset: chunk.startChar ?? 0,
            endOffset: chunk.endChar ?? 0,
            level: 0,
            tags,
            date,
            importance: 0.5,
            clusterId: null,
          });
        }
      }
      const sections = Array.from(sectionEntries.values());
      const sectionIndexData = { sections };
      const sectionIndexPath = join(outputDir, "section-index.json");
      writeFileSync(sectionIndexPath, JSON.stringify(sectionIndexData, null, 2));
      writtenFiles.push("section-index.json");
      for (const sec of sections) {
        irStore.setSectionGraph(sec.docId, { docId: sec.docId, sections: [sec], totalSections: 1 });
      }

      // --- concept-index.json (frontend format: { concepts: [...] }) ---
      if (ch && ch.nodes) {
        const concepts = ch.nodes.map((node: any, i: number) => ({
          id: `concept-${i}`,
          name: node.label ?? node.name ?? `concept-${i}`,
          type: node.entityType ?? "keyword",
          frequency: node.frequency ?? 1,
          description: node.description ?? "",
          relatedConcepts: node.relatedConcepts ?? [],
          aliases: [],
          clusterId: null,
          docId: node.sectionIds?.[0] ?? null,
        }));
        const conceptIndexData = { concepts };
        const conceptIndexPath = join(outputDir, "concept-index.json");
        writeFileSync(conceptIndexPath, JSON.stringify(conceptIndexData, null, 2));
        writtenFiles.push("concept-index.json");
        irStore.setConceptGraph("root", { concepts, totalConcepts: concepts.length });
      }

      // --- cluster-index.json (frontend format: { clusters: [...] }) ---
      if (cg && cg.nodes) {
        const clusters = cg.nodes.map((node: any) => ({
          id: node.id ?? node.clusterId ?? `cluster-${Math.random().toString(36).slice(2, 8)}`,
          label: node.topTerms?.[0] ?? node.metadata?.label ?? `Cluster ${node.clusterId}`,
          memberCount: node.memberIds?.length ?? node.metadata?.memberCount ?? 0,
          silhouetteScore: 0,
          centroidOffset: 0,
          topTerms: node.topTerms ?? [],
          members: node.memberIds ?? [],
        }));
        const clusterIndexData = { clusters };
        const clusterIndexPath = join(outputDir, "cluster-index.json");
        writeFileSync(clusterIndexPath, JSON.stringify(clusterIndexData, null, 2));
        writtenFiles.push("cluster-index.json");
        irStore.setClusterGraph("root", { clusters });
      }

      // --- search-index.json (frontend format: { entries: [...], metadata }) ---
      const searchEntries = sections.map((sec) => {
        const tokens = (sec.summary ?? "")
          .toLowerCase().replace(/[^a-z0-9\s'-]/g, " ")
          .split(/\s+/).filter((w: string) => w.length >= 3);
        return {
          id: sec.id,
          text: sec.summary ?? "",
          docId: sec.docId,
          sectionId: sec.id,
          score: 1.0,
          tokens,
        };
      });
      const searchData = {
        entries: searchEntries,
        metadata: {
          totalEntries: searchEntries.length,
          avgEntryLength: searchEntries.length > 0
            ? searchEntries.reduce((s: number, e: any) => s + e.text.length, 0) / searchEntries.length
            : 0,
        },
      };
      const searchIndexPath = join(outputDir, "search-index.json");
      writeFileSync(searchIndexPath, JSON.stringify(searchData, null, 2));
      writtenFiles.push("search-index.json");

      // --- navigation.json (frontend format: { tree: [...], flat: [...] }) ---
      const flatNav: Array<{ id: string; title: string; path: string; parentId: string | null; depth: number }> = [];
      const seenDocs = new Set<string>();
      for (const sec of sections) {
        if (!seenDocs.has(sec.docId)) {
          seenDocs.add(sec.docId);
          const fm = frontmatterResults[sec.docId]?.frontmatter ?? {};
          const docTitle = (fm.title as string) || sec.title || sec.docId;
          flatNav.push({ id: sec.docId, title: docTitle, path: sec.docId, parentId: null, depth: 0 });
        }
      }
      const navData = {
        tree: flatNav.filter((n) => n.depth === 0).map((n) => ({ id: n.id, title: n.title, path: n.path, children: [] })),
        flat: flatNav,
      };
      const navPath = join(outputDir, "navigation.json");
      writeFileSync(navPath, JSON.stringify(navData, null, 2));
      writtenFiles.push("navigation.json");

      // --- embeddings.json (frontend format: array of { id, values }) ---
      const embArray: Array<{ id: string; values: number[] }> = [];
      for (const [id, vec] of Object.entries(embeddings as Record<string, Float32Array>)) {
        embArray.push({ id, values: Array.from({ length: (vec as Float32Array).length }, (_, i) => (vec as Float32Array)[i]) });
        irStore.setEmbedding(id, vec);
      }
      const embPath = join(outputDir, "embeddings.json");
      writeFileSync(embPath, JSON.stringify(embArray, null, 2));
      writtenFiles.push("embeddings.json");

      // --- statistics.json (frontend format) ---
      const totalTokens = sections.reduce((sum: number, s: any) => sum + estimateTokens(s.summary ?? ""), 0);
      let totalBytes = 0;
      for (const fn of writtenFiles) {
        try { totalBytes += readFileSync(join(outputDir, fn)).byteLength; } catch {}
      }
      const statisticsData = {
        generatedAt: new Date().toISOString(),
        sourceCount: stats.documentCount,
        documentCount: stats.documentCount,
        sectionCount: sections.length,
        conceptCount: ch?.nodes?.length ?? ch?.totalConcepts ?? 0,
        edgeCount: kg?.totalEdges ?? stats.edgeCount ?? 0,
        clusterCount: cg?.nodes?.length ?? cg?.totalClusters ?? 0,
        embeddingCount: embArray.length,
        totalTokens,
        totalBytes,
        processingTimeMs: Date.now() - startTime,
        phaseTimings: {},
      };
      const statsFilePath = join(outputDir, "statistics.json");
      writeFileSync(statsFilePath, JSON.stringify(statisticsData, null, 2));
      writtenFiles.push("statistics.json");

      // --- Backward-compat files (keep existing format for other consumers) ---
      if (kg) {
        const oldGraphPath = join(outputDir, "graph-statistics.json");
        if (gs) writeFileSync(oldGraphPath, JSON.stringify(gs, null, 2));
      }
      if (cg) {
        const oldClusterPath = join(outputDir, "cluster-graph.json");
        writeFileSync(oldClusterPath, JSON.stringify({
          totalClusters: cg.totalClusters, maxDepth: cg.maxDepth,
          averageClusterSize: cg.averageClusterSize, hierarchyRoots: cg.hierarchyRoots,
          nodes: cg.nodes, edges: Array.from(cg.edges?.values?.() ?? []),
          adjacency: Object.fromEntries(cg.adjacency ?? new Map()),
        }, null, 2));
        writtenFiles.push("cluster-graph.json");
      }
      if (ch) {
        const oldConceptPath = join(outputDir, "concept-hierarchy.json");
        writeFileSync(oldConceptPath, JSON.stringify({
          maxLevel: ch.maxLevel, totalConcepts: ch.totalConcepts,
          rootConceptIds: ch.rootConceptIds, leafCount: ch.leafCount,
          averageDepth: ch.averageDepth, maxChildren: ch.maxChildren,
          nodes: ch.nodes, edges: ch.edges,
          adjacency: Object.fromEntries(ch.adjacency ?? new Map()),
        }, null, 2));
        writtenFiles.push("concept-hierarchy.json");
      }

      pss(ctx, "artifactPaths", { writtenFiles, outputDir });
      return { status: "success", data: { artifactsWritten: writtenFiles.length, files: writtenFiles }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
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
      const artifactInfo = ps(ctx, "artifactPaths") ?? {};

      const artifactFiles = (artifactInfo.writtenFiles ?? []).filter(Boolean) as string[];
      const manifestEntries: Record<string, { path: string; hash: string; size: number; contentType: string }> = {};
      for (const fileName of artifactFiles) {
        const filePath = join(outputDir, fileName);
        let size = 0;
        try {
          size = readFileSync(filePath).byteLength;
        } catch {}
        manifestEntries[fileName] = {
          path: fileName,
          hash: computeHash(filePath),
          size,
          contentType: fileName.endsWith(".json") ? "application/json" : "application/octet-stream",
        };
      }

      const manifest: any = {
        version: 1,
        generatedAt: new Date().toISOString(),
        compilerVersion: "0.1.0",
        config: {
          source: { patterns: ctx.config.source.patterns, baseDir: ctx.config.source.baseDir },
          output: { dir: ctx.config.output.dir, compress: ctx.config.output.compress },
          embedding: { provider: ctx.config.embedding.provider, model: ctx.config.embedding.model, dimensions: ctx.config.embedding.dimensions },
          clustering: { algorithm: ctx.config.clustering.algorithm, resolution: ctx.config.clustering.resolution },
          graph: { layoutAlgorithm: ctx.config.graph.layoutAlgorithm },
        },
        statistics: {
          documentCount: stats.documentCount,
          sectionCount: stats.sectionCount,
          conceptCount: stats.conceptCount,
          edgeCount: stats.edgeCount,
          embeddingCount: stats.embeddingCount,
        },
        artifacts: manifestEntries,
      };

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
