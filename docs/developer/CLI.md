# Knowledge Compiler — CLI Reference

> **Version:** 1.0.0
> **Binary:** `kc` (also available as `npx @knowledge-compiler/cli`)
> **Audience:** Users, CI Engineers

---

## 1. Command Structure

```
kc <command> [arguments] [options]
kc <command> [arguments] [options] -- <pass-options>
```

**Global usage pattern:**

```
kc compile ./content --out ./dist --incremental
kc init
kc watch ./content --debounce 500
kc serve ./dist --port 3000
kc inspect manifest --json --pretty
kc cache info
kc plugin list
```

---

## 2. Global Options

| Option | Alias | Type | Default | Description |
|---|---|---|---|---|
| `--config` | `-c` | `string` | `knowledge-compiler.json` | Config file path (also supports `.ts`, `.js`, `.mjs`, `.cjs`) |
| `--log-level` | | `enum` | `info` | Log level: `trace`, `debug`, `info`, `warn`, `error`, `silent` |
| `--no-color` | | `boolean` | `false` | Disable ANSI color in output |
| `--quiet` | `-q` | `boolean` | `false` | Suppress all non-error output; exit code only |
| `--verbose` | `-v` | `boolean` | `false` | Enable verbose logging; shows pass-level detail |
| `--help` | `-h` | `boolean` | `false` | Show help for the specified command |
| `--version` | | `boolean` | `false` | Show version number and exit |

**Global option precedence (highest to lowest):**
```
CLI flag > environment variable > config file > default
```

**Environment variable equivalents:**

| Option | Env Var |
|---|---|
| `--config` | `KNOWLEDGE_COMPILER_CONFIG` |
| `--log-level` | `KNOWLEDGE_COMPILER_LOG_LEVEL` |
| `--no-color` | `NO_COLOR` |
| `--quiet` | `KNOWLEDGE_COMPILER_QUIET` |
| `--verbose` | `KNOWLEDGE_COMPILER_VERBOSE` |

---

## 3. Commands

### 3.1 `kc compile [sources...]`

Compile source documents into optimized artifacts.

**Usage:**
```
kc compile [sources...] [options]
kc compile ./content/**/*.md --out ./dist --incremental
kc compile --profile --clean
kc compile --watch
```

**Arguments:**

| Argument | Required | Description |
|---|---|---|
| `sources` | No | Source file paths or glob patterns. Defaults to config `input.glob`. |

**Options:**

| Option | Alias | Type | Default | Description |
|---|---|---|---|---|
| `--out`, `--output` | `-o` | `string` | config `outputDir` | Output directory for compiled artifacts |
| `--watch` | `-w` | `boolean` | `false` | Watch mode — recompile on file changes |
| `--incremental` | `-i` | `boolean` | `true` | Enable incremental compilation |
| `--clean` | | `boolean` | `false` | Clean output directory before compiling |
| `--profile` | `-p` | `boolean` | `false` | Output timing breakdown after compilation |
| `--mode` | | `enum` | config default | Compilation mode: `full`, `incremental`, `quick` |
| `--cache` | | `boolean` | `true` | Enable/disable cache |
| `--concurrency` | | `number` | `cpuCount - 1` | Max parallel passes |
| `--timeout` | | `number` | `0` (no limit) | Compilation timeout in ms |
| `--json` | | `boolean` | `false` | Output report as JSON to stdout |
| `--output-report` | | `string` | — | Write report JSON to file path |

**Examples:**
```bash
# Basic compilation
kc compile ./docs

# Compile with custom output dir
kc compile ./content --out .knowledge/production

# Clean rebuild
kc compile --clean --no-cache

# Profile output
kc compile --profile

# Output report as JSON
kc compile ./docs --json | jq '.phases[] | {name: .phase, duration: .duration}'

# Incremental from specific config
kc compile -c my-knowledge.config.ts --incremental

# Watch with quick mode for fast iteration
kc compile --watch --mode quick
```

**Exit codes:** `0` success, `3` compilation error, `1` general error.

---

### 3.2 `kc init [directory]`

Initialize a new knowledge base project.

**Usage:**
```
kc init [directory]
kc init ./my-knowledge-base
```

**Description:**
Creates the following structure:

```
<directory>/
  knowledge-compiler.json       # Config with defaults
  content/
    01-getting-started.md       # Example document
    02-core-concepts.md
    _index.md                   # Landing page (optional)
  .gitignore                    # Ignores output/cache
```

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `--name` | `string` | dir basename | Project name |
| `--template` | `enum` | `default` | Init template: `default`, `minimal`, `docs-site`, `knowledge-base` |
| `--yes`, `-y` | `boolean` | `false` | Skip confirmation prompts |
| `--overwrite` | `boolean` | `false` | Overwrite existing files |

**Config generated:**

```json
{
  "$schema": "https://knowledge-compiler.dev/schemas/config-v1.json",
  "name": "my-knowledge-base",
  "version": "0.1.0",
  "input": {
    "glob": ["content/**/*.md", "!content/_index.md"],
    "ignore": ["node_modules", "dist"]
  },
  "outputDir": ".knowledge",
  "mode": "incremental",
  "cache": true,
  "cacheDir": ".knowledge-cache",
  "embeddings": {
    "provider": "openai",
    "model": "text-embedding-3-small",
    "dimensions": 1536,
    "batchSize": 128,
    "concurrency": 4
  },
  "clustering": {
    "enabled": true,
    "method": "hdbscan",
    "minClusterSize": 3
  },
  "optimization": {
    "pruning": { "enabled": true, "edgeWeightThreshold": 0.3 },
    "deduplication": { "enabled": true, "similarityThreshold": 0.95 }
  }
}
```

---

### 3.3 `kc watch [directory]`

Watch mode — automatically recompile when source files change.

**Usage:**
```
kc watch [directory] [options]
kc watch ./content --debounce 500 --full-on 10
```

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `--debounce` | `number` | `300` | Debounce interval in ms between file change and recompile |
| `--full-on` | `number` | `5` | Run full (non-incremental) rebuild every N changes |
| `--ignore` | `string[]` | `[]` | Additional file patterns to ignore |
| `--initial` | `boolean` | `true` | Run initial full compile on start |

**Watch behavior:**

```typescript
interface WatchEvent {
  type: 'add' | 'change' | 'unlink' | 'addDir' | 'unlinkDir';
  path: string;
  timestamp: number;
}

// Internal behavior
function createWatcher(config: WatchConfig) {
  const chokidar = require('chokidar');
  let changeCount = 0;
  let timer: NodeJS.Timeout | null = null;

  const watcher = chokidar.watch(config.sourceGlobs, {
    ignored: ['**/node_modules/**', '**/.knowledge/**', '**/.knowledge-cache/**', ...config.ignore],
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 50 },
  });

  watcher.on('all', (event: string, path: string) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(async () => {
      changeCount++;

      const isFullRebuild = changeCount % config.fullOnN === 0;
      const changedFiles = isFullRebuild ? undefined : [path];

      const report = await compiler.compile(changedFiles);
      printReport(report);

      if (report.success) {
        console.log(`✓ Rebuilt (${report.duration}ms, cache ${(report.cache.hitRate * 100).toFixed(0)}%)`);
      }
    }, config.debounce);
  });

  return () => watcher.close();
}
```

---

### 3.4 `kc serve [artifact-dir]`

Start a local development server for inspecting compiled artifacts.

**Usage:**
```
kc serve [artifact-dir] [options]
kc serve .knowledge/artifacts --port 4000
kc serve --host 0.0.0.0
```

**Behavior:**
Serves a lightweight HTML interface for browsing artifacts, graphs, and statistics. Uses the same `ArtifactReader` API that the Next.js app uses. Intended for development and debugging.

**Options:**

| Option | Alias | Type | Default | Description |
|---|---|---|---|---|
| `--port` | `-p` | `number` | `3000` | Server port |
| `--host` | | `string` | `localhost` | Server host |
| `--open` | | `boolean` | `false` | Open browser on start |

**Caveats:**
- The serve command is for **development only**. Production deployment uses `next build` + `next start`.
- For large artifact directories (>1GB), initial load may take several seconds.

---

### 3.5 `kc inspect [artifact] [options]`

Inspect compiled artifacts. This is the primary debugging and introspection command.

**Usage:**
```
kc inspect <subcommand> [options]
kc inspect manifest --json --pretty
kc inspect graph --filter "type=document"
kc inspect entities --limit 10 --query "neural"
kc inspect statistics
```

**Sub-commands:**

#### 3.5.1 `kc inspect manifest`

Show the artifact manifest — lists every generated file with hash and size.

```
kc inspect manifest [options]
kc inspect manifest --json
kc inspect manifest --filter "type=json"
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--json` | `boolean` | `false` | Output as JSON |
| `--pretty` | `boolean` | `false` | Pretty-print JSON output |
| `--filter` | `string` | — | Filter artifacts by pattern (e.g. `type=json`, `path=*embeddings*`) |

#### 3.5.2 `kc inspect graph`

Show knowledge graph statistics — node/edge counts by type, density, degree distribution.

```
kc inspect graph [options]
kc inspect graph --json
kc inspect graph --filter "type=document"
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--json` | `boolean` | `false` | Output as JSON |
| `--filter` | `string` | — | Filter: `type=document\|section\|entity\|concept\|topic`, `cluster=<id>`, `degree>5` |
| `--limit` | `number` | `50` | Max nodes to display in table |
| `--query` | `string` | — | Search by node label (case-insensitive substring) |

#### 3.5.3 `kc inspect entities`

List extracted entities with frequency, type, and salience.

```
kc inspect entities [options]
kc inspect entities --limit 20 --sort frequency
kc inspect entities --query "mitchell" --json
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--json` | `boolean` | `false` | Output as JSON |
| `--limit` | `number` | `50` | Max entities to display |
| `--sort` | `enum` | `frequency` | Sort: `frequency`, `name`, `confidence`, `salience` |
| `--order` | `enum` | `desc` | Sort order: `asc`, `desc` |
| `--query` | `string` | — | Search by entity name |
| `--type` | `string` | — | Filter by entity type: `person`, `organization`, `location`, etc. |

#### 3.5.4 `kc inspect clusters`

List detected clusters with size, density, and top terms.

```
kc inspect clusters [options]
kc inspect clusters --limit 5
kc inspect clusters --query "deep" --json
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--json` | `boolean` | `false` | Output as JSON |
| `--limit` | `number` | `20` | Max clusters to display |
| `--sort` | `enum` | `size` | Sort: `size`, `density`, `silhouette`, `name` |
| `--min-size` | `number` | `1` | Minimum cluster size |
| `--query` | `string` | — | Search by cluster label or top terms |

#### 3.5.5 `kc inspect concepts`

List concepts in the hierarchy tree.

```
kc inspect concepts [options]
kc inspect concepts --max-depth 3
kc inspect concepts --query "learning"
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--json` | `boolean` | `false` | Output as JSON |
| `--max-depth` | `number` | — | Max hierarchy depth to display |
| `--query` | `string` | — | Search by concept name |

#### 3.5.6 `kc inspect statistics`

Print full compilation statistics.

```
kc inspect statistics [options]
kc inspect statistics --json
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--json` | `boolean` | `false` | Output as JSON |
| `--section` | `string` | — | Specific section: `sources`, `documents`, `graph`, `entities`, `clusters`, `concepts`, `embeddings`, `compilation` |

#### 3.5.7 `kc inspect timeline`

Show timing breakdown per pass and per phase.

```
kc inspect timeline [options]
kc inspect timeline --json
kc inspect timeline --sort duration
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--json` | `boolean` | `false` | Output as JSON |
| `--sort` | `enum` | `order` | Sort: `order` (execution order), `duration`, `name` |

---

### 3.6 `kc validate [directory]`

Validate source documents without performing a full compilation. Checks frontmatter schema, internal link integrity, and document structure.

**Usage:**
```
kc validate [directory] [options]
kc validate ./content
kc validate --strict --fix
```

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `--strict` | `boolean` | `false` | Fail on warnings (not just errors) |
| `--fix` | `boolean` | `false` | Auto-fix fixable issues (trailing whitespace, missing frontmatter) |
| `--json` | `boolean` | `false` | Output validation results as JSON |
| `--checks` | `string[]` | `all` | Specific checks: `frontmatter`, `links`, `structure`, `images`, `metadata` |

**Validation checks performed:**

| Check | Description | Auto-fixable |
|---|---|---|
| `frontmatter` | Valid YAML frontmatter, required fields present, correct types | No |
| `links` | Internal links resolve to existing documents/sections | No |
| `structure` | Valid heading hierarchy (no skipped levels in ideal case) | No |
| `images` | Image references point to existing files | No |
| `metadata` | Metadata values match expected patterns (dates, enums) | No |
| `duplicates` | No duplicate document IDs or slugs | No |
| `whitespace` | Trailing whitespace, inconsistent line endings | Yes |

**Output:**

```bash
$ kc validate ./content --strict
✓ content/getting-started.md — valid
✓ content/core-concepts.md — valid
✗ content/broken-links.md — 2 errors, 1 warning
  error: LINK-001 — Broken internal link to [[non-existent-document]]
  error: LINK-002 — Image not found: ./images/missing.png
  warning: STRUCT-001 — Heading skipped from h2 to h4

Result: 2 errors, 1 warning across 3 files
```

---

### 3.7 `kc clean [directory]`

Clean cache and output directories.

**Usage:**
```
kc clean [directory] [options]
kc clean
kc clean --all
kc clean --cache-only
```

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `--cache-only` | `boolean` | `false` | Only clean the cache directory |
| `--output-only` | `boolean` | `false` | Only clean the output directory |
| `--all` | `boolean` | `false` | Clean both cache and output |
| `--yes`, `-y` | `boolean` | `false` | Skip confirmation prompt |
| `--dry-run` | `boolean` | `false` | Show what would be deleted without deleting |

---

### 3.8 `kc cache [command]`

Cache management commands.

#### 3.8.1 `kc cache info`

Show cache statistics.

```
kc cache info [options]
kc cache info --json
```

**Output:**
```
Cache Location: .knowledge-cache
Cache Format: v2
Total Entries: 1,847
Total Size: 342.1 MB
Hits: 12,834 (87.3%)
Misses: 1,872 (12.7%)
Evictions: 312
Hit Rate over last 100: 91.2%
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--json` | `boolean` | `false` | Output as JSON |
| `--verbose` | `boolean` | `false` | Show per-pass cache stats |

#### 3.8.2 `kc cache clear`

Clear the entire cache.

```
kc cache clear [options]
kc cache clear --yes
kc cache clear --keep-config
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--yes`, `-y` | `boolean` | `false` | Skip confirmation |
| `--keep-config` | `boolean` | `false` | Keep cached compiler configuration |

#### 3.8.3 `kc cache validate`

Validate cache integrity by recomputing checksums and checking for corruption.

```
kc cache validate [options]
kc cache validate --repair
kc cache validate --json
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--repair` | `boolean` | `false` | Rebuild corrupted cache entries |
| `--json` | `boolean` | `false` | Output as JSON |

---

### 3.9 `kc plugin [command]`

Plugin management.

#### 3.9.1 `kc plugin list`

List installed plugins and their status.

```
kc plugin list [options]
kc plugin list --json
kc plugin list --enabled-only
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--json` | `boolean` | `false` | Output as JSON |
| `--enabled-only` | `boolean` | `false` | Only show enabled plugins |
| `--verbose` | `boolean` | `false` | Show plugin details (hooks, version, author) |

**Output:**
```
Installed Plugins (4):
  ✓ @knowledge-compiler/plugin-graphviz     v1.2.0  [export]  enabled
  ✓ @knowledge-compiler/plugin-pdf            v2.0.1  [export]  enabled
  ✗ @knowledge-compiler/plugin-notion         v0.5.0  [source]  disabled (incompatible)
  - @knowledge-compiler/plugin-custom-metrics  v1.0.0  [analysis] enabled
```

#### 3.9.2 `kc plugin install <name>`

Install a plugin from npm.

```
kc plugin install <name> [options]
kc plugin install @knowledge-compiler/plugin-graphviz
kc plugin install @knowledge-compiler/plugin-pdf --version 2.0.0
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--version` | `string` | `latest` | Specific version to install |
| `--save-dev` | `boolean` | `false` | Install as dev dependency |

#### 3.9.3 `kc plugin remove <name>`

Remove an installed plugin.

```
kc plugin remove <name> [options]
kc plugin remove @knowledge-compiler/plugin-graphviz
```

| Option | Type | Default | Description |
|---|---|---|---|
| `--yes`, `-y` | `boolean` | `false` | Skip confirmation |

---

### 3.10 `kc profile [directory]`

Profile compilation performance with detailed timing breakdown.

**Usage:**
```
kc profile [directory] [options]
kc profile --json
kc profile --sort time
kc profile --output report.html
```

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `--json` | `boolean` | `false` | Output as JSON |
| `--sort` | `enum` | `time` | Sort: `time`, `name`, `phase` |
| `--output`, `-o` | `string` | — | Write profiling report to file (HTML or JSON) |
| `--threshold` | `number` | `1` | Minimum pass duration in ms to display |
| `--flame` | `boolean` | `false` | Output flamegraph-compatible format |

**Output:**

```bash
$ kc profile ./content --sort time

Compilation Profile — corpus: 847 docs, 3.2s total
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
embedding-generator         1,847ms   57.7%    124 docs/s
text-chunker                  412ms   12.9%  2,104 chunks/s
similarity-matrix             298ms    9.3%   28K pairs/s
cluster-assigner              184ms    5.8%   847 docs
frontmatter-parser             92ms    2.9%  9.2 docs/ms
link-extractor                 67ms    2.1%    412 edges/s
graph-pruning                  54ms    1.7%  1.2K edges/s
deduplication                  41ms    1.3%    98% unique
artifact-serializer            36ms    1.1%   15 artifacts
manifest-builder               12ms    0.4%
... (11 more passes <10ms)

Cache Hit Rate: 87.3%
Memory Peak: 2.1 GB
Worker Threads: 7
```

---

### 3.11 `kc help [command]`

Show detailed help for a specific command.

**Usage:**
```
kc help <command>
kc help compile
kc help inspect
kc help
```

Without arguments, shows the top-level help listing all commands.

---

## 4. Output Formatting

### 4.1 Progress Bars

Long-running operations display animated progress bars:

```
Compiling knowledge base... ━━━━━━━━━━━━━━━━━━━╸━━━━━━━ 65% • 12.4s • ETA 6.7s
  ✓ Parsing: 847/847 documents                    [847/847]  2.1s
  █ Analyzing: 392/847 documents                  [392/847]  1.8s
  ⠋ Embedding: chunk 47/1284                      [47/1284]  4.2s
  ⠋ Clustering: computing similarity matrix        [--]       0.3s
  ⠋ Optimizing: pruning graph                      [--]       0.1s
```

### 4.2 Spinners

Indeterminate operations use a spinner:

```
⠋ Resolving glob patterns...
⠋ Loading cache index...
⠙ Running pass: embedding-generator (batch 47/1284)
```

### 4.3 Colored Output

| Element | Color | Example |
|---|---|---|
| Success | Green | `✓ Compilation complete` |
| Warning | Yellow | `⚠ Slow pass: embedding-generator (1.8s)` |
| Error | Red | `✗ Fatal: File not found: ./content/missing.md` |
| Info | Blue/Cyan | `ℹ Incremental: 12 files changed` |
| Debug | Gray | `  Cache miss: embedding-generator (content/missing.md)` |
| Highlight | Bold/Yellow | `Duration: 3,247ms` |

### 4.4 JSON Output Mode

Every command supports `--json` for machine-readable output:

```bash
kc compile --json
kc inspect entities --limit 5 --json
kc cache info --json
```

```json
{
  "success": true,
  "duration": 3247,
  "startedAt": "2026-07-10T14:30:00.000Z",
  "completedAt": "2026-07-10T14:30:03.247Z",
  "sources": {
    "total": 847,
    "discovered": 847,
    "read": 845,
    "failed": 2,
    "skipped": 0,
    "totalSize": 28472910,
    "byType": {
      ".md": 845,
      ".mdx": 2
    }
  },
  "phases": [
    {
      "phase": "parsing",
      "duration": 2341,
      "passes": [
        {
          "name": "glob-resolver",
          "duration": 47,
          "itemsProcessed": 847,
          "itemsSkipped": 0,
          "itemsFailed": 0,
          "status": "success"
        }
      ],
      "status": "success"
    }
  ],
  "errors": [],
  "warnings": [
    {
      "code": "SLOW_OPERATION",
      "message": "embedding-generator exceeded 1000ms threshold",
      "phase": "embedding",
      "pass": "embedding-generator"
    }
  ],
  "cache": {
    "hits": 12834,
    "misses": 1872,
    "size": 342100000,
    "maxSize": 1073741824,
    "hitRate": 0.873,
    "evictions": 312
  }
}
```

### 4.5 Tables

Structured data is presented in formatted tables:

```
┌─────────────────────────────┬──────────┬────────┬──────────┬──────────┐
│ Entity                      │ Type     │ Freq   │ Salience │ Confidence │
├─────────────────────────────┼──────────┼────────┼──────────┼──────────┤
│ Neural Networks             │ topic    │ 412    │ 0.91     │ 0.97     │
│ Tom Mitchell                │ person   │ 47     │ 0.72     │ 0.98     │
│ PyTorch                     │ tech     │ 234    │ 0.85     │ 0.99     │
│ Transformer Architecture    │ tech     │ 412    │ 0.91     │ 0.97     │
└─────────────────────────────┴──────────┴────────┴──────────┴──────────┘
```

---

## 5. Exit Codes

| Code | Name | Description |
|---|---|---|
| `0` | SUCCESS | Compilation or command completed successfully |
| `1` | GENERAL_ERROR | Unknown or unexpected error |
| `2` | CONFIG_ERROR | Invalid configuration (schema error, file not found, cycle detected) |
| `3` | COMPILATION_ERROR | Compilation failed (parse error, embedding failure, timeout) |
| `4` | PLUGIN_ERROR | Plugin failed to load, initialize, or execute |
| `5` | VALIDATION_ERROR | Validation found errors (for `kc validate`) |
| `6` | CACHE_ERROR | Cache corruption, I/O error in cache layer |
| `7` | IO_ERROR | File system error (disk full, permission denied) |
| `130` | INTERRUPTED | Process interrupted (SIGINT / Ctrl+C) |

---

## 6. Shell Completion

Generate shell completion scripts:

```bash
kc completion bash  > /usr/local/etc/bash_completion.d/kc
kc completion zsh   > /usr/local/share/zsh/site-functions/_kc
kc completion fish  > /etc/fish/completions/kc.fish
```

Or source directly:

```bash
# bash
source <(kc completion bash)

# zsh
source <(kc completion zsh)

# fish
kc completion fish | source
```

**Completion provides:**
- Command names and subcommands
- Option flags with descriptions
- File path completion for `sources` and config arguments
- Dynamic completion for `plugin install <name>` (npm package lookup)

---

## 7. Progress Reporting

### 7.1 Compilation Progress

Progress is reported at three levels:

| Level | Frequency | Detail |
|---|---|---|
| **Phase-level** | Per phase | `[PARSING] Parsing documents...` |
| **Pass-level** | Per pass | `embedding-generator: 47/1284 chunks (3.7%)` |
| **Item-level** | Per item batch | `Processing chunk 47 — 124 docs (3.2s, 38.7 docs/sec)` |

### 7.2 ETA Estimation

```typescript
interface ETAEstimator {
  // Rolling window of last 10 durations
  windowSize: number;
  history: { timestamp: number; itemsProcessed: number; itemsTotal: number }[];

  estimate(): { eta: number; remaining: number; rate: number } {
    if (this.history.length < 2) return { eta: -1, remaining: -1, rate: -1 };

    const recent = this.history.slice(-this.windowSize);
    const startTime = recent[0].timestamp;
    const elapsed = recent[recent.length - 1].timestamp - startTime;
    const processed = recent[recent.length - 1].itemsProcessed - recent[0].itemsProcessed;
    const rate = processed / (elapsed / 1000);
    const remaining = recent[recent.length - 1].itemsTotal - recent[recent.length - 1].itemsProcessed;
    const eta = remaining / rate;

    return { eta: eta * 1000, remaining, rate };
  }

  update(itemsProcessed: number, itemsTotal: number): void {
    this.history.push({ timestamp: Date.now(), itemsProcessed, itemsTotal });
    if (this.history.length > this.windowSize * 2) {
      this.history = this.history.slice(-this.windowSize);
    }
  }
}
```

### 7.3 Progress Output to stderr

All progress output goes to **stderr**. stdout is reserved for command output (e.g., `--json`).

---

## 8. Error Display

### 8.1 Error Formatting

```
✗ Fatal: File read error — permission denied (content/private/doc.md)
  Pass: file-reader
  Phase: PARSING
  Code: IO_ERROR
  Location: /Users/user/project/content/private/doc.md:1
  Stack:
    at FileReader.execute (src/passes/file-reader.ts:124)
    at PassRunner.run (src/pipeline/runner.ts:89)
    at PipelineOrchestrator.executePhase (src/pipeline/orchestrator.ts:234)

  Did you mean to add 'content/private' to input.ignore?
```

### 8.2 Error Suggestions

Common errors include suggestions:

| Error | Suggestion |
|---|---|
| Config file not found | Searches known locations, suggests `kc init` |
| Broken link `[[missing]]` | Lists similar document names (Levenshtein distance < 3) |
| Plugin not found | Lists available plugins matching the name |
| Embedding provider timeout | Suggests checking API key, configuring fallback |
| Glob pattern matches no files | Shows directory tree of content path |

### 8.3 Machine-Readable Errors

With `--json`, all errors are structured:

```json
{
  "errors": [
    {
      "id": "err-001",
      "severity": "fatal",
      "code": "IO_ERROR",
      "passId": "file-reader",
      "phase": "PARSING",
      "message": "File read error — permission denied",
      "file": "content/private/doc.md",
      "line": 1,
      "stack": "    at FileReader.execute (src/passes/file-reader.ts:124)",
      "suggestion": "Did you mean to add 'content/private' to input.ignore?",
      "timestamp": 1764987432000
    }
  ],
  "warnings": [],
  "suggestions": ["Add 'content/private' to input.ignore in knowledge-compiler.json"]
}
```

### 8.4 Error Aggregation

Multiple errors of the same type are aggregated:

```
✗ Compilation completed with 2 errors, 12 warnings

Errors (2):
  - LINK-001: Broken internal link to [[non-existent-document]]
    Occurred in 3 documents:
      • content/doc-a.md
      • content/doc-b.md
      • content/doc-c.md

  - EMB-001: Embedding provider timeout (OpenAI)
    Retried 5 times, falling back to TF-IDF
    Affected: 124 sections in 12 documents

Warnings (12):
  - SLOW_OPERATION: embedding-generator exceeded 1000ms (5 occurrences)
  - LARGE_DOCUMENT: content/very-large-doc.md exceeds 10MB (1 occurrence)
  - MISSING_METADATA: content/old-post.md has no publish date (6 occurrences)
```
