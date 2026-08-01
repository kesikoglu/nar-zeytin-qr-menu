import chroma from "chroma-js";
import type { GenerationMode, PaletteColor } from "@/types/palette";

export const generationModes: { value: GenerationMode; label: string }[] = [
  { value: "random", label: "Random" },
  { value: "monochromatic", label: "Monochromatic" },
  { value: "analogous", label: "Analogous" },
  { value: "complementary", label: "Complementary" },
  { value: "split-complementary", label: "Split complementary" },
  { value: "triadic", label: "Triadic" },
  { value: "tetradic", label: "Tetradic" },
  { value: "pastel", label: "Pastel" },
  { value: "vibrant", label: "Vibrant" },
  { value: "dark", label: "Dark" },
  { value: "warm", label: "Warm" },
  { value: "cool", label: "Cool" }
];

export function id(prefix = "color") {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function isValidHex(value: string) {
  return /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
}

export function normalizeHex(value: string) {
  if (!isValidHex(value)) {
    throw new Error("Invalid HEX color");
  }
  return chroma(value.startsWith("#") ? value : `#${value}`).hex().toUpperCase();
}

export function toRgb(hex: string) {
  const [r, g, b] = chroma(hex).rgb();
  return `rgb(${r}, ${g}, ${b})`;
}

export function toHsl(hex: string) {
  const [h, s, l] = chroma(hex).hsl();
  return `hsl(${Math.round(Number.isNaN(h) ? 0 : h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export function readableText(hex: string) {
  return chroma.contrast(hex, "#111827") >= chroma.contrast(hex, "#FFFFFF") ? "#111827" : "#FFFFFF";
}

export function contrastRatio(foreground: string, background: string) {
  if (!isValidHex(foreground) || !isValidHex(background)) return 0;
  return Number(chroma.contrast(normalizeHex(foreground), normalizeHex(background)).toFixed(2));
}

export function contrastResults(ratio: number) {
  return {
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5
  };
}

function rotateHue(hex: string, degrees: number, sat?: number, light?: number) {
  const [h, s, l] = chroma(hex).hsl();
  return chroma.hsl(((Number.isNaN(h) ? 0 : h) + degrees + 360) % 360, sat ?? s, light ?? l).hex().toUpperCase();
}

function randomFromRange(hueMin = 0, hueMax = 360, satMin = 0.45, satMax = 0.88, lightMin = 0.34, lightMax = 0.72) {
  const hue = hueMin + Math.random() * (hueMax - hueMin);
  const sat = satMin + Math.random() * (satMax - satMin);
  const light = lightMin + Math.random() * (lightMax - lightMin);
  return chroma.hsl(hue, sat, light).hex().toUpperCase();
}

function harmonySeeds(mode: GenerationMode, baseHex: string, count: number) {
  const base = normalizeHex(baseHex);
  const offsets: Record<GenerationMode, number[]> = {
    random: [],
    monochromatic: [0, 0, 0, 0, 0, 0, 0, 0],
    analogous: [-42, -24, -10, 0, 16, 32, 48, 64],
    complementary: [0, 180, 12, 192, -12, 168, 28, 208],
    "split-complementary": [0, 150, 210, -18, 132, 228, 18, 198],
    triadic: [0, 120, 240, 18, 138, 258, -18, 102],
    tetradic: [0, 90, 180, 270, 18, 108, 198, 288],
    pastel: [],
    vibrant: [],
    dark: [],
    warm: [],
    cool: []
  };

  if (mode === "random") return Array.from({ length: count }, () => randomFromRange());
  if (mode === "pastel") return Array.from({ length: count }, () => randomFromRange(0, 360, 0.35, 0.62, 0.76, 0.9));
  if (mode === "vibrant") return Array.from({ length: count }, () => randomFromRange(0, 360, 0.7, 0.98, 0.45, 0.62));
  if (mode === "dark") return Array.from({ length: count }, () => randomFromRange(0, 360, 0.36, 0.82, 0.12, 0.32));
  if (mode === "warm") return Array.from({ length: count }, () => randomFromRange(345, 420, 0.48, 0.9, 0.38, 0.68));
  if (mode === "cool") return Array.from({ length: count }, () => randomFromRange(165, 270, 0.44, 0.86, 0.34, 0.7));

  if (mode === "monochromatic") {
    const [, s] = chroma(base).hsl();
    return Array.from({ length: count }, (_, index) => {
      const light = 0.18 + (index / Math.max(count - 1, 1)) * 0.64;
      return rotateHue(base, 0, Math.min(0.85, Math.max(0.28, s)), light);
    });
  }

  return Array.from({ length: count }, (_, index) => rotateHue(base, offsets[mode][index % offsets[mode].length]));
}

function isTooSimilar(hex: string, existing: string[]) {
  return existing.some((other) => chroma.deltaE(hex, other) < 14);
}

export function generatePalette(current: PaletteColor[], mode: GenerationMode, baseHex: string) {
  const locked = current.filter((color) => color.locked).map((color) => color.hex);
  const seeds = harmonySeeds(mode, baseHex, current.length);
  const used = [...locked];
  let seedIndex = 0;

  return current.map((color) => {
    if (color.locked) return color;
    let next = seeds[seedIndex++] ?? randomFromRange();
    let attempts = 0;
    while (isTooSimilar(next, used) && attempts < 18) {
      next = mode === "random" ? randomFromRange() : rotateHue(next, 9 + attempts * 7);
      attempts += 1;
    }
    used.push(next);
    return { ...color, hex: next };
  });
}

const defaultPalette = ["#B31A25", "#FFFFFF", "#3A3EC7"];

export function createInitialPalette(count = defaultPalette.length) {
  if (count === defaultPalette.length) {
    return defaultPalette.map((hex) => ({ id: id(), hex, locked: false }));
  }
  return Array.from({ length: count }, () => ({ id: id(), hex: randomFromRange(), locked: false }));
}

export function validatePalette(colors: string[]) {
  return colors.length >= 2 && colors.length <= 8 && colors.every(isValidHex);
}
