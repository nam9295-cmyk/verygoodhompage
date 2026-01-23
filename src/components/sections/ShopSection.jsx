import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import Tabs from '../common/Tabs';
import ProductCard from '../common/ProductCard';

const tabs = [
    { key: 'best', label: 'Best' },
    { key: 'new', label: 'Chocolate' },
    { key: 'tea', label: 'Detox' },
    { key: 'gift', label: 'Merch' },
];

// Stagger animation container variant
const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

// Individual card animation variant
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
        },
    },
};

export default function ShopSection() {
    const [activeTab, setActiveTab] = useState('tea');
    const gridRef = useRef(null);

    const filteredProducts = products.filter(p => p.tabs.includes(activeTab));

    const handleScroll = (direction) => {
        if (!gridRef.current) return;
        const scrollAmount = gridRef.current.offsetWidth * 0.8;
        gridRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section className="section" id="shop">
            <div className="section-head">
                <div className="slider-controls">
                    <button className="slider-btn" onClick={() => handleScroll('left')} aria-label="Previous">←</button>
                    <button className="slider-btn" onClick={() => handleScroll('right')} aria-label="Next">→</button>
                </div>
            </div>

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            <motion.div
                ref={gridRef}
                className="grid"
                aria-live="polite"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                key={activeTab}
            >
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        variants={cardVariants}
                    />
                ))}
            </motion.div>
        </section>
    );
}
