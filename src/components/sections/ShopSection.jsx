import { useState } from 'react';
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
    const [activeTab, setActiveTab] = useState('new');

    const filteredProducts = products.filter(p => p.tabs.includes(activeTab));

    return (
        <section className="section" id="shop">
            <div className="section-head" />

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            <motion.div
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
