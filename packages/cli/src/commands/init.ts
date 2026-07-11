import { writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { logger } from "../logger.js";

const DEFAULT_CONFIG = {
  $schema: "https://knowledge-compiler.dev/schemas/v1.json",
  version: 1,
  source: {
    patterns: ["**/*.md"],
    exclude: ["node_modules/**", ".git/**", "dist/**"],
    baseDir: "./content",
    encoding: "utf-8",
  },
  output: {
    dir: "./dist",
    clean: true,
    compress: true,
    compressionLevel: 9,
    prettyPrint: false,
    includeTiming: true,
  },
  pipeline: {
    passes: undefined,
    skipPasses: undefined,
    parallel: true,
    timeout: 3600000,
  },
  graph: {
    maxNodes: 1000000,
    maxEdges: 10000000,
    edgeWeightThreshold: 0.0,
    similarityTopK: 50,
    layoutAlgorithm: "force",
    pagerankDampingFactor: 0.85,
    pagerankIterations: 100,
  },
  embedding: {
    provider: "openai",
    model: "text-embedding-3-small",
    dimensions: 1536,
    batchSize: 100,
    chunkSize: 512,
    chunkOverlap: 64,
    quantization: "float32",
  },
  clustering: {
    algorithm: "leiden",
    resolution: 1.0,
    minClusterSize: 5,
    topicModeling: "bertopic",
    topicCount: 50,
  },
  analysis: {
    entities: {
      enableNER: true,
      enableResolution: true,
      minFrequency: 2,
    },
    keywords: {
      maxKeywordsPerSection: 20,
      maxKeyphrasesPerDoc: 10,
      language: "en",
    },
    references: {
      strict: false,
      warnOnBrokenInternalLinks: true,
    },
  },
  cache: {
    enabled: true,
    ttl: 1800000,
    compression: "gzip",
  },
  plugins: {
    paths: [],
    disableDefault: false,
  },
  visualization: {
    enabled: true,
    forceGraph: true,
    theme: "dark",
  },
};

export async function initCommand(): Promise<void> {
  const configPath = join(process.cwd(), "knowledge-compiler.json");

  if (existsSync(configPath)) {
    logger.warn(`Configuration file already exists: ${configPath}`);
    logger.info("Use --force to overwrite.");
    return;
  }

  try {
    writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2) + "\n", "utf-8");
    logger.success(`Created ${configPath}`);
    logger.info("");
    logger.info("Edit the config file to customize your project:");
    logger.info(`  - Set \`source.baseDir\` to your markdown directory`);
    logger.info(`  - Set \`output.dir\` for the output location`);
    logger.info(`  - Configure \`embedding.provider\` and \`embedding.apiKey\``);
    logger.info("");
    logger.info(`Run \`kc compile\` to compile your documents.`);
  } catch (err) {
    logger.error(`Failed to create config: ${(err as Error).message}`);
    process.exitCode = 1;
  }
}
