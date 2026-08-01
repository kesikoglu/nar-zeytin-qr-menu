import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 py-16 text-center">
      <div>
        <p className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400">404</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-950 dark:text-white">This color is outside the palette.</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">The page you requested could not be found.</p>
        <Link href="/" className="btn-primary mt-6 inline-flex">Back to generator</Link>
      </div>
    </div>
  );
}
