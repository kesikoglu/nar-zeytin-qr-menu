import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-600 dark:text-slate-400 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="hover:text-slate-950 dark:hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-950 dark:hover:text-white">Terms</Link>
          <Link href="/contrast-checker" className="hover:text-slate-950 dark:hover:text-white">Contrast checker</Link>
        </div>
        <p>Use without an account. Saved palettes stay in this browser unless you clear local data.</p>
      </div>
    </footer>
  );
}
