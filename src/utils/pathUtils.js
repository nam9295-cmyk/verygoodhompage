export function normalizeLocale(value) {
    return value?.startsWith('en') ? 'en' : 'ko';
}

export function getLocaleFromPath(pathname = '/') {
    return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ko';
}

export function stripLocalePrefix(pathname = '/') {
    if (pathname === '/en') {
        return '/';
    }

    const stripped = pathname.replace(/^\/en(?=\/|$)/, '');
    return stripped || '/';
}

export function withLocale(path = '/', locale = 'ko') {
    const normalizedLocale = normalizeLocale(locale);
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    if (normalizedLocale === 'en') {
        return normalizedPath === '/' ? '/en' : `/en${normalizedPath}`;
    }

    return normalizedPath;
}

export function swapLocaleInPath(pathname = '/', locale = 'ko') {
    return withLocale(stripLocalePrefix(pathname), locale);
}
