import { Link, useLocation } from 'react-router-dom'
import { localePath, stripLocalePath } from '../../utils/auPaths.js'

export default function LanguageLink({ locale, className = '' }) {
  const location = useLocation()
  const nextLocale = locale === 'ko' ? 'en' : 'ko'
  const label = locale === 'ko' ? 'EN' : '한국어'
  const href = `${localePath(stripLocalePath(location.pathname), nextLocale)}${location.hash}`

  return (
    <Link className={className} to={href} lang={nextLocale === 'ko' ? 'ko' : 'en'}>
      {label}
    </Link>
  )
}
