import { z } from 'zod';

export type UUID = string;
export type UnixMs = number;
export type NodeType = string;
export type EdgeType = string;

export interface IRNode {
  id: UUID;
  type: NodeType;
  metadata: Record<string, unknown>;
  createdAt: UnixMs;
  version: number;
}

export interface IREdge {
  id: UUID;
  sourceId: UUID;
  targetId: UUID;
  type: EdgeType;
  weight: number;
  metadata: Record<string, unknown>;
}

export interface IRGraph<T extends IRNode> {
  nodes: Map<UUID, T>;
  edges: Map<UUID, IREdge>;
  adjacency: Map<UUID, UUID[]>;
}

export interface SourcePosition {
  startLine: number;
  endLine: number;
  startCol: number;
  endCol: number;
}

export interface ContentHash {
  algorithm: string;
  hash: string;
}

export type DocumentID = UUID;
export type SectionID = UUID;
export type ConceptID = UUID;

export const SourcePositionSchema = z.object({
  startLine: z.number().int().nonnegative(),
  endLine: z.number().int().nonnegative(),
  startCol: z.number().int().nonnegative(),
  endCol: z.number().int().nonnegative(),
});

export const ContentHashSchema = z.object({
  algorithm: z.string(),
  hash: z.string(),
});

export const IRNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  metadata: z.record(z.string(), z.unknown()),
  createdAt: z.number(),
  version: z.number(),
});

export const IREdgeSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  targetId: z.string(),
  type: z.string(),
  weight: z.number(),
  metadata: z.record(z.string(), z.unknown()),
});

export function nodesToRecord<T extends IRNode>(map: Map<UUID, T>): Record<UUID, T> {
  const record: Record<string, T> = {};
  for (const [key, value] of map) {
    record[key] = value;
  }
  return record;
}

export function recordToNodes<T extends IRNode>(record: Record<UUID, T>): Map<UUID, T> {
  const map = new Map<UUID, T>();
  for (const [key, value] of Object.entries(record)) {
    map.set(key, value);
  }
  return map;
}

export function edgesToRecord(map: Map<UUID, IREdge>): Record<UUID, IREdge> {
  const record: Record<string, IREdge> = {};
  for (const [key, value] of map) {
    record[key] = value;
  }
  return record;
}

export function recordToEdges(record: Record<UUID, IREdge>): Map<UUID, IREdge> {
  const map = new Map<UUID, IREdge>();
  for (const [key, value] of Object.entries(record)) {
    map.set(key, value);
  }
  return map;
}

export function adjacencyToRecord(map: Map<UUID, UUID[]>): Record<UUID, UUID[]> {
  const record: Record<string, UUID[]> = {};
  for (const [key, value] of map) {
    record[key] = value;
  }
  return record;
}

export function recordToAdjacency(record: Record<UUID, UUID[]>): Map<UUID, UUID[]> {
  const map = new Map<UUID, UUID[]>();
  for (const [key, value] of Object.entries(record)) {
    map.set(key, value);
  }
  return map;
}
