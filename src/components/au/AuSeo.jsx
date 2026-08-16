import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { getAuSeoMetadata } from '../../utils/auSeo.js'

function createHeadElement(tagName, attributes) {
  const element = document.createElement(tagName)
  element.dataset.auSeo = 'true'

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value)
  }

  document.head.append(element)
  return element
}

export default function AuSeo({ locale = 'en', path = '/', title, description }) {
  const metadata = getAuSeoMetadata({ locale, path, title, description })

  useEffect(() => {
    document.title = metadata.title
    const tags = [
      createHeadElement('meta', { name: 'description', content: metadata.description }),
      createHeadElement('meta', { property: 'og:title', content: metadata.title }),
      createHeadElement('meta', { property: 'og:description', content: metadata.description }),
      createHeadElement('meta', { property: 'og:type', content: 'website' }),
      createHeadElement('link', { rel: 'canonical', href: metadata.canonical }),
      createHeadElement('link', { rel: 'alternate', hreflang: 'en-AU', href: metadata.alternates.en }),
      createHeadElement('link', { rel: 'alternate', hreflang: 'ko', href: metadata.alternates.ko }),
    ]

    return () => tags.forEach((tag) => tag.remove())
  }, [metadata])

  return (
    <Helmet>
      <html lang={metadata.language === 'ko' ? 'ko-KR' : 'en-AU'} />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={metadata.canonical} />
      <link rel="alternate" hrefLang="en-AU" href={metadata.alternates.en} />
      <link rel="alternate" hrefLang="ko" href={metadata.alternates.ko} />
    </Helmet>
  )
}
