"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftRight, Copy, Download, GripVertical, Lock, LockOpen, Plus, RotateCcw, Save, Shuffle, Trash2, X } from "lucide-react";
import { ExportPanel } from "@/components/export/ExportPanel";
import { WebsitePreview } from "@/components/palette/WebsitePreview";
import { useToast } from "@/components/ui/Toast";
import { copyText } from "@/lib/clipboard";
import { createInitialPalette, generatePalette, generationModes, id, isValidHex, normalizeHex, readableText, toHsl, toRgb } from "@/lib/color";
import { consumeCurrentPalette, savePalette } from "@/lib/storage";
import type { GenerationMode, PaletteColor } from "@/types/palette";

const minColors = 2;
const maxColors = 8;
const baseColorModes = new Set<GenerationMode>(["monochromatic", "analogous", "complementary", "split-complementary", "triadic", "tetradic"]);

export function PaletteGenerator() {
  const [palette, setPalette] = useState<PaletteColor[]>(() => createInitialPalette());
  const [mode, setMode] = useState<GenerationMode>("random");
  const [baseColor, setBaseColor] = useState("#2563EB");
  const [customColor, setCustomColor] = useState("#FFFFFF");
  const [history, setHistory] = useState<PaletteColor[][]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [dragging, setDragging] = useState<string | null>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const loaded = consumeCurrentPalette();
    if (loaded) {
      setPalette(loaded.map((hex) => ({ id: id(), hex: normalizeHex(hex), locked: false })));
      showToast("Saved palette opened.");
    }
  }, [showToast]);

  const push = useCallback((next: PaletteColor[]) => {
    setHistory((items) => [palette, ...items].slice(0, 10));
    setPalette(next);
  }, [palette]);

  const generate = useCallback(() => {
    if (!isValidHex(baseColor)) {
      showToast("Enter a valid base HEX color before generating.");
      return;
    }
    if (palette.every((color) => color.locked)) {
      showToast("All colors are locked. Unlock at least one color to generate a new palette.");
      return;
    }
    push(generatePalette(palette, mode, normalizeHex(baseColor)));
  }, [baseColor, mode, palette, push, showToast]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (event.code === "Space" && !typing) {
        event.preventDefault();
        generate();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [generate]);

  async function copyValue(value: string) {
    const ok = await copyText(value);
    showToast(ok ? `${value} copied` : "Could not copy. Select and copy manually.");
  }

  function updateColor(idToUpdate: string, hex: string) {
    if (!isValidHex(hex)) return;
    push(palette.map((color) => (color.id === idToUpdate ? { ...color, hex: normalizeHex(hex) } : color)));
  }

  function toggleLock(idToUpdate: string) {
    push(palette.map((color) => (color.id === idToUpdate ? { ...color, locked: !color.locked } : color)));
  }

  function removeColor(idToRemove: string) {
    if (palette.length <= minColors) {
      showToast("A palette needs at least two colors.");
      return;
    }
    push(palette.filter((color) => color.id !== idToRemove));
  }

  function addGeneratedColor() {
    if (palette.length >= maxColors) {
      showToast("A palette can include up to eight colors.");
      return;
    }
    if (!isValidHex(baseColor)) {
      showToast("Enter a valid base HEX color before adding a generated color.");
      return;
    }
    push([...palette, { id: id(), hex: generatePalette([{ id: id(), hex: normalizeHex(baseColor), locked: false }], mode, normalizeHex(baseColor))[0].hex, locked: false }]);
  }

  function addCustomColor() {
    if (palette.length >= maxColors) {
      showToast("A palette can include up to eight colors.");
      return;
    }
    if (!isValidHex(customColor)) {
      showToast("Enter a valid custom HEX color before adding it.");
      return;
    }
    const normalized = normalizeHex(customColor);
    push([...palette, { id: id(), hex: normalized, locked: false }]);
    setCustomColor(normalized);
    showToast(`${normalized} added.`);
  }

  function clearLocks() {
    push(palette.map((color) => ({ ...color, locked: false })));
  }

  function undo() {
    const [previous, ...rest] = history;
    if (!previous) return;
    setPalette(previous);
    setHistory(rest);
  }

  function saveCurrentPalette() {
    const paletteName = name.trim() || `Palette ${new Date().toLocaleDateString()}`;
    try {
      const result = savePalette({
        id: id("palette"),
        name: paletteName,
        colors: palette.map((color) => color.hex),
        createdAt: new Date().toISOString()
      });
      showToast(result.message);
    } catch {
      showToast("Could not save. Browser storage may be unavailable or full.");
    }
  }

  function onDrop(targetId: string) {
    if (!dragging || dragging === targetId) return;
    const from = palette.findIndex((color) => color.id === dragging);
    const to = palette.findIndex((color) => color.id === targetId);
    const next = [...palette];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    push(next);
    setDragging(null);
  }

  return (
    <section className="grid gap-5" aria-label="Color palette generator">
      <div className="grid gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="grid gap-3 xl:grid-cols-[1fr_1.05fr_1.05fr_1fr]">
            <label className="grid gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
              Mode
              <select value={mode} onChange={(event) => setMode(event.target.value as GenerationMode)} className="field">
                {generationModes.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
              Base color
              <span className="flex gap-2">
                <input type="color" value={baseColor} onChange={(event) => setBaseColor(event.target.value.toUpperCase())} className="h-11 w-14 rounded-md border border-slate-300 bg-transparent p-1 dark:border-slate-700" aria-label="Choose base color" />
                <input value={baseColor} onChange={(event) => isValidHex(event.target.value) ? setBaseColor(normalizeHex(event.target.value)) : setBaseColor(event.target.value)} className="field min-w-0" aria-label="Base HEX color" />
              </span>
              <span className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                {baseColorModes.has(mode) ? "Used as the starting color for this harmony mode." : "Random-style modes do not depend strongly on the base color."}
              </span>
              {!isValidHex(baseColor) ? <span className="text-sm text-red-600 dark:text-red-400">Enter a valid HEX color.</span> : null}
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
              Custom color
              <span className="flex gap-2">
                <input type="color" value={isValidHex(customColor) ? normalizeHex(customColor) : "#FFFFFF"} onChange={(event) => setCustomColor(event.target.value.toUpperCase())} className="h-11 w-14 rounded-md border border-slate-300 bg-transparent p-1 dark:border-slate-700" aria-label="Choose custom color" />
                <input value={customColor} onChange={(event) => isValidHex(event.target.value) ? setCustomColor(normalizeHex(event.target.value)) : setCustomColor(event.target.value)} className="field min-w-0" aria-label="Custom HEX color" />
              </span>
              {!isValidHex(customColor) ? <span className="text-sm text-red-600 dark:text-red-400">Enter a valid HEX color.</span> : null}
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
              Palette name
              <input value={name} onChange={(event) => setName(event.target.value)} className="field" placeholder="Optional name" maxLength={48} />
            </label>
          </div>
          <button type="button" onClick={generate} className="btn-primary justify-center lg:mt-7">
            <Shuffle className="h-4 w-4" />
            Generate Palette
          </button>
        </div>

        <div ref={paletteRef} className="grid overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 lg:grid-flow-col lg:auto-cols-fr">
          {palette.map((color) => {
            const text = readableText(color.hex);
            const isEditing = editing === color.id;
            return (
              <article
                key={color.id}
                draggable
                onDragStart={() => setDragging(color.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => onDrop(color.id)}
                className="group min-h-[260px] border-b border-white/30 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                style={{ backgroundColor: color.hex, color: text }}
              >
                <div className="flex h-full min-h-[260px] flex-col justify-between p-4">
                  <div className="flex items-center justify-between gap-2">
                    <button type="button" className="color-button" onClick={() => toggleLock(color.id)} aria-label={color.locked ? `Unlock ${color.hex}` : `Lock ${color.hex}`}>
                      {color.locked ? <Lock className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
                    </button>
                    <button type="button" className="color-button cursor-grab" aria-label={`Drag ${color.hex} to reorder`}>
                      <GripVertical className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3">
                    {isEditing ? (
                      <ColorEditor value={color.hex} onCancel={() => setEditing(null)} onSave={(hex) => { updateColor(color.id, hex); setEditing(null); }} />
                    ) : (
                      <>
                        <button type="button" onClick={() => copyValue(color.hex)} className="text-left text-2xl font-bold tracking-normal focus:outline-none focus:ring-2 focus:ring-current">{color.hex}</button>
                        <div className="grid gap-1 text-sm font-medium opacity-90">
                          <button type="button" className="text-left" onClick={() => copyValue(toRgb(color.hex))}>{toRgb(color.hex)}</button>
                          <button type="button" className="text-left" onClick={() => copyValue(toHsl(color.hex))}>{toHsl(color.hex)}</button>
                        </div>
                      </>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className="color-button" onClick={() => copyValue(color.hex)} aria-label={`Copy ${color.hex}`}>
                        <Copy className="h-4 w-4" />
                      </button>
                      <button type="button" className="color-button" onClick={() => setEditing(color.id)} aria-label={`Edit ${color.hex} manually`}>
                        <ArrowLeftRight className="h-4 w-4" />
                      </button>
                      <button type="button" className="color-button" onClick={() => removeColor(color.id)} aria-label={`Remove ${color.hex}`} disabled={palette.length <= minColors}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={addCustomColor} className="btn-secondary" disabled={palette.length >= maxColors}>
            <Plus className="h-4 w-4" />
            Add Custom
          </button>
          <button type="button" onClick={addGeneratedColor} className="btn-secondary" disabled={palette.length >= maxColors}>
            <Plus className="h-4 w-4" />
            Add Generated
          </button>
          <button type="button" onClick={undo} className="btn-secondary" disabled={!history.length}>
            <RotateCcw className="h-4 w-4" />
            Undo
          </button>
          <button type="button" onClick={saveCurrentPalette} className="btn-secondary">
            <Save className="h-4 w-4" />
            Save Palette
          </button>
          <button type="button" onClick={clearLocks} className="btn-secondary">
            <X className="h-4 w-4" />
            Clear Locks
          </button>
        </div>
      </div>

      <WebsitePreview colors={palette.map((color) => color.hex)} />

      <details className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <summary className="flex cursor-pointer items-center gap-2 font-semibold text-slate-950 dark:text-white">
          <Download className="h-4 w-4" />
          Export palette
        </summary>
        <div className="mt-4">
          <ExportPanel colors={palette.map((color) => color.hex)} paletteRef={paletteRef} />
        </div>
      </details>
    </section>
  );
}

function ColorEditor({ value, onSave, onCancel }: { value: string; onSave: (hex: string) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState(value);
  const valid = isValidHex(draft);

  return (
    <form className="grid gap-2" onSubmit={(event) => { event.preventDefault(); if (valid) onSave(draft); }}>
      <span className="text-sm font-bold">Edit color</span>
      <input type="color" value={valid ? normalizeHex(draft) : value} onChange={(event) => setDraft(event.target.value.toUpperCase())} className="h-12 w-16 rounded-md border border-white/40 bg-transparent p-1" aria-label="Pick color" />
      <input value={draft} onChange={(event) => setDraft(event.target.value)} className="rounded-md border border-white/50 bg-white/20 px-3 py-2 font-semibold outline-none backdrop-blur focus:ring-2 focus:ring-current" aria-label="HEX color" />
      <div className="flex flex-wrap gap-2">
        {["#FFFFFF", "#000000"].map((hex) => (
          <button key={hex} type="button" onClick={() => setDraft(hex)} className="rounded-md border border-white/50 px-3 py-2 text-xs font-bold" style={{ backgroundColor: hex, color: readableText(hex) }}>
            {hex}
          </button>
        ))}
      </div>
      {!valid ? <p className="text-sm font-semibold">Enter a valid HEX value.</p> : null}
      <div className="flex gap-2">
        <button type="submit" className="rounded-md bg-white/90 px-3 py-2 text-sm font-semibold text-slate-950" disabled={!valid}>Save</button>
        <button type="button" onClick={onCancel} className="rounded-md bg-black/20 px-3 py-2 text-sm font-semibold">Cancel</button>
      </div>
    </form>
  );
}
