import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing';
import { doc, setDoc, addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';

const env = await initializeTestEnvironment({
  projectId: 'demo-kps-test',
  firestore: { rules: fs.readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
});

const player = env.authenticatedContext('passcode-user').firestore();
const anon = env.unauthenticatedContext().firestore();

// A realistic completion, exactly as game/index.js builds it.
const answers = Array.from({ length: 10 }, (_, i) => ({
  questionId: `imp-0${(i % 2) + 1}`,
  category: 'impersonation',
  position: i + 1,
  selectedIndex: 1,
  correctIndex: 1,
  correct: true,
  timeMs: 8400,
}));

const completion = {
  createdAt: serverTimestamp(),
  source: 'scam_scenario_quiz',
  score: 8,
  total: 10,
  durationMs: 143201,
  categoryStats: { impersonation: { correct: 2, total: 2 } },
  answers,
};

const survey = {
  createdAt: serverTimestamp(),
  source: 'scam_scenario_quiz',
  completionId: 'abc123',
  confidenceBefore: '2',
  confidenceAfter: '4',
  feelsMoreAware: 'yes',
  mostWorryingScam: 'impersonation',
  difficulty: 'just_right',
  wouldShare: 'yes',
  learning: 'Never send money to someone I have not met.',
};

let pass = 0, fail = 0;
async function check(name, promise) {
  try { await promise; console.log(`  PASS  ${name}`); pass++; }
  catch (e) { console.log(`  FAIL  ${name}\n        ${e.message.split('\n')[0]}`); fail++; }
}

console.log('\nCOMPLETIONS');
await check('signed-in player can write a real completion',
  assertSucceeds(addDoc(collection(player, 'completions'), completion)));
await check('anyone can read completions (live count on login screen)',
  assertSucceeds(getDocs(collection(anon, 'completions'))));
await check('signed-out user cannot write',
  assertFails(addDoc(collection(anon, 'completions'), completion)));
await check('rejects score > total',
  assertFails(addDoc(collection(player, 'completions'), { ...completion, score: 99 })));
await check('rejects answers length mismatching total',
  assertFails(addDoc(collection(player, 'completions'), { ...completion, answers: answers.slice(0, 3) })));
await check('rejects oversized quiz (total 500)',
  assertFails(addDoc(collection(player, 'completions'), { ...completion, total: 500 })));
await check('rejects unexpected extra field',
  assertFails(addDoc(collection(player, 'completions'), { ...completion, evil: 'x'.repeat(100) })));
await check('rejects missing answers array',
  assertFails(addDoc(collection(player, 'completions'), { ...completion, answers: undefined }))); 

console.log('\nSURVEYS');
await check('signed-in player can submit the 7-question survey',
  assertSucceeds(addDoc(collection(player, 'surveys'), survey)));
await check('non-admin cannot read surveys',
  assertFails(getDocs(collection(player, 'surveys'))));
await check('rejects out-of-range confidence value',
  assertFails(addDoc(collection(player, 'surveys'), { ...survey, confidenceAfter: '99' })));
await check('rejects invalid difficulty value',
  assertFails(addDoc(collection(player, 'surveys'), { ...survey, difficulty: 'sideways' })));
await check('rejects 5000-char free text',
  assertFails(addDoc(collection(player, 'surveys'), { ...survey, learning: 'x'.repeat(5000) })));
await check('accepts survey with optional fields omitted',
  assertSucceeds(addDoc(collection(player, 'surveys'), {
    createdAt: serverTimestamp(), source: 'scam_scenario_quiz',
    confidenceBefore: '3', confidenceAfter: '5', feelsMoreAware: 'somewhat',
    mostWorryingScam: 'love', difficulty: 'easy', wouldShare: 'maybe',
  })));

console.log('\nADMINS');
await check('player cannot write themselves into admins',
  assertFails(setDoc(doc(player, 'admins/passcode-user'), { role: 'admin' })));

console.log(`\n${pass} passed, ${fail} failed\n`);
await env.cleanup();
process.exit(fail ? 1 : 0);
