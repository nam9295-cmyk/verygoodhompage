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
                        ? '베리굿 초콜릿과 티, 매장과 디지털 프로젝트를 한곳에서 만나는 브랜드 홈페이지.'
                        : 'An editorial brand hub for Very Good chocolate, tea, store experiences, and digital services.'}
                />
            </Helmet>

            <main className="hub-home">
                {/* 1. Top Bento Grid (Hero + Main Overviews) */}
                <section className="hub-section" style={{ paddingTop: '100px' }}>
                    <div className="bento-grid">
                        {/* Main Hero Card (span 8) */}
                        <div className="bento-card bento-hero">
                            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                                <SectionVisual
                                    asset={getSectionAsset('store', 'hero')}
                                    alt={isKr ? '베리굿 홈 메인 비주얼' : 'Very Good home visual'}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
                            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', color: '#fff', padding: '40px' }}>
                                <div className="hub-eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>{content.hero.eyebrow}</div>
                                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '0 0 16px', lineHeight: 1.1, textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                                    {content.hero.title}
                                </h1>
                                <p style={{ margin: '0 0 32px', opacity: 0.95, fontSize: '1.2rem', maxWidth: '600px', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                                    {content.hero.description}
                                </p>
                                <div className="hub-actions">
                                    {content.hero.ctas.slice(0, 2).map((cta) => (
                                        <Link key={cta.label} to={withLocale(cta.to, locale)} className="hub-button hub-button-primary" style={{ background: '#ffffff', color: '#1f1f1f', fontWeight: 600 }}>
                                            {cta.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top Right Chocolate Card (span 4) */}
                        <Link to={withLocale(content.overviewCards[0].to, locale)} className="bento-card bento-split-small" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="hub-eyebrow" style={{ marginBottom: '8px' }}>CHOCOLATE</div>
                            <h3 style={{ fontSize: '1.6rem', margin: '0 0 8px' }}>{content.overviewCards[0].title}</h3>
                            <p style={{ color: 'rgba(26,26,26,0.7)', margin: '0 0 24px' }}>{content.overviewCards[0].body}</p>
                            <div style={{ marginTop: 'auto', height: '180px', borderRadius: '16px', overflow: 'hidden' }}>
                                <SectionVisual asset={getSectionAsset('products', 'card')} alt="Chocolate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </Link>

                        {/* Middle Right Store Card (span 4) */}
                        <Link to={withLocale(content.overviewCards[2].to, locale)} className="bento-card bento-split-small" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="hub-eyebrow" style={{ marginBottom: '8px' }}>OFFLINE STORE</div>
                            <h3 style={{ fontSize: '1.6rem', margin: '0 0 8px' }}>{content.overviewCards[2].title}</h3>
                            <p style={{ color: 'rgba(26,26,26,0.7)', margin: '0 0 24px' }}>{content.overviewCards[2].body}</p>
                            <div style={{ marginTop: 'auto', height: '180px', borderRadius: '16px', overflow: 'hidden' }}>
                                <SectionVisual asset={getSectionAsset('store', 'card')} alt="Store" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </Link>
                    </div>
                </section>

                {/* 2. Middle Section: Horizontal Food-Tech Scroller */}
                <section className="hub-section">
                    <div className="hub-section-head">
                        <div className="hub-eyebrow">SEASONAL SELECTION</div>
                        <h2>{isKr ? '지금 만나보기 좋은 취향.' : 'Seasonal favorites to enjoy now.'}</h2>
                    </div>
                    <div className="trendy-scroller-wrap">
                        <div className="trendy-scroller">
                            {featuredProducts.map((product) => (
                                <Link key={product.id} className="trendy-product-card" to={withLocale(`/product/${product.id}`, locale)}>
                                    <img 
                                        src={product.mainImage} 
                                        alt={isKr ? product.name_ko : product.name} 
                                        style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px', background: 'rgba(0,0,0,0.03)' }} 
                                    />
                                    <div className="hub-product-tags" style={{ fontSize: '12px', letterSpacing: '0.08em', color: 'rgba(26,26,26,0.5)', marginBottom: '8px', textTransform: 'uppercase' }}>
                                        {product.tags.slice(0, 2).join(' · ')}
                                    </div>
                                    <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>{isKr ? product.name_ko : product.name}</h3>
                                    <p style={{ margin: 0, color: 'rgba(26,26,26,0.7)', fontSize: '14px', lineHeight: 1.6 }}>{isKr ? product.description_ko : product.description}</p>
                                </Link>
                            ))}
                            {/* "View All" Card at the end of scroller */}
                            <Link className="trendy-product-card" to={withLocale('/products', locale)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'var(--paper)', border: 'none', boxShadow: 'none' }}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', marginBottom: '16px' }}>
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                                <h3 style={{ margin: 0, fontSize: '16px' }}>{isKr ? '전체 보기' : 'View All'}</h3>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 3. Bottom Bento Section (Services & Digital Experience) */}
                <section className="hub-section" style={{ paddingTop: '20px' }}>
                    <div className="hub-section-head">
                        <div className="hub-eyebrow">MORE EXPERIENCES</div>
                        <h2>{isKr ? '디지털 경험과 서비스 예약.' : 'Digital experiments and quick services.'}</h2>
                    </div>
                    <div className="bento-grid">
                        {/* Half-span Wellness App */}
                        <Link to={withLocale(content.digitalCards[0].fallbackTo, locale)} className="bento-card bento-split-half" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                            <div className="hub-eyebrow" style={{ marginBottom: '8px' }}>WELLNESS APP</div>
                            <h3 style={{ fontSize: '1.8rem', margin: '0 0 12px' }}>{content.digitalCards[0].title}</h3>
                            <p style={{ color: 'rgba(26,26,26,0.7)', margin: '0 0 24px', maxWidth: '80%' }}>{content.digitalCards[0].body}</p>
                            <div style={{ marginTop: 'auto', height: '220px', borderRadius: '16px', overflow: 'hidden' }}>
                                <SectionVisual asset={getSectionAsset(content.digitalCards[0].assetKey, 'card')} alt="Wellness App" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </Link>

                        {/* Half-span Cake Reservation */}
                        <a href={content.serviceCards[0].href} target="_blank" rel="noreferrer" className="bento-card bento-split-half" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                            <div className="hub-eyebrow" style={{ marginBottom: '8px' }}>SERVICE</div>
                            <h3 style={{ fontSize: '1.8rem', margin: '0 0 12px' }}>{content.serviceCards[0].title}</h3>
                            <p style={{ color: 'rgba(26,26,26,0.7)', margin: '0 0 24px', maxWidth: '80%' }}>{content.serviceCards[0].body}</p>
                            <div style={{ marginTop: 'auto', height: '220px', borderRadius: '16px', overflow: 'hidden' }}>
                                <SectionVisual asset={getSectionAsset(content.serviceCards[0].assetKey, 'card')} alt="Reservation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </a>

                        {/* Small Review Card */}
                        <a href={content.serviceCards[1].href} target="_blank" rel="noreferrer" className="bento-card bento-split-small" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="hub-eyebrow" style={{ marginBottom: '8px' }}>COMMUNITY</div>
                            <h3 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>{content.serviceCards[1].title}</h3>
                            <p style={{ color: 'rgba(26,26,26,0.7)', margin: '0 0 24px' }}>{content.serviceCards[1].body}</p>
                            <span className="hub-button hub-button-secondary" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>{content.serviceCards[1].ctaLabel}</span>
                        </a>

                        {/* Small AI Beta Card */}
                        <a href={content.digitalCards[2].href || '#'} target="_blank" rel="noreferrer" className="bento-card bento-split-small" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="hub-eyebrow" style={{ marginBottom: '8px' }}>BETA</div>
                            <h3 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>{content.digitalCards[2].title}</h3>
                            <p style={{ color: 'rgba(26,26,26,0.7)', margin: '0 0 24px' }}>{content.digitalCards[2].body}</p>
                            <span className="hub-button hub-button-secondary" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>{content.digitalCards[2].ctaLabel}</span>
                        </a>

                        {/* Small Tea Blending Card */}
                        <Link to={withLocale(content.overviewCards[1].to, locale)} className="bento-card bento-split-small" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="hub-eyebrow" style={{ marginBottom: '8px' }}>TEA</div>
                            <h3 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>{content.overviewCards[1].title}</h3>
                            <p style={{ color: 'rgba(26,26,26,0.7)', margin: '0 0 24px' }}>{content.overviewCards[1].body}</p>
                            <span className="hub-button hub-button-secondary" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>{content.overviewCards[1].ctaLabel}</span>
                        </Link>
                    </div>
                </section>

                <section className="hub-section">
                    <div className="hub-section-head">
                        <div className="hub-eyebrow">BLOG</div>
                        <h2>{isKr ? '제품과 매장, 계절의 기록을 짧은 저널로 전합니다.' : 'Short journal notes from products, the store, and the season.'}</h2>
                    </div>
                    <div className="hub-grid hub-grid-3">
                        {latestPosts.map((post) => (
                            <Link key={post.id} className="hub-card hub-blog-card has-media" to={withLocale(`/blog/${post.id}`, locale)} style={{ padding: 0, borderRadius: '24px' }}>
                                <div className="hub-card-media" style={{ height: '200px' }}>
                                    <SectionVisual
                                        asset={post.imageUrl || post.thumbnail
                                            ? { type: 'image', src: post.imageUrl || post.thumbnail, alt: post.title }
                                            : getSectionAsset('blog', 'card')}
                                        alt={post.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="hub-card-body" style={{ padding: '24px' }}>
                                    <div className="hub-blog-date" style={{ fontSize: '13px', color: 'rgba(26,26,26,0.5)', marginBottom: '8px' }}>{formatBlogDate(post.date ?? post.createdAt)}</div>
                                    <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>{(isKr && post.title_ko) ? post.title_ko : post.title}</h3>
                                    <p style={{ margin: 0, color: 'rgba(26,26,26,0.7)', fontSize: '14px', lineHeight: 1.6 }}>{(isKr && post.summary_ko) ? post.summary_ko : (post.summary || '')}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="hub-inline-links" style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '40px' }}>
                        <Link to={withLocale('/blog', locale)} className="hub-button hub-button-secondary">{isKr ? '블로그 전체 모아보기' : 'Read All Posts'}</Link>
                    </div>
                </section>
            </main>
        </>
    );
}
