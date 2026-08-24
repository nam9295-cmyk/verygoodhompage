import { AU_BOOKING_PRODUCT_LINKS, AU_LINKS } from './auLinks.js'
import { localePath } from '../utils/auPaths.js'

export const AU_SECTION_IDS = Object.freeze([
  'whole-cakes',
  'daily',
  'something-fresh',
  'chocolate',
  'goods',
])

export const AU_NAVIGATION = Object.freeze([
  { id: 'whole-cakes', label: 'Whole Cakes', sectionId: 'whole-cakes' },
  { id: 'daily', label: 'Daily', sectionId: 'daily' },
  { id: 'something-fresh', label: 'Something Fresh', sectionId: 'something-fresh' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'goods', label: 'Goods' },
])

export const AU_FOOTER_NAVIGATION = Object.freeze([
  { id: 'about', label: 'About' },
  ...AU_NAVIGATION,
])

export function homeSectionHref(id, locale = 'en') {
  const basePath = localePath('/', locale)
  return AU_SECTION_IDS.includes(id) ? `${basePath}#${id}` : basePath
}

const bookingProducts = Object.freeze({
  'pave-chocolate-cake': {
    href: AU_BOOKING_PRODUCT_LINKS.paveChocolateCake,
    image: '/assets/au/whole-cakes/pave-chocolate-cake.webp',
    alt: { en: 'Pave Chocolate Cake.', ko: '파베 초콜릿 케이크.' },
    copy: {
      en: { name: 'Pave Chocolate Cake', description: 'A chocolate celebration cake.' },
      ko: { name: '파베 초콜릿 케이크', description: '초콜릿으로 만든 기념일 케이크.' },
    },
  },
  'vanilla-fresh-cream-cake': {
    href: AU_BOOKING_PRODUCT_LINKS.vanillaFreshCreamCake,
    image: '/assets/au/whole-cakes/vanilla-fresh-cream-cake.webp',
    alt: { en: 'Vanilla Fresh Cream Cake.', ko: '바닐라 생크림 케이크.' },
    copy: {
      en: { name: 'Vanilla Fresh Cream Cake', description: 'Fresh cream and chocolate cake.' },
      ko: { name: '바닐라 생크림 케이크', description: '생크림과 초콜릿 케이크.' },
    },
  },
  'buttercream-cake': {
    href: AU_BOOKING_PRODUCT_LINKS.buttercreamCake,
    image: '/assets/au/whole-cakes/buttercream-cake.webp',
    alt: { en: 'Buttercream Cake.', ko: '버터크림 케이크.' },
    copy: {
      en: { name: 'Buttercream Cake', description: 'Buttercream-finished chocolate cake.' },
      ko: { name: '버터크림 케이크', description: '버터크림으로 마무리한 초콜릿 케이크.' },
    },
  },
  'signature-gateau-au-chocolat': {
    href: AU_BOOKING_PRODUCT_LINKS.signatureGateauAuChocolat,
    image: '/assets/au/daily/signature-gateau-au-chocolat.webp',
    alt: { en: 'Signature Gâteau au Chocolat.', ko: '시그니처 갸또 오 쇼콜라.' },
    copy: {
      en: { name: 'Signature Gâteau au Chocolat', description: 'Pound Cake' },
      ko: { name: '시그니처 갸또 오 쇼콜라', description: '파운드 케이크' },
    },
  },
  'chocolate-cupcakes': {
    href: AU_BOOKING_PRODUCT_LINKS.chocolateCupcakes,
    image: '/assets/au/daily/chocolate-cupcakes.webp',
    alt: { en: 'Chocolate Cupcakes.', ko: '초콜릿 컵케이크.' },
    copy: {
      en: { name: 'Chocolate Cupcakes', description: 'A chocolate cake collection for sharing.' },
      ko: { name: '초콜릿 컵케이크', description: '함께 나누기 좋은 초콜릿 케이크 컬렉션.' },
    },
  },
  'lemon-cake': {
    href: AU_BOOKING_PRODUCT_LINKS.lemonCake,
    image: '/assets/au/something-fresh/lemon-cake.webp',
    alt: { en: 'Lemon Cake.', ko: '레몬 케이크.' },
    copy: {
      en: { name: 'Lemon Cake', description: 'A bright lemon cake.' },
      ko: { name: '레몬 케이크', description: '산뜻한 레몬 케이크.' },
    },
  },
  'brownie-cheesecake': {
    href: AU_BOOKING_PRODUCT_LINKS.brownieCheesecake,
    image: '/assets/au/something-fresh/brownie-cheesecake.webp',
    alt: { en: 'Brownie Cheesecake.', ko: '브라우니 치즈케이크.' },
    copy: {
      en: { name: 'Brownie Cheesecake', description: 'Brownie cheesecake.' },
      ko: { name: '브라우니 치즈케이크', description: '브라우니 치즈케이크.' },
    },
  },
})

export const AU_HOME_BOOKING_CATEGORIES = Object.freeze([
  {
    id: 'whole-cakes',
    tone: 'pink',
    productIds: ['pave-chocolate-cake', 'vanilla-fresh-cream-cake', 'buttercream-cake'],
    copy: {
      en: {
        kicker: 'SIGNATURE GÂTEAU AU CHOCOLAT',
        heading: 'Whole Cakes',
        body: 'Three signature cakes for your celebration.',
      },
      ko: {
        kicker: 'SIGNATURE GÂTEAU AU CHOCOLAT',
        heading: '홀 케이크',
        body: '기념일을 위한 세 가지 시그니처 케이크.',
      },
    },
  },
  {
    id: 'daily',
    tone: 'daily',
    productIds: ['signature-gateau-au-chocolat', 'chocolate-cupcakes'],
    copy: {
      en: {
        kicker: 'SIGNATURE GÂTEAU AU CHOCOLAT',
        heading: 'Daily',
        body: 'Everyday chocolate cakes, ready to choose on the Sydney cake site.',
      },
      ko: {
        kicker: 'SIGNATURE GÂTEAU AU CHOCOLAT',
        heading: '데일리',
        body: '시드니 케이크 사이트에서 선택할 수 있는 데일리 초콜릿 케이크.',
      },
    },
  },
  {
    id: 'something-fresh',
    tone: 'fresh',
    productIds: ['lemon-cake', 'brownie-cheesecake'],
    copy: {
      en: {
        kicker: 'STH FRESH',
        heading: 'Something Fresh',
        body: 'A lemon cake and brownie cheesecake for the table.',
      },
      ko: {
        kicker: 'STH FRESH',
        heading: '썸띵 프레시',
        body: '테이블을 위한 레몬 케이크와 브라우니 치즈케이크.',
      },
    },
  },
])

function bookingCard(productId, locale) {
  const product = bookingProducts[productId]
  const language = locale === 'ko' ? 'ko' : 'en'

  return {
    id: productId,
    href: product.href,
    ctaLabel: language === 'ko' ? '예약 보기' : 'View & Book',
    ...product.copy[language],
    image: {
      src: product.image,
      alt: product.alt[language],
      placeholderLabel: language === 'ko' ? '이미지 준비 중' : 'Image coming soon',
    },
  }
}

function bookingExperiences(locale) {
  const language = locale === 'ko' ? 'ko' : 'en'

  return AU_HOME_BOOKING_CATEGORIES.map((category) => ({
    id: category.id,
    tone: category.tone,
    href: AU_LINKS.booking.cakes,
    ...category.copy[language],
    products: category.productIds.map((productId) => bookingCard(productId, language)),
  }))
}

function homeContent(locale) {
  const isKorean = locale === 'ko'
  const language = isKorean ? 'ko' : 'en'

  return {
    locale: isKorean ? 'ko-KR' : 'en-AU',
    ui: isKorean
      ? {
          announcementLabel: '베리굿 알림',
          experienceLabel: '시드니 케이크',
          worldKicker: '베리굿 컬렉션',
          worldHeading: '초콜릿과 굿즈.',
          storyKicker: '우리의 이야기',
          reviewsKicker: '후기',
          bookLabel: '케이크 예약',
          skipLabel: '본문으로 건너뛰기',
        }
      : {
          announcementLabel: 'Verygood announcements',
          experienceLabel: 'Sydney cakes',
          worldKicker: 'The Verygood world',
          worldHeading: 'Chocolate and goods.',
          storyKicker: 'Our story',
          reviewsKicker: 'Reviews',
          bookLabel: 'Book a Cake',
          skipLabel: 'Skip to content',
        },
    announcement: isKorean
      ? ['대구에서 시작한 베리굿', '시드니에서 자라는 중', '시드니 케이크 사전 예약', '멜로즈 파크 픽업']
      : ['Born in Daegu', 'Growing in Sydney', 'Sydney cake pre-order', 'Melrose Park pickup'],
    hero: isKorean
      ? {
          kicker: '대구에서 시작해, 시드니로',
          heading: '초콜릿이 생각날 땐, 베리굿.',
          body: '홀 케이크, 데일리 갸또 쇼콜라, 썸띵 프레시와 베리굿의 초콜릿·굿즈를 소개합니다.',
          exploreLabel: '제품 둘러보기',
          bookLabel: '케이크 예약',
          image: '/assets/main.png',
          imageAlt: '따뜻한 빛 아래 놓인 베리굿 초콜릿 패키지.',
        }
      : {
          kicker: 'BORN IN DAEGU · GROWING IN SYDNEY',
          heading: 'Chocolate makes every day verygood.',
          body: 'Whole cakes, daily Gâteau au Chocolat, Something Fresh, chocolate and goods from Verygood.',
          exploreLabel: 'Explore products',
          bookLabel: 'Book a Cake',
          image: '/assets/main.png',
          imageAlt: 'Verygood chocolate packages arranged in warm light.',
        },
    coreExperiences: bookingExperiences(language),
    categories: isKorean
      ? [
          {
            id: 'chocolate',
            label: '베리굿 초콜릿',
            description: '쇼콜라티에가 만드는 초콜릿',
            visual: 'image',
            image: '/assets/products/straw.png',
            imageAlt: '스트로베리 봉봉과 패키지.',
          },
          {
            id: 'goods',
            label: '굿즈',
            description: '일상에 더하는 작은 베리굿',
            visual: 'image',
            image: '/assets/products/hogirl.png',
            imageAlt: '호걸이 캐릭터 키링.',
          },
        ]
      : [
          {
            id: 'chocolate',
            label: 'Verygood Chocolate',
            description: 'Made by our chocolatier',
            visual: 'image',
            image: '/assets/products/straw.png',
            imageAlt: 'Strawberry Bonbon packaging with strawberry bonbons.',
          },
          {
            id: 'goods',
            label: 'Goods',
            description: 'A little Verygood for everyday life',
            visual: 'image',
            image: '/assets/products/hogirl.png',
            imageAlt: 'Hogeori character keyring.',
          },
        ],
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
            body: '주문 제작 케이크를 멜로즈 파크 사전 약속 픽업으로 준비합니다.',
            primaryLabel: '케이크 예약',
            primaryHref: AU_LINKS.booking.cakes,
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
            body: 'Made-to-order cakes with pre-arranged Melrose Park pickup for celebrations and daily bakes.',
            primaryLabel: 'Book a Cake',
            primaryHref: AU_LINKS.booking.cakes,
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
              body: '주문 제작 케이크를 멜로즈 파크 사전 약속 픽업으로 준비합니다. 워크인 매장은 없습니다.',
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
              body: 'Made-to-order cakes with pre-arranged pickup in Melrose Park. No walk-in shop.',
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
