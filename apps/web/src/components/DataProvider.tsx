"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import {
  loadManifest,
  loadGraph,
  loadSections,
  loadConcepts,
  loadClusters,
  loadEmbeddings,
  loadStatistics,
  loadSearchIndex,
} from "@/lib/artifact-loader";

export function DataProvider({ children }: { children: React.ReactNode }) {
  const setManifest = useStore((s) => s.setManifest);
  const setGraph = useStore((s) => s.setGraph);
  const setSections = useStore((s) => s.setSections);
  const setConcepts = useStore((s) => s.setConcepts);
  const setClusters = useStore((s) => s.setClusters);
  const setEmbeddings = useStore((s) => s.setEmbeddings);
  const setStatistics = useStore((s) => s.setStatistics);
  const setSearchEntries = useStore((s) => s.setSearchEntries);

  useEffect(() => {
    async function loadAll() {
      try {
        const manifest = await loadManifest();
        setManifest(manifest);
      } catch {}

      try {
        const sections = await loadSections();
        setSections(sections);
      } catch {}

      try {
        const concepts = await loadConcepts();
        setConcepts(concepts);
      } catch {}

      try {
        const clusters = await loadClusters();
        setClusters(clusters);
      } catch {}

      try {
        const graph = await loadGraph();
        setGraph(graph);
      } catch {}

      try {
        const statistics = await loadStatistics();
        setStatistics(statistics);
      } catch {}

      try {
        const searchIndex = await loadSearchIndex();
        if (searchIndex?.entries) {
          setSearchEntries(searchIndex.entries);
        }
      } catch {}

      try {
        const embeddings = await loadEmbeddings();
        setEmbeddings(embeddings);
      } catch {}
    }
    loadAll();
  }, []);

  return <>{children}</>;
}
