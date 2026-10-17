import assert from 'node:assert/strict'
import test from 'node:test'
import { AU_NAVIGATION, AU_SECTION_IDS, getAuSiteContent, homeSectionHref } from '../src/config/auSiteContent.js'
import { AU_LINKS } from '../src/config/auLinks.js'

test('brand-home navigation mirrors the five current Sydney shop categories', () => {
  assert.deepEqual(AU_SECTION_IDS, ['cakes', 'chocolates', 'celebrate'])
  assert.deepEqual(AU_NAVIGATION.map(x => x.id), ['cakes', 'chocolates', 'celebrate', 'custom-cakes', 'business'])
  assert.deepEqual(AU_NAVIGATION.map(x => x.label), ['Cake & Bake', 'Chocolate', 'Celebrate', 'Custom Cake', 'Business'])
  assert.deepEqual(AU_NAVIGATION.map(x => x.href), [AU_LINKS.booking.cakes, AU_LINKS.booking.chocolates, AU_LINKS.booking.celebrate, AU_LINKS.booking.customCakes, AU_LINKS.booking.business])
  assert.deepEqual(AU_NAVIGATION.map(x => x.sectionId), [undefined,undefined,undefined,undefined,undefined])
  assert.equal(homeSectionHref('cakes', 'en'), '/#cakes')
  assert.equal(homeSectionHref('chocolates', 'ko'), '/ko#chocolates')
  assert.equal(homeSectionHref('business', 'en'), '/')
})

test('brand homepage keeps the Daegu-to-Sydney story and directs booking to Sydney', () => {
  const content = getAuSiteContent('en')
  assert.equal(content.hero.kicker, 'BORN IN DAEGU · GROWING IN SYDNEY')
  assert.equal(content.hero.heading, 'Chocolate makes every day verygood.')
  assert.equal(content.hero.bookHref, AU_LINKS.booking.home)
  assert.match(content.hero.bookLabel, /SHOP SYDNEY/)
  assert.deepEqual(content.coreExperiences.map(x=>x.id), ['cakes', 'chocolates', 'celebrate'])
  assert.deepEqual(content.categories.map(x=>x.label), ['Cake & Bake','Chocolate','Celebrate'])
  assert.equal(content.story.daegu.href, AU_LINKS.korea)
  assert.equal(content.story.sydney.primaryHref, AU_LINKS.booking.home)
  assert.match(content.story.heading, /Born in Daegu\. Growing in Sydney\./)
  assert.match(content.seo.description, /Pavé Mochi/)
})

test('brand hub does not implement another checkout or unsupported health claims', () => {
  const forbidden = /add to cart|checkout|quantity|detox|cleanse|toxin|weight loss|gut health|wellness app|ai beta/i
  for (const locale of ['en', 'ko']) {
    assert.equal(forbidden.test(JSON.stringify(getAuSiteContent(locale))), false, locale)
  }
})

test('Korean homepage retains localized story, Sydney and Korea links', () => {
  const ko = getAuSiteContent('ko')
  assert.equal(ko.ui.worldKicker, '베리굿의 세계')
  assert.equal(ko.ui.storyKicker, '우리의 이야기')
  assert.equal(ko.ui.reviewsKicker, '후기')
  assert.equal(ko.ui.bookLabel, '시드니 온라인 주문')
  assert.equal(ko.story.daegu.href, AU_LINKS.korea)
  assert.match(ko.hero.body, /파베 모찌/)
})
