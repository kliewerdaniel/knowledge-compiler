import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { CompilerConfig, CompilerConfigSchema } from "./schema.js";

export interface ConfigFile {
  path: string;
  source: "defaults" | "project" | "home" | "cli";
  format: "json" | "jsonc" | "yaml";
}

export interface LoadOptions {
  configPath?: string;
  projectDir?: string;
  overrides?: Partial<CompilerConfig>;
}

function parseJSONC(content: string): unknown {
  // Remove single-line comments
  let cleaned = content.replace(/\/\/.*$/gm, "");
  // Remove multi-line comments
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove trailing commas before } or ]
  cleaned = cleaned.replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(cleaned);
}

function loadJSON(path: string): unknown {
  const content = readFileSync(path, "utf-8");
  if (path.endsWith(".jsonc")) return parseJSONC(content);
  return JSON.parse(content);
}

export function discoverConfigFiles(
  projectDir: string,
  configPath?: string,
): ConfigFile[] {
  const files: ConfigFile[] = [];

  // Explicit CLI config path (highest priority)
  if (configPath) {
    files.push({
      path: configPath,
      source: "cli",
      format: configPath.endsWith(".jsonc") ? "jsonc" : "json",
    });
  }

  // Project-level config
  for (const name of ["knowledge-compiler.jsonc", "knowledge-compiler.json"]) {
    const p = join(projectDir, name);
    if (existsSync(p)) {
      files.push({
        path: p,
        source: "project",
        format: name.endsWith(".jsonc") ? "jsonc" : "json",
      });
      break;
    }
  }

  // Home directory config
  const homeConfig = join(homedir(), ".kcrc");
  if (existsSync(homeConfig)) {
    const content = readFileSync(homeConfig, "utf-8");
    const format = content.trim().startsWith("{") ? "json" : "yaml";
    files.push({ path: homeConfig, source: "home", format });
  }

  return files;
}

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const overrideValue = override[key];
    const baseValue = result[key];
    if (
      overrideValue !== undefined &&
      overrideValue !== null &&
      typeof overrideValue === "object" &&
      !Array.isArray(overrideValue) &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue)
    ) {
      (result as any)[key] = deepMerge(baseValue as Record<string, unknown>, overrideValue as Record<string, unknown>);
    } else if (overrideValue !== undefined) {
      (result as any)[key] = overrideValue;
    }
  }
  return result;
}

export function mergeConfigs(
  base: CompilerConfig,
  override: Partial<CompilerConfig>,
): CompilerConfig {
  return deepMerge(base, override as Record<string, unknown>) as CompilerConfig;
}

export function loadConfig(options: LoadOptions = {}): CompilerConfig {
  const projectDir = options.projectDir ?? process.cwd();
  const configFiles = discoverConfigFiles(projectDir, options.configPath);

  // Start with defaults (parse schema with defaults)
  let config = CompilerConfigSchema.parse({});

  // Load each config file in order (defaults < project < home < cli)
  const sourceOrder = ["project", "home", "cli"];
  for (const source of sourceOrder) {
    const file = configFiles.find((f) => f.source === source);
    if (file) {
      try {
        const raw = loadJSON(file.path);
        const parsed = CompilerConfigSchema.safeParse(raw);
        if (parsed.success) {
          config = deepMerge(config, parsed.data as Record<string, unknown>);
        }
      } catch {
        // Silently skip invalid config files
      }
    }
  }

  // Apply CLI overrides
  if (options.overrides) {
    config = deepMerge(config, options.overrides as Record<string, unknown>);
  }

  return config;
}

export function loadEnvironmentOverrides(): Partial<CompilerConfig> {
  const env = process.env;
  const overrides: Partial<CompilerConfig> = {};

  for (const [key, value] of Object.entries(env)) {
    if (!key.startsWith("KC_")) continue;
    if (value === undefined) continue;

    const parts = key.slice(3).toLowerCase().split("_");
    let cursor: any = overrides;

    for (let i = 0; i < parts.length - 1; i++) {
      const current = cursor[parts[i]];
      if (!current || typeof current !== "object") {
        cursor[parts[i]] = {};
      }
      cursor = cursor[parts[i]];
    }

    const lastPart = parts[parts.length - 1];
    // Try to parse as number or boolean
    if (value === "true") cursor[lastPart] = true;
    else if (value === "false") cursor[lastPart] = false;
    else if (!isNaN(Number(value)) && value !== "") cursor[lastPart] = Number(value);
    else cursor[lastPart] = value;
  }

  return overrides;
}
