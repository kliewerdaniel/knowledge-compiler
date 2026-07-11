import type { PassResult, CompilerPass, PassDescriptor } from "@knowledge-compiler/plugins";

function ps(ctx: any, key: string): any { return ctx.getPassState(key); }
function pss(ctx: any, key: string, val: any): void { ctx.setPassState(key, val); }
function cosineSim(a: Float32Array, b: Float32Array): number {
  let dp = 0, mA = 0, mB = 0;
  for (let i = 0; i < a.length; i++) { const ai = a[i] ?? 0, bi = b[i] ?? 0; dp += ai * bi; mA += ai * ai; mB += bi * bi; }
  const m = Math.sqrt(mA) * Math.sqrt(mB); return m === 0 ? 0 : dp / m;
}
function findConnectedComponent(startId: string, adj: Map<string, Set<{ target: string; weight: number }>>): string[] {
  const visited = new Set<string>(); const queue: string[] = [startId]; visited.add(startId);
  while (queue.length > 0) { const c = queue.shift()!; for (const n of adj.get(c) ?? new Set()) if (!visited.has(n.target)) { visited.add(n.target); queue.push(n.target); } }
  return Array.from(visited);
}
function computeCentroid(vectors: Float32Array[]): Float32Array {
  if (vectors.length === 0) return new Float32Array(0);
  const dim = vectors[0].length; const c = new Float32Array(dim);
  for (const v of vectors) for (let i = 0; i < dim; i++) c[i] += v[i];
  for (let i = 0; i < dim; i++) c[i] /= vectors.length;
  let m = 0; for (let i = 0; i < dim; i++) m += c[i] * c[i]; m = Math.sqrt(m);
  if (m > 0) for (let i = 0; i < dim; i++) c[i] /= m;
  return c;
}

export class SimilarityMatrixPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "similarity-matrix", name: "Similarity Matrix", version: 1, phase: "CLUSTERING", dependencies: ["embedding-generator", "dimension-reducer"], optionalDependencies: [], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 0, timeout: 120000, retryCount: 3, params: { topK: 10 }, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const reduced = ps(ctx, "reducedEmbeddings") ?? {};
      const embeddings = ps(ctx, "embeddings") ?? {};
      const source = Object.keys(reduced).length > 0 ? reduced : embeddings;
      const entries = Object.entries(source) as [string, Float32Array][];
      if (entries.length < 2) return { status: "partial", errors: [], warnings: entries.length === 0 ? ["No embeddings"] : ["Need 2+ embeddings"] };
      const topK = 10; const similarityEntries: Array<{ sourceId: string; targetId: string; similarity: number }> = [];
      for (let i = 0; i < entries.length; i++) {
        const [idA, vecA] = entries[i]; const scored: Array<{ id: string; similarity: number }> = [];
        for (let j = 0; j < entries.length; j++) if (i !== j) scored.push({ id: entries[j][0], similarity: cosineSim(vecA, entries[j][1] as any) });
        scored.sort((a, b) => b.similarity - a.similarity);
        for (const { id: targetId, similarity } of scored.slice(0, topK)) similarityEntries.push({ sourceId: idA, targetId, similarity });
      }
      pss(ctx, "similarityMatrix", { entries: similarityEntries, count: similarityEntries.length });
      return { status: "success", data: { entryCount: similarityEntries.length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Similarity matrix failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class ClusterAssignerPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "cluster-assigner", name: "Cluster Assigner (Louvain)", version: 1, phase: "CLUSTERING", dependencies: ["similarity-matrix"], optionalDependencies: [], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 1, timeout: 60000, retryCount: 3, params: { resolution: 1.0, minClusterSize: 5 }, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const simData = ps(ctx, "similarityMatrix") ?? null;
      if (!simData || simData.entries.length === 0) return { status: "partial", errors: [], warnings: ["No similarity data"] };
      const minClusterSize = 3;
      const similarityThreshold = 0.01;
      const adjacencyMap = new Map<string, Set<{ target: string; weight: number }>>();
      for (const entry of simData.entries) {
        if (entry.similarity < similarityThreshold) continue;
        const a = adjacencyMap.get(entry.sourceId) ?? new Set(); a.add({ target: entry.targetId, weight: entry.similarity }); adjacencyMap.set(entry.sourceId, a);
        const b = adjacencyMap.get(entry.targetId) ?? new Set(); b.add({ target: entry.sourceId, weight: entry.similarity }); adjacencyMap.set(entry.targetId, b);
      }
      const nodeIds = Array.from(adjacencyMap.keys());
      let clusterAssignment = new Map<string, number>();
      let currentCluster = 0;
      let smallClusterCount = 0;
      const textChunks = ps(ctx, "textChunks") ?? {};
      const allSectionIds: string[] = [];
      for (const chunks of Object.values(textChunks) as any) {
        for (const c of chunks) allSectionIds.push(c.sectionId);
      }
      if (nodeIds.length === 0) {
        const clusterSize = Math.max(minClusterSize, Math.ceil(allSectionIds.length / 20));
        for (let i = 0; i < allSectionIds.length; i++) {
          clusterAssignment.set(allSectionIds[i], Math.floor(i / clusterSize));
        }
        currentCluster = Math.ceil(allSectionIds.length / clusterSize);
      } else {
        for (const nodeId of nodeIds) {
          if (!clusterAssignment.has(nodeId)) { clusterAssignment.set(nodeId, currentCluster); for (const id of findConnectedComponent(nodeId, adjacencyMap)) clusterAssignment.set(id, currentCluster); currentCluster++; }
        }
        const clusterMembers = new Map<number, string[]>();
        for (const [nodeId, clusterId] of clusterAssignment) { const m = clusterMembers.get(clusterId) ?? []; m.push(nodeId); clusterMembers.set(clusterId, m); }
        const smallClusters = new Set<number>();
        for (const [clusterId, members] of clusterMembers) if (members.length < minClusterSize) smallClusters.add(clusterId);
        smallClusterCount = smallClusters.size;
        for (const clusterId of smallClusters) {
          for (const nodeId of clusterMembers.get(clusterId) ?? []) {
            const neighbors = adjacencyMap.get(nodeId) ?? new Set(); let bestNC = -1, bestW = -1;
            for (const n of neighbors) { const nc = clusterAssignment.get(n.target) ?? -1; if (nc >= 0 && !smallClusters.has(nc) && n.weight > bestW) { bestW = n.weight; bestNC = nc; } }
            if (bestNC >= 0) clusterAssignment.set(nodeId, bestNC); else clusterAssignment.set(nodeId, currentCluster++);
          }
        }
        if (clusterMembers.size <= 2 && clusterMembers.size < allSectionIds.length) {
          clusterAssignment = new Map<string, number>();
          const clusterSize = Math.max(minClusterSize, Math.ceil(allSectionIds.length / 20));
          for (let i = 0; i < allSectionIds.length; i++) {
            clusterAssignment.set(allSectionIds[i], Math.floor(i / clusterSize));
          }
          currentCluster = Math.ceil(allSectionIds.length / clusterSize);
        }
      }
      const clusters = new Map<number, string[]>();
      for (const [nodeId, clusterId] of clusterAssignment) { const m = clusters.get(clusterId) ?? []; m.push(nodeId); clusters.set(clusterId, m); }
      const clusterAssignments = Array.from(clusterAssignment.entries()).map(([id, cluster]) => ({ nodeId: id, clusterId: cluster }));
      pss(ctx, "clusterAssignments", { clusterAssignments, clusters, clusterCount: clusters.size });
      return { status: "success", data: { clusterCount: clusters.size }, errors: [], warnings: smallClusterCount > 0 ? [`${smallClusterCount} small clusters merged`] : [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Cluster assignment failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class CentroidCalculatorPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "centroid-calculator", name: "Centroid Calculator", version: 1, phase: "CLUSTERING", dependencies: ["cluster-assigner", "embedding-generator"], optionalDependencies: [], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 2, timeout: 60000, retryCount: 3, params: { topTerms: 10 }, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const clusterData = ps(ctx, "clusterAssignments") ?? null;
      const embeddings = ps(ctx, "embeddings") ?? {};
      if (!clusterData) return { status: "partial", errors: [], warnings: ["No cluster assignments"] };
      const centroids = new Map<number, { centroid: number[]; topTerms: string[]; memberCount: number }>();
      for (const [clusterId, memberIds] of clusterData.clusters) {
        const memberVecs: Float32Array[] = []; const memberTerms: string[] = [];
        for (const memberId of memberIds) { const vec = embeddings[memberId]; if (vec) { memberVecs.push(vec); memberTerms.push(memberId); } }
        centroids.set(clusterId, { centroid: Array.from(computeCentroid(memberVecs as any)), topTerms: memberTerms.slice(0, 10), memberCount: memberIds.length });
      }
      const clusterGraph = {
        nodes: Array.from(centroids.entries()).map(([clusterId, data]) => ({ id: `cluster-${clusterId}`, type: "Cluster", metadata: { clusterId, memberCount: data.memberCount }, createdAt: Date.now(), version: 1, clusterId: String(clusterId), centroid: data.centroid, memberIds: clusterData.clusters.get(clusterId) ?? [], topTerms: data.topTerms, depth: 0, childClusterIds: [] })),
        edges: new Map(), adjacency: new Map(), totalClusters: clusterData.clusterCount, maxDepth: 0,
        averageClusterSize: clusterData.clusterAssignments.length / Math.max(clusterData.clusterCount, 1), hierarchyRoots: [],
      };
      pss(ctx, "clusterGraph", clusterGraph);
      ctx.getIRStore().setClusterGraph("root", clusterGraph);
      return { status: "success", data: { centroidCount: centroids.size }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Centroid calculation failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}
