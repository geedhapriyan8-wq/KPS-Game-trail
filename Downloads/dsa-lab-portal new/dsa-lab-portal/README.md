# DAC Lab Portal

An interactive learning dashboard for the SIM Data Analytics Club: 11 topics,
14 auto-graded labs (built from your session decks), real member accounts,
and progress that syncs across devices.

- Python labs run for real in the browser via **Pyodide** (Python compiled to
  WebAssembly) — no server, no execution cost.
- SQL labs run for real via **sql.js** (SQLite compiled to WebAssembly).
- Conceptual labs (AI Ethics, Intro to ML, EDA & Viz) use auto-graded
  multiple choice.
- Accounts, sessions, and progress are stored in **Supabase** (free tier).

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project (free tier is enough).
2. Once it's ready, open **SQL Editor** → paste the contents of
   `supabase/schema.sql` → Run. This creates the `profiles` and
   `lab_progress` tables with row-level security, plus a trigger that
   auto-creates a profile whenever a member signs up.
3. Go to **Project Settings → API** and copy:
   - Project URL
   - `anon` `public` key

## 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in the two values from step 1.

## 3. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll land on the login page. Sign up a test
account (email + password; Supabase sends a confirmation email by default —
you can turn that off in **Authentication → Providers → Email** while
testing internally with the club).

## 4. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: New Project → import the repo.
3. Add the same two environment variables (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`) under Project Settings → Environment
   Variables.
4. Deploy. That's it — no other backend to host.

## Adding or editing labs

All curriculum content lives in code, not the database, so you can edit it
like any other file and redeploy:

- `lib/content/foundations.ts` — Python + GitHub, Python, AI Ethics
- `lib/content/data.ts` — SQL, EDA, EDA & Visualization, Webscraping
- `lib/content/ml.ts` — Intro to ML, ML Algorithms, NLP, Prompt Engineering

Each lab is an object with `concepts` (beginner-friendly explanation blocks)
and one `exercise` of type `"python"`, `"sql"`, or `"mcq"`. To add a new lab,
copy an existing one in the same file and give it a unique `id`. To add a
brand-new topic, add a new object to the relevant array (or a new file) and
export it from `lib/content/index.ts`.

**Python exercises** compare trimmed stdout exactly, so write instructions
that pin down the exact expected output (e.g. "rounded to 1 decimal place").

**SQL exercises** compare returned rows regardless of order, so you don't
need to worry about matching row order exactly, just the values.

## Notes on the "Prompt Engineering" topic

Your source list had two Prompt Engineering sessions but only one deck was
uploaded — I've built out the first lab (`prompt-engineering-basics`). Send
me the second deck whenever it's ready and I'll add a second lab under the
same topic, the same way the SQL/NLP/ML Algorithms two-parters are set up.
