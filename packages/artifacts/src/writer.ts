import * as path from 'node:path';
import * as crypto from 'node:crypto';
import * as zlib from 'node:zlib';
import * as fsp from 'node:fs/promises';
import { ArtifactType, type ArtifactEntry, type Manifest, type WriterOptions } from './types.js';
import { encodeEmbeddings } from './binary.js';

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

function getContentType(artifactType: ArtifactType): string {
  if (artifactType === ArtifactType.Embeddings) {
    return 'application/octet-stream';
  }
  return 'application/json';
}

function computeHash(data: Buffer): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export class ArtifactWriter {
  private options: Required<WriterOptions>;

  constructor(options: WriterOptions) {
    this.options = {
      outputDir: options.outputDir,
      compress: options.compress ?? false,
      prettyPrint: options.prettyPrint ?? true,
    };
  }

  async write(artifact: { type: ArtifactType; data: unknown }): Promise<ArtifactEntry> {
    const fileName = ARTIFACT_FILE_NAMES[artifact.type];
    if (!fileName) {
      throw new Error(`Unknown artifact type: ${artifact.type}`);
    }

    const filePath = path.join(this.options.outputDir, fileName);
    const contentType = getContentType(artifact.type);

    let dataBuffer: Buffer;
    if (artifact.type === ArtifactType.Embeddings) {
      if (!(artifact.data instanceof Map)) {
        throw new Error('Embeddings data must be a Map<string, Float32Array>');
      }
      dataBuffer = encodeEmbeddings(artifact.data as Map<string, Float32Array>);
    } else {
      const json = this.options.prettyPrint
        ? JSON.stringify(artifact.data, null, 2)
        : JSON.stringify(artifact.data);
      dataBuffer = Buffer.from(json, 'utf-8');
    }

    if (this.options.compress) {
      dataBuffer = zlib.gzipSync(dataBuffer);
    }

    await fsp.mkdir(path.dirname(filePath), { recursive: true });

    const tmpPath = filePath + '.tmp.' + crypto.randomUUID();
    await fsp.writeFile(tmpPath, dataBuffer);
    await fsp.rename(tmpPath, filePath);

    const hash = computeHash(dataBuffer);

    return {
      path: fileName,
      hash,
      size: dataBuffer.byteLength,
      contentType: getContentType(artifact.type),
    };
  }

  async writeManifest(entries: ArtifactEntry[]): Promise<ArtifactEntry> {
    const manifest: Manifest = {
      version: 1,
      generatedAt: new Date().toISOString(),
      artifacts: {},
    };
    for (const entry of entries) {
      manifest.artifacts[entry.path] = entry;
    }
    return this.write({ type: ArtifactType.Manifest, data: manifest });
  }

  async writeKnowledgeGraph(graph: any): Promise<ArtifactEntry> {
    return this.write({ type: ArtifactType.KnowledgeGraph, data: graph });
  }

  async writeEmbeddings(embeddings: Map<string, Float32Array>): Promise<ArtifactEntry> {
    return this.write({ type: ArtifactType.Embeddings, data: embeddings });
  }

  async writeSectionIndex(sections: any[]): Promise<ArtifactEntry> {
    return this.write({ type: ArtifactType.SectionIndex, data: { sections } });
  }

  async writeConceptIndex(concepts: any[]): Promise<ArtifactEntry> {
    return this.write({ type: ArtifactType.ConceptIndex, data: { concepts } });
  }

  async writeClusterIndex(clusters: any[]): Promise<ArtifactEntry> {
    return this.write({ type: ArtifactType.ClusterIndex, data: { clusters } });
  }

  async writeNavigation(nav: any): Promise<ArtifactEntry> {
    return this.write({ type: ArtifactType.Navigation, data: nav });
  }

  async writeStatistics(stats: any): Promise<ArtifactEntry> {
    return this.write({ type: ArtifactType.Statistics, data: stats });
  }
}
