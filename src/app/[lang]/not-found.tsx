"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getDict, type Locale } from "@/lib/i18n";

/** Rendered inside [lang]/layout — derive the locale from the pathname. */
export default function NotFound() {
  const pathname = usePathname() ?? "";
  const lang: Locale = pathname.startsWith("/fr") ? "fr" : "en";
  const t = getDict(lang);

  return (
    <section className="border-b border-hairline">
      <div className="container-page max-w-2xl py-24 text-center">
        <p className="kicker text-cobalt">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">
          {t.notFound.title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t.notFound.body}</p>
        <Link
          href={`/${lang}`}
          className="mt-8 inline-block bg-cobalt px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cobalt-dark"
        >
          {t.cta.backHome}
        </Link>
      </div>
    </section>
  );
}
