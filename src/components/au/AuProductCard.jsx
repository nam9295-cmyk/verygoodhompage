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

  return null
}

export default function AuProductCard({ product, locale = 'en' }) {
  const language = locale === 'ko' ? 'ko' : 'en'
  const copy = product.copy[language]
  const actionLabels = labels[language]
  const bookingProduct = product.action.mode === 'external-booking'
  const visual = <ProductVisual product={product} locale={language} />
  const hasDetail = Boolean(product.media.hero || copy.shortDescription || copy.story || copy.details)

  return (
    <article className={`au-product-card${visual ? '' : ' au-product-card--text-only'}`}>
      {visual && <div className="au-product-card__visual">{visual}</div>}
      <div className="au-product-card__body">
        <h2>{copy.name}</h2>
        {copy.shortDescription && <p>{copy.shortDescription}</p>}
        {product.availability && <AvailabilityBadge availability={product.availability} locale={language} />}
        {bookingProduct ? (
          <ExternalBookingLink className="au-text-link" href={product.action.href}>
            {actionLabels.book}
          </ExternalBookingLink>
        ) : hasDetail ? (
          <Link className="au-text-link" to={productPath(product.category, product.slug, language)}>
            {actionLabels.view}
          </Link>
        ) : null}
      </div>
    </article>
  )
}
