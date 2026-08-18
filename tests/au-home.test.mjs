import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

function escapeForRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

test('AU home prioritizes Cakes and Something Fresh before the three internal catalogues', async (t) => {
  const server = await createServer({
    appType: 'custom',
    server: { middlewareMode: true, ws: false },
  })
  t.after(() => server.close())

  const { default: AuHomePage } = await server.ssrLoadModule('/src/pages/au/AuHomePage.jsx')
  const html = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: ['/'] },
      createElement(AuHomePage, { locale: 'en' }),
    ),
  )

  assert.match(html, /BORN IN DAEGU · GROWING IN SYDNEY/)
  assert.match(html, /Chocolate makes every day verygood\./)
  assert.match(html, /Book a Cake/)
  assert.doesNotMatch(html, /Kids cake classes|Explore classes|Private kids cake classes/i)

  assert.match(html, /Verygood Chocolate Cakes/)
  assert.match(html, /Something Fresh/)
  assert.match(html, /Signature Pave Cake/)
  assert.match(html, /Brownie Cheesecake/)

  for (const label of ['Verygood Chocolate', 'Cacao Tea', 'Choco in Life']) {
    assert.match(html, new RegExp(label))
  }

  assert.ok(html.indexOf('Verygood Chocolate Cakes') < html.indexOf('Something Fresh'))
  assert.ok(html.indexOf('Something Fresh') < html.indexOf('Cacao Tea'))

  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/cakes/)
  assert.match(html, /\/assets\/booking\/cutouts\/pave-side\.webp/)
  assert.match(html, /\/assets\/booking\/cutouts\/pound-side\.webp/)
  assert.doesNotMatch(html, /href="\/(?:cakes|bakes)"/)
  assert.doesNotMatch(html, /https:\/\/au\.verygood-chocolate\.com\/classes/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/reviews/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/lookup/)
  assert.equal(/Add to Cart|Checkout|Cart|Quantity|\$\d/.test(html), false)
})

test('AU home opens with an image-led brand hero and keeps cake booking as its primary action', async (t) => {
  const server = await createServer({
    appType: 'custom',
    server: { middlewareMode: true, ws: false },
  })
  t.after(() => server.close())

  const { default: AuHomePage } = await server.ssrLoadModule('/src/pages/au/AuHomePage.jsx')
  const html = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: ['/'] },
      createElement(AuHomePage, { locale: 'en' }),
    ),
  )

  const hero = html.match(/<section class="au-hero au-hero--image-led">[\s\S]*?<\/section>/)?.[0]

  assert.ok(hero, 'the home should render the image-led hero treatment')
  assert.match(hero, /<img src="\/assets\/main\.png" alt="" aria-hidden="true"/)
  assert.match(hero, /<h1>Chocolate makes every day verygood\.<\/h1>/)
  assert.match(hero, /class="au-hero__content au-shell"/)
  assert.match(hero, /href="https:\/\/au\.verygood-chocolate\.com\/cakes"/)
  assert.ok(hero.indexOf('Book a Cake') < hero.indexOf('Explore products'))
})

test('AU home product cards open a quick view while their View & Book links keep the matching AU destinations', async (t) => {
  const server = await createServer({
    appType: 'custom',
    server: { middlewareMode: true, ws: false },
  })
  t.after(() => server.close())

  const { default: AuHomePage } = await server.ssrLoadModule('/src/pages/au/AuHomePage.jsx')
  const html = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: ['/'] },
      createElement(AuHomePage, { locale: 'en' }),
    ),
  )

  const expectedCards = [
    ['Signature Pave Cake', 'https://au.verygood-chocolate.com/cakes/pave-chocolate-cake', '/assets/booking/cutouts/pave-side.webp'],
    ['Chocolate Pound Cake', 'https://au.verygood-chocolate.com/cakes/chocolate-pound-cake-and-cupcakes', '/assets/booking/cutouts/pound-side.webp'],
    ['Chocolate Cupcakes', 'https://au.verygood-chocolate.com/cakes/chocolate-pound-cake-and-cupcakes', '/assets/booking/cutouts/cupcake-side.webp'],
    ['Whole Cake', 'https://au.verygood-chocolate.com/cakes/vanilla-fresh-cream-cake', '/assets/booking/vanilla-cake-sydney.webp'],
    ['Lunchbox Cake', 'https://au.verygood-chocolate.com/cakes'],
    ['Lemon Cake', 'https://au.verygood-chocolate.com/cakes/lemon-cake', '/assets/booking/cutouts/lemoncake-side.webp'],
    ['Brownie Cheesecake', 'https://au.verygood-chocolate.com/cakes'],
  ]

  for (const [name, href, imagePath] of expectedCards) {
    const cardPattern = new RegExp(
      `<article class="au-booking-product-card">[\\s\\S]*?<button class="au-booking-product-card__trigger" type="button" aria-haspopup="dialog">[\\s\\S]*?<h3>${escapeForRegExp(name)}</h3>[\\s\\S]*?</button>[\\s\\S]*?<a class="au-booking-product-card__cta" href="${escapeForRegExp(href)}">View &amp; Book</a>[\\s\\S]*?</article>`,
    )
    const card = html.match(cardPattern)

    assert.ok(card, `${name} should expose one quick-view card and one matching booking link`)
    assert.doesNotMatch(card[0], /target="_blank"/)
    if (imagePath) assert.match(card[0], new RegExp(`src="${escapeForRegExp(imagePath)}"`))
  }

  assert.match(html, /Lunchbox Cake[\s\S]*?Image coming soon/)
})

test('AU home uses local copies of the current AU cake catalogue imagery', async (t) => {
  const server = await createServer({
    appType: 'custom',
    server: { middlewareMode: true, ws: false },
  })
  t.after(() => server.close())

  const { default: AuHomePage } = await server.ssrLoadModule('/src/pages/au/AuHomePage.jsx')
  const html = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: ['/'] },
      createElement(AuHomePage, { locale: 'en' }),
    ),
  )

  const bookingImagePaths = [
    '/assets/booking/pave-chocolate-cake-sydney.webp',
    '/assets/booking/chocolate-pound-cake-sydney.webp',
    '/assets/booking/chocolate-cupcakes-sydney.webp',
    '/assets/booking/vanilla-cake-sydney.webp',
    '/assets/booking/lemon-cake-sydney.webp',
    '/assets/booking/chocolatiers-basque-cheesecake-sydney.webp',
    '/assets/booking/cutouts/pave-side.webp',
    '/assets/booking/cutouts/pound-side.webp',
    '/assets/booking/cutouts/cupcake-side.webp',
    '/assets/booking/cutouts/lemoncake-side.webp',
    '/assets/booking/cutouts/basquecheesecake-side.webp',
    '/assets/booking/details/pave-chocolate-cake-quick-view.webp',
    '/assets/booking/details/chocolate-pound-cake-quick-view.webp',
    '/assets/booking/details/vanilla-cake-quick-view.webp',
    '/assets/booking/details/lemon-cake-quick-view.webp',
    '/assets/booking/details/chocolatiers-basque-cheesecake-quick-view.webp',
  ]

  for (const imagePath of bookingImagePaths) {
    assert.ok(existsSync(resolve('public', `.${imagePath}`)), `${imagePath} should ship with the AU home`)
  }

  assert.match(html, /\/assets\/booking\/vanilla-cake-sydney\.webp/)
  assert.match(html, /\/assets\/booking\/cutouts\/lemoncake-side\.webp/)
})
