import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import ShopSection from '../components/sections/ShopSection';
import Marquee from '../components/sections/Marquee';
import StorySection from '../components/sections/StorySection';
import BlogSection from '../components/sections/BlogSection';
import ContactSection from '../components/sections/ContactSection';
import FAQSection from '../components/sections/FAQSection';
import ShippingInfoSection from '../components/sections/ShippingInfoSection';
import { useLanguage } from '../context/LanguageContext';
import { withLocale } from '../utils/pathUtils';

export default function HomePage() {
    const { isKr } = useLanguage();
    const locale = isKr ? 'ko' : 'en';

    useEffect(() => {
        const hero = document.querySelector('.hero-bleed');
        if (!hero) return;

        const onScroll = () => {
            const rect = hero.getBoundingClientRect();
            const show = rect.bottom <= 60;
            document.body.classList.toggle('is-header-visible', show);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <Helmet>
                <title>{isKr ? '베리굿 레거시 홈 | Very Good Chocolate' : 'Legacy Home | Very Good Chocolate'}</title>
                <meta
                    name="description"
                    content={isKr
                        ? '기존 베리굿 랜딩 구조를 보존한 페이지입니다. 최신 홈페이지는 메인 홈에서 확인할 수 있습니다.'
                        : 'This is the preserved legacy landing page. The latest hub structure is available on the main home.'}
                />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="canonical" href={`https://verygood-chocolate.com${withLocale('/home-legacy', locale)}`} />
                <meta property="og:title" content={isKr ? '베리굿 레거시 홈' : 'Very Good Legacy Home'} />
                <meta property="og:description" content={isKr ? '기존 랜딩 구조 보존 페이지' : 'Preserved legacy landing structure'} />
                <meta property="og:url" content={`https://verygood-chocolate.com${withLocale('/home-legacy', locale)}`} />
                <meta property="og:type" content="website" />
            </Helmet>

            <main id="top">
                <section className="legacy-banner">
                    <div className="legacy-banner-copy">
                        <div className="hub-eyebrow">{isKr ? 'LEGACY HOME' : 'LEGACY HOME'}</div>
                        <h1>{isKr ? '이 페이지는 기존 랜딩 구조 보존본입니다.' : 'This page preserves the previous landing structure.'}</h1>
                        <p>
                            {isKr
                                ? '최신 홈페이지는 메인 홈에서 운영 중입니다. 이 페이지는 기존 구성을 참고할 수 있도록 유지합니다.'
                                : 'The new brand hub now lives on the main home. This page remains available for comparison and archival continuity.'}
                        </p>
                    </div>
                    <div className="legacy-banner-actions">
                        <Link className="hub-button hub-button-primary" to={withLocale('/', locale)}>
                            {isKr ? '메인 홈으로 이동' : 'Go to main home'}
                        </Link>
                        <Link className="hub-link-chip" to={withLocale('/brand', locale)}>
                            {isKr ? '브랜드 보기' : 'Brand'}
                        </Link>
                        <Link className="hub-link-chip" to={withLocale('/store', locale)}>
                            {isKr ? '매장 보기' : 'Store'}
                        </Link>
                        <Link className="hub-link-chip" to={withLocale('/services', locale)}>
                            {isKr ? '서비스 보기' : 'Services'}
                        </Link>
                    </div>
                </section>
                <HeroSection />
                <ShopSection />
                <Marquee />
                <StorySection />
                <BlogSection />
                <ShippingInfoSection />
                <section className="section" id="instagram">
                    <div className="section-head">
                        <h2 className="section-title">INSTAGRAM</h2>
                        <p className="section-sub">Follow us @verygood_chocolate</p>
                    </div>
                    <div className="instagram-feed">
                        <script src="https://elfsightcdn.com/platform.js" async></script>
                        <div className="elfsight-app-52c4861c-6179-4082-a0c9-06df858ba89a" data-elfsight-app-lazy></div>
                    </div>
                </section>
                <ContactSection />
                <FAQSection />
            </main>
        </>
    );
}
