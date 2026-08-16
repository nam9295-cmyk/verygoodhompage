import assert from 'node:assert/strict'
import test from 'node:test'
import { AU_LINKS, isAllowedAuExternalUrl } from '../src/config/auLinks.js'

test('uses the approved AU booking and regional destinations', () => {
  assert.deepEqual(AU_LINKS.booking, {
    cakes: 'https://au.verygood-chocolate.com/cakes',
    classes: 'https://au.verygood-chocolate.com/classes',
    reviews: 'https://au.verygood-chocolate.com/reviews',
    lookup: 'https://au.verygood-chocolate.com/lookup',
  })
  assert.equal(AU_LINKS.korea, 'https://kr.verygood-chocolate.com')
})

test('allows only approved public destinations', () => {
  for (const href of Object.values(AU_LINKS.booking)) {
    assert.equal(isAllowedAuExternalUrl(href), true)
  }

  assert.equal(isAllowedAuExternalUrl(AU_LINKS.korea), true)
  assert.equal(isAllowedAuExternalUrl('https://example.com/cakes'), false)
  assert.equal(isAllowedAuExternalUrl('javascript:alert(1)'), false)
})
