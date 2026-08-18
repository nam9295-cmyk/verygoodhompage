import { AU_BOOKING_PRODUCT_LINKS, AU_LINKS } from './auLinks.js'
import { localePath } from '../utils/auPaths.js'

export const AU_SECTION_IDS = Object.freeze([
  'chocolate',
  'tea',
  'goods',
])

export const AU_NAVIGATION = Object.freeze([
  { id: 'cakes', label: 'Cakes', href: AU_LINKS.booking.cakes },
  { id: 'something-fresh', label: 'Something Fresh', href: AU_LINKS.booking.cakes },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'tea', label: 'Cacao Tea' },
  { id: 'goods', label: 'Choco in Life' },
])

export const AU_FOOTER_NAVIGATION = Object.freeze([
  { id: 'about', label: 'About' },
  ...AU_NAVIGATION,
])

export function homeSectionHref(id, locale = 'en') {
  const basePath = localePath('/', locale)
  return AU_SECTION_IDS.includes(id) ? `${basePath}#${id}` : basePath
}

export const AU_HOME_CONTENT = Object.freeze({
  en: {
    locale: 'en-AU',
    ui: {
      announcementLabel: 'Verygood announcements',
      experienceLabel: 'Sydney experiences',
      worldKicker: 'The Verygood world',
      worldHeading: 'The Verygood collections.',
      selectionNote: 'Chocolate, tea and life with a little Verygood character.',
      storyKicker: 'Our story',
      reviewsKicker: 'Reviews',
      bookLabel: 'Book a Cake',
      skipLabel: 'Skip to content',
    },
    announcement: [
      'Born in Daegu',
      'Growing in Sydney',
      'Sydney cake pre-order',
      'Melrose Park pickup',
    ],
    hero: {
      kicker: 'BORN IN DAEGU · GROWING IN SYDNEY',
      heading: 'Chocolate makes every day verygood.',
      body: 'Cakes, something fresh, chocolate, tea and the things that make a Verygood life.',
      exploreLabel: 'Explore products',
      bookLabel: 'Book a Cake',
      image: '/assets/main.png',
      imageAlt: 'Verygood chocolate packages arranged in warm light.',
    },
    coreExperiences: [
      {
        id: 'cakes',
        kicker: 'Made to order in Sydney',
        heading: 'Verygood Chocolate Cakes',
        body: 'Celebration cakes and chocolate bakes, made to order for pre-arranged Melrose Park pickup.',
        products: [
          { id: 'pave', name: 'Signature Pave Cake', options: ['3 Sizes'], ctaLabel: 'View & Book', href: AU_BOOKING_PRODUCT_LINKS.paveChocolateCake, image: { src: '/assets/booking/pave-chocolate-cake-sydney.webp', alt: 'Signature Pave Cake.', placeholderLabel: 'Image coming soon' } },
          { id: 'pound', name: 'Chocolate Pound Cake', options: ['Original', 'Chocolate Coated', 'Vanilla Fresh Cream Topping'], ctaLabel: 'View & Book', href: AU_BOOKING_PRODUCT_LINKS.chocolatePoundCakeAndCupcakes, image: { src: '/assets/booking/chocolate-pound-cake-sydney.webp', alt: 'Chocolate Pound Cake.', placeholderLabel: 'Image coming soon' } },
          { id: 'cupcakes', name: 'Chocolate Cupcakes', options: ['Original', 'Vanilla Fresh Cream Topping', 'Chocolate Buttercream Topping'], ctaLabel: 'View & Book', href: AU_BOOKING_PRODUCT_LINKS.chocolatePoundCakeAndCupcakes, image: { src: '/assets/booking/chocolate-cupcakes-sydney.webp', alt: 'Chocolate Cupcakes.', placeholderLabel: 'Image coming soon' } },
          { id: 'whole-cake', name: 'Whole Cake', options: ['Vanilla Fresh Cream', 'Chocolate Buttercream', '3 Sizes'], ctaLabel: 'View & Book', href: AU_BOOKING_PRODUCT_LINKS.vanillaFreshCreamCake, image: { src: '/assets/booking/vanilla-fresh-cream-cake-sydney.jpg', alt: 'Vanilla Fresh Cream Cake.', fit: 'cover', placeholderLabel: 'Image coming soon' } },
          { id: 'lunchbox', name: 'Lunchbox Cake', options: ['Pave', 'Chocolate Buttercream'], ctaLabel: 'View & Book', href: AU_BOOKING_PRODUCT_LINKS.lunchboxCake, image: { src: '/assets/au/cakes/lunchbox-cake.webp', alt: 'Lunchbox Cake.', deferLoad: true, placeholderLabel: 'Image coming soon' } },
        ],
        href: AU_LINKS.booking.cakes,
        tone: 'pink',
      },
      {
        id: 'something-fresh',
        kicker: 'STH FRESH',
        heading: 'Something Fresh',
        body: 'Fresh cake options for sharing and small celebrations, available through the Sydney cake site.',
        products: [
          { id: 'lemon', name: 'Lemon Cake', options: ['4 pcs', '6 pcs', '12 pcs', '16 pcs'], ctaLabel: 'View & Book', href: AU_BOOKING_PRODUCT_LINKS.lemonCake, image: { src: '/assets/booking/lemon-cake-sydney.jpg', alt: 'Lemon Cake.', fit: 'cover', placeholderLabel: 'Image coming soon' } },
          { id: 'brownie-cheesecake', name: 'Brownie Cheesecake', options: [], ctaLabel: 'View & Book', href: AU_BOOKING_PRODUCT_LINKS.brownieCheesecake, image: { src: '/assets/au/fresh/brownie-cheesecake.webp', fallbackSrc: '/assets/booking/chocolatiers-basque-cheesecake-sydney.jpg', alt: 'Chocolatier\'s Basque Cheesecake, shown while the Brownie Cheesecake image is coming soon.', fit: 'cover', deferLoad: true, placeholderLabel: 'Image coming soon' } },
        ],
        href: AU_LINKS.booking.cakes,
        tone: 'fresh',
      },
    ],
    categories: [
      {
        id: 'chocolate',
        label: 'Verygood Chocolate',
        description: 'Made by our chocolatier',
        visual: 'image',
        image: '/assets/products/almond.png',
        imageAlt: 'Almond Chocoball packaging on a white background.',
      },
      {
        id: 'tea',
        label: 'Cacao Tea',
        description: 'Four signature blends',
        visual: 'image',
        image: '/assets/products/british_cup.webp',
        imageAlt: 'British Black tea in a glass cup.',
      },
      {
        id: 'goods',
        label: 'Choco in Life',
        description: 'A little Verygood for everyday life',
        visual: 'image',
        image: '/assets/products/hogirl.png',
        imageAlt: 'Hogeori character keyring.',
      },
    ],
    signature: {
      kicker: 'A little of what we make',
      heading: 'The Verygood selection',
      items: [
        {
          name: 'Pave Chocolate Cake',
          availability: 'Sydney pre-order',
          href: AU_LINKS.booking.cakes,
          image: '/assets/booking/pave-chocolate-cake-sydney.webp',
          imageAlt: 'Pave Chocolate Cake.',
        },
        {
          name: 'Chocolate Pound Cake',
          availability: 'Sydney pre-order',
          href: AU_LINKS.booking.cakes,
          image: '/assets/booking/chocolate-pound-cake-sydney.webp',
          imageAlt: 'Chocolate Pound Cake.',
        },
        {
          name: 'Almond Chocoball',
          availability: 'Available in Daegu',
          href: homeSectionHref('chocolate'),
          image: '/assets/products/almond.png',
          imageAlt: 'Almond Chocoball packaging.',
        },
        {
          name: 'British Black',
          availability: 'Sydney release not announced',
          href: homeSectionHref('tea'),
          image: '/assets/products/british_cup.webp',
          imageAlt: 'British Black tea in a glass cup.',
        },
        {
          name: 'Hogeori Keyring',
          availability: 'Coming soon',
          href: homeSectionHref('goods'),
          image: '/assets/products/hogirl.png',
          imageAlt: 'Hogeori character keyring.',
        },
      ],
    },
    story: {
      heading: 'Born in Daegu. Growing in Sydney.',
      image: '/assets/story/story-hogirl.png',
      imageAlt: 'A tiger character and magpie beside a cacao pod.',
      daegu: {
        title: 'Daegu',
        body: 'Where Verygood began with chocolate and tea, alongside its Korean store and making base.',
        label: 'Visit Korea website',
        href: AU_LINKS.korea,
      },
      sydney: {
        title: 'Sydney',
        body: 'Made-to-order cakes and pre-arranged Melrose Park pickup for celebrations and small-batch bakes.',
        primaryLabel: 'Book a Cake',
        primaryHref: AU_LINKS.booking.cakes,
      },
    },
    spotlight: {
      kicker: 'Tea spotlight',
      heading: 'British Black',
      body: 'Cacao nib, Earl Grey and cornflower. Deep, aromatic and softly sweet.',
      status: 'Available in Daegu · Sydney release not announced',
      image: '/assets/story/main.webp',
      imageAlt: 'Four Verygood tea blends served in glass cups.',
    },
    reviews: {
      heading: 'Kind words, shared there',
      body: 'Read customer reviews on our Sydney booking site.',
      label: 'Read customer reviews',
      href: AU_LINKS.booking.reviews,
    },
    locations: {
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
  },
  ko: {
    locale: 'ko-KR',
    ui: {
      announcementLabel: '베리굿 알림',
      experienceLabel: '시드니 경험',
      worldKicker: '베리굿의 세계',
      worldHeading: '베리굿의 컬렉션.',
      selectionNote: '초콜릿, 티와 베리굿의 작은 일상을 소개합니다.',
      storyKicker: '우리의 이야기',
      reviewsKicker: '후기',
      bookLabel: '케이크 예약',
      skipLabel: '본문으로 건너뛰기',
    },
    announcement: [
      '대구에서 시작한 베리굿',
      '시드니에서 자라는 중',
      '시드니 케이크 사전 예약',
      '멜로즈 파크 픽업',
    ],
    hero: {
      kicker: '대구에서 시작해, 시드니로',
      heading: '초콜릿이 생각날 땐, 베리굿.',
      body: '케이크, 썸띵 프레시, 초콜릿, 티와 베리굿의 작은 일상을 소개합니다.',
      exploreLabel: '제품 둘러보기',
      bookLabel: '케이크 예약',
      image: '/assets/main.png',
      imageAlt: '따뜻한 빛 아래 놓인 베리굿 초콜릿 패키지.',
    },
    coreExperiences: [
      {
        id: 'cakes',
        kicker: '시드니 주문 제작',
        heading: '베리굿 초콜릿 케이크',
        body: '기념일 케이크와 초콜릿 베이크를 멜로즈 파크 사전 약속 픽업으로 준비합니다.',
        products: [
          { id: 'pave', name: '시그니처 파베 케이크', options: ['3가지 사이즈'], ctaLabel: '예약 보기', href: AU_BOOKING_PRODUCT_LINKS.paveChocolateCake, image: { src: '/assets/booking/pave-chocolate-cake-sydney.webp', alt: '시그니처 파베 케이크.', placeholderLabel: '이미지 준비 중' } },
          { id: 'pound', name: '초콜릿 파운드 케이크', options: ['오리지널', '초콜릿 코팅', '바닐라 생크림 토핑'], ctaLabel: '예약 보기', href: AU_BOOKING_PRODUCT_LINKS.chocolatePoundCakeAndCupcakes, image: { src: '/assets/booking/chocolate-pound-cake-sydney.webp', alt: '초콜릿 파운드 케이크.', placeholderLabel: '이미지 준비 중' } },
          { id: 'cupcakes', name: '초콜릿 컵케이크', options: ['오리지널', '바닐라 생크림 토핑', '초콜릿 버터크림 토핑'], ctaLabel: '예약 보기', href: AU_BOOKING_PRODUCT_LINKS.chocolatePoundCakeAndCupcakes, image: { src: '/assets/booking/chocolate-cupcakes-sydney.webp', alt: '초콜릿 컵케이크.', placeholderLabel: '이미지 준비 중' } },
          { id: 'whole-cake', name: '홀 케이크', options: ['바닐라 생크림', '초콜릿 버터크림', '3가지 사이즈'], ctaLabel: '예약 보기', href: AU_BOOKING_PRODUCT_LINKS.vanillaFreshCreamCake, image: { src: '/assets/booking/vanilla-fresh-cream-cake-sydney.jpg', alt: '바닐라 생크림 케이크.', fit: 'cover', placeholderLabel: '이미지 준비 중' } },
          { id: 'lunchbox', name: '런치박스 케이크', options: ['파베', '초콜릿 버터크림'], ctaLabel: '예약 보기', href: AU_BOOKING_PRODUCT_LINKS.lunchboxCake, image: { src: '/assets/au/cakes/lunchbox-cake.webp', alt: '런치박스 케이크.', deferLoad: true, placeholderLabel: '이미지 준비 중' } },
        ],
        href: AU_LINKS.booking.cakes,
        tone: 'pink',
      },
      {
        id: 'something-fresh',
        kicker: 'STH FRESH',
        heading: '썸띵 프레시',
        body: '함께 나누기 좋은 산뜻한 케이크를 시드니 케이크 사이트에서 확인해 보세요.',
        products: [
          { id: 'lemon', name: '레몬 케이크', options: ['4개', '6개', '12개', '16개'], ctaLabel: '예약 보기', href: AU_BOOKING_PRODUCT_LINKS.lemonCake, image: { src: '/assets/booking/lemon-cake-sydney.jpg', alt: '레몬 케이크.', fit: 'cover', placeholderLabel: '이미지 준비 중' } },
          { id: 'brownie-cheesecake', name: '브라우니 치즈케이크', options: [], ctaLabel: '예약 보기', href: AU_BOOKING_PRODUCT_LINKS.brownieCheesecake, image: { src: '/assets/au/fresh/brownie-cheesecake.webp', fallbackSrc: '/assets/booking/chocolatiers-basque-cheesecake-sydney.jpg', alt: '브라우니 치즈케이크 사진이 준비되는 동안 표시하는 바스크 치즈케이크.', fit: 'cover', deferLoad: true, placeholderLabel: '이미지 준비 중' } },
        ],
        href: AU_LINKS.booking.cakes,
        tone: 'fresh',
      },
    ],
    categories: [
      {
        id: 'chocolate',
        label: '베리굿 초콜릿',
        description: '쇼콜라티에가 만드는 초콜릿',
        visual: 'image',
        image: '/assets/products/almond.png',
        imageAlt: '아몬드 초코볼 패키지.',
      },
      {
        id: 'tea',
        label: '카카오 티',
        description: '네 가지 시그니처 블렌드',
        visual: 'image',
        image: '/assets/products/british_cup.webp',
        imageAlt: '유리 찻잔에 담긴 브리티시 블랙.',
      },
      {
        id: 'goods',
        label: '초코 인 라이프',
        description: '일상에 더하는 작은 베리굿',
        visual: 'image',
        image: '/assets/products/hogirl.png',
        imageAlt: '호걸이 캐릭터 키링.',
      },
    ],
    signature: {
      kicker: '베리굿이 만드는 것들',
      heading: '시그니처 셀렉션',
      items: [
        {
          name: '파베 초콜릿 케이크',
          availability: '시드니 사전 예약',
          href: AU_LINKS.booking.cakes,
          image: '/assets/booking/pave-chocolate-cake-sydney.webp',
          imageAlt: '파베 초콜릿 케이크.',
        },
        {
          name: '초콜릿 파운드 케이크',
          availability: '시드니 사전 예약',
          href: AU_LINKS.booking.cakes,
          image: '/assets/booking/chocolate-pound-cake-sydney.webp',
          imageAlt: '초콜릿 파운드 케이크.',
        },
        {
          name: '아몬드 초코볼',
          availability: '대구에서 만날 수 있어요',
          href: homeSectionHref('chocolate', 'ko'),
          image: '/assets/products/almond.png',
          imageAlt: '아몬드 초코볼 패키지.',
        },
        {
          name: '브리티시 블랙',
          availability: '시드니 출시 일정 미정',
          href: homeSectionHref('tea', 'ko'),
          image: '/assets/products/british_cup.webp',
          imageAlt: '유리 찻잔에 담긴 브리티시 블랙.',
        },
        {
          name: '호걸이 키링',
          availability: '곧 만나요',
          href: homeSectionHref('goods', 'ko'),
          image: '/assets/products/hogirl.png',
          imageAlt: '호걸이 캐릭터 키링.',
        },
      ],
    },
    story: {
      heading: '대구에서 시작해, 시드니로.',
      image: '/assets/story/story-hogirl.png',
      imageAlt: '카카오 열매 곁에 앉은 호걸이와 까치.',
      daegu: {
        title: '대구',
        body: '초콜릿과 티로 시작한 베리굿의 한국 매장과 만드는 기반이 있는 곳입니다.',
        label: '한국 사이트 방문',
        href: AU_LINKS.korea,
      },
      sydney: {
        title: '시드니',
        body: '주문 제작 케이크와 작은 베이크를 멜로즈 파크 사전 약속 픽업으로 준비합니다.',
        primaryLabel: '케이크 예약',
        primaryHref: AU_LINKS.booking.cakes,
      },
    },
    spotlight: {
      kicker: '티 스포트라이트',
      heading: '브리티시 블랙',
      body: '카카오 닙, 얼그레이와 콘플라워. 깊고 향긋하며 은은하게 달콤합니다.',
      status: '대구에서 만날 수 있어요 · 시드니 출시 일정 미정',
      image: '/assets/story/main.webp',
      imageAlt: '유리 찻잔에 담긴 네 가지 베리굿 티 블렌드.',
    },
    reviews: {
      heading: '베리굿을 먼저 만난 이야기',
      body: '시드니 예약 사이트에서 고객 후기를 확인하세요.',
      label: '고객 후기 보기',
      href: AU_LINKS.booking.reviews,
    },
    locations: {
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
    },
  },
})

export function getAuSiteContent(locale = 'en') {
  return AU_HOME_CONTENT[locale === 'ko' ? 'ko' : 'en']
}
