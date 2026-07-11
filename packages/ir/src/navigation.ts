import { z } from 'zod';
import type {
  UUID,
  IRNode,
  IREdge,
  IRGraph,
} from './types.js';

export interface NavigationNode extends IRNode {
  label: string;
  path: string[];
  depth: number;
  children: UUID[];
  parentId?: UUID;
  contentType: string;
}

export interface NavigationGraph extends IRGraph<NavigationNode> {
  totalItems: number;
  maxDepth: number;
  rootItemIds: UUID[];
  breadcrumbs: Record<UUID, string[]>;
}

export const NavigationNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  metadata: z.record(z.string(), z.unknown()),
  createdAt: z.number(),
  version: z.number(),
  label: z.string(),
  path: z.array(z.string()),
  depth: z.number().int().nonnegative(),
  children: z.array(z.string()),
  parentId: z.string().optional(),
  contentType: z.string(),
});

export const NavigationGraphSchema = z.object({
  totalItems: z.number().int().nonnegative(),
  maxDepth: z.number().int().nonnegative(),
  rootItemIds: z.array(z.string()),
  breadcrumbs: z.record(z.string(), z.array(z.string())),
  nodes: z.record(z.string(), NavigationNodeSchema),
  edges: z.record(z.string(), z.any()),
  adjacency: z.record(z.string(), z.array(z.string())),
});
