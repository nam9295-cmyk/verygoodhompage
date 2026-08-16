import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { AU_LINKS } from '../../config/auLinks.js'
import { AU_NAVIGATION } from '../../config/auSiteContent.js'
import { stripLocalePath } from '../../utils/auPaths.js'
import AuNavigationLink from './AuNavigationLink.jsx'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])'

const mobileLabels = {
  en: {
    close: 'Close menu',
    menu: 'Menu',
    kids: 'Kids Cake Classes',
    korea: 'Korea',
  },
  ko: {
    close: '메뉴 닫기',
    menu: '메뉴',
    kids: '키즈 케이크 클래스',
    korea: '한국',
  },
}

const koNavigationLabels = {
  about: '소개',
  cakes: '케이크',
  chocolate: '초콜릿',
  tea: '티',
  goods: '굿즈',
}

export default function AuMobileMenu({ locale, onClose, returnFocusRef }) {
  const closeButtonRef = useRef(null)
  const menuRef = useRef(null)
  const labels = mobileLabels[locale === 'ko' ? 'ko' : 'en']
  const location = useLocation()

  useEffect(() => {
    const returnFocusTarget = returnFocusRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = [...menuRef.current.querySelectorAll(FOCUSABLE_SELECTOR)]
      const first = focusable[0]
      const last = focusable.at(-1)

      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      returnFocusTarget?.focus()
    }
  }, [onClose, returnFocusRef])

  const closeMenu = () => onClose()
  const navLabel = (item) => (locale === 'ko' ? koNavigationLabels[item.id] : item.label)

  return (
    <aside
      ref={menuRef}
      className="au-mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={labels.menu}
    >
      <div className="au-mobile-menu__head">
        <span>VERYGOOD</span>
        <button ref={closeButtonRef} type="button" className="au-menu-close" onClick={closeMenu} aria-label={labels.close}>
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <nav className="au-mobile-menu__links" aria-label={labels.menu}>
        {AU_NAVIGATION.map((item) => {
          const active = stripLocalePath(location.pathname) === `/${item.id}`

          return <AuNavigationLink key={item.id} item={item} locale={locale} active={active} onClick={closeMenu}>{navLabel(item)}</AuNavigationLink>
        })}
        <a href={AU_LINKS.booking.classes} target="_blank" rel="noreferrer" onClick={closeMenu}>
          {labels.kids} <span aria-hidden="true">↗</span>
        </a>
        <a href={AU_LINKS.korea} target="_blank" rel="noreferrer" onClick={closeMenu}>
          {labels.korea} <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </aside>
  )
}
