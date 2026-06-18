# E-Care Pro Landscaping — Website

A premium, conversion-focused marketing site for **E-Care Pro Landscaping**, a licensed &
insured landscaping contractor in Bay Point, CA serving all of Contra Costa County.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS v4**, mobile-first and SEO-optimized.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

> Requires Node.js 18.18+ (Node 20+ recommended).

---

## What's included

### Pages
- **Home** (`/`) — Hero with above-the-fold estimate form, trust bar, services, why-us,
  featured projects, service areas, reviews, guarantees, final CTA, FAQ, contact.
- **Service pages** (`/services/[slug]`) — 7 SSG pages, one per service, with localized SEO copy.
- **Service-area pages** (`/service-areas/[city]`) — 10 SSG local-SEO landing pages
  (Bay Point, Pittsburg, Antioch, Concord, Walnut Creek, Brentwood, Martinez, Pleasant Hill,
  Oakley, and a Contra Costa County hub).
- **404** — branded not-found page.

### Conversion features
- Sticky mobile **Call Now** + **Free Quote** bar
- Click-to-call (`tel:`) everywhere + dual phone numbers
- Estimate form above the fold (hero) and in the final CTA, with honeypot spam protection
- Multiple CTAs, trust indicators, Licensed & Insured section, guarantees section

### SEO
- Per-page metadata, Open Graph + Twitter cards, canonical URLs
- `sitemap.xml`, `robots.txt`, PWA `manifest.webmanifest` (all generated)
- JSON-LD: **LocalBusiness / LandscapingBusiness / GeneralContractor**, **WebSite**,
  **Service**, **FAQPage**, **BreadcrumbList**, plus reviews & aggregate rating
- Dynamically generated OG image, Apple touch icon, and SVG favicon
- Natural local keyword targeting (Landscaping Bay Point CA, Paver Installation Bay Point,
  Fence Contractor Bay Point, Landscaper Near Me, Contra Costa County, etc.)

### Performance / a11y
- Static-generated HTML, ~102 kB shared JS, no third-party scripts or external images
- System-friendly fonts via `next/font` (Montserrat + Inter, self-hosted)
- Scroll-reveal animations that respect `prefers-reduced-motion`
- Semantic landmarks, skip-link, focus-visible rings, accessible labels

---

## Configuration

Copy `.env.example` → `.env.local` and set:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (production domain). Drives metadata, sitemap, schema. |
| `LEAD_WEBHOOK_URL` | Optional. Forward estimate-form leads to a CRM/automation webhook (Zapier, Make, n8n). If unset, leads are logged server-side. |

**Business details** (name, address, phones, hours, geo, rating) live in `lib/site.ts`.
**Content** (services, cities, reviews, FAQs, projects) lives in `lib/data.ts`.
Edit those two files to update copy across the entire site.

---

## Project structure

```
app/
  layout.tsx              Root layout, global metadata, JSON-LD, header/footer
  page.tsx                Home page (composes all sections)
  services/[slug]/        Dynamic service pages (SSG)
  service-areas/[city]/   Dynamic local SEO pages (SSG)
  api/estimate/route.ts   Lead intake endpoint
  sitemap.ts robots.ts manifest.ts
  opengraph-image.tsx twitter-image.tsx apple-icon.tsx icon.svg
  globals.css             Design tokens + utilities + animations
components/
  sections/               Hero, Services, Reviews, Contact, Footer, …
  Header, EstimateForm, Visual, Logo, Icon, Buttons, …
lib/
  site.ts                 NAP + business config (single source of truth)
  data.ts                 Services, cities, reviews, FAQs, projects
  schema.ts               JSON-LD builders
logo/                     Brand logo kit (SVGs, brand sheet) — see logo/README.md
```

---

## Swapping in real photography

The site uses designed gradient "photo" panels (`components/Visual.tsx`) so it loads instantly
and scores perfectly on performance. To use real photos, replace `<Visual />` usages with
`next/image` and add your image domains to `next.config.mjs` → `images.remotePatterns`.

---

## Deploy

Deploy to **Vercel** (recommended) — zero config:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Set `NEXT_PUBLIC_SITE_URL` (and optionally `LEAD_WEBHOOK_URL`) in the Vercel project
environment variables. After your first production deploy, submit `sitemap.xml` in
Google Search Console and create/claim the Google Business Profile for local ranking.
