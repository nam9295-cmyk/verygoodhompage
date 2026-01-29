import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export default function TopBanner() {
    const { t } = useTranslation();
    const { cartTotalKRW, cartTotalUSD } = useCart();
    const { isKr } = useLanguage();

    // Logic
    // KR: Target 50,000 KRW
    // EN: Target $150 USD
    const KR_THRESHOLD = 50000;
    const USD_THRESHOLD = 150;

    let message = '';

    if (isKr) {
        // Use cartTotalKRW directly which is the sum of priceKRW
        const remaining = KR_THRESHOLD - cartTotalKRW;

        if (remaining <= 0) {
            message = t('banner.free_shipping_success');
        } else {
            message = t('banner.free_shipping_message', { amount: remaining.toLocaleString() });
        }
    } else {
        // Use cartTotalUSD directly
        const remaining = USD_THRESHOLD - cartTotalUSD;

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
