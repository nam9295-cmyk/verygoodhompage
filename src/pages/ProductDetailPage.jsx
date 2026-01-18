import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import Modal from '../components/common/Modal';

const styles = {
    productDetailPage: {
        maxWidth: '1200px',
        margin: '140px auto 100px',
        padding: '0 24px',
    },
    pdGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        marginBottom: '80px',
    },
    pdImgArea: {
        background: '#f8f8f8',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pdImg: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
    },
    pdInfoArea: {
        paddingTop: '20px',
    },
    pdCategory: {
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--brand)',
        marginBottom: '12px',
        fontWeight: 700,
    },
    pdTitle: {
        fontFamily: 'var(--menu-font)',
        fontSize: '36px',
        fontWeight: 700,
        marginBottom: '20px',
        lineHeight: 1.2,
    },
    pdPrice: {
        fontSize: '24px',
        fontWeight: 500,
        marginBottom: '30px',
        color: 'var(--ink)',
    },
    pdDesc: {
        fontSize: '16px',
        lineHeight: 1.8,
        color: 'rgba(0, 0, 0, 0.7)',
        marginBottom: '40px',
        borderTop: '1px solid #eee',
        borderBottom: '1px solid #eee',
        padding: '20px 0',
    },
    pdActions: {
        display: 'flex',
        gap: '16px',
    },
    pdBtn: {
        flex: 1,
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        border: 'none',
    },
    pdBtnPrimary: {
        background: 'var(--brand)',
        color: '#fff',
    },
    pdBtnOutline: {
        background: 'transparent',
        border: '1px solid var(--ink)',
        color: 'var(--ink)',
    },
    pdDetailContent: {
        textAlign: 'center',
        borderTop: '1px solid #eee',
        paddingTop: '80px',
    },
    pdDetailImg: {
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
        display: 'block',
    },
    notFound: {
        textAlign: 'center',
        padding: '100px 0',
    },
};

export default function ProductDetailPage() {
    const { id } = useParams();
    const { isKr } = useLanguage();
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showBuyModal, setShowBuyModal] = useState(false);

    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <main style={styles.productDetailPage}>
                <Helmet>
                    <title>Product Not Found - Very Good Chocolate</title>
                </Helmet>
                <div style={styles.notFound}>
                    <h2>{isKr ? '제품을 찾을 수 없습니다' : 'Product not found'}</h2>
                    <p>{isKr ? '요청하신 제품정보가 없습니다.' : 'Sorry, the product you are looking for does not exist.'}</p>
                    <Link to="/#shop" style={{ textDecoration: 'underline' }}>
                        {isKr ? '돌아가기' : 'Back to Shop'}
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <>
            <Helmet>
                <title>{isKr && product.name_ko ? product.name_ko : product.name} - Very Good Chocolate</title>
                <meta name="description" content={isKr && product.description_ko ? product.description_ko : product.description} />
                <link rel="canonical" href={`https://verygood-chocolate.com/product/${id}`} />
            </Helmet>

            <main style={styles.productDetailPage}>
                <div style={styles.pdGrid}>
                    <div style={styles.pdImgArea}>
                        <img style={styles.pdImg} src={product.mainImage} alt={product.name} />
                    </div>
                    <div style={styles.pdInfoArea}>
                        <div style={styles.pdCategory}>{product.category}</div>
                        <h1 style={styles.pdTitle}>
                            {isKr && product.name_ko ? product.name_ko : product.name}
                        </h1>
                        <div style={styles.pdPrice}>{product.priceStr}</div>
                        <div style={styles.pdDesc}>
                            {isKr && product.description_ko ? product.description_ko : product.description}
                        </div>
                        <div style={styles.pdActions}>
                            <button
                                style={{ ...styles.pdBtn, ...styles.pdBtnOutline }}
                                onClick={() => setShowDetailsModal(true)}
                            >
                                {isKr ? '상세 정보 보기' : 'VIEW DETAILS'}
                            </button>
                            <button
                                style={{ ...styles.pdBtn, ...styles.pdBtnPrimary }}
                                onClick={() => setShowBuyModal(true)}
                            >
                                {isKr ? '구매하기' : 'BUY NOW'}
                            </button>
                        </div>
                    </div>
                </div>

                <div style={styles.pdDetailContent}>
                    <h3 style={{ fontFamily: 'var(--menu-font)', fontSize: '24px', marginBottom: '40px' }}>
                        Product Details
                    </h3>
                    <img
                        style={styles.pdDetailImg}
                        src={product.descImage || 'https://via.placeholder.com/800x2000?text=Detail+Description+Image'}
                        alt="Detail info"
                    />
                </div>
            </main>

            <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)}>
                {product.nutritionImage ? (
                    <img src={product.nutritionImage} alt={isKr ? '영양정보' : 'Nutrition Facts'} style={{ width: '100%' }} />
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(0, 0, 0, 0.6)' }}>
                        <h3 style={{ fontFamily: 'var(--menu-font)', marginBottom: '12px' }}>
                            {isKr ? '표기사항' : 'Product Information'}
                        </h3>
                        <p>{isKr ? '영양정보가 곧 업데이트됩니다.' : 'Nutrition information coming soon.'}</p>
                    </div>
                )}
            </Modal>

            <Modal isOpen={showBuyModal} onClose={() => setShowBuyModal(false)}>
                <div style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6, marginBottom: '24px', wordBreak: 'keep-all' }}>
                        {isKr
                            ? '해외 배송은 현재 준비 중입니다. 곧 준비될 예정입니다. 이메일로 연락 주시면 상담 후 배송을 안내해 드리겠습니다.'
                            : 'International shipping is currently being prepared. We will be ready soon. If you contact us via email, we will consult with you and arrange shipping.'}
                    </p>
                    <form className="inquiry-form" action="https://formspree.io/f/mwvveyoj" method="POST">
                        <div className="form-group">
                            <label htmlFor="modal-name">{isKr ? '이름' : 'Name'}</label>
                            <input type="text" id="modal-name" name="name" placeholder={isKr ? '성함을 입력해주세요' : 'Your Name'} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="modal-email">{isKr ? '이메일' : 'E-mail'}</label>
                            <input type="email" id="modal-email" name="email" placeholder={isKr ? '이메일 주소를 입력해주세요' : 'Your Email Address'} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="modal-message">{isKr ? '메시지' : 'Message'}</label>
                            <textarea id="modal-message" name="message" rows="4" placeholder={isKr ? '문의하실 내용을 입력해주세요' : 'How can we help you?'} required />
                        </div>
                        <button type="submit" className="cta form-submit" style={{ width: '100%', alignSelf: 'center' }}>
                            {isKr ? '문의 보내기' : 'SEND MESSAGE'}
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
}
