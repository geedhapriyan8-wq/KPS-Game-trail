# KPS Project Template

A starter template for Kids PlaySafer educational web apps and games — powered by **Firebase** (Auth, Firestore, Analytics, Hosting). No build step, no npm.

## Contents

- [What you get](#what-you-get)
- [First-time setup (developers)](#first-time-setup-developers)
- [The pages](#the-pages)
- [Working with the database](#working-with-the-database)
- [Analytics](#analytics)
- [Building your game](#building-your-game)
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
│       │   └── index.js    ← drives game/index.html (edit for your game)
│       └── admin/
│           ├── index.js    ← drives admin/index.html
│           └── dashboard.js ← drives admin/dashboard.html
├── assets/kps/             ← logo + favicon
├── firestore.rules         ← Firestore access rules (read this!)
├── firebase.json           ← hosting + Firestore config (used at deploy)
└── .firebaserc             ← Firebase project ID
```

**One feature, one folder.** To change the game UI, you edit `game/index.html` and `js/pages/game/index.js`. Same for admin. No router, no hidden sections, no template literals.

---

## Common issues

**Blank page that says "Firebase config not set"** — fill in the `REPLACE_ME` values in `js/firebase/config.js`.

**"Port 3000 already in use"** — another process is using port 3000. Pass a different port: `npx serve . -l 3001`.

**"Permission denied" errors in production** — make sure your admin pasted the Recommended Firestore Rules into the Firebase Console.

**"Failed to fetch gstatic.com"** — your network is blocking the Firebase CDN. Talk to your network admin, or download the Firebase SDK files and serve them locally.

**`firebase` command not found** — use `npx firebase ...` (downloads on demand), or install globally once: `npm install -g firebase-tools`.
