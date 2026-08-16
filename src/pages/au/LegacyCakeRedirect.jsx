import { useEffect } from 'react'
import { AU_LINKS } from '../../config/auLinks.js'

const copy = {
  en: {
    kicker: 'Sydney cakes',
    title: 'Taking you to cake bookings.',
    label: 'Book a Cake',
  },
  ko: {
    kicker: '시드니 케이크',
    title: '케이크 예약 사이트로 이동하고 있어요.',
    label: '케이크 예약',
  },
}

export default function LegacyCakeRedirect({ locale = 'en' }) {
  const language = locale === 'ko' ? 'ko' : 'en'
  const text = copy[language]

  useEffect(() => {
    window.location.replace(AU_LINKS.booking.cakes)
  }, [])

  return (
    <section className="au-not-found au-booking-redirect">
      <div>
        <p className="au-kicker">{text.kicker}</p>
        <h1>{text.title}</h1>
        <a className="au-button" href={AU_LINKS.booking.cakes}>{text.label}</a>
      </div>
    </section>
  )
}
