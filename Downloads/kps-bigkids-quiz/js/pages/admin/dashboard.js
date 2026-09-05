/**
 * Admin dashboard page (admin/dashboard.html).
 * Shows:
 *   - Total completions + total surveys count
 *   - Paginated survey response table (dynamic columns based on schema)
 *   - "Export All (.xlsx)" button — generates Excel via SheetJS (lazy-loaded)
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
  let currentPage = 1;

  const container = document.getElementById('survey-container');
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

  loadData();

  // ── Data ─────────────────────────────────────
  async function loadData() {
    container.innerHTML = '<p class="kps-info admin-empty">Loading...</p>';
    totalSurveysEl.textContent = '—';
    totalCompletionsEl.textContent = '—';
    prevBtn.disabled = true;
    nextBtn.disabled = true;

    try {
      const [surveys, completionCount] = await Promise.all([
        dbHelpers.list(COLLECTIONS.SURVEYS, { orderBy: 'createdAt' }),
        dbHelpers.count(COLLECTIONS.COMPLETIONS),
      ]);
      allSurveys = surveys;
      totalSurveysEl.textContent = surveys.length.toLocaleString();
      totalCompletionsEl.textContent = completionCount.toLocaleString();
      currentPage = 1;
      renderPage();
    } catch (err) {
      console.error(err);
      container.innerHTML = '<p class="kps-info admin-empty">Failed to load surveys.</p>';
    }
  }

  // ── Pagination ──────────────────────────────
  function totalPages() {
    return Math.max(1, Math.ceil(allSurveys.length / PAGE_SIZE));
  }

  function renderPage() {
    pageNumEl.textContent = currentPage;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages();

    if (allSurveys.length === 0) {
      container.innerHTML = '<p class="kps-info admin-empty">No survey responses yet.</p>';
      return;
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = allSurveys.slice(start, start + PAGE_SIZE);
    container.innerHTML = renderTable(pageItems);
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

    const headerCells = ['<th>Date</th>', ...columns.map((c) => `<th>${escapeHtml(c)}</th>`)].join('');
    const bodyRows = items
      .map((s) => {
        const date = formatDate(s.createdAt);
        const cells = [`<td>${escapeHtml(date)}</td>`, ...columns.map((c) => `<td>${escapeHtml(s[c] ?? '')}</td>`)].join('');
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
    if (allSurveys.length === 0) return;
    exportBtn.disabled = true;
    const original = exportBtn.textContent;
    exportBtn.textContent = 'Exporting...';
    try {
      const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs');
      const rows = allSurveys.map((s) => {
        const out = { Date: formatDate(s.createdAt), ID: s.id };
        Object.keys(s).forEach((k) => {
          if (k !== 'createdAt' && k !== 'id') out[k] = s[k];
        });
        return out;
      });
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Surveys');
      const filename = `surveys-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
