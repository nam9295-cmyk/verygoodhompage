import { localeFromPath, localePath, stripLocalePath } from './auPaths.js'
import { BRAND_SITE } from '../config/brandSite.js'
import { AU_CATEGORY_CONTENT } from '../data/auCatalog.js'
import { getPublicAuProduct } from './auCatalog.js'

const absoluteUrl = (path) => `${BRAND_SITE.origin}${path}`

export function getAuSeoMetadata({ locale = 'en', path = '/', title, description, noindex = false, status = 200, image = BRAND_SITE.image, imageAlt = BRAND_SITE.name }) {
  const language = locale === 'ko' ? 'ko' : 'en'
  const localPath = stripLocalePath(path).replace(/\/$/, '') || '/'
  return {
    language, title, description, status,
    robots: noindex ? 'noindex, follow' : 'index, follow',
    canonical: status === 404 ? null : absoluteUrl(localePath(localPath, language)),
    alternates: status === 404 ? null : {
      en: absoluteUrl(localePath(localPath, 'en')),
      ko: absoluteUrl(localePath(localPath, 'ko')),
    },
    image,
    imageAlt,
    structuredData: null,
  }
}

function brandSchema(metadata) {
  const organizationId = `${BRAND_SITE.origin}/#organization`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': organizationId,
        name: BRAND_SITE.name,
        alternateName: ['베리굿 초콜릿', 'Very Good Chocolate'],
        url: `${BRAND_SITE.origin}/`, logo: BRAND_SITE.logo,
        sameAs: ['https://www.instagram.com/verygood_chocolate/'],
        subjectOf: BRAND_SITE.officialSites.map(site => ({ '@type': 'WebSite', ...site })),
      },
      {
        '@type': 'WebSite', '@id': `${BRAND_SITE.origin}/#website`,
        name: BRAND_SITE.name, alternateName: '베리굿 초콜릿',
        url: `${BRAND_SITE.origin}/`, inLanguage: ['en', 'ko'],
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'WebPage', '@id': `${metadata.canonical}#webpage`,
        url: metadata.canonical,
        name: metadata.title,
        inLanguage: metadata.language,
        isPartOf: { '@id': `${BRAND_SITE.origin}/#website` },
        about: { '@id': organizationId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          contentUrl: metadata.image,
          url: metadata.image,
          width: BRAND_SITE.homeImage.width,
          height: BRAND_SITE.homeImage.height,
          caption: metadata.imageAlt,
        },
      },
    ],
  }
}

export function getPageSeo(pathname = '/') {
  const locale = localeFromPath(pathname)
  const path = stripLocalePath(pathname).replace(/\/$/, '') || '/'
  const korean = locale === 'ko'
  if (path === '/') {
    const metadata = getAuSeoMetadata({
      locale, path, ...BRAND_SITE.seo[locale],
      image: absoluteUrl(BRAND_SITE.homeImage.path),
      imageAlt: BRAND_SITE.homeImage.alt[locale],
    })
    return { ...metadata, structuredData: brandSchema(metadata) }
  }
  if (path === '/about') {
    return getAuSeoMetadata({ locale, path, ...BRAND_SITE.aboutSeo[locale] })
  }
  const [, category, slug, extra] = path.split('/')
  if (!extra && ['chocolate', 'tea', 'goods'].includes(category)) {
    const product = slug ? getPublicAuProduct(category, slug) : null
    if (!slug || product) {
      const copy = product ? product.copy[locale] : AU_CATEGORY_CONTENT[category].copy[locale]
      return getAuSeoMetadata({
        locale, path, noindex: true,
        title: `${product ? copy.name : copy.title} | ${korean ? '브랜드 아카이브' : 'Brand archive'} | Verygood Chocolate`,
        description: product ? copy.shortDescription : copy.intro,
      })
    }
  }
  return getAuSeoMetadata({
    locale, path, noindex: true, status: 404,
    title: korean ? '페이지를 찾을 수 없습니다 | 베리굿 초콜릿' : 'Page not found | Verygood Chocolate',
    description: korean ? '베리굿 초콜릿 홈페이지에서 한국과 시드니의 공식 사이트를 찾아보세요.' : 'Visit the Verygood Chocolate brand home to find our official Korea and Sydney websites.',
  })
}

export function getSeoTags(metadata) {
  const tags = [
    ['meta', { name: 'description', content: metadata.description }],
    ['meta', { name: 'robots', content: metadata.robots }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: BRAND_SITE.name }],
    ['meta', { property: 'og:title', content: metadata.title }],
    ['meta', { property: 'og:description', content: metadata.description }],
    ['meta', { property: 'og:image', content: metadata.image }],
    ['meta', { property: 'og:image:alt', content: metadata.imageAlt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: metadata.title }],
    ['meta', { name: 'twitter:description', content: metadata.description }],
    ['meta', { name: 'twitter:image', content: metadata.image }],
    ['meta', { name: 'twitter:image:alt', content: metadata.imageAlt }],
  ]
  if (metadata.canonical) {
    tags.push(['link', { rel: 'canonical', href: metadata.canonical }], ['meta', { property: 'og:url', content: metadata.canonical }])
  }
  if (metadata.alternates && metadata.robots === 'index, follow') {
    for (const [hreflang, href] of Object.entries({ ...metadata.alternates, 'x-default': metadata.alternates.en })) {
      tags.push(['link', { rel: 'alternate', hreflang, href }])
    }
  }
  return tags
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

export function renderSeoHead(metadata) {
  const tags = getSeoTags(metadata).map(([tag, attributes]) => `<${tag} ${Object.entries(attributes).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ')}>`)
  if (metadata.structuredData) {
    tags.push(`<script type="application/ld+json" data-brand-schema>${JSON.stringify(metadata.structuredData).replace(/</g, '\\u003c')}</script>`)
  }
  return `<title>${escapeHtml(metadata.title)}</title>\n${tags.join('\n')}`
}
