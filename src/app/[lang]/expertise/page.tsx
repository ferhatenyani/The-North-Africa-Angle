import type { Metadata } from "next";

import { CountryMap } from "@/components/country-map";
import { CtaBand } from "@/components/cta-band";
import { PlaceImage } from "@/components/place-image";
import { getDict, type Locale } from "@/lib/i18n";

const COUNTRY_SLOTS = ["country-dz", "country-ma", "country-tn", "country-ly", "country-mr"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).nav.expertise };
}

export default async function ExpertisePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);

  return (
    <>
      <section className="border-b border-hairline">
        <div className="container-page grid items-center gap-10 py-10 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="kicker text-cobalt">{t.expertise.hero.kicker}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink">
              {t.expertise.hero.title}
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">{t.expertise.hero.body}</p>
          </div>
          <figure className="-mx-5 sm:-mx-8 lg:mx-0 lg:border lg:border-hairline">
            <PlaceImage
              slot="expertise-hero"
              alt="Chefchaouen, Morocco"
              ratio="16 / 10"
              eager
              className="aspect-[16/10] w-full lg:aspect-auto lg:h-full"
            />
            <figcaption className="hidden border-t border-hairline bg-white px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted lg:block">
              Chefchaouen, Morocco
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-hairline bg-surface">
        <div className="container-page py-12 sm:py-16">
          <p className="kicker text-cobalt">{t.expertise.regional.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {t.expertise.regional.title}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.expertise.regional.countries.map((country, i) => (
              <div key={country.name} className="border border-hairline bg-white">
                <PlaceImage
                  slot={COUNTRY_SLOTS[i]}
                  alt={country.name}
                  ratio="4 / 3"
                  className="aspect-[4/3] w-full"
                />
                <div className="border-t border-hairline p-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {country.name}
                  </h3>
                  <p className="mt-1.5 font-mono text-[11px] uppercase leading-[1.8] tracking-wider text-ink-muted">
                    {country.themes.join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <CountryMap lang={lang} className="w-full border border-hairline" />
            <p className="font-serif text-lg leading-relaxed text-ink-muted">
              {t.home.regions.countries.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline">
        <div className="container-page py-16">
          <p className="kicker text-cobalt">{t.expertise.thematic.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {t.expertise.thematic.title}
          </h2>
          <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {t.expertise.thematic.items.map((item) => (
              <div key={item.title} className="border-t border-hairline py-6">
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page max-w-3xl py-16">
          <p className="kicker text-cobalt">{t.expertise.network.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {t.expertise.network.title}
          </h2>
          {t.expertise.network.paras.map((para) => (
            <p key={para.slice(0, 24)} className="mt-5 text-[15px] leading-relaxed text-ink-muted">
              {para}
            </p>
          ))}
        </div>
      </section>

      <CtaBand
        variant="cobalt"
        title={t.contact.experts.title}
        body={t.contact.experts.body}
        primary={{ href: `/${lang}/contact`, label: t.cta.getInTouch }}
      />
    </>
  );
}
