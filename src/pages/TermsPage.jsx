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
};

export default function TermsPage() {
    return (
        <>
            <Helmet>
                <title>Terms of Service - Very Good Chocolate</title>
                <meta name="description" content="Terms of Service for Very Good Chocolate. Please read these terms carefully before using our website or services." />
                <link rel="canonical" href="https://verygood-chocolate.com/terms" />
            </Helmet>

            <main style={styles.page}>
                <h1 style={styles.title}>Terms of Service</h1>

                <section style={styles.section}>
                    <h2 style={styles.h2}>1. Acceptance of Terms</h2>
                    <p style={styles.p}>
                        By accessing and using this website, you accept and agree to be bound by the terms
                        and conditions of this agreement.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>2. Products and Services</h2>
                    <p style={styles.p}>
                        All products are subject to availability. We reserve the right to limit quantities
                        and refuse service to anyone. Product images are for illustration purposes and may
                        differ slightly from actual products.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>3. Pricing and Payment</h2>
                    <p style={styles.p}>
                        All prices are in Korean Won (KRW) unless otherwise stated. We accept various payment
                        methods including credit cards, Naver Pay, and Kakao Pay.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>4. Shipping and Delivery</h2>
                    <p style={styles.p}>
                        We ship nationwide within South Korea. Products are carefully packaged with ice packs
                        to maintain freshness. Delivery typically takes 2-3 business days.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>5. Returns and Refunds</h2>
                    <p style={styles.p}>
                        Due to the perishable nature of our products, we cannot accept returns unless the
                        product is damaged or defective upon arrival. Please contact us within 24 hours of
                        delivery if you have any issues.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.h2}>6. Contact Information</h2>
                    <p style={styles.p}>
                        For any questions regarding these terms, please contact us at:
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
