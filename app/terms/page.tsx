import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Basic terms and limitations for using the Color Palette Generator.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 leading-8 text-slate-700 dark:text-slate-300 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950 dark:text-white">Terms of Use</h1>
      <p className="mt-5">Use this tool for general design and creative work at your own discretion. The generated palettes, exports, and contrast results are provided as-is without warranties.</p>
      <p className="mt-4">The contrast checker is informational and does not provide legal advice or formal accessibility certification. Independently verify colors before using them in safety-critical, medical, legal, industrial, or regulated environments.</p>
      <p className="mt-4">Do not misuse the website, attempt to disrupt it, or present future sponsored or affiliate placements as independent recommendations without proper disclosure.</p>
    </article>
  );
}
