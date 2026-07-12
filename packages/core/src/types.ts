import type { CompilerConfig } from "@knowledge-compiler/config";
import type { PassID, CompilerPhase } from "@knowledge-compiler/plugins";
export type { PassID, CompilerPhase };

export type ErrorSeverity = "fatal" | "transient" | "degraded" | "warning";

export interface CompilerError {
  id: string;
  severity: ErrorSeverity;
  passId?: PassID;
  phase?: CompilerPhase;
  message: string;
  recoverable: boolean;
  retryCount: number;
  timestamp: number;
}

export interface CompilerResult {
  status: "success" | "partial" | "failed";
  errors: CompilerError[];
  warnings: string[];
  artifactsWritten: number;
  documentsProcessed: number;
  sectionsProcessed: number;
  conceptsProcessed: number;
  durationMs: number;
  phaseTiming: Record<CompilerPhase, number>;
  manifestPath?: string;
  outputDir: string;
}

export interface CompileOptions {
  config?: CompilerConfig;
  input?: string;
  output?: string;
  passes?: PassID[];
  skipPasses?: PassID[];
  debug?: string;
}

export interface IRStore {
  setDocument(id: string, ast: any): void;
  getDocument(id: string): any | undefined;
  getAllDocuments(): any[];
  getDocumentCount(): number;

  setDocumentMeta(filePath: string, meta: any): void;
  getDocumentMeta(filePath: string): any | undefined;
  getAllDocumentMeta(): Map<string, any>;

  setSectionGraph(docId: string, graph: any): void;
  getSectionGraph(docId: string): any | undefined;
  getAllSectionGraphs(): any[];
  getSectionCount(): number;

  setKnowledgeGraph(graph: any): void;
  getKnowledgeGraph(): any | null;

  setConceptGraph(docId: string, graph: any): void;
  getConceptGraph(docId: string): any | undefined;
  getAllConceptGraphs(): any[];

  setClusterGraph(docId: string, graph: any): void;
  getClusterGraph(docId: string): any | undefined;
  getAllClusterGraphs(): any[];

  setNavigationGraph(docId: string, graph: any): void;
  getNavigationGraph(docId: string): any | undefined;
  getAllNavigationGraphs(): any[];

  addEdge(edge: any): void;
  getEdge(id: string): any | undefined;
  getAllEdges(): any[];
  getEdgesByType(type: string): any[];
  getEdgesBySource(sourceId: string): any[];
  getEdgesByTarget(targetId: string): any[];

  setEmbedding(sectionId: string, values: Float32Array): void;
  getEmbedding(sectionId: string): Float32Array | undefined;
  getEmbeddingCount(): number;

  getStats(): {
    documentCount: number;
    sectionCount: number;
    conceptCount: number;
    edgeCount: number;
    embeddingCount: number;
  };

  transaction<T>(fn: (store: any) => T): T;
}

export interface CompilerContext {
  config: CompilerConfig;
  phase: CompilerPhase;
  phaseStartTime: Map<CompilerPhase, number>;
  errors: CompilerError[];
  warnings: string[];

  getPassState<T>(passId: PassID): T | undefined;
  setPassState<T>(passId: PassID, state: T): void;
  getPassStateMap(): Map<string, unknown>;

  addError(error: CompilerError): void;
  addWarning(message: string): void;

  getIRStore(): IRStore;

  isCheckpointAvailable(): boolean;
  loadCheckpoint(): Promise<void>;
  saveCheckpoint(): Promise<void>;
}

export class DefaultCompilerContext implements CompilerContext {
  config: CompilerConfig;
  phase: CompilerPhase = "INIT";
  phaseStartTime = new Map<CompilerPhase, number>();
  errors: CompilerError[] = [];
  warnings: string[] = [];
  private passState = new Map<string, unknown>();
  private irStore: IRStore;

  constructor(config: CompilerConfig, irStore?: IRStore) {
    this.config = config;
    this.irStore = irStore ?? new DefaultIRStore();
  }

  getPassState<T>(passId: PassID): T | undefined {
    return this.passState.get(passId) as T | undefined;
  }

  setPassState<T>(passId: PassID, state: T): void {
    this.passState.set(passId, state);
  }

  getPassStateMap(): Map<string, unknown> {
    return this.passState;
  }

  addError(error: CompilerError): void {
    this.errors.push(error);
  }

  addWarning(message: string): void {
    this.warnings.push(message);
  }

  getIRStore(): IRStore {
    return this.irStore;
  }

  isCheckpointAvailable(): boolean {
    return false;
  }

  async loadCheckpoint(): Promise<void> {}
  async saveCheckpoint(): Promise<void> {}
}

export class CompilerContextWithStore implements CompilerContext {
  config: CompilerConfig;
  phase: CompilerPhase = "INIT";
  phaseStartTime = new Map<CompilerPhase, number>();
  errors: CompilerError[] = [];
  warnings: string[] = [];
  private passState = new Map<string, unknown>();
  private irStore: IRStore;

  constructor(config: CompilerConfig, irStore: IRStore) {
    this.config = config;
    this.irStore = irStore;
  }

  getPassState<T>(passId: PassID): T | undefined {
    return this.passState.get(passId) as T | undefined;
  }

  setPassState<T>(passId: PassID, state: T): void {
    this.passState.set(passId, state);
  }

  getPassStateMap(): Map<string, unknown> {
    return this.passState;
  }

  addError(error: CompilerError): void {
    this.errors.push(error);
  }

  addWarning(message: string): void {
    this.warnings.push(message);
  }

  getIRStore(): IRStore {
    return this.irStore;
  }

  isCheckpointAvailable(): boolean {
    return false;
  }

  async loadCheckpoint(): Promise<void> {}
  async saveCheckpoint(): Promise<void> {}
}

export function generateErrorId(): string {
  return `err-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Minimal IRStore implementation for DefaultCompilerContext
class DefaultIRStore implements IRStore {
  private documents = new Map<string, any>();
  private sectionGraphs = new Map<string, any>();
  private knowledgeGraph: any = null;
  private conceptGraphs = new Map<string, any>();
  private clusterGraphs = new Map<string, any>();
  private navigationGraphs = new Map<string, any>();
  private edges: any[] = [];
  private embeddings = new Map<string, Float32Array>();
  private documentMeta = new Map<string, any>();

  setDocument(id: string, ast: any): void { this.documents.set(id, ast); }
  getDocument(id: string): any { return this.documents.get(id); }
  getAllDocuments(): any[] { return Array.from(this.documents.values()); }
  getDocumentCount(): number { return this.documents.size; }

  setDocumentMeta(filePath: string, meta: any): void { this.documentMeta.set(filePath, meta); }
  getDocumentMeta(filePath: string): any { return this.documentMeta.get(filePath); }
  getAllDocumentMeta(): Map<string, any> { return new Map(this.documentMeta); }

  setSectionGraph(docId: string, graph: any): void { this.sectionGraphs.set(docId, graph); }
  getSectionGraph(docId: string): any { return this.sectionGraphs.get(docId); }
  getAllSectionGraphs(): any[] { return Array.from(this.sectionGraphs.values()); }
  getSectionCount(): number {
    let count = 0;
    for (const graph of this.sectionGraphs.values()) {
      count += graph.totalSections ?? 0;
    }
    return count;
  }

  setKnowledgeGraph(graph: any): void { this.knowledgeGraph = graph; }
  getKnowledgeGraph(): any { return this.knowledgeGraph; }

  setConceptGraph(docId: string, graph: any): void { this.conceptGraphs.set(docId, graph); }
  getConceptGraph(docId: string): any { return this.conceptGraphs.get(docId); }
  getAllConceptGraphs(): any[] { return Array.from(this.conceptGraphs.values()); }

  setClusterGraph(docId: string, graph: any): void { this.clusterGraphs.set(docId, graph); }
  getClusterGraph(docId: string): any { return this.clusterGraphs.get(docId); }
  getAllClusterGraphs(): any[] { return Array.from(this.clusterGraphs.values()); }

  setNavigationGraph(docId: string, graph: any): void { this.navigationGraphs.set(docId, graph); }
  getNavigationGraph(docId: string): any { return this.navigationGraphs.get(docId); }
  getAllNavigationGraphs(): any[] { return Array.from(this.navigationGraphs.values()); }

  addEdge(edge: any): void { this.edges.push(edge); }
  getEdge(id: string): any { return this.edges.find((e) => e.id === id); }
  getAllEdges(): any[] { return [...this.edges]; }
  getEdgesByType(type: string): any[] { return this.edges.filter((e) => e.type === type); }
  getEdgesBySource(sourceId: string): any[] { return this.edges.filter((e) => e.sourceId === sourceId); }
  getEdgesByTarget(targetId: string): any[] { return this.edges.filter((e) => e.targetId === targetId); }

  setEmbedding(sectionId: string, values: Float32Array): void { this.embeddings.set(sectionId, values); }
  getEmbedding(sectionId: string): Float32Array | undefined { return this.embeddings.get(sectionId); }
  getEmbeddingCount(): number { return this.embeddings.size; }

  getStats(): { documentCount: number; sectionCount: number; conceptCount: number; edgeCount: number; embeddingCount: number } {
    let conceptCount = 0;
    for (const graph of this.conceptGraphs.values()) {
      conceptCount += graph.totalConcepts ?? 0;
    }
    return {
      documentCount: this.documents.size,
      sectionCount: this.getSectionCount(),
      conceptCount,
      edgeCount: this.edges.length,
      embeddingCount: this.embeddings.size,
    };
  }

  transaction<T>(fn: (store: any) => T): T {
    return fn(new MutableIRStore(this));
  }
}

export class MutableIRStore {
  private parent: IRStore;
  constructor(parent: IRStore) { this.parent = parent; }

  setDocument(id: string, ast: any): void { this.parent.setDocument(id, ast); }
  getDocument(id: string): any { return this.parent.getDocument(id); }
  getAllDocuments(): any[] { return this.parent.getAllDocuments(); }
  getDocumentCount(): number { return this.parent.getDocumentCount(); }

  setDocumentMeta(filePath: string, meta: any): void { this.parent.setDocumentMeta(filePath, meta); }
  getDocumentMeta(filePath: string): any { return this.parent.getDocumentMeta(filePath); }

  setSectionGraph(docId: string, graph: any): void { this.parent.setSectionGraph(docId, graph); }
  getSectionGraph(docId: string): any { return this.parent.getSectionGraph(docId); }

  setKnowledgeGraph(graph: any): void { this.parent.setKnowledgeGraph(graph); }
  getKnowledgeGraph(): any { return this.parent.getKnowledgeGraph(); }

  setConceptGraph(docId: string, graph: any): void { this.parent.setConceptGraph(docId, graph); }
  getConceptGraph(docId: string): any { return this.parent.getConceptGraph(docId); }

  setClusterGraph(docId: string, graph: any): void { this.parent.setClusterGraph(docId, graph); }
  getClusterGraph(docId: string): any { return this.parent.getClusterGraph(docId); }

  setNavigationGraph(docId: string, graph: any): void { this.parent.setNavigationGraph(docId, graph); }
  getNavigationGraph(docId: string): any { return this.parent.getNavigationGraph(docId); }

  addEdge(edge: any): void { this.parent.addEdge(edge); }
  getEdge(id: string): any { return this.parent.getEdge(id); }
  getAllEdges(): any[] { return this.parent.getAllEdges(); }
  getEdgesByType(type: string): any[] { return this.parent.getEdgesByType(type); }
  getEdgesBySource(sourceId: string): any[] { return this.parent.getEdgesBySource(sourceId); }
  getEdgesByTarget(targetId: string): any[] { return this.parent.getEdgesByTarget(targetId); }

  setEmbedding(sectionId: string, values: Float32Array): void { this.parent.setEmbedding(sectionId, values); }
  getEmbedding(sectionId: string): Float32Array | undefined { return this.parent.getEmbedding(sectionId); }
  getEmbeddingCount(): number { return this.parent.getEmbeddingCount(); }

  getStats(): { documentCount: number; sectionCount: number; conceptCount: number; edgeCount: number; embeddingCount: number } {
    return this.parent.getStats();
  }
}
