import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { blogs as staticBlogs } from '../data/blogs';
import { db } from '../services/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const styles = {
    blogPage: {
        maxWidth: '1200px',
        margin: '140px auto 100px',
        padding: '0 24px',
    },
    blogHeader: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    blogTitle: {
        fontFamily: 'var(--menu-font)',
        fontSize: '36px',
        marginBottom: '12px',
    },
    blogSub: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '16px',
    },
    blogGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '40px',
    },
    blogCard: {
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
    },
    blogThumb: {
        width: '100%',
        height: '240px',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        background: '#eee',
        marginBottom: '20px',
    },
    blogThumbImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.4s',
    },
    blogMeta: {
        fontSize: '12px',
        color: '#999',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    blogCardTitle: {
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '10px',
        lineHeight: 1.4,
    },
    blogSummary: {
        fontSize: '15px',
        color: '#555',
        lineHeight: 1.6,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
};

export default function BlogPage() {
    const { isKr, lang } = useLanguage();
    const [allBlogs, setAllBlogs] = useState(staticBlogs);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);

                const firebasePosts = [];
                querySnapshot.forEach((doc) => {
                    firebasePosts.push({ id: doc.id, ...doc.data() });
                });

                // Merge: Firestore posts first (newest), then static posts
                if (firebasePosts.length > 0) {
                    setAllBlogs([...firebasePosts, ...staticBlogs]);
                }
            } catch (e) {
                console.warn("Firestore fetch error, showing static only.", e);
            }
        }

        fetchPosts();
    }, []);

    return (
        <>
            <Helmet>
                <title>Journal & News - Very Good Chocolate Blog</title>
                <meta name="description" content="Read the latest stories, news, and updates from Very Good Chocolate. Discover chocolate recipes, behind-the-scenes, and more." />
                <link rel="canonical" href="https://verygood-chocolate.com/blog" />
            </Helmet>

            <main style={styles.blogPage}>
                <div style={styles.blogHeader}>
                    <h1 style={styles.blogTitle}>{isKr ? '저널 & 뉴스' : 'Journal & News'}</h1>
                    <p style={styles.blogSub}>{isKr ? '베리굿초콜릿의 이야기들.' : 'Stories from Verygood Chocolate.'}</p>
                </div>

                <div style={styles.blogGrid}>
                    {allBlogs.map(post => (
                        <Link key={post.id} to={`/blog/${post.id}`} style={styles.blogCard}>
                            <div style={styles.blogThumb}>
                                <img
                                    style={styles.blogThumbImg}
                                    src={post.thumbnail}
                                    alt={isKr && post.title_ko ? post.title_ko : post.title}
                                    loading="lazy"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                                />
                            </div>
                            <div style={styles.blogMeta}>{post.date}</div>
                            <div style={styles.blogCardTitle}>
                                {isKr && post.title_ko ? post.title_ko : post.title}
                            </div>
                            <div style={styles.blogSummary}>
                                {isKr && post.summary_ko ? post.summary_ko : post.summary}
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}
