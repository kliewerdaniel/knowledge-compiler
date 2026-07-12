"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitGraph,
  Search,
  BarChart3,
  TrendingUp,
  Flame,
  Network,
  ArrowRight,
  Layers,
  Hash,
  Star,
  Activity,
  Filter,
} from "lucide-react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

const TYPE_LABELS: Record<string, string> = {
  entity: "Entity",
  relation: "Relation",
  property: "Property",
  event: "Event",
  default: "Concept",
};

const TYPE_COLORS: Record<string, string> = {
  entity: "#3b82f6",
  relation: "#8b5cf6",
  property: "#22c55e",
  event: "#f59e0b",
  default: "#64748b",
};

const TYPE_BG: Record<string, string> = {
  entity: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  relation: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  property: "bg-green-500/10 text-green-400 border-green-500/20",
  event: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  default: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

type SortOption = "frequency" | "name" | "connections";

function getTypeColor(type: string): string {
  return TYPE_COLORS[type] || TYPE_COLORS.default;
}

function getTypeLabel(type: string): string {
  return TYPE_LABELS[type] || TYPE_LABELS.default;
}

export default function ConceptsPage() {
  const concepts = useStore((s) => s.concepts);
  const clusters = useStore((s) => s.clusters);
  const sections = useStore((s) => s.sections);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<any>(null);
  const [sortBy, setSortBy] = useState<SortOption>("frequency");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSorted = useMemo(() => {
    let list = [...concepts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.aliases?.some((a: string) => a.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "name":
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "connections":
        list.sort((a, b) => (b.relatedConcepts?.length || 0) - (a.relatedConcepts?.length || 0));
        break;
      case "frequency":
      default:
        list.sort((a, b) => (b.frequency || 0) - (a.frequency || 0));
        break;
    }

    return list;
  }, [concepts, searchQuery, sortBy]);

  const typeDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    concepts.forEach((c) => {
      const type = c.type || "default";
      counts[type] = (counts[type] || 0) + 1;
    });
    const total = concepts.length || 1;
    return Object.entries(counts)
      .map(([type, count]) => ({ type, count, percentage: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);
  }, [concepts]);

  const frequencyTiers = useMemo(() => {
    let high = 0, medium = 0, low = 0;
    concepts.forEach((c) => {
      const f = c.frequency || 0;
      if (f > 100) high++;
      else if (f >= 20) medium++;
      else low++;
    });
    return { high, medium, low, total: concepts.length };
  }, [concepts]);

  const topConcepts = useMemo(() => {
    return [...concepts]
      .sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
      .slice(0, 20);
  }, [concepts]);

  const clusterConceptData = useMemo(() => {
    return clusters.map((cluster) => {
      const memberIds = cluster.members || [];
      const memberConcepts = concepts
        .filter((c) => memberIds.includes(c.id))
        .sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
        .slice(0, 5);
      return {
        ...cluster,
        topConcepts: memberConcepts,
      };
    }).sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
  }, [clusters, concepts]);

  const getConceptCluster = useCallback((conceptId: string) => {
    return clusters.find((c) => (c.members || []).includes(conceptId));
  }, [clusters]);

  const getDocumentsForConcept = useCallback(
    (concept: any) => {
      if (!concept || !sections.length) return [];
      return Array.from(new Set(
        sections
          .filter((s) => s.docId && (concept.aliases?.includes(s.docId) || concept.name?.toLowerCase().includes(s.docId?.toLowerCase())))
          .map((s) => s.docId)
      ));
    },
    [sections]
  );

  const getRelatedConceptsData = useCallback(
    (concept: any) => {
      if (!concept?.relatedConcepts?.length) return [];
      return concept.relatedConcepts
        .map((id: string) => concepts.find((c) => c.id === id))
        .filter(Boolean);
    },
    [concepts]
  );

  if (loading) {
    return (
      <div className="p-6 lg:p-8 w-full mx-auto min-w-0">
        <div className="flex items-center gap-3 mb-6">
          <GitGraph className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Concept Map</h1>
          <div className="h-5 w-[1px] bg-[var(--border-color)] mx-2" />
          <div className="h-5 w-24 rounded-full bg-[var(--bg-tertiary)] animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="h-5 w-40 bg-[var(--bg-tertiary)] rounded animate-pulse" />
                <div className="h-4 w-56 bg-[var(--bg-tertiary)] rounded animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-3 flex-1 bg-[var(--bg-tertiary)] rounded animate-pulse" />
                    <div className="h-4 w-12 bg-[var(--bg-tertiary)] rounded animate-pulse" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-5 w-48 bg-[var(--bg-tertiary)] rounded animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-3 flex-3 bg-[var(--bg-tertiary)] rounded animate-pulse" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-5 w-36 bg-[var(--bg-tertiary)] rounded animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-tertiary)] animate-pulse" />
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="h-5 w-32 bg-[var(--bg-tertiary)] rounded animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-20 bg-[var(--bg-tertiary)] rounded animate-pulse" />
                <div className="h-10 bg-[var(--bg-tertiary)] rounded animate-pulse" />
                <div className="h-16 bg-[var(--bg-tertiary)] rounded animate-pulse" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 w-full mx-auto min-w-0">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <GitGraph className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Concept Map</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5" />
            {concepts.length} concepts
          </Badge>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter concepts by name..."
            className="pl-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <Search className="w-3.5 h-3.5 rotate-90" />
            </button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="flex items-center gap-1.5">
            <BookOpenIcon className="w-3.5 h-3.5" />
            All Concepts
          </TabsTrigger>
          <TabsTrigger value="top" className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" />
            Top Concepts
          </TabsTrigger>
          <TabsTrigger value="clusters" className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Clusters
          </TabsTrigger>
        </TabsList>

        {/* Left Panel - Concept Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* All Concepts Tab */}
            <TabsContent value="all" className="mt-0">
              {/* Type Distribution */}
              {typeDistribution.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[var(--color-primary)]" />
                      Concept Type Distribution
                    </CardTitle>
                    <CardDescription>
                      Breakdown of concepts by type
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {typeDistribution.map(({ type, count, percentage }) => (
                      <div key={type} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: getTypeColor(type) }}
                            />
                            <span className="text-[var(--text-secondary)]">{getTypeLabel(type)}</span>
                          </div>
                          <span className="text-[var(--text-muted)] font-medium">{count}</span>
                        </div>
                        <div className="relative h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: getTypeColor(type) }}
                          />
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-[var(--text-muted)]">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Frequency Distribution */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" />
                    Frequency Distribution
                  </CardTitle>
                  <CardDescription>
                    Concepts grouped by occurrence frequency
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <FrequencyTier
                    icon={<Flame className="w-4 h-4" />}
                    label="High"
                    description="Over 100 occurrences"
                    count={frequencyTiers.high}
                    total={frequencyTiers.total}
                    color="#ef4444"
                    bg="bg-red-500/10"
                    border="border-red-500/20"
                  />
                  <FrequencyTier
                    icon={<Activity className="w-4 h-4" />}
                    label="Medium"
                    description="20-100 occurrences"
                    count={frequencyTiers.medium}
                    total={frequencyTiers.total}
                    color="#f59e0b"
                    bg="bg-amber-500/10"
                    border="border-amber-500/20"
                  />
                  <FrequencyTier
                    icon={<Hash className="w-4 h-4" />}
                    label="Low"
                    description="Under 20 occurrences"
                    count={frequencyTiers.low}
                    total={frequencyTiers.total}
                    color="#64748b"
                    bg="bg-slate-500/10"
                    border="border-slate-500/20"
                  />
                </CardContent>
              </Card>

              {/* Concept List */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Network className="w-4 h-4 text-[var(--color-primary)]" />
                      Concepts
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Filter className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="text-xs bg-transparent text-[var(--text-muted)] border-none outline-none cursor-pointer hover:text-[var(--text-primary)] transition-colors"
                      >
                        <option value="frequency" className="bg-[var(--card-bg)]">Frequency</option>
                        <option value="name" className="bg-[var(--card-bg)]">Name</option>
                        <option value="connections" className="bg-[var(--card-bg)]">Connections</option>
                      </select>
                    </div>
                  </div>
                  <CardDescription>
                    {filteredAndSorted.length} concept{filteredAndSorted.length !== 1 ? "s" : ""}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredAndSorted.length === 0 ? (
                    <div className="py-12 text-center">
                      <GitGraph className="w-10 h-10 mx-auto mb-3 opacity-40 text-[var(--text-muted)]" />
                      <p className="text-sm text-[var(--text-muted)]">No concepts match your search</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredAndSorted.map((concept, index) => (
                        <ConceptRow
                          key={concept.id}
                          concept={concept}
                          index={index}
                          isSelected={selectedConcept?.id === concept.id}
                          onClick={() => setSelectedConcept(concept)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Top Concepts Tab */}
            <TabsContent value="top" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Star className="w-4 h-4 text-[var(--warning)]" />
                    Top 20 Concepts by Frequency
                  </CardTitle>
                  <CardDescription>
                    The most frequently occurring concepts across all documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {topConcepts.length === 0 ? (
                    <div className="py-12 text-center">
                      <GitGraph className="w-10 h-10 mx-auto mb-3 opacity-40 text-[var(--text-muted)]" />
                      <p className="text-sm text-[var(--text-muted)]">No concepts available</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {topConcepts.map((concept, index) => (
                        <motion.div
                          key={concept.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <button
                            onClick={() => setSelectedConcept(concept)}
                            className={cn(
                              "w-full text-left p-4 rounded-lg border transition-all duration-200 hover:shadow-md group",
                              selectedConcept?.id === concept.id
                                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                : "border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--color-primary)]/50"
                            )}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
                                  #{index + 1}
                                </span>
                                <div
                                  className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                                  style={{ backgroundColor: getTypeColor(concept.type) }}
                                />
                                <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                                  {concept.name}
                                </span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            </div>
                            {concept.description && (
                              <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-2">
                                {concept.description}
                              </p>
                            )}
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="text-xs">
                                {concept.frequency || 0}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {(concept.relatedConcepts?.length || 0)} connections
                              </Badge>
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Clusters Tab */}
            <TabsContent value="clusters" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[var(--color-primary)]" />
                    Concept Clusters
                  </CardTitle>
                  <CardDescription>
                    {clusters.length} cluster{clusters.length !== 1 ? "s" : ""} found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {clusters.length === 0 ? (
                    <div className="py-12 text-center">
                      <GitGraph className="w-10 h-10 mx-auto mb-3 opacity-40 text-[var(--text-muted)]" />
                      <p className="text-sm text-[var(--text-muted)]">No clusters available</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {clusterConceptData.map((cluster) => (
                        <ClusterCard
                          key={cluster.id}
                          cluster={cluster}
                          onConceptClick={(c: any) => setSelectedConcept(c)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* Right Panel - Concept Detail */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpenIcon className="w-4 h-4 text-[var(--color-primary)]" />
                    Concept Details
                  </CardTitle>
                  <CardDescription>
                    {selectedConcept ? "Selected concept information" : "Select a concept to view details"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {selectedConcept ? (
                      <motion.div
                        key={selectedConcept.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-5"
                      >
                        {/* Name and Type */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: getTypeColor(selectedConcept.type) }}
                            />
                            <h3 className="text-lg font-semibold text-[var(--text-primary)] truncate">
                              {selectedConcept.name}
                            </h3>
                          </div>
                          <Badge variant="secondary" className={cn("text-xs", TYPE_BG[selectedConcept.type] || TYPE_BG.default)}>
                            {getTypeLabel(selectedConcept.type)}
                          </Badge>
                        </div>

                        {/* Description */}
                        {selectedConcept.description && (
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed break-words">
                            {selectedConcept.description}
                          </p>
                        )}

                        <Separator />

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          <StatBox
                            label="Frequency"
                            value={String(selectedConcept.frequency || 0)}
                            icon={<Flame className="w-3.5 h-3.5" />}
                          />
                          <StatBox
                            label="Connections"
                            value={String(selectedConcept.relatedConcepts?.length || 0)}
                            icon={<Network className="w-3.5 h-3.5" />}
                          />
                          <StatBox
                            label="Aliases"
                            value={String(selectedConcept.aliases?.length || 0)}
                            icon={<Hash className="w-3.5 h-3.5" />}
                          />
                          <StatBox
                            label="Type"
                            value={getTypeLabel(selectedConcept.type)}
                            icon={<BarChart3 className="w-3.5 h-3.5" />}
                          />
                        </div>

                        {/* Cluster Info */}
                        {getConceptCluster(selectedConcept.id) && (
                          <>
                            <Separator />
                            <div>
                              <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                                Cluster
                              </h4>
                              {(() => {
                                const cluster = getConceptCluster(selectedConcept.id)!;
                                return (
                                  <div className="p-3 rounded-lg bg-[var(--bg-secondary)] space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium text-[var(--text-primary)]">
                                        {cluster.label || `Cluster ${cluster.id}`}
                                      </span>
                                      <Badge variant="secondary" className="text-xs">
                                        {cluster.memberCount} members
                                      </Badge>
                                    </div>
                                    {cluster.topTerms?.length > 0 && (
                                      <div className="flex flex-wrap gap-1">
                                        {cluster.topTerms.slice(0, 5).map((term: string) => (
                                          <Badge key={term} variant="outline" className="text-xs">
                                            {term}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>
                          </>
                        )}

                        {/* Related Concepts */}
                        {(() => {
                          const related = getRelatedConceptsData(selectedConcept);
                          if (related.length === 0) return null;
                          return (
                            <>
                              <Separator />
                              <div>
                                <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                                  Related Concepts
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {related.map((c: any) => (
                                    <button
                                      key={c.id}
                                      onClick={() => setSelectedConcept(c)}
                                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border transition-all hover:shadow-sm"
                                      style={{
                                        borderColor: `${getTypeColor(c.type)}33`,
                                        backgroundColor: `${getTypeColor(c.type)}11`,
                                        color: getTypeColor(c.type),
                                      }}
                                    >
                                      {c.name}
                                      <span className="opacity-60">({c.frequency || 0})</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </>
                          );
                        })()}

                        {/* Aliases */}
                        {selectedConcept.aliases && selectedConcept.aliases.length > 0 && (
                          <>
                            <Separator />
                            <div>
                              <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                                Aliases
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedConcept.aliases.map((alias: string) => (
                                  <Badge key={alias} variant="secondary" className="text-xs">
                                    {alias}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Co-occurrence Insight */}
                        {sections.length > 0 && (
                          <>
                            <Separator />
                            <div>
                              <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                                Document Occurrences
                              </h4>
                              {(() => {
                                const docIds = getDocumentsForConcept(selectedConcept);
                                if (docIds.length === 0) {
                                  return (
                                    <p className="text-xs text-[var(--text-muted)]">
                                      No document matches found
                                    </p>
                                  );
                                }
                                const uniqueDocs = Array.from(new Set(docIds));
                                return (
                                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                                    {uniqueDocs.map((docId) => (
                                      <div
                                        key={docId}
                                        className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]"
                                      >
                                        <FileStackIcon className="w-3 h-3 text-[var(--text-muted)]" />
                                        <span className="truncate">{docId}</span>
                                      </div>
                                    ))}
                                  </div>
                                );
                              })()}
                            </div>
                          </>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-8 text-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mx-auto mb-3">
                          <Search className="w-5 h-5 text-[var(--text-muted)]" />
                        </div>
                        <p className="text-sm text-[var(--text-muted)]">
                          Select a concept to view its details
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

/* ---- Sub-components ---- */

function FrequencyTier({
  icon,
  label,
  description,
  count,
  total,
  color,
  bg,
  border,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  count: number;
  total: number;
  color: string;
  bg: string;
  border: string;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-[var(--card-bg)]">
      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", bg)}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
          <span className="text-xs text-[var(--text-muted)]">{description}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
          <span className="text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">
            {count}
          </span>
        </div>
      </div>
    </div>
  );
}

function ConceptRow({
  concept,
  index,
  isSelected,
  onClick,
}: {
  concept: any;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.3) }}
      onClick={onClick}
      className={cn(
        "w-full text-left p-3 rounded-lg border transition-all duration-200 group",
        isSelected
          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
          : "border-transparent hover:bg-[var(--hover-bg)]"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-medium text-[var(--text-primary)]">{concept.name}</span>
            <Badge variant="secondary" className="text-[10px] py-0">
              {concept.frequency || 0}
            </Badge>
          </div>
          {concept.description && (
            <p className="text-xs text-[var(--text-muted)] line-clamp-1 mb-1.5">
              {concept.description}
            </p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getTypeColor(concept.type) }}
              />
              <span className="text-[10px] text-[var(--text-muted)]">{getTypeLabel(concept.type)}</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)]">
              {(concept.relatedConcepts?.length || 0)} connections
            </span>
            {concept.aliases && concept.aliases.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                {concept.aliases.slice(0, 3).map((alias: string) => (
                  <span
                    key={alias}
                    className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded"
                  >
                    {alias}
                  </span>
                ))}
                {concept.aliases.length > 3 && (
                  <span className="text-[10px] text-[var(--text-muted)]">
                    +{concept.aliases.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
      </div>
    </motion.button>
  );
}

function ClusterCard({
  cluster,
  onConceptClick,
}: {
  cluster: any;
  onConceptClick: (c: any) => void;
}) {
  return (
    <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--color-primary)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {cluster.label || `Cluster ${cluster.id}`}
          </span>
        </div>
        <Badge variant="secondary" className="text-xs">
          {cluster.memberCount} members
        </Badge>
      </div>
      {cluster.topTerms?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {cluster.topTerms.slice(0, 6).map((term: string) => (
            <Badge key={term} variant="outline" className="text-[10px]">
              {term}
            </Badge>
          ))}
        </div>
      )}
      <Separator className="mb-3" />
      {cluster.topConcepts.length > 0 ? (
        <div className="space-y-1.5">
          {cluster.topConcepts.map((c: any) => (
            <button
              key={c.id}
              onClick={() => onConceptClick(c)}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-[var(--hover-bg)] transition-colors text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: getTypeColor(c.type) }}
                />
                <span className="text-sm text-[var(--text-primary)] truncate">{c.name}</span>
              </div>
              <span className="text-xs text-[var(--text-muted)] shrink-0">{c.frequency || 0}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[var(--text-muted)]">No concepts in cluster</p>
      )}
    </div>
  );
}

function StatBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-2.5 rounded-lg bg-[var(--bg-secondary)] flex items-center gap-2">
      <div className="text-[var(--text-muted)]">{icon}</div>
      <div>
        <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{label}</div>
        <div className="text-sm font-semibold text-[var(--text-primary)]">{value}</div>
      </div>
    </div>
  );
}

/* ---- Inline icon components (to avoid extra imports) ---- */

function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 16}
      height={props.height || 16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function FileStackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 16}
      height={props.height || 16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
      <path d="M9 15h6" />
      <path d="M9 11h6" />
    </svg>
  );
}
