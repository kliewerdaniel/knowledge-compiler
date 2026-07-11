import * as path from 'node:path';
import * as crypto from 'node:crypto';
import * as zlib from 'node:zlib';
import * as fsp from 'node:fs/promises';
import { ArtifactType, type ArtifactEntry, type Manifest, type ReaderOptions } from './types.js';
import { decodeEmbeddings } from './binary.js';

const ARTIFACT_FILE_NAMES: Record<string, string> = {
  [ArtifactType.Manifest]: 'manifest.json',
  [ArtifactType.KnowledgeGraph]: 'knowledge-graph.json',
  [ArtifactType.Embeddings]: 'embeddings.bin',
  [ArtifactType.SectionIndex]: 'section-index.json',
  [ArtifactType.ConceptIndex]: 'concept-index.json',
  [ArtifactType.ClusterIndex]: 'cluster-index.json',
  [ArtifactType.Navigation]: 'navigation.json',
  [ArtifactType.SearchIndex]: 'search-index.json',
  [ArtifactType.Statistics]: 'statistics.json',
};

function isGzipped(buffer: Buffer): boolean {
  return buffer.byteLength >= 2 && buffer[0] === 0x1f && buffer[1] === 0x8b;
}

function decompressIfNeeded(data: Buffer): Buffer {
  if (isGzipped(data)) {
    return zlib.gunzipSync(data);
  }
  return data;
}

export class ArtifactReader {
  private options: Required<ReaderOptions>;

  constructor(options: ReaderOptions) {
    this.options = {
      baseDir: options.baseDir,
    };
  }

  async readManifest(): Promise<Manifest> {
    return this.readArtifact<Manifest>(ARTIFACT_FILE_NAMES[ArtifactType.Manifest]!);
  }

  async readKnowledgeGraph(): Promise<any> {
    return this.readArtifact<any>(ARTIFACT_FILE_NAMES[ArtifactType.KnowledgeGraph]!);
  }

  async readEmbeddings(): Promise<Map<string, Float32Array>> {
    const filePath = path.join(this.options.baseDir, ARTIFACT_FILE_NAMES[ArtifactType.Embeddings]!);
    let data = await fsp.readFile(filePath);
    if (isGzipped(data)) {
      data = zlib.gunzipSync(data);
    }
    const result = decodeEmbeddings(data);
    return result.embeddings;
  }

  async readSectionIndex(): Promise<any[]> {
    const data = await this.readArtifact<any>(ARTIFACT_FILE_NAMES[ArtifactType.SectionIndex]!);
    return (data as { sections: any[] }).sections ?? [];
  }

  async readConceptIndex(): Promise<any[]> {
    const data = await this.readArtifact<any>(ARTIFACT_FILE_NAMES[ArtifactType.ConceptIndex]!);
    return (data as { concepts: any[] }).concepts ?? [];
  }

  async readClusterIndex(): Promise<any[]> {
    const data = await this.readArtifact<any>(ARTIFACT_FILE_NAMES[ArtifactType.ClusterIndex]!);
    return (data as { clusters: any[] }).clusters ?? [];
  }

  async readNavigation(): Promise<any> {
    return this.readArtifact<any>(ARTIFACT_FILE_NAMES[ArtifactType.Navigation]!);
  }

  async readStatistics(): Promise<any> {
    return this.readArtifact<any>(ARTIFACT_FILE_NAMES[ArtifactType.Statistics]!);
  }

  async readArtifact<T>(artifactPath: string): Promise<T> {
    const filePath = path.join(this.options.baseDir, artifactPath);
    let data = await fsp.readFile(filePath);

    if (isGzipped(data)) {
      data = zlib.gunzipSync(data);
    }

    const ext = path.extname(artifactPath).toLowerCase();
    if (ext === '.json') {
      return JSON.parse(data.toString('utf-8')) as T;
    }
    if (ext === '.bin') {
      return data as unknown as T;
    }
    return data as unknown as T;
  }

  async listArtifacts(): Promise<ArtifactEntry[]> {
    const manifest = await this.readManifest();
    return Object.values(manifest.artifacts);
  }

  async validateIntegrity(): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    let manifest: Manifest;

    try {
      manifest = await this.readManifest();
    } catch (err) {
      return {
        valid: false,
        errors: [`Failed to read manifest: ${(err as Error).message}`],
      };
    }

    for (const [artifactPath, entry] of Object.entries(manifest.artifacts)) {
      const fullPath = path.join(this.options.baseDir, entry.path);
      try {
        const data = await fsp.readFile(fullPath);
        const actualHash = crypto.createHash('sha256').update(data).digest('hex');
        if (actualHash !== entry.hash) {
          errors.push(
            `Hash mismatch for "${artifactPath}": expected ${entry.hash}, got ${actualHash}`
          );
        }
      } catch (err) {
        errors.push(`Failed to read "${artifactPath}": ${(err as Error).message}`);
      }
    }

    return { valid: errors.length === 0, errors };
  }
}
