import type { UUID, EdgeType, IREdge } from './types.js';

export class EdgeStore {
  private edges: Map<UUID, IREdge> = new Map();
  private byType: Map<EdgeType, Set<UUID>> = new Map();
  private bySource: Map<UUID, Set<UUID>> = new Map();
  private byTarget: Map<UUID, Set<UUID>> = new Map();
  private sourceAndType: Map<string, Set<UUID>> = new Map();

  add(edge: IREdge): void {
    this.edges.set(edge.id, edge);

    this.addToIndex(this.byType, edge.type, edge.id);
    this.addToIndex(this.bySource, edge.sourceId, edge.id);
    this.addToIndex(this.byTarget, edge.targetId, edge.id);

    const sourceTypeKey = `${edge.sourceId}:${edge.type}`;
    this.addToIndex(this.sourceAndType, sourceTypeKey, edge.id);
  }

  get(id: UUID): IREdge | undefined {
    return this.edges.get(id);
  }

  getByType(type: EdgeType): IREdge[] {
    return this.getFromIndex(this.byType, type);
  }

  getBySource(sourceId: UUID): IREdge[] {
    return this.getFromIndex(this.bySource, sourceId);
  }

  getByTarget(targetId: UUID): IREdge[] {
    return this.getFromIndex(this.byTarget, targetId);
  }

  getBySourceAndType(sourceId: UUID, type: EdgeType): IREdge[] {
    const key = `${sourceId}:${type}`;
    return this.getFromIndex(this.sourceAndType, key);
  }

  remove(id: UUID): boolean {
    const edge = this.edges.get(id);
    if (!edge) {
      return false;
    }

    this.edges.delete(id);
    this.removeFromIndex(this.byType, edge.type, id);
    this.removeFromIndex(this.bySource, edge.sourceId, id);
    this.removeFromIndex(this.byTarget, edge.targetId, id);

    const sourceTypeKey = `${edge.sourceId}:${edge.type}`;
    this.removeFromIndex(this.sourceAndType, sourceTypeKey, id);

    return true;
  }

  getAll(): IREdge[] {
    return Array.from(this.edges.values());
  }

  count(): number {
    return this.edges.size;
  }

  clear(): void {
    this.edges.clear();
    this.byType.clear();
    this.bySource.clear();
    this.byTarget.clear();
    this.sourceAndType.clear();
  }

  private addToIndex(index: Map<string, Set<UUID>>, key: string, id: UUID): void {
    let ids = index.get(key);
    if (!ids) {
      ids = new Set();
      index.set(key, ids);
    }
    ids.add(id);
  }

  private getFromIndex(index: Map<string, Set<UUID>>, key: string): IREdge[] {
    const ids = index.get(key);
    if (!ids) {
      return [];
    }
    const result: IREdge[] = [];
    for (const id of ids) {
      const edge = this.edges.get(id);
      if (edge) {
        result.push(edge);
      }
    }
    return result;
  }

  private removeFromIndex(index: Map<string, Set<UUID>>, key: string, id: UUID): void {
    const ids = index.get(key);
    if (ids) {
      ids.delete(id);
      if (ids.size === 0) {
        index.delete(key);
      }
    }
  }
}
