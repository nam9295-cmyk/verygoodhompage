import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { blogs as staticBlogs } from '../../data/blogs';
import { db } from '../../services/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';

export default function BlogSection() {
    const [posts, setPosts] = useState(staticBlogs.slice(0, 3));
    const { isKr, lang } = useLanguage();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(3));
                const querySnapshot = await getDocs(q);

                const firebasePosts = [];
                querySnapshot.forEach((doc) => {
                    firebasePosts.push({ id: doc.id, ...doc.data() });
                });

                if (firebasePosts.length > 0) {
                    setPosts(firebasePosts);
                }
            } catch (e) {
                console.warn("Firebase fetch error, using static blogs:", e);
                // Keep using static blogs
            }
        }

        fetchPosts();
    }, []);

    return (
        <section className="section" id="recent-blog">
            <div className="section-head">
                <h2 className="section-title">JOURNAL</h2>
                <p className="section-sub">{isKr ? '베리굿초콜릿의 이야기들.' : 'Stories from Verygood Chocolate.'}</p>
            </div>

            <div className="home-blog-grid">
                {posts.map(post => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="home-blog-card">
                        <div className="hb-thumb">
                            <img
                                src={post.thumbnail}
                                alt={isKr && post.title_ko ? post.title_ko : post.title}
                                loading="lazy"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                            />
                        </div>
                        <div className="hb-meta">{post.date}</div>
                        <div className="hb-title">
                            {isKr && post.title_ko ? post.title_ko : post.title}
                        </div>
                        <div className="hb-summary">
                            {isKr && post.summary_ko ? post.summary_ko : post.summary}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="section-foot centered">
                <Link to="/blog" className="btn-read-more">READ MORE</Link>
            </div>
        </section>
    );
}
