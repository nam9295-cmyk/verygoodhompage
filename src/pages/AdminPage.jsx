import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const styles = {
    page: {
        maxWidth: '1200px',
        margin: '120px auto 80px',
        padding: '0 24px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    title: {
        fontFamily: 'var(--menu-font)',
        fontSize: '32px',
        marginBottom: '16px',
    },
    loginContainer: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '40px',
        background: '#fff',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid var(--line)',
        borderRadius: '8px',
        fontSize: '16px',
        marginBottom: '16px',
    },
    button: {
        width: '100%',
        padding: '14px',
        background: 'var(--ink)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 700,
        cursor: 'pointer',
    },
    error: {
        color: '#e74c3c',
        fontSize: '14px',
        marginBottom: '16px',
        textAlign: 'center',
    },
    adminContent: {
        background: '#fff',
        borderRadius: 'var(--radius)',
        padding: '24px',
        boxShadow: 'var(--shadow)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        textAlign: 'left',
        padding: '12px',
        borderBottom: '2px solid var(--line)',
        fontWeight: 700,
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid var(--line)',
    },
};

// Simple password protection (not secure for production)
const ADMIN_PASSWORD = 'verygood2026';

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password');
        }
    };

    if (!authenticated) {
        return (
            <>
                <Helmet>
                    <title>Admin - Very Good Chocolate</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>

                <main style={styles.page}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>Admin Access</h1>
                    </div>

                    <div style={styles.loginContainer}>
                        <form onSubmit={handleSubmit}>
                            {error && <p style={styles.error}>{error}</p>}
                            <input
                                type="password"
                                style={styles.input}
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" style={styles.button}>Login</button>
                        </form>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Admin Dashboard - Very Good Chocolate</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <main style={styles.page}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Admin Dashboard</h1>
                    <button
                        onClick={() => setAuthenticated(false)}
                        style={{ ...styles.button, maxWidth: '120px', margin: '0 auto' }}
                    >
                        Logout
                    </button>
                </div>

                <div style={styles.adminContent}>
                    <h2 style={{ marginBottom: '20px' }}>Recent Activity</h2>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Date</th>
                                <th style={styles.th}>Type</th>
                                <th style={styles.th}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styles.td}>2026-01-18</td>
                                <td style={styles.td}>Page View</td>
                                <td style={styles.td}>Homepage - 150 views</td>
                            </tr>
                            <tr>
                                <td style={styles.td}>2026-01-17</td>
                                <td style={styles.td}>Contact Form</td>
                                <td style={styles.td}>New inquiry from customer</td>
                            </tr>
                            <tr>
                                <td style={styles.td}>2026-01-16</td>
                                <td style={styles.td}>Blog Post</td>
                                <td style={styles.td}>New Year article published</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{ marginTop: '40px' }}>
                        <h2 style={{ marginBottom: '20px' }}>Quick Actions</h2>
                        <p style={{ opacity: 0.7 }}>
                            Firebase integration for full admin functionality will be available in future updates.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
