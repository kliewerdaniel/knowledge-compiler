# Full-Featured Example

A comprehensive knowledge base demonstrating all Knowledge Compiler features.

## Contents

- `docs/` — 50 Markdown documents across 3 domains
- `images/` — Static assets (screenshots, diagrams)
- `knowledge-compiler.json` — Full configuration
- `plugins/` — Example plugins
- `expected/` — Expected compilation output for golden tests

## Domains

1. **Machine Learning** (20 docs) — Neural networks, transformers, training, deployment
2. **Systems Design** (15 docs) — Distributed systems, databases, networking, cloud architecture
3. **Programming Languages** (15 docs) — TypeScript, Rust, Go, language design

## Configuration

Full configuration demonstrating all options:
- Custom embedding provider
- Optimizer passes enabled
- Cluster algorithm selection
- Plugin configuration
- Debug mode
- Visualization themes

## Features Demonstrated

- Full compiler pipeline (all 28+ passes)
- Cross-document entity resolution
- Citation graph construction
- Community detection across domains
- Cross-domain concept hierarchy
- Semantic search across all documents
- Recommendation engine (related documents)
- Pre-computed PageRank importance
- Embedding quantization (int8)
- Graph pruning optimization
- Incremental compilation
- All frontend visualizations
- Plugin system (custom analyzer, custom exporter)
- Watch mode

## Plugins

### Custom Analyzer Plugin
```typescript
import { AnalyzerPlugin } from '@knowledge-compiler/plugins';

const codeAnalyzer: AnalyzerPlugin = {
  name: 'code-analyzer',
  version: '1.0.0',
  analyze(documents) {
    // Extract code snippets and language metadata
    // Detect programming patterns
    // Generate language-specific references
  }
};
```

### Custom Exporter Plugin
```typescript
import { ExportPlugin } from '@knowledge-compiler/plugins';

const rdfExporter: ExportPlugin = {
  name: 'rdf-exporter',
  version: '1.0.0',
  export(artifacts) {
    // Convert knowledge graph to RDF/OWL
    // Export ontology in OWL format
    // Generate SPARQL endpoint configuration
  }
};
```

## Expected Output

- `knowledge.json` — ~5000 nodes, ~15000 edges
- `graph.json` — ~500 optimized visualization nodes
- `entities.json` — ~200 entities
- `clusters.json` — ~15 clusters (5 per domain)
- `concepts.json` — ~50 concepts in 4-level hierarchy
- `navigation.json` — ~100 pages
- `embeddings/` — Quantized int8 embeddings
- `search-index.json` — ~5000 unique terms
- `recommendations.json` — Pre-computed top-10 for each document
- `relationships.json` — All typed relationships
- `compiler-report.json` — Full timing breakdown

## Performance

- Documents: 50
- Total words: ~200,000
- Compilation time (cold cache): ~45s (embedding dominant)
- Compilation time (warm cache): ~3s
- Artifact size: ~15MB (uncompressed), ~4MB (compressed)
