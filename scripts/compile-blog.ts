import { Compiler } from "../packages/core/src/compiler.js";
import { resolve } from "node:path";

const blogDir = "/Users/danielkliewer/Documents/Projects/knowledge-compiler/blog";
const outputDir = "/Users/danielkliewer/Documents/Projects/knowledge-compiler/dist";
const debugDir = "/Users/danielkliewer/Documents/Projects/knowledge-compiler/build";

const compiler = new Compiler({
  config: {
    source: { patterns: ["**/*.md"], baseDir: blogDir, encoding: "utf-8" },
    output: { dir: outputDir, clean: true, prettyPrint: true },
    pipeline: { skipPasses: [], parallel: false, timeout: 3600000 },
    graph: { maxNodes: 1000000, maxEdges: 10000000, edgeWeightThreshold: 0, similarityTopK: 50, layoutAlgorithm: "force", pagerankDampingFactor: 0.85, pagerankIterations: 100, pagerankTolerance: 1e-6 },
    embedding: { provider: "none", model: "text-embedding-3-small", dimensions: 128, batchSize: 100, chunkSize: 512, chunkOverlap: 64, quantization: "float32" },
    clustering: { algorithm: "leiden", resolution: 1, minClusterSize: 2, topicModeling: "bertopic", topicCount: 50 },
    analysis: { entities: { enableNER: true, enableResolution: true, minFrequency: 1 }, keywords: { maxKeywordsPerSection: 20, maxKeyphrasesPerDoc: 10, language: "en" }, references: { strict: false, warnOnBrokenInternalLinks: true } },
    cache: { enabled: false },
    plugins: { paths: [], disableDefault: false },
    visualization: { enabled: true, forceGraph: true, theme: "dark" },
  } as any,
  input: blogDir,
  output: outputDir,
  debug: debugDir,
});

const start = Date.now();
const result = await compiler.compile();
console.log(JSON.stringify({ status: result.status, docs: result.documentsProcessed, sections: result.sectionsProcessed, concepts: result.conceptsProcessed, errors: result.errors.length, durationMs: Date.now() - start }, null, 2));
