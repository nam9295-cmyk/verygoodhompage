import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="hero-bleed" aria-label="Main hero">
            <div className="hero-bleed-logo" aria-label="VERYGOOD logo on visual">
                <img className="hero-logo-img" src="/assets/logo.png" alt="VERYGOOD 로고" />
            </div>
            <Link className="hero-bleed-scroll" to="/#shop">SCROLL ↓</Link>
        </section>
    );
}
