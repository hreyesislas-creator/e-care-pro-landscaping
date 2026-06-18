# E-Care Pro Landscaping — Logo Kit

A modern, geometric brand mark for a premium residential & commercial landscaping contractor.

## The concept

A single **leaf** with a **house** cut out of it as negative space, and a doorway that keeps the
home silhouette readable. One mark says *green* + *property* — "we care for your place." It is
built from clean geometry (one bezier leaf, a 5-point gable, a vein, a door), so it stays sharp
on a business card and on a truck door, and it survives being printed in a single ink.

## Files

| File | Use |
|------|-----|
| `logo-horizontal.svg` | **Primary** lockup — icon left, text right. Website header, signs, cards. |
| `logo-horizontal-reversed.svg` | Same lockup for dark backgrounds — truck wraps, uniforms, charcoal cards. |
| `logo-square-social.svg` | Square avatar — Instagram, Facebook, Google Business, app icon. |
| `icon.svg` | Icon only, full color — favicons, watermarks, app/social glyph. |
| `icon-1color.svg` | Icon in a **single ink** (uses `currentColor`) — embroidery, etching, stamps, 1-color print. |
| `preview.html` | Open in a browser to see the whole system + real-world mockups. |

## Colors

| Name | Hex | Role |
|------|-----|------|
| Forest Green | `#1B5E20` | Primary — leaf body, brand fields |
| Fresh Green  | `#43A047` | Accent — vein, doorway, "PRO", tagline |
| Charcoal Gray| `#263238` | Wordmark, dark backgrounds, body text |
| Paper        | `#F6F7F5` | Off-white background |

No gradients — flat color only, by design. Reproduces perfectly on vinyl, screen print, and embroidery.

## Typography

- **Headline:** Montserrat ExtraBold (800), tight tracking.
- **Tagline:** Montserrat SemiBold (600), letter-spacing ~+8.
- Acceptable substitutes: Poppins, Inter, or **Arial Black** (always available on Windows/print shops).

## Usage rules

- Keep clear space around the logo equal to the height of the leaf icon.
- Minimum width for the horizontal lockup: ~120px on screen / 1 inch in print.
- Don't recolor outside the palette, add shadows/gradients, stretch, or rotate the mark.
- On busy photos, use the reversed version inside a solid forest-green or charcoal bar.

## Production note

The SVG wordmarks reference the **Montserrat** font. Before sending to a print/embroidery vendor,
**convert the text to outlines** (Illustrator/Inkscape: *Select > Object to Path*) so the typeface
isn't required. Export PNGs at 1×/2×/3× and a 512px social avatar from `preview.html` or any SVG.

## One-color recoloring

`icon-1color.svg` inherits its color from CSS `color:` (or the parent `currentColor`):

```html
<span style="color:#1B5E20"><!-- inline the SVG, or --></span>
<img src="icon-1color.svg" style="color:#fff">   <!-- when inlined as SVG -->
```
For embroidery/screen art, just open the file and replace `#1B5E20` with the single thread/ink color.
