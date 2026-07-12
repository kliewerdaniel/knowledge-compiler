# Compiler Debug Report

Generated: 2026-07-12T02:29:16.699Z

## pre-glob-resolver (PARSING)

Result: unknown
Validation: PASS

### Statistics


### Validation Checks


## glob-resolver (PARSING)

Result: success
Validation: PASS

### Statistics


### Validation Checks

- ✓ files resolved: OK
- ✓ files is array: OK

## pre-file-reader (PARSING)

Result: unknown
Validation: PASS

### Statistics


### Validation Checks


## file-reader (PARSING)

Result: success
Validation: PASS

### Statistics


### Validation Checks

- ✓ files read: OK
- ✓ files have content: OK

## pre-frontmatter-parser (PARSING)

Result: unknown
Validation: PASS

### Statistics


### Validation Checks


## frontmatter-parser (PARSING)

Result: success
Validation: PASS

### Statistics


### Validation Checks

- ✓ frontmatter parsed: OK

## pre-mdast-parser (PARSING)

Result: unknown
Validation: PASS

### Statistics


### Validation Checks


## mdast-parser (PARSING)

Result: success
Validation: PASS

### Statistics


### Validation Checks

- ✓ AST generated: OK

## pre-link-extractor (ANALYSIS)

Result: unknown
Validation: PASS

### Statistics


### Validation Checks


## link-extractor (ANALYSIS)

Result: success
Validation: PASS

### Statistics


### Validation Checks

- ✓ links extracted: OK

## pre-entity-extractor (ANALYSIS)

Result: unknown
Validation: PASS

### Statistics


### Validation Checks


## entity-extractor (ANALYSIS)

Result: success
Validation: PASS

### Statistics


### Validation Checks

- ✓ entities extracted: OK
- ✓ entities found: 8: OK
- ✓ no duplicate entities in /Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/machine-learning.md: OK
- ✓ no duplicate entities in /Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/neural-networks.md: OK
- ✓ no duplicate entities in /Users/danielkliewer/Documents/Projects/knowledge-compiler/test-corpus/transformers.md: OK

## pre-keyword-extractor (ANALYSIS)

Result: unknown
Validation: PASS

### Statistics


### Validation Checks


## keyword-extractor (ANALYSIS)

Result: success
Validation: PASS

### Statistics


### Validation Checks

- ✓ keywords extracted: OK

## pre-concept-hierarchy (ANALYSIS)

Result: unknown
Validation: PASS

### Statistics


### Validation Checks


## concept-hierarchy (ANALYSIS)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129

### Validation Checks

- ✓ concepts generated: OK
- ✓ concept count: 132: OK
- ✓ has edges: OK
- ✓ concepts have IDs: OK

## pre-knowledge-graph-builder (GRAPH_CONSTRUCTION)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129

### Validation Checks


## knowledge-graph-builder (GRAPH_CONSTRUCTION)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667

### Validation Checks

- ✓ graph built: OK
- ✓ nodes: 47: OK
- ✓ edges: 140: OK
- ✓ no dangling refs: OK

## pre-pagerank (GRAPH_CONSTRUCTION)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667

### Validation Checks


## pagerank (GRAPH_CONSTRUCTION)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153

### Validation Checks

- ✓ pagerank computed: OK

## pre-graph-statistics (GRAPH_CONSTRUCTION)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153

### Validation Checks


## graph-statistics (GRAPH_CONSTRUCTION)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5

### Validation Checks


## pre-text-chunker (EMBEDDING)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5

### Validation Checks


## text-chunker (EMBEDDING)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5

### Validation Checks

- ✓ chunks created: OK

## pre-embedding-generator (EMBEDDING)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5

### Validation Checks


## embedding-generator (EMBEDDING)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128

### Validation Checks

- ✓ embeddings generated: OK
- ✓ embedding count: 9: OK
- ✓ dimensions: 128: OK

## pre-dimension-reducer (EMBEDDING)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128

### Validation Checks


## dimension-reducer (EMBEDDING)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128

### Validation Checks


## pre-similarity-matrix (CLUSTERING)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128

### Validation Checks


## similarity-matrix (CLUSTERING)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72

### Validation Checks

- ✓ similarity computed: OK

## pre-cluster-assigner (CLUSTERING)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72

### Validation Checks


## cluster-assigner (CLUSTERING)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9

### Validation Checks

- ✓ clusters assigned: OK
- ✓ clusters: 3: OK
- ✓ all nodes assigned: OK

## pre-centroid-calculator (CLUSTERING)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9

### Validation Checks


## centroid-calculator (CLUSTERING)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3

### Validation Checks


## pre-pruning (OPTIMIZATION)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3

### Validation Checks


## pruning (OPTIMIZATION)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3

### Validation Checks

- ✓ graph pruned: OK

## pre-deduplication (OPTIMIZATION)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3

### Validation Checks


## deduplication (OPTIMIZATION)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3
- deduplicationResult.duplicateCount: 0
- deduplicationResult.totalItems: 12
- deduplicationResult.uniqueItems: 12

### Validation Checks

- ✓ dedup done: OK

## pre-compression (OPTIMIZATION)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3
- deduplicationResult.duplicateCount: 0
- deduplicationResult.totalItems: 12
- deduplicationResult.uniqueItems: 12

### Validation Checks


## compression (OPTIMIZATION)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3
- deduplicationResult.duplicateCount: 0
- deduplicationResult.totalItems: 12
- deduplicationResult.uniqueItems: 12
- compressionData.compressionRatio: 0.25
- compressionData.originalBytes: 4608
- compressionData.quantizedBytes: 1152

### Validation Checks

- ✓ embeddings compressed: OK

## pre-artifact-serializer (GENERATION)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3
- deduplicationResult.duplicateCount: 0
- deduplicationResult.totalItems: 12
- deduplicationResult.uniqueItems: 12
- compressionData.compressionRatio: 0.25
- compressionData.originalBytes: 4608
- compressionData.quantizedBytes: 1152

### Validation Checks


## artifact-serializer (GENERATION)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3
- deduplicationResult.duplicateCount: 0
- deduplicationResult.totalItems: 12
- deduplicationResult.uniqueItems: 12
- compressionData.compressionRatio: 0.25
- compressionData.originalBytes: 4608
- compressionData.quantizedBytes: 1152

### Validation Checks


## pre-manifest-builder (GENERATION)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3
- deduplicationResult.duplicateCount: 0
- deduplicationResult.totalItems: 12
- deduplicationResult.uniqueItems: 12
- compressionData.compressionRatio: 0.25
- compressionData.originalBytes: 4608
- compressionData.quantizedBytes: 1152

### Validation Checks


## manifest-builder (GENERATION)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3
- deduplicationResult.duplicateCount: 0
- deduplicationResult.totalItems: 12
- deduplicationResult.uniqueItems: 12
- compressionData.compressionRatio: 0.25
- compressionData.originalBytes: 4608
- compressionData.quantizedBytes: 1152

### Validation Checks


## pre-report (COMPLETE)

Result: unknown
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3
- deduplicationResult.duplicateCount: 0
- deduplicationResult.totalItems: 12
- deduplicationResult.uniqueItems: 12
- compressionData.compressionRatio: 0.25
- compressionData.originalBytes: 4608
- compressionData.quantizedBytes: 1152

### Validation Checks


## report (COMPLETE)

Result: success
Validation: PASS

### Statistics

- conceptHierarchy.totalConcepts: 132
- conceptHierarchy.maxLevel: 4
- conceptHierarchy.rootCount: 3
- conceptHierarchy.leafCount: 111
- conceptHierarchy.averageDepth: 2.696969696969697
- conceptHierarchy.edgeCount: 129
- knowledgeGraph.nodeCount: 47
- knowledgeGraph.edgeCount: 140
- knowledgeGraph.adjacencyCount: 47
- knowledgeGraph.averageImportance: 0.17021276595744667
- pagerankScores.node-1: 0.031052322912727075
- pagerankScores.node-2: 0.01638873216065774
- pagerankScores.node-4: 0.01638873216065774
- pagerankScores.node-6: 0.04082805008077328
- pagerankScores.node-7: 0.014759444299316703
- pagerankScores.node-9: 0.014759444299316703
- pagerankScores.node-11: 0.014759444299316703
- pagerankScores.node-13: 0.04082805008077328
- pagerankScores.node-14: 0.014759444299316703
- pagerankScores.node-16: 0.014759444299316703
- pagerankScores.node-18: 0.014759444299316703
- pagerankScores.node-20: 0.012011871991232808
- pagerankScores.node-21: 0.11414600384111995
- pagerankScores.node-23: 0.012011871991232808
- pagerankScores.node-25: 0.012011871991232808
- pagerankScores.node-27: 0.012011871991232808
- pagerankScores.node-29: 0.012011871991232808
- pagerankScores.node-31: 0.012011871991232808
- pagerankScores.node-39: 0.012011871991232808
- pagerankScores.node-46: 0.012011871991232808
- pagerankScores.node-53: 0.012011871991232808
- pagerankScores.node-60: 0.02083225462076349
- pagerankScores.node-67: 0.012011871991232808
- pagerankScores.node-74: 0.012011871991232811
- pagerankScores.node-75: 0.11414600384111998
- pagerankScores.node-77: 0.012011871991232811
- pagerankScores.node-79: 0.012011871991232811
- pagerankScores.node-81: 0.012011871991232811
- pagerankScores.node-83: 0.012011871991232811
- pagerankScores.node-85: 0.012011871991232811
- pagerankScores.node-93: 0.012011871991232811
- pagerankScores.node-100: 0.012011871991232811
- pagerankScores.node-107: 0.012011871991232811
- pagerankScores.node-114: 0.012011871991232811
- pagerankScores.node-127: 0.012315512507305153
- pagerankScores.node-128: 0.1288095945931893
- pagerankScores.node-130: 0.012315512507305153
- pagerankScores.node-132: 0.012315512507305153
- pagerankScores.node-134: 0.012315512507305153
- pagerankScores.node-136: 0.012315512507305153
- pagerankScores.node-138: 0.012315512507305153
- pagerankScores.node-146: 0.012315512507305153
- pagerankScores.node-153: 0.012315512507305153
- pagerankScores.node-160: 0.012315512507305153
- pagerankScores.node-167: 0.012315512507305153
- pagerankScores.node-174: 0.012315512507305153
- pagerankScores.node-181: 0.012315512507305153
- graphStatistics.nodeCount: 47
- graphStatistics.edgeCount: 140
- graphStatistics.density: 0.12950971322849214
- graphStatistics.averageDegree: 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: 1
- graphStatistics.diameter: 4
- graphStatistics.connectedComponents: 5
- embeddings.count: 9
- embeddings.dimensions: 128
- similarityMatrix.count: 72
- clusterAssignments.clusterCount: 3
- clusterAssignments.assignmentCount: 9
- clusterGraph.nodeCount: 3
- clusterGraph.edgeCount: 0
- clusterGraph.totalClusters: 3
- clusterGraph.averageClusterSize: 3
- deduplicationResult.duplicateCount: 0
- deduplicationResult.totalItems: 12
- deduplicationResult.uniqueItems: 12
- compressionData.compressionRatio: 0.25
- compressionData.originalBytes: 4608
- compressionData.quantizedBytes: 1152

### Validation Checks


## Cross-Pass Comparison

### pre-concept-hierarchy → concept-hierarchy

- conceptHierarchy.totalConcepts: N/A → 132
- conceptHierarchy.maxLevel: N/A → 4
- conceptHierarchy.rootCount: N/A → 3
- conceptHierarchy.leafCount: N/A → 111
- conceptHierarchy.averageDepth: N/A → 2.696969696969697
- conceptHierarchy.edgeCount: N/A → 129

### pre-knowledge-graph-builder → knowledge-graph-builder

- knowledgeGraph.nodeCount: N/A → 47
- knowledgeGraph.edgeCount: N/A → 140
- knowledgeGraph.adjacencyCount: N/A → 47
- knowledgeGraph.averageImportance: N/A → 0.17021276595744667

### pre-pagerank → pagerank

- pagerankScores.node-1: N/A → 0.031052322912727075
- pagerankScores.node-2: N/A → 0.01638873216065774
- pagerankScores.node-4: N/A → 0.01638873216065774
- pagerankScores.node-6: N/A → 0.04082805008077328
- pagerankScores.node-7: N/A → 0.014759444299316703
- pagerankScores.node-9: N/A → 0.014759444299316703
- pagerankScores.node-11: N/A → 0.014759444299316703
- pagerankScores.node-13: N/A → 0.04082805008077328
- pagerankScores.node-14: N/A → 0.014759444299316703
- pagerankScores.node-16: N/A → 0.014759444299316703
- pagerankScores.node-18: N/A → 0.014759444299316703
- pagerankScores.node-20: N/A → 0.012011871991232808
- pagerankScores.node-21: N/A → 0.11414600384111995
- pagerankScores.node-23: N/A → 0.012011871991232808
- pagerankScores.node-25: N/A → 0.012011871991232808
- pagerankScores.node-27: N/A → 0.012011871991232808
- pagerankScores.node-29: N/A → 0.012011871991232808
- pagerankScores.node-31: N/A → 0.012011871991232808
- pagerankScores.node-39: N/A → 0.012011871991232808
- pagerankScores.node-46: N/A → 0.012011871991232808
- pagerankScores.node-53: N/A → 0.012011871991232808
- pagerankScores.node-60: N/A → 0.02083225462076349
- pagerankScores.node-67: N/A → 0.012011871991232808
- pagerankScores.node-74: N/A → 0.012011871991232811
- pagerankScores.node-75: N/A → 0.11414600384111998
- pagerankScores.node-77: N/A → 0.012011871991232811
- pagerankScores.node-79: N/A → 0.012011871991232811
- pagerankScores.node-81: N/A → 0.012011871991232811
- pagerankScores.node-83: N/A → 0.012011871991232811
- pagerankScores.node-85: N/A → 0.012011871991232811
- pagerankScores.node-93: N/A → 0.012011871991232811
- pagerankScores.node-100: N/A → 0.012011871991232811
- pagerankScores.node-107: N/A → 0.012011871991232811
- pagerankScores.node-114: N/A → 0.012011871991232811
- pagerankScores.node-127: N/A → 0.012315512507305153
- pagerankScores.node-128: N/A → 0.1288095945931893
- pagerankScores.node-130: N/A → 0.012315512507305153
- pagerankScores.node-132: N/A → 0.012315512507305153
- pagerankScores.node-134: N/A → 0.012315512507305153
- pagerankScores.node-136: N/A → 0.012315512507305153
- pagerankScores.node-138: N/A → 0.012315512507305153
- pagerankScores.node-146: N/A → 0.012315512507305153
- pagerankScores.node-153: N/A → 0.012315512507305153
- pagerankScores.node-160: N/A → 0.012315512507305153
- pagerankScores.node-167: N/A → 0.012315512507305153
- pagerankScores.node-174: N/A → 0.012315512507305153
- pagerankScores.node-181: N/A → 0.012315512507305153

### pre-graph-statistics → graph-statistics

- graphStatistics.nodeCount: N/A → 47
- graphStatistics.edgeCount: N/A → 140
- graphStatistics.density: N/A → 0.12950971322849214
- graphStatistics.averageDegree: N/A → 1.7872340425531914
- graphStatistics.averageClusteringCoefficient: N/A → 1
- graphStatistics.diameter: N/A → 4
- graphStatistics.connectedComponents: N/A → 5

### pre-embedding-generator → embedding-generator

- embeddings.count: N/A → 9
- embeddings.dimensions: N/A → 128

### pre-similarity-matrix → similarity-matrix

- similarityMatrix.count: N/A → 72

### pre-cluster-assigner → cluster-assigner

- clusterAssignments.clusterCount: N/A → 3
- clusterAssignments.assignmentCount: N/A → 9

### pre-centroid-calculator → centroid-calculator

- clusterGraph.nodeCount: N/A → 3
- clusterGraph.edgeCount: N/A → 0
- clusterGraph.totalClusters: N/A → 3
- clusterGraph.averageClusterSize: N/A → 3

### pre-deduplication → deduplication

- deduplicationResult.duplicateCount: N/A → 0
- deduplicationResult.totalItems: N/A → 12
- deduplicationResult.uniqueItems: N/A → 12

### pre-compression → compression

- compressionData.compressionRatio: N/A → 0.25
- compressionData.originalBytes: N/A → 4608
- compressionData.quantizedBytes: N/A → 1152
