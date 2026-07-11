import type { PassResult, CompilerPass, PassDescriptor } from "@knowledge-compiler/plugins";

function ps(ctx: any, key: string): any { return ctx.getPassState(key); }
function pss(ctx: any, key: string, val: any): void { ctx.setPassState(key, val); }

export class KnowledgeGraphBuilderPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "knowledge-graph-builder", name: "Knowledge Graph Builder", version: 1, phase: "GRAPH_CONSTRUCTION", dependencies: [], optionalDependencies: ["entity-extractor", "link-extractor", "concept-hierarchy"], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 0, timeout: 60000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const entityData = ps(ctx, "entityData") ?? {};
      const linkData = ps(ctx, "linkData") ?? {};
      const conceptHierarchy = ps(ctx, "conceptHierarchy") ?? null;
      const nodes = new Map<string, any>();
      const edges: any[] = [];
      const adjacency = new Map<string, string[]>();
      let idCounter = 0;
      const createId = (): string => `node-${++idCounter}`;
      const getNodeOrCreate = (label: string, type: string): string => {
        for (const node of nodes.values()) if ((node.metadata as any)?.label === label && (node.metadata as any)?.type === type) return node.id;
        const id = createId();
        nodes.set(id, { id, type, metadata: { label, type }, createdAt: Date.now(), version: 1 });
        adjacency.set(id, []);
        return id;
      };

      for (const docId of Object.keys(linkData)) {
        const docNodeId = getNodeOrCreate(docId, "Document");
        adjacency.set(docNodeId, []);
        if (entityData[docId]) {
          for (const entity of entityData[docId].entities.slice(0, 50)) {
            const entityNodeId = getNodeOrCreate(entity.value, `Entity:${entity.type}`);
            const weight = Math.min(entity.count / 10, 1.0);
            edges.push({ id: `edge-${createId()}`, sourceId: docNodeId, targetId: entityNodeId, type: "contains", weight, metadata: { entityType: entity.type } });
            adjacency.get(docNodeId)!.push(entityNodeId);
            adjacency.get(entityNodeId)!.push(docNodeId);
          }
        }
        for (const link of linkData[docId]?.internalLinks ?? []) {
          const targetNodeId = getNodeOrCreate(link.url, "Document");
          edges.push({ id: `edge-${createId()}`, sourceId: docNodeId, targetId: targetNodeId, type: "links-to", weight: 0.5, metadata: { linkText: link.text } });
        }
      }

      if (conceptHierarchy) {
        for (const concept of conceptHierarchy.nodes.slice(0, 200)) {
          const conceptNodeId = getNodeOrCreate(concept.label, `Concept:${concept.entityType}`);
          if (concept.level === 0) for (const child of concept.relatedConcepts) { const childId = getNodeOrCreate(child, "Concept"); edges.push({ id: `edge-${createId()}`, sourceId: conceptNodeId, targetId: childId, type: "is-a", weight: 0.8, metadata: {} }); }
          const conceptWeight = Math.min(concept.frequency / 20, 1.0);
          for (const sectionId of concept.sectionIds.slice(0, 5)) { const secNodeId = getNodeOrCreate(sectionId, "Section"); edges.push({ id: `edge-${createId()}`, sourceId: secNodeId, targetId: conceptNodeId, type: "related-to", weight: conceptWeight, metadata: {} }); }
        }
      }

      let totalImportance = 0;
      for (const node of nodes.values() as any) { const adj = adjacency.get(node.id) ?? []; const imp = Math.min(adj.length / 10, 1.0); (node.metadata as any).importance = imp; totalImportance += imp; }
      const avgImportance = totalImportance / Math.max(nodes.size, 1);
      const typeDist: Record<string, number> = {};
      for (const node of nodes.values() as any) { const t = String((node.metadata as any).type); typeDist[t] = (typeDist[t] ?? 0) + 1; }

      const knowledgeGraph = { nodes, edges: new Map(edges.map((e) => [e.id, e])), adjacency, version: "1.0.0", upstreamGraphs: [], nodeTypeDistribution: typeDist, totalEdges: edges.length, averageImportance: avgImportance, createdAt: Date.now() };
      pss(ctx, "knowledgeGraph", knowledgeGraph);
      return { status: "success", data: { nodeCount: nodes.size, edgeCount: edges.length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Knowledge graph build failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class PageRankPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "pagerank", name: "PageRank", version: 1, phase: "GRAPH_CONSTRUCTION", dependencies: ["knowledge-graph-builder"], optionalDependencies: [], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 1, timeout: 60000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const kg = ps(ctx, "knowledgeGraph") ?? null;
      if (!kg || !kg.nodes) return { status: "partial", errors: [], warnings: ["Knowledge graph not available for PageRank"] };
      const n = kg.nodes.size;
      if (n === 0) return { status: "success", data: { pagerank: {} }, errors: [], warnings: ["Empty graph"] };

      const dampingFactor = ctx.config.graph.pagerankDampingFactor;
      const maxIterations = ctx.config.graph.pagerankIterations;
      const tolerance = ctx.config.graph.pagerankTolerance;
      const nodeIds = Array.from(kg.nodes.keys()) as string[];
      let pr: Record<string, number> = {};
      for (const id of nodeIds) pr[id] = 1 / n;

      for (let iter = 0; iter < maxIterations; iter++) {
        const newPr: Record<string, number> = {};
        let totalChange = 0;
        for (const id of nodeIds) {
          const incoming = kg.adjacency.get(id) ?? [];
          let rankSum = 0;
          for (const srcId of incoming) { const srcAdj = kg.adjacency.get(srcId) ?? []; rankSum += srcAdj.length === 0 ? pr[srcId] / n : pr[srcId] / srcAdj.length; }
          newPr[id] = (1 - dampingFactor) / n + dampingFactor * rankSum;
          totalChange += Math.abs(newPr[id] - pr[id]);
        }
        pr = newPr;
        if (totalChange < tolerance) break;
      }

      const pagerankData = new Map<string, number>();
      for (const [id, rank] of (Object.entries(pr) as any)) pagerankData.set(id, rank);
      pss(ctx, "pagerankScores", pagerankData);
      const sorted = Array.from(pagerankData.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10);
      return { status: "success", data: { pagerank: pagerankData, topNodes: sorted }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`PageRank failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class GraphStatisticsPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "graph-statistics", name: "Graph Statistics", version: 1, phase: "GRAPH_CONSTRUCTION", dependencies: ["knowledge-graph-builder", "pagerank"], optionalDependencies: [], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 2, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const kg = ps(ctx, "knowledgeGraph") ?? null;
      if (!kg || !kg.nodes) return { status: "partial", errors: [], warnings: ["Knowledge graph not available for statistics"] };

      const adjacency = kg.adjacency;
      const n = kg.nodes.size;
      const totalEdges = kg.totalEdges ?? 0;
      let totalClusteringCoefficient = 0, clusteringCount = 0;

      for (const nodeId of adjacency.keys()) {
        const neighbors = adjacency.get(nodeId) ?? [];
        const k = neighbors.length;
        if (k < 2) continue;
        let triangles = 0;
        const neighborSet = new Set(neighbors);
        for (let i = 0; i < neighbors.length; i++) for (let j = i + 1; j < neighbors.length; j++) if (neighborSet.has(neighbors[j])) triangles++;
        totalClusteringCoefficient += (k * (k - 1)) / 2 > 0 ? triangles / ((k * (k - 1)) / 2) : 0;
        clusteringCount++;
      }

      const avgClusteringCoefficient = clusteringCount > 0 ? totalClusteringCoefficient / clusteringCount : 0;
      const totalDegree = Array.from(adjacency.values()).reduce((s: number, adj: any) => s + adj.length, 0);
      const avgDegree = n > 0 ? Number(totalDegree) / n : 0;
      const diameter = computeDiameter(adjacency, Math.min(n, 1000));
      const connectedComponents = countConnectedComponents(adjacency);

      const statistics = { nodeCount: n, edgeCount: totalEdges, density: n > 1 ? (2 * totalEdges) / (n * (n - 1)) : 0, averageDegree: avgDegree, averageClusteringCoefficient: avgClusteringCoefficient, diameter, connectedComponents, typeDistribution: kg.nodeTypeDistribution ?? {} };
      pss(ctx, "graphStatistics", statistics);
      return { status: "success", data: statistics, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Graph statistics failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

function computeDiameter(adjacency: Map<string, string[]>, maxNodes: number): number {
  const nodeIds = Array.from(adjacency.keys()).slice(0, maxNodes);
  if (nodeIds.length === 0) return 0;
  let maxDistance = 0;
  for (const start of nodeIds) {
    const visited = new Set<string>();
    const queue: Array<[string, number]> = [[start, 0]];
    visited.add(start);
    while (queue.length > 0) {
      const [node, dist] = queue.shift()!;
      maxDistance = Math.max(maxDistance, dist);
      for (const neighbor of adjacency.get(node) ?? []) if (!visited.has(neighbor)) { visited.add(neighbor); queue.push([neighbor, dist + 1]); }
    }
  }
  return maxDistance;
}

function countConnectedComponents(adjacency: Map<string, string[]>): number {
  const visited = new Set<string>();
  let components = 0;
  for (const nodeId of adjacency.keys()) {
    if (visited.has(nodeId)) continue;
    components++;
    const queue: string[] = [nodeId];
    visited.add(nodeId);
    while (queue.length > 0) {
      const current = queue.shift()!;
      for (const neighbor of adjacency.get(current) ?? []) if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
    }
  }
  return components;
}
