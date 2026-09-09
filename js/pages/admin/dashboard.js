/**
 * Admin dashboard page (admin/dashboard.html).
 * Shows:
 *   - Total completions + total surveys count
 *   - Three switchable views, all paginated:
 *       Surveys            — one row per feedback response
 *       Completions        — one row per playthrough (score, time, category split)
 *       Question accuracy  — aggregated: how often each question is answered
 *                            correctly, worst-performing first
 *   - "Export All (.xlsx)" button — exports the ACTIVE view via SheetJS
 *   - Sidebar with external link to Firebase Analytics + Sign Out
 */

import { auth } from '../../firebase/init.js';
import { firebaseConfig } from '../../firebase/config.js';
import { signOutUser, isAdmin, isPasscodeUser } from '../../firebase/auth.js';
import { dbHelpers } from '../../firebase/db.js';
import { COLLECTIONS } from '../../constants.js';

const PAGE_SIZE = 10;

await auth.authStateReady();
const user = auth.currentUser;

if (!user || isPasscodeUser(user) || !(await isAdmin(user))) {
  window.location.replace('/admin/');
} else {
  initDashboard();
}

function initDashboard() {
  // Set the Analytics link to this project's Firebase Analytics page.
  const analyticsLink = document.getElementById('analytics-link');
  analyticsLink.href = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/analytics`;

  // Sign out
  document.getElementById('signout-btn').addEventListener('click', async () => {
    await signOutUser();
    window.location.href = '/admin/';
  });

  // State
  let allSurveys = [];
  let allCompletions = [];
  let questionRows = [];      // aggregated from allCompletions
  let activeView = 'surveys'; // 'surveys' | 'completions' | 'questions'
  let currentPage = 1;

  const container = document.getElementById('survey-container');
  const pageTitle = document.getElementById('page-title');
  const totalSurveysEl = document.getElementById('total-surveys');
  const totalCompletionsEl = document.getElementById('total-completions');
  const pageNumEl = document.getElementById('page-num');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const refreshBtn = document.getElementById('refresh-btn');
  const exportBtn = document.getElementById('export-btn');

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages()) {
      currentPage++;
      renderPage();
    }
  });
  refreshBtn.addEventListener('click', loadData);
  exportBtn.addEventListener('click', exportXlsx);

  document.querySelectorAll('.admin-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      activeView = tab.dataset.view;
      document.querySelectorAll('.admin-tab').forEach((t) => {
        const on = t === tab;
        t.classList.toggle('admin-tab-active', on);
        t.setAttribute('aria-selected', String(on));
      });
      pageTitle.textContent = {
        surveys: 'Survey Responses',
        completions: 'Quiz Completions',
        questions: 'Question Accuracy',
      }[activeView];
      currentPage = 1;
      renderPage();
    });
  });

  loadData();

  // ── Data ─────────────────────────────────────
  async function loadData() {
    container.innerHTML = '<p class="kps-info admin-empty">Loading...</p>';
    totalSurveysEl.textContent = '—';
    totalCompletionsEl.textContent = '—';
    prevBtn.disabled = true;
    nextBtn.disabled = true;

    try {
      const [surveys, completions] = await Promise.all([
        dbHelpers.list(COLLECTIONS.SURVEYS, { orderBy: 'createdAt' }),
        dbHelpers.list(COLLECTIONS.COMPLETIONS, { orderBy: 'createdAt' }),
      ]);
      allSurveys = surveys;
      allCompletions = completions;
      questionRows = aggregateQuestions(completions);
      totalSurveysEl.textContent = surveys.length.toLocaleString();
      totalCompletionsEl.textContent = completions.length.toLocaleString();
      currentPage = 1;
      renderPage();
    } catch (err) {
      console.error(err);
      container.innerHTML = '<p class="kps-info admin-empty">Failed to load data.</p>';
    }
  }

  // ── Pagination ──────────────────────────────
  /** Rows backing whichever view is active. */
  function activeRows() {
    if (activeView === 'completions') return allCompletions;
    if (activeView === 'questions') return questionRows;
    return allSurveys;
  }

  function totalPages() {
    return Math.max(1, Math.ceil(activeRows().length / PAGE_SIZE));
  }

  function renderPage() {
    pageNumEl.textContent = currentPage;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages();

    const rows = activeRows();
    if (rows.length === 0) {
      const empty = {
        surveys: 'No survey responses yet.',
        completions: 'No completed quizzes yet.',
        questions: 'No answers recorded yet.',
      }[activeView];
      container.innerHTML = `<p class="kps-info admin-empty">${empty}</p>`;
      return;
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = rows.slice(start, start + PAGE_SIZE);

    if (activeView === 'completions') container.innerHTML = renderTable(pageItems.map(completionRow));
    else if (activeView === 'questions') container.innerHTML = renderTable(pageItems);
    else container.innerHTML = renderTable(pageItems);
  }

  /**
   * Flattens a completion into readable columns. The raw `answers` array and
   * `categoryStats` map are objects, so they're summarised rather than dumped
   * as [object Object].
   */
  function completionRow(c) {
    const stats = c.categoryStats || {};
    const perCategory = Object.entries(stats)
      .filter(([, s]) => s && s.total > 0)
      .map(([k, s]) => `${k} ${s.correct}/${s.total}`)
      .join(', ');
    return {
      createdAt: c.createdAt,
      id: c.id,
      score: `${c.score ?? '?'}/${c.total ?? '?'}`,
      percent: c.total ? `${Math.round((c.score / c.total) * 100)}%` : '',
      timeTaken: c.durationMs ? `${Math.round(c.durationMs / 1000)}s` : '',
      byCategory: perCategory,
      answersRecorded: Array.isArray(c.answers) ? c.answers.length : 0,
    };
  }

  /**
   * Rolls every stored answer up per question, so you can see which specific
   * scenarios people get wrong most often. Sorted worst-first — the top of
   * this table is your list of questions to rewrite or teach harder.
   */
  function aggregateQuestions(completions) {
    const byQuestion = new Map();
    completions.forEach((c) => {
      (Array.isArray(c.answers) ? c.answers : []).forEach((a) => {
        const key = a.questionId || `${a.category}-?`;
        if (!byQuestion.has(key)) {
          byQuestion.set(key, { questionId: key, category: a.category || '', asked: 0, correct: 0 });
        }
        const row = byQuestion.get(key);
        row.asked += 1;
        if (a.correct) row.correct += 1;
      });
    });
    return [...byQuestion.values()]
      .map((r) => ({
        questionId: r.questionId,
        category: r.category,
        timesAsked: r.asked,
        correct: r.correct,
        wrong: r.asked - r.correct,
        accuracy: r.asked ? `${Math.round((r.correct / r.asked) * 100)}%` : '',
        accuracyPct: r.asked ? r.correct / r.asked : 0,
      }))
      .sort((a, b) => a.accuracyPct - b.accuracyPct)
      .map(({ accuracyPct, ...rest }) => rest);
  }

  // ── Table render (dynamic columns based on survey schema) ────
  function renderTable(items) {
    const keys = new Set();
    items.forEach((s) => {
      Object.keys(s).forEach((k) => {
        if (k !== 'createdAt' && k !== 'id') keys.add(k);
      });
    });
    const columns = [...keys];

    // The aggregated question view has no timestamps, so only show a Date
    // column when the rows actually carry one.
    const hasDate = items.some((s) => s.createdAt);

    const headerCells = [
      ...(hasDate ? ['<th>Date</th>'] : []),
      ...columns.map((c) => `<th>${escapeHtml(c)}</th>`),
    ].join('');

    const bodyRows = items
      .map((s) => {
        const cells = [
          ...(hasDate ? [`<td>${escapeHtml(formatDate(s.createdAt))}</td>`] : []),
          ...columns.map((c) => `<td>${escapeHtml(s[c] ?? '')}</td>`),
        ].join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');

    return `
      <div class="admin-table-scroll">
        <table class="admin-table">
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
    `;
  }

  // ── Excel export (lazy-loads SheetJS from CDN) ────
  async function exportXlsx() {
    if (activeRows().length === 0) return;
    exportBtn.disabled = true;
    const original = exportBtn.textContent;
    exportBtn.textContent = 'Exporting...';
    try {
      const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs');

      // Export whichever view is on screen, so the button always does what
      // the admin is currently looking at.
      let source;
      let sheetName;
      if (activeView === 'completions') {
        source = allCompletions.map(completionRow);
        sheetName = 'Completions';
      } else if (activeView === 'questions') {
        source = questionRows;
        sheetName = 'Question accuracy';
      } else {
        source = allSurveys;
        sheetName = 'Surveys';
      }

      const rows = source.map((s) => {
        const out = {};
        if (s.createdAt) out.Date = formatDate(s.createdAt);
        if (s.id) out.ID = s.id;
        Object.keys(s).forEach((k) => {
          if (k !== 'createdAt' && k !== 'id') out[k] = s[k];
        });
        return out;
      });
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      const filename = `${sheetName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(wb, filename);
    } catch (err) {
      console.error(err);
      alert('Could not export. See console for details.');
    } finally {
      exportBtn.disabled = false;
      exportBtn.textContent = original;
    }
  }

  // ── Helpers ─────────────────────────────────
  function formatDate(ts) {
    if (!ts) return '';
    const d = typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts);
    return d.toLocaleString();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
