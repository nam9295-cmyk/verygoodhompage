
import { motion } from 'framer-motion';

const DailyDetoxHero = () => {
    // Shared card style for glassmorphism
    const cardStyle = {
        minWidth: '280px', // Ensures cards have width in slider
        flex: '0 0 auto', // Prevents shrinking in flex container
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(30, 25, 20, 0.65)', // Darker brownish tint similar to reference
        borderRadius: '20px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        gap: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        scrollSnapAlign: 'start'
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '800px',
            backgroundImage: 'url(/assets/detail-hero/detail_hero_detox.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: '40px' // Bottom padding for slider scroller
        }}>
            {/* Dim Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)', // bg-black/20
                zIndex: 1
            }}></div>

            {/* Content Container */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                {/* Top Content (Title) */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{
                        paddingTop: '80px',
                        paddingLeft: '80px',
                        paddingRight: '80px',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}
                    className="hero-text-container"
                >
                    <p
                        className="hero-subtitle"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '1.55rem',
                            fontWeight: '300',
                            opacity: 0.9,
                            maxWidth: '800px',
                            marginBottom: '-0.5rem',
                            lineHeight: '1.2'
                        }}
                    >
                        Premium cacao nibs blended with tea to restore your daily balance.
                    </p>
                    <h2
                        className="hero-title"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '3rem',
                            lineHeight: '1.1',
                            marginTop: '0',
                            fontWeight: '700',
                            letterSpacing: '0.05em'
                        }}
                    >
                        Cacao Detox Cleanse Water <br />
                        The calmness your body craves.
                    </h2>
                </motion.div>

                {/* Bottom Content (Slider/Carousel) */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{
                        width: '100%',
                        overflowX: 'auto',
                        paddingLeft: '80px', // Align with title
                        paddingRight: '20px',
                        paddingBottom: '10px',
                        display: 'flex',
                        gap: '20px',
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE/Edge
                    }}
                    className="hero-slider-container"
                >
                    {/* Card 1 */}
                    <div style={cardStyle} className="hero-card">
                        <img
                            src="/assets/detail-hero/antioxidants_icon.svg"
                            alt="Antioxidants"
                            style={{ width: '48px', height: '48px', filter: 'brightness(0) invert(1)' }}
                        />
                        <div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>Rich Antioxidants</h4>
                            <p style={{ fontSize: '0.95rem', color: '#ddd', lineHeight: '1.5', maxWidth: '240px' }}>
                                Packed with cacao polyphenols to protect cells and combat oxidative stress from daily life.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div style={cardStyle} className="hero-card">
                        <img
                            src="/assets/detail-hero/relaxation_icon.svg"
                            alt="Relaxation"
                            style={{ width: '48px', height: '48px', filter: 'brightness(0) invert(1)' }}
                        />
                        <div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>Deep Relaxation</h4>
                            <p style={{ fontSize: '0.95rem', color: '#ddd', lineHeight: '1.5', maxWidth: '240px' }}>
                                A soothing blend that gently calms the mind and helps ease tension without drowsiness.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div style={cardStyle} className="hero-card">
                        <img
                            src="/assets/detail-hero/gut_icon.svg"
                            alt="Gut Comfort"
                            style={{ width: '48px', height: '48px', filter: 'brightness(0) invert(1)' }}
                        />
                        <div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>Gut Comfort</h4>
                            <p style={{ fontSize: '0.95rem', color: '#ddd', lineHeight: '1.5', maxWidth: '240px' }}>
                                Formulated with gentle ingredients to support digestion and settle the stomach after meals.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div style={cardStyle} className="hero-card">
                        <img
                            src="/assets/detail-hero/ritual_icon.svg"
                            alt="Ritual"
                            style={{ width: '48px', height: '48px', filter: 'brightness(0) invert(1)' }}
                        />
                        <div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>Daily Ritual</h4>
                            <p style={{ fontSize: '0.95rem', color: '#ddd', lineHeight: '1.5', maxWidth: '240px' }}>
                                Cultivate a moment of mindfulness and restore balance with a healthy, consistent habit.
                            </p>
                        </div>
                    </div>

                    {/* Spacer for right padding in scroll */}
                    <div style={{ minWidth: '60px', flex: '0 0 auto' }}></div>

                </motion.div>
            </div>

            <style>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .hero-slider-container::-webkit-scrollbar {
                    display: none;
                }

                @media (max-width: 768px) {
                    /* Mobile Typography & Layout Overrides */
                    .hero-text-container {
                        padding-left: 30px !important;
                        padding-right: 30px !important;
                        padding-top: 60px !important;
                    }
                    .hero-title {
                        font-size: 1.75rem !important;
                        line-height: 1.2 !important;
                    }
                    .hero-subtitle {
                        font-size: 0.95rem !important;
                        margin-bottom: 0.2rem !important;
                    }
                    
                    /* Helper for slider alignment on mobile */
                    .hero-slider-container {
                        padding-left: 30px !important; /* Match text container */
                    }
                    
                    /* Mobile Card Sizing */
                    .hero-card {
                        min-width: 85vw !important; /* Show mostly one card */
                    }
                }
            `}</style>
        </div>
    );
};

export default DailyDetoxHero;
