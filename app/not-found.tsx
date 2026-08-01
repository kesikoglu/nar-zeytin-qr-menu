import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 py-16 text-center">
      <div>
        <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">404</p>
        <h1 className="mt-2 text-4xl font-bold text-zinc-950 dark:text-white">Bu sayfa menüde yok.</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">Aradığınız bağlantı kaldırılmış veya yanlış yazılmış olabilir.</p>
        <Link href="/" className="btn-primary mt-6 inline-flex bg-rose-900 hover:bg-rose-800 focus:ring-rose-900 dark:bg-rose-200 dark:text-rose-950">Menüye dön</Link>
      </div>
    </div>
  );
}
