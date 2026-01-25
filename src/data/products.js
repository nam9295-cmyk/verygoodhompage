// Products data
const defaultGallery = [
  "/assets/detail_1.png",
  "/assets/detail_2.png",
  "/assets/detail_3.png",
  "/assets/detail_4.png"
];

export const products = [
  {
    id: "almond-chocoball",
    name: "Almond Chocoball",
    name_ko: "아몬드 초코볼",
    price: 8.24,
    priceStr: "$8.24",
    category: "chocolate",
    tabs: ["new", "best"],
    tags: ["CHOC", "BEST", "ALMOND"],
    mainImage: "/assets/products/almond.png",
    descImage: "/assets/products/detail-sample.jpg",
    nutritionImage: "/assets/products/almond-nutrition.png",
    description: "Savory almonds coated in premium dark chocolate. A perfect balance of nutty crunch and rich cocoa.",
    description_ko: "고소한 아몬드를 프리미엄 다크 초콜릿으로 감쌌습니다. 견과의 바삭함과 카카오의 풍미가 완벽한 조화를 이룹니다.",
    detailImages: defaultGallery,
    // Additions for Detail Modal
    type: 'chocolate',
    popImage: '/assets/products/almond-chocoball/almond_pop.webp',
    flavorStats: [
      { name: 'Crunchiness', value: 95, fill: '#3E2723' },
      { name: 'Nutty', value: 85, fill: '#D4AF37' },
      { name: 'Bitterness', value: 70, fill: '#8D6E63' },
      { name: 'Sweetness', value: 60, fill: '#FFE0B2' },
      { name: 'Aftertaste', value: 70, fill: '#FFAB91' }
    ],
    featureIcons: [
      { icon: '/assets/products/almond-chocoball/almond_icon1.svg', label: 'Roasting' },
      { icon: '/assets/products/almond-chocoball/almond_icon2.svg', label: 'High Cacao' },
      { icon: '/assets/products/almond-chocoball/almond_icon3.svg', label: 'Protein' },
      { icon: '/assets/products/almond-chocoball/almond_icon4.svg', label: 'Crunchy' }
    ]
  },
  {
    id: "ruby-berry-chocoball",
    name: "Ruby Berry Chocoball",
    name_ko: "루비 베리 초코볼",
    price: 8.98,
    priceStr: "$8.98",
    category: "chocolate",
    tabs: ["new", "best"],
    tags: ["CHOC", "FRUITY", "BLUEBERRY"],
    mainImage: "/assets/products/ruby.png",
    descImage: "/assets/products/detail-sample.jpg",
    nutritionImage: "/assets/products/ruby-nutrition.png",
    description: "Natural ruby chocolate with distinct berry notes, wrapping a sweet fruit core.",
    description_ko: "천연 루비 초콜릿 특유의 산뜻한 베리 향이 달콤한 과일 코어를 감싸 안습니다.",
    detailImages: defaultGallery,
    type: 'chocolate',
    popImage: '/assets/products/ruby-berry/ruby_pop.webp',
    flavorStats: [
      { name: 'Berry Aroma', value: 95, fill: '#D81B60' },
      { name: 'Sourness', value: 90, fill: '#F06292' },
      { name: 'Sweetness', value: 80, fill: '#F8BBD0' },
      { name: 'Creamy', value: 70, fill: '#F48FB1' },
      { name: 'Crunchy', value: 60, fill: '#EC407A' }
    ],
    featureIcons: [
      { icon: '/assets/products/ruby-berry/ruby_icon1.svg', label: 'Ruby Cocoa' },
      { icon: '/assets/products/ruby-berry/ruby_icon2.svg', label: 'No Colorants' },
      { icon: '/assets/products/ruby-berry/ruby_icon3.svg', label: 'Superfood' },
      { icon: '/assets/products/ruby-berry/ruby_icon4.svg', label: 'Sweet & Sour' }
    ]
  },
  {
    id: "strawberry-bonbon",
    name: "Strawberry Bonbon",
    name_ko: "딸기 봉봉",
    price: 7.49,
    priceStr: "$7.49",
    category: "chocolate",
    tabs: ["new"],
    tags: ["STRAW", "CRUNCH"],
    mainImage: "/assets/products/straw.png",
    descImage: "/assets/products/detail-sample.jpg",
    description: "Freeze-dried strawberries met white chocolate for a crunchy, sweet delight.",
    description_ko: "동결건조 딸기와 화이트 초콜릿의 만남. 바삭하고 달콤한 즐거움을 선사합니다.",
    detailImages: defaultGallery,
    type: 'chocolate',
    popImage: '/assets/products/strawberry-bonbon/bonbon_pop.webp',
    flavorStats: [
      { name: 'Real Strawberry', value: 95, fill: '#D32F2F' },
      { name: 'Crunchy', value: 90, fill: '#E57373' },
      { name: 'Sweetness', value: 85, fill: '#F06292' },
      { name: 'Creamy', value: 80, fill: '#F8BBD0' },
      { name: 'Sourness', value: 70, fill: '#FFCDD2' }
    ],
    featureIcons: [
      { icon: '/assets/products/strawberry-bonbon/bonbon_icon1.svg', label: 'Freeze-Dried' },
      { icon: '/assets/products/strawberry-bonbon/bonbon_icon2.svg', label: 'Real Fruit Inside' },
      { icon: '/assets/products/strawberry-bonbon/bonbon_icon3.svg', label: 'Creamy White' },
      { icon: '/assets/products/strawberry-bonbon/bonbon_icon4.svg', label: 'Vitamin C' }
    ]
  },
  {
    id: "matcha-berry",
    name: "Matcha Berry",
    name_ko: "말차 베리",
    price: 8.98,
    priceStr: "$8.98",
    category: "chocolate",
    tabs: ["new"],
    tags: ["DIP", "MATCHA"],
    mainImage: "/assets/products/matcha.png",
    descImage: "/assets/products/detail-sample.jpg",
    description: "Premium matcha chocolate coating with a surprise berry center.",
    description_ko: "프리미엄 말차 초콜릿 코팅 속에 숨겨진 상큼한 베리 센터의 조화.",
    detailImages: defaultGallery,
    type: 'chocolate',
    popImage: '/assets/products/matcha-berry/jeju_pop.webp',
    flavorStats: [
      { name: 'Green Aroma', value: 90, fill: '#43A047' },
      { name: 'Bitterness', value: 85, fill: '#1B5E20' },
      { name: 'Chewiness', value: 80, fill: '#AD1457' },
      { name: 'Richness', value: 75, fill: '#558B2F' },
      { name: 'Sweetness', value: 60, fill: '#AED581' }
    ],
    featureIcons: [
      { icon: '/assets/products/matcha-berry/jeju_icon1.svg', label: 'Jeju Origin' },
      { icon: '/assets/products/matcha-berry/jeju_icon2.svg', label: 'Double Layer' },
      { icon: '/assets/products/matcha-berry/jeju_icon3.svg', label: 'Cren Berry' },
      { icon: '/assets/products/matcha-berry/jeju_icon4.svg', label: 'Catechin' }
    ]
  },
  {
    id: "british-black",
    name: "British Black",
    name_ko: "브리티시 블랙",
    price: 7.49,
    priceStr: "$7.49",
    category: "tea",
    tabs: ["best", "tea"],
    tags: ["DETOX", "SIGNATURE", "EARLGREY"],
    mainImage: "/assets/products/british_cup.webp",
    hoverImage: "/assets/products/british.png",
    descImage: "/assets/products/detail-sample.jpg",
    description: "Deep and aromatic black tea blend, perfect for a relaxing afternoon.",
    description_ko: "깊고 그윽한 향의 홍차 블렌딩. 나른한 오후의 휴식에 완벽하게 어울립니다.",
    detailImages: defaultGallery,
    galleryImages: [
      "/assets/products/british-black/gallery/british_th1.webp",
      "/assets/products/british-black/gallery/british_th2.webp",
      "/assets/products/british-black/gallery/british_th3.webp",
      "/assets/products/british-black/gallery/british_th4.webp"
    ]
  },
  {
    id: "hibiscus-fruit",
    name: "Hibiscus Fruit",
    name_ko: "히비스커스 후르츠",
    price: 7.49,
    priceStr: "$7.49",
    category: "tea",
    tabs: ["best", "tea"],
    tags: ["DETOX", "FRUIT"],
    mainImage: "/assets/products/hibis_cup.webp",
    hoverImage: "/assets/products/hibis.png",
    descImage: "/assets/products/detail-sample.jpg",
    description: "Zesty hibiscus vibrantly blended with tropical fruits for a refreshing detox tea.",
    description_ko: "상큼한 히비스커스와 열대 과일의 생기 넘치는 블렌딩. 리프레쉬를 위한 디톡스 티입니다.",
    detailImages: defaultGallery,
    galleryImages: [
      "/assets/products/hibiscus-fruit/gallery/hibis_th1.webp",
      "/assets/products/hibiscus-fruit/gallery/hibis_th2.webp",
      "/assets/products/hibiscus-fruit/gallery/hibis_th3.webp",
      "/assets/products/hibiscus-fruit/gallery/hibis_th4.webp"
    ]
  },
  {
    id: "gift-2-set",
    name: "Gift 2 Set",
    name_ko: "선물 2구 세트",
    price: 22.99,
    priceStr: "$22.99",
    category: "gift",
    tabs: ["gift"],
    tags: ["GIFT", "BOX"],
    mainImage: "/assets/products/2set.png",
    descImage: "/assets/products/detail-sample.jpg",
    description: "A curated set of 2 premium chocolates, packaged in our signature triangular box.",
    description_ko: "엄선된 프리미엄 초콜릿 2종을 시그니처 삼각 박스에 담았습니다.",
    detailImages: defaultGallery
  },
  {
    id: "gift-4-set",
    name: "Gift 4 Set",
    name_ko: "선물 4구 세트",
    price: 29.89,
    priceStr: "$29.89",
    category: "gift",
    tabs: ["gift"],
    tags: ["GIFT", "PREMIUM"],
    mainImage: "/assets/products/4set.png",
    descImage: "/assets/products/detail-sample.jpg",
    description: "The ultimate collection. 4 varieties of our finest chocolates in a luxurious package.",
    description_ko: "베리굿의 최고급 초콜릿 4종을 모두 담은 럭셔리 패키지 컬렉션입니다.",
    detailImages: defaultGallery
  },
  {
    id: "hogirl-key-ring",
    name: "Hogirl Key-ring",
    name_ko: "호걸 키링",
    price: 2.10,
    priceStr: "$2.10",
    category: "gift",
    tabs: ["gift"],
    tags: ["ADD-ON"],
    mainImage: "/assets/products/hogirl.png",
    descImage: "/assets/products/detail-sample.jpg",
    description: "Cute Hogirl mascot key-ring to accompany your bag or keys.",
    description_ko: "가방이나 열쇠에 귀여움을 더해줄 호걸 마스코트 키링입니다.",
    detailImages: defaultGallery
  },
  {
    id: "horse-key-ring",
    name: "Horse Key-ring",
    name_ko: "말 키링",
    price: 2.10,
    priceStr: "$2.10",
    category: "gift",
    tabs: ["gift"],
    tags: ["ADD-ON"],
    mainImage: "/assets/products/horse.png",
    descImage: "/assets/products/detail-sample.jpg",
    description: "Elegant horse mascot key-ring, a symbol of freedom and energy.",
    description_ko: "자유와 에너지를 상징하는 우아한 말 마스코트 키링입니다.",
    detailImages: defaultGallery
  },
  {
    id: "asian-gold",
    name: "Asian Gold",
    name_ko: "아시안 골드",
    price: 7.49,
    priceStr: "$7.49",
    category: "tea",
    tabs: ["tea"],
    tags: ["DETOX", "OOLONG"],
    mainImage: "/assets/products/asian_cup.webp",
    hoverImage: "/assets/products/asian.png",
    descImage: "/assets/products/detail-sample.jpg",
    description: "Golden Oolong tea with a smooth, floral finish.",
    description_ko: "부드러운 꽃향기가 감도는 황금빛 우롱티입니다.",
    detailImages: defaultGallery,
    galleryImages: [
      "/assets/products/asian-gold/gallery/asian_th1.webp",
      "/assets/products/asian-gold/gallery/asian_th2.webp",
      "/assets/products/asian-gold/gallery/asian_th3.webp",
      "/assets/products/asian-gold/gallery/asian_th4.webp"
    ]
  },
  {
    id: "minty-chocolat",
    name: "Minty Chocolat",
    name_ko: "민티 초콜릿",
    price: 7.49,
    priceStr: "$7.49",
    category: "tea",
    tabs: ["tea"],
    tags: ["DETOX", "MINT"],
    mainImage: "/assets/products/minty_cup.webp",
    hoverImage: "/assets/products/minty.png",
    descImage: "/assets/products/detail-sample.jpg",
    description: "Refreshing mint tea with a hint of cacao nibs for a chocolatey aftertaste.",
    description_ko: "상쾌한 민트티에 카카오 닙스를 더해 은은한 초콜릿 풍미를 남깁니다.",
    detailImages: defaultGallery,
    galleryImages: [
      "/assets/products/minty-chocolat/gallery/minty_th1.webp",
      "/assets/products/minty-chocolat/gallery/minty_th2.webp",
      "/assets/products/minty-chocolat/gallery/minty_th3.webp",
      "/assets/products/minty-chocolat/gallery/minty_th4.webp"
    ]
  }
];
