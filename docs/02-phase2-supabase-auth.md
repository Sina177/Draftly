# Phase 2: Supabase Auth + RLS

Adds user accounts and persistent storage so users can save and revisit past conversions.

## Why?

Auth + RLS demonstrates backend security knowledge. Saving history turns a demo into a real product. RLS specifically shows understanding of data isolation — a FAANG-relevant skill.

## Prerequisites

- Phase 1 (streaming pipeline) must be fully working first
- Create a Supabase project at supabase.com

---

## Step 6 — Supabase Project Setup

- Install packages: `@supabase/supabase-js` and `@supabase/ssr`
- Add to `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_project_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  ```

**Files:**
- `src/lib/supabase/client.ts` (new — browser client)
- `src/lib/supabase/server.ts` (new — server client)

---

## Step 7 — Auth UI

- Create sign-up and sign-in pages
- Use email/password for MVP (add OAuth later)
- Add Next.js middleware to protect routes (redirect unauthenticated users)
- Update TopNav to show user info when logged in

**Files:**
- `src/app/login/page.tsx` (new)
- `src/app/signup/page.tsx` (new)
- `src/lib/supabase/middleware.ts` (new)
- `middleware.ts` (new — Next.js root middleware)
- `src/components/TopNav.tsx` (modify)

---

## Step 8 — Database Schema + RLS

Run this SQL in the Supabase SQL editor:

```sql
-- Stores each generation
create table generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  image_url text not null,
  component_breakdown jsonb,
  generated_code text,
  format text default 'html',
  created_at timestamptz default now()
);

-- Enable RLS
alter table generations enable row level security;

-- Users can only see their own generations
create policy "Users can view own generations"
  on generations for select using (auth.uid() = user_id);

-- Users can only insert their own generations
create policy "Users can insert own generations"
  on generations for insert with check (auth.uid() = user_id);

-- Users can only delete their own generations
create policy "Users can delete own generations"
  on generations for delete using (auth.uid() = user_id);
```

---

## Step 9 — Image Storage

- Create a Supabase Storage bucket called `sketches`
- Upload the sketch image after Stage 1 analysis
- Store the public URL in `generations.image_url`
- Add RLS policy on the bucket so users only access their own uploads

---

## Step 10 — Save After Generation

- After Stage 2 streaming finishes, insert a row into `generations`
- Include: image_url, component_breakdown (JSON), generated_code (full string), format

---

## Key Decisions

| Decision | Choice | Why |
|---|---|---|
| Supabase client | `@supabase/ssr` | Designed for Next.js App Router, handles cookies properly |
| Auth strategy | Email/password (MVP) | Simplest to implement, add OAuth providers later |
| Image storage | Supabase Storage | Co-located with auth/DB, RLS built-in |
| When to save | After streaming completes | Need the full generated code string before inserting |
