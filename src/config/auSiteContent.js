import { AU_LINKS } from './auLinks.js'
import { localePath } from '../utils/auPaths.js'

export const AU_SECTION_IDS = Object.freeze([
  'about',
  'cakes',
  'bakes',
  'chocolate',
  'tea',
  'goods',
])

export const AU_NAVIGATION = Object.freeze([
  { id: 'about', label: 'About' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'bakes', label: 'Bakes' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'tea', label: 'Tea' },
  { id: 'goods', label: 'Goods' },
])

export function homeSectionHref(id, locale = 'en') {
  const basePath = localePath('/', locale)
  return AU_SECTION_IDS.includes(id) ? `${basePath}#${id}` : basePath
}

export const AU_HOME_CONTENT = Object.freeze({
  en: {
    locale: 'en-AU',
    announcement: [
      'Born in Daegu',
      'Growing in Sydney',
      'Sydney cake pre-order',
      'Melrose Park pickup',
      'Private kids cake classes',
    ],
    hero: {
      kicker: 'BORN IN DAEGU · GROWING IN SYDNEY',
      heading: 'Chocolate makes every day verygood.',
      body: 'Cakes, bakes, chocolate, tea and playful little things from a chocolatier-led brand growing in Sydney.',
      exploreLabel: 'Explore products',
      bookLabel: 'Book a Cake',
      image: '/assets/main.png',
      imageAlt: 'Verygood chocolate packages arranged in warm light.',
    },
    coreExperiences: [
      {
        id: 'cakes',
        kicker: 'Made to order in Sydney',
        heading: 'Cake & bakes pre-order',
        body: 'Pre-arranged Melrose Park pickup for your celebration and small-batch bakes.',
        label: 'Explore booking options',
        href: AU_LINKS.booking.cakes,
        tone: 'pink',
      },
      {
        id: 'classes',
        kicker: 'Private weekend cake classes',
        heading: 'Kids cake classes',
        body: 'Small groups with Jenny, made for hands-on cake time and curious young makers.',
        label: 'Explore classes',
        href: AU_LINKS.booking.classes,
        tone: 'yellow',
      },
    ],
    categories: [
      {
        id: 'cakes',
        label: 'Cakes',
        description: 'Celebration cakes made to order',
        visual: 'type',
      },
      {
        id: 'bakes',
        label: 'Bakes',
        description: 'Small cakes and baked treats',
        visual: 'type',
      },
      {
        id: 'chocolate',
        label: 'Chocolate',
        description: 'Made by our chocolatier',
        visual: 'image',
        image: '/assets/products/almond.png',
        imageAlt: 'Almond Chocoball packaging on a white background.',
      },
      {
        id: 'tea',
        label: 'Tea',
        description: 'Four signature blends',
        visual: 'image',
        image: '/assets/products/british_cup.webp',
        imageAlt: 'British Black tea in a glass cup.',
      },
      {
        id: 'goods',
        label: 'Goods',
        description: 'Take a little verygood home',
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
          image: null,
        },
        {
          name: 'Chocolate Pound Cake',
          availability: 'Sydney pre-order',
          href: AU_LINKS.booking.cakes,
          image: null,
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
        body: 'Made-to-order cakes, pre-arranged Melrose Park pickup and private kids classes with Jenny.',
        primaryLabel: 'Book a Cake',
        primaryHref: AU_LINKS.booking.cakes,
        secondaryLabel: 'Explore classes',
        secondaryHref: AU_LINKS.booking.classes,
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
          body: 'Made-to-order cakes and private kids classes. Pre-arranged pickup in Melrose Park. No walk-in shop.',
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
    announcement: [
      '대구에서 시작한 베리굿',
      '시드니에서 자라는 중',
      '시드니 케이크 사전 예약',
      '멜로즈 파크 픽업',
      '프라이빗 키즈 케이크 클래스',
    ],
    hero: {
      kicker: '대구에서 시작해, 시드니로',
      heading: '초콜릿이 생각날 땐, 베리굿.',
      body: '케이크, 구운 과자, 초콜릿, 티와 작은 즐거움을 시드니에서도 만나보세요.',
      exploreLabel: '제품 둘러보기',
      bookLabel: '케이크 예약',
      image: '/assets/main.png',
      imageAlt: '따뜻한 빛 아래 놓인 베리굿 초콜릿 패키지.',
    },
    coreExperiences: [
      {
        id: 'cakes',
        kicker: '시드니 주문 제작',
        heading: '케이크 & 베이크 사전 예약',
        body: '기념일 케이크와 작은 구운 과자를 멜로즈 파크 픽업으로 준비합니다.',
        label: '예약 옵션 보기',
        href: AU_LINKS.booking.cakes,
        tone: 'pink',
      },
      {
        id: 'classes',
        kicker: '주말 프라이빗 클래스',
        heading: '키즈 케이크 클래스',
        body: 'Jenny와 함께하는 소규모 케이크 만들기 시간입니다.',
        label: '클래스 보기',
        href: AU_LINKS.booking.classes,
        tone: 'yellow',
      },
    ],
    categories: [
      { id: 'cakes', label: '케이크', description: '주문 제작 기념일 케이크', visual: 'type' },
      { id: 'bakes', label: '베이크', description: '작은 케이크와 구운 과자', visual: 'type' },
      {
        id: 'chocolate',
        label: '초콜릿',
        description: '쇼콜라티에가 만드는 초콜릿',
        visual: 'image',
        image: '/assets/products/almond.png',
        imageAlt: '아몬드 초코볼 패키지.',
      },
      {
        id: 'tea',
        label: '티',
        description: '네 가지 시그니처 블렌드',
        visual: 'image',
        image: '/assets/products/british_cup.webp',
        imageAlt: '유리 찻잔에 담긴 브리티시 블랙.',
      },
      {
        id: 'goods',
        label: '굿즈',
        description: '작은 베리굿을 집으로',
        visual: 'image',
        image: '/assets/products/hogirl.png',
        imageAlt: '호걸이 캐릭터 키링.',
      },
    ],
    signature: {
      kicker: '베리굿이 만드는 것들',
      heading: '시그니처 셀렉션',
      items: [
        { name: '파베 초콜릿 케이크', availability: '시드니 사전 예약', href: AU_LINKS.booking.cakes, image: null },
        { name: '초콜릿 파운드 케이크', availability: '시드니 사전 예약', href: AU_LINKS.booking.cakes, image: null },
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
        body: '주문 제작 케이크, 멜로즈 파크 사전 약속 픽업, Jenny의 프라이빗 키즈 클래스가 있습니다.',
        primaryLabel: '케이크 예약',
        primaryHref: AU_LINKS.booking.cakes,
        secondaryLabel: '클래스 보기',
        secondaryHref: AU_LINKS.booking.classes,
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
          body: '주문 제작 케이크와 프라이빗 키즈 클래스. 멜로즈 파크 사전 약속 픽업. 워크인 매장은 없습니다.',
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
