import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { notFound } from "next/navigation";

import { HashScroll } from "@/components/hash-scroll";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { getDict, isLocale, locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

import "../globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    title: {
      default: t.meta.title,
      template: `%s · ${site.name}`,
    },
    description: t.meta.description,
    icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
    openGraph: {
      siteName: site.name,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: "/logo.jpg", width: 1080, height: 1080, alt: site.name }],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang as Locale);

  return (
    <html
      lang={lang}
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} ${sourceSerif.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          {t.cta.skipToContent}
        </a>
        <SiteHeader lang={lang as Locale} />
        <HashScroll />
        <main id="main">{children}</main>
        <div aria-hidden className="h-[3.6rem] sm:hidden" />
        <SiteFooter lang={lang as Locale} />
        <WhatsAppFab lang={lang as Locale} />
        <MobileCtaBar lang={lang as Locale} />
      </body>
    </html>
  );
}
