"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  FileText,
  Hash,
  ChevronRight,
  ExternalLink,
  Filter,
  BookOpen,
  Network,
  Brain,
  TrendingUp,
  Target,
  Zap,
  Sparkles,
  X,
  ArrowRight,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/LoadingSkeleton";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

interface SearchResult {
  id: string;
  text: string;
  docId: string;
  sectionId?: string;
  score: number;
  tokens: string[];
  type: "entry" | "concept" | "document" | "section";
}

function highlightText(text: string, terms: string[]): string {
  if (terms.length === 0) return text;
  let result = text;
  for (const term of terms) {
    if (!term) continue;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    result = result.replace(regex, '<mark class="bg-[var(--color-primary)]/25 text-[var(--text-primary)] px-0.5 rounded-sm">$1</mark>');
  }
  return result;
}

function truncateText(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/[\s.]+$/, "") + "...";
}

export default function SearchPage() {
  const searchEntries = useStore((s) => s.searchEntries);
  const concepts = useStore((s) => s.concepts);
  const clusters = useStore((s) => s.clusters);
  const sections = useStore((s) => s.sections);
  const statistics = useStore((s) => s.statistics);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [highlightedTerms, setHighlightedTerms] = useState<string[]>([]);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);
  const [showFacets, setShowFacets] = useState(false);
  const [searchTimeMs, setSearchTimeMs] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
      if (e.key === "Escape") {
        setQuery("");
        setResults([]);
        setHighlightedTerms([]);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setHighlightedTerms([]);
        setSearchTimeMs(0);
        return;
      }

      const start = performance.now();
      const terms = searchQuery
        .toLowerCase()
        .split(/\s+/)
        .filter((t) => t.length > 1);
      setHighlightedTerms(terms);

      const q = searchQuery.toLowerCase();

      const matchedEntries: SearchResult[] = searchEntries
        .map((entry: any) => ({
          id: entry.id,
          text: entry.text || "",
          docId: entry.docId || "",
          sectionId: entry.sectionId,
          score: entry.score || 0,
          tokens: entry.tokens || [],
          type: "entry" as const,
        }))
        .filter((entry) => {
          const textLower = entry.text.toLowerCase();
          return terms.some((term) => textLower.includes(term));
        })
        .sort((a, b) => b.score - a.score);

      const conceptMatches: SearchResult[] = concepts
        .filter((c) => {
          const nameLower = (c.name || "").toLowerCase();
          return terms.some((term) => nameLower.includes(term));
        })
        .map((c) => ({
          id: `concept-${c.id}`,
          text: c.description || c.name || "",
          docId: "",
          sectionId: undefined,
          score: c.frequency || 0,
          tokens: [],
          type: "concept" as const,
        }))
        .sort((a, b) => b.score - a.score);

      const docMap = new Map<string, { entryCount: number; bestScore: number; sectionIds: Set<string> }>();
      for (const entry of matchedEntries) {
        const existing = docMap.get(entry.docId) || { entryCount: 0, bestScore: 0, sectionIds: new Set() };
        existing.entryCount++;
        existing.bestScore = Math.max(existing.bestScore, entry.score);
        if (entry.sectionId) existing.sectionIds.add(entry.sectionId);
        docMap.set(entry.docId, existing);
      }

      const documentResults: SearchResult[] = Array.from(docMap.entries())
        .map(([docId, data]) => ({
          id: `doc-${docId}`,
          text: `${data.entryCount} matching passages in this document`,
          docId,
          sectionId: undefined,
          score: data.bestScore,
          tokens: [],
          type: "document" as const,
          _entryCount: data.entryCount,
          _sectionIds: data.sectionIds,
        }))
        .sort((a, b) => b.score - a.score);

      const sectionResults = matchedEntries.filter(
        (e, i, arr) =>
          arr.findIndex((x) => x.sectionId === e.sectionId && x.sectionId) === i
      ).map((e) => ({
        id: `section-${e.sectionId || e.id}`,
        text: sections.find((s) => s.id === e.sectionId)?.title || e.sectionId || e.docId,
        docId: e.docId,
        sectionId: e.sectionId,
        score: e.score,
        tokens: [],
        type: "section" as const,
      }));

      const allResults = [...matchedEntries, ...conceptMatches]
        .sort((a, b) => b.score - a.score)
        .slice(0, 50);

      const elapsed = performance.now() - start;
      setSearchTimeMs(elapsed);

      setResults(allResults);
    },
    [searchEntries, concepts, sections]
  );

  const debouncedSearch = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const handleResultClick = useCallback((id: string) => {
    setExpandedResult(expandedResult === id ? null : id);
  }, [expandedResult]);

  const getSectionTitle = useCallback(
    (sectionId: string) => {
      return sections.find((s) => s.id === sectionId)?.title || sectionId;
    },
    [sections]
  );

  const getRelatedConceptsForSection = useCallback(
    (sectionId: string) => {
      const section = sections.find((s) => s.id === sectionId);
      if (!section) return [];
      const sectionText = section.summary || "";
      return concepts.filter((c) =>
        (c.name || "").toLowerCase().split(/\s+/).some(
          (word) => word && sectionText.toLowerCase().includes(word)
        )
      ).slice(0, 5);
    },
    [sections, concepts]
  );

  const uniqueSections = useMemo(() => {
    if (results.length === 0) return 0;
    const s = new Set<string>();
    for (const r of results) {
      if (r.sectionId) s.add(r.sectionId);
      if (r.type === "section") s.add(r.sectionId || "");
    }
    return s.size || 1;
  }, [results]);

  const popularConcepts = useMemo(() => {
    return [...concepts]
      .sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
      .slice(0, 5);
  }, [concepts]);

  const trendingClusters = useMemo(() => {
    return [...clusters]
      .sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0))
      .slice(0, 3);
  }, [clusters]);

  const relatedSearches = useMemo(() => {
    if (!query.trim() || highlightedTerms.length === 0) return [];
    const allConcepts = concepts.filter((c) => {
      const name = (c.name || "").toLowerCase();
      return highlightedTerms.some(
        (term) => name.includes(term) && !concepts.some((c2) => (c2.name || "").toLowerCase() === name)
      );
    });

    const unique = new Set<string>();
    highlightedTerms.forEach((term) => {
      concepts.forEach((c) => {
        if ((c.name || "").toLowerCase().includes(term)) {
          unique.add(c.name || "");
        }
      });
    });
    return Array.from(unique).slice(0, 6);
  }, [query, highlightedTerms, concepts]);

  const docGroups = useMemo(() => {
    if (results.length === 0) return [];
    const docCounts = new Map<string, number>();
    for (const r of results) {
      if (r.type === "entry" || r.type === "document") {
        const count = docCounts.get(r.docId) || 0;
        docCounts.set(r.docId, count + 1);
      }
    }
    return Array.from(docCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [results]);

  const formatScore = (score: number): string => {
    if (score >= 1) return score.toFixed(2);
    if (score >= 0.1) return score.toFixed(3);
    return score.toFixed(4);
  };

  const getScoreColor = (score: number): string => {
    if (score > 1) return "bg-[var(--success)]";
    if (score > 0.5) return "bg-[var(--color-primary)]";
    if (score > 0.1) return "bg-[var(--warning)]";
    return "bg-[var(--text-muted)]";
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <Search className="w-7 h-7 text-[var(--color-primary)]" strokeWidth={1.5} />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Search Knowledge Base
          </h1>
        </motion.div>
        <Skeleton type="rect" className="h-14 w-full mb-6" />
        <div className="space-y-4">
          <Skeleton type="rect" className="h-24 w-full" />
          <Skeleton type="rect" className="h-24 w-full" />
          <Skeleton type="rect" className="h-24 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="p-2 rounded-lg bg-[var(--color-primary)]/10">
          <Search className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            Search Knowledge Base
          </h1>
          {statistics && (
            <p className="text-xs text-[var(--text-muted)]">
              {statistics.documentCount || 0} documents · {statistics.sectionCount || 0} sections · {concepts.length} concepts
            </p>
          )}
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative mb-4"
      >
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
          strokeWidth={2}
        />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search concepts, documents, sections..."
          className="pl-10 pr-10 h-12 text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setHighlightedTerms([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-[var(--text-muted)] pointer-events-none">
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-tertiary)]">
            /
          </kbd>
          <span className="hidden sm:inline">focus</span>
        </div>
      </motion.div>

      {/* Mobile facet toggle */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:hidden mb-3"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFacets(!showFacets)}
            className="w-full"
          >
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            {showFacets ? "Hide" : "Show"} facets
          </Button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {/* Empty state: no query */}
        {!query && (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 mb-4"
              >
                <Sparkles className="w-8 h-8 text-[var(--color-primary)]" />
              </motion.div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                Search your compiled knowledge
              </h2>
              <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
                Explore concepts, documents, and sections across your entire knowledge base.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/concepts">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="block"
                >
                  <Card className="cursor-pointer hover:border-[var(--color-primary)]/50 transition-colors h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 rounded-md bg-[var(--color-primary)]/10">
                          <Brain className="w-4 h-4 text-[var(--color-primary)]" />
                        </div>
                        <CardTitle className="text-sm">Explore Concepts</CardTitle>
                      </div>
                      <CardDescription className="text-xs">
                        {concepts.length} concepts available
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <span className="text-xs text-[var(--color-primary)] flex items-center gap-1">
                        Browse concepts <ArrowRight className="w-3 h-3" />
                      </span>
                    </CardFooter>
                  </Card>
                </motion.div>
              </Link>

              <Link href="/clusters">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="block"
                >
                  <Card className="cursor-pointer hover:border-[var(--color-primary)]/50 transition-colors h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 rounded-md bg-[var(--color-primary)]/10">
                          <Network className="w-4 h-4 text-[var(--color-primary)]" />
                        </div>
                        <CardTitle className="text-sm">Browse Clusters</CardTitle>
                      </div>
                      <CardDescription className="text-xs">
                        {clusters.length} clusters available
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <span className="text-xs text-[var(--color-primary)] flex items-center gap-1">
                        View clusters <ArrowRight className="w-3 h-3" />
                      </span>
                    </CardFooter>
                  </Card>
                </motion.div>
              </Link>
            </div>

            {/* Popular concepts */}
            {popularConcepts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[var(--text-muted)]" />
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">
                    Popular Concepts
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularConcepts.map((concept) => (
                    <button
                      key={concept.id}
                      onClick={() => handleQueryChange(concept.name || "")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-xs text-[var(--text-secondary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all"
                    >
                      <Hash className="w-3 h-3" />
                      {concept.name}
                      <span className="text-[var(--text-muted)]">
                        {concept.frequency}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Trending terms from clusters */}
            {trendingClusters.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mt-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-[var(--text-muted)]" />
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">
                    Trending Terms
                  </h3>
                </div>
                <div className="space-y-2">
                  {trendingClusters.map((cluster) => (
                    <button
                      key={cluster.id}
                      onClick={() => {
                        const term = cluster.topTerms?.[0] || cluster.label || "";
                        if (term) handleQueryChange(term);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--color-primary)]/50 transition-all group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                          {cluster.label || cluster.topTerms?.[0] || "Cluster"}
                        </span>
                        <div className="flex gap-1">
                          {(cluster.topTerms || []).slice(0, 3).map((term: string) => (
                            <span
                              key={term}
                              className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded"
                            >
                              {term}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="secondary" className="text-[10px]">
                          {cluster.memberCount} members
                        </Badge>
                        <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* No results */}
        {query && results.length === 0 && (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--bg-tertiary)] mb-4"
            >
              <Search className="w-6 h-6 text-[var(--text-muted)]" strokeWidth={1.5} />
            </motion.div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">
              No results found
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto mb-4">
              No results matched &quot;{query}&quot;. Try using different terms or check your spelling.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {highlightedTerms.map((term) => (
                <button
                  key={term}
                  onClick={() => handleQueryChange(term)}
                  className="text-xs px-2.5 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results */}
        {query && results.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Results summary */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between flex-wrap gap-2 text-sm"
            >
              <span className="text-[var(--text-muted)]">
                <span className="font-medium text-[var(--text-primary)]">
                  {results.length}
                </span>{" "}
                result{results.length !== 1 ? "s" : ""} in{" "}
                <span className="font-medium text-[var(--text-primary)]">
                  {uniqueSections}
                </span>{" "}
                {uniqueSections === 1 ? "section" : "sections"}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {(searchTimeMs).toFixed(1)}ms
              </span>
            </motion.div>

            {/* Related searches */}
            {relatedSearches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 flex-wrap"
              >
                <Target className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" />
                <span className="text-xs text-[var(--text-muted)]">Related:</span>
                {relatedSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQueryChange(term)}
                    className="text-xs px-2 py-0.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all"
                  >
                    {term}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Most relevant documents */}
            {docGroups.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  <h3 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                    Most Relevant Documents
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {docGroups.map(([docId, count]) => (
                    <TooltipProvider key={docId}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleQueryChange(docId)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[var(--border-color)] bg-[var(--card-bg)] text-xs text-[var(--text-secondary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all"
                          >
                            <FileText className="w-3 h-3" />
                            {docId}
                            <span className="text-[var(--text-muted)]">
                              ({count})
                            </span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{docId} — {count} matches</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Faceted tabs */}
            <div className={cn("lg:block", !showFacets && "hidden lg:block")}>
              <Tabs defaultValue="all">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="all" className="text-xs">
                    All ({results.length})
                  </TabsTrigger>
                  <TabsTrigger value="concepts" className="text-xs">
                    Concepts
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="text-xs">
                    Documents
                  </TabsTrigger>
                  <TabsTrigger value="sections" className="text-xs">
                    Sections
                  </TabsTrigger>
                </TabsList>

                {/* All results */}
                <TabsContent value="all" className="mt-3 space-y-2">
                  {results.map((result, index) => (
                    <ResultCard
                      key={result.id}
                      result={result}
                      expandedResult={expandedResult}
                      onToggle={() => handleResultClick(result.id)}
                      highlightedTerms={highlightedTerms}
                      getSectionTitle={getSectionTitle}
                      getRelatedConceptsForSection={getRelatedConceptsForSection}
                      formatScore={formatScore}
                      getScoreColor={getScoreColor}
                      index={index}
                    />
                  ))}
                </TabsContent>

                {/* Concepts */}
                <TabsContent value="concepts" className="mt-3 space-y-2">
                  {results
                    .filter((r) => r.type === "concept")
                    .map((result, index) => (
                      <ResultCard
                        key={result.id}
                        result={result}
                        expandedResult={expandedResult}
                        onToggle={() => handleResultClick(result.id)}
                        highlightedTerms={highlightedTerms}
                        getSectionTitle={getSectionTitle}
                        getRelatedConceptsForSection={getRelatedConceptsForSection}
                        formatScore={formatScore}
                        getScoreColor={getScoreColor}
                        index={index}
                      />
                    ))}
                  {results.filter((r) => r.type === "concept").length === 0 && (
                    <div className="py-8 text-center text-sm text-[var(--text-muted)]">
                      No concept matches found for this query.
                    </div>
                  )}
                </TabsContent>

                {/* Documents */}
                <TabsContent value="documents" className="mt-3 space-y-2">
                  {results
                    .filter((r) => r.type === "document")
                    .map((result, index) => (
                      <ResultCard
                        key={result.id}
                        result={result}
                        expandedResult={expandedResult}
                        onToggle={() => handleResultClick(result.id)}
                        highlightedTerms={highlightedTerms}
                        getSectionTitle={getSectionTitle}
                        getRelatedConceptsForSection={getRelatedConceptsForSection}
                        formatScore={formatScore}
                        getScoreColor={getScoreColor}
                        index={index}
                      />
                    ))}
                  {results.filter((r) => r.type === "document").length === 0 && (
                    <div className="py-8 text-center text-sm text-[var(--text-muted)]">
                      No document-level matches found.
                    </div>
                  )}
                </TabsContent>

                {/* Sections */}
                <TabsContent value="sections" className="mt-3 space-y-2">
                  {results
                    .filter((r) => r.type === "section")
                    .map((result, index) => (
                      <ResultCard
                        key={result.id}
                        result={result}
                        expandedResult={expandedResult}
                        onToggle={() => handleResultClick(result.id)}
                        highlightedTerms={highlightedTerms}
                        getSectionTitle={getSectionTitle}
                        getRelatedConceptsForSection={getRelatedConceptsForSection}
                        formatScore={formatScore}
                        getScoreColor={getScoreColor}
                        index={index}
                      />
                    ))}
                  {results.filter((r) => r.type === "section").length === 0 && (
                    <div className="py-8 text-center text-sm text-[var(--text-muted)]">
                      No section-level matches found.
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ResultCardProps {
  result: SearchResult;
  expandedResult: string | null;
  onToggle: () => void;
  highlightedTerms: string[];
  getSectionTitle: (id: string) => string;
  getRelatedConceptsForSection: (sectionId: string) => any[];
  formatScore: (score: number) => string;
  getScoreColor: (score: number) => string;
  index: number;
}

function ResultCard({
  result,
  expandedResult,
  onToggle,
  highlightedTerms,
  getSectionTitle,
  getRelatedConceptsForSection,
  formatScore,
  getScoreColor,
  index,
}: ResultCardProps) {
  const concepts = useStore((s) => s.concepts);

  const typeBadge = useMemo(() => {
    switch (result.type) {
      case "concept":
        return { label: "Concept", variant: "default" as const, icon: Brain };
      case "document":
        return { label: "Document", variant: "secondary" as const, icon: FileText };
      case "section":
        return { label: "Section", variant: "secondary" as const, icon: BookOpen };
      default:
        return { label: "Result", variant: "outline" as const, icon: Search };
    }
  }, [result.type]);

  const BadgeIcon = typeBadge.icon;

  const relatedConcepts = useMemo(() => {
    if (result.type === "concept") {
      const concept = concepts.find((c) => c.id === result.id.replace("concept-", ""));
      if (!concept) return [];
      return (concept.relatedConcepts || []).slice(0, 5);
    }
    if (result.type === "section" && result.sectionId) {
      return getRelatedConceptsForSection(result.sectionId!);
    }
    return [];
  }, [result, concepts, getRelatedConceptsForSection]);

  const displayText = result.type === "section"
    ? result.text
    : truncateText(result.text, 120);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.2) }}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all hover:border-[var(--color-primary)]/30 overflow-hidden",
          expandedResult === result.id && "border-[var(--color-primary)]/50 shadow-sm"
        )}
        onClick={onToggle}
      >
        <div className="p-4">
          {/* Score bar */}
          <div className="absolute top-0 left-0 w-1 h-full">
            <div
              className={cn("w-full", getScoreColor(result.score))}
              style={{ opacity: Math.min(result.score, 1) }}
            />
          </div>

          <div className="flex items-start gap-3">
            {/* Type icon */}
            <div className={cn(
              "p-1.5 rounded-md flex-shrink-0 mt-0.5",
              result.type === "concept" ? "bg-[var(--color-primary)]/10" : "bg-[var(--bg-tertiary)]"
            )}>
              <BadgeIcon className={cn(
                "w-3.5 h-3.5",
                result.type === "concept" ? "text-[var(--color-primary)]" : "text-[var(--text-muted)]"
              )} />
            </div>

            <div className="flex-1 min-w-0">
              {/* Header row */}
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge variant={typeBadge.variant} className="text-[10px]">
                  {typeBadge.label}
                </Badge>
                {result.docId && (
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {result.docId}
                  </span>
                )}
                {result.sectionId && (
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    {getSectionTitle(result.sectionId)}
                  </span>
                )}
                <span className="ml-auto text-xs text-[var(--text-muted)] tabular-nums">
                  {formatScore(result.score)}
                </span>
              </div>

              {/* Snippet */}
              <div
                className={cn(
                  "text-sm text-[var(--text-secondary)] leading-relaxed",
                  result.type === "section" ? "" : "line-clamp-2"
                )}
                dangerouslySetInnerHTML={{
                  __html: highlightText(displayText, highlightedTerms),
                }}
              />

              {/* Score bar */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", getScoreColor(result.score))}
                    style={{ width: `${Math.min(Math.max(result.score * 100, 2), 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-[var(--text-muted)] tabular-nums">
                  {formatScore(result.score)}
                </span>
              </div>
            </div>

            <ChevronRight
              className={cn(
                "w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-1 transition-transform",
                expandedResult === result.id && "rotate-90"
              )}
            />
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expandedResult === result.id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Separator className="mx-4" />
              <div className="px-4 pb-4 pt-3 space-y-3">
                {/* Full text for sections */}
                {result.type === "section" && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span className="text-xs font-medium text-[var(--text-muted)] uppercase">
                        Section Content
                      </span>
                    </div>
                    <div
                      className="text-sm text-[var(--text-secondary)] leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(result.text, highlightedTerms),
                      }}
                    />
                  </div>
                )}

                {/* Entry tokens */}
                {(result.tokens && result.tokens.length > 0) && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Hash className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span className="text-xs font-medium text-[var(--text-muted)] uppercase">
                        Terms
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.tokens.map((token) => {
                        const matchedConcept = concepts.find(
                          (c) => (c.name || "").toLowerCase() === token.toLowerCase()
                        );
                        return (
                          <Badge
                            key={token}
                            variant={matchedConcept ? "default" : "secondary"}
                            className="text-[10px]"
                          >
                            {matchedConcept?.name || token}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Related concepts */}
                {relatedConcepts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Network className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span className="text-xs font-medium text-[var(--text-muted)] uppercase">
                        Related
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {relatedConcepts.map((relatedId: string) => {
                        const related = concepts.find(
                          (c) => c.id === relatedId || (c.name || "").toLowerCase() === relatedId.toLowerCase()
                        );
                        if (!related) return null;
                        return (
                          <button
                            key={relatedId}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-[var(--border-color)] bg-[var(--card-bg)] text-xs text-[var(--text-secondary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all"
                          >
                            <Brain className="w-3 h-3" />
                            {related.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
