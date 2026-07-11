import type {
  GraphNode,
  GraphLink,
  GraphCluster,
  NodeType,
  VisualizationConfig,
  KnowledgeGraph,
  SectionIndex,
  ConceptIndex,
  ClusterIndex,
  EmbeddingIndex,
} from "../types.js";

import { NODE_COLORS, NODE_SIZES } from "../types.js";

const MAX_SAFE_FLOATING_POINT = 256;

export function transformKnowledgeGraph(
  data: KnowledgeGraph,
  config: VisualizationConfig
): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  const totalSections = data.sections?.length ?? 0;
  const totalConcepts = data.concepts?.length ?? 0;

  for (const doc of data.documents || []) {
    nodes.push({
      id: doc.id || doc.path,
      type: "document" as NodeType,
      label: doc.title || doc.path || "Unnamed Document",
      radius: config.nodeSize * NODE_SIZES.document,
      color: NODE_COLORS.document,
      pageRank: 0,
      metadata: { path: doc.path, title: doc.title },
    });
  }

  for (const section of data.sections || []) {
    const sectionNode: GraphNode = {
      id: section.id,
      type: "section" as NodeType,
      label: section.title || section.id,
      radius: config.nodeSize * NODE_SIZES.section,
      color: NODE_COLORS.section,
      pageRank:
        section.importance !== undefined
          ? section.importance
          : totalSections > 0
          ? 1 / totalSections
          : 0,
      clusterId: section.clusterId,
      level: section.level,
      metadata: {
        path: section.path,
        title: section.title,
        headingPath: section.headingPath,
        docId: section.docId,
      },
    };
    nodes.push(sectionNode);
  }

  for (const concept of data.concepts || []) {
    nodes.push({
      id: concept.id || concept.name,
      type: "concept" as NodeType,
      label: concept.name || concept.id || "Unnamed Concept",
      radius: config.nodeSize * NODE_SIZES.concept,
      color: NODE_COLORS.concept,
      pageRank:
        concept.importance !== undefined
          ? concept.importance
          : totalConcepts > 0
          ? 1 / totalConcepts
          : 0,
      level: concept.level,
      metadata: {
        name: concept.name,
        type: concept.type,
        relatedConcepts: concept.relatedConcepts,
      },
    });
  }

  for (const edge of data.edges || []) {
    const weight = edge.weight ?? 1;
    const normalizedWeight =
      MAX_SAFE_FLOATING_POINT > 0 ? weight / MAX_SAFE_FLOATING_POINT : 1;
    links.push({
      source: edge.source,
      target: edge.target,
      type: edge.type || "related",
      weight,
      thickness:
        config.edgeThickness * Math.max(0.5, normalizedWeight),
      color: edge.color || "rgba(100, 116, 139, 0.4)",
    });
  }

  const maxNodes = config.maxNodes;
  const maxEdges = config.maxEdges;

  if (nodes.length > maxNodes) {
    nodes.sort((a, b) => b.pageRank - a.pageRank);
    const prunedIds = new Set(nodes.slice(0, maxNodes).map((n) => n.id));
    nodes.length = maxNodes;
    const prunedLinks = links.filter(
      (l) =>
        prunedIds.has(typeof l.source === "string" ? l.source : l.source.id) &&
        prunedIds.has(typeof l.target === "string" ? l.target : l.target.id)
    );
    links.length = Math.min(prunedLinks.length, maxEdges);
  } else {
    links.length = Math.min(links.length, maxEdges);
  }

  computePageRank(nodes, links);

  return { nodes, links };
}

export function transformSectionIndex(data: SectionIndex): {
  nodes: GraphNode[];
  links: GraphLink[];
} {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  for (const section of data.sections || []) {
    nodes.push({
      id: section.id,
      type: "section" as NodeType,
      label: section.title || section.id,
      radius: 8,
      color: NODE_COLORS.section,
      pageRank: 1 / (data.sections.length || 1),
      level: section.level,
      metadata: {
        path: section.path,
        title: section.title,
        headingPath: section.headingPath,
        docId: section.docId,
      },
    });
  }

  for (const section of data.sections || []) {
    if (section.parentId) {
      links.push({
        source: section.id,
        target: section.parentId,
        type: "childOf",
        weight: 3,
        thickness: 1.5,
        color: "rgba(16, 185, 129, 0.3)",
      });
    }
    for (const childId of section.childIds || []) {
      links.push({
        source: section.id,
        target: childId,
        type: "childOf",
        weight: 3,
        thickness: 1.5,
        color: "rgba(16, 185, 129, 0.3)",
      });
    }
  }

  return { nodes, links };
}

export function transformConceptIndex(data: ConceptIndex): {
  nodes: GraphNode[];
  links: GraphLink[];
} {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  const totalFreq =
    (data.concepts || []).reduce((sum, c) => sum + (c.frequency || 0), 0) || 1;

  for (const concept of data.concepts || []) {
    nodes.push({
      id: concept.id || concept.name,
      type: "concept" as NodeType,
      label: concept.name || concept.id || "Unnamed Concept",
      radius: 8 + (concept.frequency || 0) / totalFreq * 20,
      color: NODE_COLORS.concept,
      pageRank: (concept.frequency || 0) / totalFreq,
      metadata: {
        name: concept.name,
        type: concept.type,
        relatedConcepts: concept.relatedConcepts,
      },
    });
  }

  for (const concept of data.concepts || []) {
    for (const relatedId of concept.relatedConcepts || []) {
      links.push({
        source: concept.id || concept.name,
        target: relatedId,
        type: "relatedTo",
        weight: 2,
        thickness: 1.2,
        color: "rgba(139, 92, 246, 0.3)",
      });
    }
  }

  return { nodes, links };
}

export function transformClusterIndex(
  data: ClusterIndex,
  existingNodes: GraphNode[]
): { clusters: GraphCluster[] } {
  const clusters: GraphCluster[] = [];

  for (let i = 0; i < (data.clusters || []).length; i++) {
    const cluster = data.clusters![i];
    if (cluster === undefined) continue;

    const clusterLabel = cluster.label || cluster.id || `Cluster ${i}`;
    const memberIds = cluster.members || [];

    clusters.push({
      id: i,
      label: clusterLabel,
      color: "#ef4444",
      members: memberIds,
      centroid: { x: 0, y: 0 },
      radius: 60 + memberIds.length * 0.5,
      topTerms: cluster.topTerms || [],
    });
  }

  return { clusters };
}

function computePageRank(
  nodes: GraphNode[],
  links: GraphLink[]
): void {
  const nodeMap = new Map<string, GraphNode>();
  const adjacency: Map<string, string[]> = new Map();
  const incoming: Map<string, string[]> = new Map();

  for (const node of nodes) {
    nodeMap.set(node.id, node);
    adjacency.set(node.id, []);
    incoming.set(node.id, []);
    node.pageRank = 1 / nodes.length;
  }

  for (const link of links) {
    const sourceId = typeof link.source === "string" ? link.source : link.source.id;
    const targetId = typeof link.target === "string" ? link.target : link.target.id;
    if (nodeMap.has(sourceId) && nodeMap.has(targetId)) {
      adjacency.get(sourceId)!.push(targetId);
      incoming.get(targetId)!.push(sourceId);
    }
  }

  const damping = 0.85;
  const iterations = 20;

  for (let iter = 0; iter < iterations; iter++) {
    const newRanks = new Map<string, number>();
    for (const [nodeId] of nodeMap) {
      newRanks.set(nodeId, (1 - damping) / nodes.length);
    }

    for (const [sourceId, targets] of adjacency) {
      if (targets.length === 0) continue;
      const rank = nodeMap.get(sourceId)!.pageRank;
      for (const targetId of targets) {
        newRanks.set(
          targetId,
          newRanks.get(targetId)! + rank / targets.length
        );
      }
    }

    for (const [nodeId, pr] of newRanks) {
      nodeMap.get(nodeId)!.pageRank = pr;
    }
  }
}
