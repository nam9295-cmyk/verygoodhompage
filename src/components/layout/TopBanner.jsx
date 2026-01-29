import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export default function TopBanner() {
    const { t } = useTranslation();
    const { cartTotal } = useCart();
    const { isKr } = useLanguage();

    // Logic
    // KR: Target 50,000 KRW
    // EN: Target $150 USD
    const KR_THRESHOLD = 50000;
    const USD_THRESHOLD = 150;
    const EXCHANGE_RATE = 1450;

    let message = '';

    if (isKr) {
        // Convert cartTotal (USD base) to KRW approx for checking threshold
        // Or assume the user wants consistent value comparison?
        // User Instructions: 50,000 KRW goal.
        // My cartTotal is in USD (e.g. 8.24).
        // currentKRW = 8.24 * 1450 = 11948.
        const currentKRW = Math.round(cartTotal * EXCHANGE_RATE);
        const remaining = KR_THRESHOLD - currentKRW;

        if (remaining <= 0) {
            message = t('banner.free_shipping_success');
        } else {
            message = t('banner.free_shipping_message', { amount: remaining.toLocaleString() });
        }
    } else {
        // USD
        const remaining = USD_THRESHOLD - cartTotal;

        if (remaining <= 0) {
            message = t('banner.free_shipping_success');
        } else {
            message = t('banner.free_shipping_message', { amount: remaining.toFixed(2) });
        }
    }

    return (
        <div style={{
            backgroundColor: '#2a2a2a',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            fontSize: '13px',
            fontWeight: '500',
            width: '100%',
            zIndex: 50,
            position: 'fixed',
            top: 0,
            left: 0
        }}>
            {message}
        </div>
    );
}
