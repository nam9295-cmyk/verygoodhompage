import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import ProductCard from '../components/common/ProductCard';

const categoryCopy = {
    chocolate: {
        title: 'Chocolate Collection',
        title_ko: '초콜릿 컬렉션',
        desc: 'Small-batch chocolates crafted for texture and balance. Explore classics and seasonal editions.',
        desc_ko: '텍스처와 밸런스를 살린 스몰배치 초콜릿. 클래식과 시즌 한정 라인을 만나보세요.'
    },
    tea: {
        title: 'Tea Collection',
        title_ko: '티 컬렉션',
        desc: 'Aromatic blends designed for everyday rituals and slow, mindful moments.',
        desc_ko: '매일의 리추얼을 위한 아로마 블렌딩. 차분한 휴식의 순간을 제안합니다.'
    },
    gift: {
        title: 'Gift Collection',
        title_ko: '기프트 컬렉션',
        desc: 'Curated gift sets that highlight signature flavors and elegant presentation.',
        desc_ko: '시그니처 맛과 우아한 패키징을 담은 기프트 세트.'
    }
};

const categoryOrder = ['chocolate', 'tea', 'gift'];

export default function ProductsPage() {
    const { isKr } = useLanguage();

    return (
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px', minHeight: '80vh' }}>
            <Helmet>
                <title>Products - Very Good Chocolate</title>
                <meta
                    name="description"
                    content="Explore chocolate, tea, and gift collections from Very Good Chocolate."
                />
            </Helmet>

            <section style={{ padding: '110px 0 40px' }}>
                <h1 style={{ fontFamily: 'var(--menu-font)', fontSize: 'clamp(34px, 5vw, 52px)', marginBottom: '12px' }}>
                    {isKr ? '제품 전체 보기' : 'All Products'}
                </h1>
                <p style={{ fontSize: '16px', color: '#666', maxWidth: '720px' }}>
                    {isKr
                        ? '제품 라인업을 카테고리별로 정리했습니다. 디테일 페이지에서 원재료, 특징, 사용 팁을 확인하세요.'
                        : 'Browse the full lineup by category. Visit each product page for ingredients, features, and usage tips.'}
                </p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {categoryOrder.map((category) => (
                        <Link
                            key={category}
                            to={`/category/${category}`}
                            style={{
                                padding: '8px 14px',
                                borderRadius: '999px',
                                border: '1px solid #e5e5e5',
                                textDecoration: 'none',
                                color: '#333',
                                fontSize: '13px'
                            }}
                        >
                            {isKr ? categoryCopy[category].title_ko : categoryCopy[category].title}
                        </Link>
                    ))}
                </div>
            </section>

            {categoryOrder.map((category) => {
                const info = categoryCopy[category];
                const items = products.filter((product) => product.category === category);

                return (
                    <section key={category} style={{ padding: '40px 0 60px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '20px', flexWrap: 'wrap' }}>
                            <div>
                                <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: '8px' }}>
                                    {isKr ? info.title_ko : info.title}
                                </h2>
                                <p style={{ fontSize: '15px', color: '#666', maxWidth: '680px' }}>
                                    {isKr ? info.desc_ko : info.desc}
                                </p>
                            </div>
                            <Link
                                to={`/category/${category}`}
                                style={{ textDecoration: 'none', color: '#111', fontSize: '14px' }}
                            >
                                {isKr ? '카테고리 전체 보기 →' : 'View category →'}
                            </Link>
                        </div>

                        <div className="category-grid-2col" style={{ marginTop: '28px' }}>
                            {items.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                );
            })}

            <section style={{ padding: '40px 0 0' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>
                    {isKr ? '제품 상세 안내' : 'Product Details'}
                </h2>
                <p style={{ fontSize: '15px', color: '#666', maxWidth: '720px' }}>
                    {isKr
                        ? '원재료, 알레르기 정보, 보관 방법, 추천 페어링 등 상세 정보는 각 제품 페이지에서 확인할 수 있습니다.'
                        : 'Ingredients, allergy notices, storage tips, and pairing ideas are available on each product page.'}
                </p>
            </section>
        </main>
    );
}
