const ARTIFACT_PATH = process.env.NEXT_PUBLIC_ARTIFACT_PATH || "/.knowledge/artifacts";

function artifactUrl(filename: string): string {
  return `${ARTIFACT_PATH}/${filename}`;
}

export async function loadManifest(basePath?: string): Promise<any> {
  const path = basePath || ARTIFACT_PATH;
  try {
    const res = await fetch(`${path}/manifest.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function loadGraph(basePath?: string): Promise<any> {
  const path = basePath || ARTIFACT_PATH;
  try {
    const res = await fetch(`${path}/knowledge-graph.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function loadSections(basePath?: string): Promise<any[]> {
  const path = basePath || ARTIFACT_PATH;
  try {
    const res = await fetch(`${path}/section-index.json`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.sections ?? [];
  } catch {
    return [];
  }
}

export async function loadConcepts(basePath?: string): Promise<any[]> {
  const path = basePath || ARTIFACT_PATH;
  try {
    const res = await fetch(`${path}/concept-index.json`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.concepts ?? [];
  } catch {
    return [];
  }
}

export async function loadClusters(basePath?: string): Promise<any[]> {
  const path = basePath || ARTIFACT_PATH;
  try {
    const res = await fetch(`${path}/cluster-index.json`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.clusters ?? [];
  } catch {
    return [];
  }
}

export async function loadEmbeddings(basePath?: string): Promise<any[]> {
  const path = basePath || ARTIFACT_PATH;
  try {
    const res = await fetch(`${path}/embeddings.json`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function loadStatistics(basePath?: string): Promise<any> {
  const path = basePath || ARTIFACT_PATH;
  try {
    const res = await fetch(`${path}/statistics.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function loadSearchIndex(basePath?: string): Promise<any> {
  const path = basePath || ARTIFACT_PATH;
  try {
    const res = await fetch(`${path}/search-index.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function loadNavigation(basePath?: string): Promise<any> {
  const path = basePath || ARTIFACT_PATH;
  try {
    const res = await fetch(`${path}/navigation.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export { ARTIFACT_PATH };
