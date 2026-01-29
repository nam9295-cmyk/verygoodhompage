import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/index.css';

export default function CheckoutPage() {
    const { t } = useTranslation();
    const { cart, cartTotal } = useCart();
    const { isKr } = useLanguage();

    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        country: '',
        address: '',
        city: '',
        zipCode: ''
    });

    // Shipping Cost Logic
    // KR: 3000 KRW (approx $2.50)
    // Other: $30.00
    const shippingCost = formData.country === 'South Korea'
        ? (isKr ? 3000 : 2.50)
        : (isKr ? 36000 : 30.00); // 30 USD ~ 36000 KRW

    // If no country selected yet, show 0 or placeholder
    const finalShipping = formData.country ? shippingCost : 0;

    // Grand Total
    const grandTotal = cartTotal + finalShipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProceed = (e) => {
        e.preventDefault();

        // Basic Validation
        const required = ['email', 'firstName', 'lastName', 'country', 'address', 'city', 'zipCode'];
        const missing = required.filter(field => !formData[field]);

        if (missing.length > 0) {
            alert(`${t('checkout_page.essential')} (${missing.join(', ')})`);
            return;
        }

        console.log('Proceeding to Payment with Data:', {
            cart,
            shipping: finalShipping,
            total: grandTotal,
            customer: formData
        });

        alert("Proceeding to payment... (Check Console)");
    };

    return (
        <div className="section" style={{ paddingTop: '140px', minHeight: '100vh', paddingBottom: '100px' }}>
            <Helmet>
                <title>{t('checkout_page.title')} - Very Good Chocolate</title>
            </Helmet>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ fontFamily: 'var(--menu-font)', fontSize: '36px', marginBottom: '40px' }}>{t('checkout_page.title')}</h1>

                <div className="cart-grid">
                    {/* Left: Shipping Form */}
                    <div className="checkout-form">
                        <form onSubmit={handleProceed}>
                            {/* Contact Info */}
                            <h2 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{t('checkout_page.contact_info')}</h2>
                            <div style={{ display: 'grid', gap: '16px', marginBottom: '40px' }}>
                                <div className="form-group">
                                    <label style={styles.label}>{t('checkout_page.email')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        placeholder="nam@example.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={styles.label}>{t('checkout_page.phone')}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        placeholder="+82 10-1234-5678"
                                    />
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <h2 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{t('checkout_page.shipping_address')}</h2>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={styles.label}>{t('checkout_page.first_name')}</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div>
                                        <label style={styles.label}>{t('checkout_page.last_name')}</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label style={styles.label}>{t('checkout_page.country')}</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        style={styles.select}
                                    >
                                        <option value="">{t('checkout_page.select_country')}</option>
                                        <option value="South Korea">South Korea</option>
                                        <option value="United States">United States</option>
                                        <option value="Japan">Japan</option>
                                        <option value="China">China</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label style={styles.label}>{t('checkout_page.address')}</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        placeholder="123 Street Name"
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={styles.label}>{t('checkout_page.city')}</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        />
                                    </div>
                                    <div>
                                        <label style={styles.label}>{t('checkout_page.zip_code')}</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="cart-summary-wrapper">
                        <div className="cart-summary-card">
                            <h2 style={{ margin: '0 0 24px', fontSize: '20px', fontFamily: 'var(--menu-font)' }}>{t('cart.order_summary')}</h2>

                            {/* Items List (Mini) */}
                            <div style={{ marginBottom: '24px', maxHeight: '200px', overflowY: 'auto' }}>
                                {cart.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                                        <span style={{ color: '#555' }}>
                                            {t(`products.${item.id}.name`)} x {item.quantity}
                                        </span>
                                        <span style={{ fontWeight: '600' }}>
                                            {isKr
                                                ? `${(item.price * item.quantity).toLocaleString()}원`
                                                : `$${(item.price * item.quantity).toFixed(2)}`}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-divider"></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: '#4b5563' }}>
                                <span>{t('cart.subtotal')}</span>
                                <span style={{ color: 'var(--ink)', fontWeight: '600' }}>
                                    {isKr ? `${cartTotal.toLocaleString()}원` : `$${cartTotal.toFixed(2)}`}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: '#4b5563' }}>
                                <span>{t('cart.shipping')}</span>
                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                    {formData.country
                                        ? (isKr ? `${finalShipping.toLocaleString()}원` : `$${finalShipping.toFixed(2)}`)
                                        : (t('cart.shipping_calculated'))
                                    }
                                </span>
                            </div>

                            <div className="cart-divider"></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <span style={{ fontSize: '18px', fontWeight: '700' }}>{t('cart.total')}</span>
                                <span style={{ fontSize: '24px', fontWeight: '800' }}>
                                    {isKr ? `${grandTotal.toLocaleString()}원` : `$${grandTotal.toFixed(2)}`}
                                </span>
                            </div>

                            <button
                                onClick={handleProceed}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: '#000',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                }}
                            >
                                {t('checkout_page.proceed_payment')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    label: {
        display: 'block',
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '6px',
        color: '#374151'
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '15px',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    select: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '15px',
        outline: 'none',
        backgroundColor: '#fff'
    }
};
