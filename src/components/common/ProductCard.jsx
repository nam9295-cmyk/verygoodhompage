import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductCard({ product, variants }) {
    const { isKr } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    // Determine which image to show
    const displayImage = isHovered && product.hoverImage
        ? product.hoverImage
        : product.mainImage;

    // Helper to format price like Amazon: <sup>$</sup>7<sup>49</sup>
    const renderPrice = () => {
        if (!product.price) return null;

        // Handle number format
        const priceNum = Number(product.price);
        const integerPart = Math.floor(priceNum);
        const decimalPart = (priceNum % 1).toFixed(2).substring(2); // Extract "49" from 7.49 or "20" from 8.20

        return (
            <div className="amazon-price">
                <span className="currency">$</span>
                <span className="integer">{integerPart}</span>
                <span className="fraction">{decimalPart}</span>
            </div>
        );
    };

    return (
        <motion.article
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
                    {isKr && product.name_ko ? product.name_ko : product.name}
                </div>

                {/* 3. Amazon Style Price */}
                <div className="meta">
                    {renderPrice()}
                </div>

                {/* 4. Button */}
                <div className="btns">
                    <Link
                        className="btn primary"
                        to={`/product/${product.id}`}
                    >
                        {isKr ? '상세보기' : 'more info'}
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}
