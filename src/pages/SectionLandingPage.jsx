import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getSectionPageContent } from '../config/siteContent';
import { withLocale } from '../utils/pathUtils';
import { products } from '../data/products';
import { getSectionAsset, getSectionAssetCollection } from '../config/sectionAssets';
import SectionVisual from '../components/common/SectionVisual';

function getSectionCardIcon(label) {
    const cleanLabel = (label || '').toLowerCase();
    
    // Address / Location
    if (cleanLabel.includes('address') || cleanLabel.includes('location') || cleanLabel.includes('주소') || cleanLabel.includes('위치')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
            </svg>
        );
    }
    
    // Hours / Time
    if (cleanLabel.includes('hours') || cleanLabel.includes('time') || cleanLabel.includes('운영시간') || cleanLabel.includes('시간')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
            </svg>
        );
    }
    
    // Pickup
    if (cleanLabel.includes('pickup') || cleanLabel.includes('픽업') || cleanLabel.includes('동선')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                <polyline points="3.29 7 12 12 20.71 7"/>
                <line x1="12" y1="22" x2="12" y2="12"/>
            </svg>
        );
    }
    
    // Best For / Scope
    if (cleanLabel.includes('best') || cleanLabel.includes('scope') || cleanLabel.includes('추천') || cleanLabel.includes('대외')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
        );
    }
    
    // Philosophy
    if (cleanLabel.includes('philosophy') || cleanLabel.includes('철학')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
        );
    }
    
    // Craft
    if (cleanLabel.includes('craft') || cleanLabel.includes('제작') || cleanLabel.includes('손맛')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M12 6v12M6 12h12"/>
            </svg>
        );
    }
    
    // App / Smartphone / Digital
    if (cleanLabel.includes('app') || cleanLabel.includes('digital') || cleanLabel.includes('디지털') || cleanLabel.includes('모바일')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
        );
    }
    
    // Future / Next / Beta
    if (cleanLabel.includes('future') || cleanLabel.includes('next') || cleanLabel.includes('실험') || cleanLabel.includes('미래')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.886L5 8.912l5.886 1.912L12 21l1.912-5.886L20 13.088l-5.886-1.912L12 3Z"/>
            </svg>
        );
    }
    
    // Default fallback icon
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    );
}

function getSectionPresentation(section, isKr) {
    const copy = {
        brand: {
            introEyebrow: 'BRAND',
            introTitle: isKr ? '베리굿의 문장과 결을 먼저 만나는 페이지입니다.' : 'A page for reading the brand voice before the product grid.',
            introBody: isKr ? '철학과 톤, 스토리를 먼저 보여주고 제품과 매장 경험은 그 다음에 이어집니다.' : 'It leads with philosophy, tone, and story before guiding visitors into products and store life.',
            detailHeading: isKr ? '브랜드를 이해하는 몇 가지 단서' : 'A few notes that frame the brand',
            galleryHeading: isKr ? '브랜드를 이루는 장면들' : 'Scenes that hold the brand together',
            productHeading: isKr ? '브랜드 문맥과 가까운 제품' : 'Products close to the brand narrative',
            faqHeading: isKr ? '브랜드 페이지에서 자주 생기는 질문' : 'Questions that often come up on the brand page',
        },
        store: {
            introEyebrow: 'VISIT',
            introTitle: isKr ? '방문 전에 필요한 정보와 분위기를 먼저 정리했습니다.' : 'This page gathers the essentials before a visit.',
            introBody: isKr ? '주소와 운영시간, 지도와 후기, 예약 흐름을 매장 맥락 안에서 읽을 수 있게 했습니다.' : 'Address, hours, map, reviews, and reservation cues are all placed inside the visit context.',
            detailHeading: isKr ? '방문 전에 알아두면 좋은 정보' : 'Useful details before a visit',
            galleryHeading: isKr ? '매장의 분위기와 디테일' : 'Store atmosphere and details',
            productHeading: isKr ? '매장 흐름과 잘 이어지는 제품' : 'Products that fit the store flow',
            faqHeading: isKr ? '방문 전에 자주 묻는 질문' : 'Questions before you visit',
        },
        services: {
            introEyebrow: 'SERVICES',
            introTitle: isKr ? '행동은 짧게, 서비스는 분명하게 정리했습니다.' : 'Short actions, clear service paths.',
            introBody: isKr ? '예약과 리뷰는 실제 운영 페이지로 연결하고, 이곳에서는 가장 필요한 길만 간결하게 보여줍니다.' : 'Reservation and reviews still live on their own pages, while the hub focuses on making the entry feel simple.',
            detailHeading: isKr ? '서비스를 이용하기 전에' : 'Before using this service layer',
            galleryHeading: isKr ? '서비스가 연결되는 방식' : 'How the service layer connects',
            productHeading: isKr ? '서비스와 함께 많이 보는 제품' : 'Products often viewed with this service layer',
            faqHeading: isKr ? '주문과 예약 전에 자주 묻는 질문' : 'Questions before ordering or reserving',
        },
        digital: {
            introEyebrow: 'DIGITAL',
            introTitle: isKr ? '디지털 작업은 차분한 톤으로 소개합니다.' : 'Digital work is shown quietly, with context first.',
            introBody: isKr ? '웰니스 앱과 운영 도구는 과하게 앞세우지 않고, 브랜드의 확장처럼 자연스럽게 소개합니다.' : 'The wellness app and admin tools are introduced as an extension of the brand, not as loud standalone products.',
            detailHeading: isKr ? '지금 알아두면 좋은 점' : 'What to know right now',
            galleryHeading: isKr ? '앱과 도구의 실제 화면' : 'Real views of the app and tools',
            productHeading: isKr ? '디지털 레이어와 함께 읽히는 제품' : 'Products that sit well beside the digital layer',
            faqHeading: isKr ? '디지털 레이어에 대한 질문' : 'Questions about the digital layer',
        },
        contact: {
            introEyebrow: 'CONTACT',
            introTitle: isKr ? '연락처와 방문 기본 정보를 가볍게 정리한 페이지입니다.' : 'A light page for contact details and visit basics.',
            introBody: isKr ? '이메일과 전화, 주소와 인스타그램을 한 번에 보고 필요한 곳으로 바로 이어질 수 있게 했습니다.' : 'Email, phone, address, and Instagram are placed in one calm view so the next step stays obvious.',
            detailHeading: isKr ? '연락 전 알아두면 좋은 정보' : 'A few details before you reach out',
            galleryHeading: isKr ? '브랜드와 연결되는 장면' : 'Scenes connected to the brand',
            productHeading: isKr ? '함께 둘러보기 좋은 제품' : 'Products worth browsing next',
            faqHeading: isKr ? '문의 전에 자주 묻는 질문' : 'Questions before you contact us',
        },
    };

    return copy[section];
}

function SectionAction({ item, locale }) {
    if (item.href) {
        const href = item.href || withLocale(item.fallbackTo, locale);
        const isExternal = item.external || href.startsWith('http');

        return (
            <a className="hub-link-chip" href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>
                {item.label}
            </a>
        );
    }

    return (
        <Link className="hub-link-chip" to={withLocale(item.to, locale)}>
            {item.label}
        </Link>
    );
}

export default function SectionLandingPage({ section }) {
    const { isKr } = useLanguage();
    const locale = isKr ? 'ko' : 'en';
    const content = getSectionPageContent(isKr)[section];
    const presentation = getSectionPresentation(section, isKr);
    const heroAsset = getSectionAsset(section, 'hero');
    const galleryAssets = getSectionAssetCollection(section, 'gallery');
    const storyAssets = getSectionAssetCollection(section, 'story');
    const featuredProducts = (content.featuredProductIds || [])
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean);

    return (
        <>
            <Helmet>
                <title>{content.title} | Very Good</title>
                <meta name="description" content={content.description} />
            </Helmet>

            <main className="section-landing">
                <section className="section-landing-hero section-landing-hero-grid">
                    <div className="section-landing-copy">
                        <div className="hub-eyebrow">{content.eyebrow}</div>
                        <h1>{content.title}</h1>
                        <p>{content.description}</p>
                        <div className="hub-link-list" style={{ marginTop: '24px' }}>
                            {content.links.map((item) => (
                                <SectionAction key={item.label} item={item} locale={locale} />
                            ))}
                        </div>
                    </div>
                    <div className="section-landing-visual">
                        <SectionVisual asset={heroAsset} alt={content.imageAlt} />
                    </div>
                </section>

                <section className="section-facts-grid">
                    {content.facts.map((fact) => (
                        <article key={fact.label} className="section-fact-card">
                            <span>{fact.label}</span>
                            <strong>{fact.value}</strong>
                        </article>
                    ))}
                </section>

                <section className="section-editorial-intro">
                    <div>
                        <div className="hub-eyebrow">{presentation.introEyebrow}</div>
                        <h2>{presentation.introTitle}</h2>
                    </div>
                    <div className="section-editorial-copy">
                        <p>{presentation.introBody}</p>
                        <ul className="section-editorial-highlights">
                            {content.highlights.map((item) => (
                                <li key={item} className="section-editorial-highlight-item">
                                    <svg className="section-editorial-highlight-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="hub-link-list">
                            {content.links.map((item) => (
                                <SectionAction key={item.label} item={item} locale={locale} />
                            ))}
                        </div>
                    </div>
                </section>

                {content.storySections?.length > 0 && (
                    <section className="section-story-stack">
                        <div className="section-shelf-head">
                            <div className="hub-eyebrow">{isKr ? 'DIGITAL STORY' : 'DIGITAL STORY'}</div>
                            <h2>{isKr ? '앱과 어드민의 흐름을 한눈에 살펴보세요.' : 'A closer look at the app and admin flow.'}</h2>
                        </div>
                        <div className="hub-editorial-stack">
                            {content.storySections.map((story, index) => (
                                <article
                                    key={story.title}
                                    className={`hub-editorial-row ${index % 2 === 1 ? 'is-reversed' : ''}`}
                                >
                                    <div className="hub-editorial-visual">
                                        <SectionVisual asset={storyAssets[index]} alt={story.title} />
                                    </div>
                                    <div className="hub-editorial-copy">
                                        <div className="hub-eyebrow">{story.eyebrow}</div>
                                        <h3>{story.title}</h3>
                                        <p>{story.body}</p>
                                        {story.bullets?.length > 0 && (
                                            <ul className="hub-list">
                                                {story.bullets.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {content.modules?.length > 0 && (
                    <section className="section-module-grid">
                        {content.modules.map((module) => (
                            <article key={module.title} className="section-feature-card">
                                <div className="hub-eyebrow">{module.title}</div>
                                <p>{module.body}</p>
                            </article>
                        ))}
                    </section>
                )}

                {content.featureCards?.length > 0 && (
                    <section className="section-feature-grid">
                        {content.featureCards.map((card) => (
                            <article key={card.title} className="section-feature-card">
                                <div className="hub-eyebrow">{card.eyebrow}</div>
                                <h3>{card.title}</h3>
                                <p>{card.body}</p>
                            </article>
                        ))}
                    </section>
                )}

                {content.detailCards?.length > 0 && (
                    <section className="section-detail-stack">
                        <div className="section-shelf-head">
                            <div className="hub-eyebrow">{isKr ? 'AT A GLANCE' : 'AT A GLANCE'}</div>
                            <h2>{presentation.detailHeading}</h2>
                        </div>
                        <div className="section-detail-grid">
                            {content.detailCards.map((card) => (
                                <article key={card.title} className="section-detail-card">
                                    <div className="section-card-icon-container" aria-hidden="true">
                                        {getSectionCardIcon(card.label)}
                                    </div>
                                    <div className="hub-eyebrow">{card.label}</div>
                                    <h3>{card.title}</h3>
                                    <p>{card.body}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {content.galleryCards?.length > 0 && (
                    <section className="section-gallery-block">
                        <div className="section-shelf-head">
                            <div className="hub-eyebrow">{isKr ? 'GALLERY' : 'GALLERY'}</div>
                            <h2>{presentation.galleryHeading}</h2>
                        </div>
                        <div className="section-gallery-grid">
                            {content.galleryCards.map((card, index) => (
                                <article key={card.title} className="section-gallery-card">
                                    <div className="section-gallery-visual">
                                        <SectionVisual asset={galleryAssets[index]} alt={card.title} />
                                    </div>
                                    <div className="section-gallery-copy">
                                        <h3>{card.title}</h3>
                                        <p>{card.body}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {featuredProducts.length > 0 && (
                    <section className="section-product-shelf">
                        <div className="section-shelf-head">
                            <div className="hub-eyebrow">{isKr ? 'SELECTED PRODUCTS' : 'SELECTED PRODUCTS'}</div>
                            <h2>{presentation.productHeading}</h2>
                        </div>
                        <div className="section-product-grid">
                            {featuredProducts.map((product) => (
                                <Link key={product.id} className="section-product-card" to={withLocale(`/product/${product.id}`, locale)}>
                                    <div className="section-product-image">
                                        <img src={product.mainImage} alt={isKr ? product.name_ko : product.name} />
                                    </div>
                                    <div className="section-product-copy">
                                        <div className="section-product-tags">{product.tags?.slice(0, 2).join(' · ')}</div>
                                        <h3>{isKr ? product.name_ko : product.name}</h3>
                                        <p>{isKr ? product.description_ko : product.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {content.faqItems?.length > 0 && (
                    <section className="section-faq-block">
                        <div className="section-shelf-head">
                            <div className="hub-eyebrow">FAQ</div>
                            <h2>{presentation.faqHeading}</h2>
                        </div>
                        <div className="section-faq-grid">
                            {content.faqItems.map((item) => (
                                <article key={item.q} className="section-faq-card">
                                    <h3>{item.q}</h3>
                                    <p>{item.a}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

            </main>
        </>
    );
}
