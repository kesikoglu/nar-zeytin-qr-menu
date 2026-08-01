import type { ExportFormat } from "@/types/palette";
import { normalizeHex } from "@/lib/color";

export function paletteFilename(extension: string) {
  return `color-palette-${new Date().toISOString().slice(0, 10)}.${extension}`;
}

export function formatPalette(colors: string[], format: ExportFormat) {
  const normalized = colors.map(normalizeHex);
  if (format === "css") {
    return `:root {\n${normalized.map((hex, index) => `  --color-${index + 1}: ${hex};`).join("\n")}\n}`;
  }
  if (format === "scss") {
    return normalized.map((hex, index) => `$color-${index + 1}: ${hex};`).join("\n");
  }
  if (format === "json") {
    return JSON.stringify(
      {
        name: "Color Palette",
        colors: normalized
      },
      null,
      2
    );
  }
  return normalized.join("\n");
}

export function downloadTextFile(content: string, filename: string, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
