import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import { AU_LEGACY_PRODUCT_TARGETS, AU_PRODUCTS } from '../src/data/auCatalog.js'
import { getPublicAuProduct, getPublicAuProducts } from '../src/utils/auCatalog.js'

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

test('AU public catalogue restores the confirmed chocolate, tea and goods releases', () => {
  assert.deepEqual(
    getPublicAuProducts('chocolate').map((product) => product.copy.en.name),
    ['Almond Chocolate', 'Strawberry Bonbon', 'Eiffel Tower Chocolate', 'Pave Chocolate', "S'mores Stick"],
  )
  assert.deepEqual(
    getPublicAuProducts('tea').map((product) => product.copy.en.name),
    ['British Black', 'Asian Gold', 'Hibiscus Fruit', 'Minty Chocolat'],
  )
  assert.deepEqual(
    getPublicAuProducts('goods').map((product) => product.copy.en.name),
    ['Gift 2 Set', 'Gift 4 Set', 'Hogeori Keyring', 'Horse Keyring'],
  )
})

test('restored catalogue data describes details without commerce or health claims', () => {
  const almond = getPublicAuProduct('chocolate', 'almond-chocoball')
  const strawberry = getPublicAuProduct('chocolate', 'strawberry-bonbon')
  const british = getPublicAuProduct('tea', 'british-black')
  const gift = getPublicAuProduct('goods', 'gift-2-set')

  assert.deepEqual(almond.detail.flavorProfile.map((item) => item.label), ['Crunchiness', 'Nutty', 'Bitterness', 'Sweetness', 'Aftertaste'])
  assert.deepEqual(almond.detail.featureIcons.map((item) => item.label), ['Roasting', 'High Cacao', 'Crunchy'])
  assert.deepEqual(strawberry.detail.featureIcons.map((item) => item.label), ['Freeze-Dried', 'Real Fruit Inside', 'Creamy White Chocolate', 'Crunchy Texture'])
  assert.equal(british.detailSections.some((section) => section.label === 'Blend story'), true)
  assert.equal(british.detailSections.some((section) => section.label === 'Aroma'), true)
  assert.equal(british.detailSections.some((section) => section.label === 'Tea base'), true)
  assert.equal(gift.copy.en.name, 'Gift 2 Set')

  const publicContent = JSON.stringify(AU_PRODUCTS)
  assert.equal(/price|quantity|add to cart|checkout|respiratory care|antiviral|liver detox|body fat reduction|headache relief|carbohydrate blocking/i.test(publicContent), false)
})

test('restored detail pages use the shared AU detail system with galleries and safe placeholders', async () => {
  const [almond, strawberry, british, gift, pave, unknown] = await Promise.all([
    renderRoute('/chocolate/almond-chocoball'),
    renderRoute('/chocolate/strawberry-bonbon'),
    renderRoute('/tea/british-black'),
    renderRoute('/goods/gift-2-set'),
    renderRoute('/chocolate/pave-chocolate'),
    renderRoute('/goods/not-a-product'),
  ])

  assert.match(almond, /Sensory Profile/)
  assert.match(almond, /Crunchiness/)
  assert.match(almond, /Roasting/)
  assert.match(almond, /High Cacao/)
  assert.match(strawberry, /Real Fruit Inside/)
  assert.match(british, /Blend story/)
  assert.match(british, /Aroma/)
  assert.match(british, /Tea base/)
  assert.match(british, /loading="lazy"/)
  assert.match(gift, /Gift 2 Set/)
  assert.match(gift, /signature triangular box/)
  assert.match(pave, /Image coming soon/)
  assert.match(pave, /More Verygood Chocolate to explore/)
  assert.match(unknown, /This product is not part of the AU catalogue\./)

  for (const page of [almond, strawberry, british, gift, pave]) {
    assert.doesNotMatch(page, /Add to Cart|Checkout|Quantity|\$\d/)
  }
})

test('restored local product assets exclude the legacy health-claim artwork', () => {
  const restoredAssets = [
    'public/assets/au/chocolate/almond-chocolate/almond.png',
    'public/assets/au/chocolate/almond-chocolate/almond_pop.webp',
    'public/assets/au/chocolate/strawberry-bonbon/straw.png',
    'public/assets/au/chocolate/strawberry-bonbon/bonbon_pop.webp',
    'public/assets/au/tea/british-black/british_cup.webp',
    'public/assets/au/tea/british-black/british_pop.webp',
    'public/assets/au/tea/asian-gold/asian_cup.webp',
    'public/assets/au/tea/hibiscus-fruit/hibis_cup.webp',
    'public/assets/au/tea/minty-chocolat/minty_cup.webp',
    'public/assets/au/goods/gift-2-set.png',
    'public/assets/au/goods/gift-4-set.png',
    'public/assets/au/goods/hogeori-keyring.png',
    'public/assets/au/goods/horse-keyring.png',
  ]
  const excludedHealthAssets = [
    'public/assets/products/almond-nutrition.png',
    'public/assets/products/british-black/antiviral_b.svg',
    'public/assets/products/british-black/dust_b.svg',
    'public/assets/products/british-black/immune_b.svg',
    'public/assets/products/british-black/respiratory_b.svg',
    'public/assets/products/asian-gold/imflammation_a.svg',
    'public/assets/products/asian-gold/neutral_a.svg',
    'public/assets/products/asian-gold/recovery_a.svg',
    'public/assets/products/asian-gold/skin_a.svg',
    'public/assets/products/hibiscus-fruit/carbohydrate_h.svg',
    'public/assets/products/hibiscus-fruit/liver_h.svg',
    'public/assets/products/hibiscus-fruit/stomach_h.svg',
    'public/assets/products/hibiscus-fruit/swelling_h.svg',
    'public/assets/products/minty-chocolat/body_m.svg',
    'public/assets/products/minty-chocolat/digestive_m.svg',
    'public/assets/products/minty-chocolat/headache_m.svg',
    'public/assets/products/minty-chocolat/relaxation_m.svg',
  ]

  for (const asset of restoredAssets) assert.equal(existsSync(asset), true, asset)
  for (const asset of excludedHealthAssets) assert.equal(existsSync(asset), false, asset)
})

test('legacy product URLs resolve only to their current AU catalogue destinations', () => {
  const expectedMappings = {
    'almond-chocoball': ['chocolate', 'almond-chocoball'],
    'strawberry-bonbon': ['chocolate', 'strawberry-bonbon'],
    'british-black': ['tea', 'british-black'],
    'asian-gold': ['tea', 'asian-gold'],
    'hibiscus-fruit': ['tea', 'hibiscus-fruit'],
    'minty-chocolat': ['tea', 'minty-chocolat'],
    'gift-2-set': ['goods', 'gift-2-set'],
    'gift-4-set': ['goods', 'gift-4-set'],
    'hogirl-key-ring': ['goods', 'hogeori-keyring'],
    'horse-key-ring': ['goods', 'horse-keyring'],
  }

  for (const [legacySlug, destination] of Object.entries(expectedMappings)) {
    assert.deepEqual(AU_LEGACY_PRODUCT_TARGETS[legacySlug], destination)
  }
  assert.equal(AU_LEGACY_PRODUCT_TARGETS['not-a-product'], undefined)
})
