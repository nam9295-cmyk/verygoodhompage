import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { withLocale } from '../../utils/pathUtils';

export default function HeroSection() {
    const { isKr } = useLanguage();
    const locale = isKr ? 'ko' : 'en';

    return (
        <section className="hero-bleed" aria-label="Main hero">
            <div className="hero-bleed-logo" aria-label="VERYGOOD logo on visual">
                <img className="hero-logo-img" src="/assets/logo.png" alt="VERYGOOD 로고" />
            </div>
            <Link className="hero-bleed-scroll" to={withLocale('/home-legacy#shop', locale)}>SCROLL ↓</Link>
        </section>
    );
}
