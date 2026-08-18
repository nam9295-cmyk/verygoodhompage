import { useEffect, useState } from 'react'

function initialImageSource(image) {
  return image.deferLoad ? null : (image.src || null)
}

export default function AuBookingProductImage({ image, name, className = '', placeholderClassName = '' }) {
  const [source, setSource] = useState(() => initialImageSource(image))

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

  function handleImageError() {
    if (image.fallbackSrc && source !== image.fallbackSrc) {
      setSource(image.fallbackSrc)
      return
    }

    setSource(null)
  }

  if (source) {
    return <img className={className} src={source} alt={image.alt || name} onError={handleImageError} />
  }

  return (
    <div className={placeholderClassName} aria-hidden="true">
      <span>{name}</span>
      <small>{image.placeholderLabel}</small>
    </div>
  )
}
