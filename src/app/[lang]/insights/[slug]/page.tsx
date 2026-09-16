import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/cta-band";
import { IconArrowLeft } from "@/components/icons";
import { PlaceImage } from "@/components/place-image";
import { Prose } from "@/components/prose";
import { formatDate, getArticle, sortedArticles } from "@/lib/articles";
import { articleImages } from "@/lib/images";
import { getDict, locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return sortedArticles().flatMap((article) =>
    locales.map((lang) => ({ lang, slug: article.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const a = article.locales[lang];
  return { title: a.title, description: a.dek };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const t = getDict(lang);
  const a = article.locales[lang];

  return (
    <>
      <article className="container-page max-w-[760px] py-14 lg:py-20">
        <Link
          href={`/${lang}/insights`}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
        >
          <IconArrowLeft width="14" height="14" />
          {t.article.backToInsights}
        </Link>

        <p className="kicker mt-8 text-cobalt">
          {t.article.analysis} / {a.region} · {a.topic}
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl">
          {a.title}
        </h1>
        <p className="mt-5 font-serif text-xl leading-relaxed text-ink-muted">{a.dek}</p>
        <p className="mt-6 border-b border-hairline pb-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
          {t.article.publishedOn} {formatDate(article.date, lang)} · {article.readMinutes}{" "}
          {t.article.minRead}
        </p>

        <div className="mt-6 border border-hairline">
          <PlaceImage
            slot={articleImages[slug] ?? "hero"}
            alt=""
            ratio="16 / 9"
            eager
            className="aspect-[16/9] w-full"
          />
        </div>

        <div className="mt-2">
          <Prose blocks={a.blocks} />
        </div>
      </article>

      <CtaBand
        variant="cobalt"
        title={t.home.closing.title}
        body={t.home.closing.body}
        primary={{ href: `/${lang}#contact`, label: t.cta.workWithUs }}
        secondary={{ href: site.substack, label: t.cta.readOnSubstack, external: true }}
      />
    </>
  );
}
