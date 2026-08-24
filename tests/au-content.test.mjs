import assert from 'node:assert/strict'
import test from 'node:test'
import {
  AU_NAVIGATION,
  AU_SECTION_IDS,
  getAuSiteContent,
  homeSectionHref,
} from '../src/config/auSiteContent.js'

test('AU primary navigation keeps the final public categories and booking destinations', () => {
  assert.deepEqual(AU_SECTION_IDS, ['whole-cakes', 'daily', 'something-fresh', 'chocolate', 'goods'])
  assert.deepEqual(AU_NAVIGATION.map((item) => item.id), ['whole-cakes', 'daily', 'something-fresh', 'chocolate', 'goods'])
  assert.equal(AU_NAVIGATION.find((item) => item.id === 'whole-cakes').sectionId, 'whole-cakes')
  assert.equal(AU_NAVIGATION.find((item) => item.id === 'daily').sectionId, 'daily')
  assert.equal(AU_NAVIGATION.find((item) => item.id === 'something-fresh').sectionId, 'something-fresh')
  assert.deepEqual(
    AU_NAVIGATION.map((item) => item.label),
    ['Whole Cakes', 'Daily', 'Something Fresh', 'Chocolate', 'Goods'],
  )
  assert.equal(/cart|checkout|store|digital|admin|wellness|ai beta/i.test(JSON.stringify(AU_NAVIGATION)), false)
  assert.equal(homeSectionHref('whole-cakes', 'en'), '/#whole-cakes')
  assert.equal(homeSectionHref('daily', 'ko'), '/ko#daily')
})

test('English home copy establishes the Daegu to Sydney brand story', () => {
  const content = getAuSiteContent('en')

  assert.equal(content.hero.kicker, 'BORN IN DAEGU · GROWING IN SYDNEY')
  assert.equal(content.hero.heading, 'Chocolate makes every day verygood.')
  assert.deepEqual(content.coreExperiences.map((experience) => experience.id), ['whole-cakes', 'daily', 'something-fresh'])
  assert.deepEqual(content.categories.map((category) => category.label), ['Verygood Chocolate', 'Goods'])
  assert.match(content.story.heading, /Born in Daegu\. Growing in Sydney\./)
})

test('AU home content never publishes shopping controls or unsupported wellness claims', () => {
  const forbidden = /add to cart|checkout|cart|quantity|price|detox|cleanse|toxin|weight loss|gut health|wellness app|ai beta/i

  for (const locale of ['en', 'ko']) {
    assert.equal(forbidden.test(JSON.stringify(getAuSiteContent(locale))), false, locale)
  }
})

test('Korean home UI labels are supplied by the localized content source', () => {
  const korean = getAuSiteContent('ko')

  assert.equal(korean.ui.worldKicker, '베리굿 컬렉션')
  assert.equal(korean.ui.storyKicker, '우리의 이야기')
  assert.equal(korean.ui.reviewsKicker, '후기')
  assert.equal(korean.ui.bookLabel, '케이크 예약')
})
