"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { getDict, locales, swapLocale, type Locale } from "@/lib/i18n";
import { IconMenu, IconX } from "./icons";

export function SiteHeader({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${lang}`, label: t.nav.home },
    { href: `/${lang}/about`, label: t.nav.about },
    { href: `/${lang}/services`, label: t.nav.services },
    { href: `/${lang}/expertise`, label: t.nav.expertise },
    { href: `/${lang}/insights`, label: t.nav.insights },
    { href: `/${lang}#contact`, label: t.nav.contact },
  ];

  function isActive(href: string): boolean {
    return href === `/${lang}` ? pathname === href : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-white">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href={`/${lang}`}
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label={t.meta.title}
        >
          <img
            src="/logo.jpg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full border border-hairline"
          />
          {/* Short name on phones, full wordmark from sm up — no truncation. */}
          <span className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink sm:hidden">
            NAA
          </span>
          <span className="hidden truncate font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink sm:inline sm:text-sm">
            The North Africa Angle
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-ink ${
                isActive(link.href) ? "font-medium text-cobalt" : "text-ink-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LangSwitcher lang={lang} pathname={pathname} />
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <LangSwitcher lang={lang} pathname={pathname} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="grid h-11 w-11 place-items-center border border-hairline text-ink"
          >
            {open ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-hairline bg-white lg:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-hairline/60 py-3.5 text-base last:border-0 ${
                  isActive(link.href) ? "font-medium text-cobalt" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function LangSwitcher({ lang, pathname }: { lang: Locale; pathname: string }) {
  return (
    <div className="font-mono text-xs tracking-widest" aria-label="Language">
      {locales.map((locale, i) => (
        <span key={locale}>
          {i > 0 ? <span className="mx-1.5 text-hairline">|</span> : null}
          <Link
            href={swapLocale(pathname, locale)}
            className={`px-1 py-2 ${locale === lang ? "font-medium text-cobalt" : "text-ink-muted hover:text-ink"}`}
            aria-current={locale === lang ? "true" : undefined}
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
