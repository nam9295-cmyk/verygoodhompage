import { localePath, stripLocalePath } from './auPaths.js'

const SITE_ORIGIN = 'https://verygood-chocolate.com'

function absoluteUrl(path) {
  return `${SITE_ORIGIN}${path === '/' ? '/' : path}`
}

export function getAuSeoMetadata({ locale = 'en', path = '/', title, description }) {
  const language = locale === 'ko' ? 'ko' : 'en'
  const localPath = stripLocalePath(path)

  return {
    language,
    title,
    description,
    canonical: absoluteUrl(localePath(localPath, language)),
    alternates: {
      en: absoluteUrl(localePath(localPath, 'en')),
      ko: absoluteUrl(localePath(localPath, 'ko')),
    },
  }
}
