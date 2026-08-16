import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

test('the public AU document is English-first and carries no advertising scripts', () => {
  const html = readFileSync('index.html', 'utf8')

  assert.match(html, /<html lang="en-AU">/)
  assert.match(html, /Playfair\+Display/)
  assert.match(html, /Work\+Sans/)
  assert.equal(/adsbygoogle|google-adsense-account|googletagmanager/.test(html), false)
  assert.equal(existsSync('public/ads.txt'), false)
})

test('AU static search files only index the available English and Korean homes', () => {
  const robots = readFileSync('public/robots.txt', 'utf8')
  const sitemap = readFileSync('public/sitemap.xml', 'utf8')
  const redirects = readFileSync('public/_redirects', 'utf8')

  assert.match(robots, /Sitemap: https:\/\/verygood-chocolate\.com\/sitemap\.xml/)
  assert.match(sitemap, /<loc>https:\/\/verygood-chocolate\.com\/<\/loc>/)
  assert.match(sitemap, /<loc>https:\/\/verygood-chocolate\.com\/ko<\/loc>/)
  assert.equal(/product\/|category\/|checkout|cart/.test(sitemap), false)
  assert.match(redirects, /^\/cart\s+\/\s+302/m)
  assert.match(redirects, /^\/\*\s+\/index\.html\s+200/m)
})
