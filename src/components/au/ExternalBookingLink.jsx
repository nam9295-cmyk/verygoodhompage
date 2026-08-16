import { isAllowedAuExternalUrl } from '../../config/auLinks.js'

export default function ExternalBookingLink({ className = '', href, children }) {
  if (!isAllowedAuExternalUrl(href)) return null

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  )
}
