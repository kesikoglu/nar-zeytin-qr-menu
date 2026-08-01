import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Color Palette Generator.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 leading-8 text-slate-700 dark:text-slate-300 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950 dark:text-white">Privacy Policy</h1>
      <p className="mt-5">This initial version does not use accounts, analytics, cookies, tracking scripts, databases, or external APIs.</p>
      <p className="mt-4">Saved palettes are stored locally in your browser. They are not uploaded by this website. If a future cloud saving feature is added, the policy should be updated before launch.</p>
      <p className="mt-4">Browser storage can be unavailable, full, corrupted, or cleared by you or your browser. In those cases, saved palettes may not persist.</p>
    </article>
  );
}
