import type {
  KnowledgeGraph,
  SectionIndex,
  ConceptIndex,
  ClusterIndex,
  EmbeddingIndex,
} from "./types.js";

export {
  DEFAULT_CONFIG,
  THEME_COLORS,
  NODE_COLORS,
  NODE_SIZES,
} from "./types.js";

export type {
  VisualizationConfig,
  GraphViewProps,
  ConceptViewProps,
  ClusterViewProps,
  SearchViewProps,
  SearchResult,
  GraphNode,
  GraphLink,
  GraphCluster,
  NodeType,
  SectionIndex,
  ConceptIndex,
  ClusterIndex,
  EmbeddingIndex,
} from "./types.js";

export type { KnowledgeGraph } from "./types.js";
export { KnowledgeGraph as KnowledgeGraphComponent } from "./components/KnowledgeGraph.js";
export { ConceptHierarchy } from "./components/ConceptHierarchy.js";
export { ClusterView } from "./components/ClusterView.js";
export { SearchView } from "./components/SearchView.js";

export { useArtifactData } from "./hooks/useArtifactData.js";
export { useGraphData } from "./hooks/useGraphData.js";
