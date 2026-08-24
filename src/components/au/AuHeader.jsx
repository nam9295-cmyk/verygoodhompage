import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AU_LINKS } from '../../config/auLinks.js'
import { AU_NAVIGATION } from '../../config/auSiteContent.js'
import { stripLocalePath } from '../../utils/auPaths.js'
import AuMobileMenu from './AuMobileMenu.jsx'
import AuNavigationLink from './AuNavigationLink.jsx'

const koNavigationLabels = {
  'whole-cakes': '홀 케이크',
  daily: '데일리',
  'something-fresh': '썸띵 프레시',
  chocolate: '베리굿 초콜릿',
  tea: '카카오 티',
  goods: '굿즈',
}

const labels = {
  en: { book: 'Book a Cake', korea: 'Korea', menu: 'Open menu' },
  ko: { book: '케이크 예약', korea: '한국', menu: '메뉴 열기' },
}

export default function AuHeader({ locale }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const location = useLocation()
  const copy = labels[locale === 'ko' ? 'ko' : 'en']
  const navLabel = (item) => (locale === 'ko' ? koNavigationLabels[item.id] : item.label)

  return (
    <header className="au-header">
      <div className="au-shell au-header__inner">
        <Link className="au-logo" to={locale === 'ko' ? '/ko' : '/'} aria-label="Verygood Chocolate home">
          <img src="/assets/brand/heart_logo.png" alt="Verygood Chocolate" />
        </Link>

        <nav className="au-desktop-nav" aria-label="Primary navigation">
          {AU_NAVIGATION.map((item) => {
            const active = !item.sectionId && stripLocalePath(location.pathname) === `/${item.id}`

            return <AuNavigationLink key={item.id} item={item} locale={locale} active={active}>{navLabel(item)}</AuNavigationLink>
          })}
        </nav>

        <div className="au-desktop-actions">
          <a className="au-header__korea" href={AU_LINKS.korea} target="_blank" rel="noreferrer">
            {copy.korea} <span aria-hidden="true">↗</span>
          </a>
          <a className="au-button au-button--small" href={AU_LINKS.booking.cakes} target="_blank" rel="noreferrer">
            {copy.book}
          </a>
        </div>

        <div className="au-mobile-actions">
          <a className="au-mobile-book" href={AU_LINKS.booking.cakes} target="_blank" rel="noreferrer">
            {copy.book}
          </a>
          <button ref={menuButtonRef} type="button" className="au-menu-button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-label={copy.menu}>
            <span>{locale === 'ko' ? '메뉴' : 'Menu'}</span>
            <span className="au-menu-button__lines" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>

      {menuOpen && <AuMobileMenu locale={locale} onClose={() => setMenuOpen(false)} returnFocusRef={menuButtonRef} />}
    </header>
  )
}
