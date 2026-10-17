import { AU_LINKS } from '../../config/auLinks.js'

export default function AuArchiveNotice({ locale }) {
  const korean = locale === 'ko'
  return (
    <aside className="au-archive-notice au-shell" aria-label={korean ? '브랜드 아카이브 안내' : 'Brand archive information'}>
      <p><strong>{korean ? '브랜드 아카이브' : 'Brand archive'}</strong> — {korean ? '베리굿의 이전 컬렉션을 소개합니다. 현재 메뉴와 판매 여부는 각 지역 공식 사이트에서 확인해 주세요.' : 'Explore earlier Verygood collections. Visit each local website for current menus and availability.'}</p>
      <div className="au-inline-links">
        <a className="au-text-link" href={AU_LINKS.booking.home}>{korean ? '시드니 공식 온라인 주문' : 'Official Sydney shop'}</a>
        <a className="au-text-link" href={AU_LINKS.korea}>{korean ? '한국 공식 사이트' : 'Official Korea website'}</a>
      </div>
    </aside>
  )
}
