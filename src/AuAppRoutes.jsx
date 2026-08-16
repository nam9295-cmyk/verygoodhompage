import { Route, Routes } from 'react-router-dom'
import AuLayout from './components/au/AuLayout.jsx'
import AuHomePage from './pages/au/AuHomePage.jsx'
import AuNotFoundPage from './pages/au/AuNotFoundPage.jsx'

export default function AuAppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuLayout locale="en" />}>
        <Route index element={<AuHomePage locale="en" />} />
      </Route>
      <Route path="/ko" element={<AuLayout locale="ko" />}>
        <Route index element={<AuHomePage locale="ko" />} />
      </Route>
      <Route path="*" element={<AuNotFoundPage />} />
    </Routes>
  )
}
