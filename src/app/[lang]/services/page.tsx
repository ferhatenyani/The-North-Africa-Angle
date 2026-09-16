import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { getDict, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).nav.services };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);

  return (
    <>
      <section className="border-b border-hairline bg-surface">
        <div className="container-page max-w-3xl py-16 lg:py-20">
          <p className="kicker text-cobalt">{t.services.hero.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink">
            {t.services.hero.title}
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">{t.services.hero.body}</p>
        </div>
      </section>

      <section>
        <div className="container-page">
          {t.services.items.map((service, i) => (
            <div
              key={service.title}
              className="grid gap-6 border-b border-hairline py-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:py-14"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-sm text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-ink">
                  {service.title}
                </h2>
              </div>
              <div>
                <p className="max-w-2xl font-serif text-lg leading-relaxed text-ink">{service.intro}</p>
                <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-baseline gap-2.5 text-sm text-ink-muted"
                    >
                      <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 bg-cobalt" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                {service.for ? (
                  <p className="mt-6 font-mono text-xs uppercase leading-relaxed tracking-wider text-ink-muted">
                    {service.for}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        variant="cobalt"
        kicker={t.services.tailored.kicker}
        title={t.services.tailored.title}
        body={t.services.tailored.body}
        primary={{ href: `/${lang}#contact`, label: t.cta.discussProject }}
      />
    </>
  );
}
