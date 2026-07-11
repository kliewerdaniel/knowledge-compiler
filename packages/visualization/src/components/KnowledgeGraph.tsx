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
import type { GraphNode, GraphLink, VisualizationConfig } from "../types.js";
import { DEFAULT_CONFIG, NODE_COLORS, THEME_COLORS } from "../types.js";
import { useArtifactData } from "../hooks/useArtifactData.js";
import { transformKnowledgeGraph } from "../utils/transform.js";
import type { GraphViewProps } from "../types.js";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

interface TooltipData {
  x: number;
  y: number;
  node: GraphNode | null;
}

export function KnowledgeGraph({
  config: externalConfig,
  onNodeClick,
  onEdgeClick,
  onHover,
}: GraphViewProps) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData>({
    x: 0,
    y: 0,
    node: null,
  });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gMainRef = useRef<SVGGElement>(null);
  const gLinksRef = useRef<SVGGElement>(null);
  const gNodesRef = useRef<SVGGElement>(null);
  const gLabelsRef = useRef<SVGGElement>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);

  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...externalConfig }),
    [externalConfig]
  );
  const theme = THEME_COLORS[config.theme];

  const { graph, loading, error } = useArtifactData("/artifacts");

  const { nodes, links } = useMemo(() => {
    if (loading || error || !graph) {
      return { nodes: [] as GraphNode[], links: [] as GraphLink[] };
    }
    return transformKnowledgeGraph(graph, config);
  }, [graph, config, loading, error]);

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
    if (nodes.length === 0 || !gMainRef.current) return;

    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    const g = gMainRef.current;
    const width = dimensions.width;
    const height = dimensions.height;

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 5])
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        g.setAttribute("transform", event.transform.toString());
      });

    const svg = d3.select(svgRef.current);
    svg.call(zoom);

    const simulation = d3
      .forceSimulation<GraphNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance((link) => {
            return 120 / (link.weight || 1) * config.animationSpeed;
          })
          .strength(0.3)
      )
      .force(
        "charge",
        d3.forceManyBody<GraphNode>().distanceMax(300).strength(-80)
      )
      .force(
        "center",
        d3.forceCenter(width / 2, height / 2)
      )
      .force(
        "collision",
        d3.forceCollide<GraphNode>().radius((d) => d.radius + 4)
      )
      .alphaDecay(0.01 * config.animationSpeed);

    simulationRef.current = simulation;

    const linkGroup = d3
      .select(gLinksRef.current!)
      .selectAll("line")
      .data(links, (d: any) => {
        const s = typeof d.source === "string" ? d.source : d.source.id;
        const t = typeof d.target === "string" ? d.target : d.target.id;
        return `${s}-${t}`;
      })
      .join(
        (enter) =>
          enter
            .append("line")
            .attr("stroke", theme.textMuted)
            .attr("stroke-opacity", 0.3),
        (update) => update,
        (exit) => exit.remove()
      )
      .attr("stroke-width", (d) => d.thickness)
      .attr("cursor", "pointer")
      .on("click", (event: Event, d: GraphLink) => {
        const s = typeof d.source === "string" ? d.source : d.source.id;
        const t = typeof d.target === "string" ? d.target : d.target.id;
        onEdgeClick?.(s, t);
      });

    const nodeGroup = d3
      .select(gNodesRef.current!)
      .selectAll("g.node-group")
      .data(nodes, (d: GraphNode) => d.id)
      .join(
        (enter) => {
          const g = enter
            .append("g")
            .attr("class", "node-group")
            .attr("cursor", "pointer");
          g.append("circle")
            .attr("r", 0)
            .attr("fill", (d) => d.color)
            .attr("stroke", theme.background)
            .attr("stroke-width", 2)
            .transition()
            .duration(500)
            .attr("r", (d) => d.radius);
          return g;
        },
        (update) => {
          update.select("circle")
            .attr("fill", (d) => d.color);
          return update;
        },
        (exit) => {
          exit
            .select("circle")
            .transition()
            .duration(200)
            .attr("r", 0)
            .remove();
          exit.remove();
        }
      )
      .on("click", (event: Event, d: GraphNode) => {
        event.stopPropagation();
        if (selectedNode?.id === d.id) {
          setSelectedNode(null);
          onNodeClick?.(d.id);
        } else {
          setSelectedNode(d);
          onNodeClick?.(d.id);
        }
      })
      .on("mouseenter", (event: React.MouseEvent, d: GraphNode) => {
        d3.select(event.currentTarget)
          .select("circle")
          .transition()
          .duration(100)
          .attr("r", d.radius * 1.3)
          .attr("stroke-width", 3)
          .attr("stroke", d.color);
        setTooltip({
          x: event.clientX + 16,
          y: event.clientY - 12,
          node: d,
        });
        onHover?.(d.id);
      })
      .on("mousemove", (event: React.MouseEvent) => {
        setTooltip((prev) => ({ ...prev, x: event.clientX + 16, y: event.clientY - 12 }));
      })
      .on("mouseleave", (event: React.MouseEvent, d: GraphNode) => {
        d3.select(event.currentTarget)
          .select("circle")
          .transition()
          .duration(100)
          .attr("r", d.radius)
          .attr("stroke-width", 2)
          .attr("stroke", theme.background);
        setTooltip((prev) => ({ ...prev, node: null }));
        onHover?.(null);
      });

    if (config.showLabels) {
      const labelGroup = d3.select(gLabelsRef.current!);
      const labels = labelGroup
        .selectAll("text")
        .data(nodes, (d: GraphNode) => d.id)
        .join(
          (enter) =>
            enter
              .append("text")
              .attr("font-size", 10)
              .attr("fill", theme.textMuted)
              .attr("text-anchor", "middle")
              .attr("dy", (d) => d.radius + 14)
              .attr("pointer-events", "none")
              .attr("opacity", 0),
          (update) => update,
          (exit) => exit.remove()
        )
        .text((d) => d.label)
        .transition()
        .duration(400)
        .attr("opacity", 0.8);
    }

    simulation.on("tick", () => {
      linkGroup
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup.attr("transform", (d: GraphNode) => {
        if (d.fx !== undefined && d.fy !== undefined) {
          return `translate(${d.fx},${d.fy})`;
        }
        return `translate(${d.x},${d.y})`;
      });

      if (config.showLabels) {
        d3.select(gLabelsRef.current!)
          .selectAll("text")
          .attr("x", (d: GraphNode) => d.x)
          .attr("y", (d: GraphNode) => d.y);
      }
    });

    svgRef.current.addEventListener("click", () => {
      setSelectedNode(null);
    });

    return () => {
      simulation.stop();
      simulationRef.current = null;
    };
  }, [nodes, links, dimensions, config, selectedNode, theme, onNodeClick, onEdgeClick, onHover]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden rounded-lg",
        "bg-[var(--vc-bg)]"
      )}
      style={
        {
          ["--vc-bg" as string]: theme.background,
        } as any
      }
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-10">
          <div className="text-sm" style={{ color: theme.text }}>
            Loading knowledge graph...
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg z-10">
          <div
            className="p-4 rounded-lg border text-sm"
            style={{
              backgroundColor: theme.surface,
              borderColor: "#ef4444",
              color: theme.text,
            }}
          >
            <div className="font-medium mb-1">Failed to load data</div>
            <div className="opacity-75">{error.message}</div>
          </div>
        </div>
      )}
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
        style={{ userSelect: "none" }}
      >
        <defs>
          <filter id="vc-node-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="2"
              floodColor="#000"
              floodOpacity="0.3"
            />
          </filter>
          <marker
            id="vc-arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={theme.textMuted}
              opacity="0.5"
            />
          </marker>
        </defs>

        <g ref={gMainRef} transform="translate(0,0)">
          <g ref={gLinksRef} />
          <g ref={gNodesRef} />
          <g ref={gLabelsRef} />
        </g>

        <g className="vc-legend" pointerEvents="none">
          <rect
            x={10}
            y={10}
            width={140}
            height={115}
            rx={8}
            fill={theme.surface}
            fillOpacity={0.95}
            stroke={theme.border}
            strokeWidth={1}
          />
          <text
            x={20}
            y={30}
            font-size="12"
            font-weight="600"
            fill={theme.text}
          >
            Legend
          </text>
          {[
            { type: "document" as const, label: "Document" },
            { type: "section" as const, label: "Section" },
            { type: "concept" as const, label: "Concept" },
            { type: "entity" as const, label: "Entity" },
            { type: "cluster" as const, label: "Cluster" },
          ].map((item, i) => {
            const y = 50 + i * 16;
            return (
              <g key={item.type}>
                <circle cx={24} cy={y} r={5} fill={NODE_COLORS[item.type]} />
                <text
                  x={36}
                  y={y + 4}
                  font-size="11"
                  fill={theme.textMuted}
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <AnimatePresence>
        {tooltip.node && config.showTooltips && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute pointer-events-none z-50"
            style={{
              left: Math.min(
                tooltip.x + 16,
                dimensions.width - 220
              ),
              top: Math.max(tooltip.y - 90, 8),
            }}
          >
            <div
              className="px-3 py-2 rounded-lg shadow-lg border max-w-[200px]"
              style={{
                backgroundColor: theme.tooltipBackground,
                borderColor: theme.tooltipBorder,
                color: theme.text,
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: tooltip.node.color }}
                />
                <span className="text-xs font-medium truncate">
                  {tooltip.node.label}
                </span>
              </div>
              <div className="text-[10px]" style={{ color: theme.textMuted }}>
                <div>Type: {tooltip.node.type}</div>
                {tooltip.node.pageRank > 0 && (
                  <div>
                    Importance:{" "}
                    {(tooltip.node.pageRank * 100).toFixed(1)}%
                  </div>
                )}
                {tooltip.node.clusterId !== undefined && (
                  <div>Cluster: #{tooltip.node.clusterId + 1}</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
