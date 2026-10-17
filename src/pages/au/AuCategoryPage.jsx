import { AU_CATEGORY_CONTENT } from '../../data/auCatalog.js'
import { getPublicAuProducts } from '../../utils/auCatalog.js'
import AuPageHero from '../../components/au/AuPageHero.jsx'
import AuProductCard from '../../components/au/AuProductCard.jsx'
import AuArchiveNotice from '../../components/au/AuArchiveNotice.jsx'

export default function AuCategoryPage({ category, locale = 'en' }) {
  const language = locale === 'ko' ? 'ko' : 'en'
  const categoryContent = AU_CATEGORY_CONTENT[category]

  if (!categoryContent) return null

  const copy = categoryContent.copy[language]
  const products = getPublicAuProducts(category)

  return (
    <>
      <AuArchiveNotice locale={language} />
      <AuPageHero kicker={copy.kicker} title={copy.title} intro={copy.intro} tone={categoryContent.tone} />
      <section className="au-catalogue" aria-label={copy.title}>
        <div className="au-shell">
          <div className={`au-catalogue__grid au-catalogue__grid--${category}`}>
            {products.map((product) => <AuProductCard key={product.id} product={product} locale={language} />)}
          </div>
        </div>
      </section>
    </>
  )
}
