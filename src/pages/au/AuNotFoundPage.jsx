import { Link } from 'react-router-dom'

export default function AuNotFoundPage() {
  return (
    <main className="au-not-found">
      <div className="au-shell">
        <p className="au-kicker">Verygood Chocolate</p>
        <h1>Page not found</h1>
        <p>Visit our brand home to find the official Korea and Sydney websites.</p>
        <Link className="au-button" to="/">Go to home</Link>
      </div>
    </main>
  )
}
