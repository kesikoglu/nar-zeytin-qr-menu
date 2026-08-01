"use client";

import { useEffect, useState } from "react";
import { Copy, Download, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { copyText } from "@/lib/clipboard";
import { formatPalette, paletteFilename, downloadTextFile } from "@/lib/export";
import { readSavedPalettes, setCurrentPalette, writeSavedPalettes } from "@/lib/storage";
import type { SavedPalette } from "@/types/palette";
import { useToast } from "@/components/ui/Toast";

export function SavedPalettesClient() {
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const { showToast } = useToast();

  useEffect(() => setPalettes(readSavedPalettes()), []);

  function remove(id: string) {
    const next = palettes.filter((palette) => palette.id !== id);
    setPalettes(next);
    writeSavedPalettes(next);
    showToast("Saved palette deleted.");
  }

  async function copy(colors: string[]) {
    const ok = await copyText(colors.join(", "));
    showToast(ok ? "Palette copied." : "Could not copy palette.");
  }

  function openPalette(colors: string[]) {
    try {
      const ok = setCurrentPalette(colors);
      showToast(ok ? "Opening palette." : "Could not open this palette.");
    } catch {
      showToast("Browser storage is unavailable.");
    }
  }

  if (!palettes.length) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">No saved palettes yet</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Save a palette from the generator and it will appear here in this browser.</p>
        <Link href="/" className="btn-primary mt-5 inline-flex">Open generator</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {palettes.map((palette) => (
        <article key={palette.id} className="rounded-md border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold text-slate-950 dark:text-white">{palette.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{new Date(palette.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/" onClick={() => openPalette(palette.colors)} className="btn-secondary"><ExternalLink className="h-4 w-4" />Open</Link>
              <button className="btn-secondary" onClick={() => copy(palette.colors)}><Copy className="h-4 w-4" />Copy</button>
              <button className="btn-secondary" onClick={() => downloadTextFile(formatPalette(palette.colors, "json"), paletteFilename("json"), "application/json")}><Download className="h-4 w-4" />Export</button>
              <button className="btn-secondary" onClick={() => remove(palette.id)}><Trash2 className="h-4 w-4" />Delete</button>
            </div>
          </div>
          <div className="mt-4 grid h-20 overflow-hidden rounded-md sm:grid-flow-col sm:auto-cols-fr">
            {palette.colors.map((color) => <div key={color} style={{ backgroundColor: color }}><span className="sr-only">{color}</span></div>)}
          </div>
        </article>
      ))}
    </div>
  );
}
