const AU_ORIGIN = 'https://au.verygood-chocolate.com'

export const AU_LINKS = Object.freeze({
  booking: Object.freeze({
    cakes: `${AU_ORIGIN}/cakes`,
    classes: `${AU_ORIGIN}/classes`,
    reviews: `${AU_ORIGIN}/reviews`,
    lookup: `${AU_ORIGIN}/lookup`,
  }),
  korea: 'https://kr.verygood-chocolate.com',
  instagram: 'https://www.instagram.com/verygood_chocolate/',
})

const ALLOWED_URLS = new Set([
  ...Object.values(AU_LINKS.booking),
  AU_LINKS.korea,
  AU_LINKS.instagram,
])

export function isAllowedAuExternalUrl(value) {
  return typeof value === 'string' && ALLOWED_URLS.has(value)
}
