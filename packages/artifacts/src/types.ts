export const ArtifactType = {
  Manifest: 'manifest',
  KnowledgeGraph: 'knowledge-graph',
  Embeddings: 'embeddings',
  SectionIndex: 'section-index',
  ConceptIndex: 'concept-index',
  ClusterIndex: 'cluster-index',
  Navigation: 'navigation',
  SearchIndex: 'search-index',
  Statistics: 'statistics',
} as const;

export type ArtifactType = (typeof ArtifactType)[keyof typeof ArtifactType];

export interface ArtifactMeta {
  version: number;
  generatedAt: string;
  sourceCount: number;
  sectionCount: number;
  conceptCount: number;
  edgeCount: number;
  sourceHash: string;
}

export interface ArtifactEntry {
  path: string;
  hash: string;
  size: number;
  contentType: string;
}

export interface Manifest {
  version: number;
  generatedAt: string;
  artifacts: Record<string, ArtifactEntry>;
}

export interface WriterOptions {
  outputDir: string;
  compress?: boolean;
  prettyPrint?: boolean;
}

export interface ReaderOptions {
  baseDir: string;
}
