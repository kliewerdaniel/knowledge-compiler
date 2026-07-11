"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onResultClick?: (id: string) => void;
  suggestions?: { id: string; title: string; snippet: string; score: number }[];
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  onSearch,
  onResultClick,
  suggestions = [],
  placeholder = "Search...",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const setSearchQuery = useStore((s) => s.setSearchQuery);

  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query);
      if (query.trim()) {
        onSearch?.(query.trim());
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, onSearch]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query, setSearchQuery]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    []
  );

  const filteredSuggestions = suggestions.filter((s) =>
    s.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    s.snippet.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setIsOpen(false);
    inputRef.current?.blur();
    onResultClick?.(id);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
          strokeWidth={2}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setDebouncedQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (query.trim().length > 0 || filteredSuggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto"
          >
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.slice(0, 8).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className="w-full px-4 py-3 text-left hover:bg-[var(--hover-bg)] transition-colors border-b border-[var(--border-color)] last:border-b-0"
                >
                  <div className="text-sm font-medium text-[var(--text-primary)]">
                    {item.title}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">
                    {item.snippet}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-sm text-[var(--text-muted)]">
                No results found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
