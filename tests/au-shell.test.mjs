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

test('AU shell exposes required destinations without legacy commerce or admin controls', async (t) => {
  const { AuFooter, AuHeader, close } = await loadAuShell()
  t.after(close)

  const header = renderWithRoute(AuHeader, '/tea')
  const footer = renderWithRoute(AuFooter, '/')
  const shell = header + footer

  for (const label of ['About', 'Cakes', 'Bakes', 'Chocolate', 'Tea', 'Goods', 'Kids Classes', 'Book a Cake']) {
    assert.match(shell, new RegExp(label))
  }

  assert.match(shell, /https:\/\/au\.verygood-chocolate\.com\/cakes/)
  assert.match(shell, /https:\/\/au\.verygood-chocolate\.com\/classes/)
  assert.match(shell, /https:\/\/au\.verygood-chocolate\.com\/reviews/)
  assert.match(shell, /https:\/\/au\.verygood-chocolate\.com\/lookup/)
  assert.match(shell, /https:\/\/kr\.verygood-chocolate\.com/)
  assert.match(header, /aria-current="page"/)
  assert.match(header, /href="\/tea"/)
  assert.equal(/Cart|Checkout|Admin|Digital|Wellness App|AI Beta/.test(shell), false)
})
