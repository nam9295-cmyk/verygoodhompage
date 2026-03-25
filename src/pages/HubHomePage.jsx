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

            <main className="hub-home" style={{ background: 'var(--paper)', color: 'var(--brand)' }}>
                {/* 1. IMMERSIVE HERO */}
                <section style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '120px 40px', textAlign: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <SectionVisual
                            asset={getSectionAsset('store', 'hero')}
                            alt={isKr ? '베리굿 메인 비주얼' : 'Very Good home visual'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    {/* Soft, luxurious Green/Earth Overlay */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(42, 79, 68, 0.45) 0%, rgba(250, 248, 245, 0.1) 100%)' }} />
                    <div style={{ position: 'relative', zIndex: 2, color: '#FAF8F5', width: '100%', maxWidth: '1024px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 32px' }}>
                            {isKr ? '초콜릿이 필요할 땐, 베리굿' : 'VERY GOOD CHOCOLATE.'}
                        </h1>
                        <p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 300, maxWidth: '600px', margin: '0 0 48px', letterSpacing: '0.01em', opacity: 0.95 }}>
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            {content.hero.ctas.slice(0, 1).map((cta) => (
                                <Link key={cta.label} to={withLocale(cta.to, locale)} style={{ background: '#2A4F44', color: '#FAF8F5', padding: '18px 48px', borderRadius: '999px', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', border: 'none', boxShadow: '0 12px 32px rgba(42,79,68,0.2)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(42,79,68,0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(42,79,68,0.2)'; }}>
                                    {cta.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. THE COCOA EXPERTS. (Apple-style spacing) */}
                <section className="apple-section" style={{ padding: '180px 40px', background: 'var(--paper)', color: 'var(--brand)' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 100px', textAlign: 'center' }}>
                            {isKr ? '카카오의 본질을 설계하다.' : 'THE COCOA EXPERTS.'}
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--brand)' }}>1. SOURCING</h3>
                                <p style={{ fontSize: '1.25rem', lineHeight: 1.7, fontWeight: 300, opacity: 0.85 }}>{isKr ? '최고급 카카오빈만을 엄선합니다. 지속 가능한 생태계를 유지하는 프리미어 농장과 직접 교류하며 가장 신선한 재료를 수급합니다.' : 'We exclusively select the finest sustainable cocoa beans, sourcing directly from premier farms to ensure absolute freshness.'}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--brand)' }}>2. TECHNOLOGY</h3>
                                <p style={{ fontSize: '1.25rem', lineHeight: 1.7, fontWeight: 300, opacity: 0.85 }}>{isKr ? '독자적인 템퍼링 및 정밀 로스팅 기술을 통해 카카오가 품은 미세한 테이스팅 노트 하나까지 완벽하게 추출해냅니다.' : 'Advanced proprietary roasting technology allows us to perfectly extract every subtle tasting note hidden within the cocoa.'}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--brand)' }}>3. WELLNESS</h3>
                                <p style={{ fontSize: '1.25rem', lineHeight: 1.7, fontWeight: 300, opacity: 0.85 }}>{isKr ? '우리는 설탕의 단맛에 의존하지 않습니다. 몸과 마음에 진정한 휴식을 주는 무해하고 균형 잡힌 라이프스타일을 제안합니다.' : 'We do not rely on sugar. We propose a balanced, healthy lifestyle experience that offers genuine rest for mind and body.'}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. MEET THE MENU (Floating Images, Minimal Text) */}
                <section className="apple-section" style={{ padding: '180px 40px', background: 'var(--surface)', color: 'var(--brand)' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>
                                {isKr ? '시그니처 셀렉션.' : 'DISCOVER THE MENU.'}
                            </h2>
                            <Link to={withLocale('/products', locale)} style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--brand)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = 0.6} onMouseOut={(e) => e.currentTarget.style.opacity = 1}>
                                {isKr ? '전체 둘러보기' : 'Explore all'} <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>→</span>
                            </Link>
                        </div>

                        <div style={{ display: 'flex', gap: '64px', overflowX: 'auto', paddingBottom: '32px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                            {featuredProducts.map((product) => (
                                <Link key={product.id} to={withLocale(`/product/${product.id}`, locale)} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: 'clamp(320px, 30vw, 420px)' }} className="apple-product-link">
                                    <div style={{ borderRadius: '32px', overflow: 'hidden', marginBottom: '32px', background: '#e8e4db', transition: 'transform 0.5s cubic-bezier(0.1, 0, 0.1, 1), box-shadow 0.5s cubic-bezier(0.1, 0, 0.1, 1)' }} className="apple-img-wrap" onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(42,79,68,0.1)' }} onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}>
                                        <img
                                            src={product.mainImage}
                                            alt={isKr ? product.name_ko : product.name}
                                            style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
                                        />
                                    </div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 600, margin: '0 0 12px' }}>{isKr ? product.name_ko : product.name}</h3>
                                    <p style={{ fontSize: '1.2rem', margin: 0, opacity: 0.7, fontWeight: 300, lineHeight: 1.5 }}>{isKr ? product.description_ko : product.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. EXPERIENCES (Seamless Floating Tiles, iPhone Renders) */}
                <section className="apple-section" style={{ padding: '180px 40px', background: 'var(--paper)' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--brand)', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 80px', textAlign: 'center' }}>
                            {isKr ? '초콜릿, 그 이상의 경험.' : 'EXPERIENCE MORE.'}
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px', gridAutoRows: 'minmax(400px, auto)' }}>

                            {/* THE STAR: Wellness App Tile */}
                            <Link to={withLocale(content.digitalCards[0].fallbackTo, locale)} className="apple-tile" style={{ gridColumn: '1 / -1', background: '#EAE6DD', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', textDecoration: 'none', color: 'var(--brand)', padding: '80px', minHeight: '640px' }}>
                                <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
                                    <p style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '24px', opacity: 0.7 }}>WELLNESS APP</p>
                                    <h3 style={{ fontSize: '4rem', fontWeight: 600, lineHeight: 1.1, margin: '0 0 32px' }}>{content.digitalCards[0].title}</h3>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.6, opacity: 0.9 }}>{content.digitalCards[0].body}</p>
                                </div>
                                {/* Apple-style iPhone Mockup seamlessly integrated */}
                                <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '380px', height: '110%', background: 'transparent', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                                    {/* Phone Bezel */}
                                    <div style={{ width: '100%', height: '100%', borderRadius: '54px', border: '12px solid #2A4F44', background: '#FAF8F5', overflow: 'hidden', position: 'relative', boxShadow: '0 32px 80px rgba(42,79,68,0.15)', transform: 'translateY(10%)' }}>
                                        <SectionVisual asset={getSectionAsset(content.digitalCards[0].assetKey, 'card')} alt="App Interface" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95 }} />
                                        {/* Elegant Dynamic Island */}
                                        <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', width: '110px', height: '32px', background: '#000', borderRadius: '16px' }} />
                                    </div>
                                </div>
                            </Link>

                            {/* Reservation Tile */}
                            <a href={content.serviceCards[0].href} target="_blank" rel="noreferrer" className="apple-tile" style={{ gridColumn: 'span 6', background: '#DCE4DD', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textDecoration: 'none', color: 'var(--brand)' }}>
                                <p style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '24px', opacity: 0.7 }}>SERVICE</p>
                                <h3 style={{ fontSize: '3rem', fontWeight: 600, lineHeight: 1.1, margin: '0 0 24px' }}>{content.serviceCards[0].title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, fontSize: '1.4rem' }}>
                                    {content.serviceCards[0].ctaLabel} <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>↗</span>
                                </div>
                            </a>

                            {/* Beta AI Tile */}
                            <a href={content.digitalCards[2].href || '#'} target="_blank" rel="noreferrer" className="apple-tile" style={{ gridColumn: 'span 6', background: 'var(--brand)', color: 'var(--paper)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textDecoration: 'none' }}>
                                <p style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '24px', opacity: 0.7 }}>THE HYPER-PERSONAL</p>
                                <h3 style={{ fontSize: '3rem', fontWeight: 600, margin: '0 0 24px' }}>{content.digitalCards[2].title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, fontSize: '1.4rem' }}>
                                    {content.digitalCards[2].ctaLabel} <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>↗</span>
                                </div>
                            </a>

                            {/* Store / Tea / Community Minimal Tiles */}
                            <Link to={withLocale(content.overviewCards[1].to, locale)} className="apple-tile" style={{ gridColumn: 'span 6', background: 'var(--surface)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textDecoration: 'none', color: 'var(--brand)' }}>
                                <p style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '24px', opacity: 0.7 }}>TEA BLENDING</p>
                                <h3 style={{ fontSize: '2.5rem', fontWeight: 600, margin: '0 0 24px' }}>{content.overviewCards[1].title}</h3>
                                <p style={{ fontSize: '1.25rem', margin: 0, fontWeight: 500 }}>{content.overviewCards[1].ctaLabel} <span style={{ fontWeight: 300 }}>↗</span></p>
                            </Link>

                            <a href={content.serviceCards[1].href} target="_blank" rel="noreferrer" className="apple-tile" style={{ gridColumn: 'span 6', background: '#ECEAE4', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textDecoration: 'none', color: 'var(--brand)' }}>
                                <p style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '24px', opacity: 0.7 }}>COMMUNITY</p>
                                <h3 style={{ fontSize: '2.5rem', fontWeight: 600, margin: '0 0 24px' }}>{content.serviceCards[1].title}</h3>
                                <p style={{ fontSize: '1.25rem', margin: 0, fontWeight: 500 }}>{content.serviceCards[1].ctaLabel} <span style={{ fontWeight: 300 }}>↗</span></p>
                            </a>

                        </div>
                    </div>
                </section>

                {/* 5. JOURNAL */}
                <section className="apple-section" style={{ padding: '180px 40px', background: 'var(--brand)', color: 'var(--paper)' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>
                                {isKr ? '아름다움에 대한 기록.' : 'THE JOURNAL.'}
                            </h2>
                            <Link to={withLocale('/blog', locale)} style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--paper)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = 0.6} onMouseOut={(e) => e.currentTarget.style.opacity = 1}>
                                {isKr ? '모든 글 읽기' : 'Read All'} <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>→</span>
                            </Link>
                        </div>

                        <div style={{ display: 'flex', gap: '40px', overflowX: 'auto', paddingBottom: '32px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                            {latestPosts.map((post) => (
                                <Link key={post.id} to={withLocale(`/blog/${post.id}`, locale)} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: 'clamp(320px, 30vw, 420px)' }} className="apple-journal-link">
                                    <div style={{ borderRadius: '32px', overflow: 'hidden', marginBottom: '32px', transition: 'transform 0.5s ease', background: 'rgba(255,255,255,0.05)' }}>
                                        <SectionVisual
                                            asset={post.imageUrl || post.thumbnail
                                                ? { type: 'image', src: post.imageUrl || post.thumbnail, alt: post.title }
                                                : getSectionAsset('blog', 'card')}
                                            alt={post.title}
                                            style={{ width: '100%', height: '360px', objectFit: 'cover', opacity: 0.9 }}
                                        />
                                    </div>
                                    <div style={{ padding: '0 8px' }}>
                                        <div style={{ fontSize: '14px', letterSpacing: '0.05em', color: 'rgba(250,248,245,0.6)', marginBottom: '16px', fontWeight: 500 }}>{formatBlogDate(post.date ?? post.createdAt)}</div>
                                        <h3 style={{ margin: '0 0 16px', fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 }}>{(isKr && post.title_ko) ? post.title_ko : post.title}</h3>
                                        <p style={{ margin: 0, opacity: 0.7, fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 300 }}>{(isKr && post.summary_ko) ? post.summary_ko : (post.summary || '')}</p>
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
