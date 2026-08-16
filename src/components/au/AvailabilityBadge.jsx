const labels = {
  en: {
    preorder: 'Sydney pre-order',
    'available-daegu': 'Available in Daegu',
    'not-announced-sydney': 'Sydney release not announced',
    'coming-soon': 'Coming soon',
  },
  ko: {
    preorder: '시드니 사전 예약',
    'available-daegu': '대구에서 만날 수 있어요',
    'not-announced-sydney': '시드니 출시 일정 미정',
    'coming-soon': '곧 만나요',
  },
}

export default function AvailabilityBadge({ availability, locale = 'en' }) {
  const copy = labels[locale === 'ko' ? 'ko' : 'en']

  return <span className="au-availability">{copy[availability]}</span>
}
