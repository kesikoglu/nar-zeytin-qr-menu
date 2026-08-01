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
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070706]/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-700 text-white">
            <Utensils className="h-5 w-5" />
          </span>
          <span>Nar & Zeytin</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-200">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm font-semibold text-zinc-100 sm:inline-flex">
            <ShieldCheck className="h-4 w-4" />
            Açık
          </span>
          <a href="#menu-search" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-zinc-100 transition hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-rose-200" aria-label="Menüde ara">
            <Search className="h-4 w-4" />
          </a>
          <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-zinc-100 transition hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-rose-200" aria-label="Dil seçimi">
            <Languages className="h-4 w-4" />
          </button>
          <ThemeToggle />
        </div>
      </div>
      <nav className="border-t border-white/10 px-4 py-2 md:hidden" aria-label="Mobile navigation">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-zinc-300 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-200">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
