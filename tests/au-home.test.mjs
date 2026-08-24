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

test('AU home publishes the final six-category order with Cacao Tea and without Kids Classes', async (t) => {
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

  for (const label of ['THE VERYGOOD WORLD', 'Explore the collections.', 'Verygood Chocolate', 'Cacao Tea', 'Goods']) {
    assert.match(html, new RegExp(label))
  }

  assert.equal((html.match(/class="au-product-card"/g) ?? []).length, 0)

  assert.doesNotMatch(html, /Choco in Life/)
  assert.ok(html.indexOf('id="whole-cakes"') < html.indexOf('id="daily"'))
  assert.ok(html.indexOf('id="daily"') < html.indexOf('id="something-fresh"'))
  assert.ok(html.indexOf('id="something-fresh"') < html.indexOf('href="/chocolate"'))
  assert.ok(html.indexOf('href="/chocolate"') < html.indexOf('href="/tea"'))
  assert.ok(html.indexOf('href="/tea"') < html.indexOf('href="/goods"'))

  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/cakes/)
  assert.match(html, /\/assets\/au\/whole-cakes\/pave-chocolate-cake\.webp/)
  assert.match(html, /\/assets\/au\/daily\/signature-gateau-au-chocolat\.webp/)
  assert.doesNotMatch(html, /href="\/(?:cakes|bakes)"/)
  assert.doesNotMatch(html, /https:\/\/au\.verygood-chocolate\.com\/classes/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/reviews/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/lookup/)
  assert.equal(/Add to Cart|Checkout|Cart|Quantity|\$\d/.test(html), false)
})

test('AU home renders three collection cards with their category destinations and representative images', async (t) => {
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

  const expectedCards = [
    ['chocolate', '/chocolate', '/assets/au/chocolate/strawberry-bonbon/straw.png', 'Explore Chocolate'],
    ['tea', '/tea', '/assets/au/tea/british-black/british.png', 'Explore Cacao Tea'],
    ['goods', '/goods', '/assets/au/goods/hogeori-keyring.png', 'Explore Goods'],
  ]

  for (const [id, href, image, cta] of expectedCards) {
    const category = englishContent.categories.find((item) => item.id === id)
    assert.equal(category.image, image)
    assert.equal(category.href, href)
    assert.equal(category.cta, cta)
    assert.match(html, new RegExp(`<a class="au-home-collection-card" href="${escapeForRegExp(href)}"[^>]*>[\\s\\S]*?src="${escapeForRegExp(image)}"[\\s\\S]*?${escapeForRegExp(cta)}`))
  }

  assert.equal((html.match(/class="au-home-collection-card"/g) ?? []).length, 3)
  assert.doesNotMatch(html, /<section class="au-spotlight">/)
})

test('AU home collection cards are image-led, three-column on desktop and one-column on mobile', () => {
  const home = readFileSync('src/pages/au/AuHomePage.jsx', 'utf8')
  const styles = readFileSync('src/styles/au-site.css', 'utf8')

  assert.doesNotMatch(home, /getPublicAuProducts/)
  assert.doesNotMatch(home, /AuProductCard/)
  assert.match(home, /className="au-home-collection-grid"/)
  assert.match(styles, /\.au-home-collection-grid\s*\{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/)
  assert.match(styles, /\.au-home-collection-card__image\s*\{[\s\S]*?aspect-ratio: 4 \/ 5;/)
  assert.match(styles, /@media \(max-width: 767px\) \{[\s\S]*?\.au-home-collection-grid\s*\{\s*grid-template-columns: 1fr;/)
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
  assert.match(styles, /\.au-home-collection-grid\s*\{[\s\S]*?gap: clamp\(20px, 2\.5vw, 38px\);/)
})
