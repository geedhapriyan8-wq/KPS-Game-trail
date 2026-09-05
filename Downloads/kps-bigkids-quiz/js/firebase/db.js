/**
 * Generic Firestore CRUD helpers. Works with any collection.
 *
 * Usage:
 *   import { dbHelpers } from '../firebase/db.js';
 *   import { COLLECTIONS } from '../constants.js';
 *
 *   await dbHelpers.add(COLLECTIONS.COMPLETIONS, { score: 8 });
 *   await dbHelpers.add(COLLECTIONS.SURVEYS, { question1: 'yes' });
 *   const rows = await dbHelpers.list(COLLECTIONS.COMPLETIONS, { orderBy: 'createdAt', limit: 50 });
 *   const total = await dbHelpers.count(COLLECTIONS.COMPLETIONS);
 *   await dbHelpers.set('myCol', 'fixed-id', { foo: 'bar' });
 *   await dbHelpers.remove('myCol', 'fixed-id');
 *
 * Every add() and set() automatically stamps `createdAt: serverTimestamp()` so
 * firestore.rules can validate it.
 */

import { db, FIREBASE_VERSION } from './init.js';

const {
  collection, doc, addDoc, getDocs, setDoc, deleteDoc,
  serverTimestamp, query, orderBy, limit, getCountFromServer,
} = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`);

async function add(collectionName, data) {
  const ref = await addDoc(collection(db, collectionName), {
    ...(data || {}),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

async function list(collectionName, options) {
  const opts = options || {};
  const colRef = collection(db, collectionName);
  const constraints = [];
  if (opts.orderBy) constraints.push(orderBy(opts.orderBy, opts.orderDir || 'desc'));
  if (opts.limit) constraints.push(limit(opts.limit));
  const q = constraints.length ? query(colRef, ...constraints) : colRef;
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function set(collectionName, docId, data) {
  await setDoc(doc(db, collectionName, docId), {
    ...(data || {}),
    createdAt: serverTimestamp(),
  });
}

async function count(collectionName) {
  const snap = await getCountFromServer(collection(db, collectionName));
  return snap.data().count;
}

async function remove(collectionName, docId) {
  await deleteDoc(doc(db, collectionName, docId));
}

export const dbHelpers = { add, list, set, count, remove };
