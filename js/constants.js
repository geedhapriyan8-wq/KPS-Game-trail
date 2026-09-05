/**
 * Shared constants — collection names, analytics event names, etc.
 * Import these instead of hardcoding strings:
 *
 *   import { COLLECTIONS, EVENTS } from '../constants.js';
 *   await dbHelpers.add(COLLECTIONS.COMPLETIONS, { score: 8 });
 *   logKpsEvent(EVENTS.GAME_COMPLETED);
 *
 * Add your own collection or event constants here as your project grows.
 */

export const COLLECTIONS = {
  COMPLETIONS: 'completions',
  SURVEYS: 'surveys',
  ADMINS: 'admins',
};

export const EVENTS = {
  LOGIN_ATTEMPT: 'login_attempt',
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  ADMIN_LOGIN_ATTEMPT: 'admin_login_attempt',
  ADMIN_LOGIN_SUCCESS: 'admin_login_success',
  ADMIN_LOGIN_FAILURE: 'admin_login_failure',
  GAME_COMPLETED: 'game_completed',
  SURVEY_COMPLETED: 'survey_completed',
  QUESTION_ANSWERED: 'question_answered',
};

export const DEVELOPER_EMAIL = 'developer@kidsplaysafer.sg';
