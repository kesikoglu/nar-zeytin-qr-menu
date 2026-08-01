"use client";

import { Download, Copy } from "lucide-react";
import { toPng } from "html-to-image";
import type { ExportFormat } from "@/types/palette";
import { formatPalette, paletteFilename, downloadTextFile } from "@/lib/export";
import { copyText } from "@/lib/clipboard";
import { useToast } from "@/components/ui/Toast";

const formats: { value: ExportFormat; label: string; extension: string; mime: string }[] = [
  { value: "css", label: "CSS variables", extension: "css", mime: "text/css" },
  { value: "scss", label: "SCSS variables", extension: "scss", mime: "text/plain" },
  { value: "json", label: "JSON", extension: "json", mime: "application/json" },
  { value: "hex", label: "HEX list", extension: "txt", mime: "text/plain" }
];

export function ExportPanel({ colors, paletteRef }: { colors: string[]; paletteRef: React.RefObject<HTMLElement> }) {
  const { showToast } = useToast();

  async function copy(format: ExportFormat) {
    const ok = await copyText(formatPalette(colors, format));
    showToast(ok ? "Export copied." : "Could not copy export.");
  }

  function download(format: ExportFormat) {
    const selected = formats.find((item) => item.value === format) ?? formats[0];
    downloadTextFile(formatPalette(colors, format), paletteFilename(selected.extension), selected.mime);
    showToast("Export downloaded.");
  }

  async function downloadPng() {
    if (!paletteRef.current) return;
    try {
      const dataUrl = await toPng(paletteRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = paletteFilename("png");
      link.click();
      showToast("PNG downloaded.");
    } catch {
      showToast("Image export failed. Try another format.");
    }
  }

  return (
    <div className="grid gap-3">
      {formats.map((format) => (
        <div key={format.value} className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{format.label}</span>
          <div className="flex gap-2">
            <button className="icon-button" onClick={() => copy(format.value)} aria-label={`Copy ${format.label}`}>
              <Copy className="h-4 w-4" />
            </button>
            <button className="icon-button" onClick={() => download(format.value)} aria-label={`Download ${format.label}`}>
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={downloadPng} className="btn-secondary justify-center">
        <Download className="h-4 w-4" />
        Download PNG
      </button>
    </div>
  );
}
