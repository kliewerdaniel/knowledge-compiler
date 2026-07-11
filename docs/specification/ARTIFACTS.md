# Knowledge Compiler — Artifact Specification

> **Audience:** Senior TypeScript engineers implementing artifact generation and frontend consumption.
>
> **Version:** 1.0.0

---

## 1. Common Definitions

These reusable schema fragments are referenced across all artifact schemas.

```typescript
import { z } from "zod";

// ── Primitives ──────────────────────────────────────────────

export const Timestamp = z.number().int().positive();
export type Timestamp = z.infer<typeof Timestamp>;

/** Hex color string, e.g. "#3B82F6" */
export const Color = z.string().regex(/^#[0-9a-fA-F]{6}$/);
export type Color = z.infer<typeof Color>;

export const Vector2D = z.object({ x: z.number(), y: z.number() });
export type Vector2D = z.infer<typeof Vector2D>;

export const BBox = z.object({
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
});
export type BBox = z.infer<typeof BBox>;

export const WeightedScore = z.object({
  score: z.number().min(0).max(1),
  confidence: z.number().min(0).max(1),
  method: z.string(),
});
export type WeightedScore = z.infer<typeof WeightedScore>;

// ── References ──────────────────────────────────────────────

export const NodeRef = z.object({
  id: z.string().min(1),
  type: z.enum(["document", "section", "entity", "concept", "topic"]),
  label: z.string(),
});
export type NodeRef = z.infer<typeof NodeRef>;

// ── Artifact Entry ──────────────────────────────────────────

export const ArtifactEntry = z.object({
  path: z.string(),
  hash: z.string().length(64),
  size: z.number().int().nonnegative(),
  contentType: z.string(),
});
export type ArtifactEntry = z.infer<typeof ArtifactEntry>;
```

---

## 2. Core Artifacts

### 2.1 `manifest.json` — File Manifest

**Purpose:** Top-level inventory of every generated artifact. Consumed by deployment pipelines (Vercel), frontend loaders, and cache invalidation logic. Enables integrity verification via hashes.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { ArtifactEntry, Timestamp } from "./common";

export const ManifestSchema = z.object({
  version: z.literal(1),
  generatedAt: Timestamp,
  artifacts: z.record(z.string(), ArtifactEntry),
});
export type Manifest = z.infer<typeof ManifestSchema>;
```

**Example:**

```json
{
  "version": 1,
  "generatedAt": 1764987432000,
  "artifacts": {
    "manifest.json": {
      "path": "manifest.json",
      "hash": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
      "size": 412,
      "contentType": "application/json"
    },
    "knowledge.json": {
      "path": "knowledge.json",
      "hash": "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
      "size": 14820392,
      "contentType": "application/json"
    },
    "graph.json": {
      "path": "graph.json",
      "hash": "c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
      "size": 2847391,
      "contentType": "application/json"
    },
    "entities.json": {
      "path": "entities.json",
      "hash": "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
      "size": 3847201,
      "contentType": "application/json"
    },
    "clusters.json": {
      "path": "clusters.json",
      "hash": "e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6",
      "size": 948102,
      "contentType": "application/json"
    },
    "concepts.json": {
      "path": "concepts.json",
      "hash": "f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7",
      "size": 612034,
      "contentType": "application/json"
    },
    "navigation.json": {
      "path": "navigation.json",
      "hash": "a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8",
      "size": 187320,
      "contentType": "application/json"
    },
    "embeddings/index.json": {
      "path": "embeddings/index.json",
      "hash": "b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9",
      "size": 89210,
      "contentType": "application/json"
    },
    "embeddings/embeddings.bin": {
      "path": "embeddings/embeddings.bin",
      "hash": "c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0",
      "size": 128000032,
      "contentType": "application/octet-stream"
    },
    "search-index.json": {
      "path": "search-index.json",
      "hash": "d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1",
      "size": 6741203,
      "contentType": "application/json"
    },
    "relationships.json": {
      "path": "relationships.json",
      "hash": "e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
      "size": 4912370,
      "contentType": "application/json"
    },
    "recommendations.json": {
      "path": "recommendations.json",
      "hash": "f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3",
      "size": 984102,
      "contentType": "application/json"
    },
    "statistics.json": {
      "path": "statistics.json",
      "hash": "a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4",
      "size": 1823,
      "contentType": "application/json"
    },
    "compiler-report.json": {
      "path": "compiler-report.json",
      "hash": "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
      "size": 24791,
      "contentType": "application/json"
    }
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~1 KB       | ~0.5 KB | ~0.4 KB |
| 10,000    | ~4 KB       | ~1.5 KB | ~1.2 KB |

**Consumers:** Vercel deployment hooks, frontend `ArtifactLoader` utility, CI/CD pipelines.

**Dependencies:** None (generated last, after all other artifacts are written).

---

### 2.2 `knowledge.json` — Unified Knowledge Graph

**Purpose:** The primary artifact — a complete semantic graph of the knowledge base. Contains every node and edge with full metadata. Used for graph analytics, querying, and as the source of truth from which most other artifacts are derived.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { NodeRef, WeightedScore, Timestamp, Color, BBox } from "./common";

// ── Nodes ───────────────────────────────────────────────────

export const DocumentNode = z.object({
  id: z.string().min(1),
  type: z.literal("document"),
  label: z.string(),
  description: z.string().optional(),
  path: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  authors: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  publishedAt: Timestamp.optional(),
  modifiedAt: Timestamp.optional(),
  wordCount: z.number().int().nonnegative(),
  readingTimeMinutes: z.number().nonnegative(),
  language: z.string().default("en"),
  embeddingId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export const SectionNode = z.object({
  id: z.string().min(1),
  type: z.literal("section"),
  label: z.string(),
  description: z.string().optional(),
  documentId: z.string().min(1),
  headingLevel: z.number().int().min(1).max(6),
  headingText: z.string(),
  slug: z.string(),
  position: z.number().int().nonnegative(),
  wordCount: z.number().int().nonnegative(),
  embeddingId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export const EntityNode = z.object({
  id: z.string().min(1),
  type: z.literal("entity"),
  label: z.string(),
  description: z.string().optional(),
  entityType: z.string(),
  aliases: z.array(z.string()).default([]),
  frequency: z.number().int().nonnegative(),
  confidence: z.number().min(0).max(1),
  salience: z.number().min(0).max(1).optional(),
  wikipediaId: z.string().optional(),
  wikidataId: z.string().optional(),
  embeddingId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export const ConceptNode = z.object({
  id: z.string().min(1),
  type: z.literal("concept"),
  label: z.string(),
  description: z.string().optional(),
  level: z.number().int().nonnegative(),
  parentId: z.string().optional(),
  childIds: z.array(z.string()).default([]),
  documentCount: z.number().int().nonnegative(),
  path: z.array(z.string()),
  embeddingId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export const TopicNode = z.object({
  id: z.string().min(1),
  type: z.literal("topic"),
  label: z.string(),
  description: z.string().optional(),
  clusterId: z.string().optional(),
  topTerms: z.array(z.string()).default([]),
  representative: z.boolean().default(false),
  embeddingId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export const KnowledgeNode = z.discriminatedUnion("type", [
  DocumentNode,
  SectionNode,
  EntityNode,
  ConceptNode,
  TopicNode,
]);
export type KnowledgeNode = z.infer<typeof KnowledgeNode>;

// ── Edges ───────────────────────────────────────────────────

export const EdgeTypes = [
  "contains",
  "mentions",
  "related_to",
  "is_a",
  "part_of",
  "cites",
  "references",
  "authored_by",
  "belongs_to",
  "subtopic_of",
  "similar_to",
  "prerequisite",
  "elaborates",
  "contradicts",
  "supports",
] as const;

export const KnowledgeEdge = z.object({
  id: z.string().min(1),
  sourceId: z.string().min(1),
  targetId: z.string().min(1),
  type: z.enum(EdgeTypes),
  weight: z.number().min(0).max(1).default(1),
  directed: z.boolean().default(false),
  context: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
  scores: z.array(WeightedScore).default([]),
});
export type KnowledgeEdge = z.infer<typeof KnowledgeEdge>;

// ── Graph ───────────────────────────────────────────────────

export const KnowledgeGraphMetadata = z.object({
  title: z.string(),
  description: z.string().optional(),
  sourceCount: z.number().int().nonnegative(),
  generatedAt: Timestamp,
  compilerVersion: z.string(),
  language: z.string().default("en"),
  stats: z.object({
    nodeCount: z.number().int().nonnegative(),
    edgeCount: z.number().int().nonnegative(),
    documentCount: z.number().int().nonnegative(),
    entityCount: z.number().int().nonnegative(),
    conceptCount: z.number().int().nonnegative(),
    topicCount: z.number().int().nonnegative(),
    averageDegree: z.number().nonnegative().optional(),
    density: z.number().min(0).max(1).optional(),
  }),
});

export const KnowledgeSchema = z.object({
  version: z.literal(1),
  metadata: KnowledgeGraphMetadata,
  nodes: z.array(KnowledgeNode),
  edges: z.array(KnowledgeEdge),
});
export type Knowledge = z.infer<typeof KnowledgeSchema>;
```

**Example:**

```json
{
  "version": 1,
  "metadata": {
    "title": "Machine Learning Foundations",
    "description": "Comprehensive knowledge base covering ML theory, algorithms, and applications",
    "sourceCount": 847,
    "generatedAt": 1764987432000,
    "compilerVersion": "1.2.0",
    "language": "en",
    "stats": {
      "nodeCount": 15234,
      "edgeCount": 89142,
      "documentCount": 847,
      "entityCount": 6281,
      "conceptCount": 3124,
      "topicCount": 4892,
      "averageDegree": 11.7,
      "density": 0.00038
    }
  },
  "nodes": [
    {
      "id": "doc-ml-intro",
      "type": "document",
      "label": "Introduction to Machine Learning",
      "description": "A comprehensive overview of machine learning concepts, history, and applications",
      "path": "docs/foundations/introduction-to-machine-learning.md",
      "slug": "introduction-to-machine-learning",
      "title": "Introduction to Machine Learning",
      "subtitle": "From Pattern Recognition to Deep Learning",
      "authors": ["dr-sarah-chen", "prof-michael-torres"],
      "tags": ["machine-learning", "overview", "foundations"],
      "publishedAt": 1735689600000,
      "modifiedAt": 1764891032000,
      "wordCount": 4820,
      "readingTimeMinutes": 24,
      "language": "en",
      "embeddingId": "emb-doc-ml-intro",
      "metadata": {
        "difficulty": "beginner",
        "status": "published",
        "category": "foundations"
      }
    },
    {
      "id": "sec-ml-intro-definition",
      "type": "section",
      "label": "What is Machine Learning?",
      "description": "Formal definition of machine learning according to Tom Mitchell",
      "documentId": "doc-ml-intro",
      "headingLevel": 2,
      "headingText": "What is Machine Learning?",
      "slug": "what-is-machine-learning",
      "position": 1,
      "wordCount": 620,
      "embeddingId": "emb-sec-ml-intro-definition",
      "metadata": {}
    },
    {
      "id": "ent-tom-mitchell",
      "type": "entity",
      "label": "Tom Mitchell",
      "description": "American computer scientist and professor at Carnegie Mellon University, known for his contributions to machine learning",
      "entityType": "person",
      "aliases": ["Thomas M. Mitchell", "Tom M. Mitchell"],
      "frequency": 47,
      "confidence": 0.98,
      "salience": 0.72,
      "wikipediaId": "Tom_Mitchell_(computer_scientist)",
      "wikidataId": "Q7817415",
      "embeddingId": "emb-ent-tom-mitchell",
      "metadata": {
        "birthYear": 1951,
        "affiliation": "Carnegie Mellon University"
      }
    },
    {
      "id": "con-supervised-learning",
      "type": "concept",
      "label": "Supervised Learning",
      "description": "A paradigm where models learn from labeled training data to map inputs to outputs",
      "level": 1,
      "parentId": "con-machine-learning",
      "childIds": ["con-classification", "con-regression", "con-ensemble-methods"],
      "documentCount": 312,
      "path": ["con-machine-learning", "con-supervised-learning"],
      "embeddingId": "emb-con-supervised-learning",
      "metadata": {}
    },
    {
      "id": "top-neural-networks",
      "type": "topic",
      "label": "Neural Networks",
      "description": "Documents and concepts related to artificial neural networks and deep learning",
      "clusterId": "cluster-deep-learning",
      "topTerms": ["neural network", "backpropagation", "activation function", "layer", "gradient descent"],
      "representative": true,
      "embeddingId": "emb-top-neural-networks",
      "metadata": {
        "relevanceScore": 0.94
      }
    }
  ],
  "edges": [
    {
      "id": "edge-001",
      "sourceId": "doc-ml-intro",
      "targetId": "sec-ml-intro-definition",
      "type": "contains",
      "weight": 1.0,
      "directed": true,
      "context": "document structure",
      "metadata": {},
      "scores": []
    },
    {
      "id": "edge-002",
      "sourceId": "sec-ml-intro-definition",
      "targetId": "ent-tom-mitchell",
      "type": "mentions",
      "weight": 0.85,
      "directed": true,
      "context": "Mitchell's definition: A computer program is said to learn from experience E...",
      "metadata": { "mentionPosition": 142 },
      "scores": [
        { "score": 0.92, "confidence": 0.88, "method": "nlp-entity-linker/v2" }
      ]
    },
    {
      "id": "edge-003",
      "sourceId": "ent-tom-mitchell",
      "targetId": "con-supervised-learning",
      "type": "related_to",
      "weight": 0.76,
      "directed": false,
      "context": "Mitchell's book 'Machine Learning' extensively covers supervised learning",
      "metadata": { "relationship": "contribution" },
      "scores": []
    },
    {
      "id": "edge-004",
      "sourceId": "doc-ml-intro",
      "targetId": "doc-linear-regression",
      "type": "cites",
      "weight": 0.6,
      "directed": true,
      "context": "See also: Linear Regression Analysis",
      "metadata": { "citationType": "further_reading" },
      "scores": []
    }
  ]
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~15 MB       | ~2.5 MB | ~1.8 MB |
| 10,000    | ~180 MB      | ~28 MB | ~20 MB |

**Compression Ratio:** gzip ~6:1, brotli ~8:1.

**Consumers:** Backend analytics pipelines, graph query engine, full-text search index builder, recommendation engine.

**Dependencies:** Compiled from source documents via IR pipeline (DocumentIR -> SectionIR -> EntityIR -> GraphIR).

---

### 2.3 `graph.json` — Visualization Graph

**Purpose:** Lightweight graph optimized for browser-based rendering. Contains only the data needed for force-directed, hierarchical, or radial graph visualizations. Strips metadata, full text, and deep relationships to minimize payload size.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { Vector2D, Color } from "./common";

export const VisualNode = z.object({
  id: z.string().min(1),
  label: z.string(),
  category: z.enum(["document", "section", "entity", "concept", "topic"]),
  color: Color,
  size: z.number().positive(),
  position: Vector2D.optional(),
  fixed: z.boolean().default(false),
  opacity: z.number().min(0).max(1).default(1),
  icon: z.string().optional(),
  url: z.string().optional(),
  clusterId: z.string().optional(),
});
export type VisualNode = z.infer<typeof VisualNode>;

export const VisualEdge = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  type: z.string(),
  weight: z.number().min(0).max(1),
  color: Color.optional(),
  dashed: z.boolean().default(false),
  label: z.string().optional(),
  opacity: z.number().min(0).max(1).default(0.6),
});
export type VisualEdge = z.infer<typeof VisualEdge>;

export const GraphLayout = z.enum(["force", "hierarchical", "radial"]);
export type GraphLayout = z.infer<typeof GraphLayout>;

export const GraphSchema = z.object({
  version: z.literal(1),
  nodes: z.array(VisualNode),
  edges: z.array(VisualEdge),
  layout: GraphLayout,
  metadata: z.object({
    nodeCount: z.number().int().nonnegative(),
    edgeCount: z.number().int().nonnegative(),
    categories: z.array(z.string()),
    layoutIterations: z.number().int().nonnegative().optional(),
    boundingBox: z
      .object({
        minX: z.number(),
        minY: z.number(),
        maxX: z.number(),
        maxY: z.number(),
      })
      .optional(),
  }),
});
export type Graph = z.infer<typeof GraphSchema>;
```

**Example:**

```json
{
  "version": 1,
  "nodes": [
    {
      "id": "doc-ml-intro",
      "label": "Introduction to Machine Learning",
      "category": "document",
      "color": "#3B82F6",
      "size": 24,
      "position": { "x": 152.4, "y": 89.3 },
      "fixed": false,
      "opacity": 1.0,
      "icon": "file-text",
      "url": "/docs/introduction-to-machine-learning",
      "clusterId": "cluster-foundations"
    },
    {
      "id": "ent-tom-mitchell",
      "label": "Tom Mitchell",
      "category": "entity",
      "color": "#F59E0B",
      "size": 14,
      "position": { "x": 283.7, "y": 156.2 },
      "fixed": false,
      "opacity": 1.0,
      "icon": "user",
      "clusterId": "cluster-people"
    },
    {
      "id": "con-supervised-learning",
      "label": "Supervised Learning",
      "category": "concept",
      "color": "#10B981",
      "size": 18,
      "position": { "x": 412.1, "y": 45.8 },
      "fixed": false,
      "opacity": 1.0,
      "icon": "brain",
      "clusterId": "cluster-ml-concepts"
    },
    {
      "id": "top-neural-networks",
      "label": "Neural Networks",
      "category": "topic",
      "color": "#8B5CF6",
      "size": 20,
      "position": { "x": 521.6, "y": 234.1 },
      "fixed": false,
      "opacity": 1.0,
      "icon": "network",
      "clusterId": "cluster-deep-learning"
    }
  ],
  "edges": [
    {
      "id": "edge-001-v",
      "source": "doc-ml-intro",
      "target": "ent-tom-mitchell",
      "type": "mentions",
      "weight": 0.85,
      "color": "#94A3B8",
      "dashed": false,
      "label": "mentions",
      "opacity": 0.6
    },
    {
      "id": "edge-003-v",
      "source": "ent-tom-mitchell",
      "target": "con-supervised-learning",
      "type": "related_to",
      "weight": 0.76,
      "color": "#94A3B8",
      "dashed": false,
      "opacity": 0.6
    },
    {
      "id": "edge-004-v",
      "source": "doc-ml-intro",
      "target": "doc-linear-regression",
      "type": "cites",
      "weight": 0.6,
      "color": "#94A3B8",
      "dashed": true,
      "label": "cites",
      "opacity": 0.4
    }
  ],
  "layout": "force",
  "metadata": {
    "nodeCount": 4231,
    "edgeCount": 18294,
    "categories": ["document", "section", "entity", "concept", "topic"],
    "layoutIterations": 300,
    "boundingBox": {
      "minX": -842.3,
      "minY": -612.8,
      "maxX": 893.1,
      "maxY": 745.6
    }
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~4 MB        | ~800 KB | ~550 KB |
| 10,000    | ~45 MB       | ~8 MB | ~5.5 MB |

**Consumers:** `GraphCanvas` (D3.js/Force-directed), `HierarchicalTree` (d3-hierarchy), `RadialGraph` (D3.js radial), `GraphControls` (filter/search).

**Dependencies:** Derived from `knowledge.json`; node positions computed by layout engine (WebWorker layout).

---

### 2.4 `entities.json` — Extracted Entities

**Purpose:** All named entities extracted from documents with frequency, confidence, and provenance. Used for entity lists, entity detail pages, named-entity search, and entity-based recommendations.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { NodeRef, WeightedScore } from "./common";

export const Entity = z.object({
  id: z.string().min(1),
  name: z.string(),
  type: z.enum([
    "person",
    "organization",
    "location",
    "product",
    "technology",
    "concept",
    "event",
    "document",
    "other",
  ]),
  aliases: z.array(z.string()).default([]),
  description: z.string().optional(),
  frequency: z.number().int().nonnegative(),
  confidence: z.number().min(0).max(1),
  salience: z.number().min(0).max(1).optional(),
  documents: z.array(z.string()),
  firstSeen: z.number().int().positive().optional(),
  lastSeen: z.number().int().positive().optional(),
  relatedEntities: z.array(NodeRef).default([]),
  wikipediaId: z.string().optional(),
  wikidataId: z.string().optional(),
  embeddingId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});
export type Entity = z.infer<typeof Entity>;

export const EntitiesSchema = z.object({
  version: z.literal(1),
  entities: z.array(Entity),
  metadata: z.object({
    totalEntities: z.number().int().nonnegative(),
    types: z.record(z.string(), z.number().int().nonnegative()),
    averageConfidence: z.number().min(0).max(1),
    highConfidenceCount: z.number().int().nonnegative(),
  }),
});
export type Entities = z.infer<typeof EntitiesSchema>;
```

**Example:**

```json
{
  "version": 1,
  "entities": [
    {
      "id": "ent-tom-mitchell",
      "name": "Tom Mitchell",
      "type": "person",
      "aliases": ["Thomas M. Mitchell", "Tom M. Mitchell"],
      "description": "American computer scientist and professor at Carnegie Mellon University, known for his contributions to machine learning",
      "frequency": 47,
      "confidence": 0.98,
      "salience": 0.72,
      "documents": ["doc-ml-intro", "doc-supervised-learning", "doc-decision-trees", "doc-ml-classic-papers"],
      "firstSeen": 1735689600000,
      "lastSeen": 1764891032000,
      "relatedEntities": [
        { "id": "ent-carnegie-mellon", "type": "entity", "label": "Carnegie Mellon University" },
        { "id": "con-supervised-learning", "type": "concept", "label": "Supervised Learning" },
        { "id": "ent-machine-learning", "type": "entity", "label": "Machine Learning" }
      ],
      "wikipediaId": "Tom_Mitchell_(computer_scientist)",
      "wikidataId": "Q7817415",
      "embeddingId": "emb-ent-tom-mitchell",
      "metadata": {
        "birthYear": 1951,
        "nationality": "American",
        "knownFor": ["Machine Learning", "Decision Trees", "Version Spaces"],
        "notableWorks": ["Machine Learning (book)"]
      }
    },
    {
      "id": "ent-pytorch",
      "name": "PyTorch",
      "type": "technology",
      "aliases": ["py-torch", "pytorch framework"],
      "description": "Open-source machine learning framework developed by Meta AI based on the Torch library",
      "frequency": 234,
      "confidence": 0.99,
      "salience": 0.85,
      "documents": ["doc-deep-learning-intro", "doc-pytorch-tutorial", "doc-neural-networks-practical", "doc-cnn-implementation"],
      "firstSeen": 1740960000000,
      "lastSeen": 1764987432000,
      "relatedEntities": [
        { "id": "ent-meta-ai", "type": "entity", "label": "Meta AI" },
        { "id": "ent-tensorflow", "type": "entity", "label": "TensorFlow" },
        { "id": "con-deep-learning", "type": "concept", "label": "Deep Learning" }
      ],
      "wikipediaId": "PyTorch",
      "wikidataId": "Q61473169",
      "embeddingId": "emb-ent-pytorch",
      "metadata": {
        "initialRelease": "2016-09-01",
        "programmingLanguage": "Python",
        "license": "BSD",
        "latestVersion": "2.5.0"
      }
    },
    {
      "id": "ent-transformer-architecture",
      "name": "Transformer Architecture",
      "type": "technology",
      "aliases": ["transformer", "transformer model", "attention mechanism"],
      "description": "Neural network architecture based on self-attention mechanisms, introduced in 'Attention Is All You Need'",
      "frequency": 412,
      "confidence": 0.97,
      "salience": 0.91,
      "documents": ["doc-transformers-intro", "doc-attention-mechanisms", "doc-gpt-architecture", "doc-bert-explained"],
      "firstSeen": 1727740800000,
      "lastSeen": 1764987432000,
      "relatedEntities": [
        { "id": "ent-google-brain", "type": "entity", "label": "Google Brain" },
        { "id": "ent-ashish-vaswani", "type": "entity", "label": "Ashish Vaswani" },
        { "id": "con-natural-language-processing", "type": "concept", "label": "Natural Language Processing" }
      ],
      "wikipediaId": "Transformer_(deep_learning_architecture)",
      "wikidataId": "Q60059379",
      "embeddingId": "emb-ent-transformer-architecture",
      "metadata": {
        "introduced": 2017,
        "paperId": "arxiv-1706.03762",
        "keyInnovations": ["self-attention", "multi-head attention", "positional encoding"]
      }
    }
  ],
  "metadata": {
    "totalEntities": 6281,
    "types": {
      "person": 1243,
      "organization": 987,
      "location": 456,
      "product": 312,
      "technology": 891,
      "concept": 1567,
      "event": 234,
      "document": 412,
      "other": 179
    },
    "averageConfidence": 0.87,
    "highConfidenceCount": 4891
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~4 MB        | ~700 KB | ~480 KB |
| 10,000    | ~45 MB       | ~7 MB | ~5 MB |

**Consumers:** `EntityList` (paginated grid), `EntityDetail` (full entity view), `EntitySearch` (autocomplete), `EntityGraph` (ego network).

**Dependencies:** Derived from `knowledge.json` (EntityNode extraction + aggregation).

---

### 2.5 `clusters.json` — Community & Topic Clusters

**Purpose:** Hierarchical clustering results identifying communities, topics, and thematic groupings within the knowledge graph. Used for cluster navigation, topic overviews, and thematic filtering.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { NodeRef, WeightedScore } from "./common";

export const Cluster = z.object({
  id: z.string().min(1),
  label: z.string(),
  description: z.string().optional(),
  level: z.number().int().nonnegative(),
  parentId: z.string().optional(),
  childIds: z.array(z.string()).default([]),
  memberIds: z.array(z.string()),
  memberCount: z.number().int().nonnegative(),
  internalDensity: z.number().min(0).max(1),
  conductance: z.number().min(0).max(1).optional(),
  topTerms: z.array(z.string()).max(50),
  representative: NodeRef.optional(),
  representatives: z.array(NodeRef).default([]),
  color: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});
export type Cluster = z.infer<typeof Cluster>;

export const ClustersSchema = z.object({
  version: z.literal(1),
  clusters: z.array(Cluster),
  hierarchy: z.object({
    maxDepth: z.number().int().nonnegative(),
    rootIds: z.array(z.string()),
    orphanIds: z.array(z.string()).default([]),
  }),
  metadata: z.object({
    algorithm: z.string(),
    parameters: z.record(z.string(), z.unknown()).default({}),
    quality: z
      .object({
        modularity: z.number().optional(),
        silhouetteScore: z.number().min(-1).max(1).optional(),
        coverage: z.number().min(0).max(1).optional(),
      })
      .optional(),
  }),
});
export type Clusters = z.infer<typeof ClustersSchema>;
```

**Example:**

```json
{
  "version": 1,
  "clusters": [
    {
      "id": "cluster-deep-learning",
      "label": "Deep Learning",
      "description": "Documents and entities related to deep neural networks, architectures, and training methodologies",
      "level": 0,
      "parentId": null,
      "childIds": ["cluster-cnns", "cluster-rnns", "cluster-transformers", "cluster-gan"],
      "memberIds": ["doc-deep-learning-intro", "doc-neural-networks-practical", "ent-pytorch", "ent-tensorflow", "con-backpropagation", "top-neural-networks"],
      "memberCount": 842,
      "internalDensity": 0.67,
      "conductance": 0.12,
      "topTerms": ["deep learning", "neural network", "backpropagation", "gradient descent", "activation function", "layer", "deep neural network", "training", "loss function", "optimization"],
      "representative": { "id": "doc-deep-learning-intro", "type": "document", "label": "Introduction to Deep Learning" },
      "representatives": [
        { "id": "doc-deep-learning-intro", "type": "document", "label": "Introduction to Deep Learning" },
        { "id": "ent-pytorch", "type": "entity", "label": "PyTorch" },
        { "id": "con-backpropagation", "type": "concept", "label": "Backpropagation" }
      ],
      "color": "#8B5CF6",
      "metadata": {
        "algorithmLevel": 0,
        "clusterRatio": 0.18
      }
    },
    {
      "id": "cluster-transformers",
      "label": "Transformer Architectures",
      "description": "Documents covering transformer-based models including BERT, GPT, T5, and their variants",
      "level": 1,
      "parentId": "cluster-deep-learning",
      "childIds": ["cluster-gpt", "cluster-bert", "cluster-vision-transformers"],
      "memberIds": ["doc-transformers-intro", "doc-attention-mechanisms", "ent-transformer-architecture", "ent-ashish-vaswani"],
      "memberCount": 215,
      "internalDensity": 0.72,
      "conductance": 0.09,
      "topTerms": ["transformer", "self-attention", "multi-head attention", "positional encoding", "attention mechanism", "encoder-decoder", "scaled dot-product attention"],
      "representative": { "id": "doc-transformers-intro", "type": "document", "label": "Introduction to Transformer Architectures" },
      "representatives": [
        { "id": "doc-transformers-intro", "type": "document", "label": "Introduction to Transformer Architectures" },
        { "id": "ent-transformer-architecture", "type": "entity", "label": "Transformer Architecture" }
      ],
      "color": "#A78BFA",
      "metadata": {
        "algorithmLevel": 1,
        "parentCluster": "cluster-deep-learning",
        "clusterRatio": 0.05
      }
    },
    {
      "id": "cluster-foundations",
      "label": "ML Foundations",
      "description": "Fundamental machine learning concepts, algorithms, and theoretical foundations",
      "level": 0,
      "parentId": null,
      "childIds": ["cluster-supervised", "cluster-unsupervised", "cluster-probabilistic"],
      "memberIds": ["doc-ml-intro", "con-supervised-learning", "con-linear-regression", "ent-tom-mitchell"],
      "memberCount": 1247,
      "internalDensity": 0.58,
      "conductance": 0.18,
      "topTerms": ["machine learning", "supervised learning", "regression", "classification", "training data", "generalization", "overfitting", "bias-variance tradeoff"],
      "representative": { "id": "doc-ml-intro", "type": "document", "label": "Introduction to Machine Learning" },
      "representatives": [
        { "id": "doc-ml-intro", "type": "document", "label": "Introduction to Machine Learning" },
        { "id": "con-supervised-learning", "type": "concept", "label": "Supervised Learning" }
      ],
      "color": "#3B82F6",
      "metadata": {
        "algorithmLevel": 0,
        "clusterRatio": 0.27
      }
    }
  ],
  "hierarchy": {
    "maxDepth": 3,
    "rootIds": ["cluster-deep-learning", "cluster-foundations", "cluster-nlp", "cluster-computer-vision", "cluster-reinforcement-learning", "cluster-mlops"],
    "orphanIds": ["cluster-miscellaneous"]
  },
  "metadata": {
    "algorithm": "louvain-hierarchical",
    "parameters": {
      "resolution": 1.0,
      "minCommunitySize": 5,
      "hierarchyLevels": 4
    },
    "quality": {
      "modularity": 0.72,
      "silhouetteScore": 0.43,
      "coverage": 0.89
    }
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~1.2 MB      | ~200 KB | ~140 KB |
| 10,000    | ~14 MB       | ~2 MB | ~1.4 MB |

**Consumers:** `ClusterOverview` (treemap/sunburst), `ClusterBreadcrumbs`, `ClusterFilterBar`, `ClusterDetail` (member list/network).

**Dependencies:** Derived from `knowledge.json` via community detection algorithms (Louvain, Leiden, Infomap).

---

### 2.6 `concepts.json` — Concept Hierarchy Tree

**Purpose:** Hierarchical concept taxonomy extracted from the knowledge base. Used for concept browsing, knowledge tree visualization, prerequisite chains, and curriculum generation.

**Format:** JSON (.json)

```typescript
import { z } from "zod";

export const Concept = z.object({
  id: z.string().min(1),
  label: z.string(),
  description: z.string().optional(),
  level: z.number().int().nonnegative(),
  parentId: z.string().nullable().optional(),
  childIds: z.array(z.string()).default([]),
  documentCount: z.number().int().nonnegative(),
  path: z.array(z.string()),
  confidence: z.number().min(0).max(1).optional(),
  definition: z.string().optional(),
  aliases: z.array(z.string()).default([]),
  wikipediaId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});
export type Concept = z.infer<typeof Concept>;

export const ConceptsSchema = z.object({
  version: z.literal(1),
  concepts: z.array(Concept),
  forest: z.array(
    z.object({
      rootId: z.string(),
      depth: z.number().int().nonnegative(),
      leafCount: z.number().int().nonnegative(),
      totalNodes: z.number().int().nonnegative(),
    })
  ),
  metadata: z.object({
    totalConcepts: z.number().int().nonnegative(),
    maxDepth: z.number().int().nonnegative(),
    rootCount: z.number().int().nonnegative(),
    averageDepth: z.number().nonnegative(),
    orphanCount: z.number().int().nonnegative(),
  }),
});
export type Concepts = z.infer<typeof ConceptsSchema>;
```

**Example:**

```json
{
  "version": 1,
  "concepts": [
    {
      "id": "con-machine-learning",
      "label": "Machine Learning",
      "description": "The study of algorithms that improve through experience",
      "level": 0,
      "parentId": null,
      "childIds": ["con-supervised-learning", "con-unsupervised-learning", "con-reinforcement-learning", "con-semi-supervised-learning"],
      "documentCount": 847,
      "path": ["con-machine-learning"],
      "confidence": 0.99,
      "definition": "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.",
      "aliases": ["ML", "statistical learning"],
      "wikipediaId": "Machine_learning",
      "metadata": {
        "domain": "artificial intelligence",
        "yearEmergence": 1959,
        "coinedBy": "Arthur Samuel"
      }
    },
    {
      "id": "con-supervised-learning",
      "label": "Supervised Learning",
      "description": "Learning from labeled training data to map inputs to outputs",
      "level": 1,
      "parentId": "con-machine-learning",
      "childIds": ["con-classification", "con-regression", "con-ensemble-methods", "con-support-vector-machines"],
      "documentCount": 312,
      "path": ["con-machine-learning", "con-supervised-learning"],
      "confidence": 0.98,
      "definition": "Supervised learning is the machine learning task of learning a function that maps an input to an output based on example input-output pairs.",
      "aliases": ["supervised machine learning"],
      "wikipediaId": "Supervised_learning",
      "metadata": {
        "domain": "machine learning",
        "commonAlgorithms": ["linear regression", "logistic regression", "decision trees", "random forests", "SVM", "neural networks"]
      }
    },
    {
      "id": "con-classification",
      "label": "Classification",
      "description": "Predicting categorical class labels for input data",
      "level": 2,
      "parentId": "con-supervised-learning",
      "childIds": ["con-binary-classification", "con-multi-class-classification", "con-multi-label-classification"],
      "documentCount": 187,
      "path": ["con-machine-learning", "con-supervised-learning", "con-classification"],
      "confidence": 0.97,
      "definition": "Classification is a supervised learning approach where the goal is to predict the categorical class label of new instances based on past observations.",
      "aliases": ["categorization", "class prediction"],
      "wikipediaId": "Statistical_classification",
      "metadata": {
        "domain": "machine learning",
        "evaluationMetrics": ["accuracy", "precision", "recall", "F1-score", "AUC-ROC"]
      }
    },
    {
      "id": "con-binary-classification",
      "label": "Binary Classification",
      "description": "Classification with exactly two classes",
      "level": 3,
      "parentId": "con-classification",
      "childIds": [],
      "documentCount": 93,
      "path": ["con-machine-learning", "con-supervised-learning", "con-classification", "con-binary-classification"],
      "confidence": 0.96,
      "definition": "Binary classification is the task of classifying elements into two groups (positive and negative).",
      "aliases": ["two-class classification", "dichotomy"],
      "wikipediaId": "Binary_classification",
      "metadata": {
        "domain": "machine learning",
        "commonAlgorithms": ["logistic regression", "SVM", "decision trees"]
      }
    }
  ],
  "forest": [
    {
      "rootId": "con-machine-learning",
      "depth": 5,
      "leafCount": 487,
      "totalNodes": 892
    },
    {
      "rootId": "con-mathematics",
      "depth": 4,
      "leafCount": 312,
      "totalNodes": 567
    },
    {
      "rootId": "con-computer-science",
      "depth": 3,
      "leafCount": 245,
      "totalNodes": 423
    }
  ],
  "metadata": {
    "totalConcepts": 3124,
    "maxDepth": 5,
    "rootCount": 8,
    "averageDepth": 2.4,
    "orphanCount": 124
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~800 KB      | ~140 KB | ~100 KB |
| 10,000    | ~9 MB        | ~1.4 MB | ~1 MB |

**Consumers:** `ConceptTree` (collapsible tree), `ConceptBreadcrumbs`, `ConceptCard`, `PrerequisiteChain`, `CurriculumPlanner`.

**Dependencies:** Derived from `knowledge.json` (ConceptNode extraction + hierarchy inference).

---

### 2.7 `navigation.json` — Navigation Structure

**Purpose:** Complete navigation structure for the frontend — pages, breadcrumbs, and sitemap. Used for sidebar nav, header nav, breadcrumb trails, and SEO XML sitemap generation.

**Format:** JSON (.json)

```typescript
import { z } from "zod";

export const NavPage = z.object({
  id: z.string().min(1),
  title: z.string(),
  slug: z.string(),
  path: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  parentId: z.string().optional(),
  order: z.number().int().nonnegative(),
  depth: z.number().int().nonnegative(),
  isFolder: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  documentId: z.string().optional(),
  children: z.array(z.string()).default([]),
  visibility: z.enum(["public", "authenticated", "admin"]).default("public"),
  badge: z.string().optional(),
});
export type NavPage = z.infer<typeof NavPage>;

export const Breadcrumb = z.object({
  label: z.string(),
  slug: z.string(),
  path: z.string(),
});
export type Breadcrumb = z.infer<typeof Breadcrumb>;

export const SitemapEntry = z.object({
  path: z.string(),
  priority: z.number().min(0).max(1),
  changefreq: z.enum(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"]),
  lastModified: z.number().int().positive().optional(),
});
export type SitemapEntry = z.infer<typeof SitemapEntry>;

export const NavigationSchema = z.object({
  version: z.literal(1),
  pages: z.array(NavPage),
  breadcrumbs: z.record(z.string(), z.array(Breadcrumb)),
  sitemap: z.array(SitemapEntry),
  metadata: z.object({
    totalPages: z.number().int().nonnegative(),
    maxDepth: z.number().int().nonnegative(),
    folderCount: z.number().int().nonnegative(),
    rootPages: z.array(z.string()),
  }),
});
export type Navigation = z.infer<typeof NavigationSchema>;
```

**Example:**

```json
{
  "version": 1,
  "pages": [
    {
      "id": "nav-home",
      "title": "Home",
      "slug": "",
      "path": "/",
      "description": "Knowledge base home page",
      "icon": "home",
      "parentId": null,
      "order": 0,
      "depth": 0,
      "isFolder": false,
      "isPublished": true,
      "children": [],
      "visibility": "public"
    },
    {
      "id": "nav-foundations",
      "title": "Foundations",
      "slug": "foundations",
      "path": "/foundations",
      "description": "Core foundations of machine learning",
      "icon": "book-open",
      "parentId": null,
      "order": 1,
      "depth": 0,
      "isFolder": true,
      "isPublished": true,
      "children": ["nav-ml-intro", "nav-math-foundations", "nav-probability"],
      "visibility": "public"
    },
    {
      "id": "nav-ml-intro",
      "title": "Introduction to Machine Learning",
      "slug": "introduction-to-machine-learning",
      "path": "/foundations/introduction-to-machine-learning",
      "description": "A comprehensive overview of machine learning concepts, history, and applications",
      "icon": "file-text",
      "parentId": "nav-foundations",
      "order": 0,
      "depth": 1,
      "isFolder": false,
      "isPublished": true,
      "documentId": "doc-ml-intro",
      "children": [],
      "visibility": "public"
    },
    {
      "id": "nav-supervised-learning",
      "title": "Supervised Learning",
      "slug": "supervised-learning",
      "path": "/foundations/supervised-learning",
      "description": "Supervised learning algorithms, theory, and practice",
      "icon": "file-text",
      "parentId": "nav-foundations",
      "order": 1,
      "depth": 1,
      "isFolder": true,
      "isPublished": true,
      "children": ["nav-linear-regression", "nav-classification", "nav-ensemble-methods"],
      "visibility": "public"
    },
    {
      "id": "nav-deep-learning",
      "title": "Deep Learning",
      "slug": "deep-learning",
      "path": "/deep-learning",
      "description": "Deep neural networks, architectures, and training",
      "icon": "layers",
      "parentId": null,
      "order": 2,
      "depth": 0,
      "isFolder": true,
      "isPublished": true,
      "children": ["nav-transformers", "nav-cnns", "nav-rnns"],
      "visibility": "public"
    },
    {
      "id": "nav-transformers",
      "title": "Transformer Architectures",
      "slug": "transformer-architectures",
      "path": "/deep-learning/transformer-architectures",
      "description": "Transformer-based models including BERT, GPT, and their variants",
      "icon": "file-text",
      "parentId": "nav-deep-learning",
      "order": 0,
      "depth": 1,
      "isFolder": false,
      "isPublished": true,
      "documentId": "doc-transformers-intro",
      "children": [],
      "visibility": "public"
    }
  ],
  "breadcrumbs": {
    "doc-ml-intro": [
      { "label": "Home", "slug": "", "path": "/" },
      { "label": "Foundations", "slug": "foundations", "path": "/foundations" },
      { "label": "Introduction to Machine Learning", "slug": "introduction-to-machine-learning", "path": "/foundations/introduction-to-machine-learning" }
    ],
    "doc-transformers-intro": [
      { "label": "Home", "slug": "", "path": "/" },
      { "label": "Deep Learning", "slug": "deep-learning", "path": "/deep-learning" },
      { "label": "Transformer Architectures", "slug": "transformer-architectures", "path": "/deep-learning/transformer-architectures" }
    ]
  },
  "sitemap": [
    { "path": "/", "priority": 1.0, "changefreq": "weekly", "lastModified": 1764987432000 },
    { "path": "/foundations", "priority": 0.9, "changefreq": "weekly", "lastModified": 1764987432000 },
    { "path": "/foundations/introduction-to-machine-learning", "priority": 0.8, "changefreq": "monthly", "lastModified": 1764891032000 },
    { "path": "/foundations/supervised-learning", "priority": 0.8, "changefreq": "monthly", "lastModified": 1764785432000 },
    { "path": "/deep-learning", "priority": 0.9, "changefreq": "weekly", "lastModified": 1764987432000 },
    { "path": "/deep-learning/transformer-architectures", "priority": 0.8, "changefreq": "monthly", "lastModified": 1764812232000 }
  ],
  "metadata": {
    "totalPages": 847,
    "maxDepth": 3,
    "folderCount": 142,
    "rootPages": ["nav-home", "nav-foundations", "nav-deep-learning", "nav-nlp", "nav-computer-vision", "nav-mlops", "nav-glossary", "nav-entities"]
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~250 KB      | ~45 KB | ~32 KB |
| 10,000    | ~3 MB        | ~480 KB | ~340 KB |

**Consumers:** `SidebarNav` (recursive tree), `HeaderNav` (top-level), `BreadcrumbTrail`, `SitemapGenerator` (SEO), `PageLayout` (dynamic routing).

**Dependencies:** Derived from `knowledge.json` (document hierarchy + metadata).

---

### 2.8 `embeddings/` — Binary Embedding Vectors

**Purpose:** Dense vector embeddings for semantic search, similarity computation, clustering, and recommendation. Binary format minimizes size and enables fast mmap-based loading in Node.js and browser (via WebAssembly).

**Format:** Binary (.bin) + JSON index (.json)

#### Binary Header (`embeddings.bin`)

| Offset | Size | Field | Value |
|--------|------|-------|-------|
| 0      | 4    | Magic  | `0x4B43454D` ("KCEM") |
| 4      | 4    | Version | uint32 LE |
| 8      | 4    | Dimension | uint32 LE |
| 12     | 4    | Count | uint32 LE |
| 16     | 16   | Reserved | Zero-padded |
| 32     | N    | Data | float32[count][dimension] row-major |

#### Index (`index.json`)

```typescript
import { z } from "zod";

export const EmbeddingIndexSchema = z.object({
  version: z.literal(1),
  dimension: z.number().int().positive(),
  totalCount: z.number().int().nonnegative(),
  entries: z.array(
    z.object({
      nodeId: z.string().min(1),
      rowIndex: z.number().int().nonnegative(),
      nodeType: z.enum(["document", "section", "entity", "concept", "topic"]),
      label: z.string(),
    })
  ),
  metadata: z.object({
    model: z.string(),
    normalization: z.enum(["l2", "none"]),
    effectiveDimension: z.number().int().positive().optional(),
  }),
});
export type EmbeddingIndex = z.infer<typeof EmbeddingIndexSchema>;
```

**Example (`index.json`):**

```json
{
  "version": 1,
  "dimension": 1536,
  "totalCount": 14382,
  "entries": [
    { "nodeId": "doc-ml-intro", "rowIndex": 0, "nodeType": "document", "label": "Introduction to Machine Learning" },
    { "nodeId": "sec-ml-intro-definition", "rowIndex": 1, "nodeType": "section", "label": "What is Machine Learning?" },
    { "nodeId": "ent-tom-mitchell", "rowIndex": 2, "nodeType": "entity", "label": "Tom Mitchell" },
    { "nodeId": "con-supervised-learning", "rowIndex": 3, "nodeType": "concept", "label": "Supervised Learning" },
    { "nodeId": "top-neural-networks", "rowIndex": 4, "nodeType": "topic", "label": "Neural Networks" }
  ],
  "metadata": {
    "model": "text-embedding-3-large",
    "normalization": "l2",
    "effectiveDimension": 1536
  }
}
```

**Binary first 4 bytes:** `4B43454D` ("KCEM" magic).

**Typical Size:**

| Documents | .bin (1536d) | index.json | gzip(.bin) | brotli(.bin) |
|-----------|-------------|------------|------------|--------------|
| 1,000     | ~24 MB      | ~120 KB    | ~22 MB     | ~21 MB       |
| 10,000    | ~240 MB     | ~1.2 MB    | ~220 MB    | ~210 MB      |

**Compression Note:** Float32 arrays are near-incompressible (~1.05:1). The index JSON compresses well (~5:1).

**Consumers:** `SemanticSearch` (cosine similarity), `SimilarDocuments` (k-NN), `RecommendationEngine` (client-side), `EmbeddingVisualization` (PCA/t-SNE projection).

**Dependencies:** Derived from `knowledge.json` (node texts -> embedding model -> binary writer).

---

### 2.9 `search-index.json` — Full-Text Search Index

**Purpose:** Inverted index enabling instant full-text search across all documents and sections. Supports term matching, phrase search, field-scoped search, and relevance scoring (BM25).

**Format:** JSON (.json)

```typescript
import { z } from "zod";

export const PostingListEntry = z.object({
  docId: z.string().min(1),
  positions: z.array(z.number().int().nonnegative()),
  field: z.string(),
  frequency: z.number().int().positive(),
  weight: z.number().min(0).max(1).optional(),
});
export type PostingListEntry = z.infer<typeof PostingListEntry>;

export const PostingList = z.object({
  term: z.string(),
  documentFrequency: z.number().int().positive(),
  totalFrequency: z.number().int().positive(),
  entries: z.array(PostingListEntry),
});
export type PostingList = z.infer<typeof PostingList>;

export const SearchIndexSchema = z.object({
  version: z.literal(1),
  index: z.record(z.string(), PostingList),
  metadata: z.object({
    documentCount: z.number().int().nonnegative(),
    uniqueTerms: z.number().int().nonnegative(),
    averageDocumentLength: z.number().nonnegative(),
    totalTokens: z.number().int().nonnegative(),
    fields: z.array(z.string()),
    tokenizer: z.string(),
    stopwordsRemoved: z.boolean(),
    stemmerUsed: z.string().optional(),
  }),
  fields: z.array(z.string()),
});
export type SearchIndex = z.infer<typeof SearchIndexSchema>;
```

**Example:**

```json
{
  "version": 1,
  "index": {
    "machine": {
      "term": "machine",
      "documentFrequency": 647,
      "totalFrequency": 12843,
      "entries": [
        { "docId": "doc-ml-intro", "positions": [12, 45, 189, 234], "field": "title", "frequency": 4, "weight": 2.5 },
        { "docId": "doc-ml-intro", "positions": [56, 128, 345, 678, 912, 1456], "field": "body", "frequency": 6, "weight": 1.0 },
        { "docId": "doc-linear-regression", "positions": [89, 167], "field": "body", "frequency": 2, "weight": 1.0 },
        { "docId": "doc-deep-learning-intro", "positions": [34, 78], "field": "body", "frequency": 2, "weight": 1.0 }
      ]
    },
    "learning": {
      "term": "learning",
      "documentFrequency": 743,
      "totalFrequency": 15672,
      "entries": [
        { "docId": "doc-ml-intro", "positions": [13, 46, 190, 235, 679], "field": "body", "frequency": 5, "weight": 1.0 },
        { "docId": "doc-supervised-learning", "positions": [23, 67, 145], "field": "title", "frequency": 3, "weight": 2.5 },
        { "docId": "doc-supervised-learning", "positions": [45, 89, 234, 567, 890], "field": "body", "frequency": 5, "weight": 1.0 }
      ]
    },
    "transformer": {
      "term": "transformer",
      "documentFrequency": 312,
      "totalFrequency": 4891,
      "entries": [
        { "docId": "doc-transformers-intro", "positions": [15, 67, 134, 267], "field": "title", "frequency": 4, "weight": 2.5 },
        { "docId": "doc-transformers-intro", "positions": [34, 89, 156, 278, 345, 567, 789, 901], "field": "body", "frequency": 8, "weight": 1.0 },
        { "docId": "doc-attention-mechanisms", "positions": [12, 45, 78], "field": "body", "frequency": 3, "weight": 1.0 },
        { "docId": "doc-gpt-architecture", "positions": [23, 56, 89, 123], "field": "body", "frequency": 4, "weight": 1.0 }
      ]
    },
    "gradient": {
      "term": "gradient",
      "documentFrequency": 534,
      "totalFrequency": 8921,
      "entries": [
        { "docId": "doc-ml-intro", "positions": [345, 678], "field": "body", "frequency": 2, "weight": 1.0 },
        { "docId": "doc-neural-networks-practical", "positions": [67, 134, 201, 345], "field": "body", "frequency": 4, "weight": 1.0 },
        { "docId": "doc-backpropagation", "positions": [23, 45, 67, 89, 111, 134], "field": "title", "frequency": 6, "weight": 2.5 }
      ]
    }
  },
  "metadata": {
    "documentCount": 847,
    "uniqueTerms": 48293,
    "averageDocumentLength": 1423.7,
    "totalTokens": 1205873,
    "fields": ["title", "body", "description", "tags", "headings"],
    "tokenizer": "unicode-word-boundary",
    "stopwordsRemoved": true,
    "stemmerUsed": "snowball-english"
  },
  "fields": ["title", "body", "description", "tags", "headings"]
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~8 MB        | ~1.5 MB | ~1 MB |
| 10,000    | ~95 MB       | ~16 MB | ~11 MB |

**Consumers:** `SearchBar` (typeahead), `SearchResults` (ranked list), `SearchFilter`, `SearchHighlight` (snippet generation).

**Dependencies:** Derived from `knowledge.json` (document/section text -> tokenizer -> inverted index).

---

### 2.10 `relationships.json` — Typed Relationships

**Purpose:** Complete set of typed, weighted relationships between all nodes. Used for relationship exploration, path finding, graph queries, and relationship-based recommendations.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { WeightedScore, NodeRef } from "./common";

export const RelationshipType = z.enum([
  "contains", "mentions", "related_to", "is_a", "part_of",
  "cites", "references", "authored_by", "belongs_to",
  "subtopic_of", "similar_to", "prerequisite", "elaborates",
  "contradicts", "supports", "derived_from", "implements",
  "depends_on", "examples", "trained_on",
]);
export type RelationshipType = z.infer<typeof RelationshipType>;

export const Relationship = z.object({
  id: z.string().min(1),
  sourceId: z.string().min(1),
  targetId: z.string().min(1),
  type: RelationshipType,
  weight: z.number().min(0).max(1),
  directed: z.boolean(),
  context: z.string().optional(),
  sourceLabel: z.string().optional(),
  targetLabel: z.string().optional(),
  sourceType: z.string().optional(),
  targetType: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
  scores: z.array(WeightedScore).default([]),
  confidence: z.number().min(0).max(1).optional(),
  extractedAt: z.number().int().positive().optional(),
});
export type Relationship = z.infer<typeof Relationship>;

export const RelationshipsSchema = z.object({
  version: z.literal(1),
  relationships: z.array(Relationship),
  metadata: z.object({
    totalRelationships: z.number().int().nonnegative(),
    typeCounts: z.record(z.string(), z.number().int().nonnegative()),
    uniqueSources: z.number().int().nonnegative(),
    uniqueTargets: z.number().int().nonnegative(),
    averageWeight: z.number().min(0).max(1),
    density: z.number().min(0).max(1).optional(),
  }),
});
export type Relationships = z.infer<typeof RelationshipsSchema>;
```

**Example:**

```json
{
  "version": 1,
  "relationships": [
    {
      "id": "rel-001",
      "sourceId": "doc-ml-intro",
      "targetId": "sec-ml-intro-definition",
      "type": "contains",
      "weight": 1.0,
      "directed": true,
      "context": "document structure",
      "sourceLabel": "Introduction to Machine Learning",
      "targetLabel": "What is Machine Learning?",
      "sourceType": "document",
      "targetType": "section",
      "metadata": { "position": 1 },
      "scores": [],
      "confidence": 1.0,
      "extractedAt": 1764987432000
    },
    {
      "id": "rel-002",
      "sourceId": "sec-ml-intro-definition",
      "targetId": "ent-tom-mitchell",
      "type": "mentions",
      "weight": 0.85,
      "directed": true,
      "context": "Mitchell's definition: 'A computer program is said to learn from experience E...'",
      "sourceLabel": "What is Machine Learning?",
      "targetLabel": "Tom Mitchell",
      "sourceType": "section",
      "targetType": "entity",
      "metadata": {
        "mentionType": "direct_quote",
        "mentionPosition": 142,
        "sentenceContext": "Tom Mitchell provides a well-studied formal definition..."
      },
      "scores": [
        { "score": 0.92, "confidence": 0.88, "method": "nlp-entity-linker/v2" }
      ],
      "confidence": 0.88,
      "extractedAt": 1764987432000
    },
    {
      "id": "rel-003",
      "sourceId": "con-supervised-learning",
      "targetId": "con-classification",
      "type": "is_a",
      "weight": 0.95,
      "directed": true,
      "context": "Classification is a type of supervised learning task",
      "sourceLabel": "Supervised Learning",
      "targetLabel": "Classification",
      "sourceType": "concept",
      "targetType": "concept",
      "metadata": { "hierarchy": "parent-child" },
      "scores": [
        { "score": 0.95, "confidence": 0.93, "method": "hierarchy-inference/v1" }
      ],
      "confidence": 0.93,
      "extractedAt": 1764987432000
    },
    {
      "id": "rel-004",
      "sourceId": "doc-linear-regression",
      "targetId": "doc-ml-intro",
      "type": "cites",
      "weight": 0.6,
      "directed": true,
      "context": "See 'Introduction to Machine Learning' for background",
      "sourceLabel": "Linear Regression Analysis",
      "targetLabel": "Introduction to Machine Learning",
      "sourceType": "document",
      "targetType": "document",
      "metadata": { "citationType": "further_reading" },
      "scores": [],
      "confidence": 0.95,
      "extractedAt": 1764987432000
    },
    {
      "id": "rel-005",
      "sourceId": "con-backpropagation",
      "targetId": "con-gradient-descent",
      "type": "prerequisite",
      "weight": 0.9,
      "directed": true,
      "context": "Understanding gradient descent is required before studying backpropagation",
      "sourceLabel": "Backpropagation",
      "targetLabel": "Gradient Descent",
      "sourceType": "concept",
      "targetType": "concept",
      "metadata": { "strength": "required" },
      "scores": [
        { "score": 0.9, "confidence": 0.87, "method": "prerequisite-inference/v2" }
      ],
      "confidence": 0.87,
      "extractedAt": 1764987432000
    },
    {
      "id": "rel-006",
      "sourceId": "ent-pytorch",
      "targetId": "ent-tensorflow",
      "type": "similar_to",
      "weight": 0.72,
      "directed": false,
      "context": "Both are popular deep learning frameworks",
      "sourceLabel": "PyTorch",
      "targetLabel": "TensorFlow",
      "sourceType": "entity",
      "targetType": "entity",
      "metadata": { "similarityBasis": "functionality" },
      "scores": [
        { "score": 0.72, "confidence": 0.81, "method": "embedding-cosine-sim/v1" }
      ],
      "confidence": 0.81,
      "extractedAt": 1764987432000
    }
  ],
  "metadata": {
    "totalRelationships": 89142,
    "typeCounts": {
      "contains": 847,
      "mentions": 23412,
      "related_to": 18234,
      "is_a": 4231,
      "part_of": 1876,
      "cites": 3214,
      "references": 5678,
      "authored_by": 187,
      "belongs_to": 4892,
      "subtopic_of": 3124,
      "similar_to": 12456,
      "prerequisite": 2341,
      "elaborates": 1892,
      "contradicts": 234,
      "supports": 1456,
      "derived_from": 892,
      "implements": 678,
      "depends_on": 1432,
      "examples": 2341,
      "trained_on": 234
    },
    "uniqueSources": 14234,
    "uniqueTargets": 14891,
    "averageWeight": 0.74,
    "density": 0.00038
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~6 MB        | ~1 MB | ~700 KB |
| 10,000    | ~72 MB       | ~11 MB | ~7.5 MB |

**Consumers:** `RelationshipGraph` (ego network), `PathFinder` (shortest path visualization), `RelationshipTable` (sortable/filterable), `RelatedContent` (sidebar), `PrerequisiteChain` (learning path).

**Dependencies:** Derived from `knowledge.json` (edge extraction + deduplication + enrichment).

---

### 2.11 `recommendations.json` — Pre-computed Recommendations

**Purpose:** Pre-computed content recommendations for every node in the graph. Enables instant "related content", "next steps", and "you might also like" without real-time computation.

**Format:** JSON (.json)

```typescript
import { z } from "zod";

export const RecommendationItem = z.object({
  id: z.string().min(1),
  score: z.number().min(0).max(1),
  reason: z.string(),
  strategy: z.string().optional(),
  explainability: z.array(z.string()).optional(),
});
export type RecommendationItem = z.infer<typeof RecommendationItem>;

export const RecommendationEntry = z.object({
  items: z.array(RecommendationItem).max(50),
  computedBy: z.string(),
  computedAt: z.number().int().positive().optional(),
  strategies: z.array(z.string()).default([]),
  diversity: z.number().min(0).max(1).optional(),
});
export type RecommendationEntry = z.infer<typeof RecommendationEntry>;

export const RecommendationsSchema = z.object({
  version: z.literal(1),
  recommendations: z.record(z.string(), RecommendationEntry),
  metadata: z.object({
    totalEntries: z.number().int().nonnegative(),
    strategies: z.array(z.string()),
    averageItemsPerEntry: z.number().nonnegative(),
    coverage: z.number().min(0).max(1),
    freshness: z.number().int().positive().optional(),
  }),
});
export type Recommendations = z.infer<typeof RecommendationsSchema>;
```

**Example:**

```json
{
  "version": 1,
  "recommendations": {
    "doc-ml-intro": {
      "items": [
        {
          "id": "doc-supervised-learning",
          "score": 0.92,
          "reason": "Deepens understanding of supervised learning concepts introduced in this document",
          "strategy": "prerequisite-chain",
          "explainability": [
            "Both documents share concept 'supervised learning'",
            "Document doc-supervised-learning is cited by doc-ml-intro",
            "Users who read doc-ml-intro typically continue with doc-supervised-learning"
          ]
        },
        {
          "id": "doc-linear-regression",
          "score": 0.87,
          "reason": "Linear regression is the most fundamental supervised learning algorithm",
          "strategy": "curriculum-order",
          "explainability": [
            "Linear regression is a subtopic of supervised learning",
            "8 other documents in this knowledge base reference both"
          ]
        },
        {
          "id": "doc-history-ml",
          "score": 0.72,
          "reason": "Provides historical context for the developments discussed",
          "strategy": "semantic-similarity",
          "explainability": [
            "Embedding cosine similarity: 0.72",
            "Shares 12 common entities"
          ]
        },
        {
          "id": "doc-pytorch-tutorial",
          "score": 0.45,
          "reason": "Practical implementation of ML concepts",
          "strategy": "diversity-boost",
          "explainability": [
            "Complements theoretical content with hands-on practice",
            "Introduces PyTorch, a key ML framework"
          ]
        }
      ],
      "computedBy": "recommendation-engine/v2.1",
      "computedAt": 1764987432000,
      "strategies": ["prerequisite-chain", "curriculum-order", "semantic-similarity", "diversity-boost"],
      "diversity": 0.34
    },
    "con-supervised-learning": {
      "items": [
        {
          "id": "con-classification",
          "score": 0.94,
          "reason": "Classification is a direct subtype of supervised learning",
          "strategy": "hierarchy-traversal",
          "explainability": ["Concept hierarchy: supervised learning -> classification"]
        },
        {
          "id": "con-regression",
          "score": 0.91,
          "reason": "Regression is a major branch of supervised learning",
          "strategy": "hierarchy-traversal",
          "explainability": ["Concept hierarchy: supervised learning -> regression"]
        },
        {
          "id": "doc-supervised-learning",
          "score": 0.88,
          "reason": "Comprehensive document on supervised learning algorithms",
          "strategy": "concept-document-relevance",
          "explainability": [
            "Highest TF-IDF score for concept 'supervised learning'",
            "Document is tagged with 'supervised-learning'"
          ]
        }
      ],
      "computedBy": "recommendation-engine/v2.1",
      "computedAt": 1764987432000,
      "strategies": ["hierarchy-traversal", "concept-document-relevance", "semantic-similarity"],
      "diversity": 0.42
    }
  },
  "metadata": {
    "totalEntries": 14234,
    "strategies": ["prerequisite-chain", "curriculum-order", "semantic-similarity", "diversity-boost", "entity-document-affinity", "entity-similarity", "concept-bridge", "hierarchy-traversal", "concept-document-relevance", "collaborative-filtering", "popularity"],
    "averageItemsPerEntry": 8.4,
    "coverage": 0.97,
    "freshness": 1764987432000
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~1.5 MB      | ~250 KB | ~170 KB |
| 10,000    | ~18 MB       | ~2.8 MB | ~2 MB |

**Consumers:** `RelatedContent` (sidebar widget), `NextSteps` (learning path), `SimilarDocuments` (bottom of page), `RecommendedReading` (homepage section).

**Dependencies:** Derived from `knowledge.json`, `embeddings/` (cosine similarity), `relationships.json` (graph traversal), `clusters.json` (co-membership), `concepts.json` (hierarchy).

---

### 2.12 `statistics.json` — Dataset Statistics

**Purpose:** High-level compilation statistics and dataset metrics. Used for dashboard displays, dataset quality monitoring, and CI/CD pipeline assertions.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { Timestamp } from "./common";

export const CompilationStats = z.object({
  duration: z.number().nonnegative(),
  passes: z.number().int().nonnegative(),
  cacheHits: z.number().int().nonnegative(),
  cacheMisses: z.number().int().nonnegative(),
  errors: z.number().int().nonnegative(),
  warnings: z.number().int().nonnegative(),
});
export type CompilationStats = z.infer<typeof CompilationStats>;

export const DatasetStats = z.object({
  documentCount: z.number().int().nonnegative(),
  totalWords: z.number().int().nonnegative(),
  totalSections: z.number().int().nonnegative(),
  totalEntities: z.number().int().nonnegative(),
  totalConcepts: z.number().int().nonnegative(),
  totalTopics: z.number().int().nonnegative().optional(),
  totalEdges: z.number().int().nonnegative(),
  totalRelationships: z.number().int().nonnegative().optional(),
  avgDocumentLength: z.number().nonnegative(),
  medianDocumentLength: z.number().nonnegative().optional(),
  avgSectionsPerDocument: z.number().nonnegative(),
  avgEntitiesPerDocument: z.number().nonnegative(),
  vocabularySize: z.number().int().nonnegative().optional(),
  uniqueAuthors: z.number().int().nonnegative().optional(),
  dateRange: z
    .object({
      earliest: Timestamp.optional(),
      latest: Timestamp.optional(),
    })
    .optional(),
  languageDistribution: z.record(z.string(), z.number()).optional(),
  tagDistribution: z.record(z.string(), z.number()).optional(),
});
export type DatasetStats = z.infer<typeof DatasetStats>;

export const StatisticsSchema = z.object({
  version: z.literal(1),
  compilation: CompilationStats,
  dataset: DatasetStats,
  assertions: z
    .array(
      z.object({
        name: z.string(),
        passed: z.boolean(),
        expected: z.unknown(),
        actual: z.unknown(),
        severity: z.enum(["error", "warning"]),
      })
    )
    .default([]),
});
export type Statistics = z.infer<typeof StatisticsSchema>;
```

**Example:**

```json
{
  "version": 1,
  "compilation": {
    "duration": 84723,
    "passes": 12,
    "cacheHits": 4562,
    "cacheMisses": 847,
    "errors": 0,
    "warnings": 23
  },
  "dataset": {
    "documentCount": 847,
    "totalWords": 1205873,
    "totalSections": 4231,
    "totalEntities": 6281,
    "totalConcepts": 3124,
    "totalTopics": 4892,
    "totalEdges": 89142,
    "totalRelationships": 89142,
    "avgDocumentLength": 1423.7,
    "medianDocumentLength": 1189,
    "avgSectionsPerDocument": 4.99,
    "avgEntitiesPerDocument": 7.42,
    "vocabularySize": 48293,
    "uniqueAuthors": 312,
    "dateRange": {
      "earliest": 1680307200000,
      "latest": 1764987432000
    },
    "languageDistribution": {
      "en": 812,
      "es": 18,
      "fr": 12,
      "de": 5
    },
    "tagDistribution": {
      "machine-learning": 312,
      "deep-learning": 215,
      "nlp": 178,
      "computer-vision": 145,
      "reinforcement-learning": 89,
      "mathematics": 234,
      "programming": 312,
      "tutorial": 167
    }
  },
  "assertions": [
    {
      "name": "document-count-threshold",
      "passed": true,
      "expected": 800,
      "actual": 847,
      "severity": "error"
    },
    {
      "name": "entity-extraction-quality",
      "passed": true,
      "expected": 0.80,
      "actual": 0.87,
      "severity": "warning"
    },
    {
      "name": "entity-count-stability",
      "passed": true,
      "expected": 6000,
      "actual": 6281,
      "severity": "error"
    }
  ]
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~2 KB        | ~0.7 KB | ~0.5 KB |
| 10,000    | ~6 KB        | ~2 KB | ~1.5 KB |

**Consumers:** `Dashboard` (admin panel), `CI/CD Pipeline` (assertion checking), `CompilationHistory` (trending over time).

**Dependencies:** Derived from all artifacts after generation; depends on `knowledge.json`, `entities.json`, `concepts.json`, `relationships.json`.

---

### 2.13 `compiler-report.json` — Full Compiler Report

**Purpose:** Comprehensive compilation report with per-pass timing, cache performance, and diagnostic information.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { Timestamp } from "./common";

export const PassReport = z.object({
  name: z.string(),
  duration: z.number().nonnegative(),
  status: z.enum(["success", "skipped", "cached", "error", "partial"]),
  inputArtifacts: z.array(z.string()).default([]),
  outputArtifacts: z.array(z.string()).default([]),
  memoryDelta: z.number().int().optional(),
  itemsProcessed: z.number().int().nonnegative().optional(),
  errors: z.array(z.string()).default([]),
  warnings: z.array(z.string()).default([]),
  metadata: z.record(z.string(), z.unknown()).default({}),
});
export type PassReport = z.infer<typeof PassReport>;

export const CompilerWarning = z.object({
  id: z.string(),
  severity: z.enum(["info", "warning", "critical"]),
  message: z.string(),
  source: z.string().optional(),
  location: z.string().optional(),
  pass: z.string().optional(),
  suggestion: z.string().optional(),
});
export type CompilerWarning = z.infer<typeof CompilerWarning>;

export const CompilerError = z.object({
  id: z.string(),
  message: z.string(),
  source: z.string().optional(),
  location: z.string().optional(),
  pass: z.string().optional(),
  stackTrace: z.string().optional(),
  recoverable: z.boolean(),
});
export type CompilerError = z.infer<typeof CompilerError>;

export const CacheReport = z.object({
  hits: z.number().int().nonnegative(),
  misses: z.number().int().nonnegative(),
  hitRate: z.number().min(0).max(1),
  size: z.number().int().nonnegative(),
  evictions: z.number().int().nonnegative().optional(),
  oldestEntry: Timestamp.optional(),
  newestEntry: Timestamp.optional(),
});
export type CacheReport = z.infer<typeof CacheReport>;

export const CompilerReportSchema = z.object({
  version: z.literal(1),
  compilerVersion: z.string(),
  timestamp: Timestamp,
  duration: z.number().nonnegative(),
  passes: z.array(PassReport),
  warnings: z.array(CompilerWarning),
  errors: z.array(CompilerError),
  cache: CacheReport,
  environment: z
    .object({
      nodeVersion: z.string().optional(),
      platform: z.string().optional(),
      memoryTotal: z.number().int().nonnegative().optional(),
      cpuCores: z.number().int().nonnegative().optional(),
      cwd: z.string().optional(),
    })
    .optional(),
  inputSummary: z
    .object({
      totalFiles: z.number().int().nonnegative().optional(),
      totalBytes: z.number().int().nonnegative().optional(),
      fileTypes: z.record(z.string(), z.number()).optional(),
    })
    .optional(),
  outputSummary: z.object({
    totalFiles: z.number().int().nonnegative(),
    totalBytes: z.number().int().nonnegative(),
    artifacts: z
      .record(
        z.string(),
        z.object({
          size: z.number().int().nonnegative(),
          compressedSize: z.number().int().nonnegative().optional(),
          passes: z.array(z.string()),
        })
      )
      .optional(),
  }),
});
export type CompilerReport = z.infer<typeof CompilerReportSchema>;
```

**Example:** (truncated for readability — see source for full)

```json
{
  "version": 1,
  "compilerVersion": "1.2.0",
  "timestamp": 1764987432000,
  "duration": 84723,
  "passes": [
    {
      "name": "document-parser",
      "duration": 12450,
      "status": "success",
      "inputArtifacts": ["docs/**/*.md"],
      "outputArtifacts": ["knowledge.json"],
      "memoryDelta": 245760,
      "itemsProcessed": 847,
      "errors": [],
      "warnings": [
        "doc-legacy-format.md: Frontmatter missing 'title' field"
      ],
      "metadata": {
        "filesSkipped": 12,
        "parseFailures": 0,
        "totalInputBytes": 48291023
      }
    },
    {
      "name": "entity-extractor",
      "duration": 28450,
      "status": "success",
      "inputArtifacts": ["knowledge.json"],
      "outputArtifacts": ["entities.json", "knowledge.json"],
      "memoryDelta": 512000,
      "itemsProcessed": 847,
      "errors": [],
      "warnings": [
        "Entity 'openai' has low confidence (0.34)"
      ],
      "metadata": {
        "entitiesExtracted": 6281,
        "entitiesMerged": 143,
        "entitiesRejected": 87,
        "extractorModel": "en-ner-large/v3"
      }
    },
    {
      "name": "embedding-generator",
      "duration": 32100,
      "status": "success",
      "inputArtifacts": ["knowledge.json"],
      "outputArtifacts": ["embeddings/embeddings.bin", "embeddings/index.json"],
      "memoryDelta": 1024000,
      "itemsProcessed": 14382,
      "errors": [],
      "warnings": [],
      "metadata": {
        "model": "text-embedding-3-large",
        "batchSize": 64,
        "totalTokens": 3840000,
        "costEstimate": "$0.038"
      }
    },
    {
      "name": "graph-layout",
      "duration": 8723,
      "status": "success",
      "inputArtifacts": ["knowledge.json"],
      "outputArtifacts": ["graph.json"],
      "memoryDelta": 384000,
      "itemsProcessed": 4231,
      "errors": [],
      "warnings": ["Graph contains 3 disconnected components"],
      "metadata": {
        "layoutType": "force-directed",
        "iterations": 300
      }
    }
  ],
  "warnings": [
    {
      "id": "warn-001",
      "severity": "warning",
      "message": "Document 'doc-draft.md' has status 'draft' but was included in compilation",
      "source": "doc-draft.md",
      "pass": "document-parser",
      "suggestion": "Set KC_INCLUDE_DRAFTS=false to exclude draft documents"
    }
  ],
  "errors": [],
  "cache": {
    "hits": 4562,
    "misses": 847,
    "hitRate": 0.84,
    "size": 256000000,
    "evictions": 0
  },
  "environment": {
    "nodeVersion": "22.4.1",
    "platform": "darwin-arm64",
    "memoryTotal": 34359738368,
    "cpuCores": 12
  },
  "inputSummary": {
    "totalFiles": 847,
    "totalBytes": 48291023,
    "fileTypes": {
      ".md": 835,
      ".mdx": 12
    }
  },
  "outputSummary": {
    "totalFiles": 15,
    "totalBytes": 41293847
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~30 KB       | ~6 KB | ~4 KB |
| 10,000    | ~200 KB      | ~35 KB | ~24 KB |

**Consumers:** Developer tooling, CI/CD logs, `CompilationDashboard` (admin), debugging workflows.

**Dependencies:** Aggregated from all passes during compilation; final artifact written before manifest.

---

## 3. Plugin Artifacts

### 3.1 `timeline.json` — Document Timeline

**Purpose:** Chronological ordering of documents and their versions. Used for timeline visualization, changelog generation, and temporal analysis.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { Timestamp, NodeRef } from "./common";

export const TimelineEvent = z.object({
  id: z.string().min(1),
  date: Timestamp,
  type: z.enum(["created", "modified", "published", "archived", "merged", "split", "reviewed"]),
  documentId: z.string().min(1),
  documentTitle: z.string(),
  documentPath: z.string(),
  version: z.string().optional(),
  author: z.string().optional(),
  summary: z.string().optional(),
  previousVersion: z.string().optional(),
  diffSize: z.number().int().nonnegative().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});
export type TimelineEvent = z.infer<typeof TimelineEvent>;

export const Milestone = z.object({
  id: z.string().min(1),
  date: Timestamp,
  label: z.string(),
  description: z.string().optional(),
  type: z.enum(["release", "milestone", "event"]),
  relatedDocumentIds: z.array(z.string()).default([]),
});
export type Milestone = z.infer<typeof Milestone>;

export const TimelineSchema = z.object({
  version: z.literal(1),
  events: z.array(TimelineEvent),
  milestones: z.array(Milestone).default([]),
  metadata: z.object({
    dateRange: z.object({ earliest: Timestamp, latest: Timestamp }),
    totalEvents: z.number().int().nonnegative(),
    uniqueDocuments: z.number().int().nonnegative(),
    authors: z.array(z.string()).default([]),
  }),
});
export type Timeline = z.infer<typeof TimelineSchema>;
```

**Example:**

```json
{
  "version": 1,
  "events": [
    {
      "id": "evt-001",
      "date": 1680307200000,
      "type": "created",
      "documentId": "doc-ml-intro",
      "documentTitle": "Introduction to Machine Learning",
      "documentPath": "docs/foundations/introduction-to-machine-learning.md",
      "version": "1.0.0",
      "author": "dr-sarah-chen",
      "summary": "Initial creation of ML foundations document",
      "metadata": {}
    },
    {
      "id": "evt-002",
      "date": 1704067200000,
      "type": "modified",
      "documentId": "doc-ml-intro",
      "documentTitle": "Introduction to Machine Learning",
      "documentPath": "docs/foundations/introduction-to-machine-learning.md",
      "version": "1.1.0",
      "author": "prof-michael-torres",
      "summary": "Added section on supervised learning algorithms",
      "previousVersion": "1.0.0",
      "diffSize": 2840,
      "metadata": { "sectionsAdded": 2, "sectionsModified": 1 }
    },
    {
      "id": "evt-003",
      "date": 1735689600000,
      "type": "published",
      "documentId": "doc-ml-intro",
      "documentTitle": "Introduction to Machine Learning",
      "documentPath": "docs/foundations/introduction-to-machine-learning.md",
      "version": "1.2.0",
      "author": "dr-sarah-chen",
      "summary": "Ready for publication after review cycle",
      "previousVersion": "1.1.0",
      "diffSize": 1240,
      "metadata": { "reviewers": ["prof-michael-torres", "alice-kim"] }
    }
  ],
  "milestones": [
    {
      "id": "ms-001",
      "date": 1711929600000,
      "label": "v1.0 Launch",
      "description": "Initial public release of the ML Foundations knowledge base",
      "type": "release",
      "relatedDocumentIds": ["doc-ml-intro", "doc-supervised-learning", "doc-linear-regression"]
    }
  ],
  "metadata": {
    "dateRange": { "earliest": 1680307200000, "latest": 1764987432000 },
    "totalEvents": 3421,
    "uniqueDocuments": 847,
    "authors": ["dr-sarah-chen", "prof-michael-torres", "alice-kim", "bob-johnson"]
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~500 KB      | ~90 KB | ~65 KB |
| 10,000    | ~5 MB        | ~850 KB | ~600 KB |

**Consumers:** `TimelineChart`, `ChangelogPage`, `DocumentHistory`, `ActivityFeed`.

**Dependencies:** Derived from `knowledge.json` (document metadata + git history).

---

### 3.2 `glossary.json` — Glossary of Terms

**Purpose:** Curated glossary of terms with definitions. Used for glossary pages, tooltip hover definitions, and term disambiguation.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { NodeRef } from "./common";

export const GlossaryTerm = z.object({
  id: z.string().min(1),
  term: z.string(),
  definition: z.string(),
  alternateDefinitions: z.array(z.string()).default([]),
  abbreviations: z.array(z.string()).default([]),
  partOfSpeech: z.enum(["noun", "verb", "adjective", "acronym"]).optional(),
  relatedTerms: z.array(NodeRef).default([]),
  category: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  sourceDocumentId: z.string().optional(),
  sourceContext: z.string().optional(),
  wikipediaId: z.string().optional(),
  firstAppearance: z.number().int().positive().optional(),
  frequency: z.number().int().nonnegative().optional(),
});
export type GlossaryTerm = z.infer<typeof GlossaryTerm>;

export const GlossarySchema = z.object({
  version: z.literal(1),
  terms: z.array(GlossaryTerm),
  metadata: z.object({
    totalTerms: z.number().int().nonnegative(),
    categories: z.array(z.string()).default([]),
    averageConfidence: z.number().min(0).max(1).optional(),
  }),
});
export type Glossary = z.infer<typeof GlossarySchema>;
```

**Example:**

```json
{
  "version": 1,
  "terms": [
    {
      "id": "gloss-backpropagation",
      "term": "Backpropagation",
      "definition": "An algorithm for training neural networks by computing the gradient of the loss function with respect to each weight using the chain rule.",
      "alternateDefinitions": ["Short for 'backward propagation of errors'"],
      "abbreviations": ["backprop"],
      "partOfSpeech": "noun",
      "relatedTerms": [
        { "id": "con-gradient-descent", "type": "concept", "label": "Gradient Descent" },
        { "id": "con-neural-network", "type": "concept", "label": "Neural Network" }
      ],
      "category": "algorithms",
      "confidence": 0.98,
      "sourceDocumentId": "doc-backpropagation",
      "wikipediaId": "Backpropagation",
      "frequency": 892
    },
    {
      "id": "gloss-epoch",
      "term": "Epoch",
      "definition": "One complete pass through the entire training dataset during the training of a machine learning model.",
      "abbreviations": [],
      "partOfSpeech": "noun",
      "relatedTerms": [
        { "id": "con-batch-size", "type": "concept", "label": "Batch Size" }
      ],
      "category": "training",
      "confidence": 0.99,
      "wikipediaId": "Epoch_(machine_learning)",
      "frequency": 1243
    }
  ],
  "metadata": {
    "totalTerms": 893,
    "categories": ["algorithms", "architectures", "training", "data", "evaluation", "mathematics"],
    "averageConfidence": 0.93
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~350 KB      | ~60 KB | ~42 KB |
| 10,000    | ~4 MB        | ~650 KB | ~450 KB |

**Consumers:** `GlossaryPage` (A-Z index), `TermTooltip` (inline hover), `TermSearch` (autocomplete).

**Dependencies:** Derived from `knowledge.json` (entity descriptions + concept definitions + extraction).

---

### 3.3 `tags.json` — Tag/Category Taxonomy

**Purpose:** Hierarchical tag taxonomy with document associations. Used for tag filtering, category browsing, and tag-based navigation.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { Color } from "./common";

export const Tag = z.object({
  id: z.string().min(1),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  parentId: z.string().optional(),
  childIds: z.array(z.string()).default([]),
  color: Color.optional(),
  icon: z.string().optional(),
  documentCount: z.number().int().nonnegative(),
  documentIds: z.array(z.string()).default([]),
  aliases: z.array(z.string()).default([]),
  isCategory: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).default({}),
});
export type Tag = z.infer<typeof Tag>;

export const TagsSchema = z.object({
  version: z.literal(1),
  tags: z.array(Tag),
  metadata: z.object({
    totalTags: z.number().int().nonnegative(),
    totalCategories: z.number().int().nonnegative(),
    maxDepth: z.number().int().nonnegative(),
    roots: z.array(z.string()),
    orphanTags: z.array(z.string()).default([]),
  }),
});
export type Tags = z.infer<typeof TagsSchema>;
```

**Example:**

```json
{
  "version": 1,
  "tags": [
    {
      "id": "tag-ml",
      "name": "Machine Learning",
      "slug": "machine-learning",
      "description": "Content related to machine learning algorithms, theory, and practice",
      "parentId": null,
      "childIds": ["tag-supervised", "tag-unsupervised", "tag-reinforcement"],
      "color": "#3B82F6",
      "icon": "brain",
      "documentCount": 312,
      "documentIds": ["doc-ml-intro", "doc-supervised-learning"],
      "isCategory": true,
      "metadata": {}
    },
    {
      "id": "tag-supervised",
      "name": "Supervised Learning",
      "slug": "supervised-learning",
      "description": "Content covering supervised learning algorithms",
      "parentId": "tag-ml",
      "childIds": [],
      "color": "#10B981",
      "icon": "target",
      "documentCount": 187,
      "documentIds": ["doc-supervised-learning", "doc-linear-regression"],
      "isCategory": false,
      "metadata": {}
    },
    {
      "id": "tag-deep-learning",
      "name": "Deep Learning",
      "slug": "deep-learning",
      "description": "Content related to deep neural networks",
      "parentId": null,
      "childIds": ["tag-transformers", "tag-cnns"],
      "color": "#8B5CF6",
      "icon": "layers",
      "documentCount": 215,
      "documentIds": ["doc-deep-learning-intro"],
      "isCategory": true,
      "metadata": {}
    },
    {
      "id": "tag-transformers",
      "name": "Transformers",
      "slug": "transformers",
      "description": "Transformer architecture and attention mechanisms",
      "parentId": "tag-deep-learning",
      "childIds": [],
      "color": "#A78BFA",
      "icon": "git-commit",
      "documentCount": 89,
      "documentIds": ["doc-transformers-intro", "doc-attention-mechanisms"],
      "isCategory": false,
      "metadata": {}
    }
  ],
  "metadata": {
    "totalTags": 47,
    "totalCategories": 8,
    "maxDepth": 2,
    "roots": ["tag-ml", "tag-deep-learning", "tag-nlp", "tag-tutorial", "tag-tools"],
    "orphanTags": ["tag-archive"]
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~80 KB       | ~15 KB | ~10 KB |
| 10,000    | ~600 KB      | ~100 KB | ~70 KB |

**Consumers:** `TagCloud`, `CategoryFilter`, `TagBadge`, `TagSearch`, `BrowseByCategory`.

**Dependencies:** Derived from `knowledge.json` (document tags + metadata).

---

### 3.4 `authors.json` — Author Graph & Contribution Analysis

**Purpose:** Author profiles, contribution metrics, and co-authorship network.

**Format:** JSON (.json)

```typescript
import { z } from "zod";
import { NodeRef, Timestamp } from "./common";

export const Author = z.object({
  id: z.string().min(1),
  name: z.string(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  documentCount: z.number().int().nonnegative(),
  documents: z.array(z.string()),
  totalWords: z.number().int().nonnegative().optional(),
  totalEdits: z.number().int().nonnegative().optional(),
  firstContribution: Timestamp.optional(),
  lastContribution: Timestamp.optional(),
  roles: z.array(z.string()).default([]),
  expertise: z.array(z.string()).default([]),
  coauthors: z
    .array(
      z.object({
        authorId: z.string(),
        documentCount: z.number().int().nonnegative(),
        strength: z.number().min(0).max(1),
      })
    )
    .default([]),
  metadata: z.record(z.string(), z.unknown()).default({}),
});
export type Author = z.infer<typeof Author>;

export const AuthorsSchema = z.object({
  version: z.literal(1),
  authors: z.array(Author),
  coauthorshipGraph: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        documentCount: z.number().int().nonnegative(),
      })
    ),
    edges: z.array(
      z.object({
        source: z.string(),
        target: z.string(),
        weight: z.number().min(0).max(1),
        documentCount: z.number().int().nonnegative(),
      })
    ),
  }),
  metadata: z.object({
    totalAuthors: z.number().int().nonnegative(),
    totalCollaborations: z.number().int().nonnegative(),
    soloAuthors: z.number().int().nonnegative(),
    avgDocumentsPerAuthor: z.number().nonnegative(),
    mostProlificAuthor: z.string().optional(),
  }),
});
export type Authors = z.infer<typeof AuthorsSchema>;
```

**Example:**

```json
{
  "version": 1,
  "authors": [
    {
      "id": "dr-sarah-chen",
      "name": "Dr. Sarah Chen",
      "email": "sarah.chen@example.com",
      "avatar": "/assets/authors/sarah-chen.jpg",
      "bio": "Senior ML researcher specializing in deep learning and NLP",
      "documentCount": 47,
      "documents": ["doc-ml-intro", "doc-deep-learning-intro", "doc-transformers-intro"],
      "totalWords": 284100,
      "totalEdits": 1423,
      "firstContribution": 1680307200000,
      "lastContribution": 1764987432000,
      "roles": ["lead-author", "editor", "maintainer"],
      "expertise": ["machine learning", "deep learning", "NLP", "transformers"],
      "coauthors": [
        { "authorId": "prof-michael-torres", "documentCount": 18, "strength": 0.85 },
        { "authorId": "alice-kim", "documentCount": 7, "strength": 0.45 }
      ],
      "metadata": { "affiliation": "Stanford University", "orcid": "0000-0002-1824-5678" }
    },
    {
      "id": "prof-michael-torres",
      "name": "Prof. Michael Torres",
      "email": "m.torres@example.com",
      "bio": "Professor of Computer Science, focus on reinforcement learning and robotics",
      "documentCount": 34,
      "documents": ["doc-ml-intro", "doc-reinforcement-learning-intro"],
      "totalWords": 201200,
      "totalEdits": 987,
      "firstContribution": 1693526400000,
      "lastContribution": 1764891032000,
      "roles": ["author", "reviewer"],
      "expertise": ["reinforcement learning", "robotics"],
      "coauthors": [
        { "authorId": "dr-sarah-chen", "documentCount": 18, "strength": 0.85 }
      ],
      "metadata": { "affiliation": "UC Berkeley" }
    }
  ],
  "coauthorshipGraph": {
    "nodes": [
      { "id": "dr-sarah-chen", "name": "Dr. Sarah Chen", "documentCount": 47 },
      { "id": "prof-michael-torres", "name": "Prof. Michael Torres", "documentCount": 34 },
      { "id": "alice-kim", "name": "Alice Kim", "documentCount": 12 }
    ],
    "edges": [
      { "source": "dr-sarah-chen", "target": "prof-michael-torres", "weight": 0.85, "documentCount": 18 },
      { "source": "dr-sarah-chen", "target": "alice-kim", "weight": 0.45, "documentCount": 7 }
    ]
  },
  "metadata": {
    "totalAuthors": 312,
    "totalCollaborations": 2891,
    "soloAuthors": 84,
    "avgDocumentsPerAuthor": 2.71,
    "mostProlificAuthor": "dr-sarah-chen"
  }
}
```

**Typical Size:**

| Documents | Uncompressed | gzip | brotli |
|-----------|-------------|------|--------|
| 1,000     | ~200 KB      | ~35 KB | ~25 KB |
| 10,000    | ~2 MB        | ~320 KB | ~220 KB |

**Consumers:** `AuthorCard`, `AuthorPage`, `CoauthorGraph`, `ContributionChart`, `ContributorList`.

**Dependencies:** Derived from `knowledge.json` (document authors + metadata) and git history.

---

## 4. Artifact Directory Structure

```
out/
├── manifest.json                  # File manifest (required, generated last)
├── knowledge.json                 # Unified knowledge graph (required)
├── graph.json                     # Visualization graph (required)
├── entities.json                  # Extracted entities (required)
├── clusters.json                  # Community/topic clusters (required)
├── concepts.json                  # Concept hierarchy (required)
├── navigation.json                # Navigation structure (required)
├── embeddings/                    # Embedding vectors (required)
│   ├── index.json                 #   Node-to-row mapping
│   └── embeddings.bin             #   Float32 binary vectors
├── search-index.json              # Full-text search index (required)
├── relationships.json             # Typed relationships (required)
├── recommendations.json           # Pre-computed recommendations (required)
├── statistics.json                # Dataset statistics (required)
├── compiler-report.json           # Compiler report (required)
├── timeline.json                  # Document timeline (plugin)
├── glossary.json                  # Glossary of terms (plugin)
├── tags.json                      # Tag taxonomy (plugin)
├── authors.json                   # Author graph (plugin)
└── assets/                        # Static assets (images, etc.)
    ├── authors/                   #   Author avatars
    ├── diagrams/                  #   Embedded diagrams
    └── covers/                    #   Document cover images
```

---

## 5. Schema Versioning Strategy

### Semantic Versioning

Artifact schemas follow **MAJOR.MINOR.PATCH** versioning (e.g., `1.3.2`):

| Component | Change | Example |
|-----------|--------|---------|
| **MAJOR** | Breaking change — field removed, renamed, or type changed | `1.x.x` -> `2.0.0` |
| **MINOR** | Non-breaking addition — new optional field, new enum variant | `1.0.x` -> `1.1.0` |
| **PATCH** | Non-breaking fix — documentation, constraints relaxed, default value change | `1.0.0` -> `1.0.1` |

### Breaking vs Non-Breaking Changes

**Breaking changes (MAJOR increment):**
- Removing a required field
- Renaming a field
- Changing a field type (e.g., `string` -> `number`)
- Adding a new required field
- Changing discriminated union variant names
- Changing binary format header or layout

**Non-breaking changes (MINOR increment):**
- Adding a new optional field
- Adding new enum values to `z.enum()`
- Adding new discriminated union variants
- Adding new top-level metadata fields
- Extending binary format with optional trailing data (header version check)

**Non-breaking changes (PATCH increment):**
- Relaxing validation constraints (e.g., `z.number().min(0)` -> `z.number().min(-1)`)
- Adding/updating `description` strings in Zod schemas
- Changing default values
- Documentation improvements

### Migration Path

```typescript
// Version compatibility checking pattern
const SUPPORTED_VERSIONS: Record<string, number[]> = {
  "knowledge.json": [1],
  "graph.json": [1, 2],
  "entities.json": [1],
};

function assertVersion(artifactPath: string, version: number): void {
  const supported = SUPPORTED_VERSIONS[artifactPath];
  if (!supported) {
    throw new Error(`Unknown artifact: ${artifactPath}`);
  }
  if (!supported.includes(version)) {
    throw new Error(
      `Unsupported version ${version} for ${artifactPath}. ` +
      `Supported: ${supported.join(", ")}. ` +
      `Regenerate with compiler >= v1.2.0`
    );
  }
}

// Migration adapter pattern
type VersionMap<T> = { [version: number]: (data: unknown) => T };

const knowledgeMigrations: VersionMap<Knowledge> = {
  1: (data) => KnowledgeSchema.parse(data),
};
```

**Frontend consumption contract:** Frontend should always check `version` field and reject unknown major versions. Use the `SUPPORTED_VERSIONS` map as the source of truth for which artifact versions the current frontend build supports.

---

## 6. Validation Rules

### Referential Integrity

Every node/entity reference must resolve to an actual node in `knowledge.json`:

```typescript
function validateReferentialIntegrity(knowledge: Knowledge): string[] {
  const nodeIds = new Set(knowledge.nodes.map((n) => n.id));
  const errors: string[] = [];

  for (const edge of knowledge.edges) {
    if (!nodeIds.has(edge.sourceId)) {
      errors.push(`Edge ${edge.id}: sourceId '${edge.sourceId}' not found in nodes`);
    }
    if (!nodeIds.has(edge.targetId)) {
      errors.push(`Edge ${edge.id}: targetId '${edge.targetId}' not found in nodes`);
    }
  }

  return errors;
}
```

### No Duplicate IDs

```typescript
function validateNoDuplicateIds(artifacts: Record<string, { id: string }[]>): string[] {
  const seen = new Map<string, string[]>();
  const errors: string[] = [];

  for (const [source, items] of Object.entries(artifacts)) {
    for (const item of items ?? []) {
      const existing = seen.get(item.id);
      if (existing) {
        errors.push(`Duplicate ID '${item.id}' in ${source} (also in ${existing.join(", ")})`);
      }
      seen.set(item.id, [...(existing ?? []), source]);
    }
  }

  return errors;
}
```

### Edge Weight Constraints

```typescript
function validateEdgeWeights(knowledge: Knowledge): string[] {
  return knowledge.edges
    .filter((e) => e.weight < 0 || e.weight > 1)
    .map((e) => `Edge ${e.id}: weight ${e.weight} outside valid range [0, 1]`);
}
```

### Required Field Presence

```typescript
function validateRequiredFields(report: CompilerReport): string[] {
  const errors: string[] = [];
  if (!report.compilerVersion) errors.push("compiler-report.json: missing compilerVersion");
  if (!report.timestamp) errors.push("compiler-report.json: missing timestamp");
  if (!report.duration) errors.push("compiler-report.json: missing duration");
  if (!report.passes?.length) errors.push("compiler-report.json: passes array is empty");
  return errors;
}
```

### Cross-Artifact Consistency

```typescript
function validateCrossArtifactConsistency(
  knowledge: Knowledge,
  entities: Entities,
  clusters: Clusters,
  concepts: Concepts,
  stats: Statistics,
): string[] {
  const errors: string[] = [];

  if (stats.dataset.totalEntities !== entities.entities.length) {
    errors.push(
      `Entity count mismatch: statistics.json says ${stats.dataset.totalEntities}, ` +
      `entities.json has ${entities.entities.length}`
    );
  }

  if (stats.dataset.totalConcepts !== concepts.concepts.length) {
    errors.push(
      `Concept count mismatch: statistics.json says ${stats.dataset.totalConcepts}, ` +
      `concepts.json has ${concepts.concepts.length}`
    );
  }

  const docNodes = knowledge.nodes.filter((n) => n.type === "document");
  if (stats.dataset.documentCount !== docNodes.length) {
    errors.push(
      `Document count mismatch: statistics.json says ${stats.dataset.documentCount}, ` +
      `knowledge.json has ${docNodes.length} document nodes`
    );
  }

  if (stats.dataset.totalEdges !== knowledge.edges.length) {
    errors.push(
      `Edge count mismatch: statistics.json says ${stats.dataset.totalEdges}, ` +
      `knowledge.json has ${knowledge.edges.length}`
    );
  }

  const nodeIds = new Set(knowledge.nodes.map((n) => n.id));
  for (const cluster of clusters.clusters) {
    for (const memberId of cluster.memberIds) {
      if (!nodeIds.has(memberId)) {
        errors.push(`Cluster '${cluster.id}': member '${memberId}' not found in knowledge.json nodes`);
      }
    }
  }

  const docIds = new Set(docNodes.map((d) => d.id));
  for (const entity of entities.entities) {
    for (const docId of entity.documents) {
      if (!docIds.has(docId)) {
        errors.push(`Entity '${entity.id}': references document '${docId}' not found in knowledge.json`);
      }
    }
  }

  for (const concept of concepts.concepts) {
    for (const pathId of concept.path.slice(0, -1)) {
      if (!concepts.concepts.some((c) => c.id === pathId)) {
        errors.push(`Concept '${concept.id}': path ancestor '${pathId}' not found in concepts.json`);
      }
    }
  }

  return errors;
}
```

### Composite Validation Pipeline

```typescript
export function validateArtifacts(
  knowledge: Knowledge,
  entities: Entities,
  clusters: Clusters,
  concepts: Concepts,
  stats: Statistics,
  report: CompilerReport,
  graph: Graph,
  relationships: Relationships,
  recommendations: Recommendations,
): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  errors.push(...validateReferentialIntegrity(knowledge));
  errors.push(...validateEdgeWeights(knowledge));
  errors.push(...validateCrossArtifactConsistency(knowledge, entities, clusters, concepts, stats));

  const knowledgeIds = new Set(knowledge.nodes.map((n) => n.id));

  for (const vn of graph.nodes) {
    if (!knowledgeIds.has(vn.id)) {
      warnings.push(`graph.json: node '${vn.id}' not found in knowledge.json`);
    }
  }

  for (const [entryId, entry] of Object.entries(recommendations.recommendations)) {
    for (const item of entry.items) {
      if (!knowledgeIds.has(item.id)) {
        warnings.push(`recommendations.json: entry '${entryId}' recommends '${item.id}' not found in knowledge.json`);
      }
    }
  }

  for (const rel of relationships.relationships) {
    if (!knowledgeIds.has(rel.sourceId)) {
      errors.push(`relationships.json: sourceId '${rel.sourceId}' not found`);
    }
    if (!knowledgeIds.has(rel.targetId)) {
      errors.push(`relationships.json: targetId '${rel.targetId}' not found`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}
```

---

## 7. Artifact Dependency Graph

```
Source Documents
       |
       v
   Document IR
       |
       v
   Entity IR
       |
       v
   Graph IR ------> knowledge.json
       |
       +--------> entities.json
       +--------> concepts.json
       +--------> clusters.json
       +--------> navigation.json
       +--------> relationships.json
       +--------> search-index.json
       +--------> recommendations.json
       +--------> statistics.json
       +--------> compiler-report.json
       |
       v
   Layout Engine
       |
       v
   graph.json
       |
       v
   Embedding Model
       |
       v
   embeddings.bin + index.json
       |
       v
   Plugin Pipeline
       |
       +--------> timeline.json
       +--------> glossary.json
       +--------> tags.json
       +--------> authors.json
       |
       v
   manifest.json
```

---

## 8. Quick Reference — Schema Versions

| Artifact | File | Current Version | Zod Schema Name |
|----------|------|----------------|-----------------|
| Manifest | `manifest.json` | 1 | `ManifestSchema` |
| Knowledge Graph | `knowledge.json` | 1 | `KnowledgeSchema` |
| Visualization Graph | `graph.json` | 1 | `GraphSchema` |
| Entities | `entities.json` | 1 | `EntitiesSchema` |
| Clusters | `clusters.json` | 1 | `ClustersSchema` |
| Concepts | `concepts.json` | 1 | `ConceptsSchema` |
| Navigation | `navigation.json` | 1 | `NavigationSchema` |
| Embedding Index | `embeddings/index.json` | 1 | `EmbeddingIndexSchema` |
| Search Index | `search-index.json` | 1 | `SearchIndexSchema` |
| Relationships | `relationships.json` | 1 | `RelationshipsSchema` |
| Recommendations | `recommendations.json` | 1 | `RecommendationsSchema` |
| Statistics | `statistics.json` | 1 | `StatisticsSchema` |
| Compiler Report | `compiler-report.json` | 1 | `CompilerReportSchema` |
| Timeline | `timeline.json` | 1 | `TimelineSchema` |
| Glossary | `glossary.json` | 1 | `GlossarySchema` |
| Tags | `tags.json` | 1 | `TagsSchema` |
| Authors | `authors.json` | 1 | `AuthorsSchema` |
