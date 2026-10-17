# Verygood Chocolate brand hub SEO — 2026-10-17

## Approved direction

Keep verygood-chocolate.com as the bilingual brand hub for Korea and Australia. The Sydney online shop is authoritative for Australian products, AUD prices, availability, reservations and pickup. The Korean website provides store information; the Korean cake site handles Daegu cake reservations.

## Implementation

- Brand-led English/Korean titles and descriptions; root language `en`, Korean translation `ko`.
- A single route-aware metadata owner for canonical, robots, equivalent-language alternates, Open Graph and Twitter cards. Root translations use `en`, `ko` and `x-default`; regional shops are not incorrectly advertised as translated copies.
- `Organization` and `WebSite` JSON-LD describe the brand and the three official local websites. No AU product offers or invented local-business address are published on the hub.
- Sydney mochi photography, responsive title placement, current menu cards and booking links are retained. The banner refers readers to AU for current booking dates and pickup details instead of repeating conflicting dates/hours.
- A visible official-site directory links Sydney, Korea and Korean cake reservations. The Sydney reservation lookup remains accessible.
- Existing chocolate, tea and goods pages are retained as `noindex, follow` archives with a visible explanation and local-site links. They are excluded from the sitemap; historic URLs are not redirected to unrelated current products.
- The sitemap contains only English/Korean home and about pages, with actual modification dates. `llms.txt` is rewritten around the brand and local official sources; old KRW prices, unsupported claims and broken legacy page references are removed.
- The Vite build is followed by static prerendering. All 36 brand/archive routes receive initial HTML with their real body, language, metadata and social cards. A top-level `404.html` and applicable legacy product redirects are generated.
- Cloudflare Pages' universal 200 rewrite is removed so unknown URLs receive real 404 responses. Published legacy product aliases receive server-side 301 redirects to their retained archive pages.

## Validation

- New build integration tests first failed against the previous production output, then passed against the implementation.
- Full automated suite: 44 tests passed, including the production build integration checks; ESLint and whitespace checks passed.
- Independent read-only code review found no merge blockers.
- Cloudflare Pages local runtime: existing English/Korean pages return 200, retained legacy product aliases return 301, and deleted/unknown URLs return 404.
- Browser checks across home/about/archive/redirect/error routes found one description and the expected canonical/robots settings, with no JavaScript or hydration errors. Expected 404 document requests were the only recorded console resource errors.
- English/Korean mobile checks at 390px and desktop at 1440px confirmed responsive mochi photos, 12 menu cards, official local-site links, no horizontal overflow, and a working mobile menu.
- English/Korean translation links are available in the footer. Client navigation refreshes page metadata and removes home-only schema from internal pages.

## Release status and handoff

Publication through GitHub `main` was approved on 2026-10-17. Cloudflare Pages automatically deploys after the push; verify production against the published commit using the checks below. The earlier mochi campaign was already deployed; earlier release documents describe that historical version.

Use `npm run build`, not `vite build` alone, and publish the complete `dist/` directory. Never drop the prerendered HTML, `404.html` or generated `_redirects`.

After publishing the root website, check `/`, `/ko`, `/about`, a preserved archive, an old product alias and an unknown URL. Verify metadata in the original HTTP response as well as after browser navigation. Re-submit the root sitemap and inspect the home/about URLs in Search Console. Check Australia-filtered branded queries and Google-selected canonical URLs separately; indexing and rankings are not immediate or guaranteed.

No changes to AU/Korean repositories, local booking data, payments, DNS or external search accounts are included.
