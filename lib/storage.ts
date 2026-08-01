import type { SavedPalette } from "@/types/palette";
import { validatePalette } from "@/lib/color";

const KEY = "color-palette-generator:saved";
const CURRENT_KEY = "color-palette-generator:current";

export function readSavedPalettes(): SavedPalette[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is SavedPalette => {
      if (!item || typeof item !== "object") return false;
      const palette = item as SavedPalette;
      return Boolean(palette.id && palette.name && palette.createdAt && validatePalette(palette.colors));
    });
  } catch {
    return [];
  }
}

export function writeSavedPalettes(palettes: SavedPalette[]) {
  window.localStorage.setItem(KEY, JSON.stringify(palettes));
}

export function savePalette(palette: SavedPalette) {
  const existing = readSavedPalettes();
  const signature = palette.colors.join("|");
  if (existing.some((item) => item.colors.join("|") === signature)) {
    return { ok: false as const, message: "This palette is already saved." };
  }
  writeSavedPalettes([palette, ...existing]);
  return { ok: true as const, message: "Palette saved." };
}

export function setCurrentPalette(colors: string[]) {
  if (!validatePalette(colors)) {
    return false;
  }
  window.localStorage.setItem(CURRENT_KEY, JSON.stringify(colors));
  return true;
}

export function consumeCurrentPalette() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CURRENT_KEY);
    window.localStorage.removeItem(CURRENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string") || !validatePalette(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
