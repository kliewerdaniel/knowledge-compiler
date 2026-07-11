"use client";

import { create } from "zustand";

interface AppState {
  // Artifacts
  manifest: any | null;
  graph: any | null;
  sections: any[];
  concepts: any[];
  clusters: any[];
  embeddings: any[];
  statistics: any | null;
  searchEntries: any[];

  // UI state
  theme: "dark" | "light";
  sidebarOpen: boolean;
  selectedNode: string | null;
  hoveredNode: string | null;
  searchQuery: string;
  activePage: string;
  filters: {
    nodeTypes: string[];
    clusters: string[];
  };

  // Actions
  setManifest: (manifest: any) => void;
  setGraph: (graph: any) => void;
  setSections: (sections: any[]) => void;
  setConcepts: (concepts: any[]) => void;
  setClusters: (clusters: any[]) => void;
  setEmbeddings: (embeddings: any[]) => void;
  setStatistics: (statistics: any) => void;
  setSearchEntries: (entries: any[]) => void;
  setTheme: (theme: "dark" | "light") => void;
  toggleSidebar: () => void;
  setSelectedNode: (id: string | null) => void;
  setHoveredNode: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setActivePage: (page: string) => void;
  setFilterNodeTypes: (types: string[]) => void;
  setFilterClusters: (clusters: string[]) => void;
  toggleFilterNodeType: (type: string) => void;
  toggleFilterCluster: (clusterId: string) => void;
}

export const useStore = create<AppState>((set) => ({
  // Artifacts
  manifest: null,
  graph: null,
  sections: [],
  concepts: [],
  clusters: [],
  embeddings: [],
  statistics: null,
  searchEntries: [],

  // UI state
  theme: "dark",
  sidebarOpen: true,
  selectedNode: null,
  hoveredNode: null,
  searchQuery: "",
  activePage: "home",
  filters: {
    nodeTypes: [],
    clusters: [],
  },

  // Actions
  setManifest: (manifest) => set({ manifest }),
  setGraph: (graph) => set({ graph }),
  setSections: (sections) => set({ sections }),
  setConcepts: (concepts) => set({ concepts }),
  setClusters: (clusters) => set({ clusters }),
  setEmbeddings: (embeddings) => set({ embeddings }),
  setStatistics: (statistics) => set({ statistics }),
  setSearchEntries: (entries) => set({ searchEntries: entries }),
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSelectedNode: (id) => set({ selectedNode: id }),
  setHoveredNode: (id) => set({ hoveredNode: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActivePage: (page) => set({ activePage: page }),
  setFilterNodeTypes: (types) =>
    set((state) => ({ filters: { ...state.filters, nodeTypes: types } })),
  setFilterClusters: (clusters) =>
    set((state) => ({ filters: { ...state.filters, clusters } })),
  toggleFilterNodeType: (type) =>
    set((state) => ({
      filters: {
        ...state.filters,
        nodeTypes: state.filters.nodeTypes.includes(type)
          ? state.filters.nodeTypes.filter((t) => t !== type)
          : [...state.filters.nodeTypes, type],
      },
    })),
  toggleFilterCluster: (clusterId) =>
    set((state) => ({
      filters: {
        ...state.filters,
        clusters: state.filters.clusters.includes(clusterId)
          ? state.filters.clusters.filter((c) => c !== clusterId)
          : [...state.filters.clusters, clusterId],
      },
    })),
}));
