# Trace: "Google" through Compiler Pipeline

## pre-glob-resolver (PARSING)

Not found in this pass output.

## glob-resolver (PARSING)

Not found in this pass output.

## pre-file-reader (PARSING)

Not found in this pass output.

## file-reader (PARSING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## pre-frontmatter-parser (PARSING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## frontmatter-parser (PARSING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## pre-mdast-parser (PARSING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## mdast-parser (PARSING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## pre-link-extractor (ANALYSIS)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## link-extractor (ANALYSIS)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## pre-entity-extractor (ANALYSIS)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## entity-extractor (ANALYSIS)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## pre-keyword-extractor (ANALYSIS)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## keyword-extractor (ANALYSIS)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"

## pre-concept-hierarchy (ANALYSIS)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"

## concept-hierarchy (ANALYSIS)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"

## pre-knowledge-graph-builder (GRAPH_CONSTRUCTION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"

## knowledge-graph-builder (GRAPH_CONSTRUCTION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"

## pre-pagerank (GRAPH_CONSTRUCTION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"

## pagerank (GRAPH_CONSTRUCTION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"

## pre-graph-statistics (GRAPH_CONSTRUCTION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"

## graph-statistics (GRAPH_CONSTRUCTION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"

## pre-text-chunker (EMBEDDING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"

## text-chunker (EMBEDDING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-embedding-generator (EMBEDDING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## embedding-generator (EMBEDDING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-dimension-reducer (EMBEDDING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## dimension-reducer (EMBEDDING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-similarity-matrix (CLUSTERING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## similarity-matrix (CLUSTERING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-cluster-assigner (CLUSTERING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## cluster-assigner (CLUSTERING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-centroid-calculator (CLUSTERING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## centroid-calculator (CLUSTERING)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-pruning (OPTIMIZATION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pruning (OPTIMIZATION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-deduplication (OPTIMIZATION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## deduplication (OPTIMIZATION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-compression (OPTIMIZATION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## compression (OPTIMIZATION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-artifact-serializer (GENERATION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## artifact-serializer (GENERATION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-manifest-builder (GENERATION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## manifest-builder (GENERATION)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## pre-report (COMPLETE)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"

## report (COMPLETE)

Found:
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[6].children[0].value: "In supervised learning, models are trained on labeled data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[2].children[0].value: "The Transformer is a neural network architecture introduced by Google AI researchers in the paper "Attention is All You Need"."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[10].children[0].value: "Transformers have revolutionized NLP and beyond. BERT from Google AI and GPT from OpenAI are both based on the Transformer architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.children[12].children[0].value: "Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Shazeer are among the key contributors."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md.ast.rawContent: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- keywordData./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[7].keyword: "google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md[1].content: "data. Dr. Andrew Ng has contributed significantly to this field. Stanford University and Google AI are major research centers.

### Unsupervised Learning

Unsupervised learning finds patterns in unlab"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md[2].content: "gnificant computational resources, often using GPUs from NVIDIA.

## Applications

Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Goog"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[0].content: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[1].content: "attention mechanisms, enabling parallel processing of sequences.

### Multi-Head Attention

Multiple attention heads allow the model to focus on different parts of the input simultaneously.

### Posit"
- textChunks./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md[2].content: "GPT from OpenAI are both based on the Transformer architecture.

## Usage

Companies like Google, OpenAI, Meta, and Microsoft use transformers in production systems. Dr. Ashish Vaswani and Dr. Noam Sh"
