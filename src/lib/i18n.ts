import { en, type Dict } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";

export type { Dict };

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dict> = { en, fr };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDict(lang: Locale): Dict {
  return dictionaries[lang];
}

/** /en/about → /fr/about (used by the language switcher). */
export function swapLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0])) parts[0] = next;
  else parts.unshift(next);
  return `/${parts.join("/")}`;
}
