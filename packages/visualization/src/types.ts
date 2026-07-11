export interface VisualizationConfig {
  mode: "2d" | "3d";
  layout: "force" | "hierarchical" | "radial" | "spring";
  theme: "dark" | "light";
  nodeSize: number;
  edgeThickness: number;
  maxNodes: number;
  maxEdges: number;
  animationSpeed: number;
  showLabels: boolean;
  showTooltips: boolean;
  clusterColors: Record<string, string>;
}

export interface GraphViewProps {
  config?: Partial<VisualizationConfig>;
  onNodeClick?: (nodeId: string) => void;
  onEdgeClick?: (sourceId: string, targetId: string) => void;
  onHover?: (nodeId: string | null) => void;
}

export interface ConceptViewProps {
  config?: Partial<VisualizationConfig>;
  onConceptSelect?: (conceptId: string) => void;
}

export interface ClusterViewProps {
  config?: Partial<VisualizationConfig>;
  onClusterSelect?: (clusterId: number) => void;
}

export interface SearchViewProps {
  onSearch?: (query: string, results: SearchResult[]) => void;
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  relevance: number;
  sectionId: string;
}

export type NodeType = "document" | "section" | "entity" | "concept" | "cluster";

export interface GraphNode {
  id: string;
  type: NodeType;
  label: string;
  radius: number;
  color: string;
  pageRank: number;
  clusterId?: number;
  level?: number;
  metadata?: Record<string, unknown>;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink {
  source: GraphNode | string;
  target: GraphNode | string;
  type: string;
  weight: number;
  thickness: number;
  color: string;
}

export interface GraphCluster {
  id: number;
  label: string;
  color: string;
  members: string[];
  centroid: { x: number; y: number };
  radius: number;
  topTerms: string[];
}

export const DEFAULT_CONFIG: VisualizationConfig = {
  mode: "2d",
  layout: "force",
  theme: "dark",
  nodeSize: 8,
  edgeThickness: 1.5,
  maxNodes: 500,
  maxEdges: 2000,
  animationSpeed: 1,
  showLabels: true,
  showTooltips: true,
  clusterColors: {},
};

export const THEME_COLORS = {
  dark: {
    background: "#0f172a",
    surface: "#1e293b",
    border: "#334155",
    text: "#e2e8f0",
    textMuted: "#94a3b8",
    tooltipBackground: "#1e293b",
    tooltipBorder: "#475569",
    legendBackground: "#1e293b",
    inputBackground: "#0f172a",
    inputBorder: "#334155",
  },
  light: {
    background: "#ffffff",
    surface: "#f8fafc",
    border: "#e2e8f0",
    text: "#0f172a",
    textMuted: "#64748b",
    tooltipBackground: "#ffffff",
    tooltipBorder: "#e2e8f0",
    legendBackground: "#f8fafc",
    inputBackground: "#ffffff",
    inputBorder: "#e2e8f0",
  },
} as const;

export const NODE_COLORS: Record<NodeType, string> = {
  document: "#3b82f6",
  section: "#10b981",
  entity: "#f59e0b",
  concept: "#8b5cf6",
  cluster: "#ef4444",
};

export const NODE_SIZES: Record<NodeType, number> = {
  document: 1.4,
  section: 1.0,
  entity: 1.2,
  concept: 1.1,
  cluster: 1.3,
};

export interface KnowledgeGraph {
  documents: Array<{
    id: string;
    path: string;
    title?: string;
  }>;
  sections: Array<{
    id: string;
    path: string;
    title: string;
    headingPath?: string[];
    docId?: string;
    level?: number;
    parentId?: string;
    childIds?: string[];
    clusterId?: number;
    importance?: number;
  }>;
  concepts: Array<{
    id: string;
    name: string;
    type?: string;
    frequency?: number;
    relatedConcepts: string[];
    aliases?: string[];
    description?: string;
    importance?: number;
    level?: number;
    embeddingOffset?: number;
  }>;
  edges: Array<{
    source: string;
    target: string;
    type?: string;
    weight?: number;
    color?: string;
  }>;
  clusters?: ClusterIndex;
}

export interface SectionIndex {
  sections: Array<{
    id: string;
    title: string;
    path?: string;
    headingPath: string[];
    docId?: string;
    summary?: string;
    startOffset?: number;
    endOffset?: number;
    level?: number;
    parentId?: string;
    childIds?: string[];
  }>;
}

export interface ConceptIndex {
  concepts: Array<{
    id: string;
    name: string;
    type: string;
    frequency: number;
    relatedConcepts: string[];
    aliases?: string[];
    description?: string;
    embeddingOffset?: number;
  }>;
}

export interface ClusterIndex {
  clusters: Array<{
    id: string;
    centroidOffset: number;
    memberCount: number;
    topTerms: string[];
    label?: string;
    members?: string[];
    silhouetteScore?: number;
  }>;
}

export interface EmbeddingIndex {
  embeddings: Array<{
    id: string;
    vector: number[];
    offset?: number;
  }>;
  metadata?: {
    dimension: number;
    totalEntries: number;
  };
}
