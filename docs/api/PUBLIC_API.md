# Public API Reference

> Version 1.0.0 — Knowledge Compiler

---

## Package Structure

```typescript
@knowledge-compiler/core         // Compiler core — compilation engine
@knowledge-compiler/cli          // CLI interface — command-line entry point
@knowledge-compiler/app          // Next.js app — compiled artifact host
@knowledge-compiler/artifacts    // Artifact reader — runtime data access
@knowledge-compiler/visualization // React components — UI library
@knowledge-compiler/config       // Configuration — schema & validation
@knowledge-compiler/ir           // IR types — intermediate representation types
@knowledge-compiler/plugins      // Plugin types — plugin interface definitions
```

---

## Core API (`@knowledge-compiler/core`)

### KnowledgeCompiler Class

```typescript
import { KnowledgeCompiler, compile } from '@knowledge-compiler/core';

class KnowledgeCompiler {
  constructor(config?: Partial<CompilerConfig>);

  /**
   * Run the full compilation pipeline on the given sources.
   * If no sources provided, uses sources from config.
   */
  compile(sources?: string | string[]): Promise<CompilerReport>;

  /**
   * Watch mode — re-compiles on source changes.
   * Yields a new report on each compilation cycle.
   */
  watch(sources?: string | string[]): AsyncIterable<CompilerReport>;

  /** Release all resources held by the compiler */
  destroy(): Promise<void>;

  /** Register an event listener */
  on<E extends CompilerEvent>(
    event: E,
    handler: CompilerEvents[E]
  ): void;

  /** Remove an event listener */
  off<E extends CompilerEvent>(
    event: E,
    handler: CompilerEvents[E]
  ): void;

  /** Get the current (read-only) configuration */
  getConfig(): Readonly<CompilerConfig>;

  /** Get the latest compilation report, or null if none */
  getReport(): CompilerReport | null;

  /** Get an artifact reader pointed at the latest output */
  getArtifactReader(): ArtifactReader;
}
```

### Standalone Compile Function

```typescript
/**
 * Quick one-shot compilation.
 * Creates a compiler instance, runs it, destroys it.
 */
function compile(config?: Partial<CompilerConfig>): Promise<CompilerReport>;
```

### Event Types

```typescript
type CompilerEvent =
  | 'phase-start'
  | 'phase-end'
  | 'pass-start'
  | 'pass-end'
  | 'cache-hit'
  | 'cache-miss'
  | 'error'
  | 'warning'
  | 'progress'
  | 'complete';
```

### Compiler Config

```typescript
interface CompilerConfig {
  /** Source files or directories to compile (glob patterns supported) */
  sources: string[];

  /** Output directory for compiled artifacts (default: .knowledge/) */
  outputDir: string;

  /** Compilation mode */
  mode: 'full' | 'incremental' | 'quick';

  /** Enable/disable cache */
  cache: boolean;

  /** Cache directory (default: .knowledge-cache/) */
  cacheDir: string;

  /** Maximum cache size in MB */
  cacheMaxSize: number;

  /** Whether to generate embeddings */
  embeddings: boolean;

  /** Embedding configuration */
  embeddingConfig: EmbeddingConfig;

  /** Clustering configuration */
  clusteringConfig: ClusteringConfig;

  /** Optimization passes to run (in order) */
  optimizationPasses: OptimizationPass[];

  /** Plugin configuration */
  plugins: PluginConfig[];

  /** Concurrency limit for parallel operations */
  concurrency: number;

  /** Log level */
  logLevel: 'silent' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

  /** Whether to generate source maps in artifacts */
  sourceMaps: boolean;

  /** Whether to compress artifact JSON */
  compress: boolean;

  /** Watch mode polling interval (ms) */
  watchInterval: number;

  /** Compilation timeout (ms, default: no timeout) */
  timeout: number;

  /** Hook to transform source documents before processing */
  transformDocument?: (doc: SourceDocument) => Promise<SourceDocument>;
}

interface EmbeddingConfig {
  provider: string;
  model: string;
  dimensions: number;
  batchSize: number;
  maxRetries: number;
  concurrency: number;
}

interface ClusteringConfig {
  enabled: boolean;
  method: 'kmeans' | 'hierarchical' | 'dbscan' | 'spectral';
  numClusters: number;
  minClusterSize: number;
}

interface OptimizationPass {
  name: string;
  plugin?: string;
  options?: Record<string, unknown>;
}

interface PluginConfig {
  path: string;
  enabled: boolean;
  options?: Record<string, unknown>;
}
```

### Compiler Report

```typescript
interface CompilerReport {
  /** Whether compilation succeeded */
  success: boolean;

  /** Compilation duration in milliseconds */
  duration: number;

  /** Wall-clock start time */
  startedAt: Date;

  /** Wall-clock end time */
  completedAt: Date;

  /** Source statistics */
  sources: SourceStats;

  /** Phase-level reports */
  phases: PhaseReport[];

  /** Total artifacts generated */
  artifactCount: number;

  /** Total output size in bytes */
  outputSize: number;

  /** Output path */
  outputDir: string;

  /** Errors encountered (non-fatal + fatal) */
  errors: CompilerError[];

  /** Warnings */
  warnings: CompilerWarning[];

  /** Cache statistics */
  cache: CacheStats;

  /** Plugin execution summary */
  plugins: PluginStats[];
}

interface SourceStats {
  total: number;
  discovered: number;
  read: number;
  failed: number;
  skipped: number;
  totalSize: number;
  byType: Record<string, number>;
}

interface PhaseReport {
  phase: CompilerPhase;
  duration: number;
  passes: PassReport[];
  status: 'success' | 'failed' | 'skipped';
  error?: CompilerError;
}

interface PassReport {
  name: string;
  duration: number;
  itemsProcessed: number;
  itemsSkipped: number;
  itemsFailed: number;
  status: 'success' | 'failed' | 'skipped';
}

type CompilerPhase =
  | 'init'
  | 'source-discovery'
  | 'parsing'
  | 'analysis'
  | 'graph-building'
  | 'embedding'
  | 'clustering'
  | 'optimization'
  | 'export'
  | 'cleanup';

interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  maxSize: number;
  hitRate: number;
  evictions: number;
}

interface PluginStats {
  name: string;
  version: string;
  type: string;
  hooksCalled: number;
  totalDuration: number;
  errors: number;
  memoryUsed: number;
}
```

---

## Config API (`@knowledge-compiler/config`)

### Functions

```typescript
import {
  loadConfig,
  resolveConfig,
  validateConfig,
  mergeConfigs,
} from '@knowledge-compiler/config';

/**
 * Load a config file from disk.
 * Supports knowledge-compiler.json, .js, .ts, .mjs, .cjs
 */
function loadConfig(configPath?: string): Promise<CompilerConfig>;

/**
 * Resolve a partial config to a full CompilerConfig with defaults.
 */
function resolveConfig(config: DeepPartial<CompilerConfig>): CompilerConfig;

/**
 * Validate an unknown value as a CompilerConfig.
 * Returns errors and warnings without throwing.
 */
function validateConfig(config: unknown): ConfigValidationResult;

/**
 * Deep-merge multiple partial configs (later overrides earlier).
 */
function mergeConfigs(...configs: Partial<CompilerConfig>[]): CompilerConfig;
```

### Config Validation

```typescript
interface ConfigValidationResult {
  valid: boolean;
  config?: CompilerConfig;
  errors: ConfigError[];
  warnings: ConfigWarning[];
}

interface ConfigError {
  path: string;
  code: ConfigErrorCode;
  message: string;
  expected?: string;
  received?: unknown;
}

interface ConfigWarning {
  path: string;
  code: ConfigWarningCode;
  message: string;
}

type ConfigErrorCode =
  | 'REQUIRED_FIELD_MISSING'
  | 'INVALID_TYPE'
  | 'VALUE_OUT_OF_RANGE'
  | 'UNKNOWN_FIELD'
  | 'INVALID_ENUM_VALUE'
  | 'PATTERN_MISMATCH'
  | 'RESOLUTION_FAILURE';

type ConfigWarningCode =
  | 'DEPRECATED_FIELD'
  | 'UNUSED_FIELD'
  | 'PERFORMANCE_IMPLICATION'
  | 'MUTUALLY_EXCLUSIVE_FIELDS';
```

### Config Schema

```typescript
interface ConfigSchema {
  /** JSON Schema definition for CompilerConfig */
  $schema: string;
  type: 'object';
  properties: Record<string, SchemaProperty>;
  required: string[];
  definitions: Record<string, SchemaProperty>;
}

interface SchemaProperty {
  type: string | string[];
  description?: string;
  default?: unknown;
  examples?: unknown[];
  minimum?: number;
  maximum?: number;
  enum?: unknown[];
  pattern?: string;
  items?: SchemaProperty;
  properties?: Record<string, SchemaProperty>;
  required?: string[];
  oneOf?: SchemaProperty[];
  anyOf?: SchemaProperty[];
  allOf?: SchemaProperty[];
}
```

### Deep Partial Type

```typescript
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
```

---

## IR API (`@knowledge-compiler/ir`)

### Core IR Types

```typescript
import {
  KnowledgeGraph,
  KnowledgeNode,
  KnowledgeEdge,
  VisualGraph,
  VisualNode,
  VisualEdge,
  EntityCollection,
  Entity,
  ClusterCollection,
  Cluster,
  ConceptCollection,
  Concept,
  ConceptHierarchy,
  Navigation,
  NavSection,
  SearchIndex,
  SearchEntry,
  Statistics,
  Manifest,
  ManifestEntry,
} from '@knowledge-compiler/ir';
```

### Knowledge Graph

```typescript
interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  metadata: GraphMetadata;
}

interface KnowledgeNode {
  id: string;
  type: string;
  label: string;
  description?: string;
  source?: string;
  path?: string;
  checksum?: string;
  embeddings?: Float32Array;
  properties: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  weight: number;
  properties?: Record<string, unknown>;
}

interface GraphMetadata {
  nodeCount: number;
  edgeCount: number;
  density: number;
  connectedComponents: number;
  maxDegree: number;
  avgDegree: number;
}
```

### Visual Graph

```typescript
interface VisualGraph {
  nodes: VisualNode[];
  edges: VisualEdge[];
}

interface VisualNode {
  id: string;
  label: string;
  type: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
  size: number;
  color: string;
  opacity: number;
  clusterId?: string;
  depth?: number;
  properties: Record<string, unknown>;
}

interface VisualEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type: string;
  weight: number;
  color: string;
  opacity: number;
  width: number;
  dashed: boolean;
  properties: Record<string, unknown>;
}
```

### Entities

```typescript
interface EntityCollection {
  entities: Entity[];
  total: number;
  byType: Record<string, number>;
}

interface Entity {
  id: string;
  name: string;
  type: string;
  salience: number;
  frequency: number;
  mentions: EntityMention[];
  sourceIds: string[];
  properties: Record<string, unknown>;
}

interface EntityMention {
  documentId: string;
  text: string;
  position: { start: number; end: number };
  confidence: number;
}
```

### Clusters

```typescript
interface ClusterCollection {
  clusters: Cluster[];
  metrics: ClusteringMetrics;
  hierarchy?: ClusterHierarchyNode;
}

interface Cluster {
  id: string;
  label: string;
  description?: string;
  nodeIds: string[];
  centroid?: number[];
  silhouetteScore: number;
  keywords: string[];
  summary: string;
  color: string;
  size: number;
}

interface ClusterHierarchyNode {
  id: string;
  label: string;
  children?: ClusterHierarchyNode[];
  leafIds?: string[];
  depth: number;
  silhouetteScore?: number;
}

interface ClusteringMetrics {
  silhouetteScore: number;
  daviesBouldinIndex: number;
  calinskiHarabaszScore: number;
  intraClusterDistance: number;
  interClusterDistance: number;
  elbowScore?: number;
}
```

### Concepts

```typescript
interface ConceptCollection {
  concepts: Concept[];
  hierarchy: ConceptHierarchy;
  total: number;
}

interface Concept {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  level: number;
  path: string[];
  nodeIds: string[];
  keywords: string[];
  weight: number;
  children: Concept[];
}

interface ConceptHierarchy {
  roots: Concept[];
  depth: number;
  totalConcepts: number;
}
```

### Navigation

```typescript
interface Navigation {
  sections: NavSection[];
  breadcrumbs: Breadcrumb[];
}

interface NavSection {
  id: string;
  title: string;
  type: 'source' | 'topic' | 'cluster' | 'entity' | 'concept';
  items: NavItem[];
  collapsed?: boolean;
}

interface NavItem {
  id: string;
  label: string;
  type: string;
  href: string;
  icon?: string;
  count?: number;
  children?: NavItem[];
}

interface Breadcrumb {
  label: string;
  href: string;
  icon?: string;
}
```

### Search Index

```typescript
interface SearchIndex {
  entries: SearchEntry[];
  metadata: SearchIndexMetadata;
}

interface SearchEntry {
  id: string;
  text: string;
  type: string;
  source?: string;
  path?: string;
  tokens: string[];
  score: number;
  fields: Record<string, string | number | boolean>;
}

interface SearchIndexMetadata {
  totalEntries: number;
  totalTokens: number;
  averageEntryLength: number;
  fieldNames: string[];
}
```

### Statistics

```typescript
interface Statistics {
  sources: SourceStats;
  documents: DocumentStats;
  graph: GraphStats;
  entities: EntityStats;
  clusters: ClusterStats;
  concepts: ConceptStats;
  embeddings: EmbeddingStats;
  compilation: CompilationStats;
}

interface DocumentStats {
  total: number;
  totalWords: number;
  averageWordsPerDocument: number;
  totalCodeBlocks: number;
  totalLinks: number;
  totalImages: number;
  byLanguage: Record<string, number>;
  longestDocument: { id: string; words: number };
  shortestDocument: { id: string; words: number };
}

interface GraphStats {
  nodes: number;
  edges: number;
  density: number;
  isolatedNodes: number;
  avgDegree: number;
  maxDegree: number;
  communities: number;
  topCentralNodes: { id: string; centrality: number }[];
}

interface EntityStats {
  total: number;
  distinctTypes: number;
  topEntities: { name: string; frequency: number }[];
  byType: Record<string, number>;
}

interface ClusterStats {
  total: number;
  avgSize: number;
  minSize: number;
  maxSize: number;
  avgSilhouette: number;
  largestCluster: { id: string; size: number };
  smallestCluster: { id: string; size: number };
}

interface ConceptStats {
  total: number;
  maxDepth: number;
  avgChildrenPerConcept: number;
  topConcepts: { name: string; weight: number }[];
}

interface EmbeddingStats {
  totalVectors: number;
  dimensions: number;
  model: string;
  averageMagnitude: number;
  storageSize: number;
}

interface CompilationStats {
  duration: number;
  cacheHitRate: number;
  totalPasses: number;
  pluginsExecuted: number;
  errors: number;
  warnings: number;
  memoryPeakMB: number;
}
```

### Manifest

```typescript
interface Manifest {
  version: string;
  compilerVersion: string;
  createdAt: Date;
  sources: string[];
  artifacts: ManifestEntry[];
  statistics: Statistics;
  config: CompilerConfig;
}

interface ManifestEntry {
  name: string;
  path: string;
  type: string;
  size: number;
  checksum: string;
  compressed: boolean;
  encoding: 'json' | 'json.gz' | 'binary';
}
```

---

## Artifact API (`@knowledge-compiler/artifacts`)

### ArtifactReader Class

```typescript
import { ArtifactReader } from '@knowledge-compiler/artifacts';

class ArtifactReader {
  constructor(basePath: string);

  /** Read the compilation manifest */
  readManifest(): Promise<Manifest>;

  /** Read the full knowledge graph */
  readKnowledge(): Promise<KnowledgeGraph>;

  /** Read the visual graph (with positions, colors, etc.) */
  readGraph(): Promise<VisualGraph>;

  /** Read extracted entities */
  readEntities(): Promise<EntityCollection>;

  /** Read clusters */
  readClusters(): Promise<ClusterCollection>;

  /** Read concept hierarchy */
  readConcepts(): Promise<ConceptCollection>;

  /** Read navigation structure */
  readNavigation(): Promise<Navigation>;

  /** Read a specific embedding vector */
  readEmbedding(id: string): Promise<Float32Array | null>;

  /** Read the full-text search index */
  readSearchIndex(): Promise<SearchIndex>;

  /** Read recommendations for a specific node */
  readRecommendations(id: string): Promise<RecommendationEntry>;

  /** Read compilation statistics */
  readStatistics(): Promise<Statistics>;

  /** Generic artifact reader */
  read<T>(artifactName: string): Promise<T>;

  // -- Query Helpers --

  /** Find a knowledge node by ID */
  findNode(id: string): Promise<KnowledgeNode | null>;

  /** Find nodes related to a given node */
  findRelated(id: string, options?: RelationOptions): Promise<RelatedNodes>;

  /** Full-text search */
  search(query: string, options?: SearchOptions): Promise<SearchResults>;

  /** Get similar nodes by embedding similarity */
  getSimilar(id: string, topK?: number): Promise<SimilarNodes>;

  /** Get cluster information for a node */
  getCluster(id: string): Promise<ClusterInfo>;

  /** Get the concept hierarchy path for a node */
  getConceptPath(id: string): Promise<ConceptPath>;

  // -- Streaming --

  /** Stream all nodes (memory-efficient for large graphs) */
  streamNodes(): AsyncIterable<KnowledgeNode>;

  /** Stream all edges */
  streamEdges(): AsyncIterable<KnowledgeEdge>;
}

interface RelationOptions {
  types?: string[];
  minWeight?: number;
  maxResults?: number;
  direction?: 'incoming' | 'outgoing' | 'both';
}

interface RelatedNodes {
  node: KnowledgeNode;
  relations: {
    edge: KnowledgeEdge;
    related: KnowledgeNode;
    weight: number;
  }[];
}

interface SearchOptions {
  fields?: string[];
  types?: string[];
  limit?: number;
  offset?: number;
  threshold?: number;
}

interface SearchResults {
  results: SearchResultItem[];
  total: number;
  query: string;
  duration: number;
}

interface SearchResultItem {
  entry: SearchEntry;
  score: number;
  highlights: { field: string; snippet: string }[];
}

interface SimilarNodes {
  id: string;
  similar: { node: KnowledgeNode; similarity: number }[];
}

interface ClusterInfo {
  cluster: Cluster;
  nodes: KnowledgeNode[];
}

interface ConceptPath {
  concept: Concept;
  path: Concept[];
  siblings: Concept[];
}

interface RecommendationEntry {
  id: string;
  recommendations: {
    node: KnowledgeNode;
    reason: string;
    score: number;
  }[];
}
```

### React Hooks

```typescript
import {
  useKnowledge,
  useGraph,
  useEntities,
  useClusters,
  useConcepts,
  useNavigation,
  useSearch,
  useRecommendations,
  useRelated,
  useSimilar,
  useNode,
  useCompilerReport,
} from '@knowledge-compiler/artifacts';

// Hook signatures

function useKnowledge(): {
  loading: boolean;
  error: Error | null;
  data: KnowledgeGraph | null;
};

function useGraph(): {
  loading: boolean;
  error: Error | null;
  data: VisualGraph | null;
};

function useEntities(): {
  loading: boolean;
  error: Error | null;
  data: EntityCollection | null;
};

function useClusters(): {
  loading: boolean;
  error: Error | null;
  data: ClusterCollection | null;
};

function useConcepts(): {
  loading: boolean;
  error: Error | null;
  data: ConceptCollection | null;
};

function useNavigation(): {
  loading: boolean;
  error: Error | null;
  data: Navigation | null;
};

function useSearch(): {
  search: (query: string, options?: SearchOptions) => Promise<void>;
  results: SearchResults | null;
  loading: boolean;
  error: Error | null;
};

function useRecommendations(id: string): {
  loading: boolean;
  error: Error | null;
  data: RecommendationEntry | null;
};

function useRelated(id: string): {
  loading: boolean;
  error: Error | null;
  data: RelatedNodes | null;
};

function useSimilar(id: string): {
  loading: boolean;
  error: Error | null;
  data: SimilarNodes | null;
};

function useNode(id: string): {
  loading: boolean;
  error: Error | null;
  data: KnowledgeNode | null;
  related: RelatedNodes | null;
};

function useCompilerReport(): CompilerReport | null;
```

### ArtifactReaderProvider

```typescript
import { ArtifactReaderProvider } from '@knowledge-compiler/artifacts';

interface ArtifactReaderProviderProps {
  reader: ArtifactReader;
  children: React.ReactNode;
}

// Wrap your app:
<ArtifactReaderProvider reader={new ArtifactReader('/path/to/artifacts')}>
  <App />
</ArtifactReaderProvider>

// All hooks automatically use the nearest ArtifactReaderProvider context.
```

---

## CLI API (`@knowledge-compiler/cli`)

### Programmatic Entry Point

```typescript
import { runCLI } from '@knowledge-compiler/cli';

/**
 * Run the CLI with the given argv array.
 * Returns the process exit code (0 = success).
 */
function runCLI(argv: string[]): Promise<number>;
```

### CLI Commands

| Command | Description |
|---------|------------|
| `compile [sources...]` | Run compilation |
| `watch [sources...]` | Watch mode |
| `init` | Create a default config file |
| `validate [config]` | Validate a config file |
| `plugins` | List discovered plugins |
| `cache clear` | Clear the compilation cache |
| `cache info` | Show cache statistics |
| `version` | Print version |

### CLI Options

```typescript
interface CLIOptions {
  config?: string;            // Path to config file
  output?: string;            // Output directory
  mode?: 'full' | 'incremental' | 'quick';
  watch?: boolean;            // Enable watch mode
  cache?: boolean;            // Enable/disable cache
  concurrency?: number;       // Parallelism limit
  logLevel?: string;          // Log level
  timeout?: number;           // Compilation timeout
  profile?: boolean;          // Enable profiling output
  json?: boolean;             // Output report as JSON
  quiet?: boolean;            // Suppress non-error output
  verbose?: boolean;          // Enable verbose logging
  noColor?: boolean;          // Disable colored output
}
```

---

## Visualization API (`@knowledge-compiler/visualization`)

### Component Props

```typescript
import {
  KnowledgeGraph,
  ConceptHierarchy,
  PipelineView,
  ArtifactExplorer,
  ClusterExplorer,
  IRExplorer,
  SearchView,
  SimilarityView,
  StatisticsPanel,
  CompilerReportView,
} from '@knowledge-compiler/visualization';
```

#### KnowledgeGraphProps

```typescript
interface KnowledgeGraphProps {
  graph: VisualGraph;
  width?: number;
  height?: number;
  theme?: 'light' | 'dark' | 'system';
  interactive?: boolean;
  physics?: boolean;
  clustering?: boolean;
  nodeLabel?: 'always' | 'hover' | 'never';
  nodeSizeScale?: number;
  edgeWidthScale?: number;
  minZoom?: number;
  maxZoom?: number;
  highlightOnHover?: boolean;
  onNodeClick?: (nodeId: string, node: VisualNode, event: React.MouseEvent) => void;
  onNodeDoubleClick?: (nodeId: string, node: VisualNode, event: React.MouseEvent) => void;
  onEdgeClick?: (edgeId: string, edge: VisualEdge, event: React.MouseEvent) => void;
  onBackgroundClick?: (event: React.MouseEvent) => void;
  onZoomChange?: (zoom: number) => void;
  selectedNodeId?: string;
  highlightedNodeIds?: string[];
  filter?: (node: VisualNode) => boolean;
  nodeTooltip?: (node: VisualNode) => React.ReactNode;
  edgeTooltip?: (edge: VisualEdge) => React.ReactNode;
  controls?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

#### ConceptHierarchyProps

```typescript
interface ConceptHierarchyProps {
  concepts: ConceptCollection;
  width?: number;
  height?: number;
  theme?: 'light' | 'dark' | 'system';
  interactive?: boolean;
  layout?: 'tree' | 'radial' | 'icicle' | 'sunburst';
  maxDepth?: number;
  compact?: boolean;
  showNodeCount?: boolean;
  onConceptClick?: (conceptId: string, concept: Concept, event: React.MouseEvent) => void;
  onConceptHover?: (conceptId: string | null, concept: Concept | null) => void;
  selectedConceptId?: string;
  highlightedConceptIds?: string[];
  animate?: boolean;
  collapsible?: boolean;
  nodeTooltip?: (concept: Concept) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
```

#### PipelineViewProps

```typescript
interface PipelineViewProps {
  report: CompilerReport;
  theme?: 'light' | 'dark' | 'system';
  compact?: boolean;
  showTimings?: boolean;
  showPhaseDetails?: boolean;
  showPassDetails?: boolean;
  showPluginDetails?: boolean;
  showCacheStats?: boolean;
  showErrors?: boolean;
  autoExpandErrors?: boolean;
  onPhaseClick?: (phase: CompilerPhase) => void;
  onPassClick?: (passName: string) => void;
  onPluginClick?: (pluginName: string) => void;
  onRetry?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
```

#### ArtifactExplorerProps

```typescript
interface ArtifactExplorerProps {
  artifacts: ArtifactReader;
  theme?: 'light' | 'dark' | 'system';
  defaultTab?: 'graph' | 'entities' | 'clusters' | 'concepts' | 'search' | 'stats';
  width?: number;
  height?: number;
  showSearch?: boolean;
  showNavigation?: boolean;
  onNodeClick?: (nodeId: string) => void;
  onEntityClick?: (entityId: string) => void;
  onClusterClick?: (clusterId: string) => void;
  onConceptClick?: (conceptId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
```

#### ClusterExplorerProps

```typescript
interface ClusterExplorerProps {
  clusters: ClusterCollection;
  graph?: VisualGraph;
  width?: number;
  height?: number;
  theme?: 'light' | 'dark' | 'system';
  layout?: 'grid' | 'scatter' | 'graph';
  showMetrics?: boolean;
  showHierarchy?: boolean;
  showKeywords?: boolean;
  showSummary?: boolean;
  onClusterClick?: (clusterId: string, cluster: Cluster) => void;
  onNodeClick?: (nodeId: string) => void;
  selectedClusterId?: string;
  highlightedClusterIds?: string[];
  maxClusters?: number;
  minClusterSize?: number;
  className?: string;
  style?: React.CSSProperties;
}
```

#### IRExplorerProps

```typescript
interface IRExplorerProps {
  ir: IRNode;
  theme?: 'light' | 'dark' | 'system';
  view?: 'tree' | 'json' | 'table';
  maxDepth?: number;
  searchable?: boolean;
  editable?: boolean;
  showMetadata?: boolean;
  showPositions?: boolean;
  onNodeClick?: (nodeId: string, node: IRNode) => void;
  onNodeChange?: (nodeId: string, changes: Partial<IRNode>) => void;
  selectedNodeId?: string;
  filter?: (node: IRNode) => boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

#### SearchViewProps

```typescript
interface SearchViewProps {
  searchIndex: SearchIndex;
  theme?: 'light' | 'dark' | 'system';
  placeholder?: string;
  debounceMs?: number;
  minQueryLength?: number;
  maxResults?: number;
  showTypeFilters?: boolean;
  showFieldFilters?: boolean;
  showHighlights?: boolean;
  compact?: boolean;
  onResultClick?: (entry: SearchEntry, event: React.MouseEvent) => void;
  onSearch?: (query: string, results: SearchResultItem[]) => void;
  externalQuery?: string;
  className?: string;
  style?: React.CSSProperties;
}
```

#### SimilarityViewProps

```typescript
interface SimilarityViewProps {
  nodeId: string;
  artifacts: ArtifactReader;
  theme?: 'light' | 'dark' | 'system';
  topK?: number;
  minSimilarity?: number;
  layout?: 'list' | 'grid' | 'graph';
  showSimilarityScore?: boolean;
  showReason?: boolean;
  onNodeClick?: (nodeId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
```

#### StatisticsPanelProps

```typescript
interface StatisticsPanelProps {
  statistics: Statistics;
  theme?: 'light' | 'dark' | 'system';
  sections?: ('sources' | 'documents' | 'graph' | 'entities' | 'clusters' | 'concepts' | 'embeddings' | 'compilation')[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  showCharts?: boolean;
  showProgressBars?: boolean;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

#### CompilerReportViewProps

```typescript
interface CompilerReportViewProps {
  report: CompilerReport;
  theme?: 'light' | 'dark' | 'system';
  compact?: boolean;
  showSummary?: boolean;
  showTimeline?: boolean;
  showErrorsList?: boolean;
  showWarningsList?: boolean;
  onRerun?: () => void;
  onOpenOutput?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
```

---

## Plugin API (`@knowledge-compiler/plugins`)

### Re-exports

```typescript
export type {
  // Plugin interfaces
  KnowledgeCompilerPlugin,
  PluginHooks,
  PluginContext,
  PluginRegistry,
  PluginDescriptor,
  PluginType,
  PluginDependency,
  HookResult,

  // Source plugin types
  SourcePlugin,
  SourceConfig,
  SourceDocument,
  SourceDescriptor,

  // Parser plugin types
  ParserPlugin,
  DocAST,
  ASTNode,

  // Analyzer plugin types
  AnalyzerPlugin,
  AnalyzerDocument,
  AnalysisResult,
  EntityResult,
  KeywordResult,
  TopicResult,

  // Graph plugin types
  GraphPlugin,
  GraphContext,
  IRGraph,
  GraphNode,
  GraphEdge,

  // Embedding plugin types
  EmbeddingPlugin,
  EmbeddingPluginConfig,
  EmbeddingResult,

  // Cluster plugin types
  ClusterPlugin,
  SimilarityMatrix,
  ClusterConfig,
  ClusterResult,
  Cluster,
  ClusteringMetrics,

  // Optimization plugin types
  OptimizationPlugin,
  IRNode,
  OptimizationConfig,

  // Export plugin types
  ExportPlugin,
  ArtifactBundle,
  ExportResult,

  // Visualization plugin types
  VisualizationPlugin,
  VisualizationPluginProps,

  // Lifecycle plugin types
  LifecyclePlugin,

  // Plugin infra
  PluginContext,
  ScopedLogger,
  PluginResourceLimits,
  PluginSecurityPolicy,
  PluginPermissionLevel,
  PluginValidationResult,
  PluginValidationError,
  PluginErrorCode,
  PluginEventBus,
  PluginNamespaceRegistry,
  Namespace,
  PluginApiKeyManager,
  SecurityViolation,
  SecurityViolationType,
  CompatibilityMatrix,
  CompatibilityEntry,
} from '@knowledge-compiler/plugins';
```

---

## Error Types

```typescript
/**
 * Base compiler error.
 * All compiler errors are instances of CompilerError.
 */
class CompilerError extends Error {
  /** Error code for programmatic handling */
  code: ErrorCode;

  /** The phase in which the error occurred */
  phase: CompilerPhase;

  /** The pass in which the error occurred (if applicable) */
  pass?: string;

  /** Whether this error terminates compilation */
  fatal: boolean;

  /** Whether compilation can continue after this error */
  recoverable: boolean;

  /** Arbitrary error details */
  details: unknown;

  constructor(opts: {
    code: ErrorCode;
    phase: CompilerPhase;
    message: string;
    pass?: string;
    fatal?: boolean;
    recoverable?: boolean;
    details?: unknown;
    cause?: Error;
  });
}

/** Error codes for programmatic error handling */
type ErrorCode =
  | 'SOURCE_NOT_FOUND'
  | 'PARSE_ERROR'
  | 'EMBEDDING_FAILURE'
  | 'GRAPH_BUILD_FAILURE'
  | 'CACHE_MISS'
  | 'PLUGIN_ERROR'
  | 'CONFIG_ERROR'
  | 'OUT_OF_MEMORY'
  | 'TIMEOUT'
  | 'INTERNAL_ERROR';

/** Non-fatal compiler warning */
interface CompilerWarning {
  code: WarningCode;
  message: string;
  phase: CompilerPhase;
  pass?: string;
  details?: unknown;
}

type WarningCode =
  | 'SLOW_OPERATION'
  | 'LARGE_DOCUMENT'
  | 'MISSING_METADATA'
  | 'DEPRECATED_CONFIG'
  | 'PLUGIN_DEPRECATED'
  | 'FALLBACK_USED'
  | 'EMPTY_SOURCE'
  | 'DUPLICATE_ID';

/** Progress update emitted during compilation */
interface CompilerProgress {
  phase: CompilerPhase;
  pass?: string;
  percent: number;
  current: number;
  total: number;
  message?: string;
  eta?: number; // estimated ms remaining
}
```

---

## Compiler Pass Context

```typescript
interface PassContext {
  name: string;
  phase: CompilerPhase;
  /**
   * The IR at the current point in the pipeline.
   * Mutating this affects downstream passes.
   */
  ir: IRNode;
  /** Read-only configuration */
  config: Readonly<CompilerConfig>;
  /** Items processed so far */
  processed: number;
  /** Total items to process */
  total: number;
  /** Time elapsed for this pass */
  elapsedMs: number;
}

interface PassContext {
  name: string;
  phase: CompilerPhase;
  ir: IRNode;
  config: Readonly<CompilerConfig>;
  processed: number;
  total: number;
  elapsedMs: number;
}
```

---

## Common Types

```typescript
/** Generic event handler */
type EventHandler<T = unknown> = (data: T) => void;

/** Unsubscribe function returned by event subscriptions */
type Unsubscribe = () => void;

/** Generic async iterator source */
type AsyncSource<T> = AsyncIterable<T> | Iterable<T> | Promise<T[]>;

/** Compiler event handler map (for strongly-typed event system) */
interface CompilerEvents {
  'phase-start': (phase: CompilerPhase) => void;
  'phase-end': (phase: CompilerPhase, report: PhaseReport) => void;
  'pass-start': (passName: string) => void;
  'pass-end': (passName: string, report: PassReport) => void;
  'cache-hit': (key: string) => void;
  'cache-miss': (key: string) => void;
  'error': (error: CompilerError) => void;
  'warning': (warning: CompilerWarning) => void;
  'progress': (progress: CompilerProgress) => void;
  'complete': (report: CompilerReport) => void;
}

/** Readonly wrapper */
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```
