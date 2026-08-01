import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aydınlatma Metni",
  description: "Nar & Zeytin QR menü kullanım ve gıda bilgilendirme notları.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 leading-8 text-zinc-700 dark:text-zinc-300 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-zinc-950 dark:text-white">Aydınlatma Metni</h1>
      <p className="mt-5">Menüdeki kalori değerleri porsiyon bazlı örnek değerlerdir. Gerçek işletme kullanımında ürün reçeteleri ve laboratuvar veya uzman hesaplamalarıyla doğrulanmalıdır.</p>
      <p className="mt-4">İçerik ve alerjen bilgileri tedarik, reçete ve mutfak operasyonuna göre değişebilir. Alerjisi veya özel beslenme gereksinimi olan müşteriler sipariş öncesi personele bilgi vermelidir.</p>
      <p className="mt-4">Bu web sitesi hukuki danışmanlık yerine geçmez. İşletme nihai mevzuat uyumu için güncel resmi kılavuzları ve uzman görüşünü esas almalıdır.</p>
    </article>
  );
}
