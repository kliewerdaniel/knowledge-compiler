# Knowledge Compiler

**Compile human knowledge into optimized semantic artifacts.**

Knowledge Compiler transforms arbitrary collections of Markdown documents into optimized,
statically-deployable semantic artifacts. It treats documentation as source code, applying
a multi-pass compilation pipeline analogous to traditional software compilers — producing
a deployable knowledge application that requires no runtime backend infrastructure.

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
artifacts that deploy as a static Next.js application on Vercel with zero server-side computation.

**This is not a chatbot. It is a compiler.**

## Key Features

- **Deterministic compilation pipeline** — every pass has well-defined inputs and outputs
- **Inspectable intermediate representations** — every IR can be serialized and examined
- **Incremental compilation** — only recompile what changed
- **Plugin architecture** — replace or extend every compiler pass
- **Static deployment** — zero runtime backend, pure static Next.js on Vercel
- **Rich visualization** — knowledge graphs, concept hierarchies, pipeline graphs
- **GPU-accelerated embeddings** — parallel batch embedding generation
- **Multi-model support** — pluggable embedding providers (OpenAI, local, custom)

## Quick Start

```bash
# Install
npm install -g @knowledge-compiler/cli

# Compile a directory of markdown
kc compile ./docs --out ./out

# Serve the compiled knowledge app
npx @knowledge-compiler/app ./out
```

## Repository Structure

```
knowledge-compiler/
├── docs/                    # Documentation (this directory)
│   ├── architecture/        # System architecture documentation
│   ├── specification/       # Formal specifications and schemas
│   ├── passes/              # Compiler pass documentation
│   ├── optimization/        # Optimization pass documentation
│   ├── api/                 # Public API and plugin documentation
│   ├── visualization/       # Visualization design
│   ├── developer/           # Developer experience documentation
│   ├── research/            # Research and academic documentation
│   └── roadmap/             # Development roadmap
├── src/
│   ├── compiler/            # Compiler core
│   │   ├── pipeline.ts      # Pipeline orchestration
│   │   ├── context.ts       # Compiler context and state
│   │   ├── cache.ts         # Caching layer
│   │   ├── graph.ts         # Dependency graph for incremental builds
│   │   └── scheduler.ts     # Parallel execution scheduler
│   ├── passes/              # All compiler passes
│   │   ├── parsing/         # Source parsing passes
│   │   ├── analysis/        # Semantic analysis passes
│   │   ├── graph/           # Graph construction passes
│   │   ├── embedding/       # Embedding generation passes
│   │   ├── clustering/      # Clustering passes
│   │   ├── optimization/    # Optimization passes
│   │   └── generation/      # Artifact generation passes
│   ├── ir/                  # Intermediate representation definitions
│   │   ├── types.ts         # IR type definitions
│   │   ├── document.ts      # Document AST
│   │   ├── graph.ts         # Graph IR base
│   │   ├── section.ts       # Section graph
│   │   ├── knowledge.ts     # Knowledge graph
│   │   ├── concept.ts       # Concept hierarchy
│   │   ├── semantic.ts      # Semantic graph
│   │   └── navigation.ts    # Navigation graph
│   ├── artifacts/           # Artifact generation and reading
│   │   ├── writer.ts        # Artifact writer
│   │   ├── reader.ts        # Artifact reader
│   │   └── schemas.ts       # Zod/JSON Schema definitions
│   ├── cli/                 # Command-line interface
│   │   ├── index.ts         # CLI entry point
│   │   ├── commands/        # Command implementations
│   │   └── logger.ts        # Logging and diagnostics
│   ├── api/                 # Public API surface
│   │   ├── index.ts         # Public API exports
│   │   ├── compiler.ts      # Compiler API
│   │   ├── config.ts        # Configuration API
│   │   └── hooks.ts         # Lifecycle hooks
│   ├── plugins/             # Plugin system
│   │   ├── registry.ts      # Plugin registry
│   │   ├── loader.ts        # Plugin loader
│   │   └── types.ts         # Plugin interfaces
│   └── visualization/       # Visualization components (Next.js)
│       ├── components/      # React components
│       ├── hooks/           # React hooks for artifact access
│       └── utils/           # Visualization utilities
├── tests/
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   ├── regression/          # Regression tests
│   ├── snapshot/            # Snapshot tests
│   ├── performance/         # Performance benchmarks
│   └── golden/              # Golden artifact tests
├── examples/
│   ├── minimal/             # Minimal example: few markdown files
│   ├── full-featured/       # Full-featured example with all features
│   └── benchmark/           # Large-scale benchmark corpus
├── benchmarks/
│   └── RESULTS.md           # Benchmark results
├── scripts/                 # Build and CI scripts
├── package.json
├── tsconfig.json
├── vite.config.ts           # Build configuration for compiler (library mode)
└── next.config.ts           # Build configuration for the app output
```

## Compiler Pipeline

```
Source (Markdown)
    │
    ▼
┌─────────────────────┐
│ 1. Parsing Passes   │  Markdown → Frontmatter → Document AST
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 2. Analysis Passes  │  Sections → Entities → References → Links
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 3. Graph Passes     │  Knowledge Graph → Concept Graph → Topic Graph
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 4. Embedding Passes │  Embeddings → Similarity → Semantic Graph
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 5. Clustering       │  Communities → Clusters → Hierarchy
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 6. Optimization     │  Pruning → Dedup → Folding → Compression
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 7. Generation       │  JSON artifacts → Search index → App bundle
└─────────────────────┘
    │
    ▼
Deployed Application (Static Next.js on Vercel)
```

## Documentation

| Document | Description |
|---|---|
| [Architecture Overview](docs/architecture/OVERVIEW.md) | Full system architecture |
| [Compiler Pipeline](docs/architecture/COMPILER_PIPELINE.md) | Detailed pass descriptions |
| [Intermediate Representations](docs/architecture/INTERMEDIATE_REPRESENTATIONS.md) | All IR definitions and schemas |
| [Data Flow](docs/architecture/DATA_FLOW.md) | Data and control flow diagrams |
| [Artifact Specification](docs/specification/ARTIFACTS.md) | Generated artifact schemas |
| [Algorithms](docs/specification/ALGORITHMS.md) | Algorithm analysis and tradeoffs |
| [Optimization Passes](docs/optimization/PASSES.md) | Optimization strategy |
| [Plugin System](docs/api/PLUGIN_SYSTEM.md) | Plugin architecture and interfaces |
| [Public API](docs/api/PUBLIC_API.md) | TypeScript API reference |
| [Configuration](docs/specification/CONFIGURATION.md) | Configuration reference |
| [Visualization](docs/visualization/DESIGN.md) | Visualization component design |
| [CLI Reference](docs/developer/CLI.md) | Command-line interface |
| [Testing Strategy](docs/developer/TESTING.md) | Testing approach |
| [Comparison](docs/research/COMPARISON.md) | Comparison with existing systems |
| [Academic Paper](docs/research/ACADEMIC_PAPER.md) | Paper-style writeup |
| [Roadmap](docs/roadmap/ROADMAP.md) | Development roadmap |

## License

MIT — see LICENSE
