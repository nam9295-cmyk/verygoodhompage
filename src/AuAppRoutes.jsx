import { Route, Routes } from 'react-router-dom'
import AuLayout from './components/au/AuLayout.jsx'
import AuHomePage from './pages/au/AuHomePage.jsx'
import AuNotFoundPage from './pages/au/AuNotFoundPage.jsx'
import AuAboutPage from './pages/au/AuAboutPage.jsx'
import AuCategoryPage from './pages/au/AuCategoryPage.jsx'
import AuProductPage from './pages/au/AuProductPage.jsx'
import LegacyProductRedirect from './pages/au/LegacyProductRedirect.jsx'

export default function AuAppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuLayout locale="en" />}>
        <Route index element={<AuHomePage locale="en" />} />
        <Route path="about" element={<AuAboutPage locale="en" />} />
        <Route path="cakes" element={<AuCategoryPage category="cakes" locale="en" />} />
        <Route path="bakes" element={<AuCategoryPage category="bakes" locale="en" />} />
        <Route path="chocolate" element={<AuCategoryPage category="chocolate" locale="en" />} />
        <Route path="chocolate/:slug" element={<AuProductPage category="chocolate" locale="en" />} />
        <Route path="tea" element={<AuCategoryPage category="tea" locale="en" />} />
        <Route path="tea/:slug" element={<AuProductPage category="tea" locale="en" />} />
        <Route path="goods" element={<AuCategoryPage category="goods" locale="en" />} />
        <Route path="goods/:slug" element={<AuProductPage category="goods" locale="en" />} />
        <Route path="product/:slug" element={<LegacyProductRedirect locale="en" />} />
      </Route>
      <Route path="/ko" element={<AuLayout locale="ko" />}>
        <Route index element={<AuHomePage locale="ko" />} />
        <Route path="about" element={<AuAboutPage locale="ko" />} />
        <Route path="cakes" element={<AuCategoryPage category="cakes" locale="ko" />} />
        <Route path="bakes" element={<AuCategoryPage category="bakes" locale="ko" />} />
        <Route path="chocolate" element={<AuCategoryPage category="chocolate" locale="ko" />} />
        <Route path="chocolate/:slug" element={<AuProductPage category="chocolate" locale="ko" />} />
        <Route path="tea" element={<AuCategoryPage category="tea" locale="ko" />} />
        <Route path="tea/:slug" element={<AuProductPage category="tea" locale="ko" />} />
        <Route path="goods" element={<AuCategoryPage category="goods" locale="ko" />} />
        <Route path="goods/:slug" element={<AuProductPage category="goods" locale="ko" />} />
        <Route path="product/:slug" element={<LegacyProductRedirect locale="ko" />} />
      </Route>
      <Route path="*" element={<AuNotFoundPage />} />
    </Routes>
  )
}
