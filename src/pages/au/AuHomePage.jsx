import { Link } from 'react-router-dom'
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

function SignatureLink({ item }) {
  const content = (
    <>
      {item.image ? <img src={item.image} alt={item.imageAlt} /> : <span className="au-signature-card__mark" aria-hidden="true">VG</span>}
      <span className="au-signature-card__copy">
        <strong>{item.name}</strong>
        <small>{item.availability}</small>
      </span>
    </>
  )

  return item.href.startsWith('http') ? (
    <BookingLink className="au-signature-card" href={item.href}>{content}</BookingLink>
  ) : (
    <Link className="au-signature-card" to={item.href}>{content}</Link>
  )
}

export default function AuHomePage({ locale }) {
  const content = getAuSiteContent(locale)
  const { ui } = content

  return (
    <>
      <section className="au-announcement" aria-label={ui.announcementLabel}>
        <div className="au-announcement__track">
          {content.announcement.concat(content.announcement).map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="au-hero">
        <div className="au-shell au-hero__grid">
          <div className="au-hero__copy">
            <p className="au-kicker">{content.hero.kicker}</p>
            <h1>{content.hero.heading}</h1>
            <p className="au-hero__body">{content.hero.body}</p>
            <div className="au-button-row">
              <Link className="au-button au-button--outline" to={`${locale === 'ko' ? '/ko' : '/'}#world`}>
                {content.hero.exploreLabel}
              </Link>
              <BookingLink className="au-button" href={content.coreExperiences[0].href}>
                {content.hero.bookLabel}
              </BookingLink>
            </div>
          </div>
          <figure className="au-hero__image">
            <img src={content.hero.image} alt={content.hero.imageAlt} />
          </figure>
        </div>
      </section>

      <section className="au-core-experiences" aria-label={ui.experienceLabel}>
        <div className="au-shell au-core-experiences__grid">
          {content.coreExperiences.map((experience) => (
            <article key={experience.id} className={`au-experience au-experience--${experience.tone}`}>
              <p className="au-kicker">{experience.kicker}</p>
              <h2>{experience.heading}</h2>
              <p>{experience.body}</p>
              <BookingLink className="au-text-link" href={experience.href}>{experience.label}</BookingLink>
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

      <section className="au-signature">
        <div className="au-shell">
          <div className="au-section-heading au-section-heading--split">
            <div>
              <p className="au-kicker">{content.signature.kicker}</p>
              <h2>{content.signature.heading}</h2>
            </div>
            <p>{ui.selectionNote}</p>
          </div>
          <div className="au-signature__grid">
            {content.signature.items.map((item) => <SignatureLink key={item.name} item={item} />)}
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
    </>
  )
}
