import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import AuAppRoutes from './AuAppRoutes.jsx'
import { getPageSeo } from './utils/auSeo.js'

export function renderPage(pathname) {
  return {
    html: renderToString(<MemoryRouter initialEntries={[pathname]}><AuAppRoutes /></MemoryRouter>),
    metadata: getPageSeo(pathname),
  }
}
