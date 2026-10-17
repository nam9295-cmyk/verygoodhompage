# Sydney Chocolate Mochi Homepage Hero — 2026-10-17

> Historical release record. Subsequent brand hub SEO changes and current release status are documented in [2026-10-17-brand-hub-seo.md](2026-10-17-brand-hub-seo.md).


## Current status
- Worktree branch: codex/root-au-menu-20261017 (includes the prior AU menu alignment).
- Booking app nam9295-cmyk/au-cake stays unchanged.
- Mac local preview: http://127.0.0.1:4187/ (Vite preview serving dist).
- NOT released to the production main branch without visual approval.

## Source images
Google Drive relative folder: verygood/00_au-verygood/image/chocolate/mochi.
- Desktop: public/assets/mochi/mochi-street.webp (1920x1080, 16:9).
- Mobile: public/assets/mochi/mochi-cafe.webp (1080x1350, 4:5).
These are local asset copies with no dependency on Google Drive at runtime.

## Poster text
- Work Sans: CHOCOLATIER’S (smaller), CHOCOLATE MOCHI (larger).
- Serif: PRE-ORDERS OPEN 17th OCT.
- Pick up: WED - FRI 09:00 - 16:00 and SAT - SUN 09:00 - 12:00.
- LIMITED QUANTITY · MADE TO ORDER · UBER PICKUP AVAILABLE.
- Order URL: https://au.verygood-chocolate.com/chocolates/chocolate-mochi.

## Technical implementation
- src/config/auSiteContent.js: poster text and two photo paths.
- src/config/auLinks.js: mochi booking URL in allowlist.
- src/pages/au/AuHomePage.jsx: responsive picture, HTML copy and direct booking CTA.
- src/styles/au-site.css: black-left desktop gradient and dark-top mobile 4:5; serif mobile details in cream panel.
- Tests updated for new hero while preserving menu, booking and Korean routes.

## Validation
- npm test: 38 passed, 0 failed.
- npm run build: passed.
- npm run lint: passed.
- Chrome visual QA: desktop 1440px and emulated mobile 390px; images HTTP 200.

## Release checklist
1. Approve current desktop and mobile preview.
2. Confirm GitHub origin/main has not moved from baseline f736c22.
3. Fast-forward origin/main only after approval; check live site post-deployment.
4. Do not modify au-cake.
