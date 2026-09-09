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
import { CATEGORIES, getRandomQuiz } from './questions.js';

/** Letters shown on each answer option, in order. */
const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];

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
  const counterEl = document.getElementById('quiz-counter');
  const progressTrackEl = document.querySelector('.kps-progress-track');
  const progressFillEl = document.getElementById('quiz-progress-fill');
  const scenarioEl = document.getElementById('quiz-scenario');
  const optionsEl = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('quiz-next');

  const resultScreen = document.getElementById('quiz-result');
  const resultTitleEl = document.getElementById('quiz-result-title');
  const scoreValueEl = document.getElementById('quiz-score-value');
  const scoreLabelEl = document.getElementById('quiz-score-label');
  const breakdownEl = document.getElementById('quiz-breakdown');
  const status = document.getElementById('game-status');
  const surveyMount = document.getElementById('survey-mount');

  let current = 0;
  let score = 0;
  let questionShownAt = null;
  const startedAt = Date.now();

  // One entry per answered question, saved with the completion document.
  const answers = [];

  // A new random draw from the question bank every time the game loads —
  // covers every category, but the specific questions and their order
  // change from playthrough to playthrough.
  const quizQuestions = getRandomQuiz();

  // Per-category tallies, e.g. { impersonation: { correct: 1, total: 2 }, ... }
  const categoryStats = {};
  Object.keys(CATEGORIES).forEach((key) => {
    categoryStats[key] = { correct: 0, total: 0 };
  });

  renderQuestion();

  function renderQuestion() {
    const q = quizQuestions[current];
    const total = quizQuestions.length;

    // NOTE: the scam category is deliberately not shown here — revealing it
    // would tell the player what to look for. It's shown in the feedback
    // panel once they've answered, and again on the results breakdown.

    // Question counter — its own element, separate from anything else.
    counterEl.textContent = `Question ${current + 1} of ${total}`;

    // Progress bar reflects how far into the quiz the player is.
    const percent = Math.round(((current + 1) / total) * 100);
    progressFillEl.style.width = `${percent}%`;
    progressTrackEl.setAttribute('aria-valuemin', '1');
    progressTrackEl.setAttribute('aria-valuemax', String(total));
    progressTrackEl.setAttribute('aria-valuenow', String(current + 1));

    scenarioEl.textContent = q.scenario;
    feedbackEl.hidden = true;
    feedbackEl.classList.remove('is-correct', 'is-incorrect');
    nextBtn.hidden = true;

    questionShownAt = Date.now();

    optionsEl.innerHTML = '';
    q.options.forEach((optionText, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'kps-quiz-option';

      // Letter key (A/B/C/D). After answering this becomes a ✓ or ✗ so the
      // result never depends on colour alone — important for colour-blind
      // and low-vision players.
      const key = document.createElement('span');
      key.className = 'kps-quiz-option-key';
      key.setAttribute('aria-hidden', 'true');
      key.textContent = OPTION_KEYS[index] || String(index + 1);

      const text = document.createElement('span');
      text.className = 'kps-quiz-option-text';
      text.textContent = optionText;

      btn.append(key, text);
      btn.addEventListener('click', () => selectAnswer(index, btn));
      optionsEl.appendChild(btn);
    });
  }

  function selectAnswer(index, btn) {
    const q = quizQuestions[current];
    const cat = CATEGORIES[q.category];
    const isCorrect = index === q.correctIndex;
    if (isCorrect) score++;

    if (categoryStats[q.category]) {
      categoryStats[q.category].total++;
      if (isCorrect) categoryStats[q.category].correct++;
    }

    // Per-answer record saved to Firestore with the completion. This is what
    // lets you analyse which specific scenarios and distractors trip people
    // up, rather than only seeing a final score.
    answers.push({
      questionId: q.id,
      category: q.category,
      position: current + 1,          // where it fell in this playthrough
      selectedIndex: index,
      correctIndex: q.correctIndex,
      correct: isCorrect,
      timeMs: questionShownAt ? Date.now() - questionShownAt : null,
    });

    // Per-question analytics event (Firebase Analytics, separate from the
    // Firestore record above — useful for funnels rather than reporting).
    logKpsEvent(EVENTS.QUESTION_ANSWERED, {
      questionId: q.id,
      questionIndex: current,
      category: q.category,
      correct: isCorrect,
      selectedIndex: index,
    });

    // Lock in the choice, mark it, and reveal the correct one if they got it wrong.
    [...optionsEl.children].forEach((child, i) => {
      child.disabled = true;
      const key = child.querySelector('.kps-quiz-option-key');
      if (i === q.correctIndex) {
        child.classList.add('is-correct');
        if (key) key.textContent = '✓';
        child.setAttribute('aria-label', `Correct answer: ${q.options[i]}`);
      } else if (i === index) {
        child.classList.add('is-incorrect');
        if (key) key.textContent = '✗';
        child.setAttribute('aria-label', `Your answer, incorrect: ${q.options[i]}`);
      }
    });

    // Feedback panel: verdict, then which scam type this was (safe to reveal
    // now that they've committed to an answer), then the explanation.
    feedbackEl.innerHTML = '';
    const verdict = document.createElement('strong');
    verdict.textContent = isCorrect ? "That's right. " : 'Not quite. ';
    feedbackEl.appendChild(verdict);

    if (cat) {
      const tag = document.createElement('span');
      tag.className = 'kps-feedback-category';
      tag.style.setProperty('--badge-bg', cat.color);
      tag.style.setProperty('--badge-ink', cat.colorDark);
      tag.textContent = `${cat.emoji} ${cat.label}`;
      feedbackEl.append(tag, document.createTextNode(' '));
    }

    feedbackEl.appendChild(document.createTextNode(q.explanation));
    feedbackEl.classList.toggle('is-correct', isCorrect);
    feedbackEl.classList.toggle('is-incorrect', !isCorrect);
    feedbackEl.hidden = false;

    nextBtn.hidden = false;
    nextBtn.textContent = current < quizQuestions.length - 1 ? 'Next question' : 'See results';
    nextBtn.focus({ preventScroll: true });
  }

  nextBtn.addEventListener('click', async () => {
    current++;
    if (current < quizQuestions.length) {
      renderQuestion();
    } else {
      await finishQuiz();
    }
  });

  async function finishQuiz() {
    const total = quizQuestions.length;
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    // Headline reacts to the result so it reads as a response, not a template.
    const ratio = total ? score / total : 0;
    if (ratio === 1) resultTitleEl.textContent = 'Perfect score!';
    else if (ratio >= 0.7) resultTitleEl.textContent = 'Well spotted!';
    else resultTitleEl.textContent = 'Good start!';

    scoreValueEl.textContent = `${score}/${total}`;
    scoreLabelEl.textContent = 'scams correctly identified';

    renderBreakdown();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const completionId = await dbHelpers.add(COLLECTIONS.COMPLETIONS, {
        source: 'scam_scenario_quiz',
        score,
        total: quizQuestions.length,
        durationMs: Date.now() - startedAt,
        categoryStats,
        answers,
      });
      logKpsEvent(EVENTS.GAME_COMPLETED, { source: 'scam_scenario_quiz', score, total: quizQuestions.length });
      status.textContent = 'Completion recorded!';
      status.hidden = false;
      // The survey stores this id so responses can be joined back to the
      // player's actual answers when you analyse the data.
      mountSurvey(surveyMount, completionId);
    } catch {
      status.textContent = 'Could not record completion.';
      status.hidden = false;
      // The survey still matters even if the completion write failed, so it is
      // mounted either way rather than being lost to a network error.
      mountSurvey(surveyMount, null);
    }
  }

  /**
   * Draws one row per scam category the player actually saw, so the results
   * tell them *which* scam types to brush up on rather than just a total.
   */
  function renderBreakdown() {
    breakdownEl.innerHTML = '';
    const seen = Object.entries(categoryStats).filter(([, s]) => s.total > 0);
    if (!seen.length) return;

    const heading = document.createElement('p');
    heading.className = 'kps-breakdown-title';
    heading.textContent = 'How you did by scam type';
    breakdownEl.appendChild(heading);

    seen.forEach(([key, stat]) => {
      const cat = CATEGORIES[key];
      const row = document.createElement('div');
      row.className = 'kps-breakdown-row';

      const name = document.createElement('span');
      name.className = 'kps-breakdown-name';
      if (cat?.icon) {
        const icon = document.createElement('img');
        icon.src = cat.icon;
        icon.alt = '';
        icon.className = 'kps-category-icon';
        name.appendChild(icon);
      } else if (cat?.emoji) {
        name.appendChild(document.createTextNode(`${cat.emoji} `));
      }
      name.appendChild(document.createTextNode(cat ? cat.label : key));

      const scoreText = document.createElement('span');
      scoreText.className = 'kps-breakdown-score';
      scoreText.textContent = `${stat.correct}/${stat.total}`;

      const bar = document.createElement('div');
      bar.className = 'kps-breakdown-bar';
      bar.setAttribute('role', 'img');
      bar.setAttribute(
        'aria-label',
        `${cat ? cat.label : key}: ${stat.correct} of ${stat.total} correct`
      );
      const fill = document.createElement('div');
      fill.className = 'kps-breakdown-bar-fill';
      fill.style.width = `${Math.round((stat.correct / stat.total) * 100)}%`;
      bar.appendChild(fill);

      row.append(name, scoreText, bar);
      breakdownEl.appendChild(row);
    });
  }
}

/**
 * Clones the survey template into the results card and wires up submission.
 *
 * @param {HTMLElement} container  where to mount
 * @param {string|null} completionId  id of the completion doc this survey
 *   belongs to, so responses can be joined to the player's actual answers.
 *   Null when the completion write failed.
 */
function mountSurvey(container, completionId) {
  container.innerHTML = '';
  const template = document.getElementById('survey-template');
  container.appendChild(template.content.cloneNode(true));

  const form = container.querySelector('[data-survey-form]');
  const status = container.querySelector('[data-survey-status]');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Build the "which scam worries you most" options straight from
  // CATEGORIES so this select can never drift out of sync with the
  // question bank — add a category there and it shows up here too.
  const categorySelect = form.querySelector('[data-category-select]');
  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = `${cat.emoji} ${cat.label}`;
    categorySelect.appendChild(option);
  });
  const otherOption = document.createElement('option');
  otherOption.value = 'other';
  otherOption.textContent = 'Something else';
  categorySelect.appendChild(otherOption);

  // .kps-scale-option / .kps-pill-option rely on :has(input:checked) where
  // supported, but that's not universal on older devices seniors may be
  // using — so toggle a plain .is-selected class on change too. This makes
  // the "selected" highlight work identically on every browser.
  form.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      form.querySelectorAll(`input[name="${radio.name}"]`).forEach((sibling) => {
        sibling.closest('.kps-scale-option, .kps-pill-option')?.classList.toggle('is-selected', sibling.checked);
      });
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    const data = Object.fromEntries(new FormData(form).entries());
    // Link this response to the playthrough it came from.
    if (completionId) data.completionId = completionId;
    data.source = 'scam_scenario_quiz';
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
