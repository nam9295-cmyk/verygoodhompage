import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageSeo, getSeoTags } from '../../utils/auSeo.js'

// Build-time HTML and client navigation share one metadata source and one owner.
export default function AuSeo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const metadata = getPageSeo(pathname)
    document.title = metadata.title
    document.documentElement.lang = metadata.language
    document.head.querySelectorAll('meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], link[rel="alternate"][hreflang], script[data-brand-schema]').forEach(tag => tag.remove())
    for (const [tagName, attributes] of getSeoTags(metadata)) {
      const tag = document.createElement(tagName)
      for (const [key, value] of Object.entries(attributes)) tag.setAttribute(key, value)
      document.head.append(tag)
    }
    if (metadata.structuredData) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.brandSchema = ''
      script.textContent = JSON.stringify(metadata.structuredData)
      document.head.append(script)
    }
  }, [pathname])
  return null
}
