import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import '../styles/index.css';

export default function OrderSuccessPage() {
    const { t } = useTranslation();

    return (
        <div className="section" style={{ paddingTop: '160px', minHeight: '80vh', textAlign: 'center' }}>
            <Helmet>
                <title>{t('checkout_page.payment_success', 'Order Success')} - Very Good Chocolate</title>
            </Helmet>

            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
                <h1 style={{ fontFamily: 'var(--menu-font)', fontSize: '32px', marginBottom: '16px' }}>
                    {t('checkout_page.payment_success', 'Payment Successful!')}
                </h1>
                <p style={{ color: '#555', marginBottom: '40px', lineHeight: '1.6' }}>
                    Thank you for your order. We have sent a confirmation email to you.<br />
                    Your delicious chocolates will be on their way soon!
                </p>

                <Link to="/" className="cta">
                    {t('header.home', 'Back to Home')}
                </Link>
            </div>
        </div>
    );
}
