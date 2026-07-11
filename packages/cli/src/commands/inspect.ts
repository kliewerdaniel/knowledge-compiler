import { ArtifactReader, ArtifactType } from "@knowledge-compiler/artifacts";
import { stat } from "node:fs/promises";
import { join, basename } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { logger } from "../logger.js";

interface ArtifactInfo {
  name: string;
  type: string;
  size: string;
  status: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export async function inspectCommand(file: string): Promise<void> {
  const spinner = logger.spinner("Inspecting artifacts...");
  spinner.start();

  try {
    const baseDir = file.endsWith(".json")
      ? file.replace(/\/?manifest\.json$/, "")
      : file;

    if (!existsSync(baseDir)) {
      spinner.stop();
      logger.error(`Directory not found: ${baseDir}`);
      process.exitCode = 1;
      return;
    }

    const reader = new ArtifactReader({ baseDir });
    const manifest = await reader.readManifest();

    spinner.stop();

    logger.bold(`Artifact Manifest`);
    logger.info(`  Generated: ${manifest.generatedAt}`);
    logger.info(`  Version:   ${manifest.version}`);
    logger.info(`  Artifacts: ${Object.keys(manifest.artifacts).length}`);
    logger.info("");

    const artifactInfos: ArtifactInfo[] = [];
    let totalSize = 0;

    for (const [artifactPath, entry] of Object.entries(manifest.artifacts)) {
      const fullPath = join(baseDir, entry.path);
      let actualSize = entry.size;
      let status = "present";
      let color: string = "green";

      if (!existsSync(fullPath)) {
        status = "missing";
        color = "red";
        actualSize = 0;
      } else {
        const fileStat = await stat(fullPath);
        actualSize = fileStat.size;
        totalSize += actualSize;

        const fileData = readFileSync(fullPath);
        const actualHash = createHash("sha256").update(fileData).digest("hex");
        const hashMatch = entry.hash === actualHash;

        if (!hashMatch) {
          status = "hash mismatch";
          color = "yellow";
        }
      }

      const typeLabel = artifactPath.includes("-")
        ? artifactPath.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        : artifactPath;

      artifactInfos.push({
        name: artifactPath,
        type: typeLabel,
        size: formatBytes(actualSize),
        status,
      });
    }

    logger.table(artifactInfos as unknown as Record<string, unknown>[]);

    logger.info("");
    logger.info(`Total size: ${formatBytes(totalSize)}`);

    const validation = await reader.validateIntegrity();
    if (validation.valid) {
      logger.success("Integrity check passed");
    } else {
      logger.warn(`Integrity check failed with ${validation.errors.length} error(s):`);
      for (const error of validation.errors) {
        logger.error(`  - ${error}`);
      }
    }

    try {
      const stats = await reader.readStatistics();
      if (stats) {
        logger.info("");
        logger.bold(`Statistics`);
        logger.info(`  Sources:    ${formatNumber(stats.sourceCount ?? 0)}`);
        logger.info(`  Documents:  ${formatNumber(stats.documentCount ?? 0)}`);
        logger.info(`  Sections:   ${formatNumber(stats.sectionCount ?? 0)}`);
        logger.info(`  Concepts:   ${formatNumber(stats.conceptCount ?? 0)}`);
        logger.info(`  Edges:      ${formatNumber(stats.edgeCount ?? 0)}`);
        if (stats.clusterCount !== undefined) {
          logger.info(`  Clusters:   ${formatNumber(stats.clusterCount)}`);
        }
        if (stats.embeddingCount !== undefined) {
          logger.info(`  Embeddings: ${formatNumber(stats.embeddingCount)}`);
        }
        if (stats.embeddingDimensions !== undefined) {
          logger.info(`  Dimensions: ${stats.embeddingDimensions}`);
        }
        if (stats.processingTimeMs !== undefined) {
          const sec = (stats.processingTimeMs / 1000).toFixed(1);
          logger.info(`  Processed:  ${sec}s`);
        }
      }
    } catch {
      // Statistics artifact may not exist
    }

    try {
      const graph = await reader.readKnowledgeGraph();
      if (graph && graph.metadata) {
        logger.info("");
        logger.bold(`Knowledge Graph`);
        logger.info(`  Generated: ${graph.metadata.generatedAt}`);
        logger.info(`  Sources:   ${formatNumber(graph.metadata.sourceCount)}`);
        logger.info(`  Sections:  ${formatNumber(graph.metadata.sectionCount)}`);
        logger.info(`  Concepts:  ${formatNumber(graph.metadata.conceptCount)}`);
        logger.info(`  Edges:     ${formatNumber(graph.metadata.edgeCount)}`);
      }
    } catch {
      // Knowledge graph may not exist
    }
  } catch (err) {
    spinner.stop();
    logger.error(`Failed to inspect artifacts: ${(err as Error).message}`);
    process.exitCode = 1;
  }
}
