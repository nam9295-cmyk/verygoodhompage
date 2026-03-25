import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { withLocale } from '../../utils/pathUtils';

export default function ProductCard({ product, variants }) {
    const { t } = useTranslation();
    const { isKr } = useLanguage();
    const locale = isKr ? 'ko' : 'en';
    const [isHovered, setIsHovered] = useState(false);

    // Determine which image to show
    const displayImage = isHovered && product.hoverImage
        ? product.hoverImage
        : product.mainImage;
    const MotionArticle = motion.article;

    return (
        <MotionArticle
            className="card product"
            variants={variants}
            whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="thumb">
                <img
                    src={displayImage}
                    alt={product.name}
                    loading="lazy"
                    style={{ transition: 'opacity 0.3s ease' }}
                />
            </div>
            <div className="body">
                {/* 1. Tags moved to top */}
                <div className="pills">
                    {product.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="mini">{tag}</span>
                    ))}
                </div>

                {/* 2. Title */}
                <div className="title">
                    {t(`products.${product.id}.name`)}
                </div>

                {/* 3. Price */}
                <div className="meta">
                    <div className="product-card-price" style={{
                        fontSize: '20px',
                        fontWeight: '400',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        color: '#0F1111',
                        marginTop: '8px',
                        display: 'block',
                        letterSpacing: '0',
                        lineHeight: '1.2'
                    }}>
                        <span className="currency" style={{ fontSize: 'inherit', fontWeight: 'inherit', fontFamily: 'inherit', color: 'inherit' }}>
                            {t(`products.${product.id}.price`)}
                        </span>
                    </div>
                </div>

                {/* 4. Button */}
                <div className="btns">
                    <Link
                        className="btn primary"
                        to={withLocale(`/product/${product.id}`, locale)}
                    >
                        {isKr ? '상세보기' : 'more info'}
                    </Link>
                </div>
            </div>
        </MotionArticle>
    );
}
