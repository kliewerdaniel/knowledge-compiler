"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { GitGraph, Search, BookOpen, Hash, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { Skeleton } from "@/components/LoadingSkeleton";
import { useStore } from "@/lib/store";

interface ConceptNode {
  id: string;
  name: string;
  type: string;
  frequency: number;
  relatedConcepts: string[];
  aliases?: string[];
  description?: string;
  children: ConceptNode[];
  depth: number;
}

interface ConceptTreeNode {
  name: string;
  id: string;
  type: string;
  frequency: number;
  description?: string;
  children: ConceptTreeNode[];
  expanded: boolean;
}

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

function buildTree(concepts: any[]): ConceptTreeNode[] {
  const rootNodes: ConceptTreeNode[] = [];
  const byType = new Map<string, ConceptTreeNode[]>();

  concepts.forEach((c) => {
    const type = c.type || "default";
    const node: ConceptTreeNode = {
      name: c.name || c.id,
      id: c.id,
      type,
      frequency: c.frequency || 0,
      description: c.description,
      children: [],
      expanded: false,
    };

    if (!byType.has(type)) {
      byType.set(type, []);
    }
    byType.get(type)!.push(node);
  });

  byType.forEach((nodes, type) => {
    const sorted = nodes.sort((a, b) => b.frequency - a.frequency);
    const typeLabel = TYPE_LABELS[type] || type;
    const root: ConceptTreeNode = {
      name: typeLabel,
      id: type,
      type: "root",
      frequency: sorted.reduce((sum, n) => sum + n.frequency, 0),
      children: sorted.slice(0, 20),
      expanded: false,
    };
    rootNodes.push(root);
  });

  return rootNodes.sort((a, b) => b.frequency - a.frequency);
}

export default function ConceptsPage() {
  const concepts = useStore((s) => s.concepts);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedConcept, setSelectedConcept] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const treeData = useMemo(() => buildTree(concepts), [concepts]);

  const filteredTree = useMemo(() => {
    if (!searchQuery) return treeData;
    const q = searchQuery.toLowerCase();
    return treeData
      .map((root) => ({
        ...root,
        children: filterChildren(root.children, q),
      }))
      .filter((node) => node.children.length > 0);
  }, [treeData, searchQuery]);

  function filterChildren(children: ConceptTreeNode[], query: string): ConceptTreeNode[] {
    return children
      .filter((c) => c.name.toLowerCase().includes(query))
      .map((c) => ({
        ...c,
        children: filterChildren(c.children, query),
      }))
      .filter((c) => c.children.length > 0 || c.name.toLowerCase().includes(query));
  }

  const toggleExpand = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleConceptClick = (concept: any) => {
    setSelectedConcept(concept);
  };

  const totalConcepts = concepts.length;
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    concepts.forEach((c) => {
      const type = c.type || "default";
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  }, [concepts]);

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <GitGraph className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Concept Hierarchy
          </h1>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card">
              <Skeleton type="text" className="h-6 w-48 mb-4" />
              <div className="space-y-2 pl-4">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} type="text" className="h-4 w-64" />
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
          <GitGraph className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Concept Hierarchy
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <Hash className="w-4 h-4" />
          <span>{totalConcepts} concepts</span>
        </div>
      </div>

      <div className="mb-6 max-w-xl">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Filter concepts by name..."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tree view */}
        <div className="lg:col-span-2 space-y-4">
          {filteredTree.map((root) => (
            <div key={root.id} className="card">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => toggleExpand(root.id)}
                  className="flex items-center gap-2 text-base font-semibold text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      expandedNodes.has(root.id) ? "rotate-90" : ""
                    }`}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: TYPE_COLORS[root.type] || TYPE_COLORS.default,
                    }}
                  />
                  {root.name}
                  <span className="text-xs text-[var(--text-muted)] font-normal">
                    ({root.children.length})
                  </span>
                </button>
                <span className="text-xs text-[var(--text-muted)]">
                  Total frequency: {root.frequency}
                </span>
              </div>

              {expandedNodes.has(root.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-6 border-l-2 border-[var(--border-color)] ml-3 space-y-1"
                >
                  {root.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleConceptClick(child)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-colors text-left"
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            TYPE_COLORS[child.type] || TYPE_COLORS.default,
                        }}
                      />
                      <span className="text-sm text-[var(--text-primary)] flex-1">
                        {child.name}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {child.frequency}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}

          {filteredTree.length === 0 && (
            <div className="card py-8 text-center text-[var(--text-muted)]">
              <GitGraph className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>No concepts match your search.</p>
            </div>
          )}
        </div>

        {/* Concept details panel */}
        <div className="card h-fit">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Concept Details
            </h2>
          </div>

          {selectedConcept ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        TYPE_COLORS[selectedConcept.type] || TYPE_COLORS.default,
                    }}
                  />
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {selectedConcept.name}
                  </h3>
                </div>
                <span className="text-xs text-[var(--text-muted)]">
                  ID: {selectedConcept.id}
                </span>
              </div>

              {selectedConcept.description && (
                <p className="text-sm text-[var(--text-secondary)]">
                  {selectedConcept.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <div className="text-[var(--text-muted)] text-xs">Frequency</div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {selectedConcept.frequency}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-secondary)]">
                  <div className="text-[var(--text-muted)] text-xs">Type</div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {TYPE_LABELS[selectedConcept.type] || selectedConcept.type}
                  </div>
                </div>
              </div>

              {selectedConcept.aliases && selectedConcept.aliases.length > 0 && (
                <div>
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Aliases
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedConcept.aliases.map((alias: string) => (
                      <span key={alias} className="badge">
                        {alias}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedConcept.relatedConcepts &&
                selectedConcept.relatedConcepts.length > 0 && (
                  <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      Related Concepts
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedConcept.relatedConcepts.map((rel: string) => (
                        <span key={rel} className="badge">
                          {rel}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className="py-8 text-center text-[var(--text-muted)] text-sm">
              Select a concept to view its details.
            </div>
          )}

          {/* Type summary */}
          <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">
              By Type
            </div>
            <div className="space-y-2">
              {Object.entries(typeCounts).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          TYPE_COLORS[type] || TYPE_COLORS.default,
                      }}
                    />
                    <span className="text-[var(--text-secondary)]">
                      {TYPE_LABELS[type] || type}
                    </span>
                  </div>
                  <span className="text-[var(--text-muted)]">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
