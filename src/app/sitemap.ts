import type { MetadataRoute } from "next";

import { sortedArticles } from "@/lib/articles";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

const PAGES = ["", "/about", "/services", "/expertise", "/insights"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const page of PAGES) {
      entries.push({
        url: `${site.url}/${lang}${page}`,
        changeFrequency: page === "" || page === "/insights" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.7,
      });
    }
    for (const article of sortedArticles()) {
      entries.push({
        url: `${site.url}/${lang}/insights/${article.slug}`,
        lastModified: new Date(article.date),
        priority: 0.6,
      });
    }
  }

  return entries;
}
