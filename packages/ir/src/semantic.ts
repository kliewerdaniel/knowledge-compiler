import { z } from 'zod';
import type {
  UUID,
  IRNode,
  IREdge,
  IRGraph,
} from './types.js';

export interface SemanticNode extends IRNode {
  label: string;
  embedding?: number[];
  sectionId: UUID;
  conceptIds: UUID[];
}

export interface SemanticGraph extends IRGraph<SemanticNode> {
  totalClusters: number;
  averageSimilarity: number;
  dimensionality: number;
}

export const SemanticNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  metadata: z.record(z.string(), z.unknown()),
  createdAt: z.number(),
  version: z.number(),
  label: z.string(),
  embedding: z.array(z.number()).optional(),
  sectionId: z.string(),
  conceptIds: z.array(z.string()),
});

export const SemanticGraphSchema = z.object({
  totalClusters: z.number().int().nonnegative(),
  averageSimilarity: z.number(),
  dimensionality: z.number().int().nonnegative(),
  nodes: z.record(z.string(), SemanticNodeSchema),
  edges: z.record(z.string(), z.any()),
  adjacency: z.record(z.string(), z.array(z.string())),
});
