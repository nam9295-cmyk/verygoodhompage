import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSelector from '../common/LanguageSelector';
import { getPrimaryNavigation } from '../../config/siteContent';
import { withLocale, getLocaleFromPath } from '../../utils/pathUtils';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const location = useLocation();
    const { isKr } = useLanguage();
    const locale = getLocaleFromPath(location.pathname);
    const navItems = getPrimaryNavigation(isKr);
    const isHome = location.pathname === '/' || location.pathname === '/en';

    const localPath = location.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    const isProductPage = localPath.startsWith('/product/');
    let backLink = withLocale('/', locale);
    let backText = isKr ? '홈' : 'Home';

    if (isProductPage) {
        const productId = localPath.split('/')[2];
        const product = products.find((p) => p.id === productId);
        if (product) {
            backLink = withLocale(`/category/${product.category}`, locale);
            backText = isKr ? `${product.category}로 돌아가기` : `Back to ${product.category}`;
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
                    {!isHome && isProductPage ? (
                        <Link to={backLink} className="icon-btn">
                            <span className="icon">←</span>
                            <span className="txt">{backText}</span>
                        </Link>
                    ) : (
                        <button className="icon-btn" onClick={openMenu} aria-label="Open menu">
                            <span className="icon">☰</span>
                            <span className="txt">{isKr ? '메뉴' : 'Menu'}</span>
                        </button>
                    )}
                </div>

                <Link className="brand always-visible" to={withLocale('/', locale)}>
                    <img className="brand-img" src="/assets/logo-type.png" alt="VERYGOOD" />
                </Link>

                {/* Desktop nav removed. Center is now reserved for the Logo. */}

                <nav className="topbar-actions" aria-label="Top actions">
                    <LanguageSelector />
                    <Link className="cta" to={withLocale('/cart', locale)}>
                        {isKr ? '장바구니' : 'Cart'} ({cartCount})
                    </Link>
                </nav>
            </header>

            {menuOpen && (
                <nav className="menu-overlay" role="navigation" aria-modal="true" aria-label="Site menu">
                    <div className="menu-head">
                        <div className="menu-title">MENU</div>
                        <button className="icon-btn" onClick={closeMenu} aria-label="Close menu">
                            <span className="icon">✕</span>
                            <span className="txt">{isKr ? '닫기' : 'Close'}</span>
                        </button>
                    </div>

                    <div className="menu-body">
                        {navItems.map((item) => (
                            <Link key={item.to} className="menu-link" to={withLocale(item.to, locale)} onClick={closeMenu}>
                                {item.label}
                            </Link>
                        ))}
                        <Link className="menu-link" to={withLocale('/category/chocolate', locale)} onClick={closeMenu}>
                            {isKr ? 'Chocolate 컬렉션' : 'Chocolate collection'}
                        </Link>
                        <Link className="menu-link" to={withLocale('/category/tea', locale)} onClick={closeMenu}>
                            {isKr ? 'Tea 컬렉션' : 'Tea collection'}
                        </Link>
                        <Link className="menu-link" to={withLocale('/category/gift', locale)} onClick={closeMenu}>
                            {isKr ? 'Gift 컬렉션' : 'Gift collection'}
                        </Link>

                    </div>
                </nav>
            )}
        </>
    );
}
