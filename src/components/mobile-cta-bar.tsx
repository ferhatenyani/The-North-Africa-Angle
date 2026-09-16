import Link from "next/link";

import { getDict, type Locale } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";
import { IconWhatsApp } from "./icons";

const MESSAGE: Record<Locale, string> = {
  en: "Hello, I'd like to discuss a project on North Africa.",
  fr: "Bonjour, je souhaite discuter d'un projet sur l'Afrique du Nord.",
};

/**
 * Mobile-only bottom action bar — one persistent conversion row
 * (Contact + WhatsApp) instead of stacked dead ends.
 */
export function MobileCtaBar({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-hairline bg-ink text-white sm:hidden">
      <Link
        href={`/${lang}#contact`}
        className="flex-1 py-3.5 text-center text-sm font-medium active:bg-cobalt"
      >
        {t.cta.workWithUs}
      </Link>
      {site.whatsapp ? (
        <a
          href={waLink(MESSAGE[lang])}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.cta.chatOnWhatsApp}
          className="flex items-center justify-center border-l border-white/15 px-6 active:bg-cobalt"
        >
          <IconWhatsApp width="20" height="20" className="text-whatsapp" />
        </a>
      ) : null}
    </div>
  );
}
