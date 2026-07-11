import { z } from 'zod';
import type {
  UUID,
  IRNode,
  IREdge,
  IRGraph,
} from './types.js';

export interface ConceptNode extends IRNode {
  label: string;
  description: string;
  level: number;
  parentId?: UUID;
  childIds: UUID[];
  aliases: string[];
  entityIds: UUID[];
  sectionIds: UUID[];
  frequency: number;
  documentCount: number;
  embedding?: number[];
}

export type ConceptEdgeType =
  | 'is-a'
  | 'has-a'
  | 'related-to'
  | 'broader-than'
  | 'narrower-than'
  | 'prerequisite-for'
  | 'equivalent-to';

export interface ConceptGraph extends IRGraph<ConceptNode> {
  maxLevel: number;
  totalConcepts: number;
  rootConceptIds: UUID[];
  leafCount: number;
  averageDepth: number;
  maxChildren: number;
}

export const ConceptNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  metadata: z.record(z.string(), z.unknown()),
  createdAt: z.number(),
  version: z.number(),
  label: z.string(),
  description: z.string(),
  level: z.number().int().nonnegative(),
  parentId: z.string().optional(),
  childIds: z.array(z.string()),
  aliases: z.array(z.string()),
  entityIds: z.array(z.string()),
  sectionIds: z.array(z.string()),
  frequency: z.number().int().nonnegative(),
  documentCount: z.number().int().nonnegative(),
  embedding: z.array(z.number()).optional(),
});

export const ConceptEdgeSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  targetId: z.string(),
  type: z.enum([
    'is-a',
    'has-a',
    'related-to',
    'broader-than',
    'narrower-than',
    'prerequisite-for',
    'equivalent-to',
  ]),
  weight: z.number(),
  metadata: z.record(z.string(), z.unknown()),
});

export const ConceptGraphSchema = z.object({
  maxLevel: z.number().int().nonnegative(),
  totalConcepts: z.number().int().nonnegative(),
  rootConceptIds: z.array(z.string()),
  leafCount: z.number().int().nonnegative(),
  averageDepth: z.number().nonnegative(),
  maxChildren: z.number().int().nonnegative(),
  nodes: z.record(z.string(), ConceptNodeSchema),
  edges: z.record(z.string(), ConceptEdgeSchema),
  adjacency: z.record(z.string(), z.array(z.string())),
});
