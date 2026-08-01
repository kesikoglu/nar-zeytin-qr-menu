"use client";

import { useMemo, useState } from "react";
import { contrastRatio, contrastResults, isValidHex, normalizeHex } from "@/lib/color";

export function ContrastChecker() {
  const [foreground, setForeground] = useState("#111827");
  const [background, setBackground] = useState("#FFFFFF");

  const ratio = useMemo(() => contrastRatio(foreground, background), [foreground, background]);
  const results = contrastResults(ratio);
  const valid = isValidHex(foreground) && isValidHex(background);

  return (
    <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="rounded-md border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4">
          <ColorInput label="Foreground color" value={foreground} onChange={setForeground} />
          <ColorInput label="Background color" value={background} onChange={setBackground} />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="rounded-md border border-slate-200 p-8 shadow-soft dark:border-slate-800" style={{ color: valid ? normalizeHex(foreground) : "#111827", backgroundColor: valid ? normalizeHex(background) : "#FFFFFF" }}>
          <p className="text-sm font-semibold uppercase tracking-normal">Live preview</p>
          <h2 className="mt-3 text-3xl font-bold">Readable text helps every visitor.</h2>
          <p className="mt-3 max-w-xl">Use the ratio below as practical guidance while choosing colors for websites, presentations, brand systems, and interfaces.</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Contrast ratio</p>
          <p className="text-4xl font-bold text-slate-950 dark:text-white">{valid ? `${ratio}:1` : "Invalid colors"}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Result label="Normal text AA" pass={results.normalAA} />
            <Result label="Normal text AAA" pass={results.normalAAA} />
            <Result label="Large text AA" pass={results.largeAA} />
            <Result label="Large text AAA" pass={results.largeAAA} />
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400">This checker provides informational guidance using WCAG contrast formulas. It is not legal advice or a formal accessibility certification.</p>
        </div>
      </div>
    </section>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      {label}
      <span className="flex gap-2">
        <input type="color" value={isValidHex(value) ? normalizeHex(value) : "#000000"} onChange={(event) => onChange(event.target.value.toUpperCase())} className="h-11 w-14 rounded-md border border-slate-300 bg-transparent p-1 dark:border-slate-700" />
        <input value={value} onChange={(event) => onChange(event.target.value)} className="field min-w-0" />
      </span>
      {!isValidHex(value) ? <span className="text-sm text-red-600 dark:text-red-400">Enter a valid HEX color.</span> : null}
    </label>
  );
}

function Result({ label, pass }: { label: string; pass: boolean }) {
  return (
    <div className="rounded-md border border-slate-200 p-3 dark:border-slate-800">
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
      <p className={pass ? "font-semibold text-emerald-700 dark:text-emerald-300" : "font-semibold text-red-700 dark:text-red-300"}>{pass ? "Pass" : "Does not pass"}</p>
    </div>
  );
}
