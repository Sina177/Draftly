# Phase 3: History Feature

Builds the history page using Supabase tables from Phase 2.

## Why?

History turns a one-shot tool into a real product. It demonstrates full CRUD operations with RLS, and gives the "History" nav link actual functionality.

## Prerequisites

- Phase 2 (auth + database) must be complete

---

## Step 11 — History Page

Create `/history` page that shows all past generations for the logged-in user.

### Display

- Grid of cards, each showing:
  - Thumbnail of the original sketch (from Supabase Storage)
  - Date/time of generation
  - Format used (HTML / React)
  - Number of components detected
- Ordered by most recent first

### Interactions

- Click a card: loads that generation back into the main view (sketch + code)
- Delete button on each card (with confirmation dialog)
- Empty state: "No generations yet — upload a sketch to get started"

### Technical details

- Use a server component for initial data fetch (faster load)
- Supabase query: `select * from generations where user_id = auth.uid() order by created_at desc`
- Thumbnails: use the `image_url` stored from Phase 2

---

## Files Involved

- `src/app/history/page.tsx` (new)
- `src/components/HistoryCard.tsx` (new — optional, for grid items)
- `src/components/TopNav.tsx` (update "History" link to point to `/history`)
