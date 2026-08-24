import { Navigate, useParams } from 'react-router-dom'
import { AU_LEGACY_PRODUCT_TARGETS } from '../../data/auCatalog.js'
import AuNotFoundPage from './AuNotFoundPage.jsx'
import { productPath } from '../../utils/auPaths.js'

export default function LegacyProductRedirect({ locale = 'en' }) {
  const { slug } = useParams()
  const target = AU_LEGACY_PRODUCT_TARGETS[slug]

  if (!target) return <AuNotFoundPage />

  return <Navigate replace to={productPath(target[0], target[1], locale)} />
}
