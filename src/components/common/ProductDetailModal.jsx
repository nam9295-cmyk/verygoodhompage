import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    ResponsiveContainer
} from 'recharts';

// Product-specific data for modal
const productsData = {
    'british-black': {
        name: 'British black',
        subtitle: 'with Geochang Doraji',
        description: 'The pleasant bitterness of balloon flower root (doraji) meets the deep richness of black tea, creating a warm and comforting cup.',
        popImage: '/assets/products/british-black/british_pop.webp',
        chartColor: '#806D6E',
        radarData: [
            { subject: '호흡기(Respiratory)', value: 95, fullMark: 100 },
            { subject: '면역(Immunity)', value: 55, fullMark: 100 },
            { subject: '소화/해독(Digestion)', value: 40, fullMark: 100 },
            { subject: '활력(Energy)', value: 70, fullMark: 100 },
            { subject: '이완(Relaxation)', value: 30, fullMark: 100 },
        ],
        icons: [
            { src: '/assets/products/british-black/respiratory_b.svg', label: 'respiratory\ncare' },
            { src: '/assets/products/british-black/dust_b.svg', label: 'fine-dust\ndefense' },
            { src: '/assets/products/british-black/immune_b.svg', label: 'Immune foundation\ncare' },
            { src: '/assets/products/british-black/antiviral_b.svg', label: 'Antiviral\nsupport' },
        ]
    },
    'asian-gold': {
        name: 'Asian gold',
        subtitle: 'with Goheung Yuja',
        description: 'The bright, citrusy freshness of yuja (yuzu) blends with the deep taste of oolong, delivering vitamins you can drink.',
        popImage: '/assets/products/asian-gold/asian_pop.webp',
        chartColor: '#bca591',
        radarData: [
            { subject: '호흡기(Respiratory)', value: 30, fullMark: 100 },
            { subject: '면역(Immunity)', value: 90, fullMark: 100 },
            { subject: '소화/해독(Digestion)', value: 55, fullMark: 100 },
            { subject: '활력(Energy)', value: 85, fullMark: 100 },
            { subject: '이완(Relaxation)', value: 60, fullMark: 100 },
        ],
        icons: [
            { src: '/assets/products/asian-gold/recovery_a.svg', label: 'Fatigue\nrecovery' },
            { src: '/assets/products/asian-gold/imflammation_a.svg', label: 'Inflammation\nrelief' },
            { src: '/assets/products/asian-gold/neutral_a.svg', label: 'Neutral fat\nbreakdown' },
            { src: '/assets/products/asian-gold/skin_a.svg', label: 'Skin-beautifying\neffect' },
        ]
    },
    'hibiscus-fruit': {
        name: 'Hibiscus fruit',
        subtitle: 'with Mungyeong Omija',
        description: 'Omija’s liver-cleansing support meets hibiscus’ diuretic action, helping a complete body cleanse.',
        popImage: '/assets/products/hibiscus-fruit/hibis_pop.webp',
        chartColor: '#c09696',
        radarData: [
            { subject: '호흡기(Respiratory)', value: 20, fullMark: 100 },
            { subject: '면역(Immunity)', value: 40, fullMark: 100 },
            { subject: '소화/해독(Digestion)', value: 95, fullMark: 100 },
            { subject: '활력(Energy)', value: 40, fullMark: 100 },
            { subject: '이완(Relaxation)', value: 30, fullMark: 100 },
        ],
        icons: [
            { src: '/assets/products/hibiscus-fruit/liver_h.svg', label: 'Liver detox\nsupport' },
            { src: '/assets/products/hibiscus-fruit/stomach_h.svg', label: 'Improved stomach\nfunction' },
            { src: '/assets/products/hibiscus-fruit/carbohydrate_h.svg', label: 'Carbohydrate\nmetabolism blocking' },
            { src: '/assets/products/hibiscus-fruit/swelling_h.svg', label: 'Reduced\nswelling' },
        ]
    },
    'minty-chocolat': {
        name: 'Minty chocolat',
        subtitle: 'with Jeju Matcha',
        description: 'The calmness of green tea meets refreshing mint, offering a restful moment that cools a busy mind.',
        popImage: '/assets/products/minty-chocolat/minty_pop.webp',
        chartColor: '#7099a6',
        radarData: [
            { subject: '호흡기(Respiratory)', value: 30, fullMark: 100 },
            { subject: '면역(Immunity)', value: 40, fullMark: 100 },
            { subject: '소화/해독(Digestion)', value: 60, fullMark: 100 },
            { subject: '활력(Energy)', value: 40, fullMark: 100 },
            { subject: '이완(Relaxation)', value: 95, fullMark: 100 },
        ],
        icons: [
            { src: '/assets/products/minty-chocolat/relaxation_m.svg', label: 'Mind & body\nrelaxation' },
            { src: '/assets/products/minty-chocolat/body_m.svg', label: 'Body fat\nreduction' },
            { src: '/assets/products/minty-chocolat/headache_m.svg', label: 'Headache\nrelief' },
            { src: '/assets/products/minty-chocolat/digestive_m.svg', label: 'Digestive discomfort\nrelief' },
        ]
    }
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: '24px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    closeBtn: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(0, 0, 0, 0.05)',
        cursor: 'pointer',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        transition: 'all 0.2s ease',
        zIndex: 10,
    },
    topSection: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        padding: '24px 32px',
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        maxHeight: '280px',
        borderRadius: '12px',
        objectFit: 'contain',
    },
    chartArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '280px',
        width: '100%',
    },
    bottomSection: {
        padding: '24px 32px 32px',
        borderTop: '1px solid #eee',
        backgroundColor: '#fafafa',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
    },
    productTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '26px',
        fontWeight: '700',
        marginBottom: '4px',
        color: '#1f1f1f',
    },
    productSubtitle: {
        fontSize: '14px',
        color: '#888',
        marginBottom: '12px',
        fontWeight: '400',
    },
    productDescription: {
        fontSize: '14px',
        lineHeight: '1.7',
        color: '#555',
        marginBottom: '24px',
        maxWidth: '600px',
    },
    iconsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        justifyItems: 'center',
    },
    iconItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        textAlign: 'center',
        minWidth: '80px',
    },
    iconImage: {
        width: '48px',
        height: '48px',
        objectFit: 'contain',
    },
    iconLabel: {
        fontSize: '12px',
        color: '#666',
        lineHeight: '1.3',
        fontWeight: '500',
    },
};

import { useTranslation } from 'react-i18next';

export default function ProductDetailModal({ isOpen, onClose, product }) {
    const { t } = useTranslation();
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    const data = productsData[product.id];

    // If no specific modal data exists for this product, don't show custom modal
    // (Or handle fallback if needed, for now assuming data exists for target products)
    if (!data) return null;

    return (
        <motion.div
            style={styles.overlay}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                style={styles.modal}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                }}
            >
                <button
                    style={styles.closeBtn}
                    onClick={onClose}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                    }}
                >
                    ×
                </button>

                {/* Top Section: Image + Chart */}
                <div style={styles.topSection} className="product-detail-modal-top">
                    <div>
                        <img
                            src={data.popImage}
                            alt={data.name}
                            style={styles.productImage}
                        />
                    </div>
                    <motion.div
                        style={styles.chartArea}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data.radarData} startAngle={90} endAngle={-270}>
                                <PolarGrid
                                    stroke="#d0d0d0"
                                    strokeWidth={1}
                                    gridType="polygon"
                                />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{
                                        fill: '#666',
                                        fontSize: 10,
                                        fontWeight: 500
                                    }}
                                    tickLine={false}
                                />
                                <Radar
                                    name="Benefits"
                                    dataKey="value"
                                    stroke={data.chartColor}
                                    fill={data.chartColor}
                                    fillOpacity={0.7}
                                    strokeWidth={2}
                                    isAnimationActive={true}
                                    animationBegin={300}
                                    animationDuration={800}
                                    animationEasing="ease-out"
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Bottom Section: Description + Icons */}
                <div style={styles.bottomSection} className="product-detail-modal-bottom">
                    <h2 style={styles.productTitle}>{t(`products.${product.id}.name`)}</h2>
                    <p style={styles.productSubtitle}>{t(`products.${product.id}.modal_subtitle`)}</p>
                    <p style={styles.productDescription}>
                        {t(`products.${product.id}.modal_desc`)}
                    </p>

                    <div style={styles.iconsContainer} className="product-detail-modal-icons">
                        {data.icons.map((icon, idx) => (
                            <div key={idx} style={styles.iconItem}>
                                <img
                                    src={icon.src}
                                    alt={icon.label}
                                    style={styles.iconImage}
                                />
                                <span style={styles.iconLabel}>
                                    {icon.label.split('\n').map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < icon.label.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
