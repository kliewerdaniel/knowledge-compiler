import cac from "cac";
import { compileCommand } from "./commands/compile.js";
import { serveCommand } from "./commands/serve.js";
import { inspectCommand } from "./commands/inspect.js";
import { initCommand } from "./commands/init.js";
import {
  cacheStatusCommand,
  cacheClearCommand,
  cachePruneCommand,
} from "./commands/cache.js";
import {
  pluginListCommand,
  pluginAddCommand,
  pluginRemoveCommand,
} from "./commands/plugin.js";
import { versionCommand } from "./commands/version.js";
import { logger } from "./logger.js";

const cli = cac("kc");

cli
  .command("[input]", "Compile markdown documents to knowledge artifacts")
  .option("-c, --config <path>", "Config file path")
  .option("-o, --out <dir>", "Output directory")
  .option("--passes <list>", "Comma-separated passes to run")
  .option("--skip-passes <list>", "Comma-separated passes to skip")
  .option("-v, --verbose", "Verbose output")
  .option("-q, --quiet", "Quiet output")
  .option("--watch", "Watch mode (recompile on file changes)")
  .action(async (input: string | undefined, options: Record<string, unknown>) => {
    await compileCommand({
      input,
      output: options.out as string | undefined,
      config: options.config as string | undefined,
      passes: options.passes ? (options.passes as string).split(",").map((s: string) => s.trim()) : undefined,
      skipPasses: options.skipPasses ? (options.skipPasses as string).split(",").map((s: string) => s.trim()) : undefined,
      verbose: options.verbose as boolean | undefined,
      quiet: options.quiet as boolean | undefined,
      watch: options.watch as boolean | undefined,
    });
  });

cli
  .command("serve [dir]", "Serve compiled knowledge artifacts as a web app")
  .option("-p, --port <port>", "Port number", { default: 3000 })
  .option("-H, --host <host>", "Host address", { default: "localhost" })
  .action(async (dir: string | undefined, options: Record<string, unknown>) => {
    await serveCommand(dir, {
      port: Number(options.port),
      host: options.host as string,
    });
  });

cli
  .command("inspect <file>", "Inspect compiled artifacts metadata and integrity")
  .action(async (file: string) => {
    await inspectCommand(file);
  });

cli
  .command("init", "Initialize a knowledge-compiler.json config file")
  .action(async () => {
    await initCommand();
  });

cli
  .command("cache status", "Show cache statistics")
  .action(async () => {
    await cacheStatusCommand();
  });

cli
  .command("cache clear", "Clear the entire cache")
  .action(async () => {
    await cacheClearCommand();
  });

cli
  .command("cache prune", "Remove expired cache entries")
  .action(async () => {
    await cachePruneCommand();
  });

cli
  .command("plugin list", "List installed plugins")
  .action(async () => {
    await pluginListCommand();
  });

cli
  .command("plugin add <name>", "Install a plugin")
  .action(async (name: string) => {
    await pluginAddCommand(name);
  });

cli
  .command("plugin remove <name>", "Remove a plugin")
  .action(async (name: string) => {
    await pluginRemoveCommand(name);
  });

cli
  .command("version", "Show version information")
  .action(() => {
    versionCommand();
  });

cli.help();
cli.version("0.1.0");

cli.on("command:unknown", (name: string) => {
  logger.error(`Unknown command: ${name}`);
  logger.info("Run `kc help` to see available commands.");
  process.exitCode = 1;
});

export function runCLI(argv: string[]): void {
  try {
    cli.parse(argv, { run: false });
    cli.runMatchedCommand();
  } catch (err) {
    if (err instanceof Error && err.message.includes("Unknown arguments")) {
      cli.outputHelp();
      process.exitCode = 1;
    } else {
      throw err;
    }
  }
}
