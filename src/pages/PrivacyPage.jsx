import { Helmet } from 'react-helmet-async';

const styles = {
    page: {
        maxWidth: '800px',
        margin: '120px auto 80px',
        padding: '0 24px',
    },
    title: {
        fontFamily: 'var(--menu-font)',
        fontSize: '32px',
        marginBottom: '40px',
        textAlign: 'center',
    },
    section: {
        marginBottom: '40px',
    },
    h2: {
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '16px',
    },
    p: {
        fontSize: '15px',
        lineHeight: 1.8,
        opacity: 0.85,
        marginBottom: '16px',
    },
    ul: {
        paddingLeft: '20px',
        marginBottom: '16px',
    },
    li: {
        fontSize: '15px',
        lineHeight: 1.8,
        opacity: 0.85,
        marginBottom: '8px',
    },
};

export default function PrivacyPage() {
    return (
        <>
            <Helmet>
                <title>Privacy Policy - Very Good Chocolate</title>
                <meta name="description" content="Privacy Policy for Very Good Chocolate. Learn how we collect, use, and protect your personal information." />
                <link rel="canonical" href="https://verygood-chocolate.com/privacy" />
            </Helmet>

            <main style={styles.page}>
                <h1 style={styles.title}>Privacy Policy</h1>

                <section style={styles.section}>
                    <h2 style={styles.h2}>1. Information We Collect</h2>
                    <p style={styles.p}>
                        We collect information you provide directly to us, such as when you make a purchase,
                        contact us, or subscribe to our newsletter. This may include:
                    </p>
                    <ul style={styles.ul}>
                        <li style={styles.li}>Name and contact information</li>
                        <li style={styles.li}>Shipping and billing address</li>
                        <li style={styles.li}>Payment information</li>
                        <li style={styles.li}>Order history</li>
                    </ul>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>2. How We Use Your Information</h2>
                    <p style={styles.p}>
                        We use the information we collect to process orders, communicate with you,
                        improve our services, and send promotional materials (with your consent).
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>3. Information Sharing</h2>
                    <p style={styles.p}>
                        We do not sell or rent your personal information to third parties.
                        We may share information with service providers who assist us in operating our business.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>4. Data Security</h2>
                    <p style={styles.p}>
                        We implement appropriate security measures to protect your personal information
                        against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>5. Contact Us</h2>
                    <p style={styles.p}>
                        If you have any questions about this Privacy Policy, please contact us at:
                        hello@verygood-chocolate.com
                    </p>
                </section>

                <p style={{ ...styles.p, textAlign: 'center', marginTop: '40px' }}>
                    <em>Last updated: January 2026</em>
                </p>
            </main>
        </>
    );
}
