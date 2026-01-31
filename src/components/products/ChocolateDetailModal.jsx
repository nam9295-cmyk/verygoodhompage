import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer } from 'recharts';
// import { useLanguage } from '../../context/LanguageContext'; // Unused

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
        /* Structural styles moved to CSS .choco-modal-top */
    },
    productImage: {
        width: '100%',
        maxHeight: '280px',
        borderRadius: '12px',
        objectFit: 'contain',
    },
    chartSection: {
        /* Structural styles moved to CSS .choco-modal-chart-section */
    },
    chartContainer: {
        /* Structural styles moved to CSS .choco-modal-chart-container */
    },
    legendContainer: {
        /* Structural styles moved to CSS .choco-modal-legend */
    },
    legendTitle: {
        fontSize: '0.9rem',
        fontWeight: '700',
        color: '#555',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: '2px solid #eee',
        paddingBottom: '5px',
    },
    legendList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: '1px solid #f0f0f0',
        fontSize: '0.85rem',
        color: '#444',
    },
    legendColor: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        marginRight: '8px',
        flexShrink: 0,
    },
    legendName: {
        fontWeight: '400', // Thinned down from 600
        marginRight: 'auto',
        fontSize: '15px', // Slightly larger for readability if thin
        color: '#444',
    },
    legendValue: {
        fontFamily: 'monospace',
        fontWeight: '600', // Reduced from 700, but keeping it slightly distinct
        color: '#333',
        fontSize: '15px',
    },
    bottomSection: {
        /* padding moved to CSS .choco-modal-bottom (partially, keeping border styles here) */
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
        color: '#8B4513',
        marginBottom: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    productDescription: {
        fontSize: '14px',
        lineHeight: '1.7',
        color: '#555',
        marginBottom: '24px',
        maxWidth: '100%',
    },
    iconsContainer: {
        /* Structural styles moved to CSS .choco-modal-icons */
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
        width: '64px',
        height: '64px',
        objectFit: 'contain',
        marginBottom: '10px'
    },
    iconLabel: {
        fontSize: '12px',
        color: '#666',
        lineHeight: '1.3',
    },
};

import { useTranslation } from 'react-i18next';

export default function ChocolateDetailModal({ product, onClose }) {
    // const { isKr } = useLanguage(); // Unused
    const { t } = useTranslation();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    if (!product) return null;

    return (
        <AnimatePresence>
            <motion.div
                style={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    style={styles.modal}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        style={styles.closeBtn}
                        onClick={onClose}
                    >
                        ×
                    </button>

                    {/* Top Section */}
                    <div style={styles.topSection} className="choco-modal-top">
                        {/* Image (Left Column) */}
                        <div>
                            <img
                                src={product.popImage || product.mainImage}
                                alt={product.name}
                                style={styles.productImage}
                            />
                        </div>

                        {/* Chart & Legend (Right Column) */}
                        <motion.div
                            style={styles.chartSection}
                            className="choco-modal-chart-section"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Radial Chart */}
                            <div style={styles.chartContainer} className="choco-modal-chart-container">
                                {product.flavorStats && (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadialBarChart
                                            innerRadius="30%"
                                            outerRadius="100%"
                                            data={product.flavorStats}
                                            startAngle={180}
                                            endAngle={-180}
                                            barSize={24}
                                        >
                                            <RadialBar
                                                minAngle={15}
                                                background={{ fill: '#f3f4f6' }}
                                                clockWise={true}
                                                dataKey="value"
                                                cornerRadius={12}
                                            />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                itemStyle={{ color: '#333' }}
                                            />
                                        </RadialBarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>

                            {/* Legend Side Panel */}
                            <div style={styles.legendContainer} className="choco-modal-legend">
                                <div style={styles.legendTitle}>{t('products.flavor_specs')}</div>
                                <ul style={styles.legendList}>
                                    {product.flavorStats && product.flavorStats.map((stat, idx) => (
                                        <li key={idx} style={styles.legendItem}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ ...styles.legendColor, backgroundColor: stat.fill }}></div>
                                                <span style={styles.legendName}>{stat.name}</span>
                                            </div>
                                            <span style={styles.legendValue}>{stat.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </motion.div>
                    </div>

                    {/* Bottom Section */}
                    <div style={styles.bottomSection} className="choco-modal-bottom">
                        <h2 style={styles.productTitle}>
                            {t(`products.${product.id}.name`)}
                        </h2>
                        <p style={styles.productSubtitle}>
                            {t(`products.${product.id}.price`)}
                        </p>
                        <p style={styles.productDescription}>
                            {t(`products.${product.id}.desc`)}
                        </p>

                        {/* Icons */}
                        <div style={styles.iconsContainer} className="choco-modal-icons">
                            {product.featureIcons && product.featureIcons.map((feature, idx) => (
                                <div key={idx} style={styles.iconItem}>
                                    <img
                                        src={feature.icon}
                                        alt={feature.label}
                                        style={styles.iconImage}
                                    />
                                    <span style={styles.iconLabel}>{feature.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
