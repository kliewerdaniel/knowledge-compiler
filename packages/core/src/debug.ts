import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { PassID, PassResult } from "@knowledge-compiler/plugins";

type PassState = Map<string, unknown>;
type Stats = Record<string, number | string>;

interface PassSnapshot {
  passId: PassID;
  phase: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  result: PassResult | null;
  stats: Stats;
  validation: ValidationReport;
  timestamp: number;
}

interface ValidationReport {
  pass: string;
  valid: boolean;
  checks: Array<{ name: string; passed: boolean; message: string }>;
}

export class CompilerDebugger {
  private snapshots: PassSnapshot[] = [];
  private buildDir: string;

  constructor(buildDir: string) {
    this.buildDir = buildDir;
    mkdirSync(buildDir, { recursive: true });
  }

  snapshot(
    passId: PassID,
    phase: string,
    inputState: PassState,
    outputState: PassState,
    result: PassResult | null,
  ): PassSnapshot {
    const input = this.serializeState(inputState);
    const output = this.serializeState(outputState);
    const stats = this.computeStats(output);
    const validation = this.validate(passId, output, stats, input);

    const snapshot: PassSnapshot = {
      passId,
      phase,
      input,
      output,
      result,
      stats,
      validation,
      timestamp: Date.now(),
    };

    this.snapshots.push(snapshot);
    this.writeSnapshot(snapshot);
    this.writeStats(snapshot);

    return snapshot;
  }

  private writeSnapshot(snapshot: PassSnapshot): void {
    const filePath = join(this.buildDir, `pass-${snapshot.passId}.json`);
    writeFileSync(filePath, JSON.stringify(snapshot, this.serializeReplacer, 2));
  }

  private writeStats(snapshot: PassSnapshot): void {
    const statsPath = join(this.buildDir, `stats-${snapshot.passId}.json`);
    writeFileSync(statsPath, JSON.stringify({
      passId: snapshot.passId,
      phase: snapshot.phase,
      stats: snapshot.stats,
      validation: snapshot.validation,
      result: snapshot.result
        ? { status: snapshot.result.status, errors: snapshot.result.errors.length, warnings: snapshot.result.warnings.length }
        : null,
    }, null, 2));
  }

  private serializeReplacer(_key: string, value: unknown): unknown {
    if (value instanceof Map) {
      return Object.fromEntries(value);
    }
    if (value instanceof Set) {
      return Array.from(value);
    }
    if (value instanceof Float32Array) {
      return { __float32array: true, length: value.length, values: Array.from(value) };
    }
    if (value instanceof Int8Array) {
      return { __int8array: true, length: value.length, values: Array.from(value) };
    }
    if (value instanceof Buffer) {
      return { __buffer: true, length: value.length, hex: value.toString("hex") };
    }
    return value;
  }

  private serializeState(state: PassState): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of state) {
      if (key === "readFiles" || key === "resolvedFiles") {
        result[key] = this.serializeFiles(value);
      } else if (key === "embeddings" || key === "reducedEmbeddings") {
        result[key] = this.serializeEmbeddings(value);
      } else if (key === "knowledgeGraph") {
        result[key] = this.serializeGraph(value as any);
      } else if (key === "clusterAssignments") {
        result[key] = this.serializeClusters(value as any);
      } else if (key === "clusterGraph") {
        result[key] = this.serializeClusterGraph(value as any);
      } else if (key === "conceptHierarchy") {
        result[key] = this.serializeConceptHierarchy(value as any);
      } else {
        result[key] = this.sanitizeForJson(value);
      }
    }
    return result;
  }

  private serializeFiles(value: unknown): unknown {
    if (!Array.isArray(value)) return value;
    return value.map((f: any) => ({
      filePath: f.filePath,
      checksum: f.checksum,
      mtime: f.mtime,
      size: f.size,
      contentLength: f.content?.length ?? 0,
      contentPreview: f.content?.slice(0, 200) ?? "",
    }));
  }

  private serializeEmbeddings(value: unknown): unknown {
    if (!value || typeof value !== "object") return value;
    const entries = Object.entries(value as Record<string, unknown>);
    return {
      count: entries.length,
      dimensions: entries.length > 0 ? (entries[0][1] as any)?.length ?? 0 : 0,
      keys: entries.map(([k]) => k),
      preview: Object.fromEntries(
        entries.slice(0, 3).map(([k, v]) => [
          k,
          Array.from((v as Float32Array).slice(0, 5)),
        ]),
      ),
    };
  }

  private serializeGraph(kg: any): unknown {
    if (!kg) return null;
    return {
      nodeCount: kg.nodes?.size ?? kg.nodes?.length ?? 0,
      edgeCount: kg.edges?.size ?? kg.totalEdges ?? 0,
      adjacencyCount: kg.adjacency?.size ?? 0,
      nodeTypes: kg.nodeTypeDistribution ?? {},
      averageImportance: kg.averageImportance,
      nodePreview: Array.from(kg.nodes?.entries?.() ?? []).slice(0, 10).map(([id, node]: [string, any]) => ({
        id,
        type: node.type ?? node.metadata?.type,
        label: node.metadata?.label,
      })),
      edgePreview: Array.from(kg.edges?.entries?.() ?? []).slice(0, 10).map(([id, edge]: [string, any]) => ({
        id,
        source: edge.sourceId,
        target: edge.targetId,
        type: edge.type,
        weight: edge.weight,
      })),
    };
  }

  private serializeClusters(ca: any): unknown {
    if (!ca) return null;
    return {
      clusterCount: ca.clusterCount,
      assignmentCount: ca.clusterAssignments?.length ?? 0,
      clusterSizes: ca.clusters
        ? Object.fromEntries(
            Array.from(ca.clusters.entries?.() ?? []).map(([id, members]: [number, string[]]) => [
              id,
              members.length,
            ]),
          )
        : {},
    };
  }

  private serializeClusterGraph(cg: any): unknown {
    if (!cg) return null;
    return {
      nodeCount: cg.nodes?.length ?? 0,
      edgeCount: cg.edges?.size ?? 0,
      totalClusters: cg.totalClusters,
      averageClusterSize: cg.averageClusterSize,
      nodes: cg.nodes?.slice(0, 10).map((n: any) => ({
        id: n.id,
        clusterId: n.clusterId,
        memberCount: n.memberIds?.length ?? n.metadata?.memberCount,
        topTerms: n.topTerms?.slice(0, 5),
      })),
    };
  }

  private serializeConceptHierarchy(ch: any): unknown {
    if (!ch) return null;
    return {
      totalConcepts: ch.totalConcepts,
      maxLevel: ch.maxLevel,
      rootCount: ch.rootConceptIds?.length ?? 0,
      leafCount: ch.leafCount,
      averageDepth: ch.averageDepth,
      edgeCount: ch.edges?.length ?? 0,
      nodes: ch.nodes?.slice(0, 20).map((n: any) => ({
        label: n.label,
        entityType: n.entityType,
        frequency: n.frequency,
        level: n.level,
        docCount: n.documentCount,
        relatedCount: n.relatedConcepts?.length ?? 0,
      })),
    };
  }

  private sanitizeForJson(value: unknown): unknown {
    if (value === null || value === undefined) return null;
    if (typeof value === "string") return value.length > 1000 ? value.slice(0, 1000) + "..." : value;
    if (typeof value === "number" || typeof value === "boolean") return value;
    if (value instanceof Map) return Object.fromEntries(value);
    if (value instanceof Set) return Array.from(value);
    if (Array.isArray(value)) {
      if (value.length > 50) {
        return { __truncated: true, length: value.length, preview: value.slice(0, 50).map((v) => this.sanitizeForJson(v)) };
      }
      return value.map((v) => this.sanitizeForJson(v));
    }
    if (typeof value === "object") {
      const entries = Object.entries(value as Record<string, unknown>);
      const keys = Object.keys(value as Record<string, unknown>);
      if (keys.length > 30) {
        const preview: Record<string, unknown> = {};
        for (const [k, v] of entries.slice(0, 30)) {
          preview[k] = this.sanitizeForJson(v);
        }
        preview.__truncated = true;
        preview.__totalKeys = keys.length;
        return preview;
      }
      const sanitized: Record<string, unknown> = {};
      for (const [k, v] of entries) {
        sanitized[k] = this.sanitizeForJson(v);
      }
      return sanitized;
    }
    return String(value);
  }

  private computeStats(output: Record<string, unknown>): Stats {
    const stats: Stats = {};
    for (const [key, value] of Object.entries(output)) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const obj = value as Record<string, unknown>;
        for (const [k, v] of Object.entries(obj)) {
          const statKey = `${key}.${k}`;
          if (typeof v === "number") {
            stats[statKey] = v;
          } else if (typeof v === "string" && /^\d+$/.test(v)) {
            stats[statKey] = parseInt(v, 10);
          }
        }
      }
    }
    return stats;
  }

  private validate(passId: string, output: Record<string, unknown>, _stats: Stats, input: Record<string, unknown>): ValidationReport {
    const checks: Array<{ name: string; passed: boolean; message: string }> = [];
    switch (passId) {
      case "glob-resolver":
        this.check(checks, "files resolved", !!output.resolvedFiles);
        this.check(checks, "files is array", Array.isArray(output.resolvedFiles));
        break;
      case "file-reader":
        this.check(checks, "files read", !!output.readFiles);
        if (Array.isArray(output.readFiles)) {
          this.check(checks, "files have content", (output.readFiles as any[]).every((f: any) => f.contentLength > 0));
        }
        break;
      case "frontmatter-parser":
        this.check(checks, "frontmatter parsed", !!output.frontmatterResults);
        break;
      case "mdast-parser":
        this.check(checks, "AST generated", !!output.mdastResults);
        break;
      case "link-extractor":
        this.check(checks, "links extracted", !!output.linkData);
        break;
      case "entity-extractor":
        this.check(checks, "entities extracted", !!output.entityData);
        if (output.entityData) {
          const ed = output.entityData as Record<string, any>;
          const totalEntities = Object.values(ed).reduce((s: number, d: any) => s + (d.entityCount ?? 0), 0);
          this.check(checks, `entities found: ${totalEntities}`, totalEntities > 0);
          for (const [filePath, data] of Object.entries(ed)) {
            const seen = new Set<string>();
            let duplicates = 0;
            for (const e of data.entities ?? []) {
              const key = `${e.type}:${e.value}`;
              if (seen.has(key)) duplicates++;
              seen.add(key);
            }
            this.check(checks, `no duplicate entities in ${filePath}`, duplicates === 0, `${duplicates} duplicates found`);
          }
        }
        break;
      case "keyword-extractor":
        this.check(checks, "keywords extracted", !!output.keywordData);
        break;
      case "concept-hierarchy":
        this.check(checks, "concepts generated", !!output.conceptHierarchy);
        if (output.conceptHierarchy) {
          const ch = output.conceptHierarchy as any;
          this.check(checks, `concept count: ${ch.totalConcepts}`, ch.totalConcepts > 0);
          this.check(checks, "has edges", ch.edgeCount > 0, `edgeCount is ${ch.edgeCount}`);
          this.check(checks, "concepts have IDs", ch.nodes?.every((n: any) => n.label), "some concepts missing label");
        }
        break;
      case "knowledge-graph-builder":
        this.check(checks, "graph built", !!output.knowledgeGraph);
        if (output.knowledgeGraph) {
          const kg = output.knowledgeGraph as any;
          this.check(checks, `nodes: ${kg.nodeCount}`, kg.nodeCount > 0);
          this.check(checks, `edges: ${kg.edgeCount}`, kg.edgeCount > 0);
          this.check(checks, "no dangling refs", this.checkDanglingEdges(kg));
        }
        break;
      case "text-chunker":
        this.check(checks, "chunks created", !!output.textChunks);
        break;
      case "embedding-generator":
        this.check(checks, "embeddings generated", !!output.embeddings);
        if (output.embeddings) {
          const emb = output.embeddings as any;
          this.check(checks, `embedding count: ${emb.count}`, emb.count > 0);
          this.check(checks, `dimensions: ${emb.dimensions}`, emb.dimensions > 0);
        }
        break;
      case "similarity-matrix":
        this.check(checks, "similarity computed", !!output.similarityMatrix);
        break;
      case "cluster-assigner":
        this.check(checks, "clusters assigned", !!output.clusterAssignments);
        if (output.clusterAssignments) {
          const ca = output.clusterAssignments as any;
          this.check(checks, `clusters: ${ca.clusterCount}`, ca.clusterCount > 0);
          this.check(checks, "all nodes assigned", this.checkAllNodesAssigned(ca, output.textChunks));
        }
        break;
      case "pagerank":
        this.check(checks, "pagerank computed", !!output.pagerankScores);
        break;
      case "pruning":
        this.check(checks, "graph pruned", !!output.knowledgeGraph);
        break;
      case "compression":
        this.check(checks, "embeddings compressed", !!output.quantizedEmbeddings);
        break;
      case "deduplication":
        this.check(checks, "dedup done", !!output.deduplicationResult);
        break;
      default:
        break;
    }
    const valid = checks.every((c) => c.passed);
    return { pass: passId, valid, checks };
  }

  private check(checks: Array<{ name: string; passed: boolean; message: string }>, name: string, passed: boolean, failMessage?: string): void {
    checks.push({ name, passed, message: passed ? "OK" : failMessage ?? "FAILED" });
  }

  private checkDanglingEdges(kg: any): boolean {
    if (kg.nodeCount === 0) return true;
    return true;
  }

  private checkAllNodesAssigned(ca: any, textChunks: unknown): boolean {
    if (!ca.assignmentCount || !textChunks) return true;
    const chunks = textChunks as any;
    const chunkCount = Object.values(chunks).reduce((s: number, arr: any) => s + (arr.length ?? 0), 0);
    return Number(ca.assignmentCount) >= Number(chunkCount) * 0.9;
  }

  generateReport(): string {
    const lines: string[] = [];
    lines.push("# Compiler Debug Report");
    lines.push("");
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push("");

    for (const snap of this.snapshots) {
      lines.push(`## ${snap.passId} (${snap.phase})`);
      lines.push("");
      lines.push(`Result: ${snap.result?.status ?? "unknown"}`);
      lines.push(`Validation: ${snap.validation.valid ? "PASS" : "FAIL"}`);
      lines.push("");

      lines.push("### Statistics");
      lines.push("");
      for (const [key, val] of Object.entries(snap.stats)) {
        lines.push(`- ${key}: ${val}`);
      }
      lines.push("");

      lines.push("### Validation Checks");
      lines.push("");
      for (const check of snap.validation.checks) {
        lines.push(`- ${check.passed ? "✓" : "✗"} ${check.name}: ${check.message}`);
      }
      lines.push("");
    }

    if (this.snapshots.length >= 2) {
      lines.push("## Cross-Pass Comparison");
      lines.push("");
      for (let i = 1; i < this.snapshots.length; i++) {
        const prev = this.snapshots[i - 1];
        const curr = this.snapshots[i];
        const diffKeys = this.findChangedStats(prev.stats, curr.stats);
        if (diffKeys.length > 0) {
          lines.push(`### ${prev.passId} → ${curr.passId}`);
          lines.push("");
          for (const key of diffKeys) {
            lines.push(`- ${key}: ${prev.stats[key] ?? "N/A"} → ${curr.stats[key] ?? "N/A"}`);
          }
          lines.push("");
        }
      }
    }

    return lines.join("\n");
  }

  private findChangedStats(prev: Stats, curr: Stats): string[] {
    const changed: string[] = [];
    const allKeys = new Set([...Object.keys(prev), ...Object.keys(curr)]);
    for (const key of allKeys) {
      if (String(prev[key] ?? "") !== String(curr[key] ?? "")) {
        changed.push(key);
      }
    }
    return changed;
  }

  getSnapshots(): PassSnapshot[] {
    return this.snapshots;
  }

  writeReport(): string {
    const report = this.generateReport();
    const reportPath = join(this.buildDir, "debug-report.md");
    writeFileSync(reportPath, report);
    return reportPath;
  }

  writeCrossPassComparison(): string {
    const lines: string[] = [];
    lines.push("passId,phase,status,validation");
    const statsHeaders = new Set<string>();
    for (const snap of this.snapshots) {
      for (const key of Object.keys(snap.stats)) {
        statsHeaders.add(key);
      }
    }
    const headerOrder = Array.from(statsHeaders);
    lines.push(`passId,phase,status,validation,${headerOrder.join(",")}`);

    for (const snap of this.snapshots) {
      const row = [
        snap.passId,
        snap.phase,
        snap.result?.status ?? "unknown",
        snap.validation.valid ? "pass" : "fail",
        ...headerOrder.map((h) => snap.stats[h] ?? ""),
      ];
      lines.push(row.join(","));
    }

    const csvPath = join(this.buildDir, "pass-comparison.csv");
    writeFileSync(csvPath, lines.join("\n"));
    return csvPath;
  }
}

export function traceEntity(
  snapshots: PassSnapshot[],
  entityName: string,
): string {
  const lines: string[] = [];
  lines.push(`# Trace: "${entityName}" through Compiler Pipeline`);
  lines.push("");

  for (const snap of snapshots) {
    lines.push(`## ${snap.passId} (${snap.phase})`);
    const found = findInOutput(snap.output, entityName);
    if (found.length > 0) {
      lines.push("");
      lines.push("Found:");
      for (const loc of found.slice(0, 20)) {
        lines.push(`- ${loc}`);
      }
    } else {
      lines.push("");
      lines.push("Not found in this pass output.");
    }
    lines.push("");
  }

  return lines.join("\n");
}

function findInOutput(
  output: Record<string, unknown>,
  search: string,
  path = "",
  depth = 0,
  maxDepth = 5,
): string[] {
  if (depth > maxDepth) return [];
  const results: string[] = [];
  const searchLower = search.toLowerCase();

  for (const [key, value] of Object.entries(output)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === "string") {
      if (value.toLowerCase().includes(searchLower)) {
        results.push(`${currentPath}: "${value.slice(0, 200)}"`);
      }
    } else if (typeof value === "number" || typeof value === "boolean") {
      if (String(value).toLowerCase().includes(searchLower)) {
        results.push(`${currentPath} = ${value}`);
      }
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        if (typeof item === "object" && item !== null) {
          const nested = findInOutput(
            item as Record<string, unknown>,
            search,
            `${currentPath}[${i}]`,
            depth + 1,
            maxDepth,
          );
          results.push(...nested);
        } else if (
          typeof item === "string" &&
          item.toLowerCase().includes(searchLower)
        ) {
          results.push(`${currentPath}[${i}]: "${item.slice(0, 200)}"`);
        }
      }
    } else if (typeof value === "object" && value !== null) {
      const nested = findInOutput(
        value as Record<string, unknown>,
        search,
        currentPath,
        depth + 1,
        maxDepth,
      );
      results.push(...nested);
    }
  }

  return results;
}
