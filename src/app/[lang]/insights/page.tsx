import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { CtaBand } from "@/components/cta-band";
import { IconArrowRight } from "@/components/icons";
import { formatDate, sortedArticles } from "@/lib/articles";
import { getDict, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).nav.insights };
}

export default async function InsightsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = getDict(lang);
  const list = sortedArticles();

  return (
    <>
      <section className="border-b border-hairline bg-surface">
        <div className="container-page max-w-3xl py-16 lg:py-20">
          <p className="kicker text-cobalt">{t.insights.hero.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink">
            {t.insights.hero.title}
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">{t.insights.hero.body}</p>
        </div>
      </section>

      {/* Featured analysis */}
      <section className="border-b border-hairline">
        <div className="container-page py-16">
          <p className="kicker text-cobalt">{t.insights.featured.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {t.insights.featured.title}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {list.map((article) => {
              const a = article.locales[lang];
              return (
                <ArticleCard
                  key={article.slug}
                  href={`/${lang}/insights/${article.slug}`}
                  kicker={`${t.article.analysis} / ${a.region}`}
                  title={a.title}
                  dek={a.dek}
                  meta={`${formatDate(article.date, lang)} · ${article.readMinutes} ${t.article.minRead}`}
                />
              );
            })}
          </div>
          <div className="mt-10">
            <a
              href={site.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-cobalt hover:underline underline-offset-4"
            >
              {t.cta.readOnSubstack}
              <IconArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Areas of coverage */}
      <section className="border-b border-hairline">
        <div className="container-page py-16">
          <p className="kicker text-cobalt">{t.insights.coverage.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {t.insights.coverage.title}
          </h2>
          <div className="mt-10 border-t border-hairline">
            {t.insights.coverage.items.map((item) => (
              <div
                key={item.title}
                className="grid gap-2 border-b border-hairline py-5 sm:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] sm:items-baseline sm:gap-6"
              >
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        variant="cobalt"
        kicker={t.insights.weekly.kicker}
        title={t.insights.weekly.title}
        body={t.insights.weekly.body}
        primary={{ href: site.substack, label: t.cta.subscribe, external: true }}
      />
    </>
  );
}
