import * as d3 from "d3";
import type { GraphNode, GraphLink, GraphCluster, VisualizationConfig } from "../types.js";

export interface SimulationResult {
  nodes: GraphNode[];
  links: GraphLink[];
  clusters?: GraphCluster[];
}

export function forceLayout(
  nodes: GraphNode[],
  links: GraphLink[],
  config: VisualizationConfig,
  width: number,
  height: number
): SimulationResult {
  const simulation = d3
    .forceSimulation<GraphNode>(nodes as GraphNode[])
    .force(
      "link",
      d3
        .forceLink<GraphNode, GraphLink>(links as GraphLink[])
        .id((d) => d.id)
        .distance((link) => {
          const baseDistance = 120;
          return baseDistance / (link.weight || 1) * config.animationSpeed;
        })
        .strength(0.3)
    )
    .force(
      "charge",
      d3.forceManyBody<GraphNode>().distanceMax(300).strength(-80)
    )
    .force(
      "center",
      d3.forceCenter(width / 2, height / 2)
    )
    .force(
      "collision",
      d3.forceCollide<GraphNode>().radius((d) => d.radius + 4)
    )
    .force(
      "x",
      d3.forceX(width / 2).strength(0.05)
    )
    .force(
      "y",
      d3.forceY(height / 2).strength(0.05)
    )
    .alphaDecay(0.01 * config.animationSpeed);

  simulation.stop();

  return { nodes: nodes as GraphNode[], links: links as GraphLink[] };
}

export function hierarchicalLayout(
  nodes: GraphNode[],
  links: GraphLink[],
  config: VisualizationConfig,
  width: number,
  height: number
): SimulationResult {
  const hierarchy = d3.hierarchy(
    {
      id: "root",
      type: "concept" as const,
      label: "Root",
      radius: 0,
      color: "",
      pageRank: 1,
      level: 0,
      children: buildHierarchy(nodes, links),
    } as any,
    (d: any) => d.children
  );

  const treeLayout = d3.tree<any>().size([width - 80, height - 160]);
  const rooted = treeLayout(hierarchy);

  const layoutNodes: GraphNode[] = [];
  const layoutLinks: GraphLink[] = [];

  function walk(node: d3.HierarchyPointNode<any>): void {
    const data = node.data;
    if (data && data.id) {
      const existing = nodes.find((n) => n.id === data.id);
      if (existing) {
        const mapped = {
          ...existing,
          x: node.x + 40,
          y: node.y + 40,
        };
        layoutNodes.push(mapped);
      }
    }
    for (const child of node.children || []) {
      walk(child);
    }
  }

  walk(rooted);

  for (const node of rooted.descendants()) {
    if (node.parent) {
      const sourceId = node.parent.data.id;
      const targetId = node.data.id;
      layoutLinks.push({
        source: sourceId,
        target: targetId,
        type: "hierarchy",
        weight: 1,
        thickness: config.edgeThickness * 0.8,
        color: "rgba(100, 116, 139, 0.3)",
      });
    }
  }

  return { nodes: layoutNodes, links: layoutLinks };
}

function buildHierarchy(
  nodes: GraphNode[],
  links: GraphLink[]
): any[] {
  const nodeMap = new Map<string, any>();
  const childrenMap = new Map<string, string[]>();

  for (const node of nodes) {
    nodeMap.set(node.id, { id: node.id, children: [] });
    childrenMap.set(node.id, []);
  }

  for (const link of links) {
    const sourceId = typeof link.source === "string" ? link.source : link.source.id;
    const targetId = typeof link.target === "string" ? link.target : link.target.id;
    if (nodeMap.has(sourceId) && nodeMap.has(targetId)) {
      childrenMap.get(sourceId)!.push(targetId);
    }
  }

  for (const [id, children] of childrenMap) {
    const node = nodeMap.get(id);
    if (node) {
      node.children = children.map((childId) => nodeMap.get(childId)).filter(Boolean);
    }
  }

  return Array.from(nodeMap.values()).filter((n) => n.children.length > 0 || !links.some((l) => {
    const s = typeof l.source === "string" ? l.source : l.source.id;
    return s === n.id;
  }));
}

export function radialLayout(
  nodes: GraphNode[],
  links: GraphLink[],
  config: VisualizationConfig,
  width: number,
  height: number
): SimulationResult {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.4;

  for (let i = 0; i < nodes.length; i++) {
    const angle = (2 * Math.PI * i) / nodes.length;
    nodes[i].x = centerX + radius * Math.cos(angle);
    nodes[i].y = centerY + radius * Math.sin(angle);
  }

  for (const link of links) {
    const sourceNode =
      typeof link.source === "string"
        ? nodes.find((n) => n.id === link.source)
        : nodes.find((n) => n.id === (link.source as any).id);
    const targetNode =
      typeof link.target === "string"
        ? nodes.find((n) => n.id === link.target)
        : nodes.find((n) => n.id === (link.target as any).id);

    if (sourceNode && targetNode) {
      const midX = (sourceNode.x! + targetNode.x!) / 2;
      const midY = (sourceNode.y! + targetNode.y!) / 2;
      link.thickness = config.edgeThickness;
    }
  }

  return { nodes, links };
}

export function springLayout(
  nodes: GraphNode[],
  links: GraphLink[],
  config: VisualizationConfig,
  width: number,
  height: number
): SimulationResult {
  const springLinks = links
    .filter((link) => {
      const sourceNode =
        typeof link.source === "string"
          ? nodes.find((n) => n.id === link.source)
          : nodes.find((n) => n.id === (link.source as any).id);
      return sourceNode && nodeInBounds(sourceNode, width, height);
    })
    .map((link) => {
      const sourceNode =
        typeof link.source === "string"
          ? nodes.find((n) => n.id === link.source)
          : nodes.find((n) => n.id === (link.source as any).id);
      return {
        ...link,
        source: sourceNode || link.source,
        target:
          typeof link.target === "string"
            ? nodes.find((n) => n.id === link.target) || link.target
            : nodes.find((n) => n.id === (link.target as any).id) || link.target,
      };
    });

  const simulation = d3
    .forceSimulation<GraphNode>(nodes as GraphNode[])
    .force(
      "link",
      d3
        .forceLink<GraphNode, any>(springLinks)
        .id((d) => d.id)
        .distance(100)
        .strength(0.8)
    )
    .force(
      "charge",
      d3.forceManyBody<GraphNode>().strength(-50)
    )
    .force(
      "center",
      d3.forceCenter(width / 2, height / 2)
    )
    .force(
      "collision",
      d3.forceCollide<GraphNode>().radius((d) => d.radius + 3)
    )
    .alphaDecay(0.015 * config.animationSpeed);

  simulation.stop();

  return { nodes, links };
}

function nodeInBounds(node: GraphNode, width: number, height: number): boolean {
  return (
    (node.x !== undefined && node.x >= 0 && node.x <= width) ||
    (node.y !== undefined && node.y >= 0 && node.y <= height)
  );
}

export function computeClusterCentroids(
  nodes: GraphNode[],
  clusters: GraphCluster[]
): void {
  for (const cluster of clusters) {
    const memberNodes = nodes.filter((n) =>
      cluster.members.includes(n.id)
    );
    if (memberNodes.length === 0) continue;

    const avgX =
      memberNodes.reduce((sum, n) => sum + (n.x || 0), 0) /
      memberNodes.length;
    const avgY =
      memberNodes.reduce((sum, n) => sum + (n.y || 0), 0) /
      memberNodes.length;

    cluster.centroid = { x: avgX, y: avgY };
  }
}
