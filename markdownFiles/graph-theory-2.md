# Graph Theory Theorems & Proofs

_Complete collection of key theorems with and without proofs_

---

## 🔴 Theorems Without Proofs

### Handshaking Lemma

For any graph $G = (V, E)$: $\sum_{v \in V} \deg(v) = 2|E|$

**Corollary 1:** Number of vertices with odd degree is even  
**Corollary 2:** Average degree = $\frac{2|E|}{|V|}$

---

### Bipartite Graph Characterization

Graph $G$ is bipartite ⟺ $G$ contains no odd cycles

---

### Powers of Adjacency Matrix

For adjacency matrix $A$: $(A^k)_{ij}$ = number of walks of length $k$ from vertex $i$ to vertex $j$

---

### Chromatic Number Bounds

**Lower bound:** $\chi(G) \geq \omega(G)$ (clique number)  
**Upper bound:** $\chi(G) \leq \Delta(G) + 1$ (max degree + 1)  
**Improved:** $\chi(G) \geq \frac{n}{\alpha(G)}$ (independence number)

---

### Brooks' Theorem

If $G$ is connected and neither complete nor an odd cycle, then $\chi(G) \leq \Delta(G)$

---

### Eulerian Graph Characterization

For connected graph $G$, the following are equivalent:

- $G$ has Eulerian cycle
- All vertices have even degree
- Edge set can be partitioned into cycles

---

### Havel-Hakimi Algorithm

```
Input: Degree sequence d₁ ≥ d₂ ≥ ... ≥ dₙ
1. If all degrees are 0, return "graphic"
2. If d₁ ≥ n or d₁ < 0, return "not graphic"
3. Remove d₁, subtract 1 from next d₁ terms
4. Reorder and repeat
```

---

### Erdős-Gallai Theorem

Sequence $d_1 \geq d_2 \geq \ldots \geq d_n$ is graphic ⟺

1. $\sum_{i=1}^n d_i$ is even, and
2. For all $1 \leq k \leq n$:
   $$\sum_{i=1}^k d_i \leq k(k-1) + \sum_{i=k+1}^n \min(d_i, k)$$

---

### Kuratowski's Theorem

Graph $G$ is planar ⟺ $G$ contains no subdivision of $K_5$ or $K_{3,3}$

---

### Whitney Isomorphism Theorem

For graphs $G_1, G_2$ (neither $K_3$ nor $K_{1,3}$):

$G_1 \cong G_2$ ⟺ $L(G_1) \cong L(G_2)$

where $L(G)$ is the line graph of $G$

---

### Block Graph Characterization

Graph $G$ is a block graph ⟺ $G$ is a chordal graph with no induced $K_4$

Equivalently: Every block is a clique

---

### Handshaking Lemma for Digraphs

For any digraph $D = (V, A)$:
$$\sum_{v \in V} d^+(v) = \sum_{v \in V} d^-(v) = |A|$$

---

### Digraph Hamiltonian Generalization

**Meyniel's Theorem:** If for all non-adjacent vertices $u, v$:
$$d^+(u) + d^+(v) + d^-(u) + d^-(v) \geq 2n - 1$$

then the digraph is Hamiltonian.

---

## 🟢 Theorems With Proofs

### Radius-Diameter Construction

**Theorem:** For any integers $r, d$ with $r \leq d \leq 2r$, there exists a graph $G$ with $\text{rad}(G) = r$ and $\text{diam}(G) = d$.

**Proof (Construction):**

1. Start with path $P$ of length $d$: $v_0 - v_1 - \ldots - v_d$
2. Add vertex $c$ connected to $v_r$ (this will be in center)
3. Verify: $e(c) = \max\{r, d-r\} = r$ (since $d \leq 2r$)
4. For any $v_i$: $e(v_i) = \max\{i+1, d-i+1\} \geq r+1$
5. Thus $\text{rad}(G) = r$ and $\text{diam}(G) = d$ ∎

---

### Center Realization

**Theorem:** Any graph $H$ can be realized as the center of some connected graph $G$.

**Proof (Construction):**

1. Let $H$ have $n$ vertices
2. For each vertex $v \in V(H)$, attach path of length $n+1$
3. Call resulting graph $G$
4. For $v \in V(H)$: $e_G(v) = n+1$
5. For pendant vertices: eccentricity $> n+1$
6. For internal path vertices: eccentricity $> n+1$
7. Therefore $\text{center}(G) = V(H)$ ∎

---

### Five Color Theorem

**Theorem:** Every planar graph is 5-colorable.

**Proof:**

1. By induction on $|V|$. Base case: $|V| \leq 5$ is trivial
2. Assume theorem holds for all planar graphs with $< n$ vertices
3. By Euler's formula: $\sum \deg(v) = 2|E| \leq 6|V| - 12$
4. Average degree $< 6$, so $\exists v$ with $\deg(v) \leq 5$
5. Remove $v$, color $G - v$ with 5 colors by IH
6. If $\deg(v) \leq 4$, color $v$ with unused color
7. If $\deg(v) = 5$, use Kempe chain argument to free a color ∎

---

### Ore's Theorem

**Theorem:** If $G$ is simple with $n \geq 3$ vertices and $\deg(u) + \deg(v) \geq n$ for all non-adjacent $u, v$, then $G$ is Hamiltonian.

**Proof:**

1. Let $P = v_1v_2\ldots v_k$ be longest path in $G$
2. All neighbors of $v_1$ and $v_k$ are on $P$
3. Let $N(v_1) = \{v_{i_1}, \ldots, v_{i_s}\}$ where $i_1 < \ldots < i_s$
4. If $v_{i_j} \in N(v_1)$ then $v_{i_j-1} \notin N(v_k)$ (else cycle)
5. Since $|N(v_1)| + |N(v_k)| \geq n$ and $|P| \leq n$, get contradiction
6. Therefore $k = n$ and $P$ is Hamiltonian path
7. Connect endpoints using degree condition to get cycle ∎

**Dirac's Theorem (Corollary):** If $\deg(v) \geq n/2$ for all $v$, then $G$ is Hamiltonian.  
_Proof:_ For non-adjacent $u, v$: $\deg(u) + \deg(v) \geq n$. Apply Ore's theorem.

---

### Connected Graph Realization

**Theorem:** Graphic sequence $M$ is realizable by connected graph ⟺ $M$ is graphic and $\sum_{d \in M} d \geq 2(|M| - 1)$.

**Proof:**

1. ($\Rightarrow$) Connected graph on $n$ vertices has $\geq n-1$ edges
2. By handshaking: $\sum d = 2|E| \geq 2(n-1)$
3. ($\Leftarrow$) Use Havel-Hakimi to construct graph $G$
4. If $G$ disconnected with components $C_1, \ldots, C_k$
5. Then $|E| = \sum_{i=1}^k |E(C_i)| \leq \sum_{i=1}^k (|C_i| - 1) = n - k$
6. So $\sum d = 2|E| \leq 2(n-k) < 2(n-1)$, contradiction ∎

---

### Euler's Polyhedron Formula

**Theorem:** For connected planar graph: $v - e + f = 2$.

**Proof:**

1. Induction on $e$. Base: $e = 0 \Rightarrow v = 1, f = 1$. Check: $1 - 0 + 1 = 2$ ✓
2. Inductive step: Remove edge $e$
3. Case 1: $e$ is bridge. Then $v' = v$, $e' = e-1$, $f' = f-1$
4. By IH: $v' - e' + f' = 2 \Rightarrow v - (e-1) + (f-1) = 2$ ✓
5. Case 2: $e$ not bridge. Then $v' = v$, $e' = e-1$, $f' = f-1$
6. By IH: $v - (e-1) + (f-1) = 2 \Rightarrow v - e + f = 2$ ✓ ∎

---

### Intersection Graph Universality

**Theorem:** Every graph is the intersection graph of some family of sets.

**Proof (Construction):**

1. Given graph $G = (V, E)$
2. For each vertex $v \in V$, define $S_v = \{e \in E : v \in e\}$
3. Consider intersection graph $H$ of family $\{S_v : v \in V\}$
4. Vertices $u, v$ adjacent in $H$ ⟺ $S_u \cap S_v \neq \emptyset$
5. This happens ⟺ $\exists e \in E$ with $u, v \in e$
6. This happens ⟺ $u, v$ adjacent in $G$
7. Therefore $G \cong H$ ∎

---

### Acyclic Digraph Source-Sink

**Theorem:** Every acyclic digraph has a source and a sink.

**Proof:**

1. Suppose no source exists (all vertices have indegree $> 0$)
2. Start at any vertex $v_0$
3. Since $d^-(v_0) > 0$, $\exists v_1$ with $v_1 \to v_0$
4. Since $d^-(v_1) > 0$, $\exists v_2$ with $v_2 \to v_1$
5. Continue to build sequence $v_0 \leftarrow v_1 \leftarrow v_2 \leftarrow \ldots$
6. Since $|V|$ finite, some vertex repeats: $v_i = v_j$ for $i < j$
7. This creates directed cycle $v_i \leftarrow v_{i+1} \leftarrow \ldots \leftarrow v_j = v_i$
8. Contradiction! Similarly for sink ∎

---

### Rédei's Theorem

**Theorem:** Every tournament has a Hamiltonian path.

**Proof:**

1. Induction on $n = |V|$. Base: $n = 1, 2$ trivial
2. Assume true for tournaments on $n-1$ vertices
3. Remove vertex $v$, get tournament $T'$ on $n-1$ vertices
4. By IH, $T'$ has Hamiltonian path $P: u_1 \to u_2 \to \ldots \to u_{n-1}$
5. Case 1: $v \to u_1$. Then $v \to u_1 \to \ldots \to u_{n-1}$ is Hamiltonian
6. Case 2: $u_{n-1} \to v$. Then $u_1 \to \ldots \to u_{n-1} \to v$ is Hamiltonian
7. Case 3: $u_1 \to v$ and $v \to u_{n-1}$. Find $i$ with $u_i \to v \to u_{i+1}$
8. Then $u_1 \to \ldots \to u_i \to v \to u_{i+1} \to \ldots \to u_{n-1}$ is Hamiltonian ∎
