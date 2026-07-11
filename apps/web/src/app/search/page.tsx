"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Hash, ChevronRight, ExternalLink } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { Skeleton } from "@/components/LoadingSkeleton";
import { useStore } from "@/lib/store";

interface SearchResult {
  id: string;
  text: string;
  docId: string;
  sectionId?: string;
  score: number;
  tokens: string[];
}

export default function SearchPage() {
  const searchEntries = useStore((s) => s.searchEntries);
  const sections = useStore((s) => s.sections);
  const concepts = useStore((s) => s.concepts);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [highlightedTerms, setHighlightedTerms] = useState<string[]>([]);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setHighlightedTerms([]);
        return;
      }

      const terms = searchQuery
        .toLowerCase()
        .split(/\s+/)
        .filter((t) => t.length > 1);
      setHighlightedTerms(terms);

      const q = searchQuery.toLowerCase();
      const matched = searchEntries
        .map((entry: any) => ({
          id: entry.id,
          text: entry.text || "",
          docId: entry.docId || "",
          sectionId: entry.sectionId,
          score: entry.score || 0,
          tokens: entry.tokens || [],
        }))
        .filter((entry) => {
          const textLower = entry.text.toLowerCase();
          return terms.some((term) => textLower.includes(term));
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 50);

      setResults(matched);
    },
    [searchEntries]
  );

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    performSearch(searchQuery);
  };

  const handleResultClick = useCallback(
    (id: string) => {
      setExpandedResult(expandedResult === id ? null : id);
      useStore.getState().setActivePage("graph");
    },
    [expandedResult]
  );

  const getSectionTitle = (sectionId: string) => {
    return sections.find((s) => s.id === sectionId)?.title || sectionId;
  };

  const getConceptName = (term: string) => {
    return concepts.find((c) => c.name.toLowerCase() === term.toLowerCase())?.name || term;
  };

  const highlightText = useCallback(
    (text: string): string => {
      if (highlightedTerms.length === 0) return text;
      let result = text;
      highlightedTerms.forEach((term) => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        result = result.replace(regex, "<mark class='bg-[var(--color-primary)]/30 text-[var(--text-primary)] px-0.5 rounded'>$1</mark>");
      });
      return result;
    },
    [highlightedTerms]
  );

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Search className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Search
          </h1>
        </div>
        <div className="mb-6">
          <Skeleton type="rect" className="h-12 w-full" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card">
              <Skeleton type="text" className="h-5 w-48 mb-2" />
              <Skeleton type="text" className="h-4 w-full mb-1" />
              <Skeleton type="text" className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-6 h-6 text-[var(--color-primary)]" />
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Search
        </h1>
      </div>

      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search across all knowledge..."
        />
      </div>

      {/* Search stats */}
      {query && (
        <div className="flex items-center gap-4 mb-4 text-sm text-[var(--text-muted)]">
          <span>
            {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </span>
          {highlightedTerms.length > 0 && (
            <span>
              Terms: {highlightedTerms.join(", ")}
            </span>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!query ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 text-center text-[var(--text-muted)]"
          >
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Enter a search query to find knowledge</p>
            <p className="text-sm mt-2">
              Search across documents, sections, and concepts.
            </p>
          </motion.div>
        ) : results.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 text-center text-[var(--text-muted)]"
          >
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No results found</p>
            <p className="text-sm mt-2">Try different search terms.</p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.3) }}
              >
                <div
                  className={`card cursor-pointer ${
                    expandedResult === result.id
                      ? "border-[var(--color-primary)]"
                      : ""
                  }`}
                  onClick={() => handleResultClick(result.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                        <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {result.docId}
                        </span>
                        {result.sectionId && (
                          <span className="badge flex-shrink-0">
                            {getSectionTitle(result.sectionId)}
                          </span>
                        )}
                      </div>
                      <div
                        className="text-sm text-[var(--text-secondary)] line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(result.text),
                        }}
                      />
                      {expandedResult === result.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 pt-3 border-t border-[var(--border-color)]"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Hash className="w-3 h-3 text-[var(--text-muted)]" />
                            <span className="text-xs text-[var(--text-muted)] uppercase">
                              Terms
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {result.tokens?.map((token) => (
                              <span key={token} className="badge">
                                {getConceptName(token)}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2">
                            <span className="text-xs text-[var(--text-muted)]">
                              Relevance Score:{" "}
                              <span className="text-[var(--text-primary)] font-medium">
                                {result.score.toFixed(3)}
                              </span>
                            </span>
                          </div>
                          <button
                            className="mt-2 flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              useStore.getState().setActivePage("graph");
                            }}
                          >
                            <ExternalLink className="w-3 h-3" />
                            View in Graph
                          </button>
                        </motion.div>
                      )}
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-1 transition-transform ${
                        expandedResult === result.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
