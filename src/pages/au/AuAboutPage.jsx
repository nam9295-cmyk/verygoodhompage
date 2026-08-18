import { AU_LINKS } from '../../config/auLinks.js'
import AuPageHero from '../../components/au/AuPageHero.jsx'
import ExternalBookingLink from '../../components/au/ExternalBookingLink.jsx'
import AuSeo from '../../components/au/AuSeo.jsx'

const content = {
  en: {
    kicker: 'Our story',
    title: 'Born in Daegu. Growing in Sydney.',
    intro: 'Verygood is a chocolatier-led brand shaped by chocolate, tea and playful everyday things.',
    beginningTitle: 'It began in Daegu.',
    beginning: 'Verygood began in Daegu with chocolate and tea, alongside its Korean store and making base. That beginning continues to shape the things we share.',
    sydneyTitle: 'Now growing in Sydney.',
    sydney: 'In Sydney, our public offering focuses on made-to-order cakes and bakes with pre-arranged Melrose Park pickup.',
    cakes: 'Explore Cakes',
    korea: 'Visit Korean website',
  },
  ko: {
    kicker: '베리굿 이야기',
    title: '대구에서 시작해, 시드니로.',
    intro: '베리굿은 초콜릿, 티와 일상의 작은 즐거움으로 이어지는 쇼콜라티에 기반 브랜드입니다.',
    beginningTitle: '대구에서 시작했습니다.',
    beginning: '베리굿은 초콜릿과 티로 시작해 한국 매장과 만드는 기반을 대구에 두고 있습니다. 그 시작은 지금 소개하는 모든 것에 이어집니다.',
    sydneyTitle: '시드니에서 자라고 있습니다.',
    sydney: '시드니에서는 주문 제작 케이크와 베이크를 사전 조율된 멜로즈 파크 픽업으로 준비합니다.',
    cakes: '케이크 보기',
    korea: '한국 사이트 방문',
  },
}

export default function AuAboutPage({ locale = 'en' }) {
  const language = locale === 'ko' ? 'ko' : 'en'
  const copy = content[language]

  return (
    <>
      <AuSeo locale={language} path="/about" title="About | Verygood Chocolate" description={copy.intro} />
      <AuPageHero kicker={copy.kicker} title={copy.title} intro={copy.intro} tone="forest" />
      <section className="au-about-story">
        <div className="au-shell au-about-story__grid">
          <figure>
            <img src="/assets/story/story-hogirl.png" alt={language === 'ko' ? '카카오 열매 곁에 앉은 호걸이와 까치.' : 'A tiger character and magpie beside a cacao pod.'} />
          </figure>
          <div className="au-about-story__copy">
            <article>
              <h2>{copy.beginningTitle}</h2>
              <p>{copy.beginning}</p>
            </article>
            <article>
              <h2>{copy.sydneyTitle}</h2>
              <p>{copy.sydney}</p>
            </article>
            <div className="au-button-row">
              <ExternalBookingLink className="au-button" href={AU_LINKS.booking.cakes}>{copy.cakes}</ExternalBookingLink>
              <ExternalBookingLink className="au-button au-button--outline" href={AU_LINKS.korea}>{copy.korea}</ExternalBookingLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
