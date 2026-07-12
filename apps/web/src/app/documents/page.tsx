"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FileText,
  FileStack,
  Tag,
  Search,
  ChevronRight,
  SortAsc,
  SortDesc,
  Hash,
  TrendingUp,
  Target,
  Star,
  Activity,
  Map as MapIcon,
  ArrowRight,
  Eye,
  Layers,
  Link,
  Zap,
  BookOpen,
} from "lucide-react";
import { Skeleton } from "@/components/LoadingSkeleton";
import { useStore } from "@/lib/store";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { StatisticsCards } from "@/components/StatisticsCards";

interface DocumentMeta {
  id: string;
  title: string;
  docId: string;
  sectionCount: number;
  conceptCount: number;
  tags: string[];
  importance: number;
  importancePercentile: number;
  conceptDensity: number;
  maxDepth: number;
  summary?: string;
  clusterIds: string[];
  conceptTags: string[];
  relatedDocIds: string[];
}

interface SectionNode {
  id: string;
  title: string;
  importance: number;
  conceptTags: string[];
  level: number;
  parentId: string | null;
  childIds: string[];
  children: SectionNode[];
}

const importanceColor = (score: number): string => {
  if (score < 0.3) return "var(--error)";
  if (score < 0.6) return "var(--warning)";
  return "var(--success)";
};

const importanceVariant = (score: number): string => {
  if (score < 0.3) return "destructive";
  if (score < 0.6) return "warning";
  return "success";
};

function buildSectionTree(
  sections: any[],
  conceptMap: Map<string, Set<string>>
): SectionNode[] {
  const sectionMap = new Map() as Map<string, SectionNode>;

  sections.forEach((section) => {
    const node: SectionNode = {
      id: section.id,
      title: section.title || "Untitled",
      importance: section.importance ?? 0.5,
      conceptTags: Array.from(conceptMap.get(section.id) || []),
      level: section.level ?? 1,
      parentId: section.parentId ?? null,
      childIds: section.childIds ?? [],
      children: [],
    };
    sectionMap.set(section.id, node);
  });

  const roots: SectionNode[] = [];
  sectionMap.forEach((node) => {
    if (!node.parentId || !sectionMap.has(node.parentId)) {
      node.children = node.childIds
        .map((id) => sectionMap.get(id))
        .filter(Boolean) as SectionNode[];
      roots.push(node);
    }
  });

  function sortChildren(nodes: SectionNode[]) {
    nodes.sort((a, b) => a.importance - b.importance);
    nodes.forEach((n) => sortChildren(n.children));
  }
  sortChildren(roots);

  return roots;
}

export default function DocumentsPage() {
  const sections = useStore((s) => s.sections);
  const concepts = useStore((s) => s.concepts);
  const clusters = useStore((s) => s.clusters);
  const statistics = useStore((s) => s.statistics);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"importance" | "title" | "sections">("importance");
  const [sortDesc, setSortDesc] = useState(true);
  const [activeTag, setActiveTag] = useState<string>("");
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const conceptMap = useMemo(() => {
    const map = new Map<string, Set<string>>() as Map<string, Set<string>>;
    concepts.forEach((c) => {
      if (!c.embeddingOffset) return;
      const section = sections.find(
        (s) =>
          s.startOffset <= c.embeddingOffset &&
          s.endOffset >= c.embeddingOffset
      );
      if (section) {
        const tag = c.name || c.type;
        if (!map.has(section.id)) map.set(section.id, new Set());
        map.get(section.id)!.add(tag);
      }
    });
    return map;
  }, [sections, concepts]);

  const documentList = useMemo((): DocumentMeta[] => {
    const docMap = new Map<string, any>() as Map<string, any>;

    sections.forEach((section) => {
      const docId = section.docId || section.id;
      const existing = docMap.get(docId);
      const title =
        section.title ||
        (section.headingPath && section.headingPath.length > 0
          ? section.headingPath.join(" > ")
          : `Document ${docId}`);
      const tags = Array.isArray(section.tags) ? section.tags : section.tags ? [section.tags] : [];
      const importance = section.importance ?? 0.5;
      const summary = section.summary;
      const level = section.level ?? 1;

      if (existing) {
        existing.sectionCount += 1;
        if (level > existing.maxDepth) existing.maxDepth = level;
        if (tags.length > 0) {
          tags.forEach((t: string) => existing.tagsSet.add(t));
        }
      } else {
        const tagsSet = new Set<string>();
        tags.forEach((t: string) => tagsSet.add(t));
        docMap.set(docId, {
          id: docId,
          title,
          docId,
          sectionCount: 1,
          conceptCount: 0,
          tagsSet,
          tags: [] as string[],
          importance: importance,
          maxDepth: level,
          summary,
          clusterIds: [] as string[],
          conceptTags: [] as string[],
        });
      }
    });

    concepts.forEach((c) => {
      if (!c.embeddingOffset) return;
      const section = sections.find(
        (s) =>
          s.startOffset <= c.embeddingOffset &&
          s.endOffset >= c.embeddingOffset
      );
      if (section) {
        const docId = section.docId || section.id;
        const doc = docMap.get(docId);
        if (doc) {
          doc.conceptCount += 1;
          const tag = c.name || c.type;
          if (!doc.conceptTags.includes(tag)) {
            doc.conceptTags.push(tag);
          }
          if (c.clusterId) {
            if (!doc.clusterIds.includes(c.clusterId)) {
              doc.clusterIds.push(c.clusterId);
            }
          }
        }
      }
    });

    const docs = Array.from(docMap.values());
    docs.forEach((d) => {
      d.tags = Array.from(d.tagsSet);
    });

    const avgImportance =
      docs.length > 0
        ? docs.reduce((sum, d) => sum + d.importance, 0) / docs.length
        : 0;
    const sortedByImportance = [...docs].sort((a, b) => a.importance - b.importance);

    const result: DocumentMeta[] = docs.map((doc, idx) => {
      const rank = sortedByImportance.findIndex((d) => d.id === doc.id);
      const percentile =
        docs.length > 1 ? rank / (docs.length - 1) : 0.5;
      const conceptDensity =
        doc.sectionCount > 0 ? doc.conceptCount / doc.sectionCount : 0;
      const conceptTagSet = new Set<string>();
      doc.conceptTags.forEach((t) => conceptTagSet.add(t));

      return {
        ...doc,
        importancePercentile: percentile,
        conceptDensity,
        conceptTags: doc.conceptTags,
        clusterIds: doc.clusterIds,
      };
    });

    const relatedMap = new Map<string, Map<string, number>>() as Map<string, Map<string, number>>;
    result.forEach((doc) => {
      const tagSet = new Set(doc.conceptTags);
      let overlap = new Map<string, number>() as Map<string, number>;
      result.forEach((other) => {
        if (other.id === doc.id) return;
        let count = 0;
        other.conceptTags.forEach((t) => {
          if (tagSet.has(t)) count++;
        });
        if (count > 0) overlap.set(other.id, count);
      });
      overlap = new Map([...overlap.entries()].sort((a, b) => b[1] - a[1])) as Map<
        string,
        number
      >;
      relatedMap.set(doc.id, overlap);
    });

    result.forEach((doc) => {
      const overlap = relatedMap.get(doc.id) || new Map();
      doc.relatedDocIds = Array.from(overlap.keys()).slice(0, 3);
    });

    return result;
  }, [sections, concepts]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    documentList.forEach((doc) => {
      doc.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [documentList]);

  const filteredAndSorted = useMemo(() => {
    let filtered = documentList;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(q) ||
          doc.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (activeTag) {
      filtered = filtered.filter((doc) => doc.tags.includes(activeTag));
    }

    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "importance":
          cmp = a.importance - b.importance;
          break;
        case "sections":
          cmp = a.sectionCount - b.sectionCount;
          break;
      }
      return sortDesc ? -cmp : cmp;
    });

    return sorted;
  }, [documentList, sortBy, sortDesc, searchQuery, activeTag]);

  const statsCards = useMemo(() => {
    const totalSections = sections.length;
    const totalDocs = documentList.length;
    const avgSections =
      totalDocs > 0 ? Math.round((totalSections / totalDocs) * 10) / 10 : 0;
    const totalConcepts = concepts.length;

    return [
      {
        label: "Total Documents",
        value: totalDocs,
        icon: <FileText className="w-5 h-5" />,
        color: "var(--color-primary)",
        subtitle: totalSections > 0 ? `${totalSections} sections` : undefined,
      },
      {
        label: "Avg Sections / Document",
        value: avgSections,
        icon: <FileStack className="w-5 h-5" />,
        color: "var(--success)",
        subtitle:
          totalDocs > 0
            ? `Across ${totalDocs} documents`
            : undefined,
      },
      {
        label: "Total Concepts",
        value: totalConcepts,
        icon: <Hash className="w-5 h-5" />,
        color: "var(--warning)",
        subtitle:
          concepts.length > 0
            ? `From ${concepts.length} extractions`
            : undefined,
      },
    ];
  }, [sections, concepts, documentList]);

  const handleSort = (field: "importance" | "title" | "sections") => {
    if (sortBy === field) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(field);
      setSortDesc(true);
    }
  };

  const toggleDocExpand = (docId: string) => {
    setExpandedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  const toggleSectionExpand = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  function SectionTree({
    nodes,
    depth = 0,
  }: {
    nodes: SectionNode[];
    depth?: number;
  }) {
    return (
      <div className="space-y-1">
        {nodes.map((node) => {
          const isExpanded = expandedSections.has(node.id);
          const hasChildren = node.children.length > 0;
          const isLeaf = !hasChildren;
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn("ml-2", depth > 0 && "ml-4")}
              style={{ marginLeft: depth > 0 ? `${depth * 16}px` : "0px" }}
            >
              <div
                className={cn(
                  "flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer transition-colors group",
                  "hover:bg-[var(--hover-bg)]"
                )}
                onClick={() => toggleSectionExpand(node.id)}
              >
                {hasChildren ? (
                  <ChevronRight
                    className={cn(
                      "w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 flex-shrink-0",
                      isExpanded && "rotate-90"
                    )}
                  />
                ) : (
                  <div className="w-3.5 h-3.5 flex-shrink-0" />
                )}
                <span className="text-sm text-[var(--text-primary)] truncate flex-1">
                  {node.title}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-12 h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.round(node.importance * 100)}%`,
                        backgroundColor: importanceColor(node.importance),
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono w-6 text-right">
                    {node.importance.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-1">
                  {node.conceptTags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[9px] px-1.5 py-0 h-4"
                    >
                      {tag.length > 12 ? tag.slice(0, 10) + "..." : tag}
                    </Badge>
                  ))}
                  {node.conceptTags.length > 2 && (
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4">
                      +{node.conceptTags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {isExpanded && hasChildren && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden"
                  >
                    <SectionTree nodes={node.children} depth={depth + 1} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Documents
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card">
              <div className="flex items-center gap-3">
                <Skeleton type="circle" className="w-10 h-10" />
                <div className="space-y-2 flex-1">
                  <Skeleton type="text" className="h-4 w-24" />
                  <Skeleton type="text" className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="py-4 border-b border-[var(--border-color)] last:border-b-0">
              <div className="flex items-center gap-4">
                <Skeleton type="circle" className="w-10 h-10" />
                <div className="flex-1 space-y-2">
                  <Skeleton type="text" className="h-4 w-1/3" />
                  <Skeleton type="text" className="h-3 w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
            <FileStack className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Documents
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {documentList.length} document{documentList.length !== 1 ? "s" : ""}{" "}
              · {sections.length} section{sections.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <StatisticsCards cards={statsCards} />

      {/* Top Bar Controls */}
      <Card>
        <div className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents by title or tag..."
                className="pl-9"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-[var(--text-muted)] mr-1">Sort:</span>
              {(["importance", "title", "sections"] as const).map((field) => (
                <Button
                  key={field}
                  variant={sortBy === field ? "default" : "ghost"}
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSort(field)}
                >
                  {field === "importance"
                    ? "Importance"
                    : field === "title"
                    ? "Title"
                    : "Sections"}
                  {sortBy === field &&
                    (sortDesc ? (
                      <SortDesc className="w-3 h-3 ml-1" />
                    ) : (
                      <SortAsc className="w-3 h-3 ml-1" />
                    ))}
                </Button>
              ))}
            </div>
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-muted)]">Filter by tag:</span>
              <Button
                variant={activeTag === "" ? "default" : "ghost"}
                size="sm"
                className="text-xs"
                onClick={() => setActiveTag("")}
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={activeTag === tag ? "default" : "ghost"}
                  size="sm"
                  className="text-xs"
                  onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Document List */}
      {documentList.length > 0 ? (
        <ScrollArea className="space-y-3" style={{ maxHeight: "calc(100vh - 500px)" }}>
          {filteredAndSorted.map((doc, index) => {
            const isTopDoc = sortBy === "importance" && index < 5 && sortDesc;
            const isBottomDoc =
              sortBy === "importance" && index >= filteredAndSorted.length - 5 && sortDesc;
            const isExpanded = expandedDocs.has(doc.id);
            const isRelated = doc.relatedDocIds.length > 0;

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.02, 0.2) }}
              >
                <Card
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    isExpanded && "ring-1 ring-[var(--color-primary)]/30",
                    isBottomDoc && "opacity-60"
                  )}
                >
                  {/* Document Header */}
                  <div
                    className="p-4 cursor-pointer hover:bg-[var(--hover-bg)] transition-colors"
                    onClick={() => toggleDocExpand(doc.id)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Importance indicator bar */}
                      <div
                        className="w-1.5 h-12 rounded-full flex-shrink-0 mt-1"
                        style={{ backgroundColor: importanceColor(doc.importance) }}
                      />

                      <div className="flex-1 min-w-0">
                        {/* Title row */}
                        <div className="flex items-center gap-2">
                          <FileText
                            className={cn(
                              "w-4 h-4 flex-shrink-0",
                              isTopDoc && "text-[var(--success)]"
                            )}
                          />
                          <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                            {doc.title}
                          </span>
                          {isTopDoc && (
                            <Star className="w-3.5 h-3.5 text-[var(--success)] flex-shrink-0" />
                          )}
                        </div>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[var(--text-muted)]">
                          <div className="flex items-center gap-1">
                            <FileStack className="w-3 h-3" />
                            <span>{doc.sectionCount} section{doc.sectionCount !== 1 ? "s" : ""}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            <span>{doc.conceptCount} concepts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            <span>Depth: {doc.maxDepth}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="w-3 h-3" />
                            <span>
                              Density: {doc.conceptDensity.toFixed(1)}
                            </span>
                          </div>

                          {/* Importance bar */}
                          <div className="flex items-center gap-1.5">
                            <Target className="w-3 h-3" />
                            <div className="w-16 h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${Math.round(doc.importance * 100)}%`,
                                  backgroundColor: importanceColor(doc.importance),
                                }}
                              />
                            </div>
                            <span className="font-mono">
                              {doc.importance.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-[var(--text-muted)]">
                              ({Math.round(doc.importancePercentile * 100)}%)
                            </span>
                          </div>
                        </div>

                        {/* Tags */}
                        {doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {doc.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant={
                                  activeTag === tag ? "default" : "secondary"
                                }
                                className="cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveTag(activeTag === tag ? "" : tag);
                                }}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Expand chevron */}
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 text-[var(--text-muted)] flex-shrink-0 transition-transform duration-200",
                          isExpanded && "rotate-90"
                        )}
                      />
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Separator />
                        <div className="p-4 space-y-4">
                          {/* Section Tree */}
                          <div>
                            <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <FileStack className="w-3 h-3" />
                              Sections
                            </h3>
                            <div className="bg-[var(--bg-tertiary)]/50 rounded-lg p-3">
                              {sections.filter(
                                (s) =>
                                  (s.docId || s.id) === doc.id
                              ).length > 0 ? (
                                <SectionTree
                                  nodes={buildSectionTree(
                                    sections.filter(
                                      (s) =>
                                        (s.docId || s.id) === doc.id
                                    ),
                                    conceptMap
                                  )}
                                />
                              ) : (
                                <p className="text-xs text-[var(--text-muted)] italic">
                                  No sections found
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Concept Tags */}
                          {doc.conceptTags.length > 0 && (
                            <div>
                              <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Hash className="w-3 h-3" />
                                Concepts ({doc.conceptTags.length})
                              </h3>
                              <div className="flex flex-wrap gap-1.5">
                                {doc.conceptTags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="default"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Cluster Coverage */}
                          {doc.clusterIds.length > 0 && (
                            <div>
                              <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <MapIcon className="w-3 h-3" />
                                Cluster Coverage
                                <span className="text-[10px] font-normal text-[var(--text-muted)]">
                                  ({doc.clusterIds.length} cluster
                                  {doc.clusterIds.length !== 1 ? "s" : ""})
                                </span>
                              </h3>
                              {doc.clusterIds.length >= 3 && (
                                <Badge
                                  variant="warning"
                                  className="text-xs mb-2"
                                >
                                  <Zap className="w-3 h-3 mr-1" />
                                  Cross-cutting document
                                </Badge>
                              )}
                              <div className="flex flex-wrap gap-1">
                                {doc.clusterIds.map((cid) => {
                                  const cluster = clusters.find(
                                    (c) => c.id === cid
                                  );
                                  return (
                                    <Badge
                                      key={cid}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {cluster?.label || cluster?.topTerms?.join(", ") || cid}
                                    </Badge>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Related Documents */}
                          {isRelated && (
                            <div>
                              <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Link className="w-3 h-3" />
                                Related Documents
                              </h3>
                              <div className="space-y-1.5">
                                {doc.relatedDocIds.map((relatedId) => {
                                  const related = documentList.find(
                                    (d) => d.id === relatedId
                                  );
                                  if (!related) return null;
                                  return (
                                    <div
                                      key={relatedId}
                                      className="flex items-center gap-2 p-2 rounded-md bg-[var(--bg-tertiary)]/50 hover:bg-[var(--hover-bg)] cursor-pointer transition-colors"
                                      onClick={() =>
                                        toggleDocExpand(relatedId)
                                      }
                                    >
                                      <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
                                      <span className="text-xs text-[var(--text-primary)] truncate flex-1">
                                        {related.title}
                                      </span>
                                      <Badge variant="secondary" className="text-[10px]">
                                        {documentList
                                          .find((d) => d.id === doc.id)
                                          ?.conceptTags.filter((t) =>
                                            related.conceptTags.includes(t)
                                          ).length || 0}{" "}
                                        shared concepts
                                      </Badge>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Summary */}
                          {doc.summary && (
                            <div>
                              <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <BookOpen className="w-3 h-3" />
                                Summary
                              </h3>
                              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                {doc.summary}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </ScrollArea>
      ) : (
        <div className="card py-16 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-[var(--text-muted)] opacity-40" />
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
            No documents found
          </h3>
          <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
            No documents match your current filters. Try compiling more source
            data or adjusting your search and tag filters.
          </p>
        </div>
      )}
    </div>
  );
}
