import { Helmet } from 'react-helmet-async';

const styles = {
    aboutPage: {
        maxWidth: '900px',
        margin: '120px auto 80px',
        padding: '0 24px',
    },
    aboutHero: {
        marginBottom: '60px',
        textAlign: 'center',
    },
    aboutTitle: {
        fontFamily: 'var(--menu-font)',
        fontSize: 'clamp(40px, 5vw, 60px)',
        marginBottom: '16px',
        fontWeight: 300,
    },
    aboutSub: {
        fontSize: '18px',
        opacity: 0.7,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    },
    aboutSection: {
        marginBottom: '80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
    },
    aboutText: {
        direction: 'ltr',
    },
    aboutTextH2: {
        fontFamily: 'var(--menu-font)',
        fontSize: '32px',
        marginBottom: '20px',
    },
    aboutTextP: {
        fontSize: '17px',
        lineHeight: 1.75,
        opacity: 0.85,
        marginBottom: '20px',
        color: 'var(--ink)',
    },
    aboutImg: {
        width: '100%',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
    },
};

export default function AboutPage() {
    return (
        <>
            <Helmet>
                <title>About Us - Verygood Chocolate</title>
                <meta name="description" content="Discover the philosophy behind Verygood Chocolate. Less sweet, more deep. We craft moments of comfort and gratitude through premium bean-to-bar chocolate." />
                <link rel="canonical" href="https://verygood-chocolate.com/about" />
            </Helmet>

            <main style={styles.aboutPage}>
                <div style={styles.aboutHero}>
                    <h1 style={styles.aboutTitle}>Less Sweet, More Deep.</h1>
                    <p style={styles.aboutSub}>The Philosophy of Verygood</p>
                </div>

                <article style={styles.aboutSection}>
                    <div style={styles.aboutText}>
                        <h2 style={styles.aboutTextH2}>Crafting Moments, Not Just Chocolate</h2>
                        <p style={styles.aboutTextP}>
                            At Verygood Chocolate, we believe that chocolate is more than just a sweet treat. It is a medium for connection, a comfort in solitude, and a catalyst for celebration. In a world that moves too fast, we invite you to pause and savor the depth of the moment.
                        </p>
                        <p style={styles.aboutTextP}>
                            We asked ourselves: "What sentiment would you like to convey today?" Whether it is gratitude to a friend, comfort for yourself, or the celebration of a milestone, we discovered a way to preserve those sentiments in cacao.
                        </p>
                    </div>
                    <div>
                        <img style={styles.aboutImg} src="/assets/story/story-1.png" alt="Crafting Chocolate" />
                    </div>
                </article>

                <article style={{ ...styles.aboutSection, direction: 'rtl' }}>
                    <div style={styles.aboutText}>
                        <h2 style={styles.aboutTextH2}>The Art of Bean-to-Bar</h2>
                        <p style={styles.aboutTextP}>
                            Our process begins with the careful selection of premium cacao beans. We adhere to the "Bean-to-Bar" philosophy, overseeing every step of the chocolate-making process to ensure purity and depth of flavor.
                        </p>
                        <p style={styles.aboutTextP}>
                            Unlike mass-produced chocolates that rely heavily on sugar and additives, we focus on the raw potential of the cacao bean itself. We roast, crack, winnow, and conch our beans in small batches. This labor-intensive process allows us to control the acidity and unlock the complex flavor notes—fruity, nutty, or floral—hidden within each bean.
                        </p>
                    </div>
                    <div>
                        <img style={{ ...styles.aboutImg, background: '#f4f4f4' }} src="/assets/products/british.png" alt="Bean to Bar Process" />
                    </div>
                </article>

                <article style={styles.aboutSection}>
                    <div style={styles.aboutText}>
                        <h2 style={styles.aboutTextH2}>Ingredients You Can Trust</h2>
                        <p style={styles.aboutTextP}>
                            Transparency is at the heart of our kitchen. We use only real ingredients: ethical cacao, pure cocoa butter, and unrefined cane sugar. For our flavored collections, we source premium teas like Earl Grey, detox blends, and real fruits.
                        </p>
                        <p style={styles.aboutTextP}>
                            We promise: No artificial preservatives, no shiny glaze agents, and no compromises. Just honest, very good chocolate that is gentle on your body and rich on your palate.
                        </p>
                        <p style={styles.aboutTextP}><strong>Think Chocolate, Think Very Good.</strong></p>
                    </div>
                    <div>
                        <img style={{ ...styles.aboutImg, background: '#f4f4f4' }} src="/assets/products/almond.png" alt="Natural Ingredients" />
                    </div>
                </article>
            </main>
        </>
    );
}
