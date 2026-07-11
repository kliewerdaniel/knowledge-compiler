"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  Tag,
  FileStack,
  ChevronRight,
  SortAsc,
  SortDesc,
  Filter,
} from "lucide-react";
import { Skeleton } from "@/components/LoadingSkeleton";
import { useStore } from "@/lib/store";

interface DocumentMeta {
  id: string;
  title: string;
  docId: string;
  sectionCount: number;
  conceptCount: number;
  tags: string[];
  date?: string;
  importance: number;
  summary?: string;
}

type SortField = "title" | "date" | "importance" | "sections";
type SortDirection = "asc" | "desc";

export default function DocumentsPage() {
  const sections = useStore((s) => s.sections);
  const concepts = useStore((s) => s.concepts);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortField>("importance");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [filterTag, setFilterTag] = useState<string>("");
  const [selectedDoc, setSelectedDoc] = useState<DocumentMeta | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const documentList = useMemo(() => {
    const docMap = new Map<string, DocumentMeta>();

    sections.forEach((section) => {
      const docId = section.docId || section.id;
      const existing = docMap.get(docId);
      if (existing) {
        existing.sectionCount += 1;
        if (section.title && !existing.title) {
          existing.title = section.title;
        }
      } else {
        docMap.set(docId, {
          id: docId,
          title: section.title || section.headingPath?.join(" > ") || `Document ${docId}`,
          docId,
          sectionCount: 1,
          conceptCount: 0,
          tags: section.tags || [],
          date: section.date || undefined,
          importance: section.importance || 0.5,
          summary: section.summary,
        });
      }
    });

    // Count concepts per document
    concepts.forEach((c) => {
      if (c.docId) {
        const doc = docMap.get(c.docId);
        if (doc) {
          doc.conceptCount += 1;
        }
      }
    });

    return Array.from(docMap.values());
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
    if (filterTag) {
      filtered = filtered.filter((doc) =>
        doc.tags?.includes(filterTag)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "date":
          cmp = new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
          break;
        case "importance":
          cmp = a.importance - b.importance;
          break;
        case "sections":
          cmp = a.sectionCount - b.sectionCount;
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return sorted;
  }, [documentList, sortBy, sortDir, filterTag]);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortBy !== field) return null;
    return sortDir === "asc" ? (
      <SortAsc className="w-3 h-3 inline ml-1" />
    ) : (
      <SortDesc className="w-3 h-3 inline ml-1" />
    );
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Documents
          </h1>
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
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Documents
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <span>{documentList.length} documents</span>
        </div>
      </div>

      {/* Controls */}
      <div className="card mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--text-muted)]" />
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="input w-auto"
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-muted)]">Sort:</span>
            {(["title", "date", "importance", "sections"] as SortField[]).map(
              (field) => (
                <button
                  key={field}
                  onClick={() => handleSort(field)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    sortBy === field
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {field === "title"
                    ? "Title"
                    : field === "date"
                    ? "Date"
                    : field === "importance"
                    ? "Importance"
                    : "Sections"}
                  <SortIcon field={field} />
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Document list */}
      <div className="card overflow-hidden">
        {filteredAndSorted.length > 0 ? (
          <div className="divide-y divide-[var(--border-color)]">
            {filteredAndSorted.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.3) }}
              >
                <div
                  className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                    selectedDoc?.id === doc.id
                      ? "bg-[var(--color-primary)]/5"
                      : "hover:bg-[var(--hover-bg)]"
                  }`}
                  onClick={() =>
                    setSelectedDoc(
                      selectedDoc?.id === doc.id ? null : doc
                    )
                  }
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {doc.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-[var(--text-muted)]">
                      <div className="flex items-center gap-1">
                        <FileStack className="w-3 h-3" />
                        <span>{doc.sectionCount} sections</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{doc.conceptCount} concepts</span>
                      </div>
                      {doc.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(doc.date).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="text-[var(--text-muted)]">Importance:</span>
                        <span className="text-[var(--text-primary)]">
                          {doc.importance.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.tags.map((tag) => (
                          <span key={tag} className="badge">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-[var(--text-muted)]">
            <FileText className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p>No documents found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Document detail */}
      {selectedDoc && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mt-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Document Details
            </h2>
            <button
              onClick={() => setSelectedDoc(null)}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Close
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Title</span>
              <span className="text-[var(--text-primary)]">{selectedDoc.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">ID</span>
              <span className="text-[var(--text-primary)] font-mono text-xs">
                {selectedDoc.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Sections</span>
              <span className="text-[var(--text-primary)]">
                {selectedDoc.sectionCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Concepts</span>
              <span className="text-[var(--text-primary)]">
                {selectedDoc.conceptCount}
              </span>
            </div>
            {selectedDoc.summary && (
              <div>
                <span className="text-[var(--text-muted)]">Summary</span>
                <p className="text-[var(--text-secondary)] mt-1">
                  {selectedDoc.summary}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
