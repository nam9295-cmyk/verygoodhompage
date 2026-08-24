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
  const { default: AuAppRoutes } = await server.ssrLoadModule('/src/AuAppRoutes.jsx')
  const html = renderToStaticMarkup(
    createElement(MemoryRouter, { initialEntries: [pathname] }, createElement(AuAppRoutes)),
  )
  await server.close()
  return html
}

test('root serves the English AU home and /ko serves its Korean translation', async () => {
  const [english, korean] = await Promise.all([renderRoute('/'), renderRoute('/ko')])

  assert.match(english, /Chocolate makes every day verygood\./)
  assert.match(korean, /초콜릿이 생각날 땐, 베리굿\./)
  assert.match(korean, /베리굿 컬렉션/)
  assert.doesNotMatch(korean, /The Verygood world/)
})

test('legacy commerce paths are no longer public AU destinations', async () => {
  const html = await renderRoute('/cart')

  assert.match(html, /not part of the AU site/i)
  assert.equal(/Cart|Checkout|Add to Cart/.test(html), false)
})
