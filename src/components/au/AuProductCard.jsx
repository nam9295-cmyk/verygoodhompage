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

  return <div className="au-product-card__mark" aria-hidden="true">VG</div>
}

export default function AuProductCard({ product, locale = 'en' }) {
  const language = locale === 'ko' ? 'ko' : 'en'
  const copy = product.copy[language]
  const actionLabels = labels[language]
  const bookingProduct = product.action.mode === 'external-booking'

  return (
    <article className="au-product-card">
      <div className="au-product-card__visual">
        <ProductVisual product={product} locale={language} />
      </div>
      <div className="au-product-card__body">
        <h2>{copy.name}</h2>
        <p>{copy.shortDescription}</p>
        <AvailabilityBadge availability={product.availability} locale={language} />
        {bookingProduct ? (
          <ExternalBookingLink className="au-text-link" href={product.action.href}>
            {actionLabels.book}
          </ExternalBookingLink>
        ) : (
          <Link className="au-text-link" to={productPath(product.category, product.slug, language)}>
            {actionLabels.view}
          </Link>
        )}
      </div>
    </article>
  )
}
