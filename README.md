# Knowledge Compiler

**Compile human knowledge into optimized semantic artifacts.**

[▶ Watch the overview video on NotebookLM](https://notebooklm.google.com/notebook/1833f401-8f66-466b-9794-e2669107ab41/artifact/0a6cbfd3-dfb3-4316-b7b9-b8005397f7fc?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_)

Knowledge Compiler transforms collections of Markdown documents into optimized,
statically-deployable semantic artifacts. It treats documentation as source code,
applying a multi-pass compilation pipeline akin to traditional software compilers —
producing deployable artifacts that require no runtime backend infrastructure.

## Philosophy

| Software Compiler | Knowledge Compiler |
|---|---|
| Source code | Markdown documents |
| Lexical analysis | Markdown parsing |
| Abstract Syntax Tree | Document AST |
| Intermediate Representation | Semantic IR (graphs, vectors) |
| Optimization passes | Clustering, pruning, deduplication |
| Object files | JSON artifacts |
| Executable | Static Next.js application |

Traditional RAG retrieves information dynamically at runtime. Knowledge Compiler instead
performs an extensive semantic compilation pipeline during **build time**, producing optimized
artifacts that deploy as a static Next.js application with zero server-side computation.

**This is not a chatbot. It is a compiler.**

## Key Features

- **Multi-pass compilation pipeline** — parsing, analysis, graph construction, embedding, clustering, optimization, generation
- **Inspectable intermediate representations** — every IR can be serialized and examined
- **Incremental compilation** — only recompile what changed
- **Plugin architecture** — replace or extend every compiler pass
- **Static deployment** — zero runtime backend, pure static Next.js
- **Rich visualization** — knowledge graphs, concept hierarchies, semantic search
- **GPU-accelerated embeddings** — parallel batch embedding generation
- **Multi-model support** — pluggable embedding providers (OpenAI, local, custom)

## Quick Start

```bash
# Clone and install
git clone <repo>
cd knowledge-compiler
pnpm install

# Build all packages
pnpm exec turbo run build

# Compile a directory of markdown
node packages/cli/dist/bin.js ./blog --out ./out

# Serve the compiled artifacts locally
node packages/cli/dist/bin.js serve ./out

# Or run the Next.js app
cd apps/web
pnpm dev
```

### Using the CLI directly

```bash
# Show help
node packages/cli/dist/bin.js --help

# Compile with config
node packages/cli/dist/bin.js ./blog --config ./knowledge-compiler.json

# Initialize a config file
node packages/cli/dist/bin.js init

# Inspect generated artifacts
node packages/cli/dist/bin.js inspect ./out/manifest.json
```

## Repository Structure

```
knowledge-compiler/
├── apps/
│   └── web/                    # Next.js static site (artifact viewer/browser)
├── packages/
│   ├── ir/                     # Intermediate representation types (Zod schemas)
│   ├── config/                 # Configuration system (cosmiconfig + Zod)
│   ├── cache/                  # Content-addressed cache (xxhash-wasm)
│   ├── artifacts/              # Artifact serialization / deserialization
│   ├── plugins/                # Plugin type definitions and registry
│   ├── core/                   # Compilation pipeline orchestrator
│   │   ├── compiler.ts         # Compiler entry point
│   │   ├── pipeline.ts         # Pipeline orchestration
│   │   ├── scheduler.ts        # Parallel execution scheduler
│   │   ├── compilers/          # Pass implementations
│   │   │   ├── parsing.ts      # Markdown parsing passes
│   │   │   ├── analysis.ts     # Semantic analysis passes
│   │   │   ├── graph.ts        # Knowledge graph construction
│   │   │   ├── embedding.ts    # Embedding generation
│   │   │   ├── clustering.ts   # Clustering passes
│   │   │   └── optimization.ts # Optimization passes
│   │   └── types.ts            # Compiler type definitions
│   ├── cli/                    # Command-line interface (cac)
│   │   ├── bin.ts              # Entry point (bin: kc)
│   │   ├── run-cli.ts          # CLI command definitions
│   │   └── commands/           # Command implementations
│   └── visualization/          # React/d3/Three.js components
├── docs/                       # Documentation
│   ├── architecture/           # System architecture
│   ├── specification/          # Formal specifications and schemas
│   ├── passes/                 # Compiler pass documentation
│   ├── optimization/           # Optimization strategy
│   ├── api/                    # Public API reference
│   ├── visualization/          # Visualization design
│   ├── developer/              # Developer experience
│   ├── research/               # Research and comparisons
│   └── roadmap/                # Development roadmap
├── examples/                   # Example configurations
├── tests/                      # Test suites
├── benchmarks/                 # Performance benchmarks
├── The_Knowledge_Compiler.mp4  # Overview video
├── package.json                # Root monorepo config
├── pnpm-workspace.yaml         # Workspace definition
└── turbo.json                  # Turborepo pipeline config
```

## Compiler Pipeline

```
Source (Markdown)
    │
    ▼
┌──────────────────────────┐
│ 1. Parsing Passes        │  Markdown → Frontmatter → Document AST
│    (MDAST, frontmatter)  │
└──────────────────────────┘
    │
    ▼
┌──────────────────────────┐
│ 2. Analysis Passes       │  Sections → Entities → Keywords → References
│    (NLP, pattern match)  │
└──────────────────────────┘
    │
    ▼
┌──────────────────────────┐
│ 3. Graph Construction    │  Knowledge Graph → Concept Hierarchy
│    (relationships, links)│
└──────────────────────────┘
    │
    ▼
┌──────────────────────────┐
│ 4. Embedding Passes      │  Text chunking → Vector embeddings
│    (batch GPU/CPU)       │
└──────────────────────────┘
    │
    ▼
┌──────────────────────────┐
│ 5. Clustering            │  Communities → Clusters → Topic Groups
│    (hierarchical, k-means)│
└──────────────────────────┘
    │
    ▼
┌──────────────────────────┐
│ 6. Optimization          │  Pruning → Dedup → Folding → Compression
│    (graph algorithms)    │
└──────────────────────────┘
    │
    ▼
┌──────────────────────────┐
│ 7. Generation            │  JSON artifacts → Manifest → Search Index
│    (artifact writer)     │
└──────────────────────────┘
    │
    ▼
Deployed Artifacts (static JSON files → Next.js app)
```

## CLI Reference

| Command | Description |
|---|---|
| `kc [input]` | Compile markdown documents to knowledge artifacts |
| `kc serve [dir]` | Serve compiled artifacts as a web app |
| `kc inspect <file>` | Inspect artifact metadata and integrity |
| `kc init` | Initialize `knowledge-compiler.json` config |
| `kc cache status` | Show cache statistics |
| `kc cache clear` | Clear the entire cache |
| `kc cache prune` | Remove expired cache entries |
| `kc plugin list` | List installed plugins |
| `kc plugin add <name>` | Install a plugin |
| `kc plugin remove <name>` | Remove a plugin |
| `kc version` | Show version information |

### Compile Options

| Flag | Description |
|---|---|
| `-c, --config <path>` | Config file path |
| `-o, --out <dir>` | Output directory |
| `--passes <list>` | Comma-separated passes to run |
| `--skip-passes <list>` | Comma-separated passes to skip |
| `--verbose` | Verbose output |
| `-q, --quiet` | Quiet output |
| `--watch` | Watch mode (recompile on file changes) |

## Documentation

| Document | Description |
|---|---|
| [Architecture Overview](docs/architecture/OVERVIEW.md) | Full system architecture |
| [Compiler Pipeline](docs/architecture/COMPILER_PIPELINE.md) | Detailed pass descriptions |
| [Intermediate Representations](docs/architecture/INTERMEDIATE_REPRESENTATIONS.md) | All IR definitions and schemas |
| [Data Flow](docs/architecture/DATA_FLOW.md) | Data and control flow diagrams |
| [Module Dependencies](docs/architecture/MODULE_DEPENDENCY.md) | Package dependency graph |
| [Artifact Specification](docs/specification/ARTIFACTS.md) | Generated artifact schemas |
| [Algorithms](docs/specification/ALGORITHMS.md) | Algorithm analysis and tradeoffs |
| [Optimization Passes](docs/optimization/PASSES.md) | Optimization strategy |
| [Plugin System](docs/api/PLUGIN_SYSTEM.md) | Plugin architecture and interfaces |
| [Public API](docs/api/PUBLIC_API.md) | TypeScript API reference |
| [Configuration](docs/specification/CONFIGURATION.md) | Configuration reference |
| [Visualization](docs/visualization/DESIGN.md) | Visualization component design |
| [CLI Reference](docs/developer/CLI.md) | Command-line interface |
| [Debugging](docs/developer/DEBUGGING.md) | Debugging guide |
| [Testing Strategy](docs/developer/TESTING.md) | Testing approach |
| [Comparison](docs/research/COMPARISON.md) | Comparison with existing systems |
| [Academic Paper](docs/research/ACADEMIC_PAPER.md) | Paper-style writeup |
| [Roadmap](docs/roadmap/ROADMAP.md) | Development roadmap |

## License

MIT — see LICENSE
