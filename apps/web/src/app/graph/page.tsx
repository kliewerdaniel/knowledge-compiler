"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import * as d3 from "d3";
import {
  Network,
  Filter,
  ZoomIn,
  ZoomOut,
  Maximize,
  Info,
} from "lucide-react";
import { GraphView } from "@/components/GraphView";
import { NodeTooltip } from "@/components/NodeTooltip";
import { Skeleton } from "@/components/LoadingSkeleton";
import { useStore } from "@/lib/store";

interface GraphNode {
  id: string;
  title: string;
  type: string;
  importance?: number;
  frequency?: number;
  cluster?: string;
  description?: string;
}

interface GraphLink {
  source: string;
  target: string;
  importance?: number;
  type?: string;
}

const TYPE_LABELS: Record<string, string> = {
  document: "Document",
  section: "Section",
  concept: "Concept",
};

const TYPE_COLORS: Record<string, string> = {
  document: "#3b82f6",
  section: "#8b5cf6",
  concept: "#22c55e",
  default: "#64748b",
};

export default function GraphPage() {
  const graph = useStore((s) => s.graph);
  const concepts = useStore((s) => s.concepts);
  const clusters = useStore((s) => s.clusters);
  const sections = useStore((s) => s.sections);
  const selectedNode = useStore((s) => s.selectedNode);
  const hoveredNode = useStore((s) => s.hoveredNode);
  const filters = useStore((s) => s.filters);

  const [loading, setLoading] = useState(true);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipNode, setTooltipNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const { nodes, links } = useMemo(() => {
    if (!graph) return { nodes: [], links: [] };

    const graphNodes: GraphNode[] = [];
    const graphLinks: GraphLink[] = [];

    // Add document nodes
    if (Array.isArray(graph.documents)) {
      graph.documents.forEach((doc: any, i: number) => {
        graphNodes.push({
          id: `doc-${i}`,
          title: doc.title || doc.name || `Document ${i + 1}`,
          type: "document",
          importance: doc.importance || 0.5,
          cluster: doc.clusterId,
        });
      });
    }

    // Add concept nodes
    concepts.forEach((c) => {
      graphNodes.push({
        id: `concept-${c.id}`,
        title: c.name || c.id,
        type: "concept",
        importance: c.frequency ? c.frequency / 100 : 0.5,
        frequency: c.frequency,
        cluster: c.clusterId,
        description: c.description,
      });
    });

    // Add section nodes
    sections.forEach((s) => {
      graphNodes.push({
        id: `section-${s.id || s.docId}-${s.title || "section"}`,
        title: s.title || `Section ${s.id}`,
        type: "section",
        importance: 0.3,
        cluster: s.clusterId,
      });
    });

    // Add edges from graph data
    if (Array.isArray(graph.edges)) {
      graph.edges.forEach((edge: any) => {
        graphLinks.push({
          source: edge.source || edge.from || "",
          target: edge.target || edge.to || "",
          importance: edge.importance || edge.weight || 0.5,
          type: edge.type,
        });
      });
    }

    // Add concept-concept links
    concepts.forEach((c) => {
      if (c.relatedConcepts && c.relatedConcepts.length > 0) {
        c.relatedConcepts.forEach((relatedId: string) => {
          graphLinks.push({
            source: `concept-${c.id}`,
            target: `concept-${relatedId}`,
            importance: 0.5,
            type: "related",
          });
        });
      }
    });

    return { nodes: graphNodes, links: graphLinks };
  }, [graph, concepts, sections]);

  const nodeTypes = useMemo(() => {
    const types = new Set(nodes.map((n) => n.type));
    return Array.from(types);
  }, [nodes]);

  const clusterList = useMemo(() => {
    const clusterSet = new Set(nodes.map((n) => n.cluster).filter(Boolean));
    return Array.from(clusterSet);
  }, [nodes]);

  const filteredNodes = useMemo(() => {
    if (filters.nodeTypes.length === 0 && filters.clusters.length === 0) {
      return nodes;
    }
    return nodes.filter((n) => {
      const typeMatch =
        filters.nodeTypes.length === 0 || filters.nodeTypes.includes(n.type);
      const clusterMatch =
        filters.clusters.length === 0 ||
        !n.cluster ||
        filters.clusters.includes(n.cluster);
      return typeMatch && clusterMatch;
    });
  }, [nodes, filters]);

  const filteredLinks = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    return links.filter(
      (l) => nodeIds.has(typeof l.source === "string" ? l.source : (l.source as any).id) &&
             nodeIds.has(typeof l.target === "string" ? l.target : (l.target as any).id)
    );
  }, [links, filteredNodes]);

  const handleNodeHover = (node: GraphNode | null, event?: React.MouseEvent) => {
    if (node) {
      setTooltipNode(node);
      setTooltipVisible(true);
      if (event) {
        setTooltipPosition({ x: event.clientX, y: event.clientY });
      }
    } else {
      setTooltipVisible(false);
    }
  };

  const handleNodeClick = (node: GraphNode) => {
    useStore.getState().setSelectedNode(node.id);
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Network className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Knowledge Graph
          </h1>
        </div>
        <div className="card h-[600px] flex items-center justify-center">
          <Skeleton type="rect" className="w-full h-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)] m-3 lg:m-4 gap-4">
      {/* Main graph area */}
      <div className="flex-1 card overflow-hidden relative">
        {nodes.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-muted)]">
            <Network className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No graph data available</p>
            <p className="text-sm mt-2">Compile knowledge to visualize the graph.</p>
          </div>
        ) : (
          <GraphView
            nodes={filteredNodes}
            links={filteredLinks}
            config={{
              linkDistance: 100,
              chargeStrength: -300,
              nodeSize: 10,
              enableZoom: true,
              enableDrag: true,
            }}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            className="w-full h-full"
          />
        )}

        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 bg-[var(--card-bg)]/90 backdrop-blur-sm border border-[var(--border-color)] rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs">
            {nodeTypes.map((type) => (
              <div key={type} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: TYPE_COLORS[type] || TYPE_COLORS.default }}
                />
                <span className="text-[var(--text-secondary)]">{TYPE_LABELS[type] || type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Node count */}
        <div className="absolute top-4 right-4 bg-[var(--card-bg)]/90 backdrop-blur-sm border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-[var(--text-secondary)]">
          {filteredNodes.length} nodes · {filteredLinks.length} edges
        </div>
      </div>

      {/* Sidebar filters */}
      <div className="w-64 card flex-shrink-0 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-[var(--color-primary)]" />
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Filters
          </h2>
        </div>

        {/* Node type filter */}
        <div className="mb-6">
          <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Node Types
          </h3>
          <div className="space-y-1.5">
            {nodeTypes.map((type) => {
              const count = nodes.filter((n) => n.type === type).length;
              return (
                <label
                  key={type}
                  className="flex items-center gap-2 text-sm cursor-pointer hover:text-[var(--text-primary)]"
                >
                  <input
                    type="checkbox"
                    checked={filters.nodeTypes.includes(type)}
                    onChange={() =>
                      useStore.getState().toggleFilterNodeType(type)
                    }
                    className="rounded"
                  />
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: TYPE_COLORS[type] || TYPE_COLORS.default,
                    }}
                  />
                  <span className="text-[var(--text-secondary)] flex-1">
                    {TYPE_LABELS[type] || type}
                  </span>
                  <span className="text-[var(--text-muted)] text-xs">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Cluster filter */}
        {clusterList.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Clusters
            </h3>
            <div className="space-y-1.5">
              {clusterList.map((cluster) => {
                const count = nodes.filter((n) => n.cluster === cluster).length;
                return (
                  <label
                    key={cluster}
                    className="flex items-center gap-2 text-sm cursor-pointer hover:text-[var(--text-primary)]"
                  >
                    <input
                      type="checkbox"
                      checked={filters.clusters.includes(cluster)}
                      onChange={() =>
                        useStore.getState().toggleFilterCluster(cluster)
                      }
                      className="rounded"
                    />
                    <span className="text-[var(--text-secondary)] flex-1 truncate">
                      {cluster || "Uncategorized"}
                    </span>
                    <span className="text-[var(--text-muted)] text-xs">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected node info */}
        {selectedNode && (
          <div className="border-t border-[var(--border-color)] pt-4">
            <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Selected
            </h3>
            <div className="text-sm text-[var(--text-secondary)]">
              ID: {selectedNode}
            </div>
            <button
              onClick={() => useStore.getState().setSelectedNode(null)}
              className="mt-2 text-xs text-[var(--color-primary)] hover:underline"
            >
              Clear selection
            </button>
          </div>
        )}

        {/* Zoom controls */}
        <div className="border-t border-[var(--border-color)] pt-4 mt-4">
          <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            View Controls
          </h3>
          <div className="flex gap-2">
            <button
              className="btn btn-ghost p-2"
              title="Zoom In"
              onClick={() => {
                const svg = document.querySelector("svg");
                if (svg) {
                  const svgEl = svg as SVGSVGElement;
                  const zoom = d3.zoomTransform(svgEl);
                  const newZoom = zoom.scale(1.2);
                  d3.select(svgEl)
                    .transition()
                    .duration(300)
                    .call(
                      d3.zoom<SVGSVGElement, unknown>().scaleBy,
                      1.2
                    );
                }
              }}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              className="btn btn-ghost p-2"
              title="Zoom Out"
              onClick={() => {
                const svg = document.querySelector("svg");
                if (svg) {
                  const svgEl = svg as SVGSVGElement;
                  d3.select(svgEl)
                    .transition()
                    .duration(300)
                    .call(
                      d3.zoom<SVGSVGElement, unknown>().scaleBy,
                      0.8
                    );
                }
              }}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              className="btn btn-ghost p-2"
              title="Fit to view"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <NodeTooltip
        node={tooltipNode}
        position={tooltipPosition}
        visible={tooltipVisible}
      />
    </div>
  );
}
