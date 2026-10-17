import { AU_LINKS } from './auLinks.js'

export const BRAND_SITE = Object.freeze({
  origin: 'https://verygood-chocolate.com',
  name: 'Verygood Chocolate',
  image: 'https://verygood-chocolate.com/assets/main.png',
  logo: 'https://verygood-chocolate.com/assets/brand/heart_logo.png',
  seo: {
    en: {
      title: 'Verygood Chocolate | Born in Daegu, Growing in Sydney',
      description: 'Discover Verygood Chocolate, a chocolatier-led brand born in Daegu and growing in Sydney. Explore our story and find our official Korea and Sydney websites.',
    },
    ko: {
      title: '베리굿 초콜릿 | 대구에서 시작해 시드니로',
      description: '대구에서 시작해 시드니로 이어지는 쇼콜라티에 브랜드 베리굿 초콜릿. 브랜드 이야기와 한국 매장, 한국 케이크 예약, 시드니 공식 온라인 주문 사이트를 만나보세요.',
    },
  },
  aboutSeo: {
    en: {
      title: 'Our Story | Verygood Chocolate',
      description: 'Meet Verygood Chocolate, from its beginnings in Daegu to its Sydney collection. Discover the chocolatier-led brand and its official Korea and Australia websites.',
    },
    ko: {
      title: '베리굿 이야기 | 베리굿 초콜릿',
      description: '초콜릿으로 시작한 대구의 베리굿과 시드니로 이어지는 이야기를 소개합니다. 쇼콜라티에 브랜드 베리굿의 시작과 한국·호주의 공식 사이트를 만나보세요.',
    },
  },
  officialSites: [
    { name: 'Verygood Chocolate Sydney', url: AU_LINKS.booking.home, inLanguage: ['en', 'ko'], description: 'Official Sydney online shop for current products, AUD prices, reservations and pickup information.' },
    { name: '베리굿 초콜릿 한국', url: AU_LINKS.korea, inLanguage: 'ko', description: 'Official Korean website for the Daegu store, menus and local news.' },
    { name: '베리굿 초콜릿 한국 케이크 예약', url: AU_LINKS.koreaCakes, inLanguage: ['ko', 'en'], description: 'Official cake reservations and custom cake enquiries for pickup in Daegu, Korea.' },
  ],
})
