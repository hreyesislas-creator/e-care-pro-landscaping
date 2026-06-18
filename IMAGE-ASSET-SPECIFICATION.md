# E-Care Pro Landscaping — Image Asset Specification (Production Blueprint)

> **Purpose:** the single source of truth for every photographic asset on the site.
> Generate each image externally, name it **exactly** as listed, place it in the specified
> folder, and the website will be wired to consume them directly — **no placeholders, no
> gradients, no stock, no temporary assets.**
>
> 24 core images + 2 optional. All filenames map 1:1 to component code, so integration is
> mechanical once the files exist.

---

## 0. Folder structure (already scaffolded)

```
public/images/
├── hero.png                      ← homepage hero (desktop / wide)
├── hero-mobile.png               ← homepage hero (portrait crop, optional)
├── why-choose-us.png             ← "Why Choose Us" premium property
├── service-vehicle.png           ← Contact section service truck
├── services/
│   ├── landscaping.png
│   ├── irrigation-systems.png
│   ├── fence-installation-repair.png
│   ├── paver-installation.png
│   ├── tree-services.png
│   ├── yard-cleanups.png
│   └── property-maintenance.png
├── projects/
│   ├── project-01.png … project-08.png
├── before-after/
│   ├── landscaping-before.png
│   └── landscaping-after.png
├── team/
│   └── crew.png
└── branding/
    ├── og-image.png              ← social share card (optional override)
    └── logo-watermark.png        ← optional, transparent
```

> **Filename rule:** service images are named after their **route slug** (`lib/data.ts → service.slug`),
> so code resolves them as `/images/services/${slug}.png` with zero mapping logic.

---

## 1. Global style bible (READ FIRST — drives consistency)

Every image must look like it came from **one photographer, one shoot, one color grade**.
Append the **Style Suffix** to every prompt and use the **Negative Prompt** everywhere.

**Style Suffix (append verbatim to every prompt):**

```
— shot on Sony A7R IV, 24–35mm lens, f/8, natural golden-hour light, warm cinematic
color grade, true-to-life saturated-but-natural greens, soft realistic shadows, high
dynamic range, ultra-sharp 8K detail, professional architectural and real-estate
photography, premium contractor marketing quality, photorealistic, clean composition,
no text, no watermarks, no logos, no signage, no brand names, no distortion, no AI artifacts.
```

**Negative Prompt (apply on every generation):**

```
text, letters, words, watermark, logo, signage, brand name, license plate text,
cartoon, illustration, painting, 3d render, cgi, video-game look, oversaturated,
hdr halos, warped lines, bent architecture, melted edges, extra limbs, deformed hands,
blurry, low-res, jpeg artifacts, fisheye distortion, plastic fake grass, unnatural lawn,
duplicated objects, cluttered, messy, dilapidated (unless 'before' image).
```

**Locked creative parameters (keep identical across the set):**

| Parameter | Value |
|-----------|-------|
| Region / vibe | Bay Area upscale suburban California (Contra Costa County) |
| Time of day | Golden hour (warm, low sun) — except "before" shots (flat midday) |
| White balance | Warm, ~5000–5400K |
| Greens | Healthy, deep, natural — never neon |
| Architecture | Modern California / craftsman / contemporary ranch, stucco + stone |
| People | None, **except** `team/crew.png` |
| Color grade | Warm highlights, gently lifted shadows, filmic, magazine-real |
| Output | sRGB, no visible text anywhere in frame |

**Generation tips for a cohesive set:**
- Reuse the **same seed family** / "style reference" across all images if your tool supports it.
- Generate at the **largest native size** your model offers, then downscale to the target (sharper than upscaling).
- Keep the **horizon and key subject roughly centered** so mobile center-crops stay safe (see §4).

---

## 2. Technical delivery standards

| Item | Standard |
|------|----------|
| Master format | **JPG**, sRGB, quality ~90 (PNG only if transparency needed, e.g. watermark) |
| Color profile | sRGB (strip other ICC profiles) |
| Source file size | Hero ≤ ~900 KB · cards ≤ ~500 KB · others ≤ ~600 KB (Next re-encodes per breakpoint) |
| Final delivery | `next/image` auto-serves **AVIF → WebP** (configured in `next.config.mjs`) |
| Resolution | Deliver at the **Recommended Size** below (already 2× for retina at display size) |
| No baked-in text | All copy is live HTML over the image — never inside the JPG |
| EXIF | Strip GPS/EXIF before commit |

**Loading strategy — the rules used in this spec:**
- **priority** → only the LCP image (the hero). Adds `<link rel=preload>`, disables lazy. Use sparingly (1, max 2).
- **lazy** (default) → everything below the fold. `next/image` lazy-loads automatically; do **not** add `priority`.
- **eager** → intentionally **not used** here. `loading="eager"` only disables lazy-loading without preloading, which hurts LCP. The correct pro pattern is *priority for the hero, lazy for all else*. (Called out explicitly per request.)

**Blur-up placeholders:** every image uses `placeholder="blur"`. Because these are static
imports-by-path (not `import`ed modules), generate a tiny base64 `blurDataURL` per file with
the helper script in §6 and store it in `public/images/blur.json` (keyed by path). The
components read from there.

---

## 3. `next/image` integration cheat-sheet

Reusable `sizes` values referenced below:

| Token | `sizes` value | Used by |
|-------|---------------|---------|
| `FULLBLEED` | `100vw` | Hero |
| `CARD_3COL` | `(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw` | Service + project cards |
| `HALF` | `(max-width:768px) 100vw, 50vw` | Before/After, Team |
| `FEATURE` | `(max-width:1024px) 100vw, 45vw` | Why Choose Us, Service Vehicle |

Standard card pattern (fill inside a fixed-ratio box, object-cover):

```tsx
<div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
  <Image
    src="/images/services/landscaping.png"
    alt="New landscape design and installation in Bay Point, CA"
    fill
    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
    quality={78}
    placeholder="blur"
    blurDataURL={blur['/images/services/landscaping.png']}
    className="object-cover"
    // NO priority → lazy by default
  />
</div>
```

Hero pattern (priority, art-directed):

```tsx
<Image
  src="/images/hero.png"
  alt="Luxury California residential property with custom landscaping at golden hour"
  fill
  sizes="100vw"
  quality={82}
  priority
  fetchPriority="high"
  placeholder="blur"
  blurDataURL={blur['/images/hero.png']}
  className="object-cover object-center"
/>
```

---

## 4. Mobile cropping model

All images render with `object-cover`. Compose so the **subject survives a center crop**:

- **Wide (3:2 / 16:9) → phone (~4:5 portrait):** keep the hero subject within the **center 60%**
  horizontally and the **upper-middle 70%** vertically.
- Control the focal point in code with `object-position` (e.g. `object-[center_40%]`) — noted per image.
- For the hero, an **optional dedicated `hero-mobile.png` (3:4 portrait)** is art-directed for phones
  via `<picture>`/media query; if you skip it, the desktop hero center-crops acceptably.

---

# 5. THE IMAGES

Legend: **Load** = priority / lazy. **Comp.** = component file that consumes it.

---

## HERO

### 5.1 — Main Hero Image
- **Filename:** `hero.png`
- **Location:** Homepage Hero Section (`components/sections/Hero.tsx`) — full-bleed background behind headline + estimate form.
- **Purpose:** Primary conversion image. Must instantly say *"We transform properties."*
- **Recommended Size:** **2400 × 1600**
- **Aspect Ratio:** **3:2**
- **Mobile Safe Area:** Center 60% horizontally; hero home + walkway kept centered. Use `object-[center_45%]`.
- **Load:** **priority** (LCP) · `quality={82}` · `sizes=FULLBLEED` · blur placeholder.
- **Comp.:** `Hero.tsx`
- **Image Description:** A luxury California suburban home at golden hour — perfectly manicured emerald lawn, custom paver walkway curving to the entrance, mature trees, layered planting beds, subtle landscape lighting just glowing on, warm low sun flaring gently. Aspirational, calm, high-end.
- **Prompt:**
  ```
  Ultra-realistic luxury California residential property at golden hour, perfectly manicured
  emerald-green front lawn, elegant custom paver walkway curving toward a modern craftsman
  home with stone and stucco facade, mature oak and maple trees, layered drought-smart
  planting beds with ornamental grasses, warm landscape lighting beginning to glow, upscale
  Bay Area suburban neighborhood, long soft shadows, inviting and aspirational, wide
  establishing real-estate photograph — [Style Suffix]
  ```

### 5.2 — Hero Mobile Crop *(optional but recommended)*
- **Filename:** `hero-mobile.png`
- **Location:** Homepage Hero, phones only (`<picture>` source `max-width:768px`).
- **Purpose:** Art-directed vertical hero so the home + walkway read on tall screens.
- **Recommended Size:** **1290 × 1720**
- **Aspect Ratio:** **3:4**
- **Mobile Safe Area:** Full frame is the safe area (purpose-built).
- **Load:** **priority** (only one hero source loads).
- **Image Description:** Same scene/grade as `hero.png`, recomposed vertically — walkway leading up, home upper-third, lawn foreground.
- **Prompt:** Same as 5.1 but end with: `vertical portrait composition, walkway leading from foreground to home in upper third — [Style Suffix]`

---

## SERVICES  *(folder: `public/images/services/`, all 1600 × 1200 · 4:3 · CARD_3COL · lazy · quality 78)*

Consumed by `components/sections/Services.tsx` **and** `app/services/[slug]/page.tsx`
(resolved as `/images/services/${slug}.png`). Each renders inside a 4:3 → card-cropped box.
Mobile Safe Area for all: **center 70%** (single hero subject, centered).

### 5.3 — Landscaping
- **Filename:** `services/landscaping.png`
- **Location:** Services grid card "Landscaping & Design" + `/services/landscaping`.
- **Purpose:** Sell full design-build landscaping.
- **Image Description:** A beautifully designed front yard — fresh sod, crisp bed edges, ornamental grasses, a young feature tree, modern home softly behind.
- **Prompt:**
  ```
  Ultra-realistic professionally landscaped California front yard, freshly laid lush sod with
  crisp clean bed edges, layered planting of ornamental grasses, lavender and boxwood, a
  sculptural feature tree, decorative bark mulch, modern home softly blurred behind, golden
  hour, pristine and intentional design — [Style Suffix]
  ```

### 5.4 — Irrigation Systems
- **Filename:** `services/irrigation-systems.png`
- **Location:** Services card "Irrigation Systems" + `/services/irrigation-systems`.
- **Purpose:** Show smart, water-saving irrigation in action.
- **Image Description:** A healthy green lawn with pop-up sprinklers mid-spray, fine water arcs lit by low sun, droplets sparkling, drip line visible at a planting bed edge.
- **Prompt:**
  ```
  Ultra-realistic close-to-mid shot of a healthy vibrant lawn with professional pop-up
  sprinklers actively spraying fine arcs of water, sunlit water droplets sparkling, backlit
  by warm golden-hour sun, a tidy drip-irrigation line visible along a mulched planting bed,
  lush green grass, crisp and refreshing, shallow depth of field — [Style Suffix]
  ```

### 5.5 — Fence Installation & Repair
- **Filename:** `services/fence-installation-repair.png`
- **Location:** Services card "Fence Installation & Repair" + `/services/fence-installation-repair`.
- **Purpose:** Showcase premium fence craftsmanship.
- **Image Description:** A newly built modern horizontal-slat redwood privacy fence, warm wood tone, clean posts, manicured lawn alongside, subtle planting.
- **Prompt:**
  ```
  Ultra-realistic newly installed modern horizontal-slat redwood privacy fence, rich warm
  natural wood grain, perfectly level clean lines and posts set in concrete, a manicured green
  lawn and low planting alongside, residential California backyard, golden-hour side light
  raking across the wood, premium craftsmanship, crisp and new — [Style Suffix]
  ```

### 5.6 — Paver Installation
- **Filename:** `services/paver-installation.png`
- **Location:** Services card "Paver Installation" + `/services/paver-installation`.
- **Purpose:** Sell high-end hardscape.
- **Image Description:** A custom paver walkway/patio, interlocking pattern, tight joints, polymeric sand, bordered by planting and lawn.
- **Prompt:**
  ```
  Ultra-realistic custom interlocking paver patio and walkway, premium charcoal-and-tan
  pavers in a clean herringbone pattern with tight joints and crisp edge restraints, bordered
  by manicured lawn and modern planting, subtle wet-look finish catching warm golden light,
  luxury California backyard, immaculate hardscape craftsmanship — [Style Suffix]
  ```

### 5.7 — Tree Services
- **Filename:** `services/tree-services.png`
- **Location:** Services card "Tree Services" + `/services/tree-services`.
- **Purpose:** Convey safe, professional tree care.
- **Image Description:** A large, beautifully pruned shade tree with a clean, balanced canopy on a manicured property (after-care look), warm light through leaves. *(No readable branding on any gear.)*
- **Prompt:**
  ```
  Ultra-realistic large mature shade tree freshly and expertly pruned, clean balanced canopy
  with healthy structure, dappled warm golden-hour light filtering through green leaves, set
  on a manicured residential lawn, a neatly trimmed silhouette against soft sky, professional
  arborist quality, tidy and healthy — [Style Suffix]
  ```

### 5.8 — Yard Cleanups
- **Filename:** `services/yard-cleanups.png`
- **Location:** Services card "Yard Cleanups" + `/services/yard-cleanups`.
- **Purpose:** Show the "restored to pristine" result.
- **Image Description:** A freshly cleaned, edged, and mulched yard — sharp bed lines, raked beds, crisp lawn, debris-free, immaculately tidy.
- **Prompt:**
  ```
  Ultra-realistic freshly cleaned and manicured California yard, sharply edged planting beds
  with fresh dark mulch, neatly raked and debris-free, crisp mowed lawn with clean stripes,
  trimmed hedges, spotless and restored, warm golden-hour light, the satisfying result of a
  professional yard cleanup — [Style Suffix]
  ```

### 5.9 — Property Maintenance
- **Filename:** `services/property-maintenance.png`
- **Location:** Services card "Property Maintenance" + `/services/property-maintenance`.
- **Purpose:** Sell recurring residential/commercial care.
- **Image Description:** An immaculately maintained property — striped lawn, shaped hedges, tidy beds — a clearly "well-kept all year" estate or commercial frontage.
- **Prompt:**
  ```
  Ultra-realistic immaculately maintained upscale property, lawn mowed in clean parallel
  stripes, precisely shaped hedges and topiary, tidy mulched beds with seasonal color, a
  refined modern California home or commercial frontage behind, golden-hour light, the look of
  consistent year-round professional grounds maintenance — [Style Suffix]
  ```

---

## PROJECTS  *(folder: `public/images/projects/`, all 1600 × 1200 · 4:3 · CARD_3COL · lazy · quality 78)*

Consumed by `components/sections/Projects.tsx` (8 cards). Each must be **visually distinct**.
Mobile Safe Area for all: **center 65%**.

### 5.10 — Project 01 · Paver Patio & Fire Pit
- **Filename:** `projects/project-01.png`
- **Image Description:** Backyard paver patio with a built-in stone fire pit and seat wall, lounge seating, dusk warm glow.
- **Prompt:** `Ultra-realistic luxury backyard paver patio with a circular stone fire pit and curved seat wall, warm fire glow at blue-hour dusk, modern outdoor lounge furniture, manicured lawn beyond, premium hardscape — [Style Suffix]`

### 5.11 — Project 02 · Drought-Smart Front Yard
- **Filename:** `projects/project-02.png`
- **Image Description:** Modern xeriscape front yard — succulents, ornamental grasses, decomposed granite, boulders, clean concrete steppers.
- **Prompt:** `Ultra-realistic modern drought-tolerant California front yard, sculptural succulents and agave, ornamental grasses, decomposed-granite ground, natural boulders, clean rectangular concrete stepping pads, contemporary home behind, golden hour, water-wise and stylish — [Style Suffix]`

### 5.12 — Project 03 · Redwood Privacy Fence
- **Filename:** `projects/project-03.png`
- **Image Description:** Full-run horizontal redwood privacy fence with a matching gate, alongside lawn and planting.
- **Prompt:** `Ultra-realistic full run of modern horizontal redwood privacy fencing with a matching custom gate and black hardware, warm wood tones, manicured lawn and planting alongside, residential California yard, golden-hour raking light — [Style Suffix]`

### 5.13 — Project 04 · Paver Driveway
- **Filename:** `projects/project-04.png`
- **Image Description:** Elegant interlocking paver driveway leading to a luxury home garage, bordered planting.
- **Prompt:** `Ultra-realistic elegant interlocking paver driveway in a refined banded pattern leading to a luxury modern California home and garage, crisp borders, manicured lawn edges and planting, golden-hour light, high-end curb appeal — [Style Suffix]`

### 5.14 — Project 05 · Backyard Living Transformation
- **Filename:** `projects/project-05.png`
- **Image Description:** Complete backyard — lush lawn, pergola, paver lounge area, lighting, layered planting.
- **Prompt:** `Ultra-realistic complete luxury backyard transformation, lush green lawn, a modern wood pergola over a paver lounge area, integrated landscape lighting glowing at golden hour, layered planting beds, resort-like and inviting — [Style Suffix]`

### 5.15 — Project 06 · Oak Canopy Pruning
- **Filename:** `projects/project-06.png`
- **Image Description:** Mature oak with a beautifully thinned, balanced canopy over a tidy lawn (after tree work).
- **Prompt:** `Ultra-realistic mature California oak with a beautifully thinned and balanced canopy after expert pruning, healthy structure, clean tidy lawn beneath, warm light through the leaves, professional arborist result — [Style Suffix]`

### 5.16 — Project 07 · Travertine Pool Deck
- **Filename:** `projects/project-07.png`
- **Image Description:** Resort-style travertine paver pool deck around a clean modern pool, lounge chairs, planting.
- **Prompt:** `Ultra-realistic resort-style travertine paver pool deck surrounding a sleek modern swimming pool, calm blue water, tidy lounge chairs, tropical-modern planting and manicured lawn, warm golden-hour light, luxury California backyard — [Style Suffix]`

### 5.17 — Project 08 · Commercial / HOA Frontage
- **Filename:** `projects/project-08.png`
- **Image Description:** Polished commercial or HOA entrance landscaping — seasonal color, shaped shrubs, clean lawn, monument planting (no readable signage text).
- **Prompt:** `Ultra-realistic professionally landscaped commercial / HOA property entrance, vibrant seasonal flower color, precisely shaped shrubs, clean striped lawn, low monument stone planter (blank, no text), modern office or community building behind, golden hour, polished and well-funded — [Style Suffix]`

---

## BEFORE & AFTER  *(folder: `public/images/before-after/`)*

Consumed by a new before/after presentation in the Landscaping area (`components/BeforeAfter.tsx`,
built during integration). **Critical:** identical camera position, lens, height, and framing in
both — only the landscape changes. Generate the "after" first, then prompt the "before" as the
*same scene, neglected*, to keep geometry aligned.

### 5.18 — Before Image
- **Filename:** `before-after/landscaping-before.png`
- **Recommended Size:** **1920 × 1280** · **Aspect 3:2** · **HALF** · **lazy** · quality 80
- **Mobile Safe Area:** Center 70%.
- **Purpose:** Establish the "problem" state for dramatic contrast.
- **Image Description:** A tired suburban front yard — patchy, dry, weedy lawn, overgrown shrubs, no beds, flat midday light. Same house and camera angle as the "after".
- **Prompt:**
  ```
  Ultra-realistic tired neglected California suburban front yard, patchy dry weedy lawn, bare
  dirt spots, overgrown straggly shrubs, no defined planting beds, cracked plain concrete path,
  flat overcast midday light, honest "before" renovation photo, same camera angle and framing
  as the matching after shot — photorealistic, no text, no watermark, no people, no AI artifacts.
  ```
  *(Note: omit golden-hour suffix — "before" is intentionally flat/unflattering.)*

### 5.19 — After Image
- **Filename:** `before-after/landscaping-after.png`
- **Recommended Size:** **1920 × 1280** · **Aspect 3:2** · **HALF** · **lazy** · quality 80
- **Mobile Safe Area:** Center 70%.
- **Purpose:** The transformation payoff (slider/side-by-side reveal).
- **Image Description:** The exact same yard, transformed — lush lawn, new paver walkway, fresh beds with ornamental planting, mulch, lighting, golden hour. Same framing as "before."
- **Prompt:**
  ```
  Ultra-realistic fully transformed California front yard, lush flawless green lawn, brand-new
  custom paver walkway, freshly planted layered beds with ornamental grasses and color, clean
  mulch, subtle landscape lighting, the same house and identical camera angle and framing as
  the matching before shot, golden-hour light — [Style Suffix]
  ```

---

## ABOUT / TEAM  *(folder: `public/images/team/`)*

### 5.20 — Team / Crew
- **Filename:** `team/crew.png`
- **Location:** About/Team block (added in the "Why Choose Us" area during integration).
- **Purpose:** Human trust signal — real, capable, friendly local crew.
- **Recommended Size:** **1600 × 1066** · **Aspect 3:2** · **HALF** · **lazy** · quality 80
- **Mobile Safe Area:** Center 60% (keep the group centered).
- **Image Description:** A small professional landscaping crew (3–4) in plain forest-green polos/tees standing confidently on a manicured property, friendly natural expressions, clean tools. **No readable logos or text on clothing/equipment** (client adds branding later).
- **Prompt:**
  ```
  Ultra-realistic small professional landscaping crew of three to four workers standing
  confidently on a freshly manicured residential lawn, wearing plain solid forest-green polo
  shirts with no logos or text, friendly approachable natural expressions, clean professional
  tools, diverse team, warm golden-hour light, authentic premium contractor team photo,
  blank clothing, no text, no logos, no watermark, photorealistic, no AI artifacts.
  ```

---

## WHY CHOOSE US  *(folder: `public/images/`)*

### 5.21 — Premium Property Image
- **Filename:** `why-choose-us.png`
- **Location:** "Why Choose Us" section (`components/sections/WhyChooseUs.tsx`) — feature panel beside the reasons grid.
- **Purpose:** Reinforce premium positioning / aspirational result.
- **Recommended Size:** **1400 × 1750** · **Aspect 4:5 (portrait)** · **FEATURE** · **lazy** · quality 80
- **Mobile Safe Area:** Center 70% vertically; keep home + foreground lawn in frame.
- **Image Description:** A stunning, fully realized luxury estate landscape — sweeping lawn, mature trees, layered beds, hardscape accents — the "dream outcome," vertical composition.
- **Prompt:**
  ```
  Ultra-realistic stunning luxury California estate landscape in vertical composition, sweeping
  flawless lawn in foreground, custom hardscape accents, mature trees and layered ornamental
  planting, elegant modern home in the upper third, warm golden-hour glow and long shadows,
  aspirational premium result, magazine cover quality — [Style Suffix]
  ```

---

## CONTACT  *(folder: `public/images/`)*

### 5.22 — Service Vehicle
- **Filename:** `service-vehicle.png`
- **Location:** Contact section (`components/sections/Contact.tsx`) — replaces/*complements* the map panel as a trust visual.
- **Purpose:** "Real, local, equipped" trust signal + branding canvas.
- **Recommended Size:** **1600 × 1066** · **Aspect 3:2** · **FEATURE** · **lazy** · quality 80
- **Mobile Safe Area:** Center 65% (keep the truck centered).
- **Image Description:** A clean white pickup truck with a landscaping trailer (mowers, tools neatly loaded) parked at the curb of an upscale home. **Truck and trailer are plain/unbranded** so the client can mock up their own wrap.
- **Prompt:**
  ```
  Ultra-realistic clean white pickup truck with a professional landscaping trailer loaded with
  neatly organized mowers and tools, parked at the curb of an upscale California home with a
  manicured lawn, plain unbranded white truck and trailer with no text or logos, golden-hour
  light, professional and trustworthy local contractor vehicle, blank panels for branding,
  no text, no logos, no license plate text, photorealistic, no AI artifacts.
  ```

---

## BRANDING  *(folder: `public/images/branding/`, optional)*

### 5.23 — Social / OG Image *(optional override)*
- **Filename:** `branding/og-image.png`
- **Location:** Social share card. **Note:** the site already auto-generates a branded OG image
  at `app/opengraph-image.tsx`. Only add this file if you want a **photo-based** share card; if
  so, integration will point metadata at it.
- **Recommended Size:** **1200 × 630** · **Aspect 1.91:1** · not via `next/image` (referenced in metadata).
- **Mobile Safe Area:** Keep focal subject in center 80% (social crops vary).
- **Image Description:** Hero-style property photo with generous empty sky/lawn area where the
  live site overlays the logo + tagline (so leave negative space; **no baked text**).
- **Prompt:** Same as 5.1 (`hero.png`) but: `composition with generous clean negative space in the upper-left for a logo overlay, 1.91:1 wide crop — [Style Suffix]`

### 5.24 — Logo Watermark *(optional)*
- **Filename:** `branding/logo-watermark.png`
- **Purpose:** Optional transparent watermark for client's own photo exports. **PNG with alpha.**
- **Note:** The vector brand mark already exists in `/logo/`. This is only if a raster overlay is wanted.

---

## 6. Post-processing & blur-placeholder workflow

After placing the master JPGs, run this once to (a) sanity-check sizes and (b) generate
`public/images/blur.json` consumed by every `<Image placeholder="blur">`. (Integration step
will add `sharp` as a dev dependency and commit this script as `scripts/gen-blur.mjs`.)

```js
// scripts/gen-blur.mjs  — run: node scripts/gen-blur.mjs
import { readdir, writeFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import sharp from "sharp";

const ROOT = "public/images";
const out = {};
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { await walk(p); continue; }
    if (!/\.(jpe?g|png)$/i.test(e.name)) continue;
    const buf = await sharp(p).resize(16).webp({ quality: 40 }).toBuffer();
    const key = "/" + relative("public", p).replace(/\\/g, "/");
    out[key] = `data:image/webp;base64,${buf.toString("base64")}`;
    const { size } = await stat(p);
    if (size > 1_000_000) console.warn(`⚠ ${key} is ${(size/1e6).toFixed(2)}MB — consider compressing`);
  }
}
await walk(ROOT);
await writeFile(join(ROOT, "blur.json"), JSON.stringify(out, null, 2));
console.log(`✓ wrote ${Object.keys(out).length} blur placeholders`);
```

---

## 7. Master checklist (24 core + 2 optional)

| # | File | Size | Ratio | Load |
|---|------|------|-------|------|
| 1 | `hero.png` | 2400×1600 | 3:2 | **priority** |
| 2 | `hero-mobile.png` *(opt)* | 1290×1720 | 3:4 | **priority** |
| 3 | `services/landscaping.png` | 1600×1200 | 4:3 | lazy |
| 4 | `services/irrigation-systems.png` | 1600×1200 | 4:3 | lazy |
| 5 | `services/fence-installation-repair.png` | 1600×1200 | 4:3 | lazy |
| 6 | `services/paver-installation.png` | 1600×1200 | 4:3 | lazy |
| 7 | `services/tree-services.png` | 1600×1200 | 4:3 | lazy |
| 8 | `services/yard-cleanups.png` | 1600×1200 | 4:3 | lazy |
| 9 | `services/property-maintenance.png` | 1600×1200 | 4:3 | lazy |
| 10–17 | `projects/project-01…08.png` | 1600×1200 | 4:3 | lazy |
| 18 | `before-after/landscaping-before.png` | 1920×1280 | 3:2 | lazy |
| 19 | `before-after/landscaping-after.png` | 1920×1280 | 3:2 | lazy |
| 20 | `team/crew.png` | 1600×1066 | 3:2 | lazy |
| 21 | `why-choose-us.png` | 1400×1750 | 4:5 | lazy |
| 22 | `service-vehicle.png` | 1600×1066 | 3:2 | lazy |
| 23 | `branding/og-image.png` *(opt)* | 1200×630 | 1.91:1 | metadata |
| 24 | `branding/logo-watermark.png` *(opt)* | — | — | — |

> When the files are in place, the integration pass will: add `sharp` + `scripts/gen-blur.mjs`,
> generate `blur.json`, build `components/Img.tsx` (a thin `next/image` wrapper that auto-reads
> blur data), a `components/BeforeAfter.tsx` slider, and replace each section's gradient
> `Visual` with the real photo per the mappings above — no placeholders anywhere.
