import { AU_LINKS, AU_BOOKING_PRODUCT_LINKS } from './auLinks.js'
import { localePath } from '../utils/auPaths.js'

// The root site is a brand gateway, not a second checkout.
// Public snapshot from au-cake RENEWAL_CARDS at 2035195 (2026-10-17).
// The AU reservation site remains authoritative for live price and availability.
const AU_ORIGIN = AU_LINKS.booking.home
const AU_IMAGE = AU_ORIGIN + '/products/'

export const AU_SECTION_IDS = Object.freeze(['cakes', 'chocolates', 'celebrate'])

export const AU_NAVIGATION = Object.freeze([
  { id: 'cakes', label: 'Cake & Bake', href: AU_LINKS.booking.cakes },
  { id: 'chocolates', label: 'Chocolate', href: AU_LINKS.booking.chocolates },
  { id: 'celebrate', label: 'Celebrate', href: AU_LINKS.booking.celebrate },
  { id: 'custom-cakes', label: 'Custom Cake', href: AU_LINKS.booking.customCakes },
  { id: 'business', label: 'Business', href: AU_LINKS.booking.business },
])

export const AU_FOOTER_NAVIGATION = Object.freeze([
  { id: 'about', label: 'About' },
  ...AU_NAVIGATION,
])

export function homeSectionHref(id, locale = 'en') {
  return AU_SECTION_IDS.includes(id) ? localePath('/', locale) + '#' + id : localePath('/', locale)
}

const bookingProducts = Object.freeze({
  pave: {
    href: AU_LINKS.booking.cakes + '/pave-chocolate-cake',
    image: AU_IMAGE + 'pave-chocolate-cake-sydney.webp',
    en: 'Pavé Whole Cake', ko: '파베 홀케이크',
    descriptionEn: 'Chocolate-forward whole cake for celebrations.',
    descriptionKo: '기념일을 위한 진한 초콜릿 홀케이크.',
  },
  'gateau-loaf': {
    href: AU_LINKS.booking.cakes + '/signature-gateau-au-chocolat',
    image: AU_IMAGE + 'signature-gateau-au-chocolat-sydney.webp',
    en: 'Signature Gâteau Loaf', ko: '시그니처 갸또 로프 파운드',
    descriptionEn: 'Rich Gâteau au Chocolat, with a choice of finishes.',
    descriptionKo: '마무리를 선택하는 시그니처 갸또 쇼콜라.',
  },
  'brownie-whole': {
    href: AU_LINKS.booking.cakes + '/brownie-cheesecake?form=whole',
    image: AU_IMAGE + 'details/brownie-cheesecake/hero-1080.webp',
    en: 'Brownie Basque Whole Cake', ko: '브라우니 바스크 홀케이크',
    descriptionEn: 'Brownie and Basque cheesecake in one whole cake.',
    descriptionKo: '브라우니와 바스크 치즈케이크가 만난 홀케이크.',
  },
  'brownie-loaf': {
    href: AU_LINKS.booking.cakes + '/brownie-cheesecake?form=loaf',
    image: AU_IMAGE + 'renewal-photos/cheese-pound-hero.webp',
    en: 'Brownie Basque Loaf', ko: '브라우니 바스크 로프 파운드',
    descriptionEn: 'A rich brownie Basque cake in a loaf format.',
    descriptionKo: '로프 형태로 즐기는 브라우니 바스크 케이크.',
  },
  cookies: {
    href: AU_LINKS.booking.cakes + '/levain-cookies',
    image: AU_IMAGE + 'renewal-photos/cookies-hero_v2.webp',
    en: 'Levain Cookies · Six', ko: '르뱅쿠키 6개 세트',
    descriptionEn: 'Three chocolate chip and three double chocolate.',
    descriptionKo: '초코칩 3개와 더블초콜릿 3개로 구성.',
    comingSoon: true,
  },
  mochi: {
    href: AU_BOOKING_PRODUCT_LINKS.chocolateMochi,
    image: AU_IMAGE + 'renewal-photos/mochi-hero-v2.webp',
    en: 'Pavé Mochi', ko: '파베 모찌',
    descriptionEn: 'Six flavours of chocolate mochi. Mix your own four-piece gift box.',
    descriptionKo: '생초콜릿 모찌 6종. 원하는 맛으로 4구 선물박스를 구성하세요.',
  },
  almond: {
    href: AU_LINKS.booking.chocolates + '/almond-chocoball',
    image: AU_IMAGE + 'chocolates/almond-chocoball.webp',
    en: 'Almond Chocolate', ko: '아몬드초콜릿',
    descriptionEn: 'Chocolate-covered almonds and sharing bundles.',
    descriptionKo: '고소한 아몬드 초콜릿과 선물 구성.',
  },
  'pave-chocolate': {
    href: AU_LINKS.booking.chocolates + '/pave-chocolate',
    image: AU_IMAGE + 'renewal-photos/pave-heart-cutout.webp',
    en: 'Pavé Chocolate · Heart Tin 100g', ko: '파베초콜릿 · 하트 통 100g',
    descriptionEn: 'Soft Pavé Chocolate in a heart-shaped gift tin.',
    descriptionKo: '하트 모양 통에 담은 부드러운 파베초콜릿.',
  },
  eiffel: {
    href: AU_LINKS.booking.chocolates + '/eiffel-tower-chocolate',
    image: AU_IMAGE + 'chocolates/eiffel-tower-chocolate.webp',
    en: 'Eiffel Tower Chocolate', ko: '에펠탑초콜릿',
    descriptionEn: 'Chocolate Eiffel Tower pieces, ready for gifting.',
    descriptionKo: '선물하기 좋은 에펠탑 모양 초콜릿.',
  },
  'gateau-cupcakes': {
    href: AU_LINKS.booking.cakes + '/chocolate-cupcakes',
    image: AU_IMAGE + 'details/cupcakes/packaging-480.webp',
    en: 'Gâteau Cupcakes', ko: '갸또쇼콜라컵케이크',
    descriptionEn: 'Cupcakes in six- and twelve-piece boxes.',
    descriptionKo: '6구·12구로 선택하는 갸또 쇼콜라 컵케이크.',
  },
  'brownie-cupcakes': {
    href: AU_LINKS.booking.cakes + '/brownie-cupcakes',
    image: AU_IMAGE + 'renewal-photos/cheese-cupcake-hero.webp',
    en: 'Brownie Basque Cupcakes', ko: '브라우니 바스크 컵케이크',
    descriptionEn: 'Rich brownie Basque cupcakes for sharing.',
    descriptionKo: '함께 나누기 좋은 브라우니 바스크 컵케이크.',
    comingSoon: true,
  },
  smore: {
    href: AU_LINKS.booking.cakes + '/smore-stick',
    image: AU_IMAGE + 'details/smore/packaging-480.webp',
    en: 'S’more Sticks', ko: '스모어스틱',
    descriptionEn: 'Chocolate-coated s’more sticks for gatherings.',
    descriptionKo: '모임과 선물에 어울리는 초콜릿 스모어스틱.',
  },
})

export const AU_HOME_BOOKING_CATEGORIES = Object.freeze([
  {
    id: 'cakes', tone: 'pink',
    productIds: ['pave', 'gateau-loaf', 'brownie-whole', 'brownie-loaf', 'cookies'],
    copy: {
      en: { kicker: 'CAKE & BAKE · SYDNEY', heading: 'Cake & Bake', body: 'Made-to-order whole cakes, Gâteau and Brownie Basque, with Levain Cookies coming soon.' },
      ko: { kicker: 'CAKE & BAKE · SYDNEY', heading: '케이크 & 베이크', body: '홀케이크와 갸또, 브라우니 바스크를 만나보세요. 르뱅쿠키는 준비 중입니다.' },
    },
  },
  {
    id: 'chocolates', tone: 'daily',
    productIds: ['mochi', 'almond', 'pave-chocolate', 'eiffel'],
    copy: {
      en: { kicker: 'CHOCOLATE · SYDNEY', heading: 'Chocolate', body: 'Pavé Mochi, Almond Chocolate, Pavé Chocolate and Eiffel Tower chocolate gifts.' },
      ko: { kicker: 'CHOCOLATE · SYDNEY', heading: '초콜릿', body: '파베 모찌, 아몬드초콜릿, 파베초콜릿, 에펠탑초콜릿을 만나보세요.' },
    },
  },
  {
    id: 'celebrate', tone: 'fresh',
    productIds: ['gateau-cupcakes', 'brownie-cupcakes', 'smore'],
    copy: {
      en: { kicker: 'CELEBRATE · SYDNEY', heading: 'Celebrate', body: 'Cupcakes and s’more sticks for gatherings; Brownie Basque Cupcakes are coming soon.' },
      ko: { kicker: 'CELEBRATE · SYDNEY', heading: '셀러브레이트', body: '축하의 순간을 위한 컵케이크와 스모어스틱. 브라우니 바스크 컵케이크는 준비 중입니다.' },
    },
  },
])

function bookingCard(productId, locale) {
  const product = bookingProducts[productId]
  const korean = locale === 'ko'
  return {
    id: productId,
    href: product.href,
    ctaLabel: product.comingSoon
      ? (korean ? '상품 정보 보기' : 'View details')
      : (korean ? '상품 보기 & 예약' : 'View & Book'),
    statusLabel: product.comingSoon
      ? (korean ? '예약 준비 중' : 'Reservations coming soon')
      : null,
    name: korean ? product.ko : product.en,
    description: korean ? product.descriptionKo : product.descriptionEn,
    comingSoon: Boolean(product.comingSoon),
    image: {
      src: product.image,
      alt: korean ? product.ko : product.en,
      placeholderLabel: korean ? '사진 준비 중' : 'Photo coming soon',
    },
  }
}

function bookingExperiences(locale) {
  return AU_HOME_BOOKING_CATEGORIES.map(category => ({
    id: category.id,
    tone: category.tone,
    href: AU_LINKS.booking[category.id],
    ...category.copy[locale === 'ko' ? 'ko' : 'en'],
    products: category.productIds.map(id => bookingCard(id, locale)),
  }))
}

function homeCategories(locale) {
  const korean = locale === 'ko'
  const presentation = [
    { id: 'cakes', image: bookingProducts.pave.image,
      eyebrow: 'CAKE & BAKE', labelEn: 'Cake & Bake', labelKo: '케이크 & 베이크',
      descriptionEn: 'Cakes and bakes made to order in Sydney.', descriptionKo: '시드니에서 주문 제작하는 케이크와 베이크.' },
    { id: 'chocolates', image: bookingProducts.mochi.image,
      eyebrow: 'CHOCOLATE', labelEn: 'Chocolate', labelKo: '초콜릿',
      descriptionEn: 'Pavé Mochi and chocolate gifts.', descriptionKo: '파베 모찌와 다양한 초콜릿 선물.' },
    { id: 'celebrate', image: bookingProducts['gateau-cupcakes'].image,
      eyebrow: 'CELEBRATE', labelEn: 'Celebrate', labelKo: '셀러브레이트',
      descriptionEn: 'Cupcakes and treats for sharing.', descriptionKo: '함께 나누기 좋은 컵케이크와 디저트.' },
  ]
  return presentation.map(item => ({
    id: item.id,
    href: AU_LINKS.booking[item.id],
    eyebrow: item.eyebrow,
    label: korean ? item.labelKo : item.labelEn,
    description: korean ? item.descriptionKo : item.descriptionEn,
    cta: korean ? '시드니에서 주문하기' : 'Shop Sydney',
    image: item.image,
    imageAlt: korean ? item.labelKo : item.labelEn,
  }))
}

function homeContent(locale) {
  const isKorean = locale === 'ko'
  const language = isKorean ? 'ko' : 'en'

  return {
    seo: isKorean
      ? {
          title: '베리굿 초콜릿 | 시드니 케이크·파베 모찌 온라인 주문',
          description: '대구에서 시작한 베리굿. 시드니의 파베 모찌, 초콜릿과 주문 제작 케이크를 만나보세요. 멜로즈 파크 사전 예약 픽업.',
        }
      : {
          title: 'Verygood Chocolate | Shop Sydney Cakes, Pavé Mochi & Chocolate',
          description: 'Born in Daegu, growing in Sydney. Shop made-to-order cakes, Pavé Mochi and chocolate gifts for pre-arranged Melrose Park pickup.',
        },
    locale: isKorean ? 'ko-KR' : 'en-AU',
    ui: isKorean
      ? {
          announcementLabel: '베리굿 알림',
          experienceLabel: '시드니 메뉴',
          worldKicker: '베리굿의 세계',
          worldHeading: '컬렉션을 만나보세요.',
          storyKicker: '우리의 이야기',
          reviewsKicker: '후기',
          bookLabel: '시드니 온라인 주문',
          skipLabel: '본문으로 건너뛰기',
        }
      : {
          announcementLabel: 'Verygood announcements',
          experienceLabel: 'Sydney menu',
          worldKicker: 'THE VERYGOOD WORLD',
          worldHeading: 'Explore the collections.',
          storyKicker: 'Our story',
          reviewsKicker: 'Reviews',
          bookLabel: 'Shop Sydney',
          skipLabel: 'Skip to content',
        },
    announcement: isKorean
      ? ['대구에서 시작한 베리굿', '시드니 온라인 예약 오픈', '파베 모찌 예약 진행 중', '멜로즈 파크 픽업']
      : ['Born in Daegu', 'Growing in Sydney', 'Shop Sydney online', 'Pavé Mochi pre-orders open'],
    hero: {
      titlePrefix: 'CHOCOLATIER’S',
      heading: 'CHOCOLATE MOCHI',
      preorderLabel: 'PRE-ORDERS OPEN 17th OCT',
      preorderLead: 'PRE-ORDERS OPEN',
      preorderDate: '17th OCT',
      pickupLabel: 'Pick up',
      pickupHours: ['WED - FRI 09:00 - 16:00', 'SAT - SUN 09:00 - 12:00'],
      finePrint: 'LIMITED QUANTITY · MADE TO ORDER · UBER PICKUP AVAILABLE',
      exploreLabel: isKorean ? '전체 메뉴 보기' : 'Explore current menu',
      bookLabel: isKorean ? '파베 모찌 예약하기' : 'Order Pavé Mochi',
      bookHref: AU_BOOKING_PRODUCT_LINKS.chocolateMochi,
      desktopImage: '/assets/mochi/mochi-street.webp',
      mobileImage: '/assets/mochi/mochi-cafe.webp',
    },
    coreExperiences: bookingExperiences(language),
    categories: homeCategories(language),
    story: isKorean
      ? {
          heading: '대구에서 시작해, 시드니로.',
          image: '/assets/story/story-hogirl.png',
          imageAlt: '카카오 열매 곁에 앉은 호걸이와 까치.',
          daegu: {
            title: '대구',
            body: '초콜릿으로 시작한 베리굿의 한국 매장과 만드는 기반이 있는 곳입니다.',
            label: '한국 사이트 방문',
            href: AU_LINKS.korea,
          },
          sydney: {
            title: '시드니',
            body: '케이크와 초콜릿·파베 모찌를 멜로즈 파크 사전 약속 픽업으로 준비합니다.',
            primaryLabel: '시드니 온라인 주문',
            primaryHref: AU_LINKS.booking.home,
          },
        }
      : {
          heading: 'Born in Daegu. Growing in Sydney.',
          image: '/assets/story/story-hogirl.png',
          imageAlt: 'A tiger character and magpie beside a cacao pod.',
          daegu: {
            title: 'Daegu',
            body: 'Where Verygood began with chocolate, alongside its Korean store and making base.',
            label: 'Visit Korea website',
            href: AU_LINKS.korea,
          },
          sydney: {
            title: 'Sydney',
            body: 'Made-to-order cakes and chocolates including Pavé Mochi for pre-arranged Melrose Park pickup.',
            primaryLabel: 'Shop Sydney',
            primaryHref: AU_LINKS.booking.home,
          },
        },
    reviews: isKorean
      ? {
          heading: '베리굿을 먼저 만난 이야기',
          body: '시드니 예약 사이트에서 고객 후기를 확인하세요.',
          label: '고객 후기 보기',
          href: AU_LINKS.booking.reviews,
        }
      : {
          heading: 'Kind words, shared there',
          body: 'Read customer reviews on our Sydney booking site.',
          label: 'Read customer reviews',
          href: AU_LINKS.booking.reviews,
        },
    locations: isKorean
      ? {
          heading: '두 도시, 하나의 베리굿',
          items: [
            {
              title: '시드니',
              body: '시드니 케이크와 초콜릿·파베 모찌는 멜로즈 파크 사전 약속 픽업으로 준비합니다. 워크인 매장은 없습니다.',
              label: '예약 조회',
              href: AU_LINKS.booking.lookup,
            },
            {
              title: '한국',
              body: '대구의 베리굿 초콜릿 매장, 메뉴와 한국 소식.',
              label: '한국 사이트 방문',
              href: AU_LINKS.korea,
            },
          ],
        }
      : {
          heading: 'Two places, one Verygood world',
          items: [
            {
              title: 'Sydney',
              body: 'Made-to-order cakes, Pavé Mochi and chocolates for pre-arranged pickup in Melrose Park. No walk-in shop.',
              label: 'Find my booking',
              href: AU_LINKS.booking.lookup,
            },
            {
              title: 'Korea',
              body: 'Verygood Chocolate in Daegu, with store, menu and Korean updates.',
              label: 'Visit Korean website',
              href: AU_LINKS.korea,
            },
          ],
        },
  }
}

export const AU_HOME_CONTENT = Object.freeze({
  en: Object.freeze(homeContent('en')),
  ko: Object.freeze(homeContent('ko')),
})

export function getAuSiteContent(locale = 'en') {
  return AU_HOME_CONTENT[locale === 'ko' ? 'ko' : 'en']
}
