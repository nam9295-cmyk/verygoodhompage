const AU_ORIGIN = 'https://au.verygood-chocolate.com'

export const AU_BOOKING_PRODUCT_LINKS = Object.freeze({
  paveChocolateCake: `${AU_ORIGIN}/cakes/pave-chocolate-cake`,
  vanillaFreshCreamCake: `${AU_ORIGIN}/cakes/vanilla-fresh-cream-cake`,
  chocolatePoundCakeAndCupcakes: `${AU_ORIGIN}/cakes/chocolate-pound-cake-and-cupcakes`,
  lemonCake: `${AU_ORIGIN}/cakes/lemon-cake`,
  chocolatiersBasqueCheesecake: `${AU_ORIGIN}/cakes/chocolatiers-basque-cheesecake`,
})

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
  ...Object.values(AU_BOOKING_PRODUCT_LINKS),
  AU_LINKS.korea,
  AU_LINKS.instagram,
])

export function isAllowedAuExternalUrl(value) {
  return typeof value === 'string' && ALLOWED_URLS.has(value)
}
