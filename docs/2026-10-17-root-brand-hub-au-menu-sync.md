# VERYGOOD root brand hub — AU menu alignment (2026-10-17)

> Historical release record. Subsequent brand hub SEO changes and current release status are documented in [2026-10-17-brand-hub-seo.md](2026-10-17-brand-hub-seo.md).


## Purpose

The root verygood-chocolate.com remains a bilingual **brand gateway** rather than a second Sydney checkout or GeoIP redirect. Preserve Korea links and the Daegu-to-Sydney brand story.

## Catalogue snapshot

Source: current nam9295-cmyk/au-cake product catalogue, commit 2035195 (2026-10-17). The AU shop is authoritative for current offers, availability, pricing and pickup.

- Cake & Bake (5): Pavé Whole Cake, Signature Gâteau Loaf, Brownie Basque Whole Cake, Brownie Basque Loaf, Levain Cookies · Six
- Chocolate (4): Pavé Mochi, Almond Chocolate, Pavé Chocolate · Heart Tin 100g, Eiffel Tower Chocolate
- Celebrate (3): Gâteau Cupcakes, Brownie Basque Cupcakes, S’more Sticks
- Top navigation also offers Custom Cake and Business.
- **Coming Soon:** Levain Cookies and Brownie Basque Cupcakes; their cards offer details, not a claim of sale availability.
- Each product goes to its matching public AU URL. Brownie whole and loaf keep their distinct query-string selections.
- The 13 displayed asset URLs were checked on AU production and returned HTTP 200.

## Brand/SEO behavior

- No blanket permanent or country-based redirect away from the root brand domain.
- The hero CTA, header and footer Shop Sydney actions lead to the live AU homepage; product cards, category tiles, Custom Cake and Business lead to their approved AU URLs.
- Korean site URL kr.verygood-chocolate.com is preserved. This change does not alter Korean cake.verygood-chocolate.com or any bookings.
- English and Korean root home pages use distinct metadata, one canonical each, and only real en-AU/ko alternates after hydration.
- Root static HTML title and description were updated for the currently public Sydney collection.
- Older root /chocolate, /tea and /goods pages and existing sitemap entries were intentionally preserved as legacy brand pages. They are not offered as the current AU home menu. Review indexing/archival actions separately before removing them to avoid unexpected traffic loss.
- No order handling, Appwrite, payment, email, cloud configuration, AU production or DNS was touched.

## Verification and release

Implementation is in an isolated worktree branch codex/root-au-menu-20261017, based on root repository origin/main commit f736c22, not on the older local main checkout.

- 38 automated tests passed serially; ESLint passed; Vite build passed.
- 390px / 1440px desktop browser checks in English and Korean confirmed 12 cards, two Coming Soon labels, working product links, Korea link, correct SEO singleton tags, no horizontal overflow and no JS errors.
- AU order/notification or live customer data was never touched.

**Release remains pending.** Refresh root repository remote main, verify no parallel edits, merge/fast-forward through approved workflow, deploy the root brand site only, and recheck the real homepage. Roll back only the root frontend if needed. No Appwrite or AU checkout redeploy.
