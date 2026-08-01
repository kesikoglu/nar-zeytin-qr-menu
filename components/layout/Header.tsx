import Link from "next/link";
import { Languages, Search, ShieldCheck, Utensils } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const nav = [
  { href: "#menu", label: "Menü" },
  { href: "#bilgilendirme", label: "Bilgilendirme" },
  { href: "#iletisim", label: "İletişim" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-950 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-rose-900 text-white dark:bg-rose-200 dark:text-rose-950">
            <Utensils className="h-5 w-5" />
          </span>
          <span>Nar & Zeytin</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-rose-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white dark:focus:ring-rose-200">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100 sm:inline-flex">
            <ShieldCheck className="h-4 w-4" />
            Açık
          </span>
          <a href="#menu-search" className="icon-button" aria-label="Menüde ara">
            <Search className="h-4 w-4" />
          </a>
          <button type="button" className="icon-button" aria-label="Dil seçimi">
            <Languages className="h-4 w-4" />
          </button>
          <ThemeToggle />
        </div>
      </div>
      <nav className="border-t border-zinc-200/70 px-4 py-2 dark:border-zinc-800 md:hidden" aria-label="Mobile navigation">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-rose-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white dark:focus:ring-rose-200">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
