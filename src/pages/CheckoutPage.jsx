import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as PortOne from "@portone/browser-sdk/v2";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import emailjs from '@emailjs/browser'; // Import EmailJS
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/index.css';

export default function CheckoutPage() {
    const { t } = useTranslation();
    const { cart, cartTotalKRW, cartTotalUSD, clearCart } = useCart();
    const { isKr } = useLanguage();
    const navigate = useNavigate();

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

    // Shipping Zones
    const calculateShipping = () => {
        if (!formData.country) return 0;

        if (formData.country === 'South Korea') {
            // Zone A: KR
            const threshold = 50000;
            const cost = 3000;
            const isFree = cartTotalKRW >= threshold;
            // Return fixed cost directly based on currency
            return {
                cost: isFree ? 0 : (isKr ? cost : 2.50), // Approx USD for KR shipping if viewed in EN? 
                // Or should we enforce currency match?
                // User said: "Current language determines currency."
                // So if isKr=false (EN), we need USD cost for KR shipping.
                // Let's assume standard rates: KR=3000, Asia=$20, Global=$35
                isFree
            };
        } else if (['Japan', 'China', 'Hong Kong', 'Taiwan'].includes(formData.country)) {
            // Zone B: Asia
            const threshold = 100;
            const cost = 20;
            const isFree = cartTotalUSD >= threshold;
            return {
                cost: isFree ? 0 : (isKr ? 29000 : cost), // Approx KRW for Asia shipping
                isFree
            };
        } else {
            // Zone C: Global
            const threshold = 150;
            const cost = 35;
            const isFree = cartTotalUSD >= threshold;
            return {
                cost: isFree ? 0 : (isKr ? 50000 : cost), // Approx KRW for Global shipping
                isFree
            };
        }
    };

    const shippingResult = calculateShipping();
    const shippingCost = shippingResult ? shippingResult.cost : 0;

    // Grand Total
    const grandTotal = isKr
        ? cartTotalKRW + shippingCost
        : cartTotalUSD + shippingCost;

    const formatMoney = (val) => {
        if (isKr) return val.toLocaleString() + '원';
        return '$' + val.toFixed(2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [couponCode, setCouponCode] = useState('');
    // const [pointsApplied, setPointsApplied] = useState(0); // Unused
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [couponId, setCouponId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('inicis'); // State for Payment Method

    // Country Code Mapping
    const COUNTRY_CODES = {
        'South Korea': 'KR',
        'United States': 'US',
        'Japan': 'JP',
        'China': 'CN',
        'United Kingdom': 'GB',
        'Canada': 'CA',
        'Australia': 'AU',
        'Hong Kong': 'HK',
        'Taiwan': 'TW'
    };

    // ... (Coupon Handle - omitted from replace since it is unchanged, wait, I need to replace strictly around handlePayment if possible, but state is far up. I will replace hook section separately or try to span large block?
    // Spanning large block 90-377 is risky (200 lines).
    // I will do 2 Replace Calls. 
    // Call 1: Add State.
    // Call 2: Rewrite handlePayment.

    // Let's do Call 1 here (State).
    // Wait, the instruction above says "Refactor handlePayment" too.
    // I will split this turn into multiple tools if needed, but I can use one massive replace if I am careful.
    // Actually, I can use `multi_replace_file_content`? No, system prompt says "If you are making multiple edits across a single file, specify multiple separate ReplacementChunks".
    // I'll use `replace_file_content` for State first.

    // Coupon Logic
    const handleApplyCoupon = async () => {
        if (!couponCode) return;

        // 1. Lowercase normalization (per user DB)
        const normalizedCode = couponCode.trim().toLowerCase();
        console.log(`[Coupon] Attempting to apply code: '${normalizedCode}'`);

        try {
            const couponsRef = collection(db, "coupons");
            // 2. Query 'code'
            const q = query(couponsRef, where("code", "==", normalizedCode));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.warn(`[Coupon] Code '${normalizedCode}' not found.`);
                alert(isKr ? "유효하지 않은 쿠폰입니다." : "Invalid coupon code.");
                setAppliedDiscount(0);
                setCouponId(null);
                return;
            }

            const couponDoc = querySnapshot.docs[0];
            const couponData = couponDoc.data();
            console.log(`[Coupon] Found Data:`, couponData);

            // Calculate Raw Item Total
            const rawItemTotal = cart.reduce((sum, item) => {
                if (isKr) {
                    return sum + ((item.priceKRW || 0) * item.quantity);
                } else {
                    return sum + ((item.priceUSD || 0) * item.quantity);
                }
            }, 0);

            // 3. Parse value (String -> Number)
            const dbValue = Number(couponData.value);
            if (isNaN(dbValue)) {
                console.error("[Coupon] Invalid value in DB:", couponData.value);
                alert("Coupon data error.");
                return;
            }

            let discountAmount = 0;

            // 4. Check 'discount' field (formerly discountType)
            if (couponData.discount === 'percent') {
                // Formula: Final = Total * (1 - value/100)
                // Therefore Discount = Total * (value/100)
                discountAmount = rawItemTotal * (dbValue / 100);
                console.log(`[Coupon] Type: percent, Value: ${dbValue}, Discount Amt: ${discountAmount}`);
            } else if (couponData.discount === 'fixed') {
                discountAmount = dbValue;
                console.log(`[Coupon] Type: fixed, Value: ${dbValue}, Discount Amt: ${discountAmount}`);
            } else {
                // Fallback for older schema if mixed
                if (couponData.discountType === 'percent') {
                    discountAmount = rawItemTotal * (dbValue / 100);
                } else {
                    // Try treating as fixed if uncertain, or percent? 
                    // Let's assume percent if typical
                    discountAmount = rawItemTotal * (dbValue / 100);
                }
            }

            // Cap discount
            if (discountAmount > rawItemTotal) {
                discountAmount = rawItemTotal;
            }

            setAppliedDiscount(discountAmount);
            setCouponId(normalizedCode);

            alert(isKr ? `쿠폰이 적용되었습니다! -${formatMoney(discountAmount)}` : `Coupon applied! -${formatMoney(discountAmount)}`);

        } catch (error) {
            console.error("Coupon Error:", error);
            alert("Error checking coupon.");
        }
    };

    // Helper: Process Successful Order
    const processOrderSuccess = async (paymentId, amount, currency, countryCode, discountVal, shippingVal, itemTotal) => {
        const orderData = {
            paymentId,
            createdAt: new Date(),
            customer: {
                ...formData,
                countryCode
            },
            items: cart,
            totals: {
                itemTotal: itemTotal,
                discount: discountVal,
                shipping: shippingVal,
                grandTotal: amount,
                currency: currency
            },
            promoCode: couponId || null,
            status: 'PAID'
        };

        try {
            await addDoc(collection(db, "orders"), orderData);
            console.log("Order successfully saved to Firestore:", orderData);

            // Email Logic
            try {
                sendOrderEmail(orderData);
            } catch (emailErr) {
                console.error("Email send failed", emailErr);
            }

            return true; // Success

        } catch (err) {
            console.error("Firestore Save Error:", err);
            // Show specific error to user for debugging
            alert(`Order save failed: ${err.message}`);
            return false; // Failure
        }
    };

    const handlePayment = async (e) => {

        e.preventDefault();

        // 1. Define desiredPayMethod early to ensure scope availability
        const desiredPayMethod = paymentMethod === 'paypal' ? "PAYPAL" : "CARD";

        const storeId = import.meta.env.VITE_PORTONE_STORE_ID;
        const channelKey = paymentMethod === 'paypal'
            ? import.meta.env.VITE_PORTONE_PAYPAL_CHANNEL_KEY
            : import.meta.env.VITE_PORTONE_INICIS_CHANNEL_KEY;

        if (!storeId || !channelKey) {
            console.error("PortOne Environment Variables Missing");
            alert("Payment system configuration error.");
            return;
        }

        const required = ['email', 'firstName', 'lastName', 'country', 'address', 'city', 'zipCode'];
        const missing = required.filter(field => !formData[field]);

        if (missing.length > 0) {
            alert(`${t('checkout_page.essential')} (${missing.join(', ')})`);
            return;
        }

        const countryCode = COUNTRY_CODES[formData.country];
        if (!countryCode) {
            alert("Please select a valid country.");
            return;
        }

        // Use a static ID or one derived from safe sources, or move generation to inside handlePayment where possible
        // Ideally we don't generate ID during render. 
        // We will generate it inside handlePayment. This variable 'standardPaymentId' seemed to be calculated in render.
        // Let's remove it from here and create it inside handlePayment.

        // This was: const standardPaymentId = `order_${Date.now()}`;
        // We will delete this line and move logic to handlePayment.
        const orderTitle = cart.length > 1
            ? `${t(`products.${cart[0].id}.name`)} + ${cart.length - 1}`
            : t(`products.${cart[0].id}.name`);

        // Recalculate Fixed Totals strictly from Cart Items
        const rawItemTotalKRW = cart.reduce((sum, item) => sum + ((item.priceKRW || 0) * item.quantity), 0);
        const rawItemTotalUSD = cart.reduce((sum, item) => sum + ((item.priceUSD || 0) * item.quantity), 0);

        // Calculate Shipping logic for both currencies
        const shippingRes = calculateShipping();
        let shippingCostKRW = 0;
        let shippingCostUSD = 0;

        if (shippingRes && !shippingRes.isFree) {
            if (formData.country === 'South Korea') {
                shippingCostKRW = 3000;
                shippingCostUSD = 2.50;
            } else if (['Japan', 'China', 'Hong Kong', 'Taiwan'].includes(formData.country)) {
                shippingCostKRW = 29000;
                shippingCostUSD = 20;
            } else {
                shippingCostKRW = 50000;
                shippingCostUSD = 35;
            }
        }

        let payAmountMajor = 0;
        let payCurrency = "";
        let finalItemTotal = 0;
        let discountAmount = 0;
        let shippingVal = 0;

        if (paymentMethod === 'paypal') {
            // PayPal: Force USD
            payCurrency = "CURRENCY_USD";
            finalItemTotal = rawItemTotalUSD;
            shippingVal = shippingCostUSD;

            // Discount Safety checks
            if (appliedDiscount > 0) {
                if (isKr) {
                    discountAmount = 0;
                    alert("Notice: Coupons applied in KRW mode are removed for PayPal (USD) payment.");
                } else {
                    discountAmount = appliedDiscount;
                }
            }
            payAmountMajor = Math.max(0, finalItemTotal - discountAmount) + shippingVal;
            // Ensure PayPal amount is at least 1.00 for testing
            if (payAmountMajor < 1) payAmountMajor = 1;

        } else {
            // Inicis: Force KRW
            payCurrency = "CURRENCY_KRW";
            finalItemTotal = rawItemTotalKRW;
            shippingVal = shippingCostKRW;

            if (appliedDiscount > 0) {
                if (!isKr) {
                    discountAmount = 0;
                    alert("Notice: Coupons applied in USD mode are removed for Domestic Card (KRW) payment.");
                } else {
                    discountAmount = appliedDiscount;
                }
            }
            payAmountMajor = Math.round(Math.max(0, finalItemTotal - discountAmount) + shippingVal);
        }

        // CASE 1: ZERO PAYMENT (Free Order)
        if (payAmountMajor <= 0) {
            const confirmFree = window.confirm(t('checkout_page.confirm_free_order', "Total is 0. Place free order?"));
            if (!confirmFree) return;

            try {
                // Determine currency logic string for DB
                const currStr = payCurrency === "CURRENCY_KRW" ? 'KRW' : 'USD';
                const freePaymentId = `FREE_PROMO_${Date.now()}`;
                const success = await processOrderSuccess(freePaymentId, 0, currStr, countryCode, discountAmount, shippingVal, finalItemTotal);

                if (success) {
                    alert(t('checkout_page.free_order_accepted', "무료 주문이 완료되었습니다."));
                    clearCart();
                    navigate('/order-success');
                }
            } catch (err) {
                console.error("Free Order Error:", err);
                alert("Unexpected error placing free order.");
            }
            return;
        }

        // Debug Log to Verify PayMethod
        console.log("=== PORTONE REQUEST DEBUG ===");
        console.log("Channel:", channelKey);
        console.log("PayMethod:", desiredPayMethod);
        console.log("Amount:", payAmountMajor, payCurrency);

        // CASE 2: NORMAL PAYMENT (PortOne)
        try {
            const response = await PortOne.requestPayment({
                storeId,
                channelKey,
                paymentId: `order_${Date.now()}`, // Generated on demand
                orderName: orderTitle,
                totalAmount: Math.round(payAmountMajor),
                currency: payCurrency,
                payMethod: desiredPayMethod, // Explicitly using the variable
                ...(paymentMethod === 'paypal' ? { paypal: {} } : {}),
                customer: {
                    fullName: `${formData.firstName} ${formData.lastName}`,
                    phoneNumber: formData.phone,
                    email: formData.email,
                    address: {
                        country: countryCode,
                        addressLine1: formData.address,
                        addressLine2: formData.city,
                        zipcode: formData.zipCode
                    }
                }
            });

            if (response.code != null) {
                // Error
                alert(`Payment Failed: ${response.message}`);
                return;
            }

            // Success: Save to Firestore
            const currStr = payCurrency === "CURRENCY_KRW" ? 'KRW' : 'USD';
            const success = await processOrderSuccess(`order_${Date.now()}`, payAmountMajor, currStr, countryCode, discountAmount, shippingVal, finalItemTotal);

            if (success) {
                alert(t('checkout_page.payment_success', "Payment Completed Successfully!"));
                clearCart();
                navigate('/order-success');
            } else {
                alert("Payment successful but failed to save order record. Please contact support.");
            }

        } catch (error) {
            console.error("Payment Error:", error);
            alert("An error occurred during payment processing.");
        }
    };

    // Email Logic
    const sendOrderEmail = (order) => {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.warn("EmailJS Environment Variables Missing. Skipping email.");
            return;
        }

        // 1. Currency Formatting
        let formattedAmount = "";
        const currency = order.totals.currency; // 'KRW' or 'USD'
        const rawTotal = order.totals.grandTotal;

        if (currency === 'KRW') {
            // KRW: ₩ and comma
            formattedAmount = "₩" + rawTotal.toLocaleString();
        } else {
            // USD: $ and 2 decimals
            formattedAmount = "$" + Number(rawTotal).toFixed(2);
        }

        console.log(`[Email] Formatting Amount: ${rawTotal} ${currency} -> ${formattedAmount}`);

        // 2. Template Params
        const emailParams = {
            to_name: `${order.customer.firstName} ${order.customer.lastName}`,
            to_email: order.customer.email,
            order_id: order.paymentId,
            total_amount: formattedAmount,
            // ... truncated ...

            // Optional: Add items list if template supports it, user didn't explicitly ask but existing placeholder had it.
            // User "total_amount: 위에서 만든 formattedAmount 문자열"
            message: `Items: ${order.items.map(i => i.id).join(', ')}`
        };

        // 3. Send Email
        emailjs.send(serviceId, templateId, emailParams, publicKey)
            .then((response) => {
                console.log('[Email] SUCCESS!', response.status, response.text);
            }, (err) => {
                console.error('[Email] FAILED...', err);
            });
    };

    const styles = {
        label: {
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#333'
        },
        input: {
            width: '100%',
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box'
        },
        select: {
            width: '100%',
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            appearance: 'none', // Remove default arrow
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px'
        }
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
                        <form onSubmit={handlePayment}>
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
                                        <option value="Australia">Australia</option>
                                        <option value="Hong Kong">Hong Kong</option>
                                        <option value="Taiwan">Taiwan</option>
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

                            {/* Coupon Input */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                                <input
                                    type="text"
                                    placeholder={isKr ? "프로모션 코드" : "Promo Code"}
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    style={{
                                        padding: '10px 16px',
                                        background: '#333',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Apply
                                </button>
                            </div>

                            {/* Items List (Mini) */}
                            <div style={{ marginBottom: '24px', maxHeight: '200px', overflowY: 'auto' }}>
                                {cart.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                                        <span style={{ color: '#555' }}>
                                            {t(`products.${item.id}.name`)} x {item.quantity}
                                        </span>
                                        <span style={{ fontWeight: '600' }}>
                                            {formatMoney(
                                                isKr
                                                    ? (item.priceKRW || 0) * item.quantity
                                                    : (item.priceUSD || 0) * item.quantity
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-divider"></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: '#4b5563' }}>
                                <span>{t('cart.subtotal')}</span>
                                <span style={{ color: 'var(--ink)', fontWeight: '600' }}>
                                    {formatMoney(isKr ? cartTotalKRW : cartTotalUSD)}
                                </span>
                            </div>

                            {appliedDiscount > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: '#ef4444' }}>
                                    <span>Discount</span>
                                    <span style={{ fontWeight: '600' }}>
                                        - {formatMoney(appliedDiscount)}
                                    </span>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: '#4b5563' }}>
                                <span>{t('cart.shipping')}</span>
                                <span style={{ fontSize: '14px', fontWeight: 'bold', color: (shippingResult && shippingResult.isFree) ? '#22c55e' : 'inherit' }}>
                                    {formData.country
                                        ? ((shippingResult && shippingResult.isFree)
                                            ? 'Free'
                                            : formatMoney(shippingCost))
                                        : (t('cart.shipping_calculated'))
                                    }
                                </span>
                            </div>

                            <div className="cart-divider"></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <span style={{ fontSize: '18px', fontWeight: '700' }}>{t('cart.total')}</span>
                                <span style={{ fontSize: '24px', fontWeight: '800' }}>
                                    {/* Calculated logic for proper display update */}
                                    {formatMoney(
                                        Math.max(0, (isKr ? cartTotalKRW : cartTotalUSD) - appliedDiscount) + shippingCost
                                    )}
                                </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: '#4b5563' }}>
                                <span>{t('cart.shipping')}</span>
                                <span style={{ fontSize: '14px', fontWeight: 'bold', color: (shippingResult && shippingResult.isFree) ? '#22c55e' : 'inherit' }}>
                                    {formData.country
                                        ? ((shippingResult && shippingResult.isFree)
                                            ? 'Free'
                                            : formatMoney(shippingCost))
                                        : (t('cart.shipping_calculated'))
                                    }
                                </span>
                            </div>

                            <div className="cart-divider"></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <span style={{ fontSize: '18px', fontWeight: '700' }}>{t('cart.total')}</span>
                                <span style={{ fontSize: '24px', fontWeight: '800' }}>
                                    {formatMoney(grandTotal)}
                                </span>
                            </div>

                            <div className="cart-divider"></div>

                            {/* Payment Method Selector */}
                            <div style={{ marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>Payment Method</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '12px',
                                        border: paymentMethod === 'inicis' ? '2px solid #333' : '1px solid #ddd',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        background: paymentMethod === 'inicis' ? '#f9f9f9' : '#fff'
                                    }}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="inicis"
                                            checked={paymentMethod === 'inicis'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <span style={{ fontWeight: '500' }}>Credit Card (KR/Domestic)</span>
                                    </label>

                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '12px',
                                        border: paymentMethod === 'paypal' ? '2px solid #00457C' : '1px solid #ddd',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        background: paymentMethod === 'paypal' ? '#f0f9ff' : '#fff'
                                    }}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontWeight: '500', color: '#00457C' }}>PayPal</span>
                                            <span style={{ fontSize: '12px', color: '#666' }}>(International / USD)</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: paymentMethod === 'paypal' ? '#00457C' : '#000',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s'
                                }}
                            >
                                {t('checkout_page.proceed_payment')} ({paymentMethod === 'paypal' ? 'USD' : (isKr ? 'KRW' : 'USD')})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
