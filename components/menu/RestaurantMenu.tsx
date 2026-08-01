"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Flame,
  Info,
  Leaf,
  MilkOff,
  Search,
  ShieldCheck,
  Utensils,
  WheatOff,
  X
} from "lucide-react";

type Category =
  | "Başlangıçlar"
  | "Ana Yemekler"
  | "Izgara"
  | "Zeytinyağlılar"
  | "Salatalar"
  | "Tatlılar"
  | "Sıcak İçecekler"
  | "Soğuk İçecekler";

type Nutrition = {
  protein: string;
  carbs: string;
  fat: string;
  sugar: string;
  salt: string;
};

type MenuItem = {
  code: string;
  name: string;
  category: Category;
  price: string;
  portion: string;
  calories: number;
  description: string;
  ingredients: string[];
  allergens: string[];
  tags: string[];
  warning: string;
  nutrition: Nutrition;
  image: string;
  featured?: "Şef önerisi" | "Düşük kalori" | "Vejetaryen" | "Alerjen uyarısı";
};

const categories: Category[] = [
  "Başlangıçlar",
  "Ana Yemekler",
  "Izgara",
  "Zeytinyağlılar",
  "Salatalar",
  "Tatlılar",
  "Sıcak İçecekler",
  "Soğuk İçecekler"
];

const filters = [
  { label: "Glutensiz", icon: WheatOff },
  { label: "Vejetaryen", icon: Leaf },
  { label: "Düşük kalori", icon: ShieldCheck },
  { label: "Süt içermez", icon: MilkOff },
  { label: "Acısız", icon: Flame }
];

const menuItems: MenuItem[] = [
  {
    code: "B-021",
    name: "Humus ve Zahter",
    category: "Başlangıçlar",
    price: "210 TL",
    portion: "160 g",
    calories: 310,
    description: "Nohut ezmesi, tahin, zeytinyağı ve zahter ile servis edilir.",
    ingredients: ["nohut", "tahin", "limon", "sarımsak", "zeytinyağı", "zahter"],
    allergens: ["susam"],
    tags: ["vejetaryen", "vegan", "glutensiz", "süt içermez", "acısız"],
    warning: "Domuz türevi ve alkol içermez. Susam alerjeni içerir.",
    nutrition: { protein: "9 g", carbs: "24 g", fat: "19 g", sugar: "2 g", salt: "1.1 g" },
    image: "https://images.unsplash.com/photo-1697126248475-a537cc5cce28?auto=format&fit=crop&q=80&w=1200",
    featured: "Vejetaryen"
  },
  {
    code: "A-014",
    name: "Izgara Köfte",
    category: "Izgara",
    price: "420 TL",
    portion: "1 tabak",
    calories: 620,
    description: "Dana köfte, köz biber, domates, sumaklı soğan ve pilav ile servis edilir.",
    ingredients: ["dana kıyma", "galeta unu", "soğan", "baharat karışımı", "tereyağlı pilav"],
    allergens: ["gluten", "süt"],
    tags: ["yüksek protein", "acısız"],
    warning: "Domuz türevi ve alkol içermez. Gluten ve süt ürünü içerir.",
    nutrition: { protein: "34 g", carbs: "48 g", fat: "31 g", sugar: "5 g", salt: "2.4 g" },
    image: "https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?auto=format&fit=crop&q=80&w=1200",
    featured: "Şef önerisi"
  },
  {
    code: "A-027",
    name: "Fırın Levrek",
    category: "Ana Yemekler",
    price: "560 TL",
    portion: "280 g",
    calories: 480,
    description: "Defne, limon, patates ve roka salatası ile fırında pişirilir.",
    ingredients: ["levrek", "patates", "limon", "defne", "zeytinyağı", "roka"],
    allergens: ["balık"],
    tags: ["glutensiz", "süt içermez", "düşük kalori", "acısız"],
    warning: "Balık alerjeni içerir. Domuz türevi ve alkol içermez.",
    nutrition: { protein: "39 g", carbs: "23 g", fat: "24 g", sugar: "3 g", salt: "1.7 g" },
    image: "https://images.unsplash.com/photo-1562656407-7f78d2507827?auto=format&fit=crop&q=80&w=1200",
    featured: "Düşük kalori"
  },
  {
    code: "Z-006",
    name: "Enginar Kalbi",
    category: "Zeytinyağlılar",
    price: "260 TL",
    portion: "180 g",
    calories: 260,
    description: "Enginar, iç bakla, havuç ve dereotu ile soğuk servis edilir.",
    ingredients: ["enginar", "iç bakla", "havuç", "dereotu", "zeytinyağı", "limon"],
    allergens: [],
    tags: ["vejetaryen", "vegan", "glutensiz", "süt içermez", "düşük kalori", "acısız"],
    warning: "Beyan edilen ana alerjenleri içermez. Çapraz bulaşma riski olabilir.",
    nutrition: { protein: "6 g", carbs: "20 g", fat: "17 g", sugar: "4 g", salt: "0.8 g" },
    image: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?auto=format&fit=crop&q=80&w=1200",
    featured: "Düşük kalori"
  },
  {
    code: "S-011",
    name: "Gavurdağı Salatası",
    category: "Salatalar",
    price: "240 TL",
    portion: "220 g",
    calories: 340,
    description: "Domates, ceviz, nar ekşisi ve ince kıyılmış yeşillikler ile hazırlanır.",
    ingredients: ["domates", "salatalık", "ceviz", "nar ekşisi", "maydanoz", "zeytinyağı"],
    allergens: ["ceviz"],
    tags: ["vejetaryen", "vegan", "glutensiz", "süt içermez", "acılı"],
    warning: "Ceviz içerir. Nar ekşisi üretici reçetesine göre eser miktarda sülfit içerebilir.",
    nutrition: { protein: "7 g", carbs: "22 g", fat: "24 g", sugar: "11 g", salt: "1.2 g" },
    image: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?auto=format&fit=crop&q=80&w=1200",
    featured: "Alerjen uyarısı"
  },
  {
    code: "T-019",
    name: "Fıstıklı Baklava",
    category: "Tatlılar",
    price: "230 TL",
    portion: "2 dilim",
    calories: 460,
    description: "Antep fıstığı, sade yağ ve ince yufka ile günlük hazırlanır.",
    ingredients: ["baklava yufkası", "Antep fıstığı", "sade yağ", "şeker şerbeti", "limon"],
    allergens: ["gluten", "süt", "fıstık"],
    tags: ["vejetaryen", "acısız"],
    warning: "Gluten, süt ürünü ve fıstık içerir. Domuz türevi ve alkol içermez.",
    nutrition: { protein: "8 g", carbs: "58 g", fat: "22 g", sugar: "34 g", salt: "0.3 g" },
    image: "https://images.unsplash.com/photo-1778448806128-18e8354356e1?auto=format&fit=crop&q=80&w=1200",
    featured: "Alerjen uyarısı"
  },
  {
    code: "I-004",
    name: "Türk Kahvesi",
    category: "Sıcak İçecekler",
    price: "95 TL",
    portion: "70 ml",
    calories: 20,
    description: "Bakır cezvede pişirilir, sade, az şekerli veya orta seçenekleriyle sunulur.",
    ingredients: ["Türk kahvesi", "su", "isteğe bağlı şeker"],
    allergens: [],
    tags: ["vegan", "glutensiz", "süt içermez", "düşük kalori", "acısız"],
    warning: "Kafein içerir. Süt, alkol ve domuz türevi içermez.",
    nutrition: { protein: "1 g", carbs: "3 g", fat: "0 g", sugar: "0-6 g", salt: "0 g" },
    image: "https://images.unsplash.com/photo-1757079649052-a24c6ab32c64?auto=format&fit=crop&q=80&w=1200"
  },
  {
    code: "I-017",
    name: "Reyhan Şerbeti",
    category: "Soğuk İçecekler",
    price: "130 TL",
    portion: "250 ml",
    calories: 145,
    description: "Reyhan, limon, karanfil ve tarçınla hazırlanan soğuk ev şerbeti.",
    ingredients: ["reyhan", "limon", "şeker", "karanfil", "tarçın", "su"],
    allergens: [],
    tags: ["vegan", "glutensiz", "süt içermez", "düşük kalori", "acısız"],
    warning: "Alkol ve domuz türevi içermez. Şeker içerir.",
    nutrition: { protein: "0 g", carbs: "36 g", fat: "0 g", sugar: "34 g", salt: "0 g" },
    image: "https://images.unsplash.com/photo-1561122081-0d390c6d2882?auto=format&fit=crop&q=80&w=1200"
  }
];

function normalize(value: string) {
  return value.toLocaleLowerCase("tr-TR");
}

export function RestaurantMenu() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "Tümü">("Tümü");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const featuredItems = menuItems.filter((item) => item.featured);

  const filteredItems = useMemo(() => {
    const search = normalize(query.trim());

    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === "Tümü" || item.category === selectedCategory;
      const matchesFilters = activeFilters.every((filter) => item.tags.includes(normalize(filter)));
      const haystack = normalize(
        [
          item.name,
          item.category,
          item.description,
          item.ingredients.join(" "),
          item.allergens.join(" "),
          item.tags.join(" ")
        ].join(" ")
      );
      return matchesCategory && matchesFilters && (!search || haystack.includes(search));
    });
  }, [activeFilters, query, selectedCategory]);

  function toggleFilter(filter: string) {
    const normalizedFilter = normalize(filter);
    setActiveFilters((current) =>
      current.includes(normalizedFilter)
        ? current.filter((item) => item !== normalizedFilter)
        : [...current, normalizedFilter]
    );
  }

  return (
    <div className="min-h-[100dvh] bg-zinc-100 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-14">
        <div className="flex min-h-[520px] flex-col justify-center">
          <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">Masa QR menüsü</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-normal text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
            Ne yediğinizi siparişten önce bilin.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Her tabakta içerik, porsiyon, kalori ve alerjen bilgisi açıkça gösterilir.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#menu" className="btn-primary bg-rose-900 hover:bg-rose-800 focus:ring-rose-900 dark:bg-rose-200 dark:text-rose-950 dark:hover:bg-rose-100">
              <Utensils className="h-4 w-4" />
              Menüyü incele
            </a>
            <a href="#bilgilendirme" className="btn-secondary">
              <Info className="h-4 w-4" />
              Bilgilendirme
            </a>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["8", "kategori"],
              ["Kcal", "porsiyon bazlı"],
              ["14", "alerjen takibi"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="text-2xl font-bold text-zinc-950 dark:text-white">{value}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:content-center">
          <Image
            src="https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?auto=format&fit=crop&q=80&w=1200"
            alt="Modern Türk restoranında servis edilmiş tabaklar"
            width={840}
            height={1040}
            priority
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
            className="h-full min-h-[360px] rounded-lg object-cover shadow-soft"
          />
          <div className="grid gap-4">
            <div className="rounded-lg bg-rose-900 p-5 text-white shadow-soft">
              <ShieldCheck className="h-8 w-8" />
              <p className="mt-12 text-3xl font-bold leading-tight">Şeffaf menü deneyimi</p>
              <p className="mt-3 text-sm leading-6 text-rose-100">İçerik, kalori ve alerjen bilgisi ürün detayından önce görünür.</p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1697126248475-a537cc5cce28?auto=format&fit=crop&q=80&w=1200"
              alt="Izgara yemek, salata ve içecek sunumu"
              width={720}
              height={520}
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
              className="min-h-[220px] rounded-lg object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {featuredItems.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setSelectedItem(item)}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-rose-700"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-rose-800 dark:text-rose-300">{item.featured}</span>
                <span className="text-sm font-bold">{item.calories} kcal</span>
              </div>
              <h2 className="mt-3 text-lg font-bold">{item.name}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.description}</p>
            </button>
          ))}
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <label htmlFor="menu-search" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Menüde ara
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 focus-within:ring-2 focus-within:ring-rose-900 dark:border-zinc-700 dark:bg-zinc-950">
                <Search className="h-4 w-4 text-zinc-500" />
                <input
                  id="menu-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="köfte, süt, gluten, vegan"
                  className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                />
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Kategoriler</p>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible">
                  {["Tümü", ...categories].map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category as Category | "Tümü")}
                      className={`shrink-0 rounded-md px-3 py-2 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rose-900 ${
                        selectedCategory === category
                          ? "bg-rose-900 text-white dark:bg-rose-200 dark:text-rose-950"
                          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Filtreler</p>
                <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {filters.map(({ label, icon: Icon }) => {
                    const active = activeFilters.includes(normalize(label));
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => toggleFilter(label)}
                        aria-pressed={active}
                        className={`inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rose-900 ${
                          active
                            ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">Menü</h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {filteredItems.length} ürün gösteriliyor. Kalori değerleri porsiyon bazlıdır.
                </p>
              </div>
              {(query || activeFilters.length > 0 || selectedCategory !== "Tümü") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveFilters([]);
                    setSelectedCategory("Tümü");
                  }}
                  className="btn-secondary"
                >
                  <X className="h-4 w-4" />
                  Temizle
                </button>
              )}
            </div>

            {filteredItems.length === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
                <AlertTriangle className="mx-auto h-8 w-8 text-rose-800 dark:text-rose-300" />
                <h3 className="mt-4 text-xl font-bold">Uygun ürün bulunamadı</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">Filtreleri azaltarak veya farklı bir arama yaparak tekrar deneyin.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item) => (
                  <article key={item.code} className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <Image src={item.image} alt={`${item.name} servis görseli`} width={720} height={520} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 45vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{item.code}</p>
                          <h3 className="mt-1 text-xl font-bold leading-snug">{item.name}</h3>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-lg font-bold text-rose-900 dark:text-rose-300">{item.price}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.portion}</p>
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.description}</p>
                      <div className="mt-4 flex items-center justify-between rounded-md bg-zinc-100 px-3 py-2 dark:bg-zinc-800">
                        <span className="text-sm font-semibold">Enerji</span>
                        <span className="text-xl font-bold">{item.calories} kcal</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(item.allergens.length ? item.allergens : ["ana alerjen yok"]).map((allergen) => (
                          <span key={allergen} className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
                            {allergen}
                          </span>
                        ))}
                      </div>
                      <button type="button" onClick={() => setSelectedItem(item)} className="btn-primary mt-4 w-full justify-center bg-rose-900 hover:bg-rose-800 focus:ring-rose-900 dark:bg-rose-200 dark:text-rose-950 dark:hover:bg-rose-100">
                        Detay
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="bilgilendirme" className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Bilgilendirme</h2>
            <p className="mt-3 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
              Bu QR menü, sipariş öncesi içerik, enerji ve alerjen bilgisini görünür kılmak için hazırlanmıştır.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "Kalori değerleri porsiyon bazlıdır.",
              "İçerikler dönemsel tedarike göre güncellenebilir.",
              "Alerjiniz varsa sipariş öncesi personele bilgi verin."
            ].map((item) => (
              <div key={item} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <Info className="h-5 w-5 text-rose-800 dark:text-rose-300" />
                <p className="mt-4 text-sm font-semibold leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedItem && (
        <div role="dialog" aria-modal="true" aria-labelledby="product-title" className="fixed inset-0 z-50 flex items-end bg-zinc-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="mx-auto max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-lg bg-white shadow-soft dark:bg-zinc-900 sm:rounded-lg">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white/95 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95">
              <div>
                <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">{selectedItem.code}</p>
                <h2 id="product-title" className="text-2xl font-bold">{selectedItem.name}</h2>
              </div>
              <button type="button" onClick={() => setSelectedItem(null)} className="icon-button" aria-label="Detay panelini kapat">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-6 p-4 md:grid-cols-[0.85fr_1.15fr] md:p-6">
              <Image src={selectedItem.image} alt={`${selectedItem.name} detay görseli`} width={720} height={520} sizes="(min-width: 768px) 36vw, 100vw" className="aspect-[4/3] w-full rounded-lg object-cover" />
              <div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Kalori</p>
                    <p className="mt-1 text-xl font-bold">{selectedItem.calories} kcal</p>
                  </div>
                  <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Porsiyon</p>
                    <p className="mt-1 text-xl font-bold">{selectedItem.portion}</p>
                  </div>
                  <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Fiyat</p>
                    <p className="mt-1 text-xl font-bold">{selectedItem.price}</p>
                  </div>
                </div>

                <p className="mt-5 leading-7 text-zinc-700 dark:text-zinc-300">{selectedItem.description}</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <InfoBlock title="İçerik" items={selectedItem.ingredients} />
                  <InfoBlock title="Alerjenler" items={selectedItem.allergens.length ? selectedItem.allergens : ["Beyan edilen ana alerjen yok"]} />
                </div>

                <div className="mt-5 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertTriangle className="h-4 w-4 text-rose-800 dark:text-rose-300" />
                    Uyarı
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{selectedItem.warning}</p>
                </div>

                <div className="mt-5">
                  <h3 className="font-bold">Besin değerleri</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {Object.entries(selectedItem.nutrition).map(([key, value]) => (
                      <div key={key} className="rounded-md bg-zinc-100 p-3 text-center dark:bg-zinc-800">
                        <p className="text-xs capitalize text-zinc-500 dark:text-zinc-400">{nutritionLabels[key as keyof Nutrition]}</p>
                        <p className="mt-1 font-bold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-950 dark:bg-rose-950 dark:text-rose-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const nutritionLabels: Record<keyof Nutrition, string> = {
  protein: "protein",
  carbs: "karbonhidrat",
  fat: "yağ",
  sugar: "şeker",
  salt: "tuz"
};

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <h3 className="font-bold">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-zinc-100 px-2 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
