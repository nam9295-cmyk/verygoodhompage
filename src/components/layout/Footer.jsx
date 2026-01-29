import { Link } from 'react-router-dom';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer" style={{ padding: '60px 20px', backgroundColor: '#f9f9f9', borderTop: '1px solid #eaeaea' }}>
            <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

                <div className="footer-top" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
                    <div className="footer-brand-section" style={{ width: '100%' }}>
                        <div className="footer-brand" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>VERYGOOD CHOCOLATE</div>
                        <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px', alignItems: 'center' }}>
                                <span>Company Name: Very Good Co., Ltd.</span>
                                <span style={{ color: '#ddd' }}>|</span>
                                <span>Owner: JEONGMIN CHEON</span>
                                <span style={{ color: '#ddd' }}>|</span>
                                <span>Business License: 850-81-02950</span>
                                <span style={{ color: '#ddd' }}>|</span>
                                <span>Mail-order License: 2023-DaeguDalseo-1940</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px', alignItems: 'center', marginTop: '10px' }}>
                                <span>Address: 1F 13 Sangnok-ro 11-gil, Suseong-gu, Daegu, 42014, Republic of Korea</span>
                                <span style={{ color: '#ddd' }}>|</span>
                                <span>Contact: verygoutchocolate@gmail.com</span>
                                <span style={{ color: '#ddd' }}>|</span>
                                <span>Tel: +82-70-7840-0717</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ddd', paddingTop: '20px', flexWrap: 'wrap', gap: '15px' }}>
                    <div className="footer-copyright" style={{ fontSize: '13px', color: '#888' }}>
                        Copyright: © {year} Very Good Co., Ltd. All rights reserved.
                    </div>

                    <div className="footer-links" style={{ display: 'flex', gap: '20px' }}>
                        <Link to="/terms" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>Terms of Service</Link>
                        <span style={{ color: '#ddd' }}>|</span>
                        <Link to="/privacy" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>Privacy Policy</Link>
                        <span style={{ color: '#ddd' }}>|</span>
                        <Link to="/refund" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>Refund Policy</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
