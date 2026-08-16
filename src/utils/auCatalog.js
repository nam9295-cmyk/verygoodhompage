import { AU_CATEGORIES, AU_PRODUCTS } from '../data/auCatalog.js'
import { isAllowedAuExternalUrl } from '../config/auLinks.js'

export function getPublishedAuProducts(category) {
  if (!AU_CATEGORIES.includes(category)) return []
  return AU_PRODUCTS.filter((item) => item.category === category && item.status === 'published')
}

export function getAuProduct(category, slug) {
  return AU_PRODUCTS.find((item) => (
    item.category === category && item.slug === slug && item.status === 'published'
  )) || null
}

export function getRelatedAuProducts(category, slug, limit = 3) {
  return getPublishedAuProducts(category)
    .filter((item) => item.slug !== slug)
    .slice(0, limit)
}

export function validateAuCatalog(products) {
  const errors = []
  const ids = new Set()

  for (const item of products) {
    if (ids.has(item.id)) errors.push(`duplicate id: ${item.id}`)
    ids.add(item.id)

    if (!AU_CATEGORIES.includes(item.category)) errors.push(`invalid category: ${item.id}`)
    if (!item.copy?.en?.name || !item.copy?.ko?.name) errors.push(`missing name: ${item.id}`)
    if (!item.media || !Array.isArray(item.media.gallery)) errors.push(`missing media: ${item.id}`)
    if (!['published', 'draft'].includes(item.status)) errors.push(`invalid status: ${item.id}`)
    if (!['preorder', 'available-daegu', 'not-announced-sydney', 'coming-soon'].includes(item.availability)) {
      errors.push(`invalid availability: ${item.id}`)
    }
    if (item.action?.mode === 'external-booking' && !isAllowedAuExternalUrl(item.action.href)) {
      errors.push(`invalid booking href: ${item.id}`)
    }
    if (!['external-booking', 'catalogue-only'].includes(item.action?.mode)) {
      errors.push(`invalid action: ${item.id}`)
    }
    if (Object.keys(item).some((key) => key.toLowerCase().includes('price'))) {
      errors.push(`price field is forbidden: ${item.id}`)
    }
  }

  return errors
}
