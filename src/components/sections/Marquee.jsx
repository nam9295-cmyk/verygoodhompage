import { useEffect, useRef } from 'react';

export default function Marquee() {
    const trackRef = useRef(null);
    const setRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        const set1 = setRef.current;
        if (!track || !set1) return;

        const apply = () => {
            const w = Math.ceil(set1.getBoundingClientRect().width);
            track.style.setProperty('--marq-shift', `${w}px`);
            const seconds = Math.max(12, Math.round(w / 90));
            track.style.setProperty('--marq-dur', `${seconds}s`);
        };

        apply();

        let timeout;
        const handleResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(apply, 120);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="marquee" aria-label="Logo marquee">
            <div className="marquee-track" ref={trackRef}>
                <div className="marquee-set" ref={setRef}>
                    <img className="marquee-logo" src="/assets/logos/logo-1.png" alt="logo 1" />
                    <img className="marquee-logo" src="/assets/logos/logo-2.png" alt="logo 2" />
                    <img className="marquee-logo" src="/assets/logos/logo-1.png" alt="logo 1" />
                    <img className="marquee-logo" src="/assets/logos/logo-2.png" alt="logo 2" />
                </div>
                <div className="marquee-set" aria-hidden="true">
                    <img className="marquee-logo" src="/assets/logos/logo-1.png" alt="" />
                    <img className="marquee-logo" src="/assets/logos/logo-2.png" alt="" />
                    <img className="marquee-logo" src="/assets/logos/logo-1.png" alt="" />
                    <img className="marquee-logo" src="/assets/logos/logo-2.png" alt="" />
                </div>
            </div>
        </section>
    );
}
