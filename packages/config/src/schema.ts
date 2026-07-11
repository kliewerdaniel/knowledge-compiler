// ── Byte Size Parser ──────────────────────────────────────────
const ByteSizePattern = /^(\d+)\s*(KB|MB|GB)$/i;
export function parseByteSize(s: string): number {
  const m = ByteSizePattern.exec(s);
  if (!m) throw new Error(`Invalid byte size: ${s}`);
  const n = parseInt(m[1], 10);
  switch (m[2].toUpperCase()) {
    case "KB": return n * 1024;
    case "MB": return n * 1024 * 1024;
    case "GB": return n * 1024 * 1024 * 1024;
  }
  throw new Error(`Unknown byte size unit: ${m[2]}`);
}

// ── Parallel Config ──────────────────────────────────────────
import { z } from "zod";

export const ParallelConfigSchema = z.object({
  enabled: z.boolean().default(true),
  maxWorkers: z.number().int().min(0).default(0),
  workerMemory: z.number().positive().default(512),
  batchSize: z.number().int().positive().default(100),
});

// ── Retry Config ─────────────────────────────────────────────
export const RetryConfigSchema = z
  .object({
    maxRetries: z.number().int().min(0).default(3),
    baseDelay: z.number().positive().default(1000),
    maxDelay: z.number().positive().default(30000),
    backoffFactor: z.number().positive().default(2),
    retryableErrors: z.array(z.string()).default(["TRANSIENT", "RATE_LIMITED", "TIMEOUT"]),
  })
  .default({});

// ── Source Configuration ─────────────────────────────────────
export const SourceConfigSchema = z.object({
  patterns: z.array(z.string()).default(["**/*.md"]),
  exclude: z.array(z.string()).default(["node_modules/**", ".git/**"]),
  baseDir: z.string().default("."),
  followSymlinks: z.boolean().default(false),
  encoding: z.enum(["utf-8", "utf-16", "latin1"]).default("utf-8"),
});

// ── Output Configuration ─────────────────────────────────────
export const OutputConfigSchema = z.object({
  dir: z.string().default("./dist"),
  clean: z.boolean().default(true),
  compress: z.boolean().default(true),
  compressionLevel: z.number().int().min(0).max(22).default(9),
  prettyPrint: z.boolean().default(false),
  includeTiming: z.boolean().default(true),
});

// ── Pipeline Configuration ───────────────────────────────────
export const PipelineConfigSchema = z.object({
  passes: z.array(z.string()).optional(),
  skipPasses: z.array(z.string()).optional(),
  parallel: z.union([z.boolean(), ParallelConfigSchema]).default({}),
  timeout: z.number().positive().default(3600000),
  retry: RetryConfigSchema,
});

// ── Graph Configuration ──────────────────────────────────────
export const GraphConfigSchema = z.object({
  maxNodes: z.number().int().positive().default(1000000),
  maxEdges: z.number().int().positive().default(10000000),
  edgeWeightThreshold: z.number().min(0).max(1).default(0.0),
  similarityTopK: z.number().int().positive().default(50),
  includePositions: z.boolean().default(true),
  layoutAlgorithm: z.enum(["force", "hierarchical", "radial", "spring"]).default("force"),
  pagerankDampingFactor: z.number().min(0).max(1).default(0.85),
  pagerankIterations: z.number().int().positive().default(100),
  pagerankTolerance: z.number().positive().default(1e-6),
});

// ── Embedding Configuration ──────────────────────────────────
export const EmbeddingConfigSchema = z.object({
  provider: z.enum(["openai", "voyage", "cohere", "local", "custom", "none"]).default("openai"),
  model: z.string().default("text-embedding-3-small"),
  dimensions: z.number().int().positive().default(1536),
  batchSize: z.number().int().positive().default(100),
  maxRetries: z.number().int().min(0).default(5),
  concurrency: z.number().int().positive().default(10),
  chunkSize: z.number().int().positive().default(512),
  chunkOverlap: z.number().int().min(0).default(64),
  chunkingStrategy: z.enum(["fixed", "semantic", "recursive", "document"]).default("semantic"),
  quantization: z.enum(["float32", "int8", "binary"]).default("float32"),
  cacheDir: z.string().optional(),
  apiKey: z.string().optional(),
  apiBaseUrl: z.string().url().optional(),
  timeout: z.number().positive().default(60000),
});

// ── Clustering Configuration ─────────────────────────────────
export const ClusteringConfigSchema = z.object({
  algorithm: z
    .enum(["louvain", "leiden", "hdbscan", "kmeans", "spectral", "label_propagation"])
    .default("leiden"),
  resolution: z.number().positive().default(1.0),
  minClusterSize: z.number().int().positive().default(5),
  maxClusters: z.number().int().positive().default(1000),
  topicModeling: z.enum(["lda", "nmf", "bertopic", "none"]).default("bertopic"),
  topicCount: z.number().int().positive().default(50),
});

// ── Analysis Configuration ───────────────────────────────────
export const AnalysisConfigSchema = z.object({
  entities: z.object({
    enableNER: z.boolean().default(true),
    enableResolution: z.boolean().default(true),
    minFrequency: z.number().int().positive().default(2),
    minCooccurrence: z.number().int().positive().default(1),
    lexicon: z.string().optional(),
  }).default({}),
  keywords: z.object({
    maxKeywordsPerSection: z.number().int().positive().default(20),
    maxKeyphrasesPerDoc: z.number().int().positive().default(10),
    minScore: z.number().positive().default(0.1),
    minWordLength: z.number().int().positive().default(3),
    language: z.string().default("en"),
    enableKeyphrases: z.boolean().default(true),
    headingBoost: z.number().positive().default(2.0),
  }).default({}),
  references: z.object({
    strict: z.boolean().default(false),
    warnOnBrokenInternalLinks: z.boolean().default(true),
    indexCustomAnchors: z.boolean().default(true),
    resolveCitations: z.boolean().default(false),
  }).default({}),
  hierarchy: z.object({
    enableDistributional: z.boolean().default(false),
    enableWordNet: z.boolean().default(true),
    subsumptionThreshold: z.number().min(0).max(1).default(0.3),
    language: z.string().default("en"),
  }).default({}),
});

// ── Frontmatter Configuration ────────────────────────────────
export const FrontmatterConfigSchema = z.object({
  schema: z.any().optional(),
  delimiters: z.array(z.string()).default(["---", "+++"]),
  required: z.array(z.string()).default(["title"]),
  strict: z.boolean().default(false),
});

// ── Cache Configuration ──────────────────────────────────────
export const CacheConfigSchema = z.object({
  enabled: z.boolean().default(true),
  l1Size: z.number().positive().default(500 * 1024 * 1024),
  l2Path: z.string().default(".knowledge/cache"),
  ttl: z.number().int().positive().default(1800000),
  compression: z.enum(["none", "gzip", "zstd"]).default("gzip"),
});

// ── Plugins Configuration ────────────────────────────────────
export const PluginsConfigSchema = z.object({
  paths: z.array(z.string()).default([]),
  disableDefault: z.boolean().default(false),
});

// ── Visualization Configuration ──────────────────────────────
export const VisualizationConfigSchema = z.object({
  enabled: z.boolean().default(true),
  forceGraph: z.boolean().default(true),
  threeD: z.boolean().default(false),
  theme: z.enum(["dark", "light"]).default("dark"),
});

// ── Top-level Compiler Config ────────────────────────────────
export const CompilerConfigSchema = z.object({
  version: z.number().int().positive().default(1),
  source: SourceConfigSchema.default({}),
  output: OutputConfigSchema.default({}),
  pipeline: PipelineConfigSchema.default({}),
  graph: GraphConfigSchema.default({}),
  embedding: EmbeddingConfigSchema.default({}),
  clustering: ClusteringConfigSchema.default({}),
  analysis: AnalysisConfigSchema.default({}),
  frontmatter: FrontmatterConfigSchema.default({}),
  cache: CacheConfigSchema.default({}),
  plugins: PluginsConfigSchema.default({}),
  visualization: VisualizationConfigSchema.default({}),
});

export type CompilerConfig = z.infer<typeof CompilerConfigSchema>;
export type ParallelConfig = z.infer<typeof ParallelConfigSchema>;
export type RetryConfig = z.infer<typeof RetryConfigSchema>;
export type SourceConfig = z.infer<typeof SourceConfigSchema>;
export type OutputConfig = z.infer<typeof OutputConfigSchema>;
export type PipelineConfig = z.infer<typeof PipelineConfigSchema>;
export type GraphConfig = z.infer<typeof GraphConfigSchema>;
export type EmbeddingConfig = z.infer<typeof EmbeddingConfigSchema>;
export type ClusteringConfig = z.infer<typeof ClusteringConfigSchema>;
export type AnalysisConfig = z.infer<typeof AnalysisConfigSchema>;
export type FrontmatterConfig = z.infer<typeof FrontmatterConfigSchema>;
export type CacheConfig = z.infer<typeof CacheConfigSchema>;
export type PluginsConfig = z.infer<typeof PluginsConfigSchema>;
export type VisualizationConfig = z.infer<typeof VisualizationConfigSchema>;
