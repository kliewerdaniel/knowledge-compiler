import { createServer, type Server } from "node:http";
import { readFileSync, statSync, existsSync } from "node:fs";
import { join, resolve, extname } from "node:path";
import { logger } from "../logger.js";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
  ".wasm": "application/wasm",
  ".map": "application/json",
  ".bin": "application/octet-stream",
};

function getMimeType(filePath: string): string {
  const ext = extname(filePath).toLowerCase();
  return MIME_TYPES[ext] ?? "application/octet-stream";
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export interface ServeOptions {
  port?: number;
  host?: string;
}

export async function serveCommand(dir: string | undefined, options: ServeOptions = {}): Promise<void> {
  const port = options.port ?? 3000;
  const host = options.host ?? "localhost";
  const outputDir = dir ? resolve(dir) : resolve(process.cwd(), "dist");

  if (!existsSync(outputDir)) {
    logger.error(`Output directory not found: ${outputDir}`);
    logger.info("Run `kc compile` first to generate artifacts.");
    process.exitCode = 1;
    return;
  }

  const stat = statSync(outputDir);
  if (!stat.isDirectory()) {
    logger.error(`Path is not a directory: ${outputDir}`);
    process.exitCode = 1;
    return;
  }

  const server: Server = createServer((req, res) => {
    let urlPath = req.url ?? "/";

    if (urlPath === "/") {
      urlPath = "/index.html";
    }

    urlPath = decodeURIComponent(urlPath);

    const filePath = join(outputDir, urlPath.replace(/^\/+/, ""));

    try {
      const resolvedPath = resolve(filePath);
      if (!resolvedPath.startsWith(resolve(outputDir))) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      if (!existsSync(resolvedPath)) {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }

      const fileStat = statSync(resolvedPath);
      if (fileStat.isDirectory()) {
        const indexPath = join(resolvedPath, "index.html");
        if (existsSync(indexPath)) {
          const data = readFileSync(indexPath);
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(data);
        } else {
          res.writeHead(404);
          res.end("Directory listing not enabled");
        }
        return;
      }

      const data = readFileSync(resolvedPath);
      const contentType = getMimeType(resolvedPath);
      res.writeHead(200, {
        "Content-Type": contentType,
        "Content-Length": fileStat.size,
        "Cache-Control": "no-cache",
      });
      res.end(data);
    } catch (err) {
      res.writeHead(500);
      res.end(`Internal Server Error: ${(err as Error).message}`);
    }
  });

  return new Promise<void>((resolveServer) => {
    server.listen(port, host, () => {
      logger.success(`Knowledge compiler server started`);
      logger.info(`  Local:  http://${host}:${port}`);
      logger.info(`  Root:   ${outputDir}`);
      logger.dim(`  Press Ctrl+C to stop`);
    });

    const shutdown = () => {
      logger.info("\nShutting down server...");
      server.close(() => {
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  });
}
