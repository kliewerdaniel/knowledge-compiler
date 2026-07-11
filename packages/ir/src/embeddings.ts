import type { UUID } from './types.js';

export interface EmbeddingVector {
  model: string;
  dimensions: number;
  values: Float32Array;
}

export interface SerializedEmbeddingVector {
  model: string;
  dimensions: number;
  values: number[];
}

export interface SerializedEmbeddingStore {
  data: Record<UUID, SerializedEmbeddingVector>;
}

export class EmbeddingStore {
  private vectors: Map<UUID, EmbeddingVector> = new Map();

  set(sectionId: UUID, vector: EmbeddingVector): void {
    this.vectors.set(sectionId, vector);
  }

  get(sectionId: UUID): EmbeddingVector | undefined {
    return this.vectors.get(sectionId);
  }

  getAll(): Map<UUID, EmbeddingVector> {
    return new Map(this.vectors);
  }

  similarity(a: UUID, b: UUID): number {
    const vecA = this.vectors.get(a);
    const vecB = this.vectors.get(b);

    if (!vecA || !vecB) {
      throw new Error(`Embedding not found for one or both UUIDs: ${a}, ${b}`);
    }

    if (vecA.dimensions !== vecB.dimensions) {
      throw new Error(
        `Dimension mismatch: ${vecA.dimensions} vs ${vecB.dimensions}`,
      );
    }

    return cosineSimilarity(vecA.values, vecB.values);
  }

  findSimilar(
    vector: EmbeddingVector,
    topK: number,
  ): Array<{ id: UUID; similarity: number }> {
    const scored: Array<{ id: UUID; similarity: number }> = [];

    for (const [id, existing] of this.vectors) {
      if (existing.dimensions !== vector.dimensions) {
        continue;
      }
      const sim = cosineSimilarity(existing.values, vector.values);
      scored.push({ id, similarity: sim });
    }

    scored.sort((a, b) => b.similarity - a.similarity);
    return scored.slice(0, topK);
  }

  toJSON(): SerializedEmbeddingStore {
    const data: Record<UUID, SerializedEmbeddingVector> = {};
    for (const [id, vector] of this.vectors) {
      data[id] = {
        model: vector.model,
        dimensions: vector.dimensions,
        values: Array.from(vector.values),
      };
    }
    return { data };
  }

  static fromJSON(serialized: SerializedEmbeddingStore): EmbeddingStore {
    const store = new EmbeddingStore();
    for (const [id, vec] of Object.entries(serialized.data)) {
      store.set(id, {
        model: vec.model,
        dimensions: vec.dimensions,
        values: new Float32Array(vec.values),
      });
    }
    return store;
  }

  count(): number {
    return this.vectors.size;
  }

  clear(): void {
    this.vectors.clear();
  }
}

function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  const len = a.length;
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < len; i++) {
    const ai = a[i] ?? 0;
    const bi = b[i] ?? 0;
    dotProduct += ai * bi;
    magA += ai * ai;
    magB += bi * bi;
  }

  const magnitude = Math.sqrt(magA) * Math.sqrt(magB);
  if (magnitude === 0) {
    return 0;
  }
  return dotProduct / magnitude;
}
