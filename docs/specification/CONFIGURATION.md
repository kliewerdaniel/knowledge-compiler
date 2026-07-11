# Knowledge Compiler — Configuration Specification

> **Audience:** Developer operators configuring the compiler for their knowledge base.
>
> **Version:** 1.0.0

---

## Table of Contents

1. [Configuration Sources](#1-configuration-sources)
2. [Configuration Schema](#2-configuration-schema)
3. [Environment Variables](#3-environment-variables)
4. [Configuration File Example](#4-configuration-file-example)
5. [Configuration Resolution Algorithm](#5-configuration-resolution-algorithm)
6. [Configuration Validation](#6-configuration-validation)
7. [Configuration Profiling](#7-configuration-profiling)

---

## 1. Configuration Sources

Configuration is resolved from multiple sources with a strict priority order. Later sources override earlier ones.

### Resolution Order (lowest → highest priority)

| Priority | Source | File / Mechanism | Notes |
|----------|--------|------------------|-------|
| 1 (lowest) | **Default configuration** | Compiled-in defaults | Every field has a sensible default; the compiler works with zero config |
| 2 | **Project config file** | `./knowledge-compiler.json` | JSON format, exact structure |
| 3 | **Project config file (JSONC)** | `./knowledge-compiler.jsonc` | Supports comments and trailing commas |
| 4 | **Home directory config** | `~/.kcrc` | JSON or YAML format; user-level overrides across projects |
| 5 | **Environment variables** | `KC_*` prefixed | See [§3 Environment Variables](#3-environment-variables) |
| 6 (highest) | **CLI flags** | Command-line arguments | Override anything; documented via `--help` |

### Merge Semantics

- **Scalar values** (strings, numbers, booleans): Later source replaces earlier.
- **Objects**: Deep-merged recursively. Nested keys from later sources override matching keys; keys present only in earlier sources are preserved.
- **Arrays**: Fully replaced (not concatenated). This applies to `source.patterns`, `source.exclude`, `plugins.paths`, `pipeline.passes`, `pipeline.skipPasses`, etc.
- **`undefined` / `null`**: Explicit `null` in a higher-priority source removes a previously set value, causing the field to fall back to its default. `undefined` is treated as "not specified" and does not override.

### File Discovery

```typescript
async function discoverConfigFiles(projectDir: string): Promise<ConfigFile[]> {
  const files: ConfigFile[] = [];

  // Project-level (check both json and jsonc; prefer whichever exists)
  for (const name of ['knowledge-compiler.json', 'knowledge-compiler.jsonc']) {
    const path = join(projectDir, name);
    if (await exists(path)) {
      files.push({ path, source: 'project', format: name.endsWith('.jsonc') ? 'jsonc' : 'json' });
      break; // only the first found
    }
  }

  // Home directory
  const homeConfig = join(homedir(), '.kcrc');
  if (await exists(homeConfig)) {
    const content = await readFile(homeConfig, 'utf-8');
    const format = content.trim().startsWith('{') ? 'json' : 'yaml';
    files.push({ path: homeConfig, source: 'home', format });
  }

  // CLI --config flag (explicit path, highest priority file source)
  // Handled by the CLI parser separately

  return files;
}
```

---

## 2. Configuration Schema

The complete Zod schema. This schema is the single source of truth for configuration shape, types, defaults, and validation.

```typescript
import { z } from 'zod';

// ── Helper: byte-size string parser ──────────────────────────

const ByteSizePattern = /^(\d+)\s*(KB|MB|GB)$/i;
const ParseByteSize = (s: string): number => {
  const m = ByteSizePattern.exec(s);
  if (!m) throw new Error(`Invalid byte size: ${s}`);
  const n = parseInt(m[1], 10);
  switch (m[2].toUpperCase()) {
    case 'KB': return n * 1024;
    case 'MB': return n * 1024 * 1024;
    case 'GB': return n * 1024 * 1024 * 1024;
  }
};

// ── Compression ──────────────────────────────────────────────

const CompressionLevelSchema = z.number().int().min(0).max(22);

// ── Parallel Config ──────────────────────────────────────────

const ParallelConfigSchema = z.object({
  enabled: z.boolean().default(true),
  maxWorkers: z.number().int().positive().default(0),
  workerMemory: z.number().positive().default(512),
  batchSize: z.number().int().positive().default(100),
});

// ── Retry Config ─────────────────────────────────────────────

const RetryConfigSchema = z.object({
  maxRetries: z.number().int().min(0).default(3),
  baseDelay: z.number().positive().default(1000),
  maxDelay: z.number().positive().default(30000),
  backoffFactor: z.number().positive().default(2),
  retryableErrors: z.array(z.string()).default([
    'TRANSIENT',
    'RATE_LIMITED',
    'TIMEOUT',
  ]),
}).default({});

// ── Source Configuration ─────────────────────────────────────

const SourceConfigSchema = z.object({
  patterns: z.array(z.string()).default(['**/*.md']),
  exclude: z.array(z.string()).default(['node_modules/**', '.git/**']),
  baseDir: z.string().default('.'),
  followSymlinks: z.boolean().default(false),
  encoding: z.enum(['utf-8', 'utf-16', 'latin1']).default('utf-8'),
});

// ── Output Configuration ─────────────────────────────────────

const OutputConfigSchema = z.object({
  dir: z.string().default('./dist'),
  clean: z.boolean().default(true),
  compress: z.boolean().default(true),
  compressionLevel: CompressionLevelSchema.default(9),
  prettyPrint: z.boolean().default(false),
  includeTiming: z.boolean().default(true),
});

// ── Pipeline Configuration ───────────────────────────────────

const PipelineConfigSchema = z.object({
  passes: z.array(z.string()).optional(),
  skipPasses: z.array(z.string()).optional(),
  parallel: z.union([z.boolean(), ParallelConfigSchema]).default({}),
  timeout: z.number().positive().default(3600000),
  retry: RetryConfigSchema,
});

// ── Graph Configuration ──────────────────────────────────────

const GraphConfigSchema = z.object({
  maxNodes: z.number().int().positive().default(1000000),
  maxEdges: z.number().int().positive().default(10000000),
  edgeWeightThreshold: z.number().min(0).max(1).default(0.0),
  similarityTopK: z.number().int().positive().default(50),
  includePositions: z.boolean().default(true),
  layoutAlgorithm: z.enum(['force', 'hierarchical', 'radial', 'spring']).default('force'),
  pagerankDampingFactor: z.number().min(0).max(1).default(0.85),
  pagerankIterations: z.number().int().positive().default(100),
  pagerankTolerance: z.number().positive().default(1e-6),
});

// ── Embedding Configuration ──────────────────────────────────

const EmbeddingConfigSchema = z.object({
  provider: z.enum(['openai', 'voyage', 'cohere', 'local', 'custom']).default('openai'),
  model: z.string().default('text-embedding-3-small'),
  dimensions: z.number().int().positive().default(1536),
  batchSize: z.number().int().positive().default(100),
  maxRetries: z.number().int().min(0).default(5),
  concurrency: z.number().int().positive().default(10),
  chunkSize: z.number().int().positive().default(512),
  chunkOverlap: z.number().int().min(0).default(64),
  chunkingStrategy: z.enum(['fixed', 'semantic', 'recursive', 'document']).default('semantic'),
  quantization: z.enum(['float32', 'int8', 'binary']).default('float32'),
  cacheDir: z.string().optional(),
  apiKey: z.string().optional(),
  apiBaseUrl: z.string().url().optional(),
  timeout: z.number().positive().default(60000),
});

// ── Clustering Configuration ─────────────────────────────────

const ClusteringConfigSchema = z.object({
  algorithm: z.enum([
    'louvain', 'leiden', 'hdbscan', 'kmeans', 'spectral', 'label_propagation',
  ]).default('leiden'),
  resolution: z.number().positive().default(1.0),
  minClusterSize: z.number().int().positive().default(5),
  maxClusters: z.number().int().positive().default(1000),
  topicModeling: z.enum(['lda', 'nmf', 'bertopic', 'none']).default('bertopic'),
  topicCount: z.number().int().positive().default(50),
});

// ── Analysis Configuration ───────────────────────────────────

const NERConfigSchema = z.object({
  enabled: z.boolean().default(true),
  provider: z.enum(['spacy', 'transformers', 'regex', 'none']).default('spacy'),
  model: z.string().default('en_core_web_sm'),
});

const KeywordConfigSchema = z.object({
  enabled: z.boolean().default(true),
  algorithm: z.enum(['tfidf', 'textrank', 'yake', 'keybert']).default('yake'),
  maxKeywords: z.number().int().positive().default(20),
  minFrequency: z.number().int().positive().default(2),
});

const SummarizationConfigSchema = z.object({
  enabled: z.boolean().default(false),
  algorithm: z.enum(['extractive', 'abstractive', 'none']).default('extractive'),
  maxLength: z.number().int().positive().default(200),
  minLength: z.number().int().positive().default(50),
});

const LanguageConfigSchema = z.object({
  detect: z.boolean().default(true),
  fallback: z.string().default('en'),
});

const AnalysisConfigSchema = z.object({
  ner: NERConfigSchema,
  keyword: KeywordConfigSchema,
  summarization: SummarizationConfigSchema,
  language: LanguageConfigSchema,
  duplicateThreshold: z.number().min(0).max(1).default(0.95),
});

// ── Optimization Configuration ───────────────────────────────

const PruneConfigSchema = z.object({
  enabled: z.boolean().default(true),
  minDegree: z.number().int().min(0).default(1),
  minWeight: z.number().min(0).max(1).default(0.05),
  maxNodes: z.number().int().positive().default(50000),
});

const DeduplicationConfigSchema = z.object({
  enabled: z.boolean().default(true),
  threshold: z.number().min(0).max(1).default(0.85),
  algorithm: z.enum(['minhash', 'embedding', 'exact']).default('minhash'),
});

const CompressionOptConfigSchema = z.object({
  enabled: z.boolean().default(true),
  embeddings: z.enum(['float32', 'int8', 'binary', 'pq', 'none']).default('int8'),
  graphPruning: z.boolean().default(true),
  hierarchySimplification: z.boolean().default(true),
});

const OptimizationConfigSchema = z.object({
  prune: PruneConfigSchema,
  deduplication: DeduplicationConfigSchema,
  compression: CompressionOptConfigSchema,
});

// ── Cache Configuration ──────────────────────────────────────

const CacheConfigSchema = z.object({
  enabled: z.boolean().default(true),
  dir: z.string().default('.kc-cache'),
  strategy: z.enum(['content-addressed', 'timestamp', 'hybrid']).default('content-addressed'),
  maxSize: z.string().default('10GB'),
  l1Size: z.number().int().positive().default(1000),
  compressed: z.boolean().default(true),
  validateOnRead: z.boolean().default(true),
});

// ── Incremental Compilation ──────────────────────────────────

const IncrementalConfigSchema = z.object({
  enabled: z.boolean().default(true),
  watch: z.boolean().default(false),
  debounceMs: z.number().int().positive().default(1000),
  dependencyTracking: z.enum(['file', 'section', 'concept']).default('file'),
  rebuildDependents: z.boolean().default(true),
  fullRebuildInterval: z.number().int().positive().default(100),
});

// ── Plugin Configuration ─────────────────────────────────────

const EmbeddingProviderPluginSchema = z.object({
  name: z.string(),
  module: z.string(),
  config: z.record(z.string(), z.unknown()).default({}),
});

const PluginsConfigSchema = z.object({
  paths: z.array(z.string()).default([]),
  config: z.record(z.string(), z.unknown()).default({}),
  strictValidation: z.boolean().default(false),
});

// ── Visualization Configuration ──────────────────────────────

const VisualizationConfigSchema = z.object({
  maxGraphNodes: z.number().int().positive().default(500),
  defaultLayout: z.enum(['force', 'hierarchical', 'radial']).default('force'),
  enable3D: z.boolean().default(false),
  darkMode: z.boolean().default(true),
  animationDuration: z.number().min(0).default(300),
});

// ── Debug Configuration ──────────────────────────────────────

const DebugConfigSchema = z.object({
  enabled: z.boolean().default(false),
  logLevel: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'silent']).default('info'),
  inspectIR: z.array(z.string()).optional(),
  dumpPass: z.array(z.string()).optional(),
  profile: z.boolean().default(false),
  tracePlugins: z.boolean().default(false),
  validateEveryPass: z.boolean().default(false),
});

// ── App (Next.js) Configuration ──────────────────────────────

const ThemeConfigSchema = z.object({
  primary: z.string().default('#0066cc'),
  secondary: z.string().default('#6c757d'),
  font: z.string().default('Inter'),
}).default({});

const AnalyticsConfigSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.string().optional(),
  id: z.string().optional(),
}).default({});

const AppConfigSchema = z.object({
  title: z.string().default('Knowledge Base'),
  description: z.string().default('Compiled knowledge artifacts'),
  basePath: z.string().default('/'),
  theme: ThemeConfigSchema,
  analytics: AnalyticsConfigSchema,
});

// ── Next.js Build Configuration ──────────────────────────────

const NextImagesConfigSchema = z.object({
  unoptimized: z.boolean().default(true),
}).default({});

const NextjsConfigSchema = z.object({
  output: z.enum(['export', 'standalone']).default('export'),
  trailingSlash: z.boolean().default(true),
  compress: z.boolean().default(true),
  images: NextImagesConfigSchema,
}).default({});

// ── Top-Level Compiler Config ────────────────────────────────

export const CompilerConfigSchema = z.object({
  source: SourceConfigSchema,
  output: OutputConfigSchema,
  pipeline: PipelineConfigSchema,
  graph: GraphConfigSchema,
  embedding: EmbeddingConfigSchema,
  clustering: ClusteringConfigSchema,
  analysis: AnalysisConfigSchema,
  optimization: OptimizationConfigSchema,
  cache: CacheConfigSchema,
  incremental: IncrementalConfigSchema,
  plugins: PluginsConfigSchema,
  embeddingProviders: z.array(EmbeddingProviderPluginSchema).default([]),
  visualization: VisualizationConfigSchema,
  debug: DebugConfigSchema,
  app: AppConfigSchema,
  nextjs: NextjsConfigSchema,
}).strict();

export type CompilerConfig = z.infer<typeof CompilerConfigSchema>;
export type CompilerConfigInput = z.input<typeof CompilerConfigSchema>;
```

### Inferred Type

The compiled type exposed to consumers:

```typescript
// All defaults resolved. All optionals filled.
interface CompilerConfig {
  source: {
    patterns: string[];
    exclude: string[];
    baseDir: string;
    followSymlinks: boolean;
    encoding: 'utf-8' | 'utf-16' | 'latin1';
  };
  output: {
    dir: string;
    clean: boolean;
    compress: boolean;
    compressionLevel: number; // 0–22
    prettyPrint: boolean;
    includeTiming: boolean;
  };
  pipeline: {
    passes?: string[];
    skipPasses?: string[];
    parallel: boolean | {
      enabled: boolean;
      maxWorkers: number;
      workerMemory: number;
      batchSize: number;
    };
    timeout: number;
    retry: {
      maxRetries: number;
      baseDelay: number;
      maxDelay: number;
      backoffFactor: number;
      retryableErrors: string[];
    };
  };
  graph: {
    maxNodes: number;
    maxEdges: number;
    edgeWeightThreshold: number;
    similarityTopK: number;
    includePositions: boolean;
    layoutAlgorithm: 'force' | 'hierarchical' | 'radial' | 'spring';
    pagerankDampingFactor: number;
    pagerankIterations: number;
    pagerankTolerance: number;
  };
  embedding: {
    provider: 'openai' | 'voyage' | 'cohere' | 'local' | 'custom';
    model: string;
    dimensions: number;
    batchSize: number;
    maxRetries: number;
    concurrency: number;
    chunkSize: number;
    chunkOverlap: number;
    chunkingStrategy: 'fixed' | 'semantic' | 'recursive' | 'document';
    quantization: 'float32' | 'int8' | 'binary';
    cacheDir?: string;
    apiKey?: string;
    apiBaseUrl?: string;
    timeout: number;
  };
  clustering: {
    algorithm: 'louvain' | 'leiden' | 'hdbscan' | 'kmeans' | 'spectral' | 'label_propagation';
    resolution: number;
    minClusterSize: number;
    maxClusters: number;
    topicModeling: 'lda' | 'nmf' | 'bertopic' | 'none';
    topicCount: number;
  };
  analysis: {
    ner: { enabled: boolean; provider: 'spacy' | 'transformers' | 'regex' | 'none'; model: string };
    keyword: { enabled: boolean; algorithm: 'tfidf' | 'textrank' | 'yake' | 'keybert'; maxKeywords: number; minFrequency: number };
    summarization: { enabled: boolean; algorithm: 'extractive' | 'abstractive' | 'none'; maxLength: number; minLength: number };
    language: { detect: boolean; fallback: string };
    duplicateThreshold: number;
  };
  optimization: {
    prune: { enabled: boolean; minDegree: number; minWeight: number; maxNodes: number };
    deduplication: { enabled: boolean; threshold: number; algorithm: 'minhash' | 'embedding' | 'exact' };
    compression: { enabled: boolean; embeddings: 'float32' | 'int8' | 'binary' | 'pq' | 'none'; graphPruning: boolean; hierarchySimplification: boolean };
  };
  cache: {
    enabled: boolean;
    dir: string;
    strategy: 'content-addressed' | 'timestamp' | 'hybrid';
    maxSize: string;
    l1Size: number;
    compressed: boolean;
    validateOnRead: boolean;
  };
  incremental: {
    enabled: boolean;
    watch: boolean;
    debounceMs: number;
    dependencyTracking: 'file' | 'section' | 'concept';
    rebuildDependents: boolean;
    fullRebuildInterval: number;
  };
  plugins: {
    paths: string[];
    config: Record<string, unknown>;
    strictValidation: boolean;
  };
  embeddingProviders: Array<{
    name: string;
    module: string;
    config: Record<string, unknown>;
  }>;
  visualization: {
    maxGraphNodes: number;
    defaultLayout: 'force' | 'hierarchical' | 'radial';
    enable3D: boolean;
    darkMode: boolean;
    animationDuration: number;
  };
  debug: {
    enabled: boolean;
    logLevel: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';
    inspectIR?: string[];
    dumpPass?: string[];
    profile: boolean;
    tracePlugins: boolean;
    validateEveryPass: boolean;
  };
  app: {
    title: string;
    description: string;
    basePath: string;
    theme: { primary: string; secondary: string; font: string };
    analytics: { enabled: boolean; provider?: string; id?: string };
  };
  nextjs: {
    output: 'export' | 'standalone';
    trailingSlash: boolean;
    compress: boolean;
    images: { unoptimized: boolean };
  };
}
```

---

## 3. Environment Variables

Every environment variable uses the `KC_` prefix. The naming convention maps config paths using double-underscore (`__`) as the separator for nested keys.

### Mapping Convention

| Config Path | Environment Variable |
|---|---|
| `source.baseDir` | `KC_SOURCE_BASE_DIR` |
| `output.dir` | `KC_OUTPUT_DIR` |
| `pipeline.parallel.maxWorkers` | `KC_PIPELINE_PARALLEL_MAX_WORKERS` |
| `embedding.apiKey` | `KC_EMBEDDING_API_KEY` |
| `debug.logLevel` | `KC_LOG_LEVEL` |

### Complete List

| Variable | Maps To | Type | Default | Description |
|---|---|---|---|---|
| `KC_CONFIG_PATH` | — | path | — | Explicit path to config file (overrides auto-discovery) |
| `KC_CACHE_DIR` | `cache.dir` | string | `.kc-cache` | Custom cache directory path |
| `KC_EMBEDDING_API_KEY` | `embedding.apiKey` | string | — | API key for embedding provider |
| `KC_EMBEDDING_API_BASE` | `embedding.apiBaseUrl` | url | — | Custom base URL for embedding provider API |
| `KC_EMBEDDING_MODEL` | `embedding.model` | string | `text-embedding-3-small` | Embedding model identifier |
| `KC_EMBEDDING_DIMENSIONS` | `embedding.dimensions` | integer | `1536` | Output embedding dimensions |
| `KC_EMBEDDING_BATCH_SIZE` | `embedding.batchSize` | integer | `100` | Embedding API batch size |
| `KC_EMBEDDING_CHUNK_SIZE` | `embedding.chunkSize` | integer | `512` | Text chunk size in tokens |
| `KC_EMBEDDING_CHUNK_OVERLAP` | `embedding.chunkOverlap` | integer | `64` | Chunk overlap in tokens |
| `KC_EMBEDDING_STRATEGY` | `embedding.chunkingStrategy` | enum | `semantic` | Chunking strategy |
| `KC_EMBEDDING_QUANTIZATION` | `embedding.quantization` | enum | `float32` | Embedding quantization format |
| `KC_LOG_LEVEL` | `debug.logLevel` | enum | `info` | Logging verbosity |
| `KC_MAX_WORKERS` | `pipeline.parallel.maxWorkers` | integer | `0` | Max parallel workers (0 = auto) |
| `KC_WORKER_MEMORY` | `pipeline.parallel.workerMemory` | integer (MB) | `512` | Per-worker memory limit |
| `KC_DEBUG` | `debug.enabled` | boolean | `false` | Enable debug mode |
| `KC_PROFILE` | `debug.profile` | boolean | `false` | Enable profiling |
| `KC_PLUGIN_PATH` | `plugins.paths` | colon-separated paths | — | Additional plugin search paths |
| `KC_CACHE_DISABLED` | `cache.enabled` | boolean (inverted) | `false` | Disable cache (`true` = no caching) |
| `KC_CACHE_MAX_SIZE` | `cache.maxSize` | string | `10GB` | Maximum cache size on disk |
| `KC_CACHE_STRATEGY` | `cache.strategy` | enum | `content-addressed` | Cache invalidation strategy |
| `KC_OUTPUT_DIR` | `output.dir` | path | `./dist` | Output directory |
| `KC_OUTPUT_COMPRESS` | `output.compress` | boolean | `true` | Enable output compression |
| `KC_OUTPUT_COMPRESSION_LEVEL` | `output.compressionLevel` | integer (0–22) | `9` | Brotli compression level |
| `KC_OUTPUT_PRETTY` | `output.prettyPrint` | boolean | `false` | Pretty-print JSON output |
| `KC_SOURCE_PATTERNS` | `source.patterns` | comma-separated | `**/*.md` | Glob patterns for source files |
| `KC_SOURCE_EXCLUDE` | `source.exclude` | comma-separated | `node_modules/**,.git/**` | Exclude patterns |
| `KC_SOURCE_BASE_DIR` | `source.baseDir` | path | `.` | Base directory for source resolution |
| `KC_SOURCE_FOLLOW_SYMLINKS` | `source.followSymlinks` | boolean | `false` | Follow symbolic links |
| `KC_INCREMENTAL_ENABLED` | `incremental.enabled` | boolean | `true` | Enable incremental compilation |
| `KC_INCREMENTAL_WATCH` | `incremental.watch` | boolean | `false` | Watch mode for file changes |
| `KC_EMBEDDING_PROVIDER` | `embedding.provider` | enum | `openai` | Embedding provider selection |
| `KC_CLUSTERING_ALGORITHM` | `clustering.algorithm` | enum | `leiden` | Clustering algorithm |
| `KC_CLUSTERING_RESOLUTION` | `clustering.resolution` | number | `1.0` | Clustering resolution parameter |
| `KC_ANALYSIS_NER_ENABLED` | `analysis.ner.enabled` | boolean | `true` | Enable named entity recognition |
| `KC_ANALYSIS_KEYWORD_ENABLED` | `analysis.keyword.enabled` | boolean | `true` | Enable keyword extraction |
| `KC_OPTIMIZATION_PRUNE_ENABLED` | `optimization.prune.enabled` | boolean | `true` | Enable graph pruning |
| `KC_OPTIMIZATION_DEDUP_ENABLED` | `optimization.deduplication.enabled` | boolean | `true` | Enable deduplication |
| `KC_OPTIMIZATION_COMPRESS_ENABLED` | `optimization.compression.enabled` | boolean | `true` | Enable compression |
| `KC_APP_TITLE` | `app.title` | string | `Knowledge Base` | Frontend app title |
| `KC_APP_BASE_PATH` | `app.basePath` | string | `/` | Frontend base path |

### Type Coercion Rules

Environment variables are always strings. The config loader coerces them as follows:

```typescript
function coerceEnvValue(value: string, schemaType: ZodType): unknown {
  switch (schemaType.constructor) {
    case ZodBoolean:
      return value === 'true' || value === '1' || value === 'yes';
    case ZodNumber:
      return Number(value);
    case ZodEnum:
      return value; // validated by Zod later
    case ZodString:
      return value;
    default:
      return value; // passed through for complex types
  }
}
```

Arrays use comma-separated values: `KC_SOURCE_PATTERNS="docs/**/*.md,guides/**/*.md"`.

---

## 4. Configuration File Example

Below is a complete `knowledge-compiler.jsonc` with every option documented inline.

```jsonc
{
  // ────────────────────────────────────────────────────────────
  // Source Configuration
  // ────────────────────────────────────────────────────────────
  "source": {
    // Glob patterns for Markdown files to compile.
    // Supports ** (recursive), * (single segment), {a,b} (alternation).
    "patterns": ["content/**/*.md", "docs/**/*.md", "!drafts/**"],

    // Glob patterns to exclude (overlaid on top of patterns).
    "exclude": [
      "node_modules/**",
      ".git/**",
      "**/archive/**",
      "**/private/**",
      "**/README.md" // skip top-level readmes
    ],

    // Base directory for resolving relative source paths.
    // All patterns are relative to this directory.
    "baseDir": ".",

    // Follow symlinked directories when globbing.
    // Disabled by default for performance and to avoid infinite loops.
    "followSymlinks": false,

    // File encoding to use when reading Markdown files.
    // 'utf-8' is the standard. Use 'utf-16' for Windows-origin files.
    "encoding": "utf-8"
  },

  // ────────────────────────────────────────────────────────────
  // Output Configuration
  // ────────────────────────────────────────────────────────────
  "output": {
    // Directory where compiled artifacts are written.
    // Relative paths are resolved from the project root.
    "dir": "./dist",

    // Delete the output directory before writing new artifacts.
    // Set to false if you want to preserve previous outputs.
    "clean": true,

    // Enable Brotli compression for large JSON artifacts (graph, embeddings index).
    // Reduces Vercel deployment size by ~6-8x.
    "compress": true,

    // Brotli compression level (0 = none, 22 = maximum).
    // Level 9 balances speed and ratio. Levels above 11 are very slow.
    "compressionLevel": 9,

    // Pretty-print JSON output with indentation.
    // Useful for debugging artifact contents; disable in production.
    "prettyPrint": false,

    // Include timing metadata in compiler-report.json.
    // Adds per-pass wall-clock and CPU time.
    "includeTiming": true
  },

  // ────────────────────────────────────────────────────────────
  // Pipeline Configuration
  // ────────────────────────────────────────────────────────────
  "pipeline": {
    // Custom pass ordering. If omitted, the default topological order is used.
    // Only necessary if you need to reorder or restrict which passes run.
    "passes": [
      "glob-resolver",
      "file-reader",
      "frontmatter-parser",
      "mdast-parser",
      "link-extractor",
      "concept-extractor",
      "relation-builder",
      "text-chunker",
      "embedding-generator",
      "similarity-matrix",
      "cluster-assigner",
      "graph-pruner",
      "deduplicator",
      "artifact-serializer",
      "manifest-builder"
    ],

    // Passes to skip entirely. Useful when iterating on specific passes.
    // "skipPasses": ["embedding-generator", "cluster-assigner"],

    // Parallel execution configuration.
    "parallel": {
      // Enable parallel pass execution across worker threads.
      "enabled": true,

      // Maximum number of worker threads (0 = auto-detect CPU count - 1).
      "maxWorkers": 0,

      // Memory limit per worker in MB.
      // Workers exceeding this limit are killed and the pass restarted.
      "workerMemory": 512,

      // Number of items to process per worker batch.
      // Larger batches improve throughput but increase latency per batch.
      "batchSize": 100
    },

    // Maximum time (ms) allowed for a single pass before it is timed out.
    // Default: 1 hour. Embedding passes on large corpora may need more.
    "timeout": 3600000,

    // Retry configuration for transient errors.
    "retry": {
      // Maximum number of retry attempts.
      "maxRetries": 3,

      // Initial backoff delay in ms.
      "baseDelay": 1000,

      // Maximum backoff delay in ms (cap for exponential growth).
      "maxDelay": 30000,

      // Backoff multiplier (2 = double each attempt).
      "backoffFactor": 2,

      // Error codes that are considered retryable.
      "retryableErrors": [
        "TRANSIENT",
        "RATE_LIMITED",
        "TIMEOUT"
      ]
    }
  },

  // ────────────────────────────────────────────────────────────
  // Graph Configuration
  // ────────────────────────────────────────────────────────────
  "graph": {
    // Maximum number of nodes in the knowledge graph.
    // Beyond this, pruning is forced during graph construction.
    "maxNodes": 1000000,

    // Maximum number of edges.
    "maxEdges": 10000000,

    // Minimum edge weight to include in the graph (0.0 = include all).
    // Increase to reduce graph density at the cost of losing weak connections.
    "edgeWeightThreshold": 0.0,

    // Top-K similar neighbors to compute per node.
    "similarityTopK": 50,

    // Include 2D positions in the visualization graph for instant rendering.
    // Disable to reduce artifact size (positions recomputed client-side).
    "includePositions": true,

    // Default layout algorithm for the visualization graph.
    "layoutAlgorithm": "force",

    // PageRank damping factor (standard value: 0.85).
    "pagerankDampingFactor": 0.85,

    // Maximum PageRank iterations.
    "pagerankIterations": 100,

    // PageRank convergence tolerance (L1 norm).
    "pagerankTolerance": 1e-6
  },

  // ────────────────────────────────────────────────────────────
  // Embedding Configuration
  // ────────────────────────────────────────────────────────────
  "embedding": {
    // Embedding provider. Options:
    //   'openai'  — OpenAI Embeddings API
    //   'voyage'  — Voyage AI embeddings
    //   'cohere'  — Cohere Embed API
    //   'local'   — Local ONNX model (see model field)
    //   'custom'  — Custom provider (register via embeddingProviders)
    "provider": "openai",

    // Model identifier for the chosen provider.
    //   openai: text-embedding-3-small, text-embedding-3-large, text-embedding-ada-002
    //   voyage: voyage-2, voyage-code-2
    //   cohere: embed-english-v3.0, embed-multilingual-v3.0
    //   local:  path to ONNX model
    "model": "text-embedding-3-small",

    // Output embedding dimensions.
    // Must match the model's supported dimensions.
    "dimensions": 1536,

    // Number of texts to embed in a single API call.
    "batchSize": 100,

    // Maximum retries for failed embedding requests.
    "maxRetries": 5,

    // Number of concurrent embedding API requests.
    "concurrency": 10,

    // Text chunk size in tokens.
    "chunkSize": 512,

    // Token overlap between adjacent chunks.
    // Preserves context at chunk boundaries.
    "chunkOverlap": 64,

    // Chunking strategy:
    //   'fixed'     — Fixed-size token windows
    //   'semantic'  — Split at sentence/paragraph boundaries within size limit
    //   'recursive' — Recursive splitting with separators
    //   'document'  — No splitting; embed full document as single vector
    "chunkingStrategy": "semantic",

    // Embedding storage quantization.
    //   'float32' — Full precision (large, lossless)
    //   'int8'    — Scalar quantization (4x smaller, ~1% accuracy loss)
    //   'binary'  — Binarization (32x smaller, useful for coarse similarity)
    "quantization": "float32",

    // Cache directory for embedding results.
    // Defaults to <cache.dir>/embeddings. Set to avoid redundant API calls.
    "cacheDir": ".kc-cache/embeddings",

    // API key. Prefer KC_EMBEDDING_API_KEY environment variable.
    // "apiKey": "sk-...",

    // Custom API base URL (e.g., for proxies or self-hosted endpoints).
    // "apiBaseUrl": "https://embeddings.internal.company.com/v1",

    // Request timeout in ms for the embedding provider.
    "timeout": 60000
  },

  // ────────────────────────────────────────────────────────────
  // Clustering Configuration
  // ────────────────────────────────────────────────────────────
  "clustering": {
    // Community detection algorithm.
    //   'louvain'          — Fast, good general-purpose
    //   'leiden'           — Higher quality than Louvain, guarantees connected communities
    //   'hdbscan'          — Density-based, automatic k, handles noise
    //   'kmeans'           — Fast, requires specifying k
    //   'spectral'         — High quality on small graphs (< 10K nodes)
    //   'label_propagation' — Near-linear time, lower quality
    "algorithm": "leiden",

    // Resolution parameter for modularity-based methods.
    // Lower values = fewer, larger clusters. Higher = more, smaller clusters.
    "resolution": 1.0,

    // Minimum cluster size (HDBSCAN, or post-processing filter).
    "minClusterSize": 5,

    // Maximum number of clusters to produce.
    "maxClusters": 1000,

    // Topic modeling method for cluster labeling.
    //   'lda'      — Latent Dirichlet Allocation
    //   'nmf'      — Non-Negative Matrix Factorization (deterministic)
    //   'bertopic' — Transformer-based (best quality, non-deterministic)
    //   'none'     — Skip topic modeling
    "topicModeling": "bertopic",

    // Number of topics to extract (for LDA/NMF).
    "topicCount": 50
  },

  // ────────────────────────────────────────────────────────────
  // Analysis Configuration
  // ────────────────────────────────────────────────────────────
  "analysis": {
    // Named Entity Recognition
    "ner": {
      "enabled": true,
      "provider": "spacy",
      "model": "en_core_web_sm"
    },

    // Keyword Extraction
    "keyword": {
      "enabled": true,
      "algorithm": "yake",
      "maxKeywords": 20,
      "minFrequency": 2
    },

    // Text Summarization (disabled by default; expensive for large corpora)
    "summarization": {
      "enabled": false,
      "algorithm": "extractive",
      "maxLength": 200,
      "minLength": 50
    },

    // Language Detection
    "language": {
      "detect": true,
      "fallback": "en"
    },

    // Near-duplicate document threshold (cosine similarity).
    // Documents above this threshold are flagged as duplicates.
    "duplicateThreshold": 0.95
  },

  // ────────────────────────────────────────────────────────────
  // Optimization Configuration
  // ────────────────────────────────────────────────────────────
  "optimization": {
    // Graph Pruning
    "prune": {
      "enabled": true,
      // Minimum node degree to keep (0 = keep isolated nodes)
      "minDegree": 1,
      // Minimum edge weight to retain (0.0–1.0)
      "minWeight": 0.05,
      // Maximum nodes after pruning (truncate lowest-importance)
      "maxNodes": 50000
    },

    // Document/Section Deduplication
    "deduplication": {
      "enabled": true,
      // Similarity threshold for considering content duplicate
      "threshold": 0.85,
      // Algorithm: 'minhash' (fast), 'embedding' (accurate), 'exact' (full comparison)
      "algorithm": "minhash"
    },

    // Artifact Compression
    "compression": {
      "enabled": true,
      // Embedding compression: 'float32' | 'int8' | 'binary' | 'pq' | 'none'
      "embeddings": "int8",
      "graphPruning": true,
      "hierarchySimplification": true
    }
  },

  // ────────────────────────────────────────────────────────────
  // Cache Configuration
  // ────────────────────────────────────────────────────────────
  "cache": {
    "enabled": true,
    "dir": ".kc-cache",
    // Invalidation strategy:
    //   'content-addressed' — Keyed by SHA-256 of inputs (safe, no staleness)
    //   'timestamp'         — Keyed by file modification time (fast check)
    //   'hybrid'            — Timestamp check first, content verification on hit
    "strategy": "content-addressed",
    // Maximum cache size on disk (supports KB, MB, GB)
    "maxSize": "10GB",
    // Number of entries in the in-memory L1 cache
    "l1Size": 1000,
    // Compress cache entries on disk
    "compressed": true,
    // Re-validate cache entries on read (detect corruption)
    "validateOnRead": true
  },

  // ────────────────────────────────────────────────────────────
  // Incremental Compilation
  // ────────────────────────────────────────────────────────────
  "incremental": {
    "enabled": true,
    // Watch mode: recompile on file changes
    "watch": false,
    // Debounce interval (ms) for file change events
    "debounceMs": 1000,
    // Granularity of dependency tracking:
    //   'file'    — Track at file level (cheapest)
    //   'section' — Track at section level (more incremental)
    //   'concept' — Track at concept level (maximum incrementality)
    "dependencyTracking": "file",
    // Rebuild dependents when a source changes (e.g., pages that embed changed content)
    "rebuildDependents": true,
    // Force a full rebuild every N incremental builds (prevents drift)
    "fullRebuildInterval": 100
  },

  // ────────────────────────────────────────────────────────────
  // Plugin Configuration
  // ────────────────────────────────────────────────────────────
  "plugins": {
    // Paths to plugin modules (npm packages or local paths)
    "paths": [
      "@my-org/kc-plugin-analytics",
      "./plugins/custom-entity-extractor"
    ],
    // Plugin-specific configuration (passed to each plugin's init function)
    "config": {
      "@my-org/kc-plugin-analytics": {
        "trackingId": "UA-XXXXX-Y",
        "anonymizeIp": true
      },
      "./plugins/custom-entity-extractor": {
        "modelPath": "./models/entity-model.onnx",
        "threshold": 0.7
      }
    },
    // Fail compilation if a plugin's config doesn't match its schema
    "strictValidation": false
  },

  // Custom embedding providers (for 'custom' provider type)
  "embeddingProviders": [
    {
      "name": "internal-embeddings",
      "module": "@internal/embedding-client",
      "config": {
        "endpoint": "https://embeddings.internal.example.com",
        "maxBatchSize": 64
      }
    }
  ],

  // ────────────────────────────────────────────────────────────
  // Visualization Configuration
  // ────────────────────────────────────────────────────────────
  "visualization": {
    // Maximum graph nodes to include in the visualization artifact
    "maxGraphNodes": 500,
    // Default graph layout for the frontend
    "defaultLayout": "force",
    // Enable 3D graph rendering (requires WebGL)
    "enable3D": false,
    // Default color scheme
    "darkMode": true,
    // Animation duration in ms for graph transitions
    "animationDuration": 300
  },

  // ────────────────────────────────────────────────────────────
  // Debugging and Profiling
  // ────────────────────────────────────────────────────────────
  "debug": {
    "enabled": false,
    "logLevel": "info",
    // Serialize specific IR stages to disk for inspection
    "inspectIR": ["parsing", "analysis", "graph"],
    // Dump compiler state after specific passes
    "dumpPass": ["embedding-generator", "cluster-assigner"],
    // Enable CPU/memory profiling
    "profile": false,
    // Trace plugin loading and execution
    "tracePlugins": false,
    // Validate IR schema after every pass (expensive)
    "validateEveryPass": false
  },

  // ────────────────────────────────────────────────────────────
  // Next.js App Configuration
  // ────────────────────────────────────────────────────────────
  "app": {
    "title": "My Knowledge Base",
    "description": "Searchable knowledge graph compiled from internal documentation",
    "basePath": "/docs",
    "theme": {
      "primary": "#0066cc",
      "secondary": "#6c757d",
      "font": "Inter"
    },
    "analytics": {
      "enabled": false,
      "provider": "plausible",
      "id": "my-knowledge-base"
    }
  },

  // ────────────────────────────────────────────────────────────
  // Next.js Build Configuration
  // ────────────────────────────────────────────────────────────
  "nextjs": {
    // Build output mode for static export
    "output": "export",
    "trailingSlash": true,
    "compress": true,
    "images": {
      "unoptimized": true
    }
  }
}
```

---

## 5. Configuration Resolution Algorithm

The config loader merges sources in strict priority order using deep-merge semantics.

```typescript
import { readFileSync, existsSync } from 'fs';
import { homedir, cwd } from 'os';
import { join, resolve } from 'path';
import { parse } from 'jsonc-parser';
import { parse as parseYaml } from 'yaml';
import { deepMerge } from './deep-merge';

interface ConfigSource {
  name: string;
  priority: number; // 1 = lowest, 6 = highest
  data: Record<string, unknown>;
}

export async function resolveConfig(cliOverrides: Record<string, unknown>): Promise<CompilerConfig> {
  const sources: ConfigSource[] = [];

  // 1. Default configuration (compiled-in)
  sources.push({
    name: 'default',
    priority: 1,
    data: getDefaultConfig(),
  });

  // 2. Project config file (knowledge-compiler.json)
  for (const fileName of ['knowledge-compiler.json', 'knowledge-compiler.jsonc']) {
    const filePath = join(process.cwd(), fileName);
    if (existsSync(filePath)) {
      const raw = readFileSync(filePath, 'utf-8');
      const parsed = fileName.endsWith('.jsonc') ? parse(raw) : JSON.parse(raw);
      sources.push({
        name: `project:${fileName}`,
        priority: 2,
        data: parsed,
      });
      break; // Only the first found
    }
  }

  // 3. Home directory config (~/.kcrc)
  const homeConfigPath = join(homedir(), '.kcrc');
  if (existsSync(homeConfigPath)) {
    const raw = readFileSync(homeConfigPath, 'utf-8');
    const trimmed = raw.trim();
    const parsed = trimmed.startsWith('{')
      ? JSON.parse(trimmed)
      : parseYaml(trimmed);
    sources.push({
      name: 'home:.kcrc',
      priority: 3,
      data: parsed,
    });
  }

  // 4. Explicit config path from env var
  const envConfigPath = process.env.KC_CONFIG_PATH;
  if (envConfigPath && existsSync(envConfigPath)) {
    const raw = readFileSync(envConfigPath, 'utf-8');
    const trimmed = raw.trim();
    const parsed = trimmed.startsWith('{')
      ? JSON.parse(trimmed)
      : parseYaml(trimmed);
    sources.push({
      name: `env:${envConfigPath}`,
      priority: 4,
      data: parsed,
    });
  }

  // 5. Environment variables (KC_*)
  const envConfig = parseEnvironmentVariables();
  if (Object.keys(envConfig).length > 0) {
    sources.push({
      name: 'environment',
      priority: 5,
      data: envConfig,
    });
  }

  // 6. CLI flags (passed as parsed object)
  if (Object.keys(cliOverrides).length > 0) {
    sources.push({
      name: 'cli',
      priority: 6,
      data: cliOverrides,
    });
  }

  // Merge sources in priority order (lower = base, higher = override)
  let merged: Record<string, unknown> = {};
  for (const source of sources.sort((a, b) => a.priority - b.priority)) {
    merged = deepMerge(merged, source.data);
  }

  // Apply defaults and validate
  const result = CompilerConfigSchema.safeParse(merged);
  if (!result.success) {
    throw new ConfigValidationError(
      'Configuration validation failed',
      result.error,
      sources,
    );
  }

  // Cross-field validation
  const crossFieldErrors = validateCrossFieldConstraints(result.data);
  if (crossFieldErrors.length > 0) {
    throw new ConfigValidationError(
      'Cross-field constraint violation',
      crossFieldErrors,
      sources,
    );
  }

  return result.data;
}

function parseEnvironmentVariables(): Record<string, unknown> {
  const envConfig: Record<string, unknown> = {};
  const prefix = 'KC_';

  for (const [key, value] of Object.entries(process.env)) {
    if (!key.startsWith(prefix) || value === undefined) continue;

    // Strip prefix and convert to config path
    // KC_EMBEDDING_API_KEY -> embedding.apiKey
    // KC_PIPELINE_PARALLEL_MAX_WORKERS -> pipeline.parallel.maxWorkers
    const configPath = key
      .slice(prefix.length)
      .toLowerCase()
      .split('_')
      .map((part, i) =>
        i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join('.');

    // Handle special cases
    if (key === 'KC_CACHE_DISABLED') {
      envConfig['cache'] = { enabled: value !== 'true' };
      continue;
    }

    setNestedProperty(envConfig, configPath, value);
  }

  return envConfig;
}

function getDefaultConfig(): Record<string, unknown> {
  // Returns the Zod defaults by parsing an empty object
  const result = CompilerConfigSchema.parse({});
  return JSON.parse(JSON.stringify(result));
}

function setNestedProperty(
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): void {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current)) {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
}
```

### Deep Merge Strategy

```typescript
function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T>,
): T {
  const result = { ...base };

  for (const key of Object.keys(override)) {
    const baseVal = base[key];
    const overrideVal = override[key];

    if (overrideVal === null || overrideVal === undefined) {
      // Explicit null removes the value (falls back to default at parse time)
      delete result[key];
    } else if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>,
      ) as T[typeof key];
    } else {
      // Arrays are fully replaced (not concatenated)
      // Scalars are replaced
      result[key] = overrideVal as T[typeof key];
    }
  }

  return result;
}

function isPlainObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}
```

---

## 6. Configuration Validation

### Schema Validation

All configuration is validated against the Zod schema at load time. Errors include a JSON pointer path to the offending field.

```typescript
export class ConfigValidationError extends Error {
  public readonly sources: ConfigSource[];
  public readonly zodErrors?: z.ZodError;
  public readonly crossFieldErrors?: CrossFieldError[];

  constructor(
    message: string,
    details: z.ZodError | CrossFieldError[],
    sources: ConfigSource[],
  ) {
    super(message);
    this.name = 'ConfigValidationError';
    this.sources = sources;
    if (details instanceof z.ZodError) {
      this.zodErrors = details;
    } else {
      this.crossFieldErrors = details;
    }
  }

  public format(): string {
    const lines: string[] = [
      `Configuration validation failed`,
      `Sources applied (${this.sources.length}):`,
      ...this.sources.map((s) => `  ${s.priority}. ${s.name}`),
      ``,
    ];

    if (this.zodErrors) {
      lines.push('Schema errors:');
      for (const issue of this.zodErrors.issues) {
        lines.push(
          `  - ${issue.path.join('.')}: ${issue.message} (${issue.code})`,
        );
      }
    }

    if (this.crossFieldErrors) {
      lines.push('Cross-field errors:');
      for (const err of this.crossFieldErrors) {
        lines.push(`  - ${err.message}`);
        lines.push(`    Fields: ${err.fields.join(', ')}`);
      }
    }

    return lines.join('\n');
  }
}
```

### Cross-Field Validation

Some configuration combinations are semantically invalid even if each field individually passes schema validation.

```typescript
interface CrossFieldError {
  message: string;
  fields: string[];
  severity: 'error' | 'warning';
}

function validateCrossFieldConstraints(
  config: CompilerConfig,
): CrossFieldError[] {
  const errors: CrossFieldError[] = [];

  // Embedding + deduplication dependency
  if (
    config.optimization.deduplication.enabled &&
    config.optimization.deduplication.algorithm === 'embedding' &&
    config.optimization.compression.embeddings === 'binary'
  ) {
    errors.push({
      message:
        'Embedding-based deduplication requires float32 or int8 embeddings. ' +
        'Binary embeddings lose the precision needed for dedup similarity. ' +
        'Set optimization.compression.embeddings to "int8" or "float32", ' +
        'or set optimization.deduplication.algorithm to "minhash".',
      fields: [
        'optimization.deduplication.algorithm',
        'optimization.compression.embeddings',
      ],
      severity: 'error',
    });
  }

  // Embedding provider + local model
  if (
    config.embedding.provider === 'local' &&
    !config.embedding.model.endsWith('.onnx')
  ) {
    errors.push({
      message:
        'Local embedding provider requires an ONNX model path. ' +
        'Set embedding.model to a valid .onnx file.',
      fields: ['embedding.provider', 'embedding.model'],
      severity: 'error',
    });
  }

  // Clustering + graph size
  if (
    config.clustering.algorithm === 'spectral' &&
    config.graph.maxNodes > 10000
  ) {
    errors.push({
      message:
        'Spectral clustering is O(n³) and not recommended for graphs ' +
        'with more than 10,000 nodes. Use "leiden" or "louvain" instead.',
      fields: ['clustering.algorithm', 'graph.maxNodes'],
      severity: 'error',
    });
  }

  // Pretty print + compression
  if (config.output.prettyPrint && config.output.compress) {
    errors.push({
      message:
        'Pretty-printing and compression are both enabled. ' +
        'Compression will be applied after pretty-printing, ' +
        'which wastes CPU cycles. Disable prettyPrint in production.',
      fields: ['output.prettyPrint', 'output.compress'],
      severity: 'warning',
    });
  }

  // Incremental watch + cache disabled
  if (config.incremental.watch && !config.cache.enabled) {
    errors.push({
      message:
        'Watch mode requires caching to detect changes efficiently. ' +
        'Enable cache or disable watch mode.',
      fields: ['incremental.watch', 'cache.enabled'],
      severity: 'error',
    });
  }

  // Parallel + maxWorkers
  if (
    typeof config.pipeline.parallel !== 'boolean' &&
    config.pipeline.parallel.maxWorkers === 0 &&
    config.pipeline.parallel.enabled
  ) {
    // This is fine — 0 means auto. No error, but we could log an info.
  }

  // Debug + production output
  if (config.debug.enabled && !config.output.prettyPrint) {
    errors.push({
      message:
        'Debug mode enabled but prettyPrint is off. ' +
        'Enable output.prettyPrint for readable inspection files.',
      fields: ['debug.enabled', 'output.prettyPrint'],
      severity: 'warning',
    });
  }

  return errors;
}
```

### Strict vs Lenient Mode

```typescript
interface ValidationOptions {
  // Strict mode: fail on unknown keys, warnings become errors.
  // Lenient mode: ignore unknown keys, demote cross-field warnings.
  strict: boolean;
}

export async function loadAndValidateConfig(
  cliOverrides: Record<string, unknown>,
  options: ValidationOptions = { strict: false },
): Promise<CompilerConfig> {
  const schema = options.strict
    ? CompilerConfigSchema.strict()
    : CompilerConfigSchema;

  const merged = await resolveConfigRaw(cliOverrides);
  const result = schema.safeParse(merged);

  if (!result.success) {
    // In lenient mode, strip unknown keys and retry
    if (!options.strict) {
      const cleaned = stripUnknownKeys(merged);
      const retry = schema.safeParse(cleaned);
      if (retry.success) {
        return retry.data;
      }
    }
    throw new ConfigValidationError('Validation failed', result.error, []);
  }

  const crossFieldErrors = validateCrossFieldConstraints(result.data);
  const fatalErrors = crossFieldErrors.filter((e) => e.severity === 'error');
  const warnings = crossFieldErrors.filter((e) => e.severity === 'warning');

  if (options.strict && warnings.length > 0) {
    // In strict mode, warnings become errors
    fatalErrors.push(...warnings.map((w) => ({ ...w, severity: 'error' as const })));
  }

  if (fatalErrors.length > 0) {
    throw new ConfigValidationError('Cross-field violation', fatalErrors, []);
  }

  // Emit warnings (e.g., via logger)
  for (const warn of warnings) {
    console.warn(`[config] Warning: ${warn.message}`);
  }

  return result.data;
}
```

### Deprecated Options

```typescript
const DEPRECATED_OPTIONS: Record<string, DeprecationInfo> = {
  'output.minify': {
    removedIn: '2.0.0',
    useInstead: 'output.compressionLevel',
    message: 'output.minify is deprecated. Use output.compressionLevel instead.',
  },
  'embedding.apiBase': {
    removedIn: '2.0.0',
    useInstead: 'embedding.apiBaseUrl',
    message:
      'embedding.apiBase is deprecated. Rename to embedding.apiBaseUrl.',
  },
  'pipeline.parallelism': {
    removedIn: '2.0.0',
    useInstead: 'pipeline.parallel',
    message:
      'pipeline.parallelism is deprecated. Use pipeline.parallel.enabled instead.',
  },
};

function checkDeprecatedOptions(
  rawConfig: Record<string, unknown>,
): DeprecationWarning[] {
  const warnings: DeprecationWarning[] = [];

  for (const [path, info] of Object.entries(DEPRECATED_OPTIONS)) {
    const value = getNestedProperty(rawConfig, path);
    if (value !== undefined) {
      warnings.push({
        path,
        message: info.message,
        removedIn: info.removedIn,
        useInstead: info.useInstead,
      });
    }
  }

  return warnings;
}
```

---

## 7. Configuration Profiling

Understanding which configuration options most affect compilation time and memory allows operators to tune their builds for their specific knowledge base.

### Profiling Methodology

```typescript
interface ConfigProfile {
  config: Partial<CompilerConfig>;
  metrics: {
    totalTimeMs: number;
    peakMemoryMB: number;
    artifactSizeBytes: number;
    embeddingApiCalls: number;
    cacheHitRate: number;
    graphNodeCount: number;
    graphEdgeCount: number;
  };
  byPass: Map<string, {
    timeMs: number;
    memoryMB: number;
    cacheHit: boolean;
  }>;
}

async function profileConfig(
  configOverride: Partial<CompilerConfig>,
  iterations: number = 3,
): Promise<ConfigProfile> {
  const results: ConfigProfile[] = [];

  for (let i = 0; i < iterations; i++) {
    const config = await loadAndValidateConfig(configOverride);
    const profile = await runWithProfiling(config);
    results.push(profile);
  }

  // Return median of iterations (robust to outliers)
  return medianProfile(results);
}
```

### Sensitivity Analysis

Run a series of compilations, varying one parameter at a time, to isolate its impact:

```typescript
const SENSITIVITY_PARAMS: Array<{
  path: string;
  values: unknown[];
  description: string;
}> = [
  {
    path: 'embedding.chunkSize',
    values: [128, 256, 512, 1024, 2048],
    description: 'Token chunk size for embedding generation',
  },
  {
    path: 'embedding.batchSize',
    values: [20, 50, 100, 200, 500],
    description: 'API batch size for embedding provider',
  },
  {
    path: 'embedding.concurrency',
    values: [1, 5, 10, 20, 50],
    description: 'Concurrent embedding API requests',
  },
  {
    path: 'embedding.quantization',
    values: ['float32', 'int8', 'binary'],
    description: 'Embedding storage precision',
  },
  {
    path: 'clustering.algorithm',
    values: ['louvain', 'leiden', 'hdbscan', 'kmeans'],
    description: 'Clustering algorithm',
  },
  {
    path: 'clustering.resolution',
    values: [0.5, 1.0, 1.5, 2.0, 3.0],
    description: 'Clustering resolution',
  },
  {
    path: 'optimization.prune.maxNodes',
    values: [10000, 25000, 50000, 100000, 250000],
    description: 'Maximum graph nodes after pruning',
  },
  {
    path: 'optimization.compression.embeddings',
    values: ['float32', 'int8', 'binary', 'pq'],
    description: 'Embedding compression method',
  },
  {
    path: 'analysis.ner.enabled',
    values: [false, true],
    description: 'Named entity recognition toggle',
  },
  {
    path: 'analysis.summarization.enabled',
    values: [false, true],
    description: 'Summarization toggle',
  },
  {
    path: 'pipeline.parallel.maxWorkers',
    values: [0, 1, 2, 4, 8, 16],
    description: 'Maximum parallel workers',
  },
  {
    path: 'cache.enabled',
    values: [false, true],
    description: 'Cache enable/disable',
  },
];

async function runSensitivityAnalysis(
  baseConfig: CompilerConfig,
  corpus: string,
): Promise<SensitivityReport> {
  const report: SensitivityReport = { baseline: null, params: [] };

  // Baseline (all defaults)
  report.baseline = await profileConfig({});

  for (const param of SENSITIVITY_PARAMS) {
    for (const value of param.values) {
      const profile = await profileConfig({
        ...buildNestedOverride(param.path, value),
      });
      report.params.push({
        path: param.path,
        value,
        profile,
        delta: {
          timeMs: profile.metrics.totalTimeMs - report.baseline.metrics.totalTimeMs,
          memoryMB: profile.metrics.peakMemoryMB - report.baseline.metrics.peakMemoryMB,
          sizeBytes: profile.metrics.artifactSizeBytes - report.baseline.metrics.artifactSizeBytes,
        },
      });
    }
  }

  return report;
}
```

### Profiling Report Output

```typescript
interface SensitivityReport {
  baseline: ConfigProfile;
  params: Array<{
    path: string;
    value: unknown;
    profile: ConfigProfile;
    delta: {
      timeMs: number;
      memoryMB: number;
      sizeBytes: number;
    };
  }>;
}

function formatReport(report: SensitivityReport): string {
  const lines: string[] = [
    'Configuration Sensitivity Analysis',
    '==================================',
    '',
    `Baseline: ${report.baseline.metrics.totalTimeMs}ms, ` +
      `${report.baseline.metrics.peakMemoryMB}MB, ` +
      `${formatBytes(report.baseline.metrics.artifactSizeBytes)}`,
    '',
    'Parameter variations:',
    '',
  ];

  for (const param of report.params) {
    const timePct = ((param.delta.timeMs / report.baseline.metrics.totalTimeMs) * 100).toFixed(1);
    const memPct = ((param.delta.memoryMB / report.baseline.metrics.peakMemoryMB) * 100).toFixed(1);
    lines.push(
      `  ${param.path} = ${JSON.stringify(param.value)}:`,
      `    Time:   ${param.delta.timeMs >= 0 ? '+' : ''}${param.delta.timeMs}ms (${timePct}%)`,
      `    Memory: ${param.delta.memoryMB >= 0 ? '+' : ''}${param.delta.memoryMB.toFixed(0)}MB (${memPct}%)`,
      `    Size:   ${formatBytes(param.delta.sizeBytes)}`,
      '',
    );
  }

  return lines.join('\n');
}

function formatBytes(bytes: number): string {
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)}GB`;
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)}MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${bytes}B`;
}
```

### Practical Tuning Guidance

| Goal | Primary Knobs | Secondary Knobs |
|---|---|---|
| **Faster builds** | `cache.enabled=true`, `incremental.enabled=true` | `pipeline.parallel.maxWorkers`, `embedding.concurrency`, `embedding.batchSize` |
| **Lower memory** | `pipeline.parallel.workerMemory`, `optimization.prune.maxNodes` | `cache.l1Size`, `embedding.chunkSize` |
| **Smaller artifacts** | `optimization.compression.embeddings=int8`, `output.compressionLevel=22` | `optimization.prune.minWeight`, `graph.maxNodes` |
| **Higher quality** | `clustering.algorithm=leiden`, `embedding.provider` with better model | `clustering.resolution`, `analysis.ner.enabled=true` |
| **Cheaper API costs** | `embedding.cacheDir` (large), `cache.enabled=true` | `embedding.batchSize`, `embedding.quantization=binary` |
| **Deterministic builds** | `clustering.topicModeling=nmf`, `clustering.algorithm=louvain` | Fixed random seed (via plugin config), `pipeline.parallel.enabled=false` |

### Cache Warm-Up Profiling

For CI/CD pipelines, profile cache hit rates to understand cold-start costs:

```typescript
interface CacheWarmupProfile {
  coldBuildTimeMs: number;
  warmBuildTimeMs: number;
  cacheHitRate: number;
  artifactsCached: number;
  artifactsMissed: number;
}

async function profileCacheEfficiency(config: CompilerConfig): Promise<CacheWarmupProfile> {
  // 1. Clean build (no cache)
  await clearCache(config.cache.dir);
  const cold = await runWithProfiling({ ...config, cache: { ...config.cache, enabled: false } });

  // 2. Cached build (cache populated by step 1)
  const warm = await runWithProfiling(config);

  // 3. Measure hit rate
  const hits = warm.byPass.filter((p) => p.cacheHit).length;
  const total = warm.byPass.length;

  return {
    coldBuildTimeMs: cold.metrics.totalTimeMs,
    warmBuildTimeMs: warm.metrics.totalTimeMs,
    cacheHitRate: hits / total,
    artifactsCached: hits,
    artifactsMissed: total - hits,
  };
}
```

### Continuous Profiling (CI Integration)

```yaml
# .github/workflows/config-profile.yml
name: Configuration Profile
on:
  schedule:
    - cron: '0 0 * * 0'  # weekly
  workflow_dispatch:

jobs:
  profile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - run: npx knowledge-compiler profile --output profile.json
      - run: npx knowledge-compiler profile --param embedding.chunkSize --values 128,256,512,1024
      - run: npx knowledge-compiler profile --param pipeline.parallel.maxWorkers --values 0,2,4,8

      - uses: actions/upload-artifact@v4
        with:
          name: config-profile
          path: profile.json
```

The profile outputs a JSON report that can be diffed across commits to detect regressions:

```json
{
  "commit": "a1b2c3d",
  "timestamp": 1764987432000,
  "baseline": {
    "totalTimeMs": 284731,
    "peakMemoryMB": 1423,
    "artifactSizeBytes": 128000032,
    "embeddingApiCalls": 4820,
    "cacheHitRate": 0.87,
    "graphNodeCount": 15234,
    "graphEdgeCount": 89142
  },
  "regressions": [
    {
      "metric": "totalTimeMs",
      "previous": 240123,
      "current": 284731,
      "change": "+18.6%",
      "suspectedParam": "embedding.model"
    }
  ]
}
```

---

## Appendix A: Default Configuration (Compiled-In)

For reference, the exact defaults applied when no config file is provided:

```json
{
  "source": {
    "patterns": ["**/*.md"],
    "exclude": ["node_modules/**", ".git/**"],
    "baseDir": ".",
    "followSymlinks": false,
    "encoding": "utf-8"
  },
  "output": {
    "dir": "./dist",
    "clean": true,
    "compress": true,
    "compressionLevel": 9,
    "prettyPrint": false,
    "includeTiming": true
  },
  "pipeline": {
    "passes": null,
    "skipPasses": null,
    "parallel": {
      "enabled": true,
      "maxWorkers": 0,
      "workerMemory": 512,
      "batchSize": 100
    },
    "timeout": 3600000,
    "retry": {
      "maxRetries": 3,
      "baseDelay": 1000,
      "maxDelay": 30000,
      "backoffFactor": 2,
      "retryableErrors": ["TRANSIENT", "RATE_LIMITED", "TIMEOUT"]
    }
  },
  "graph": {
    "maxNodes": 1000000,
    "maxEdges": 10000000,
    "edgeWeightThreshold": 0,
    "similarityTopK": 50,
    "includePositions": true,
    "layoutAlgorithm": "force",
    "pagerankDampingFactor": 0.85,
    "pagerankIterations": 100,
    "pagerankTolerance": 1e-6
  },
  "embedding": {
    "provider": "openai",
    "model": "text-embedding-3-small",
    "dimensions": 1536,
    "batchSize": 100,
    "maxRetries": 5,
    "concurrency": 10,
    "chunkSize": 512,
    "chunkOverlap": 64,
    "chunkingStrategy": "semantic",
    "quantization": "float32",
    "cacheDir": null,
    "apiKey": null,
    "apiBaseUrl": null,
    "timeout": 60000
  },
  "clustering": {
    "algorithm": "leiden",
    "resolution": 1,
    "minClusterSize": 5,
    "maxClusters": 1000,
    "topicModeling": "bertopic",
    "topicCount": 50
  },
  "analysis": {
    "ner": {
      "enabled": true,
      "provider": "spacy",
      "model": "en_core_web_sm"
    },
    "keyword": {
      "enabled": true,
      "algorithm": "yake",
      "maxKeywords": 20,
      "minFrequency": 2
    },
    "summarization": {
      "enabled": false,
      "algorithm": "extractive",
      "maxLength": 200,
      "minLength": 50
    },
    "language": {
      "detect": true,
      "fallback": "en"
    },
    "duplicateThreshold": 0.95
  },
  "optimization": {
    "prune": {
      "enabled": true,
      "minDegree": 1,
      "minWeight": 0.05,
      "maxNodes": 50000
    },
    "deduplication": {
      "enabled": true,
      "threshold": 0.85,
      "algorithm": "minhash"
    },
    "compression": {
      "enabled": true,
      "embeddings": "int8",
      "graphPruning": true,
      "hierarchySimplification": true
    }
  },
  "cache": {
    "enabled": true,
    "dir": ".kc-cache",
    "strategy": "content-addressed",
    "maxSize": "10GB",
    "l1Size": 1000,
    "compressed": true,
    "validateOnRead": true
  },
  "incremental": {
    "enabled": true,
    "watch": false,
    "debounceMs": 1000,
    "dependencyTracking": "file",
    "rebuildDependents": true,
    "fullRebuildInterval": 100
  },
  "plugins": {
    "paths": [],
    "config": {},
    "strictValidation": false
  },
  "embeddingProviders": [],
  "visualization": {
    "maxGraphNodes": 500,
    "defaultLayout": "force",
    "enable3D": false,
    "darkMode": true,
    "animationDuration": 300
  },
  "debug": {
    "enabled": false,
    "logLevel": "info",
    "inspectIR": null,
    "dumpPass": null,
    "profile": false,
    "tracePlugins": false,
    "validateEveryPass": false
  },
  "app": {
    "title": "Knowledge Base",
    "description": "Compiled knowledge artifacts",
    "basePath": "/",
    "theme": {
      "primary": "#0066cc",
      "secondary": "#6c757d",
      "font": "Inter"
    },
    "analytics": {
      "enabled": false,
      "provider": null,
      "id": null
    }
  },
  "nextjs": {
    "output": "export",
    "trailingSlash": true,
    "compress": true,
    "images": {
      "unoptimized": true
    }
  }
}
```
