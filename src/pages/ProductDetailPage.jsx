import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import Modal from '../components/common/Modal';
import ProductDetailModal from '../components/common/ProductDetailModal';

const styles = {
    productDetailPage: {
        maxWidth: '1200px',
        margin: '140px auto 100px',
        padding: '0 24px',
    },
    pdGrid: {
        display: 'grid',
        gridTemplateColumns: '2.3fr 1fr',
        gap: '80px',
        marginBottom: '80px',
        alignItems: 'start',
    },
    pdImgArea: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    pdMainImgWrapper: {
        background: '#fff',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--line)',
        overflow: 'hidden',
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow)',
    },
    pdImg: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
    },
    pdThumbnails: {
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        padding: '4px 0 12px',
        scrollbarWidth: 'none',
    },
    pdThumb: {
        width: '80px',
        height: '80px',
        borderRadius: '12px',
        border: '2px solid transparent',
        overflow: 'hidden',
        cursor: 'pointer',
        flexShrink: 0,
        background: '#fff',
        transition: 'all 0.2s ease',
    },
    activeThumb: {
        borderColor: 'var(--brand)',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    pdThumbImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    pdInfoArea: {
        paddingTop: '0',
        position: 'sticky',
        top: '120px',
        height: 'fit-content',
    },
    /* ... rest of styles remain similar, adjusting some spacings ... */
    pdCategory: {
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--brand)',
        marginBottom: '8px',
        fontWeight: 700,
    },
    pdTitle: {
        fontFamily: 'var(--menu-font)',
        fontSize: 'clamp(32px, 4vw, 48px)',
        fontWeight: 700,
        marginBottom: '16px',
        lineHeight: 1.1,
    },
    pdPrice: {
        fontSize: '28px',
        fontWeight: 600,
        marginBottom: '32px',
        color: 'var(--ink)',
    },
    pdDesc: {
        fontSize: '16px',
        lineHeight: 1.8,
        color: 'rgba(0, 0, 0, 0.7)',
        marginBottom: '40px',
        borderTop: '1px solid #eee',
        borderBottom: '1px solid #eee',
        padding: '24px 0',
    },
    pdActions: {
        display: 'flex',
        gap: '16px',
    },
    pdBtn: {
        flex: 1,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '15px',
        border: 'none',
        transition: 'all 0.2s ease',
    },
    pdBtnPrimary: {
        background: 'var(--brand)',
        color: '#fff',
        boxShadow: '0 8px 20px rgba(237, 197, 196, 0.4)',
    },
    pdBtnOutline: {
        background: '#fff',
        border: '1.5px solid var(--ink)',
        color: 'var(--ink)',
    },
    pdDetailContent: {
        textAlign: 'center',
        borderTop: '1px solid #eee',
        paddingTop: '80px',
    },
    pdDetailImg: {
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        display: 'block',
        borderRadius: '12px',
    },
    notFound: {
        textAlign: 'center',
        padding: '100px 0',
    },
    detailGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginTop: '20px',
    },
    detailGridImg: {
        width: '100%',
        height: '100%',
        aspectRatio: '4/3', // Adjust aspect ratio as needed (e.g., 4/3, 1/1)
        objectFit: 'cover',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
    },
    // Accordion Styles
    accordionSection: {
        marginTop: '40px',
        borderTop: '1px solid var(--line)',
    },
    accordionItem: {
        borderBottom: '1px solid var(--line)',
    },
    accordionHeader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
    },
    accordionTitle: {
        fontSize: '16px',
        fontWeight: '700',
        color: 'var(--ink)',
        fontFamily: 'var(--menu-font)',
    },
    accordionIcon: {
        fontSize: '20px',
        fontWeight: '300',
        color: 'var(--ink)',
    },
    accordionContent: {
        paddingBottom: '24px',
        fontSize: '15px',
        lineHeight: '1.6',
        color: '#555',
    },
};

export default function ProductDetailPage() {
    const { id } = useParams();
    const { isKr } = useLanguage();
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? null : section);
    };

    const product = products.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);


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




    const detailImages = product.detailImages || [];


    return (
        <>
            <Helmet>
                <title>{isKr && product.name_ko ? product.name_ko : product.name} - Very Good Chocolate</title>
                <meta name="description" content={isKr && product.description_ko ? product.description_ko : product.description} />
                <link rel="canonical" href={`https://verygood-chocolate.com/product/${id}`} />
            </Helmet>

            <main style={styles.productDetailPage}>
                <div style={styles.pdGrid} className="pd-grid-mobile">
                    <div style={styles.pdImgArea}>
                        <div style={styles.pdMainImgWrapper} className="pd-main-img-wrapper-mobile">
                            <img
                                style={styles.pdImg}
                                src={product.mainImage}
                                alt={product.name}
                            />
                        </div>


                        {/* Detail Gallery Grid */}
                        <div style={styles.detailGrid} className="detail-grid-mobile">
                            {detailImages.map((img, idx) => (
                                <img key={idx} src={img} style={styles.detailGridImg} alt={`Detail ${idx + 1}`} />
                            ))}
                        </div>
                    </div>
                    <div style={styles.pdInfoArea} className="pd-info-area-mobile">
                        <div style={styles.pdCategory}>{product.category}</div>
                        <h1 style={styles.pdTitle}>
                            {isKr && product.name_ko ? product.name_ko : product.name}
                        </h1>
                        <div style={styles.pdPrice}>{product.priceStr}</div>
                        <div style={styles.pdDesc}>
                            {isKr && product.description_ko ? product.description_ko : product.description}
                        </div>
                        <div style={styles.pdActions} className="pd-actions-mobile">
                            <button
                                style={{ ...styles.pdBtn, ...styles.pdBtnOutline }}
                                className="mobile-action-btn"
                                onClick={() => setShowDetailsModal(true)}
                            >
                                {isKr ? '상세 정보 보기' : 'VIEW DETAILS'}
                            </button>
                            <button
                                style={{ ...styles.pdBtn, ...styles.pdBtnPrimary }}
                                className="mobile-action-btn"
                                onClick={() => setShowBuyModal(true)}
                            >
                                {isKr ? '구매하기' : 'BUY NOW'}
                            </button>
                        </div>

                        {/* Accordion Menu */}
                        <div style={styles.accordionSection}>
                            {/* Benefits Accordion */}
                            <div style={styles.accordionItem}>
                                <button
                                    style={styles.accordionHeader}
                                    onClick={() => toggleAccordion('benefits')}
                                >
                                    <span style={styles.accordionTitle}>{isKr ? '제품 특징' : 'Benefits*'}</span>
                                    <span style={styles.accordionIcon}>{openAccordion === 'benefits' ? '−' : '+'}</span>
                                </button>
                                {openAccordion === 'benefits' && (
                                    <div style={styles.accordionContent}>
                                        {isKr
                                            ? '이 제품은 항산화 성분이 풍부하며, 하루의 활력을 더해줍니다. 인공 첨가물 없이 100% 천연 재료로 만들어졌습니다.'
                                            : 'Rich in antioxidants and designed to boost your daily vitality. Made with 100% natural ingredients with no artificial additives.'}
                                    </div>
                                )}
                            </div>

                            {/* Ingredients Accordion */}
                            <div style={styles.accordionItem}>
                                <button
                                    style={styles.accordionHeader}
                                    onClick={() => toggleAccordion('ingredients')}
                                >
                                    <span style={styles.accordionTitle}>{isKr ? '원재료' : 'Ingredients'}</span>
                                    <span style={styles.accordionIcon}>{openAccordion === 'ingredients' ? '−' : '+'}</span>
                                </button>
                                {openAccordion === 'ingredients' && (
                                    <div style={styles.accordionContent}>
                                        {isKr
                                            ? '프리미엄 찻잎, 천연 허브, 건조 과일 조각. (알레르기 정보: 이 제품은 견과류를 가공하는 시설에서 제조되었습니다.)'
                                            : 'Premium tea leaves, natural herbs, dried fruit pieces. (Allergy Info: Manufactured in a facility that processes nuts.)'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.pdDetailContent}>
                    <h3 style={{ fontFamily: 'var(--menu-font)', fontSize: '24px', marginBottom: '40px' }}>
                        Product Details
                    </h3>

                    {/* Common Detox Info (for Detox products only) */}
                    {product.tags && product.tags.includes('DETOX') && (
                        <img
                            style={{ ...styles.pdDetailImg, marginBottom: '20px' }}
                            src="/assets/detox_common.png"
                            alt="Common Detox Info"
                        />
                    )}


                </div>
            </main >

            <ProductDetailModal
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                product={product}
            />

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
