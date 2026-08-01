import type { Metadata } from "next";
import { ContrastChecker } from "@/components/contrast/ContrastChecker";

export const metadata: Metadata = {
  title: "Color Contrast Checker",
  description: "Check foreground and background color contrast with WCAG AA and AAA guidance for normal and large text.",
  alternates: { canonical: "/contrast-checker" }
};

export default function ContrastPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950 dark:text-white">Color Contrast Checker</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">Compare text and background colors, preview readability, and get practical WCAG contrast guidance.</p>
      <div className="mt-8">
        <ContrastChecker />
      </div>
    </div>
  );
}
