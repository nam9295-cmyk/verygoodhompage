import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

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
