import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

function escapeForRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

test('AU home publishes the final five-category order without Tea or Kids Classes', async (t) => {
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

  assert.match(html, /SIGNATURE GÂTEAU AU CHOCOLAT/)
  assert.match(html, /Whole Cakes/)
  assert.match(html, /Daily/)
  assert.match(html, /Something Fresh/)
  assert.match(html, /Pave Chocolate Cake/)
  assert.match(html, /Vanilla Fresh Cream Cake/)
  assert.match(html, /Buttercream Cake/)
  assert.match(html, /Signature Gâteau au Chocolat/)
  assert.match(html, /Chocolate Cupcakes/)
  assert.match(html, /Lemon Cake/)
  assert.match(html, /Brownie Cheesecake/)

  for (const label of ['Verygood Chocolate', 'Goods']) {
    assert.match(html, new RegExp(label))
  }

  assert.doesNotMatch(html, /Cacao Tea|Choco in Life|British Black/)
  assert.ok(html.indexOf('id="whole-cakes"') < html.indexOf('id="daily"'))
  assert.ok(html.indexOf('id="daily"') < html.indexOf('id="something-fresh"'))
  assert.ok(html.indexOf('id="something-fresh"') < html.indexOf('id="chocolate"'))
  assert.ok(html.indexOf('id="chocolate"') < html.indexOf('id="goods"'))

  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/cakes/)
  assert.match(html, /\/assets\/au\/whole-cakes\/pave-chocolate-cake\.webp/)
  assert.match(html, /\/assets\/au\/daily\/signature-gateau-au-chocolat\.webp/)
  assert.doesNotMatch(html, /href="\/(?:cakes|bakes)"/)
  assert.doesNotMatch(html, /https:\/\/au\.verygood-chocolate\.com\/classes/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/reviews/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/lookup/)
  assert.equal(/Add to Cart|Checkout|Cart|Quantity|\$\d/.test(html), false)
})

test('AU home keeps Strawberry Bonbon as the Chocolate collection representative', async (t) => {
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

  const englishContent = (await server.ssrLoadModule('/src/config/auSiteContent.js')).getAuSiteContent('en')
  const koreanContent = (await server.ssrLoadModule('/src/config/auSiteContent.js')).getAuSiteContent('ko')

  for (const content of [englishContent, koreanContent]) {
    assert.equal(content.categories.find((category) => category.id === 'chocolate').image, '/assets/products/straw.png')
    assert.equal(content.categories.some((category) => category.id === 'tea'), false)
  }

  assert.match(html, /src="\/assets\/products\/straw\.png"/)
  assert.doesNotMatch(html, /src="\/assets\/products\/british_cup\.webp"/)
  assert.doesNotMatch(html, /<section class="au-spotlight">/)
})

test('AU collection cards use compact product-scale glass copy while home section headings stay forest green', async (t) => {
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
  const styles = readFileSync('src/styles/au-site.css', 'utf8')

  assert.equal((html.match(/class="au-category-card__copy"/g) ?? []).length, 2)
  assert.match(styles, /\.au-home > section h2\s*\{\s*color: var\(--au-forest\);/)
  assert.match(styles, /\.au-category-card__copy\s*\{[\s\S]*?width: min\(100%, 264px\);[\s\S]*?padding: 12px 14px;[\s\S]*?color: var\(--au-forest\);[\s\S]*?background: linear-gradient\(135deg, rgba\(255, 255, 255, 0\.56\)/)
  assert.match(styles, /\.au-category-card__copy::before\s*\{[\s\S]*?background: linear-gradient\(135deg,/)
  assert.match(styles, /\.au-category-card__copy > span\s*\{[\s\S]*?font-size: 20px;[\s\S]*?line-height: 1\.1;/)
  assert.match(styles, /\.au-category-card__copy > small\s*\{[\s\S]*?color: rgba\(22, 67, 52, 0\.9\);/)
  assert.match(styles, /@media \(max-width: 767px\) \{[\s\S]*?\.au-category-card\s*\{\s*padding: 0;[\s\S]*?\.au-category-card__copy\s*\{\s*width: min\(calc\(100% - 32px\), 264px\);\s*align-self: center;\s*margin-bottom: 16px;[\s\S]*?border-radius: 10px;[\s\S]*?\.au-category-card__copy > span\s*\{\s*font-size: 19px;/)
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

test('AU home product card image, name and CTA share each exact AU booking destination', async (t) => {
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
    ['Pave Chocolate Cake', 'https://au.verygood-chocolate.com/cakes/pave-chocolate-cake', '/assets/au/whole-cakes/pave-chocolate-cake.webp'],
    ['Vanilla Fresh Cream Cake', 'https://au.verygood-chocolate.com/cakes/vanilla-fresh-cream-cake', '/assets/au/whole-cakes/vanilla-fresh-cream-cake.webp'],
    ['Buttercream Cake', 'https://au.verygood-chocolate.com/cakes/buttercream-cake', '/assets/au/whole-cakes/buttercream-cake.webp'],
    ['Signature Gâteau au Chocolat', 'https://au.verygood-chocolate.com/cakes/signature-gateau-au-chocolat', '/assets/au/daily/signature-gateau-au-chocolat.webp'],
    ['Chocolate Cupcakes', 'https://au.verygood-chocolate.com/cakes/chocolate-cupcakes', '/assets/au/daily/chocolate-cupcakes.webp'],
    ['Lemon Cake', 'https://au.verygood-chocolate.com/cakes/lemon-cake', '/assets/au/something-fresh/lemon-cake.webp'],
    ['Brownie Cheesecake', 'https://au.verygood-chocolate.com/cakes/brownie-cheesecake', '/assets/au/something-fresh/brownie-cheesecake.webp'],
  ]

  for (const [name, href, imagePath] of expectedCards) {
    const cardPattern = new RegExp(
      `<article class="au-booking-product-card">[\\s\\S]*?<a class="au-booking-product-card__trigger" href="${escapeForRegExp(href)}">[\\s\\S]*?<h3>${escapeForRegExp(name)}</h3>[\\s\\S]*?</a>[\\s\\S]*?<a class="au-booking-product-card__cta" href="${escapeForRegExp(href)}">View &amp; Book</a>[\\s\\S]*?</article>`,
    )
    const card = html.match(cardPattern)

    assert.ok(card, `${name} should expose matching image/name and booking links`)
    assert.doesNotMatch(card[0], /target="_blank"/)
    if (imagePath) assert.match(card[0], new RegExp(`src="${escapeForRegExp(imagePath)}"`))
  }

  assert.doesNotMatch(html, /aria-haspopup="dialog"/)
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
    '/assets/au/whole-cakes/pave-chocolate-cake.webp',
    '/assets/au/whole-cakes/vanilla-fresh-cream-cake.webp',
    '/assets/au/whole-cakes/buttercream-cake.webp',
    '/assets/au/daily/signature-gateau-au-chocolat.webp',
    '/assets/au/daily/chocolate-cupcakes.webp',
    '/assets/au/something-fresh/lemon-cake.webp',
    '/assets/au/something-fresh/brownie-cheesecake.webp',
  ]

  for (const imagePath of bookingImagePaths) {
    assert.ok(existsSync(resolve('public', `.${imagePath}`)), `${imagePath} should ship with the AU home`)
  }

  assert.match(html, /\/assets\/au\/whole-cakes\/vanilla-fresh-cream-cake\.webp/)
  assert.match(html, /\/assets\/au\/something-fresh\/lemon-cake\.webp/)
})

test('AU home ships local copies of the official tiger wallpaper treatment', () => {
  assert.ok(existsSync(resolve('public/assets/brand/tiger-pattern-desktop.webp')))
  assert.ok(existsSync(resolve('public/assets/brand/tiger-pattern-mobile.webp')))
})

test('AU home gives its non-hero sections a full-width content scope', () => {
  const home = readFileSync('src/pages/au/AuHomePage.jsx', 'utf8')
  const styles = readFileSync('src/styles/au-site.css', 'utf8')

  assert.match(home, /<div className="au-home">/)
  assert.match(styles, /\.au-home > :not\(\.au-hero\) \.au-shell\s*\{\s*width: 100%;\s*max-width: none;/)
  assert.match(styles, /\.au-home \.au-core-experiences \.au-experience\s*\{\s*padding-inline: 0;/)
})
