import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createServer } from 'vite'
import { AU_LEGACY_PRODUCT_TARGETS, AU_PUBLIC_PRODUCT_IDS } from '../src/data/auCatalog.js'
import { getPublicAuProduct, getPublicAuProducts } from '../src/utils/auCatalog.js'
import { localePath } from '../src/utils/auPaths.js'
import { renderSeoHead } from '../src/utils/auSeo.js'

const output = resolve('dist')
const template = await readFile(resolve(output, 'index.html'), 'utf8')
const headMarker = /<!--site-head-start-->[\s\S]*?<!--site-head-end-->/
if (!headMarker.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('Prerender placeholders are missing from the Vite build')
}

const paths = ['/', '/about']
for (const category of Object.keys(AU_PUBLIC_PRODUCT_IDS)) {
  paths.push(`/${category}`, ...getPublicAuProducts(category).map(product => `/${category}/${product.slug}`))
}
const localizedPaths = ['en', 'ko'].flatMap(locale => paths.map(path => localePath(path, locale)))
const server = await createServer({ appType: 'custom', server: { middlewareMode: true, ws: false, watch: null } })
try {
  const { renderPage } = await server.ssrLoadModule('/src/entry-server.jsx')
  for (const path of [...localizedPaths, '/404']) {
    const { html, metadata } = renderPage(path)
    const document = template
      .replace(/<html lang="[^"]*">/, `<html lang="${metadata.language}">`)
      .replace(headMarker, () => renderSeoHead(metadata))
      .replace('<div id="root"></div>', () => `<div id="root" data-page-status="${metadata.status}">${html}</div>`)
    const destination = resolve(output, path === '/' ? 'index.html' : `${path.slice(1)}.html`)
    await mkdir(dirname(destination), { recursive: true })
    await writeFile(destination, document)
  }

  // Preserve old product links only when a published archive page exists.
  const redirects = [await readFile('public/_redirects', 'utf8')]
  for (const [slug, [category, target]] of Object.entries(AU_LEGACY_PRODUCT_TARGETS)) {
    if (!getPublicAuProduct(category, target)) continue
    for (const locale of ['en', 'ko']) {
      redirects.push(`${localePath(`/product/${slug}`, locale)} ${localePath(`/${category}/${target}`, locale)} 301`)
    }
  }
  await writeFile(resolve(output, '_redirects'), `${redirects.join('\n')}\n`)
  console.log(`Prerendered ${localizedPaths.length} brand and archive pages, plus 404.html.`)
} finally {
  await server.close()
}
