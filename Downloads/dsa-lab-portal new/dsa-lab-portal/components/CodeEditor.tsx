"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({
  value,
  onChange,
  language,
  height = "220px",
}: {
  value: string;
  onChange: (value: string) => void;
  language: "python" | "sql";
  height?: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(v) => onChange(v ?? "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          padding: { top: 12 },
        }}
      />
    </div>
  );
}
