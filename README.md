# KPS Project Template

A starter template for Kids PlaySafer educational web apps and games — powered by **Firebase** (Auth, Firestore, Analytics, Hosting). No build step, no npm.

## Contents

- [What you get](#what-you-get)
- [First-time setup (developers)](#first-time-setup-developers)
- [The pages](#the-pages)
- [Working with the database](#working-with-the-database)
- [Analytics](#analytics)
- [Building your game](#building-your-game)
- [The scam quiz game (senior edition)](#the-scam-quiz-game-senior-edition)
- [What gets stored (data model)](#what-gets-stored-data-model)
- [Deploying to Firebase](#deploying-to-firebase)
- [Design system](#design-system)
- [Common snippets](#common-snippets)
- [Deploying](#deploying)
- [Admin: one-time project setup](#admin-one-time-project-setup)
- [Project structure](#project-structure)
- [Common issues](#common-issues)

---

## What you get

- **KPS branding** (logo, purple theme)
- **Two login screens**: a kid passcode and an admin login
- **Firestore database** with simple `add / list / set / count / remove` helpers
- **Firebase Analytics** with pre-wired events for login, game completion, and surveys
- **Firebase Hosting** for one-command deploys
- **No build step** — edit a file, refresh the browser

---

## First-time setup (developers)

### 1. Get your Firebase config from the admin

The admin will give you the Firebase web config values (apiKey, projectId, etc.). Open `js/firebase/config.js` and replace each `REPLACE_ME` with the value the admin provided.

> These values are NOT secrets — they identify the Firebase project but don't grant access. Security is enforced by Firestore rules (the admin sets these in the Firebase Console). Don't worry about committing this file.

### 2. Start the local dev server

The template ships with no dependencies — just open the files with any static web server. Pick one:

**Option A: VS Code Live Server extension** (easiest, no terminal)
Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), then right-click `index.html` → **Open with Live Server**.

**Option B: Python's built-in server** (ships with macOS/Linux)
```bash
python3 -m http.server 3000
```
Then open **http://localhost:3000**.

**Option C: Node's `npx`**
```bash
npx serve .
```
Downloads `serve` on demand and starts a server (default port 3000).

Auth and Firestore calls from your browser go to **real Firebase** (the project you configured in step 1). So when you sign in or write data locally, it's hitting your actual Firebase project.

### 3. Create test accounts in the Firebase Console

Open your project in the [Firebase Console](https://console.firebase.google.com):

1. **Authentication → Users → Add user**: create `developer@kidsplaysafer.sg` with any test passcode (e.g. `test1234`).
2. **Authentication → Users → Add user**: create an admin like `you@example.com` with a test password. Copy the admin user's UID from the table.
3. **Firestore Database → Start collection** named `admins`. Create a doc with **Document ID** set to the admin's UID, and fields:
   - `email` (string): the admin's email
   - `role` (string): `admin`

You can now sign in on the passcode screen (`test1234`) or admin screen (`you@example.com` / your password).

> Tip: if you want a clean separation between test data and production data, create two Firebase projects (e.g. `myproject-dev` and `myproject-prod`) and swap the values in `js/firebase/config.js` depending on where you're working.

---

## The pages

The app is a small set of plain HTML pages — one file per page. The browser navigates between them with normal links and redirects. Each page has its own JS file under `js/pages/` that handles auth checks and event wiring.

| URL | File | What it does |
|---|---|---|
| `/` | [index.html](index.html) | Passcode screen (kid login) |
| `/game/` | [game/index.html](game/index.html) | The game itself — edit this for your project |
| `/admin/` | [admin/index.html](admin/index.html) | Admin login |
| `/admin/dashboard.html` | [admin/dashboard.html](admin/dashboard.html) | Admin stats + sign out |

Each feature has its own folder. The default page in a folder is `index.html` (so `/game/` serves `game/index.html`). No rewrites, no config — URLs match the file layout.

Each page checks the auth state on load and redirects if the user is on the wrong page (e.g. a kid landing on `/admin/dashboard.html` bounces to `/admin/`). Firebase Auth state persists across page loads automatically.

### Passcode flow (kid)

The kid types a passcode. Behind the scenes, the template signs them in as the shared `developer@kidsplaysafer.sg` account, then redirects to `/game/`. To **rotate the passcode**, the admin resets that account's password in the Firebase Console — instantly invalidates every previous passcode.

### Admin flow

Real email + password login for project admins. The shared `developer@` account is explicitly rejected. After a successful sign-in, the template checks the `admins/{uid}` doc exists in Firestore — if not, the user is signed out with "Not an admin account." On success, redirects to `/admin/dashboard.html`.

"Forgot password?" sends a Firebase password reset email.

---

## Working with the database

Import the helpers from `js/firebase/db.js` and the collection constants from `js/constants.js`:

```javascript
import { dbHelpers } from '../firebase/db.js';
import { COLLECTIONS } from '../constants.js';

// Add a doc (auto-id, auto-timestamp)
await dbHelpers.add(COLLECTIONS.COMPLETIONS, { score: 8, level: 'easy' });
await dbHelpers.add(COLLECTIONS.SURVEYS, { question1: 'yes', question2: 'sometimes' });

// List docs
const recent = await dbHelpers.list(COLLECTIONS.COMPLETIONS, { orderBy: 'createdAt', limit: 50 });

// Total count (cheap — 1 read per 1,000 docs)
const total = await dbHelpers.count(COLLECTIONS.COMPLETIONS);

// Create or overwrite a doc at a specific id
await dbHelpers.set('myCol', 'fixed-id', { foo: 'bar' });

// Delete a doc
await dbHelpers.remove('myCol', 'fixed-id');
```

Every `add` and `set` automatically stamps `createdAt: serverTimestamp()`. The recommended Firestore rules below check for this field.

### Collection constants

Standard collections live in [`js/constants.js`](js/constants.js) so you never hardcode the string:

| Constant | String value | Used for | Read access (recommended rules) |
|---|---|---|---|
| `COLLECTIONS.COMPLETIONS` | `'completions'` | One doc per finished activity | Public read |
| `COLLECTIONS.SURVEYS` | `'surveys'` | One doc per survey response | Admin read only |
| `COLLECTIONS.ADMINS` | `'admins'` | Whitelist of admin UIDs | Owner read only, no client writes |

To add your own collection, just call `dbHelpers.add('myNewCollection', {...})` — or add a new entry to [`js/constants.js`](js/constants.js) and use `COLLECTIONS.MY_NEW_COLLECTION` for autocomplete + consistency.

---

## Analytics

The template pre-wires these events. Use the constants from [`js/constants.js`](js/constants.js) to avoid hardcoding strings:

| Constant | String value | When it fires |
|---|---|---|
| `EVENTS.LOGIN_ATTEMPT` / `_SUCCESS` / `_FAILURE` | `login_attempt`, etc. | Kid passcode form |
| `EVENTS.ADMIN_LOGIN_ATTEMPT` / `_SUCCESS` / `_FAILURE` | `admin_login_attempt`, etc. | Admin login form |
| `EVENTS.GAME_COMPLETED` | `game_completed` | Demo button on the game screen |
| `EVENTS.SURVEY_COMPLETED` | `survey_completed` | Example survey submit |
| — (automatic) | `page_view` | Every page load |

Import and call from anywhere in your page JS:

```javascript
import { logKpsEvent } from '../firebase/analytics.js';
import { EVENTS } from '../constants.js';

logKpsEvent(EVENTS.GAME_COMPLETED, { score: 8 });

// Custom events can use string literals, or you can add them to js/constants.js
logKpsEvent('quiz_completed', { score: 8, difficulty: 'medium' });
```

Analytics is disabled on `localhost` (so test events don't pollute production data) — log calls just go to `console.debug`.

---

## Building your game

Each page is one HTML file + one JS file. To build your activity, you only touch two files:

1. **Edit [`game/index.html`](game/index.html)** — inside the `DEVELOPER` comment block in `<main class="game-area">`, add your buttons, inputs, canvas, etc.
2. **Wire interactivity in [`js/pages/game/index.js`](js/pages/game/index.js)** — add `document.getElementById(...)` + `addEventListener(...)` for any elements you added.
3. When the user finishes, call `dbHelpers.add(COLLECTIONS.COMPLETIONS, { ...yourData })` to record it (the imports are already at the top of `index.js`).
4. **Edit the survey** by changing the `<template id="survey-template">` block in `game/index.html`. Or remove the `mountSurvey(...)` call from `game/index.js` to skip surveys entirely.
5. **Edit [`css/styles.css`](css/styles.css)** for any custom styling. The existing `.kps-*` classes match the brand look — reuse them.
6. **Add new collections** by calling `dbHelpers.add('whatever', {...})`. For autocomplete + consistency, add a constant in [`js/constants.js`](js/constants.js).
7. **Add new pages** in two steps:
   - Create `your-page/index.html` (copy [game/index.html](game/index.html) as a starting point). It'll be served at `/your-page/`.
   - Create matching `js/pages/your-page/index.js`.
   - That's it. No config changes needed.

The shared kid account means **every kid appears as the same Firebase user**. Don't store personal info in their data — keep `completions` and `surveys` anonymous.

---

## The scam quiz game (senior edition)

This template's `/game/` page is currently built out as a multiple-choice
scam-awareness quiz for seniors, covering Singapore-specific scam patterns.
This section documents how it works so the next developer can extend it
without having to reverse-engineer it.

### File map

| File | What it's for |
|---|---|
| `js/pages/game/questions.js` | The question bank: all scenarios, the `CATEGORIES` map, and `getRandomQuiz()` which builds one randomized playthrough. **This is the file you edit to add/change questions or categories.** |
| `js/pages/game/index.js` | Quiz engine: renders one question at a time, scores answers, fires analytics, saves the completion doc, then hands off to the existing survey. You shouldn't need to touch this to add content — only if you're changing *how* the quiz behaves. |
| `game/index.html` | The quiz/result card markup (`#quiz-screen`, `#quiz-result`) plus the existing survey `<template>`. |
| `css/styles.css` | `.kps-quiz-option`, `.kps-quiz-card`, `.kps-quiz-meta` / `.kps-category-badge` / `.kps-quiz-counter` / `.kps-progress-track` / `.kps-progress-fill`, and the `.screen-game` background rules. |
| `assets/kps/quiz-bg-tile.png` | The repeating mascot-sticker background tile behind the game screen. |
| `assets/kps/categories/*.png` | Full-opacity category mascot art (love, impersonation, investment, ecommerce), cropped from the original card illustrations. Used both to build the background tile and as the small icon shown next to the category name during play. |

### Question bank & categories

Each question in `QUESTIONS` (in `questions.js`) looks like:

```javascript
{
  category: 'impersonation',       // must match a key in CATEGORIES
  scenario: 'The situation...',
  options: ['choice A', 'choice B', 'choice C', 'choice D'],
  correctIndex: 1,                 // index into options[]
  explanation: 'Why that answer is right — shown after the player answers',
}
```

`CATEGORIES` maps each category key to a display label, emoji, optional
icon image path, and the two colors used to theme its badge (see
[Category badge & progress bar](#category-badge--progress-bar) below):

```javascript
export const CATEGORIES = {
  impersonation: {
    label: 'Impersonation',
    emoji: '🎭',
    icon: '/assets/kps/categories/impersonation.png',
    color: '#dbeafe',       // pastel badge background
    colorDark: '#1d4ed8',   // matching badge text color
  },
  blessing: {
    label: 'Blessing Scam',
    emoji: '🙏',
    icon: null,             // no artwork yet — badge falls back to the emoji
    color: '#ede9fe',
    colorDark: '#6d28d9',
  },
  ...
};
```

**To add a new scam category:** add an entry to `CATEGORIES` with a
`label`, `emoji`, `color`, and `colorDark`. If you have mascot artwork for
it, drop the PNG in `assets/kps/categories/` and point `icon` at it —
otherwise leave `icon: null` and the badge shows the emoji instead. Then
add questions with that `category` key to `QUESTIONS`. No other code
changes needed — the badge picks up the new colors and icon/emoji
automatically.

**To add more questions to an existing category:** just push more objects
into `QUESTIONS` with that `category`. Nothing else needs to change.

### Randomization

`getRandomQuiz(perCategory = 2)` (bottom of `questions.js`) builds one
quiz playthrough:

1. Groups all questions by category.
2. Shuffles each category's pool independently (Fisher–Yates) and takes up
   to `perCategory` from each — so every playthrough still covers every
   scam type, it's just *which* questions and in *what order* that varies.
3. Shuffles the combined list so categories don't always appear in the
   same sequence.

`index.js` calls this once per page load (`const quizQuestions = getRandomQuiz();`).
As the question bank grows, this automatically starts drawing from a
bigger pool — you don't need to change the randomization logic.

### Question header & progress bar

Each question screen shows a header row (`.kps-quiz-meta`) with two elements:

- **A neutral "Spot the scam" label** (`.kps-quiz-prompt`). This is
  deliberately **not** the scam category. Naming the category up front
  ("Love Scam") tells the player exactly what to look for and makes the
  question far easier than the real-life situation would be — it gives the
  answer away. Don't put the category here, and keep it out of the scenario
  text too.
- **`#quiz-counter`** — "Question X of Y", plain text.

Below that, `.kps-progress-track` / `#quiz-progress-fill` shows how far through
the quiz the player is, with `aria-valuenow` kept in sync for screen readers.

**The category is revealed after answering**, as a coloured tag inside the
feedback panel (`.kps-feedback-category`), and again on the results breakdown.
That's the right moment for it: naming the pattern once the player has
committed is what turns a single question into a transferable lesson.

The tag is themed per-category from two CSS custom properties set in JS:

```javascript
tag.style.setProperty('--badge-bg', cat.color);       // pastel background
tag.style.setProperty('--badge-ink', cat.colorDark);  // matching text colour
```

`color` / `colorDark` live on each entry in `CATEGORIES` (`questions.js`), so a
new category is themed automatically — just keep `colorDark` at 4.5:1 contrast
or better against its `color`.

### Analytics

Two events fire during the quiz (see `EVENTS` in `js/constants.js`):

- **`EVENTS.QUESTION_ANSWERED`** — fires on every answer, with
  `{ questionIndex, category, correct, selectedIndex }`. Use this to see
  which categories (or specific scenarios) trip people up most often.
- **`EVENTS.GAME_COMPLETED`** — fires once at the end, with
  `{ source: 'scam_scenario_quiz', score, total }`.

The `completions` doc saved at the end also stores a `categoryStats`
object for convenience, so you don't have to reconstruct it from raw
events:

```javascript
{
  source: 'scam_scenario_quiz',
  score: 7,
  total: 10,
  durationMs: 143201,
  categoryStats: {
    impersonation: { correct: 2, total: 2 },
    blessing:      { correct: 1, total: 2 },
    love:          { correct: 2, total: 2 },
    investment:    { correct: 1, total: 2 },
    ecommerce:     { correct: 1, total: 2 },
  },
}
```

This is exactly the shape you'd want for an admin dashboard chart of
"average score by scam category" — query `completions` and aggregate
`categoryStats` client-side, no schema change needed.

### Background art (the mascot tile)

`.screen-game` layers two backgrounds:

1. `assets/kps/quiz-bg-tile.png` — a repeating tile of the category mascots
   at partial opacity plus a few sparkle accents, arranged off-grid so it
   reads as scattered stickers rather than a rigid pattern.
2. A fixed (non-scrolling, non-repeating) diagonal brand-color gradient
   behind it, so the backdrop has color and depth even in the gaps between
   mascots.

Both are declared together in the `background-image` / `background-size`
/ `background-repeat` / `background-attachment` shorthand properties on
`.screen-game` in `css/styles.css` — each property takes two comma-separated
values, one per layer, in the same order.

**To regenerate the tile** (e.g. with new or updated mascot art): the tile
was built with a short Python/Pillow script that crops each card's
illustration, scales/rotates copies of it, composites them onto a
transparent canvas at partial opacity, and draws a few star accents on
top. If you're changing the artwork, the fastest path is redoing that
composite (any image editor or a similar script works) and overwriting
`assets/kps/quiz-bg-tile.png` — the CSS doesn't need to change unless you
change the tile's aspect ratio.

The tile's `background-size` uses `clamp()` so the pattern scales down on
phones and up on laptops instead of staying a fixed pixel size — see
**Responsive design** below.

### Responsive design (phone / tablet / laptop)

- `.kps-quiz-card` (applied to both `#quiz-screen` and `#quiz-result`, in
  addition to `.kps-card`) caps the quiz card's width at 460px on phones,
  600px from 700px viewport width up, and 680px from 1100px up (see the
  `@media (min-width: 700px)` / `@media (min-width: 1100px)` rules in
  `css/styles.css`). This is separate from the 460px cap used by the
  passcode/admin login cards, which are intentionally left compact.
- The scenario heading, answer-option text, and progress line use
  `clamp(min, preferred, max)` font sizes instead of fixed `rem` values,
  so text scales smoothly across screen sizes instead of jumping at
  breakpoints.
- The background tile's `background-size` also uses `clamp()` (in `vw`
  units) so the mascot pattern's density looks right on both a phone and
  a laptop screen instead of being a fixed pixel size that looks
  oversized on small screens or sparse on large ones.
- `.game-area` has `align-items: center`, so the quiz card stays centered
  at every viewport width rather than only looking centered by
  coincidence at one width.

If you add new elements to the quiz card, prefer `clamp()` over fixed
`rem`/`px` sizes for anything text-related, and test at roughly 375px
(phone), 820px (tablet), and 1440px (laptop) widths.

### A CSS gotcha worth knowing: `[hidden]` vs. `display`

The template hides/shows elements with the native `hidden` attribute
(`element.hidden = true` in JS, or a static `hidden` attribute in HTML).
By default the browser hides anything with `hidden` — **but only if no
other CSS rule on that element also sets `display`.** Several classes in
this template do (`.kps-btn` sets `display: inline-flex`, `.kps-card`
sets `display: flex`), and those rules override the browser's default
`[hidden]` behavior because both are "author" styles of equal
specificity, and the later one in the stylesheet wins.

This was previously a real bug here: the "Next" button and the results
card were both visible from the very first question, because `.kps-btn`
and `.kps-card` silently cancelled out their `hidden` attributes.

The fix is one rule near the top of `css/styles.css`:

```css
[hidden] {
  display: none !important;
}
```

**Don't remove this rule.** If you ever add a new element that should be
hidden/shown via the `hidden` attribute and it doesn't seem to work,
check whether some other class on it also sets `display` — that's almost
certainly why, and this rule is what's supposed to prevent it.

---

## What gets stored (data model)

Two collections capture everything the quiz produces. Both are written by
`js/pages/game/index.js` and validated by `firestore.rules`.

### `completions` — one document per playthrough

```javascript
{
  createdAt: <serverTimestamp>,
  source: 'scam_scenario_quiz',
  score: 8,
  total: 10,
  durationMs: 143201,
  categoryStats: {
    impersonation: { correct: 2, total: 2 },
    blessing:      { correct: 1, total: 2 },
    // ... one entry per category the player saw
  },
  answers: [
    {
      questionId: 'blessing-02',  // stable id from questions.js
      category: 'blessing',
      position: 1,                // where it fell in this playthrough
      selectedIndex: 0,           // what they picked
      correctIndex: 1,            // what was right
      correct: false,
      timeMs: 12480,              // time spent on this question
    },
    // ... one entry per question
  ],
}
```

`answers` is the important addition: it records **every individual right and
wrong answer**, not just the total. Because `selectedIndex` is stored, you can
see *which wrong option* people pick — that tells you whether a distractor is
genuinely tempting (useful) or just confusing (needs rewriting).

Public read is allowed so the passcode screen can show a live "games played"
count. Keep this collection anonymous — no names, no personal details.

### `surveys` — one document per feedback response

```javascript
{
  createdAt: <serverTimestamp>,
  source: 'scam_scenario_quiz',
  completionId: 'AbC123...',      // links to the completion above
  confidenceBefore: '2',
  confidenceAfter: '4',
  feelsMoreAware: 'yes',
  mostWorryingScam: 'impersonation',
  difficulty: 'just_right',
  wouldShare: 'yes',
  learning: 'Never send money to someone I have not met.',
}
```

`completionId` is what makes this genuinely analysable: you can join a person's
self-reported confidence change to how they *actually* scored. "Players who
said they felt more aware also improved on impersonation questions" is a much
stronger claim than either number alone.

Admin-read only, since free text could conceivably identify someone.

### Seeing the data

The admin dashboard (`/admin/dashboard.html`) has three views:

| View | Shows |
|---|---|
| **Surveys** | One row per feedback response |
| **Completions** | One row per playthrough — score, %, time taken, per-category split |
| **Question accuracy** | Aggregated across all players: how often each question is answered correctly, **worst first** |

"Question accuracy" is the one to check regularly. The questions at the top are
either genuinely hard (teach them harder) or badly worded (rewrite them) — and
the accuracy figure tells you which questions are doing real work.

The **Export All (.xlsx)** button exports whichever view is currently open.

---

## Deploying to Firebase

### Before your first deploy

1. **Firebase Console → Authentication → Users.** Create the shared player
   account (`developer@kidsplaysafer.sg`) with the passcode players will type,
   and a separate admin account with your own email.
2. **Firestore → `admins` collection.** Add a document whose **ID is your
   admin account's Auth UID**, with fields `email` (string) and `role: admin`.
   Without this you'll be signed straight back out of the dashboard.
3. **Check `.firebaserc`** points at the right project ID.
4. **Run the rules tests** (see `tests/rules/`) — the rules reject unexpected
   fields, so this catches a broken write before your players hit it.

### Deploy

```bash
npx firebase login          # once
npx firebase deploy --only firestore:rules,hosting
```

Deploy the rules **at the same time as** hosting, or before it. The current
rules validate fields that older rules don't know about — if you deploy the
site without the rules, every completion write will be rejected and players
will see "Could not record completion".

### Verify after deploying

Play one full round on the live URL, then check in the Firebase Console that:

- a new `completions` document exists, and its `answers` array has one entry
  per question;
- a new `surveys` document exists, and its `completionId` matches that
  completion's document ID;
- the dashboard's three views all load.

If a write fails, the browser console shows the rules rejection. The most
common cause is adding a field in `game/index.js` without adding it to the
`hasOnly([...])` list in `firestore.rules`.

### `preview.html` is not deployed

It's excluded in both `firebase.json` and `.vercelignore`. Delete it if you'd
rather it weren't in the repo at all.

---

## Design system

`css/styles.css` is organised as a small design system rather than a pile of
one-off rules. Read this before adding UI — using the existing tokens is what
keeps new work looking like it belongs.

### Brand identity (don't dilute this)

The KPS look is **bold rounded type, thick black outlines, and offset "sticker"
shadows on a purple field**. That is deliberately distinctive and should be
preserved. The refinements below systematise it; they don't replace it.

### Nunito must be loaded on every page

`body` asks for `'Nunito'`. **The CSS alone doesn't load it.** Every page needs
this in its `<head>`, above the stylesheet link:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,600&display=swap" rel="stylesheet" />
```

This was missing for a long time, and the app silently fell back to Segoe UI on
Windows — which is most of why it used to look generic. If you add a new page,
copy this block. To check it's working, run this in the browser console; it
should say `true`:

```javascript
document.fonts.check('700 1rem Nunito')
```

### Tokens

Everything is defined in `:root` at the top of `css/styles.css`. Use the token,
not a raw value — a hard-coded `0.85rem` or `#555` is how a design system rots.

| Group | Tokens | Notes |
|---|---|---|
| Brand | `--kps-purple`, `--kps-purple-dark`, `--kps-bg`, `--kps-ink`, `--kps-muted` | The original palette, unchanged |
| Derived tints | `--kps-purple-50/100/200/700` | All sampled from the purple ramp — no new hues were introduced |
| Semantic | `--kps-success`, `--kps-danger` + their `-bg` tints | Dark enough to pass AA on their own tint |
| Type | `--fs-xs` … `--fs-2xl` | `--fs-base` is **17px**, deliberately larger than typical |
| Spacing | `--sp-1` … `--sp-10` | 4px grid |
| Geometry | `--kps-border`, `--kps-radius*` | |
| Elevation | `--kps-shadow-sm/‑/‑lg`, `--kps-shadow-pressed` | Two layers — see below |
| Motion | `--dur-fast`, `--dur`, `--ease` | |
| Targets | `--tap` (48px) | Minimum comfortable hit area |

### Elevation is two layers, always

The flat offset block is the brand mark. The soft ambient shadow underneath is
what makes it read as crafted rather than flat. Both are baked into each
elevation token, so just use the token:

```css
box-shadow: var(--kps-shadow);
/* = 5px 5px 0 0 black, 0 10px 24px -14px rgba(40, 8, 60, 0.5) */
```

Interactive elements lift on hover (`translate(-1px, -1px)`, larger shadow) and
press down on click (`translate(2px, 2px)`, `--kps-shadow-pressed`). That
physical metaphor is already implied by the offset shadow — the motion just
makes it responsive.

### Accessibility rules that are not optional

This quiz is built for seniors. These decisions look unusual next to a typical
SaaS design system and are intentional — **please don't "modernise" them away**:

- **17px base type, 700-weight body copy.** Small, light, low-contrast text is
  a current design trend and is wrong for this audience.
- **48px minimum touch targets** (`--tap`) on every button, pill, scale option,
  and input.
- **Never signal state with colour alone.** Answer options carry an A/B/C/D key
  that becomes ✓ or ✗ when answered, *and* change border colour, *and* get an
  `aria-label`. A colour-blind player gets the same information.
- **Every text/background pair must hit WCAG AA (4.5:1).** All 17 pairs
  currently in the palette pass. If you add a category colour, check it — the
  e-commerce badge originally failed at 4.27:1 and had to be darkened.
- **`prefers-reduced-motion` is honoured.** The media query at the bottom of the
  stylesheet strips transforms and transitions. Don't add animation that
  bypasses it.
- **One focus treatment**, defined once via `:focus-visible` — a white inner
  ring plus a purple outer ring, legible on both white cards and purple buttons.

### The logo

`assets/kps/kps_logo.svg` is the logo to use. It was traced from the original
`kps_logo.png` at 6× resolution, so the gamepad, wordmark, and rounded frame are
the **same shapes as the original artwork** — just resolution-independent, so it
stays crisp on retina screens and at any size.

It fills with `currentColor`, which means you can tint it by setting `color` on
the element:

```css
.game-header-logo { color: var(--kps-ink); }      /* default black */
```

The PNG is kept in the repo for anywhere an SVG isn't usable (email, social
cards). Prefer the SVG on the web.

### Local visual preview

`preview.html` renders the real quiz markup, CSS, and question bank with
Firebase stubbed out, so you can check design changes without logging in or
writing test rows to Firestore. With the dev server running:

- `/preview.html` — a question, unanswered
- `/preview.html?answered=1` — the revealed correct/incorrect state
- `/preview.html?screen=result` — the results breakdown and full survey

It's excluded from deploys in both `firebase.json` and `.vercelignore`, so it
never ships. Delete it if you'd rather not keep it.

### The feedback survey

The survey shown after the quiz (the `<template id="survey-template">` block in
`game/index.html`) has seven questions, aimed at measuring **awareness change**
rather than just satisfaction:

| Field | Type | Why it's there |
|---|---|---|
| `confidenceBefore` | 1–5 | Baseline self-rated confidence |
| `confidenceAfter` | 1–5 | Paired with the above, gives a measurable delta per player |
| `feelsMoreAware` | yes / somewhat / no | Direct read on perceived impact |
| `mostWorryingScam` | category | Which scam type worries them in real life — options are generated from `CATEGORIES`, so this can't drift out of sync with the question bank |
| `difficulty` | easy / just right / hard | Calibration signal for the question bank |
| `wouldShare` | yes / maybe / no | Proxy for onward reach beyond the player |
| `learning` | free text, optional | Qualitative colour for reports |

The `confidenceBefore` / `confidenceAfter` pair is the useful one for impact
reporting — the difference between them is a per-player awareness delta, which
is far more defensible to a funder than a satisfaction score.

To add a question: add the markup to the template, and it's picked up
automatically — `mountSurvey()` submits with
`Object.fromEntries(new FormData(form))`, so any named field is saved without
touching the JS. Reuse `.kps-scale` for 1–5 ratings and `.kps-pill-group` for
short choices.

---

## Common snippets

Copy-paste starting points for the things you'll do most.

### Track a completion with a score

```javascript
import { dbHelpers } from '../../firebase/db.js';
import { COLLECTIONS } from '../../constants.js';
import { logKpsEvent } from '../../firebase/analytics.js';
import { EVENTS } from '../../constants.js';

await dbHelpers.add(COLLECTIONS.COMPLETIONS, {
  score: 8,
  timeTakenSec: 42,
  level: 'easy',
});
logKpsEvent(EVENTS.GAME_COMPLETED, { score: 8 });
```

### Save a custom survey response

```javascript
await dbHelpers.add(COLLECTIONS.SURVEYS, {
  ageGroup: '10-12',
  enjoyed: 'yes',
  feedback: 'fun!',
});
```

### Log a custom analytics event

```javascript
logKpsEvent('hint_used', { questionIndex: 3 });
// On localhost this just logs to the console.
// On the deployed site it sends to Firebase Analytics.
```

### Read survey responses (admin pages only — public read is blocked by rules)

```javascript
const surveys = await dbHelpers.list(COLLECTIONS.SURVEYS, {
  orderBy: 'createdAt',
  orderDir: 'desc',
  limit: 100,
});
console.log(surveys); // array of { id, createdAt, ...fields }
```

### Show a "thank you" then auto-redirect

```javascript
// Inside an event handler
status.textContent = 'Thanks for playing!';
status.hidden = false;
setTimeout(() => { window.location.href = '/'; }, 2000);
```

### Multi-step game (show one step at a time)

```html
<!-- in your-page/index.html -->
<section id="step-1">…intro…<button data-next>Start</button></section>
<section id="step-2" hidden>…question 1…<button data-next>Next</button></section>
<section id="step-3" hidden>…question 2…<button data-next>Finish</button></section>
```

```javascript
// in js/pages/your-page/index.js
const steps = [...document.querySelectorAll('section[id^="step-"]')];
let current = 0;
function show(i) {
  steps.forEach((s, idx) => (s.hidden = idx !== i));
}
steps.forEach((step) => {
  step.querySelector('[data-next]')?.addEventListener('click', () => {
    current++;
    if (current < steps.length) show(current);
    else dbHelpers.add(COLLECTIONS.COMPLETIONS, { source: 'multi-step' });
  });
});
show(0);
```

---

## Deploying Rules

```bash
npx firebase deploy --only firestore:rules
```

This pushes your code AND the Firestore rules in [`firestore.rules`](firestore.rules). `npx` downloads `firebase-tools` on demand — no permanent install needed (though you can run `npm install -g firebase-tools` once if you'd rather have the `firebase` command available directly).

The first time you deploy, run `npx firebase login` once to authenticate, and make sure `.firebaserc` has the correct project ID.

> Heads up: deploying replaces the rules in the Firebase Console with whatever is in `firestore.rules`. If your admin edits rules in the console, copy those changes back into `firestore.rules` so the next deploy doesn't overwrite them.

---

## Admin: one-time project setup

> This section is for the project **admin** setting up a new Firebase project.

### Create the Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com) → **Add project**.
2. Choose a name; enable Google Analytics (recommended — needed for the Analytics features in this template).

### Enable Authentication

1. Build → Authentication → **Get started** → enable **Email/Password** provider.
2. Authentication → Users → **Add user**: create `developer@kidsplaysafer.sg` with the passcode you want kids to use.

### Enable Firestore

1. Build → Firestore Database → **Create database** → choose region → start in **Production mode**.
2. The rules in [`firestore.rules`](firestore.rules) will be applied automatically the first time a developer runs `npx firebase deploy`. You don't need to paste anything into the console.

### Firestore rules (reference)

The full ruleset lives in [`firestore.rules`](firestore.rules) — read it to understand exactly what's allowed. The short version:

| Collection | Read | Write |
|---|---|---|
| `completions` | Anyone | Signed-in users can create; no updates/deletes |
| `surveys` | Admins only | Signed-in users can create; no updates/deletes |
| `admins` | The admin themselves (own doc) | No client writes — add via console |

Rules are deployed alongside hosting by `npx firebase deploy --only firestore:rules`. Local dev talks to real Firebase, so the same rules apply in dev and prod.

### Add admin users

For each person who needs admin access:

1. Authentication → Users → **Add user** with their email + a temporary password.
2. Copy that user's **User UID** from the Users table.
3. Firestore → **Start collection** `admins` (only needed the first time).
4. Create a document with **Document ID** set to the UID, and fields:
   - `email` (string)
   - `role` (string) — e.g. `admin`

That user can now sign in at `/admin/` on the deployed site. Tell them to use "Forgot password?" to set their own password.

### Distribute the Firebase config

In the Firebase Console: **Project settings (gear icon)** → **General** → scroll to **Your apps** → **Web app** → **SDK setup and configuration** → **Config**. Copy each value (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, `measurementId`) and give them to your developers to paste into `js/firebase/config.js`.

---

## Project structure

```
kps-project-template/
├── index.html              ← passcode screen (kid login) → /
├── 404.html                ← shown for unknown URLs (Firebase Hosting picks it up automatically)
├── game/
│   └── index.html          ← the game → /game/ (edit this for your project)
├── admin/
│   ├── index.html          ← admin login → /admin/
│   └── dashboard.html      ← admin dashboard → /admin/dashboard.html
├── css/styles.css          ← styles (extend for your project)
├── js/
│   ├── constants.js        ← COLLECTIONS, EVENTS, DEVELOPER_EMAIL
│   ├── firebase/           ← all Firebase wiring lives here
│   │   ├── config.js       ← config from your admin (edit this!)
│   │   ├── init.js         ← Firebase SDK bootstrap
│   │   ├── auth.js         ← passcode + admin auth flows
│   │   ├── db.js           ← dbHelpers.add/list/set/count/remove
│   │   └── analytics.js    ← logKpsEvent
│   └── pages/              ← one JS file per HTML page (mirrors HTML layout)
│       ├── index.js        ← drives index.html
│       ├── game/
│       │   ├── index.js     ← quiz engine — drives game/index.html
│       │   └── questions.js ← question bank + CATEGORIES + getRandomQuiz() — edit this to add content
│       └── admin/
│           ├── index.js    ← drives admin/index.html
│           └── dashboard.js ← drives admin/dashboard.html
├── assets/kps/             ← logo + favicon
│   ├── kps_logo.svg        ← vector logo (use this on the web; fills with currentColor)
│   ├── kps_logo.png        ← original raster logo, kept for non-web use
│   ├── quiz-bg-tile.png    ← repeating mascot background tile for the game screen
│   └── categories/         ← full-opacity category mascot art (love, impersonation, investment, ecommerce)
├── preview.html            ← local-only visual preview, excluded from deploys
├── firestore.rules         ← Firestore access rules (read this!)
├── firebase.json           ← hosting + Firestore config (used at deploy)
└── .firebaserc             ← Firebase project ID
```

**One feature, one folder.** To change the game UI, you edit `game/index.html` and `js/pages/game/index.js`. Same for admin. No router, no hidden sections, no template literals.

See [The scam quiz game (senior edition)](#the-scam-quiz-game-senior-edition) above for how the current quiz content, randomization, analytics, background art, and responsive sizing fit together.

---

## Common issues

**Blank page that says "Firebase config not set"** — fill in the `REPLACE_ME` values in `js/firebase/config.js`.

**"Port 3000 already in use"** — another process is using port 3000. Pass a different port: `npx serve . -l 3001`.

**"Permission denied" errors in production** — make sure your admin pasted the Recommended Firestore Rules into the Firebase Console.

**"Failed to fetch gstatic.com"** — your network is blocking the Firebase CDN. Talk to your network admin, or download the Firebase SDK files and serve them locally.

**`firebase` command not found** — use `npx firebase ...` (downloads on demand), or install globally once: `npm install -g firebase-tools`.
