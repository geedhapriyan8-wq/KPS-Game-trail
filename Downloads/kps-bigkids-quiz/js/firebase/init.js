/**
 * Firebase initialization — every other module imports auth/db/analytics from here.
 * Pin the SDK version in one place; bump it by changing FIREBASE_VERSION.
 *
 * Local dev talks to the SAME real Firebase project that production uses.
 * There are no emulators — test data goes to your real Firestore.
 * Use a separate Firebase project for development if you want to keep
 * test data out of production.
 */

import { firebaseConfig } from './config.js';

export const FIREBASE_VERSION = '10.14.1';
const SDK = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;

const { initializeApp } = await import(`${SDK}/firebase-app.js`);
const { getAuth } = await import(`${SDK}/firebase-auth.js`);
const { getFirestore } = await import(`${SDK}/firebase-firestore.js`);
const { getAnalytics, isSupported } = await import(`${SDK}/firebase-analytics.js`);

if (firebaseConfig.apiKey === 'REPLACE_ME') {
  document.body.innerHTML =
    '<div style="padding:2rem;font-family:sans-serif">' +
    '<h1>Firebase config not set</h1>' +
    '<p>Open <code>js/firebase/config.js</code> and replace the REPLACE_ME values with the config your admin gave you.</p>' +
    '</div>';
  throw new Error('Firebase config not set');
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics is disabled on localhost so test sessions don't pollute production data.
const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
export const analytics = !isLocal && (await isSupported()) ? getAnalytics(app) : null;
