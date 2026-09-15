import { getDict, type Locale } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";
import { IconWhatsApp } from "./icons";

const MESSAGE: Record<Locale, string> = {
  en: "Hello, I'd like to discuss a project on North Africa.",
  fr: "Bonjour, je souhaite discuter d'un projet sur l'Afrique du Nord.",
};

/** Floating WhatsApp button — present on every page. Hidden until a number is configured. */
export function WhatsAppFab({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  if (!site.whatsapp) return null;

  return (
    <a
      href={waLink(MESSAGE[lang])}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.cta.chatOnWhatsApp}
      className="fixed bottom-[4.75rem] right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-whatsapp text-white transition-colors hover:bg-whatsapp-dark sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <IconWhatsApp />
    </a>
  );
}
