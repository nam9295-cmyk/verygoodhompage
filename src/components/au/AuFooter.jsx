import { Link } from 'react-router-dom'
import { AU_LINKS } from '../../config/auLinks.js'
import { AU_NAVIGATION, homeSectionHref } from '../../config/auSiteContent.js'

const labels = {
  en: {
    tagline: 'Born in Daegu. Growing in Sydney.',
    explore: 'Explore',
    sydney: 'Sydney',
    korea: 'Korea',
    instagram: 'Instagram',
    kids: 'Kids Classes',
    reviews: 'Reviews',
    lookup: 'Find My Booking',
    book: 'Book a Cake',
    visit: 'Visit Korean Website',
  },
  ko: {
    tagline: '대구에서 시작해, 시드니로.',
    explore: '둘러보기',
    sydney: '시드니',
    korea: '한국',
    instagram: '인스타그램',
    kids: '키즈 클래스',
    reviews: '후기',
    lookup: '예약 조회',
    book: '케이크 예약',
    visit: '한국 사이트 방문',
  },
}

const koNavigationLabels = {
  about: '소개',
  cakes: '케이크',
  bakes: '베이크',
  chocolate: '초콜릿',
  tea: '티',
  goods: '굿즈',
}

export default function AuFooter({ locale }) {
  const copy = labels[locale === 'ko' ? 'ko' : 'en']
  const year = new Date().getFullYear()

  return (
    <footer className="au-footer">
      <div className="au-shell au-footer__grid">
        <div className="au-footer__brand">
          <img src="/assets/logo-type.png" alt="Verygood Chocolate" />
          <p>{copy.tagline}</p>
        </div>

        <div className="au-footer__group">
          <h2>{copy.explore}</h2>
          {AU_NAVIGATION.map((item) => (
            <Link key={item.id} to={homeSectionHref(item.id, locale)}>
              {locale === 'ko' ? koNavigationLabels[item.id] : item.label}
            </Link>
          ))}
        </div>

        <div className="au-footer__group">
          <h2>{copy.sydney}</h2>
          <a href={AU_LINKS.booking.cakes} target="_blank" rel="noreferrer">{copy.book} <span aria-hidden="true">↗</span></a>
          <a href={AU_LINKS.booking.classes} target="_blank" rel="noreferrer">{copy.kids} <span aria-hidden="true">↗</span></a>
          <a href={AU_LINKS.booking.reviews} target="_blank" rel="noreferrer">{copy.reviews} <span aria-hidden="true">↗</span></a>
          <a href={AU_LINKS.booking.lookup} target="_blank" rel="noreferrer">{copy.lookup} <span aria-hidden="true">↗</span></a>
        </div>

        <div className="au-footer__group">
          <h2>{copy.korea}</h2>
          <a href={AU_LINKS.korea} target="_blank" rel="noreferrer">{copy.visit} <span aria-hidden="true">↗</span></a>
          <h2 className="au-footer__subhead">{copy.instagram}</h2>
          <a href={AU_LINKS.instagram} target="_blank" rel="noreferrer">@verygood_chocolate <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="au-shell au-footer__bottom">© {year} Verygood Chocolate</div>
    </footer>
  )
}
