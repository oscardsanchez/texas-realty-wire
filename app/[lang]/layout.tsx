import type { Metadata } from "next";
import { Source_Serif_4, Inter, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LANGS, getDict } from "@/lib/i18n";
import { parseLang } from "@/lib/lang-param";
import "../globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://texasrealtywire.com";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = parseLang(params.lang);
  const t = getDict(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.siteTitle,
      template: "%s — Texas Realty Wire",
    },
    description: t.siteDescription,
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      siteName: "Texas Realty Wire",
    },
    // El sitio ya ofrece ambos idiomas con el botón EN | ES: se desactiva la traducción
    // automática del navegador para que no revierta el idioma elegido ni traduzca el nombre
    // de la marca o los nombres propios.
    other: { google: "notranslate" },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = parseLang(params.lang);

  return (
    <html lang={lang} translate="no" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
