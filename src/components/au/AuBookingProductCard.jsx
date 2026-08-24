import AuBookingProductImage from './AuBookingProductImage.jsx'

export default function AuBookingProductCard({ product }) {
  return (
    <article className="au-booking-product-card">
      <a className="au-booking-product-card__trigger" href={product.href}>
        <div className="au-booking-product-card__media">
          <AuBookingProductImage
            image={product.image}
            name={product.name}
            placeholderClassName="au-booking-product-card__placeholder"
          />
        </div>
        <div className="au-booking-product-card__copy">
          <h3>{product.name}</h3>
          {product.description && <p>{product.description}</p>}
        </div>
      </a>
      <a className="au-booking-product-card__cta" href={product.href}>{product.ctaLabel}</a>
    </article>
  )
}
