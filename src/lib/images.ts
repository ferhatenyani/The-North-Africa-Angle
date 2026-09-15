/**
 * Image slots — local files under /public/images.
 * Swap a file with the same name and the site updates (no code change);
 * if a file is missing, PlaceImage renders a flat placeholder instead.
 * Licenses: see site/ATTRIBUTION.md.
 */
export const images = {
  hero: "/images/hero.jpg", // camel caravan on dunes — home hero
  "expertise-hero": "/images/expertise-hero.jpg", // Chefchaouen blue alley — expertise hero
  "about-1": "/images/about-1.jpg", // Marrakech lantern souk — about page band
  "country-dz": "/images/country-dz.jpg", // Notre-Dame d'Afrique, Algiers
  "country-dz-2": "/images/country-dz-2.jpg", // Ghardaia square (bonus)
  "country-ma": "/images/country-ma.jpg", // Hassan II Mosque, Casablanca
  "country-tn": "/images/country-tn.jpg", // El Jem amphitheatre
  "country-ly": "/images/country-ly.jpg", // Sabratha theatre
  "country-mr": "/images/country-mr.jpg", // Chinguetti manuscripts
  "article-gas": "/images/article-gas.jpg", // Noor III solar tower
  "article-water": "/images/article-water.jpg", // Lac Bab Louta reservoir
  "article-sahel": "/images/article-sahel.jpg", // camel train
} as const;

export type ImageSlot = keyof typeof images;

/** Which image belongs to which Insight article (by slug). */
export const articleImages: Record<string, ImageSlot> = {
  "algeria-gas-diplomacy": "article-gas",
  "morocco-water-governance": "article-water",
  "sahel-realignment-maghreb": "article-sahel",
};
