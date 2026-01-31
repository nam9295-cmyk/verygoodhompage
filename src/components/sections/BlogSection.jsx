import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { blogs as staticBlogs } from '../../data/blogs';
import { db } from '../../services/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { formatBlogDate, getBlogDateValue } from '../../utils/formatBlogDate';

export default function BlogSection() {
    const [posts, setPosts] = useState(staticBlogs.slice(0, 3));
    const { isKr } = useLanguage();
    const gridRef = useRef(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const q = query(collection(db, "blogs"));
                const querySnapshot = await getDocs(q);

                const firebasePosts = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log("Fetched post:", doc.id, data);
                    firebasePosts.push({ id: doc.id, ...data });
                });

                if (firebasePosts.length > 0) {
                    const sorted = firebasePosts
                        .sort((a, b) => getBlogDateValue(b.date ?? b.createdAt) - getBlogDateValue(a.date ?? a.createdAt))
                        .slice(0, 3);
                    setPosts(sorted);
                }
            } catch (e) {
                console.warn("Firebase fetch error, using static blogs:", e);
                // Keep using static blogs
            }
        }

        fetchPosts();
    }, []);

    const handleScroll = (direction) => {
        if (!gridRef.current) return;
        const scrollAmount = gridRef.current.offsetWidth * 0.8;
        gridRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section className="section" id="recent-blog">
            <div className="section-head">
                <div>
                    <h2 className="section-title">JOURNAL</h2>
                    <p className="section-sub">{isKr ? '베리굿초콜릿의 이야기들.' : 'Stories from Verygood Chocolate.'}</p>
                </div>
                <div className="slider-controls">
                    <button className="slider-btn" onClick={() => handleScroll('left')} aria-label="Previous">←</button>
                    <button className="slider-btn" onClick={() => handleScroll('right')} aria-label="Next">→</button>
                </div>
            </div>

            <div className="home-blog-grid" ref={gridRef}>
                {posts.map(post => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="home-blog-card">
                        <div className="hb-thumb">
                            <img
                                src={post.imageUrl ?? post.thumbnail}
                                alt={isKr && post.title_ko ? post.title_ko : post.title}
                                loading="lazy"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                            />
                        </div>
                        <div className="hb-meta">{formatBlogDate(post.date ?? post.createdAt)}</div>
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
