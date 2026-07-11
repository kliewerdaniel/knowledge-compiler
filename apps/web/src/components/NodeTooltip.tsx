"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NodeTooltipProps {
  node: {
    id: string;
    title: string;
    type: string;
    importance?: number;
    description?: string;
    cluster?: string;
    frequency?: number;
  } | null;
  position: { x: number; y: number };
  visible: boolean;
}

const typeColors: Record<string, string> = {
  document: "#3b82f6",
  section: "#8b5cf6",
  concept: "#22c55e",
  edge: "#f59e0b",
  default: "#64748b",
};

export function NodeTooltip({ node, position, visible }: NodeTooltipProps) {
  if (!node || !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: position.x + 16,
            top: position.y + 16,
          }}
        >
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl p-4 min-w-[220px] max-w-[300px]">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    typeColors[node.type] || typeColors.default,
                }}
              />
              <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                {node.type}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              {node.title}
            </h3>
            {node.description && (
              <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-2">
                {node.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
              {node.importance !== undefined && (
                <div className="flex items-center gap-1">
                  <span>Importance</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {node.importance.toFixed(2)}
                  </span>
                </div>
              )}
              {node.frequency !== undefined && (
                <div className="flex items-center gap-1">
                  <span>Frequency</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {node.frequency}
                  </span>
                </div>
              )}
              {node.cluster && (
                <div className="flex items-center gap-1">
                  <span>Cluster</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {node.cluster}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-2 pt-2 border-t border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-muted)]">
                ID: {node.id}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
