import Script from "next/script";
import { PaletteGenerator } from "@/components/palette/PaletteGenerator";
import { AdPlaceholder } from "@/components/ui/AdPlaceholder";

const faq = [
  ["Is this color palette generator free?", "Yes. The core generator works without an account and stores favorites locally in your browser."],
  ["Can I export palettes for websites?", "Yes. Export CSS custom properties, SCSS variables, JSON, a plain HEX list, or a PNG image."],
  ["How are palettes generated?", "The tool uses color harmony modes such as analogous, complementary, triadic, tetradic, pastel, vibrant, dark, warm, and cool."],
  ["Does the contrast checker certify accessibility?", "No. It provides practical WCAG contrast guidance, not legal advice or formal certification."]
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Color Palette Generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return (
    <>
      <Script id="software-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-normal text-slate-950 dark:text-white sm:text-5xl">Create Beautiful Color Palettes in Seconds</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">Generate, customize, copy, and export color combinations for websites, brands, presentations, and creative projects.</p>
          </div>
          <PaletteGenerator />
        </section>

        <AdPlaceholder label="Optional ad area below the generator" />

        <section className="grid gap-4 md:grid-cols-3">
          {["Generate", "Customize", "Export"].map((title, index) => (
            <div key={title} className="rounded-md border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">0{index + 1}</span>
              <h2 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{index === 0 ? "Pick a mode or press spacebar for a fresh random color palette." : index === 1 ? "Lock, edit, add, remove, and reorder colors until the combination feels right." : "Copy color values or download CSS, SCSS, JSON, HEX, and PNG exports."}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Common Use Cases</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Website color combinations", "Brand color palette drafts", "Presentation themes", "Social media graphics", "Logo exploration", "HEX color generator for developers"].map((item) => (
                <div key={item} className="rounded-md border border-slate-200 bg-white p-4 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Recommended Tools</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Prepared slots for future design tool, font, template, stock asset, and website builder recommendations.</p>
          </div>
        </section>

        <AdPlaceholder label="Optional ad area between content sections" />

        <section>
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Frequently Asked Questions</h2>
          <div className="mt-4 grid gap-3">
            {faq.map(([question, answer]) => (
              <details key={question} className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <summary className="cursor-pointer font-semibold text-slate-950 dark:text-white">{question}</summary>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
