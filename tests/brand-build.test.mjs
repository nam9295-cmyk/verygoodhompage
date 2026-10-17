import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { before, test } from 'node:test'

before(() => {
  execFileSync('npm', ['run', 'build'], { encoding: 'utf8', stdio: 'pipe' })
})

const readPage = (file) => {
  assert.ok(existsSync(`dist/${file}`), `${file} must be published as HTML`)
  return readFileSync(`dist/${file}`, 'utf8')
}
const headOf = (html) => html.match(/<head>([\s\S]*?)<\/head>/)[1]
const count = (text, pattern) => [...text.matchAll(pattern)].length

test('brand home exposes content and all official regional destinations without JavaScript', () => {
  const html = readPage('index.html')
  assert.match(html, /<h1[^>]*>[\s\S]*?CHOCOLATE MOCHI/)
  for (const destination of ['https://au.verygood-chocolate.com', 'https://kr.verygood-chocolate.com', 'https://cake.verygood-chocolate.com']) {
    assert.ok(html.includes(`href="${destination}"`), destination)
  }
  const title = html.match(/<title[^>]*>(.*?)<\/title>/)[1]
  assert.match(title, /Daegu.*Sydney/)
  assert.doesNotMatch(title, /Shop Sydney/)
  assert.doesNotMatch(html, /17th OCT|16 October|WED - FRI|UBER PICKUP AVAILABLE/)
})

test('English and Korean home pages publish distinct, singular metadata before rendering', () => {
  for (const [file, lang, canonical] of [
    ['index.html', 'en', 'https://verygood-chocolate.com/'],
    ['ko.html', 'ko', 'https://verygood-chocolate.com/ko'],
    ['about.html', 'en', 'https://verygood-chocolate.com/about'],
    ['ko/about.html', 'ko', 'https://verygood-chocolate.com/ko/about'],
  ]) {
    const html = readPage(file)
    const head = headOf(html)
    assert.match(html, new RegExp(`<html lang="${lang}">`))
    assert.equal(count(head, /<title\b/g), 1)
    assert.equal(count(head, /<meta name="description"/g), 1)
    assert.equal(count(head, /<link rel="canonical"/g), 1)
    assert.ok(head.includes(`rel="canonical" href="${canonical}"`))
    assert.match(head, /hreflang="en"/)
    assert.match(head, /hreflang="ko"/)
    assert.match(head, /hreflang="x-default"/)
    assert.match(head, /property="og:image"/)
    assert.match(head, /name="twitter:card"/)
    assert.doesNotMatch(head, /hreflang="en-AU"|href="https:\/\/au\.[^"]+"/)
  }
})

test('brand identity schema identifies the official sites without duplicating AU offers', () => {
  const head = headOf(readPage('index.html'))
  const schema = [...head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(x => {
    const parsed = JSON.parse(x[1])
    return parsed['@graph'] || [parsed]
  })
  assert.ok(schema.some(x => x['@type'] === 'Organization'))
  assert.ok(schema.some(x => x['@type'] === 'WebSite' && x.url === 'https://verygood-chocolate.com/'))
  assert.ok(JSON.stringify(schema).includes('https://au.verygood-chocolate.com'))
  assert.ok(JSON.stringify(schema).includes('https://kr.verygood-chocolate.com'))
  assert.ok(JSON.stringify(schema).includes('https://cake.verygood-chocolate.com'))
  assert.equal(schema.some(x => ['Product', 'Offer', 'LocalBusiness', 'Bakery'].includes(x['@type'])), false)
})

test('legacy collections stay accessible as noindex brand archives', () => {
  for (const file of ['tea.html', 'chocolate/almond-chocoball.html', 'ko/goods/hogeori-keyring.html']) {
    const html = readPage(file)
    assert.match(headOf(html), /name="robots" content="noindex, follow"/)
    assert.match(html, /href="https:\/\/au\.verygood-chocolate\.com"/)
    assert.match(html, /href="https:\/\/kr\.verygood-chocolate\.com"/)
    assert.match(html, /Brand archive|브랜드 아카이브/)
  }
})

test('only indexable brand pages are submitted, with current modification dates', () => {
  const sitemap = readPage('sitemap.xml')
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x => x[1]).sort()
  assert.deepEqual(urls, [
    'https://verygood-chocolate.com/',
    'https://verygood-chocolate.com/about',
    'https://verygood-chocolate.com/ko',
    'https://verygood-chocolate.com/ko/about',
  ])
  assert.doesNotMatch(sitemap, /2026-08-|<priority>|<changefreq>/)
})

test('unknown URLs have an actual not-found document instead of a universal 200 rewrite', () => {
  const html = readPage('404.html')
  assert.match(headOf(html), /name="robots" content="noindex, follow"/)
  assert.match(html, /Page not found/)
  const redirects = readPage('_redirects')
  assert.doesNotMatch(redirects, /^\/\*\s+\/index\.html\s+200/m)
  assert.match(redirects, /^\/product\/almond-chocoball\s+\/chocolate\/almond-chocoball\s+301/m)
  assert.doesNotMatch(redirects, /^\/product\/ruby-berry-chocoball\s/m)
})
