"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Hash,
  TrendingUp,
  Users,
  ChevronRight,
  BarChart3,
  Activity,
  Network,
  Star,
  Flame,
  Map,
  ArrowRight,
  FileStack,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/lib/store";

interface Cluster {
  id: string;
  centroidOffset: number;
  memberCount: number;
  topTerms: string[];
  label?: string;
  members: string[];
  silhouetteScore: number;
}

const CLUSTER_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#06b6d4",
  "#f97316",
  "#14b8a6",
  "#a855f7",
  "#6366f1",
  "#10b981",
  "#f43f5e",
  "#84cc16",
  "#e11d48",
];

function getClusterColor(index: number): string {
  return CLUSTER_COLORS[index % CLUSTER_COLORS.length];
}

function getQualityColor(score: number): string {
  if (score > 0.5) return "#22c55e";
  if (score >= 0.3) return "#eab308";
  return "#ef4444";
}

function getQualityLabel(score: number): "Good" | "Fair" | "Poor" {
  if (score > 0.5) return "Good";
  if (score >= 0.3) return "Fair";
  return "Poor";
}

interface ClusterPair {
  clusterA: Cluster;
  clusterB: Cluster;
  overlap: number;
}

function computeClusterOverlap(a: Cluster, b: Cluster): number {
  if (!a.members || !b.members) return 0;
  const setA = new Set(a.members);
  return b.members.filter((m) => setA.has(m)).length;
}

export default function ClustersPage() {
  const clusters = useStore((s) => s.clusters) as Cluster[];
  const [loading, setLoading] = useState(true);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [sortBy, setSortBy] = useState<"size" | "score" | "name">("size");
  const [expandedMembers, setExpandedMembers] = useState(false);
  const [showAllOverlap, setShowAllOverlap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const sortedClusters = useMemo(() => {
    const sorted = [...clusters];
    switch (sortBy) {
      case "size":
        return sorted.sort((a, b) => b.memberCount - a.memberCount);
      case "score":
        return sorted.sort(
          (a, b) => (b.silhouetteScore || 0) - (a.silhouetteScore || 0)
        );
      case "name":
        return sorted.sort(
          (a, b) => (a.label || a.id).localeCompare(b.label || b.id)
        );
      default:
        return sorted;
    }
  }, [clusters, sortBy]);

  const totalMembers = useMemo(
    () => clusters.reduce((sum, c) => sum + c.memberCount, 0),
    [clusters]
  );

  const avgScore = useMemo(() => {
    if (clusters.length === 0) return 0;
    const sum = clusters.reduce((acc, c) => acc + (c.silhouetteScore || 0), 0);
    return sum / clusters.length;
  }, [clusters]);

  const bestCluster = useMemo(() => {
    if (clusters.length === 0) return null;
    return clusters.reduce((best, c) =>
      (c.silhouetteScore || 0) > (best.silhouetteScore || 0) ? c : best
    );
  }, [clusters]);

  const worstCluster = useMemo(() => {
    if (clusters.length === 0) return null;
    return clusters.reduce((worst, c) =>
      (c.silhouetteScore || 0) < (worst.silhouetteScore || 0) ? c : worst
    );
  }, [clusters]);

  const goodQualityCount = useMemo(
    () => clusters.filter((c) => (c.silhouetteScore || 0) > 0.5).length,
    [clusters]
  );

  const qualityScorePct = useMemo(() => {
    if (clusters.length === 0) return 0;
    return Math.round((goodQualityCount / clusters.length) * 100);
  }, [clusters, goodQualityCount]);

  const clusterPairOverlaps = useMemo(() => {
    const pairs: ClusterPair[] = [];
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        const overlap = computeClusterOverlap(clusters[i], clusters[j]);
        if (overlap > 0) {
          pairs.push({ clusterA: clusters[i], clusterB: clusters[j], overlap });
        }
      }
    }
    return pairs.sort((a, b) => b.overlap - a.overlap);
  }, [clusters]);

  const topPairs = useMemo(
    () => clusterPairOverlaps.slice(0, showAllOverlap ? undefined : 10),
    [clusterPairOverlaps, showAllOverlap]
  );

  const clusterMemberOverlap = useMemo(() => {
    if (!selectedCluster || !selectedCluster.members) return [];
    const selectedSet = new Set(selectedCluster.members);
    const overlaps: { cluster: Cluster; count: number }[] = [];
    for (const c of clusters) {
      if (c.id === selectedCluster.id) continue;
      const count = c.members.filter((m) => selectedSet.has(m)).length;
      if (count > 0) {
        overlaps.push({ cluster: c, count });
      }
    }
    return overlaps.sort((a, b) => b.count - a.count).slice(0, 3);
  }, [clusters, selectedCluster]);

  const maxOverlap = useMemo(
    () => Math.max(...clusterPairOverlaps.map((p) => p.overlap), 1),
    [clusterPairOverlaps]
  );

  const maxMembers = useMemo(
    () => Math.max(...clusters.map((c) => c.memberCount), 1),
    [clusters]
  );

  if (loading) {
    return (
      <div className="p-6 lg:p-8 w-full mx-auto min-w-0">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Cluster View
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardDescription className="animate-pulse h-4 w-24 bg-[var(--bg-tertiary)] rounded" />
              </CardHeader>
              <CardContent>
                <div className="animate-pulse h-8 w-20 bg-[var(--bg-tertiary)] rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="animate-pulse h-5 w-32 bg-[var(--bg-tertiary)] rounded" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="animate-pulse h-16 w-full bg-[var(--bg-tertiary)] rounded" />
                  <div className="animate-pulse h-4 w-48 bg-[var(--bg-tertiary)] rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="animate-pulse h-5 w-32 bg-[var(--bg-tertiary)] rounded" />
            </CardHeader>
            <CardContent>
              <div className="animate-pulse h-40 w-full bg-[var(--bg-tertiary)] rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (clusters.length === 0) {
    return (
      <div className="p-6 lg:p-8 w-full mx-auto min-w-0">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Cluster View
          </h1>
        </div>
        <Card className="py-16 text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-3">
              <Layers className="w-8 h-8 opacity-50" />
              No clusters found
            </CardTitle>
            <CardDescription>
              Run clustering analysis to discover groups.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 w-full mx-auto min-w-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Cluster View
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <span>{clusters.length} clusters</span>
          <span>·</span>
          <span>{totalMembers} total members</span>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" /> Clusters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--text-primary)]">
                {clusters.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Total Members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--text-primary)]">
                {totalMembers}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Avg Silhouette
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--text-primary)]">
                {avgScore.toFixed(3)}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5" /> Best / Worst
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[var(--success)]" />
                  <span className="text-[var(--text-primary)] font-medium truncate">
                    {bestCluster?.label || bestCluster?.id || "—"}
                  </span>
                  <span className="text-[var(--text-muted)] text-xs ml-auto">
                    {bestCluster?.silhouetteScore?.toFixed(3) || "0"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[var(--error)]" />
                  <span className="text-[var(--text-primary)] font-medium truncate">
                    {worstCluster?.label || worstCluster?.id || "—"}
                  </span>
                  <span className="text-[var(--text-muted)] text-xs ml-auto">
                    {worstCluster?.silhouetteScore?.toFixed(3) || "0"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Cluster Explorer (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cluster Quality Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="w-4 h-4" />
                Cluster Quality Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedClusters.map((cluster, index) => {
                  const score = cluster.silhouetteScore || 0;
                  const qualityColor = getQualityColor(score);
                  const pct = Math.min(100, Math.max(0, (score + 1) * 50));
                  return (
                    <div
                      key={cluster.id}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer",
                        "hover:bg-[var(--hover-bg)]"
                      )}
                      onClick={() =>
                        setSelectedCluster(
                          selectedCluster?.id === cluster.id ? null : cluster
                        )
                      }
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getClusterColor(index) }}
                      />
                      <span className="text-sm text-[var(--text-primary)] w-32 truncate">
                        {cluster.label || `Cluster ${cluster.id}`}
                      </span>
                      <div className="flex-1 h-3 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: qualityColor,
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-medium w-12 text-right"
                        style={{ color: qualityColor }}
                      >
                        {score.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">
                  Quality Score:{" "}
                  <span className="font-semibold text-[var(--text-primary)]">
                    {qualityScorePct}%
                  </span>{" "}
                  of clusters with good quality (score &gt; 0.5)
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#22c55e]" />
                    <span className="text-[var(--text-muted)]">Good (&gt;0.5)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#eab308]" />
                    <span className="text-[var(--text-muted)]">Fair (0.3-0.5)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#ef4444]" />
                    <span className="text-[var(--text-muted)]">Poor (&lt;0.3)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cluster Size Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="w-4 h-4" />
                Cluster Size Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sortedClusters.map((cluster, index) => {
                  const pct = (cluster.memberCount / maxMembers) * 100;
                  return (
                    <div key={cluster.id} className="flex items-center gap-3">
                      <span className="text-xs text-[var(--text-muted)] w-28 truncate text-right">
                        {cluster.label || `Cluster ${cluster.id}`}
                      </span>
                      <div className="flex-1 h-5 bg-[var(--bg-tertiary)] rounded overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="h-full rounded"
                          style={{ backgroundColor: getClusterColor(index) }}
                        />
                      </div>
                      <span className="text-xs text-[var(--text-muted)] w-10">
                        {cluster.memberCount}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Cluster List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Map className="w-4 h-4" />
                  Cluster List
                </CardTitle>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[var(--text-muted)] mr-1">
                    Sort:
                  </span>
                  {(
                    [
                      { key: "size", label: "Size" },
                      { key: "score", label: "Score" },
                      { key: "name", label: "Name" },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setSortBy(option.key)}
                      className={cn(
                        "px-2.5 py-1 text-xs rounded-full transition-colors",
                        sortBy === option.key
                          ? "bg-[var(--color-primary)] text-white"
                          : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {sortedClusters.map((cluster, index) => {
                    const score = cluster.silhouetteScore || 0;
                    const qualityColor = getQualityColor(score);
                    const isSelected = selectedCluster?.id === cluster.id;
                    return (
                      <motion.div
                        key={cluster.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <div
                          className={cn(
                            "p-4 rounded-xl border cursor-pointer transition-all",
                            "hover:border-[var(--border)]",
                            isSelected
                              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                              : "border-[var(--bg-tertiary)] bg-[var(--bg-secondary)]"
                          )}
                          onClick={() =>
                            setSelectedCluster(
                              selectedCluster?.id === cluster.id ? null : cluster
                            )
                          }
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor: getClusterColor(index),
                                }}
                              />
                              <span className="font-semibold text-[var(--text-primary)] text-sm">
                                {cluster.label || `Cluster ${cluster.id}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="text-xs"
                                style={{
                                  borderColor: qualityColor,
                                  color: qualityColor,
                                }}
                              >
                                {score.toFixed(2)}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {cluster.memberCount} members
                              </Badge>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {cluster.topTerms.slice(0, 5).map((term) => (
                              <span
                                key={term}
                                className="px-2 py-0.5 text-[10px] rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                                style={{
                                  border: `1px solid ${getClusterColor(index)}30`,
                                }}
                              >
                                {term}
                              </span>
                            ))}
                            {cluster.topTerms.length > 5 && (
                              <span className="px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                                +{cluster.topTerms.length - 5}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Cluster Relationship Graph */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Network className="w-4 h-4" />
                  Cluster Relationships
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => setShowAllOverlap(!showAllOverlap)}
                >
                  {showAllOverlap ? "Show less" : "Show all"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {clusterPairOverlaps.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)] text-center py-4">
                  No significant inter-cluster overlaps detected.
                </p>
              ) : (
                <div className="flex items-center justify-center">
                  <svg
                    width={500}
                    height={400}
                    viewBox="0 0 500 400"
                    className="max-w-full h-auto"
                  >
                    {/* Place clusters in a circle */}
                    {(() => {
                      const cx = 250;
                      const cy = 200;
                      const radius = 150;
                      const positions: Record<string, { x: number; y: number }> = {};
                      clusters.forEach((c, i) => {
                        const angle = (i / clusters.length) * 2 * Math.PI - Math.PI / 2;
                        positions[c.id] = {
                          x: cx + radius * Math.cos(angle),
                          y: cy + radius * Math.sin(angle),
                        };
                      });

                      return (
                        <>
                          {/* Draw edges */}
                          {topPairs.map((pair, i) => {
                            const pa = positions[pair.clusterA.id];
                            const pb = positions[pair.clusterB.id];
                            if (!pa || !pb) return null;
                            const thickness = Math.max(1, (pair.overlap / maxOverlap) * 6);
                            return (
                              <line
                                key={`edge-${i}`}
                                x1={pa.x}
                                y1={pa.y}
                                x2={pb.x}
                                y2={pb.y}
                                stroke="var(--text-muted)"
                                strokeWidth={thickness}
                                opacity={0.3 + (pair.overlap / maxOverlap) * 0.5}
                              />
                            );
                          })}

                          {/* Draw nodes */}
                          {clusters.map((cluster, i) => {
                            const pos = positions[cluster.id];
                            if (!pos) return null;
                            return (
                              <g key={`node-${cluster.id}`}>
                                <circle
                                  cx={pos.x}
                                  cy={pos.y}
                                  r={8 + (cluster.memberCount / maxMembers) * 6}
                                  fill={getClusterColor(i)}
                                  opacity={0.8}
                                />
                                <text
                                  x={pos.x}
                                  y={pos.y + 20}
                                  textAnchor="middle"
                                  className="text-[10px]"
                                  fill="var(--text-muted)"
                                >
                                  {cluster.label || `C${i + 1}`}
                                </text>
                              </g>
                            );
                          })}
                        </>
                      );
                    })()}
                  </svg>
                </div>
              )}

              {topPairs.length > 0 && (
                <div className="mt-4 space-y-1.5">
                  {topPairs.slice(0, 5).map((pair, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: getClusterColor(
                            clusters.findIndex((c) => c.id === pair.clusterA.id)
                          ),
                        }}
                      />
                      <span className="w-24 truncate">
                        {pair.clusterA.label || pair.clusterA.id}
                      </span>
                      <ArrowRight className="w-3 h-3" />
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: getClusterColor(
                            clusters.findIndex((c) => c.id === pair.clusterB.id)
                          ),
                        }}
                      />
                      <span className="w-24 truncate">
                        {pair.clusterB.label || pair.clusterB.id}
                      </span>
                      <span className="ml-auto font-medium text-[var(--text-primary)]">
                        {pair.overlap} shared
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Cluster Detail (1/3, sticky) */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Flame className="w-4 h-4" />
                Cluster Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCluster ? (
                <div className="space-y-5">
                  {/* Cluster name with color */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: getClusterColor(
                          sortedClusters.indexOf(selectedCluster)
                        ),
                      }}
                    />
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {selectedCluster.label || `Cluster ${selectedCluster.id}`}
                    </h3>
                  </div>

                  {/* Quality badge */}
                  <div>
                    <Badge
                      variant="outline"
                      className="text-sm px-3 py-1"
                      style={{
                        borderColor: getQualityColor(
                          selectedCluster.silhouetteScore || 0
                        ),
                        color: getQualityColor(selectedCluster.silhouetteScore || 0),
                      }}
                    >
                      Quality: {getQualityLabel(selectedCluster.silhouetteScore || 0)}
                    </Badge>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                      <div className="text-[var(--text-muted)] text-xs mb-1">
                        Members
                      </div>
                      <div className="font-bold text-lg text-[var(--text-primary)]">
                        {selectedCluster.memberCount}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                      <div className="text-[var(--text-muted)] text-xs mb-1">
                        Silhouette
                      </div>
                      <div className="font-bold text-lg text-[var(--text-primary)]">
                        {(selectedCluster.silhouetteScore || 0).toFixed(3)}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                      <div className="text-[var(--text-muted)] text-xs mb-1">
                        Centroid Offset
                      </div>
                      <div className="font-bold text-lg text-[var(--text-primary)]">
                        {selectedCluster.centroidOffset.toFixed(4)}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                      <div className="text-[var(--text-muted)] text-xs mb-1">
                        Terms
                      </div>
                      <div className="font-bold text-lg text-[var(--text-primary)]">
                        {selectedCluster.topTerms.length}
                      </div>
                    </div>
                  </div>

                  {/* Top Terms */}
                  <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">
                      Top Terms
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCluster.topTerms.map((term) => (
                        <Badge
                          key={term}
                          variant="secondary"
                          className="text-xs px-2.5 py-1"
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Members */}
                  <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">
                      Members{" "}
                      <span className="text-[var(--text-primary)]">
                        ({selectedCluster.members?.length || 0})
                      </span>
                    </div>
                    <ScrollArea className="h-48">
                      <div className="space-y-1">
                        {(expandedMembers
                          ? selectedCluster.members
                          : selectedCluster.members?.slice(0, 30)
                        )?.map((member) => (
                          <div
                            key={member}
                            className="text-xs text-[var(--text-secondary)] truncate p-1.5 rounded hover:bg-[var(--hover-bg)] cursor-default"
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    {selectedCluster.members &&
                      selectedCluster.members.length > 30 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-2 text-xs"
                          onClick={() => setExpandedMembers(!expandedMembers)}
                        >
                          {expandedMembers
                            ? "Show less"
                            : `Show all ${selectedCluster.members.length} members`}
                        </Button>
                      )}
                  </div>

                  {/* Concept Overlap */}
                  {clusterMemberOverlap.length > 0 && (
                    <div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">
                        Concept Overlap
                      </div>
                      <div className="space-y-2">
                        {clusterMemberOverlap.map((overlap, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-[var(--bg-secondary)] cursor-pointer hover:bg-[var(--hover-bg)] transition-colors"
                            onClick={() =>
                              setSelectedCluster(
                                selectedCluster?.id === overlap.cluster.id
                                  ? null
                                  : overlap.cluster
                              )
                            }
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor: getClusterColor(
                                    sortedClusters.indexOf(overlap.cluster)
                                  ),
                                }}
                              />
                              <span className="text-sm text-[var(--text-primary)] truncate flex-1">
                                {overlap.cluster.label || `Cluster ${overlap.cluster.id}`}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {overlap.count} shared
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mx-auto mb-3">
                    <FileStack className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">
                    Select a cluster to view its details.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
