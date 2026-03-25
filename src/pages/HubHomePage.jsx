import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import { fetchBlogs } from '../services/blogs';
import { getHomeSections } from '../config/siteContent';
import { withLocale } from '../utils/pathUtils';
import { formatBlogDate } from '../utils/formatBlogDate';
import { getSectionAsset } from '../config/sectionAssets';
import SectionVisual from '../components/common/SectionVisual';

export default function HubHomePage() {
    const { isKr } = useLanguage();
    const locale = isKr ? 'ko' : 'en';
    const content = getHomeSections(isKr);
    const [latestPosts, setLatestPosts] = useState([]);

    useEffect(() => {
        let active = true;
        async function loadPosts() {
            const posts = await fetchBlogs();
            if (active) {
                setLatestPosts(posts.slice(0, 3));
            }
        }
        loadPosts();
        return () => { active = false; };
    }, []);

    const featuredProducts = useMemo(() => {
        const ids = ['almond-chocoball', 'british-black', 'gift-4-set'];
        return ids
            .map((id) => products.find((product) => product.id === id))
            .filter(Boolean);
    }, []);

    return (
        <>
            <Helmet>
                <title>{isKr ? '베리굿 | VERYGOOD CHOCOLATE' : 'Very Good | VERYGOOD CHOCOLATE'}</title>
                <meta
                    name="description"
                    content={isKr
                        ? '당신의 베리굿 초콜릿. 섬세하고 깊이 있는 휴식의 제안.'
                        : 'Discover your Very Good Chocolate. A refined, deep resting experience.'}
                />
            </Helmet>

            <main className="hub-home" style={{ background: 'var(--paper)', color: 'var(--brand)', overflowX: 'hidden' }}>
                {/* 1. IMMERSIVE HERO */}
                <section className="apple-hero-section" style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <SectionVisual
                            asset={getSectionAsset('store', 'hero')}
                            alt={isKr ? '베리굿 메인 비주얼' : 'Very Good home visual'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    {/* Soft, luxurious Green/Earth Overlay */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(42, 79, 68, 0.45) 0%, rgba(250, 248, 245, 0.1) 100%)' }} />
                    <div style={{ position: 'relative', zIndex: 2, color: '#FAF8F5', width: '100%', maxWidth: '1024px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
                        <h1 className="apple-hero-title">
                            {isKr ? '초콜릿이 필요할 땐, 베리굿' : 'VERY GOOD CHOCOLATE.'}
                        </h1>
                        <p className="apple-hero-subtitle">
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            {content.hero.ctas.slice(0, 1).map((cta) => (
                                <Link key={cta.label} to={withLocale(cta.to, locale)} className="apple-hero-btn">
                                    {cta.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. THE COCOA EXPERTS. */}
                <section className="apple-section" style={{ background: 'var(--paper)', color: 'var(--brand)' }}>
                    <div className="apple-container">
                        <h2 className="apple-section-title" style={{ textAlign: 'center', marginBottom: '80px' }}>
                            {isKr ? '카카오의 본질을 설계하다.' : 'THE COCOA EXPERTS.'}
                        </h2>
                        <div className="apple-values-grid">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--brand)' }}>1. SOURCING</h3>
                                <p style={{ fontSize: '1.15rem', lineHeight: 1.6, fontWeight: 300, opacity: 0.85 }}>{isKr ? '최고급 카카오빈만을 엄선합니다. 지속 가능한 생태계를 유지하는 프리미어 농장과 직접 교류하며 가장 신선한 재료를 수급합니다.' : 'We exclusively select the finest sustainable cocoa beans, sourcing directly from premier farms to ensure absolute freshness.'}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--brand)' }}>2. TECHNOLOGY</h3>
                                <p style={{ fontSize: '1.15rem', lineHeight: 1.6, fontWeight: 300, opacity: 0.85 }}>{isKr ? '독자적인 템퍼링 및 정밀 로스팅 기술을 통해 카카오가 품은 미세한 테이스팅 노트 하나까지 완벽하게 추출해냅니다.' : 'Advanced proprietary roasting technology allows us to perfectly extract every subtle tasting note hidden within the cocoa.'}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--brand)' }}>3. WELLNESS</h3>
                                <p style={{ fontSize: '1.15rem', lineHeight: 1.6, fontWeight: 300, opacity: 0.85 }}>{isKr ? '우리는 설탕의 단맛에 의존하지 않습니다. 몸과 마음에 진정한 휴식을 주는 무해하고 균형 잡힌 라이프스타일을 제안합니다.' : 'We do not rely on sugar. We propose a balanced, healthy lifestyle experience that offers genuine rest for mind and body.'}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. MEET THE MENU */}
                <section className="apple-section" style={{ background: 'var(--surface)', color: 'var(--brand)' }}>
                    <div className="apple-container">
                        <div className="apple-section-header">
                            <h2 className="apple-section-title">
                                {isKr ? '시그니처 셀렉션.' : 'DISCOVER THE MENU.'}
                            </h2>
                            <Link to={withLocale('/products', locale)} className="apple-explore-link">
                                {isKr ? '전체 둘러보기' : 'Explore all'} <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>→</span>
                            </Link>
                        </div>

                        <div className="apple-horizontal-scroller">
                            {featuredProducts.map((product) => (
                                <Link key={product.id} to={withLocale(`/product/${product.id}`, locale)} className="apple-product-link">
                                    <div className="apple-img-wrap">
                                        <img
                                            src={product.mainImage}
                                            alt={isKr ? product.name_ko : product.name}
                                            style={{ width: '100%', height: '100%', minHeight: '360px', objectFit: 'cover', display: 'block' }}
                                        />
                                    </div>
                                    <h3 style={{ fontSize: '1.75rem', fontWeight: 600, margin: '0 0 8px' }}>{isKr ? product.name_ko : product.name}</h3>
                                    <p style={{ fontSize: '1.1rem', margin: 0, opacity: 0.7, fontWeight: 300, lineHeight: 1.5 }}>{isKr ? product.description_ko : product.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. EXPERIENCES BENTO */}
                <section className="apple-section" style={{ background: 'var(--paper)' }}>
                    <div className="apple-container">
                        <h2 className="apple-section-title" style={{ color: 'var(--brand)', textAlign: 'center', marginBottom: '64px' }}>
                            {isKr ? '초콜릿, 그 이상의 경험.' : 'EXPERIENCE MORE.'}
                        </h2>

                        <div className="apple-bento-grid">
                            {/* THE STAR: Wellness App Tile */}
                            <Link to={withLocale(content.digitalCards[0].fallbackTo, locale)} className="apple-tile apple-tile-hero" style={{ background: '#EAE6DD' }}>
                                <div className="apple-tile-content" style={{ zIndex: 2 }}>
                                    <p className="apple-eyebrow">WELLNESS APP</p>
                                    <h3 className="apple-tile-title">{content.digitalCards[0].title}</h3>
                                    <p className="apple-tile-body">{content.digitalCards[0].body}</p>
                                </div>
                                <div className="apple-device-mockup">
                                    <div className="apple-device-bezel">
                                        <SectionVisual asset={getSectionAsset(content.digitalCards[0].assetKey, 'card')} alt="App Interface" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95 }} />
                                        <div className="apple-dynamic-island" />
                                    </div>
                                </div>
                            </Link>

                            {/* Reservation Tile */}
                            <a href={content.serviceCards[0].href} target="_blank" rel="noreferrer" className="apple-tile apple-tile-standard" style={{ background: '#DCE4DD' }}>
                                <div className="apple-tile-content">
                                    <p className="apple-eyebrow">SERVICE</p>
                                    <h3 className="apple-tile-title-sm">{content.serviceCards[0].title}</h3>
                                    <div className="apple-tile-cta">
                                        {content.serviceCards[0].ctaLabel} <span>↗</span>
                                    </div>
                                </div>
                            </a>

                            {/* Beta AI Tile */}
                            <a href={content.digitalCards[2].href || '#'} target="_blank" rel="noreferrer" className="apple-tile apple-tile-standard" style={{ background: 'var(--brand)', color: 'var(--paper)' }}>
                                <div className="apple-tile-content">
                                    <p className="apple-eyebrow" style={{ color: 'var(--paper)' }}>THE HYPER-PERSONAL</p>
                                    <h3 className="apple-tile-title-sm">{content.digitalCards[2].title}</h3>
                                    <div className="apple-tile-cta">
                                        {content.digitalCards[2].ctaLabel} <span>↗</span>
                                    </div>
                                </div>
                            </a>

                            {/* Store / Tea / Community Minimal Tiles */}
                            <Link to={withLocale(content.overviewCards[1].to, locale)} className="apple-tile apple-tile-standard" style={{ background: 'var(--surface)' }}>
                                <div className="apple-tile-content">
                                    <p className="apple-eyebrow">TEA BLENDING</p>
                                    <h3 className="apple-tile-title-sm">{content.overviewCards[1].title}</h3>
                                    <div className="apple-tile-cta">
                                        {content.overviewCards[1].ctaLabel} <span>↗</span>
                                    </div>
                                </div>
                            </Link>

                            <a href={content.serviceCards[1].href} target="_blank" rel="noreferrer" className="apple-tile apple-tile-standard" style={{ background: '#ECEAE4' }}>
                                <div className="apple-tile-content">
                                    <p className="apple-eyebrow">COMMUNITY</p>
                                    <h3 className="apple-tile-title-sm">{content.serviceCards[1].title}</h3>
                                    <div className="apple-tile-cta">
                                        {content.serviceCards[1].ctaLabel} <span>↗</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>

                {/* 5. JOURNAL */}
                <section className="apple-section" style={{ background: 'var(--brand)', color: 'var(--paper)' }}>
                    <div className="apple-container">
                        <div className="apple-section-header">
                            <h2 className="apple-section-title">
                                {isKr ? '아름다움에 대한 기록.' : 'THE JOURNAL.'}
                            </h2>
                            <Link to={withLocale('/blog', locale)} className="apple-explore-link" style={{ color: 'var(--paper)' }}>
                                {isKr ? '모든 글 읽기' : 'Read All'} <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>→</span>
                            </Link>
                        </div>

                        <div className="apple-horizontal-scroller">
                            {latestPosts.map((post) => (
                                <Link key={post.id} to={withLocale(`/blog/${post.id}`, locale)} className="apple-product-link">
                                    <div className="apple-journal-wrap">
                                        <SectionVisual
                                            asset={post.imageUrl || post.thumbnail
                                                ? { type: 'image', src: post.imageUrl || post.thumbnail, alt: post.title }
                                                : getSectionAsset('blog', 'card')}
                                            alt={post.title}
                                            style={{ width: '100%', height: '100%', minHeight: '280px', objectFit: 'cover', opacity: 0.9 }}
                                        />
                                    </div>
                                    <div style={{ padding: '0 8px' }}>
                                        <div style={{ fontSize: '0.9rem', letterSpacing: '0.05em', color: 'rgba(250,248,245,0.6)', marginBottom: '12px', fontWeight: 500 }}>{formatBlogDate(post.date ?? post.createdAt)}</div>
                                        <h3 style={{ margin: '0 0 12px', fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.3 }}>{(isKr && post.title_ko) ? post.title_ko : post.title}</h3>
                                        <p style={{ margin: 0, opacity: 0.7, fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 300 }}>{(isKr && post.summary_ko) ? post.summary_ko : (post.summary || '')}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
