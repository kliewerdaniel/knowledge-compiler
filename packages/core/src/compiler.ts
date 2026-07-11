import { CompilerConfigSchema } from "@knowledge-compiler/config";
import type { CompilerConfig } from "@knowledge-compiler/config";
import { PluginRegistry, type CompilerPass, type PassID, type PassDescriptor, type PassResult } from "@knowledge-compiler/plugins";
import type { CompilerContext, CompilerError, CompilerResult, CompileOptions } from "./types.js";
import type { CompilerPhase } from "@knowledge-compiler/plugins";
import { DefaultCompilerContext, generateErrorId } from "./types.js";
import { PipelineOrchestrator } from "./pipeline.js";
import { Scheduler } from "./scheduler.js";
import type { IRStore } from "./types.js";
import { ArtifactWriter } from "@knowledge-compiler/artifacts";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

// Built-in passes
import {
  GlobResolverPass,
  FileReaderPass,
  FrontmatterParserPass,
  MDASTParserPass,
} from "./compilers/parsing.js";

import {
  LinkExtractorPass,
  EntityExtractorPass,
  KeywordExtractorPass,
  ConceptHierarchyPass,
} from "./compilers/analysis.js";

import {
  KnowledgeGraphBuilderPass,
  PageRankPass,
  GraphStatisticsPass,
} from "./compilers/graph.js";

import {
  TextChunkerPass,
  EmbeddingGeneratorPass,
  DimensionReducerPass,
} from "./compilers/embedding.js";

import {
  SimilarityMatrixPass,
  ClusterAssignerPass,
  CentroidCalculatorPass,
} from "./compilers/clustering.js";

import {
  PruningPass,
  DeduplicationPass,
  CompressionPass,
} from "./compilers/optimization.js";

import {
  ArtifactSerializerPass,
  ManifestBuilderPass,
} from "./compilers/generation.js";

import { ReportPass } from "./compilers/reporting.js";

const BUILTIN_PASSES: CompilerPass[] = [
  new GlobResolverPass(),
  new FileReaderPass(),
  new FrontmatterParserPass(),
  new MDASTParserPass(),
  new LinkExtractorPass(),
  new EntityExtractorPass(),
  new KeywordExtractorPass(),
  new ConceptHierarchyPass(),
  new KnowledgeGraphBuilderPass(),
  new PageRankPass(),
  new GraphStatisticsPass(),
  new TextChunkerPass(),
  new EmbeddingGeneratorPass(),
  new DimensionReducerPass(),
  new SimilarityMatrixPass(),
  new ClusterAssignerPass(),
  new CentroidCalculatorPass(),
  new PruningPass(),
  new DeduplicationPass(),
  new CompressionPass(),
  new ArtifactSerializerPass(),
  new ManifestBuilderPass(),
  new ReportPass(),
];

export class Compiler {
  private config: CompilerConfig;
  private passRegistry = new PluginRegistry();
  private compilerContext: CompilerContext;
  private pipeline: PipelineOrchestrator | null = null;
  private scheduler = new Scheduler(4);
  private outputDir: string;

  constructor(options: CompileOptions = {}) {
    this.config = options.config || (CompilerConfigSchema.parse({}) as CompilerConfig);
    this.outputDir = options.output || this.config.output.dir;
    this.compilerContext = new DefaultCompilerContext(this.config);

    // Register built-in passes
    for (const pass of BUILTIN_PASSES) {
      this.passRegistry.register(pass);
    }

    // Set up output directory
    if (this.config.output.clean) {
      rm(this.outputDir, { recursive: true, force: true }).catch(() => {});
    }
  }

  async compile(options: CompileOptions = {}): Promise<CompilerResult> {
    const startTime = Date.now();

    // Apply overrides
    if (options.input && !this.config.source.baseDir) {
      this.config = { ...this.config, source: { ...this.config.source, baseDir: options.input } };
    }

    // Update output directory from options
    if (options.output) {
      this.outputDir = options.output;
    }

    try {
      // Initialize pipeline
      this.pipeline = new PipelineOrchestrator(this.compilerContext, this.passRegistry);

      // Execute pipeline
      await this.pipeline.execute({
        passes: options.passes,
        skipPasses: options.skipPasses,
      });

      // Determine final status
      const fatalErrors = this.compilerContext.errors.filter((e) => e.severity === "fatal");
      const degradedErrors = this.compilerContext.errors.filter((e) => e.severity === "degraded");
      const durationMs = Date.now() - startTime;

      const result: CompilerResult = {
        status: fatalErrors.length > 0 ? "failed" : degradedErrors.length > 0 ? "partial" : "success",
        errors: this.compilerContext.errors,
        warnings: this.compilerContext.warnings,
        artifactsWritten: this.compilerContext.getIRStore().getEmbeddingCount(),
        documentsProcessed: this.compilerContext.getIRStore().getDocumentCount(),
        sectionsProcessed: this.compilerContext.getIRStore().getSectionCount(),
        conceptsProcessed: 0,
        durationMs,
        phaseTiming: Object.fromEntries(this.compilerContext.phaseStartTime) as any,
        manifestPath: join(this.outputDir, "manifest.json"),
        outputDir: this.outputDir,
      };

      return result;
    } catch (error) {
      const durationMs = Date.now() - startTime;
      this.compilerContext.addError({
        id: generateErrorId(),
        severity: "fatal",
        message: error instanceof Error ? error.message : String(error),
        recoverable: false,
        retryCount: 0,
        timestamp: Date.now(),
      });

      return {
        status: "failed",
        errors: this.compilerContext.errors,
        warnings: this.compilerContext.warnings,
        artifactsWritten: 0,
        documentsProcessed: 0,
        sectionsProcessed: 0,
        conceptsProcessed: 0,
        durationMs,
        phaseTiming: {} as Record<string, number>,
        outputDir: this.outputDir,
      };
    }
  }

  getIRStore(): IRStore {
    return this.compilerContext.getIRStore();
  }

  getConfig(): CompilerConfig {
    return this.config;
  }

  getPassRegistry(): PluginRegistry {
    return this.passRegistry;
  }
}
