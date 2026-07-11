import { z } from 'zod';
import type {
  UUID,
  IRNode,
  IREdge,
  IRGraph,
} from './types.js';

export type KnowledgeNodeType =
  | 'Document'
  | 'Section'
  | 'Entity'
  | 'Concept'
  | 'Topic'
  | 'Cluster';

export interface KnowledgeNode extends IRNode {
  type: KnowledgeNodeType;
  originalGraph: string;
  originalId: UUID;
  label: string;
  description: string;
  aliases: string[];
  importance: number;
  embedding?: number[];
}

export type KnowledgeEdgeType =
  | 'contains'
  | 'co-occurs'
  | 'related-to'
  | 'defined-in'
  | 'is-a'
  | 'part-of'
  | 'cites'
  | 'references'
  | 'links-to'
  | 'semantically-similar'
  | 'derived-from'
  | 'depends-on';

export interface KnowledgeEdge extends IREdge {
  type: KnowledgeEdgeType;
  sourceGraph: string;
  originalEdgeId: UUID;
}

export interface KnowledgeGraph extends IRGraph<KnowledgeNode> {
  version: string;
  upstreamGraphs: string[];
  nodeTypeDistribution: Record<KnowledgeNodeType, number>;
  totalEdges: number;
  averageImportance: number;
  createdAt: number;
}

export const KnowledgeNodeSchema = z.object({
  id: z.string(),
  type: z.enum(['Document', 'Section', 'Entity', 'Concept', 'Topic', 'Cluster']),
  metadata: z.record(z.string(), z.unknown()),
  createdAt: z.number(),
  version: z.number(),
  originalGraph: z.string(),
  originalId: z.string(),
  label: z.string(),
  description: z.string(),
  aliases: z.array(z.string()),
  importance: z.number(),
  embedding: z.array(z.number()).optional(),
});

export const KnowledgeEdgeSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  targetId: z.string(),
  type: z.enum([
    'contains',
    'co-occurs',
    'related-to',
    'defined-in',
    'is-a',
    'part-of',
    'cites',
    'references',
    'links-to',
    'semantically-similar',
    'derived-from',
    'depends-on',
  ]),
  weight: z.number(),
  metadata: z.record(z.string(), z.unknown()),
  sourceGraph: z.string(),
  originalEdgeId: z.string(),
});

export const KnowledgeGraphSchema = z.object({
  version: z.string(),
  upstreamGraphs: z.array(z.string()),
  nodeTypeDistribution: z.record(
    z.enum(['Document', 'Section', 'Entity', 'Concept', 'Topic', 'Cluster']),
    z.number().int().nonnegative(),
  ),
  totalEdges: z.number().int().nonnegative(),
  averageImportance: z.number(),
  createdAt: z.number(),
  nodes: z.record(z.string(), KnowledgeNodeSchema),
  edges: z.record(z.string(), KnowledgeEdgeSchema),
  adjacency: z.record(z.string(), z.array(z.string())),
});
