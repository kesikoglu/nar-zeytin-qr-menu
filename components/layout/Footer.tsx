import Link from "next/link";

export function Footer() {
  return (
    <footer id="iletisim" className="border-t border-white/10 bg-[#070706] py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm text-zinc-400 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="text-2xl font-black text-white hover:text-rose-200">Nar & Zeytin</Link>
          <p className="mt-4 max-w-md leading-6">Modern Türk mutfağı için QR menü. İçerik, kalori ve alerjen bilgileri sipariş öncesi müşteriye sunulur.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">KVKK</Link>
            <Link href="/terms" className="hover:text-white">Aydınlatma metni</Link>
          </div>
        </div>
        <div>
          <h2 className="font-black text-white">İletişim</h2>
          <p className="mt-3 leading-6">Bağdat Caddesi No: 184<br />Kadıköy, İstanbul</p>
          <p className="mt-3">+90 216 000 00 00</p>
          <p className="mt-1">@narvezeytin</p>
        </div>
        <div>
          <h2 className="font-black text-white">Çalışma saatleri</h2>
          <p className="mt-3 leading-6">Hafta içi 11:00-23:00<br />Hafta sonu 10:00-00:00</p>
          <div className="mt-4 grid h-24 w-24 place-items-center rounded-2xl border border-white/10 bg-white/8 text-center text-xs font-semibold text-zinc-200">
            Gıda işletmesi karekodu
          </div>
        </div>
      </div>
    </footer>
  );
}
