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
  const { HelmetProvider } = await server.ssrLoadModule('react-helmet-async')
  try {
    return renderToStaticMarkup(
      createElement(
        HelmetProvider,
        { context: {} },
        createElement(MemoryRouter, { initialEntries: [pathname] }, createElement(AuAppRoutes)),
      ),
    )
  } finally {
    await server.close()
  }
}

test('root serves the English AU home and /ko serves its Korean translation', async () => {
  const [english, korean] = await Promise.all([renderRoute('/'), renderRoute('/ko')])

  assert.match(english, /CHOCOLATE MOCHI/)
  assert.match(english, /Official Sydney shop/)
  assert.match(english, /https:\/\/cake\.verygood-chocolate\.com/)
  assert.match(korean, /CHOCOLATE MOCHI/)
  assert.match(korean, /파베 모찌 예약하기/)
  assert.match(korean, /베리굿의 세계/)
  assert.doesNotMatch(korean, /The Verygood world/)
})

test('legacy commerce paths are no longer public AU destinations', async () => {
  const html = await renderRoute('/cart')

  assert.match(html, /Page not found/i)
  assert.equal(/Cart|Checkout|Add to Cart/.test(html), false)
})
