import AuBookingProductImage from './AuBookingProductImage.jsx'

export default function AuBookingProductCard({ product, onQuickView }) {
  function handleQuickView(event) {
    onQuickView?.(product, event)
  }

  return (
    <article className="au-booking-product-card">
      <button className="au-booking-product-card__trigger" type="button" aria-haspopup="dialog" onClick={handleQuickView}>
        <div className="au-booking-product-card__media">
          <AuBookingProductImage
            image={product.image}
            name={product.name}
            placeholderClassName="au-booking-product-card__placeholder"
          />
        </div>
        <div className="au-booking-product-card__copy">
          <h3>{product.name}</h3>
          {product.options.length > 0 && (
            <ul>
              {product.options.map((option) => <li key={option}>{option}</li>)}
            </ul>
          )}
        </div>
      </button>
      <a className="au-booking-product-card__cta" href={product.href}>{product.ctaLabel}</a>
    </article>
  )
}
