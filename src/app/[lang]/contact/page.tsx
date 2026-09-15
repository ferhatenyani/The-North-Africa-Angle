import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { IconMail, IconSubstack, IconWhatsApp } from "@/components/icons";
import { getDict, type Locale } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";

const EXPERT_MESSAGE: Record<Locale, string> = {
  en: "Hello, I am a researcher / analyst specialised in North Africa and interested in joining the NAA expert network.",
  fr: "Bonjour, je suis chercheur / analyste spécialiste de l'Afrique du Nord et je souhaite rejoindre le réseau d'experts de NAA.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).nav.contact };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);

  const formWa = waLink(
    lang === "fr"
      ? "Bonjour, je souhaite discuter d'un projet sur l'Afrique du Nord."
      : "Hello, I'd like to discuss a project on North Africa.",
  );
  const expertWa = waLink(EXPERT_MESSAGE[lang]);

  return (
    <>
      <section className="border-b border-hairline bg-surface">
        <div className="container-page max-w-3xl py-16 lg:py-20">
          <p className="kicker text-cobalt">{t.contact.hero.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink">
            {t.contact.hero.title}
          </h1>
          <p className="mt-6 font-serif text-xl leading-snug text-ink">{t.contact.hero.lead}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{t.contact.hero.body}</p>
        </div>
      </section>

      <section>
        <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-16">
          <div>
            {/* Project enquiries */}
            <div>
              <p className="kicker text-cobalt">{t.contact.project.kicker}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                {t.contact.project.title}
              </h2>
              <ol className="mt-6 border-t border-hairline">
                {t.contact.project.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-4 border-b border-hairline py-3 text-sm text-ink"
                  >
                    <span className="font-mono text-xs text-cobalt">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t.contact.project.note}</p>
            </div>

            {/* Expert enquiries */}
            <div className="mt-12 border-t-2 border-ink pt-8">
              <p className="kicker text-cobalt">{t.contact.experts.kicker}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                {t.contact.experts.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {t.contact.experts.body}
              </p>
              {site.whatsapp ? (
                <a
                  href={expertWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 border border-ink/25 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <IconWhatsApp width="18" height="18" className="text-whatsapp" />
                  {t.cta.getInTouch}
                </a>
              ) : null}
            </div>

            {/* Direct channels */}
            <div className="mt-12 border-t-2 border-ink pt-8">
              <p className="kicker text-cobalt">{t.contact.direct.kicker}</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2.5 text-ink transition-colors hover:text-cobalt"
                  >
                    <IconMail className="text-ink-muted" />
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.substack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-ink transition-colors hover:text-cobalt"
                  >
                    <IconSubstack className="text-ink-muted" />
                    {t.contact.direct.substackLabel} — {site.name}
                  </a>
                </li>
                {site.whatsapp ? (
                  <li>
                    <a
                      href={formWa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-ink transition-colors hover:text-cobalt"
                    >
                      <IconWhatsApp width="18" height="18" className="text-whatsapp" />
                      {t.contact.direct.whatsappLabel}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          <div>
            <ContactForm t={t.forms} waHref={formWa} />
          </div>
        </div>
      </section>
    </>
  );
}
