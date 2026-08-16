import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

test('AU home renders the brand story, one cakes booking destination and three internal catalogues', async (t) => {
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
  assert.match(html, /Kids cake classes/i)

  assert.match(html, /Cakes &amp; Bakes pre-order/)

  for (const label of ['Chocolate', 'Tea', 'Goods']) {
    assert.match(html, new RegExp(label))
  }

  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/cakes/)
  assert.match(html, /\/assets\/booking\/pave-chocolate-cake-sydney\.webp/)
  assert.match(html, /\/assets\/booking\/chocolate-pound-cake-sydney\.webp/)
  assert.doesNotMatch(html, /href="\/(?:cakes|bakes)"/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/classes/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/reviews/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/lookup/)
  assert.equal(/Add to Cart|Checkout|Cart|Quantity|\$\d/.test(html), false)
})
