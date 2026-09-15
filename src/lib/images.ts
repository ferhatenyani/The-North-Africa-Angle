/**
 * Image slots — local files under /public/images (WebP).
 * Swap a file with the same name and the site updates (no code change);
 * if a file is missing, PlaceImage renders a flat placeholder instead.
 * Each slot also has an -800.webp variant served to small screens via srcset.
 * Licenses: see site/ATTRIBUTION.md.
 */
export const images = {
  hero: "/images/hero.webp", // camel caravan on dunes — home hero
  "expertise-hero": "/images/expertise-hero.webp", // Chefchaouen blue alley — expertise hero
  "about-1": "/images/about-1.webp", // Marrakech lantern souk — about page band
  "country-dz": "/images/country-dz.webp", // Notre-Dame d'Afrique, Algiers
  "country-dz-2": "/images/country-dz-2.webp", // Ghardaia square (bonus)
  "country-ma": "/images/country-ma.webp", // Hassan II Mosque, Casablanca
  "country-tn": "/images/country-tn.webp", // El Jem amphitheatre
  "country-ly": "/images/country-ly.webp", // Sabratha theatre
  "country-mr": "/images/country-mr.webp", // Chinguetti manuscripts
  "article-gas": "/images/article-gas.webp", // Noor III solar tower
  "article-water": "/images/article-water.webp", // Lac Bab Louta reservoir
  "article-sahel": "/images/article-sahel.webp", // camel train
} as const;

export type ImageSlot = keyof typeof images;

/** Which image belongs to which Insight article (by slug). */
export const articleImages: Record<string, ImageSlot> = {
  "algeria-gas-diplomacy": "article-gas",
  "morocco-water-governance": "article-water",
  "sahel-realignment-maghreb": "article-sahel",
};

/** Responsive candidate list: 800w for phones, full 1600w otherwise. */
export function imageSrcSet(slot: ImageSlot): string {
  const full = images[slot];
  return `${full.replace(".webp", "-800.webp")} 800w, ${full} 1600w`;
}
