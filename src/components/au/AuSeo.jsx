import { Helmet } from 'react-helmet-async'
import { localePath, stripLocalePath } from '../../utils/auPaths.js'

const SITE_ORIGIN = 'https://verygood-chocolate.com'

function absoluteUrl(path) {
  return `${SITE_ORIGIN}${path === '/' ? '/' : path}`
}

export default function AuSeo({ locale = 'en', path = '/', title, description }) {
  const language = locale === 'ko' ? 'ko' : 'en'
  const localPath = stripLocalePath(path)
  const canonicalPath = localePath(localPath, language)
  const englishPath = localePath(localPath, 'en')
  const koreanPath = localePath(localPath, 'ko')

  return (
    <Helmet>
      <html lang={language === 'ko' ? 'ko-KR' : 'en-AU'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={absoluteUrl(canonicalPath)} />
      <link rel="alternate" hrefLang="en-AU" href={absoluteUrl(englishPath)} />
      <link rel="alternate" hrefLang="ko" href={absoluteUrl(koreanPath)} />
    </Helmet>
  )
}
