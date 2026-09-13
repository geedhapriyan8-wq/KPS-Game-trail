# Manual preview (no Firebase needed)

An earlier version of this repo had a hand-maintained `preview.html` that
duplicated the game markup so it could be checked without logging in. It
drifted out of sync with the real page almost immediately (it was missing
the language switcher within one commit) and was removed — a copy of the
markup is a maintenance liability, not a shortcut.

This does the same job without that risk: it stubs out only
`js/firebase/*.js` so the **real, unmodified** `game/index.html` and
`index.js` run against fake data instead of live Firebase. There is no
duplicated markup, so there is nothing to drift.

## Set up once

From the project root:

```bash
cp -r . /tmp/kps-preview
cd /tmp/kps-preview

cat > js/firebase/init.js << 'JS'
export const auth = { currentUser: { uid: 'test-user', email: 'developer@kidsplaysafer.sg' }, authStateReady: () => Promise.resolve() };
export const db = {};
export const FIREBASE_VERSION = 'stub';
JS

cat > js/firebase/auth.js << 'JS'
import { DEVELOPER_EMAIL } from '../constants.js';
export { DEVELOPER_EMAIL };
export function isPasscodeUser(user) { return user?.email === DEVELOPER_EMAIL; }
export async function isAdmin() { return false; }
export async function signOutUser() {}
JS

cat > js/firebase/db.js << 'JS'
let counter = 0;
async function add(collectionName, data) {
  const id = 'test-doc-' + (++counter);
  console.log('[stub dbHelpers.add]', collectionName, id, JSON.stringify(data));
  return id;
}
export const dbHelpers = { add, list: async () => [], set: async () => {}, count: async () => 0, remove: async () => {} };
JS

cat > js/firebase/analytics.js << 'JS'
export function logKpsEvent(name, params) { console.log('[stub logKpsEvent]', name, JSON.stringify(params || {})); }
JS

python3 -m http.server 8900
```

Then open http://localhost:8900/game/index.html — you're signed in
automatically as the passcode user, the quiz runs normally, and every
Firestore write is logged to the browser console instead of touching real
data. Open http://localhost:8900/admin/dashboard.html the same way to
preview the dashboard (with empty data, since `list()` returns `[]`).

## Why this instead of a copy of the markup

- **Zero drift possible.** You're running the actual `game/index.html` and
  `index.js` — any change you make to the real page is what you're
  previewing, automatically.
- **Zero maintenance.** A hand-copied preview file needs updating every
  time the real markup changes, and nothing enforces that — this doesn't.
- **Disposable.** It's a throwaway copy in `/tmp`; delete it and re-copy
  whenever you want a fresh preview. The stub files never get committed.

Don't commit the stubbed `js/firebase/*.js` files back into the real
project — they're only for this throwaway copy.
