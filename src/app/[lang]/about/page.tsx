import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { PlaceImage } from "@/components/place-image";
import { getDict, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).nav.about };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);

  return (
    <>
      <section className="border-b border-hairline">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-20">
          <div>
            <p className="kicker text-cobalt">{t.about.hero.kicker}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink">
              {t.about.hero.title}
            </h1>
            <p className="mt-6 font-serif text-2xl leading-snug text-ink">{t.about.hero.lead}</p>
          </div>
          <div className="lg:pt-14">
            {t.about.hero.paras.map((para, i) => (
              <p
                key={para.slice(0, 24)}
                className={`leading-relaxed ${i === 0 ? "font-serif text-xl text-ink" : "mt-5 text-[15px] text-ink-muted"}`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed image band */}
      <figure className="lg:border-b lg:border-hairline">
        <PlaceImage
          slot="about-1"
          alt=""
          ratio="21 / 9"
          className="aspect-[16/9] w-full sm:aspect-[21/9]"
        />
        <figcaption className="container-page py-2.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted lg:px-0">
          Marrakech medina
        </figcaption>
      </figure>

      <section className="border-b border-hairline bg-surface">
        <div className="container-page py-16">
          <p className="kicker text-cobalt">{t.about.approach.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {t.about.approach.title}
          </h2>
          <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
            {t.about.approach.items.map((item) => (
              <div key={item.title} className="bg-white p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page max-w-3xl py-16">
          <p className="kicker text-cobalt">{t.about.why.kicker}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {t.about.why.title}
          </h2>
          <div className="mt-6 border-l-2 border-cobalt pl-6">
            {t.about.why.paras.map((para) => (
              <p key={para.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed text-ink-muted first:mt-0">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        variant="cobalt"
        title={t.home.closing.tagline}
        primary={{ href: `/${lang}/contact`, label: t.cta.workWithUs }}
        secondary={{ href: `/${lang}/services`, label: t.cta.ourServices }}
      />
    </>
  );
}
