# Knowledge Compiler — Algorithm Specification

> **Audience:** Senior ML engineers, systems engineers, and algorithm researchers building or evaluating the Knowledge Compiler.
>
> **Version:** 1.0.0

---

## Table of Contents

1. [Graph Algorithms](#1-graph-algorithms)
2. [Community Detection / Clustering](#2-community-detection--clustering)
3. [Topic Modeling](#3-topic-modeling)
4. [Embedding & Similarity](#4-embedding--similarity)
5. [Natural Language Processing](#5-natural-language-processing)
6. [Search & Retrieval](#6-search--retrieval)
7. [Optimization](#7-optimization)
8. [Caching & Incremental Builds](#8-caching--incremental-builds)

---

## 1. Graph Algorithms

The knowledge graph is the central data structure of the compiler. Nodes represent documents, sections, entities, concepts, and topics. Edges represent semantic relationships (hyperlinks, co-occurrence, hierarchical containment, semantic similarity). All graph algorithms operate on this unified directed graph `G = (V, E, W)` where `W: E → ℝ⁺` optionally assigns edge weights.

### 1.1 PageRank / Importance Scoring

**Problem Statement:** Assign a global importance score `PR(v)` to every node `v ∈ V` reflecting its centrality and influence in the knowledge graph. Important nodes represent key concepts that should be surfaced, prioritized in search, and retained during graph pruning.

**Candidate Algorithms:**

| Algorithm | Description | Key Property |
|---|---|---|
| **Standard PageRank** | Power iteration on the random-surfer Markov chain with teleport probability α | Stationary distribution of a random walk with restart |
| **Personalized PageRank (PPR)** | Teleport set biased toward query/document nodes | Topic-sensitive importance |
| **Weighted PageRank** | Edge weights influence transition probabilities | Captures relationship strength |
| **HITS (Hubs & Authorities)** | Mutually reinforcing hub/authority scores | Dual-score output |

**Tradeoff Analysis:**

| Dimension | Standard PR | Personalized PR | Weighted PR | HITS |
|---|---|---|---|---|
| Time complexity | O(t·(V+E)) | O(t·(V+E)) | O(t·(V+E)) | O(t·(V+E)) |
| Space complexity | O(V) scores | O(k·V) for k personalizations | O(V) scores | O(2V) scores |
| Determinism | Deterministic (convergence) | Deterministic | Deterministic | Deterministic |
| Parallelism | Embarrassingly parallel per iteration | Embarrassingly parallel | Embarrassingly parallel | Parallel per iteration |
| Locality | Poor (random access across graph) | Poor | Poor | Poor |
| Query-specific | No | Yes | No | Weakly |
| Implementation complexity | Low | Medium | Low | Medium |

**Recommendation: Standard PageRank** with power iteration as the primary scoring method. It is simple, well-understood, deterministic, and produces a global importance ranking that serves all downstream consumers (search ranking, pruning, UI surfacing). Supplement with Personalized PageRank for query-time importance adjustments when search queries are available.

**Implementation Notes:**
- Use α = 0.85 (standard damping factor). Tune based on graph density: denser graphs benefit from higher α (less teleportation).
- Convergence criterion: `‖PR⁽ᵗ⁺¹⁾ − PR⁽ᵗ⁾‖₁ < 10⁻⁸ · V` or max 200 iterations.
- Handle dangling nodes (zero out-degree) by distributing their mass uniformly or via teleport.
- Sparse adjacency via CSR format for cache-friendly power iteration.
- Warm-start from previous build's scores when doing incremental compilation.

**Pseudocode:**

```
function PageRank(G, α=0.85, ε=1e-8, maxIter=200):
    V ← G.vertices
    n ← |V|
    PR ← [1/n] * n                     // uniform initialization
    danglingMass ← 0
    teleportMass ← (1-α)/n

    for iter ← 1 to maxIter:
        PR_next ← [teleportMass] * n
        danglingMass ← 0

        // Sparse contribution from outgoing links
        for each vertex v in V:
            outDeg ← outDegree(v)
            if outDeg == 0:
                danglingMass += PR[v]
            else:
                contrib ← α * PR[v] / outDeg
                for each neighbor u of v:
                    PR_next[u] += contrib

        // Distribute dangling mass uniformly
        danglingContrib ← α * danglingMass / n
        for each vertex v in V:
            PR_next[v] += danglingContrib

        // Check convergence
        diff ← sum(|PR_next[v] - PR[v]| for v in V)
        PR ← PR_next

        if diff < ε:
            break

    return PR
```

**Benchmarking Approach:**
- **Metric:** Convergence iterations, wall-clock time per iteration, steady-state score stability across builds.
- **Dataset:** Synthetic graphs (power-law, small-world, random) ranging from 10²–10⁶ nodes.
- **Compare:** Warm-start vs cold-start convergence speed.
- **Track:** Score rank correlation (Kendall τ) between consecutive builds for incremental stability.

---

### 1.2 Betweenness Centrality

**Problem Statement:** For each node `v ∈ V`, compute `BC(v) = Σ_{s≠v≠t} σ_{st}(v) / σ_{st}`, where `σ_{st}` is the number of shortest paths from `s` to `t` and `σ_{st}(v)` is the number that pass through `v`. Nodes with high betweenness act as bridges between knowledge domains.

**Candidate Algorithms:**

| Algorithm | Description |
|---|---|
| **Brandes' Algorithm** | Exact computation via BFS from every source (unweighted) or Dijkstra (weighted). Accumulates pair-dependencies. |
| **Approximate (Sampling)** | Run Brandes on a random subset of source nodes. Scales as O(k·(V+E)) for k sources. |
| **Adaptive Sampling** | Progressively sample more sources for high-BC nodes (variance-based stopping). |

**Tradeoff Analysis:**

| Dimension | Brandes (Exact) | Approximate (Sampling) | Adaptive |
|---|---|---|---|
| Time complexity (unweighted) | O(V·E) | O(k·(V+E)) | O(k̄·(V+E)) |
| Time complexity (weighted) | O(V·E + V² log V) | O(k·(E + V log V)) | O(k̄·(E + V log V)) |
| Space complexity | O(V+E) | O(V+E) | O(V+E) |
| Determinism | Exact | Non-deterministic | Non-deterministic |
| Parallelism | Embarrassingly parallel (sources) | Embarrassingly parallel | Limited |
| Error bound | None | O(1/√k) | Adaptive |
| Implementation complexity | Medium | Medium | High |

**Recommendation:** Use **Brandes' Algorithm** only for graphs with |V| < 10⁴. For larger graphs, use **Approximate Brandes with k = ⌈3200 · log V⌉** sources (randomly sampled), giving ±5% error at 95% confidence. The approximate version scales gracefully and the error is well-characterized.

**Pseudocode (Approximate Brandes):**

```
function ApproximateBetweenness(G, k, weighted=false):
    V ← G.vertices
    BC ← [0] * |V|
    sources ← randomSample(V, k)

    parallel for each s in sources:
        S ← empty stack
        P ← array of empty lists, size |V|       // predecessors
        σ ← [0] * |V|; σ[s] ← 1
        d ← [-1] * |V|; d[s] ← 0
        Q ← empty queue; enqueue(Q, s)

        while Q not empty:
            v ← dequeue(Q)
            push(S, v)
            for each neighbor w of v:
                if weighted:
                    candidate ← d[v] + weight(v, w)
                    if d[w] < 0 or candidate < d[w]:
                        d[w] ← candidate
                        σ[w] ← 0; P[w] ← []
                        enqueue(Q, w) via priority
                else:
                    if d[w] < 0:
                        d[w] ← d[v] + 1
                        enqueue(Q, w)
                if d[w] == d[v] + 1 or candidate == d[w]:
                    σ[w] += σ[v]
                    append(P[w], v)

        δ ← [0] * |V|
        while S not empty:
            w ← pop(S)
            for v in P[w]:
                δ[v] += (σ[v]/σ[w]) * (1 + δ[w])
            if w ≠ s:
                BC[w] += δ[w]

    return BC * (|V| / k)        // scale estimate to full graph
```

**Benchmarking Approach:**
- **Metric:** RMSE vs exact Brandes, wall-clock time, memory peak.
- **Dataset:** Subset of knowledge graph at various sizes (1K, 10K, 100K nodes).
- **Error monitoring:** Track rank correlation of top-100 high-betweenness nodes.
- **Threshold:** Acceptable if top-100 Kendall τ > 0.9 vs exact.

---

### 1.3 Closeness Centrality

**Problem Statement:** For each node `v`, compute `CC(v) = (|V|−1) / Σ_{u≠v} d(v,u)` where `d(v,u)` is the shortest-path distance. Nodes with high closeness can efficiently reach (and be reached by) all other knowledge.

**Candidate Algorithms:**

| Algorithm | Description |
|---|---|
| **Standard** | BFS/Dijkstra from every vertex. Sum distances. |
| **Wasserman-Faust** | Harmonic variant (sum of 1/d(v,u)) handles disconnected graphs. |
| **Approximation via Sampling** | BFS from sampled sources, estimate distances using landmark techniques. |

**Tradeoff Analysis:**

| Dimension | Standard | Wasserman-Faust | Approx (Sampling/Landmarks) |
|---|---|---|---|
| Time complexity | O(V·(V+E)) | O(V·(V+E)) | O(k·(V+E)) for k landmarks |
| Space complexity | O(V) | O(V) | O(V + k·V) |
| Disconnected graphs | Fails (∞ distance) | Handles gracefully | Handles gracefully |
| Determinism | Deterministic | Deterministic | Non-deterministic |
| Parallelism | Per-source | Per-source | Per-landmark |
| Implementation complexity | Low | Low | Medium |

**Recommendation:** Use **Wasserman-Faust harmonic closeness** for graphs where disconnected components may exist (common in knowledge graphs). For graphs with |V| > 10⁵, use the **landmark approximation** with `k = 100·log V` randomly chosen landmarks.

**Pseudocode (Harmonic Closeness):**

```
function HarmonicCloseness(G):
    V ← G.vertices
    HC ← [0] * |V|

    for each source s in V:
        distances ← BFS(G, s, weighted)      // returns d[s][*]
        for each target t in V, t ≠ s:
            if distances[t] < ∞:
                HC[s] += 1 / distances[t]

    return HC                                 // raw harmonic centrality
```

**Benchmarking Approach:**
- **Metric:** Wall-clock time vs graph size, rank stability vs exact computation on held-out graphs.
- **Track:** Correlation between closeness and PageRank — high correlation may justify skipping closeness entirely.

---

### 1.4 Connected Components

**Problem Statement:** Partition V into equivalence classes where two vertices are connected if there exists an undirected path between them. Used for: identifying isolated knowledge islands, scoping community detection, detecting orphan content.

**Candidate Algorithms:**

| Algorithm | Description |
|---|---|
| **BFS/DFS** | Traverse graph, assign component IDs. O(V+E). |
| **Union-Find (DSU)** | Process edges, union endpoints. O(E·α(V)) with path compression. |
| **Tarjan's (Strongly Connected)** | Finds SCCs in directed graphs. O(V+E). |

**Tradeoff Analysis:**

| Dimension | BFS/DFS | Union-Find (DSU) | Tarjan's (SCC) |
|---|---|---|---|
| Time complexity | O(V+E) | O(E·α(V)) ≈ O(E) | O(V+E) |
| Space complexity | O(V) (visited) | O(V) (parent) | O(V) |
| Determinism | Deterministic | Deterministic | Deterministic |
| Parallelism | Difficult (BFS frontier) | Easy (batch edges) | Difficult |
| Online/streaming | No | Yes | No |
| Directed components | Undirected only | Undirected only | Directed |
| Implementation complexity | Low | Low | Medium |

**Recommendation:** Use **Union-Find with path compression and union by rank** for undirected connectivity. It is the simplest to integrate, trivially parallelizable over edge batches, and supports incremental graph construction. Use **Tarjan's algorithm** when directed strong connectivity is needed (e.g., identifying mutually reinforcing concept clusters).

**Pseudocode (Union-Find):**

```
function UnionFind(V, E):
    parent ← {v: v for v in V}
    rank ← {v: 0 for v in V}

    function Find(x):
        if parent[x] ≠ x:
            parent[x] ← Find(parent[x])      // path compression
        return parent[x]

    function Union(x, y):
        rx ← Find(x); ry ← Find(y)
        if rx == ry: return
        if rank[rx] < rank[ry]:
            parent[rx] ← ry
        else if rank[rx] > rank[ry]:
            parent[ry] ← rx
        else:
            parent[ry] ← rx
            rank[rx] += 1

    for each (u, v) in E:                     // parallel over edge batches
        Union(u, v)

    components ← {}
    for each v in V:
        root ← Find(v)
        components[root] ← append(components[root], v)

    return components
```

**Benchmarking Approach:**
- **Metric:** Throughput (edges/second), peak memory.
- **Dataset:** Edge streams at varying densities (E/V from 1.1 to 100).
- **Compare:** Sequential vs batched parallel union performance.

---

### 1.5 Minimum Spanning Tree

**Problem Statement:** Given a connected, undirected, weighted knowledge graph, find `T ⊆ E` such that `T` connects all vertices with minimum total weight. The MST captures the "backbone" of strongest relationships, useful for knowledge graph summarization and navigation.

**Candidate Algorithms:**

| Algorithm | Description |
|---|---|
| **Kruskal's** | Sort edges by weight, greedily add non-cycle-forming edges. Uses DSU. |
| **Prim's** | Grow tree from seed, always add minimum-weight frontier edge. Binary heap. |
| **Borůvka's** | Parallel edge-contraction approach. Add cheapest edge from each component. |

**Tradeoff Analysis:**

| Dimension | Kruskal's | Prim's (Binary Heap) | Borůvka's |
|---|---|---|---|
| Time complexity | O(E log E) | O(E + V log V) | O(E log V) |
| Space complexity | O(E) | O(V) | O(V+E) |
| Parallelism | Limited (sort dominates) | Difficult (sequential frontier) | Naturally parallel (per-component) |
| Sparse graph | Good | Good | Overhead |
| Dense graph | Sorting dominates | Excellent | Overhead |
| Implementation complexity | Low | Medium | High |
| Determinism | Deterministic | Deterministic (with tie-break) | Deterministic (with tie-break) |

**Recommendation:** Use **Kruskal's algorithm** for sparse knowledge graphs (E ≪ V²), which is the expected regime. The sort precomputation is useful beyond MST (e.g., edge pruning thresholds). For denser subgraphs, switch to **Prim's with a Fibonacci heap**.

**Pseudocode (Kruskal's MST):**

```
function KruskalMST(G):
    V ← G.vertices; E ← G.edges
    uf ← UnionFind(V)                       // see 1.4
    mst ← []

    sortedEdges ← sort(E by weight asc)     // O(E log E)

    for each (u, v, w) in sortedEdges:
        if Find(u) ≠ Find(v):               // no cycle
            Union(u, v)
            mst ← append(mst, (u, v, w))
            if |mst| == |V| - 1:
                break

    return mst
```

**Benchmarking Approach:**
- **Metric:** Time to compute MST, total tree weight (should equal theoretical min).
- **Dataset:** Full knowledge graph at various scales.
- **Compare:** Kruskal vs Prim vs Borůvka wall-clock.
- **Application metric:** Information retention — fraction of original edge weight sum preserved in MST.

---

### 1.6 Shortest Path

**Problem Statement:** Given source `s` and target `t` (or all-pairs), find the path minimizing total edge weight. Used for: computing relationship distances between concepts, knowledge graph navigation, centrality computations.

**Candidate Algorithms:**

| Algorithm | Description |
|---|---|
| **Dijkstra** | Non-negative weights, priority queue. Single-source. |
| **Bellman-Ford** | Supports negative weights, detects negative cycles. Single-source. |
| **Floyd-Warshall** | All-pairs shortest paths. DP over intermediate vertices. |
| **A\*** | Heuristic-guided Dijkstra. Requires admissible heuristic. |

**Tradeoff Analysis:**

| Dimension | Dijkstra | Bellman-Ford | Floyd-Warshall | A* |
|---|---|---|---|---|
| Time complexity | O(E + V log V) | O(V·E) | O(V³) | O(E) typical, O(V·E) worst |
| Space complexity | O(V) | O(V) | O(V²) | O(V) |
| Negative weights | No | Yes | Yes | No |
| All-pairs | Not suitable | Not suitable | Yes | Not suitable |
| Heuristic guidance | No | No | No | Yes |
| Implementation complexity | Low | Low | Low | Medium |
| Determinism | Deterministic | Deterministic | Deterministic | Deterministic |

**Recommendation:** Use **Dijkstra with a binary heap** for single-source/single-target queries (sufficient for most relationship-path use cases). Knowledge graph edge weights are non-negative (derived from semantic similarity). Precompute all-pairs distances only for graphs with |V| < 10³ using Floyd-Warshall; for larger graphs, use Dijkstra on-demand with memoization.

**Pseudocode (Dijkstra):**

```
function Dijkstra(G, source):
    V ← G.vertices
    dist ← [∞] * |V|; dist[source] ← 0
    prev ← [null] * |V|
    pq ← MinPriorityQueue()
    push(pq, (0, source))

    while pq not empty:
        (d, v) ← pop(pq)
        if d > dist[v]: continue            // stale entry

        for each (u, w) in neighbors(G, v):
            candidate ← dist[v] + w
            if candidate < dist[u]:
                dist[u] ← candidate
                prev[u] ← v
                push(pq, (candidate, u))

    return dist, prev

function ReconstructPath(prev, target):
    path ← []
    while target ≠ null:
        path ← prepend(path, target)
        target ← prev[target]
    return path
```

**Benchmarking Approach:**
- **Metric:** Query latency (p50/p99), memory for memoization cache.
- **Dataset:** Random concept pairs from knowledge graph.
- **Compare:** Cold query vs cached query latency.
- **Cache efficiency:** Hit rate with LRU cache of size `V/10`.

---

### 1.7 Maximum Flow / Min Cut

**Problem Statement:** Given a directed weighted graph with source `s` and sink `t`, find the maximum flow from `s` to `t` respecting edge capacities. The min-cut (minimum capacity edge set separating `s` and `t`) identifies critical knowledge boundaries — the weakest connections bridging two knowledge domains.

**Candidate Algorithms:**

| Algorithm | Description |
|---|---|
| **Ford-Fulkerson** | Augment along any s→t path (DFS). O(E·|f*|) where f* is max flow value. |
| **Edmonds-Karp** | Ford-Fulkerson with BFS (shortest augmenting path). O(V·E²). |
| **Dinic's** | Layered graph + blocking flow. O(V²·E) general, O(E·√V) for unit capacities. |
| **Push-Relabel** | Local push operations + global relabeling. O(V³) general, O(V²·√E) with FIFO. |

**Tradeoff Analysis:**

| Dimension | Ford-Fulkerson | Edmonds-Karp | Dinic's | Push-Relabel |
|---|---|---|---|---|
| Time complexity | O(E·|f*|) | O(V·E²) | O(V²·E) | O(V³) |
| Real-world performance | Poor | Poor on large | Excellent | Excellent |
| Parallelism | No | No | Limited | Yes (per-vertex pushes) |
| Implementation complexity | Low | Low | Medium | High |
| Memory | O(E) | O(E) | O(E) | O(E+V) |
| Unit-capacity advantage | No | No | O(E·√V) | O(V·√E) |

**Recommendation:** Use **Dinic's algorithm** for knowledge graphs where cut computation is needed. It offers the best balance of implementation complexity and real-world performance. The layered-graph approach maps naturally to the hierarchical structure of knowledge. Reserve Push-Relabel for extremely large graphs (>10⁶ edges) where parallelism is essential.

**Pseudocode (Dinic's):**

```
function DinicMaxFlow(G, s, t):
    // G stored as adjacency list with {to, rev, cap} edges
    flow ← 0
    N ← |G.vertices|

    function BFSLevel():
        level ← [-1] * N; level[s] ← 0
        q ← empty queue; enqueue(q, s)
        while q not empty:
            v ← dequeue(q)
            for each e in G[v]:
                if e.cap > 0 and level[e.to] < 0:
                    level[e.to] ← level[v] + 1
                    enqueue(q, e.to)
        return level[t] ≥ 0

    function DFSBlocking(v, t, f, it):
        if v == t: return f
        for i ← it[v] to len(G[v]) - 1:
            it[v] ← i
            e ← G[v][i]
            if e.cap > 0 and level[v] < level[e.to]:
                pushed ← DFSBlocking(e.to, t, min(f, e.cap), it)
                if pushed > 0:
                    e.cap -= pushed
                    G[e.to][e.rev].cap += pushed
                    return pushed
        return 0

    while BFSLevel():
        it ← [0] * N
        while true:
            pushed ← DFSBlocking(s, t, ∞, it)
            if pushed == 0: break
            flow += pushed

    return flow
```

**Benchmarking Approach:**
- **Metric:** Throughput (edges/second), total flow value correctness vs known baselines.
- **Dataset:** Synthetic graphs (grids, random, hierarchical) at various capacities.
- **Cut relevance:** For knowledge graphs, validate that min-cut edges indeed represent weak semantic boundaries (human evaluation on sample).
- **Compare:** Dinic vs Push-Relabel wall-clock on largest components.

---

## 2. Community Detection / Clustering

Community detection partitions the knowledge graph into cohesive groups (topics, themes, knowledge domains). These partitions drive topic modeling, navigation hierarchy, and visual layout.

### 2.1 Louvain Community Detection

**Problem Statement:** Find a partition of `V` into communities `C₁,...,Cₖ` that maximizes modularity `Q = 1/(2m) · Σᵢⱼ [Aᵢⱼ − γ·kᵢkⱼ/(2m)] · δ(cᵢ, cⱼ)`, where `A` is the adjacency matrix, `kᵢ` is node degree, `m` is total edge weight, `γ` is the resolution parameter, and `δ(cᵢ,cⱼ)=1` if nodes are in the same community.

**Algorithm Description:**
- Phase 1 (Local Optimization): Iterate over all nodes, greedily move each to the neighboring community yielding the maximum modularity gain ∆Q.
- Phase 2 (Aggregation): Build a new graph where each community becomes a node. Edge weights between meta-nodes equal sum of inter-community edge weights. Self-loops encode intra-community edges.
- Repeat until modularity no longer increases.

**Complexity:** O(n log n) typical, O(n²) worst-case per level. The number of levels is O(log n).

**Tradeoff Analysis:**

| Dimension | Louvain |
|---|---|
| Time complexity | O(n log n) typical |
| Space complexity | O(V+E) |
| Determinism | Non-deterministic (node ordering dependent) |
| Parallelism | Phase 1: synchronous parallel (color-based), Phase 2: sequential |
| Cache friendliness | Poor (random access by node neighborhood) |
| Resolution limit | Cannot detect communities smaller than ~√(m/2) |
| Quality | High on sparse graphs |
| Implementation complexity | Medium |

**Recommendation:** Use Louvain as the **default community detection method** for knowledge graphs with >10⁵ nodes. It is fast, produces high-quality partitions, and the resolution parameter γ allows tuning granularity. For graphs where community quality is critical and resolution limit is problematic, use Leiden (see §2.2).

**Pseudocode:**

```
function Louvain(G, γ=1.0):
    V ← G.vertices
    community ← {v: v for v in V}           // singleton communities
    m ← totalEdgeWeight(G)

    function ModularityGain(v, c):
        // ∆Q of moving isolated node v to community c
        Σin ← sum of weights of edges inside c
        Σtot ← sum of weights of incident edges to c
        kᵥ ← weighted degree of v
        kᵥ_in ← sum of weights of edges from v to c
        return (Σin + 2·kᵥ_in - γ·(Σtot + kᵥ)²/(2m))
             - (Σin - γ·Σtot²/(2m) - γ·kᵥ²/(2m))

    improve ← true
    while improve:
        improve ← false
        for each v in randomPermutation(V):
            bestC ← community[v]; bestGain ← 0
            for each neighbor u of v:
                c ← community[u]
                gain ← ModularityGain(v, c)
                if gain > bestGain:
                    bestGain ← gain; bestC ← c
            if bestC ≠ community[v]:
                community[v] ← bestC
                improve ← true

        if not improve:                      // Phase 2: aggregate
            G ← AggregateGraph(G, community)
            V ← G.vertices
            community ← {v: v for v in V}

    return community per original node
```

**Benchmarking Approach:**
- **Metric:** Final modularity Q, wall-clock time, number of levels, community size distribution.
- **Dataset:** Knowledge graph at multiple resolutions (γ = 0.5, 1.0, 2.0).
- **Compare:** Louvain vs Leiden vs Label Propagation on same graphs.
- **Stability metric:** Adjusted Rand Index (ARI) across 10 runs with different random seeds.

---

### 2.2 Leiden Algorithm

**Problem Statement:** Address Louvain's two known weaknesses: (1) disconnected communities (Louvain may move a node to a community it disconnects), and (2) poor quality on some graphs. Leiden guarantees connected communities and typically finds higher-modularity partitions.

**Key Improvements over Louvain:**
- **Fast local move:** Like Louvain Phase 1 but with early termination.
- **Refinement phase:** After aggregation, refine the partition by randomly merging sub-communities then locally optimizing. This step guarantees all communities are connected.
- **Aggregation:** Same as Louvain Phase 2.

**Complexity:** O(n log n) typical — same asymptotic complexity as Louvain, typically 2-3× slower per iteration but converges in fewer iterations.

**Tradeoff Analysis:**

| Dimension | Leiden vs Louvain |
|---|---|
| Community connectivity | Guaranteed connected communities |
| Modularity quality | Equal or better (typically +5-15%) |
| Speed | ~2× slower per iteration, fewer iterations overall |
| Determinism | Non-deterministic |
| Resolution limit | Still present (shared with Louvain) |
| Implementation complexity | Medium-High |

**Recommendation:** Use **Leiden** when community quality is critical and the runtime budget permits the overhead. For large graphs (>10⁶ nodes), start with Louvain as a fast first pass; refine critical communities with Leiden.

---

### 2.3 Label Propagation

**Problem Statement:** Assign each node the label that most of its neighbors have. Propagate until convergence. Simple, near-linear time baseline for community detection.

**Algorithm:**
1. Initialize each node with a unique label/community ID.
2. Each iteration: for each node `v`, set `label(v) = argmaxₗ Σ_{u∈N(v)} w(v,u) · δ(label(u), l)` (neighbor majority vote).
3. Stop when no label changes or max iterations reached.

**Complexity:** O(V+E) per iteration. Converges in O(log n) iterations typically, but can oscillate.

**Tradeoff Analysis:**

| Dimension | Label Propagation |
|---|---|
| Time complexity | O((V+E)·log n) typical |
| Space complexity | O(V) |
| Determinism | Strongly non-deterministic (ordering + tie-breaking) |
| Quality | Lower than Louvain/Leiden (no global objective) |
| Parallelism | Natural (synchronous updates) |
| Implementation complexity | Very low (~50 lines) |
| Oscillation | Can happen; break ties via smallest label |

**Recommendation:** Use as a **fast baseline** for community detection in streaming/online settings, or as a quick initialization for higher-quality algorithms. Not suitable as the primary method for the knowledge compiler.

---

### 2.4 InfoMap

**Problem Statement:** Find a partition that minimizes the **map equation** — the minimum description length of a random walk on the graph. Information-theoretic community detection. Communities are "modules" where a random walk tends to stay for long periods.

**Map Equation:** `L(M) = q↷ · H(Q) + Σᵢ pⁱ↻ · H(Pⁱ)` where `q↷` is the per-step probability of switching communities, `H(Q)` is the entropy of community entry rates, `pⁱ↻` is the probability of being in community `i`, and `H(Pⁱ)` is the entropy of node visit rates within community `i`.

**Complexity:** O(E) typical (fast). Uses a greedy search similar to Louvain but optimizing the map equation instead of modularity.

**Tradeoff Analysis:**

| Dimension | InfoMap |
|---|---|
| Objective | Information-theoretic (compression) |
| Resolution limit | Less pronounced than modularity-based |
| Small community detection | Superior to Louvain |
| Hierarchical output | Yes (built-in multi-level) |
| Speed | O(E), competitive with Louvain |
| Determinism | Non-deterministic |
| Implementation complexity | High (map equation computation tricky) |

**Recommendation:** Use InfoMap when **hierarchical community structure** is needed and the information-theoretic interpretation is valuable. It is the second-best choice after Louvain/Leiden for most knowledge graph tasks.

---

### 2.5 Spectral Clustering

**Problem Statement:** Partition nodes using the eigenvectors of the graph Laplacian `L = D − A`. The eigenvectors of the normalized Laplacian `L_norm = I − D⁻¹/² A D⁻¹/²` encode a low-dimensional embedding of the graph structure; k-means on the first `k` eigenvectors recovers clusters.

**Complexity:**
- Full eigendecomposition: O(n³)
- Approximation (Lanczos, randomized SVD): O(n² log n) or O(E·k·log n)

**Tradeoff Analysis:**

| Dimension | Spectral Clustering |
|---|---|
| Time complexity (exact) | O(n³) — prohibitive for large graphs |
| Time complexity (approx) | O(E·k·log n) — feasible |
| Space complexity | O(nk) for eigenvectors |
| Determinism | Non-deterministic (k-means) |
| Quality | High (theoretically grounded) |
| Cluster shape | Convex in embedding space only |
| Implementation complexity | High (numerical stability) |

**Recommendation:** Use only for **small subgraphs** (<10⁴ nodes) where high-quality partitions are needed, or as a **post-processing refinement** on communities found by Louvain. Not suitable as the primary method due to cubic complexity.

---

### 2.6 HDBSCAN

**Problem Statement:** Hierarchical density-based clustering that does not require specifying the number of clusters. Produces a hierarchy of clusters and can identify noise (unclustered points). Ideal for embedding spaces with uneven cluster sizes and densities.

**Algorithm:**
1. Compute mutual reachability distance: `d_mr(a,b) = max(core_k(a), core_k(b), d(a,b))`.
2. Build minimum spanning tree on the mutual reachability graph.
3. Build cluster hierarchy by iteratively merging edges (single-linkage).
4. Condense the hierarchy by requiring minimum cluster size.
5. Extract flat clustering by selecting clusters with maximal stability/excess of density.

**Complexity:** O(n log n) with kd-tree for low dimensions. O(n²) for high dimensions (>20). Requires nearest-neighbor precomputation.

**Tradeoff Analysis:**

| Dimension | HDBSCAN |
|---|---|
| Time complexity | O(n log n) (low-d), O(n²) (high-d) |
| Space complexity | O(n²) worst case (distance matrix), O(n·k) with NN |
| Number of clusters | Automatic |
| Noise handling | Explicit "noise" label |
| Parameter sensitivity | min_cluster_size, min_samples — intuitive |
| Varying density | Excellent (key strength) |
| High-dimensional | Degrades (curse of dimensionality) |
| Determinism | Non-deterministic (MST tie-breaking) |

**Recommendation:** Use HDBSCAN as the **primary clustering method for embedding spaces** (sentence embeddings, concept embeddings). It handles the uneven cluster sizes typical of knowledge graphs. For high-dimensional embeddings (>100D), precede with UMAP or PCA dimensionality reduction.

**Pseudocode:**

```
function HDBSCAN(X, min_cluster_size=5, min_samples=None):
    // X: n×d matrix of embeddings
    n ← len(X); min_samples ← min_samples or min_cluster_size

    // Step 1: Core distances
    core_dists ← [distance to min_samples-th nearest neighbor of xᵢ]

    // Step 2: Mutual reachability graph (sparse)
    MR ← sparse matrix(n, n)
    NN ← nearestNeighbors(X, k=min_samples + ⌈log n⌉)
    for each (i, j, d) in NN:
        MR[i,j] ← max(core_dists[i], core_dists[j], d)

    // Step 3: MST on mutual reachability graph
    mst ← PrimMST(MR)

    // Step 4: Build dendrogram from MST edge weights
    dendrogram ← sort(mst.edges by weight desc)
    clusters ← {{v} for v in 0..n-1}
    hierarchy ← []
    for each (u, v, w) in dendrogram:
        merged ← merge(clusters[u], clusters[v])
        hierarchy ← append(hierarchy, {merged: {children, level: w}})

    // Step 5: Condense hierarchy (remove clusters smaller than min_cluster_size)
    condensed ← CondenseHierarchy(hierarchy, min_cluster_size)

    // Step 6: Extract flat clustering by stability
    labels ← ExtractClusters(condensed)

    return labels                          // -1 for noise
```

**Benchmarking Approach:**
- **Metric:** Adjusted Rand Index (ARI) vs ground truth, silhouette score, number of noise points.
- **Dataset:** Embedding vectors from the knowledge graph (various dimensions: 384, 768, 1536).
- **Parameter sweep:** HDBSCAN min_cluster_size ∈ {3, 5, 10, 20}, min_samples ∈ {3, 5, 10}.
- **Compare:** HDBSCAN vs K-Means vs DBSCAN on same embeddings.

---

### 2.7 K-Means / K-Medoids

**Problem Statement:** Partition `n` points in `d`-dimensional space into `k` clusters minimizing within-cluster sum of squares (WCSS). Used primarily for embedding clustering and as a building block in spectral clustering.

**Variants:**
- **K-Means++:** Smart initialization (seeds based on squared distance).
- **Mini-Batch K-Means:** Stochastic optimization using mini-batches. ~2-10× faster on large datasets.
- **K-Medoids (PAM):** Use actual data points as centers (more robust to outliers). O(k·(n−k)²) — expensive.

**Complexity:** O(n·k·d·i) per run, where `i` is iterations to convergence.

| Dimension | K-Means | K-Means++ | Mini-Batch | K-Medoids |
|---|---|---|---|---|
| Time | O(nkdi) | O(nkdi) + O(nkd) init | O(nkdi / batch) | O(k·(n−k)²) |
| Outlier sensitivity | High | High | High | Low |
| Determinism | No | No | No | Near-deterministic |
| k selection | Elbow, silhouette, gap statistic | Same | Same | Same |

**Recommendation:** Use **Mini-Batch K-Means with K-Means++ initialization** for embedding clustering at scale (>10⁵ points). Use the **elbow method** (WCSS vs k) combined with **silhouette score** for k selection. The low outlier robustness is acceptable because knowledge graph embeddings generally cluster well.

**Pseudocode (Elbow Method):**

```
function OptimalK(X, k_min=2, k_max=min(50, √n)):
    inertias ← []
    for k in k_min..k_max:
        centroids, labels ← KMeans(X, k)
        inertias[k] ← WCSS(X, centroids, labels)

    // Find elbow: point of maximum curvature
    // Option A: difference method
    diffs ← [inertias[i] - inertias[i+1] for i in k_min..k_max-1]
    elbow ← k_min + argmax(diffs)

    // Option B: gap statistic (recommended, more robust)
    // Requires comparing against uniform null distribution

    return elbow
```

**Benchmarking Approach:**
- **Metric:** Inertia (WCSS), silhouette score, wall-clock time, ARI vs HDBSCAN.
- **Track:** Distortion curve and elbow location stability across random seeds.

---

### 2.8 Agglomerative Hierarchical Clustering

**Problem Statement:** Build a binary hierarchy (dendrogram) of clusters by recursively merging the closest pair. Used for concept hierarchy generation — producing a taxonomy of knowledge topics from the bottom up.

**Linkage Criteria:**
- **Ward:** Minimize within-cluster variance. O(n² log n) with nearest-neighbor chain.
- **Complete:** Maximum pairwise distance. Sensitive to outliers.
- **Average:** Mean pairwise distance. Balanced.
- **Single:** Minimum pairwise distance. Produces long, chain-like clusters.

**Complexity:** O(n² log n) with nearest-neighbor chain (Ward), O(n³) naively. O(n²) memory for distance matrix.

**Tradeoff Analysis:**

| Dimension | Hierarchical Clustering |
|---|---|
| Time complexity | O(n² log n) — limits to n < 10⁵ |
| Space complexity | O(n²) (distance matrix) or O(n·k) (with NN approximation) |
| Hierarchy | Yes (built-in) |
| Determinism | Deterministic (with tie-breaking) |
| k selection | Cut dendrogram at threshold |
| Interpretability | Excellent (dendrogram) |
| Scalability | Poor beyond 100K points |

**Recommendation:** Use for **concept hierarchy generation** on small to medium-sized knowledge subgraphs (n < 10⁴). Combine with Louvain communities as the initial partition, then hierarchically cluster community centroids. Use **Ward linkage** with the **nearest-neighbor chain algorithm** for O(n² log n) performance.

---

### 2.9 Gaussian Mixture Models (GMM)

**Problem Statement:** Model the data as a mixture of `k` Gaussian distributions. Soft clustering: each point has a probability of belonging to each cluster. Estimated via Expectation-Maximization (EM).

**Complexity:** O(n·k·d·i) per EM iteration.

| Dimension | GMM |
|---|---|
| Cluster shape | Ellipsoidal (general covariance) |
| Soft assignments | Yes |
| Model selection | AIC / BIC |
| Determinism | Non-deterministic (initialization) |
| Outlier handling | Limited (Gaussian tails) |
| High-dimensional | Degrades (covariance estimation) |

**Recommendation:** Use GMM when **soft assignments** are needed — for example, assigning a concept to multiple topics with different probabilities. Prefer diagonal or tied covariance for higher dimensions. Use **BIC** for model selection: `BIC = −2·ln(L) + k·ln(n)`.

---

### 2.10 DBSCAN

**Problem Statement:** Density-based clustering: points in dense regions form clusters; points in sparse regions are noise. Defined by two parameters: `ε` (neighborhood radius) and `minPts` (minimum points for a dense region).

**Complexity:** O(n log n) with kd-tree (low dimensions). O(n²) without spatial index.

**Tradeoff Analysis:**

| Dimension | DBSCAN vs HDBSCAN |
|---|---|
| Parameters | ε, minPts — ε is hard to tune | min_cluster_size, min_samples — more intuitive |
| Varying density | Poor (fixed ε) | Excellent (adaptive) |
| Hierarchy | No | Yes (HDBSCAN) |
| Noise detection | Yes | Yes (better) |
| Implementation | Simpler | More complex |

**Recommendation:** Prefer **HDBSCAN** over DBSCAN in all cases. DBSCAN's fixed ε parameter is impractical for knowledge graphs where density varies across topic clusters. Only use DBSCAN when computational resources are extremely constrained and the graph dimension is low.

---

## 3. Topic Modeling

Topic modeling discovers latent semantic themes across a document collection. In the Knowledge Compiler, topics provide the high-level organizational structure for navigation, search faceting, and cross-document connections.

### 3.1 Latent Dirichlet Allocation (LDA)

**Problem Statement:** Model each document as a mixture of `k` topics, where each topic is a distribution over words. Given a corpus of `D` documents and vocabulary of `W` words, learn the topic-word distribution `φ₁..ₖ` and document-topic distribution `θ₁..ᴰ` that best explain the observed word counts.

**Complexity:** O(D·k·L·i) per iteration where `L` is average document length, `i` is iterations.

**Variants:**

| Variant | Description |
|---|---|
| **Standard LDA (Collapsed Gibbs)** | Gibbs sampling over latent topic assignments. Simple, accurate, but sequential. |
| **Online LDA (Blei-Hoffman)** | Variational Bayes with stochastic optimization. Scales to millions of documents. |
| **Correlated Topic Model (CTM)** | Topics can correlate (logistic normal prior). Better for correlated themes. |
| **Structural Topic Model (STM)** | Accounts for document metadata. |

**Tradeoff Analysis:**

| Dimension | Collapsed Gibbs LDA | Online LDA (VB) | CTM | STM |
|---|---|---|---|---|
| Time complexity | O(D·k·L·i) | O(D·k·L·i / batch) | O(D·k²·L·i) | O(D·k·L·i + metadata) |
| Scalability | Limited (full corpus) | Excellent (streaming) | Poor | Medium |
| Topic correlation | No | No | Yes | Yes |
| Determinism | No | No | No | No |
| Implementation | High | High | Very high | High |
| Quality | Good | Good | Better on correlated data | Context-aware |

**Recommendation:** Use **Online LDA (variational Bayes)** for the knowledge compiler. It scales to large document collections, supports incremental updates, and the streaming nature fits the compiler's pipeline architecture. Reserve **Correlated Topic Model** for analyses where topic correlation is known to be important (e.g., interdisciplinary knowledge graphs).

**Pseudocode (Online LDA — Variational Bayes):**

```
function OnlineLDA(corpus, k, α=1/k, η=1/k, κ=0.7, τ₀=1024, batchSize=256):
    // k: number of topics
    // α: document-topic Dirichlet prior
    // η: topic-word Dirichlet prior
    // κ, τ₀: learning rate parameters

    W ← vocabulary size
    λ ← [η] * (k × W)                       // topic-word variational parameters
    Dtotal ← total documents

    while not converged:
        batch ← sample(corpus, batchSize)
        D ← |batch|

        // E-step: optimize local variational parameters
        θ ← [Dirichlet(α)] * D              // document-topic proportions
        for each doc d in batch:
            for t ← 1 to T_inner (e.g., 50):
                for each word w in doc d:
                    φ_dw[t] ∝ θ[d][t] · λ[t][w]

        // M-step: update global topic-word parameters
        λ̃ ← η + (Dtotal/D) · Σ_d Σ_w φ_dw    // sufficient statistics
        ρ ← (τ₀ + t)^(-κ)                   // learning rate
        λ ← (1−ρ)·λ + ρ·λ̃

    return λ                                 // topic-word distributions
```

**Benchmarking Approach:**
- **Metric:** Perplexity (held-out), topic coherence (C_V or NPMI), training time.
- **Dataset:** Document corpus from the knowledge graph.
- **Parameter sweep:** k ∈ {10, 25, 50, 100, 200}.
- **Track:** Convergence rate (perplexity over iterations), topic stability across runs.
- **Target:** NPMI > 0.10 for interpretable topics.

---

### 3.2 Non-Negative Matrix Factorization (NMF)

**Problem Statement:** Factor a non-negative term-document matrix `X ∈ ℝ⁺^{W×D}` into `W × H` where `W ∈ ℝ⁺^{W×k}` (topic-word matrix) and `H ∈ ℝ⁺^{k×D}` (document-topic matrix). Both factors are non-negative, enforcing additive parts-based representation.

**Complexity:** O(W·D·k·i) per iteration.

**Variants:**

| Variant | Description |
|---|---|
| **Multiplicative Update (MU)** | Standard NMF, guaranteed convergence. |
| **Coordinate Descent (CD)** | Faster convergence per iteration. |
| **Projected Gradient (PG)** | Handles constraints flexibly. |
| **HALS (Hierarchical ALS)** | State-of-the-art for dense NMF. |

**Tradeoff Analysis:**

| Dimension | NMF (MU) | NMF (CD) | LDA |
|---|---|---|---|
| Determinism | Deterministic (with seed) | Deterministic | Non-deterministic |
| Quality on short text | Good | Good | Worse than LDA |
| Quality on long text | Good | Good | Better |
| Implementation | Low | Medium | High |
| Speed | Fast | Fast | Slower |
| Topic interpretability | Excellent | Excellent | Good |
| Probabilistic interpretation | No | No | Yes |

**Recommendation:** Use **NMF with Coordinate Descent** as the primary topic modeling method when **determinism** is required (reproducible builds) and interpretability is paramount. NMF consistently produces more coherent and sparser topics than LDA. For the compiler's deterministic pipeline, NMF with a fixed random seed is the default choice.

**Pseudocode (NMF — Multiplicative Updates):**

```
function NMF(X, k, maxIter=200, tol=1e-4):
    // X: term-document matrix (W × D)
    W ← rand(W, k); H ← rand(k, D)          // initialize non-negative

    for iter ← 1 to maxIter:
        // Update H: H ← H ⊙ (Wᵀ·X) ⊘ (Wᵀ·W·H + ε)
        H ← H .* (W' * X) ./ (W' * W * H + 1e-10)

        // Update W: W ← W ⊙ (X·Hᵀ) ⊘ (W·H·Hᵀ + ε)
        W ← W .* (X * H') ./ (W * H * H' + 1e-10)

        // Normalize W to unit L2 norm per topic
        W ← normalize(W, axis=0)

        // Check convergence
        reconstruction ← ||X - W·H||_Fro
        if reconstruction < tol:
            break

    return W, H                              // W: topics × words, H: docs × topics
```

**Benchmarking Approach:**
- **Metric:** Reconstruction error (Frobenius norm), topic coherence (NPMI), sparsity.
- **Compare:** NMF vs LDA via topic coherence and human rating of topic interpretability.
- **Track:** NMF initialization sensitivity — run with multiple seeds, compute topic stability.

---

### 3.3 BERTopic

**Problem Statement:** Use transformer-based sentence embeddings to cluster documents and generate topic representations. State-of-the-art for short text and mixed-length documents. Pipeline: embed → reduce dimensionality (UMAP) → cluster (HDBSCAN) → topic representation (c-TF-IDF).

**Pipeline:**
1. **Embed:** Compute sentence/document embeddings (Sentence-BERT, all-MiniLM-L6-v2).
2. **Reduce:** UMAP to 5-10 dimensions (preserves local structure).
3. **Cluster:** HDBSCAN (produces noisy/unclustered points; large clusters = broad topics, small clusters = niche topics).
4. **Topic representation:** c-TF-IDF within each cluster — extract top words per class.
5. **Topic reduction:** Merge similar topics via hierarchical c-TF-IDF.

**Complexity:** O(n·d + n log n) — dominated by embedding and UMAP.

**Tradeoff Analysis:**

| Dimension | BERTopic | LDA | NMF |
|---|---|---|---|
| Document length | Any (best short text) | Best on long text | Any |
| Number of topics | Automatic (HDBSCAN) | Manual (k) | Manual (k) |
| Outlier handling | Explicit (noise label) | Soft assignment | Hard assignment |
| Embedding quality | Transformer-based | Bag-of-words | Bag-of-words |
| Hierarchical | Yes (built-in) | With CTM extension | No |
| Interpretability | c-TF-IDF words | Topic-word dist | Topic-word weights |
| Computational cost | High (transformers) | Medium | Low |
| Determinism | No (UMAP + HDBSCAN) | No | Yes (with fixed seed) |

**Recommendation:** Use BERTopic for **exploratory topic modeling** and initial knowledge graph construction, where its automatic topic discovery and hierarchy generation are valuable. The lack of determinism makes it unsuitable for production builds that require reproducibility. Use NMF for the deterministic artifact pipeline and BERTopic for the interactive exploration UI.

---

### 3.4 Top2Vec

**Problem Statement:** Learn joint embeddings of documents and words in a unified semantic space, then cluster documents to discover topics. Produces topic-size-ranked output with hierarchical structure.

**Mechanism:**
1. Train Doc2Vec or use pre-trained sentence embeddings.
2. Create a joint embedding space by averaging document embeddings for similar words.
3. Cluster document embeddings (HDBSCAN).
4. For each cluster: find centroid word (highest density in embedding space) as topic label.

**Complexity:** Embedding generation O(n·d), clustering O(n log n).

**Recommendation:** Top2Vec is an alternative to BERTopic with similar characteristics but generally lower topic quality. Prefer BERTopic unless Doc2Vec embeddings are specifically needed.

---

## 4. Embedding & Similarity

Embeddings vectorize text, concepts, and entire documents into dense representations. Similarity computation drives graph edge construction, search ranking, and semantic deduplication.

### 4.1 Cosine Similarity Matrix

**Problem Statement:** Given a set of `n` embedding vectors each of dimension `d`, compute all pairwise cosine similarities: `S[i][j] = (xᵢ·xⱼ) / (‖xᵢ‖·‖xⱼ‖)`.

**Candidates:**

| Approach | Description |
|---|---|
| **Full Dense Computation** | Compute all pairs O(n²·d). Store O(n²) matrix. |
| **Batched Computation** | Partition into chunks, compute chunk-to-chunk dot products. Reduces peak memory. |
| **Approximate Methods** | ANN indexes (HNSW, IVF) to find only top-k similarities. |

**Tradeoff Analysis:**

| Dimension | Full Dense | Batched | Approximate (ANN) |
|---|---|---|---|
| Time complexity | O(n²·d) | O(n²·d) | O(n·(log n + d)) for top-k |
| Space complexity | O(n²) floats | O(n · batchSize) | O(n·d) + index |
| Determinism | Exact | Exact | Non-deterministic |
| Full pairwise matrix | Yes | Yes | No (top-k only) |
| Parallelism | Matrix multiply (BLAS) | Yes | Limited |
| Implementation complexity | Low (torch.matmul) | Low | Medium-High |

**Recommendation:** Use **batched cosine similarity** with L2-normalized embeddings. Normalize once: `x̂ = x / ‖x‖₂`, then `S[i][j] = x̂ᵢ·x̂ⱼ = sum(x̂ᵢ * x̂ⱼ, axis=-1)`. Use large batches (500-2000) to balance memory and BLAS efficiency. For top-k nearest neighbors (not full matrix), use **HNSW (§4.2)**.

**Pseudocode (Batched Cosine Similarity):**

```
function BatchedCosineSimilarity(X, batchSize=1024):
    // X: n × d matrix
    // Normalize rows to unit L2
    X_norm ← X / ||X||₂ (row-wise)
    n ← len(X_norm)
    S ← empty matrix (n × n)                // can be sparse for top-k

    for i in range(0, n, batchSize):
        batch_i ← X_norm[i:i+batchSize]
        for j in range(i, n, batchSize):
            batch_j ← X_norm[j:j+batchSize]
            block ← batch_i @ batch_j.T     // matrix multiply
            S[i:i+batchSize, j:j+batchSize] ← block
            S[j:j+batchSize, i:i+batchSize] ← block.T  // symmetric

    return S
```

**Benchmarking Approach:**
- **Metric:** Throughput (pairs/second), peak memory.

- **Dataset:** Embedding matrices at various sizes (n=10³, 10⁴, 10⁵; d=384, 768, 1536).
- **Track:** BLAS utilization (FLOPs), memory bandwidth saturation.
- **Target:** >10⁹ pairs/second on GPU, >10⁷ pairs/second on CPU with MKL/OpenBLAS.

---

### 4.2 Approximate Nearest Neighbor (ANN)

**Problem Statement:** Given `n` vectors and a query `q`, find `k` vectors closest to `q` by cosine (or inner product) distance without computing all pairs.

**Candidate Index Structures:**

| Index | Description |
|---|---|
| **HNSW (Hierarchical Navigable Small World)** | Multi-layer graph index. Each layer is a subset of nodes; search starts at the top layer. O(log n) typical. |
| **IVF (Inverted File)** | Cluster centroids (K-Means), search only nearest clusters. O(n_probe · (n/nlist)). |
| **LSH (Locality-Sensitive Hashing)** | Hash vectors into buckets; collisions likely for similar vectors. |
| **ANNOY (Approximate Nearest Neighbors Oh Yeah)** | Build a forest of random projection trees. |
| **ScaNN (Scalable Nearest Neighbors)** | Google's anisotropic quantization + score-aware reordering. |
| **FAISS** | Meta's library. Combines IVF + HNSW + PQ. Production-grade. |

**Tradeoff Analysis:**

| Dimension | HNSW | IVF (Flat) | LSH | ANNOY | ScaNN | FAISS (IVF+HNSW+PQ) |
|---|---|---|---|---|---|---|
| Recall@10 | 0.99+ | 0.95 | 0.70-0.90 | 0.90 | 0.98+ | 0.98+ |
| Build time | O(n log n) | O(n·k·d·i) | O(n·d) | O(n·log n·d) | O(n·d) | O(n·k·d·i + n log n) |
| Query time | O(log n) | O(n_probe · d) | O(d) | O(log n) | O(d + n_probe) | O(log n + n_probe·d) |
| Memory | O(n·d) + 2n·avgDegree | O(n·d + nlist·d) | O(n·d) | O(n·d) | O(n·d) | O(n·d) + PQ codes |
| Determinism | No | No (K-Means) | No | No | No | No |
| Parameter tuning | efConstruction, M | nlist, nprobe | n_hashes, n_tables | n_trees | — | Many |
| Implementation complexity | Medium | Low (with FAISS) | Low | Low | Medium | Medium |

**Recommendation:** Use **HNSW via the `hnswlib` or FAISS library** for the knowledge compiler's static embedding index. HNSW offers the best recall/speed tradeoff for static datasets (no deletions). The index builds once and is queried many times during compilation. Parameters: `M=16` (neighbors per node), `efConstruction=200` (high build quality), `efSearch=100` (search depth). For very large datasets (>10⁷ vectors), use FAISS with IVF+HNSW+Product Quantization (IVF4096_HNSW32_PQ8).

**Pseudocode (HNSW Search):**

```
function HNSWSearch(hnsw, query, k, ef=100):
    // hnsw: built HNSW index with layers 0..L
    // query: d-dimensional query vector
    // ef: search breadth parameter

    // Begin at top layer
    enter ← hnsw.entryPoint
    currDist ← dist(query, enter)

    for layer ← hnsw.maxLayer down to 1:
        // Greedy traversal to find closest node in current layer
        changed ← true
        while changed:
            changed ← false
            for each neighbor of enter in layer l:
                d ← dist(query, neighbor)
                if d < currDist:
                    currDist ← d; enter ← neighbor; changed ← true

    // Layer 0: beam search with ef neighbors
    candidates ← MinPriorityQueue()
    visited ← Set()
    result ← MaxPriorityQueue()

    push(candidates, (currDist, enter))
    mark visited(enter)

    while candidates not empty:
        (d, v) ← pop(candidates)
        worstDist ← result.size < k ? ∞ : result.peek().dist
        if d > worstDist: break

        for each neighbor u of v in layer 0:
            if u not in visited:
                mark visited(u)
                d_u ← dist(query, u)
                if result.size < k or d_u < result.peek().dist:
                    push(candidates, (d_u, u))
                    push(result, (d_u, u))
                    if result.size > k: pop(result)
                    if candidates.size > ef:
                        pop(candidates)   // trim to ef

    return result                          // top-k nearest neighbors
```

**Benchmarking Approach:**
- **Metric:** Recall@k (vs brute-force), queries/second (QPS), index build time, memory footprint.
- **Dataset:** Embedding vectors at multiple scales (10³, 10⁴, 10⁵, 10⁶).
- **Target:** Recall@10 > 0.99 with QPS > 10⁴ for 10⁶ vectors.
- **Track:** efSearch sensitivity — plot recall vs QPS curve.

---

### 4.3 SVD / PCA

**Problem Statement:** Reduce `n` vectors from dimension `d` to dimension `k << d` while preserving maximum variance. Used for embedding visualization (2D/3D projection) and denoising.

**Approach:** Compute top-`k` singular vectors of the data matrix `X` (centered). Projection: `X_reduced = X · V_k` where `V_k` are the top-`k` right singular vectors.

**Complexity:**
- Truncated SVD: O(n·d·k) via randomized SVD.
- Full SVD: O(min(n·d², n²·d)).
- Power iteration: O(n·d·k·i).

**Tradeoff Analysis:**

| Dimension | Randomized SVD | Full SVD | Incremental SVD |
|---|---|---|---|
| Time complexity | O(n·d·k + n·k²) | O(min(n·d², n²·d)) | O(n·d·k) per update |
| Space complexity | O(n·k + d·k) | O(n·d + n²) | O(n·k + d·k) |
| Determinism | Non-deterministic | Deterministic | Deterministic |
| Parallelism | Yes (matrix mult) | Limited | Sequential |
| Accuracy | ≈ Exact (with oversampling) | Exact | Good (with reorthonormalization) |

**Recommendation:** Use **Randomized SVD** (the Halko-Martinsson-Tropp algorithm) with oversampling `p = k + 20` and one power iteration. This is the standard choice for large-scale dimensionality reduction in the compiler. For the visualization pipeline (UMAP/t-SNE input), reduce to `k = min(50, d/2)`.

**Pseudocode (Randomized SVD):**

```
function RandomizedSVD(X, k, p=20, q=2):
    // X: n × d matrix
    // k: target rank
    // p: oversampling parameter
    // q: number of power iterations

    // Step 1: Random projection
    Ω ← randn(d, k + p)                    // random test matrix
    Y ← X @ Ω                              // sketch: n × (k+p)

    // Step 2: Power iteration (improves accuracy for fast-decaying tails)
    for i ← 1 to q:
        Y ← X @ (X.T @ Y)                  // Y = (XXᵀ)ᵝY

    // Step 3: Orthonormalize Y
    Q ← QR(Y)                              // Q: n × (k+p)

    // Step 4: Project and SVD the small matrix
    B ← Q.T @ X                            // B: (k+p) × d
    Û, Σ, V ← SVD(B)                       // full SVD of small matrix

    // Step 5: Truncate to rank k
    U ← Q @ Û[:, :k]                       // left singular vectors
    Σ ← Σ[:k]                              // singular values
    V ← V[:k, :]                            // right singular vectors

    return U, Σ, V
```

**Benchmarking Approach:**
- **Metric:** Explained variance ratio (Σ² / Σ²_total), wall-clock time, reconstruction error.
- **Dataset:** Embedding matrices with various rank profiles.
- **Compare:** Randomized SVD vs exact SVD (using `numpy.linalg.svd`) for accuracy and speed.
- **Target:** Explained variance > 90% with k = min(50, d/2).

---

### 4.4 t-SNE

**Problem Statement:** Embed high-dimensional data into 2D or 3D for visualization while preserving local neighborhood structure. Uses a heavy-tailed Student-t distribution in the embedding space to mitigate crowding.

**Mechanism:**
1. Compute pairwise similarities in high-D: `pⱼ|ᵢ ∝ exp(−‖xᵢ−xⱼ‖² / 2σᵢ²)`.
2. Compute pairwise similarities in low-D: `qᵢⱼ ∝ (1 + ‖yᵢ−yⱼ‖²)⁻¹`.
3. Minimize KL divergence between P and Q via gradient descent.

**Complexity:**
- Exact: O(n²) per iteration (pairwise distance matrix).
- Barnes-Hut approximation: O(n log n) per iteration.

**Tradeoff Analysis:**

| Dimension | t-SNE (Exact) | t-SNE (Barnes-Hut) |
|---|---|---|
| Time complexity | O(n²·i) | O(n log n · i) |
| Space complexity | O(n²) | O(n) |
| Perplexity tuning | Essential (5-50) | Essential |
| Global structure | Poor (preserves local only) | Poor |
| Determinism | No | No |
| Out-of-sample embedding | No (parametric variants exist) | No |

**Recommendation:** Use **Barnes-Hut t-SNE** with `perplexity = min(30, n/5)` for visualization of up to 10⁵ points. For larger datasets (>10⁵), use UMAP (faster, better global structure). t-SNE's inability to embed out-of-sample points is acceptable for static visualization artifacts.

---

### 4.5 UMAP

**Problem Statement:** Like t-SNE but optimized for speed, global structure preservation, and out-of-sample embedding. Builds a fuzzy simplicial set representation of the high-D data, then optimizes a low-D embedding.

**Mechanism:**
1. Build k-NN graph (HNSW or ANNOY).
2. Compute fuzzy simplicial set (local connectivity probabilities).
3. Optimize low-D embedding via cross-entropy minimization (Stochastic Gradient Descent).

**Complexity:** O(n log n) — dominated by k-NN construction.

**Tradeoff Analysis:**

| Dimension | UMAP | t-SNE (Barnes-Hut) |
|---|---|---|
| Time complexity | O(n log n) | O(n log n) |
| Global structure | Good | Poor |
| Scalability | 10⁶+ points | 10⁵ points |
| Out-of-sample | Yes (parametric UMAP) | No |
| Determinism | No | No |
| Parameters | n_neighbors, min_dist | perplexity |
| Implementation complexity | High | Medium |

**Recommendation:** Use **UMAP** as the default embedding visualization algorithm. It is faster than t-SNE, preserves more global structure, and handles larger datasets. Parameters: `n_neighbors = 15` (balance local/global), `min_dist = 0.1` (tightness of clustering in embedding). For the compaction step (preceding HDBSCAN in BERTopic), use UMAP to reduce to 5-10 dimensions.

---

### 4.6 Sentence Embedding Aggregation

**Problem Statement:** Given a sequence of token embeddings (from a transformer), produce a single fixed-length sentence/document vector.

**Candidate Strategies:**

| Strategy | Description |
|---|---|
| **Mean Pooling (Token Averaging)** | Average all token vectors. Simple, effective. |
| **Weighted Pooling (SIF/SIFRank)** | Weight each token by inverse corpus frequency (SIF). Down-weights common tokens. |
| **Attention Pooling** | Learnable attention weights per token. Requires fine-tuning. |
| **CLS Token** | Use the [CLS] token representation (BERT). Weak for standalone use. |
| **Weighted Mean + Layer-wise** | Concatenate last 4 hidden layers, then mean pool. Improves quality. |

**Tradeoff Analysis:**

| Dimension | Mean | SIF-Weighted | Attention | CLS | Layer-wise Mean |
|---|---|---|---|---|---|
| Quality (STS-B) | 0.78 | 0.79 | 0.80+ | 0.55 | 0.81 |
| Complexity | O(1) | O(n) per doc | O(n·d) | O(1) | O(1) |
| Training | None | None | Required | None | None |
| Interpretability | Low | Medium | Medium | Low | Low |
| Determinism | Deterministic | Deterministic | Deterministic | Deterministic | Deterministic |

**Recommendation:** Use **layer-wise mean pooling of the last 4 layers** of the sentence transformer. This is the standard approach used by Sentence-BERT and consistently achieves the best performance on semantic textual similarity tasks without fine-tuning. For maximum efficiency, use **mean pooling** (acceptable quality with 2× speedup).

---

### 4.7 Cross-Encoder Reranking

**Problem Statement:** Given a list of candidate (query, document) pairs from an embedding-based retrieval step, refine their relevance scores using a more expensive but more accurate model that processes pairs jointly.

**Algorithm:** For each (query, doc) pair, feed `[CLS] query [SEP] doc [SEP]` into a BERT-based cross-encoder; use the `[CLS]` projection as the relevance score.

**Complexity:** O(k·d·L) where `k` is the number of candidates to rerank (typically 10-100), `d` is model dimension, `L` is sequence length.

**Recommendation:** Use cross-encoder reranking only as a **refinement stage** after embedding-based retrieval. Apply to the top-`k` = 50 candidates from the ANN index. Use a lightweight cross-encoder (e.g., `cross-encoder/ms-marco-MiniLM-L-6-v2`) for a 2-3× quality improvement over cosine similarity alone.

---

## 5. Natural Language Processing

NLP pipelines extract structured knowledge from raw document text. These algorithms operate early in the compiler pipeline, transforming markup into typed entities, relationships, and semantic chunks.

### 5.1 Named Entity Recognition (NER)

**Problem Statement:** Identify and classify named entities (persons, organizations, locations, concepts, etc.) in document text. NER outputs feed directly into knowledge graph node creation.

**Candidate Systems:**

| System | Description |
|---|---|
| **spaCy** | Fast, CNN/transformer-based. Pre-trained models for many languages. Integration-friendly. |
| **HuggingFace Transformers (BERT-based)** | Fine-tuned NER models (e.g., dslim/bert-base-NER). Higher accuracy, slower. |
| **GLiNER** | Zero-shot NER using bidirectional language models. Detects arbitrary entity types. |
| **NLTK** | Rule-based (MaxEnt, regular expressions). Low accuracy, no maintenance. |

**Tradeoff Analysis:**

| Dimension | spaCy (en_core_web_trf) | Transformers (BERT-NER) | GLiNER | NLTK |
|---|---|---|---|---|
| F1 Score (CoNLL-03) | 0.90+ | 0.92+ | 0.75 | 0.60 |
| Speed (tokens/sec, CPU) | 10⁴ | 10³ | 5×10³ | 10⁵ |
| Custom entity types | Via training | Via fine-tuning | Zero-shot | Via rules |
| Multi-language | Many models | Many models | Yes | Limited |
| Pipeline integration | Excellent (Document API) | Standard (HF pipeline) | Good | Poor |
| Dependency size | 200MB | 500MB+ | 100MB | Minimal |

**Recommendation:** Use **spaCy's transformer pipeline** (`en_core_web_trf`) for the production NER stage. It offers the best speed/accuracy tradeoff and integrates naturally with the compiler's document processing pipeline. For **custom entity types** (e.g., technical domain concepts), use GLiNER in zero-shot mode. BERT-transformers only when maximum accuracy is required and throughput can be sacrificed.

**Pseudocode (NER Pipeline):**

```
function ExtractEntities(docText, nlp):
    // nlp: loaded spaCy model
    doc ← nlp(docText)

    entities ← []
    for ent in doc.ents:
        entities ← append(entities, {
            text: ent.text,
            label: ent.label_,
            start: ent.start_char,
            end: ent.end_char,
            confidence: ent._.confidence or 1.0
        })

    // Deduplicate overlapping entities (keep longest)
    entities ← DeduplicateOverlaps(entities)

    // Normalize entity labels to compiler ontology
    entities ← MapToKnowledgeTypes(entities)

    return entities
```

**Benchmarking Approach:**
- **Metric:** Precision/Recall/F1 on held-out documents, throughput (docs/second), memory usage.
- **Dataset:** Manually annotated subset of documents (target: 100+ documents).
- **Compare:** spaCy (trf vs sm/lg), Transformers, GLiNER.
- **Track:** Entity type distribution, false positive rate for each entity type.

---

### 5.2 Keyword Extraction

**Problem Statement:** Extract representative keywords or keyphrases from documents. Keywords feed into topic assignment, search indexing, and concept node labeling.

**Candidate Algorithms:**

| Algorithm | Description |
|---|---|
| **TF-IDF** | Classical term weighting. Rank by TF-IDF score. Requires corpus-level IDF. |
| **TextRank** | Graph-based ranking (PageRank on word co-occurrence graph). Unsupervised. |
| **RAKE (Rapid Automatic Keyword Extraction)** | Split text on stopwords/punctuation. Score phrases by word frequency/degree. |
| **YAKE!** | Statistical unsupervised: casing, position, frequency, context, dispersion. |
| **KeyBERT** | BERT embeddings + cosine similarity to document embedding. Extract most similar words. |
| **Embedding-based (Centroid)** | Embed all candidate phrases, compute centroid, rank by distance to centroid. |

**Tradeoff Analysis:**

| Dimension | TF-IDF | TextRank | RAKE | YAKE! | KeyBERT |
|---|---|---|---|---|---|
| F1 (Inspec dataset) | 0.35 | 0.40 | 0.32 | 0.42 | 0.45 |
| Speed | Very fast | Fast | Very fast | Fast | Slow (embedding) |
| Unsupervised | Yes | Yes | Yes | Yes | Yes |
| Multi-word keywords | No | Yes (phrases) | Yes | Yes | Yes |
| Determinism | Deterministic | Deterministic | Deterministic | Deterministic | Non-deterministic |
| Implementation complexity | Low | Medium | Low | Low | Medium |

**Recommendation:** Use **YAKE!** as the default keyword extraction method. It is unsupervised, deterministic, fast, and produces high-quality multi-word keyphrases without external resources. Supplement with **KeyBERT** for extractive keyphrase quality when computational budget permits — use it to rerank the top-20 YAKE! candidates.

**Pseudocode (YAKE!):**

```
function YakeExtract(docText, language="en", n=10, dedupLim=0.9, windowsSize=3):
    // Preprocess: tokenize, lowercase, filter stopwords/punctuation
    tokens ← Tokenize(docText)
    terms ← []                             // n-gram candidate terms (1 to 3-grams)

    // Score each candidate using 5 features:
    // F1: casing (upper case → more important)
    // F2: word position (first occurrence position → more important early)
    // F3: word frequency (normalized)
    // F4: word relatedness to context (spread across document)
    // F5: word different sentence occurrence
    // Combined score: S = (F2 * F4) / (F1 + F3 + F5)

    scores ← {}
    for each candidate term t in terms:
        scores[t] ← CombineFeatures(t, docText, windowsSize)

    // Lower score = more important
    ranked ← sort(scores by value asc)

    // Deduplicate: remove subsumed phrases
    final ← []
    for t in ranked:
        if not contains(t, final, threshold=dedupLim):
            final ← append(final, t)
        if |final| == n: break

    return final
```

**Benchmarking Approach:**
- **Metric:** Keyword precision@k, recall@k, F1@k, wall-clock time per document.
- **Dataset:** Documents with manually annotated keywords (target: 200+ documents).
- **Compare:** YAKE! vs TextRank vs KeyBERT vs TF-IDF.

---

### 5.3 Summarization

**Problem Statement:** Generate a concise summary of a document (or section) preserving key information. Used for: node descriptions, search snippets, and knowledge graph card previews.

**Candidates:**

| System | Type | Description |
|---|---|---|
| **TextRank** | Extractive | Rank sentences by similarity to document centroid. Top-k sentences. |
| **BART (facebook/bart-large-cnn)** | Abstractive | Seq2seq transformer. Fine-tuned on CNN/DailyMail. |
| **T5 (google/flan-t5-large)** | Abstractive | Text-to-text transformer. Good controllability. |
| **GPT-3.5/4 (via API)** | Abstractive | Highest quality. Requires API call. |

**Tradeoff Analysis:**

| Dimension | TextRank | BART | T5 (Flan) | GPT API |
|---|---|---|---|---|
| ROUGE-L (CNN/DM) | 0.28 | 0.42 | 0.40 | 0.45+ |
| Speed (chars/sec, CPU) | 10⁶ | 10³ | 10³ | 10² (latency-bound) |
| Summary length | Fixed (top-k) | Controllable | Controllable | Controlled via prompt |
| Determinism | Deterministic | Non-deterministic | Non-deterministic | Non-deterministic |
| Cost | Free | Free | Free | Per-token |
| Implementation complexity | Low | Medium | Medium | Low (API call) |

**Recommendation:** Use **extractive summarization (TextRank)** for the primary pipeline — it is fast, deterministic, and free. The output is factually faithful (exact sentences). For the **interactive visual UI**, run **BART** asynchronously to generate more fluent abstractive summaries. Reserve GPT for optional LLM enrichment passes.

**Pseudocode (Extractive Summarization via TextRank):**

```
function TextRankSummarize(docText, ratio=0.3):
    sentences ← SentenceSplit(docText)
    n ← len(sentences)

    // Build sentence similarity graph
    similarities ← zeros(n, n)
    embeddings ← Encode(sentences)         // sentence embeddings

    for i in 0..n-1:
        for j in 0..n-1:
            if i ≠ j:
                similarities[i][j] ← cosine_sim(embeddings[i], embeddings[j])

    // Run PageRank on sentence graph
    scores ← PageRank(similarities)        // see §1.1

    // Select top-k sentences
    k ← max(1, int(n * ratio))
    topIndices ← argsort(scores desc)[:k]
    summary ← JoinSentences([sentences[i] for i in sort(topIndices)])

    return summary
```

**Benchmarking Approach:**
- **Metric:** ROUGE-1/ROUGE-L, BERTScore, factual faithfulness, speed.
- **Dataset:** 500 document-summary pairs (annotated or using article gold summaries).
- **Compression ratio:** Target 20-40% of original length (configurable).
- **Track:** Extractive vs abstractive quality gap on domain-specific text.

---

### 5.4 Text Chunking / Segmentation

**Problem Statement:** Split documents into coherent, semantically complete chunks of appropriate size for embedding and downstream processing. Chunk boundaries must not break meaningful semantic units.

**Candidate Strategies:**

| Strategy | Description |
|---|---|
| **Fixed-size (token window)** | Split every N tokens with M-token overlap. Simple but can break sentences. |
| **Semantic (embedding similarity split)** | Split where embedding similarity between adjacent windows drops below threshold. |
| **Recursive / Document Structure** | Split by Markdown headings, paragraphs, lists. Structure-aware. |
| **Sentence-based** | Merge sentences until token budget reached. Respects sentence boundaries. |

**Tradeoff Analysis:**

| Dimension | Fixed-size | Semantic | Recursive | Sentence-based |
|---|---|---|---|---|
| Semantic coherence | Poor | Good | Excellent | Good |
| Boundary accuracy | Poor | Medium | High | High |
| Implementation complexity | Low | High | Medium | Low |
| Determinism | Deterministic | Non-deterministic (embedding model variance) | Deterministic | Deterministic |
| Token count control | Precise | Approximate | Approximate | Precise |
| Tunable overlap | Yes | Yes (window overlap) | Structured (by heading) | Yes |

**Recommendation:** Use **recursive structure-based chunking** as the primary strategy, splitting on Markdown headings first, then paragraphs, then sentences as fallback. Target chunk size: 256-512 tokens with 32-token overlap for embedding quality. This respects the document's natural structure and produces semantically coherent chunks.

**Pseudocode (Recursive Chunking):**

```
function RecursiveChunk(docText, maxTokens=384, overlap=32):
    // Doc structure separators, in priority order
    separators ← ["\n## ", "\n### ", "\n#### ", "\n", ". "]

    chunks ← []
    remaining ← docText

    for sep in separators:
        if len(Tokenize(remaining)) <= maxTokens:
            break
        remaining ← SplitAtSeparator(remaining, sep, maxTokens, overlap)

    // Final pass: ensure all chunks are within token budget
    for chunk in remaining:
        if len(Tokenize(chunk)) > maxTokens:
            chunks ← append(chunks, SplitByTokenBudget(chunk, maxTokens, overlap))
        else:
            chunks ← append(chunks, chunk)

    return chunks
```

**Benchmarking Approach:**
- **Metric:** Embedding retrieval recall@k with chunked vs non-chunked documents, chunk token distribution, boundary count.
- **Dataset:** Markdown documents of varying length and structure complexity.
- **Track:** Fraction of chunks that break sentences or paragraphs.
- **Target:** >95% of chunks should end at a natural boundary.

---

### 5.5 Language Detection

**Problem Statement:** Detect the natural language of a document or text segment. Required for multi-language knowledge graphs to route to appropriate NLP pipelines.

**Candidates:**

| System | Description |
|---|---|
| **fastText (Facebook)** | Character n-gram classifier. 176 languages. Compact (16MB). |
| **langid.py** | Naive Bayes over character n-grams. 97 languages. Built into Python. |
| **CLD2 / CLD3 (Compact Language Detector)** | Chrome's language detector. Very fast. |
| **spaCy** | Language identification via metadata, not true detection. |

**Tradeoff Analysis:**

| Dimension | fastText | langid.py | CLD2 |
|---|---|---|---|
| Accuracy (F1, 10+ languages) | 0.98 | 0.95 | 0.96 |
| Speed (chars/sec) | 10⁶ | 10⁵ | 10⁷ |
| Languages | 176 | 97 | 160+ |
| Determinism | Deterministic | Deterministic | Deterministic |
| Implementation complexity | Low (pip package) | Low | Low (C++ binding) |
| Model size | 16MB | In-memory | ~1MB |

**Recommendation:** Use **fastText** for language detection. It has the best accuracy, supports the most languages, and is available as a pre-trained model. Use a minimum text length of 50 characters for reliable detection.

---

### 5.6 Stemming / Lemmatization

**Problem Statement:** Reduce words to their base form. Stemming uses crude heuristics (chopping affixes); lemmatization uses vocabulary/morphological analysis to return dictionary form.

**Candidates:**

| Algorithm | Type | Description |
|---|---|---|
| **Porter Stemmer** | Stemming | Iterative suffix stripping. 5 phases of rules. |
| **Snowball (Porter2)** | Stemming | Improved Porter. Better for English. |
| **Lancaster Stemmer** | Stemming | Aggressive (over-stemming). Fast but low quality. |
| **WordNet Lemmatizer** | Lemmatization | Vocabulary-based. Needs POS tag for accuracy. |
| **spaCy Lemmatizer** | Lemmatization | Rule-based + lookup. Accurate, fast. |

**Tradeoff Analysis:**

| Dimension | Porter | Snowball | Lancaster | WordNet | spaCy |
|---|---|---|---|---|---|
| Accuracy | Medium | Medium-High | Low | High | Very high |
| Speed (words/sec) | 10⁶ | 10⁶ | 10⁷ | 10⁵ | 10⁶ |
| Standardization | Poor | Medium | Poor | Good | Good |
| POS required | No | No | No | Recommended | Automatic |
| Implementation complexity | Low | Low | Low | Low | Low |

**Recommendation:** Use **spaCy's lemmatizer** when lemmatization is needed (e.g., for keyword normalization and topic modeling tokens). Use **Snowball (Porter2) stemmer** as a fast approximation when speed is critical and some accuracy loss is acceptable (e.g., search indexing).

---

## 6. Search & Retrieval

Search algorithms power the interactive knowledge graph query interface. They must support fast full-text search, semantic similarity search, and hybrid retrieval.

### 6.1 Inverted Index Construction

**Problem Statement:** Build a data structure mapping each unique term to the list of documents (and positions within those documents) where the term appears. The inverted index enables sub-linear full-text search.

**Index Types:**

| Type | Description |
|---|---|
| **Non-positional** | Stores (docID, term frequency) only. Smaller index, supports bag-of-words queries. |
| **Positional** | Stores (docID, [position₁, ..., positionₖ]). Larger index, supports phrase/proximity queries. |

**Compression Techniques:**

| Technique | Bits per posting | Description |
|---|---|---|
| **Variable Byte Encoding** | 8-32 | Variable-length integer encoding. Byte-aligned for fast decoding. |
| **Gamma Coding (Elias γ)** | 2·⌊log₂(x)⌋+1 | Unary + binary. Good for small gaps. |
| **Delta Encoding** | Store gaps (differences) between consecutive docIDs before compression. |
| **Roaring Bitmaps** | 1-32 | Hybrid: dense blocks use bitmaps, sparse blocks use arrays. State-of-the-art. |

**Recommendation:** Use **Roaring bitmaps** for the postings list representation. They offer the best query performance (fast intersection/union via SIMD bit operations) with competitive compression ratios. Use positional index only for phrase queries, which can be enabled on demand.

**Pseudocode (Inverted Index Construction):**

```
function BuildInvertedIndex(documents):
    // documents: array of {id, text}
    index ← {}

    for each doc in documents:
        tokens ← Tokenize(doc.text)
        positions ← {}
        for pos, token in enumerate(tokens):
            // Token normalization: lowercase, stem, etc.
            term ← Normalize(token)
            positions[term] ← append(positions.get(term, []), pos)

        for term, posList in positions:
            if term not in index:
                index[term] ← Entry()
            index[term].Add(doc.id, posList)  // appends via Roaring bitmap

    return index
```

**Benchmarking Approach:**
- **Metric:** Index build time, index size (compressed ratio), query latency (intersection/union).
- **Dataset:** Document corpus at various sizes (10³–10⁶ docs).
- **Compare:** Roaring vs variable byte vs no compression.
- **Target:** Query latency < 10ms for single-term queries on 10⁶ documents.

---

### 6.2 BM25 Ranking

**Problem Statement:** Rank documents by relevance to a query using probabilistic term weighting. BM25 is the standard modern variant of TF-IDF ranking.

**Formula:**
`BM25Score(q, d) = Σ_{t ∈ q} IDF(t) · tf(t, d) · (k₁ + 1) / (tf(t, d) + k₁ · (1 − b + b · |d|/avgdl))`

where `IDF(t) = log((N − df(t) + 0.5) / (df(t) + 0.5))`.

**Variants:**

| Variant | Description |
|---|---|
| **BM25** | Standard. Parameters k₁=1.2, b=0.75 (default). |
| **BM25F** | Multiple fields, each with its own weight and length normalization. |
| **BM25+** | Adds a δ term to avoid zero scores for term-containing documents (relevant for very long queries). |

**Parameter Sensitivity:**

| Parameter | Effect | Typical Range |
|---|---|---|
| k₁ | Term frequency saturation. Lower = more saturation. | 0.5 - 2.0 |
| b | Length normalization. b=0 = no normalization, b=1 = full normalization. | 0.3 - 0.9 |

**Recommendation:** Use **BM25** with k₁=1.5, b=0.75 as defaults. Tune on a held-out query set using grid search. For multi-field documents (title, body, headings), use **BM25F** with field weights: title=3, headings=2, body=1.

---

### 6.3 TF-IDF Vectorization

**Problem Statement:** Convert documents into term-weight vectors for similarity computation and topic modeling input.

**Variants:**

| Variant | Formula | Description |
|---|---|---|
| **Standard** | tf·idf = count(t,d) · log(N/df(t)) | Raw frequency × IDF. |
| **Sublinear (Log)** | tf·idf = (1 + log(count(t,d))) · log(N/df(t)) | Diminishes high-frequency terms. Standard in practice. |
| **Augmented** | tf·idf = (0.5 + 0.5 · count(t,d) / maxCount(d)) · log(N/df(t)) | Normalizes by document length. |
| **Boolean** | tf·idf = 1 · log(N/df(t)) | Binary term presence. |

**Recommendation:** Use **sublinear (log) TF-IDF** with L2 normalization — this is the standard configuration used in information retrieval and matches the default in scikit-learn's `TfidfVectorizer`. The log-scaled term frequency prevents dominant terms from overwhelming the vector.

---

### 6.4 Maximal Marginal Relevance (MMR)

**Problem Statement:** Given a set of candidate results, select the top-k that are both relevant to the query and diverse among themselves. Prevents the "all results about the same thing" problem.

**Algorithm:**
1. Start with `S = {argmax_{d∈R} sim(q, d)}` (the most relevant result).
2. Iteratively add `argmax_{d∈R\S} [λ · sim(q, d) − (1−λ) · max_{s∈S} sim(d, s)]`.

**Parameters:**
- `λ ∈ [0, 1]`: Diversity-relevance tradeoff. λ=1 is pure relevance, λ=0 is pure diversity.
- Recommended: λ = 0.5 (balance). Increase to 0.7 for factual queries, decrease to 0.3 for exploratory queries.

**Complexity:** O(k·n·d) where `n` is candidate pool size, `k` is results size.

**Recommendation:** Use MMR for the **search results diversification** stage. Apply after BM25 retrieval to the top-`n` = 200 candidates to produce `k` = 20 diverse results.

**Pseudocode (MMR):**

```
function MMR(query, candidates, k=20, λ=0.5):
    // candidates: list of {id, embedding}
    // Returns re-ranked list of k results

    if len(candidates) <= k: return candidates

    queryEmb ← Encode(query)
    results ← []
    remaining ← candidates.copy()

    // Step 1: Start with most relevant
    scores ← [(sim(queryEmb, c.embedding), i) for i, c in enumerate(remaining)]
    bestIdx ← argmax(scores)
    results ← append(results, remaining.pop(bestIdx))

    // Step 2: Iteratively add with diversity
    for _ in 2..k:
        bestScore ← -∞
        bestIdx ← -1
        for i, c in enumerate(remaining):
            rel ← sim(queryEmb, c.embedding)
            div ← max(sim(c.embedding, r.embedding) for r in results)
            mmr ← λ * rel - (1 - λ) * div
            if mmr > bestScore:
                bestScore ← mmr
                bestIdx ← i
        results ← append(results, remaining.pop(bestIdx))

    return results
```

---

### 6.5 Query Expansion

**Problem Statement:** Augment the original query with additional terms to improve recall. Helps bridge the vocabulary gap between short queries and relevant documents.

**Candidate Methods:**

| Method | Description |
|---|---|
| **WordNet-based** | Add synonyms and hypernyms of query terms. Simple, precision risk. |
| **Embedding Similarity** | Find terms with high embedding similarity to query. Requires term embeddings. |
| **Relevance Feedback (Rocchio)** | Add terms from top-retrieved documents. Pseudo-relevance: assume top-k are relevant. |
| **LLM-based** | Use LLM to generate related queries or query facets. Highest quality, highest cost. |

**Tradeoff Analysis:**

| Dimension | WordNet | Embedding | Rocchio | LLM |
|---|---|---|---|---|
| Recall improvement | +5% | +15% | +20% | +30% |
| Precision drop | −10% | −5% | −8% | −2% |
| Cost | Free | Free | Free | API cost |
| Implementation | Low | Medium | Medium | Low |
| Determinism | Deterministic | Deterministic | Deterministic | Non-deterministic |

**Recommendation:** Use **pseudo-relevance feedback (Rocchio)** as the default query expansion method. It provides a good recall improvement with minimal precision loss and no external dependencies. Supplement with **LLM-based expansion** for the interactive search UI when maximum recall is desired.

**Pseudocode (Rocchio Query Expansion):**

```
function RocchioExpand(query, retriever, α=0.8, β=0.2, topK=10, expandTokens=5):
    // Retrieve top-K documents
    results ← retriever.Search(query, topK)

    // Extract top terms from pseudo-relevant documents
    relevantTerms ← {}
    for doc in results:
        for term, score in doc.tfidf_terms():
            relevantTerms[term] ← (relevantTerms.get(term, 0) + score)

    // Rank by modified Rocchio formula:
    // Q' = α·Q + β/|Dᵣ|·Σ_{d∈Dᵣ} d − γ/|Dₙᵣ|·Σ_{d∈Dₙᵣ} d
    // (simplified: just use positive feedback)
    sortedTerms ← sort(relevantTerms by value desc)
    expansionTerms ← [t for t in sortedTerms if t not in originalQuery][:expandTokens]

    return originalQuery + " " + join(expansionTerms)
```

---

### 6.6 Fuzzy String Matching

**Problem Statement:** Match strings that are syntactically similar but not identical. Used for typo-tolerant search, entity name deduplication, and linking variants.

**Candidate Algorithms:**

| Algorithm | Description | Distance |
|---|---|---|
| **Levenshtein** | Edit distance: insert, delete, substitute. O(m·n). | Cost per edit = 1 |
| **Damerau-Levenshtein** | Adds transposition. O(m·n). | Better for typing errors |
| **Jaro-Winkler** | Character overlap + transpositions. Weighted toward prefix matches. | Best for short strings, names |
| **N-gram (q-gram)** | String similarity via shared n-grams. O(m + n) approximate. | Good for long strings |

**Tradeoff Analysis:**

| Dimension | Levenshtein | Damerau-Levenshtein | Jaro-Winkler | N-gram |
|---|---|---|---|---|
| Time complexity | O(m·n) | O(m·n) | O(m·n) | O(m + n) |
| Typo handling (transposition) | No | Yes | Yes | Partial |
| Prefix importance | No | No | Yes | No |
| Normalized score [0,1] | Yes (1 − d/max(|A|,|B|)) | Yes | Yes | Yes |
| Long strings (>100 chars) | Slow | Slow | Slow | Fast |
| Implementation complexity | Low | Low | Low | Low |

**Recommendation:** Use **Jaro-Winkler** for fuzzy matching of short names (entity labels, document titles, author names). Use **N-gram similarity** with trigrams for longer text matching (duplicate detection, query fuzzy matching). Use **Damerau-Levenshtein** for typo-tolerant query correction where transposition errors are common.

---

## 7. Optimization

Optimization algorithms reduce the knowledge graph and embedding stores to manageable size while preserving quality for downstream consumers.

### 7.1 Graph Pruning

**Problem Statement:** Reduce the knowledge graph from `|V|` nodes and `|E|` edges to a smaller graph `|V'|, |E'|` that preserves the most important structure. Pruning is essential for visualization, search quality, and build performance.

**Candidate Strategies:**

| Strategy | Description |
|---|---|
| **Degree-based** | Remove nodes with degree < threshold. Simple but discards low-degree but important nodes. |
| **Weight-threshold** | Remove edges with weight < threshold. Preserves node connectivity for strong relationships. |
| **Importance-threshold (PageRank)** | Remove nodes with PageRank < percentile threshold. Preserves globally important nodes. |
| **Semantic-coherence** | Remove nodes where neighborhood semantic coherence (average neighbor similarity) is low. |

**Tradeoff Analysis:**

| Dimension | Degree | Weight | PageRank | Semantic |
|---|---|---|---|---|
| Preserves global structure | Poor | Medium | Excellent | Good |
| Preserves local structure | Good | Medium | Poor | Excellent |
| Implementation complexity | Low | Low | Low | High |
| Determinism | Deterministic | Deterministic | Deterministic | Non-deterministic |
| Computational cost | O(V) | O(E) | O(t·(V+E)) | O(V·d²) |

**Recommendation:** Use a **stratified pruning strategy**: (1) Prune edges by weight threshold (retain edges in top-90th percentile weight), (2) Prune nodes by PageRank (retain top-80th percentile by importance), but (3) protect low-PageRank nodes that serve as bridges between communities (high betweenness centrality). This preserves both global importance and structural connectivity.

**Pseudocode (Stratified Graph Pruning):**

```
function PruneGraph(G, edgeWeightPercentile=0.90, nodeImportancePercentile=0.80):
    // Stage 1: Edge pruning by weight
    weights ← sorted([e.w for e in G.edges])
    weightThreshold ← weights[int(len(weights) * edgeWeightPercentile)]

    G_pruned ← EmptyGraph()
    for each e in G.edges:
        if e.w ≥ weightThreshold or e.HasBridgeProperty:
            G_pruned.AddEdge(e)

    // Stage 2: Node pruning by PageRank (with bridge protection)
    pr ← PageRank(G_pruned)                // recompute on pruned graph
    bc ← ApproximateBetweenness(G_pruned)  // or reuse from earlier stage

    importanceThreshold ← percentile(pr, nodeImportancePercentile)

    protected ← set(v for v in V if bc[v] > percentile(bc, 0.90))
    retained ← set(v for v in V if pr[v] ≥ importanceThreshold or v in protected)

    G_pruned ← InducedSubgraph(G_pruned, retained)

    // Stage 3: Remove disconnected components (optional)
    components ← ConnectedComponents(G_pruned)
    mainComponent ← max(components, key=len)
    G_pruned ← InducedSubgraph(G_pruned, mainComponent)

    return G_pruned
```

**Benchmarking Approach:**
- **Metric:** Information preservation (fraction of original PageRank sum retained), graph size reduction ratio, application-level metrics (search recall, community retention).
- **Dataset:** Full knowledge graph at various pruning levels (50%, 70%, 90% reduction).
- **Target:** 70% node reduction with >90% PageRank sum retention.

---

### 7.2 Embedding Compression

**Problem Statement:** Reduce the memory footprint of the embedding store (n vectors × d dimensions × 4 bytes each) through quantization while preserving retrieval quality.

**Candidate Methods:**

| Method | Bits per element | Memory reduction | Recall@10 drop |
|---|---|---|---|
| **Float32 (baseline)** | 32 | 1× | — |
| **Float16** | 16 | 2× | < 0.5% |
| **Int8 quantization** | 8 | 4× | 1-3% |
| **Product Quantization (PQ)** | 4-8 | 4-8× | 2-5% |
| **Binary quantization** | 1 | 32× | 5-15% |
| **Scalar Quantization + PCA** | 8 | 4× (quant) + 2-4× (PCA dim. reduction) | 2-5% |

**Tradeoff Analysis:**

| Dimension | Float16 | Int8 (scalar) | PQ (M=16, nbits=8) | Binary |
|---|---|---|---|---|
| Recall@10 vs Float32 | 0.995+ | 0.97-0.99 | 0.95-0.98 | 0.85-0.95 |
| Memory (n=10⁶, d=384) | 768 MB | 384 MB | 96-192 MB | 48 MB |
| Query latency | Unchanged | Slightly faster | 2-5× faster | 10-20× faster |
| Implementation complexity | Trivial | Low | Medium | Low |
| Determinism | Deterministic | Deterministic | Deterministic | Non-deterministic |

**Recommendation:** Use **Int8 scalar quantization** for the default compression strategy. It provides 4× memory reduction with minimal recall loss (1-3%). For memory-constrained deployments (e.g., Vercel serverless), add **PCA reduction** to d=128 before quantization (total 8-16× reduction). Use **Product Quantization** only when the embedding store must fit entirely in memory and recall requirements are relaxed.

**Pseudocode (Int8 Scalar Quantization):**

```
function QuantizeInt8(embeddings):
    // embeddings: n × d matrix, float32
    // Quantization: store each dimension independently

    d ← embeddings.shape[1]
    quantized ← zeros(embeddings.shape, dtype=int8)
    scale ← zeros(d)
    offset ← zeros(d)

    for dim in 0..d-1:
        col ← embeddings[:, dim]
        minVal ← min(col)
        maxVal ← max(col)
        offset[dim] ← minVal
        scale[dim] ← (maxVal - minVal) / 255.0  // 256 levels for int8

        if scale[dim] == 0:
            quantized[:, dim] ← 0
        else:
            quantized[:, dim] ← ((col - minVal) / scale[dim]).round().clip(0, 255).astype(int8)

    return quantized, scale, offset           // store scale/offset

function DequantizeInt8(quantized, scale, offset):
    d ← quantized.shape[1]
    return quantized.astype(float32) * scale.reshape(1, d) + offset.reshape(1, d)

function CosineSimilarityQuantized(q, quantized, scale, offset):
    // q: query embedding (float32)
    // Dequantize on the fly, SIMD-friendly with contiguous memory
    d ← len(scale)
    q_norm ← q / ||q||₂

    scores ← zeros(len(quantized))
    q_scaled ← (q_norm - offset) / scale    // adjust query to quantized space
    q_scaled_norm ← q_scaled / ||q_scaled||₂  // L2 norm in quantized space

    scores ← q_scaled_norm @ quantized.T     // int8 × float32 matmul is fast
    return scores
```

**Benchmarking Approach:**
- **Metric:** Recall@k (vs float32 baseline), quantized index memory, query latency (p50/p99).
- **Dataset:** Full embedding store.
- **Track:** Recall drop vs compression ratio curve.
- **Target:** ≤2% recall@10 drop for 4× compression.

---

### 7.3 Duplicate Detection

**Problem Statement:** Identify near-duplicate documents, sections, or entities in the knowledge graph. Deduplication prevents redundant nodes and edges.

**Candidate Methods:**

| Method | Similarity type | Description |
|---|---|---|
| **MinHash / LSH** | Jaccard (token overlap) | Hash signature for every document. Compute Jaccard via signature comparison. |
| **SimHash** | Cosine (bit-level) | Random hyperplane projection. XOR + popcount = approximate cosine. |
| **Embedding cosine similarity** | Cosine (semantic) | Full embedding comparison. Requires threshold. |
| **Exact hash (SHA-256)** | Exact match | Fast for exact dedup. Misses near-duplicates. |

**Tradeoff Analysis:**

| Dimension | MinHash | SimHash | Embedding (cosine) | Exact Hash |
|---|---|---|---|---|
| Similarity type | Jaccard (token overlap) | Cosine (bit-level) | Cosine (semantic) | Exact |
| Near-duplicate detection | Good (with LSH) | Good | Excellent | No |
| Speed | Fast (O(n·k)) | Very fast (O(n·d)) | Slow (O(n²·d)) | Fast (O(n)) |
| Memory (n=10⁶) | O(n·k) | O(n·d/32) bytes | O(n·d·4) | O(n·8) |
| Threshold sensitivity | Low (band tuning) | Low (bits) | High (cosine threshold) | None |
| Determinism | Non-deterministic | Deterministic (with seed) | Deterministic | Deterministic |

**Recommendation:** Use a **two-stage deduplication** pipeline: (1) MinHash/LSH as a fast pre-filter to find candidate near-duplicates, (2) cosine similarity on candidate pairs for the final decision. Threshold: Jaccard > 0.6 or cosine > 0.92 for deduplication. Use 128 MinHash signatures with 4 bands of 32 bits each.

**Pseudocode (MinHash + LSH Duplicate Detection):**

```
function MinHashDuplicateDetection(documents, threshold=0.6):
    n ← len(documents)
    signatures ← []                         // each doc: array of k hash values

    // Build MinHash signatures (k=128 permutations)
    for each doc in documents:
        tokens ← Tokenize(doc)
        sig ← [min(hash(t, p) for t in tokens) for p in permutations]   // min-hash
        signatures ← append(signatures, sig)

    // LSH: bucket by band signatures
    bands ← 4; rowsPerBand ← 32            // total: 128 hashes
    candidates ← Set()

    for band in 0..bands-1:
        buckets ← {}
        for docId, sig in enumerate(signatures):
            bandSig ← hash(sig[band*rowsPerBand : (band+1)*rowsPerBand])
            buckets[bandSig] ← append(buckets.get(bandSig, []), docId)

        for bucket in buckets.values():
            if len(bucket) > 1:
                for i, j in combinations(bucket, 2):
                    candidates.add((min(i,j), max(i,j)))

    // Verify candidates with Jaccard
    duplicates ← []
    for (i, j) in candidates:
        jaccard ← EstimateJaccard(signatures[i], signatures[j])
        if jaccard ≥ threshold:
            duplicates ← append(duplicates, (i, j, jaccard))

    return duplicates
```

**Benchmarking Approach:**
- **Metric:** Precision/Recall of duplicate detection (against human-annotated pairs), throughput (documents/second).
- **Dataset:** Document corpus with known duplicate pairs.
- **Target:** Recall > 0.95 with Precision > 0.90.

---

### 7.4 Dead Knowledge Elimination

**Problem Statement:** Identify and remove knowledge that is no longer relevant, unused, or orphaned. This differs from pruning in that it targets entire knowledge structures rather than optimizing graph size.

**Heuristics:**
- **Orphan detection:** Nodes with no incoming edges and low PageRank (sink nodes).
- **Staleness:** Documents not updated within a configurable time window (e.g., >1 year for news; >5 years for evergreen concepts).
- **Relevance scoring:** Combine PageRank, recency, and user interaction signals (if available).

**Recommendation:** Implement a **relevance score** `R(v) = w₁·PR(v) + w₂·recency(v) + w₃·inDegree(v) + w₄·freshnessSignal(v)` and remove nodes below a configurable threshold. Default weights: w₁=0.4, w₂=0.3, w₃=0.2, w₄=0.1. Run dead knowledge elimination as the final graph optimization step, after all other pruning.

---

## 8. Caching & Incremental Builds

The compiler must support incremental compilation — re-using previous computation when source documents have not changed. This requires a cache layer with integrity verification.

### 8.1 Content-Addressable Cache

**Problem Statement:** Given an artifact (graph, index, embedding), store and retrieve it by a deterministic key derived from its content and all dependencies. A change in any dependency invalidates the cache entry.

**Mechanism:**
- Cache key = SHA-256 hash of (input document hashes + pipeline configuration + algorithm parameters).
- Content = serialized binary artifact (protobuf, MessagePack, or flatbuffers).

**Cache Key Construction:**

```
function BuildCacheKey(sources, config):
    // sources: list of {path, hash} for all input documents
    // config: pipeline configuration JSON

    keyComponents ← []
    for s in sorted(sources by path):
        keyComponents ← append(keyComponents, s.path, s.hash)

    keyComponents ← append(keyComponents, JSON.stringify(sorted(config)))

    key ← SHA256(join(keyComponents, delimiter="\x00"))
    return key[:32] as hex string
```

**Benchmarking Approach:**
- **Metric:** Cache hit rate, key generation time, serialization/deserialization throughput.
- **Target:** >70% cache hit rate on incremental builds (changing 10% of documents).

---

### 8.2 Merkle Tree

**Problem Statement:** For dependency verification across the entire compile pipeline, maintain a Merkle tree. Each node's hash depends on its children. The root hash uniquely identifies the complete build state.

**Usage:** Verify artifact integrity. Given a root hash, anyone can verify a specific artifact without the full tree.

**Pseudocode:**

```
function BuildMerkleTree(artifacts):
    // artfacts: list of {path: hash} pairs

    // Build leaf nodes
    leaves ← sort(artifacts by path)
    nodes ← [SHA256(l.path + l.hash) for l in leaves]

    // Build internal nodes (balanced binary tree)
    while len(nodes) > 1:
        newLevel ← []
        for i in range(0, len(nodes), 2):
            if i + 1 < len(nodes):
                newLevel ← append(newLevel, SHA256(nodes[i] + nodes[i+1]))
            else:
                newLevel ← append(newLevel, nodes[i])
        nodes ← newLevel

    return nodes[0]                          // single root hash
```

---

### 8.3 LRU / LFU Eviction

**Problem Statement:** When the cache reaches its storage limit, select which entries to evict.

**Recommendation:** Use **2Q (Two Queue)** replacement policy, which improves over LRU by maintaining two queues: a FIFO queue for recently accessed once, and an LRU queue for frequently accessed entries. 2Q prevents cache pollution from one-time accesses that would otherwise evict hot entries.

| Policy | Description | Overhead |
|---|---|---|
| **LRU** | Evict least recently used. Simple, suffers from one-time scans. | O(1) with linked list + hash map |
| **LFU** | Evict least frequently used. Maintains frequency counts. | O(log n) with heap |
| **2Q** | Short-term FIFO + long-term LRU. Resists scan pollution. | O(1) |
| **ARC (Adaptive Replacement)** | Dynamically balances recency and frequency. State-of-the-art. | O(1) |

**Recommendation:** Use **2Q** for the artifact cache. It is simple, O(1), and effectively handles the workload pattern (repeated cache hits on stable artifacts + cold reads for new/changed content).

---

### 8.4 Dependency Graph Invalidation

**Problem Statement:** When a source document changes, determine which artifacts must be rebuilt. A change in a file cascades through the pipeline: document → sections → entities → embeddings → topics → graph → search index.

**Strategies:**

| Strategy | Description |
|---|---|
| **Full rebuild** | Recompute everything. Simple but wasteful. |
| **Topological invalidation** | Invalidate reverse topological order. Each stage invalidates its immediate dependents. |
| **Transitive invalidation** | Walk the full dependency graph from changed leaf to all ancestors. |
| **Level-based** | Assign build levels. Invalidate all artifacts at level > min_invalidated_level. |

**Recommendation:** Use **topological invalidation** with a directed acyclic graph (DAG) of pipeline stages. When a source changes, mark all transitive dependents for rebuild. This is optimal: each artifact is rebuilt exactly once per compilation.

```
// Pipeline dependency DAG (edges: depends-on → dependents)
// source_docs → chunks → embeddings
// source_docs → chunks → entities
// embeddings → index (ANN)
// embeddings → topics (NMF)
// entities → graph_nodes
// graph_nodes + index → search_index
// graph_nodes → community (Louvain)
// graph_nodes + topics + communities → manifest

function Invalidate(sources):
    changed ← set(sources)
    rebuild ← set(sources)

    while changed not empty:                // BFS along dependency edges
        current ← pop(changed)
        for each dependent in DAG[current]:
            if dependent not in rebuild:
                rebuild ← add(rebuild, dependent)
                changed ← add(changed, dependent)

    return rebuild
```

**Benchmarking Approach:**
- **Metric:** Fraction of artifacts rebuilt vs full rebuild, wall-clock build time.
- **Scenario:** Incremental changes: 1%, 5%, 10%, 50% of documents modified.
- **Target:** Incremental build time proportional to fraction of changed documents (sub-linear in total size).

---

## Appendix A: Complexity Reference

| Algorithm | Time (Typical) | Time (Worst) | Space |
|---|---|---|---|
| PageRank | O(t·(V+E)) | O(t·(V+E)) | O(V) |
| Betweenness (Brandes) | O(V·E) | O(V·E) | O(V+E) |
| Betweenness (Approx, k sources) | O(k·(V+E)) | O(k·(V+E)) | O(V+E) |
| Connected Components (DSU) | O(E·α(V)) | O(E·α(V)) | O(V) |
| MST (Kruskal) | O(E log E) | O(E log E) | O(E) |
| MST (Prim, binary heap) | O(E + V log V) | O(E + V log V) | O(V) |
| Shortest Path (Dijkstra) | O(E + V log V) | O(E + V log V) | O(V) |
| Max Flow (Dinic) | O(V²·E) | O(V²·E) | O(E) |
| Louvain | O(n log n) | O(n²) | O(V+E) |
| Leiden | O(n log n) | O(n²) | O(V+E) |
| Label Propagation | O((V+E)·log V) | O((V+E)·log V) | O(V) |
| HDBSCAN | O(n log n) | O(n²) | O(n²) worst |
| K-Means | O(n·k·d·i) | O(n·k·d·i) | O(n·d) |
| Spectral Clustering (Approx) | O(E·k·log n) | O(n³) | O(n·k) |
| LDA (Online) | O(D·k·L·i / batch) | O(D·k·L·i) | O(k·W + k·D) |
| NMF | O(W·D·k·i) | O(W·D·k·i) | O(W·D + W·k + k·D) |
| BERTopic | O(n·d + n log n) | O(n·d + n²) | O(n·d) |
| Cosine Similarity (Dense) | O(n²·d) | O(n²·d) | O(n²) |
| ANN (HNSW) — Query | O(log n) | O(n) | O(n·d) |
| ANN (HNSW) — Build | O(n log n) | O(n²) | O(n·d) |
| Randomized SVD | O(n·d·k) | O(n·d·k) | O(n·k + d·k) |
| t-SNE (Barnes-Hut) | O(n log n·i) | O(n²·i) | O(n) |
| UMAP | O(n log n) | O(n²) | O(n·d) |
| BM25 (per query) | O(|q|·|D|) | O(|q|·|D|) | O(|index|) |
| MMR | O(k·n·d) | O(k·n·d) | O(n·d) |
| Int8 Embedding Quantization | O(n·d) | O(n·d) | O(n·d·1B) |

Where: n = number of nodes/points, V = vertices, E = edges, D = documents, W = vocabulary size, k = topics/dimension, d = embedding dimension, i = iterations, t = PageRank iterations, L = document length, α = inverse Ackermann.

---

## Appendix B: Algorithm Selection Quick Reference

| Task | Primary Algorithm | Fallback / Alternative |
|---|---|---|
| Node importance | PageRank (α=0.85) | Personalized PageRank (query-specific) |
| Bridge detection | Approximate Betweenness | Exact Brandes (|V|<10⁴) |
| Community detection | Louvain | Leiden (higher quality), NMF Topics |
| Embedding clustering | HDBSCAN | Mini-Batch K-Means |
| Concept hierarchy | Agglomerative (Ward) | Louvain multi-level |
| Topic modeling (deterministic) | NMF (Coordinate Descent) | Online LDA (non-deterministic) |
| Topic modeling (exploratory) | BERTopic | Top2Vec |
| Full pairwise similarity | Batched cosine (BLAS) | — |
| Top-k nearest neighbors | HNSW (via FAISS) | IVFPQ (memory-constrained) |
| Dimensionality reduction | UMAP | t-SNE (small datasets) |
| Embedding compression | Int8 scalar quantization | PQ (extreme compression) |
| NER | spaCy (transformer) | GLiNER (custom entities) |
| Keyword extraction | YAKE! | KeyBERT reranking |
| Summarization | TextRank (extractive) | BART (abstractive) |
| Chunking | Recursive (structure-based) | Sentence-based |
| Text search ranking | BM25 (k₁=1.5, b=0.75) | BM25F (multi-field) |
| Search result diversification | MMR (λ=0.5) | — |
| Query expansion | Rocchio pseudo-relevance | LLM expansion |
| Duplicate detection | MinHash/LSH + cosine verify | Exact hash (pre-filter) |
| Graph pruning | Stratified (PageRank + bridge protection) | — |
| Connected components | Union-Find | Tarjan's (directed SCC) |
| MST | Kruskal | Prim (dense subgraphs) |
| Shortest path | Dijkstra (binary heap) | Floyd-Warshall (all-pairs, small) |
| Max flow / min cut | Dinic | Push-Relabel (large graphs) |
| Cache eviction | 2Q | LRU (simpler) |
| Cache integrity | SHA-256 content-addressable | Merkle tree (verification) |
| Incremental build | Topological invalidation | Level-based |

---

*End of Algorithm Specification*
