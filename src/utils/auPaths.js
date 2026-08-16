export function localeFromPath(pathname = '/') {
  return pathname === '/ko' || pathname.startsWith('/ko/') ? 'ko' : 'en'
}

export function stripLocalePath(pathname = '/') {
  if (pathname === '/ko') return '/'
  return pathname.replace(/^\/ko(?=\/|$)/, '') || '/'
}

export function localePath(path = '/', locale = 'en') {
  const normalized = path.startsWith('/') ? path : `/${path}`

  if (locale !== 'ko') return stripLocalePath(normalized)
  const localPath = stripLocalePath(normalized)

  return localPath === '/' ? '/ko' : `/ko${localPath}`
}
