# Minimal Example

A minimal knowledge base demonstrating the core Knowledge Compiler functionality.

## Contents

- `docs/` — 5 Markdown documents covering a single topic
- `knowledge-compiler.json` — Minimal configuration
- `expected/` — Expected compilation output (for golden tests)

## Usage

```bash
# Navigate to this example
cd examples/minimal

# Compile
kc compile

# Serve
kc serve
```

## Documents

| File | Topic |
|---|---|
| `docs/index.md` | Overview |
| `docs/getting-started.md` | Getting started guide |
| `docs/configuration.md` | Configuration reference |
| `docs/api.md` | API documentation |
| `docs/troubleshooting.md` | Troubleshooting |

## Expected Output

The compilation produces `out/` with:
- `knowledge.json` — 5 document nodes, ~10 section nodes, ~15 entity nodes, ~20 concept nodes
- `graph.json` — ~50 nodes for visualization
- `entities.json` — ~15 extracted entities
- `concepts.json` — ~8 concepts in hierarchy
- `navigation.json` — 5 pages + breadcrumb trails
- `search-index.json` — Inverted index of ~200 unique terms
- `statistics.json` — Compilation statistics

## Configuration

```json
{
  "source": {
    "patterns": ["docs/**/*.md"]
  },
  "output": {
    "dir": "./out"
  },
  "embedding": {
    "provider": "openai",
    "model": "text-embedding-3-small"
  },
  "pipeline": {
    "parallel": false
  },
  "visualization": {
    "maxGraphNodes": 100
  }
}
```
