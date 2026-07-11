"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  FileStack,
  Hash,
  Layers,
  Search,
  BookOpen,
} from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { StatisticsCards } from "@/components/StatisticsCards";
import { Skeleton } from "@/components/LoadingSkeleton";
import { useStore } from "@/lib/store";

interface DocumentItem {
  id: string;
  title: string;
  importance: number;
  sectionCount?: number;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [recentDocs, setRecentDocs] = useState<DocumentItem[]>([]);
  const [stats, setStats] = useState({
    documents: 0,
    sections: 0,
    concepts: 0,
    clusters: 0,
  });
  const [searchResults, setSearchResults] = useState<
    { id: string; title: string; snippet: string; score: number }[]
  >([]);

  const sections = useStore((s) => s.sections);
  const concepts = useStore((s) => s.concepts);
  const clusters = useStore((s) => s.clusters);
  const statistics = useStore((s) => s.statistics);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        documents: statistics?.documentCount || 0,
        sections: statistics?.sectionCount || sections.length,
        concepts: statistics?.conceptCount || concepts.length,
        clusters: statistics?.clusterCount || clusters.length,
      });

      const docGroups = new Map<string, DocumentItem>();
      sections.forEach((s) => {
        if (s.docId) {
          const existing = docGroups.get(s.docId);
          if (existing) {
            existing.sectionCount = (existing.sectionCount || 0) + 1;
          } else {
            docGroups.set(s.docId, {
              id: s.docId,
              title: s.title || `Document ${s.docId}`,
              importance: 0.5,
              sectionCount: 1,
            });
          }
        }
      });

      const docs = Array.from(docGroups.values())
        .sort((a, b) => (b.sectionCount || 0) - (a.sectionCount || 0))
        .slice(0, 10);
      setRecentDocs(docs);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [sections, concepts, clusters, statistics]);

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    const q = query.toLowerCase();
    const results = concepts
      .filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map((c) => ({
        id: c.id,
        title: c.name || c.id,
        snippet: c.description || `Concept with frequency ${c.frequency || 0}`,
        score: c.frequency || 0,
      }));
    setSearchResults(results);
  };

  const statCards = [
    {
      label: "Documents",
      value: stats.documents,
      icon: <FileText className="w-5 h-5" />,
      color: "#3b82f6",
      subtitle: "Compiled source documents",
    },
    {
      label: "Sections",
      value: stats.sections,
      icon: <FileStack className="w-5 h-5" />,
      color: "#8b5cf6",
      subtitle: "Extracted sections",
    },
    {
      label: "Concepts",
      value: stats.concepts,
      icon: <Hash className="w-5 h-5" />,
      color: "#22c55e",
      subtitle: "Identified concepts",
    },
    {
      label: "Clusters",
      value: stats.clusters,
      icon: <Layers className="w-5 h-5" />,
      color: "#f59e0b",
      subtitle: "Semantic clusters",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="p-6 lg:p-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeIn} custom={0} className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Knowledge Overview
        </h1>
        <p className="text-[var(--text-secondary)]">
          Explore your compiled knowledge base and discovered insights.
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div variants={fadeIn} custom={1} className="mb-8">
        <StatisticsCards cards={statCards} loading={loading} />
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={fadeIn} custom={2} className="mb-8">
        <SearchBar
          onSearch={handleSearch}
          suggestions={searchResults}
          placeholder="Search concepts and documents..."
          className="max-w-2xl"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent/Important Documents */}
        <motion.div
          variants={fadeIn}
          custom={3}
          className="lg:col-span-2"
        >
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Important Documents
              </h2>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3">
                    <div className="skeleton w-10 h-10 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton type="text" className="h-4 w-3/4" />
                      <Skeleton type="text" className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentDocs.length > 0 ? (
              <div className="space-y-2">
                {recentDocs.map((doc, i) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--hover-bg)] transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {doc.title}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        {doc.sectionCount} section{doc.sectionCount !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-[var(--text-muted)]">
                No documents found. Compile knowledge to get started.
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Stats Side Panel */}
        <motion.div variants={fadeIn} custom={4}>
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Quick Stats
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--text-secondary)]">
                  Avg. sections per doc
                </span>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {stats.documents > 0
                    ? (stats.sections / stats.documents).toFixed(1)
                    : "0"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--text-secondary)]">
                  Concepts per document
                </span>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {stats.documents > 0
                    ? (stats.concepts / stats.documents).toFixed(1)
                    : "0"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--text-secondary)]">
                  Cluster density
                </span>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {stats.clusters > 0
                    ? (stats.concepts / stats.clusters).toFixed(1)
                    : "0"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
