# Graph Theory Cheatsheet

_Complete reference for undirected & directed graphs, theorems, and algorithms_

---

## 🔷 Basic Definitions

**Undirected Graph:** $G = (V, E)$ where $V$ = vertices, $E$ = edges

**Adjacency:** Vertices $u, v$ adjacent if $\{u,v\} \in E$

**Incidence:** Edge $e$ incident to vertex $v$ if $v \in e$

**Degree:** $\deg(v) = |\{e \in E : v \in e\}|$

### Graph Isomorphism

$G_1 \cong G_2$ if $\exists$ bijection $f: V_1 \to V_2$ preserving adjacency

### Common Graph Classes

- **Complete:** $K_n$ - all vertices adjacent
- **Bipartite:** $V = A \cup B$, edges only between $A$ and $B$
- **Cycle:** $C_n$ - vertices in cycle
- **Tree:** Connected acyclic graph

### Connectivity

**Connected:** Path exists between any two vertices

**Component:** Maximal connected subgraph

---

## 🔷 Matrices & Subgraphs

### Adjacency Matrix

$A_{ij} = 1$ if $\{v_i, v_j\} \in E$, else $0$

```
For triangle: [0 1 1]
              [1 0 1]
              [1 1 0]
```

### Incidence Matrix

$I_{ij} = 1$ if vertex $v_i$ incident to edge $e_j$

### Subgraphs

**Spanning:** $G' = (V, E')$ where $E' \subseteq E$

**Induced:** $G[S] = (S, E \cap \binom{S}{2})$ for $S \subseteq V$

### Distance Metrics

- **Distance:** $d(u,v)$ = shortest path length
- **Eccentricity:** $e(v) = \max_{u \in V} d(u,v)$
- **Radius:** $r(G) = \min_{v \in V} e(v)$
- **Diameter:** $\text{diam}(G) = \max_{v \in V} e(v)$
- **Center:** $\{v : e(v) = r(G)\}$
- **Periphery:** $\{v : e(v) = \text{diam}(G)\}$

---

## 🔷 Structural Properties

### Critical Elements

**Cut Vertex:** Vertex whose removal increases components

**Bridge:** Edge whose removal increases components

**Block:** Maximal 2-connected subgraph

### Graph Coloring

**Proper Coloring:** Adjacent vertices have different colors

**Chromatic Number:** $\chi(G)$ = minimum colors needed

**Mycielskian:** $M(G)$ has $\chi(M(G)) = \chi(G) + 1$

### Independence

**Independent Set:** No two vertices adjacent

**Independence Number:** $\alpha(G)$ = max independent set size

**Key Bound:** $\chi(G) \geq \frac{|V|}{\alpha(G)}$

---

## 🔷 Planar Graphs

**Planar:** Can be drawn in plane without edge crossings

**Outerplanar:** Can be drawn with all vertices on outer face

### Theorems

**Euler's Formula:** For connected planar graph: $v - e + f = 2$

**Kuratowski's Theorem:** $G$ planar ⟺ $G$ has no $K_5$ or $K_{3,3}$ subdivision

**Five Color Theorem:** Every planar graph is 5-colorable. Proof by induction on vertices using minimal counterexample.

---

## 🔷 Paths & Cycles

### Eulerian

**Eulerian Path:** Uses each edge exactly once

**Eulerian Cycle:** Eulerian path that starts and ends at same vertex

**Eulerian Graph Characterization:** Connected graph has Eulerian cycle ⟺ all vertices have even degree

### Hamiltonian

**Hamiltonian Path:** Visits each vertex exactly once

**Hamiltonian Cycle:** Hamiltonian path that returns to start

**Ore's Theorem:** If $\deg(u) + \deg(v) \geq n$ for all non-adjacent $u,v$, then $G$ is Hamiltonian.  
_Proof:_ Extend maximal path using degree sum condition.

**Dirac's Theorem:** If $\deg(v) \geq n/2$ for all $v$, then $G$ is Hamiltonian (corollary of Ore's)

---

## 🔷 Intersection Graphs

**Intersection Graph:** Vertices = objects, edges = non-empty intersection

### Types

- **Line Graph:** $L(G)$ - vertices = edges of $G$
- **Block Graph:** Vertices = blocks + cut vertices
- **Clique Graph:** Vertices = maximal cliques
- **Interval Graph:** Vertices = intervals on real line

### Theorems

**Whitney Isomorphism Theorem:** $G_1 \cong G_2$ ⟺ $L(G_1) \cong L(G_2)$ (except $K_3$ and $K_{1,3}$)

**Universality of Intersection Graphs:** Every graph is intersection graph of some family of sets.  
_Construction:_ For each vertex $v$, create set $S_v = \{e : v \in e\}$

---

## 🔷 Degree Sequences

**Degree Sequence:** Multiset of vertex degrees

**Graphic:** Degree sequence realizable by some graph

### Key Results

**Handshaking Lemma:** $\sum_{v \in V} \deg(v) = 2|E|$  
_Corollary:_ Number of odd-degree vertices is even

**Havel-Hakimi Algorithm:** For sequence $d_1 \geq d_2 \geq \ldots \geq d_n$: Remove $d_1$, subtract 1 from next $d_1$ terms

**Erdős-Gallai Theorem:** Sequence graphic ⟺ sum is even and for all $k$:
$$\sum_{i=1}^k d_i \leq k(k-1) + \sum_{i=k+1}^n \min(d_i, k)$$

**Connected Graph Criterion:** Graphic sequence realizable by connected graph ⟺ graphic and $\sum d_i \geq 2(n-1)$

---

## 🔷 Directed Graphs

**Digraph:** $D = (V, A)$ where $A \subseteq V \times V$

**Indegree:** $d^-(v) = |\{u : (u,v) \in A\}|$

**Outdegree:** $d^+(v) = |\{u : (v,u) \in A\}|$

### Special Vertices

- **Source:** $d^-(v) = 0$
- **Sink:** $d^+(v) = 0$
- **Disorientation:** Replace arcs with edges
- **Converse:** Reverse all arc directions

### Theorems

**Handshaking for Digraphs:** $\sum_{v \in V} d^+(v) = \sum_{v \in V} d^-(v) = |A|$

**Acyclic Digraph Property:** Every acyclic digraph has a source and a sink.  
_Proof:_ If no source, follow incoming arcs to create cycle

---

## 🔷 Digraph Connectivity

### Connectivity Types

**Weakly Connected:** Underlying undirected graph connected

**Unilaterally Connected:** For any $u,v$, path $u \to v$ or $v \to u$ exists

**Strongly Connected:** Path exists from any vertex to any other

**Strong Component:** Maximal strongly connected subgraph

**Condensation:** Digraph of strong components

### Special Structures

**Kernel:** Independent set $S$ where every $v \notin S$ has arc to $S$

**King:** Vertex that can reach any other in ≤ 2 steps

**Tournament:** Orientation of complete graph

**Rédei's Theorem:** Every tournament has Hamiltonian path.  
_Proof:_ Induction - insert new vertex optimally in existing path

---

## 🔷 Key Theorems & Bounds

**Brooks' Theorem:** $\chi(G) \leq \Delta(G)$ unless $G$ is complete or odd cycle

**Chromatic Number Bounds:** $\omega(G) \leq \chi(G) \leq \Delta(G) + 1$

**Bipartite Characterization:** $G$ bipartite ⟺ $G$ has no odd cycles

**Adjacency Matrix Powers:** $(A^k)_{ij}$ = number of walks of length $k$ from $i$ to $j$

**Radius-Diameter Construction:** For any $r,d$ with $r \leq d \leq 2r$, graph exists with $\text{rad}(G) = r$, $\text{diam}(G) = d$.  
_Construction:_ Path of length $d$ with additional vertices at distance $r$

**Center Realization:** Any graph can be center of some connected graph.  
_Construction:_ Attach pendant paths of appropriate lengths
