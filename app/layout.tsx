import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nar & Zeytin QR Menü - İçerik, Kalori ve Alerjen Bilgisi",
    template: "%s | Nar & Zeytin"
  },
  description: "Modern Türk restoranı Nar & Zeytin için içerik, kalori, porsiyon ve alerjen bilgilerini gösteren QR menü.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Nar & Zeytin QR Menü",
    description: "Sipariş öncesi içerik, kalori ve alerjen bilgilerini inceleyin.",
    url: "/",
    siteName: "Nar & Zeytin",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nar & Zeytin QR Menü",
    description: "Modern Türk restoranı için şeffaf QR menü."
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
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
