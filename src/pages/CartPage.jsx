import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/index.css';

export default function CartPage() {
    const { t } = useTranslation();
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { isKr } = useLanguage();

    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (cart.length === 0) {
        return (
            <div className="section" style={{ paddingTop: '140px', minHeight: '60vh', textAlign: 'center' }}>
                <Helmet>
                    <title>{t('cart.title')} - Very Good Chocolate</title>
                </Helmet>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{t('cart.empty')}</h2>
                    <Link to="/" className="cta" style={{ marginTop: '20px' }}>
                        {t('cart.continue_shopping')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section" style={{ paddingTop: '140px', minHeight: '100vh', paddingBottom: '100px' }}>
            <Helmet>
                <title>{t('cart.title')} - Very Good Chocolate</title>
            </Helmet>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ fontFamily: 'var(--menu-font)', fontSize: '36px', marginBottom: '20px' }}>{t('cart.title')}</h1>

                <div className="cart-grid">
                    {/* Left Column: Cart Items */}
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item-row" style={{ display: 'flex', gap: '20px' }}>
                                {/* Image */}
                                <Link to={`/product/${item.id}`} style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#f5f5f5' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Link>

                                {/* Info */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                        <div>
                                            <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '700' }}>{t(`products.${item.id}.name`)}</h3>
                                            <p style={{ margin: '4px 0', color: '#9ca3af', fontSize: '14px' }}>
                                                {isKr ? '옵션: 기본' : 'Option: Default'}
                                            </p>
                                        </div>
                                        <div style={{ fontSize: '18px', fontWeight: '600' }}>
                                            {isKr ? `${(Number(item.price) * item.quantity).toLocaleString()}원` : `$${(item.price * item.quantity).toFixed(2)}`}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                        {/* Quantity Control */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <button
                                                className="cart-qty-btn"
                                                onClick={() => updateQuantity(item.id, -1)}
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: '600' }}>{item.quantity}</span>
                                            <button
                                                className="cart-qty-btn"
                                                onClick={() => updateQuantity(item.id, 1)}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={{
                                                border: 'none',
                                                background: 'none',
                                                cursor: 'pointer',
                                                color: '#ef4444',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                padding: '4px'
                                            }}
                                        >
                                            {t('cart.remove')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div style={{ marginTop: '40px' }}>
                            <Link to="/" style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)' }}>
                                {t('cart.continue_shopping')}
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="cart-summary-wrapper">
                        <div className="cart-summary-card">
                            <h2 style={{ margin: '0 0 24px', fontSize: '20px', fontFamily: 'var(--menu-font)' }}>{t('cart.order_summary')}</h2>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: '#4b5563' }}>
                                <span>{t('cart.subtotal')}</span>
                                <span style={{ color: 'var(--ink)', fontWeight: '600' }}>
                                    {isKr ? `${cartTotal.toLocaleString()}원` : `$${cartTotal.toFixed(2)}`}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: '#4b5563' }}>
                                <span>{t('cart.shipping')}</span>
                                <span style={{ fontSize: '13px' }}>{t('cart.shipping_calculated')}</span>
                            </div>

                            <div className="cart-divider"></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <span style={{ fontSize: '18px', fontWeight: '700' }}>{t('cart.total')}</span>
                                <span style={{ fontSize: '24px', fontWeight: '800' }}>
                                    {isKr ? `${cartTotal.toLocaleString()}원` : `$${cartTotal.toFixed(2)}`}
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
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
                                {t('cart.checkout')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
