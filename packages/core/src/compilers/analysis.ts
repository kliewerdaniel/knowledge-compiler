import type { PassResult, CompilerPass, PassDescriptor } from "@knowledge-compiler/plugins";

const ENTITY_PATTERNS: Array<{ type: string; pattern: RegExp; description: string }> = [
  { type: "PERSON", pattern: /(?:Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g, description: "Person name with title" },
  { type: "ORG", pattern: /\b(?:Inc\.|Ltd\.|Corp\.|LLC|Co\.)\s*[A-Z][\w\s&.,-]*\b/g, description: "Organization with suffix" },
  { type: "LOCATION", pattern: /\b(?:San Francisco|New York|London|Tokyo|Berlin|Paris|Sydney|Toronto|Singapore|Seattle|Austin|Boston|Chicago|Los Angeles|Miami)\b/g, description: "Known location" },
  { type: "DATE", pattern: /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/g, description: "Full date" },
  { type: "DATE", pattern: /\d{4}-\d{2}-\d{2}/g, description: "ISO date" },
  { type: "MONEY", pattern: /\$\s*\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g, description: "USD amount" },
  { type: "EMAIL", pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, description: "Email address" },
  { type: "URL", pattern: /https?:\/\/[^\s<>"'`]+/g, description: "URL" },
  { type: "PHONE", pattern: /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, description: "Phone number" },
  { type: "CODE", pattern: /\b[A-Z]{2,}(?:_[A-Z]{2,})+\b/g, description: "Constant identifier" },
];

function ps(ctx: any, key: string): any { return ctx.getPassState(key); }
function pss(ctx: any, key: string, val: any): void { ctx.setPassState(key, val); }

function extractPlainText(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (node.value && typeof node.value === "string") return node.value;
  if (node.children && Array.isArray(node.children)) return node.children.map((c: any) => extractPlainText(c)).join(" ");
  return "";
}

export class LinkExtractorPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "link-extractor", name: "Link Extractor", version: 1, phase: "ANALYSIS", dependencies: [], optionalDependencies: ["mdast-parser"], executionPolicy: { type: "perDocument" }, config: { enabled: true, priority: 0, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const mdastResults = ps(ctx, "mdastResults") ?? {};
      const linkData: Record<string, { internalLinks: any[]; externalLinks: any[]; brokenLinks: string[]; linkCount: number }> = {};
      const internalUrlPattern = /^[^/#]+\.md$/;

      for (const [filePath, doc] of (Object.entries(mdastResults) as any)) {
        const internalLinks: any[] = [];
        const externalLinks: any[] = [];
        const walk = (node: any): void => {
          if (!node) return;
          if (node.type === "link" || node.type === "Link") {
            const url = node.url ?? "";
            const text = node.children?.[0]?.value ?? "";
            const entry = { url, text, line: node.position?.start?.line ?? 0 };
            if (internalUrlPattern.test(url)) internalLinks.push(entry);
            else externalLinks.push(entry);
          }
          if (node.children && Array.isArray(node.children)) node.children.forEach((c: any) => walk(c));
        };
        walk(doc.ast);
        linkData[filePath] = { internalLinks, externalLinks, brokenLinks: [], linkCount: internalLinks.length + externalLinks.length };
      }

      pss(ctx, "linkData", linkData);
      const totalLinks = Object.values(linkData).reduce((s: number, d: any) => s + d.linkCount, 0);
      return { status: "success", data: { totalLinks, docsAnalyzed: Object.keys(linkData).length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Link extraction failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class EntityExtractorPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "entity-extractor", name: "Entity Extractor", version: 1, phase: "ANALYSIS", dependencies: [], optionalDependencies: ["mdast-parser"], executionPolicy: { type: "perDocument" }, config: { enabled: true, priority: 1, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const mdastResults = ps(ctx, "mdastResults") ?? {};
      const entityData: Record<string, { entities: Array<{ type: string; value: string; count: number; positions: number[] }>; entityCount: number }> = {};

      for (const [filePath, doc] of (Object.entries(mdastResults) as any)) {
        const content = doc.frontmatter?.content ?? doc.ast?.rawContent ?? doc.ast?.value ?? "";
        const allText = typeof content === "string" ? content : extractPlainText(doc.ast);
        const entityMap = new Map<string, { type: string; count: number; positions: number[] }>();

        for (const patternDef of ENTITY_PATTERNS) {
          const regex = new RegExp(patternDef.pattern.source, "g");
          let match: RegExpExecArray | null;
          while ((match = regex.exec(allText)) !== null) {
            const value = match[0].trim();
            const key = `${patternDef.type}:${value}`;
            const existing = entityMap.get(key);
            if (existing) { existing.count++; existing.positions.push(match.index); }
            else entityMap.set(key, { type: patternDef.type, count: 1, positions: [match.index] });
          }
        }

        const foundEntities: Array<{ type: string; value: string; count: number; positions: number[] }> = [];
        for (const [key, data] of entityMap) {
          if (data.count >= 1) { const parts = key.split(":", 2); foundEntities.push({ type: parts[0], value: parts[1], count: data.count, positions: data.positions }); }
        }
        foundEntities.sort((a, b) => b.count - a.count);
        entityData[filePath] = { entities: foundEntities, entityCount: foundEntities.length };
      }

      pss(ctx, "entityData", entityData);
      const totalEntities = Object.values(entityData).reduce((s: number, d: any) => s + d.entityCount, 0);
      return { status: "success", data: { totalEntities, docsAnalyzed: Object.keys(entityData).length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Entity extraction failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class KeywordExtractorPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "keyword-extractor", name: "Keyword Extractor (TF-IDF)", version: 1, phase: "ANALYSIS", dependencies: [], optionalDependencies: ["mdast-parser"], executionPolicy: { type: "perDocument" }, config: { enabled: true, priority: 2, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const mdastResults = ps(ctx, "mdastResults") ?? {};
      const keywords: Record<string, any[]> = {};
      const stopWords = new Set(["the","a","an","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","shall","can","need","to","of","in","for","on","with","at","by","from","as","into","through","during","before","after","above","below","between","out","off","over","under","again","further","then","once","here","there","when","where","why","how","all","each","every","both","few","more","most","other","some","such","no","nor","not","only","own","same","so","than","too","very","just","because","but","and","or","if","while","although","though","this","that","these","those","it","its"]);

      function tokenize(text: string): string[] {
        return text.toLowerCase().replace(/[^a-z0-9\s'-]/g, " ").split(/\s+/).filter((w: string) => w.length >= 3 && !stopWords.has(w));
      }

      const docTexts: Array<{ filePath: string; text: string }> = [];
      for (const [filePath, doc] of (Object.entries(mdastResults) as any)) {
        const content = doc.frontmatter?.content ?? doc.ast?.rawContent ?? doc.ast?.value ?? "";
        const text = typeof content === "string" ? content : extractPlainText(doc.ast);
        docTexts.push({ filePath, text });
      }

      const docFrequencies = new Map<string, number>();
      for (const { text } of docTexts) {
        const tokens = tokenize(text);
        const seen = new Set<string>();
        for (const token of tokens) {
          if (!seen.has(token)) { docFrequencies.set(token, (docFrequencies.get(token) ?? 0) + 1); seen.add(token); }
        }
      }

      const totalDocs = docTexts.length;
      for (const { filePath, text } of docTexts) {
        const termFreq = new Map<string, number>();
        const seen = new Set<string>();
        for (const token of tokenize(text)) {
          termFreq.set(token, (termFreq.get(token) ?? 0) + 1);
          if (!seen.has(token)) seen.add(token);
        }

        const maxKeywords = ctx.config.analysis.keywords.maxKeywordsPerSection;
        const scored: Array<{ keyword: string; score: number; tf: number; idf: number }> = [];
        const maxTF = Math.max(...termFreq.values(), 1);
        for (const [term, tf] of termFreq) {
          const df = docFrequencies.get(term) ?? 1;
          const idf = Math.log((totalDocs + 1) / (df + 1)) + 1;
          const tfNorm = tf / maxTF;
          scored.push({ keyword: term, score: tfNorm * idf, tf: tfNorm, idf });
        }
        scored.sort((a, b) => b.score - a.score);
        keywords[filePath] = scored.slice(0, maxKeywords);
      }

      pss(ctx, "keywordData", keywords);
      const totalKeywords = Object.values(keywords).reduce((s: number, d: any[]) => s + d.length, 0);
      return { status: "success", data: { totalKeywords, docsAnalyzed: docTexts.length }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Keyword extraction failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}

export class ConceptHierarchyPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "concept-hierarchy", name: "Concept Hierarchy Builder", version: 1, phase: "ANALYSIS", dependencies: ["entity-extractor", "keyword-extractor"], optionalDependencies: [], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 3, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };
  async initialize(_ctx: any): Promise<void> {}
  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const entityData = ps(ctx, "entityData") ?? {};
      const keywordData = ps(ctx, "keywordData") ?? {};
      const conceptMap = new Map<string, any>();
      let conceptIdCounter = 0;
      const generateId = (): string => `concept-${++conceptIdCounter}`;
      const typeGroups = new Map<string, Map<string, { count: number; docs: Set<string> }>>();

      for (const [filePath, data] of (Object.entries(entityData) as any)) {
        for (const entity of data.entities) {
          const group = typeGroups.get(entity.type) ?? new Map();
          const entry = group.get(entity.value) ?? { count: 0, docs: new Set<string>() };
          entry.count += entity.count;
          entry.docs.add(filePath);
          group.set(entity.value, entry);
          typeGroups.set(entity.type, group);
        }
      }

      for (const [type, values] of typeGroups) {
        const entries = Array.from(values.entries()).map(([label, data]) => ({ label, count: data.count, docCount: data.docs.size })).sort((a, b) => b.count - a.count);
        for (const { label, count, docCount } of entries) {
          const conceptId = generateId();
          const level = count >= 5 ? 0 : count >= 2 ? 1 : 2;
          conceptMap.set(conceptId, { label, entityType: type, frequency: count, documentCount: docCount, relatedConcepts: [], level, description: `Entity of type ${type}: ${label}`, sectionIds: Array.from((typeGroups.get(type)?.get(label)?.docs ?? new Set())), entityIds: [conceptId] });
        }
      }

      for (const [filePath, kws] of (Object.entries(keywordData) as any)) {
        for (const kw of kws.slice(0, 10)) {
          const conceptId = generateId();
          conceptMap.set(conceptId, { label: kw.keyword, entityType: "keyword", frequency: Math.round(kw.score * 100), documentCount: 1, relatedConcepts: [], level: 2, description: `Keyword from ${filePath}`, sectionIds: [filePath], entityIds: [conceptId] });
        }
      }

      const conceptsArray = Array.from(conceptMap.values());
      const rootConcepts = conceptsArray.filter((c: any) => c.level === 0).map((c: any) => c.label);
      const leafConcepts = conceptsArray.filter((c: any) => c.level === 2);

      const graph = { nodes: conceptsArray, edges: [], adjacency: new Map<string, string[]>(), maxLevel: Math.max(...conceptsArray.map((c: any) => c.level), 0), totalConcepts: conceptsArray.length, rootConceptIds: rootConcepts, leafCount: leafConcepts.length, averageDepth: conceptsArray.reduce((s: number, c: any) => s + c.level, 0) / Math.max(conceptsArray.length, 1), maxChildren: 0 };
      pss(ctx, "conceptHierarchy", graph);
      for (const [filePath] of (Object.entries(entityData) as any)) {
        ctx.getIRStore().setConceptGraph(filePath, graph);
      }
      return { status: "success", data: { conceptCount: conceptsArray.length, typeGroups: typeGroups.size }, errors: [], warnings: [], timing: { durationMs: Date.now() - startTime } };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Concept hierarchy failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }
  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}
