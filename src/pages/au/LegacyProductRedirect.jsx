import { Navigate, useParams } from 'react-router-dom'
import AuNotFoundPage from './AuNotFoundPage.jsx'
import { productPath } from '../../utils/auPaths.js'

const legacyProducts = {
  'almond-chocoball': ['chocolate', 'almond-chocoball'],
  'strawberry-bonbon': ['chocolate', 'strawberry-bonbon'],
  'ruby-berry-chocoball': ['chocolate', 'ruby-berry-chocoball'],
  'matcha-berry': ['chocolate', 'matcha-berry'],
  'british-black': ['tea', 'british-black'],
  'asian-gold': ['tea', 'asian-gold'],
  'hibiscus-fruit': ['tea', 'hibiscus-fruit'],
  'minty-chocolat': ['tea', 'minty-chocolat'],
  'hogirl-key-ring': ['goods', 'hogeori-keyring'],
}

export default function LegacyProductRedirect({ locale = 'en' }) {
  const { slug } = useParams()
  const target = legacyProducts[slug]

  if (!target) return <AuNotFoundPage />

  return <Navigate replace to={productPath(target[0], target[1], locale)} />
}
