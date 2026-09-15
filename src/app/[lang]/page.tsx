import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { ContactForm } from "@/components/contact-form";
import { CountryMap } from "@/components/country-map";
import { CtaBand } from "@/components/cta-band";
import { IconArrowRight, IconWhatsApp } from "@/components/icons";
import { PlaceImage } from "@/components/place-image";
import { formatDate, sortedArticles } from "@/lib/articles";
import { articleImages } from "@/lib/images";
import { getDict, type Locale } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";

const COUNTRY_SLOTS = ["country-dz", "country-ma", "country-tn", "country-ly", "country-mr"] as const;

const HOME_WA_MESSAGE: Record<Locale, string> = {
  en: "Hello, I'd like to discuss a project on North Africa.",
  fr: "Bonjour, je souhaite discuter d'un projet sur l'Afrique du Nord.",
};

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  const latest = sortedArticles().slice(0, 3);
  const homeWa = waLink(HOME_WA_MESSAGE[lang]);

  return (
    <>
      {/* Hero — text first, image breaks out full-bleed on mobile */}
      <section>
        <div className="container-page grid items-center gap-10 pt-10 sm:pt-14 lg:grid-cols-2 lg:gap-12 lg:pt-20">
          <div>
            <p className="kicker text-cobalt">{t.home.hero.kicker}</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-[44px]">
              {t.home.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">
              {t.home.hero.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 pb-10 sm:pb-0">
              <Link
                href={`/${lang}/services`}
                className="bg-cobalt px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cobalt-dark"
              >
                {t.cta.ourServices}
              </Link>
              <Link
                href={`/${lang}/insights`}
                className="border border-ink/25 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                {t.cta.exploreInsights}
              </Link>
            </div>
          </div>
          <figure className="-mx-5 sm:-mx-8 lg:mx-0 lg:border lg:border-hairline">
            <PlaceImage
              slot="hero"
              alt=""
              ratio="16 / 10"
              eager
              className="aspect-[16/10] w-full lg:aspect-auto lg:h-full"
            />
            <figcaption className="border-t border-hairline bg-white px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted lg:block">
              Grand Erg, North Africa
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Intro — beyond the headlines */}
      <section className="section-rule mt-12 sm:mt-16">
        <div className="container-page grid gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <p className="kicker text-cobalt">{t.home.intro.kicker}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink">
              {t.home.intro.title}
            </h2>
          </div>
          <div>
            <p className="font-serif text-xl leading-relaxed text-ink">{t.home.intro.paras[0]}</p>
            {t.home.intro.paras.slice(1).map((para) => (
              <p key={para.slice(0, 24)} className="mt-5 text-[15px] leading-relaxed text-ink-muted">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What we do — swipeable on mobile, index rows on desktop */}
      <section className="border-y border-hairline bg-surface">
        <div className="container-page py-12 sm:py-16">
          <p className="kicker text-cobalt">{t.home.services.kicker}</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink">
            {t.home.services.title}
          </h2>

          {/* Mobile: snap carousel */}
          <div className="snap-row mt-8 lg:hidden">
            {t.services.items.map((service, i) => (
              <Link
                key={service.title}
                href={`/${lang}/services`}
                className="flex w-[270px] flex-col border border-hairline bg-white p-5"
              >
                <span className="font-mono text-sm text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                  {service.title}
                </span>
                <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                  {service.intro}
                </span>
                <IconArrowRight className="mt-4 text-cobalt" />
              </Link>
            ))}
          </div>

          {/* Desktop: numbered index */}
          <div className="mt-10 hidden border-t border-hairline lg:block">
            {t.services.items.map((service, i) => (
              <Link
                key={service.title}
                href={`/${lang}/services`}
                className="group grid grid-cols-[3.5rem_1fr_1.5rem] items-baseline gap-x-4 gap-y-1 border-b border-hairline py-5 transition-colors hover:bg-white sm:px-4"
              >
                <span className="font-mono text-sm text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-base font-semibold tracking-tight text-ink">
                  {service.title}
                </span>
                <IconArrowRight className="h-4 w-4 self-center justify-self-end text-ink-muted transition-transform group-hover:translate-x-1" />
                <span className="col-span-2 col-start-2 text-sm leading-relaxed text-ink-muted">
                  {service.intro.split(". ")[0]}.
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Regional focus — map + country cards with images */}
      <section>
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="kicker text-cobalt">{t.home.regions.kicker}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
                {t.home.regions.title}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">{t.home.regions.body}</p>
              <p className="mt-8 font-display text-xl font-medium leading-relaxed text-ink">
                {t.home.regions.countries.join(" · ")}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">{t.home.regions.note}</p>
              <Link
                href={`/${lang}/expertise`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
              >
                {t.home.regions.linkLabel}
                <IconArrowRight />
              </Link>
              <CountryMap lang={lang} className="mt-8 hidden w-full border border-hairline sm:block" />
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2">
              {t.expertise.regional.countries.map((country, i) => (
                <Link
                  key={country.name}
                  href={`/${lang}/expertise`}
                  className="group block border border-hairline bg-white transition-colors hover:border-ink"
                >
                  <PlaceImage
                    slot={COUNTRY_SLOTS[i]}
                    alt={country.name}
                    ratio="4 / 3"
                    className="aspect-[4/3] w-full"
                  />
                  <div className="p-4">
                    <p className="font-display text-base font-semibold tracking-tight text-ink">
                      {country.name}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-ink-muted">
                      {country.themes.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                </Link>
              ))}
              <Link
                href={`/${lang}/expertise`}
                className="group flex items-center justify-between gap-3 bg-ink p-5 text-white transition-colors hover:bg-cobalt"
              >
                <span className="text-sm font-medium">{t.home.regions.linkLabel}</span>
                <IconArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <CountryMap lang={lang} className="w-full border border-hairline sm:hidden" />
          </div>
        </div>
      </section>

      {/* Weekly update — subscriptions happen on Substack (external) */}
      <CtaBand
        variant="cobalt"
        kicker={t.home.weekly.kicker}
        title={t.home.weekly.title}
        body={t.home.weekly.body}
        primary={{ href: site.substack, label: t.cta.subscribe, external: true }}
        secondary={{ href: `/${lang}/insights`, label: t.cta.exploreInsights }}
      />

      {/* Featured analysis — thumbnails, swipeable on mobile */}
      <section>
        <div className="container-page py-12 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker text-cobalt">{t.insights.featured.kicker}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
                {t.insights.featured.title}
              </h2>
            </div>
            <Link
              href={site.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
            >
              {t.cta.readOnSubstack}
              <IconArrowRight />
            </Link>
          </div>

          {/* Mobile: snap carousel */}
          <div className="snap-row mt-8 md:hidden">
            {latest.map((article) => {
              const a = article.locales[lang];
              return (
                <div key={article.slug} className="w-[290px]">
                  <ArticleCard
                    href={`/${lang}/insights/${article.slug}`}
                    kicker={`${t.article.analysis} / ${a.region}`}
                    title={a.title}
                    dek={a.dek}
                    meta={`${formatDate(article.date, lang)} · ${article.readMinutes} ${t.article.minRead}`}
                    image={articleImages[article.slug]}
                  />
                </div>
              );
            })}
          </div>

          {/* Desktop: grid */}
          <div className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
            {latest.map((article) => {
              const a = article.locales[lang];
              return (
                <ArticleCard
                  key={article.slug}
                  href={`/${lang}/insights/${article.slug}`}
                  kicker={`${t.article.analysis} / ${a.region}`}
                  title={a.title}
                  dek={a.dek}
                  meta={`${formatDate(article.date, lang)} · ${article.readMinutes} ${t.article.minRead}`}
                  image={articleImages[article.slug]}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing */}
      <CtaBand
        kicker={t.home.closing.kicker}
        title={t.home.closing.title}
        body={t.home.closing.body}
        primary={{ href: `/${lang}/contact`, label: t.cta.workWithUs }}
      />
      <section className="bg-surface">
        <div className="container-page py-10">
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            {t.home.closing.tagline}
          </p>
        </div>
      </section>

      {/* Contact — email form + WhatsApp, right before the footer.
          Mobile-first: context, WhatsApp, then the form. */}
      <section className="border-t border-hairline bg-surface">
        <div className="container-page grid gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <p className="kicker text-cobalt">{t.contact.hero.kicker}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink">
              {t.contact.hero.title}
            </h2>
            <p className="mt-4 font-serif text-xl leading-snug text-ink">{t.contact.hero.lead}</p>
            {site.whatsapp ? (
              <a
                href={waLink(
                  lang === "fr"
                    ? "Bonjour, je souhaite discuter d'un projet sur l'Afrique du Nord."
                    : "Hello, I'd like to discuss a project on North Africa.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 bg-whatsapp px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-whatsapp-dark"
              >
                <IconWhatsApp width="18" height="18" />
                {t.cta.chatOnWhatsApp}
              </a>
            ) : null}
          </div>
          <ContactForm t={t.forms} waHref={homeWa} />
        </div>
      </section>
    </>
  );
}
