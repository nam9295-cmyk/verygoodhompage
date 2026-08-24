import { Link, useParams } from 'react-router-dom'
import { AU_CATEGORY_CONTENT } from '../../data/auCatalog.js'
import { getPublicAuProduct, getRelatedPublicAuProducts } from '../../utils/auCatalog.js'
import { categoryPath, localePath, productPath } from '../../utils/auPaths.js'
import AvailabilityBadge from '../../components/au/AvailabilityBadge.jsx'
import AuProductCard from '../../components/au/AuProductCard.jsx'
import AuSeo from '../../components/au/AuSeo.jsx'

const labels = {
  en: {
    home: 'Home',
    back: 'Back to catalogue',
    availability: 'Availability',
    related: (category) => `More ${category} to explore`,
    sensoryProfile: 'Sensory Profile',
    features: 'Details',
    imageComingSoon: 'Image coming soon',
  },
  ko: {
    home: '홈',
    back: '카탈로그로 돌아가기',
    availability: '안내',
    related: (category) => `더 많은 ${category}`,
    sensoryProfile: '맛과 식감',
    features: '특징',
    imageComingSoon: '이미지 준비 중',
  },
}

function ProductMedia({ language, product, text }) {
  const alt = language === 'ko' ? product.media.altKo : product.media.altEn

  return (
    <div className="au-product-detail__media">
      {product.media.hero ? (
        <img src={product.media.hero} alt={alt} decoding="async" />
      ) : product.media.placeholder ? (
        <div className="au-product-detail__placeholder" role="img" aria-label={`${alt || product.copy[language].name}. ${text.imageComingSoon}`}>
          <span>{product.copy[language].name}</span>
          <small>{text.imageComingSoon}</small>
        </div>
      ) : null}
      {product.media.gallery.length > 0 && (
        <div className="au-product-detail__gallery">
          {product.media.gallery.map((image) => <img key={image} src={image} alt="" loading="lazy" decoding="async" />)}
        </div>
      )}
    </div>
  )
}

function ProductDetails({ detail, language, text }) {
  if (!detail) return null

  return (
    <>
      {detail.flavorProfile?.length > 0 && (
        <section className="au-product-detail__profile" aria-labelledby="taste-profile-heading">
          <h2 id="taste-profile-heading">{text.sensoryProfile}</h2>
          <dl>
            {detail.flavorProfile.map((item) => (
              <div key={item.label}>
                <dt>{language === 'ko' ? item.labelKo : item.label}</dt>
                <dd><span style={{ '--au-profile-value': `${item.value}%` }} aria-hidden="true" /><span className="au-visually-hidden">{item.value} / 100</span></dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      {detail.featureIcons?.length > 0 && (
        <section className="au-product-detail__features" aria-labelledby="product-features-heading">
          <h2 id="product-features-heading">{text.features}</h2>
          <ul>
            {detail.featureIcons.map((feature) => (
              <li key={feature.label}>
                <img src={feature.icon} alt="" loading="lazy" decoding="async" />
                <span>{language === 'ko' ? feature.labelKo : feature.label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

function DetailSections({ language, sections }) {
  if (!sections?.length) return null

  return (
    <div className="au-product-detail__sections">
      {sections.map((section) => (
        <section key={section.label} className="au-product-detail__notes">
          <h2>{language === 'ko' ? section.labelKo : section.label}</h2>
          <p>{language === 'ko' ? section.bodyKo : section.body}</p>
        </section>
      ))}
    </div>
  )
}

export default function AuProductPage({ category, locale = 'en' }) {
  const { slug } = useParams()
  const language = locale === 'ko' ? 'ko' : 'en'
  const text = labels[language]
  const product = getPublicAuProduct(category, slug)

  if (!product) {
    return (
      <section className="au-not-found">
        <div className="au-shell">
          <h1>{language === 'ko' ? '이 제품은 아직 AU 카탈로그에 없습니다.' : 'This product is not part of the AU catalogue.'}</h1>
          <Link className="au-button" to={localePath('/', language)}>{text.home}</Link>
        </div>
      </section>
    )
  }

  const copy = product.copy[language]
  const related = getRelatedPublicAuProducts(category, slug)
  const displayCategory = AU_CATEGORY_CONTENT[category]?.copy[language]?.title || category
  const detail = product.detail

  return (
    <>
      <AuSeo locale={language} path={productPath(category, slug, language)} title={`${copy.name} | Verygood Chocolate`} description={copy.shortDescription} />
      <section className="au-product-detail">
        <div className="au-shell">
          <nav className="au-breadcrumb" aria-label={language === 'ko' ? '이동 경로' : 'Breadcrumb'}>
            <Link to={localePath('/', language)}>{text.home}</Link>
            <span aria-hidden="true">/</span>
            <Link to={categoryPath(category, language)}>{displayCategory}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{copy.name}</span>
          </nav>
          <div className="au-product-detail__grid">
            <ProductMedia language={language} product={product} text={text} />
            <div className="au-product-detail__copy">
              <p className="au-kicker">{displayCategory}</p>
              <h1>{copy.name}</h1>
              {copy.shortDescription && <p className="au-product-detail__intro">{copy.shortDescription}</p>}
              {product.availability && (
                <div className="au-product-detail__availability">
                  <span>{text.availability}</span>
                  <AvailabilityBadge availability={product.availability} locale={language} />
                </div>
              )}
              {copy.story && <p>{copy.story}</p>}
              {copy.details && !product.detailSections?.length && (
                <div className="au-product-detail__notes">
                  <h2>{copy.detailsLabel}</h2>
                  <p>{copy.details}</p>
                </div>
              )}
              <ProductDetails detail={detail} language={language} text={text} />
              <DetailSections language={language} sections={product.detailSections} />
              <div className="au-button-row">
                <Link className="au-text-link" to={categoryPath(category, language)}>{text.back}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="au-related">
          <div className="au-shell">
            <h2>{text.related(displayCategory)}</h2>
            <div className="au-catalogue__grid">
              {related.map((item) => <AuProductCard key={item.id} product={item} locale={language} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
