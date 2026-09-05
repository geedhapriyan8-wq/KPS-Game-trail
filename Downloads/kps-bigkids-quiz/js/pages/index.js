/**
 * Passcode page (index.html) — kid login.
 * Signs the user in as the shared developer account, then redirects to /game/.
 */

import { auth } from '../firebase/init.js';
import { signInPasscode, isPasscodeUser, isAdmin } from '../firebase/auth.js';
import { dbHelpers } from '../firebase/db.js';
import { logKpsEvent } from '../firebase/analytics.js';
import { COLLECTIONS, EVENTS } from '../constants.js';

await auth.authStateReady();
const user = auth.currentUser;

// Already signed in? Skip the passcode screen and go to the right place.
if (user && isPasscodeUser(user)) {
  window.location.replace('/game/');
} else if (user && (await isAdmin(user))) {
  window.location.replace('/admin/dashboard.html');
} else {
  initForm();
  refreshCount();
}

function initForm() {
  const form = document.getElementById('passcode-form');
  const input = document.getElementById('passcode-input');
  const errorEl = document.getElementById('passcode-error');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Loading...';
    logKpsEvent(EVENTS.LOGIN_ATTEMPT);
    try {
      await signInPasscode(input.value);
      logKpsEvent(EVENTS.LOGIN_SUCCESS);
      window.location.href = '/game/';
    } catch (err) {
      logKpsEvent(EVENTS.LOGIN_FAILURE, { code: err.code || 'unknown' });
      errorEl.textContent = 'Wrong passcode — try again.';
      errorEl.hidden = false;
      input.value = '';
      input.focus();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Play Game';
    }
  });
}

async function refreshCount() {
  const countEl = document.getElementById('completion-count');
  try {
    const total = await dbHelpers.count(COLLECTIONS.COMPLETIONS);
    const label = total === 1 ? '1 person has' : `${total.toLocaleString()} people have`;
    countEl.textContent = `${label} completed the game`;
  } catch {
    countEl.textContent = '';
  }
}
