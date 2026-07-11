"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Layers, Hash, TrendingUp, Users, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/LoadingSkeleton";
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
];

function getClusterColor(index: number): string {
  return CLUSTER_COLORS[index % CLUSTER_COLORS.length];
}

export default function ClustersPage() {
  const clusters = useStore((s) => s.clusters);
  const sections = useStore((s) => s.sections);
  const [loading, setLoading] = useState(true);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [sortBy, setSortBy] = useState<"size" | "score" | "name">("size");

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

  const clusterStats = useMemo(() => {
    const memberCounts = clusters.map((c) => c.memberCount);
    return {
      min: Math.min(...memberCounts),
      max: Math.max(...memberCounts),
      avg: Math.round(totalMembers / clusters.length) || 0,
    };
  }, [clusters, totalMembers]);

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Cluster View
          </h1>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card">
              <Skeleton type="text" className="h-6 w-48 mb-3" />
              <Skeleton type="text" className="h-4 w-32 mb-2" />
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((j) => (
                  <Skeleton key={j} type="text" className="h-6 w-16" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Cluster View
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <span>{clusters.length} clusters</span>
        </div>
      </div>

      {/* Cluster summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="text-xs text-[var(--text-muted)]">Clusters</span>
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {clusters.length}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[var(--color-secondary)]" />
            <span className="text-xs text-[var(--text-muted)]">
              Total Members
            </span>
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {totalMembers}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[var(--success)]" />
            <span className="text-xs text-[var(--text-muted)]">
              Avg Silhouette Score
            </span>
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {avgScore.toFixed(2)}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-[var(--warning)]" />
            <span className="text-xs text-[var(--text-muted)]">
              Member Range
            </span>
          </div>
          <div className="text-lg font-bold text-[var(--text-primary)]">
            {clusterStats.min} - {clusterStats.max}
            <span className="text-sm text-[var(--text-muted)] font-normal ml-1">
              (avg: {clusterStats.avg})
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cluster list */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm text-[var(--text-muted)]">Sort by:</span>
            <div className="flex gap-1">
              {(["size", "score", "name"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    sortBy === option
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {option === "size" ? "Size" : option === "score" ? "Score" : "Name"}
                </button>
              ))}
            </div>
          </div>

          {sortedClusters.map((cluster, index) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div
                className={`card cursor-pointer ${
                  selectedCluster?.id === cluster.id
                    ? "border-[var(--color-primary)]"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCluster(
                    selectedCluster?.id === cluster.id ? null : cluster
                  )
                }
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: getClusterColor(index),
                      }}
                    />
                    <span className="font-semibold text-[var(--text-primary)]">
                      {cluster.label || `Cluster ${cluster.id}`}
                    </span>
                    <span className="badge">
                      {cluster.memberCount} members
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span>
                      Silhouette:{" "}
                      <span className="text-[var(--text-primary)]">
                        {cluster.silhouetteScore?.toFixed(2) || "N/A"}
                      </span>
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        selectedCluster?.id === cluster.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cluster.topTerms.slice(0, 8).map((term) => (
                    <span
                      key={term}
                      className="px-2 py-0.5 text-xs rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                      style={{
                        border: `1px solid ${getClusterColor(index)}30`,
                      }}
                    >
                      {term}
                    </span>
                  ))}
                  {cluster.topTerms.length > 8 && (
                    <span className="px-2 py-0.5 text-xs text-[var(--text-muted)]">
                      +{cluster.topTerms.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {clusters.length === 0 && (
            <div className="card py-8 text-center text-[var(--text-muted)]">
              <Layers className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>No clusters found. Run clustering analysis to discover groups.</p>
            </div>
          )}
        </div>

        {/* Selected cluster detail */}
        <div className="card h-fit">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Cluster Details
            </h2>
          </div>

          {selectedCluster ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
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

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <div className="text-[var(--text-muted)] text-xs">Members</div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {selectedCluster.memberCount}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <div className="text-[var(--text-muted)] text-xs">
                    Silhouette
                  </div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {selectedCluster.silhouetteScore?.toFixed(3) || "N/A"}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <div className="text-[var(--text-muted)] text-xs">
                    Centroid Offset
                  </div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {selectedCluster.centroidOffset}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <div className="text-[var(--text-muted)] text-xs">
                    Top Terms
                  </div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {selectedCluster.topTerms.length}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Top Terms
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCluster.topTerms.map((term) => (
                    <span
                      key={term}
                      className="px-2 py-1 text-xs rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Members ({selectedCluster.members?.length || "N/A"})
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {selectedCluster.members?.slice(0, 20).map((member) => (
                    <div
                      key={member}
                      className="text-xs text-[var(--text-secondary)] truncate p-1 rounded hover:bg-[var(--hover-bg)]"
                    >
                      {member}
                    </div>
                  ))}
                  {selectedCluster.members &&
                    selectedCluster.members.length > 20 && (
                      <div className="text-xs text-[var(--text-muted)]">
                        ...and {selectedCluster.members.length - 20} more
                      </div>
                    )}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-[var(--text-muted)] text-sm">
              Select a cluster to view its details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
