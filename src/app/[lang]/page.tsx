import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { ContactForm } from "@/components/contact-form";
import { CountryMap } from "@/components/country-map";
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

      {/* What we do — one DOM list: snap carousel on mobile, numbered index on desktop.
          Placed first so a visitor gets "what NAA does" in seconds. */}
      <section className="border-y border-hairline bg-surface">
        <div className="container-page py-12 sm:py-16">
          <p className="kicker text-cobalt">{t.home.services.kicker}</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink">
            {t.home.services.title}
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink">
            {t.home.services.lead}
          </p>

          <ul className="snap-row mt-8 pb-1 lg:mt-10 lg:block lg:border-t lg:border-hairline lg:pb-0">
            {t.services.items.map((service, i) => (
              <li
                key={service.title}
                className="w-[270px] border border-hairline bg-white lg:w-auto lg:border-0 lg:bg-transparent"
              >
                <Link
                  href={`/${lang}/services`}
                  className="group flex h-full flex-col p-5 lg:grid lg:grid-cols-[3.5rem_1fr_1.5rem] lg:items-baseline lg:gap-x-4 lg:gap-y-1 lg:border-b lg:border-hairline lg:p-0 lg:px-4 lg:py-5 lg:transition-colors lg:hover:bg-white"
                >
                  <span className="font-mono text-sm text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-ink lg:mt-0 lg:text-base">
                    {service.title}
                  </span>
                  <IconArrowRight className="mt-4 shrink-0 text-cobalt lg:mt-0 lg:h-4 lg:w-4 lg:self-center lg:justify-self-end lg:text-ink-muted lg:transition-transform lg:group-hover:translate-x-1" />
                  <span className="mt-2 text-sm leading-relaxed text-ink-muted lg:col-span-2 lg:col-start-2 lg:mt-0">
                    {service.intro.split(". ")[0]}.
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why NAA — four short reasons, right after what we do */}
      <section>
        <div className="container-page py-12 sm:py-16">
          <p className="kicker text-cobalt">{t.home.why.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {t.home.why.title}
          </h2>
          <div className="mt-10 grid gap-8 border-t border-hairline pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.why.items.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we work — map + country cards with images */}
      <section className="border-y border-hairline bg-surface">
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

      {/* Latest analysis — one DOM list: snap carousel on mobile, grid on desktop.
          The newsletter lives on as a quiet strip below it, not a full band. */}
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
              href={`/${lang}/insights`}
              className="inline-flex items-center gap-2 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
            >
              {t.nav.insights}
              <IconArrowRight />
            </Link>
          </div>

          <ul className="snap-row mt-8 pb-1 md:mt-10 md:grid md:grid-cols-3 md:gap-6 md:pb-0">
            {latest.map((article) => {
              const a = article.locales[lang];
              return (
                <li key={article.slug} className="w-[290px] md:w-auto">
                  <ArticleCard
                    href={`/${lang}/insights/${article.slug}`}
                    kicker={`${t.article.analysis} / ${a.region}`}
                    title={a.title}
                    dek={a.dek}
                    meta={`${formatDate(article.date, lang)} · ${article.readMinutes} ${t.article.minRead}`}
                    image={articleImages[article.slug]}
                  />
                </li>
              );
            })}
          </ul>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-hairline pt-6">
            <p className="max-w-xl text-sm leading-relaxed text-ink-muted">
              <span className="kicker mr-3 text-cobalt">{t.home.weekly.kicker}</span>
              {t.home.weekly.short}
            </p>
            <a
              href={site.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-cobalt underline-offset-4 hover:underline"
            >
              {t.cta.subscribe}
              <IconArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Work with us — the two NAA activities side by side.
          NAA Intelligence (paid mandates) gets the dark, dominant card;
          NAA Insights (free publication) stays secondary on purpose. */}
      <section className="border-t border-hairline bg-surface">
        <div className="container-page py-12 sm:py-16">
          <p className="kicker text-cobalt">{t.home.work.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {t.home.work.title}
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="flex flex-col border border-hairline bg-white p-6 sm:p-8">
              <p className="kicker text-cobalt">{t.home.work.insights.label}</p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
                {t.home.work.insights.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {t.home.work.insights.body}
              </p>
              <Link
                href={`/${lang}/insights`}
                className="mt-6 inline-flex items-center gap-2 self-start border border-ink/25 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                {t.home.work.insights.cta}
                <IconArrowRight />
              </Link>
            </div>
            <div className="flex flex-col bg-ink p-6 text-white sm:p-8">
              <p className="kicker text-white/50">{t.home.work.intelligence.label}</p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                {t.home.work.intelligence.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {t.home.work.intelligence.body}
              </p>
              <Link
                href={`/${lang}#contact`}
                className="mt-6 inline-flex items-center gap-2 self-start bg-cobalt px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cobalt-dark"
              >
                {t.home.work.intelligence.cta}
                <IconArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are — short human anchor near the bottom, links to the team on /about */}
      <section className="border-t border-hairline">
        <div className="container-page grid gap-6 py-12 sm:py-16 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end">
          <div>
            <p className="kicker text-cobalt">{t.home.aboutTeaser.kicker}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {t.home.aboutTeaser.title}
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              {t.home.aboutTeaser.body}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Link
              href={`/${lang}/about#team`}
              className="inline-flex items-center gap-2 border border-ink/25 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              {t.home.aboutTeaser.linkLabel}
              <IconArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact — email form + WhatsApp, right before the footer.
          Target of every "Contact" / "Work with us" CTA site-wide (/#contact).
          Mobile-first: context, what to tell us, WhatsApp, expert network, then the form. */}
      <section id="contact" className="scroll-mt-16 border-t border-hairline bg-surface">
        <div className="container-page grid gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <p className="kicker text-cobalt">{t.contact.hero.kicker}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink">
              {t.contact.hero.title}
            </h2>
            <p className="mt-4 font-serif text-xl leading-snug text-ink">{t.contact.hero.lead}</p>
            {site.whatsapp ? (
              <a
                href={homeWa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 bg-whatsapp px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-whatsapp-dark"
              >
                <IconWhatsApp width="18" height="18" />
                {t.cta.chatOnWhatsApp}
              </a>
            ) : null}

            {/* Project enquiries — mirrors the form fields */}
            <div className="mt-10">
              <p className="kicker text-cobalt">{t.contact.project.kicker}</p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                {t.contact.project.title}
              </h3>
              <ol className="mt-4 border-t border-hairline">
                {t.contact.project.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-4 border-b border-hairline py-2.5 text-sm text-ink"
                  >
                    <span className="font-mono text-xs text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t.contact.project.note}</p>
            </div>

            {/* Expert enquiries — dedicated page with the application form */}
            <div className="mt-10 border-t-2 border-ink pt-8">
              <p className="kicker text-cobalt">{t.contact.experts.kicker}</p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
                {t.contact.experts.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t.contact.experts.body}</p>
              <Link
                href={`/${lang}/experts`}
                className="mt-5 inline-flex items-center gap-2 border border-ink/25 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                {t.contact.experts.ctaLabel}
                <IconArrowRight />
              </Link>
            </div>
          </div>
          <ContactForm t={t.forms} waHref={homeWa} />
        </div>
      </section>
    </>
  );
}
