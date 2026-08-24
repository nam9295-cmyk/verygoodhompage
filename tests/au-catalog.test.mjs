import assert from 'node:assert/strict'
import test from 'node:test'
import { AU_PRODUCTS } from '../src/data/auCatalog.js'
import {
  getAuProduct,
  getPublishedAuProducts,
  validateAuCatalog,
} from '../src/utils/auCatalog.js'
import * as auCatalog from '../src/utils/auCatalog.js'

test('published catalogue products have localized copy, media and valid availability', () => {
  assert.deepEqual(validateAuCatalog(AU_PRODUCTS), [])
})

test('published category lists exclude drafts and retain exact cake booking URLs', () => {
  const cakes = getPublishedAuProducts('cakes')
  const bakes = getPublishedAuProducts('bakes')

  assert.equal(cakes.some((item) => item.status === 'draft'), false)
  assert.equal(bakes.some((item) => item.status === 'draft'), false)
  assert.equal(
    getAuProduct('cakes', 'pave-chocolate-cake').action.href,
    'https://au.verygood-chocolate.com/cakes/pave-chocolate-cake',
  )
  assert.equal(
    getAuProduct('bakes', 'chocolatiers-basque-cheesecake').action.href,
    'https://au.verygood-chocolate.com/cakes/chocolatiers-basque-cheesecake',
  )
})

test('public catalogue releases expose the curated Chocolate set without deleting source records', () => {
  const getPublicAuProducts = auCatalog.getPublicAuProducts || (() => [])
  const chocolateNames = getPublicAuProducts('chocolate').map((item) => item.copy.en.name)

  assert.deepEqual(chocolateNames, [
    'Almond Chocolate',
    'Strawberry Bonbon',
    'Eiffel Tower Chocolate',
    'Pave Chocolate',
    "S'mores Stick",
  ])
  assert.equal(AU_PRODUCTS.some((item) => item.id === 'ruby-berry-chocoball'), true)
  assert.equal(AU_PRODUCTS.some((item) => item.id === 'matcha-berry'), true)
})

test('catalogue data contains no prices and tea copy makes no health claims', () => {
  const forbiddenTeaClaims = /detox|cleanse|toxin|weight loss|gut health|cure|treat|치료|해독|체중 감량/i

  for (const product of AU_PRODUCTS) {
    assert.equal(Object.keys(product).some((key) => key.toLowerCase().includes('price')), false)
  }

  for (const tea of AU_PRODUCTS.filter((product) => product.category === 'tea' && product.status === 'published')) {
    assert.equal(forbiddenTeaClaims.test(JSON.stringify(tea.copy)), false, tea.id)
  }
})
