import { Link } from 'react-router-dom';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-left">
                    <div className="footer-brand">VERYGOOD CHOCOLATE</div>
                    <div className="footer-small">© {year} Verygood. All rights reserved.</div>
                </div>
                <div className="footer-right">
                    <Link to="/privacy" style={{ fontSize: '13px', opacity: 0.7, textDecoration: 'none' }}>
                        Privacy Policy
                    </Link>
                    <Link to="/terms" style={{ fontSize: '13px', opacity: 0.7, textDecoration: 'none' }}>
                        Terms of Service
                    </Link>
                    <a className="footer-link" href="#top">Back to top ↑</a>
                </div>
            </div>
        </footer>
    );
}
