"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Network,
  Hash,
  Layers,
  FileStack,
  TrendingUp,
  Zap,
  Clock,
  BookOpen,
  Brain,
  BarChart3,
  Database,
  Sparkles,
  Target,
  Activity,
  Flame,
  Gauge,
} from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";

interface TopConcept {
  name: string;
  id: string;
  type: string;
  frequency: number;
  connections: number;
  relatedConcepts: string[];
}

interface DocCoverage {
  docId: string;
  sectionCount: number;
  conceptCount: number;
  density: number;
}

interface ClusterInfo {
  id: string;
  memberCount: number;
  silhouetteScore: number;
  topTerms: string[];
  label: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

export default function HomePage() {
  const sections = useStore((s) => s.sections);
  const concepts = useStore((s) => s.concepts);
  const clusters = useStore((s) => s.clusters);
  const statistics = useStore((s) => s.statistics);

  const [loading, setLoading] = useState(true);
  const [topConcepts, setTopConcepts] = useState<TopConcept[]>([]);
  const [bestCluster, setBestCluster] = useState<ClusterInfo | null>(null);
  const [worstCluster, setWorstCluster] = useState<ClusterInfo | null>(null);
  const [clusterSizes, setClusterSizes] = useState<ClusterInfo[]>([]);
  const [typeDistribution, setTypeDistribution] = useState<
    { type: string; count: number; percentage: number }[]
  >([]);
  const [docCoverage, setDocCoverage] = useState<DocCoverage[]>([]);
  const [stats, setStats] = useState({
    documents: 0,
    sections: 0,
    concepts: 0,
    clusters: 0,
    conceptsPerDoc: 0,
    sectionsPerDoc: 0,
    totalTokens: 0,
    processingTimeMs: 0,
    memoryUsageMb: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const docCount = statistics?.documentCount || 0;
      const secCount = statistics?.sectionCount || sections.length;
      const concCount = statistics?.conceptCount || concepts.length;
      const clusterCount = statistics?.clusterCount || clusters.length;

      const conceptsPerDoc = docCount > 0 ? concCount / docCount : 0;
      const sectionsPerDoc = docCount > 0 ? secCount / docCount : 0;

      setStats({
        documents: docCount,
        sections: secCount,
        concepts: concCount,
        clusters: clusterCount,
        conceptsPerDoc,
        sectionsPerDoc,
        totalTokens: statistics?.totalTokens || 0,
        processingTimeMs: statistics?.processingTimeMs || 0,
        memoryUsageMb: statistics?.memoryUsageMb || 0,
      });

      const sortedConcepts = [...concepts]
        .sort(
          (a, b) => (b.relatedConcepts?.length || 0) -
            (a.relatedConcepts?.length || 0)
        )
        .slice(0, 8)
        .map((c) => ({
          name: c.name || c.id,
          id: c.id,
          type: c.type || "default",
          frequency: c.frequency || 0,
          connections: c.relatedConcepts?.length || 0,
          relatedConcepts: c.relatedConcepts || [],
        }));
      setTopConcepts(sortedConcepts);

      const sortedClusters = [...clusters].sort(
        (a, b) => (b.silhouetteScore || 0) - (a.silhouetteScore || 0)
      );
      const sortedBySize = [...clusters].sort(
        (a, b) => b.memberCount - a.memberCount
      );
      setClusterSizes(sortedBySize);
      setBestCluster(sortedClusters[0] || null);
      setWorstCluster(
        sortedClusters[sortedClusters.length - 1] || null
      );

      const typeMap = new Map<string, number>();
      concepts.forEach((c) => {
        const t = c.type || "default";
        typeMap.set(t, (typeMap.get(t) || 0) + 1);
      });
      const dist = Array.from(typeMap.entries())
        .map(([type, count]) => ({
          type,
          count,
          percentage: concCount > 0 ? (count / concCount) * 100 : 0,
        }))
        .sort((a, b) => b.count - a.count);
      setTypeDistribution(dist);

      const docMap = new Map<string, { sectionCount: number; conceptCount: number }>();
      sections.forEach((s) => {
        if (s.docId) {
          const existing = docMap.get(s.docId);
          if (existing) {
            existing.sectionCount += 1;
          } else {
            docMap.set(s.docId, { sectionCount: 1, conceptCount: 0 });
          }
        }
      });

      concepts.forEach((c) => {
        if (c.docId) {
          const existing = docMap.get(c.docId);
          if (existing) {
            existing.conceptCount += 1;
          } else {
            docMap.set(c.docId, { sectionCount: 0, conceptCount: 1 });
          }
        }
      });

      const coverage = Array.from(docMap.entries())
        .map(([docId, { sectionCount, conceptCount }]) => ({
          docId,
          sectionCount,
          conceptCount,
          density: sectionCount > 0 ? conceptCount / sectionCount : 0,
        }))
        .sort((a, b) => b.sectionCount - a.sectionCount)
        .slice(0, 5);
      setDocCoverage(coverage);

      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [sections, concepts, clusters, statistics]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeIn} custom={0}>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-7 h-7 text-[var(--color-primary)]" />
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Knowledge Base
          </h1>
        </div>
        <p className="text-[var(--text-secondary)] text-lg">
          Compiled insights from {stats.documents} documents across
          {stats.concepts} concepts and {stats.clusters} semantic clusters
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={fadeIn} custom={1}>
        <SearchBar
          placeholder="Search concepts, sections, and documents..."
          className="max-w-2xl"
        />
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={fadeIn} custom={2}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Documents",
              value: stats.documents,
              icon: <BookOpen className="w-5 h-5" />,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              label: "Sections",
              value: stats.sections.toLocaleString(),
              icon: <FileStack className="w-5 h-5" />,
              color: "text-violet-500",
              bg: "bg-violet-500/10",
            },
            {
              label: "Concepts",
              value: stats.concepts.toLocaleString(),
              icon: <Hash className="w-5 h-5" />,
              color: "text-emerald-500",
              bg: "bg-emerald-500/10",
            },
            {
              label: "Clusters",
              value: stats.clusters,
              icon: <Layers className="w-5 h-5" />,
              color: "text-amber-500",
              bg: "bg-amber-500/10",
            },
          ].map((item, i) => (
            <div
              key={item.label}
              className="card flex flex-col gap-2 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">
                  {item.label}
                </span>
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  {React.cloneElement(item.icon, {
                    className: `w-4 h-4 ${item.color}`,
                  })}
                </div>
              </div>
              <div className="text-2xl font-bold text-[var(--text-primary)]">
                {loading ? <Skeleton className="h-8 w-16" /> : item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Derived ratios */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {[
            {
              label: "Concepts/Doc",
              value: stats.conceptsPerDoc.toFixed(1),
              icon: <TrendingUp className="w-4 h-4" />,
            },
            {
              label: "Sections/Doc",
              value: stats.sectionsPerDoc.toFixed(1),
              icon: <Gauge className="w-4 h-4" />,
            },
            {
              label: "Concepts/Cluster",
              value:
                stats.clusters > 0
                  ? (stats.concepts / stats.clusters).toFixed(1)
                  : "0",
              icon: <Network className="w-4 h-4" />,
            },
            {
              label: "Embeddings",
              value:
                statistics?.embeddingCount
                  ? statistics.embeddingCount.toLocaleString()
                  : "0",
              icon: <Database className="w-4 h-4" />,
            },
          ].map((item, i) => (
            <div
              key={item.label}
              className="card flex flex-col gap-2 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">
                  {item.label}
                </span>
                <div className="p-2 rounded-lg bg-[var(--bg-tertiary)]">
                  {React.cloneElement(item.icon, {
                    className: "w-4 h-4 text-[var(--text-secondary)]",
                  })}
                </div>
              </div>
              <div className="text-lg font-semibold text-[var(--text-primary)]">
                {loading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  item.value
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Knowledge Insights - Two column layout */}
      <motion.div variants={fadeIn} custom={3}>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-[var(--color-primary)]" />
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Knowledge Insights
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Connected Concepts */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-[var(--color-primary)]" />
                  <CardTitle className="text-base">
                    Top Connected Concepts
                  </CardTitle>
                </div>
                <CardDescription>
                  Most interconnected hubs in the knowledge graph
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                ) : topConcepts.length > 0 ? (
                  <div className="space-y-2">
                    {topConcepts.map((concept, i) => (
                      <div
                        key={concept.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-colors"
                      >
                        <div className="flex-shrink-0 w-7 h-7 rounded-md bg-[var(--color-primary)]/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-[var(--color-primary)]">
                            {i + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                              {concept.name}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs"
                            >
                              {concept.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-orange-500" />
                            <span className="text-xs font-medium text-[var(--text-secondary)]">
                              {concept.frequency}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {concept.connections}{" "}
                            {concept.connections === 1 ? "link" : "links"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-[var(--text-muted)] text-sm">
                    No concept connectivity data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Concept Type Distribution */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
                  <CardTitle className="text-base">
                    Concept Type Distribution
                  </CardTitle>
                </div>
                <CardDescription>
                  Breakdown of concept taxonomy across the knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                        <Skeleton className="h-3 w-full rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : typeDistribution.length > 0 ? (
                  <div className="space-y-3">
                    {typeDistribution.map((item) => (
                      <div key={item.type}>
                        <div className="flex justify-between items-center mb-1">
                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            {item.type}
                          </Badge>
                          <span className="text-xs text-[var(--text-secondary)]">
                            {item.count} ({item.percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--color-primary)] rounded-full transition-all"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-[var(--text-muted)] text-sm">
                    No type distribution data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cluster Quality Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[var(--color-primary)]" />
                  <CardTitle className="text-base">
                    Cluster Quality Overview
                  </CardTitle>
                </div>
                <CardDescription>
                  Cluster sizes and silhouette quality scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Best cluster highlight */}
                    {bestCluster && (
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            Best Cluster
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-[var(--text-primary)]">
                              {bestCluster.label || `Cluster ${bestCluster.id}`}
                            </span>
                            <span className="text-xs text-[var(--text-muted)] ml-2">
                              {bestCluster.memberCount} members
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-emerald-600 border-emerald-500/30"
                          >
                            Score: {(bestCluster.silhouetteScore || 0).toFixed(3)}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {/* Worst cluster highlight */}
                    {worstCluster && worstCluster.id !== bestCluster?.id && (
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-medium text-red-600 dark:text-red-400">
                            Lowest Quality
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-[var(--text-primary)]">
                              {worstCluster.label || `Cluster ${worstCluster.id}`}
                            </span>
                            <span className="text-xs text-[var(--text-muted)] ml-2">
                              {worstCluster.memberCount} members
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-red-600 border-red-500/30"
                          >
                            Score: {(worstCluster.silhouetteScore || 0).toFixed(3)}
                          </Badge>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Bar chart of cluster sizes */}
                    <div className="space-y-1.5">
                      <span className="text-xs text-[var(--text-secondary)]">
                        Cluster Sizes
                      </span>
                      <div className="space-y-1">
                        {clusterSizes.slice(0, 10).map((c) => {
                          const maxMembers =
                            clusterSizes[0]?.memberCount || 1;
                          const widthPercent =
                            (c.memberCount / maxMembers) * 100;
                          const score = c.silhouetteScore || 0;
                          const scoreColor =
                            score > 0.5
                              ? "bg-emerald-500"
                              : score > 0.2
                              ? "bg-amber-500"
                              : "bg-red-500";
                          return (
                            <div key={c.id} className="flex items-center gap-2">
                              <span className="text-xs text-[var(--text-muted)] w-6 text-right">
                                {c.memberCount}
                              </span>
                              <div className="flex-1 h-4 bg-[var(--bg-tertiary)] rounded overflow-hidden">
                                <div
                                  className={`h-full ${scoreColor} rounded transition-all`}
                                  style={{ width: `${widthPercent}%` }}
                                />
                              </div>
                              <span className="text-xs text-[var(--text-muted)] w-14">
                                {score.toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      {clusterSizes.length > 10 && (
                        <p className="text-xs text-[var(--text-muted)] pt-1">
                          ...and {clusterSizes.length - 10} more clusters
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column (1/3) */}
          <div className="space-y-6">
            {/* Document Coverage */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileStack className="w-5 h-5 text-[var(--color-primary)]" />
                  <CardTitle className="text-base">
                    Deepest Documents
                  </CardTitle>
                </div>
                <CardDescription>
                  Documents with most sections and concept density
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                      </div>
                    ))}
                  </div>
                ) : docCoverage.length > 0 ? (
                  <div className="space-y-3">
                    {docCoverage.map((doc, i) => (
                      <div
                        key={doc.docId}
                        className="p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                            {doc.docId}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            #{i + 1}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <FileStack className="w-3 h-3" />
                            {doc.sectionCount} sections
                          </span>
                          <span className="flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            {doc.conceptCount} concepts
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {doc.density.toFixed(1)} density
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-[var(--text-muted)] text-sm">
                    No document coverage data
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Processing Stats */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[var(--color-primary)]" />
                  <CardTitle className="text-base">
                    Processing Stats
                  </CardTitle>
                </div>
                <CardDescription>
                  Pipeline metrics from knowledge compilation
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[var(--text-muted)]" />
                        <span className="text-sm text-[var(--text-secondary)]">
                          Processing Time
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {(stats.processingTimeMs / 1000).toFixed(2)}s
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-[var(--text-muted)]" />
                        <span className="text-sm text-[var(--text-secondary)]">
                          Memory Usage
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {stats.memoryUsageMb.toFixed(1)} MB
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[var(--text-muted)]" />
                        <span className="text-sm text-[var(--text-secondary)]">
                          Total Tokens
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {stats.totalTokens.toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
                        <span className="text-sm text-[var(--text-secondary)]">
                          Source Files
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {statistics?.sourceCount || 0}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-[var(--text-muted)]" />
                        <span className="text-sm text-[var(--text-secondary)]">
                          Embedding Dimensions
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {statistics?.embeddingDimensions || 0}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
