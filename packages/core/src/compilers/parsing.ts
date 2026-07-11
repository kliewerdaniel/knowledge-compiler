import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import type { PassResult, CompilerPass, PassDescriptor } from "@knowledge-compiler/plugins";

type ResolvedFile = { filePath: string; content: string; checksum: string; mtime: number; size: number };

function passState(ctx: any, key: string): any { return ctx.getPassState(key); }
function setPassState(ctx: any, key: string, value: any): void { ctx.setPassState(key, value); }

export class GlobResolverPass implements CompilerPass {
  descriptor: PassDescriptor = {
    id: "glob-resolver", name: "Glob File Resolver", version: 1, phase: "PARSING",
    dependencies: [], optionalDependencies: [], executionPolicy: { type: "singleton" },
    config: { enabled: true, priority: 0, timeout: 30000, retryCount: 3, params: {}, onError: "fail" },
    cachePolicy: { read: false, write: false, ttl: 0 },
  };

  async initialize(_ctx: any): Promise<void> {}

  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const sourceConfig = ctx.config.source;
      const baseDir = sourceConfig.baseDir;
      const patterns = sourceConfig.patterns;
      const exclude = sourceConfig.exclude;

      let files: string[];
      try {
        const fg = await import("fast-glob") as any;
        files = await fg.default(patterns, { cwd: baseDir, ignore: exclude, onlyFiles: true, absolute: true });
      } catch {
        const fs = await import("node:fs/promises");
        const path = await import("node:path");
        files = await this.manualGlob(baseDir, patterns, exclude, fs, path);
      }

      const resolved: ResolvedFile[] = files.map((fp) => ({ filePath: fp, content: "", checksum: "", mtime: 0, size: 0 }));
      setPassState(ctx, "resolvedFiles", resolved);

      return { status: "success", data: { files, baseDir, patternCount: patterns.length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Glob resolution failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }

  private async manualGlob(baseDir: string, patterns: string[], exclude: string[], fs: any, path: any): Promise<string[]> {
    const results: string[] = [];
    const matchesPattern = (fp: string): boolean => patterns.some((p) => new RegExp("^" + p.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*").replace(/\?/g, ".") + "$").test(fp));
    const isExcluded = (fp: string): boolean => exclude.some((e) => new RegExp("^" + e.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*").replace(/\?/g, ".") + "$").test(fp));
    const walk = async (dir: string): Promise<void> => {
      let entries: any[]; try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return; }
      for (const entry of entries) {
        if (entry.name === "node_modules" || entry.name === ".git") continue;
        const fullPath = path.join(dir, entry.name);
        if (isExcluded(fullPath)) continue;
        if (entry.isDirectory()) await walk(fullPath);
        else if (entry.isFile() && matchesPattern(fullPath)) results.push(fullPath);
      }
    };
    await walk(baseDir);
    return results;
  }

  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class FileReaderPass implements CompilerPass {
  descriptor: PassDescriptor = {
    id: "file-reader", name: "File Reader", version: 1, phase: "PARSING",
    dependencies: ["glob-resolver"], optionalDependencies: [], executionPolicy: { type: "perDocument" },
    config: { enabled: true, priority: 1, timeout: 60000, retryCount: 3, params: {}, onError: "fail" },
    cachePolicy: { read: false, write: false, ttl: 0 },
  };

  async initialize(_ctx: any): Promise<void> {}

  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const fs = await import("node:fs/promises");
      const crypto = await import("node:crypto");
      const resolvedFiles = passState(ctx, "resolvedFiles") ?? [];
      const encoding = ctx.config.source.encoding;
      const files: ResolvedFile[] = [];

      for (const file of resolvedFiles) {
        try {
          const stat = await fs.stat(file.filePath);
          const content = await fs.readFile(file.filePath, encoding as BufferEncoding);
          const checksum = crypto.createHash("sha256").update(content).digest("hex");
          files.push({ filePath: file.filePath, content, checksum, mtime: stat.mtimeMs, size: stat.size });
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          return { status: "partial", data: { files, errors: [`${file.filePath}: ${error.message}`] }, errors: [], warnings: [`${file.filePath}: ${error.message}`] };
        }
      }

      setPassState(ctx, "readFiles", files);
      return { status: "success", data: { fileCount: files.length, totalBytes: files.reduce((s: number, f: ResolvedFile) => s + f.size, 0) }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`File reading failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }

  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class FrontmatterParserPass implements CompilerPass {
  descriptor: PassDescriptor = {
    id: "frontmatter-parser", name: "Frontmatter Parser", version: 1, phase: "PARSING",
    dependencies: ["file-reader"], optionalDependencies: [], executionPolicy: { type: "perDocument" },
    config: { enabled: true, priority: 2, timeout: 30000, retryCount: 3, params: {}, onError: "fail" },
    cachePolicy: { read: false, write: false, ttl: 0 },
  };

  async initialize(_ctx: any): Promise<void> {}

  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const readFiles = passState(ctx, "readFiles") ?? [];
      const frontmatterResults: Record<string, { filePath: string; frontmatter: Record<string, unknown>; bodyStartLine: number; hasFrontmatter: boolean }> = {};

      for (const file of readFiles) {
        try {
          const fmMatch = file.content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
          if (fmMatch) {
            const fmStr = fmMatch[1];
            let parsed: Record<string, unknown> = {};
            try {
              const yaml = require("js-yaml");
              parsed = (yaml.load(fmStr) as Record<string, unknown>) ?? {};
            } catch {
              parsed = this.parseSimpleYaml(fmStr);
            }
            const lines = file.content.split("\n");
            const bodyStartLine = lines.findIndex((line: string, i: number) => i > 0 && !line.startsWith("---"));
            frontmatterResults[file.filePath] = { filePath: file.filePath, frontmatter: parsed, bodyStartLine: bodyStartLine >= 0 ? bodyStartLine + 1 : 2, hasFrontmatter: true };
          } else {
            frontmatterResults[file.filePath] = { filePath: file.filePath, frontmatter: {}, bodyStartLine: 0, hasFrontmatter: false };
          }
        } catch {
          frontmatterResults[file.filePath] = { filePath: file.filePath, frontmatter: {}, bodyStartLine: 2, hasFrontmatter: false };
        }
      }

      setPassState(ctx, "frontmatterResults", frontmatterResults);
      const docWithFM = Object.values(frontmatterResults).filter((r: any) => r.hasFrontmatter).length;
      return { status: "success", data: { docWithFrontmatter: docWithFM, totalDocs: readFiles.length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Frontmatter parsing failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }

  private parseSimpleYaml(str: string): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const line of str.trim().split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const colonIdx = trimmed.indexOf(":");
       if (colonIdx > 0) {
        const key = trimmed.slice(0, colonIdx).trim();
        let value: any = trimmed.slice(colonIdx + 1).trim();
        if (value === "true") value = true;
        else if (value === "false") value = false;
        else if (/^\d+$/.test(value)) value = parseInt(value, 10);
        else if (/^\d+\.\d+$/.test(value)) value = parseFloat(value);
        else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
        result[key] = value;
      }
    }
    return result;
  }

  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class MDASTParserPass implements CompilerPass {
  descriptor: PassDescriptor = {
    id: "mdast-parser", name: "MDAST Parser", version: 1, phase: "PARSING",
    dependencies: ["frontmatter-parser"], optionalDependencies: [], executionPolicy: { type: "perDocument" },
    config: { enabled: true, priority: 3, timeout: 30000, retryCount: 3, params: {}, onError: "fail" },
    cachePolicy: { read: false, write: false, ttl: 0 },
  };

  async initialize(_ctx: any): Promise<void> {}

  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const readFiles = passState(ctx, "readFiles") ?? [];
      const fmResults = passState(ctx, "frontmatterResults") ?? {};
      const parseResult: Record<string, { filePath: string; ast: any; frontmatter: Record<string, unknown>; totalTokens: number }> = {};

      const processor = unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter);

      for (const file of readFiles) {
        try {
          const fm = fmResults[file.filePath]?.frontmatter ?? {};
          const tree = processor.parse(file.content);
          const serialized = processor.runSync(tree);
          parseResult[file.filePath] = {
            filePath: file.filePath, ast: { ...serialized, rawContent: file.content }, frontmatter: fm,
            totalTokens: estimateTokens(file.content),
          };
          ctx.getIRStore().setDocument(file.filePath, { ...serialized, rawContent: file.content });
          ctx.getIRStore().setDocumentMeta(file.filePath, { frontmatter: fm, filePath: file.filePath, checksum: file.checksum, mtime: file.mtime, size: file.size });
        } catch {
          parseResult[file.filePath] = { filePath: file.filePath, ast: { type: "root", children: [], rawContent: file.content }, frontmatter: {}, totalTokens: 0 };
          ctx.getIRStore().setDocument(file.filePath, { type: "root", children: [], rawContent: file.content });
        }
      }

      setPassState(ctx, "mdastResults", parseResult);
      const totalTokens = readFiles.reduce((sum: number, f: any) => sum + (parseResult[f.filePath]?.totalTokens ?? 0), 0);
      return { status: "success", data: { docsParsed: readFiles.length, totalTokens }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`MDAST parsing failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }

  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

function estimateTokens(text: string): number {
  const words = text.split(/\s+/).filter(Boolean);
  return Math.ceil(words.length * 1.3);
}
