import { existsSync, readdirSync, statSync, readFileSync } from "node:fs";
import { join, resolve, dirname, basename } from "node:path";
import { logger } from "../logger.js";

interface PluginInfo {
  name: string;
  version: string;
  location: string;
  enabled: boolean;
}

function discoverPlugins(): PluginInfo[] {
  const plugins: PluginInfo[] = [];
  const projectDir = process.cwd();

  // Check node_modules for @knowledge-compiler/* packages
  const nodeModulesDir = join(projectDir, "node_modules", "@knowledge-compiler");
  if (existsSync(nodeModulesDir)) {
    try {
      const entries = readdirSync(nodeModulesDir);
      for (const entry of entries) {
        if (!entry.startsWith("plugin-")) continue;
        const pkgJsonPath = join(nodeModulesDir, entry, "package.json");
        if (existsSync(pkgJsonPath)) {
          try {
            const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
            plugins.push({
              name: entry,
              version: pkgJson.version ?? "unknown",
              location: join(nodeModulesDir, entry),
              enabled: true,
            });
          } catch {
            plugins.push({
              name: entry,
              version: "unknown",
              location: join(nodeModulesDir, entry),
              enabled: true,
            });
          }
        }
      }
    } catch {
      // node_modules may not be installed
    }
  }

  // Check configured plugin paths
  const configPath = join(projectDir, "knowledge-compiler.json");
  if (existsSync(configPath)) {
    try {
      const config = JSON.parse(readFileSync(configPath, "utf-8"));
      if (config.plugins?.paths) {
        for (const pluginPath of config.plugins.paths) {
          const resolved = resolve(projectDir, pluginPath);
          const pkgJsonPath = join(resolved, "package.json");
          if (existsSync(pkgJsonPath)) {
            try {
              const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
              plugins.push({
                name: pkgJson.name ?? basename(resolved),
                version: pkgJson.version ?? "unknown",
                location: resolved,
                enabled: !config.plugins.disableDefault,
              });
            } catch {
              plugins.push({
                name: basename(resolved),
                version: "unknown",
                location: resolved,
                enabled: true,
              });
            }
          }
        }
      }
    } catch {
      // Config may not be valid JSON
    }
  }

  return plugins;
}

export async function pluginListCommand(): Promise<void> {
  const plugins = discoverPlugins();

  if (plugins.length === 0) {
    logger.info("No plugins installed.");
    logger.info("");
    logger.info("Install plugins with:");
    logger.info("  kc plugin add <plugin-name>");
    return;
  }

  const tableData = plugins.map((p) => ({
    Name: p.name,
    Version: p.version,
    Enabled: p.enabled ? "yes" : "no",
    Location: p.location,
  }));

  logger.bold(`Installed Plugins (${plugins.length})`);
  logger.info("");
  logger.table(tableData);
}

export async function pluginAddCommand(name: string): Promise<void> {
  const spinner = logger.spinner(`Installing plugin ${name}...`);
  spinner.start();

  try {
    const { execSync } = await import("node:child_process");
    const projectDir = process.cwd();

    const result = execSync(
      `npm install @knowledge-compiler/${name} --save --prefix "${projectDir}"`,
      {
        cwd: projectDir,
        encoding: "utf-8",
        stdio: "pipe",
      }
    );

    spinner.stop();
    logger.success(`Plugin "${name}" installed successfully`);

    if (result) {
      logger.debug(result.trim());
    }
  } catch (err) {
    spinner.stop();
    const message = err instanceof Error ? err.message : String(err);
    logger.error(`Failed to install plugin "${name}": ${message}`);
    logger.info("Make sure the plugin exists on the npm registry.");
    logger.debug(message);
    process.exitCode = 1;
  }
}

export async function pluginRemoveCommand(name: string): Promise<void> {
  const spinner = logger.spinner(`Removing plugin ${name}...`);
  spinner.start();

  try {
    const { execSync } = await import("node:child_process");
    const projectDir = process.cwd();

    execSync(
      `npm uninstall @knowledge-compiler/${name} --save --prefix "${projectDir}"`,
      {
        cwd: projectDir,
        encoding: "utf-8",
        stdio: "pipe",
      }
    );

    spinner.stop();
    logger.success(`Plugin "${name}" removed successfully`);
  } catch (err) {
    spinner.stop();
    const message = err instanceof Error ? err.message : String(err);
    logger.error(`Failed to remove plugin "${name}": ${message}`);
    process.exitCode = 1;
  }
}
