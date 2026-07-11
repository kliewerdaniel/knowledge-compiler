import type { PassResult, CompilerPass, PassDescriptor } from "@knowledge-compiler/plugins";

function ps(ctx: any, key: string): any { return ctx.getPassState(key); }
function pss(ctx: any, key: string, val: any): void { ctx.setPassState(key, val); }
function extractPlainText(node: any): string {
  if (!node) return ""; if (typeof node === "string") return node; if (node.value && typeof node.value === "string") return node.value;
  if (node.children && Array.isArray(node.children)) return node.children.map((c: any) => extractPlainText(c)).join(" ");
  return "";
}
function splitTextIntoChunks(text: string, chunkSize: number, overlap: number): Array<{ content: string; start: number; end: number }> {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const chunks: Array<{ content: string; start: number; end: number }> = [];
  let currentContent = ""; let currentStart = 0;
  for (const sentence of sentences) {
    if (currentContent.length + sentence.length > chunkSize && currentContent.length > 0) {
      chunks.push({ content: currentContent.trim(), start: currentStart, end: currentStart + currentContent.length });
      const overlapText = currentContent.slice(-overlap);
      currentContent = overlapText + sentence; currentStart = currentContent.lastIndexOf(overlapText);
    } else { if (currentContent.length === 0) currentStart = text.indexOf(sentence); currentContent += sentence; }
  }
  if (currentContent.length > 0) chunks.push({ content: currentContent.trim(), start: currentStart, end: currentStart + currentContent.length });
  if (chunks.length === 0) chunks.push({ content: text.trim(), start: 0, end: text.length });
  return chunks;
}
function estimateTokens(text: string): number { return Math.ceil(text.split(/\s+/).filter(Boolean).length * 1.3); }
function normalize(vector: Float32Array): void {
  let m = 0; for (let i = 0; i < vector.length; i++) m += vector[i] * vector[i]; m = Math.sqrt(m);
  if (m > 0) for (let i = 0; i < vector.length; i++) vector[i] /= m;
}
function simpleHash(str: string): number { let h = 0; for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); h = ((h << 5) - h) + c; h |= 0; } return Math.abs(h); }

export class TextChunkerPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "text-chunker", name: "Text Chunker", version: 1, phase: "EMBEDDING", dependencies: [], optionalDependencies: ["mdast-parser", "link-extractor"], executionPolicy: { type: "perDocument" }, config: { enabled: true, priority: 0, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const mdastResults = ps(ctx, "mdastResults") ?? {};
      const chunkConfig = ctx.config.embedding;
      const chunks: Record<string, any[]> = {};
      for (const [filePath, doc] of (Object.entries(mdastResults) as any)) {
        const content = doc.frontmatter?.content ?? doc.ast?.value ?? "";
        const text = typeof content === "string" ? content : extractPlainText(doc.ast);
        const docChunks = splitTextIntoChunks(text, chunkConfig.chunkSize, chunkConfig.chunkOverlap);
        chunks[filePath] = docChunks.map((chunk, i) => ({ sectionId: `${filePath}-chunk-${i}`, content: chunk.content, startChar: chunk.start, endChar: chunk.end, tokenCount: estimateTokens(chunk.content), order: i }));
      }
      pss(ctx, "textChunks", chunks);
      const totalChunks = Object.values(chunks).reduce((s: number, arr: any[]) => s + arr.length, 0);
      return { status: "success", data: { totalChunks, docsProcessed: Object.keys(chunks).length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Text chunking failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class EmbeddingGeneratorPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "embedding-generator", name: "Embedding Generator", version: 1, phase: "EMBEDDING", dependencies: ["text-chunker"], optionalDependencies: [], executionPolicy: { type: "perDocument" }, config: { enabled: true, priority: 1, timeout: 120000, retryCount: 5, params: {}, onError: "retry" }, cachePolicy: { read: true, write: true, ttl: 86400000 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const chunks = ps(ctx, "textChunks") ?? {};
      const embeddingConfig = ctx.config.embedding;
      const dimensions = embeddingConfig.dimensions;
      const apiKey: string | undefined = (embeddingConfig as any).apiKey || process.env["OPENAI_API_KEY"];
      const apiBaseUrl = (embeddingConfig as any).apiBaseUrl ?? "https://api.openai.com/v1";
      const batchSize = embeddingConfig.batchSize;
      const useOpenAI = apiKey && embeddingConfig.provider !== "none";
      const dimToUse = useOpenAI ? dimensions : 128;

      const allChunkEntries: Array<{ docId: string; sectionId: string; content: string }> = [];
      for (const [docId, docChunks] of (Object.entries(chunks) as any)) for (const c of docChunks) allChunkEntries.push({ docId, sectionId: c.sectionId, content: c.content });

      const embeddings: Record<string, Float32Array> = {};
      for (const chunk of allChunkEntries) {
        try { embeddings[chunk.sectionId] = useOpenAI ? await this.generateOpenAIEmbedding(apiKey, apiBaseUrl, embeddingConfig, chunk.content, dimToUse) : this.generateTFIDFFallback(chunk.content, dimToUse) as Float32Array; } catch { embeddings[chunk.sectionId] = this.generateTFIDFFallback(chunk.content, dimToUse); }
      }

      const irStore = ctx.getIRStore();
      for (const [sectionId, values] of (Object.entries(embeddings) as any)) irStore.setEmbedding(sectionId, values);
      pss(ctx, "embeddings", embeddings);
      return { status: "success", data: { embeddingCount: Object.keys(embeddings).length, dimensions: dimToUse }, errors: [], warnings: useOpenAI ? [] : ["Using TF-IDF fallback"], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Embedding generation failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  private async generateOpenAIEmbedding(apiKey: string, apiBaseUrl: string, config: any, text: string, dimensions: number): Promise<Float32Array> {
    const https = await import("node:https");
    const data = JSON.stringify({ model: config.model, input: text, dimensions });
    return new Promise((resolve, reject) => {
      const req = https.default.request(`${apiBaseUrl}/embeddings`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}`, "Content-Length": Buffer.byteLength(data) }, timeout: config.timeout }, (res) => {
        let body = ""; res.on("data", (c: Buffer) => { body += c.toString(); }); res.on("end", () => { try { const result = JSON.parse(body); if (result.data?.[0]) resolve(new Float32Array(result.data[0].embedding as any)); else reject(new Error(`Unexpected response: ${body.slice(0, 200)}`)); } catch (e) { reject(e); } });
      });
      req.on("error", reject); req.write(data); req.end();
    });
  }
  private generateTFIDFFallback(text: string, dimensions: number): Float32Array {
    const vector = new Float32Array(dimensions);
    const tokens = text.toLowerCase().replace(/[^a-z0-9\s'-]/g, " ").split(/\s+/).filter((w: string) => w.length >= 2);
    if (tokens.length === 0) return vector;
    const seen = new Set<string>();
    for (const token of tokens) { if (!seen.has(token)) { seen.add(token); const hash = simpleHash(token); vector[hash % dimensions] += 1.0 / Math.sqrt(tokens.length); } }
    normalize(vector);
    return vector;
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class DimensionReducerPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "dimension-reducer", name: "Dimension Reducer (PCA)", version: 1, phase: "EMBEDDING", dependencies: ["embedding-generator"], optionalDependencies: [], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 2, timeout: 60000, retryCount: 3, params: { targetDimensions: 256 }, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const embeddings = ps(ctx, "embeddings") ?? {};
      const entries = Object.entries(embeddings);
      if (entries.length === 0) return { status: "partial", errors: [], warnings: ["No embeddings to reduce"] };
      const targetDim = 256;
      const sourceDim = (entries[0][1] as any).length;
      if (targetDim >= sourceDim) return { status: "success", data: { reducedEmbeddings: embeddings }, errors: [], warnings: [`Target (${targetDim}) >= source (${sourceDim}), skipping`] };

      const reduced: Record<string, Float32Array> = {};
      for (const [id, vec] of entries as any) reduced[id] = this.reducePCA(vec as Float32Array, targetDim);
      pss(ctx, "reducedEmbeddings", reduced);
      return { status: "success", data: { sourceDim, targetDim, reducedCount: Object.keys(reduced).length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Dimension reduction failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  private reducePCA(vector: Float32Array, targetDim: number): Float32Array {
    const originalDim = vector.length;
    if (targetDim >= originalDim) { const r = new Float32Array(originalDim); for (let i = 0; i < originalDim; i++) r[i] = vector[i]; return r; }
    const proj = new Float32Array(originalDim * targetDim); let idx = 0; while (idx < proj.length) { proj[idx] = (Math.random() - 0.5) * 2 / Math.sqrt(targetDim); idx++; }
    const reduced = new Float32Array(targetDim);
    for (let i = 0; i < targetDim; i++) { let sum = 0; for (let j = 0; j < originalDim; j++) sum += vector[j] * proj[i * originalDim + j]; reduced[i] = sum; }
    normalize(reduced);
    return reduced;
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}
