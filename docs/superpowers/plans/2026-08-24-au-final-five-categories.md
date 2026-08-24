# AU final five-category structure

## Scope

Reshape only the public AU brand home and its existing shared catalogue data in
this worktree. Keep the AU booking service, Appwrite, legacy cake redirects,
and existing English/Korean route structure independent.

## Implementation steps

1. Add contract tests for the five public categories, exact AU product URLs,
   local image paths, and the absence of Tea from Home and primary navigation.
2. Download and validate the seven current AU product images into local public
   assets; never reference the live image URLs in rendered markup.
3. Centralise the new product links and Home card data. Replace the old Cakes
   collection with `whole-cakes`, `daily`, and `something-fresh`, while keeping
   the existing Tea records and direct routes intact but unlinked publicly.
4. Reuse `AuBookingProductCard` for all three cake sections so image, name,
   and CTA share one same-window booking destination. Rework the Home and
   header/footer navigation around the five final public categories.
5. Limit the internal Chocolate page to its five requested public products,
   represent unavailable media with the existing graceful placeholder path,
   and rename the public Goods copy without inventing products.
6. Apply only the grid and responsive CSS necessary for 3/2/2 product rows and
   a two-card home collection area. Update the Home SEO wording minimally.
7. Inspect 1440px and 390px locally, verify exact rendered links, then run
   `npm test`, `npm run lint`, and `npm run build`. Commit small coherent
   changes only; do not push, deploy, or merge.

## Verification

- Header and mobile menu: Whole Cakes, Daily, Something Fresh, Chocolate,
  Goods, Korea, Book a Cake.
- All seven booking product targets are the exact AU detail URLs supplied by
  Jenny, and card image/name/CTA targets are identical.
- Home features Strawberry Bonbon for Chocolate, has no Tea or Kids Classes,
  does not expose commerce controls, and stays free of body-level horizontal
  overflow at 390px.
