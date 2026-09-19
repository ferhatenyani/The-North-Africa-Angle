# The North Africa Angle — Showcase Site

Bilingual (EN default / FR) showcase website for **The North Africa Angle**, built with
Next.js 16, TypeScript and Tailwind CSS v4. Design system and full plan: see `../PLAN.md`.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

## Deployment (Vercel)

The site deploys on **Vercel** with zero config: Next.js 16 is auto-detected and pnpm is picked
up from the `packageManager` field. `middleware.ts` (locale redirect) and the `next.config.ts`
redirects work as-is — there is no Netlify config anymore.

1. Push this repo to GitHub/GitLab, then import it in Vercel ("Add New → Project").
2. Add the environment variables below in **Project → Settings → Environment Variables**
   (they are `NEXT_PUBLIC_*`, i.e. inlined at build time — set them **before** the first build).
3. Deploy. Set `NEXT_PUBLIC_SITE_URL` to the final domain once it is attached.

## Environment variables

Copy `.env.example` to `.env.local` for local dev; on Vercel use project settings:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Contact-form delivery. Create a free key at [web3forms.com](https://web3forms.com) with the client's professional mailbox. Without it the form shows a graceful "not configured" message. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Enables the floating WhatsApp button, the mobile action bar's WhatsApp link and the footer entry. Format: `+213XXXXXXXXX`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by `sitemap.ts` / `robots.ts` once the domain is live. |

## Images

All photos live in `public/images/` as **WebP** (a 1600w full version plus an 800w variant served
to phones via `srcset`), wired through `src/lib/images.ts`.
**To replace an image: drop a new `.webp` file with the same name — no code change needed.**
If a file is missing, `PlaceImage` renders a flat placeholder labelled with the expected filename.

| Slot | Where it appears | Current photo |
|---|---|---|
| `hero.webp` | Home hero | Camel caravan, Grand Erg |
| `expertise-hero.webp` | Expertise hero | Chefchaouen |
| `country-dz.webp` / `country-ma.webp` / `country-tn.webp` / `country-ly.webp` / `country-mr.webp` | Home regional cards + Expertise country grid | Notre-Dame d'Afrique / Hassan II Mosque / El Jem / Sabratha / Chinguetti manuscripts |
| `about-1.webp` | About page band | Marrakech lantern souk |
| `article-gas.webp` / `article-water.webp` / `article-sahel.webp` | Insight cards + article headers | Noor III solar tower / Lac Bab Louta / desert caravan |

If you only have a JPG, convert it: `python -c "from PIL import Image; Image.open('in.jpg').convert('RGB').save('out.webp','WEBP',quality=82)"`.

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
- The landing page ends with an email contact form + direct WhatsApp button
  (same components as the Contact page, sharing the Web3Forms key).

## Pending from the client (see PLAN.md §7)

1. WhatsApp number → `.env.local` / Vercel env vars
2. Professional mailbox → Web3Forms key → `.env.local` / Vercel env vars
3. FR copy proofread (drafted from the EN source in the Architecture doc)
4. Founder name + photo/bio for the team section (`about.team` in the dictionaries; PENDING comment marks the spot)
5. Domain → attach in Vercel, then set `NEXT_PUBLIC_SITE_URL`
