import { useState } from 'react';
import { products } from '../../data/products';
import Tabs from '../common/Tabs';
import ProductCard from '../common/ProductCard';

const tabs = [
    { key: 'best', label: 'Best' },
    { key: 'new', label: 'Chocolate' },
    { key: 'tea', label: 'Detox' },
    { key: 'gift', label: 'Merch' },
];

export default function ShopSection() {
    const [activeTab, setActiveTab] = useState('new');

    const filteredProducts = products.filter(p => p.tabs.includes(activeTab));

    return (
        <section className="section" id="shop">
            <div className="section-head" />

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="grid" aria-live="polite">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
