import { AU_BOOKING_PRODUCT_LINKS } from '../config/auLinks.js'

export const AU_CATEGORIES = Object.freeze([
  'cakes',
  'bakes',
  'chocolate',
  'tea',
  'goods',
])

export const AU_PUBLIC_PRODUCT_IDS = Object.freeze({
  chocolate: Object.freeze([
    'almond-chocoball',
    'strawberry-bonbon',
    'eiffel-chocolate',
    'pave-chocolate',
    'marshmallow-smores-stick',
  ]),
  tea: Object.freeze([
    'british-black',
    'asian-gold',
    'hibiscus-fruit',
    'minty-chocolat',
  ]),
  goods: Object.freeze(['hogeori-keyring']),
})

export const AU_CATEGORY_CONTENT = Object.freeze({
  cakes: {
    tone: 'pink',
    copy: {
      en: {
        kicker: 'Sydney celebrations',
        title: 'Cakes made for the occasion.',
        intro: 'Explore our made-to-order celebration cakes, then choose your date and booking option on the Sydney cake site.',
        actionLabel: 'View & Book',
      },
      ko: {
        kicker: '시드니 기념일 케이크',
        title: '특별한 날을 위한 케이크.',
        intro: '주문 제작 기념일 케이크를 살펴보고 시드니 케이크 사이트에서 날짜와 예약 옵션을 선택해 주세요.',
        actionLabel: '예약 보기',
      },
    },
  },
  bakes: {
    tone: 'bakes',
    copy: {
      en: {
        kicker: 'Sydney bakes',
        title: 'Small bakes, ready for the table.',
        intro: 'Pound cake, cupcakes, lemon cake and Basque cheesecake are available to explore and book through our Sydney cake site.',
        actionLabel: 'View & Book',
      },
      ko: {
        kicker: '시드니 베이크',
        title: '테이블을 위한 작은 베이크.',
        intro: '파운드 케이크, 컵케이크, 레몬 케이크, 바스크 치즈케이크는 시드니 케이크 사이트에서 확인하고 예약할 수 있습니다.',
        actionLabel: '예약 보기',
      },
    },
  },
  chocolate: {
    tone: 'chocolate',
    copy: {
      en: {
        kicker: 'Verygood Chocolate',
        title: 'Verygood Chocolate',
        intro: 'A focused collection of Verygood Chocolate pieces.',
        actionLabel: 'View chocolate',
      },
      ko: {
        kicker: '베리굿 초콜릿',
        title: '베리굿 초콜릿',
        intro: '베리굿 초콜릿 컬렉션의 일부를 소개합니다.',
        actionLabel: '초콜릿 보기',
      },
    },
  },
  tea: {
    tone: 'mint',
    copy: {
      en: {
        kicker: 'Cacao Tea',
        title: 'Cacao Tea',
        intro: 'Tea is introduced here through its aroma, flavour and ingredients. Sydney availability has not been announced here.',
        actionLabel: 'View tea',
      },
      ko: {
        kicker: '카카오 티',
        title: '카카오 티',
        intro: '티는 향과 맛, 재료를 중심으로 소개합니다. 시드니 판매 일정은 이 페이지에서 안내하지 않습니다.',
        actionLabel: '티 보기',
      },
    },
  },
  goods: {
    tone: 'blue',
    copy: {
      en: {
        kicker: 'Goods',
        title: 'Goods',
        intro: 'Accessories, stationery, linen and tea accessories for life around chocolate. Only items with confirmed imagery are shown here.',
        actionLabel: 'View goods',
      },
      ko: {
        kicker: '굿즈',
        title: '굿즈',
        intro: '초콜릿과 함께하는 액세서리, 문구, 리넨, 티 액세서리를 소개합니다. 실제 이미지가 준비된 아이템만 이곳에서 보여드립니다.',
        actionLabel: '굿즈 보기',
      },
    },
  },
})

const noProductImage = Object.freeze({
  card: null,
  hero: null,
  gallery: [],
  altEn: '',
  altKo: '',
})

const placeholderProductImage = Object.freeze({
  card: null,
  hero: null,
  gallery: [],
  placeholder: true,
  altEn: '',
  altKo: '',
})

const catalogueOnly = Object.freeze({ mode: 'catalogue-only' })

export const AU_PRODUCTS = Object.freeze([
  {
    id: 'pave-chocolate-cake',
    category: 'cakes',
    slug: 'pave-chocolate-cake',
    status: 'published',
    availability: 'preorder',
    action: { mode: 'external-booking', href: AU_BOOKING_PRODUCT_LINKS.paveChocolateCake },
    copy: {
      en: {
        name: 'Pave Chocolate Cake',
        shortDescription: 'A made-to-order cake for Sydney celebrations.',
        story: 'View the current cake details, date options and booking information on our Sydney cake site.',
      },
      ko: {
        name: '파베 초콜릿 케이크',
        shortDescription: '시드니의 특별한 날을 위한 주문 제작 케이크입니다.',
        story: '현재 케이크 상세, 날짜 옵션과 예약 정보는 시드니 케이크 사이트에서 확인해 주세요.',
      },
    },
    media: noProductImage,
  },
  {
    id: 'vanilla-fresh-cream-cake',
    category: 'cakes',
    slug: 'vanilla-fresh-cream-cake',
    status: 'published',
    availability: 'preorder',
    action: { mode: 'external-booking', href: AU_BOOKING_PRODUCT_LINKS.vanillaFreshCreamCake },
    copy: {
      en: {
        name: 'Vanilla Fresh Cream Cake',
        shortDescription: 'A made-to-order cake for Sydney celebrations.',
        story: 'View the current cake details, date options and booking information on our Sydney cake site.',
      },
      ko: {
        name: '바닐라 생크림 케이크',
        shortDescription: '시드니의 특별한 날을 위한 주문 제작 케이크입니다.',
        story: '현재 케이크 상세, 날짜 옵션과 예약 정보는 시드니 케이크 사이트에서 확인해 주세요.',
      },
    },
    media: noProductImage,
  },
  {
    id: 'chocolate-pound-cake',
    category: 'bakes',
    slug: 'chocolate-pound-cake',
    status: 'published',
    availability: 'preorder',
    action: { mode: 'external-booking', href: AU_BOOKING_PRODUCT_LINKS.signatureGateauAuChocolat },
    copy: {
      en: {
        name: 'Chocolate Pound Cake',
        shortDescription: 'A Sydney bake available to view and book online.',
        story: 'View the current bake details, date options and booking information on our Sydney cake site.',
      },
      ko: {
        name: '초콜릿 파운드 케이크',
        shortDescription: '온라인에서 확인하고 예약할 수 있는 시드니 베이크입니다.',
        story: '현재 베이크 상세, 날짜 옵션과 예약 정보는 시드니 케이크 사이트에서 확인해 주세요.',
      },
    },
    media: noProductImage,
  },
  {
    id: 'chocolate-cupcakes',
    category: 'bakes',
    slug: 'chocolate-cupcakes',
    status: 'published',
    availability: 'preorder',
    action: { mode: 'external-booking', href: AU_BOOKING_PRODUCT_LINKS.chocolateCupcakes },
    copy: {
      en: {
        name: 'Chocolate Cupcakes',
        shortDescription: 'A Sydney bake available to view and book online.',
        story: 'View the current bake details, date options and booking information on our Sydney cake site.',
      },
      ko: {
        name: '초콜릿 컵케이크',
        shortDescription: '온라인에서 확인하고 예약할 수 있는 시드니 베이크입니다.',
        story: '현재 베이크 상세, 날짜 옵션과 예약 정보는 시드니 케이크 사이트에서 확인해 주세요.',
      },
    },
    media: noProductImage,
  },
  {
    id: 'lemon-cake',
    category: 'bakes',
    slug: 'lemon-cake',
    status: 'published',
    availability: 'preorder',
    action: { mode: 'external-booking', href: AU_BOOKING_PRODUCT_LINKS.lemonCake },
    copy: {
      en: {
        name: 'Lemon Cake',
        shortDescription: 'A Sydney bake available to view and book online.',
        story: 'View the current bake details, date options and booking information on our Sydney cake site.',
      },
      ko: {
        name: '레몬 케이크',
        shortDescription: '온라인에서 확인하고 예약할 수 있는 시드니 베이크입니다.',
        story: '현재 베이크 상세, 날짜 옵션과 예약 정보는 시드니 케이크 사이트에서 확인해 주세요.',
      },
    },
    media: noProductImage,
  },
  {
    id: 'chocolatiers-basque-cheesecake',
    category: 'bakes',
    slug: 'chocolatiers-basque-cheesecake',
    status: 'published',
    availability: 'preorder',
    action: { mode: 'external-booking', href: AU_BOOKING_PRODUCT_LINKS.chocolatiersBasqueCheesecake },
    copy: {
      en: {
        name: "Chocolatier's Basque Cheesecake",
        shortDescription: 'A Sydney bake available to view and book online.',
        story: 'View the current bake details, date options and booking information on our Sydney cake site.',
      },
      ko: {
        name: '쇼콜라티에의 바스크 치즈케이크',
        shortDescription: '온라인에서 확인하고 예약할 수 있는 시드니 베이크입니다.',
        story: '현재 베이크 상세, 날짜 옵션과 예약 정보는 시드니 케이크 사이트에서 확인해 주세요.',
      },
    },
    media: noProductImage,
  },
  {
    id: 'almond-chocoball',
    category: 'chocolate',
    slug: 'almond-chocoball',
    status: 'published',
    availability: 'available-daegu',
    action: catalogueOnly,
    copy: {
      en: {
        name: 'Almond Chocolate',
        shortDescription: 'Savory almonds coated in rich dark chocolate.',
        story: 'A balance of nutty crunch and deep cocoa character from the Verygood chocolate collection.',
        detailsLabel: 'Flavour notes',
        details: 'Almond · dark chocolate',
      },
      ko: {
        name: '아몬드 초콜릿',
        shortDescription: '진한 다크 초콜릿으로 감싼 고소한 아몬드.',
        story: '고소한 식감과 깊은 카카오의 균형을 담은 베리굿 초콜릿 컬렉션입니다.',
        detailsLabel: '맛의 포인트',
        details: '아몬드 · 다크 초콜릿',
      },
    },
    media: {
      card: '/assets/products/almond.png',
      hero: '/assets/products/almond-chocoball/almond_pop.webp',
      gallery: [],
      altEn: 'Almond Chocoball packaging.',
      altKo: '아몬드 초코볼 패키지.',
    },
  },
  {
    id: 'strawberry-bonbon',
    category: 'chocolate',
    slug: 'strawberry-bonbon',
    status: 'published',
    availability: 'available-daegu',
    action: catalogueOnly,
    copy: {
      en: {
        name: 'Strawberry Bonbon',
        shortDescription: 'Freeze-dried strawberry with white chocolate for a crisp, sweet bite.',
        story: 'A fruit-forward piece from the Verygood chocolate collection.',
        detailsLabel: 'Flavour notes',
        details: 'Freeze-dried strawberry · white chocolate',
      },
      ko: {
        name: '스트로베리 봉봉',
        shortDescription: '동결 건조 딸기와 화이트 초콜릿의 바삭하고 달콤한 한 입.',
        story: '과일의 인상을 살린 베리굿 초콜릿 컬렉션입니다.',
        detailsLabel: '맛의 포인트',
        details: '동결 건조 딸기 · 화이트 초콜릿',
      },
    },
    media: {
      card: '/assets/products/straw.png',
      hero: '/assets/products/strawberry-bonbon/bonbon_pop.webp',
      gallery: [],
      altEn: 'Strawberry Bonbon packaging.',
      altKo: '스트로베리 봉봉 패키지.',
    },
  },
  {
    id: 'eiffel-chocolate',
    category: 'chocolate',
    slug: 'eiffel-chocolate',
    status: 'published',
    availability: null,
    action: catalogueOnly,
    copy: {
      en: {
        name: 'Eiffel Tower Chocolate',
        shortDescription: '',
        story: '',
      },
      ko: {
        name: '에펠 초콜릿',
        shortDescription: '',
        story: '',
      },
    },
    media: {
      card: '/assets/booking/eiffel-chocolate-card.jpg',
      hero: '/assets/booking/eiffel-chocolate-card.jpg',
      gallery: [],
      altEn: 'Eiffel Chocolate in Verygood gift packaging.',
      altKo: '베리굿 기프트 패키지에 담긴 에펠 초콜릿.',
    },
  },
  {
    id: 'ruby-berry-chocoball',
    category: 'chocolate',
    slug: 'ruby-berry-chocoball',
    status: 'published',
    availability: 'available-daegu',
    action: catalogueOnly,
    copy: {
      en: {
        name: 'Ruby Berry Chocoball',
        shortDescription: 'Ruby chocolate with berry notes and a sweet fruit centre.',
        story: 'A berry-led chocolate piece from the Verygood collection.',
        detailsLabel: 'Flavour notes',
        details: 'Ruby chocolate · berry',
      },
      ko: {
        name: '루비 베리 초코볼',
        shortDescription: '베리의 인상과 달콤한 과일 중심을 담은 루비 초콜릿.',
        story: '베리의 매력을 담은 베리굿 초콜릿 컬렉션입니다.',
        detailsLabel: '맛의 포인트',
        details: '루비 초콜릿 · 베리',
      },
    },
    media: {
      card: '/assets/products/ruby.png',
      hero: '/assets/products/ruby-berry/ruby_pop.webp',
      gallery: [],
      altEn: 'Ruby Berry Chocoball packaging.',
      altKo: '루비 베리 초코볼 패키지.',
    },
  },
  {
    id: 'matcha-berry',
    category: 'chocolate',
    slug: 'matcha-berry',
    status: 'published',
    availability: 'available-daegu',
    action: catalogueOnly,
    copy: {
      en: {
        name: 'Matcha Berry',
        shortDescription: 'Matcha chocolate with a berry centre.',
        story: 'A green tea and berry combination from the Verygood chocolate collection.',
        detailsLabel: 'Flavour notes',
        details: 'Matcha · berry',
      },
      ko: {
        name: '말차 베리',
        shortDescription: '베리 중심을 담은 말차 초콜릿.',
        story: '그린 티와 베리의 조합을 담은 베리굿 초콜릿 컬렉션입니다.',
        detailsLabel: '맛의 포인트',
        details: '말차 · 베리',
      },
    },
    media: {
      card: '/assets/products/matcha.png',
      hero: '/assets/products/matcha-berry/jeju_pop.webp',
      gallery: [],
      altEn: 'Matcha Berry packaging.',
      altKo: '말차 베리 패키지.',
    },
  },
  {
    id: 'british-black',
    category: 'tea',
    slug: 'british-black',
    status: 'published',
    availability: 'not-announced-sydney',
    action: catalogueOnly,
    copy: {
      en: {
        name: 'British Black',
        shortDescription: 'Cacao nib, Earl Grey and cornflower. Deep, aromatic and softly sweet.',
        story: 'A dark, fragrant blend with cacao nib depth and the familiar lift of Earl Grey.',
        detailsLabel: 'Ingredients & flavour',
        details: 'Cacao nib · Earl Grey · cornflower',
      },
      ko: {
        name: '브리티시 블랙',
        shortDescription: '카카오 닙, 얼그레이, 콘플라워. 깊고 향긋하며 은은하게 달콤합니다.',
        story: '카카오 닙의 깊이와 익숙한 얼그레이 향을 담은 진하고 향긋한 블렌드입니다.',
        detailsLabel: '재료와 맛',
        details: '카카오 닙 · 얼그레이 · 콘플라워',
      },
    },
    media: {
      card: '/assets/products/british_cup.webp',
      hero: '/assets/products/british-black/british_pop.webp',
      gallery: [
        '/assets/products/british-black/gallery/british_th1.webp',
        '/assets/products/british-black/gallery/british_th2.webp',
        '/assets/products/british-black/gallery/british_th3.webp',
        '/assets/products/british-black/gallery/british_th4.webp',
      ],
      altEn: 'British Black tea in a glass cup.',
      altKo: '유리 찻잔에 담긴 브리티시 블랙.',
    },
  },
  {
    id: 'asian-gold',
    category: 'tea',
    slug: 'asian-gold',
    status: 'published',
    availability: 'not-announced-sydney',
    action: catalogueOnly,
    copy: {
      en: {
        name: 'Asian Gold',
        shortDescription: 'Golden Oolong tea with a smooth, floral finish.',
        story: 'A gentle oolong blend with a rounded texture and floral lift.',
        detailsLabel: 'Ingredients & flavour',
        details: 'Golden Oolong tea',
      },
      ko: {
        name: '아시안 골드',
        shortDescription: '부드럽고 꽃향이 감도는 골든 우롱 티.',
        story: '둥근 질감과 꽃향의 인상을 담은 부드러운 우롱 블렌드입니다.',
        detailsLabel: '재료와 맛',
        details: '골든 우롱 티',
      },
    },
    media: {
      card: '/assets/products/asian_cup.webp',
      hero: '/assets/products/asian-gold/asian_pop.webp',
      gallery: [
        '/assets/products/asian-gold/gallery/asian_th1.webp',
        '/assets/products/asian-gold/gallery/asian_th2.webp',
        '/assets/products/asian-gold/gallery/asian_th3.webp',
        '/assets/products/asian-gold/gallery/asian_th4.webp',
      ],
      altEn: 'Asian Gold tea in a glass cup.',
      altKo: '유리 찻잔에 담긴 아시안 골드.',
    },
  },
  {
    id: 'hibiscus-fruit',
    category: 'tea',
    slug: 'hibiscus-fruit',
    status: 'published',
    availability: 'not-announced-sydney',
    action: catalogueOnly,
    copy: {
      en: {
        name: 'Hibiscus Fruit',
        shortDescription: 'Hibiscus and tropical fruit for a bright, tangy cup.',
        story: 'A vivid fruit blend with hibiscus at its centre.',
        detailsLabel: 'Ingredients & flavour',
        details: 'Hibiscus · tropical fruit',
      },
      ko: {
        name: '히비스커스 프루트',
        shortDescription: '히비스커스와 열대 과일의 밝고 상큼한 한 잔.',
        story: '히비스커스를 중심으로 과일의 인상을 담은 선명한 블렌드입니다.',
        detailsLabel: '재료와 맛',
        details: '히비스커스 · 열대 과일',
      },
    },
    media: {
      card: '/assets/products/hibis_cup.webp',
      hero: '/assets/products/hibiscus-fruit/hibis_pop.webp',
      gallery: [
        '/assets/products/hibiscus-fruit/gallery/hibis_th1.webp',
        '/assets/products/hibiscus-fruit/gallery/hibis_th2.webp',
        '/assets/products/hibiscus-fruit/gallery/hibis_th3.webp',
        '/assets/products/hibiscus-fruit/gallery/hibis_th4.webp',
      ],
      altEn: 'Hibiscus Fruit tea in a glass cup.',
      altKo: '유리 찻잔에 담긴 히비스커스 프루트.',
    },
  },
  {
    id: 'minty-chocolat',
    category: 'tea',
    slug: 'minty-chocolat',
    status: 'published',
    availability: 'not-announced-sydney',
    action: catalogueOnly,
    copy: {
      en: {
        name: 'Minty Chocolat',
        shortDescription: 'Mint tea with cacao nibs for a cool, chocolatey finish.',
        story: 'A fresh mint-led blend with cacao nibs for a soft chocolate note.',
        detailsLabel: 'Ingredients & flavour',
        details: 'Mint tea · cacao nib',
      },
      ko: {
        name: '민티 쇼콜라',
        shortDescription: '카카오 닙을 더한 민트 티의 시원하고 초콜릿 같은 마무리.',
        story: '민트의 산뜻함에 카카오 닙의 부드러운 초콜릿 인상을 더한 블렌드입니다.',
        detailsLabel: '재료와 맛',
        details: '민트 티 · 카카오 닙',
      },
    },
    media: {
      card: '/assets/products/minty_cup.webp',
      hero: '/assets/products/minty-chocolat/minty_pop.webp',
      gallery: [
        '/assets/products/minty-chocolat/gallery/minty_th1.webp',
        '/assets/products/minty-chocolat/gallery/minty_th2.webp',
        '/assets/products/minty-chocolat/gallery/minty_th3.webp',
        '/assets/products/minty-chocolat/gallery/minty_th4.webp',
      ],
      altEn: 'Minty Chocolat tea in a glass cup.',
      altKo: '유리 찻잔에 담긴 민티 쇼콜라.',
    },
  },
  {
    id: 'hogeori-keyring',
    category: 'goods',
    slug: 'hogeori-keyring',
    status: 'published',
    availability: 'coming-soon',
    action: catalogueOnly,
    copy: {
      en: {
        name: 'Hogeori Keyring',
        shortDescription: 'A small Hogeori companion for your bag or keys.',
        story: 'A playful piece from the existing Verygood goods collection.',
        detailsLabel: 'About this item',
        details: 'Hogeori character keyring',
      },
      ko: {
        name: '호걸이 키링',
        shortDescription: '가방이나 열쇠에 함께할 작은 호걸이 친구.',
        story: '기존 베리굿 굿즈 컬렉션의 즐거운 아이템입니다.',
        detailsLabel: '아이템 소개',
        details: '호걸이 캐릭터 키링',
      },
    },
    media: {
      card: '/assets/products/hogirl.png',
      hero: '/assets/products/hogirl.png',
      gallery: [],
      altEn: 'Hogeori character keyring.',
      altKo: '호걸이 캐릭터 키링.',
    },
  },
  {
    id: 'buttercream-cake',
    category: 'cakes',
    slug: 'buttercream-cake',
    status: 'draft',
    availability: 'coming-soon',
    action: catalogueOnly,
    copy: {
      en: { name: 'Buttercream Cake', shortDescription: 'Not announced for the AU catalogue.', story: '' },
      ko: { name: '버터크림 케이크', shortDescription: 'AU 카탈로그에 아직 안내되지 않았습니다.', story: '' },
    },
    media: noProductImage,
  },
  {
    id: 'pave-chocolate',
    category: 'chocolate',
    slug: 'pave-chocolate',
    status: 'published',
    availability: null,
    action: catalogueOnly,
    copy: {
      en: { name: 'Pave Chocolate', shortDescription: 'A Verygood Chocolate piece.', story: '' },
      ko: { name: '파베 초콜릿', shortDescription: '베리굿 초콜릿 컬렉션의 한 피스.', story: '' },
    },
    media: placeholderProductImage,
  },
  {
    id: 'marshmallow-smores-stick',
    category: 'chocolate',
    slug: 'marshmallow-smores-stick',
    status: 'published',
    availability: null,
    action: catalogueOnly,
    copy: {
      en: { name: "S'mores Stick", shortDescription: '', story: '' },
      ko: { name: '스모어 스틱', shortDescription: '', story: '' },
    },
    media: placeholderProductImage,
  },
  {
    id: 'hogeori-plush',
    category: 'goods',
    slug: 'hogeori-plush',
    status: 'draft',
    availability: 'coming-soon',
    action: catalogueOnly,
    copy: {
      en: { name: 'Hogeori Plush', shortDescription: 'Not announced for the AU catalogue.', story: '' },
      ko: { name: '호걸이 플러시', shortDescription: 'AU 카탈로그에 아직 안내되지 않았습니다.', story: '' },
    },
    media: noProductImage,
  },
  {
    id: 'eco-bag',
    category: 'goods',
    slug: 'eco-bag',
    status: 'draft',
    availability: 'coming-soon',
    action: catalogueOnly,
    copy: {
      en: { name: 'Eco Bag', shortDescription: 'Not announced for the AU catalogue.', story: '' },
      ko: { name: '에코백', shortDescription: 'AU 카탈로그에 아직 안내되지 않았습니다.', story: '' },
    },
    media: noProductImage,
  },
  {
    id: 'pouch',
    category: 'goods',
    slug: 'pouch',
    status: 'draft',
    availability: 'coming-soon',
    action: catalogueOnly,
    copy: {
      en: { name: 'Pouch', shortDescription: 'Not announced for the AU catalogue.', story: '' },
      ko: { name: '파우치', shortDescription: 'AU 카탈로그에 아직 안내되지 않았습니다.', story: '' },
    },
    media: noProductImage,
  },
])
