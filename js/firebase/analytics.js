/**
 * Analytics — thin wrapper around Firebase logEvent so developers can add
 * their own custom events in one line:
 *
 *   logKpsEvent('quiz_completed', { score: 8, level: 'easy' });
 *
 * Pre-wired events (fired automatically by the template) — see js/constants.js:
 *   - login_attempt, login_success, login_failure
 *   - admin_login_attempt, admin_login_success, admin_login_failure
 *   - game_completed
 *   - survey_completed
 *   - page_view (automatic via Firebase Analytics)
 *
 * Analytics is disabled on localhost so test events don't pollute production.
 */

import { analytics, FIREBASE_VERSION } from './init.js';

const { logEvent } = await import(
  `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-analytics.js`
);

export function logKpsEvent(name, params) {
  if (!analytics) {
    console.debug('[analytics:skipped]', name, params || {});
    return;
  }
  logEvent(analytics, name, params || {});
}
