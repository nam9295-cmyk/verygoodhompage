import assert from 'node:assert/strict'
import test from 'node:test'
import { localeFromPath, localePath, stripLocalePath } from '../src/utils/auPaths.js'

test('keeps English at the AU root', () => {
  assert.equal(localeFromPath('/'), 'en')
  assert.equal(localeFromPath('/chocolate'), 'en')
  assert.equal(localePath('/tea', 'en'), '/tea')
})

test('uses the /ko prefix for the AU Korean translation', () => {
  assert.equal(localeFromPath('/ko'), 'ko')
  assert.equal(localeFromPath('/ko/goods'), 'ko')
  assert.equal(localePath('/tea', 'ko'), '/ko/tea')
  assert.equal(localePath('/', 'ko'), '/ko')
  assert.equal(stripLocalePath('/ko/goods'), '/goods')
  assert.equal(stripLocalePath('/ko'), '/')
})
