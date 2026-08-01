// Loads Pyodide (Python compiled to WebAssembly) from a CDN at runtime and
// runs student code entirely in the browser — no server, no cost, no risk
// of arbitrary code touching your infrastructure.

declare global {
  interface Window {
    loadPyodide?: (config?: { indexURL: string }) => Promise<any>;
  }
}

const PYODIDE_VERSION = "0.26.2";
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodideInstance: any = null;
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
    script.onerror = () => reject(new Error("Failed to load Pyodide script"));
    document.head.appendChild(script);
  });
}

export async function getPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    await loadScript(`${PYODIDE_CDN}pyodide.js`);
    if (!window.loadPyodide) throw new Error("Pyodide failed to attach to window");
    pyodideInstance = await window.loadPyodide({ indexURL: PYODIDE_CDN });
    return pyodideInstance;
  })();

  return loadingPromise;
}

export type PyRunResult = {
  stdout: string;
  error: string | null;
};

export async function runPython(code: string): Promise<PyRunResult> {
  const pyodide = await getPyodide();

  const wrapped = `
import sys, io
_stdout = io.StringIO()
_stderr = io.StringIO()
sys.stdout = _stdout
sys.stderr = _stderr
_error = None
try:
    exec(${JSON.stringify(code)}, {})
except Exception as e:
    _error = f"{type(e).__name__}: {e}"
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
(_stdout.getvalue(), _error)
`;

  try {
    const result = await pyodide.runPythonAsync(wrapped);
    const [stdout, error] = result.toJs();
    return { stdout: stdout ?? "", error: error ?? null };
  } catch (e: any) {
    return { stdout: "", error: e?.message ?? String(e) };
  }
}
