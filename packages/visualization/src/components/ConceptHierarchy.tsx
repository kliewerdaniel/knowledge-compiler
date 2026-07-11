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
import * as d3 from "d3";
import type { VisualizationConfig, ConceptViewProps } from "../types.js";
import { DEFAULT_CONFIG, THEME_COLORS } from "../types.js";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

interface SunburstDatum {
  id: string;
  name: string;
  children?: SunburstDatum[];
  depth: number;
  size: number;
  color: string;
  collapsed?: boolean;
}

function buildConceptHierarchy(
  concepts: any[]
): SunburstDatum {
  const root: SunburstDatum = {
    id: "root",
    name: "Knowledge Base",
    children: [],
    depth: 0,
    size: 1,
    color: "#6366f1",
  };

  const nodeMap = new Map<string, SunburstDatum>();

  for (const concept of concepts || []) {
    const node: SunburstDatum = {
      id: concept.id || concept.name,
      name: concept.name || concept.id,
      depth: concept.level || 0,
      size: concept.frequency || 1,
      color: getConceptColor(concept.level || 0),
    };
    nodeMap.set(node.id, node);
  }

  for (const concept of concepts || []) {
    const node = nodeMap.get(concept.id || concept.name);
    if (!node) continue;

    const relatedIds = concept.relatedConcepts || [];
    if (relatedIds.length > 0 && concept.level !== undefined) {
      const parentLevel = concept.level - 1;
      const parent = Array.from(nodeMap.values()).find(
        (n) => n.depth === parentLevel
      );
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    }
  }

  const rootChildren = Array.from(nodeMap.values()).filter(
    (n) => n.depth === 0
  );
  root.children = rootChildren;

  return root;
}

function getConceptColor(level: number): string {
  const colors = [
    "#8b5cf6",
    "#6366f1",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];
  return colors[Math.min(level, colors.length - 1)];
}

export function ConceptHierarchy({
  config: externalConfig,
  onConceptSelect,
}: ConceptViewProps) {
  const [selectedNode, setSelectedNode] = useState<SunburstDatum | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...externalConfig }),
    [externalConfig]
  );
  const theme = THEME_COLORS[config.theme];

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width || 800,
          height: rect.height || 600,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hierarchy = useMemo(() => {
    const root = d3
      .hierarchy<SunburstDatum>({
        id: "root",
        name: "Knowledge Base",
        children: [
          {
            id: "c1",
            name: "Machine Learning",
            depth: 0,
            size: 10,
            color: "#8b5cf6",
            children: [
              {
                id: "c1-1",
                name: "Supervised Learning",
                depth: 1,
                size: 5,
                color: "#6366f1",
                children: [
                  {
                    id: "c1-1-1",
                    name: "Classification",
                    depth: 2,
                    size: 3,
                    color: "#3b82f6",
                  },
                  {
                    id: "c1-1-2",
                    name: "Regression",
                    depth: 2,
                    size: 2,
                    color: "#3b82f6",
                  },
                ],
              },
              {
                id: "c1-2",
                name: "Unsupervised Learning",
                depth: 1,
                size: 5,
                color: "#6366f1",
                children: [
                  {
                    id: "c1-2-1",
                    name: "Clustering",
                    depth: 2,
                    size: 3,
                    color: "#3b82f6",
                  },
                  {
                    id: "c1-2-2",
                    name: "Dimensionality Reduction",
                    depth: 2,
                    size: 2,
                    color: "#3b82f6",
                  },
                ],
              },
            ],
          },
          {
            id: "c2",
            name: "Natural Language Processing",
            depth: 0,
            size: 8,
            color: "#10b981",
            children: [
              {
                id: "c2-1",
                name: "Text Analysis",
                depth: 1,
                size: 4,
                color: "#059669",
                children: [
                  {
                    id: "c2-1-1",
                    name: "Named Entity Recognition",
                    depth: 2,
                    size: 2,
                    color: "#047857",
                  },
                  {
                    id: "c2-1-2",
                    name: "Sentiment Analysis",
                    depth: 2,
                    size: 2,
                    color: "#047857",
                  },
                ],
              },
              {
                id: "c2-2",
                name: "Machine Translation",
                depth: 1,
                size: 4,
                color: "#059669",
                children: [
                  {
                    id: "c2-2-1",
                    name: "Neural MT",
                    depth: 2,
                    size: 4,
                    color: "#047857",
                  },
                ],
              },
            ],
          },
          {
            id: "c3",
            name: "Knowledge Representation",
            depth: 0,
            size: 6,
            color: "#f59e0b",
            children: [
              {
                id: "c3-1",
                name: "Ontologies",
                depth: 1,
                size: 3,
                color: "#d97706",
                children: [
                  {
                    id: "c3-1-1",
                    name: "OWL",
                    depth: 2,
                    size: 2,
                    color: "#b45309",
                  },
                  {
                    id: "c3-1-2",
                    name: "RDF",
                    depth: 2,
                    size: 1,
                    color: "#b45309",
                  },
                ],
              },
              {
                id: "c3-2",
                name: "Knowledge Graphs",
                depth: 1,
                size: 3,
                color: "#d97706",
                children: [
                  {
                    id: "c3-2-1",
                    name: "Graph Embeddings",
                    depth: 2,
                    size: 3,
                    color: "#b45309",
                  },
                ],
              },
            ],
          },
          {
            id: "c4",
            name: "Reasoning",
            depth: 0,
            size: 5,
            color: "#ef4444",
            children: [
              {
                id: "c4-1",
                name: "Logical Reasoning",
                depth: 1,
                size: 3,
                color: "#dc2626",
                children: [
                  {
                    id: "c4-1-1",
                    name: "Deduction",
                    depth: 2,
                    size: 2,
                    color: "#b91c1c",
                  },
                  {
                    id: "c4-1-2",
                    name: "Induction",
                    depth: 2,
                    size: 1,
                    color: "#b91c1c",
                  },
                ],
              },
              {
                id: "c4-2",
                name: "Analogical Reasoning",
                depth: 1,
                size: 2,
                color: "#dc2626",
                children: [],
              },
            ],
          },
        ],
      } as any,
      (d) => d.children
    );

    const partition = d3
      .partition<SunburstDatum>()
      .size([2 * Math.PI, 1])
      .round(true);

    partition(root);
    return root;
  }, []);

  const radius = Math.min(dimensions.width, dimensions.height) * 0.4;
  const innerRadius = radius * 0.25;

  const arc = useMemo(
    () =>
      d3
        .arc<d3.HierarchyRectangularNode<SunburstDatum>>()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle(0.01)
        .padRadius(innerRadius * 1.5)
        .innerRadius((d) => {
          if (d.depth === 0) return innerRadius * 0.3;
          if (d.depth === 1) return innerRadius;
          return d.y0 * radius;
        })
        .outerRadius((d) => d.y1 * radius),
    [radius, innerRadius]
  );

  const handleNodeClick = useCallback(
    (node: d3.HierarchyRectangularNode<SunburstDatum> | d3.HierarchyNode<SunburstDatum>) => {
      const datum = (node as any).data;
      setSelectedNode(datum.id === selectedNode?.id ? null : datum);
      onConceptSelect?.(datum.id);
    },
    [selectedNode, onConceptSelect]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden rounded-lg",
        "bg-[var(--vc-bg)]",
        config.theme === "dark" ? "dark" : "light"
      )}
      style={
        {
          ["--vc-bg" as string]: theme.background,
        } as any
      }
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
        style={{ userSelect: "none" }}
      >
        <g
          transform={`translate(${dimensions.width / 2},${dimensions.height / 2})`}
        >
          <g className="vc-sunburst-sectors">
            {hierarchy.descendants().map((node: any, i) => {
              const datum = node.data;
              return (
                <g key={datum.id || i}>
                  <path
                    d={arc(node) as any}
                    fill={datum.color}
                    fillOpacity={
                      selectedNode?.id === datum.id ? 0.9 : 0.7
                    }
                    stroke={theme.background}
                    strokeWidth={1.5}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={(e) => {
                      (e.target as SVGPathElement).style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as SVGPathElement).style.opacity = selectedNode?.id === datum.id ? "0.9" : "0.7";
                    }}
                  />
                  {node.depth < 3 && datum.name && (
                    <text
                      transform={`rotate(${-((node.x0 + node.x1) / 2) * (180 / Math.PI)})`}
                      dy={node.y0 * radius + 12}
                      textAnchor="middle"
                      font-size="10"
                      fill={theme.text}
                      opacity={0.85}
                      pointerEvents="none"
                    >
                      {datum.name.length > 18
                        ? datum.name.slice(0, 18) + "…"
                        : datum.name}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          <circle
            cx={0}
            cy={0}
            r={innerRadius * 0.3}
            fill={theme.surface}
            stroke={theme.border}
            strokeWidth={1}
          />
          <text
            textAnchor="middle"
            dy="-0.2em"
            font-size="13"
            font-weight="600"
            fill={theme.text}
          >
            {hierarchy.name}
          </text>
          <text
            textAnchor="middle"
            dy="1.1em"
            font-size="10"
            fill={theme.textMuted}
          >
            {hierarchy.descendants().length} concepts
          </text>
        </g>
      </svg>
    </div>
  );
}
