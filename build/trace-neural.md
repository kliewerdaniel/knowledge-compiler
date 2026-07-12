# Trace: "neural" through Compiler Pipeline

## pre-glob-resolver (PARSING)

Not found in this pass output.

## glob-resolver (PARSING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"

## pre-file-reader (PARSING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"

## file-reader (PARSING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## pre-frontmatter-parser (PARSING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"

## frontmatter-parser (PARSING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-mdast-parser (PARSING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## mdast-parser (PARSING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-link-extractor (ANALYSIS)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## link-extractor (ANALYSIS)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-entity-extractor (ANALYSIS)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## entity-extractor (ANALYSIS)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-keyword-extractor (ANALYSIS)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## keyword-extractor (ANALYSIS)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-concept-hierarchy (ANALYSIS)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## concept-hierarchy (ANALYSIS)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-knowledge-graph-builder (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## knowledge-graph-builder (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-pagerank (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pagerank (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-graph-statistics (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## graph-statistics (GRAPH_CONSTRUCTION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-text-chunker (EMBEDDING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## text-chunker (EMBEDDING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-embedding-generator (EMBEDDING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## embedding-generator (EMBEDDING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-dimension-reducer (EMBEDDING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## dimension-reducer (EMBEDDING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-similarity-matrix (CLUSTERING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## similarity-matrix (CLUSTERING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-cluster-assigner (CLUSTERING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## cluster-assigner (CLUSTERING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-centroid-calculator (CLUSTERING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## centroid-calculator (CLUSTERING)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-pruning (OPTIMIZATION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pruning (OPTIMIZATION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-deduplication (OPTIMIZATION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## deduplication (OPTIMIZATION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-compression (OPTIMIZATION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## compression (OPTIMIZATION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-artifact-serializer (GENERATION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## artifact-serializer (GENERATION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-manifest-builder (GENERATION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## manifest-builder (GENERATION)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## pre-report (COMPLETE)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"

## report (COMPLETE)

Found:
- resolvedFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- readFiles[1].contentPreview: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- readFiles[2].contentPreview: "---
title: Transformer Architecture
tags: [AI, deep-learning, transformers, NLP]
date: 2024-02-01
---

# Transformer Architecture

The Transformer is a neural network architecture introduced by Google"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- frontmatterResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.children[12].children[0].value: "Key algorithms include linear regression, decision trees, and neural networks. The performance depends on data quality and model architecture."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md.ast.rawContent: "---
title: Machine Learning Overview
tags: [AI, ML, technology]
date: 2024-01-15
---

# Machine Learning Overview

Machine learning is a subset of artificial intelligence that enables systems to learn"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.filePath: "/Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[0].value: "title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[1].children[0].value: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[2].children[0].value: "Neural networks are computing systems inspired by biological neural networks in the human brain."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[4].children[0].value: "A neural network consists of layers of interconnected nodes (neurons). Dr. Geoffrey Hinton pioneered many key techniques at the University of Toronto."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[5].children[0].value: "Convolutional Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[7].children[0].value: "Recurrent Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.children[12].children[0].value: "Neural networks power modern AI systems including GPT, BERT, and other large language models from companies like Google AI and OpenAI."
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.ast.rawContent: "---
title: Neural Networks
tags: [AI, deep-learning, neural-networks]
date: 2024-01-20
---

# Neural Networks

Neural networks are computing systems inspired by biological neural networks in the human"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.title: "Neural Networks"
- mdastResults./Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md.frontmatter.tags: "[AI, deep-learning, neural-networks]"
