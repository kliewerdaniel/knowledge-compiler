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
        const content = doc.ast?.rawContent ?? doc.frontmatter?.content ?? extractPlainText(doc.ast);
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
        const content = doc.ast?.rawContent ?? doc.frontmatter?.content ?? extractPlainText(doc.ast);
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

interface HeadingConcept {
  id: string;
  label: string;
  depth: number;
  filePath: string;
  lineStart: number;
  lineEnd: number;
  parentId: string | null;
}

export class ConceptHierarchyPass implements CompilerPass {
  descriptor: PassDescriptor = { id: "concept-hierarchy", name: "Concept Hierarchy Builder", version: 2, phase: "ANALYSIS", dependencies: ["entity-extractor", "keyword-extractor"], optionalDependencies: ["mdast-parser"], executionPolicy: { type: "singleton" }, config: { enabled: true, priority: 3, timeout: 30000, retryCount: 3, params: {}, onError: "fail" }, cachePolicy: { read: false, write: false, ttl: 0 } };

  async initialize(_ctx: any): Promise<void> {}

  async execute(ctx: any): Promise<PassResult> {
    const startTime = Date.now();
    try {
      const mdastResults = ps(ctx, "mdastResults") ?? {};
      const entityData = ps(ctx, "entityData") ?? {};
      const keywordData = ps(ctx, "keywordData") ?? {};

      const allConcepts: any[] = [];
      const allEdges: Array<{ source: string; target: string; type: string; weight: number }> = [];
      const adjacencyMap = new Map<string, string[]>();
      let conceptIdCounter = 0;
      const generateId = (): string => `concept-${++conceptIdCounter}`;

      const docKeywords: Record<string, string[]> = {};
      for (const [fp, kws] of Object.entries(keywordData) as any) {
        docKeywords[fp] = (kws as any[]).slice(0, 10).map((k: any) => k.keyword);
      }

      for (const [filePath, doc] of Object.entries(mdastResults) as any) {
        const ast = doc.ast;
        const fm = doc.frontmatter ?? {};
        const docTitle: string = fm.title
          || (ast?.children?.[0]?.children?.[0]?.value)
          || filePath.split("/").pop()?.replace(/\.md$/, "")
          || "Untitled";

        const rawContent: string = ast?.rawContent ?? "";
        const lines = rawContent.split("\n");

        // Extract headings from MDAST with their positions
        const headings: Array<{ label: string; depth: number; line: number }> = [];
        const walkHeadings = (node: any): void => {
          if (!node) return;
          if (node.type === "heading") {
            const label = node.children?.map((c: any) => c.value ?? "").join("").trim() || "";
            if (label) {
              headings.push({ label, depth: node.depth, line: node.position?.start?.line ?? 0 });
            }
          }
          if (node.children && Array.isArray(node.children)) {
            node.children.forEach((c: any) => walkHeadings(c));
          }
        };
        walkHeadings(ast);

        // Build tree from headings using stack
        const headingConcepts: HeadingConcept[] = [];
        const stack: Array<{ depth: number; id: string }> = [];

        const rootId = generateId();
        headingConcepts.push({
          id: rootId,
          label: docTitle,
          depth: 0,
          filePath,
          lineStart: headings.length > 0 ? headings[0].line : 1,
          lineEnd: lines.length,
          parentId: null,
        });
        stack.push({ depth: 0, id: rootId });

        for (const h of headings) {
          const id = generateId();
          while (stack.length > 0 && stack[stack.length - 1].depth >= h.depth) {
            stack.pop();
          }
          const parentId = stack.length > 0 ? stack[stack.length - 1].id : rootId;
          headingConcepts.push({
            id,
            label: h.label,
            depth: h.depth,
            filePath,
            lineStart: h.line,
            lineEnd: lines.length,
            parentId,
          });
          stack.push({ depth: h.depth, id });
        }

        // Assign lineEnd for each heading
        for (let i = 0; i < headingConcepts.length; i++) {
          const hc = headingConcepts[i];
          if (hc.depth === 0) continue;
          let nextLine = lines.length;
          for (let j = i + 1; j < headingConcepts.length; j++) {
            if (headingConcepts[j].depth <= hc.depth) {
              nextLine = headingConcepts[j].lineStart;
              break;
            }
          }
          hc.lineEnd = nextLine;
        }

        // Build entity refs with line numbers
        const docEntities: Array<{ type: string; value: string; line: number }> = [];
        const ed = entityData[filePath];
        if (ed) {
          for (const entity of ed.entities) {
            for (const pos of entity.positions) {
              const line = rawContent.slice(0, pos).split("\n").length;
              docEntities.push({ type: entity.type, value: entity.value, line });
            }
          }
        }
        const kw = docKeywords[filePath] ?? [];

        // Create concept nodes and edges for each heading
        for (const hc of headingConcepts) {
          const sectionEntities = docEntities.filter(
            (e) => e.line >= hc.lineStart && e.line <= hc.lineEnd
          );
          const entityCount = sectionEntities.length;
          const uniqueEntityTypes = new Set(sectionEntities.map((e) => e.type)).size;

          const concept = {
            id: hc.id,
            label: hc.label,
            entityType: "heading",
            frequency: Math.max(1, entityCount),
            documentCount: 1,
            relatedConcepts: [],
            level: hc.depth,
            description: `Section: ${hc.label} (from ${filePath})`,
            sectionIds: [filePath],
            entityIds: sectionEntities.map((e) => `${e.type}:${e.value}`),
            sourceFile: filePath,
            sourceLine: hc.lineStart,
            entityCount,
            uniqueEntityTypes,
          };
          allConcepts.push(concept);

          if (hc.parentId) {
            allEdges.push({ source: hc.parentId, target: hc.id, type: "is-a", weight: 0.8 });
            const srcAdj = adjacencyMap.get(hc.parentId) ?? [];
            srcAdj.push(hc.id);
            adjacencyMap.set(hc.parentId, srcAdj);
            const tgtAdj = adjacencyMap.get(hc.id) ?? [];
            tgtAdj.push(hc.parentId);
            adjacencyMap.set(hc.id, tgtAdj);
          }

          for (const keyword of kw.slice(0, 5)) {
            const kwConceptId = generateId();
            allConcepts.push({
              id: kwConceptId,
              label: keyword,
              entityType: "keyword",
              frequency: 1,
              documentCount: 1,
              relatedConcepts: [],
              level: hc.depth + 1,
              description: `Keyword under ${hc.label}`,
              sectionIds: [filePath],
              entityIds: [],
              sourceFile: filePath,
              sourceLine: hc.lineStart,
              entityCount: 0,
              uniqueEntityTypes: 0,
            });
            allEdges.push({ source: hc.id, target: kwConceptId, type: "contains", weight: 0.5 });
            const srcAdj = adjacencyMap.get(hc.id) ?? [];
            srcAdj.push(kwConceptId);
            adjacencyMap.set(hc.id, srcAdj);
            const tgtAdj = adjacencyMap.get(kwConceptId) ?? [];
            tgtAdj.push(hc.id);
            adjacencyMap.set(kwConceptId, tgtAdj);
          }
        }
      }

      // Cross-document entity concepts
      const crossDocEntities = new Map<string, { type: string; count: number; docs: Set<string> }>();
      for (const [fp, ed] of Object.entries(entityData) as any) {
        for (const entity of ed.entities) {
          const key = `${entity.type}:${entity.value}`;
          const existing = crossDocEntities.get(key) ?? { type: entity.type, count: 0, docs: new Set<string>() };
          existing.count += entity.count;
          existing.docs.add(fp);
          crossDocEntities.set(key, existing);
        }
      }
      for (const [key, data] of crossDocEntities) {
        if (data.docs.size < 2) continue;
        const [type, ...labelParts] = key.split(":");
        const label = labelParts.join(":");
        const existing = allConcepts.find(
          (c) => c.label === label && c.entityType === `entity:${type}`
        );
        if (!existing) {
          const conceptId = generateId();
          allConcepts.push({
            id: conceptId,
            label,
            entityType: `entity:${type}`,
            frequency: data.count,
            documentCount: data.docs.size,
            relatedConcepts: [],
            level: 1,
            description: `Cross-document entity: ${label}`,
            sectionIds: Array.from(data.docs),
            entityIds: [key],
            sourceFile: Array.from(data.docs)[0],
            sourceLine: 0,
            entityCount: data.count,
            uniqueEntityTypes: 1,
          });
        }
      }

      const totalConcepts = allConcepts.length;
      const rootConcepts = allConcepts.filter((c: any) => c.level === 0).map((c: any) => c.id);
      const maxLevel = Math.max(...allConcepts.map((c: any) => c.level), 0);
      const averageDepth = totalConcepts > 0
        ? allConcepts.reduce((s: number, c: any) => s + c.level, 0) / totalConcepts
        : 0;

      const graph = {
        nodes: allConcepts,
        edges: allEdges,
        adjacency: adjacencyMap,
        maxLevel,
        totalConcepts,
        rootConceptIds: rootConcepts,
        leafCount: allConcepts.filter((c: any) => c.level >= 2).length,
        averageDepth,
        maxChildren: 0,
      };

      pss(ctx, "conceptHierarchy", graph);

      return {
        status: "success",
        data: { conceptCount: totalConcepts, edgeCount: allEdges.length },
        errors: [],
        warnings: [],
        timing: { durationMs: Date.now() - startTime },
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return { status: "failed", errors: [`Concept hierarchy failed: ${error.message}`], warnings: [], timing: { durationMs: Date.now() - startTime } };
    }
  }

  async finalize(_ctx: any): Promise<void> {}
  async validate(_ctx: any): Promise<PassResult> { return { status: "success", errors: [], warnings: [] }; }
  cacheKey(_ctx: any): string | null { return null; }
}
