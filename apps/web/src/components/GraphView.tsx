"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { useStore } from "@/lib/store";

interface GraphNode {
  id: string;
  title: string;
  type: string;
  importance?: number;
  frequency?: number;
  cluster?: string;
  description?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  importance?: number;
  type?: string;
}

interface GraphViewProps {
  nodes: GraphNode[];
  links: GraphLink[];
  config?: {
    linkDistance?: number;
    chargeStrength?: number;
    centerRadius?: number;
    nodeSize?: number;
    collisionPadding?: number;
    enableZoom?: boolean;
    enableDrag?: boolean;
  };
  onNodeClick?: (node: GraphNode) => void;
  onNodeHover?: (node: GraphNode | null) => void;
  onNodeDrag?: (node: GraphNode) => void;
  className?: string;
}

const TYPE_COLORS: Record<string, string> = {
  document: "#3b82f6",
  section: "#8b5cf6",
  concept: "#22c55e",
  edge: "#f59e0b",
  default: "#64748b",
};

function getNodeColor(type: string): string {
  return TYPE_COLORS[type] || TYPE_COLORS.default;
}

function getClusterColor(cluster: string | undefined): string {
  if (!cluster) return "#64748b";
  const colors = [
    "#3b82f6",
    "#8b5cf6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#06b6d4",
    "#f97316",
    "#14b8a6",
    "#a855f7",
  ];
  const index = Math.abs(hashCode(cluster)) % colors.length;
  return colors[index];
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

export function GraphView({
  nodes,
  links,
  config = {},
  onNodeClick,
  onNodeHover,
  onNodeDrag,
  className = "",
}: GraphViewProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const selectedNode = useStore((s) => s.selectedNode);
  const hoveredNode = useStore((s) => s.hoveredNode);

  const {
    linkDistance = 80,
    chargeStrength = -200,
    nodeSize = 8,
    collisionPadding = 4,
    enableZoom = true,
    enableDrag = true,
  } = config;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width || 800,
          height: rect.height || 600,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Arrow markers
    const defs = svg.append("defs");
    defs
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#475569");

    // Links group
    const linksGroup = g.append("g").attr("class", "links");
    const nodesGroup = g.append("g").attr("class", "nodes");
    const labelsGroup = g.append("g").attr("class", "labels");

    const linkData = links.map((link) => ({
      ...link,
      source: typeof link.source === "string" ? link.source : link.source.id,
      target: typeof link.target === "string" ? link.target : link.target.id,
    }));

    const linkElements = linksGroup
      .selectAll("line")
      .data(linkData)
      .join("line")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1);

    // Node elements
    const nodeData = nodes.map((n) => ({
      ...n,
      r: Math.max(4, Math.min(20, (n.importance || n.frequency || 5) * 2)),
    }));

    const nodeElements = nodesGroup
      .selectAll<SVGCircleElement, any>("circle")
      .data(nodeData, (d) => (d as any).id)
      .join("circle")
      .attr("r", (d) => (d as any).r)
      .attr("fill", (d) => getNodeColor((d as any).type))
      .attr("stroke", "#1e293b")
      .attr("stroke-width", 2)
      .attr("cursor", "pointer")
      .on("click", (_event: any, d: any) => {
        onNodeClick?.(d);
        useStore.getState().setSelectedNode(d.id);
      })
      .on("mouseover", (_event: any, d: any) => {
        onNodeHover?.(d);
        useStore.getState().setHoveredNode(d.id);
        d3.select(_event.currentTarget)
          .transition()
          .duration(200)
          .attr("r", (n: any) => (n.id === d.id ? n.r * 1.3 : n.r));
      })
      .on("mouseout", (_event: any, d: any) => {
        onNodeHover?.(null);
        useStore.getState().setHoveredNode(null);
        d3.select(_event.currentTarget)
          .transition()
          .duration(200)
          .attr("r", (n: any) => n.r);
      })
      .call(
        enableDrag
          ? d3
              .drag<any, any>()
              .on("start", (_event, d) => {
                if (!_event.active) simulationRef.current?.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
                onNodeDrag?.(d);
              })
              .on("drag", (_event, d) => {
                d.fx = _event.x;
                d.fy = _event.y;
                onNodeDrag?.(d);
              })
              .on("end", (_event, d) => {
                if (!_event.active) simulationRef.current?.alphaTarget(0);
                d.fx = null;
                d.fy = null;
              })
          : undefined
      );

    // Node labels
    const labelElements = labelsGroup
      .selectAll("text")
      .data(nodeData, (d: any) => d.id)
      .join("text")
      .text((d: any) => d.title)
      .attr("font-size", "10px")
      .attr("fill", "#94a3b8")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.r + 14)
      .attr("pointer-events", "none")
      .attr("opacity", 0);

    // Zoom
    if (enableZoom) {
      svg
        .call(
          d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 5])
            .on("zoom", (_event) => {
              g.attr("transform", _event.transform);
            })
        )
        .call(() => {});
    }

    // Simulation
    const simulation = d3
      .forceSimulation<GraphNode>(nodeData)
      .force(
        "charge",
        d3.forceManyBody().strength(chargeStrength)
      )
      .force(
        "link",
        d3.forceLink<GraphNode, GraphLink>(linkData).id((d) => d.id).distance(linkDistance)
      )
      .force(
        "center",
        d3.forceCenter(dimensions.width / 2, dimensions.height / 2)
      )
      .force(
        "collision",
        d3.forceCollide().radius((d) => ((d as any).r || 8) + collisionPadding)
      )
      .stop();

    // Run simulation for initial layout
    for (let i = 0; i < 300; i++) simulation.tick();
    simulationRef.current = simulation;

    // Apply positions
    nodeElements.attr("cx", (d) => d.x || dimensions.width / 2).attr("cy", (d) => d.y || dimensions.height / 2);
    linkElements
      .attr("x1", (d) => ((d.source as any).x || dimensions.width / 2))
      .attr("y1", (d) => ((d.source as any).y || dimensions.height / 2))
      .attr("x2", (d) => ((d.target as any).x || dimensions.width / 2))
      .attr("y2", (d) => ((d.target as any).y || dimensions.height / 2));

    labelElements
      .attr("x", (d) => d.x || dimensions.width / 2)
      .attr("y", (d) => d.y || dimensions.height / 2);

    // Show labels for selected/hovered nodes
    const updateLabelVisibility = () => {
      if (selectedNode || hoveredNode) {
        labelElements
          .attr("opacity", (d) =>
            d.id === selectedNode || d.id === hoveredNode ? 1 : 0
          );
      } else {
        labelElements.attr("opacity", 0);
      }
    };

    updateLabelVisibility();

    return () => {
      simulationRef.current = null;
    };
  }, [nodes, links, dimensions, selectedNode, hoveredNode, onNodeClick, onNodeHover, onNodeDrag]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
    </div>
  );
}
