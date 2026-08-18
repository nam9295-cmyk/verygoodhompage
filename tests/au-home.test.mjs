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
  assert.match(html, /\/assets\/booking\/pave-chocolate-cake-sydney\.webp/)
  assert.match(html, /\/assets\/booking\/chocolate-pound-cake-sydney\.webp/)
  assert.doesNotMatch(html, /href="\/(?:cakes|bakes)"/)
  assert.doesNotMatch(html, /https:\/\/au\.verygood-chocolate\.com\/classes/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/reviews/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/lookup/)
  assert.equal(/Add to Cart|Checkout|Cart|Quantity|\$\d/.test(html), false)
})

test('AU home product cards use their matching booking detail pages in the current tab', async (t) => {
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
    ['Signature Pave Cake', 'https://au.verygood-chocolate.com/cakes/pave-chocolate-cake'],
    ['Chocolate Pound Cake', 'https://au.verygood-chocolate.com/cakes/chocolate-pound-cake-and-cupcakes'],
    ['Chocolate Cupcakes', 'https://au.verygood-chocolate.com/cakes/chocolate-pound-cake-and-cupcakes'],
    ['Whole Cake', 'https://au.verygood-chocolate.com/cakes/vanilla-fresh-cream-cake'],
    ['Lunchbox Cake', 'https://au.verygood-chocolate.com/cakes'],
    ['Lemon Cake', 'https://au.verygood-chocolate.com/cakes/lemon-cake'],
    ['Brownie Cheesecake', 'https://au.verygood-chocolate.com/cakes'],
  ]

  for (const [name, href] of expectedCards) {
    const cardPattern = new RegExp(
      `<a class="au-booking-product-card" href="${escapeForRegExp(href)}"[^>]*>[\\s\\S]*?<h3>${escapeForRegExp(name)}</h3>[\\s\\S]*?<span class="au-booking-product-card__cta">View &amp; Book</span>[\\s\\S]*?</a>`,
    )
    const card = html.match(cardPattern)

    assert.ok(card, `${name} should expose one complete booking product card`)
    assert.doesNotMatch(card[0], /target="_blank"/)
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
  ]

  for (const imagePath of bookingImagePaths) {
    assert.ok(existsSync(resolve('public', `.${imagePath}`)), `${imagePath} should ship with the AU home`)
  }

  assert.match(html, /\/assets\/booking\/vanilla-cake-sydney\.webp/)
  assert.match(html, /\/assets\/booking\/lemon-cake-sydney\.webp/)
})
