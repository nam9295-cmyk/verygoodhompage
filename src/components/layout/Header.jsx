import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { lang, toggle, isKr } = useLanguage();
    const location = useLocation();
    const isHome = location.pathname === '/';

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
            <header className="topbar">
                <div className="topbar-left">
                    {isHome ? (
                        <button className="icon-btn" onClick={openMenu} aria-label="Open menu">
                            <span className="icon">☰</span>
                            <span className="txt">Menu</span>
                        </button>
                    ) : (
                        <Link to="/" className="icon-btn">
                            <span className="txt">← {isKr ? '홈으로' : 'Home'}</span>
                        </Link>
                    )}
                </div>

                <Link className="brand" to="/" style={!isHome ? { opacity: 1, transform: 'none', pointerEvents: 'auto' } : {}}>
                    <img className="brand-img" src="/assets/logo-type.png" alt="VERYGOOD" />
                </Link>

                <nav className="topbar-actions" aria-label="Top actions">
                    <button
                        className={`lang-switch ${isKr ? 'is-kr' : ''}`}
                        onClick={toggle}
                        aria-label="Switch language"
                    >
                        <span className="toggle-circle">{lang}</span>
                    </button>
                    <Link className="cta" to="/#shop">ORDER</Link>
                </nav>
            </header>

            {menuOpen && (
                <nav className="menu-overlay" role="navigation" aria-modal="true" aria-label="Site menu">
                    <div className="menu-head">
                        <div className="menu-title">MENU</div>
                        <button className="icon-btn" onClick={closeMenu} aria-label="Close menu">
                            <span className="icon">✕</span>
                            <span className="txt">Close</span>
                        </button>
                    </div>

                    <div className="menu-body">
                        <Link className="menu-link" to="/about" onClick={closeMenu}>ABOUT</Link>
                        <Link className="menu-link" to="/business-story" onClick={closeMenu}>BUSINESS STORY</Link>
                        <Link className="menu-link" to="/#shop" onClick={closeMenu}>SHOP</Link>
                        <Link className="menu-link" to="/#story" onClick={closeMenu}>STORY</Link>
                        <Link className="menu-link" to="/blog" onClick={closeMenu}>BLOG</Link>
                        <Link className="menu-link" to="/#contact" onClick={closeMenu}>CONTACT</Link>

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
