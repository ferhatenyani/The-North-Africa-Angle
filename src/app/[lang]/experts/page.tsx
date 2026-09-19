import type { Metadata } from "next";

import { ExpertForm } from "@/components/expert-form";
import { IconWhatsApp } from "@/components/icons";
import { getDict, type Locale } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";

const EXPERT_WA_MESSAGE: Record<Locale, string> = {
  en: "Hello, I am a researcher / analyst specialised in North Africa and interested in joining the NAA expert network.",
  fr: "Bonjour, je suis chercheur / analyste spécialiste de l'Afrique du Nord et je souhaite rejoindre le réseau d'experts de NAA.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).nav.experts };
}

export default async function ExpertsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);

  return (
    <>
      <section className="border-b border-hairline bg-surface">
        <div className="container-page max-w-3xl py-16 lg:py-20">
          <p className="kicker text-cobalt">{t.expertNetwork.hero.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink">
            {t.expertNetwork.hero.title}
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">{t.expertNetwork.hero.body}</p>
        </div>
      </section>

      <section>
        <div className="container-page grid gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            {/* Who we look for */}
            <p className="kicker text-cobalt">{t.expertNetwork.who.kicker}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
              {t.expertNetwork.who.title}
            </h2>
            <ul className="mt-6 border-t border-hairline">
              {t.expertNetwork.who.items.map((item, i) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b border-hairline py-3 text-sm leading-relaxed text-ink"
                >
                  <span className="font-mono text-xs text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* How it works */}
            <div className="mt-12">
              <p className="kicker text-cobalt">{t.expertNetwork.how.kicker}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                {t.expertNetwork.how.title}
              </h2>
              <ol className="mt-6 space-y-6 border-t border-hairline pt-6">
                {t.expertNetwork.how.steps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[3rem_1fr] items-baseline gap-x-2">
                    <span className="font-mono text-sm text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Direct channels, next to the form */}
            <div className="mt-12 border-t-2 border-ink pt-6">
              <p className="text-sm leading-relaxed text-ink-muted">{t.contact.hero.lead}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="border border-ink/25 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  {site.email}
                </a>
                {site.whatsapp ? (
                  <a
                    href={waLink(EXPERT_WA_MESSAGE[lang])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-ink/25 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                  >
                    <IconWhatsApp width="18" height="18" className="text-whatsapp" />
                    {t.cta.chatOnWhatsApp}
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="lg:pl-6">
            <ExpertForm t={t.expertForm} />
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              {t.contact.experts.body}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
