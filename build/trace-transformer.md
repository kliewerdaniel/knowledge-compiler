# Trace: "Transformer" through Compiler Pipeline

## pre-glob-resolver (PARSING)

Not found in this pass output.

## glob-resolver (PARSING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"

## pre-file-reader (PARSING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"

## file-reader (PARSING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## pre-frontmatter-parser (PARSING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## frontmatter-parser (PARSING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"

## pre-mdast-parser (PARSING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"

## mdast-parser (PARSING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"

## pre-link-extractor (ANALYSIS)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"

## link-extractor (ANALYSIS)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"

## pre-entity-extractor (ANALYSIS)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"

## entity-extractor (ANALYSIS)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"

## pre-keyword-extractor (ANALYSIS)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"

## keyword-extractor (ANALYSIS)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-concept-hierarchy (ANALYSIS)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## concept-hierarchy (ANALYSIS)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-knowledge-graph-builder (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## knowledge-graph-builder (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-pagerank (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pagerank (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-graph-statistics (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## graph-statistics (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-text-chunker (EMBEDDING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## text-chunker (EMBEDDING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-embedding-generator (EMBEDDING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## embedding-generator (EMBEDDING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-dimension-reducer (EMBEDDING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## dimension-reducer (EMBEDDING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-similarity-matrix (CLUSTERING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## similarity-matrix (CLUSTERING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-cluster-assigner (CLUSTERING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## cluster-assigner (CLUSTERING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-centroid-calculator (CLUSTERING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## centroid-calculator (CLUSTERING)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-pruning (OPTIMIZATION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pruning (OPTIMIZATION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-deduplication (OPTIMIZATION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## deduplication (OPTIMIZATION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-compression (OPTIMIZATION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## compression (OPTIMIZATION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-artifact-serializer (GENERATION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## artifact-serializer (GENERATION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-manifest-builder (GENERATION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## manifest-builder (GENERATION)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## pre-report (COMPLETE)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"

## report (COMPLETE)

Found:
- resolvedFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[0].value: "title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[1].children[0].value: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[4].children[0].value: "The Transformer replaces recurrence with self-attention mechanisms, enabling parallel processing of sequences."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[8].children[0].value: "Since transformers process all tokens in parallel, positional encodings provide sequence order information."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[14].children[0].value: "Transformers scale effectively with more data and compute. NVIDIA GPUs are commonly used for training these large models."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.title: "Transformer Architecture"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.frontmatter.tags: "[AI, deep-learning, transformers, NLP]"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].keyword: "transformer"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].keyword: "transformers"
