import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import AuBookingProductImage from './AuBookingProductImage.jsx'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function AuBookingProductQuickView({ product, opener, onClose, closeLabel }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!product) return undefined

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    const focusClose = window.requestAnimationFrame(() => closeRef.current?.focus())

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = Array.from(dialogRef.current.querySelectorAll(focusableSelector))
      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements.at(-1)

      if (!firstFocusable || !lastFocusable) {
        event.preventDefault()
        return
      }

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable.focus()
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusClose)
      document.removeEventListener('keydown', handleKeyDown)
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
      opener?.focus()
    }
  }, [onClose, opener, product])

  if (!product || typeof document === 'undefined') return null

  const quickView = product.quickView

  return createPortal(
    <div
      className="au-product-quick-view__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={dialogRef}
        className="au-product-quick-view"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button ref={closeRef} className="au-product-quick-view__close" type="button" onClick={onClose} aria-label={closeLabel}>
          <span className="au-product-quick-view__close-icon" aria-hidden="true">×</span>
        </button>
        <div className="au-product-quick-view__media">
          <AuBookingProductImage
            key={product.id}
            image={quickView.image}
            name={product.name}
            placeholderClassName="au-product-quick-view__placeholder"
          />
        </div>
        <div className="au-product-quick-view__copy">
          <p className="au-product-quick-view__eyebrow">Verygood Chocolate</p>
          <h2 id={titleId}>{product.name}</h2>
          <p id={descriptionId} className="au-product-quick-view__description">{quickView.description}</p>
          {product.options.length > 0 && (
            <ul className="au-product-quick-view__options">
              {product.options.map((option) => <li key={option}>{option}</li>)}
            </ul>
          )}
          <a className="au-product-quick-view__cta" href={product.href}>{product.ctaLabel}</a>
        </div>
      </section>
    </div>,
    document.body,
  )
}
