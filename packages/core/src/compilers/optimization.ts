import type { PassResult, CompilerPass, PassDescriptor } from "@knowledge-compiler/plugins";

function ps(ctx: any, key: string): any { return ctx.getPassState(key); }
function pss(ctx: any, key: string, val: any): void { ctx.setPassState(key, val); }
function extractPlainText(node: any): string {
  if (!node) return ""; if (typeof node === "string") return node; if (node.value && typeof node.value === "string") return node.value;
  if (node.children && Array.isArray(node.children)) return node.children.map((c: any) => extractPlainText(c)).join(" ");
  return "";
}
function simpleHash(str: string): number { let h = 0; for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); h = ((h << 5) - h) + c; h |= 0; } return Math.abs(h); }
function computeSimHash(text: string): number[] {
  const tokens = text.toLowerCase().replace(/[^a-z0-9\s'-]/g, " ").split(/\s+/).filter(Boolean);
  const hash = new Array(64).fill(0); const seen = new Set<string>();
  for (const token of tokens) { if (seen.has(token)) continue; seen.add(token); const th = simpleHash(token); for (let i = 0; i < 64; i++) if (th & (1 << i)) hash[i]++; else hash[i]--; }
  return hash;
}
function simHashSimilarity(a: number[], b: number[]): number { let m = 0; for (let i = 0; i < Math.min(a.length, b.length); i++) if ((a[i] > 0) === (b[i] > 0)) m++; return m / Math.min(a.length, b.length); }
function hashToInt(hash: number[]): number { let r = 0; for (let i = 0; i < hash.length && i < 8; i++) r = (r * 31 + hash[i]) | 0; return r; }
function quantizeInt8(vector: Float32Array): Int8Array {
  const result = new Int8Array(vector.length); let maxAbs = 0;
  for (let i = 0; i < vector.length; i++) { const a = Math.abs(vector[i]); if (a > maxAbs) maxAbs = a; }
  const scale = Number(maxAbs) > 0 ? 127 / Number(maxAbs) : 1;
  for (let i = 0; i < vector.length; i++) result[i] = Math.round(vector[i] * scale);
  return result;
}

export class PruningPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "pruning", name: "Graph Pruning", version: 1, phase: "OPTIMIZATION", dependencies: ["knowledge-graph-builder"], optionalDependencies: [], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 0, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const kg = ps(ctx, "knowledgeGraph") ?? null;
      if (!kg || !kg.nodes) return { status: "partial", errors: [], warnings: ["Knowledge graph not available"] };
      let edgesRemoved = 0;
      for (const [edgeId, edge] of kg.edges) {
        if (edge.weight < 0.0) {
          const sourceAdj = kg.adjacency.get(edge.sourceId) ?? []; const idx = sourceAdj.indexOf(edge.targetId); if (idx >= 0) sourceAdj.splice(idx, 1); kg.adjacency.set(edge.sourceId, sourceAdj);
          const targetAdj = kg.adjacency.get(edge.targetId) ?? []; const tIdx = targetAdj.indexOf(edge.sourceId); if (tIdx >= 0) targetAdj.splice(tIdx, 1); kg.adjacency.set(edge.targetId, targetAdj);
          kg.edges.delete(edgeId); edgesRemoved++;
        }
      }
      let nodesRemoved = 0;
      const referencedNodes = new Set<string>();
      for (const edge of kg.edges.values()) {
        referencedNodes.add(edge.sourceId);
        referencedNodes.add(edge.targetId);
      }
      for (const nodeId of kg.nodes.keys()) {
        const adj = kg.adjacency.get(nodeId) ?? [];
        if (adj.length === 0 && !referencedNodes.has(nodeId)) {
          kg.nodes.delete(nodeId);
          kg.adjacency.delete(nodeId);
          nodesRemoved++;
        }
      }
      kg.totalEdges = kg.edges.size;
      pss(ctx, "knowledgeGraph", kg);
      return { status: "success", data: { edgesRemoved, nodesRemoved, remainingNodes: kg.nodes.size, remainingEdges: kg.edges.size }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Pruning failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class DeduplicationPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "deduplication", name: "Near-Duplicate Detection (SimHash)", version: 1, phase: "OPTIMIZATION", dependencies: [], optionalDependencies: ["mdast-parser", "text-chunker"], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 1, timeout: 30000, retryCount: 3, params: { similarityThreshold: 0.85 }, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const mdastResults = ps(ctx, "mdastResults") ?? {};
      const textChunks = ps(ctx, "textChunks") ?? {};
      const allItems: Array<{ id: string; content: string; simHash: number[] }> = [];
      for (const [filePath, doc] of (Object.entries(mdastResults) as any)) { const content = doc.ast?.rawContent ?? doc.frontmatter?.content ?? extractPlainText(doc.ast); const text = typeof content === "string" ? content : extractPlainText(doc.ast); allItems.push({ id: filePath, content: text, simHash: computeSimHash(text) }); }
      for (const [, chunks] of (Object.entries(textChunks) as any)) for (const chunk of chunks) allItems.push({ id: chunk.sectionId, content: chunk.content, simHash: computeSimHash(chunk.content) });
      const duplicates = new Set<string>();
      const hashMap = new Map<number, string[]>();
      for (const item of allItems) { const hk = hashToInt(item.simHash); const e = hashMap.get(hk) ?? []; hashMap.set(hk, [...e, item.id]); }
      for (const [, ids] of hashMap) { if (ids.length < 2) continue; for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) { const a = allItems.find((it) => it.id === ids[i]); const b = allItems.find((it) => it.id === ids[j]); if (a && b && simHashSimilarity(a.simHash, b.simHash) >= 0.85) duplicates.add(ids[j]); } }
      pss(ctx, "deduplicationResult", { duplicateCount: duplicates.size, duplicateIds: Array.from(duplicates), totalItems: allItems.length, uniqueItems: allItems.length - duplicates.size });
      return { status: "success", data: { duplicateCount: duplicates.size, uniqueItems: allItems.length - duplicates.size }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Deduplication failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class CompressionPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "compression", name: "Data Compression", version: 1, phase: "OPTIMIZATION", dependencies: ["pruning", "deduplication"], optionalDependencies: ["embedding-generator"], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 2, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const embeddings = ps(ctx, "embeddings") ?? {};
      const kg = ps(ctx, "knowledgeGraph") ?? null;
      const quantizedEmbeddings: Record<string, Int8Array> = {};
      for (const [id, vec] of (Object.entries(embeddings) as any)) quantizedEmbeddings[id] = quantizeInt8(vec);
      const originalBytes = Number(Object.values(embeddings).reduce((s: number, vec: Float32Array) => s + vec.byteLength, 0));
      const quantizedBytes = Number(Object.values(quantizedEmbeddings).reduce((s: number, vec: Int8Array) => s + vec.byteLength, 0));
      if (kg) for (const [, edge] of kg.edges) edge.weight = Math.round(edge.weight * 1000) / 1000;
      pss(ctx, "quantizedEmbeddings", quantizedEmbeddings);
      pss(ctx, "compressionData", { compressionRatio: originalBytes > 0 ? quantizedBytes / originalBytes : 0, originalBytes, quantizedBytes });
      return { status: "success", data: { originalBytes, quantizedBytes, compressionRatio: originalBytes > 0 ? quantizedBytes / originalBytes : 0, embeddingCount: Object.keys(embeddings).length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Compression failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}
