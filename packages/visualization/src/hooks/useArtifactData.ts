import { useState, useEffect, useCallback, useRef } from "react";
import { ArtifactReader } from "@knowledge-compiler/artifacts";
import type { VisualizationConfig } from "../types.js";
import { DEFAULT_CONFIG } from "../types.js";

export function useArtifactData(basePath: string) {
  const [graph, setGraph] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [concepts, setConcepts] = useState<any[]>([]);
  const [clusters, setClusters] = useState<any[]>([]);
  const [embeddings, setEmbeddings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const configRef = useRef<VisualizationConfig>(DEFAULT_CONFIG);
  const readerRef = useRef<ArtifactReader | null>(null);
  const abortRef = useRef(false);

  useEffect(() => {
    abortRef.current = false;
    setLoading(true);
    setError(null);

    const reader = new ArtifactReader({ baseDir: basePath });
    readerRef.current = reader;

    const loadAll = async () => {
      try {
        const manifest = await reader.readManifest();

        const artifactTasks = [
          reader.readKnowledgeGraph(),
          reader.readSectionIndex(),
          reader.readConceptIndex(),
          reader.readClusterIndex(),
          reader.readEmbeddings(),
        ] as Promise<any>[];

        const results = await Promise.allSettled(artifactTasks);

        if (!abortRef.current) {
          const knowledgeGraph =
            results[0].status === "fulfilled" ? results[0].value : null;
          const sectionIndex =
            results[1].status === "fulfilled" ? results[1].value : null;
          const conceptIndex =
            results[2].status === "fulfilled" ? results[2].value : null;
          const clusterIndex =
            results[3].status === "fulfilled" ? results[3].value : null;
          const embeddingData =
            results[4].status === "fulfilled" ? results[4].value : null;

          if (knowledgeGraph) {
            setGraph(knowledgeGraph);
          }
          if (sectionIndex) {
            setSections(sectionIndex.sections || []);
          }
          if (conceptIndex) {
            setConcepts(conceptIndex.concepts || []);
          }
          if (clusterIndex) {
            setClusters(clusterIndex.clusters || []);
          }
          if (embeddingData) {
            setEmbeddings(embeddingData.embeddings || []);
          }
        }
      } catch (err) {
        if (!abortRef.current) {
          setError(
            err instanceof Error ? err : new Error("Failed to load artifact data")
          );
        }
      } finally {
        if (!abortRef.current) {
          setLoading(false);
        }
      }
    };

    loadAll();

    return () => {
      abortRef.current = true;
    };
  }, [basePath]);

  const reload = useCallback(() => {
    if (readerRef.current) {
      const newReader = new ArtifactReader({ baseDir: basePath });
      readerRef.current = newReader;
      setGraph(null);
      setSections([]);
      setConcepts([]);
      setClusters([]);
      setEmbeddings([]);
      setLoading(true);
      setError(null);
      void newReader.readKnowledgeGraph().then(setGraph).catch((err) => {
        setError(err instanceof Error ? err : new Error("Failed to reload"));
        setLoading(false);
      });
    }
  }, [basePath]);

  return { graph, sections, concepts, clusters, embeddings, loading, error, reload };
}
