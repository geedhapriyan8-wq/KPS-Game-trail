/**
 * Game page (game/index.html) — multiple-choice scam-scenario quiz for seniors.
 *
 * Question content lives in ./questions.js — add more scenarios there,
 * this file doesn't need to change when you do.
 *
 * Every answer fires a per-question analytics event (EVENTS.QUESTION_ANSWERED)
 * tagged with the scam category, so you can see which categories seniors
 * struggle with most. The final completion doc also stores a per-category
 * score breakdown for the admin dashboard to read later.
 */

import { auth } from '../../firebase/init.js';
import { signOutUser, isPasscodeUser, isAdmin } from '../../firebase/auth.js';
import { dbHelpers } from '../../firebase/db.js';
import { logKpsEvent } from '../../firebase/analytics.js';
import { COLLECTIONS, EVENTS } from '../../constants.js';
import { QUESTIONS, CATEGORIES } from './questions.js';

await auth.authStateReady();
const user = auth.currentUser;

if (!user) {
  window.location.replace('/');
} else if (!isPasscodeUser(user) && (await isAdmin(user))) {
  window.location.replace('/admin/dashboard.html');
} else {
  initGame();
}

function initGame() {
  const signoutBtn = document.getElementById('game-signout');
  signoutBtn.addEventListener('click', async () => {
    await signOutUser();
    window.location.href = '/';
  });

  const quizScreen = document.getElementById('quiz-screen');
  const progressEl = document.getElementById('quiz-progress');
  const scenarioEl = document.getElementById('quiz-scenario');
  const optionsEl = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('quiz-next');

  const resultScreen = document.getElementById('quiz-result');
  const scoreEl = document.getElementById('quiz-score');
  const status = document.getElementById('game-status');
  const surveyMount = document.getElementById('survey-mount');

  let current = 0;
  let score = 0;
  const startedAt = Date.now();

  // Per-category tallies, e.g. { impersonation: { correct: 1, total: 2 }, ... }
  const categoryStats = {};
  Object.keys(CATEGORIES).forEach((key) => {
    categoryStats[key] = { correct: 0, total: 0 };
  });

  renderQuestion();

  function renderQuestion() {
    const q = QUESTIONS[current];
    const cat = CATEGORIES[q.category];
    progressEl.textContent =
      `${cat ? cat.emoji + ' ' + cat.label : ''} — Question ${current + 1} of ${QUESTIONS.length}`;
    scenarioEl.textContent = q.scenario;
    feedbackEl.hidden = true;
    nextBtn.hidden = true;

    optionsEl.innerHTML = '';
    q.options.forEach((optionText, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'kps-quiz-option';
      btn.textContent = optionText;
      btn.addEventListener('click', () => selectAnswer(index, btn));
      optionsEl.appendChild(btn);
    });
  }

  function selectAnswer(index, btn) {
    const q = QUESTIONS[current];
    const isCorrect = index === q.correctIndex;
    if (isCorrect) score++;

    if (categoryStats[q.category]) {
      categoryStats[q.category].total++;
      if (isCorrect) categoryStats[q.category].correct++;
    }

    // Per-question analytics — lets the admin dashboard see which scam
    // categories and specific scenarios seniors get wrong most often.
    logKpsEvent(EVENTS.QUESTION_ANSWERED, {
      questionIndex: current,
      category: q.category,
      correct: isCorrect,
      selectedIndex: index,
    });

    // Lock in the choice, mark it, and reveal the correct one if they got it wrong.
    [...optionsEl.children].forEach((child, i) => {
      child.disabled = true;
      if (i === q.correctIndex) child.classList.add('is-correct');
      else if (i === index) child.classList.add('is-incorrect');
    });

    feedbackEl.textContent = (isCorrect ? 'Correct! ' : 'Not quite. ') + q.explanation;
    feedbackEl.hidden = false;
    nextBtn.hidden = false;
    nextBtn.textContent = current < QUESTIONS.length - 1 ? 'Next question' : 'See results';
  }

  nextBtn.addEventListener('click', async () => {
    current++;
    if (current < QUESTIONS.length) {
      renderQuestion();
    } else {
      await finishQuiz();
    }
  });

  async function finishQuiz() {
    quizScreen.hidden = true;
    resultScreen.hidden = false;
    scoreEl.textContent = `You scored ${score} out of ${QUESTIONS.length}.`;

    try {
      await dbHelpers.add(COLLECTIONS.COMPLETIONS, {
        source: 'scam_scenario_quiz',
        score,
        total: QUESTIONS.length,
        durationMs: Date.now() - startedAt,
        categoryStats,
      });
      logKpsEvent(EVENTS.GAME_COMPLETED, { source: 'scam_scenario_quiz', score, total: QUESTIONS.length });
      status.textContent = 'Completion recorded!';
      status.hidden = false;
      mountSurvey(surveyMount);
    } catch {
      status.textContent = 'Could not record completion.';
      status.hidden = false;
    }
  }
}

function mountSurvey(container) {
  container.innerHTML = '';
  const template = document.getElementById('survey-template');
  container.appendChild(template.content.cloneNode(true));

  const form = container.querySelector('[data-survey-form]');
  const status = container.querySelector('[data-survey-status]');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await dbHelpers.add(COLLECTIONS.SURVEYS, data);
      logKpsEvent(EVENTS.SURVEY_COMPLETED);
      status.textContent = 'Thanks for your response!';
      status.hidden = false;
      form.querySelectorAll('input, select, button').forEach((el) => (el.disabled = true));
    } catch {
      status.textContent = 'Could not submit — try again.';
      status.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  });
}
