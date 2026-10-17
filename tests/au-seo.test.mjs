import assert from 'node:assert/strict'
import test from 'node:test'
import { getAuSeoMetadata, getPageSeo, renderSeoHead } from '../src/utils/auSeo.js'

test('brand SEO derives canonical and locale alternate destinations from a public path', () => {
  const metadata = getAuSeoMetadata({
    locale: 'en', path: '/tea/british-black',
    title: 'British Black | Verygood Chocolate',
    description: 'Cacao nib, Earl Grey and cornflower.',
  })
  assert.equal(metadata.canonical, 'https://verygood-chocolate.com/tea/british-black')
  assert.deepEqual(metadata.alternates, {
    en: 'https://verygood-chocolate.com/tea/british-black',
    ko: 'https://verygood-chocolate.com/ko/tea/british-black',
  })
})

test('Korean brand metadata points to its translation rather than a different regional service', () => {
  const head = renderSeoHead(getPageSeo('/ko/about'))
  assert.match(head, /<title>베리굿 이야기 \| 베리굿 초콜릿<\/title>/)
  assert.match(head, /rel="canonical" href="https:\/\/verygood-chocolate\.com\/ko\/about"/)
  assert.match(head, /hreflang="en" href="https:\/\/verygood-chocolate\.com\/about"/)
  assert.match(head, /hreflang="ko" href="https:\/\/verygood-chocolate\.com\/ko\/about"/)
  assert.doesNotMatch(head, /hreflang="en-AU"|href="https:\/\/(?:au|kr|cake)\./)
})
