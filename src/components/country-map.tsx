import type { Locale } from "@/lib/i18n";
import { mapRegion, type MapLabelKey } from "@/lib/map-data";

const LABELS: Record<Locale, Record<MapLabelKey, string> & { sea: string; ocean: string }> = {
  en: {
    Algeria: "ALGERIA",
    Morocco: "MOROCCO",
    Tunisia: "TUNISIA",
    Libya: "LIBYA",
    Mauritania: "MAURITANIA",
    sea: "MEDITERRANEAN SEA",
    ocean: "ATLANTIC OCEAN",
  },
  fr: {
    Algeria: "ALGÉRIE",
    Morocco: "MAROC",
    Tunisia: "TUNISIE",
    Libya: "LIBYE",
    Mauritania: "MAURITANIE",
    sea: "MER MÉDITERRANÉE",
    ocean: "OCÉAN ATLANTIQUE",
  },
};

// Nudge some labels off the geometric centroid for readability.
const LABEL_OFFSET: Record<MapLabelKey, { dx: number; dy: number; size: number }> = {
  Algeria: { dx: 0, dy: 0, size: 13 },
  Morocco: { dx: -30, dy: 0, size: 13 },
  Tunisia: { dx: 22, dy: -28, size: 10 },
  Libya: { dx: 10, dy: 0, size: 13 },
  Mauritania: { dx: 0, dy: 30, size: 11 },
};

/**
 * Real-cartography line-art map of North Africa.
 * Geometry generated from Natural Earth 50m data (see scripts/generate-map.mjs);
 * Lambert conic conformal projection. Western Sahara: unlabeled land, no border.
 * Static — no animation, no gradients.
 */
export function CountryMap({ lang, className }: { lang: Locale; className?: string }) {
  const labels = LABELS[lang];

  return (
    <svg
      viewBox="0 0 760 560"
      role="img"
      aria-label={[labels.Algeria, labels.Morocco, labels.Tunisia, labels.Libya, labels.Mauritania].join(", ")}
      className={className}
    >
      <rect width="760" height="560" fill="#ffffff" />

      {/* Landmass (5 countries + Western Sahara as unlabeled land) */}
      <path d={mapRegion.land} fill="#f4f6f8" stroke="#0e1b2c" strokeWidth="1.1" strokeLinejoin="round" />
      {/* Internal borders between labeled countries */}
      <path d={mapRegion.borders} fill="none" stroke="#0e1b2c" strokeWidth="0.8" opacity="0.5" />

      {/* Country labels at projected centroids */}
      <g fill="#4a5a6e" fontFamily="var(--font-plex-mono), monospace" letterSpacing="2.5">
        {(Object.keys(LABEL_OFFSET) as MapLabelKey[]).map((key) => {
          const pos = mapRegion.labelPositions[key];
          const off = LABEL_OFFSET[key];
          return (
            <text
              key={key}
              x={pos.x + off.dx}
              y={pos.y + off.dy}
              fontSize={off.size}
              textAnchor="middle"
            >
              {labels[key]}
            </text>
          );
        })}
      </g>

      {/* Water + region context labels */}
      <g fill="#9aaab9" fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="3">
        <text x="230" y="20" textAnchor="middle">{labels.sea}</text>
        <text x="30" y="330" transform="rotate(-90 30 330)">{labels.ocean}</text>
        <text x="400" y="470" opacity="0.5">SAHARA</text>
      </g>
    </svg>
  );
}
