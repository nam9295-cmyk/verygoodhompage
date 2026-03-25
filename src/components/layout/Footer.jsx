import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getFooterServiceLinks } from '../../config/siteContent';
import { getSiteProfile } from '../../config/siteProfile';
import { withLocale } from '../../utils/pathUtils';

export default function Footer() {
    const { isKr } = useLanguage();
    const locale = isKr ? 'ko' : 'en';
    const year = new Date().getFullYear();
    const serviceLinks = getFooterServiceLinks(isKr);
    const profile = getSiteProfile(isKr);

    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <div className="site-footer-brand">
                    <div className="hub-eyebrow">{isKr ? 'FOOTER LINKS' : 'FOOTER LINKS'}</div>
                    <h2>VERYGOOD CHOCOLATE</h2>
                    <p>
                        {isKr
                            ? '브랜드와 제품, 매장과 디지털 프로젝트를 한 흐름으로 잇는 베리굿의 홈페이지입니다.'
                            : 'The main hub connecting the brand, products, store, services, and digital layers.'}
                    </p>
                    <div className="site-footer-meta">
                        <span>{isKr ? '상호명' : 'Company'}: {profile.companyName}</span>
                        <span>{isKr ? '대표자' : 'Owner'}: {profile.owner}</span>
                        <span>{isKr ? '사업자등록번호' : 'Business License'}: {profile.businessLicense}</span>
                        <span>{isKr ? '통신판매업신고' : 'Mail-order License'}: {profile.mailOrderLicense}</span>
                    </div>
                </div>

                <div className="site-footer-links">
                    <div>
                        <h3>{isKr ? 'Explore' : 'Explore'}</h3>
                        <div className="site-footer-link-list">
                            <Link to={withLocale('/brand', locale)}>{isKr ? '브랜드' : 'Brand'}</Link>
                            <Link to={withLocale('/products', locale)}>{isKr ? '제품' : 'Products'}</Link>
                            <Link to={withLocale('/store', locale)}>{isKr ? '매장' : 'Store'}</Link>
                            <Link to={withLocale('/blog', locale)}>Blog</Link>
                            <Link to={withLocale('/contact', locale)}>{isKr ? '문의' : 'Contact'}</Link>
                        </div>
                    </div>

                    <div>
                        <h3>{isKr ? 'Services' : 'Services'}</h3>
                        <div className="site-footer-link-list">
                            {serviceLinks.map((item) => (
                                item.href ? (
                                    <a
                                        key={item.label}
                                        href={item.href || withLocale(item.fallbackTo, locale)}
                                        target={item.external ? '_blank' : undefined}
                                        rel={item.external ? 'noreferrer' : undefined}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link key={item.label} to={withLocale(item.fallbackTo, locale)}>
                                        {item.label}
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3>{isKr ? 'Legal' : 'Legal'}</h3>
                        <div className="site-footer-link-list">
                            <Link to={withLocale('/terms', locale)}>{isKr ? '이용약관' : 'Terms'}</Link>
                            <Link to={withLocale('/privacy', locale)}>{isKr ? '개인정보처리방침' : 'Privacy'}</Link>
                            <Link to={withLocale('/refund', locale)}>{isKr ? '반품/환불' : 'Refund'}</Link>
                            <Link to={withLocale('/shipping', locale)}>{isKr ? '배송정책' : 'Shipping'}</Link>
                        </div>
                    </div>
                </div>

                <div className="site-footer-bottom">
                    <div>{isKr ? '주소' : 'Address'}: {profile.addressFull}</div>
                    <div>Email: {profile.email}</div>
                    <div>Tel: {profile.phone}</div>
                    <div>© {year} {profile.companyName}</div>
                </div>
            </div>
        </footer>
    );
}
