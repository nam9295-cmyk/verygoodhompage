import assert from 'node:assert/strict'
import test from 'node:test'
import { AU_HOME_BOOKING_CATEGORIES, AU_NAVIGATION, getAuSiteContent } from '../src/config/auSiteContent.js'
import { AU_LINKS } from '../src/config/auLinks.js'

const currentProductIds = {
  cakes: ['pave', 'gateau-loaf', 'brownie-whole', 'brownie-loaf', 'cookies'],
  chocolates: ['mochi', 'almond', 'pave-chocolate', 'eiffel'],
  celebrate: ['gateau-cupcakes', 'brownie-cupcakes', 'smore'],
}
const oldProducts = ['Vanilla Fresh Cream Cake', 'Buttercream Cake', 'Lemon Cake']

test('Sydney brand hub mirrors current AU shop groups and links, without legacy headings', () => {
  assert.deepEqual(AU_NAVIGATION.map(n => n.id), ['cakes', 'chocolates', 'celebrate', 'custom-cakes', 'business'])
  assert.deepEqual(AU_NAVIGATION.map(n => n.href), [
    AU_LINKS.booking.cakes, AU_LINKS.booking.chocolates,
    AU_LINKS.booking.celebrate, AU_LINKS.booking.customCakes,
    AU_LINKS.booking.business,
  ])
  assert.deepEqual(AU_HOME_BOOKING_CATEGORIES.map(c => c.id), Object.keys(currentProductIds))
  for (const group of AU_HOME_BOOKING_CATEGORIES) {
    assert.deepEqual(group.productIds, currentProductIds[group.id])
  }
})

test('English and Korean home cards match actual Sydney product URLs, image assets and availability', () => {
  for (const locale of ['en', 'ko']) {
    const content = getAuSiteContent(locale)
    assert.equal(content.hero.bookHref, AU_LINKS.booking.chocolates + '/chocolate-mochi')
    assert.deepEqual(content.coreExperiences.map(x => x.id), Object.keys(currentProductIds))
    assert.deepEqual(content.categories.map(c => c.id), Object.keys(currentProductIds))
    const products = content.coreExperiences.flatMap(x => x.products)
    assert.equal(products.length, 12)
    assert.equal(new Set(products.map(p => p.id)).size, 12)
    for (const p of products) {
      assert.ok(p.href.startsWith('https://au.verygood-chocolate.com/'), p.id)
      assert.ok(p.image.src.startsWith('https://au.verygood-chocolate.com/products/'), p.id)
      assert.ok(p.ctaLabel)
    }
    for (const oldName of oldProducts) {
      assert.equal(products.some(p => p.name === oldName), false, oldName)
    }
    for (const blockedId of ['cookies', 'brownie-cupcakes']) {
      const p = products.find(item => item.id === blockedId)
      assert.equal(p.comingSoon, true, blockedId)
      assert.match(p.ctaLabel, locale === 'ko' ? /상세|보기/ : /View|Details/i)
    }
    const mochi = products.find(p => p.id === 'mochi')
    assert.match(mochi.name, locale === 'ko' ? /파베/ : /Pavé/)
    assert.match(mochi.href, /\/chocolates\/chocolate-mochi$/)
    assert.equal(content.story.daegu.href, AU_LINKS.korea)
    assert.equal(content.story.sydney.primaryHref, AU_LINKS.booking.home)
  }
})
