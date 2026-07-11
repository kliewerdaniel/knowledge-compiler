# Knowledge Compiler — Testing Strategy

> **Version:** 1.0.0
> **Audience:** Test Engineers, Contributors
> **Last Updated:** 2026-07-10

---

## 1. Testing Philosophy

The Knowledge Compiler is tested at four distinct levels, each with specific goals and guarantees:

| Level | Goal | What It Catches |
|---|---|---|
| **Unit** | Each pass is correct in isolation | Logic bugs, edge cases, schema violations |
| **Integration** | Passes compose correctly | Data contract violations, ordering bugs |
| **System** | Full compilation produces correct output | Regression, determinism, performance |
| **Frontend** | Visualization renders correct artifacts | Rendering bugs, data shape mismatches |

**Core principles:**

1. **Test the compiler like a compiler.** Use golden tests (expected output artifacts), IR snapshot tests (intermediate state after each pass), and diff tests (incremental == full). A compiler must produce identical output for identical input.

2. **Test the frontend like a static app.** All visualization tests use pre-compiled artifact fixtures. No compiler runtime is needed. Components are tested with mock `ArtifactReader` instances.

3. **Test plugins with a plugin test harness.** Plugins receive a sandboxed `PluginContext` with a mock IR store. Tests verify hooks fire in correct order and output matches expected IR mutations.

4. **Determinism is not optional.** Compiling the same corpus twice must produce byte-identical artifacts. Every test run verifies this.

---

## 2. Test Categories

### 2.1 Unit Tests

**Scope:** Individual passes, utility functions, IR validation, schema validation, config parsing, cache logic.

**Test runner configuration:**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    exclude: ['src/**/*.integration.test.ts', 'src/**/*.e2e.test.ts'],
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'src/**/*.integration.test.ts'],
      thresholds: {
        statements: 85,
        branches: 80,
        functions: 85,
        lines: 85,
      },
    },
    setupFiles: ['./test/setup/unit.ts'],
  },
});
```

**Examples:**

```typescript
// ── Pass Test ────────────────────────────────────────────────

import { describe, it, expect, beforeEach } from 'vitest';
import { frontmatterParsingPass } from '@/passes/frontmatter-parser';
import { createMockContext } from '@/test/mocks/context';
import { createMockDocument } from '@/test/mocks/documents';

describe('FrontmatterParser', () => {
  let ctx: MockCompilerContext;

  beforeEach(() => {
    ctx = createMockContext({
      config: {
        frontmatter: {
          schema: z.object({
            title: z.string(),
            tags: z.array(z.string()).default([]),
          }),
        },
      },
    });
  });

  it('extracts title and tags from valid frontmatter', async () => {
    ctx.addDocument(createMockDocument({
      content: `---
title: My Document
tags: [test, docs]
---

Document body here.`,
    }));

    await frontmatterParsingPass(ctx);

    const doc = ctx.ir.getFirstDocument();
    expect(doc.frontmatter.title).toBe('My Document');
    expect(doc.frontmatter.tags).toEqual(['test', 'docs']);
  });

  it('infers title from first heading when frontmatter missing', async () => {
    ctx.addDocument(createMockDocument({
      content: `# My Inferred Title\n\nBody content.`,
    }));

    await frontmatterParsingPass(ctx);

    const doc = ctx.ir.getFirstDocument();
    expect(doc.frontmatter.title).toBe('My Inferred Title');
  });

  it('emits warning for malformed YAML', async () => {
    ctx.addDocument(createMockDocument({
      content: `---
title: unclosed
tags: [broken
---

Body`,
    }));

    await frontmatterParsingPass(ctx);

    expect(ctx.errors.warnings).toHaveLength(1);
    expect(ctx.errors.warnings[0].code).toBe('MALFORMED_YAML');
  });

  it('handles empty frontmatter gracefully', async () => {
    ctx.addDocument(createMockDocument({
      content: `---
---

Body content.`,
    }));

    await frontmatterParsingPass(ctx);

    const doc = ctx.ir.getFirstDocument();
    expect(doc.frontmatter.title).toBeDefined();
  });

  it('strips frontmatter from body content', async () => {
    ctx.addDocument(createMockDocument({
      content: `---
title: Test
---

Actual body content.`,
    }));

    await frontmatterParsingPass(ctx);

    const doc = ctx.ir.getFirstDocument();
    expect(doc.bodyContent).not.toContain('title:');
    expect(doc.bodyContent).toContain('Actual body content');
  });
});
```

```typescript
// ── Utility Test ─────────────────────────────────────────────

import { describe, it, expect } from 'vitest';
import { computeCacheKey } from '@/cache/key';
import { SHA256 } from '@/utils/hash';

describe('computeCacheKey', () => {
  it('produces deterministic keys for same input', () => {
    const passId = 'embedding-generator';
    const input = { contentHash: 'abc123', depHash: 'def456' };

    const key1 = computeCacheKey(passId, input);
    const key2 = computeCacheKey(passId, input);

    expect(key1).toBe(key2);
  });

  it('produces different keys for different inputs', () => {
    const passId = 'embedding-generator';

    const key1 = computeCacheKey(passId, { contentHash: 'abc', depHash: 'def' });
    const key2 = computeCacheKey(passId, { contentHash: 'xyz', depHash: 'def' });

    expect(key1).not.toBe(key2);
  });

  it('includes schema version in the hash', () => {
    const key1 = computeCacheKey('test', { contentHash: 'a', depHash: 'b' }, 1);
    const key2 = computeCacheKey('test', { contentHash: 'a', depHash: 'b' }, 2);

    expect(key1).not.toBe(key2);
  });

  it('handles empty hashes', () => {
    expect(() => computeCacheKey('test', { contentHash: '', depHash: '' })).not.toThrow();
  });
});
```

### 2.2 Integration Tests

**Scope:** Multi-pass pipeline execution, full compilation of small corpus, cache + incremental build, plugin integration, embedding provider mock.

```typescript
// ── Multi-Pass Pipeline Test ─────────────────────────────────

import { describe, it, expect } from 'vitest';
import { PipelineOrchestrator } from '@/pipeline/orchestrator';
import { createTestCorpus } from '@/test/fixtures/corpus';
import { withFreshCache } from '@/test/utils/cache';

describe('Parsing → Analysis Pipeline', () => {
  it('produces correct IR after parsing → section extraction → link analysis', async () => {
    const corpus = createTestCorpus('minimal'); // 5 docs, simple structure
    const orchestrator = new PipelineOrchestrator();

    const result = await orchestrator.execute({
      sources: corpus.paths,
      phases: ['PARSING', 'ANALYSIS'],
    });

    expect(result.ir.documents.size).toBe(5);
    expect(result.ir.sections.size).toBeGreaterThan(10);
    expect(result.ir.edges.size).toBeGreaterThan(5);
    expect(result.ir.concepts.size).toBeGreaterThan(3);
  });

  it('preserves IR invariants after each phase', async () => {
    const corpus = createTestCorpus('standard');
    const orchestrator = new PipelineOrchestrator();

    const result = await orchestrator.execute({
      sources: corpus.paths,
    });

    // Invariant: Every section references an existing document
    for (const [sectionId, section] of result.ir.sections) {
      expect(result.ir.documents.has(section.documentId)).toBe(true);
    }

    // Invariant: Every edge references existing source/target nodes
    for (const edge of result.ir.edges) {
      expect(
        result.ir.documents.has(edge.sourceId) ||
        result.ir.sections.has(edge.sourceId) ||
        result.ir.concepts.has(edge.sourceId)
      ).toBe(true);
      expect(
        result.ir.documents.has(edge.targetId) ||
        result.ir.sections.has(edge.targetId) ||
        result.ir.concepts.has(edge.targetId)
      ).toBe(true);
    }
  });
});
```

```typescript
// ── Full Compilation Test ────────────────────────────────────

import { describe, it, expect } from 'vitest';
import { compile } from '@/index';
import { ArtifactReader } from '@knowledge-compiler/artifacts';

describe('Full Compilation (standard corpus)', () => {
  it('produces all expected artifacts', async () => {
    const report = await compile({
      sources: ['test/corpora/standard/content/**/*.md'],
      outputDir: '.knowledge-test/full-compile',
      embeddings: true,
      clustering: true,
    });

    expect(report.success).toBe(true);
    expect(report.artifactCount).toBeGreaterThan(5);

    const reader = new ArtifactReader(report.outputDir);
    const manifest = await reader.readManifest();

    expect(manifest.artifacts).toHaveProperty('knowledge.json');
    expect(manifest.artifacts).toHaveProperty('graph.json');
    expect(manifest.artifacts).toHaveProperty('entities.json');
    expect(manifest.artifacts).toHaveProperty('clusters.json');
    expect(manifest.artifacts).toHaveProperty('concepts.json');
    expect(manifest.artifacts).toHaveProperty('navigation.json');
  });

  it('produces valid knowledge graph', async () => {
    const reader = new ArtifactReader('.knowledge-test/full-compile');
    const knowledge = await reader.readKnowledge();

    expect(knowledge.nodes.length).toBeGreaterThan(0);
    expect(knowledge.edges.length).toBeGreaterThan(0);

    // Every edge connects existing nodes
    const nodeIds = new Set(knowledge.nodes.map((n) => n.id));
    for (const edge of knowledge.edges) {
      expect(nodeIds.has(edge.sourceId)).toBe(true);
      expect(nodeIds.has(edge.targetId)).toBe(true);
    }
  });

  it('produces valid visual graph with positions', async () => {
    const reader = new ArtifactReader('.knowledge-test/full-compile');
    const graph = await reader.readGraph();

    expect(graph.nodes.length).toBeGreaterThan(0);
    expect(graph.edges.length).toBeGreaterThan(0);

    // Each node should have a position
    for (const node of graph.nodes) {
      expect(node.position).toBeDefined();
      expect(typeof node.position!.x).toBe('number');
      expect(typeof node.position!.y).toBe('number');
    }
  });
});
```

```typescript
// ── Cache + Incremental Build Test ───────────────────────────

import { describe, it, expect } from 'vitest';
import { compile } from '@/index';
import { withFreshCache, modifyFile, deleteFile } from '@/test/utils/fs';

describe('Incremental Compilation', () => {
  it('incremental build is identical to full rebuild', async () => {
    const corpus = 'test/corpora/standard';

    // Full build
    const fullReport = await compile({
      sources: [`${corpus}/content/**/*.md`],
      outputDir: '.knowledge-test/incremental/full',
      mode: 'full',
    });

    // Incremental build (no changes)
    const incReport = await compile({
      sources: [`${corpus}/content/**/*.md`],
      outputDir: '.knowledge-test/incremental/inc',
      mode: 'incremental',
    });

    // Both should produce identical artifacts
    const fullReader = new ArtifactReader('.knowledge-test/incremental/full');
    const incReader = new ArtifactReader('.knowledge-test/incremental/inc');

    const fullGraph = await fullReader.readGraph();
    const incGraph = await incReader.readGraph();

    expect(fullGraph.nodes).toEqual(incGraph.nodes);
    expect(fullGraph.edges).toEqual(incGraph.edges);
  });

  it('recompiles only affected passes after file modification', async () => {
    const report = await compile({
      sources: ['test/corpora/standard/content/**/*.md'],
      outputDir: '.knowledge-test/incremental/modified',
      mode: 'incremental',
      cache: true,
    });

    // Modify a file
    modifyFile('test/corpora/standard/content/doc-1.md', '## New Heading\n\nNew content');

    const incReport = await compile({
      sources: ['test/corpora/standard/content/**/*.md'],
      outputDir: '.knowledge-test/incremental/modified',
      mode: 'incremental',
      cache: true,
    });

    // Cache hit rate should be high (>80%) since only one file changed
    expect(incReport.cache.hitRate).toBeGreaterThan(0.8);

    // Only parsing passes should have executed (not clustering, etc.)
    const executedPasses = incReport.phases.flatMap((p) => p.passes).filter((p) => p.status !== 'skipped');
    expect(executedPasses.length).toBeLessThan(5);
  });

  it('handles file deletion gracefully', async () => {
    const report = await compile({
      sources: ['test/corpora/standard/content/**/*.md'],
      outputDir: '.knowledge-test/incremental/deleted',
      mode: 'incremental',
    });

    deleteFile('test/corpora/standard/content/doc-2.md');

    const incReport = await compile({
      sources: ['test/corpora/standard/content/**/*.md'],
      outputDir: '.knowledge-test/incremental/deleted',
      mode: 'incremental',
    });

    expect(incReport.success).toBe(true);
    expect(incReport.sources.total).toBe(report.sources.total - 1);
  });
});
```

### 2.3 Regression Tests

**Scope:** Every bug fix includes a regression test. Known edge cases tested. Performance regression detection.

```typescript
// ── Regression Test Pattern ──────────────────────────────────

import { describe, it, expect } from 'vitest';

// File: test/regressions/PR-142-unclosed-code-block.test.ts
// PR: https://github.com/knowledge-compiler/knowledge-compiler/pull/142
// Bug: Parser crashed on unclosed code blocks

describe('Regression: PR-142 — unclosed code block', () => {
  it('does not crash on unclosed triple-backtick code block', async () => {
    const ctx = createMockContext();
    ctx.addDocument(createMockDocument({
      content: `# Test\n\nSome text\n\n\`\`\`\nunclosed code block`,
    }));

    const result = await mdastParsingPass(ctx);

    expect(result.status).toBe('degraded'); // Should not be fatal
    expect(ctx.ir.documents.size).toBe(1);
    expect(ctx.ir.sections.size).toBeGreaterThan(0);
  });

  it('does not crash on unclosed indented code block', async () => {
    const ctx = createMockContext();
    ctx.addDocument(createMockDocument({
      content: `# Test\n\n    unclosed indented code\n\nMore text`,
    }));

    const result = await mdastParsingPass(ctx);

    expect(result.status).toBe('success');
  });
});
```

### 2.4 Snapshot Tests

**Scope:** IR snapshots after each pass, artifact snapshots, CLI output snapshots.

```typescript
import { describe, it, expect } from 'vitest';
import { runPipelineToPhase } from '@/test/utils/pipeline';
import { irSnapshotSerializer } from '@/test/serializers/ir';

// Register custom serializer
expect.addSnapshotSerializer(irSnapshotSerializer);

describe('IR Snapshots', () => {
  it('IR state after PARSING phase matches snapshot', async () => {
    const ir = await runPipelineToPhase('test/corpora/standard', 'PARSING');

    // Snapshot key: corpus SHA + phase name
    expect(ir).toMatchSnapshot('parsing-phase-ir', {
      // Ignore timestamps in snapshot
      documents: expect.arrayContaining([
        expect.objectContaining({ createdAt: expect.any(Number) }),
      ]),
    });
  });

  it('IR state after ANALYSIS phase matches snapshot', async () => {
    const ir = await runPipelineToPhase('test/corpora/standard', 'ANALYSIS');

    expect(ir).toMatchSnapshot('analysis-phase-ir');
  });

  it('IR state after EMBEDDING phase matches snapshot', async () => {
    const ir = await runPipelineToPhase('test/corpora/standard', 'EMBEDDING');

    expect(ir).toMatchSnapshot('embedding-phase-ir', {
      // Embedding vectors are large binary arrays — serialize as hashes
      sections: expect.arrayContaining([
        expect.objectContaining({
          embeddingHash: expect.any(String),
        }),
      ]),
    });
  });
});
```

**CLI Output Snapshots:**

```typescript
import { describe, it, expect } from 'vitest';
import { runCLI } from '@knowledge-compiler/cli';

describe('CLI Snapshot Tests', () => {
  it('kc help output matches snapshot', async () => {
    const exitCode = await runCLI(['help']);
    const output = captureStdout();

    expect(output).toMatchSnapshot('cli-help-output');
  });

  it('kc inspect entities --json matches snapshot', async () => {
    await runCLI(['compile', 'test/corpora/standard/content']);
    const exitCode = await runCLI(['inspect', 'entities', '--json', '--limit', '5']);
    const output = captureStdout();

    expect(JSON.parse(output)).toMatchSnapshot('cli-inspect-entities');
  });
});
```

### 2.5 Golden Artifact Tests

**Scope:** Pre-approved "golden" artifact sets. Determinism verification. Platform-independent hashing.

```typescript
// ── Golden Test Infrastructure ───────────────────────────────

import { describe, it, expect } from 'vitest';
import { compile } from '@/index';
import { readFile, readJSON } from '@/test/utils/fs';

interface GoldenTestCase {
  name: string;
  corpus: string;
  config?: Partial<CompilerConfig>;
  goldenDir: string;
  ignoreFields?: string[]; // Fields that differ per-run (timestamps, versions)
}

const GOLDEN_TESTS: GoldenTestCase[] = [
  {
    name: 'minimal corpus — default config',
    corpus: 'test/corpora/minimal',
    goldenDir: 'test/golden/minimal-default',
  },
  {
    name: 'standard corpus — default config',
    corpus: 'test/corpora/standard',
    goldenDir: 'test/golden/standard-default',
  },
  {
    name: 'standard corpus — no embeddings',
    corpus: 'test/corpora/standard',
    config: { embeddings: false },
    goldenDir: 'test/golden/standard-no-embeddings',
  },
];

describe.each(GOLDEN_TESTS)('Golden Artifact: $name', ({ corpus, config, goldenDir }) => {
  it('produces artifacts identical to golden set', async () => {
    const report = await compile({
      sources: [`${corpus}/content/**/*.md`],
      outputDir: '.knowledge-test/golden/' + goldenDir.split('/').pop(),
      ...config,
    });

    // Read produced artifacts
    const produced = await collectArtifacts(report.outputDir);

    // Read golden artifacts
    const golden = await collectArtifacts(goldenDir);

    // Compare every file
    for (const [relativePath, content] of produced) {
      expect(golden.has(relativePath)).toBe(true);
      const goldenContent = golden.get(relativePath)!;

      // For JSON files, deep-equal ignoring timestamps
      if (relativePath.endsWith('.json')) {
        const producedJSON = normalizeJSON(JSON.parse(content), ['generatedAt', 'modifiedAt']);
        const goldenJSON = normalizeJSON(JSON.parse(goldenContent), ['generatedAt', 'modifiedAt']);
        expect(producedJSON).toEqual(goldenJSON);
      } else {
        // Binary files (embeddings) — compare hash
        expect(computeSHA256(content)).toBe(computeSHA256(goldenContent));
      }
    }
  });
});

// ── Determinism Test ─────────────────────────────────────────

describe('Determinism', () => {
  it('compiling the same corpus twice produces identical artifacts', async () => {
    const report1 = await compile({
      sources: ['test/corpora/standard/content/**/*.md'],
      outputDir: '.knowledge-test/determinism/run-1',
    });

    const report2 = await compile({
      sources: ['test/corpora/standard/content/**/*.md'],
      outputDir: '.knowledge-test/determinism/run-2',
    });

    const artifacts1 = await collectArtifacts(report1.outputDir);
    const artifacts2 = await collectArtifacts(report2.outputDir);

    for (const [path, content] of artifacts1) {
      expect(artifacts2.get(path)).toBe(content);
    }
  });

  it('produces same output on Linux and macOS', async () => {
    // Platform-dependent hashing (file paths use forward vs backslash)
    const report = await compile({
      sources: ['test/corpora/minimal/content/**/*.md'],
      outputDir: '.knowledge-test/platform',
    });

    const artifacts = await collectArtifacts(report.outputDir);

    for (const [path, content] of artifacts) {
      if (path.endsWith('.json')) {
        const parsed = JSON.parse(content);
        // All path fields should use forward slashes
        expect(JSON.stringify(parsed)).not.toContain('\\');
      }
    }
  });
});
```

### 2.6 Performance Tests

**Scope:** Scalability benchmarks, memory benchmarks, caching effectiveness, parallel execution, time budgets.

```typescript
import { bench, describe } from 'vitest';
import { compile } from '@/index';
import { generateCorpus } from '@/test/fixtures/generate';

describe('Compilation Performance', () => {
  const SIZES = [100, 1000, 10000] as const;

  for (const docCount of SIZES) {
    bench(`compile ${docCount} documents`, async () => {
      const corpus = generateCorpus(docCount, {
        avgWords: 500,
        linkDensity: 0.3,
        conceptOverlap: 0.2,
      });

      await compile({
        sources: corpus.paths,
        outputDir: `.knowledge-test/perf/${docCount}`,
        embeddings: false, // Embeddings dominate time; test separately
        cache: false,
      });
    }, {
      time: docCount <= 1000 ? 10_000 : 60_000, // ms per bench
      iterations: docCount <= 100 ? 10 : 3,
    });
  }

  bench('embedding 1000 documents', async () => {
    const corpus = generateCorpus(1000, { avgWords: 500 });
    await compile({
      sources: corpus.paths,
      outputDir: '.knowledge-test/perf/embedding',
      embeddings: true,
      clustering: false,
      optimization: false,
    });
  }, { time: 30_000 });

  bench('cache hit: 1000 documents, no changes', async () => {
    const corpus = generateCorpus(1000, { avgWords: 500 });
    await compile({ sources: corpus.paths, outputDir: '.knowledge-test/perf/cache-1', cache: true });
    await compile({ sources: corpus.paths, outputDir: '.knowledge-test/perf/cache-2', cache: true });
  }, { time: 10_000 });
});
```

**Time Budget Enforcement:**

```typescript
import { describe, it, expect } from 'vitest';
import { compile } from '@/index';
import { generateCorpus } from '@/test/fixtures/generate';

describe('Time Budgets', () => {
  it('compiles 100 documents in under 5 seconds', async () => {
    const corpus = generateCorpus(100, { avgWords: 300 });
    const start = performance.now();
    await compile({ sources: corpus.paths, embeddings: false, cache: false });
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(5000);
  }, 10_000);

  it('compiles 1000 documents in under 30 seconds', async () => {
    const corpus = generateCorpus(1000, { avgWords: 300 });
    const start = performance.now();
    await compile({ sources: corpus.paths, embeddings: false, cache: false });
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(30000);
  }, 60_000);

  it('parsing pass processes at least 50 docs/second', async () => {
    const corpus = generateCorpus(500, { avgWords: 1000 });
    const report = await compile({ sources: corpus.paths, embeddings: false, cache: false });
    const parsePhase = report.phases.find((p) => p.phase === 'parsing');
    const rate = report.sources.total / (parsePhase!.duration / 1000);
    expect(rate).toBeGreaterThan(50);
  });
});
```

### 2.7 Compiler Correctness Tests

**Scope:** Invariant preservation, idempotency, determinism, incremental correctness, cache correctness.

```typescript
import { describe, it, expect } from 'vitest';
import { compile, KnowledgeCompiler } from '@/index';

describe('Compiler Correctness', () => {
  // ── Invariant Preservation ──────────────────────────────────

  it('all IR invariants hold after optimization pass', async () => {
    const compiler = new KnowledgeCompiler({
      sources: ['test/corpora/standard/content/**/*.md'],
      outputDir: '.knowledge-test/correctness/invariants',
    });

    const report = await compiler.compile();

    // Read all IR checkpoints
    const irAfterClustering = compiler.getIRCheckpoint('CLUSTERING');
    const irAfterOptimization = compiler.getIRCheckpoint('OPTIMIZATION');

    // Invariant: Optimization must not change node count
    expect(irAfterOptimization.documents.size).toBe(irAfterClustering.documents.size);

    // Invariant: No edge weight should exceed 1.0
    for (const edge of irAfterOptimization.edges) {
      expect(edge.weight).toBeLessThanOrEqual(1.0);
    }
  });

  // ── Idempotency ────────────────────────────────────────────

  it('running optimization twice equals running once', async () => {
    const compiler = new KnowledgeCompiler({
      sources: ['test/corpora/standard/content/**/*.md'],
    });

    const report1 = await compiler.compile();
    const state1 = compiler.getIRCheckpoint('OPTIMIZATION');

    // Run optimization again
    const report2 = await compiler.compile({ phases: ['OPTIMIZATION'] });
    const state2 = compiler.getIRCheckpoint('OPTIMIZATION');

    expect(state1).toEqual(state2);
  });

  // ── Determinism ────────────────────────────────────────────

  it('same input produces same output across 3 runs', async () => {
    const sources = ['test/corpora/minimal/content/**/*.md'];

    const run1 = await compile({ sources, outputDir: '.knowledge-test/det/1' });
    const run2 = await compile({ sources, outputDir: '.knowledge-test/det/2' });
    const run3 = await compile({ sources, outputDir: '.knowledge-test/det/3' });

    const artifacts1 = await collectArtifacts(run1.outputDir);
    const artifacts2 = await collectArtifacts(run2.outputDir);
    const artifacts3 = await collectArtifacts(run3.outputDir);

    for (const [path, content] of artifacts1) {
      expect(artifacts2.get(path)).toBe(content);
      expect(artifacts3.get(path)).toBe(content);
    }
  });

  // ── Incremental Correctness ────────────────────────────────

  it('incremental build produces same result as full rebuild (no changes)', async () => {
    const sources = ['test/corpora/standard/content/**/*.md'];

    const full = await compile({
      sources,
      outputDir: '.knowledge-test/inc-correct/full',
      mode: 'full',
    });

    const inc = await compile({
      sources,
      outputDir: '.knowledge-test/inc-correct/inc',
      mode: 'incremental',
    });

    const fullArtifacts = await collectArtifacts(full.outputDir);
    const incArtifacts = await collectArtifacts(inc.outputDir);

    for (const [path, content] of fullArtifacts) {
      expect(incArtifacts.get(path)).toBe(content);
    }
  });

  it('incremental build after one file change matches full rebuild', async () => {
    const sources = ['test/corpora/standard/content/**/*.md'];

    // Build once
    const full1 = await compile({
      sources,
      outputDir: '.knowledge-test/inc-correct/full-2',
      mode: 'full',
    });

    // Modify a file and do incremental
    modifyFile('test/corpora/standard/content/doc-1.md', '## Modified\n\nContent');

    const inc = await compile({
      sources,
      outputDir: '.knowledge-test/inc-correct/full-2',
      mode: 'incremental',
    });

    // Now do a full rebuild from scratch
    const full2 = await compile({
      sources,
      outputDir: '.knowledge-test/inc-correct/full-2-verify',
      mode: 'full',
      clean: true,
    });

    const incArtifacts = await collectArtifacts(inc.outputDir);
    const full2Artifacts = await collectArtifacts(full2.outputDir);

    for (const [path, content] of incArtifacts) {
      expect(full2Artifacts.get(path)).toBe(content);
    }
  });

  // ── Cache Correctness ──────────────────────────────────────

  it('cached result equals fresh result', async () => {
    const sources = ['test/corpora/minimal/content/**/*.md'];

    // Run with cache enabled
    const withCache = await compile({
      sources,
      outputDir: '.knowledge-test/cache-correct/cached',
      cache: true,
    });

    // Run with cache disabled
    const noCache = await compile({
      sources,
      outputDir: '.knowledge-test/cache-correct/fresh',
      cache: false,
      clean: true,
    });

    const cachedArtifacts = await collectArtifacts(withCache.outputDir);
    const freshArtifacts = await collectArtifacts(noCache.outputDir);

    for (const [path, content] of cachedArtifacts) {
      expect(freshArtifacts.get(path)).toBe(content);
    }
  });
});
```

### 2.8 Frontend Tests

**Scope:** Component rendering, ArtifactReader (mock), visualization interaction, search, responsive design.

```typescript
// ── Component Rendering Test ─────────────────────────────────

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { KnowledgeGraph } from '@/visualization/components';

// Mock artifact data
import { mockGraph } from '@/test/fixtures/frontend/graph';
import { ArtifactReaderProvider } from '@knowledge-compiler/artifacts';
import { createMockReader } from '@/test/mocks/artifact-reader';

describe('KnowledgeGraph', () => {
  it('renders all nodes', () => {
    render(
      <ArtifactReaderProvider reader={createMockReader()}>
        <KnowledgeGraph graph={mockGraph} width={800} height={600} />
      </ArtifactReaderProvider>
    );

    const nodes = screen.getAllByRole('button', { name: /graph node/i });
    expect(nodes.length).toBe(mockGraph.nodes.length);
  });

  it('highlights node on click', async () => {
    render(
      <ArtifactReaderProvider reader={createMockReader()}>
        <KnowledgeGraph graph={mockGraph} width={800} height={600} interactive />
      </ArtifactReaderProvider>
    );

    const firstNode = screen.getByText(mockGraph.nodes[0].label);
    fireEvent.click(firstNode);

    await waitFor(() => {
      expect(firstNode.closest('[data-selected="true"]')).toBeTruthy();
    });
  });

  it('shows tooltip on hover', async () => {
    render(
      <ArtifactReaderProvider reader={createMockReader()}>
        <KnowledgeGraph
          graph={mockGraph}
          width={800}
          height={600}
          nodeTooltip={(n) => <div data-testid="tooltip">{n.label} — {n.type}</div>}
        />
      </ArtifactReaderProvider>
    );

    const node = screen.getByText(mockGraph.nodes[0].label);
    fireEvent.mouseEnter(node);

    await waitFor(() => {
      expect(screen.getByTestId('tooltip')).toBeTruthy();
    });
  });

  it('renders minimap when enabled', () => {
    render(
      <ArtifactReaderProvider reader={createMockReader()}>
        <KnowledgeGraph graph={mockGraph} width={800} height={600} minimap />
      </ArtifactReaderProvider>
    );

    expect(screen.getByRole('img', { name: /minimap/i })).toBeTruthy();
  });

  it('handles empty graph gracefully', () => {
    render(
      <ArtifactReaderProvider reader={createMockReader()}>
        <KnowledgeGraph graph={{ nodes: [], edges: [] }} width={800} height={600} />
      </ArtifactReaderProvider>
    );

    expect(screen.getByText(/no nodes to display/i)).toBeTruthy();
  });

  it('applies filter correctly', () => {
    render(
      <ArtifactReaderProvider reader={createMockReader()}>
        <KnowledgeGraph
          graph={mockGraph}
          width={800}
          height={600}
          filter={(n) => n.type === 'document'}
        />
      </ArtifactReaderProvider>
    );

    const nodes = screen.getAllByRole('button', { name: /graph node/i });
    expect(nodes.length).toBe(mockGraph.nodes.filter((n) => n.category === 'document').length);
  });
});
```

```typescript
// ── ArtifactReader Mock ──────────────────────────────────────

import { ArtifactReader } from '@knowledge-compiler/artifacts';

export function createMockReader(): ArtifactReader {
  return {
    readManifest: () => Promise.resolve(mockManifest),
    readKnowledge: () => Promise.resolve(mockKnowledge),
    readGraph: () => Promise.resolve(mockGraph),
    readEntities: () => Promise.resolve(mockEntities),
    readClusters: () => Promise.resolve(mockClusters),
    readConcepts: () => Promise.resolve(mockConcepts),
    readNavigation: () => Promise.resolve(mockNavigation),
    readEmbedding: (id: string) => Promise.resolve(new Float32Array(1536)),
    readSearchIndex: () => Promise.resolve(mockSearchIndex),
    readStatistics: () => Promise.resolve(mockStatistics),
    readRecommendations: (id: string) => Promise.resolve(mockRecommendations[id] ?? { id, recommendations: [] }),
    findNode: (id: string) => Promise.resolve(mockKnowledge.nodes.find((n) => n.id === id) ?? null),
    findRelated: (id: string) => Promise.resolve({ node: null!, relations: [] }),
    search: (query: string) => Promise.resolve({
      results: [],
      total: 0,
      query,
      duration: 0,
    }),
    getSimilar: (id: string) => Promise.resolve({ id, similar: [] }),
    getCluster: (id: string) => Promise.resolve(null as any),
    getConceptPath: (id: string) => Promise.resolve(null as any),
    streamNodes: () => mockAsyncIterable(mockKnowledge.nodes),
    streamEdges: () => mockAsyncIterable(mockKnowledge.edges),
    read: (name: string) => Promise.resolve({}),
  } as unknown as ArtifactReader;
}
```

---

## 3. Test Infrastructure

### 3.1 Test Runner Configuration

```typescript
// vitest.config.ts (full)
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Test file patterns
    include: [
      'src/**/*.{test,spec}.ts',
      'src/**/*.{test,spec}.tsx',
      'test/**/*.{test,spec}.ts',
    ],

    // Separate integration tests
    exclude: [
      'src/**/*.integration.test.ts',
      'test/integration/**/*',
      'test/e2e/**/*',
      'test/performance/**/*',
    ],

    // Integration test config
    workspace: [
      {
        test: {
          name: 'unit',
          include: ['src/**/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      {
        test: {
          name: 'integration',
          include: ['test/integration/**/*.test.ts'],
          environment: 'node',
          testTimeout: 60_000,
          setupFiles: ['./test/setup/integration.ts'],
        },
      },
      {
        test: {
          name: 'frontend',
          include: ['src/visualization/**/*.{test,spec}.tsx'],
          environment: 'jsdom',
          setupFiles: ['./test/setup/frontend.ts'],
        },
      },
    ],

    // Coverage
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov', 'clover'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/*.integration.test.ts',
        'src/**/*.d.ts',
        'src/index.ts',
        'src/types/**',
      ],
      thresholds: {
        statements: 85,
        branches: 80,
        functions: 85,
        lines: 85,
        perFile: true,
      },
    },

    // Snapshot settings
    resolveSnapshotPath: (testPath, snapshotExtension) => {
      return testPath.replace('src/', 'test/__snapshots__/') + snapshotExtension;
    },

    // Global setup
    globalSetup: ['./test/setup/global.ts'],
    setupFiles: ['./test/setup/common.ts'],

    // Retry flaky tests
    retry: 2,

    // Max concurrency
    maxConcurrency: 4,

    // Environment variables
    env: {
      KNOWLEDGE_COMPILER_CACHE_DIR: '.knowledge-test-cache',
      KNOWLEDGE_COMPILER_LOG_LEVEL: 'silent',
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@test': path.resolve(__dirname, 'test'),
    },
  },
});
```

### 3.2 Package Dependencies

```json
{
  "devDependencies": {
    "vitest": "^3.0.0",
    "@vitest/coverage-istanbul": "^3.0.0",
    "@vitest/ui": "^3.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jsdom": "^25.0.0",
    "playwright": "^1.48.0",
    "@playwright/test": "^1.48.0",
    "benny": "^4.0.0",
    "mitata": "^1.0.0",
    "memlab": "^1.0.0",
    "zod": "^3.23.0"
  }
}
```

### 3.3 Scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:integration": "vitest run --project integration",
    "test:frontend": "vitest run --project frontend",
    "test:perf": "vitest run test/performance --testTimeout=300000",
    "test:update-snapshots": "vitest run --update",
    "test:golden": "vitest run test/golden --testTimeout=120000",
    "test:e2e": "playwright test",
    "test:typecheck": "tsc --noEmit",
    "test:all": "npm run test:typecheck && npm run test:coverage && npm run test:integration && npm run test:golden && npm run test:perf"
  }
}
```

---

## 4. Test Corpus

### 4.1 Corpus Structure

```
test/corpora/
  minimal/             # 5 files, simple content, 1 concept
    content/
      index.md
      getting-started.md
      core-concepts.md
      advanced-topics.md
      reference.md
    expected/          # Golden artifacts for this corpus

  standard/            # 50 files, 3 domains, standard complexity
    content/
      domain-a/        # 17 files — "Machine Learning"
      domain-b/        # 17 files — "Web Development"
      domain-c/        # 16 files — "Data Engineering"
    expected/

  edge-cases/          # Corner cases
    content/
      empty.md                          # Empty file
      no-frontmatter.md                 # Missing frontmatter
      malformed-frontmatter.md          # Invalid YAML
      circular-ref-a.md                 # Circular references
      circular-ref-b.md                 # - " -
      duplicate-content.md              # Exact copy of another file
      very-large-file.md                # >100MB (truncated in git LFS)
      non-utf8-content.md               # Binary content
      deeply-nested-headings.md         # h1-h6 in pathological order
      code-only.md                      # No prose, only code blocks
      multilang.md                      # CJK + Arabic + emoji content
      broken-links.md                   # References to non-existent docs
    expected/

  performance/         # 1000 auto-generated files with controlled overlap
    content/           # Generated by test/fixtures/generate.ts
    expected/
```

### 4.2 Corpus Generation

```typescript
// test/fixtures/generate.ts
import { faker } from '@faker-js/faker';

interface CorpusConfig {
  docCount: number;
  avgWords: number;
  linkDensity: number;       // Fraction of docs that link to others
  conceptOverlap: number;    // How much concepts overlap between docs
  headingDepth: number;      // Max heading depth
}

export function generateCorpus(config: CorpusConfig): Corpus {
  faker.seed(42); // Deterministic

  const concepts = Array.from({ length: Math.ceil(config.docCount * 0.1) }, (_, i) => ({
    id: `con-${i}`,
    name: faker.lorem.words(2),
    level: Math.floor(Math.random() * 3),
  }));

  const documents = Array.from({ length: config.docCount }, (_, i) => {
    const docConcepts = faker.helpers.arrayElements(
      concepts,
      Math.ceil(config.conceptOverlap * concepts.length)
    );

    const headings = Array.from({ length: config.headingDepth }, (_, d) => ({
      level: d + 1,
      text: faker.lorem.sentence(3),
    }));

    const body = Array.from({ length: Math.ceil(config.avgWords / 20) }, () =>
      faker.lorem.paragraph()
    ).join('\n\n');

    const links = config.linkDensity > Math.random()
      ? `\n\nSee also: [[doc-${faker.number.int({ min: 0, max: config.docCount - 1 })}]]`
      : '';

    return {
      id: `doc-${i}`,
      content: `---
title: ${faker.lorem.sentence(3)}
tags: [${docConcepts.map((c: any) => c.name).join(', ')}]
---

${headings.map((h) => `${'#'.repeat(h.level)} ${h.text}\n\n${body}`).join('\n\n')}${links}`,
    };
  });

  return {
    documents,
    paths: documents.map((d) => writeTempFile(`${d.id}.md`, d.content)),
  };
}
```

### 4.3 Edge Cases Coverage Matrix

| Test File | Edge Case | Expected Behavior |
|---|---|---|
| `empty.md` | Zero bytes | Parses to empty document, no error |
| `no-frontmatter.md` | Missing `---` | Title inferred from first heading |
| `malformed-frontmatter.md` | `title: "unclosed` | Warning emitted, defaults used |
| `circular-ref-a.md` `circular-ref-b.md` | A ←→ B cycle | Not an error; edges stored as-is |
| `duplicate-content.md` | Identical to another file | Same checksum; dedup pass merges |
| `very-large-file.md` | >100 MB | Stream-read, chunked processing |
| `non-utf8-content.md` | Binary bytes | Detected as non-UTF8, skipped as degraded |
| `deeply-nested-headings.md` | h1 → h6 → h3 | Flattened at depth 6 |
| `code-only.md` | Only code blocks | No extractable concepts; empty body sections |
| `multilang.md` | CJK + Arabic | Unicode NFC normalization applied |
| `broken-links.md` | `[[does-not-exist]]` | Warning emitted; no edge created |

---

## 5. CI Integration

### 5.1 GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  KNOWLEDGE_COMPILER_LOG_LEVEL: silent
  KNOWLEDGE_COMPILER_CACHE_DIR: .knowledge-test-cache

jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node: [18, 20, 22]

    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v4
        with:
          lfs: true  # For large test files

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm test:typecheck

      - name: Unit tests
        run: pnpm test:coverage
        env:
          NODE_OPTIONS: --max-old-space-size=4096

      - name: Integration tests
        run: pnpm test:integration
        env:
          NODE_OPTIONS: --max-old-space-size=8192

      - name: Golden tests
        run: pnpm test:golden

      - name: Performance tests (changed files only)
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: pnpm test:perf
        env:
          NODE_OPTIONS: --max-old-space-size=16384

      - name: Update golden artifacts (if needed)
        if: failure() && github.event_name == 'push'
        run: pnpm test:golden --update-snapshots

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          directory: ./coverage
          flags: unit,${{ matrix.os }},node-${{ matrix.node }}

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Frontend tests
        run: pnpm test:frontend

      - name: E2E tests
        run: pnpm test:e2e
        env:
          PLAYWRIGHT_BROWSERS_PATH: 0

  perf-regression:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Compare performance to base branch
        run: |
          git fetch origin ${{ github.base_ref }}
          pnpm bench-compare --base origin/${{ github.base_ref }} --head HEAD
          # Fails if >5% regression detected
        env:
          BENCHMARK_THRESHOLD: 5
```

### 5.2 Performance Regression Alerting

```typescript
// scripts/bench-compare.ts
import { execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';

interface BenchResult {
  name: string;
  mean: number;    // ms
  p99: number;     // ms
  samples: number;
}

async function compareBenches(base: string, head: string, threshold: number) {
  // Run benchmarks on base
  execSync(`git checkout ${base}`);
  const baseResults: BenchResult[] = JSON.parse(
    execSync('pnpm bench --json').toString()
  );

  // Run benchmarks on head
  execSync(`git checkout ${head}`);
  const headResults: BenchResult[] = JSON.parse(
    execSync('pnpm bench --json').toString()
  );

  const regressions: { name: string; regression: number }[] = [];

  for (const headResult of headResults) {
    const baseResult = baseResults.find((b) => b.name === headResult.name);
    if (!baseResult) continue;

    const regression = ((headResult.mean - baseResult.mean) / baseResult.mean) * 100;
    if (regression > threshold) {
      regressions.push({ name: headResult.name, regression });
    }
  }

  if (regressions.length > 0) {
    console.error('Performance regressions detected:');
    for (const r of regressions) {
      console.error(`  ${r.name}: +${r.regression.toFixed(1)}%`);
    }
    process.exit(1);
  }

  console.log('No significant performance regressions detected.');
}
```

---

## 6. Test Fixtures

### 6.1 Pre-compiled Artifact Sets

```typescript
// test/fixtures/frontend/

export const mockGraph: VisualGraph = {
  nodes: [
    {
      id: 'doc-1',
      label: 'Introduction',
      type: 'document',
      category: 'document',
      color: '#0072B2',
      size: 24,
      position: { x: 100, y: 200 },
      clusterId: 'cluster-1',
    },
    {
      id: 'ent-1',
      label: 'Albert Einstein',
      type: 'entity',
      category: 'entity',
      color: '#E69F00',
      size: 16,
      position: { x: 300, y: 150 },
      clusterId: 'cluster-2',
    },
    {
      id: 'con-1',
      label: 'Relativity',
      type: 'concept',
      category: 'concept',
      color: '#CC79A7',
      size: 20,
      position: { x: 200, y: 300 },
      clusterId: 'cluster-1',
    },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'doc-1',
      target: 'ent-1',
      type: 'mentions',
      weight: 0.85,
      dashed: false,
      color: '#E69F00',
    },
    {
      id: 'edge-2',
      source: 'doc-1',
      target: 'con-1',
      type: 'related_to',
      weight: 0.7,
      dashed: true,
      color: '#CC79A7',
    },
  ],
  layout: 'force',
  metadata: {
    nodeCount: 3,
    edgeCount: 2,
    categories: ['document', 'entity', 'concept'],
  },
};
```

### 6.2 Mock Embedding Vectors

```typescript
// test/mocks/embeddings.ts

/**
 * Deterministic mock embedding generator.
 * Produces the same vector for the same input string.
 * Vectors are normalized to unit length.
 */
export function mockEmbedding(text: string, dimensions = 1536): Float32Array {
  const hash = simpleHash(text);
  const vector = new Float32Array(dimensions);

  for (let i = 0; i < dimensions; i++) {
    vector[i] = Math.sin(hash * (i + 1)) * 0.5 + Math.cos(hash * (i + 2)) * 0.5;
  }

  // L2 normalize
  let norm = 0;
  for (let i = 0; i < dimensions; i++) norm += vector[i] ** 2;
  norm = Math.sqrt(norm);

  for (let i = 0; i < dimensions; i++) vector[i] /= norm;

  return vector;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Mock embedding provider that returns deterministic vectors.
 * Implements the EmbeddingProvider interface for testing.
 */
export class MockEmbeddingProvider implements EmbeddingProvider {
  readonly name = 'mock-embedding';
  readonly dimensions = 1536;

  async generateEmbeddings(texts: string[]): Promise<Float32Array[]> {
    return texts.map((text) => mockEmbedding(text, this.dimensions));
  }

  async generateEmbedding(text: string): Promise<Float32Array> {
    return mockEmbedding(text, this.dimensions);
  }
}
```

### 6.3 Known IR States

```typescript
// test/fixtures/ir/graph-construction.ts

/**
 * Known IR state for testing graph construction passes.
 * Represents the expected IR after parsing 3 linked documents.
 */
export const knownIRAfterParsing: IRSnapshot = {
  documents: new Map([
    ['doc-a', {
      id: 'doc-a',
      path: 'doc-a.md',
      checksum: 'abc123',
      frontmatter: { title: 'Document A', tags: ['test'] },
      bodyContent: '# A\n\nSee [[Document B]].\n\n# B\n\nContent about B.',
      stats: { wordCount: 15, headingDepth: 2 },
    }],
    ['doc-b', {
      id: 'doc-b',
      path: 'doc-b.md',
      checksum: 'def456',
      frontmatter: { title: 'Document B', tags: [] },
      bodyContent: '# B\n\nReferences [[Document A]] and [[Document C]].',
      stats: { wordCount: 10, headingDepth: 1 },
    }],
    ['doc-c', {
      id: 'doc-c',
      path: 'doc-c.md',
      checksum: 'ghi789',
      frontmatter: { title: 'Document C', tags: ['reference'] },
      bodyContent: '# C\n\nSee [[Document A]].',
      stats: { wordCount: 8, headingDepth: 1 },
    }],
  ]),
  sections: new Map([
    ['sec-a-1', { id: 'sec-a-1', docId: 'doc-a', headingPath: 'A', depth: 1, content: 'See [[Document B]].', contentHash: 'aaa' }],
    ['sec-a-2', { id: 'sec-a-2', docId: 'doc-a', headingPath: 'A > B', depth: 2, content: 'Content about B.', contentHash: 'bbb' }],
    ['sec-b-1', { id: 'sec-b-1', docId: 'doc-b', headingPath: 'B', depth: 1, content: 'References [[Document A]] and [[Document C]].', contentHash: 'ccc' }],
    ['sec-c-1', { id: 'sec-c-1', docId: 'doc-c', headingPath: 'C', depth: 1, content: 'See [[Document A]].', contentHash: 'ddd' }],
  ]),
  concepts: new Map(),
  edges: [],
};
```

---

## 7. Writing Tests (Contributor Guide)

### 7.1 File Naming Conventions

| Test Type | Pattern | Location |
|---|---|---|
| Unit | `{module}.test.ts` | Same dir as source |
| Unit (React) | `{Component}.test.tsx` | Same dir as component |
| Integration | `{feature}.integration.test.ts` | `test/integration/` |
| E2E | `{page}.e2e.test.ts` | `test/e2e/` |
| Performance | `{benchmark}.perf.test.ts` | `test/performance/` |
| Golden | `{corpus}.golden.test.ts` | `test/golden/` |
| Regression | `PR-{number}-{description}.test.ts` | `test/regressions/` |

### 7.2 Test Organization

Mirror the `src/` directory structure:

```
src/
  passes/
    embedding-generator.ts
    embedding-generator.test.ts      ✓ Test next to source
  cache/
    cache-controller.ts
    cache-controller.test.ts
  visualization/
    components/
      KnowledgeGraph.tsx
      KnowledgeGraph.test.tsx        ✓ React component test

test/
  integration/
    full-compile.integration.test.ts
    cache.integration.test.ts
    incremental.integration.test.ts
  golden/
    minimal.golden.test.ts
    standard.golden.test.ts
  performance/
    compile.perf.test.ts
    embedding.perf.test.ts
  regressions/
    PR-142-unclosed-code-block.test.ts
    PR-256-memory-leak.test.ts
  e2e/
    knowledge-graph.e2e.test.ts
    search.e2e.test.ts
```

### 7.3 How to Write a Golden Test

```typescript
// 1. Create a test corpus in test/corpora/{your-name}/content/
// 2. Compile it manually:
//    kc compile test/corpora/{your-name}/content --out test/corpora/{your-name}/expected
// 3. Verify the output is correct
// 4. Write the test:

import { describe, it, expect } from 'vitest';
import { compile } from '@/index';

describe('Golden: your-name', () => {
  it('matches golden artifacts', async () => {
    const report = await compile({
      sources: ['test/corpora/your-name/content/**/*.md'],
      outputDir: '.knowledge-test/golden/your-name',
    });

    const produced = await collectArtifacts(report.outputDir);
    const golden = await collectArtifacts('test/corpora/your-name/expected');

    for (const [path, content] of produced) {
      expect(golden.get(path)).toBe(content);
    }
  });
});
```

### 7.4 How to Write a Compiler Pass Test

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { MyPass } from '@/passes/my-pass';
import { createMockContext } from '@/test/mocks/context';

describe('MyPass', () => {
  let ctx: MockCompilerContext;

  beforeEach(() => {
    ctx = createMockContext({
      config: {
        myPass: { option1: 'value' },
      },
    });
  });

  it('processes documents correctly', async () => {
    // Arrange: populate IR with known state
    ctx.addDocument({ id: 'doc-1', content: '...' });
    ctx.addSection({ id: 'sec-1', docId: 'doc-1', content: '...' });

    // Act: run the pass
    const result = await MyPass.execute(ctx);

    // Assert: verify IR mutations
    expect(result.status).toBe('success');
    expect(ctx.ir.concepts.size).toBe(3);
    expect(ctx.ir.edges.size).toBe(2);
  });

  it('handles empty input gracefully', async () => {
    const result = await MyPass.execute(ctx);

    expect(result.status).toBe('success');
    expect(ctx.ir.concepts.size).toBe(0);
  });

  it('degrades on provider failure', async () => {
    ctx.mockProvider.throwOnNextCall(new Error('Timeout'));

    const result = await MyPass.execute(ctx);

    expect(result.status).toBe('degraded');
    expect(ctx.errors.warnings).toHaveLength(1);
  });
});
```

### 7.5 How to Write a Mock Embedding Provider

```typescript
// test/mocks/embedding-provider.ts

export class MockEmbeddingProvider implements EmbeddingProvider {
  private shouldThrow = false;
  private throwError: Error | null = null;
  private callCount = 0;
  public calls: string[][] = [];

  readonly name = 'mock-embedding';
  readonly dimensions = 64; // Small for tests

  throwOnNextCall(error: Error): void {
    this.shouldThrow = true;
    this.throwError = error;
  }

  async generateEmbeddings(texts: string[]): Promise<Float32Array[]> {
    this.callCount++;
    this.calls.push(texts);

    if (this.shouldThrow) {
      this.shouldThrow = false;
      throw this.throwError;
    }

    return texts.map((text) => mockEmbedding(text, this.dimensions));
  }

  async generateEmbedding(text: string): Promise<Float32Array> {
    return this.generateEmbeddings([text]).then((r) => r[0]);
  }

  getCallCount(): number {
    return this.callCount;
  }

  reset(): void {
    this.callCount = 0;
    this.calls = [];
    this.shouldThrow = false;
    this.throwError = null;
  }
}
```

### 7.6 How to Add Regression Tests

```typescript
// When fixing a bug, follow this checklist:

// 1. Write a test that reproduces the bug (it should fail):
import { describe, it, expect } from 'vitest';

describe('Regression: BUG-XXX — short description', () => {
  it('reproduces the bug', async () => {
    // Minimal reproduction case
    const input = getBugReproductionInput();

    // This should throw/pass depending on bug nature
    await expect(compile({ sources: [input] })).resolves.toHaveProperty('success', true);
  });

  it('produces correct output after fix', async () => {
    const report = await compile({
      sources: ['test/regressions/PR-XXX/corpus/**/*.md'],
      outputDir: '.knowledge-test/regressions/PR-XXX',
    });

    const knowledge = await new ArtifactReader(report.outputDir).readKnowledge();
    // Assert specific expected behavior
    expect(knowledge.nodes.length).toBe(5); // Should not crash
    expect(report.errors).toHaveLength(0);
  });
});

// 2. Create test/regressions/PR-XXX/ with minimal reproduction corpus
// 3. Commit both the test and the fix together
```
