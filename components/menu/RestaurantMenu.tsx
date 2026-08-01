"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ChevronRight,
  Flame,
  Info,
  Leaf,
  MilkOff,
  Search,
  ShieldCheck,
  Sparkles,
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
  accent: string;
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

const tickerItems = [
  "İçerik görünür",
  "Kalori porsiyon bazlı",
  "Alerjen metinle belirtilir",
  "Glutensiz filtre",
  "Düşük kalori seçimi",
  "Personel uyarısı"
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
    accent: "Nar ekşili yağ",
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
    accent: "Köz biber",
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
    accent: "Defne ve limon",
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
    accent: "Dereotu",
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
    accent: "Ceviz",
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
    accent: "Antep fıstığı",
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
    image: "https://images.unsplash.com/photo-1757079649052-a24c6ab32c64?auto=format&fit=crop&q=80&w=1200",
    accent: "Bakır cezve"
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
    image: "https://images.unsplash.com/photo-1561122081-0d390c6d2882?auto=format&fit=crop&q=80&w=1200",
    accent: "Reyhan"
  }
];

const heroFrames = [
  {
    src: "https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?auto=format&fit=crop&q=80&w=1400",
    alt: "Izgara köfte ve köz sebze sunumu"
  },
  {
    src: "https://images.unsplash.com/photo-1697126248475-a537cc5cce28?auto=format&fit=crop&q=80&w=1400",
    alt: "Humus, zeytinyağı ve lavaş sunumu"
  },
  {
    src: "https://images.unsplash.com/photo-1757079649052-a24c6ab32c64?auto=format&fit=crop&q=80&w=1400",
    alt: "Türk kahvesi sunumu"
  }
];

const nutritionLabels: Record<keyof Nutrition, string> = {
  protein: "protein",
  carbs: "karbonhidrat",
  fat: "yağ",
  sugar: "şeker",
  salt: "tuz"
};

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
        [item.name, item.category, item.description, item.ingredients.join(" "), item.allergens.join(" "), item.tags.join(" ")].join(" ")
      );
      return matchesCategory && matchesFilters && (!search || haystack.includes(search));
    });
  }, [activeFilters, query, selectedCategory]);

  function toggleFilter(filter: string) {
    const normalizedFilter = normalize(filter);
    setActiveFilters((current) =>
      current.includes(normalizedFilter) ? current.filter((item) => item !== normalizedFilter) : [...current, normalizedFilter]
    );
  }

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#070706] text-zinc-50">
      <section className="relative isolate min-h-[calc(100dvh-65px)] overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src={heroFrames[0].src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="motion-kenburns object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(143,16,49,0.45),transparent_34%),linear-gradient(90deg,rgba(7,7,6,0.98)_0%,rgba(7,7,6,0.78)_42%,rgba(7,7,6,0.2)_100%)]" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:min-h-[calc(100dvh-65px)] lg:grid-cols-[0.94fr_1.06fr] lg:px-8 lg:py-14">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-rose-200">QR menü, içerik ve kalori vitrini</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Her tabak görünür.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-200">
              Nar & Zeytin, modern Türk mutfağını kalori, içerik ve alerjen bilgisiyle birlikte sunar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu" className="btn-primary rounded-full bg-rose-700 px-5 hover:bg-rose-600 focus:ring-rose-300">
                <Utensils className="h-4 w-4" />
                Menüyü aç
              </a>
              <a href="#bilgilendirme" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-rose-200">
                <ShieldCheck className="h-4 w-4" />
                Şeffaf bilgi
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/12 bg-white/8 backdrop-blur-xl">
              {[
                ["8", "kategori"],
                ["kcal", "porsiyon bazlı"],
                ["14", "alerjen takibi"]
              ].map(([value, label]) => (
                <div key={label} className="border-r border-white/10 p-4 last:border-r-0">
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="mt-1 text-xs font-semibold text-zinc-300">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative grid min-h-[560px] content-center">
            <div className="motion-orbit absolute left-2 top-10 hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl md:block">
              480 kcal Fırın Levrek
            </div>
            <div className="motion-orbit-reverse absolute bottom-8 right-4 hidden rounded-full border border-white/15 bg-rose-700/80 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl md:block">
              Alerjen görünür
            </div>

            <div className="grid grid-cols-[0.82fr_1.18fr] gap-4 sm:gap-5">
              <div className="grid gap-4 pt-12">
                <HeroPhoto frame={heroFrames[1]} className="aspect-[4/5] motion-float rounded-[28px]" />
                <div className="rounded-[28px] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
                  <Sparkles className="h-6 w-6 text-rose-200" />
                  <p className="mt-12 text-2xl font-black leading-tight text-white">Bilgi tasarımı tabakta başlar.</p>
                </div>
              </div>
              <div className="grid gap-4">
                <HeroPhoto frame={heroFrames[0]} className="aspect-[5/6] motion-float-delayed rounded-[34px]" priority />
                <HeroPhoto frame={heroFrames[2]} className="aspect-[16/10] rounded-[28px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#10100e]">
        <div className="nutrition-track flex gap-3 py-4 text-sm font-semibold text-zinc-200">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="shrink-0 rounded-full border border-white/10 bg-white/8 px-4 py-2">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-[#0b0b0a] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-normal text-white sm:text-5xl">Öne çıkan tabaklar</h2>
            <p className="mt-4 text-zinc-400">Şef önerisi, düşük kalori ve alerjen uyarısı tek bakışta ayrışır.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-6">
            {featuredItems.slice(0, 6).map((item, index) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setSelectedItem(item)}
                className={`group relative min-h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 text-left shadow-2xl transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                  index < 2 ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                <Image src={item.image} alt={`${item.name} sunumu`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-rose-700 px-3 py-1 text-xs font-bold text-white">{item.featured}</span>
                    <span className="text-sm font-black text-white">{item.calories} kcal</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black text-white">{item.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-200">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="relative bg-[#f2f0ec] py-12 text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[340px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[28px] border border-zinc-200 bg-white/90 p-4 shadow-[0_24px_80px_rgba(20,16,12,0.12)] backdrop-blur">
              <label htmlFor="menu-search" className="text-sm font-black text-zinc-950">
                Menüde ara
              </label>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-4 focus-within:ring-2 focus-within:ring-rose-800">
                <Search className="h-4 w-4 text-zinc-500" />
                <input
                  id="menu-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="köfte, süt, gluten, vegan"
                  className="h-12 w-full bg-transparent text-sm font-semibold outline-none placeholder:text-zinc-500"
                />
              </div>

              <div className="mt-6">
                <p className="text-sm font-black text-zinc-950">Kategoriler</p>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible">
                  {["Tümü", ...categories].map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category as Category | "Tümü")}
                      className={`shrink-0 rounded-full px-4 py-2 text-left text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-rose-800 ${
                        selectedCategory === category ? "bg-rose-800 text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-black text-zinc-950">Filtreler</p>
                <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {filters.map(({ label, icon: Icon }) => {
                    const active = activeFilters.includes(normalize(label));
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => toggleFilter(label)}
                        aria-pressed={active}
                        className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-rose-800 ${
                          active ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
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
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-4xl font-black tracking-normal">Menü vitrini</h2>
                <p className="mt-2 text-sm font-semibold text-zinc-600">
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
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 text-sm font-bold text-zinc-800 transition hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-800"
                >
                  <X className="h-4 w-4" />
                  Temizle
                </button>
              )}
            </div>

            {filteredItems.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-zinc-300 bg-white p-10 text-center">
                <AlertTriangle className="mx-auto h-8 w-8 text-rose-800" />
                <h3 className="mt-4 text-2xl font-black">Uygun ürün bulunamadı</h3>
                <p className="mt-2 text-zinc-600">Filtreleri azaltarak veya farklı bir arama yaparak tekrar deneyin.</p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item) => (
                  <article key={item.code} className="group overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(20,16,12,0.10)] transition hover:-translate-y-1">
                    <button type="button" onClick={() => setSelectedItem(item)} className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-800">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image src={item.image} alt={`${item.name} servis görseli`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 45vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-rose-900 backdrop-blur">{item.code}</div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-black text-rose-800">{item.accent}</p>
                            <h3 className="mt-1 text-2xl font-black leading-tight">{item.name}</h3>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-xl font-black text-rose-900">{item.price}</p>
                            <p className="text-xs font-bold text-zinc-500">{item.portion}</p>
                          </div>
                        </div>
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">{item.description}</p>
                        <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl bg-zinc-950 p-3 text-white">
                          <span className="text-sm font-bold text-zinc-300">Enerji</span>
                          <span className="text-2xl font-black">{item.calories} kcal</span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {(item.allergens.length ? item.allergens : ["ana alerjen yok"]).map((allergen) => (
                            <span key={allergen} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-950">
                              {allergen}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-rose-900">
                          Detayı aç
                          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </div>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="bilgilendirme" className="bg-[#070706] py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-4xl font-black tracking-normal">Şeffaflık protokolü</h2>
            <p className="mt-4 max-w-xl leading-7 text-zinc-400">
              QR menü, sipariş öncesi içerik, enerji ve alerjen bilgisini görünür kılmak için hazırlanmıştır.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Kalori değerleri porsiyon bazlıdır.",
              "İçerikler dönemsel tedarike göre güncellenebilir.",
              "Alerjiniz varsa sipariş öncesi personele bilgi verin."
            ].map((item) => (
              <div key={item} className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur">
                <Info className="h-5 w-5 text-rose-200" />
                <p className="mt-8 text-sm font-bold leading-6 text-zinc-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedItem && (
        <div role="dialog" aria-modal="true" aria-labelledby="product-title" className="fixed inset-0 z-50 flex items-end bg-black/75 p-0 backdrop-blur-md sm:items-center sm:p-6">
          <div className="mx-auto max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-t-[28px] bg-[#f4f1ec] text-zinc-950 shadow-2xl sm:rounded-[34px]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-[#f4f1ec]/95 p-5 backdrop-blur">
              <div>
                <p className="text-sm font-black text-rose-800">{selectedItem.code}</p>
                <h2 id="product-title" className="text-3xl font-black">{selectedItem.name}</h2>
              </div>
              <button type="button" onClick={() => setSelectedItem(null)} className="icon-button rounded-full" aria-label="Detay panelini kapat">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-6 p-5 md:grid-cols-[0.92fr_1.08fr] md:p-7">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                <Image src={selectedItem.image} alt={`${selectedItem.name} detay görseli`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
              <div>
                <div className="grid grid-cols-3 gap-3">
                  <Metric label="Kalori" value={`${selectedItem.calories} kcal`} />
                  <Metric label="Porsiyon" value={selectedItem.portion} />
                  <Metric label="Fiyat" value={selectedItem.price} />
                </div>

                <p className="mt-6 leading-7 text-zinc-700">{selectedItem.description}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <InfoBlock title="İçerik" items={selectedItem.ingredients} />
                  <InfoBlock title="Alerjenler" items={selectedItem.allergens.length ? selectedItem.allergens : ["Beyan edilen ana alerjen yok"]} />
                </div>

                <div className="mt-5 rounded-[24px] border border-rose-200 bg-white p-4">
                  <div className="flex items-center gap-2 font-black">
                    <AlertTriangle className="h-4 w-4 text-rose-800" />
                    Uyarı
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{selectedItem.warning}</p>
                </div>

                <div className="mt-6">
                  <h3 className="font-black">Besin değerleri</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {Object.entries(selectedItem.nutrition).map(([key, value]) => (
                      <Metric key={key} label={nutritionLabels[key as keyof Nutrition]} value={value} small />
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-950">
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

function HeroPhoto({ frame, className, priority }: { frame: { src: string; alt: string }; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden border border-white/12 shadow-2xl ${className || ""}`}>
      <Image src={frame.src} alt={frame.alt} fill priority={priority} sizes="(min-width: 1024px) 32vw, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
    </div>
  );
}

function Metric({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className={`rounded-2xl bg-white p-3 ${small ? "text-center" : ""}`}>
      <p className="text-xs font-bold text-zinc-500">{label}</p>
      <p className={`mt-1 font-black ${small ? "text-base" : "text-xl"}`}>{value}</p>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[24px] border border-zinc-200 bg-white p-4">
      <h3 className="font-black">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-bold text-zinc-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
