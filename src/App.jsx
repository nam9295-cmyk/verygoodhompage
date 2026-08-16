import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AuAppRoutes from './AuAppRoutes.jsx'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuAppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App;
