import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK ve Gizlilik",
  description: "Nar & Zeytin QR menü gizlilik ve kişisel veri bilgilendirmesi.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 leading-8 text-zinc-700 dark:text-zinc-300 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-zinc-950 dark:text-white">KVKK ve Gizlilik</h1>
      <p className="mt-5">Bu QR menü demo sürümü hesap, ödeme, teslimat, üyelik veya sipariş kaydı oluşturmaz.</p>
      <p className="mt-4">Menü araması ve filtreleri tarayıcı içinde çalışır. Bu etkileşimler bu sürümde sunucuya müşteri profili olarak kaydedilmez.</p>
      <p className="mt-4">İşletme gerçek kullanıma geçmeden önce çerez, analitik, rezervasyon veya ödeme sistemi eklerse KVKK aydınlatma metni buna göre güncellenmelidir.</p>
    </article>
  );
}
