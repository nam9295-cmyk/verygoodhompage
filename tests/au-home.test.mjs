import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

test('AU home renders the brand story, primary booking actions and five category links', async (t) => {
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

  for (const label of ['Cakes', 'Bakes', 'Chocolate', 'Tea', 'Goods']) {
    assert.match(html, new RegExp(label))
  }

  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/cakes/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/classes/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/reviews/)
  assert.match(html, /https:\/\/au\.verygood-chocolate\.com\/lookup/)
  assert.equal(/Add to Cart|Checkout|Cart|Quantity|\$\d/.test(html), false)
})
