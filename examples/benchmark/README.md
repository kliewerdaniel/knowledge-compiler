# Benchmark Corpus

Large-scale benchmark corpus for performance testing the Knowledge Compiler.

## Contents

- `corpus/` — Auto-generated Markdown documents
- `configs/` — Various configuration profiles for benchmarking
- `results/` — Benchmark result storage
- `generate.sh` — Script to generate corpus of specified size
- `run-benchmarks.sh` — Script to run benchmark suite

## Corpus Generation

```bash
# Generate 1000 documents
./generate.sh 1000 ./corpus

# Generate 10000 documents
./generate.sh 10000 ./corpus
```

Generated documents include:
- Realistic frontmatter (title, author, date, tags, categories)
- Nested section structure (2-4 levels deep)
- Internal cross-references (random links between documents)
- Citations to "fictional" papers
- Code blocks in multiple languages
- Varied document sizes (200-2000 words)

## Benchmark Profiles

| Profile | Documents | Embeddings | Clustering | Optimizations |
|---|---|---|---|---|
| `minimal` | 100 | disabled | disabled | minimal |
| `standard` | 1000 | OpenAI 1536d | Leiden | standard |
| `aggressive` | 1000 | OpenAI 3072d | Leiden+HDBSCAN | all |
| `large` | 10000 | OpenAI 1536d | Leiden | standard |
| `massive` | 100000 | quantized | Leiden | aggressive |

## Metrics Collected

- Total compilation time
- Per-pass timing breakdown
- Peak memory usage
- Cache performance (hit rate, size)
- Artifact sizes (total, per-file, compressed)
- Graph statistics (nodes, edges, density)
- Quality metrics (silhouette score, modularity)

## Configuration Profiles

### Standard Profile
```json
{
  "pipeline": {
    "parallel": { "maxWorkers": 8 }
  },
  "embedding": {
    "provider": "openai",
    "model": "text-embedding-3-small",
    "batchSize": 100,
    "chunkSize": 512
  },
  "clustering": {
    "algorithm": "leiden",
    "resolution": 1.0
  },
  "optimization": {
    "prune": { "minWeight": 0.05 },
    "deduplication": { "threshold": 0.9 },
    "compression": { "embeddings": "int8" }
  },
  "cache": {
    "enabled": true,
    "maxSize": "50GB"
  }
}
```

## Results Format

Results are stored as JSON in `results/`:

```json
{
  "timestamp": "2026-07-10T12:00:00Z",
  "profile": "standard",
  "documents": 1000,
  "system": {
    "platform": "darwin",
    "cpus": 12,
    "memory": "36GB",
    "nodeVersion": "22.0.0"
  },
  "compilation": {
    "totalMs": 45231,
    "perPass": { ... },
    "peakMemoryMb": 2048
  },
  "cache": {
    "coldMs": 45231,
    "warmMs": 3450,
    "hitRate": 0.94,
    "size": "1.2GB"
  },
  "artifacts": {
    "totalSize": "45MB",
    "compressedSize": "12MB"
  },
  "quality": {
    "modularity": 0.72,
    "silhouette": 0.58,
    "nDCG@10": 0.89
  }
}
```
