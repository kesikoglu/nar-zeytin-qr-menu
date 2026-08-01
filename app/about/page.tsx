import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn who the Color Palette Generator is for and how browser-only saved palettes work.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 leading-8 text-slate-700 dark:text-slate-300 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950 dark:text-white">About Color Palette Generator</h1>
      <p className="mt-5">Color Palette Generator helps designers, developers, marketers, students, and small business owners create practical color combinations quickly. You can generate harmonies, lock favorite colors, edit exact HEX values, check text contrast, and export palettes for creative projects.</p>
      <p className="mt-4">The tool works without an account. Saved palettes remain in your browser using localStorage, so they are not synced across devices and may disappear if you clear browser data.</p>
      <p className="mt-4">The goal is a fast, visual workflow for websites, brands, presentations, logos, and social media assets without requiring setup or sign-in.</p>
    </article>
  );
}
