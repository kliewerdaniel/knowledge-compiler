"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Network,
  Filter,
  ZoomIn,
  ZoomOut,
  Maximize,
  Info,
  Search,
  Hash,
  Target,
  TrendingUp,
  Activity,
  Link,
  Layers,
  X,
} from "lucide-react";
import { GraphView } from "@/components/GraphView";
import { NodeTooltip } from "@/components/NodeTooltip";
import { Skeleton } from "@/components/LoadingSkeleton";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GraphNode {
  id: string;
  title: string;
  type: string;
  importance?: number;
  frequency?: number;
  cluster?: string;
  description?: string;
  level?: number;
  starred?: boolean;
}

interface GraphLink {
  source: string;
  target: string;
  importance?: number;
  type?: string;
}

interface ClusterBar {
  cluster: string | undefined;
  count: number;
  color: string;
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

const CLUSTER_COLORS = [
  "#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444",
  "#ec4899", "#06b6d4", "#f97316", "#14b8a6", "#a855f7",
  "#6366f1", "#10b981", "#eab308", "#f43f5e", "#84cc16",
  "#0ea5e9", "#d946ef", "#2dd4bf", "#fb923c", "#a3e635",
];

function getClusterColor(cluster: string | undefined): string {
  if (!cluster) return "#64748b";
  let hash = 0;
  for (let i = 0; i < cluster.length; i++) {
    hash = (hash << 5) - hash + cluster.charCodeAt(i);
    hash |= 0;
  }
  return CLUSTER_COLORS[Math.abs(hash) % CLUSTER_COLORS.length];
}

function computeDensity(nodeCount: number, edgeCount: number): number {
  if (nodeCount < 2) return 0;
  return (edgeCount / (nodeCount * (nodeCount - 1) / 2)) * 100;
}

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.25 },
  }),
};

export default function GraphPage() {
  const graph = useStore((s) => s.graph);
  const concepts = useStore((s) => s.concepts);
  const clusters = useStore((s) => s.clusters);
  const sections = useStore((s) => s.sections);
  const filters = useStore((s) => s.filters);
  const setSelectedNode = useStore((s) => s.setSelectedNode);
  const setFilterNodeTypes = useStore((s) => s.setFilterNodeTypes);
  const setFilterClusters = useStore((s) => s.setFilterClusters);

  const [loading, setLoading] = useState(true);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipNode, setTooltipNode] = useState<GraphNode | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchFocused) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSelectedNode(null);
        setSearchInput("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchFocused]);

  const { nodes, links, clusterDistribution, topConcepts, density, stats } = useMemo(() => {
    if (!graph) {
      return {
        nodes: [],
        links: [],
        clusterDistribution: [],
        topConcepts: [],
        density: 0,
        stats: { docCount: 0, conceptCount: 0, sectionCount: 0, totalEdges: 0 },
      };
    }

    const graphNodes: GraphNode[] = [];
    const graphLinks: GraphLink[] = [];

    const docs = Array.isArray(graph.documents) ? graph.documents : [];

    // DOCUMENTS: top 50 by importance
    const sortedDocs = [...docs].sort(
      (a: any, b: any) => (b.importance || 0) - (a.importance || 0)
    );
    const topDocs = sortedDocs.slice(0, 50);

    topDocs.forEach((doc: any, i: number) => {
      graphNodes.push({
        id: `doc-${i}`,
        title: doc.title || doc.name || `Document ${i + 1}`,
        type: "document",
        importance: doc.importance || 0.5,
        cluster: doc.clusterId,
      });
    });

    // CONCEPTS: top 100 by frequency, centrality-based sizing
    // radius = Math.sqrt(frequency) * 1.5; GraphView renders (importance||freq)*2
    // so importance = sqrt(frequency) * 0.75
    const sortedConcepts = [...concepts].sort(
      (a: any, b: any) => (b.frequency || 0) - (a.frequency || 0)
    );
    const topConceptIds = new Set(
      sortedConcepts.slice(0, 100).map((c: any) => c.id)
    );

    const conceptById = new Map<string, any>();
    concepts.forEach((c: any) => conceptById.set(c.id, c));

    const topConceptsForGraph = sortedConcepts.slice(0, 100);

    topConceptsForGraph.forEach((c: any) => {
      const freq = c.frequency || 1;
      const sqrtFreq = Math.sqrt(freq);
      const importance = sqrtFreq * 0.75;
      const relatedCount = c.relatedConcepts?.length || 0;

      graphNodes.push({
        id: `concept-${c.id}`,
        title: c.name || c.id,
        type: "concept",
        importance,
        frequency: freq,
        cluster: c.clusterId,
        description: c.description,
        starred: relatedCount > 0,
      });
    });

    // SECTIONS: top 150 by level
    const sortedSections = [...sections].sort(
      (a: any, b: any) => (b.level || 0) - (a.level || 0)
    );
    const topSections = sortedSections.slice(0, 150);

    topSections.forEach((s: any) => {
      const level = s.level || 0;
      graphNodes.push({
        id: `section-${s.id || s.docId}-${s.title || "section"}`,
        title: s.title || `Section ${s.id}`,
        type: "section",
        importance: 0.1 + level * 0.1,
        cluster: s.clusterId,
        level,
      });
    });

    // Cap at 300
    const finalNodes = graphNodes.slice(0, 300);
    const nodeIdSet = new Set(finalNodes.map((n) => n.id));

    // EDGES from graph data
    if (Array.isArray(graph.edges)) {
      graph.edges.forEach((edge: any) => {
        const sourceId = edge.source || edge.from || "";
        const targetId = edge.target || edge.to || "";
        if (nodeIdSet.has(sourceId) && nodeIdSet.has(targetId)) {
          const sourceNode = finalNodes.find((n) => n.id === sourceId);
          const targetNode = finalNodes.find((n) => n.id === targetId);
          const sourceType = sourceNode?.type || "";
          const targetType = targetNode?.type || "";

          let edgeType: string;
          if (sourceType === "concept" && targetType === "concept") {
            edgeType = "related";
          } else if (
            (sourceType === "document" && targetType === "concept") ||
            (sourceType === "concept" && targetType === "document")
          ) {
            edgeType = "document-concept";
          } else if (
            (sourceType === "document" && targetType === "section") ||
            (sourceType === "section" && targetType === "document")
          ) {
            edgeType = "document-section";
          } else {
            edgeType = "other";
          }

          graphLinks.push({
            source: sourceId,
            target: targetId,
            importance: edge.importance || edge.weight || 0.5,
            type: edgeType,
          });
        }
      });
    }

    // Concept-concept related edges
    concepts.forEach((c: any) => {
      if (!c.relatedConcepts || c.relatedConcepts.length === 0) return;
      const sourceId = `concept-${c.id}`;
      if (!nodeIdSet.has(sourceId)) return;

      c.relatedConcepts.forEach((relatedId: string) => {
        const targetId = `concept-${relatedId}`;
        if (nodeIdSet.has(targetId)) {
          graphLinks.push({
            source: sourceId,
            target: targetId,
            importance: 0.5,
            type: "related",
          });
        }
      });
    });

    // CLUSTER DISTRIBUTION
    const clusterCounts = new Map<string, number>();
    finalNodes.forEach((n) => {
      const key = n.cluster || "Uncategorized";
      clusterCounts.set(key, (clusterCounts.get(key) || 0) + 1);
    });
    const clusterDistribution: ClusterBar[] = Array.from(clusterCounts.entries())
      .map(([cluster, count]) => ({
        cluster: cluster === "Uncategorized" ? undefined : cluster,
        count,
        color: getClusterColor(cluster === "Uncategorized" ? undefined : cluster),
      }))
      .sort((a, b) => b.count - a.count);

    // TOP CONCEPTS BY CONNECTEDNESS
    const conceptNodes = finalNodes.filter((n) => n.type === "concept");
    const topConnected = conceptNodes
      .map((n) => {
        const relatedEdges = graphLinks.filter(
          (l) =>
            l.type === "related" &&
            (l.source === n.id || l.target === n.id)
        );
        const rawConcept = conceptById.get(n.id.replace("concept-", ""));
        const rawRelatedCount = rawConcept?.relatedConcepts?.length || 0;
        return {
          ...n,
          connectionCount: relatedEdges.length || rawRelatedCount,
          relatedConceptsCount: rawRelatedCount,
        };
      })
      .sort((a, b) => b.connectionCount - a.connectionCount)
      .slice(0, 10);

    const docCount = topDocs.length;
    const conceptCount = topConnected.length;
    const sectionCount = finalNodes.filter((n) => n.type === "section").length;

    return {
      nodes: finalNodes,
      links: graphLinks,
      clusterDistribution,
      topConcepts: topConnected,
      density: computeDensity(finalNodes.length, graphLinks.length),
      stats: { docCount, conceptCount, sectionCount, totalEdges: graphLinks.length },
    };
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
    let filtered = nodes;

    if (filters.nodeTypes.length > 0) {
      filtered = filtered.filter((n) => filters.nodeTypes.includes(n.type));
    }

    if (filters.clusters.length > 0) {
      filtered = filtered.filter(
        (n) => !n.cluster || filters.clusters.includes(n.cluster)
      );
    }

    if (searchInput.trim()) {
      const query = searchInput.toLowerCase();
      filtered = filtered.filter((n) => n.title.toLowerCase().includes(query));
    }

    return filtered;
  }, [nodes, filters, searchInput]);

  const filteredLinks = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    return links.filter((l) => nodeIds.has(l.source) && nodeIds.has(l.target));
  }, [links, filteredNodes]);

  const handleNodeHover = useCallback(
    (node: GraphNode | null) => {
      if (node) {
        setTooltipNode(node);
        setTooltipVisible(true);
      } else {
        setTooltipVisible(false);
      }
    },
    []
  );

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const totalNodes = filteredNodes.length;
  const totalEdges = filteredLinks.length;
  const avgDegree = totalNodes > 0 ? ((totalEdges * 2) / totalNodes).toFixed(1) : "0";
  const maxClusterCount = clusterDistribution[0]?.count || 1;

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)] m-3 lg:m-4 gap-4">
        <div className="flex-1 card overflow-hidden">
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="flex items-center gap-2 mb-6">
              <Network className="w-6 h-6 text-[var(--color-primary)]" />
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                Knowledge Graph
              </h1>
            </div>
            <div className="w-full h-[500px] flex items-center justify-center">
              <Skeleton type="rect" className="w-full h-full rounded-xl" />
            </div>
          </div>
        </div>
        <div className="w-72 card flex-shrink-0 overflow-y-auto p-4 space-y-4">
          <Skeleton type="text" count={3} />
          <div className="space-y-2">
            <Skeleton type="text" count={5} />
          </div>
          <Skeleton type="text" count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)] m-3 lg:m-4 gap-4">
      {/* Main graph area */}
      <div className="flex-1 card overflow-hidden relative">
        {totalNodes === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text-muted)]">
            <Network className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No graph data available</p>
            <p className="text-sm mt-2">
              Compile knowledge to visualize the graph.
            </p>
          </div>
        ) : (
          <GraphView
            nodes={filteredNodes}
            links={filteredLinks}
            config={{
              linkDistance: 120,
              chargeStrength: -400,
              collisionPadding: 6,
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
                  style={{
                    backgroundColor: TYPE_COLORS[type] || TYPE_COLORS.default,
                  }}
                />
                <span className="text-[var(--text-secondary)]">
                  {TYPE_LABELS[type] || type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Node/edge count */}
        <div className="absolute top-4 right-4 bg-[var(--card-bg)]/90 backdrop-blur-sm border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-[var(--text-secondary)] flex items-center gap-2">
          <Activity className="w-3 h-3" />
          <span>{totalNodes} nodes</span>
          <span className="text-[var(--border-color)]">·</span>
          <span>{totalEdges} edges</span>
        </div>

        {/* Reset View button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setSelectedNode(null);
            setSearchInput("");
            setFilterNodeTypes([]);
            setFilterClusters([]);
          }}
          className="absolute top-4 left-4 bg-[var(--card-bg)]/90 backdrop-blur-sm"
          title="Reset View (Escape)"
        >
          <Maximize className="w-4 h-4" />
        </Button>

        {/* Edge type legend */}
        <div className="absolute bottom-4 right-4 bg-[var(--card-bg)]/90 backdrop-blur-sm border border-[var(--border-color)] rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-1">
              <div className="w-5 h-0.5 bg-[var(--text-muted)] rounded" />
              <span>related</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-5 h-0.5 bg-[var(--text-muted)] rounded" />
              <span>doc-concept</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className="w-5 h-0.5 border-t border-dashed border-[var(--text-muted)]"
                style={{ borderBottom: "none" }}
              />
              <span>doc-section</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <motion.div
        className="w-72 card flex-shrink-0 overflow-y-auto"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--color-primary)]" />
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              Graph Insights
            </h2>
          </div>

          {/* Graph Statistics */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs flex items-center gap-1.5">
                  <Hash className="w-3 h-3" />
                  Graph Statistics
                </CardTitle>
                <CardDescription className="text-[10px]">
                  From current view
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[var(--bg-tertiary)] rounded-md p-2">
                    <div className="text-[var(--text-muted)]">Nodes</div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">
                      {totalNodes}
                    </div>
                  </div>
                  <div className="bg-[var(--bg-tertiary)] rounded-md p-2">
                    <div className="text-[var(--text-muted)]">Edges</div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">
                      {totalEdges}
                    </div>
                  </div>
                  <div className="bg-[var(--bg-tertiary)] rounded-md p-2">
                    <div className="text-[var(--text-muted)]">Density</div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">
                      {density.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-[var(--bg-tertiary)] rounded-md p-2">
                    <div className="text-[var(--text-muted)]">Avg Degree</div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">
                      {avgDegree}
                    </div>
                  </div>
                </div>
                {stats.totalEdges > 0 && (
                  <div className="mt-2 pt-2 border-t border-[var(--border-color)]">
                    <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                      <span>Edge types</span>
                      <span className="flex items-center gap-1">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full",
                            stats.totalEdges > 50
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          )}
                        />
                        {density > 5
                          ? "Dense"
                          : density > 1
                            ? "Moderate"
                            : "Sparse"}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Cluster Distribution */}
          {clusterDistribution.length > 0 && (
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs flex items-center gap-1.5">
                    <Layers className="w-3 h-3" />
                    Cluster Distribution
                  </CardTitle>
                  <CardDescription className="text-[10px]">
                    {clusterDistribution.length} clusters
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1.5">
                    {clusterDistribution.slice(0, 10).map(({ cluster, count, color }) => (
                      <div
                        key={cluster ?? "uncategorized"}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[var(--text-secondary)] flex-1 truncate">
                          {cluster || "Uncategorized"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${(count / maxClusterCount) * 100}%`,
                                backgroundColor: color,
                              }}
                            />
                          </div>
                          <span className="text-[var(--text-muted)] text-[10px] w-4 text-right tabular-nums">
                            {count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Most Connected Concepts */}
          {topConcepts.length > 0 && (
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs flex items-center gap-1.5">
                    <Target className="w-3 h-3" />
                    Most Connected
                  </CardTitle>
                  <CardDescription className="text-[10px]">
                    Top concepts by connections
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {topConcepts.map((c, i) => (
                      <div
                        key={c.id}
                        className={cn(
                          "flex items-center justify-between text-xs rounded-md px-1.5 py-1.5 group transition-colors",
                          "hover:bg-[var(--hover-bg)] cursor-pointer"
                        )}
                        onClick={() => setSelectedNode(c.id)}
                      >
                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                          {i < 3 && (
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor:
                                  i === 0
                                    ? "#f59e0b"
                                    : i === 1
                                      ? "#94a3b8"
                                      : "#cd7f32",
                              }}
                            />
                          )}
                          {c.starred && (
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          )}
                          <span className="text-[var(--text-secondary)] truncate">
                            {c.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                          <Link className="w-3 h-3 text-[var(--text-muted)]" />
                          <span className="text-[var(--text-primary)] font-medium tabular-nums">
                            {c.connectionCount || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Separator */}
          <div className="border-t border-[var(--border-color)]" />

          {/* Filters */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Network className="w-3 h-3" />
                Node Types
              </h3>
              <div className="space-y-1.5">
                {nodeTypes.map((type) => {
                  const count = filteredNodes.filter(
                    (n) => n.type === type
                  ).length;
                  const total = nodes.filter((n) => n.type === type).length;
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-[var(--text-primary)] group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.nodeTypes.includes(type)}
                        onChange={() =>
                          useStore.getState().toggleFilterNodeType(type)
                        }
                        className="rounded border-[var(--border-color)]"
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
                      <Badge variant="secondary" className="text-[10px]">
                        {count}/{total}
                      </Badge>
                    </label>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Cluster Filter */}
          {clusterList.length > 0 && (
            <motion.div
              custom={4}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div>
                <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3 h-3" />
                  Clusters
                </h3>
                <div className="space-y-1">
                  {clusterList.map((cluster) => {
                    const count = filteredNodes.filter(
                      (n) => n.cluster === cluster
                    ).length;
                    const total = nodes.filter(
                      (n) => n.cluster === cluster
                    ).length;
                    const color = getClusterColor(cluster);
                    return (
                      <label
                        key={cluster}
                        className="flex items-center gap-2 text-sm cursor-pointer hover:text-[var(--text-primary)] group"
                      >
                        <input
                          type="checkbox"
                          checked={filters.clusters.includes(cluster)}
                          onChange={() =>
                            useStore.getState().toggleFilterCluster(cluster)
                          }
                          className="rounded border-[var(--border-color)]"
                        />
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[var(--text-secondary)] flex-1 truncate">
                          {cluster || "Uncategorized"}
                        </span>
                        <span className="text-[var(--text-muted)] text-xs tabular-nums">
                          {count}/{total}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Search */}
          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              <Search
                className={cn(
                  "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-colors",
                  searchFocused
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--text-muted)]"
                )}
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search nodes... (/)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={cn(
                  "w-full pl-9 pr-8 py-1.5 text-xs bg-[var(--bg-tertiary)] border rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 transition-all",
                  searchFocused
                    ? "border-[var(--color-primary)] ring-[var(--color-primary)]/20"
                    : "border-[var(--border-color)]"
                )}
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              {searchInput && (
                <div className="absolute -bottom-5 left-0 text-[10px] text-[var(--text-muted)]">
                  {totalNodes === 0
                    ? "No matches"
                    : `${totalNodes} match${totalNodes !== 1 ? "es" : ""}`}
                </div>
              )}
            </div>
          </motion.div>

          {/* Selected Node Info */}
          {useStore.getState().selectedNode && (
            <motion.div
              custom={6}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="border-t border-[var(--border-color)] pt-3">
                <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info className="w-3 h-3" />
                  Selected Node
                </h3>
                {(() => {
                  const selId = useStore.getState().selectedNode;
                  const node = nodes.find((n) => n.id === selId);
                  if (!node) return null;
                  return (
                    <div>
                      <div className="text-sm font-medium text-[var(--text-primary)]">
                        {node.title}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge
                          variant="secondary"
                          className="text-[10px]"
                          style={{
                            backgroundColor:
                              TYPE_COLORS[node.type] || TYPE_COLORS.default + "20",
                            color: TYPE_COLORS[node.type] || TYPE_COLORS.default,
                          }}
                        >
                          {TYPE_LABELS[node.type] || node.type}
                        </Badge>
                        {node.cluster && (
                          <Badge
                            variant="outline"
                            className="text-[10px]"
                            style={{ borderColor: getClusterColor(node.cluster) }}
                          >
                            {node.cluster}
                          </Badge>
                        )}
                      </div>
                      {node.description && (
                        <p className="text-[11px] text-[var(--text-secondary)] mt-2 line-clamp-3">
                          {node.description}
                        </p>
                      )}
                      <div className="mt-2 text-[10px] text-[var(--text-muted)] font-mono">
                        {node.id}
                      </div>
                      <button
                        onClick={() => setSelectedNode(null)}
                        className="mt-2 text-xs text-[var(--color-primary)] hover:underline"
                      >
                        Clear selection
                      </button>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Tooltip */}
      <NodeTooltip
        node={tooltipNode}
        position={tooltipPosition}
        visible={tooltipVisible}
      />
    </div>
  );
}
