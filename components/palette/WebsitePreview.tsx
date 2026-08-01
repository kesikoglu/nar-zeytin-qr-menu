"use client";

import { readableText } from "@/lib/color";

type WebsitePreviewProps = {
  colors: string[];
};

export function WebsitePreview({ colors }: WebsitePreviewProps) {
  const [primary, secondary, accent, surface, deep, extra] = fillColors(colors);
  const primaryText = readableText(primary);
  const secondaryText = readableText(secondary);
  const accentText = readableText(accent);
  const surfaceText = readableText(surface);
  const deepText = readableText(deep);

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900" aria-label="Website preview using selected palette">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Website Preview</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">See the selected palette applied to a sample SaaS landing page.</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Palette roles">
          {[
            ["Primary", primary],
            ["Secondary", secondary],
            ["Accent", accent],
            ["Surface", surface],
            ["Deep", deep]
          ].map(([label, color]) => (
            <span key={`${label}-${color}`} className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
              <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
        <div style={{ backgroundColor: surface, color: surfaceText }}>
          <header className="flex flex-col gap-3 border-b border-black/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold" style={{ backgroundColor: primary, color: primaryText }}>A</span>
              <span className="font-bold">Aurora Studio</span>
            </div>
            <nav className="flex flex-wrap gap-3 text-sm font-semibold opacity-80" aria-label="Sample website navigation">
              <span>Work</span>
              <span>Services</span>
              <span>Pricing</span>
            </nav>
          </header>

          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="px-5 py-8 sm:px-8 sm:py-10">
              <span className="inline-flex rounded-md px-3 py-1 text-sm font-bold" style={{ backgroundColor: secondary, color: secondaryText }}>Brand launch kit</span>
              <h3 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-normal sm:text-4xl">Build a polished launch page with confident color decisions.</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 opacity-80 sm:text-base">This preview maps your palette onto real interface parts: background, headline, call-to-action, badges, cards, charts, and form controls.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="rounded-md px-4 py-3 text-sm font-bold shadow-sm" style={{ backgroundColor: primary, color: primaryText }}>Start project</button>
                <button type="button" className="rounded-md border px-4 py-3 text-sm font-bold" style={{ borderColor: deep, color: surfaceText }}>View examples</button>
              </div>
            </section>

            <aside className="grid gap-4 p-5 sm:p-8" style={{ backgroundColor: deep, color: deepText }}>
              <div className="rounded-md p-4" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold opacity-80">Campaign score</span>
                  <span className="rounded-md px-2 py-1 text-xs font-bold" style={{ backgroundColor: accent, color: accentText }}>Live</span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-3/4 rounded-full" style={{ backgroundColor: secondary }} />
                </div>
                <p className="mt-4 text-3xl font-bold">74%</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[["Leads", "2.4k", primary], ["Revenue", "$18k", extra]].map(([label, value, color]) => (
                  <div key={label} className="rounded-md p-4" style={{ backgroundColor: color, color: readableText(color) }}>
                    <p className="text-xs font-bold uppercase opacity-75">{label}</p>
                    <p className="mt-2 text-2xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <section className="grid gap-4 border-t border-black/10 p-5 sm:grid-cols-3 sm:p-8">
            {[
              ["Strategy", "A focused positioning block for brand teams.", primary],
              ["Design", "Reusable sections with a strong visual system.", secondary],
              ["Launch", "Clear actions and readable conversion paths.", accent]
            ].map(([title, body, color]) => (
              <article key={title} className="rounded-md border border-black/10 bg-white/60 p-4 backdrop-blur dark:bg-black/20">
                <span className="block h-2 w-12 rounded-full" style={{ backgroundColor: color }} />
                <h4 className="mt-4 font-bold">{title}</h4>
                <p className="mt-2 text-sm leading-6 opacity-75">{body}</p>
              </article>
            ))}
          </section>
        </div>
      </div>
    </section>
  );
}

function fillColors(colors: string[]) {
  const fallback = ["#2563EB", "#38BDF8", "#F59E0B", "#F8FAFC", "#0F172A", "#22C55E"];
  return fallback.map((fallbackColor, index) => colors[index] ?? colors[index % colors.length] ?? fallbackColor);
}
