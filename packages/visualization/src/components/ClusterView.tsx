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
import type { VisualizationConfig, ClusterViewProps, GraphNode } from "../types.js";
import { DEFAULT_CONFIG, THEME_COLORS } from "../types.js";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

interface ClusterDatum {
  id: number;
  label: string;
  color: string;
  members: number;
  memberCount: number;
  centroid: { x: number; y: number };
  radius: number;
  topTerms: string[];
  selected?: boolean;
  hovered?: boolean;
}

interface MockMember {
  id: string;
  sectionId: string;
  title: string;
  x: number;
  y: number;
}

const CLUSTER_PALETTE = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#6366f1",
];

function generateMockClusters(): ClusterDatum[] {
  const clusterData = [
    {
      label: "Machine Learning",
      topTerms: ["learning", "model", "training", "data", "algorithm"],
      memberCount: 45,
    },
    {
      label: "Natural Language",
      topTerms: ["text", "language", "NLP", "token", "embedding"],
      memberCount: 38,
    },
    {
      label: "Knowledge Graphs",
      topTerms: ["graph", "entity", "relation", "triples", "ontology"],
      memberCount: 32,
    },
    {
      label: "Reasoning",
      topTerms: ["inference", "logic", "deduction", "provenance", "proof"],
      memberCount: 27,
    },
    {
      label: "Data Mining",
      topTerms: ["pattern", "frequent", "association", "correlation", "itemset"],
      memberCount: 22,
    },
  ];

  return clusterData.map((c, i) => ({
    ...c,
    id: i,
    color: CLUSTER_PALETTE[i % CLUSTER_PALETTE.length],
    centroid: {
      x: 200 + ((i * 137) % 400),
      y: 150 + ((i * 97) % 300),
    },
    radius: 50 + c.memberCount * 0.8,
    selected: false,
    hovered: false,
    members: 0,
  }));
}

function generateMockMembers(
  cluster: ClusterDatum,
  clusterCount: number
): MockMember[] {
  const members: MockMember[] = [];
  const baseAngle = (2 * Math.PI * cluster.id) / clusterCount;

  for (let i = 0; i < cluster.memberCount; i++) {
    const angle = baseAngle + (Math.random() - 0.5) * 1.2;
    const dist = Math.random() * cluster.radius * 0.85;
    members.push({
      id: `m-${cluster.id}-${i}`,
      sectionId: `sec-${cluster.id}-${i}`,
      title: `Section ${cluster.id}.${i + 1}`,
      x: cluster.centroid.x + Math.cos(angle) * dist,
      y: cluster.centroid.y + Math.sin(angle) * dist,
    });
  }

  return members;
}

export function ClusterView({
  config: externalConfig,
  onClusterSelect,
}: ClusterViewProps) {
  const [clusters, setClusters] = useState<ClusterDatum[]>([]);
  const [members, setMembers] = useState<MockMember[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
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

  useEffect(() => {
    const clusterData = generateMockClusters();
    setClusters(clusterData);
    const allMembers = clusterData.flatMap((c) =>
      generateMockMembers(c, clusterData.length)
    );
    setMembers(allMembers);
  }, []);

  const handleClusterClick = useCallback(
    (clusterId: number) => {
      const newSelected = selectedCluster === clusterId ? null : clusterId;
      setSelectedCluster(newSelected);
      onClusterSelect?.(newSelected ?? clusterId);
    },
    [selectedCluster, onClusterSelect]
  );

  const filteredMembers = useMemo(() => {
    if (selectedCluster === null) return members;
    return members.filter((m) =>
      m.sectionId.startsWith(`sec-${selectedCluster}-`)
    );
  }, [members, selectedCluster]);

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
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
        style={{ userSelect: "none" }}
      >
        <defs>
          <filter id="vc-cluster-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feFlood floodColor="#fff" floodOpacity="0.1" />
            <feComposite in2="SourceAlpha" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode />
            </feMerge>
          </filter>
        </defs>

        <g className="vc-cluster-regions">
          {clusters.map((cluster) => {
            const isHighlighted =
              selectedCluster === cluster.id || hoveredCluster === cluster.id;
            return (
              <g key={cluster.id}>
                <circle
                  cx={cluster.centroid.x}
                  cy={cluster.centroid.y}
                  r={cluster.radius}
                  fill={cluster.color}
                  fillOpacity={isHighlighted ? 0.12 : 0.06}
                  stroke={cluster.color}
                  strokeWidth={isHighlighted ? 2.5 : 1.2}
                  strokeOpacity={isHighlighted ? 0.8 : 0.4}
                  strokeDasharray={isHighlighted ? "none" : "6 4"}
                  className="cursor-pointer transition-all"
                  filter={isHighlighted ? "url(#vc-cluster-glow)" : undefined}
                  onClick={() => handleClusterClick(cluster.id)}
                  onMouseEnter={() => setHoveredCluster(cluster.id)}
                  onMouseLeave={() => setHoveredCluster(null)}
                />
                <text
                  x={cluster.centroid.x}
                  y={cluster.centroid.y - 4}
                  textAnchor="middle"
                  font-size="12"
                  font-weight="600"
                  fill={cluster.color}
                  opacity={isHighlighted ? 1 : 0.8}
                  pointerEvents="none"
                >
                  {cluster.label}
                </text>
                <text
                  x={cluster.centroid.x}
                  y={cluster.centroid.y + 12}
                  textAnchor="middle"
                  font-size="10"
                  fill={theme.textMuted}
                  pointerEvents="none"
                >
                  {cluster.memberCount} sections
                </text>
                <text
                  x={cluster.centroid.x}
                  y={cluster.centroid.y + 26}
                  textAnchor="middle"
                  font-size="9"
                  fill={theme.textMuted}
                  opacity={0.6}
                  pointerEvents="none"
                >
                  {cluster.topTerms.slice(0, 3).join(", ")}
                </text>
              </g>
            );
          })}
        </g>

        <g className="vc-cluster-members">
          {filteredMembers.map((member) => (
            <circle
              key={member.id}
              cx={member.x}
              cy={member.y}
              r={2.5}
              fill={
                clusters.find((c) => c.id === parseInt(member.sectionId.split("-")[1]))
                  ?.color || theme.textMuted
              }
              fillOpacity={0.6}
              stroke={theme.background}
              strokeWidth={0.5}
            />
          ))}
        </g>

        <g className="vc-cluster-centroids">
          {clusters.map((cluster) => (
            <g key={`centroid-${cluster.id}`}>
              <circle
                cx={cluster.centroid.x}
                cy={cluster.centroid.y}
                r={4}
                fill={cluster.color}
                stroke={theme.background}
                strokeWidth={1.5}
                opacity={0.9}
              />
            </g>
          ))}
        </g>

        <g className="vc-cluster-legend">
          <rect
            x={dimensions.width - 160}
            y={10}
            width={150}
            height={clusters.length * 20 + 30}
            rx={6}
            fill={theme.surface}
            fillOpacity={0.95}
            stroke={theme.border}
            strokeWidth={1}
          />
          <text
            x={dimensions.width - 150}
            y={30}
            font-size="11"
            font-weight="600"
            fill={theme.text}
          >
            Clusters
          </text>
          {clusters.map((cluster, i) => (
            <g key={`legend-${cluster.id}`}>
              <circle
                cx={dimensions.width - 140}
                cy={50 + i * 20}
                r={4}
                fill={cluster.color}
              />
              <text
                x={dimensions.width - 130}
                y={54 + i * 20}
                font-size="10"
                fill={theme.textMuted}
              >
                {cluster.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
