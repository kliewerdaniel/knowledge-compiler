# Knowledge Compiler — Debugging & Diagnostics Guide

**Document Version:** 1.0.0  
**Audience:** Developers debugging or profiling the compiler  
**Last Updated:** 2026-07-10

---

## Table of Contents

1. [Compiler Debugging](#1-compiler-debugging)
   - [Debug Mode](#11-debug-mode)
   - [Compiler Errors](#12-compiler-errors)
   - [Compiler Warnings](#13-compiler-warnings)
   - [Logging System](#14-logging-system)
   - [IR Inspection](#15-ir-inspection)
   - [Profiling](#16-profiling)
   - [Tracing](#17-tracing)
   - [Memory Debugging](#18-memory-debugging)
2. [Frontend Debugging](#2-frontend-debugging)
   - [Artifact Loading](#21-artifact-loading)
   - [Performance Debugging](#22-performance-debugging)
   - [Visualization Debugging](#23-visualization-debugging)
3. [Diagnostic Commands](#3-diagnostic-commands)
   - [kc diagnose](#31-kc-diagnose)
   - [kc doctor](#32-kc-doctor)
4. [Development Tools](#4-development-tools)
   - [VS Code Extensions](#41-vs-code-extensions)
   - [Chrome DevTools](#42-chrome-devtools)
5. [Benchmarking Tools](#5-benchmarking-tools)
6. [Troubleshooting Guides](#6-troubleshooting-guides)

---

## 1. Compiler Debugging

### 1.1 Debug Mode

Enable debug mode to expose the compiler's internal state, pass timing, and memory tracking.

#### Activation

```bash
# CLI flag (highest priority)
kc compile ./content --debug
kc compile ./content --debug --debug-filter="embedding,clustering"

# Environment variable
KC_DEBUG=true kc compile ./content

# Config file
KC_DEBUG_LEVEL=2 kc compile ./content  # 0=off, 1=basic, 2=verbose, 3=insanity
```

#### What Debug Mode Enables

| Feature | Level 1 | Level 2 | Level 3 |
|---------|---------|---------|---------|
| IR state dumps at phase boundaries | ✓ | ✓ | ✓ |
| Per-pass timing breakdown | ✓ | ✓ | ✓ |
| Cache hit/miss logging | ✓ | ✓ | ✓ |
| Pass input/output hash logging | ✓ | ✓ | ✓ |
| Memory tracking per pass | — | ✓ | ✓ |
| Worker thread communication logs | — | ✓ | ✓ |
| Full IR diff between passes | — | — | ✓ |
| All function entry/exit tracing | — | — | ✓ |
| Raw embedding API request/response | — | — | ✓ |
| Graph adjacency list dumps | — | — | ✓ |

#### Debug Filtering

Filter debug output to specific passes or phases to reduce noise:

```bash
# By pass name (comma-separated, supports glob)
kc compile --debug --debug-filter="embedding-*"
kc compile --debug --debug-filter="embedding-generator,cluster-assigner"

# By phase
kc compile --debug --debug-phase="EMBEDDING,CLUSTERING"

# By module path
kc compile --debug --debug-module="@knowledge-compiler/pass-embedding"

# Exclude patterns (negative filter)
kc compile --debug --debug-filter="*" --debug-exclude="cache,manifest"
```

#### Debug Output Format

```
[DEBUG] [14:30:01.234] [PARSING] [file-reader] Reading 847 files (2.1 MB total)
[DEBUG] [14:30:01.456] [PARSING] [file-reader]   Cache hit: 312/847 files (36.8%)
[DEBUG] [14:30:02.890] [PARSING] [frontmatter-parser] Parsing 535 files
[DEBUG] [14:30:02.891] [PROFILE] [frontmatter-parser]   92ms, 9.2 docs/ms
[DEBUG] [14:30:03.120] [MEMORY]  [*] Heap used: 342 MB (+28 MB since last check)
[DEBUG] [14:30:03.121] [CACHE]   [embedding-generator] Cache key: a1b2c3d4...
[DEBUG] [14:30:03.122] [CACHE]   [embedding-generator] Cache MISS (input hash changed)
[DEBUG] [14:30:03.456] [TRACE]   [embedding-generator] Enter: batchEmbed(batchSize=128, total=1284)
[DEBUG] [14:30:04.890] [IR]      [*] Phase EMBEDDING complete. IR: 847 docs, 5,234 sections, 1,284 embeddings
```

#### Performance Impact

| Debug Level | Overhead | Use Case |
|-------------|----------|----------|
| Off | 0% | Production compilation |
| Level 1 | 5-10% | General debugging |
| Level 2 | 20-40% | Memory leak investigation |
| Level 3 | 200-500% | Deep IR debugging (never on large corpora) |

Debug overhead comes from:
- Serialization and hashing of IR state at every phase boundary
- Memory stats collection (GC pressure)
- Worker thread communication logging
- Full IR diff computation (Level 3 only)

> **Warning:** Level 3 on a 10K-doc corpus can produce 10+ GB of debug output and increase compilation time 5x.

---

### 1.2 Compiler Errors

#### Error Classification

| Code | Severity | Description | Cause | Solution |
|------|----------|-------------|-------|----------|
| `CONFIG_PARSE_ERROR` | FATAL | Config file cannot be parsed | Invalid JSON/TS/YAML syntax | Check config file syntax with `kc validate`; ensure `knowledge-compiler.json` is valid JSON or `knowledge-compiler.ts` compiles |
| `CONFIG_SCHEMA_ERROR` | FATAL | Config fails Zod schema validation | Missing required field, wrong type | Run `kc diagnose`; check field types against schema docs; look for `zod` error path in stack trace |
| `CONFIG_FILE_NOT_FOUND` | FATAL | Config file does not exist | Wrong path, file deleted | Check `--config` path or default location; run `kc init` to scaffold |
| `GLOB_NO_MATCH` | WARNING | Glob pattern matches zero files | Typo in glob pattern, wrong directory | Verify glob path; list directory contents; use absolute paths |
| `GLOB_TOO_MANY` | WARNING | Glob matches >config.maxFiles | Too permissive glob | Add ignore patterns; increase `input.maxFiles` |
| `FILE_READ_ERROR` | DEGRADED | Cannot read source file | Permission denied, file locked, EMFILE | Check file permissions; close file in other editor; increase OS file descriptor limit |
| `FILE_TOO_LARGE` | DEGRADED | File exceeds `parsing.maxSize` | Genuinely large file, or binary file misidentified | Increase `parsing.maxSize` config; add `.exe`/`.bin` to ignore list |
| `FRONTMATTER_PARSE_ERROR` | WARNING | YAML frontmatter parse failure | Malformed YAML, unclosed delimiter | Check YAML syntax at indicated location; ensure `---` delimiters are closed |
| `FRONTMATTER_SCHEMA_ERROR` | WARNING | Frontmatter fails custom schema | Missing required field, type mismatch | Check frontmatter schema definition; add `// @ts-expect-error` only if intentional |
| `AST_PARSE_ERROR` | DEGRADED | remark parse failure | Pathological Markdown, very deep nesting | Simplify document structure; report issue with document |
| `AST_TOO_DEEP` | WARNING | AST nesting exceeds maxDepth | 100+ levels of nesting | Flatten structure; max nesting is 32 |
| `ENTITY_EXTRACTION_ERROR` | TRANSIENT | spaC WASM crash | OOM in WASM, malformed input | Reduce section size; disable NER for affected sections; retry |
| `ENTITY_LOW_CONFIDENCE` | WARNING | Entity extraction confidence < threshold | Poor quality text, language mismatch | Lower `analysis.entities.minConfidence` or improve text quality |
| `REFERENCE_BROKEN_LINK` | WARNING | Internal link resolves to nothing | Deleted document, typo in link target | Fix link target; or set `analysis.references.strict: false` to downgrade to warning |
| `REFERENCE_CYCLE` | WARNING | Circular reference detected | A -> B -> C -> A | Review link structure; cycles are not necessarily bugs |
| `EMBEDDING_PROVIDER_ERROR` | TRANSIENT | Embedding API returns error | Rate limited, auth failure, timeout | Check `OPENAI_API_KEY` env var; check rate limits in dashboard; retry with backoff |
| `EMBEDDING_PROVIDER_TIMEOUT` | TRANSIENT | Embedding API timeout (>30s) | Network issue, provider overload | Increase `embeddings.timeout` config; check network; fallback to TF-IDF |
| `EMBEDDING_PROVIDER_UNAVAILABLE` | DEGRADED | Embedding provider unreachable | Provider outage, DNS failure | Enable TF-IDF fallback in config; switch provider |
| `EMBEDDING_RATE_LIMITED` | TRANSIENT | 429 from embedding API | Exceeded TPM/RPM quota | Reduce `embeddings.concurrency` and `batchSize`; increase retry delay |
| `EMBEDDING_QUOTA_EXCEEDED` | FATAL | API quota exhausted | Billing limit reached | Check provider billing; reduce model size; use local embeddings |
| `CLUSTERING_CONVERGENCE_ERROR` | TRANSIENT | HDBSCAN fails to converge | Bad parameters, too few points | Adjust `clustering.minClusterSize` and `clustering.minSamples` |
| `CLUSTERING_SILHOUETTE_LOW` | WARNING | Mean silhouette score < 0.2 | No natural cluster structure | Adjust clustering parameters; disable clustering |
| `PAGERANK_CONVERGENCE_ERROR` | TRANSIENT | PageRank fails to converge | Damping factor too high, disconnected graph | Reduce `analysis.pagerank.dampingFactor`; increase max iterations |
| `PASS_EXECUTION_ERROR` | FATAL | Plugin pass throws unhandled error | Bug in pass implementation | Check pass code at stack trace location; disable pass and report issue |
| `PASS_TIMEOUT` | TRANSIENT | Pass exceeds `timeout` config | Infinite loop, slow I/O | Increase pass timeout; check for infinite loops |
| `PASS_DEPENDENCY_MISSING` | FATAL | Pass declares dependency that doesn't exist | Dependency removed, typo in pass ID | Check pass registration; verify dependency graph |
| `PASS_DEPENDENCY_CYCLE` | FATAL | Circular pass dependency detected | A -> B -> C -> A in pass DAG | Break cycle by removing or reordering pass dependencies |
| `PASS_CONTRACT_VIOLATION` | FATAL | Pass promises an IR node type it doesn't produce | Implementation doesn't match contract | Fix pass to produce declared node types; update contract |
| `CACHE_READ_ERROR` | WARNING | Cannot deserialize cache entry | Cache corruption, version mismatch | Run `kc cache validate --repair` |
| `CACHE_WRITE_ERROR` | TRANSIENT | Cannot write cache entry | Disk full, permission denied | Free disk space; check `.knowledge-cache` permissions |
| `CACHE_CHECKSUM_MISMATCH` | WARNING | Cache entry checksum fails validation | Bit rot, partial write | Entry is discarded; re-executed on next compilation |
| `WORKER_CRASH` | TRANSIENT | Worker thread exits unexpectedly | OOM, segmentation fault, unhandled rejection | Worker auto-restarts; check system memory; reduce `maxConcurrency` |
| `WORKER_OOM` | TRANSIENT | Worker exceeds memory limit | Too much data per worker | Reduce batch size; increase per-worker memory limit |
| `WRITER_IO_ERROR` | FATAL | Cannot write artifact file | Disk full, permission denied, inode exhaustion | Free disk space; check output directory permissions |
| `WRITER_DISK_FULL` | TRANSIENT | Disk full during artifact write | Out of space | Free space; retry with backoff; consider different output path |
| `MANIFEST_VERSION_MISMATCH` | WARNING | Existing manifest version != current version | Compiler version upgrade | Automatic migration on first compile; check migration guide |
| `MEMORY_LIMIT_EXCEEDED` | FATAL | Compiler heap exceeds maxHeap | Too many documents, memory leak | Increase `--max-old-space-size`; enable incremental; reduce corpus |
| `INCREMENTAL_STATE_CORRUPTION` | TRANSIENT | Incremental state file invalid | Manual edit, version mismatch | Delete `.knowledge/incremental-state.json` and recompile |

#### Error Formatting

```
✗ Fatal: Reference cycle detected in pass dependency graph
  Code: PASS_DEPENDENCY_CYCLE
  Phase: INIT
  Pass: pass-registry
  Location: src/pipeline/orchestrator.ts:234

  Cycle: embedding-generator → text-chunker → normalizer → embedding-generator

  Stack:
    at detectCycle (src/pipeline/dependency-resolver.ts:89)
    at PassRegistry.validate (src/pipeline/registry.ts:156)
    at PipelineOrchestrator.initialize (src/pipeline/orchestrator.ts:234)
    at main (src/cli/commands/compile.ts:45)

  Suggestion: Review pass dependencies in your configuration.
  The cycle involves passes: embedding-generator, text-chunker, normalizer.
  Check for circular dependencies in your plugin registrations.
```

#### Error Recovery Strategies

| Strategy | Description | Example |
|----------|-------------|---------|
| **Retry with backoff** | Exponential backoff for transient errors | Embedding API 429: retry after 100ms, 400ms, 1.6s... |
| **Skip and degrade** | Skip the failing item, continue with rest | File read error: skip file, process remaining |
| **Fallback** | Use alternative algorithm | Embedding unavailable → TF-IDF fallback |
| **Partial output** | Generate artifacts from available data | Some sections fail embedding → exclude from semantic search |
| **Abort** | Stop pipeline, report error | Disk full: cannot write; no recovery possible |

**Error recovery is configured per-pass in the compiler config:**

```typescript
{
  passes: {
    "embedding-generator": {
      onError: "retry",       // "fail" | "retry" | "skip" | "degraded"
      retryCount: 5,
      retryDelay: 100,        // Base delay in ms (doubles each attempt)
      fallback: "tf-idf",     // Fallback strategy
    },
    "file-reader": {
      onError: "degraded",    // Skip unreadable files
    },
    "artifact-writer": {
      onError: "fail",        // Cannot proceed without artifacts
    }
  }
}
```

#### Common Errors & Troubleshooting

```
"I get CONFIG_FILE_NOT_FOUND but the file exists"
→ Check working directory; kc looks for knowledge-compiler.json in cwd
→ Check file extension (.json, .ts, .js, .mjs, .cjs)
→ Explicitly specify path: kc compile -c ./config/knowledge-compiler.mjs

"EMBEDDING_PROVIDER_ERROR: 401 Unauthorized"
→ OPENAI_API_KEY not set or invalid
→ Check: echo $OPENAI_API_KEY
→ Verify key has access to text-embedding-3-small
→ Check organization and project in OpenAI dashboard

"EMBEDDING_RATE_LIMITED: 429 Too Many Requests"
→ Reduce batchSize (default: 128 → 32) and concurrency (default: 4 → 1)
→ Increase retryDelay (default: 100 → 1000)
→ Check TPM quota in OpenAI dashboard
→ Spread batches across multiple API keys

"WORKER_OOM in embedding-generator"
→ Reduce batchSize from 128 to 32
→ Increase per-worker memory: { workers: { memoryLimit: 2048 } }
→ Use --concurrency 1 to serialize (reduces peak memory)

"CACHE_CHECKSUM_MISMATCH on every compile"
→ Run kc cache clear to rebuild from scratch
→ Check filesystem for bit rot (ZFS scrub, btrfs scrub)
→ Ensure clock is not drifting (NTP sync)

"PASS_DEPENDENCY_CYCLE with custom plugins"
→ Check plugin pass dependencies for mutual imports
→ Use kc plugin list --verbose to inspect each plugin's dependencies
→ Break cycles by making one dependency optional
```

---

### 1.3 Compiler Warnings

#### Warning Classification

| Code | Description | Severity | When It Fires | Suppression |
|------|-------------|----------|---------------|-------------|
| `SLOW_OPERATION` | Pass exceeds duration threshold | Info | Pass >1000ms | `--suppress-warning SLOW_OPERATION` |
| `LARGE_DOCUMENT` | File >10MB | Info | File read | `input.maxSize` config |
| `MISSING_METADATA` | Document lacks recommended frontmatter field | Info | Frontmatter parse | Config required fields |
| `GLOB_NO_MATCH` | Glob pattern matches zero files | Warning | Glob resolution | — |
| `GLOB_TOO_MANY` | Glob matches >config.maxFiles | Warning | Glob resolution | Increase `maxFiles` |
| `FRONTMATTER_SCHEMA_WARN` | Frontmatter fails schema (non-strict mode) | Warning | Frontmatter parse | `frontmatter.strict: false` |
| `FRONTMATTER_DUPLICATE_KEY` | Duplicate YAML key (last wins) | Warning | Frontmatter parse | — |
| `REFERENCE_BROKEN_LINK` | Internal link resolves to nothing | Warning | Reference extraction | `strict: false` |
| `REFERENCE_CYCLE` | Circular reference between documents | Warning | Link analysis | — |
| `ENTITY_LOW_CONFIDENCE` | Entity confidence < threshold | Debug | Entity extraction | Lower threshold |
| `ENTITY_HIGH_FREQUENCY` | Entity appears in >50% of documents | Info | Entity extraction | — |
| `EMBEDDING_HIGH_LATENCY` | Single batch exceeds 5s | Warning | Embedding generation | Reduce batch size |
| `EMBEDDING_DEGRADED_FALLBACK` | Using TF-IDF fallback for some sections | Warning | Embedding generation | Check provider status |
| `CLUSTERING_LOW_SILHOUETTE` | Mean silhouette < 0.2 | Info | Clustering | Adjust params |
| `CLUSTERING_MANY_OUTLIERS` | >50% of points unclustered | Warning | Clustering | Adjust HDBSCAN params |
| `PAGERANK_HIGH_DANGLING` | >10% of nodes are dangling (no outgoing edges) | Info | PageRank | Review link structure |
| `PAGERANK_SLOW_CONVERGENCE` | PageRank took >100 iterations | Info | PageRank | Lower damping factor |
| `OPTIMIZATION_SKIPPED` | Pass skipped: input unchanged | Debug | Optimization | — |
| `OPTIMIZATION_NEGLIGIBLE` | Optimization produced <1% improvement | Debug | Optimization | — |
| `CACHE_EVICTION` | Cache entry evicted due to size limit | Debug | Cache | Increase cache size |
| `CACHE_STALE` | Cache entry older than TTL | Debug | Cache | Increase TTL |
| `PLUGIN_DEPRECATED` | Plugin targets older API version | Warning | Plugin load | Update plugin |
| `PLUGIN_INCOMPATIBLE` | Plugin version incompatible with compiler | Warning | Plugin load | Downgrade/upgrade |
| `MANIFEST_VERSION_BUMP` | Artifact version incremented | Info | Manifest build | — |
| `DEPRECATED_CONFIG_KEY` | Config key is deprecated | Warning | Config load | Migrate to new key |
| `UNKNOWN_CONFIG_KEY` | Config key not recognized | Warning | Config load | Remove or correct key |

#### Warning Output Format

```
⚠ [CLUSTERING_LOW_SILHOUETTE] Mean silhouette score: 0.12 (threshold: 0.2)
  Phase: CLUSTERING
  Pass: cluster-assigner
  Suggestion: Try reducing minClusterSize (current: 5) or increasing eps (current: 0.5)
  Suppress with: --suppress-warning CLUSTERING_LOW_SILHOUETTE

⚠ [REFERENCE_BROKEN_LINK] 3 broken internal links found
  Phase: ANALYSIS
  Pass: reference-extractor
  Affected documents:
    • content/deployment.md → [[non-existent-doc]] (line 42)
    • content/architecture.md → [[missing-page]] (line 78)
    • content/guides/setup.md → /images/missing.png (line 15)
  Suggestion: Run `kc validate` for detailed link report
```

#### Warning Suppression

```bash
# Suppress specific warning codes
kc compile --suppress-warning CLUSTERING_LOW_SILHOUETTE
kc compile --suppress-warning CLUSTERING_LOW_SILHOUETTE,REFERENCE_BROKEN_LINK

# Suppress by phase
kc compile --suppress-phase-warnings CLUSTERING

# Suppress all warnings
kc compile --no-warnings

# In config file
{
  "warnings": {
    "suppress": ["CLUSTERING_LOW_SILHOUETTE"],
    "suppressPhases": ["CLUSTERING"]
  }
}
```

#### Warnings as Errors Mode

```bash
kc compile --warnings-as-errors
kc compile --warnings-as-errors --warnings-as-errors-allow EMBEDDING_DEGRADED_FALLBACK
```

When enabled, any warning with `severity: Warning` or higher causes the compilation to fail with exit code 3. Use in CI to enforce strict compilation standards.

---

### 1.4 Logging System

#### Log Levels

```
Level 0: silent
Level 1: error   ✗ Fatal errors only
Level 2: warn    ⚠ Warnings and errors
Level 3: info    ℹ Normal operational output (default)
Level 4: debug   🔍 Debug details (pass execution, cache)
Level 5: trace   📝 Function entry/exit, all internal state
```

Configuration:

```bash
# CLI
kc compile --log-level debug
KC_LOG_LEVEL=debug kc compile

# Config file
{
  "logging": {
    "level": "debug",
    "format": "json",
    "output": "file",
    "file": "./logs/kc-compile-{timestamp}.log",
    "filter": {
      "modules": ["@knowledge-compiler/core", "@knowledge-compiler/pass-embedding"],
      "passes": ["embedding-generator"],
      "phases": ["EMBEDDING"],
      "excludeModules": ["@knowledge-compiler/cache"]
    }
  }
}
```

#### Log Output Formats

**Human-readable (default):**

```
ℹ [14:30:01] [core] Compilation started: 847 sources
ℹ [14:30:01] [pipeline] Phase PARSING: 4 passes registered
✔ [14:30:03] [file-reader] Read 847/847 files (2.1 MB in 312ms)
⚠ [14:30:04] [frontmatter-parser] 3 documents missing 'title' field
```

**JSON (structured):**

```json
{
  "timestamp": "2026-07-10T14:30:01.234Z",
  "level": "info",
  "module": "@knowledge-compiler/pipeline",
  "pass": "orchestrator",
  "phase": "INIT",
  "message": "Compilation started",
  "context": {
    "sourceCount": 847,
    "configPath": "./knowledge-compiler.json",
    "cacheEnabled": true,
    "duration": 0
  },
  "compilationId": "comp-20260710-143001-a1b2c3d4"
}
```

**File output (rotated):**

```bash
# File logging with rotation
kc compile --log-output ./logs/kc --log-level debug

# Produces:
# ./logs/kc-2026-07-10-14-30-01.log
# ./logs/kc-2026-07-10-14-00-00.log (rotated hourly)
```

#### Log Filtering

Filter by module path glob:

```bash
# Only core and embedding modules
kc compile --log-filter-module "@knowledge-compiler/core,@knowledge-compiler/pass-embedding"

# Exclude cache module
kc compile --log-exclude-module "@knowledge-compiler/cache"

# Only specific passes
kc compile --log-filter-pass "embedding-generator,cluster-assigner"

# Only specific phases
kc compile --log-filter-phase "EMBEDDING,CLUSTERING,OPTIMIZATION"
```

#### Structured Logging Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `timestamp` | ISO 8601 | Log event time | `2026-07-10T14:30:01.234Z` |
| `level` | string | Log level | `info` |
| `module` | string | Package name | `@knowledge-compiler/pass-embedding` |
| `pass` | string | Pass ID | `embedding-generator` |
| `phase` | string | Compiler phase | `EMBEDDING` |
| `message` | string | Human-readable message | `Embedding batch 47/1284 complete` |
| `context` | object | Structured data | `{ batchSize: 128, duration: 2341 }` |
| `error` | object | Error details (if applicable) | `{ code: "EMBEDDING_TIMEOUT", stack: "..." }` |
| `compilationId` | string | Unique compilation run ID | `comp-20260710-143001-a1b2c3d4` |
| `traceId` | string | Trace ID (distributed tracing) | `trace-a1b2c3d4e5f6` |
| `spanId` | string | Span ID | `span-embed-generate-47` |

#### Programmatic Logging API

```typescript
import { createLogger } from '@knowledge-compiler/logger'

const log = createLogger({
  module: '@knowledge-compiler/my-custom-pass',
  level: 'debug',
  format: 'json',
})

// Usage in passes
log.info('Processing batch', { batchSize: 128, sectionCount: sections.length })
log.debug('Embedding API request', { model: 'text-embedding-3-small', tokens: input.tokens })
log.warn('Slow batch detected', { batchIndex: 47, duration: 5234, threshold: 5000 })
log.error('Embedding provider unavailable', { provider: 'openai', attempts: 5 })

// Child loggers with pre-populated fields
const passLog = log.child({ pass: 'embedding-generator' })
passLog.info('Pass started')  // Includes pass field automatically
```

---

### 1.5 IR Inspection

#### Dumping IR State

Dump the full IR state at any phase boundary or after any pass:

```bash
# Dump IR after each phase
kc compile --debug --dump-ir

# Dump IR to specific directory
kc compile --debug --dump-ir-dir ./ir-dumps

# Dump IR after specific pass
kc compile --debug --dump-after-pass embedding-generator

# Dump IR for specific node types only
kc compile --debug --dump-ir-types sections,concepts

# Dump IR in compact form (omit embeddings, full AST)
kc compile --debug --dump-ir-compact
```

**Dump file structure:**

```
ir-dumps/
  PHASE_INIT/
    ir-store.json              # Full IR store serialization
    timings.json               # Per-pass timing
    memory.json                # Memory snapshot
  PHASE_PARSING/
    ir-store.json
    documents.json             # Extracted document list
    sections.json              # Extracted sections
    frontmatter.json           # Frontmatter values
  PHASE_ANALYSIS/
    ir-store.json
    entities.json              # Extracted entities
    references.json            # Reference edges
    keywords.json              # Extracted keywords
    link-analysis.json         # Classified links
  PHASE_EMBEDDING/
    ir-store.json
    embeddings-summary.json    # Count, dimensions, model
  PHASE_CLUSTERING/
    ir-store.json
    clusters.json              # Cluster assignments
  PHASE_OPTIMIZATION/
    ir-store-before.json       # Before optimization
    ir-store-after.json        # After optimization
    optimization-report.json   # What changed
  PHASE_GENERATION/
    ir-store.json
    artifacts.json             # Generated artifact paths
  PHASE_COMPLETE/
    final-report.json          # Full compilation report
```

#### kc inspect — Inspect Generated Artifacts

```bash
# Inspect manifest
kc inspect manifest --json --pretty
kc inspect manifest --filter "type=json"

# Inspect graph statistics
kc inspect graph --json
kc inspect graph --filter "type=document"
kc inspect graph --filter "cluster=cluster-deep-learning"
kc inspect graph --degree ">5"

# Inspect entities
kc inspect entities --limit 20 --sort frequency
kc inspect entities --query "neural" --type technology

# Inspect clusters
kc inspect clusters --limit 10 --sort size
kc inspect clusters --min-size 10 --json

# Inspect concepts
kc inspect concepts --max-depth 3
kc inspect concepts --query "learning"

# Inspect full statistics
kc inspect statistics --json
kc inspect statistics --section embeddings

# Inspect timing timeline
kc inspect timeline --json --sort duration
```

#### IR Size and Structure Analysis

```bash
kc inspect statistics --section graph --json | jq '{
  nodes: .nodeCount,
  edges: .edgeCount,
  density: .density,
  avgDegree: .averageDegree,
  components: .connectedComponents
}'
```

Example output:

```
IR Store Statistics:
  Documents:     847
  Sections:      5,234 (avg 6.2/doc)
  Entities:      6,281
  Concepts:      3,124
  Edges:         89,142
  Embeddings:    12,384 (1536-dim float32)

  Memory Usage:
    Documents:   2.4 MB
    Sections:    41.9 MB (without embeddings)
    Entities:    12.6 MB
    Edges:       28.5 MB
    Embeddings:  76.1 MB (loaded)
    Total:       161.5 MB
```

#### Before/After Comparison for Optimization Passes

Compare IR state before and after optimization to verify correctness:

```bash
# Generate dumps before and after optimization
kc compile --debug --dump-ir --dump-after-pass optimization-*

# Use diff tool
kc inspect diff ./ir-dumps/PHASE_CLUSTERING/ir-store.json ./ir-dumps/PHASE_OPTIMIZATION/ir-store.json
```

Diff output:

```
IR Diff: BEFORE (clustering) → AFTER (optimization)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nodes:
  - documents:   847 → 847 (unchanged)
  - sections:  5,234 → 5,234 (unchanged)
  - entities:  6,281 → 5,947 (-334, 5.3% reduction)
  - concepts:  3,124 → 2,891 (-233, 7.5% reduction)
  - total:    15,442 → 14,875 (-567, 3.7% reduction)

Edges:
  - references: 12,847 → 11,234 (-1,613, 12.6% reduction)
  - co-occurs:  41,234 → 38,912 (-2,322, 5.6% reduction)
  - contains:      847 → 847 (unchanged)
  - total:      89,142 → 84,123 (-5,019, 5.6% reduction)

Embeddings:
  - float32: 12,384 vectors → 12,384 vectors
  - quantized: false → true (int8, 75% size reduction)
  - quality:  1.000 → 0.973 (2.7% degradation)

Optimization Summary:
  - Dead entities removed:     334
  - Duplicate concepts merged: 233
  - Edges pruned (weight<0.3): 5,019
  - Embedding size reduced:    76.1 MB → 19.0 MB
  - Total artifact size:      128 MB → 47 MB
```

#### IR Validation

Validate IR invariants programmatically:

```bash
# Validate IR after compilation
kc inspect validate
kc inspect validate --strict  # Fail on warnings
kc inspect validate --repair  # Attempt automatic fixes
```

Validation checks:

| Check | Description | Failure Action |
|-------|-------------|----------------|
| `node_id_uniqueness` | No duplicate node IDs | Error |
| `edge_id_uniqueness` | No duplicate edge IDs | Error |
| `edge_target_exists` | Every edge target exists | Error |
| `edge_source_exists` | Every edge source exists | Error |
| `adjacency_completeness` | Every edge in adjacency lists | Warning |
| `embedding_dimensionality` | All embeddings same dimensions | Error |
| `embedding_model_consistency` | All embeddings from same model | Warning |
| `document_section_coverage` | Every section belongs to a document | Error |
| `section_position_containment` | Section positions within document | Warning |
| `concept_hierarchy_acyclic` | No cycles in concept hierarchy | Error |
| `cluster_member_exists` | Cluster members exist in graph | Error |
| `pagerank_sum` | PageRank scores sum to 1.0 (±0.01) | Warning |
| `checksum_artifact_match` | Artifact files match manifest checksums | Error |

Validation output:

```
IR Validation Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ node_id_uniqueness:         OK (15,442 unique IDs)
✓ edge_id_uniqueness:         OK (89,142 unique IDs)
✓ edge_target_exists:         OK (all 89,142 targets found)
✓ edge_source_exists:         OK (all 89,142 sources found)
⚠ adjacency_completeness:     12 edges missing from source adjacency (repaired)
✓ embedding_dimensionality:   OK (all 12,384 vectors are 1536-dim)
✓ embedding_model_consistency: OK (all "text-embedding-3-small")
✓ document_section_coverage:  OK (all 5,234 sections have document)
✓ concept_hierarchy_acyclic:  OK (DAG property holds)
⚠ cluster_member_exists:      4 cluster members not found (orphaned, removed)
✓ checksum_artifact_match:    OK (all 12 artifact files match manifest)

Validation: ✗ 0 errors, 2 warnings (1 repaired, 1 auto-fixed)
```

---

### 1.6 Profiling

#### Built-in Profiler

```bash
# Profile compilation
kc compile ./content --profile
kc compile ./content --profile --profile-json > profile.json
kc compile ./content --profile --profile-output ./reports/profile-{timestamp}.html
```

#### Per-Pass Timing Breakdown

```
Compilation Profile — corpus: 847 docs, 3.2s total
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
embedding-generator         1,847ms   57.7%    124 docs/s     ████████████████
text-chunker                  412ms   12.9%  2,104 chunks/s  ███▎
similarity-matrix             298ms    9.3%   28K pairs/s     ██▌
cluster-assigner              184ms    5.8%   847 docs        █▋
frontmatter-parser             92ms    2.9%  9.2 docs/ms      ▊
file-reader                    71ms    2.2%  11.9 docs/ms     ▊
link-extractor                 67ms    2.1%   412 edges/s     ▊
graph-pruning                  54ms    1.7%  1.2K edges/s     ▌
deduplication                  41ms    1.3%   98% unique       ▌
artifact-serializer            36ms    1.1%   15 artifacts     ▌
mdast-parser                   28ms    0.9%  30.2 docs/ms     ▎
manifest-builder               12ms    0.4%                   ▏
... (11 more passes <10ms)
                                     ─────
Total: 3,247ms

Cache Hit Rate: 87.3% (12,834 hits / 14,706 lookups)
Memory Peak: 2.1 GB (@ embedding-generator)
Worker Threads: 7 (peak parallelism)
Wall Time: 3,247ms | CPU Time: 12,847ms | Parallel Efficiency: 3.96x
```

#### Profiling JSON Output

```json
{
  "compilation": {
    "corpus": { "documents": 847, "sections": 5234, "entities": 6281 },
    "totalWallTime": 3247,
    "totalCpuTime": 12847,
    "parallelEfficiency": 3.96,
    "cacheHitRate": 0.873,
    "memoryPeakMB": 2148
  },
  "phases": [
    {
      "name": "PARSING",
      "wallTime": 191,
      "cpuTime": 312,
      "passes": [
        { "name": "glob-resolver", "wallTime": 47, "cpuTime": 47, "items": 847, "rate": "18.0 patterns/ms", "status": "success" },
        { "name": "file-reader", "wallTime": 71, "cpuTime": 142, "items": 847, "rate": "11.9 docs/ms", "status": "success" },
        { "name": "frontmatter-parser", "wallTime": 92, "cpuTime": 98, "items": 847, "rate": "9.2 docs/ms", "status": "success" },
        { "name": "mdast-parser", "wallTime": 28, "cpuTime": 25, "items": 845, "rate": "30.2 docs/ms", "status": "success" }
      ]
    }
  ]
}
```

#### Memory Allocation Tracking

```bash
# Track memory per pass
kc compile --profile --profile-memory

# Track with GC logging
kc compile --profile --profile-gc

# Sample output:
Pass                     Heap Before  Heap After   Delta    Allocated   GC Cycles
─────────────────────────────────────────────────────────────────────────────
file-reader              342 MB       418 MB       +76 MB   312 MB      2
mdast-parser             418 MB       534 MB       +116 MB  1,247 MB    4
entity-extraction        534 MB       678 MB       +144 MB  892 MB      3
embedding-generator      678 MB       1,247 MB     +569 MB  4,213 MB    12
text-chunker             1,247 MB     1,112 MB     -135 MB  892 MB      5
similarity-matrix        1,112 MB     1,034 MB     -78 MB   623 MB      3
cluster-assigner         1,034 MB     987 MB       -47 MB   412 MB      2
... (optimization passes release memory)
artifact-serializer      412 MB       389 MB       -23 MB   189 MB      1
```

**Memory profiling options:**

| Option | Description | Overhead |
|--------|-------------|----------|
| `--profile-memory` | Track heap used before/after each pass | 5% |
| `--profile-gc` | Log GC events (type, duration, reclaimed) | 10% |
| `--profile-heap-snapshot` | Take full heap snapshot at phase boundaries | 50%, adds seconds |
| `--profile-large-objects` | Track objects >1 MB | 2% |

#### Hot Spot Identification

```bash
# Identify slowest passes
kc profile ./content --sort time --threshold 50

# Flamegraph output (compatible with speedscope.app)
kc compile --profile --profile-flame > flame.json
# Open flame.json in https://www.speedscope.app

# CPU sampling profiler
kc compile --profile --profile-cpu-sampling --profile-sample-interval 1000
```

**Flamegraph interpretation:**

```
embedding-generator (1,847ms) ─────────────────────────────────
├─ embedBatch (1,234ms) ──────────────────────────────────
│  ├─ apiCall (987ms) ────────────────────────────────
│  │  ├─ httpRequest (890ms)
│  │  ├─ responseParse (97ms)
│  ├─ batchPrepare (247ms)
│  │  ├─ chunkJoin (89ms)
│  │  ├─ tokenCount (78ms)
│  │  ├─ batchSerialize (80ms)
├─ cacheCheck (312ms)
├─ resultProcess (301ms)
   ├─ dimensionReduce (201ms)
   ├─ storeEmbeddings (100ms)
```

#### Cache Performance Analysis

```bash
# Detailed cache stats per pass
kc cache info --verbose

Pass                     Hits     Misses    Rate     Size     Evictions
────────────────────────────────────────────────────────────────────────
file-reader              1,234    535       69.8%    12 MB    0
mdast-parser             1,201    312       79.4%    89 MB    12
entity-extraction       892      423       67.8%    234 MB   47
reference-extraction    1,024    312       76.7%    56 MB    8
embedding-generator     4,213    1,289     76.6%    892 MB   234
text-chunker            1,892    412       82.1%    47 MB    4
similarity-matrix       2,034    312       86.7%    162 MB   28
cluster-assigner        1,234    89        93.3%    12 MB    2
```

#### Profiling Output Format

Output to HTML for visual analysis:

```bash
kc compile --profile --profile-output report.html
# Opens a self-contained HTML report with:
# - Interactive flamegraph
# - Phase/pass breakdown chart (bar or treemap)
# - Memory timeline
# - Cache hit rate by pass
# - Parallel efficiency chart
# - Bottleneck suggestions
```

---

### 1.7 Tracing

#### Request Tracing Across the Pipeline

Enable distributed trace propagation:

```bash
# Enable tracing
KC_TRACE=true kc compile ./content
KC_TRACE_SAMPLING_RATE=0.1 kc compile ./content   # 10% sampling

# Export to OpenTelemetry collector
KC_TRACE_EXPORTER=otlp kc compile ./content
KC_TRACE_OTLP_ENDPOINT=http://localhost:4318/v1/traces

# Export to console (for debugging)
KC_TRACE_EXPORTER=console kc compile ./content
```

#### Span-Based Tracing (OpenTelemetry Compatible)

Each pass creates a span hierarchy:

```
trace-id: trace-a1b2c3d4e5f6
├── span: kc.compile (duration: 3,247ms)
│   ├── span: phase.INIT (duration: 124ms)
│   ├── span: phase.PARSING (duration: 191ms)
│   │   ├── span: pass.file-reader (duration: 71ms)
│   │   │   ├── span: file-reader.resolve-globs (duration: 12ms)
│   │   │   ├── span: file-reader.read-batch (duration: 58ms)
│   │   │   │   ├── span: file-reader.read-file (duration: 2ms) × 47
│   │   ├── span: pass.frontmatter-parser (duration: 92ms)
│   │   └── span: pass.mdast-parser (duration: 28ms)
│   ├── span: phase.ANALYSIS (duration: 412ms)
│   ├── span: phase.EMBEDDING (duration: 1,847ms)
│   │   ├── span: pass.text-chunker (duration: 412ms)
│   │   ├── span: pass.embedding-generator (duration: 1,847ms)
│   │   │   ├── span: embed.batch-1 (duration: 234ms)
│   │   │   ├── span: embed.batch-2 (duration: 198ms)
│   │   │   ├── ...
│   │   │   └── span: embed.batch-47 (duration: 312ms)
│   └── span: phase.GENERATION (duration: 124ms)
```

#### Trace Visualization (Flame Graphs)

```bash
# Export traces to a file
KC_TRACE_EXPORTER=file KC_TRACE_FILE=./traces/trace.json kc compile ./content

# Generate flamegraph
kc trace flamegraph ./traces/trace.json > flame.svg
kc trace timeline ./traces/trace.json > timeline.html
```

#### Distributed Tracing for Multi-Machine

```bash
# On coordinator
KC_TRACE_EXPORTER=otlp KC_TRACE_OTLP_ENDPOINT=http://collector:4318 kc compile

# On workers  
KC_TRACE_EXPORTER=otlp KC_TRACE_OTLP_ENDPOINT=http://collector:4318 kc worker
```

Traces from coordinator and workers share a trace-id, enabling end-to-end visibility across machines.

---

### 1.8 Memory Debugging

#### Memory Usage Tracking Per Pass

```bash
# Track memory at every pass boundary
kc compile --profile --profile-memory

# Track with detailed object counts
kc compile --profile --profile-memory --profile-memory-detailed

# Output sample:
[PASS:embedding-generator] Memory Report:
  Heap Used:        1,247 MB          (Δ +569 MB from previous pass)
  Heap Total:       1,892 MB
  External:         234 MB            (ArrayBuffer, WASM)
  ArrayBuffers:     189 MB            (embedding vectors)
  Objects:          847,234
  Strings:          189 MB            (section content, entity names)
  GC Duration:      412ms total       (12 GC cycles during pass)
  Largest Objects:
    embeddings:     76 MB             (Float32Array[128][1536])
    chunkCache:     34 MB             (Map<SectionID, TextChunk>)
    tokenBuffers:   28 MB             (temp arrays for tokenization)
```

#### Memory Leak Detection

```bash
# Compare heap across repeated compilations
kc compile --profile --profile-memory --profile-memory-compare

# Run 3 compilations in same process, check for growth
kc compile --profile --profile-memory --profile-memory-iters 3

# Output:
Memory Growth Across 3 Compilations:
  Pass                     Iter 1    Iter 2    Iter 3    Trend
  ────────────────────────────────────────────────────────────
  file-reader              76 MB     78 MB     75 MB     stable
  mdast-parser             116 MB    118 MB    117 MB    stable
  entity-extraction        144 MB    148 MB    151 MB    ⚠ +4.9% growth
  embedding-generator      569 MB    574 MB    578 MB    ⚠ +1.6% growth
  similarity-matrix        78 MB     76 MB     79 MB     stable
  artifact-serializer      23 MB     22 MB     23 MB     stable
  Total                    342 MB    348 MB    354 MB    ⚠ +3.5% growth

  Leak candidates (objects retained after GC):
    entity-extraction:
      - EntityCache:   +1,234 entries retained (expected: 0)
      - StringPool:    +892 strings retained (expected: 0)
```

#### Large Object Identification

```bash
# List largest objects in heap
kc compile --profile --profile-large-objects --profile-large-objects-threshold 5

# Output:
Large Objects (>5 MB):
  ┌──────────────────────────────────────────────┬──────────┬──────────┐
  │ Object                                       │ Size     │ Retained │
  ├──────────────────────────────────────────────┼──────────┼──────────┤
  │ EMBEDDINGS: Float32Array[128][1536]           │ 786 KB   │ 786 KB   │
  │ CACHE: LRUCache entries                       │ 34 MB    │ 312 MB   │
  │ IR: SectionNode[5234]                         │ 42 MB    │ 89 MB    │
  │ IR: Edge[89142]                               │ 28 MB    │ 56 MB    │
  │ TEXT: sectionContent concatenated             │ 89 MB    │ 89 MB    │
  │ TEXT: documentBody (raw)                      │ 12 MB    │ 12 MB    │
  │ WORKER: sharedArrayBuffer                     │ 256 MB   │ 256 MB   │
  └──────────────────────────────────────────────┴──────────┴──────────┘
```

#### Stream vs Buffer Analysis

```bash
# Analyze whether passes use streaming or buffered I/O
kc compile --profile --profile-io

# Output:
I/O Analysis:
  Pass                     Read Mode    Write Mode   Peak Buffered
  ────────────────────────────────────────────────────────────────
  file-reader              buffered     —            2.1 MB (all files)
  artifact-serializer      —            streams      0 KB (streaming write)
  embedding-generator      streams      —            128 KB (per batch)
  cache-reader             streams      streams      0 KB (streaming)
  cache-writer             —            streams      0 KB (streaming)
```

#### Garbage Collection Monitoring

```bash
# Detailed GC logging
kc compile --debug --profile-gc
NODE_OPTIONS="--trace-gc --expose-gc" kc compile

# GC Log Output
[GC] [14:30:05] Scavenge  (minor)  342 MB → 298 MB, 12ms, 89% space reclaimed
[GC] [14:30:12] Mark-Sweep (major)  1,247 MB → 892 MB, 47ms, 28% space reclaimed
[GC] [14:30:18] Mark-Sweep (major)  1,892 MB → 1,034 MB, 89ms, 45% space reclaimed
[GC] [14:30:25] Mark-Sweep (major)  1,847 MB → 987 MB, 92ms, 47% space reclaimed
```

---

## 2. Frontend Debugging

### 2.1 Artifact Loading

#### Artifact Loading Errors

| Error | Cause | Debug |
|-------|-------|-------|
| `ArtifactNotFound` | Artifact missing from output directory | Check `kc inspect manifest` for missing entries |
| `ArtifactChecksumMismatch` | File content doesn't match manifest hash | Recompile with `kc compile --clean` |
| `ArtifactVersionMismatch` | Artifact schema version != reader version | Recompile with latest compiler; check migration guide |
| `ArtifactParseError` | JSON parse failure on artifact | Validate with `kc inspect validate`; check for truncation |
| `EmbeddingFormatError` | Binary embedding file corrupt | Check binary header magic (`0x4B43454D`); recompile |
| `CrossReferenceError` | Artifact references node that doesn't exist | Run `kc inspect validate` for integrity check |

#### Missing Artifact Detection

```bash
# Check which artifacts are expected vs present
kc inspect manifest --json | jq '.artifacts | keys'

# Expected artifacts:
# - manifest.json
# - knowledge.json
# - graph.json
# - entities.json
# - clusters.json
# - concepts.json
# - navigation.json
# - embeddings/index.json
# - embeddings/embeddings.bin
# - search-index.json
# - relationships.json
# - recommendations.json
# - statistics.json
# - compiler-report.json
```

#### Artifact Validation in Frontend

```typescript
// In browser console
import { ArtifactLoader } from '@knowledge-compiler/artifact-reader'

const loader = new ArtifactLoader('/artifacts')
await loader.validate()

// Validation output:
{
  manifest: { valid: true, hash: 'a1b2c3d4...' },
  knowledge: { valid: true, hash: 'b2c3d4e5...' },
  graph: { valid: true, hash: 'c3d4e5f6...' },
  entities: { valid: true, hash: 'd4e5f6a7...' },
  embeddings: { valid: true, dimensions: 1536, count: 14382 },
  crossReferences: { valid: true, checked: 89142 },
  version: { manifest: 1, reader: 1, compatible: true }
}
```

#### Version Mismatch Detection

| Scenario | Behavior | Fix |
|----------|----------|-----|
| Artifact version < reader version | Reader attempts migration (may fail) | Recompile with latest compiler |
| Artifact version > reader version | Reader refuses to load | Update frontend dependencies |
| Compiler version mismatch | Warning banner displayed | Align compiler version with build pipeline |

---

### 2.2 Performance Debugging

#### Rendering Performance (FPS Counter)

Enable in frontend:

```typescript
// In browser console
window.__KC_DEBUG__ = true
window.__KC_SHOW_FPS__ = true

// Or via URL parameter
?kc-debug&kc-fps
```

FPS overlay:

```
┌─────────────────────────────────┐
│ FPS: 58 │ Frame: 16.2ms │ GPU  │
│ ▁▃▄▆█▇▆▅▄▃▂▁                     │
│ P99: 32ms │ Dropped: 3/1200     │
│ Canvas: 4231 nodes, 18294 edges │
│ Zoom: 1.4x │ Visible: 847 nodes │
└─────────────────────────────────┘
```

**Common rendering bottlenecks:**

| Symptom | Cause | Fix |
|---------|-------|-----|
| Low FPS with many nodes | Force simulation on too many nodes | Enable canvas quadtree; reduce visible nodes |
| Janky pan/zoom | Re-rendering on every frame | Use transform CSS, not re-render |
| Slow initial render | Full graph loaded at once | Virtualize; use progressive loading |
| Memory grows over time | Node/edge objects not released | Check for event listener leaks; use object pools |

#### Network Request Analysis

```bash
# In browser DevTools → Network tab, filter by "artifact"

# Critical paths:
# 1. manifest.json (small, loads first)
# 2. graph.json (medium, renders graph)
# 3. search-index.json (large, enables search)
# 4. knowledge.json (largest, full data)
# 5. embeddings.bin (huge, on-demand)

# Expected load times (100Mbps connection):
# 1 MB  → 80ms
# 10 MB → 800ms
# 50 MB → 4s
# 200 MB → 16s (consider lazy loading)
```

**Artifact loading waterfall:**

```
GET /artifacts/manifest.json          [12ms, 412B]
GET /artifacts/navigation.json        [18ms, 187KB]
GET /artifacts/graph.json             [45ms, 2.8MB]
  → Parse graph.json                  [12ms]
  → Initialize force simulation       [34ms]
  → First paint                       [89ms]
GET /artifacts/entities.json          [78ms, 3.8MB]  (lazy)
GET /artifacts/search-index.json      [234ms, 6.7MB]  (on search)
GET /artifacts/embeddings/embeddings.bin [1.2s, 128MB] (on semantic search)
```

#### Memory Usage in Browser

```typescript
// In browser console
window.__KC_MEMORY__()

// Output:
Memory Usage:
  JS Heap: 342 MB / 512 MB (66.8%)
  Artifact Cache:
    manifest.json:      412 B
    graph.json:         2.8 MB (parsed: 12.4 MB)
    entities.json:      3.8 MB (parsed: 18.7 MB)
    search-index.json:  6.7 MB (parsed: 28.9 MB)
    embeddings.bin:     0 B (not loaded, lazy)
  Force Simulation:     2.8 MB (node positions, velocities)
  Canvas Textures:      8 MB (label textures)
  Total:                74.5 MB (excluding JS heap)
```

#### Re-Render Debugging (React DevTools)

```bash
# Enable React DevTools profiling
# In React DevTools → Profiler → Record

# Look for:
# - Unnecessary re-renders (components that render without prop/state changes)
# - Large component trees re-rendering
# - Expensive layout effects

# Common culprits:
# - GraphCanvas re-renders on every simulation tick (should use refs)
# - SearchResults re-renders on every keystroke (should debounce)
# - Navigation sidebar re-renders on every page change (should memoize)
```

---

### 2.3 Visualization Debugging

#### Graph Rendering Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Nodes overlapping | Force simulation not reaching equilibrium | Increase simulation ticks; enable collision detection |
| Edges crossing nodes | No edge-node collision avoidance | Enable edge routing (D3 forceEdgeBundling) |
| Graph off-center | Bounding box not computed | Call `force.center()` after simulation settles |
| Nodes outside viewport | Initial positions not normalized | Normalize positions to [-1, 1] × viewport |
| Labels clipped | Font size too large for node size | Auto-scale font to node radius; use abbreviations |
| Performance stutter | Too many active forces | Reduce to 2 forces (charge + link) for >5000 nodes |

#### Physics Simulation Debugging

```typescript
// In browser console
window.__KC_GRAPH_DEBUG__ = true

// Shows simulation state:
Simulation State:
  Tick: 124/300
  Alpha: 0.042 (target: 0.001)
  Energy: 1,247.3 (↓ 94.2% from initial)
  Forces:
    charge:   -412.3 (center: 0)
    link:     892.1 (ideal length: 50)
    collide:  23.4 (overlaps: 3)
    center:   12.3 (drift: 2.1)
  Nodes settled: 4,128/4,231 (97.6%)

// Force parameters:
{
  charge: { strength: -300, distanceMax: 500, theta: 0.8 },
  link: { distance: 50, iterations: 4, strength: (edge) => edge.weight },
  collide: { radius: (node) => node.size + 2, strength: 0.7 },
  center: { x: width/2, y: height/2, strength: 0.05 }
}
```

#### Layout Issues

| Layout | Issue | Debug Step |
|--------|-------|------------|
| Force-directed | Clustered nodes too dense | Increase `charge.strength`; decrease `link.distance` |
| Force-directed | Graph never stabilizes | Reduce `alphaMin`; increase `alphaDecay` |
| Hierarchical | Layer assignment wrong | Check `node.depth` values; override with manual sort |
| Hierarchical | Crossings in layers | Enable barycenter heuristic; increase iterations |
| Radial | Root node off-center | Set `root.x = center.x, root.y = center.y` |
| Radial | Uneven angular distribution | Sort children by angle before layout |

#### Color/Theme Issues

```typescript
// Override colors in console
window.__KC_GRAPH_COLORS__ = {
  document: '#3B82F6',
  section: '#60A5FA',
  entity: '#F59E0B',
  concept: '#10B981',
  topic: '#8B5CF6',
  edge: '#94A3B8',
  cluster_default: '#6B7280',
}

// Check current theme
window.__KC_GRAPH_THEME__()
// Returns current color map, cluster colors, edge opacity settings
```

---

## 3. Diagnostic Commands

### 3.1 `kc diagnose`

Full system diagnostic that checks compiler health, configuration, plugins, and connectivity.

```bash
kc diagnose
kc diagnose --json
kc diagnose --verbose
kc diagnose --output ./diagnostics/report-{timestamp}.json
```

#### Diagnostic Output

```
╔══════════════════════════════════════════════════════════════╗
║                Knowledge Compiler — Diagnostics              ║
║                Generated: 2026-07-10T14:30:01.234Z           ║
╚══════════════════════════════════════════════════════════════╝

System Information:
  OS:              macOS 15.2 (arm64)
  Node.js:         v22.5.0
  Memory:          32 GB (22.4 GB free)
  CPU:             Apple M3 Pro (12 cores)
  Disk:            / 489 GB free of 1TB
  Process:         pid 84723, uptime 12m

Compiler Version:
  CLI:             @knowledge-compiler/cli v1.0.0
  Core:            @knowledge-compiler/core v1.0.0
  Artifact Format: v1
  Config:          ./knowledge-compiler.json

Configuration Validation:
  ✓ Config file exists: ./knowledge-compiler.json
  ✓ Config syntax valid
  ✓ Config schema valid (0 errors, 2 warnings)
  ⚠ Warning: Unused config key 'experimental.featureX'
  ⚠ Warning: Deprecated config key 'outputDir' — use 'output.directory'

  Input globs:
    ✓ content/**/*.md → 847 files
    ⚠ !content/drafts/** → no files (pattern is valid but matches nothing)

Plugin Compatibility:
  ✓ @knowledge-compiler/plugin-graphviz   v1.2.0  (compatible)
  ✓ @knowledge-compiler/plugin-pdf         v2.0.1  (compatible)
  ✗ @knowledge-compiler/plugin-notion      v0.5.0  (incompatible: requires plugin API v2, current v3)

Embedding Provider:
  Provider:        openai (text-embedding-3-small)
  Connectivity:    ✓ OK (12ms ping)
  Authentication:  ✓ Valid API key
  Rate Limits:
    TPM Used:      847,000 / 1,000,000 (84.7%)
    RPM Used:      142 / 500 (28.4%)
    Batch Size:    128 (optimal: 128)
  Model:           text-embedding-3-small (dimensions: 1536)

Cache Health:
  Location:        .knowledge-cache
  Format Version:  2
  Total Entries:   1,847
  Total Size:      1.2 GB / 5 GB (24.0%)
  Integrity:       ✓ All entries pass checksum validation
  Corruption:      0 entries corrupted
  Old Format:      0 entries (will migrate on next read)

  Per-pass cache:
    file-reader:            234 hits, 123 misses (65.5% hit rate)
    frontmatter-parser:    198 hits, 89 misses (69.0%)
    mdast-parser:          167 hits, 78 misses (68.2%)
    entity-extraction:     412 hits, 234 misses (63.8%)
    embedding-generator:   1,234 hits, 847 misses (59.3%) — LOW HIT RATE

  Recommendation: Embedding cache hit rate is below 65%.
  Consider enabling incremental compilation for better cache utilization.

Summary:
  ✓ 12 checks passed
  ⚠ 4 warnings (review recommended)
  ✗ 1 error (plugin incompatibility)
```

#### Diagnostic Checks

| Check | What It Tests | Failure Impact |
|-------|---------------|----------------|
| `system` | OS, Node version, memory, CPU | Compilation may fail on unsupported Node |
| `config` | File existence, syntax, schema | Won't start without valid config |
| `config.schema` | Schema validation against Zod | Incorrect behavior from bad config |
| `config.files` | Glob patterns resolve to files | No source to compile |
| `plugins.compatibility` | Plugin versions vs compiler API | Incompatible plugins crash at load |
| `plugins.dependencies` | Plugin dependencies installed | Missing dependencies cause runtime errors |
| `embeddings.connectivity` | Provider API reachable | Embedding fails → TF-IDF fallback |
| `embeddings.auth` | API key valid | Embedding fails with 401 |
| `embeddings.rateLimits` | Usage vs quota | Rate limiting slows compilation |
| `cache.integrity` | Checksum validation on entries | Corrupted entries silently regenerated |
| `cache.hitRate` | Per-pass hit rate analysis | Low hit rate → slow incremental builds |
| `cache.diskSpace` | Available vs required | Disk full → write failures |
| `network.latency` | Embedding API latency | High latency slows embedding phase |
| `workers.available` | Worker thread availability | Fallback to single-threaded mode |
| `semver` | Package version consistency | Mismatched versions cause runtime errors |

---

### 3.2 `kc doctor`

Automated troubleshooting with fix suggestions.

```bash
kc doctor
kc doctor --fix         # Auto-apply fixes
kc doctor --dry-run     # Show what would be fixed
kc doctor --check config,plugins,cache
```

#### Doctor Output

```
🏥 Knowledge Compiler Doctor — Checking your setup...

Config:
  ✓ Config file exists and is valid
  ✓ All required fields present
  ✓ No deprecated keys

Plugins:
  ✓ All plugins compatible
  ✓ All dependencies installed
  ✓ No conflicting plugin registrations

Cache:
  ⚠ Cache hit rate for embedding-generator is 59.3% (threshold: 65%)
  ✓ Run: kc cache clear to reset (may temporarily reduce performance)
  ✓ Recommendation: Increase cache size or enable incremental mode

Environment:
  ✓ OPENAI_API_KEY is set
  ✓ Node.js version 22.5.0 (required: >=18)
  ✓ Sufficient disk space (489 GB free)

Auto-fixes applied:
  • Updated config key: outputDir → output.directory
  • Removed unused key: experimental.featureX
  • Disabled incompatible plugin: @knowledge-compiler/plugin-notion

Summary:
  ✓ 5 checks passed
  ⚠ 1 warning
  ✗ 0 errors
  → 2 auto-fixes applied
```

#### Common Issue Detection

| Condition | Detection | Fix |
|-----------|-----------|-----|
| Cache hit rate < 50% | `kc cache info --json \| jq '.hitRate'` | Enable incremental mode; increase cache size |
| Disk free < 10% output size | `kc diagnose --check diskSpace` | Free space; change output directory |
| Embedding API timeout | `kc diagnose --check embeddings.latency` | Check network; reduce batch size; switch provider |
| Plugin mismatch | `kc doctor --check plugins` | Update plugins; or downgrade compiler |
| Config key deprecated | `kc doctor --check config` | Run `kc doctor --fix` to auto-migrate |
| Node version < 18 | `kc diagnose --check system` | Upgrade Node.js via `nvm install 22` |
| Worker thread unavailable | `kc diagnose --check workers` | Check `--max-old-space-size` and `--experimental-worker` flags |

#### Fix Suggestions Database

```typescript
interface FixSuggestion {
  id: string
  check: (ctx: DiagnosticContext) => Promise<CheckResult>
  fix: (ctx: DiagnosticContext) => Promise<FixResult>
  condition: string
  message: string
  autoFixable: boolean
  risk: 'low' | 'medium' | 'high'
}

const FIX_SUGGESTIONS: Record<string, FixSuggestion> = {
  CACHE_LOW_HIT_RATE: {
    condition: 'cache.hitRate < 0.65',
    message: 'Cache hit rate is below 65%. Consider enabling incremental compilation.',
    autoFixable: false,
    risk: 'low',
    check: async (ctx) => { /* check hit rate */ },
    fix: async (ctx) => { /* suggest config change */ },
  },
  CONFIG_DEPRECATED_KEY: {
    condition: 'config has deprecated keys',
    message: 'Config key "{key}" is deprecated. Use "{replacement}" instead.',
    autoFixable: true,
    risk: 'low',
    check: async (ctx) => { /* scan for deprecated keys */ },
    fix: async (ctx) => { /* auto-migrate key */ },
  },
  PLUGIN_INCOMPATIBLE: {
    condition: 'plugin.compatible === false',
    message: 'Plugin "{name}" v{version} is incompatible with compiler v{compilerVersion}.',
    autoFixable: false,
    risk: 'medium',
    check: async (ctx) => { /* check plugin compatibility */ },
    fix: async (ctx) => { /* suggest upgrade/downgrade */ },
  },
}
```

---

## 4. Development Tools

### 4.1 VS Code Extensions

#### Recommended Extensions

| Extension | Purpose | Config Snippet |
|-----------|---------|----------------|
| **Knowledge Compiler Language Support** | Syntax highlighting for config, debug output | Built-in |
| **Debugger for Knowledge Compiler** | Launch configurations, pass breakpoints | Install from marketplace |
| **Mermaid Preview** | View `.mmd` diagrams in documentation | `mermaid.preview` |
| **Zod Schema Viewer** | Visualize Zod schemas | `zod.previewOnHover` |
| **YAML** | Frontmatter editing | `yaml.format.enable` |
| **Markdown All in One** | Document editing | `markdown.preview.breaks` |
| **Error Lens** | Inline error display | `errorLint.enabled` |
| **Pretty TypeScript Errors** | Human-readable TS errors | `prettyTypescriptErrors` |
| **Heap Snapshot Viewer** | Analyze `.heapsnapshot` files | `.vscode/heapviz.json` |

#### Debug Configuration (`.vscode/launch.json`)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Compile (debug)",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/packages/cli/dist/bin/kc.js",
      "args": ["compile", "./content", "--debug", "--log-level", "debug"],
      "cwd": "${workspaceFolder}",
      "env": {
        "KC_DEBUG": "true",
        "KC_LOG_LEVEL": "debug",
        "NODE_OPTIONS": "--max-old-space-size=8192"
      },
      "sourceMaps": true,
      "skipFiles": ["<node_internals>/**"],
      "console": "integratedTerminal",
      "outputCapture": "std"
    },
    {
      "name": "Compile (profile)",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/packages/cli/dist/bin/kc.js",
      "args": ["compile", "./content", "--profile", "--profile-flame"],
      "cwd": "${workspaceFolder}",
      "env": {
        "NODE_OPTIONS": "--max-old-space-size=8192 --prof"
      },
      "outputCapture": "std"
    },
    {
      "name": "Attach to Worker",
      "type": "node",
      "request": "attach",
      "port": 9230,
      "sourceMaps": true,
      "restart": true
    },
    {
      "name": "Test (current file)",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/vitest",
      "args": ["run", "${relativeFile}", "--reporter", "verbose"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal"
    },
    {
      "name": "Test (all)",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/vitest",
      "args": ["run", "--reporter", "verbose"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal"
    }
  ]
}
```

#### Task Configuration (`.vscode/tasks.json`)

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "kc: compile incremental",
      "type": "shell",
      "command": "kc compile --incremental --mode quick",
      "group": "build",
      "problemMatcher": ["$knowledge-compiler"]
    },
    {
      "label": "kc: watch",
      "type": "shell",
      "command": "kc watch --debounce 300",
      "isBackground": true,
      "group": "build",
      "problemMatcher": {
        "pattern": [
          { "regexp": "^(✗|⚠|✓)\\s*(\\w+):\\s*(.+)$", "severity": 1, "code": 2, "message": 3 }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Watching for changes",
          "endsPattern": "Compilation complete"
        }
      }
    },
    {
      "label": "kc: diagnose",
      "type": "shell",
      "command": "kc diagnose --verbose",
      "group": "test",
      "problemMatcher": []
    },
    {
      "label": "kc: profile",
      "type": "shell",
      "command": "kc profile --sort time --output profile.html",
      "group": "test",
      "problemMatcher": []
    }
  ]
}
```

### 4.2 Chrome DevTools

#### React DevTools Setup

```bash
# Install React DevTools extension for Chrome
# https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi

# Enable profiling
?kc-devtools  # Add to URL for enhanced DevTools integration
```

**Key DevTools workflows:**

| Task | Steps |
|------|-------|
| Find unnecessary re-renders | Components → Highlight Updates → Interact with app |
| Profile component render times | Profiler → Record → Interact → Analyze flamegraph |
| Inspect component props/state | Components → Select component → View props/state |
| Debug hooks | Components → Select component → View hooks list |

#### Performance Profiling

```bash
# In Chrome DevTools → Performance tab

# Record profile:
# 1. Start recording
# 2. Load a knowledge base page
# 3. Interact (search, navigate, zoom graph)
# 4. Stop recording

# Look for:
# - Long tasks (>50ms) — these block the main thread
# - Forced reflow — layout thrashing from style reads after DOM writes
# - Excessive GC — frequent garbage collection pauses
# - Large JS heap — artifact parsing creates many objects

# Performance budget:
# Interaction       Budget
# Page load         <2s
# Search response   <100ms
# Graph pan/zoom    60fps
# Navigation        <300ms
```

#### Memory Profiling

```bash
# In Chrome DevTools → Memory tab

# Heap snapshot workflow:
# 1. Take snapshot 1 (baseline, after page load)
# 2. Perform actions (search, navigate, zoom)
# 3. Take snapshot 2
# 4. Compare: select Snapshot 2 → "Comparison" view

# Look for:
# - Detached DOM nodes (retained by JS references)
# - Artifact objects not released (knowledge graph arrays)
# - Event listeners not cleaned up
# - Closures retaining large object graphs

# Common memory patterns in Knowledge Compiler frontend:
# - Force simulation retains all node/edge objects until destroyed
# - Search index loaded as single large object (~28 MB parsed)
# - Embedding data loaded on demand, should be released when not used
```

#### Network Analysis

```bash
# In Chrome DevTools → Network tab

# Filter: artifact or .json or .bin
# Check:
# - Artifact sizes match expected (see artifact spec)
# - Caching headers set (Cache-Control: public, immutable, max-age=31536000)
# - Content-Encoding: gzip or br (Brotli)
# - Transfer sizes vs content sizes (compression ratio)

# Expected compression ratios:
# knowledge.json → gzip: 6:1, brotli: 8:1
# graph.json     → gzip: 5:1, brotli: 7:1
# embeddings.bin → gzip: ~1.05:1 (near-incompressible)
```

---

## 5. Benchmarking Tools

### Built-in Benchmark Suite

```bash
# Run full benchmark suite
kc benchmark
kc benchmark --json > benchmark-results.json
kc benchmark --compare baseline.json  # Compare against baseline

# Specific benchmarks
kc benchmark passes         # Per-pass timing
kc benchmark memory         # Memory usage
kc benchmark cache          # Cache performance
kc benchmark scaling        # Scaling with corpus size
kc benchmark all            # Full suite
```

#### Benchmark Output

```
Knowledge Compiler — Benchmark Suite
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Environment: macOS 15.2, Apple M3 Pro, 32GB, Node v22.5.0
Date: 2026-07-10T14:30:01.234Z

Pass Benchmarks:
  Pass                     Δ from baseline    p50      p95      p99      Samples
  ──────────────────────────────────────────────────────────────────────────────
  file-reader              +2.1% (p=0.23)     71ms     89ms     94ms     100
  frontmatter-parser       +1.4% (p=0.34)     92ms     112ms    124ms    100
  mdast-parser             +0.8% (p=0.41)     28ms     34ms     38ms     100
  entity-extraction        -3.2% (p=0.12)     412ms    523ms    589ms    100
  embedding-generator      +5.7% (p=0.04) ✗   1,847ms  2,234ms  2,412ms  100
  similarity-matrix        +0.3% (p=0.67)     298ms    345ms    378ms    100
  cluster-assigner         -1.2% (p=0.29)     184ms    212ms    234ms    100

  ➜ embedding-generator shows statistically significant regression (+5.7%, p=0.04)

Memory Benchmarks:
  Scenario                 Peak Heap    Δ from baseline
  ──────────────────────────────────────────────────────
  1K docs (baseline)        892 MB       —
  5K docs                  2,847 MB     +1955 MB (expected: +200%)
  10K docs                 5,234 MB     +4342 MB (expected: +400%)
  Incremental build (1 chg) 412 MB      — (87% less than full build)

Cache Benchmarks:
  Scenario                 Hit Rate    Time    Δ from uncached
  ──────────────────────────────────────────────────────────────
  Uncached (cold)           0.0%       3,247ms  —
  Cached (warm)            87.3%       412ms    -87.3%
  Incremental (1 change)   92.1%       234ms    -92.8%

Scaling Benchmarks:
  Corpus        Documents    Time       Memory     Cache Hit
  ──────────────────────────────────────────────────────────
  tiny          50           412ms      234 MB     0%
  small         1,000        3,247ms    892 MB     87%
  medium        10,000       28,412ms   2.8 GB     91%
  large         100,000      312,847ms  8.2 GB     94%  (projected)
```

### Custom Benchmark Creation

```typescript
// benchmarks/my-custom-benchmark.ts
import { Benchmark, BenchmarkSuite } from '@knowledge-compiler/benchmark'

const suite = new BenchmarkSuite('custom-analysis')

// Microbenchmark a specific function
suite.add('entity-extraction: regex vs spaCy', async (bench) => {
  const section = loadFixture('sections/technical.md')

  bench.start('regex')
  for (let i = 0; i < 100; i++) {
    extractWithRegex(section)
  }
  bench.end('regex')

  bench.start('spacy-wasm')
  for (let i = 0; i < 100; i++) {
    await extractWithSpacy(section)
  }
  bench.end('spacy-wasm')
})

// Benchmark across corpus sizes
suite.add('scaling: full compile', async (bench) => {
  for (const size of [50, 100, 500, 1000]) {
    const corpus = generateCorpus(size)
    bench.start(`compile-${size}`)
    await compile(corpus)
    bench.end(`compile-${size}`)
  }
})

suite.run({ iterations: 5, warmup: 2 }).then((results) => {
  console.log(results.format('table'))
})
```

### Result Comparison

```bash
# Compare against baseline
kc benchmark --compare baseline.json
kc benchmark --compare baseline.json --threshold 5  # Alert on >5% regression

# Output:
Regression Alert: embedding-generator mean +5.7% (p=0.04) exceeds threshold (5%)
```

### Regression Detection

```bash
# CI integration
kc benchmark --json --fail-on-regression --threshold 10 > results.json

# Exit code:
# 0 — No regressions or improvements
# 1 — Regression detected (exceeds threshold)
# 2 — Benchmark error (invalid suite, missing baseline)
```

---

## 6. Troubleshooting Guides

### Compilation Fails with Out of Memory

**Symptoms:**
- Process exits with `FATAL ERROR: Reached heap limit Allocation failed`
- Worker threads crash with `WORKER_OOM`
- System swapping heavily during compilation

**Diagnosis:**
```bash
# Check memory usage pattern
kc compile --profile --profile-memory

# Identify which pass consumes the most memory
# Expected: embedding-generator and similarity-matrix are peak consumers
```

**Fixes (apply in order):**

```bash
# 1. Increase Node.js heap limit
NODE_OPTIONS="--max-old-space-size=16384" kc compile ./content

# 2. Reduce concurrency (less parallelism = less peak memory)
kc compile ./content --concurrency 2
kc compile ./content --concurrency 1  # Serial mode, lowest memory

# 3. Reduce embedding batch size
KC_EMBEDDING_BATCH_SIZE=32 kc compile ./content

# 4. Enable streaming mode (processes documents in smaller batches)
kc compile ./content --stream

# 5. Reduce corpus size temporarily
kc compile ./content --limit 100  # First 100 docs only

# 6. Compress IR store (trade speed for memory)
{
  "ir": {
    "compression": "zstd",
    "compressionLevel": 3
  }
}

# 7. Disable memory-intensive passes
{
  "passes": {
    "entity-extraction": { "enabled": false },
    "similarity-matrix": { "enabled": false },
    "cluster-assigner": { "enabled": false }
  }
}
```

**Prevention:**
- Use incremental compilation for large corpora
- Set `maxOldSpaceSize` in CI (typical: 8 GB for 10K docs, 16 GB for 100K)
- Monitor memory in CI with `kc compile --profile --profile-memory --json`

---

### Embedding API Rate Limiting

**Symptoms:**
- `EMBEDDING_RATE_LIMITED` errors in output
- Embedding phase takes much longer than expected
- Retries exhaust and fallback to TF-IDF activated

**Diagnosis:**
```bash
# Check rate limit status
kc diagnose --check embeddings.rateLimits

# Output:
Embedding Provider Rate Limits (OpenAI):
  TPM Used: 847,000 / 1,000,000 (84.7%)
  RPM Used: 142 / 500 (28.4%)
  Batch Size: 128
  Retry Count: 3 (2 exhausted)
```

**Fixes:**

```bash
# 1. Reduce concurrency and batch size
kc compile ./content --embedding-concurrency 2 --embedding-batch-size 32

# Or in config:
{
  "embeddings": {
    "batchSize": 32,
    "concurrency": 2,
    "retryDelay": 1000,
    "retryCount": 10
  }
}

# 2. Use smaller model (faster, less TPM)
{
  "embeddings": {
    "model": "text-embedding-3-small",  // instead of text-embedding-3-large
    "dimensions": 256  // reduced dimensions = less tokens
  }
}

# 3. Spread across multiple API keys (round-robin)
{
  "embeddings": {
    "apiKeys": ["sk-...", "sk-...", "sk-..."],
    "keyRotation": "round-robin"
  }
}

# 4. Enable caching to avoid redundant API calls
kc compile --cache

# 5. Use local embeddings (no API limits)
{
  "embeddings": {
    "provider": "local",
    "model": "sentence-transformers/all-MiniLM-L6-v2",
    "dimensions": 384
  }
}
```

**Rate limit backoff behavior:**

```
Attempt 1: 429 → wait 100ms + jitter → retry
Attempt 2: 429 → wait 400ms + jitter → retry
Attempt 3: 429 → wait 1.6s + jitter → retry
Attempt 4: 429 → wait 6.4s + jitter → retry
Attempt 5: 429 → wait 25.6s + jitter → retry
Attempt 6: 429 → fallback to TF-IDF (degraded mode)
```

---

### Incremental Compilation Produces Wrong Results

**Symptoms:**
- Changed documents not reflected in output
- Unchanged documents show stale content
- Cache hit rate is suspiciously high

**Diagnosis:**
```bash
# Check what changed vs what was compiled
kc compile --debug --log-level debug 2>&1 | grep -E "(CACHE|cache|checksum|changed)"

# Look for:
# - File not detected as changed (wrong checksum comparison)
# - Cache entry reused when input changed (hash collision)
# - Dependency not invalidated when parent changes
```

**Common causes:**

| Cause | Diagnostic | Fix |
|-------|------------|-----|
| File mtime not updated | `stat content/file.md` shows old mtime | Touch file: `touch content/file.md` |
| Symlink not followed | File accessed via symlink with different path | Normalize paths: `path.resolve()` |
| Cache key collision | Two different files have same content hash | Include file path in cache key |
| Dependency not tracked | Pass A depends on Pass B, but A not invalidated when B changes | Add explicit dependency declaration |
| Timestamp truncation | Filesystem truncates mtime to second | Use content hash, not mtime |
| Git checkout preserves mtime | `git checkout` keeps original file times | Use `git clone` (not checkout) or force content rehash |

**Fixes:**

```bash
# 1. Force clean compilation
kc compile --clean --no-cache

# 2. Validate incremental state
kc cache validate

# 3. Clear incremental state
rm .knowledge/incremental-state.json
kc compile --incremental  # Rebuilds state from scratch

# 4. Enable strict dependency tracking
{
  "incremental": {
    "mode": "strict",  // "content" (default) | "strict" | "dependency"
    "trackMtime": true,
    "trackPermissions": false
  }
}

# 5. Debug incremental detection
kc compile --debug --debug-filter "incremental,file-reader" 2>&1
# Shows: File a.md: checksum match → skip
# Shows: File b.md: checksum mismatch (old: a1b2, new: c3d4) → recompile
```

**Verification:**

```bash
# After fixing, verify incremental correctness:
# 1. First compile (full)
kc compile --clean --no-cache --json > full-result.json

# 2. Touch one file
touch content/single-file.md

# 3. Incremental compile
kc compile --incremental --json > incremental-result.json

# 4. Compare
jq '.sources.total' full-result.json  # e.g., 847
jq '.sources.total' incremental-result.json  # Should be 1 (just the changed file)

# 5. Verify output matches
diff <(kc inspect knowledge --json) <(kc inspect knowledge --json)
# Should be identical (same input → same output)
```

---

### Frontend Graph Rendering is Slow

**Symptoms:**
- Low FPS when panning/zooming
- Long initial load time for graph page
- Browser tab crashes or slows down

**Diagnosis:**
```bash
# Check graph size
kc inspect graph --json | jq '{ nodes: .nodeCount, edges: .edgeCount }'

# Expected performance by node count:
# <500 nodes:    60fps on any device
# 500-2K nodes:  60fps on desktop, 30fps on mobile
# 2K-10K nodes:  30fps on desktop, 15fps on mobile
# >10K nodes:    <15fps, consider canvas rendering
```

**Optimizations (frontend):**

```typescript
// 1. Enable canvas rendering (instead of SVG)
{
  "graph": {
    "renderer": "canvas",  // "svg" | "canvas" | "webgl"
    "antialias": false     // Slight quality tradeoff for performance
  }
}

// 2. Reduce visible nodes
{
  "graph": {
    "maxVisibleNodes": 2000,     // Nodes beyond this are hidden
    "nodeSizeScale": 0.8,        // Smaller nodes = less overdraw
    "showLabels": "on-hover",    // "always" | "on-hover" | "never"
    "edgeOpacity": 0.3           // Lower opacity = less rendering work
  }
}

// 3. Use quadtree for collision detection
{
  "graph": {
    "physics": {
      "enabled": true,
      "stabilizationTicks": 100,  // Reduce from default 300
      "alphaDecay": 0.05,         // Faster stabilization
      "velocityDecay": 0.4        // Damping
    }
  }
}

// 4. Enable WebWorker for force simulation
{
  "graph": {
    "worker": true  // Offload physics to WebWorker
  }
}
```

**Fixed graph layout (no physics):**

```bash
# Pre-compute positions at compile time (fastest rendering)
{
  "graph": {
    "layout": "precomputed",  // "force" | "precomputed" | "hierarchical" | "radial"
    "renderer": "canvas"
  }
}
```

**Browser DevTools steps:**

```bash
# 1. Performance tab → Record → Pan/zoom → Stop
# Check for: Long tasks (>50ms), forced reflows, excessive GC

# 2. Memory tab → Heap snapshot → Compare
# Check for: Detached DOM nodes, retained graph data

# 3. Rendering tab → Enable "FPS meter", "Layer borders"
# Check for: Layer creation, paint counts

# 4. Coverage tab → Reload
# Check for unused JavaScript (remove unused visualization code)
```

---

### Search Returns No Results

**Symptoms:**
- Empty search results for known terms
- Search spinner never resolves
- Console shows `401` or `404` for search index

**Diagnosis:**

```bash
# 1. Check search index exists
kc inspect manifest --json | jq '.artifacts["search-index.json"]'
# Should show: { path: "search-index.json", hash: "...", size: ... }

# 2. Check search index content
kc inspect statistics --section search --json | jq '{
  totalTerms: .uniqueTerms,
  totalDocuments: .documentCount,
  avgDocLength: .averageDocumentLength
}'

# 3. Test a specific query
kc inspect statistics --json | jq '.searchIndex.terms["machine learning"]'
# Should show: { documentFrequency: 312, totalFrequency: 1847 }
```

**Common causes & fixes:**

| Cause | Check | Fix |
|-------|-------|-----|
| Search index not generated | `manifest.json` missing `search-index.json` | Enable `generation.searchIndex: true` in config |
| Stop words too aggressive | Term "machine learning" not in index | Review `search.stopWords` config; remove false positives |
| Tokenizer mismatch | Query tokenized differently than index | Verify tokenizer config matches between compile and frontend |
| Index too large for browser | Browser fails to parse >50MB JSON | Enable index chunking: `search.chunkSize: 500000` |
| CORS blocking artifact fetch | Browser console shows CORS error | Configure CORS headers on artifact server |
| Artifact version mismatch | `search-index.json` version != reader version | Recompile with matching frontend |
| BM25 parameters wrong | Terms matched but ranked too low | Adjust `search.bm25.k1` (default: 1.2) and `b` (default: 0.75) |

**Search index validation:**

```bash
# Validate search index integrity
kc inspect validate --checks search

# Diagnostic commands
kc diagnose --check search
kc doctor --check search
```

---

### Plugin Fails to Load

**Symptoms:**
- `PLUGIN_LOAD_ERROR` in compilation output
- `Plugin "x" not found` error
- Pass from plugin never executes

**Diagnosis:**

```bash
# 1. List installed plugins
kc plugin list --verbose

# 2. Check plugin compatibility
kc diagnose --check plugins.compatibility

# 3. Check plugin dependencies installed
# Look for missing peer dependencies
npm ls @knowledge-compiler/plugin-graphviz 2>&1 | grep MISSING
```

**Common causes:**

| Cause | Check | Fix |
|-------|-------|-----|
| Plugin not installed | `kc plugin list` shows nothing | `kc plugin install @knowledge-compiler/plugin-graphviz` |
| Wrong Node.js version | Plugin uses ES modules, project is CJS | Ensure `"type": "module"` in package.json or use `.mjs` |
| Missing peer dep | `npm ls` shows MISSING | Install peer dep: `npm install @knowledge-compiler/core` |
| Plugin version incompatible | `kc plugin list` shows "incompatible" | Install compatible version: `npm install plugin@^1.0.0` |
| Plugin not registered | Plugin installed but not in config | Add to `plugins` array in `knowledge-compiler.json` |
| Plugin throws on init | Stack trace from plugin | Debug plugin with `kc compile --debug --debug-filter plugin-*` |

**Debugging plugin load:**

```bash
# Enable plugin debug logging
kc compile --debug --debug-filter "plugin-*"

# Output:
[DEBUG] [plugin-manager] Loading plugin: @knowledge-compiler/plugin-graphviz
[DEBUG] [plugin-manager]   Path: node_modules/@knowledge-compiler/plugin-graphviz/dist/index.js
[DEBUG] [plugin-manager]   API version: 2 (compiler: 2) → compatible
[DEBUG] [plugin-manager]   Registering pass: graphviz-export
[DEBUG] [plugin-manager]   Dependencies: artifact-serializer → resolved
[DEBUG] [plugin-manager]   Plugin initialized successfully
```

---

### Cache Corruption

**Symptoms:**
- `CACHE_CHECKSUM_MISMATCH` errors
- Compilation takes full time instead of incremental
- `kc cache validate` reports corrupted entries

**Diagnosis:**

```bash
# Check cache health
kc cache validate --json

# Output:
{
  "totalEntries": 1847,
  "corrupted": 3,
  "corruptionRate": 0.0016,
  "corruptedEntries": [
    { "key": "a1b2c3d4", "pass": "embedding-generator", "expectedHash": "e5f6...", "actualHash": "a7b8..." },
    { "key": "e5f6a7b8", "pass": "entity-extraction", "expectedHash": "c9d0...", "actualHash": "c9d1..." },
    { "key": "c9d0e1f2", "pass": "file-reader", "expectedHash": "a1b2...", "actualHash": "a1b2..." }  // Missing file
  ]
}
```

**Fixes:**

```bash
# 1. Repair corrupted entries
kc cache validate --repair

# 2. Clear entire cache
kc cache clear

# 3. Clear specific pass cache
rm -rf .knowledge-cache/pass/embedding-generator

# 4. Increase cache size to reduce eviction-related corruption
{
  "cache": {
    "maxSize": "10GB",
    "l2MaxSize": "50GB"
  }
}

# 5. Enable atomic writes (prevents partial writes)
{
  "cache": {
    "atomicWrites": true,    // Write to temp file, then rename
    "checksumVerify": "always"  // "always" | "onRead" | "never"
  }
}
```

**Prevention:**
- Use filesystem with checksumming (ZFS, Btrfs, APFS)
- Run `kc cache validate` periodically in CI
- Set `cache.atomicWrites: true` for production deployments
- Monitor cache hit rate — sudden drop may indicate corruption

---

### Cross-Platform Differences

| Issue | Windows | macOS | Linux | Mitigation |
|-------|---------|-------|-------|------------|
| Path separator | `\` | `/` | `/` | Normalize all paths to POSIX in IR; use `path.posix` |
| Line endings | `\r\n` | `\n` | `\n` | Normalize to `\n` in file reader pass |
| Case-sensitive fs | No | No (APFS can be case-sensitive) | Yes | Normalize file paths to lowercase for cache keys |
| Max path length | 260 chars | 1024 chars | 4096 chars | Warn on paths >200 chars |
| File locking | Mandatory | Advisory | Advisory | Handle `EBUSY` as DEGRADED |
| Worker threads | Limited support | Full support | Full support | Fallback to single-threaded |
| Unicode normalization | Different NFC/NFD | NFD by default | NFC by default | Normalize to NFC in document normalization pass |
| Signal handling | No SIGINT | SIGINT works | SIGINT works | Graceful shutdown on all platforms |
| Temp directory | `%TEMP%` | `/tmp` | `/tmp` | Use `os.tmpdir()` |
| Memory reporting | Different API | `process.memoryUsage()` | `process.memoryUsage()` | Cross-platform abstraction layer |

**Cross-platform CI testing:**

```yaml
# .github/workflows/test.yml
test:
  strategy:
    matrix:
      os: [ubuntu-latest, macos-latest, windows-latest]
      node: [18, 20, 22]
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node }}
    - run: npm ci
    - run: npm test
    - run: kc compile ./test/fixtures --json
    - run: kc diagnose --json
```

**Common cross-platform issues:**

```bash
# Issue: Cache miss on every compile on macOS
# Cause: macOS NFD normalization differs from Linux NFC
# Fix: Enable Unicode normalization in file reader
{
  "parsing": {
    "normalization": "NFC",  // Normalize all paths and content to NFC
    "caseSensitive": false   // Case-insensitive path matching
  }
}

# Issue: "EMFILE: too many open files" on macOS
# Cause: macOS default file descriptor limit is 256
# Fix: Increase limit or reduce concurrency
ulimit -n 10240  # Increase file descriptor limit
kc compile --concurrency 4  # Reduce concurrent file operations

# Issue: Worker threads not available on Windows
# Cause: Some Node.js versions have limited worker_thread support
# Fix: Fallback to single-threaded
kc compile --concurrency 1
```

---

## Appendix: Quick Reference

### Debug Command Cheat Sheet

```bash
# Quick diagnostics
kc diagnose                          # Full system check
kc doctor                            # Auto-fix common issues

# Compilation debugging
kc compile --debug                   # Enable debug mode (Level 1)
kc compile --debug --log-level debug # Maximum debug output
kc compile --debug --dump-ir         # Dump IR at phase boundaries
kc compile --profile                 # Profiling with timing breakdown
kc compile --profile --profile-flame # Flamegraph output

# Artifact inspection
kc inspect manifest --json          # List all generated artifacts
kc inspect graph --json              # Graph statistics
kc inspect entities --limit 20       # Top entities
kc inspect clusters --sort size      # Cluster details
kc inspect timeline --json           # Timing breakdown
kc inspect validate                  # IR invariant validation

# Cache management
kc cache info                        # Cache statistics
kc cache validate                    # Check integrity
kc cache clear                       # Reset cache

# Performance profiling
kc profile ./content                 # Full profile
kc profile --sort time               # Sorted by duration
kc profile --output report.html      # HTML report

# Validation
kc validate ./content                # Source validation
kc validate --strict                 # Warnings as errors
```

### Debug File Locations

| File | Purpose | Location |
|------|---------|----------|
| Debug logs | Full debug output | `./.knowledge/debug/kc-{timestamp}.log` |
| IR dumps | IR state at phase boundaries | `./.knowledge/dumps/PHASE_{name}/` |
| Heap snapshots | Memory analysis | `./.knowledge/heapsnapshots/heap-{timestamp}.heapsnapshot` |
| Trace exports | OpenTelemetry traces | `./.knowledge/traces/trace-{id}.json` |
| Profile reports | Performance analysis | `./.knowledge/profiles/profile-{timestamp}.html` |
| Benchmark results | Performance baselines | `./.knowledge/benchmarks/baseline.json` |
| Diagnostic reports | System state | `./.knowledge/diagnostics/report-{timestamp}.json` |
| Error reports | Compilation failures | `./.knowledge/errors/error-{timestamp}.json` |

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `KC_DEBUG` | Enable debug mode (0-3) | `0` |
| `KC_DEBUG_FILTER` | Comma-separated pass/phase filter | `*` |
| `KC_LOG_LEVEL` | Log level | `info` |
| `KC_LOG_FORMAT` | Log format: `human` or `json` | `human` |
| `KC_LOG_OUTPUT` | Log output: `stdout`, `file`, or path | `stdout` |
| `KC_TRACE` | Enable OpenTelemetry tracing | `false` |
| `KC_TRACE_EXPORTER` | Trace exporter: `console`, `file`, `otlp` | `console` |
| `KC_TRACE_SAMPLING_RATE` | Trace sampling rate (0.0-1.0) | `1.0` |
| `KC_CACHE_DIR` | Cache directory path | `.knowledge-cache` |
| `KC_CACHE_MAX_SIZE` | Cache max size in MB | `5120` |
| `KC_EMBEDDING_BATCH_SIZE` | Embedding API batch size | `128` |
| `KC_EMBEDDING_CONCURRENCY` | Embedding API concurrency | `4` |
| `KC_PROFILE_MEMORY` | Enable memory profiling | `false` |
| `KC_PROFILE_GC` | Enable GC profiling | `false` |
| `NODE_OPTIONS` | Node.js runtime options | (none) |
| `OPENAI_API_KEY` | OpenAI API key | (none) |
| `OPENAI_ORG_ID` | OpenAI organization ID | (none) |
