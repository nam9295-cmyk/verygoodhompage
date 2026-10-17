import { Link } from 'react-router-dom'
import AuBookingProductCard from '../../components/au/AuBookingProductCard.jsx'
import { getAuSiteContent } from '../../config/auSiteContent.js'
import { AU_LINKS } from '../../config/auLinks.js'

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

  return (
    <div className="au-home">
      <section className="au-announcement" aria-label={ui.announcementLabel}>
        <div className="au-announcement__track">
          {content.announcement.concat(content.announcement).map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="au-hero au-hero--mochi">
        <div className="au-hero__visual" aria-hidden="true">
          <picture className="au-hero__media">
            <source media="(max-width: 767px)" srcSet={content.hero.mobileImage} />
            <img src={content.hero.desktopImage} alt="" loading="eager" fetchPriority="high" />
          </picture>
          <div className="au-hero__shade" />
        </div>
        <div className="au-hero__content au-shell">
          <div className="au-hero__copy">
            <h1 className="au-mochi-title">
              <span className="au-mochi-title__intro">{content.hero.titlePrefix}</span>{' '}
              <span className="au-mochi-title__main">{content.hero.heading}</span>
            </h1>
            <div className="au-mochi-details">
              <p className="au-mochi-release">{content.hero.campaignLabel}</p>
              <p className="au-mochi-booking-note">{content.hero.bookingNote}</p>
              <p className="au-mochi-fineprint">{content.hero.finePrint}</p>
              <div className="au-button-row">
                <BookingLink className="au-button" href={content.hero.bookHref}>
                  {content.hero.bookLabel}
                </BookingLink>
                <Link className="au-button au-button--outline" to={locale === 'ko' ? '/ko#cakes' : '/#cakes'}>
                  {content.hero.exploreLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="au-locations" aria-labelledby="official-websites-heading">
        <div className="au-shell">
          <div className="au-section-heading">
            <h2 id="official-websites-heading">{content.locations.heading}</h2>
            <p>{content.locations.intro}</p>
          </div>
          <div className="au-locations__grid">
            {content.locations.items.map((location) => (
              <article key={location.title}>
                <h3>{location.title}</h3>
                <p>{location.body}</p>
                <div className="au-inline-links">
                  <BookingLink className="au-text-link" href={location.href}>{location.label}</BookingLink>
                  {location.secondaryHref && <BookingLink className="au-text-link" href={location.secondaryHref}>{location.secondaryLabel}</BookingLink>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="au-core-experiences" aria-label={ui.experienceLabel}>
        <div className="au-shell au-core-experiences__grid">
          {content.coreExperiences.map((experience) => (
            <article id={experience.id} key={experience.id} className={`au-experience au-experience--${experience.tone}`}>
              <p className="au-kicker">{experience.kicker}</p>
              <h2 className="au-experience__heading">{experience.heading}</h2>
              <p>{experience.body}</p>
              <div className="au-experience__products">
                {experience.products.map((product) => (
                  <AuBookingProductCard key={product.id} product={product} />
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
          <div className="au-home-collection-grid">
            {content.categories.map((category) => (
              <a key={category.id} className="au-home-collection-card" href={category.href} target="_blank" rel="noreferrer">
                <div className={`au-home-collection-card__image au-home-collection-card__image--${category.id}`}>
                  <img src={category.image} alt={category.imageAlt} loading="lazy" decoding="async" />
                </div>
                <div className="au-home-collection-card__copy">
                  <p className="au-home-collection-card__eyebrow">{category.eyebrow}</p>
                  <h3>{category.label}</h3>
                  <p>{category.description}</p>
                  <span className="au-home-collection-card__cta">
                    {category.cta} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
          <nav className="au-home-service-links" aria-label={locale === 'ko' ? '시드니 맞춤 서비스' : 'More Sydney services'}>
            <a href={AU_LINKS.booking.customCakes} target="_blank" rel="noreferrer">
              <span>CUSTOM CAKE</span>
              <strong>{locale === 'ko' ? '커스텀 케이크' : 'Custom Cake'}</strong>
              <ExternalArrow />
            </a>
            <a href={AU_LINKS.booking.business} target="_blank" rel="noreferrer">
              <span>BUSINESS</span>
              <strong>{locale === 'ko' ? '기업 · 카페 및 협업' : 'Business & Collaboration'}</strong>
              <ExternalArrow />
            </a>
          </nav>
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

    </div>
  )
}
