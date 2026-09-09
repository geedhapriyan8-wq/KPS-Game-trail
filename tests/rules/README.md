# Firestore rules tests

These run `firestore.rules` against a local Firestore emulator using the exact
payloads `game/index.js` writes, so you can prove a rules change won't silently
break real submissions **before** deploying to production.

This matters more than usual here: if a rule rejects a write, the player just
sees "Could not record completion" and the data is gone. There's no retry.

## Run them

Requires Node 18+ and Java 11+ (the emulator is a Java process).

```bash
cd tests/rules
cp ../../firestore.rules .     # test against the current rules
npm install
npm test
```

Expected output ends with `15 passed, 0 failed`.

## What's covered

**Completions** — a real 10-question payload writes successfully; public read
works (the login screen's live count depends on it); signed-out writes are
rejected; and malformed payloads are rejected: `score > total`, an `answers`
array whose length doesn't match `total`, an oversized quiz, and unexpected
extra fields.

**Surveys** — the full seven-question response writes successfully; a non-admin
cannot read the collection back; out-of-range confidence values, invalid
difficulty values, and 5000-character free text are all rejected; and a
response with the optional fields omitted still writes.

**Admins** — a player cannot write themselves into the `admins` collection.

## When to run

Any time you change `firestore.rules`, or add/rename a field written by
`game/index.js`. The rules use `hasOnly([...])` to reject unexpected fields,
so **adding a new field to a completion or survey without adding it to the
rules will break every write.** These tests catch that immediately.
