# Phase 1: Streaming Pipeline

This is the core differentiator. It converts the current single API call into a two-stage pipeline with streaming output.

## Why?

A single-pass "upload -> get code" is what every competitor does. The two-stage approach (analyze first, then generate) improves output quality and creates a visually impressive demo where the page builds itself in real-time.

---

## Step 1 — Stage 1 API Route: `/api/analyze`

- Receives uploaded image (as FormData)
- Calls Claude asking for a JSON component breakdown only (no code)
- Example output:
  ```json
  {
    "components": [
      { "name": "Navbar", "description": "Top nav with logo and 3 links" },
      { "name": "Hero", "description": "Large heading with CTA button" },
      { "name": "FeatureGrid", "description": "3-column card grid" }
    ]
  }
  ```
- Returns the JSON to the frontend

**File:** `src/app/api/analyze/route.ts` (new)

---

## Step 2 — Component Breakdown UI

- After upload + analyze, show the user a list of detected components
- Each item is editable (rename, delete, add notes like "this is a search bar, not a dropdown")
- "Confirm & Generate" button proceeds to Stage 2

**File:** `src/components/ComponentBreakdown.tsx` (new)

---

## Step 3 — Stage 2 API Route: `/api/generate` (streaming)

- Rewrite the existing `/api/generate` route to use Server-Sent Events (SSE)
- Use the Anthropic SDK `.stream()` method instead of `.create()`
- Each token chunk is sent as an SSE event to the frontend
- The prompt includes the confirmed component breakdown for better output

**File:** `src/app/api/generate/route.ts` (rewrite)

---

## Step 4 — Frontend Streaming Handler

- Use `fetch` with a ReadableStream to consume SSE events
- Accumulate code tokens into state as they arrive
- CodeViewer updates in real-time as tokens stream in

**File:** `src/app/page.tsx` (update)

---

## Step 5 — Live Preview That Builds Itself

- Add an iframe using `srcdoc` to the preview panel
- As code accumulates, update the iframe every ~500ms (debounced)
- Handle partial/invalid HTML gracefully (only update when parseable, or use DOMParser to close unclosed tags)

**File:** `src/components/LivePreview.tsx` (new)

---

## Key Technical Decisions

| Decision | Choice | Why |
|---|---|---|
| Streaming method | Server-Sent Events (SSE) | Unidirectional, auto-reconnects, simpler than WebSockets |
| Anthropic streaming | `client.messages.stream()` | SDK has built-in streaming support |
| Preview update strategy | Debounced (~500ms) | Prevents flicker from updating on every single token |
| Partial HTML handling | DOMParser / tag-closing heuristic | Prevents broken preview from incomplete code |

---

## ActionBar State Updates

The ActionBar needs new states for the two-stage flow:

| State | Indicator | Text |
|---|---|---|
| idle | Grey dot | "Ready" |
| analyzing | Yellow dot | "Analyzing sketch..." |
| confirming | Blue dot | "Review components below" |
| generating | Yellow dot | "Generating code..." |
| done | Green dot | "Done" |
| error | Red dot | "Error" |

---

## All Files Involved

- `src/app/api/analyze/route.ts` (new)
- `src/app/api/generate/route.ts` (rewrite to SSE)
- `src/components/ComponentBreakdown.tsx` (new)
- `src/components/LivePreview.tsx` (new)
- `src/app/page.tsx` (update flow)
- `src/components/ActionBar.tsx` (update states)
- `src/components/PreviewPanel.tsx` (add iframe preview)
