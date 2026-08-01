import Script from "next/script";
import { RestaurantMenu } from "@/components/menu/RestaurantMenu";

export default function Home() {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Nar & Zeytin",
    servesCuisine: "Modern Turkish",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bağdat Caddesi No: 184",
      addressLocality: "Kadıköy",
      addressRegion: "İstanbul",
      addressCountry: "TR"
    },
    telephone: "+90 216 000 00 00",
    hasMenu: {
      "@type": "Menu",
      name: "QR Menü",
      hasMenuSection: [
        "Başlangıçlar",
        "Ana Yemekler",
        "Izgara",
        "Zeytinyağlılar",
        "Salatalar",
        "Tatlılar",
        "Sıcak İçecekler",
        "Soğuk İçecekler"
      ].map((name) => ({ "@type": "MenuSection", name }))
    }
  };

  return (
    <>
      <Script id="restaurant-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      <RestaurantMenu />
    </>
  );
}
