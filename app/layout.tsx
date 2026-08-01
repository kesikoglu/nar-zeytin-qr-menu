import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Color Palette Generator - Create Beautiful Color Combinations",
    template: "%s | Color Palette Generator"
  },
  description: "Generate, customize, save, and export beautiful color palettes for websites, branding, presentations, and creative projects.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Color Palette Generator",
    description: "Create beautiful color combinations in seconds.",
    url: "/",
    siteName: "Color Palette Generator",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Palette Generator",
    description: "Generate, customize, save, and export beautiful palettes."
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans text-slate-900 antialiased dark:text-slate-100">
        <ToastProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
