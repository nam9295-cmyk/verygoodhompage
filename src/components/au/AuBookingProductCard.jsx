import { useEffect, useState } from 'react'

function useBookingProductImage(image) {
  const [source, setSource] = useState(image.deferLoad ? null : image.src)

  useEffect(() => {
    if (!image.deferLoad) return undefined

    let active = true
    const candidates = [image.src, image.fallbackSrc].filter(Boolean)

    function loadCandidate(index) {
      const candidate = candidates[index]
      if (!candidate) {
        if (active) setSource(null)
        return
      }

      const preload = new Image()
      preload.onload = () => {
        if (active) setSource(candidate)
      }
      preload.onerror = () => loadCandidate(index + 1)
      preload.src = candidate
    }

    loadCandidate(0)

    return () => {
      active = false
    }
  }, [image.deferLoad, image.fallbackSrc, image.src])

  return [source, setSource]
}

export default function AuBookingProductCard({ product }) {
  const [imageSource, setImageSource] = useBookingProductImage(product.image)

  function handleImageError() {
    if (product.image.fallbackSrc && imageSource !== product.image.fallbackSrc) {
      setImageSource(product.image.fallbackSrc)
      return
    }

    setImageSource(null)
  }

  return (
    <a className="au-booking-product-card" href={product.href}>
      <div className="au-booking-product-card__media">
        {imageSource ? (
          <img src={imageSource} alt={product.image.alt} onError={handleImageError} />
        ) : (
          <div className="au-booking-product-card__placeholder" aria-hidden="true">
            <span>{product.name}</span>
            <small>{product.image.placeholderLabel}</small>
          </div>
        )}
      </div>
      <div className="au-booking-product-card__copy">
        <h3>{product.name}</h3>
        {product.options.length > 0 && (
          <ul>
            {product.options.map((option) => <li key={option}>{option}</li>)}
          </ul>
        )}
        <span className="au-booking-product-card__cta">{product.ctaLabel}</span>
      </div>
    </a>
  )
}
