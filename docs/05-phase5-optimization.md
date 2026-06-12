# Phase 5: Parallel Generation + Incremental Re-generation

Optimize the code generation pipeline using parallel component generation, dependency tracking, and caching to reduce latency and token cost.

## Why?

This phase demonstrates real algorithm and data structure work — not just API wiring. It solves measurable performance problems (latency, cost) with well-known CS concepts (graphs, topological sort, hashing, tree diffing). This is the highest-signal engineering work in the project.

## Prerequisites

- Phase 1 (streaming pipeline) must be working
- Phase 4 (evals) is recommended so you can measure improvements

---

## Data Structures

### 1. Component Tree

Stage 1 currently returns a flat list of components. Upgrade it to a tree structure that captures parent-child relationships:

```json
{
  "root": {
    "name": "Page",
    "children": [
      {
        "name": "Navbar",
        "description": "Top nav with logo and 3 links",
        "children": [
          { "name": "Logo", "description": "Brand logo left-aligned" },
          { "name": "NavLinks", "description": "3 navigation links right-aligned" }
        ]
      },
      {
        "name": "Hero",
        "description": "Large heading with CTA button",
        "children": []
      },
      {
        "name": "FeatureGrid",
        "description": "3-column card layout",
        "children": [
          { "name": "FeatureCard", "description": "Icon + title + description", "repeat": 3 }
        ]
      }
    ]
  }
}
```

This tree drives both the generation order and the assembly of the final output.

### 2. Dependency Graph

A directed graph where edges represent "this component needs context from that component."

Examples of dependencies:
- A `NavLinks` component depends on `Navbar` (needs to know it's inside a flex container)
- A `FeatureCard` depends on `FeatureGrid` (needs to know the grid column count)
- Shared styles (color palette, font choices) are a root dependency for all components

Represent as an adjacency list:
```
{
  "NavLinks": ["Navbar"],
  "Logo": ["Navbar"],
  "FeatureCard": ["FeatureGrid"],
  "Hero": [],
  "Navbar": [],
  "FeatureGrid": []
}
```

### 3. Component Cache (Hash Map)

To know whether a component needs re-generation, hash its inputs:
- Component description
- Component dependencies (their generated code)
- Output format (HTML/React)
- Prompt version

Store as a map: `hash → generated code`

On edit, only components whose hash changed (or whose dependencies changed) get regenerated. Everything else is served from cache.

---

## Algorithms

### 1. Topological Sort

Before generating, topologically sort the dependency graph to determine:
- Which components have no dependencies (can be generated first / in parallel)
- Which components must wait for their dependencies to complete
- Generation "levels" — components at the same level can be parallelized

Example for the component tree above:
```
Level 0 (parallel): Navbar, Hero, FeatureGrid    (no deps)
Level 1 (parallel): Logo, NavLinks, FeatureCard  (depend on level 0)
Level 2: Page                                     (assembles all)
```

### 2. Tree Diffing

When the user edits the component breakdown and clicks "Regenerate":
1. Diff the old component tree against the new one
2. Identify which nodes changed (renamed, added, removed, description edited)
3. Mark changed nodes and all their dependents as "dirty"
4. Only regenerate dirty nodes — serve clean nodes from cache

### 3. Assembly / Merge

After all components are generated independently:
1. Walk the component tree in depth-first order
2. Insert each component's generated code at the correct position
3. Deduplicate shared imports (e.g., multiple components importing React)
4. Merge shared styles into a single style block or Tailwind config
5. Output the final assembled file

---

## Implementation Steps

### Step 1 — Upgrade Stage 1 output to a tree

- Modify the analyze prompt to return a nested component tree (not a flat list)
- Update `ComponentBreakdown.tsx` to display and edit a tree structure (collapsible nested list)
- Update the component breakdown type definitions

### Step 2 — Build the dependency graph

- Parse the component tree into an adjacency list
- Implement topological sort to determine generation levels
- Identify which components can be parallelized at each level

### Step 3 — Parallel component generation

- For each generation level, fire off parallel Claude API calls (one per component)
- Each call receives: the component description, its parent's generated code (if applicable), the original image for visual context
- Collect results as they complete
- Stream progress to the frontend (e.g., "Generating Navbar... Generating Hero... Assembling...")

### Step 4 — Assembly

- Walk the tree and insert generated code in order
- Deduplicate imports and merge styles
- Output the final assembled code to the CodeViewer

### Step 5 — Component cache

- Hash each component's inputs (description + dependency code + format)
- Store generated code in a cache (in-memory for MVP, Supabase for persistence)
- On regeneration, check cache first — skip Claude call for unchanged components

### Step 6 — Incremental re-generation

- When user edits a component and clicks "Regenerate":
  - Diff old tree vs. new tree
  - Mark dirty nodes + their dependents
  - Regenerate only dirty nodes (parallel where possible)
  - Serve clean nodes from cache
  - Re-assemble

---

## Measurable Results

Track these metrics before and after optimization:

| Metric | Before (single-pass) | After (parallel + cache) |
|---|---|---|
| Full generation latency | ~12-15s | ~4-6s (limited by slowest parallel group) |
| Re-generation after edit | ~12-15s (full re-gen) | ~2-4s (only dirty components) |
| Token cost per generation | ~4000 tokens | ~4000 tokens (same for full gen) |
| Token cost per re-gen | ~4000 tokens | ~800-1600 tokens (only dirty components) |

---

## Files Involved

- `src/lib/componentTree.ts` (new — tree data structure, parsing, diffing)
- `src/lib/dependencyGraph.ts` (new — graph construction, topological sort)
- `src/lib/componentCache.ts` (new — hash-based cache)
- `src/lib/assembler.ts` (new — merge independently generated components)
- `src/app/api/analyze/route.ts` (modify — return tree structure)
- `src/app/api/generate/route.ts` (modify — parallel generation per component)
- `src/components/ComponentBreakdown.tsx` (modify — tree display and editing)

---

## The Interview Story

"I built a dependency graph of UI components, topologically sorted it to determine parallel generation groups, and used content-addressable caching to skip re-generation of unchanged subtrees. Full generation runs 5 components in parallel, reducing latency from 12 seconds to 4. On edits, tree diffing identifies dirty nodes — changing one component only re-generates that subtree, cutting token cost by 80%. I validated this with a 25-sketch eval suite that tracks accuracy across prompt changes."
