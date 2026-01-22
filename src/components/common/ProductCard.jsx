import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductCard({ product, variants }) {
    const { isKr } = useLanguage();

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
        >
            <div className="thumb">
                <img src={product.mainImage} alt={product.name} loading="lazy" />
            </div>
            <div className="body">
                <div className="title">
                    {isKr && product.name_ko ? product.name_ko : product.name}
                </div>
                <div className="meta">
                    <div className="price">{product.priceStr}</div>
                    <div className="pills">
                        {product.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="mini">{tag}</span>
                        ))}
                    </div>
                </div>
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
