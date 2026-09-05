/**
 * Auth helpers — two flows:
 *
 *   signInPasscode(passcode)   — for kids playing the game (shared account)
 *   signInAdmin(email, pw)     — for admins (real accounts + whitelist check)
 *
 * The shared kid account always signs in as DEVELOPER_EMAIL. The admin flow
 * blocks DEVELOPER_EMAIL at two checkpoints (defense in depth).
 */

import { auth, db, FIREBASE_VERSION } from './init.js';
import { COLLECTIONS, DEVELOPER_EMAIL } from '../constants.js';

const {
  signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail,
} = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`);
const { doc, getDoc } = await import(
  `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`
);

export { DEVELOPER_EMAIL };

export async function signInPasscode(passcode) {
  return signInWithEmailAndPassword(auth, DEVELOPER_EMAIL, passcode);
}

export async function signInAdmin(email, password) {
  if ((email || '').trim().toLowerCase() === DEVELOPER_EMAIL) {
    const err = new Error('Not an admin account');
    err.code = 'kps/not-admin';
    throw err;
  }
  await signInWithEmailAndPassword(auth, email, password);
  const adminDoc = await getDoc(doc(db, COLLECTIONS.ADMINS, auth.currentUser.uid));
  if (!adminDoc.exists()) {
    await signOut(auth);
    const err = new Error('Not an admin account');
    err.code = 'kps/not-admin';
    throw err;
  }
}

export async function signOutUser() {
  await signOut(auth);
}

export async function sendReset(email) {
  await sendPasswordResetEmail(auth, email);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function isAdmin(user) {
  if (!user) return false;
  if (user.email && user.email.toLowerCase() === DEVELOPER_EMAIL) return false;
  const adminDoc = await getDoc(doc(db, COLLECTIONS.ADMINS, user.uid));
  return adminDoc.exists();
}

export function isPasscodeUser(user) {
  return !!(user && user.email && user.email.toLowerCase() === DEVELOPER_EMAIL);
}
