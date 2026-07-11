import { loadConfig, mergeConfigs, discoverConfigFiles, loadEnvironmentOverrides } from "./loader.js";
import { CompilerConfig, CompilerConfigSchema } from "./schema.js";

export interface ResolveOptions {
  configPath?: string;
  projectDir?: string;
  cliFlags?: Record<string, unknown>;
}

function applyCliFlags(config: CompilerConfig, flags: Record<string, unknown>): CompilerConfig {
  const normalized: Partial<CompilerConfig> = {};
  for (const [key, value] of Object.entries(flags)) {
    if (value === undefined || value === null) continue;
    normalized[key as keyof CompilerConfig] = value as any;
  }
  return mergeConfigs(config, normalized);
}

export function resolveConfig(options: ResolveOptions = {}): CompilerConfig {
  const config = loadConfig({
    configPath: options.configPath,
    projectDir: options.projectDir,
    overrides: loadEnvironmentOverrides(),
  });

  if (options.cliFlags && Object.keys(options.cliFlags).length > 0) {
    return applyCliFlags(config, options.cliFlags);
  }

  return config;
}

export { loadConfig, mergeConfigs, discoverConfigFiles, loadEnvironmentOverrides };
export type { ConfigFile, LoadOptions } from "./loader.js";
