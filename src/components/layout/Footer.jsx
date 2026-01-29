import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="footer" style={{ padding: '60px 20px', backgroundColor: '#f9f9f9', borderTop: '1px solid #eaeaea' }}>
            <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

                <div className="footer-top" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
                    <div className="footer-brand-section" style={{ width: '100%' }}>
                        <div className="footer-brand" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>VERYGOOD CHOCOLATE</div>
                        <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px', alignItems: 'center' }}>
                                <span>{t('footer.company_name_label')} {t('footer.company_name')}</span>
                                <span style={{ color: '#ddd' }}>|</span>
                                <span>{t('footer.owner_label')} {t('footer.owner')}</span>
                                <span style={{ color: '#ddd' }}>|</span>
                                <span>{t('footer.business_license_label')} 850-81-02950</span>
                                <span style={{ color: '#ddd' }}>|</span>
                                <span>{t('footer.mail_order_license_label')} 2023-DaeguDalseo-1940</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px', alignItems: 'center', marginTop: '10px' }}>
                                <span>{t('footer.address_label')} {t('footer.address')}</span>
                                <span style={{ color: '#ddd' }}>|</span>
                                <span>{t('footer.contact_label')} verygoutchocolate@gmail.com</span>
                                <span style={{ color: '#ddd' }}>|</span>
                                <span>{t('footer.tel_label')} +82-70-7840-0717</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ddd', paddingTop: '20px', flexWrap: 'wrap', gap: '15px' }}>
                    <div className="footer-copyright" style={{ fontSize: '13px', color: '#888' }}>
                        {t('footer.copyright', { year })}
                    </div>

                    <div className="footer-links" style={{ display: 'flex', gap: '20px' }}>
                        <Link to="/terms" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>{t('footer.terms')}</Link>
                        <span style={{ color: '#ddd' }}>|</span>
                        <Link to="/privacy" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>{t('footer.privacy')}</Link>
                        <span style={{ color: '#ddd' }}>|</span>
                        <Link to="/refund" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>{t('footer.refund')}</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
