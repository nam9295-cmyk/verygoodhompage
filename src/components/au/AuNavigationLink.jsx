import { Link } from 'react-router-dom'
import { categoryPath, localePath } from '../../utils/auPaths.js'

export default function AuNavigationLink({ active = false, children, className, item, locale, onClick }) {
  const commonProps = {
    className,
    'aria-current': active ? 'page' : undefined,
    onClick,
  }

  if (item.href) {
    return (
      <a {...commonProps} href={item.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  if (item.sectionId) {
    return <a {...commonProps} href={`${localePath('/', locale)}#${item.sectionId}`}>{children}</a>
  }

  return <Link {...commonProps} to={categoryPath(item.id, locale)}>{children}</Link>
}
