import { Link } from 'react-router-dom'
import { productPath } from '../../utils/auPaths.js'
import AvailabilityBadge from './AvailabilityBadge.jsx'
import ExternalBookingLink from './ExternalBookingLink.jsx'

const labels = {
  en: { view: 'View details', book: 'View & Book' },
  ko: { view: '자세히 보기', book: '예약 보기' },
}

function ProductVisual({ product, locale }) {
  if (product.media.card) {
    return <img src={product.media.card} alt={locale === 'ko' ? product.media.altKo : product.media.altEn} />
  }

  if (product.media.placeholder) {
    return (
      <div className="au-product-card__placeholder" aria-hidden="true">
        <span>{product.copy[locale].name}</span>
        <small>{locale === 'ko' ? '이미지 준비 중' : 'Image coming soon'}</small>
      </div>
    )
  }

  return null
}

export default function AuProductCard({ product, locale = 'en' }) {
  const language = locale === 'ko' ? 'ko' : 'en'
  const copy = product.copy[language]
  const actionLabels = labels[language]
  const bookingProduct = product.action.mode === 'external-booking'
  const hasVisual = Boolean(product.media.card || product.media.placeholder)
  const hasDetail = Boolean(product.media.hero || copy.shortDescription || copy.story || copy.details)
  const detailPath = productPath(product.category, product.slug, language)
  const internalDetail = !bookingProduct && hasDetail

  return (
    <article className={`au-product-card${hasVisual ? '' : ' au-product-card--text-only'}`}>
      {hasVisual && (
        <div className="au-product-card__visual">
          {internalDetail ? (
            <Link to={detailPath} aria-label={`${copy.name}: ${actionLabels.view}`}><ProductVisual product={product} locale={language} /></Link>
          ) : <ProductVisual product={product} locale={language} />}
        </div>
      )}
      <div className="au-product-card__body">
        <h2>{internalDetail ? <Link to={detailPath}>{copy.name}</Link> : copy.name}</h2>
        {copy.shortDescription && <p>{copy.shortDescription}</p>}
        {product.availability && <AvailabilityBadge availability={product.availability} locale={language} />}
        {bookingProduct ? (
          <ExternalBookingLink className="au-text-link" href={product.action.href}>
            {actionLabels.book}
          </ExternalBookingLink>
        ) : internalDetail ? (
          <Link className="au-text-link" to={detailPath}>
            {actionLabels.view}
          </Link>
        ) : null}
      </div>
    </article>
  )
}
