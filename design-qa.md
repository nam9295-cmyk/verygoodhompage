# AU home hero design QA

## Comparison target

- Source visual: `output/design-audit/01-hero-export-1440.jpg`, rendered from `/Users/nam9295/Desktop/john_2.0/code/au-page/hero-export.html`.
- Implementation: `output/design-qa/hero-1440-final.png`.
- Viewport: 1440 × 900 CSS px, English AU home at the initial scroll position.
- Density: both full-page captures are 1440 × 900 pixels. No density normalization was required.
- Full-view comparison: `output/design-qa/hero-comparison-1440.png`. It places the source hero crop (680 px high) beside the implementation crop (703 px high), each normalized to a 720 × 351 comparison region.
- Mobile evidence: `output/design-qa/hero-390.png` at 390 × 844 CSS px.
- Focused category evidence: `output/design-qa/categories-1440.png` verifies the two requested desktop category headings.

## Fidelity review

- Typography: Work Sans, heavy hero headline, compact uppercase kicker and simple CTA hierarchy match the selected direction. The implementation keeps the current AU copy and approved navigation rather than restoring the export's obsolete menu labels.
- Spacing and layout rhythm: the hero now fills the available viewport width, uses a 700 px desktop visual field, and keeps the copy aligned to the existing AU shell. At 390 px, copy is bottom-aligned with 20 px gutters and no crop.
- Colors and tokens: forest overlay, ivory type and restrained pink kicker reuse AU tokens. The implementation intentionally keeps the product packages more visible than the very dark export so the opening photograph reads immediately.
- Image quality and asset fidelity: the implementation uses the same local `public/assets/main.png` product photograph as the export; no generated or hotlinked image was introduced.
- Copy and actions: the source heading and CTA structure are preserved. `Book a Cake` remains the first action and retains the approved AU Cakes destination; `Explore products` scrolls to the internal catalogue section.

## Comparison history

1. **P1 — Split hero did not meet the selected image-led opening.** The prior home used separate text and image columns. Replaced it with an image-led hero using the existing local photograph and overlaid content. Post-fix evidence: `output/design-qa/hero-1440-final.png`.
2. **P1 — Pencil export would overflow at mobile width.** Its fixed 1440 px composition cropped copy and actions at 390 px. The implementation uses responsive sizing, mobile overlay rules and a wrapping CTA row. Post-fix evidence: `output/design-qa/hero-390.png`; document width equals 390 px.
3. **P2 — Page margin interrupted the full-bleed treatment.** Removed the browser default body margin in the AU stylesheet. Post-fix evidence: implementation hero measures 1440 px wide at the 1440 px viewport.
4. **P2 — Cake category titles could wrap on desktop.** Added the shared `au-experience__heading` hook with desktop-only no-wrap styling. Post-fix evidence: `output/design-qa/categories-1440.png`; both titles have a rendered height equal to one line-height.

## Interaction and accessibility checks

- The decorative hero image has an empty alt and `aria-hidden`; the content remains a semantic `h1` and real links.
- Desktop and mobile CTAs are keyboard-focusable links. Existing focus-visible styling remains active.
- The 390 px header retains the visible booking link and menu button.
- Existing `prefers-reduced-motion` rules continue to disable scrolling animation and shorten transitions.
- Browser console errors: none observed.

## Result

No actionable P0, P1 or P2 visual issues remain for this scope.

final result: passed

## Fixed wallpaper revision

- Desktop evidence: `output/design-qa/fixed-tiger-before-1440.png` after 820 px of page scroll and `output/design-qa/fixed-tiger-after-1440.png` after 1,540 px of page scroll.
- Mobile evidence: `output/design-qa/fixed-tiger-390.png` at 390 × 844 CSS px.

### Resolution

The first wallpaper pass belonged to the scrolling Cakes / Something Fresh section, so the visible tiger positions moved with the product content. The wallpaper is now a dedicated fixed layer immediately inside `AuLayout`, behind the scrolling `main` and footer content.

- At 1440 px, the layer remained at `x: 0`, `y: 0`, `1440 × 900` before and after the scroll check.
- At 390 px, the layer remained at `x: 0`, `y: 0`, `390 × 844` before and after the scroll check, with no document overflow.
- The existing live-AU opacity (`0.09`) and responsive official asset pair remain unchanged.

final result: passed

## Tiger wallpaper extension

- Live reference: the AU booking home at `https://au.verygood-chocolate.com/`, captured at 390 × 844 in `output/design-qa/tiger-reference-390.png`.
- Implementation: `output/design-qa/tiger-categories-390.png` at the same viewport.
- Side-by-side evidence: `output/design-qa/tiger-pattern-comparison-390.png`.
- Local assets: `public/assets/brand/tiger-pattern-desktop.webp` and `public/assets/brand/tiger-pattern-mobile.webp`, copied from the official AU booking build rather than hotlinked.

### Findings and resolution

1. **P2 — Cakes and Something Fresh read as separate tinted cards.** Removed their pink and forest top borders and both solid card backgrounds. The sections now sit on one continuous shared surface.
2. **P2 — The home lacked the AU booking site's tiger backdrop.** Applied the official responsive desktop/mobile wallpaper assets to the shared product area with the same `0.09` opacity observed on the live AU home. The desktop treatment fills the width and the mobile treatment keeps its source scale while repeating vertically.
3. **P2 — Risk of mobile horizontal overflow from the artwork.** The background remains a pseudo-element clipped by its parent; the 390 px document width remains exactly 390 px.

### Result

The shared wallpaper is visible without competing with product photography or copy. No actionable P0, P1 or P2 issues remain.

final result: passed
