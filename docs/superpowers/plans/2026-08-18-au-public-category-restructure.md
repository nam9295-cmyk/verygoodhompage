# AU Public Category Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the AU brand site's public taxonomy as Cakes, Something Fresh, Verygood Chocolate, Cacao Tea and Choco in Life, while retaining the existing booking boundaries, legacy redirects and bilingual routes.

**Architecture:** Keep `/cakes` and `/bakes` as booking redirects, and make both new booking-led Home sections plus their Header links consume the existing `AU_LINKS.booking.cakes` constant. Preserve the full `AU_PRODUCTS` data source and add a narrow public-release selector for internal catalogue pages, so previously published but now non-featured items remain in source data without appearing in AU public category lists or the sitemap.

**Tech Stack:** React 19, Vite, React Router, react-helmet-async, vanilla CSS, Node built-in test runner.

**Spec:** `design.md`, `plan.md`, and the user-approved AU category specification supplied on 2026-08-18.

## Global Constraints

- Work only in this Git worktree; do not modify `../verygoodhompage`, the AU booking app, or Appwrite.
- Do not change reservation URLs or implement booking logic, prices, Cart, Checkout, or quantities.
- `/` remains English and `/ko` remains Korean; keep `AuAppRoutes` and legacy `/cakes` and `/bakes` redirects functionally intact.
- Preserve the existing catalogue object shape. Do not delete non-featured product records.
- Cakes and Something Fresh use only `https://au.verygood-chocolate.com/cakes` through `AU_LINKS.booking.cakes`.
- No unsupported Sydney availability or tea health claims. Do not create product imagery.
- Keep Work Sans, local AU logo, editorial layout, keyboard support, reduced-motion support, and the existing visual component system.
- Do not deploy, push, or merge `main`.

## File Structure

- `src/config/auSiteContent.js`: Public labels, navigation order, Home section copy and single-source external destinations.
- `src/data/auCatalog.js`: Existing category metadata plus public display names; no removal of existing records.
- `src/utils/auCatalog.js`: Public-release filtering layered on top of the existing full catalogue functions.
- `src/components/au/AuHeader.jsx`, `AuMobileMenu.jsx`, `AuFooter.jsx`: Shared public navigation names; About stays in the footer only.
- `src/pages/au/AuHomePage.jsx`: Cakes and Something Fresh booking sections followed by internal category navigation.
- `src/pages/au/AuCategoryPage.jsx`, `AuProductPage.jsx`: Shared presentation that uses public category titles and public-release products.
- `src/styles/au-site.css`: Small shared responsive additions; no page-specific duplicate styling.
- `public/sitemap.xml`: Remove no-longer-public Chocolate detail URLs while retaining category and legacy redirect policy.
- `tests/au-*.test.mjs`: Behavioural contracts for public links, product exposure, Home ordering, navigation, localized labels and sitemap.

### Task 1: Lock the public-category contract

**Files:**
- Modify: `tests/au-content.test.mjs`, `tests/au-catalog.test.mjs`, `tests/au-home.test.mjs`, `tests/au-shell.test.mjs`, `tests/au-static-site.test.mjs`

**Interfaces:**
- Produces the expected public navigation IDs `cakes`, `something-fresh`, `chocolate`, `tea`, `goods`.
- Produces `getPublicAuProducts(category)` and `getPublicAuProduct(category, slug)` expectations without changing the underlying source catalogue contract.

- [ ] **Step 1: Write failing navigation and Home assertions**

  Assert that the rendered shell exposes `Cakes`, `Something Fresh`, `Chocolate`, `Cacao Tea`, `Choco in Life`, `Korea`, and `Book a Cake`; it must not expose `About` in the Header or any Kids Classes URL. Assert that Home contains a booking-led Cakes section, a booking-led Something Fresh section, then the three internal category names.

- [ ] **Step 2: Write failing catalogue-release assertions**

  Assert that the public Chocolate names are `Almond Chocolate`, `Strawberry Bonbon`, `Eiffel Chocolate`, and `S'mores Stick`; Tea names are all four existing blends; Ruby Berry Chocoball and Matcha Berry are absent from `getPublicAuProducts('chocolate')` while still present in `AU_PRODUCTS`.

- [ ] **Step 3: Write failing static SEO assertions**

  Assert that the sitemap no longer includes the Ruby Berry or Matcha Berry product detail URLs and still includes all four Tea details and the Hogeori keyring detail.

- [ ] **Step 4: Run the focused tests and confirm the expected RED state**

  Run: `node --test tests/au-content.test.mjs tests/au-catalog.test.mjs tests/au-home.test.mjs tests/au-shell.test.mjs tests/au-static-site.test.mjs`

  Expected: FAIL because the current public taxonomy still has About, Tea, Goods and the old Chocolate release set.

### Task 2: Define public release metadata without deleting source catalogue data

**Files:**
- Modify: `src/data/auCatalog.js`, `src/utils/auCatalog.js`, `src/config/auLinks.js`
- Test: `tests/au-catalog.test.mjs`, `tests/au-links.test.mjs`

**Interfaces:**
- `getPublicAuProducts(category)` returns published, curated AU product records in public order.
- `getPublicAuProduct(category, slug)` returns only a product that belongs to the category's public release.
- `AU_LINKS.booking.cakes` remains the single destination for both `cakes` and `something-fresh` public category CTAs.

- [ ] **Step 1: Add the minimal public-release selector**

  Add an immutable category-to-product-ID map to `auCatalog.js`. It selects Almond Chocolate, Strawberry Bonbon, Eiffel Chocolate and S'mores Stick for Chocolate; all four existing teas for Tea; and the Hogeori keyring for Goods. Keep all existing product objects and their fields.

- [ ] **Step 2: Add only verified public product records/assets**

  Use the existing Almond and Strawberry source records. Add Eiffel Chocolate using the existing booking-app source image `../au-cake-clone/src/assets/eiffel-chocolate-card.jpg`, copied into this worktree's `public/assets/booking/` without changing its source repository. Leave S'mores Stick as an image-free, confirmed-name-only catalogue entry until a real image is supplied; the UI must render it without a placeholder product image, price, availability claim, or fake description.

- [ ] **Step 3: Implement public catalogue query helpers**

  Add public-release helpers that filter first by `status === 'published'`, then by the public-release selector. Retain `getPublishedAuProducts`, `getAuProduct`, and `getRelatedAuProducts` for the complete source catalogue to avoid a data-model migration.

- [ ] **Step 4: Run focused catalogue and link tests**

  Run: `node --test tests/au-catalog.test.mjs tests/au-links.test.mjs`

  Expected: PASS, including the no-price and Tea claim checks.

- [ ] **Step 5: Commit the independently testable source-data boundary**

  Run:

  ```bash
  git add src/data/auCatalog.js src/utils/auCatalog.js src/config/auLinks.js public/assets/booking/eiffel-chocolate-card.jpg tests/au-catalog.test.mjs tests/au-links.test.mjs
  git commit -m "feat: curate AU public catalogue releases"
  ```

### Task 3: Apply the final shared navigation and category language

**Files:**
- Modify: `src/config/auSiteContent.js`, `src/components/au/AuHeader.jsx`, `src/components/au/AuMobileMenu.jsx`, `src/components/au/AuFooter.jsx`, `src/components/au/AuNavigationLink.jsx`
- Test: `tests/au-content.test.mjs`, `tests/au-shell.test.mjs`

**Interfaces:**
- Header navigation is exactly the five requested category destinations.
- The Footer preserves About as a secondary internal link while reusing category navigation links.
- `something-fresh` is always an external link and can be redirected later by changing its `href` in the public content config.

- [ ] **Step 1: Implement English and Korean public labels**

  Change the shared navigation order to Cakes, Something Fresh, Chocolate, Cacao Tea, Choco in Life. Map both booking-led IDs to `AU_LINKS.booking.cakes`, keep Chocolate/Tea/Goods internal, and map their visible page names to Verygood Chocolate, Cacao Tea and Choco in Life.

- [ ] **Step 2: Keep About discoverable outside primary navigation**

  Add a secondary About link to the Footer Explore group. Do not add it back to desktop or mobile primary navigation.

- [ ] **Step 3: Run focused shell/content tests**

  Run: `node --test tests/au-content.test.mjs tests/au-shell.test.mjs`

  Expected: PASS; Header and mobile shared navigation have no classes URL, cart, checkout, admin or legacy Bakes item.

- [ ] **Step 4: Commit shared navigation**

  ```bash
  git add src/config/auSiteContent.js src/components/au/AuHeader.jsx src/components/au/AuMobileMenu.jsx src/components/au/AuFooter.jsx src/components/au/AuNavigationLink.jsx tests/au-content.test.mjs tests/au-shell.test.mjs
  git commit -m "feat: align AU public category navigation"
  ```

### Task 4: Reorder Home with booking-led Cakes and Something Fresh sections

**Files:**
- Modify: `src/config/auSiteContent.js`, `src/pages/au/AuHomePage.jsx`, `src/styles/au-site.css`
- Test: `tests/au-home.test.mjs`

**Interfaces:**
- `coreExperiences` is an ordered pair: `cakes`, `something-fresh`.
- Each entry uses `AU_LINKS.booking.cakes` and can carry a compact factual product-variant list.
- Internal Home categories are Chocolate, Tea and Goods only, rendered in that order.

- [ ] **Step 1: Replace the old Cakes & Bakes Home copy with public category copy**

  Render a Verygood Chocolate Cakes booking section containing only the supplied product-family and variation labels. Render Something Fresh after it with the `STH FRESH` secondary label, Lemon Cake pack sizes, and Brownie Cheesecake. Both CTA labels point to the same central booking URL.

- [ ] **Step 2: Rename and order the internal category cards**

  Keep the existing editorial mosaic and images. Update the labels and descriptions to Verygood Chocolate, Cacao Tea and Choco in Life, retaining their internal route IDs and not creating new Goods imagery.

- [ ] **Step 3: Make the existing shared experience/card styling work at 1440px and 390px**

  Add only common `.au-experience__list` and two-section grid rules. On small screens the sections and their product labels stack without horizontal overflow; the map remains one-column and its product images retain `object-fit: cover`.

- [ ] **Step 4: Run the focused Home test**

  Run: `node --test tests/au-home.test.mjs`

  Expected: PASS, including direct booking links, no class destination, no internal Cakes/Bakes route, no commerce controls and the required section order.

- [ ] **Step 5: Commit the Home restructuring**

  ```bash
  git add src/config/auSiteContent.js src/pages/au/AuHomePage.jsx src/styles/au-site.css tests/au-home.test.mjs
  git commit -m "feat: restructure AU home categories"
  ```

### Task 5: Apply public catalogue titles and public-release filtering to shared pages

**Files:**
- Modify: `src/pages/au/AuCategoryPage.jsx`, `src/pages/au/AuProductPage.jsx`, `src/components/au/AuProductCard.jsx`, `src/styles/au-site.css`, `public/sitemap.xml`
- Test: `tests/au-catalogue-pages.test.mjs`, `tests/au-static-site.test.mjs`, `tests/au-seo.test.mjs`

**Interfaces:**
- Category pages use `getPublicAuProducts(category)` and public visible category copy.
- Product detail routes only render for an item selected by the public-release map; unknown and non-featured records use the existing AU not-found treatment.
- `AuProductCard` does not create a fake visual when media is absent.

- [ ] **Step 1: Change category pages to use public category titles and filters**

  Preserve `/chocolate`, `/tea`, `/goods`, `/ko/chocolate`, `/ko/tea`, `/ko/goods`. Change their public H1 and metadata copy to Verygood Chocolate, Cacao Tea and Choco in Life; retain all Tea aroma/flavour/ingredient copy.

- [ ] **Step 2: Adapt product detail labels and related products**

  Use the same localized category title in breadcrumbs, category kickers and related headings. Use public-release lookup for direct paths and related cards so Ruby Berry and Matcha Berry are not publicly surfaced.

- [ ] **Step 3: Render assetless confirmed entries honestly**

  When a catalogue item has no `media.card`, render a text-only catalogue item without a synthetic `VG` visual, stock status, shopping control, or detail-page link. It remains a named release-list entry rather than a fabricated product card.

- [ ] **Step 4: Trim the sitemap only to current public internal product detail pages**

  Remove Ruby Berry and Matcha Berry English/Korean URLs. Do not add any booking-led Cakes or Something Fresh pages and keep Tea and Hogeori detail URLs that still have public internal detail pages.

- [ ] **Step 5: Run focused page, SEO and static-site tests**

  Run: `node --test tests/au-catalogue-pages.test.mjs tests/au-static-site.test.mjs tests/au-seo.test.mjs`

  Expected: PASS with no public ecommerce controls or medical Tea claims.

- [ ] **Step 6: Commit the shared catalogue presentation change**

  ```bash
  git add src/pages/au/AuCategoryPage.jsx src/pages/au/AuProductPage.jsx src/components/au/AuProductCard.jsx src/styles/au-site.css public/sitemap.xml tests/au-catalogue-pages.test.mjs tests/au-static-site.test.mjs tests/au-seo.test.mjs
  git commit -m "feat: present AU public category collections"
  ```

### Task 6: Run complete regression and visual QA

**Files:**
- Modify only if observations identify a shared responsive defect: `src/styles/au-site.css`
- Update: `docs/au-release-qa.md`

- [ ] **Step 1: Run the full automated suite**

  Run: `npm test`

  Expected: every Node test passes.

- [ ] **Step 2: Run quality gates**

  Run:

  ```bash
  npm run lint
  npm run build
  ```

  Expected: both exit with code 0.

- [ ] **Step 3: Inspect local pages at 1440px**

  Check Header order, Cakes and Something Fresh CTAs, three internal category cards, Cacao Tea and Choco in Life labels, product visibility, Korea link and no unexpected card clipping.

- [ ] **Step 4: Inspect local pages at 390px**

  Check Header and mobile menu fit, booking CTA tap targets, two booking-led sections, category card layout, no horizontal overflow, keyboard focus visibility and reduced-motion ticker behaviour.

- [ ] **Step 5: Record QA and commit only if the record or a shared fix changes**

  ```bash
  git add docs/au-release-qa.md src/styles/au-site.css
  git commit -m "test: verify AU category restructure"
  ```

## Self-Review

- Public Cakes and Something Fresh always use the exact existing AU booking URL and have no internal category route.
- The original catalogue schema and non-featured source records are retained; public visibility is a separate filter.
- The one verified Eiffel image is copied into this worktree only. S'mores receives no generated or substitute image.
- Header primary navigation contains exactly five category destinations, Korea and Book a Cake; About is moved to Footer only.
- `/cakes` and `/bakes` redirects and `/ko` routing survive unchanged.
- Sitemap only contains internal public categories/details, not booking pages or non-featured products.
- No reservation code, SEO framework rewrite, Cart/Checkout, health claims or deployment activity is introduced.
