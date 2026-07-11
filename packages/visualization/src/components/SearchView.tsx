import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SearchViewProps, SearchResult } from "../types.js";
import { DEFAULT_CONFIG, THEME_COLORS } from "../types.js";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

function highlightTerms(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const terms = query
    .split(/\s+/)
    .filter((t) => t.length > 0)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (terms.length === 0) return text;

  const regex = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (regex.test(part)) {
      return (
        <mark
          key={i}
          className="bg-yellow-300/30 text-inherit rounded px-0.5"
        >
          {part}
        </mark>
      );
    }
    return part;
  });
}

function computeRelevance(query: string, text: string): number {
  if (!query.trim()) return 0;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let score = 0;

  if (t.includes(q)) score += 10;

  const queryTerms = q.split(/\s+/).filter(Boolean);
  for (const term of queryTerms) {
    if (t.includes(term)) score += 3;
    if (t.startsWith(term)) score += 2;
  }

  const exactMatches = (t.match(new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || [])
    .length;
  score += exactMatches * 2;

  const normalized = t.length > 0 ? score / (1 + Math.log10(t.length)) : 0;
  return Math.min(normalized, 10);
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const lastSpace = text.lastIndexOf(" ", maxLength);
  const truncated = lastSpace > maxLength * 0.6 ? text.slice(0, lastSpace) : text.slice(0, maxLength);
  return truncated + "…";
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: "result-1",
    title: "Introduction to Machine Learning",
    snippet:
      "Machine learning is a subset of artificial intelligence that enables systems to learn from data and improve performance without being explicitly programmed.",
    relevance: 9.2,
    sectionId: "sec-ml-intro",
  },
  {
    id: "result-2",
    title: "Supervised Learning Algorithms",
    snippet:
      "Supervised learning algorithms learn from labeled training data to make predictions on unseen data. Common algorithms include decision trees, support vector machines, and neural networks.",
    relevance: 8.7,
    sectionId: "sec-supervised",
  },
  {
    id: "result-3",
    title: "Natural Language Processing Fundamentals",
    snippet:
      "Natural Language Processing (NLP) involves the interaction between computers and human language. Key tasks include tokenization, parsing, and semantic analysis.",
    relevance: 8.1,
    sectionId: "sec-nlp-fundamentals",
  },
  {
    id: "result-4",
    title: "Knowledge Graph Construction",
    snippet:
      "Knowledge graphs represent entities and their relationships in a structured format. Construction involves entity extraction, relation extraction, and graph embedding.",
    relevance: 7.5,
    sectionId: "sec-kg-construction",
  },
  {
    id: "result-5",
    title: "Clustering and Dimensionality Reduction",
    snippet:
      "Clustering algorithms group similar data points together. Dimensionality reduction techniques like PCA and t-SNE help visualize high-dimensional data in lower dimensions.",
    relevance: 6.8,
    sectionId: "sec-clustering",
  },
  {
    id: "result-6",
    title: "Deep Learning Architectures",
    snippet:
      "Deep learning uses multi-layered neural networks to learn hierarchical representations. Architectures include CNNs, RNNs, and transformers for various tasks.",
    relevance: 6.2,
    sectionId: "sec-deep-learning",
  },
];

export function SearchView({ onSearch }: SearchViewProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = useMemo(() => DEFAULT_CONFIG, []);
  const theme = THEME_COLORS[config.theme];

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setHasSearched(false);
        onSearch?.(searchQuery, []);
        return;
      }

      setIsSearching(true);
      setTimeout(() => {
        const searchResults = MOCK_RESULTS.filter((r) => {
          const score = computeRelevance(searchQuery, r.title + " " + r.snippet);
          return score > 1;
        }).map((r) => ({
          ...r,
          relevance: computeRelevance(searchQuery, r.title + " " + r.snippet),
        }));

        searchResults.sort((a, b) => b.relevance - a.relevance);
        setResults(searchResults);
        setHasSearched(true);
        setIsSearching(false);
        onSearch?.(searchQuery, searchResults);
      }, 200);
    },
    [onSearch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden rounded-lg p-4",
        "bg-[var(--vc-bg)]",
        config.theme === "dark" ? "dark" : "light"
      )}
      style={
        {
          ["--vc-bg" as string]: theme.background,
        } as any
      }
    >
      <div className="mb-4">
        <h2
          className="text-lg font-semibold mb-3"
          style={{ color: theme.text }}
        >
          Search Knowledge Base
        </h2>

        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.textMuted}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for concepts, sections, or documents…"
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none transition-all",
              "focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            )}
            style={{
              backgroundColor: theme.inputBackground,
              borderColor: theme.inputBorder,
              color: theme.text,
            }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm" style={{ color: theme.textMuted }}>
                {isSearching ? "Searching…" : `${results.length} results found`}
              </span>
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                    setHasSearched(false);
                    onSearch?.("", []);
                    inputRef.current?.focus();
                  }}
                  className="text-xs px-2 py-1 rounded transition-colors"
                  style={{
                    color: theme.textMuted,
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-[calc(100%-80px)] overflow-y-auto pr-1">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm"
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  }}
                  onClick={() => onSearch?.(query, [result])}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99, 102, 241, 0.5)";
                    (e.currentTarget as HTMLDivElement).style.backgroundColor =
                      config.theme === "dark" ? "#1e293b" : "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = theme.border;
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = theme.surface;
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-sm font-medium truncate"
                        style={{ color: theme.text }}
                      >
                        {result.title}
                      </h3>
                      <p
                        className="text-xs mt-1 leading-relaxed"
                        style={{ color: theme.textMuted }}
                      >
                        {highlightTerms(
                          truncateText(result.snippet, 200),
                          query
                        )}
                      </p>
                    </div>
                    <div
                      className="shrink-0 flex flex-col items-end gap-1"
                    >
                      <div
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${result.relevance >= 8 ? "#10b981" : result.relevance >= 6 ? "#f59e0b" : "#64748b"}20`,
                          color:
                            result.relevance >= 8
                              ? "#10b981"
                              : result.relevance >= 6
                              ? "#f59e0b"
                              : "#64748b",
                        }}
                      >
                        {result.relevance.toFixed(1)}
                      </div>
                      <div
                        className="text-[10px]"
                        style={{ color: theme.textMuted }}
                      >
                        {result.sectionId}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!hasSearched && (
        <div className="flex flex-col items-center justify-center h-[60%] text-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.textMuted}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.4}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <p
            className="mt-3 text-sm"
            style={{ color: theme.textMuted }}
          >
            Type a search query to find documents and concepts
          </p>
        </div>
      )}
    </div>
  );
}
