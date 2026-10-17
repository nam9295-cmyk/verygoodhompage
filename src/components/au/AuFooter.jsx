import { AU_LINKS } from '../../config/auLinks.js'
import { AU_FOOTER_NAVIGATION } from '../../config/auSiteContent.js'
import AuNavigationLink from './AuNavigationLink.jsx'
import LanguageLink from './LanguageLink.jsx'

const labels = {
  en: {
    tagline: 'Born in Daegu. Growing in Sydney.',
    explore: 'Explore',
    sydney: 'Sydney',
    korea: 'Korea',
    instagram: 'Instagram',
    reviews: 'Reviews',
    lookup: 'Find My Booking',
    book: 'Shop Sydney',
    visit: 'Visit Korean Website',
    cakes: 'Korea Cake Reservations',
  },
  ko: {
    tagline: '대구에서 시작해, 시드니로.',
    explore: '둘러보기',
    sydney: '시드니',
    korea: '한국',
    instagram: '인스타그램',
    reviews: '후기',
    lookup: '예약 조회',
    book: '시드니 온라인 주문',
    visit: '한국 사이트 방문',
    cakes: '한국 케이크 예약',
  },
}

const koNavigationLabels = {
  about: '소개',
  cakes: '케이크 & 베이크',
  chocolates: '초콜릿',
  celebrate: '셀러브레이트',
  'custom-cakes': '커스텀 케이크',
  business: '비즈니스',
}

export default function AuFooter({ locale }) {
  const copy = labels[locale === 'ko' ? 'ko' : 'en']
  const year = new Date().getFullYear()

  return (
    <footer className="au-footer">
      <div className="au-shell au-footer__grid">
        <div className="au-footer__brand">
          <img src="/assets/brand/heart_logo.png" alt="Verygood Chocolate" />
          <p>{copy.tagline}</p>
        </div>

        <div className="au-footer__group">
          <h2>{copy.explore}</h2>
          {AU_FOOTER_NAVIGATION.map((item) => (
            <AuNavigationLink key={item.id} item={item} locale={locale}>
              {locale === 'ko' ? koNavigationLabels[item.id] : item.label}
            </AuNavigationLink>
          ))}
        </div>

        <div className="au-footer__group">
          <h2>{copy.sydney}</h2>
          <a href={AU_LINKS.booking.home} target="_blank" rel="noreferrer">{copy.book} <span aria-hidden="true">↗</span></a>
          <a href={AU_LINKS.booking.reviews} target="_blank" rel="noreferrer">{copy.reviews} <span aria-hidden="true">↗</span></a>
          <a href={AU_LINKS.booking.lookup} target="_blank" rel="noreferrer">{copy.lookup} <span aria-hidden="true">↗</span></a>
          <a href={AU_LINKS.sydneyInstagram} target="_blank" rel="noreferrer">@verygood_syd <span aria-hidden="true">↗</span></a>
        </div>

        <div className="au-footer__group">
          <h2>{copy.korea}</h2>
          <a href={AU_LINKS.korea} target="_blank" rel="noreferrer">{copy.visit} <span aria-hidden="true">↗</span></a>
          <a href={AU_LINKS.koreaCakes} target="_blank" rel="noreferrer">{copy.cakes} <span aria-hidden="true">↗</span></a>
          <h2 className="au-footer__subhead">{copy.instagram}</h2>
          <a href={AU_LINKS.instagram} target="_blank" rel="noreferrer">@verygood_chocolate <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="au-shell au-footer__bottom">
        <span>© {year} Verygood Chocolate</span>
        <LanguageLink locale={locale} />
      </div>
    </footer>
  )
}
