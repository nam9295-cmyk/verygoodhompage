# Verygood Chocolate brand website

The bilingual brand hub at https://verygood-chocolate.com introduces Verygood Chocolate and connects visitors to its official local websites:

- Sydney products, AUD prices, reservations and pickup: https://au.verygood-chocolate.com
- Korea store, menus and news: https://kr.verygood-chocolate.com
- Korea cake reservations and custom cakes: https://cake.verygood-chocolate.com

The root website presents the brand story and Sydney collection. Local websites remain the source for current availability, prices, booking dates and pickup policies.

## Development and validation

```sh
npm run dev
npm test
npm run lint
npm run build
```

`npm test` includes a production-build integration test. `npm run build` runs Vite and then `scripts/prerender.mjs`, generating complete HTML for both languages and the preserved collection archives. No runtime SSR server is required.

## Search and deployment

- `/`, `/ko`, `/about`, `/ko/about` are indexable and included in `public/sitemap.xml`.
- Earlier `/chocolate`, `/tea` and `/goods` collections and details remain accessible as `noindex, follow` brand archives. They are not the current AU store.
- Build-time HTML and client navigation use the same metadata in `src/utils/auSeo.js` and `src/config/brandSite.js`.
- Language alternates connect equivalent root-domain translations. Regional shops are linked as official destinations, not declared as translated duplicates.
- `Organization` and `WebSite` schema identify the brand and local websites. Product offers remain on the appropriate local shop.
- `public/llms.txt` describes the same responsibilities without duplicating local prices or pickup hours.
- Preserve real modification dates when updating `public/sitemap.xml`.

Deploy the **complete `dist/` directory** to Cloudflare Pages, using **`npm run build`** as the build command. The prerender step is required. The output includes `404.html` and legacy product redirects. Do not restore a universal `/* /index.html 200` rewrite: Cloudflare must serve genuine 404 responses for missing URLs.

Vite's preview server does not reproduce all Cloudflare routing behavior. To check extensionless routes, redirects and HTTP status codes locally:

```sh
npx wrangler pages dev dist --ip 127.0.0.1 --port 4192
```

See [the brand hub SEO release note](docs/2026-10-17-brand-hub-seo.md) for scope, checks and the deployment handoff.
