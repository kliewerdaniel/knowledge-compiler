import { Compiler } from "../packages/core/src/compiler.js";
import { resolve } from "node:path";
import { mkdirSync } from "node:fs";

const testDir = resolve(import.meta.dirname, "../test-corpus");
const outputDir = resolve(import.meta.dirname, "../dist");
const debugDir = resolve(import.meta.dirname, "../build");

mkdirSync(debugDir, { recursive: true });

const config = {
  source: {
    patterns: ["**/*.md"],
    baseDir: testDir,
    encoding: "utf-8",
  },
  output: {
    dir: outputDir,
    clean: true,
    prettyPrint: true,
  },
  pipeline: {
    skipPasses: [],
    parallel: false,
    timeout: 3600000,
  },
  graph: {
    maxNodes: 1000000,
    maxEdges: 10000000,
    edgeWeightThreshold: 0,
    similarityTopK: 50,
    layoutAlgorithm: "force",
    pagerankDampingFactor: 0.85,
    pagerankIterations: 100,
    pagerankTolerance: 1e-6,
  },
  embedding: {
    provider: "none",
    model: "text-embedding-3-small",
    dimensions: 128,
    batchSize: 100,
    chunkSize: 512,
    chunkOverlap: 64,
    quantization: "float32",
  },
  clustering: {
    algorithm: "leiden",
    resolution: 1,
    minClusterSize: 2,
    topicModeling: "bertopic",
    topicCount: 50,
  },
  analysis: {
    entities: {
      enableNER: true,
      enableResolution: true,
      minFrequency: 1,
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
    enabled: false,
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
} as any;

async function main() {
  console.log("=== Knowledge Compiler Debug Run ===");
  console.log(`Input:  ${testDir}`);
  console.log(`Output: ${outputDir}`);
  console.log(`Debug:  ${debugDir}`);

  const compiler = new Compiler({
    config,
    input: testDir,
    output: outputDir,
    debug: debugDir,
  });

  console.log("\nStarting compilation...\n");
  const startTime = Date.now();
  const result = await compiler.compile();
  const duration = Date.now() - startTime;

  console.log(`\nCompilation ${result.status} in ${duration}ms`);
  console.log(`  Documents: ${result.documentsProcessed}`);
  console.log(`  Sections:  ${result.sectionsProcessed}`);
  console.log(`  Concepts:  ${result.conceptsProcessed}`);

  if (result.errors.length > 0) {
    console.log(`\nErrors (${result.errors.length}):`);
    for (const err of result.errors) {
      console.log(`  [${err.severity}] ${err.passId ?? ""}: ${err.message}`);
    }
  }

  if (result.warnings.length > 0) {
    console.log(`\nWarnings (${result.warnings.length}):`);
    for (const w of result.warnings) {
      console.log(`  ${w}`);
    }
  }

  // Write debug report
  const debugInstance = compiler.getDebugInstance();
  if (debugInstance) {
    const reportPath = debugInstance.writeReport();
    console.log(`\nDebug report: ${reportPath}`);

    const csvPath = debugInstance.writeCrossPassComparison();
    console.log(`CSV comparison: ${csvPath}`);

    // Trace some entities
    const snapshots = debugInstance.getSnapshots();
    const { traceEntity } = await import("../packages/core/src/debug.js");
    const traceEntities = ["neural", "Transformer", "Google", "GPT", "attention"];

    for (const entity of traceEntities) {
      const trace = traceEntity(snapshots, entity);
      const tracePath = resolve(debugDir, `trace-${entity.toLowerCase().replace(/\s+/g, "-")}.md`);
      const { writeFileSync } = await import("node:fs");
      writeFileSync(tracePath, trace);
      console.log(`Trace "${entity}": ${tracePath}`);
    }

    // Print summary
    console.log("\n=== Validation Summary ===");
    for (const snap of snapshots) {
      if (snap.passId.startsWith("pre-")) continue;
      const v = snap.validation;
      const failed = v.checks.filter((c) => !c.passed);
      console.log(`  ${snap.passId}: ${v.valid ? "PASS" : "FAIL"} (${v.checks.length} checks${failed.length > 0 ? `, ${failed.length} failed` : ""})`);
    }
  }
}

main().catch(console.error);
