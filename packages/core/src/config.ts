export type {
  ErrorSeverity,
  CompilerError,
  CompilerResult,
  CompileOptions,
  CompilerContext,
  IRStore,
} from "./types.js";

export {
  DefaultCompilerContext,
  CompilerContextWithStore,
  MutableIRStore,
  generateErrorId,
} from "./types.js";

export { PipelineOrchestrator } from "./pipeline.js";
export { Scheduler } from "./scheduler.js";

export { PluginRegistry } from "@knowledge-compiler/plugins";

export type {
  PassDescriptor,
  PassContext,
  PassResult,
  CompilerPass,
  CompilerPhase,
  PassID,
} from "@knowledge-compiler/plugins";
