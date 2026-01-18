import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import ShopSection from '../components/sections/ShopSection';
import Marquee from '../components/sections/Marquee';
import StorySection from '../components/sections/StorySection';
import BlogSection from '../components/sections/BlogSection';
import ContactSection from '../components/sections/ContactSection';
import FAQSection from '../components/sections/FAQSection';

export default function HomePage() {
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
                <title>Very Good Chocolate | Premium Handcrafted Chocolate & Detox Tea</title>
                <meta
                    name="description"
                    content="Discover premium handcrafted bean-to-bar chocolates and detox teas from Daegu, Korea. Less sweet, more deep. Perfect gifts for your loved ones. Worldwide shipping available."
                />
                <link rel="canonical" href="https://verygood-chocolate.com/" />
                <meta property="og:title" content="Very Good Chocolate | Premium Handcrafted Chocolate & Detox Tea" />
                <meta property="og:description" content="Premium bean-to-bar chocolates and detox teas from Daegu, Korea. Less sweet, more deep. Worldwide shipping." />
                <meta property="og:url" content="https://verygood-chocolate.com/" />
                <meta property="og:type" content="website" />
            </Helmet>

            <main id="top">
                <HeroSection />
                <ShopSection />
                <Marquee />
                <StorySection />
                <BlogSection />
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
