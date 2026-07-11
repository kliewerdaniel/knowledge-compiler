import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { logger } from "../logger.js";

export async function versionCommand(): Promise<void> {
  let packageVersion = "0.1.0";

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pkgJsonPath = join(__dirname, "..", "..", "package.json");
    if (existsSync(pkgJsonPath)) {
      const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
      packageVersion = pkg.version ?? packageVersion;
    }
  } catch {
    // Use default version
  }

  const nodeVersion = process.version;
  const platform = process.platform;
  const arch = process.arch;

  logger.bold(`Knowledge Compiler v${packageVersion}`);
  logger.info(`  Node.js:   ${nodeVersion}`);
  logger.info(`  Platform:  ${platform}/${arch}`);
  logger.info("");
  logger.info("A compiler that transforms markdown documents into structured,");
  logger.info("searchable knowledge graphs with embeddings and semantic search.");
}
