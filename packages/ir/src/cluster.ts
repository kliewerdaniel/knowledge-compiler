import { z } from 'zod';
import type {
  UUID,
  IRNode,
  IREdge,
  IRGraph,
} from './types.js';

export interface ClusterNode extends IRNode {
  clusterId: UUID;
  centroid: number[];
  memberIds: UUID[];
  topTerms: string[];
  representativeSection?: UUID;
  depth: number;
  parentClusterId?: UUID;
  childClusterIds: UUID[];
}

export interface ClusterGraph extends IRGraph<ClusterNode> {
  totalClusters: number;
  maxDepth: number;
  averageClusterSize: number;
  hierarchyRoots: UUID[];
}

export const ClusterNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  metadata: z.record(z.string(), z.unknown()),
  createdAt: z.number(),
  version: z.number(),
  clusterId: z.string(),
  centroid: z.array(z.number()),
  memberIds: z.array(z.string()),
  topTerms: z.array(z.string()),
  representativeSection: z.string().optional(),
  depth: z.number().int().nonnegative(),
  parentClusterId: z.string().optional(),
  childClusterIds: z.array(z.string()),
});

export const ClusterGraphSchema = z.object({
  totalClusters: z.number().int().nonnegative(),
  maxDepth: z.number().int().nonnegative(),
  averageClusterSize: z.number().nonnegative(),
  hierarchyRoots: z.array(z.string()),
  nodes: z.record(z.string(), ClusterNodeSchema),
  edges: z.record(z.string(), z.any()),
  adjacency: z.record(z.string(), z.array(z.string())),
});
