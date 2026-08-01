// Loads sql.js (SQLite compiled to WebAssembly) from a CDN at runtime.
// Every SQL lab gets its own fresh in-memory database seeded from the
// lab's seedSql, so student queries are real SQL against a real engine.

declare global {
  interface Window {
    initSqlJs?: (config?: { locateFile: (file: string) => string }) => Promise<any>;
  }
}

const SQLJS_CDN = "https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/";

let sqlJsModule: any = null;
let loadingPromise: Promise<any> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load sql.js script"));
    document.head.appendChild(script);
  });
}

async function getSqlJs() {
  if (sqlJsModule) return sqlJsModule;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    await loadScript(`${SQLJS_CDN}sql-wasm.js`);
    if (!window.initSqlJs) throw new Error("sql.js failed to attach to window");
    sqlJsModule = await window.initSqlJs({ locateFile: (file: string) => `${SQLJS_CDN}${file}` });
    return sqlJsModule;
  })();

  return loadingPromise;
}

export type SqlRunResult = {
  rows: Record<string, unknown>[];
  error: string | null;
};

export async function runQuery(seedSql: string, query: string): Promise<SqlRunResult> {
  try {
    const SQL = await getSqlJs();
    const db = new SQL.Database();
    db.run(seedSql);

    const results = db.exec(query);
    db.close();

    if (results.length === 0) return { rows: [], error: null };

    const { columns, values } = results[0];
    const rows = values.map((row: unknown[]) =>
      Object.fromEntries(columns.map((col: string, i: number) => [col, row[i]]))
    );

    return { rows, error: null };
  } catch (e: any) {
    return { rows: [], error: e?.message ?? String(e) };
  }
}
