# Draftly — Architecture Overview

## What is Draftly?

A "sketch to code" web app. Users upload a hand-drawn UI sketch and receive clean frontend code. The differentiator is a **two-stage streaming pipeline with live preview**.

## Why this approach?

The core concept is not unique (v0.dev, TLDraw, Visily all exist). The streaming pipeline + component breakdown step demonstrates systems thinking, streaming architecture, and AI orchestration — high-signal for FAANG recruiters.

## Architecture

```
User uploads sketch
        |
        v
+--- Stage 1: Analysis ---+
|  Claude returns JSON     |
|  component breakdown     |
|  (not streamed)          |
+-----------+--------------+
            |
            v
   User confirms/edits breakdown
            |
            v
+--- Stage 2: Generation --+
|  Claude streams code      |
|  via Server-Sent Events   |
|  Preview updates live     |
+-----------+---------------+
            |
            v
   Save to Supabase (if authenticated)
```

## Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, Lucide icons, Inter + JetBrains Mono fonts
- **Code display:** Shiki (github-dark theme)
- **AI:** Anthropic SDK (Claude Sonnet), multimodal vision
- **Auth & DB:** Supabase (auth, PostgreSQL, storage)
- **Deployment:** Vercel

## Implementation Phases

1. **Phase 1 — Streaming Pipeline** (see `01-phase1-streaming-pipeline.md`)
2. **Phase 2 — Supabase Auth + RLS + Rate Limiting** (see `02-phase2-supabase-auth.md`)
3. **Phase 3 — History Feature** (see `03-phase3-history.md`)
4. **Phase 4 — Evaluation Pipeline** (see `04-phase4-evals.md`)
5. **Phase 5 — Parallel Generation + Incremental Re-generation** (see `05-phase5-optimization.md`)
