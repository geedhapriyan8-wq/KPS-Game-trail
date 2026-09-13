/**
 * Game page (game/index.html) — multiple-choice scam-scenario quiz for seniors.
 *
 * Question content lives in ./questions.js — add more scenarios there,
 * this file doesn't need to change when you do. Translations live in
 * ./i18n.js — see that file for how to add a language or translate a
 * question. Scoring, category stats, and analytics always use the English
 * (canonical) question object — only what's shown on screen is translated.
 *
 * Every answer fires a per-question analytics event (EVENTS.QUESTION_ANSWERED)
 * tagged with the scam category, so you can see which categories seniors
 * struggle with most. The final completion doc also stores a per-category
 * score breakdown and a full per-question answer log for the admin
 * dashboard to read later.
 */

import { auth } from '../../firebase/init.js';
import { signOutUser, isPasscodeUser, isAdmin } from '../../firebase/auth.js';
import { dbHelpers } from '../../firebase/db.js';
import { logKpsEvent } from '../../firebase/analytics.js';
import { COLLECTIONS, EVENTS } from '../../constants.js';
import { CATEGORIES, getRandomQuiz } from './questions.js';
import {
  LANGUAGES,
  getStoredLanguage,
  setStoredLanguage,
  getUIString,
  getCategoryLabel,
  translateQuestion,
} from './i18n.js';

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
  let currentLang = getStoredLanguage();

  const langSelect = document.getElementById('language-switcher');
  Object.values(LANGUAGES).forEach((lang) => {
    const option = document.createElement('option');
    option.value = lang.code;
    // Always shown in the language's OWN name (not translated) so a Tamil
    // speaker can find "தமிழ்" even while the UI is currently in Chinese.
    option.textContent = lang.nativeLabel;
    langSelect.appendChild(option);
  });
  langSelect.value = currentLang;
  langSelect.addEventListener('change', () => applyLanguage(langSelect.value));

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
  let quizFinished = false;
  let completionIdForSurvey = null;

  // Set once the current question has been answered; re-render on a
  // language switch reapplies this instead of re-scoring it. null means
  // "not answered yet".
  let answeredIndex = null;

  // Set once finishQuiz() runs, so a later language switch can redraw the
  // results screen correctly without recomputing anything.
  let resultTier = null;       // 'perfect' | 'good' | 'ok'
  let statusKey = null;        // 'completionRecorded' | 'completionFailed'

  const startedAt = Date.now();

  // One entry per answered question, saved with the completion document.
  const answers = [];

  // A new random draw from the question bank every time the game loads —
  // covers every category, but the specific questions and their order
  // change from playthrough to playthrough. This does NOT change on a
  // language switch — only the display text does.
  const quizQuestions = getRandomQuiz();

  // Per-category tallies, e.g. { impersonation: { correct: 1, total: 2 }, ... }
  const categoryStats = {};
  Object.keys(CATEGORIES).forEach((key) => {
    categoryStats[key] = { correct: 0, total: 0 };
  });

  translateStaticText();
  renderQuestion();

  /**
   * Re-renders whatever's currently on screen in the newly selected
   * language, WITHOUT resetting quiz progress, score, or an already-chosen
   * answer. This is the one function a language switch calls.
   */
  function applyLanguage(lang) {
    currentLang = lang;
    setStoredLanguage(lang);
    document.documentElement.lang = lang;
    translateStaticText();

    if (!quizFinished) {
      renderQuestion();
    } else {
      renderResultsText();
    }
  }

  /** Applies UI_STRINGS to every [data-i18n] / [data-i18n-placeholder] element. */
  function translateStaticText() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = getUIString(currentLang, el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', getUIString(currentLang, el.dataset.i18nPlaceholder));
    });
  }

  function renderQuestion() {
    const q = quizQuestions[current];
    const displayQ = translateQuestion(q, currentLang);
    const total = quizQuestions.length;

    // NOTE: the scam category is deliberately not shown here — revealing it
    // would tell the player what to look for. It's shown in the feedback
    // panel once they've answered, and again on the results breakdown.

    counterEl.textContent = getUIString(currentLang, 'questionOf', { n: current + 1, total });

    const percent = Math.round(((current + 1) / total) * 100);
    progressFillEl.style.width = `${percent}%`;
    progressTrackEl.setAttribute('aria-label', getUIString(currentLang, 'quizProgressLabel'));
    progressTrackEl.setAttribute('aria-valuemin', '1');
    progressTrackEl.setAttribute('aria-valuemax', String(total));
    progressTrackEl.setAttribute('aria-valuenow', String(current + 1));

    scenarioEl.textContent = displayQ.scenario;
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = '';
    feedbackEl.classList.remove('is-correct', 'is-incorrect');
    nextBtn.hidden = true;

    if (answeredIndex === null) questionShownAt = Date.now();

    optionsEl.innerHTML = '';
    displayQ.options.forEach((optionText, index) => {
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
      btn.addEventListener('click', () => selectAnswer(index));
      optionsEl.appendChild(btn);
    });

    // If this question was already answered (i.e. we're just re-rendering
    // after a language switch), reapply the answered state instead of
    // leaving it looking unanswered.
    if (answeredIndex !== null) {
      showAnsweredState(q, displayQ, answeredIndex);
    }
  }

  function selectAnswer(index) {
    if (answeredIndex !== null) return; // already answered — ignore (defensive)
    const q = quizQuestions[current];
    const isCorrect = index === q.correctIndex;
    answeredIndex = index;
    if (isCorrect) score++;

    if (categoryStats[q.category]) {
      categoryStats[q.category].total++;
      if (isCorrect) categoryStats[q.category].correct++;
    }

    // Per-answer record saved to Firestore with the completion. This is what
    // lets you analyse which specific scenarios and distractors trip people
    // up, rather than only seeing a final score. Always logged against the
    // English question id/category — language is just display.
    answers.push({
      questionId: q.id,
      category: q.category,
      position: current + 1,          // where it fell in this playthrough
      selectedIndex: index,
      correctIndex: q.correctIndex,
      correct: isCorrect,
      timeMs: questionShownAt ? Date.now() - questionShownAt : null,
      language: currentLang,
    });

    // Per-question analytics event (Firebase Analytics, separate from the
    // Firestore record above — useful for funnels rather than reporting).
    logKpsEvent(EVENTS.QUESTION_ANSWERED, {
      questionId: q.id,
      questionIndex: current,
      category: q.category,
      correct: isCorrect,
      selectedIndex: index,
      language: currentLang,
    });

    const displayQ = translateQuestion(q, currentLang);
    showAnsweredState(q, displayQ, index);
    nextBtn.focus({ preventScroll: true });
  }

  /**
   * Renders the "answer revealed" UI: marks the chosen/correct options,
   * shows the feedback panel with the category tag and explanation, and
   * reveals the Next button. Pure rendering — never touches score/answers,
   * so it's safe to call again after a language switch.
   */
  function showAnsweredState(q, displayQ, index) {
    const cat = CATEGORIES[q.category];
    const isCorrect = index === q.correctIndex;

    [...optionsEl.children].forEach((child, i) => {
      child.disabled = true;
      const key = child.querySelector('.kps-quiz-option-key');
      if (i === q.correctIndex) {
        child.classList.add('is-correct');
        if (key) key.textContent = '✓';
        child.setAttribute('aria-label', `${getUIString(currentLang, 'correctVerdict')}: ${displayQ.options[i]}`);
      } else if (i === index) {
        child.classList.add('is-incorrect');
        if (key) key.textContent = '✗';
        child.setAttribute('aria-label', displayQ.options[i]);
      }
    });

    // Feedback panel: verdict, then which scam type this was (safe to reveal
    // now that they've committed to an answer), then the explanation.
    feedbackEl.innerHTML = '';
    const verdict = document.createElement('strong');
    verdict.textContent = getUIString(currentLang, isCorrect ? 'correctVerdict' : 'incorrectVerdict');
    feedbackEl.appendChild(verdict);

    if (cat) {
      const tag = document.createElement('span');
      tag.className = 'kps-feedback-category';
      tag.style.setProperty('--badge-bg', cat.color);
      tag.style.setProperty('--badge-ink', cat.colorDark);
      const label = getCategoryLabel(currentLang, q.category);
      tag.textContent = cat.icon ? label : `${cat.emoji} ${label}`;
      feedbackEl.append(tag, document.createTextNode(' '));
    }

    feedbackEl.appendChild(document.createTextNode(displayQ.explanation));
    feedbackEl.classList.toggle('is-correct', isCorrect);
    feedbackEl.classList.toggle('is-incorrect', !isCorrect);
    feedbackEl.hidden = false;

    nextBtn.hidden = false;
    nextBtn.textContent = getUIString(currentLang, current < quizQuestions.length - 1 ? 'next' : 'seeResults');
  }

  nextBtn.addEventListener('click', async () => {
    current++;
    answeredIndex = null;
    if (current < quizQuestions.length) {
      renderQuestion();
    } else {
      await finishQuiz();
    }
  });

  async function finishQuiz() {
    const total = quizQuestions.length;
    quizFinished = true;
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    const ratio = total ? score / total : 0;
    resultTier = ratio === 1 ? 'perfect' : ratio >= 0.7 ? 'good' : 'ok';

    renderResultsText();
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
      completionIdForSurvey = completionId;
      logKpsEvent(EVENTS.GAME_COMPLETED, { source: 'scam_scenario_quiz', score, total: quizQuestions.length });
      statusKey = 'completionRecorded';
      status.textContent = getUIString(currentLang, statusKey);
      status.hidden = false;
      // The survey stores this id so responses can be joined back to the
      // player's actual answers when you analyse the data.
      mountSurvey(surveyMount, completionIdForSurvey, currentLang);
    } catch {
      statusKey = 'completionFailed';
      status.textContent = getUIString(currentLang, statusKey);
      status.hidden = false;
      // The survey still matters even if the completion write failed, so it is
      // mounted either way rather than being lost to a network error.
      mountSurvey(surveyMount, null, currentLang);
    }
  }

  /**
   * Redraws the title, score label, breakdown, and status message on the
   * results screen from stored state (resultTier / statusKey) — used both
   * right after finishing and again on every later language switch.
   */
  function renderResultsText() {
    resultTitleEl.textContent = getUIString(
      currentLang,
      resultTier === 'perfect' ? 'resultTitlePerfect' : resultTier === 'good' ? 'resultTitleGood' : 'resultTitleOk'
    );
    scoreValueEl.textContent = `${score}/${quizQuestions.length}`;
    scoreLabelEl.textContent = getUIString(currentLang, 'scoreLabel');
    renderBreakdown();
    if (statusKey) {
      status.textContent = getUIString(currentLang, statusKey);
    }
    // Re-translate the survey (if mounted) and its category-select options.
    if (surveyMount.firstElementChild) {
      translateStaticText();
      const categorySelect = surveyMount.querySelector('[data-category-select]');
      if (categorySelect) populateCategorySelect(categorySelect, currentLang);
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
    heading.textContent = getUIString(currentLang, 'breakdownTitle');
    breakdownEl.appendChild(heading);

    seen.forEach(([key, stat]) => {
      const cat = CATEGORIES[key];
      const label = getCategoryLabel(currentLang, key);
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
      name.appendChild(document.createTextNode(cat ? label : key));

      const scoreText = document.createElement('span');
      scoreText.className = 'kps-breakdown-score';
      scoreText.textContent = `${stat.correct}/${stat.total}`;

      const bar = document.createElement('div');
      bar.className = 'kps-breakdown-bar';
      bar.setAttribute('role', 'img');
      bar.setAttribute('aria-label', `${cat ? label : key}: ${stat.correct} / ${stat.total}`);
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
 * Builds/refreshes the "which scam worries you most" <select> options from
 * CATEGORIES + the current language, so it can never drift out of sync with
 * the question bank and re-populates correctly on a language switch.
 */
function populateCategorySelect(select, lang) {
  const previousValue = select.value;
  // Keep the first ("Choose one...") option, which is translated via
  // data-i18n separately; rebuild everything after it.
  while (select.children.length > 1) select.removeChild(select.lastChild);

  Object.keys(CATEGORIES).forEach((key) => {
    const cat = CATEGORIES[key];
    const option = document.createElement('option');
    option.value = key;
    option.textContent = `${cat.emoji} ${getCategoryLabel(lang, key)}`;
    select.appendChild(option);
  });
  const otherOption = document.createElement('option');
  otherOption.value = 'other';
  otherOption.textContent = getUIString(lang, 'survey.somethingElse');
  select.appendChild(otherOption);

  if (previousValue) select.value = previousValue;
}

/**
 * Clones the survey template into the results card and wires up submission.
 *
 * @param {HTMLElement} container  where to mount
 * @param {string|null} completionId  id of the completion doc this survey
 *   belongs to, so responses can be joined to the player's actual answers.
 *   Null when the completion write failed.
 * @param {string} lang  current language, for the category select and labels
 */
function mountSurvey(container, completionId, lang) {
  container.innerHTML = '';
  const template = document.getElementById('survey-template');
  container.appendChild(template.content.cloneNode(true));

  const form = container.querySelector('[data-survey-form]');
  const status = container.querySelector('[data-survey-status]');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Translate everything just cloned in (legends, labels, static options).
  container.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = getUIString(lang, el.dataset.i18n);
  });
  container.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', getUIString(lang, el.dataset.i18nPlaceholder));
  });

  const categorySelect = form.querySelector('[data-category-select]');
  populateCategorySelect(categorySelect, lang);

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
    submitBtn.textContent = getUIString(lang, 'survey.submitting');
    const data = Object.fromEntries(new FormData(form).entries());
    // Link this response to the playthrough it came from.
    if (completionId) data.completionId = completionId;
    data.source = 'scam_scenario_quiz';
    data.language = lang;
    try {
      await dbHelpers.add(COLLECTIONS.SURVEYS, data);
      logKpsEvent(EVENTS.SURVEY_COMPLETED);
      status.textContent = getUIString(lang, 'survey.thanks');
      status.hidden = false;
      form.querySelectorAll('input, select, button').forEach((el) => (el.disabled = true));
    } catch {
      status.textContent = getUIString(lang, 'survey.submitFailed');
      status.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = getUIString(lang, 'survey.submit');
    }
  });
}
