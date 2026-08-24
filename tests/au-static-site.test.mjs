import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

test('the public AU document is English-first and carries no advertising scripts', () => {
  const html = readFileSync('index.html', 'utf8')

  assert.match(html, /<html lang="en-AU">/)
  assert.match(html, /family=Work\+Sans:wght@400;600;700;800/)
  assert.doesNotMatch(html, /Playfair|Manrope|Noto\+Sans/)
  assert.match(html, /whole cakes, daily chocolate cakes, Something Fresh, chocolate and goods in Sydney/i)
  assert.doesNotMatch(html, /Cacao Tea/i)
  assert.equal(/adsbygoogle|google-adsense-account|googletagmanager/.test(html), false)
  assert.equal(existsSync('public/ads.txt'), false)
})

test('AU static search files index the English and Korean catalogue routes', () => {
  const robots = readFileSync('public/robots.txt', 'utf8')
  const sitemap = readFileSync('public/sitemap.xml', 'utf8')
  const redirects = readFileSync('public/_redirects', 'utf8')

  assert.match(robots, /Sitemap: https:\/\/verygood-chocolate\.com\/sitemap\.xml/)
  assert.match(sitemap, /<loc>https:\/\/verygood-chocolate\.com\/<\/loc>/)
  assert.match(sitemap, /<loc>https:\/\/verygood-chocolate\.com\/ko<\/loc>/)
  assert.doesNotMatch(sitemap, /<loc>https:\/\/verygood-chocolate\.com\/(?:ko\/)?(?:cakes|bakes)<\/loc>/)
  assert.doesNotMatch(sitemap, /ruby-berry-chocoball|matcha-berry/)
  assert.match(sitemap, /<loc>https:\/\/verygood-chocolate\.com\/tea\/british-black<\/loc>/)
  assert.match(sitemap, /<loc>https:\/\/verygood-chocolate\.com\/ko\/goods\/hogeori-keyring<\/loc>/)
  assert.equal(/checkout|cart/.test(sitemap), false)
  assert.match(redirects, /^\/brand\s+\/about\s+302/m)
  assert.match(redirects, /^\/products\s+\/chocolate\s+302/m)
  assert.match(redirects, /^\/cart\s+\/\s+302/m)
  assert.match(redirects, /^\/cakes\s+https:\/\/au\.verygood-chocolate\.com\/cakes\s+302/m)
  assert.match(redirects, /^\/bakes\s+https:\/\/au\.verygood-chocolate\.com\/cakes\s+302/m)
  assert.match(redirects, /^\/ko\/cakes\s+https:\/\/au\.verygood-chocolate\.com\/cakes\s+302/m)
  assert.match(redirects, /^\/ko\/bakes\s+https:\/\/au\.verygood-chocolate\.com\/cakes\s+302/m)
  assert.match(redirects, /^\/\*\s+\/index\.html\s+200/m)
})
