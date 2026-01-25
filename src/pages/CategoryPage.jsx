import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import ProductCard from '../components/common/ProductCard';
import { motion } from 'framer-motion';

const categoryInfo = {
    chocolate: {
        title: 'Sweet & Healthy',
        title_ko: '달콤하고 건강한 일상의 즐거움',
        desc: 'Premium chocolates made with natural ingredients.'
    },
    tea: {
        title: 'Daily Ritual',
        title_ko: '매일의 활력을 채우는 리추얼',
        desc: 'Detox teas blended for your body and mind.'
    },
    detox: { // Alias for tea if needed
        title: 'Daily Ritual',
        title_ko: '매일의 활력을 채우는 리추얼',
        desc: 'Detox teas blended for your body and mind.'
    },
    gift: {
        title: 'Perfect Gift',
        title_ko: '마음을 전하는 가장 완벽한 방법',
        desc: 'Curated sets for special moments.'
    }
};

export default function CategoryPage() {
    const { id } = useParams(); // 'chocolate', 'tea', 'gift'
    const { isKr } = useLanguage();

    // Mapping: if id is 'detox', treat as 'tea' category for filtering? 
    // Or strict filtering. Let's assume strict first.
    // If exact match fails, try mapping 'detox' -> 'tea'
    const targetCategory = id === 'detox' ? 'tea' : id;

    const filteredProducts = products.filter(p => p.category === targetCategory);
    const info = categoryInfo[id] || categoryInfo[targetCategory] || { title: id, title_ko: id, desc: '' };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px 100px',
                minHeight: '80vh'
            }}
        >
            <Helmet>
                <title>{info.title} - Very Good Chocolate</title>
            </Helmet>

            {/* Header Section */}
            <section style={{ padding: '100px 0 60px', textAlign: 'center' }}>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        fontFamily: 'var(--menu-font)',
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        marginBottom: '16px'
                    }}
                >
                    {info.title}
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontSize: '16px',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}
                >
                    {isKr ? info.title_ko : info.desc}
                </motion.p>
            </section>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="category-grid"
                    // Inline styles for grid, but can be moved to CSS for complex responsiveness if needed
                    // Using basic responsive grid here
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Default responsive
                        gap: '40px 24px',
                    }}
                >
                    {/* 
                       Note: User requested specific: 
                       Desktop: grid-cols-2 (2x2) -> Since there are 4 products usually.
                       Mobile: grid-cols-1.
                       'auto-fill' might be too broad. Let's use media query controlled class or explicit styles.
                       I'll add a class 'category-product-grid' and add css in index.css as well best practice,
                       OR use formatted inline styles with window matchMedia (dirty).
                       Let's stick to adding a CSS class `category-grid` to index.css or simple logic.
                       User asked for Desktop: grid-cols-2.
                    */}
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} variants={itemVariants} />
                    ))}
                </motion.div>
            ) : (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
                    {isKr ? '해당 카테고리에 제품이 없습니다.' : 'No products found in this category.'}
                </div>
            )}
        </motion.main>
    );
}
