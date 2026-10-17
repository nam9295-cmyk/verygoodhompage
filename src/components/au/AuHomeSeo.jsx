import { useEffect } from 'react'
import { getAuSiteContent } from '../../config/auSiteContent.js'
import { getAuSeoMetadata } from '../../utils/auSeo.js'

// The root brand home is a Vite SPA. Its static English metadata is a fallback.
// Update existing head elements in-place after navigation rather than mounting
// duplicate Helmet and manual SEO tags.
function singletonMeta(key, value, content) {
  const selector = 'meta[' + key + '="' + value + '"]'
  const matches = [...document.head.querySelectorAll(selector)]
  const meta = matches.shift() || document.createElement('meta')
  meta.setAttribute(key, value)
  meta.setAttribute('content', content)
  if (!meta.isConnected) document.head.append(meta)
  for (const extra of matches) extra.remove()
}

function singletonCanonical(url) {
  const matches = [...document.head.querySelectorAll('link[rel="canonical"]')]
  const link = matches.shift() || document.createElement('link')
  link.rel = 'canonical'
  link.href = url
  if (!link.isConnected) document.head.append(link)
  for (const extra of matches) extra.remove()
}

export default function AuHomeSeo({ locale }) {
  const content = getAuSiteContent(locale).seo
  const metadata = getAuSeoMetadata({ locale, path: '/', ...content })
  const language = locale === 'ko' ? 'ko-KR' : 'en-AU'

  useEffect(() => {
    document.title = metadata.title
    document.documentElement.lang = language
    singletonMeta('name', 'description', metadata.description)
    singletonMeta('name', 'robots', 'index, follow')
    singletonMeta('property', 'og:type', 'website')
    singletonMeta('property', 'og:title', metadata.title)
    singletonMeta('property', 'og:description', metadata.description)
    singletonMeta('property', 'og:url', metadata.canonical)
    singletonCanonical(metadata.canonical)

    // Only true locale alternates are advertised: root / and root /ko.
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(tag => tag.remove())
    for (const [hreflang, href] of [['en-AU', metadata.alternates.en], ['ko', metadata.alternates.ko]]) {
      const tag = document.createElement('link')
      tag.rel = 'alternate'
      tag.hreflang = hreflang
      tag.href = href
      document.head.append(tag)
    }
    return () => {
      document.head.querySelectorAll('link[rel="canonical"]').forEach(tag => tag.remove())
      document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(tag => tag.remove())
    }
  }, [metadata.title, metadata.description, metadata.canonical, metadata.alternates.en, metadata.alternates.ko, language])

  return null
}
