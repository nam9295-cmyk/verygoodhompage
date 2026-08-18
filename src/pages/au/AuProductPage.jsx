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
  },
  ko: {
    home: '홈',
    back: '카탈로그로 돌아가기',
    availability: '안내',
    related: (category) => `더 많은 ${category}`,
  },
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
            <div className="au-product-detail__media">
              {product.media.hero && <img src={product.media.hero} alt={language === 'ko' ? product.media.altKo : product.media.altEn} />}
              {product.media.gallery.length > 0 && (
                <div className="au-product-detail__gallery">
                  {product.media.gallery.map((image) => <img key={image} src={image} alt="" />)}
                </div>
              )}
            </div>
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
              {copy.details && (
                <div className="au-product-detail__notes">
                  <h2>{copy.detailsLabel}</h2>
                  <p>{copy.details}</p>
                </div>
              )}
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
