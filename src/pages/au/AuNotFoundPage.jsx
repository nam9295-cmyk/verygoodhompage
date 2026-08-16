import { Link } from 'react-router-dom'

export default function AuNotFoundPage() {
  return (
    <main className="au-not-found">
      <div className="au-shell">
        <p className="au-kicker">Verygood Australia</p>
        <h1>This page is not part of the AU site.</h1>
        <p>Start again from the Verygood Australia home page.</p>
        <Link className="au-button" to="/">Go to home</Link>
      </div>
    </main>
  )
}
