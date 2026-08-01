"use client";

import { useState } from "react";
import CodeEditor from "./CodeEditor";
import { Exercise } from "@/lib/content";
import { runPython } from "@/lib/runners/pyodide";
import { runQuery } from "@/lib/runners/sqljs";

type Status = "idle" | "running" | "correct" | "incorrect" | "error";

export default function ExerciseRunner({
  exercise,
  onPass,
  onAttempt,
}: {
  exercise: Exercise;
  onPass: () => void;
  onAttempt: () => void;
}) {
  if (exercise.type === "mcq") {
    return <McqRunner exercise={exercise} onPass={onPass} onAttempt={onAttempt} />;
  }
  if (exercise.type === "python") {
    return <PythonRunner exercise={exercise} onPass={onPass} onAttempt={onAttempt} />;
  }
  return <SqlRunnerBlock exercise={exercise} onPass={onPass} onAttempt={onAttempt} />;
}

function StatusBanner({ status, message }: { status: Status; message?: string }) {
  if (status === "idle") return null;
  const styles: Record<Status, string> = {
    idle: "",
    running: "bg-gray-50 text-gray-600 border-gray-200",
    correct: "bg-green-50 text-green-700 border-green-200",
    incorrect: "bg-amber-50 text-amber-800 border-amber-200",
    error: "bg-red-50 text-red-700 border-red-200",
  };
  const labels: Record<Status, string> = {
    idle: "",
    running: "Running…",
    correct: "✅ Correct! Lab marked complete.",
    incorrect: "Not quite — check the output below and try again.",
    error: "There was an error running your code.",
  };
  return (
    <div className={`border rounded-lg px-4 py-3 text-sm ${styles[status]}`}>
      {message ?? labels[status]}
    </div>
  );
}

function PythonRunner({
  exercise,
  onPass,
  onAttempt,
}: {
  exercise: Extract<Exercise, { type: "python" }>;
  onPass: () => void;
  onAttempt: () => void;
}) {
  const [code, setCode] = useState(exercise.starterCode);
  const [status, setStatus] = useState<Status>("idle");
  const [output, setOutput] = useState("");
  const [showHint, setShowHint] = useState(false);

  async function handleRun() {
    setStatus("running");
    onAttempt();
    const result = await runPython(code);
    if (result.error) {
      setStatus("error");
      setOutput(result.error);
      return;
    }
    setOutput(result.stdout);
    const actual = result.stdout.trim();
    const expected = exercise.expectedStdout.trim();
    if (actual === expected) {
      setStatus("correct");
      onPass();
    } else {
      setStatus("incorrect");
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700">{exercise.instructions}</p>
      <CodeEditor value={code} onChange={setCode} language="python" />
      <div className="flex items-center gap-3">
        <button
          onClick={handleRun}
          disabled={status === "running"}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-5 py-2 rounded-lg disabled:opacity-50"
        >
          {status === "running" ? "Running…" : "Run & Check"}
        </button>
        {exercise.hint && (
          <button onClick={() => setShowHint((s) => !s)} className="text-sm text-brand-600 underline">
            {showHint ? "Hide hint" : "Show hint"}
          </button>
        )}
      </div>
      {showHint && exercise.hint && (
        <p className="text-sm text-gray-500 italic">Hint: {exercise.hint}</p>
      )}
      {output && (
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Output</p>
          <pre className="bg-gray-900 text-gray-100 rounded-lg p-3 text-sm overflow-x-auto whitespace-pre-wrap">
            {output || "(no output)"}
          </pre>
        </div>
      )}
      <StatusBanner status={status} />
    </div>
  );
}

function SqlRunnerBlock({
  exercise,
  onPass,
  onAttempt,
}: {
  exercise: Extract<Exercise, { type: "sql" }>;
  onPass: () => void;
  onAttempt: () => void;
}) {
  const [query, setQuery] = useState(exercise.starterQuery);
  const [status, setStatus] = useState<Status>("idle");
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showHint, setShowHint] = useState(false);

  function rowsMatch(a: Record<string, unknown>[], b: Record<string, unknown>[]) {
    if (a.length !== b.length) return false;
    const norm = (rows: Record<string, unknown>[]) =>
      rows
        .map((r) => JSON.stringify(Object.entries(r).sort()))
        .sort();
    const na = norm(a);
    const nb = norm(b);
    return na.every((v, i) => v === nb[i]);
  }

  async function handleRun() {
    setStatus("running");
    onAttempt();
    const result = await runQuery(exercise.seedSql, query);
    if (result.error) {
      setStatus("error");
      setErrorMsg(result.error);
      setRows([]);
      return;
    }
    setErrorMsg("");
    setRows(result.rows);
    if (rowsMatch(result.rows, exercise.expectedRows)) {
      setStatus("correct");
      onPass();
    } else {
      setStatus("incorrect");
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700">{exercise.instructions}</p>
      <CodeEditor value={query} onChange={setQuery} language="sql" height="140px" />
      <div className="flex items-center gap-3">
        <button
          onClick={handleRun}
          disabled={status === "running"}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-5 py-2 rounded-lg disabled:opacity-50"
        >
          {status === "running" ? "Running…" : "Run & Check"}
        </button>
        {exercise.hint && (
          <button onClick={() => setShowHint((s) => !s)} className="text-sm text-brand-600 underline">
            {showHint ? "Hide hint" : "Show hint"}
          </button>
        )}
      </div>
      {showHint && exercise.hint && (
        <p className="text-sm text-gray-500 italic">Hint: {exercise.hint}</p>
      )}
      {errorMsg && (
        <pre className="bg-red-50 text-red-700 rounded-lg p-3 text-sm overflow-x-auto">{errorMsg}</pre>
      )}
      {rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(rows[0]).map((col) => (
                  <th key={col} className="text-left px-3 py-2 font-medium text-gray-600">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-gray-100">
                  {Object.values(r).map((v, j) => (
                    <td key={j} className="px-3 py-2 text-gray-700">
                      {String(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <StatusBanner status={status} />
    </div>
  );
}

function McqRunner({
  exercise,
  onPass,
  onAttempt,
}: {
  exercise: Extract<Exercise, { type: "mcq" }>;
  onPass: () => void;
  onAttempt: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  function handleSelect(i: number) {
    setSelected(i);
    onAttempt();
    if (i === exercise.correctIndex) {
      setStatus("correct");
      onPass();
    } else {
      setStatus("incorrect");
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-800 font-medium">{exercise.question}</p>
      <div className="space-y-2">
        {exercise.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrectChoice = status !== "idle" && i === exercise.correctIndex;
          const isWrongChoice = isSelected && status === "incorrect";
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={status === "correct"}
              className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                isCorrectChoice
                  ? "border-green-400 bg-green-50"
                  : isWrongChoice
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 hover:border-brand-300 hover:bg-brand-50"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {status !== "idle" && (
        <div
          className={`border rounded-lg px-4 py-3 text-sm ${
            status === "correct"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}
        >
          {status === "correct" ? "✅ Correct! " : "Not quite. "}
          {exercise.explanation}
        </div>
      )}
    </div>
  );
}
