import { existsSync, mkdirSync, readdirSync, statSync, rmSync, unlinkSync, type Dirent } from "node:fs";
import { join, resolve } from "node:path";
import { logger } from "../logger.js";

function getCacheDir(): string {
  const projectDir = process.cwd();
  return join(projectDir, ".knowledge", "cache");
}

function getL1CacheDir(): string {
  return join(process.cwd(), ".knowledge", "cache", "l1");
}

function getL2CacheDir(): string {
  return join(process.cwd(), ".knowledge", "cache", "l2");
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function countDirContents(dir: string): { files: number; size: number } {
  let files = 0;
  let size = 0;

  if (!existsSync(dir)) {
    return { files: 0, size: 0 };
  }

  const entries: Dirent[] = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const sub = countDirContents(join(dir, entry.name));
      files += sub.files;
      size += sub.size;
    } else if (entry.isFile()) {
      files++;
      size += statSync(join(dir, entry.name)).size;
    }
  }

  return { files, size };
}

function isExpired(filePath: string, ttlMs: number): boolean {
  try {
    const statResult = statSync(filePath);
    return Date.now() - statResult.mtimeMs > ttlMs;
  } catch {
    return true;
  }
}

export async function cacheStatusCommand(): Promise<void> {
  const l1Dir = getL1CacheDir();
  const l2Dir = getL2CacheDir();

  const l1 = countDirContents(l1Dir);
  const l2 = countDirContents(l2Dir);

  const totalFiles = l1.files + l2.files;
  const totalSize = l1.size + l2.size;

  const cacheEnabled = existsSync(join(process.cwd(), ".knowledge", "cache"));

  logger.bold("Cache Status");
  logger.info("");
  logger.info(`  Enabled:      ${cacheEnabled ? "yes" : "no"}`);
  logger.info(`  L1 (RAM):     ${l1.files} files, ${formatBytes(l1.size)}`);
  logger.info(`  L2 (disk):    ${l2.files} files, ${formatBytes(l2.size)}`);
  logger.info(`  Total:        ${totalFiles} files, ${formatBytes(totalSize)}`);
  logger.info(`  L2 path:      ${resolve(l2Dir)}`);

  if (totalFiles === 0) {
    logger.dim("\n  No cache entries found. Cache will be populated on first compile.");
  }
}

export async function cacheClearCommand(): Promise<void> {
  const cacheDir = getCacheDir();

  if (!existsSync(cacheDir)) {
    logger.info("Cache directory does not exist. Nothing to clear.");
    return;
  }

  const spinner = logger.spinner("Clearing cache...");
  spinner.start();

  try {
    const l1 = countDirContents(getL1CacheDir());
    const l2 = countDirContents(getL2CacheDir());
    const totalSize = l1.size + l2.size;

    rmSync(cacheDir, { recursive: true, force: true });

    spinner.stop();
    logger.success(`Cache cleared (${l1.files + l2.files} files, ${formatBytes(totalSize)})`);
    logger.info(`  Cache directory removed: ${resolve(cacheDir)}`);
  } catch (err) {
    spinner.stop();
    logger.error(`Failed to clear cache: ${(err as Error).message}`);
    process.exitCode = 1;
  }
}

export async function cachePruneCommand(): Promise<void> {
  const l2Dir = getL2CacheDir();
  const ttlMs = 1800000;

  if (!existsSync(l2Dir)) {
    logger.info("No cache directory found. Nothing to prune.");
    return;
  }

  const spinner = logger.spinner("Pruning expired cache entries...");
  spinner.start();

  let prunedFiles = 0;
  let prunedSize = 0;
  const expiredFiles: string[] = [];

  function walkDir(dir: string): void {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile()) {
        if (isExpired(fullPath, ttlMs)) {
          expiredFiles.push(fullPath);
        }
      }
    }
  }

  walkDir(l2Dir);

  for (const file of expiredFiles) {
    try {
      const fileStat = statSync(file);
      prunedSize += fileStat.size;
      prunedFiles++;
      unlinkSync(file);
    } catch {
      // File may have been removed by another process
    }
  }

  spinner.stop();

  if (prunedFiles === 0) {
    logger.success("No expired entries found. Cache is up to date.");
    return;
  }

  logger.success(`Pruned ${prunedFiles} expired entries (${formatBytes(prunedSize)})`);
}
