export function AdPlaceholder({ label = "Optional ad area" }: { label?: string }) {
  return (
    <aside className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
      {label}
    </aside>
  );
}
