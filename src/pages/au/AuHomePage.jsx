import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuBookingProductCard from '../../components/au/AuBookingProductCard.jsx'
import AuBookingProductQuickView from '../../components/au/AuBookingProductQuickView.jsx'
import { getAuSiteContent } from '../../config/auSiteContent.js'
import { categoryPath } from '../../utils/auPaths.js'

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>
}

function BookingLink({ className = '', href, children }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children} <ExternalArrow />
    </a>
  )
}

export default function AuHomePage({ locale }) {
  const content = getAuSiteContent(locale)
  const { ui } = content
  const [quickView, setQuickView] = useState(null)

  function openQuickView(product, event) {
    setQuickView({ product, opener: event.currentTarget })
  }

  function closeQuickView() {
    setQuickView(null)
  }

  return (
    <>
      <section className="au-announcement" aria-label={ui.announcementLabel}>
        <div className="au-announcement__track">
          {content.announcement.concat(content.announcement).map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="au-hero au-hero--image-led">
        <div className="au-hero__media" aria-hidden="true">
          <img src={content.hero.image} alt="" aria-hidden="true" />
        </div>
        <div className="au-hero__shade" aria-hidden="true" />
        <div className="au-hero__content au-shell">
          <div className="au-hero__copy">
            <p className="au-kicker">{content.hero.kicker}</p>
            <h1>{content.hero.heading}</h1>
            <p className="au-hero__body">{content.hero.body}</p>
            <div className="au-button-row">
              <BookingLink className="au-button" href={content.coreExperiences[0].href}>
                {content.hero.bookLabel}
              </BookingLink>
              <Link className="au-button au-button--outline" to={`${locale === 'ko' ? '/ko' : '/'}#world`}>
                {content.hero.exploreLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="au-core-experiences" aria-label={ui.experienceLabel}>
        <div className="au-shell au-core-experiences__grid">
          {content.coreExperiences.map((experience) => (
            <article key={experience.id} className={`au-experience au-experience--${experience.tone}`}>
              <p className="au-kicker">{experience.kicker}</p>
              <h2 className="au-experience__heading">{experience.heading}</h2>
              <p>{experience.body}</p>
              <div className="au-experience__products">
                {experience.products.map((product) => (
                  <AuBookingProductCard key={product.id} product={product} onQuickView={openQuickView} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="world" className="au-world">
        <div className="au-shell">
          <div className="au-section-heading">
            <p className="au-kicker">{ui.worldKicker}</p>
            <h2>{ui.worldHeading}</h2>
          </div>
          <div className="au-category-mosaic">
            {content.categories.map((category) => (
              <Link
                key={category.id}
                id={category.id}
                className={`au-category-card au-category-card--${category.id}`}
                to={categoryPath(category.id, locale)}
              >
                <span>{category.label}</span>
                <small>{category.description}</small>
                {category.visual === 'image' && <img src={category.image} alt={category.imageAlt} />}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="au-story">
        <div className="au-shell au-story__grid">
          <figure className="au-story__image">
            <img src={content.story.image} alt={content.story.imageAlt} />
          </figure>
          <div className="au-story__copy">
            <p className="au-kicker">{ui.storyKicker}</p>
            <h2>{content.story.heading}</h2>
            <div className="au-story__places">
              <article>
                <h3>{content.story.daegu.title}</h3>
                <p>{content.story.daegu.body}</p>
                <BookingLink className="au-text-link" href={content.story.daegu.href}>{content.story.daegu.label}</BookingLink>
              </article>
              <article>
                <h3>{content.story.sydney.title}</h3>
                <p>{content.story.sydney.body}</p>
                <div className="au-inline-links">
                  <BookingLink className="au-text-link" href={content.story.sydney.primaryHref}>{content.story.sydney.primaryLabel}</BookingLink>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="au-spotlight">
        <div className="au-shell au-spotlight__grid">
          <figure><img src={content.spotlight.image} alt={content.spotlight.imageAlt} /></figure>
          <div>
            <p className="au-kicker">{content.spotlight.kicker}</p>
            <h2>{content.spotlight.heading}</h2>
            <p>{content.spotlight.body}</p>
            <span className="au-availability">{content.spotlight.status}</span>
          </div>
        </div>
      </section>

      <section className="au-reviews">
        <div className="au-shell au-reviews__inner">
          <div>
            <p className="au-kicker">{ui.reviewsKicker}</p>
            <h2>{content.reviews.heading}</h2>
            <p>{content.reviews.body}</p>
          </div>
          <BookingLink className="au-button au-button--outline" href={content.reviews.href}>{content.reviews.label}</BookingLink>
        </div>
      </section>

      <section className="au-locations">
        <div className="au-shell">
          <div className="au-section-heading"><h2>{content.locations.heading}</h2></div>
          <div className="au-locations__grid">
            {content.locations.items.map((location) => (
              <article key={location.title}>
                <h3>{location.title}</h3>
                <p>{location.body}</p>
                <BookingLink className="au-text-link" href={location.href}>{location.label}</BookingLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <AuBookingProductQuickView
        product={quickView?.product}
        opener={quickView?.opener}
        onClose={closeQuickView}
        closeLabel={locale === 'ko' ? '제품 상세 닫기' : 'Close product details'}
      />
    </>
  )
}
