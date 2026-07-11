import { ArtifactWriter, type ArtifactEntry } from "@knowledge-compiler/artifacts";
import { mkdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import chalk from "chalk";
import { logger } from "../logger.js";
import cliProgress from "cli-progress";

export interface CompileArgs {
  input?: string;
  output?: string;
  config?: string;
  passes?: string[];
  skipPasses?: string[];
  verbose?: boolean;
  quiet?: boolean;
  watch?: boolean;
}

function parsePassList(passes?: string[]): string[] | undefined {
  if (!passes || passes.length === 0) return undefined;
  return passes.flatMap((p) => p.split(",").map((s) => s.trim())).filter(Boolean);
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const min = Math.floor(ms / 60000);
  const sec = ((ms % 60000) / 1000).toFixed(0);
  return `${min}m ${sec}s`;
}

function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let val = bytes;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${val.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

async function writeArtifacts(outputDir: string, compiler: any): Promise<{ entries: ArtifactEntry[]; stats: any }> {
  const irStore = compiler.getIRStore();
  const stats = irStore.getStats();
  const writer = new ArtifactWriter({ outputDir, prettyPrint: true });

  const entries: ArtifactEntry[] = [];

  const knowledgeGraph = irStore.getKnowledgeGraph();
  if (knowledgeGraph) {
    const entry = await writer.writeKnowledgeGraph(knowledgeGraph);
    entries.push(entry);
  }

  if (stats.embeddingCount > 0) {
    const embeddings = new Map<string, Float32Array>();
    for (const doc of irStore.getAllDocuments()) {
      if (doc._embeddings) {
        for (const [key, val] of Object.entries(doc._embeddings)) {
          if (val instanceof Float32Array) {
            embeddings.set(key, val);
          }
        }
      }
    }
    if (embeddings.size > 0) {
      const entry = await writer.writeEmbeddings(embeddings);
      entries.push(entry);
    }
  }

  const sectionGraphs = irStore.getAllSectionGraphs();
  if (sectionGraphs.length > 0) {
    const sections: any[] = [];
    for (const sg of sectionGraphs) {
      if (sg.sections) {
        sections.push(...sg.sections);
      }
    }
    if (sections.length > 0) {
      const entry = await writer.writeSectionIndex(sections);
      entries.push(entry);
    }
  }

  const conceptGraphs = irStore.getAllConceptGraphs();
  if (conceptGraphs.length > 0) {
    const concepts: any[] = [];
    for (const cg of conceptGraphs) {
      if (cg.concepts) {
        concepts.push(...cg.concepts);
      }
    }
    if (concepts.length > 0) {
      const entry = await writer.writeConceptIndex(concepts);
      entries.push(entry);
    }
  }

  const clusterGraphs = irStore.getAllClusterGraphs();
  const clusters: any[] = [];
  if (clusterGraphs.length > 0) {
    for (const cgr of clusterGraphs) {
      if (cgr.clusters) {
        clusters.push(...cgr.clusters);
      }
    }
    if (clusters.length > 0) {
      const entry = await writer.writeClusterIndex(clusters);
      entries.push(entry);
    }
  }

  const navGraphs = irStore.getAllNavigationGraphs();
  if (navGraphs.length > 0) {
    const entry = await writer.writeNavigation({ tree: navGraphs, flat: [] });
    entries.push(entry);
  }

  const allEdges = irStore.getAllEdges();
  if (allEdges.length > 0) {
    const entry = await writer.writeKnowledgeGraph({
      metadata: {
        version: 1,
        generatedAt: new Date().toISOString(),
        sourceCount: stats.documentCount,
        sectionCount: stats.sectionCount,
        conceptCount: stats.conceptCount,
        edgeCount: allEdges.length,
        sourceHash: "",
      },
      documents: irStore.getAllDocuments(),
      sections: sectionGraphs.flatMap((sg: any) => sg.sections ?? []),
      concepts: conceptGraphs.flatMap((cg: any) => cg.concepts ?? []),
      edges: allEdges,
    });
    if (!entries.find((e) => e.path === "knowledge-graph.json")) {
      entries.push(entry);
    }
  }

  const statistics = {
    generatedAt: new Date().toISOString(),
    sourceCount: stats.documentCount,
    documentCount: stats.documentCount,
    sectionCount: stats.sectionCount,
    conceptCount: stats.conceptCount,
    edgeCount: allEdges.length,
    clusterCount: clusters.length,
    embeddingCount: stats.embeddingCount,
    totalBytes: entries.reduce((sum: number, e: ArtifactEntry) => sum + e.size, 0),
    processingTimeMs: 0,
    phaseTimings: {},
  };
  const statsEntry = await writer.writeStatistics(statistics);
  entries.push(statsEntry);

  const manifestEntry = await writer.writeManifest(entries);

  return { entries: [...entries, manifestEntry], stats };
}

export async function compileCommand(args: CompileArgs): Promise<void> {
  const { loadConfig } = await import("@knowledge-compiler/config");

  const overrides: Record<string, unknown> = {};

  if (args.input) {
    overrides.source = { ...(overrides.source as Record<string, unknown> ?? {}), baseDir: args.input };
  }

  if (args.output) {
    overrides.output = { ...(overrides.output as Record<string, unknown> ?? {}), dir: args.output };
  }

  const passes = parsePassList(args.passes);
  const skipPasses = parsePassList(args.skipPasses);

  if (passes) {
    overrides.pipeline = { ...(overrides.pipeline as Record<string, unknown> ?? {}), passes };
  }
  if (skipPasses) {
    overrides.pipeline = { ...(overrides.pipeline as Record<string, unknown> ?? {}), skipPasses };
  }

  let config: any;
  try {
    const loadOptions: Record<string, unknown> = {};
    if (args.config) loadOptions.configPath = args.config;
    if (Object.keys(overrides).length > 0) loadOptions.overrides = overrides;
    config = await loadConfig(loadOptions);
  } catch (err) {
    logger.error(`Failed to load config: ${(err as Error).message}`);
    process.exitCode = 1;
    return;
  }

  const outputDir = args.output ?? config.output.dir;
  await mkdir(outputDir, { recursive: true });

  const spinner = logger.spinner("Compiling...");
  spinner.start();

  try {
    const coreModule = await import("@knowledge-compiler/core/compiler") as any;
    const CompilerClass = coreModule.Compiler || coreModule.default?.Compiler;
    const compiler = new (CompilerClass || coreModule.default)({
      config,
      input: args.input,
      output: outputDir,
    });

    const progressBar = new cliProgress.SingleBar(
      {
        format: chalk.cyan("  Compiling") + " | {bar}" + " | {percentage}% | {value}/{total} passes",
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true,
        clearOnComplete: false,
      },
      cliProgress.Presets.shades_classic
    );

    const totalPasses = compiler.getPassRegistry().getAll().length;
    progressBar.start(totalPasses, 0);

    const result = await compiler.compile({
      input: args.input,
      output: outputDir,
      passes: passes,
      skipPasses: skipPasses,
    });

    progressBar.update(totalPasses);
    progressBar.stop();
    spinner.stop();

    if (result.status === "failed") {
      spinner.clear();
      logger.error(`Compilation failed after ${formatDuration(result.durationMs)}`);
      for (const error of result.errors) {
        logger.error(`  [${error.severity}] ${error.message}`);
      }
      process.exitCode = 1;
      return;
    }

    if (result.status === "partial") {
      logger.warn(`Compilation completed with ${result.errors.length} error(s)`);
    }

    let artifactCount = 0;
    let totalSize = 0;
    try {
      const fs = await import("node:fs");
      const manifestRaw = fs.readFileSync(join(outputDir, "manifest.json"), "utf-8");
      const manifest = JSON.parse(manifestRaw);
      const artMap = manifest.artifacts ?? {};
      artifactCount = Object.keys(artMap).length;
      for (const entry of Object.values(artMap) as any) {
        totalSize += entry.size ?? 0;
      }
    } catch {
      const { entries: e, stats: s } = await writeArtifacts(outputDir, compiler);
      artifactCount = e.length;
      totalSize = e.reduce((sum: number, entry: ArtifactEntry) => sum + entry.size, 0);
    }

    spinner.clear();
    logger.success(
      `Compilation ${result.status} in ${formatDuration(result.durationMs)}`
    );
    logger.info(`  Output: ${outputDir}`);
    logger.info(`  Documents: ${result.documentsProcessed}`);
    logger.info(`  Sections: ${result.sectionsProcessed}`);
    logger.info(`  Concepts: ${result.conceptsProcessed}`);
    logger.info(`  Edges: ${result.artifactsWritten}`);
    logger.info(`  Embeddings: ${result.artifactsWritten}`);
    logger.info(`  Artifacts: ${artifactCount} (${formatBytes(totalSize)})`);

    if (result.warnings.length > 0 && !args.quiet) {
      logger.warn(`  Warnings: ${result.warnings.length}`);
    }

    if (args.watch) {
      logger.info(`\nWatching for changes... (Ctrl+C to stop)`);
      await watchMode(outputDir, args.input ?? config.source.baseDir);
    }
  } catch (err) {
    spinner.stop();
    logger.error(`Compilation error: ${(err as Error).message}`);
    process.exitCode = 1;
  }
}

async function watchMode(outputDir: string, inputDir: string): Promise<void> {
  const { watch } = await import("node:fs");
  const debounceTimers = new Map<string, NodeJS.Timeout>();

  const scheduleCompile = () => {
    for (const timer of debounceTimers.values()) {
      clearTimeout(timer);
    }
    debounceTimers.clear();
    const timer = setTimeout(async () => {
      logger.info("Change detected, recompiling...");
      try {
        await compileCommand({
          input: inputDir,
          output: outputDir,
          quiet: true,
        });
      } catch {
        logger.error("Recompile failed");
      }
    }, 300);
    debounceTimers.set("recompile", timer);
  };

  return new Promise((resolvePromise) => {
    const watcher = watch(inputDir, { recursive: true }, (eventType: string, filename: string) => {
      if (filename && !filename.startsWith(".") && !filename.includes("node_modules")) {
        logger.info(`File ${eventType}: ${filename}`);
        scheduleCompile();
      }
    });

    process.on("SIGINT", () => {
      watcher.close();
      logger.info("\nStopping watcher.");
      resolvePromise();
    });
  });
}
