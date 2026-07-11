import { z } from 'zod';
import type {
  UUID,
  IRNode,
  IREdge,
  IRGraph,
  SourcePosition,
  ContentHash,
} from './types.js';

export type DocNodeType =
  | 'Document'
  | 'Heading'
  | 'Paragraph'
  | 'CodeBlock'
  | 'List'
  | 'ListItem'
  | 'Table'
  | 'TableRow'
  | 'TableCell'
  | 'Blockquote'
  | 'ThematicBreak'
  | 'InlineMath'
  | 'BlockMath'
  | 'InlineCode'
  | 'Link'
  | 'Image'
  | 'Emphasis'
  | 'Strong'
  | 'Strikethrough'
  | 'Text'
  | 'SoftBreak'
  | 'HardBreak'
  | 'HtmlInline'
  | 'FootnoteReference'
  | 'DefinitionList'
  | 'TaskItem';

export interface HeadingMetadata extends Record<string, unknown> {
  level: number;
  id?: string;
  anchor?: string;
}

export interface CodeBlockMetadata extends Record<string, unknown> {
  language?: string;
  meta?: string;
  content: string;
}

export interface LinkMetadata extends Record<string, unknown> {
  url: string;
  title?: string;
  isInternal: boolean;
}

export interface ImageMetadata extends Record<string, unknown> {
  url: string;
  title?: string;
  alt?: string;
}

export interface TableMetadata extends Record<string, unknown> {
  columnCount: number;
  rowCount: number;
  alignments?: Array<'left' | 'center' | 'right' | null>;
}

export interface ListMetadata extends Record<string, unknown> {
  ordered: boolean;
  start?: number;
  tight: boolean;
}

export interface TaskItemMetadata extends Record<string, unknown> {
  checked: boolean;
}

export interface DefinitionListMetadata extends Record<string, unknown> {
  compact: boolean;
}

export type DocNodeMetadata =
  | HeadingMetadata
  | CodeBlockMetadata
  | LinkMetadata
  | ImageMetadata
  | TableMetadata
  | ListMetadata
  | TaskItemMetadata
  | DefinitionListMetadata
  | Record<string, unknown>;

export interface DocNode extends Omit<IRNode, 'type' | 'metadata'> {
  type: DocNodeType;
  position: SourcePosition;
  children: UUID[];
  parentId?: UUID;
  metadata: DocNodeMetadata;
}

export interface DocStatistics {
  totalNodes: number;
  totalHeadings: number;
  totalParagraphs: number;
  totalCodeBlocks: number;
  totalLists: number;
  totalTables: number;
  totalLinks: number;
  totalImages: number;
  totalMathBlocks: number;
  totalFootnotes: number;
  maxHeadingLevel: number;
  averageChildrenPerNode: number;
}

export interface DocAST extends IRGraph<DocNode> {
  sourcePath: string;
  sourceHash: ContentHash;
  rootNodeId: UUID;
  totalTokens: number;
  statistics: DocStatistics;
}

export const HeadingMetadataSchema = z.object({
  level: z.number().int().positive(),
  id: z.string().optional(),
  anchor: z.string().optional(),
});

export const CodeBlockMetadataSchema = z.object({
  language: z.string().optional(),
  meta: z.string().optional(),
  content: z.string(),
});

export const LinkMetadataSchema = z.object({
  url: z.string(),
  title: z.string().optional(),
  isInternal: z.boolean(),
});

export const ImageMetadataSchema = z.object({
  url: z.string(),
  title: z.string().optional(),
  alt: z.string().optional(),
});

export const TableMetadataSchema = z.object({
  columnCount: z.number().int().nonnegative(),
  rowCount: z.number().int().nonnegative(),
  alignments: z.array(z.union([z.literal('left'), z.literal('center'), z.literal('right'), z.null()])).optional(),
});

export const ListMetadataSchema = z.object({
  ordered: z.boolean(),
  start: z.number().int().optional(),
  tight: z.boolean(),
});

export const TaskItemMetadataSchema = z.object({
  checked: z.boolean(),
});

export const DefinitionListMetadataSchema = z.object({
  compact: z.boolean(),
});

export const DocNodeMetadataSchema = z.union([
  HeadingMetadataSchema,
  CodeBlockMetadataSchema,
  LinkMetadataSchema,
  ImageMetadataSchema,
  TableMetadataSchema,
  ListMetadataSchema,
  TaskItemMetadataSchema,
  DefinitionListMetadataSchema,
  z.record(z.string(), z.unknown()),
]);

export const DocStatisticsSchema = z.object({
  totalNodes: z.number().int().nonnegative(),
  totalHeadings: z.number().int().nonnegative(),
  totalParagraphs: z.number().int().nonnegative(),
  totalCodeBlocks: z.number().int().nonnegative(),
  totalLists: z.number().int().nonnegative(),
  totalTables: z.number().int().nonnegative(),
  totalLinks: z.number().int().nonnegative(),
  totalImages: z.number().int().nonnegative(),
  totalMathBlocks: z.number().int().nonnegative(),
  totalFootnotes: z.number().int().nonnegative(),
  maxHeadingLevel: z.number().int().nonnegative(),
  averageChildrenPerNode: z.number().nonnegative(),
});

export const DocASTSchema = z.object({
  sourcePath: z.string(),
  sourceHash: z.object({
    algorithm: z.string(),
    hash: z.string(),
  }),
  rootNodeId: z.string(),
  totalTokens: z.number().int().nonnegative(),
  statistics: DocStatisticsSchema,
  nodes: z.record(z.string(), z.any()),
  edges: z.record(z.string(), z.any()),
  adjacency: z.record(z.string(), z.array(z.string())),
});
