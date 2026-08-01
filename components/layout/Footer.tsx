import Link from "next/link";

export function Footer() {
  return (
    <footer id="iletisim" className="border-t border-zinc-200 bg-zinc-100 py-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 text-sm text-zinc-600 dark:text-zinc-400 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="text-lg font-bold text-zinc-950 hover:text-rose-900 dark:text-white dark:hover:text-rose-200">Nar & Zeytin</Link>
          <p className="mt-3 max-w-md leading-6">Modern Türk mutfağı için QR menü. İçerik, kalori ve alerjen bilgileri sipariş öncesi müşteriye sunulur.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-zinc-950 dark:hover:text-white">KVKK</Link>
            <Link href="/terms" className="hover:text-zinc-950 dark:hover:text-white">Aydınlatma metni</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-zinc-950 dark:text-white">İletişim</h2>
          <p className="mt-3 leading-6">Bağdat Caddesi No: 184<br />Kadıköy, İstanbul</p>
          <p className="mt-3">+90 216 000 00 00</p>
          <p className="mt-1">@narvezeytin</p>
        </div>
        <div>
          <h2 className="font-bold text-zinc-950 dark:text-white">Çalışma saatleri</h2>
          <p className="mt-3 leading-6">Hafta içi 11:00-23:00<br />Hafta sonu 10:00-00:00</p>
          <div className="mt-4 grid h-24 w-24 place-items-center rounded-lg border border-zinc-300 bg-white text-center text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            Gıda işletmesi karekodu
          </div>
        </div>
      </div>
    </footer>
  );
}
