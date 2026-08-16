export default function AuPageHero({ kicker, title, intro, tone = 'canvas' }) {
  return (
    <section className={`au-page-hero au-page-hero--${tone}`}>
      <div className="au-shell au-page-hero__inner">
        <p className="au-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  )
}
