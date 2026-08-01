import type { Metadata } from "next";
import { SavedPalettesClient } from "@/components/palette/SavedPalettesClient";

export const metadata: Metadata = {
  title: "Saved Palettes",
  description: "View, copy, export, and delete color palettes saved in this browser.",
  alternates: { canonical: "/saved" }
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950 dark:text-white">Saved Palettes</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">Favorites are stored locally in this browser. They are not uploaded and may disappear if browser data is cleared.</p>
      <div className="mt-8">
        <SavedPalettesClient />
      </div>
    </div>
  );
}
