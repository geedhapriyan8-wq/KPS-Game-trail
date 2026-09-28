/**
 * Admin login page (admin/index.html).
 * Rejects the shared developer account at two checkpoints (defense in depth).
 */

import { auth } from '../../firebase/init.js';
import {
  signInAdmin, sendReset, isPasscodeUser, isAdmin, DEVELOPER_EMAIL,
} from '../../firebase/auth.js';
import { logKpsEvent } from '../../firebase/analytics.js';
import { EVENTS } from '../../constants.js';

await auth.authStateReady();
const user = auth.currentUser;

if (user && isPasscodeUser(user)) {
  window.location.replace('/game/');
} else if (user && (await isAdmin(user))) {
  window.location.replace('/admin/dashboard.html');
} else {
  initForm();
}

function initForm() {
  const form = document.getElementById('admin-form');
  const emailInput = document.getElementById('admin-email');
  const passwordInput = document.getElementById('admin-password');
  const errorEl = document.getElementById('admin-error');
  const submitBtn = form.querySelector('button[type="submit"]');
  const forgotLink = document.getElementById('forgot-link');
  const forgotStatus = document.getElementById('forgot-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.hidden = true;
    forgotStatus.hidden = true;
    emailInput.removeAttribute('aria-invalid');
    passwordInput.removeAttribute('aria-invalid');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';
    logKpsEvent(EVENTS.ADMIN_LOGIN_ATTEMPT);
    try {
      await signInAdmin(emailInput.value, passwordInput.value);
      logKpsEvent(EVENTS.ADMIN_LOGIN_SUCCESS);
      window.location.href = '/admin/dashboard.html';
    } catch (err) {
      logKpsEvent(EVENTS.ADMIN_LOGIN_FAILURE, { code: err.code || 'unknown' });
      errorEl.textContent =
        err.code === 'kps/not-admin'
          ? "This account isn't an admin. Sign in with an admin email instead."
          : 'Check your email and password, or use "Forgot password?" below to reset it.';
      errorEl.hidden = false;
      emailInput.setAttribute('aria-invalid', 'true');
      passwordInput.setAttribute('aria-invalid', 'true');
      emailInput.focus();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign in';
    }
  });

  forgotLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = (emailInput.value || '').trim();
    if (!email) {
      errorEl.textContent = 'Enter your email above first, then click "Forgot password?".';
      errorEl.hidden = false;
      return;
    }
    if (email.toLowerCase() === DEVELOPER_EMAIL) {
      errorEl.textContent = 'Password resets are not available for that account.';
      errorEl.hidden = false;
      return;
    }
    try {
      await sendReset(email);
    } catch {
      /* swallow — show same message either way to avoid leaking admin emails */
    }
    forgotStatus.textContent = 'If that email is registered, a reset link has been sent.';
    forgotStatus.hidden = false;
    errorEl.hidden = true;
  });
}
