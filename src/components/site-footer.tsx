import Link from "next/link";

import { getDict, locales, swapLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { IconLinkedIn, IconInstagram, IconSubstack, IconWhatsApp, IconXSocial } from "./icons";

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const year = new Date().getFullYear();

  const explore = [
    { href: `/${lang}/about`, label: t.nav.about },
    { href: `/${lang}/services`, label: t.nav.services },
    { href: `/${lang}/expertise`, label: t.nav.expertise },
    { href: `/${lang}/insights`, label: t.nav.insights },
    { href: `/${lang}#contact`, label: t.nav.contact },
  ];

  const socials = [
    { href: site.substack, label: "Substack", Icon: IconSubstack },
    { href: site.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
    { href: site.instagram, label: "Instagram", Icon: IconInstagram },
    { href: site.x, label: "X", Icon: IconXSocial },
  ];

  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full border border-white/20 bg-white p-0.5"
            />
            <p className="font-display text-sm font-semibold uppercase tracking-[0.14em]">
              The North Africa Angle
            </p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t.footer.blurb}</p>
          <div className="mt-5 flex items-center gap-3">
            {socials.map(({ href, label, Icon }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:text-white"
                >
                  <Icon />
                </a>
              ) : (
                <span
                  key={label}
                  title={t.footer.pendingSocial}
                  aria-label={`${label} — ${t.footer.pendingSocial}`}
                  className="grid h-9 w-9 place-items-center border border-white/10 text-white/25"
                >
                  <Icon />
                </span>
              ),
            )}
          </div>
        </div>

        <div>
          <p className="kicker text-white/50">{t.footer.explore}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {explore.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/80 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker text-white/50">{t.footer.coverage}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            {t.insights.coverage.items.map((item) => (
              <li key={item.title}>{item.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker text-white/50">{t.footer.contact}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.substack} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                Substack
              </a>
            </li>
            {site.whatsapp ? (
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
          <p className="kicker mt-6 text-white/50">{t.footer.follow}</p>
          <a
            href={site.substack}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block border border-white/30 px-4 py-2 text-sm text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
          >
            {t.cta.subscribe}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/40">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <div className="font-mono tracking-widest">
            {locales.map((locale, i) => (
              <span key={locale}>
                {i > 0 ? <span className="mx-1.5 text-white/20">|</span> : null}
                <Link
                  href={swapLocale(`/`, locale)}
                  className={locale === lang ? "text-white/80" : "hover:text-white/70"}
                >
                  {locale.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
