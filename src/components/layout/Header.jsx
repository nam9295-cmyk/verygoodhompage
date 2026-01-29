import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import LanguageSelector from '../common/LanguageSelector';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { t } = useTranslation();
    const { cartCount } = useCart();
    const location = useLocation();
    const isHome = location.pathname === '/';

    // Check if we are on a Product Detail Page
    const isProductPage = location.pathname.startsWith('/product/');
    let backLink = '/';
    let backText = t('header.home');

    if (isProductPage) {
        const productId = location.pathname.split('/')[2];
        const product = products.find(p => p.id === productId);
        if (product) {
            backLink = `/category/${product.category}`;
            backText = t('header.back_to', { category: product.category });
        }
    }

    const openMenu = () => {
        setMenuOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            <header className="topbar" style={{ top: '40px' }}>
                <div className="topbar-left">
                    {isHome ? (
                        <button className="icon-btn" onClick={openMenu} aria-label="Open menu">
                            <span className="icon">☰</span>
                            <span className="txt">{t('header.menu')}</span>
                        </button>
                    ) : (
                        <Link to={backLink} className="icon-btn">
                            <span className="icon">←</span>
                            <span className="txt">{backText}</span>
                        </Link>
                    )}
                </div>

                <Link className={`brand ${!isHome ? 'always-visible' : ''}`} to="/">
                    <img className="brand-img" src="/assets/logo-type.png" alt="VERYGOOD" />
                </Link>

                <nav className="topbar-actions" aria-label="Top actions">
                    <LanguageSelector />
                    <Link className="cta" to="/cart">
                        {t('header.cart_btn')} ({cartCount})
                    </Link>
                </nav>
            </header>

            {menuOpen && (
                <nav className="menu-overlay" role="navigation" aria-modal="true" aria-label="Site menu">
                    <div className="menu-head">
                        <div className="menu-title">MENU</div>
                        <button className="icon-btn" onClick={closeMenu} aria-label="Close menu">
                            <span className="icon">✕</span>
                            <span className="txt">{t('header.close')}</span>
                        </button>
                    </div>

                    <div className="menu-body">
                        <Link className="menu-link" to="/about" onClick={closeMenu}>{t('header.about')}</Link>
                        <Link className="menu-link" to="/business-story" onClick={closeMenu}>{t('header.business_story')}</Link>
                        <Link className="menu-link" to="/category/chocolate" onClick={closeMenu}>{t('header.chocolate')}</Link>
                        <Link className="menu-link" to="/category/tea" onClick={closeMenu}>{t('header.tea')}</Link>
                        <Link className="menu-link" to="/category/gift" onClick={closeMenu}>{t('header.gift')}</Link>
                        <Link className="menu-link" to="/#story" onClick={closeMenu}>{t('header.story')}</Link>
                        <Link className="menu-link" to="/blog" onClick={closeMenu}>{t('header.blog')}</Link>
                        <Link className="menu-link" to="/#contact" onClick={closeMenu}>{t('header.contact')}</Link>

                        <div className="menu-mini">
                            <div className="pill">배송: 전국</div>
                            <div className="pill">선물: 삼각박스</div>
                            <div className="pill">티: 디톡스 블렌딩</div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}
