import { useMemo } from "react";
import type {
  GraphNode,
  GraphLink,
  GraphCluster,
  VisualizationConfig,
  KnowledgeGraph,
  SectionIndex,
  ConceptIndex,
  ClusterIndex,
} from "../types.js";
import { DEFAULT_CONFIG } from "../types.js";
import {
  transformKnowledgeGraph,
  transformSectionIndex,
  transformConceptIndex,
  transformClusterIndex,
  forceLayout,
  hierarchicalLayout,
  radialLayout,
  springLayout,
} from "../utils/index.js";

export function useGraphData(
  graphData: KnowledgeGraph | null,
  config: VisualizationConfig
): {
  nodes: GraphNode[];
  links: GraphLink[];
  clusters: GraphCluster[];
} {
  const { nodes, links, clusters } = useMemo(() => {
    if (!graphData) {
      return { nodes: [] as GraphNode[], links: [] as GraphLink[], clusters: [] as GraphCluster[] };
    }

    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    const { nodes, links } = transformKnowledgeGraph(graphData, mergedConfig);

    let computedClusters: GraphCluster[] = [];

    if (graphData.clusters && graphData.clusters.clusters.length > 0) {
      const transformed = transformClusterIndex(graphData.clusters, nodes);
      computedClusters = transformed.clusters;

      const layoutFn = getLayoutFunction(mergedConfig.layout);
      const result = layoutFn(nodes, links, mergedConfig, 800, 600);

      return {
        nodes: result.nodes,
        links: result.links,
        clusters: computedClusters,
      };
    }

    const layoutFn = getLayoutFunction(mergedConfig.layout);
    const result = layoutFn(nodes, links, mergedConfig, 800, 600);

    return {
      nodes: result.nodes,
      links: result.links,
      clusters: computedClusters,
    };
  }, [graphData, config]);

  return { nodes, links, clusters };
}

function getLayoutFunction(layout: VisualizationConfig["layout"]) {
  switch (layout) {
    case "hierarchical":
      return hierarchicalLayout;
    case "radial":
      return radialLayout;
    case "spring":
      return springLayout;
    case "force":
    default:
      return forceLayout;
  }
}
