import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

async function renderRoute(pathname) {
  const server = await createServer({
    appType: 'custom',
    server: { middlewareMode: true, ws: false },
  })
  const [{ default: AuAppRoutes }, { HelmetProvider }] = await Promise.all([
    server.ssrLoadModule('/src/AuAppRoutes.jsx'),
    server.ssrLoadModule('react-helmet-async'),
  ])
  const helmetContext = {}
  const html = renderToStaticMarkup(
    createElement(
      HelmetProvider,
      { context: helmetContext },
      createElement(MemoryRouter, { initialEntries: [pathname] }, createElement(AuAppRoutes)),
    ),
  )
  await server.close()
  return html
}

test('about and legacy cake routes carry the Daegu-to-Sydney story and exact booking destination', async () => {
  const [about, cakes, bakes] = await Promise.all([renderRoute('/about'), renderRoute('/cakes'), renderRoute('/bakes')])

  assert.match(about, /Born in Daegu\. Growing in Sydney\./)
  assert.match(about, /Melrose Park pickup/)
  for (const page of [cakes, bakes]) {
    assert.match(page, /Taking you to cake bookings\./)
    assert.match(page, /https:\/\/au\.verygood-chocolate\.com\/cakes/)
    assert.doesNotMatch(page, /Pave Chocolate Cake|View &amp; Book|Add to Cart|Checkout|Quantity|\$\d/)
  }
})

test('catalogue detail pages show product context, availability and related products without commerce controls', async () => {
  const detail = await renderRoute('/tea/british-black')

  assert.match(detail, /British Black/)
  assert.match(detail, /Cacao nib, Earl Grey and cornflower/)
  assert.match(detail, /Sydney release not announced/)
  assert.match(detail, /More Cacao Tea to explore/)
  assert.doesNotMatch(detail, /Add to Cart|Checkout|Quantity|\$\d/)
})

test('public category pages show only the curated releases with their final category names', async () => {
  const chocolate = await renderRoute('/chocolate')
  const hiddenDetail = await renderRoute('/chocolate/ruby-berry-chocoball')

  assert.match(chocolate, /Verygood Chocolate/)
  assert.match(chocolate, /Almond Chocolate/)
  assert.match(chocolate, /Strawberry Bonbon/)
  assert.match(chocolate, /Eiffel Chocolate/)
  assert.match(chocolate, /S&#x27;mores Stick/)
  assert.doesNotMatch(chocolate, /Ruby Berry Chocoball|Matcha Berry/)
  assert.doesNotMatch(chocolate, /au-product-card__mark/)
  assert.match(chocolate, /au-product-card au-product-card--text-only[^>]*><div class="au-product-card__body"><h2>S&#x27;mores Stick<\/h2>/)
  assert.doesNotMatch(chocolate, /au-product-card au-product-card--text-only[^>]*><div class="au-product-card__visual">/)
  assert.match(hiddenDetail, /This product is not part of the AU catalogue\./)
})

test('Korean catalogue routes retain their localized product content', async () => {
  const tea = await renderRoute('/ko/tea')

  assert.match(tea, /카카오 티/)
  assert.match(tea, /브리티시 블랙/)
  assert.doesNotMatch(tea, /Four blends, four moods\./)
})
