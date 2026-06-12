# Phase 4: Evaluation Pipeline

Build a repeatable eval system that measures output quality and tracks accuracy over time as prompts are tuned.

## Why?

Most AI wrapper projects have zero evaluation — they eyeball a few examples and call it done. Building a real eval set demonstrates ML engineering maturity and shows you think about AI quality systematically. This is a strong FAANG signal.

## Prerequisites

- Phase 1 (streaming pipeline) must be working
- A collection of test sketches

---

## Step 1 — Build the Eval Set

Collect 20-30 sketches covering a range of complexity:

| Category | Examples | Count |
|---|---|---|
| Simple | Single button, login form, card | ~8 |
| Medium | Landing page hero, navbar + content, pricing table | ~10 |
| Complex | Full landing page, dashboard layout, multi-section page | ~8 |
| Edge cases | Messy handwriting, low contrast, rotated image | ~4 |

### Sources for sketches
- Draw them yourself on paper/whiteboard and photograph
- Screenshot simple existing UIs and hand-trace them
- Find open wireframe datasets online
- Ask friends/colleagues to sketch a "login page" and photograph it

Store them in a `evals/sketches/` directory with descriptive filenames (e.g., `simple-login-form.png`, `complex-dashboard.png`).

---

## Step 2 — Define Expected Outputs

You can't pixel-match AI output, so evaluate on structural correctness. For each sketch, create a JSON spec of what the output should contain:

```json
{
  "sketch": "simple-login-form.png",
  "expected_components": ["form", "email input", "password input", "submit button"],
  "expected_layout": "centered single column",
  "must_include_tags": ["form", "input", "button"],
  "must_not_include": ["nav", "footer"],
  "should_be_valid_html": true
}
```

Store these in `evals/expected/` as JSON files matching the sketch filenames.

---

## Step 3 — Build the Eval Script

Create a script (`scripts/run-evals.ts`) that:

1. Iterates through all sketches in `evals/sketches/`
2. Runs each through the Stage 1 (analyze) and Stage 2 (generate) pipeline
3. Compares the output against the expected spec
4. Scores each result on:
   - **Component detection accuracy** — did Stage 1 identify the right components?
   - **Tag presence** — does the generated HTML contain the expected tags?
   - **Valid HTML** — does the output parse without errors?
   - **No hallucinated components** — did it add things that aren't in the sketch?
5. Outputs a summary report with overall accuracy percentage

### Scoring approach

```
Score per sketch = (matched components / expected components) * 0.5
                 + (matched tags / expected tags) * 0.3
                 + (valid HTML ? 1 : 0) * 0.1
                 + (no hallucinations ? 1 : 0) * 0.1
```

Overall accuracy = average score across all sketches.

---

## Step 4 — Track Accuracy Over Time

- Save each eval run's results to a JSON file with a timestamp: `evals/results/2026-06-15.json`
- Include: prompt version, model version, overall accuracy, per-sketch scores
- Over time, this creates a history showing how prompt tuning affects quality
- Optionally: add a simple chart (even a markdown table in `evals/RESULTS.md`) tracking accuracy per run

---

## Step 5 — Integrate into Development Workflow

- Run evals after every significant prompt change
- Compare before/after accuracy to validate improvements
- If accuracy drops, revert the prompt change
- Document which prompt changes had the biggest impact

---

## Files Involved

- `evals/sketches/` (new directory — test images)
- `evals/expected/` (new directory — expected output specs as JSON)
- `evals/results/` (new directory — timestamped eval results)
- `scripts/run-evals.ts` (new — eval runner script)
- `evals/RESULTS.md` (new — accuracy tracking over time)

---

## The Interview Story

"I built an evaluation pipeline with 25 test sketches across 4 complexity tiers. Each sketch has a structural spec — expected components, required HTML tags, layout constraints. After every prompt change, I run the eval suite and compare accuracy. This caught a regression where a prompt tweak improved simple layouts but broke multi-section pages — something I would have missed with manual testing."
