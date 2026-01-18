import { Helmet } from 'react-helmet-async';

const styles = {
    page: {
        maxWidth: '900px',
        margin: '120px auto 80px',
        padding: '0 24px',
    },
    hero: {
        marginBottom: '60px',
        textAlign: 'center',
    },
    title: {
        fontFamily: 'var(--menu-font)',
        fontSize: 'clamp(36px, 5vw, 52px)',
        marginBottom: '16px',
        fontWeight: 300,
    },
    sub: {
        fontSize: '18px',
        opacity: 0.7,
        letterSpacing: '0.1em',
    },
    section: {
        marginBottom: '60px',
    },
    h2: {
        fontFamily: 'var(--menu-font)',
        fontSize: '28px',
        marginBottom: '20px',
        borderBottom: '1px solid var(--line)',
        paddingBottom: '12px',
    },
    p: {
        fontSize: '16px',
        lineHeight: 1.8,
        opacity: 0.85,
        marginBottom: '20px',
    },
};

export default function BusinessStoryPage() {
    return (
        <>
            <Helmet>
                <title>Business Story - Very Good Chocolate</title>
                <meta name="description" content="Learn about the business journey and values of Very Good Chocolate. Our commitment to quality and authenticity." />
                <link rel="canonical" href="https://verygood-chocolate.com/business-story" />
            </Helmet>

            <main style={styles.page}>
                <div style={styles.hero}>
                    <h1 style={styles.title}>Our Business Story</h1>
                    <p style={styles.sub}>The Journey of Very Good Chocolate</p>
                </div>

                <section style={styles.section}>
                    <h2 style={styles.h2}>The Beginning</h2>
                    <p style={styles.p}>
                        Very Good Chocolate was born from a passion for authentic, handcrafted chocolate.
                        Our founder, trained at Le Cordon Bleu Paris, returned to Daegu with a mission:
                        to create chocolate that speaks to the soul, not just the taste buds.
                    </p>
                    <p style={styles.p}>
                        In 2024, we opened our first workshop in Suseong-gu, Daegu. What started as a small
                        operation has grown into a beloved local brand, known for its "Less Sweet, More Deep" philosophy.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>Our Values</h2>
                    <p style={styles.p}>
                        <strong>Quality First:</strong> We source only the finest cacao beans and ingredients.
                        Our HACCP-certified facility ensures every piece meets the highest standards.
                    </p>
                    <p style={styles.p}>
                        <strong>Authenticity:</strong> No artificial preservatives, no shortcuts.
                        We believe in transparent, honest chocolate-making.
                    </p>
                    <p style={styles.p}>
                        <strong>Connection:</strong> We don't just make chocolate; we create moments.
                        Every piece is designed to convey sentiment—gratitude, comfort, celebration.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>Looking Forward</h2>
                    <p style={styles.p}>
                        As we grow, our commitment remains unchanged. We continue to explore new cacao origins,
                        develop seasonal collections, and share the joy of premium chocolate with the world.
                        Thank you for being part of our journey.
                    </p>
                    <p style={styles.p}>
                        <strong>Think Chocolate, Think Very Good!</strong>
                    </p>
                </section>
            </main>
        </>
    );
}
