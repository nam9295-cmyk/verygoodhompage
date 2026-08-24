import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

async function loadAuShell() {
  const server = await createServer({
    appType: 'custom',
    server: { middlewareMode: true, ws: false },
  })

  const [{ default: AuHeader }, { default: AuFooter }] = await Promise.all([
    server.ssrLoadModule('/src/components/au/AuHeader.jsx'),
    server.ssrLoadModule('/src/components/au/AuFooter.jsx'),
  ])

  return { AuFooter, AuHeader, close: () => server.close() }
}

function renderWithRoute(Component, pathname) {
  return renderToStaticMarkup(
    createElement(
      MemoryRouter,
      { initialEntries: [pathname] },
      createElement(Component, { locale: 'en' }),
    ),
  )
}

test('AU shell exposes the five final categories without About or kids classes in primary navigation', async (t) => {
  const { AuFooter, AuHeader, close } = await loadAuShell()
  t.after(close)

  const header = renderWithRoute(AuHeader, '/chocolate')
  const footer = renderWithRoute(AuFooter, '/')
  const shell = header + footer

  for (const label of ['Whole Cakes', 'Daily', 'Something Fresh', 'Chocolate', 'Goods', 'Korea', 'Book a Cake']) {
    assert.match(shell, new RegExp(label))
  }

  assert.doesNotMatch(header, />About</)
  assert.match(footer, />About</)
  assert.doesNotMatch(shell, /Kids Classes|Kids Cake Classes/)
  assert.match(shell, /https:\/\/au\.verygood-chocolate\.com\/cakes/)
  assert.doesNotMatch(shell, /https:\/\/au\.verygood-chocolate\.com\/classes/)
  assert.match(shell, /https:\/\/au\.verygood-chocolate\.com\/reviews/)
  assert.match(shell, /https:\/\/au\.verygood-chocolate\.com\/lookup/)
  assert.match(shell, /https:\/\/kr\.verygood-chocolate\.com/)
  assert.match(header, /aria-current="page"/)
  assert.match(header, /href="\/chocolate"/)
  assert.doesNotMatch(header, /Cacao Tea|href="\/tea"/)
  assert.match(header, /href="https:\/\/au\.verygood-chocolate\.com\/cakes"/)
  assert.doesNotMatch(header, />Bakes</)
  assert.match(header, /\/assets\/brand\/heart_logo\.png/)
  assert.equal(/Cart|Checkout|Admin|Digital|Wellness App|AI Beta/.test(shell), false)
})

test('AU shell keeps the tiger wallpaper outside scrolling page content', async (t) => {
  const server = await createServer({
    appType: 'custom',
    server: { middlewareMode: true, ws: false },
  })
  t.after(() => server.close())

  const { default: AuLayout } = await server.ssrLoadModule('/src/components/au/AuLayout.jsx')
  const html = renderWithRoute(AuLayout, '/')

  assert.match(html, /<div class="au-fixed-tiger-background" aria-hidden="true"><\/div>/)
  assert.ok(html.indexOf('au-fixed-tiger-background') < html.indexOf('<main id="main-content">'))
})
