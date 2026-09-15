# The North Africa Angle — Showcase Site

Bilingual (EN default / FR) showcase website for **The North Africa Angle**, built with
Next.js 16, TypeScript and Tailwind CSS v4. Design system and full plan: see `../PLAN.md`.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Contact-form delivery. Create a free key at [web3forms.com](https://web3forms.com) with the client's professional mailbox. Without it the form shows a graceful "not configured" message. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Enables the floating WhatsApp button, the mobile action bar's WhatsApp link and the footer entry. Format: `+213XXXXXXXXX`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by `sitemap.ts` / `robots.ts` once the domain is live. |

## Images

All photos live in `public/images/` and are wired through `src/lib/images.ts`.
**To replace an image: drop a new file with the same name — no code change needed.**
If a file is missing, `PlaceImage` renders a flat placeholder labelled with the expected filename.

| Slot | Where it appears | Current photo |
|---|---|---|
| `hero.jpg` | Home hero | Camel caravan, Grand Erg |
| `expertise-hero.jpg` | Expertise hero | Chefchaouen |
| `country-dz.jpg` / `country-ma.jpg` / `country-tn.jpg` / `country-ly.jpg` / `country-mr.jpg` | Home regional cards + Expertise country grid | Notre-Dame d'Afrique / Hassan II Mosque / El Jem / Sabratha / Chinguetti manuscripts |
| `about-1.jpg` | About page band | Marrakech lantern souk |
| `article-gas.jpg` / `article-water.jpg` / `article-sahel.jpg` | Insight cards + article headers | Noor III solar tower / Lac Bab Louta / desert caravan |

Licenses and authors: see `ATTRIBUTION.md`. All current photos are freely licensed
(Wikimedia Commons) — replaceable by the client's own photography at any time.

## Map

`src/components/country-map.tsx` renders real cartography: geometry generated from
**Natural Earth 50m** data (Lambert conic conformal projection) into `src/lib/map-data.ts`.
To regenerate: `node scripts/generate-map.mjs` (needs network). Western Sahara is drawn as
unlabeled land with no internal border — a deliberately neutral treatment.

## Editing content

- **All page copy** lives in the dictionaries: `src/lib/dictionaries/en.ts` (source of truth, shape
  defined here) and `fr.ts` (typed against it — a missing key fails the build).
- **Insights articles** are seed samples in `src/lib/articles.ts` (each article has EN + FR versions).
  Their images are mapped by slug in `src/lib/images.ts` → `articleImages`.
- **Contact channels** (email placeholder, Substack, socials, WhatsApp): `src/lib/site.ts`.
- **Design tokens** (colors, font stacks): `src/app/globals.css` `@theme` block.

## Logo

`public/logo.jpg` is used in the header, footer, favicon and Open Graph image
(`src/app/[lang]/layout.tsx` metadata). Replace the file to update everywhere.

## Routing

`/` redirects to `/en`; every page exists under `/en/...` and `/fr/...`
(`middleware.ts` funnels unknown paths to the default locale). Pages are fully static (SSG),
including `sitemap.xml` and `robots.txt`.

## Mobile behaviour

- Bottom action bar ("Work with us" + WhatsApp) on phones; WhatsApp FAB floats above it.
- Services, country cards and article cards become swipeable snap carousels under `lg`.
- Hero images break out full-bleed on phones; header shows the short "NAA" mark.

## Pending from the client (see PLAN.md §7)

1. WhatsApp number → `.env.local`
2. Professional mailbox → Web3Forms key → `.env.local`
3. FR copy proofread (drafted from the EN source in the Architecture doc)
4. Domain + deployment (works out of the box on Vercel/Netlify; set `NEXT_PUBLIC_SITE_URL` after)
