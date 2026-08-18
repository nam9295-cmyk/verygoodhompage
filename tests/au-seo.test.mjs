import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { getAuSeoMetadata } from '../src/utils/auSeo.js'

test('AU SEO metadata derives canonical and locale alternate destinations from a public path', () => {
  const metadata = getAuSeoMetadata({
    locale: 'en',
    path: '/tea/british-black',
    title: 'British Black | Verygood Chocolate',
    description: 'Cacao nib, Earl Grey and cornflower.',
  })

  assert.deepEqual(metadata.canonical, 'https://verygood-chocolate.com/tea/british-black')
  assert.deepEqual(metadata.alternates, {
    en: 'https://verygood-chocolate.com/tea/british-black',
    ko: 'https://verygood-chocolate.com/ko/tea/british-black',
  })
})

test('AU SEO publishes locale-specific canonical and alternate URLs', async (t) => {
  const server = await createServer({
    appType: 'custom',
    server: { middlewareMode: true, ws: false },
  })
  t.after(() => server.close())
  const { default: AuSeo } = await server.ssrLoadModule('/src/components/au/AuSeo.jsx')
  const { HelmetProvider } = await server.ssrLoadModule('react-helmet-async')
  const helmetContext = {}

  renderToStaticMarkup(
    createElement(
      HelmetProvider,
      { context: helmetContext },
      createElement(AuSeo, {
        locale: 'en',
        path: '/tea/british-black',
        title: 'British Black | Verygood Chocolate',
        description: 'Cacao nib, Earl Grey and cornflower.',
      }),
    ),
  )

  const head = helmetContext.helmet
  assert.match(head.title.toString(), /British Black \| Verygood Chocolate/)
  assert.match(head.link.toString(), /https:\/\/verygood-chocolate\.com\/tea\/british-black/)
  assert.match(head.link.toString(), /hrefLang="ko"/)
  assert.match(head.link.toString(), /https:\/\/verygood-chocolate\.com\/ko\/tea\/british-black/)
})
