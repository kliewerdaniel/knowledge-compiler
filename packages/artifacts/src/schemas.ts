import { z } from 'zod';

export const ArtifactEntrySchema = z.object({
  path: z.string(),
  hash: z.string(),
  size: z.number().int().nonnegative(),
  contentType: z.string(),
});

export const ManifestSchema = z.object({
  version: z.number().int().positive(),
  generatedAt: z.string(),
  artifacts: z.record(z.string(), ArtifactEntrySchema),
});

export const KnowledgeGraphSchema = z.object({
  metadata: z.object({
    version: z.number().int().positive(),
    generatedAt: z.string(),
    sourceCount: z.number().int().nonnegative(),
    sectionCount: z.number().int().nonnegative(),
    conceptCount: z.number().int().nonnegative(),
    edgeCount: z.number().int().nonnegative(),
    sourceHash: z.string(),
  }),
  documents: z.array(z.record(z.string(), z.unknown())),
  sections: z.array(z.record(z.string(), z.unknown())),
  concepts: z.array(z.record(z.string(), z.unknown())),
  edges: z.array(z.record(z.string(), z.unknown())),
});

export const SectionIndexEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  headingPath: z.array(z.string()),
  docId: z.string(),
  summary: z.string().optional(),
  startOffset: z.number().int().nonnegative().optional(),
  endOffset: z.number().int().nonnegative().optional(),
  level: z.number().int().nonnegative().optional(),
  parentId: z.string().optional(),
  childIds: z.array(z.string()).optional(),
});

export const SectionIndexSchema = z.object({
  sections: z.array(SectionIndexEntrySchema),
});

export const ConceptIndexEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  frequency: z.number().int().nonnegative(),
  relatedConcepts: z.array(z.string()),
  aliases: z.array(z.string()).optional(),
  description: z.string().optional(),
  embeddingOffset: z.number().int().nonnegative().optional(),
});

export const ConceptIndexSchema = z.object({
  concepts: z.array(ConceptIndexEntrySchema),
});

export const ClusterIndexEntrySchema = z.object({
  id: z.string(),
  centroidOffset: z.number().int().nonnegative(),
  memberCount: z.number().int().nonnegative(),
  topTerms: z.array(z.string()),
  label: z.string().optional(),
  members: z.array(z.string()).optional(),
  silhouetteScore: z.number().optional(),
});

export const ClusterIndexSchema = z.object({
  clusters: z.array(ClusterIndexEntrySchema),
});

const NavigationEntrySchemaInner = z.object({
  id: z.string(),
  title: z.string(),
  path: z.string(),
  children: z.array(z.lazy(() => NavigationEntrySchemaInner)).optional(),
  depth: z.number().int().nonnegative().optional(),
  docId: z.string().optional(),
});

export const NavigationEntrySchema = NavigationEntrySchemaInner;

export const NavigationSchema = z.object({
  tree: z.array(NavigationEntrySchema),
  flat: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      path: z.string(),
      parentId: z.string().optional(),
      depth: z.number().int().nonnegative(),
    })
  ),
});

export const SearchIndexEntrySchema = z.object({
  id: z.string(),
  text: z.string(),
  docId: z.string(),
  sectionId: z.string().optional(),
  score: z.number().optional(),
  tokens: z.array(z.string()).optional(),
});

export const SearchIndexSchema = z.object({
  entries: z.array(SearchIndexEntrySchema),
  metadata: z.object({
    totalEntries: z.number().int().nonnegative(),
    avgEntryLength: z.number().nonnegative(),
    vocabularySize: z.number().int().nonnegative().optional(),
  }),
});

export const StatisticsSchema = z.object({
  generatedAt: z.string(),
  sourceCount: z.number().int().nonnegative(),
  documentCount: z.number().int().nonnegative(),
  sectionCount: z.number().int().nonnegative(),
  conceptCount: z.number().int().nonnegative(),
  edgeCount: z.number().int().nonnegative(),
  clusterCount: z.number().int().nonnegative().optional(),
  embeddingCount: z.number().int().nonnegative().optional(),
  embeddingDimensions: z.number().int().nonnegative().optional(),
  totalTokens: z.number().int().nonnegative().optional(),
  totalBytes: z.number().int().nonnegative().optional(),
  processingTimeMs: z.number().nonnegative().optional(),
  phaseTimings: z.record(z.string(), z.number().nonnegative()).optional(),
  memoryUsageMb: z.number().nonnegative().optional(),
});
