import { z } from 'zod';
import type {
  UUID,
  IRNode,
  IREdge,
  IRGraph,
  SourcePosition,
} from './types.js';

export interface SectionMetadata extends Record<string, unknown> {
  wordCount: number;
  tokenCount: number;
  codeBlockCount: number;
  linkCount: number;
  imageCount: number;
  containsMath: boolean;
  readingTimeMinutes: number;
  hasIntroduction: boolean;
  summary?: string;
}

export interface SectionNode extends Omit<IRNode, 'metadata'> {
  documentId: UUID;
  path: string[];
  title: string;
  depth: number;
  content: string;
  position: SourcePosition;
  headingAnchor?: string;
  parentSectionId?: UUID;
  childSectionIds: UUID[];
  headingNodeIds: UUID[];
  siblingOrder: number;
  metadata: SectionMetadata;
}

export interface SectionGraph extends IRGraph<SectionNode> {
  documentCount: number;
  totalSections: number;
  maxDepth: number;
}

export const SectionMetadataSchema = z.object({
  wordCount: z.number().int().nonnegative(),
  tokenCount: z.number().int().nonnegative(),
  codeBlockCount: z.number().int().nonnegative(),
  linkCount: z.number().int().nonnegative(),
  imageCount: z.number().int().nonnegative(),
  containsMath: z.boolean(),
  readingTimeMinutes: z.number().nonnegative(),
  hasIntroduction: z.boolean(),
  summary: z.string().optional(),
});

export const SectionNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  metadata: SectionMetadataSchema,
  createdAt: z.number(),
  version: z.number(),
  documentId: z.string(),
  path: z.array(z.string()),
  title: z.string(),
  depth: z.number().int().nonnegative(),
  content: z.string(),
  position: z.object({
    startLine: z.number().int().nonnegative(),
    endLine: z.number().int().nonnegative(),
    startCol: z.number().int().nonnegative(),
    endCol: z.number().int().nonnegative(),
  }),
  headingAnchor: z.string().optional(),
  parentSectionId: z.string().optional(),
  childSectionIds: z.array(z.string()),
  headingNodeIds: z.array(z.string()),
  siblingOrder: z.number().int().nonnegative(),
});

export const SectionGraphSchema = z.object({
  documentCount: z.number().int().nonnegative(),
  totalSections: z.number().int().nonnegative(),
  maxDepth: z.number().int().nonnegative(),
  nodes: z.record(z.string(), SectionNodeSchema),
  edges: z.record(z.string(), z.any()),
  adjacency: z.record(z.string(), z.array(z.string())),
});
