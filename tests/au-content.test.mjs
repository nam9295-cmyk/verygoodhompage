import assert from 'node:assert/strict'
import test from 'node:test'
import {
  AU_NAVIGATION,
  AU_SECTION_IDS,
  getAuSiteContent,
  homeSectionHref,
} from '../src/config/auSiteContent.js'

test('AU navigation exposes the six brand sections and no legacy destinations', () => {
  assert.deepEqual(AU_SECTION_IDS, ['about', 'cakes', 'bakes', 'chocolate', 'tea', 'goods'])
  assert.deepEqual(AU_NAVIGATION.map((item) => item.id), AU_SECTION_IDS)
  assert.equal(/cart|checkout|store|digital|admin|wellness|ai beta/i.test(JSON.stringify(AU_NAVIGATION)), false)
  assert.equal(homeSectionHref('tea', 'en'), '/#tea')
  assert.equal(homeSectionHref('tea', 'ko'), '/ko#tea')
})

test('English home copy establishes the Daegu to Sydney brand story', () => {
  const content = getAuSiteContent('en')

  assert.equal(content.hero.kicker, 'BORN IN DAEGU · GROWING IN SYDNEY')
  assert.equal(content.hero.heading, 'Chocolate makes every day verygood.')
  assert.deepEqual(content.categories.map((category) => category.label), [
    'Cakes',
    'Bakes',
    'Chocolate',
    'Tea',
    'Goods',
  ])
  assert.match(content.story.heading, /Born in Daegu\. Growing in Sydney\./)
})

test('AU home content never publishes shopping controls or unsupported wellness claims', () => {
  const forbidden = /add to cart|checkout|cart|quantity|price|detox|cleanse|toxin|weight loss|gut health|wellness app|ai beta/i

  for (const locale of ['en', 'ko']) {
    assert.equal(forbidden.test(JSON.stringify(getAuSiteContent(locale))), false, locale)
  }
})
