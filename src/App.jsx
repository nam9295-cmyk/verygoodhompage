import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
const LocaleLayout = lazy(() => import('./components/layout/LocaleLayout'));
const HubHomePage = lazy(() => import('./pages/HubHomePage'));
const SectionLandingPage = lazy(() => import('./pages/SectionLandingPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const BusinessStoryPage = lazy(() => import('./pages/BusinessStoryPage'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'));
const RefundPolicy = lazy(() => import('./pages/legal/RefundPolicy'));
const ShippingPolicy = lazy(() => import('./pages/legal/ShippingPolicy'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));

function RouteLoadingFallback() {
  return (
    <div className="route-loading-shell" role="status" aria-live="polite">
      <div className="route-loading-card">
        <span className="route-loading-eyebrow">VERY GOOD</span>
        <h1>Loading the next page</h1>
        <p>The hub is preparing the selected section.</p>
      </div>
    </div>
  );
}

function App() {
  const publicRoutes = (
    <>
      <Route index element={<HubHomePage />} />
      <Route path="brand" element={<SectionLandingPage section="brand" />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="store" element={<SectionLandingPage section="store" />} />
      <Route path="services" element={<SectionLandingPage section="services" />} />
      <Route path="digital" element={<SectionLandingPage section="digital" />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="blog/:id" element={<BlogDetailPage />} />
      <Route path="contact" element={<SectionLandingPage section="contact" />} />

      <Route path="about" element={<AboutPage />} />
      <Route path="business-story" element={<BusinessStoryPage />} />
      <Route path="category/:id" element={<CategoryPage />} />
      <Route path="product/:id" element={<ProductDetailPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="order-success" element={<OrderSuccessPage />} />
      <Route path="privacy" element={<PrivacyPolicy />} />
      <Route path="terms" element={<TermsOfService />} />
      <Route path="refund" element={<RefundPolicy />} />
      <Route path="shipping" element={<ShippingPolicy />} />
      <Route path="home-legacy" element={<HomePage />} />
    </>
  );

  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route path="/" element={<LocaleLayout locale="ko" />}>
                {publicRoutes}
              </Route>

              <Route path="/en" element={<LocaleLayout locale="en" />}>
                {publicRoutes}
              </Route>

              <Route path="/" element={<LocaleLayout locale="ko" />}>
                <Route path="admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
