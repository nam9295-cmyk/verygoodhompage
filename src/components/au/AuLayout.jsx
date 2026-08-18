import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getAuSiteContent } from '../../config/auSiteContent.js'
import AuFooter from './AuFooter.jsx'
import AuHeader from './AuHeader.jsx'

export default function AuLayout({ locale }) {
  const content = getAuSiteContent(locale)
  const documentLanguage = content.locale

  useEffect(() => {
    document.documentElement.lang = documentLanguage
  }, [documentLanguage])

  return (
    <div className="au-site" lang={documentLanguage}>
      <div className="au-fixed-tiger-background" aria-hidden="true" />
      <a className="au-skip-link" href="#main-content">{content.ui.skipLabel}</a>
      <AuHeader locale={locale} />
      <main id="main-content"><Outlet /></main>
      <AuFooter locale={locale} />
    </div>
  )
}
