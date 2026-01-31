import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../services/firebase';
import BlogCard from '../components/common/BlogCard';
import './BlogPage.css';
import { getBlogDateValue } from '../utils/formatBlogDate';

function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const q = query(collection(db, "blogs"));
            const querySnapshot = await getDocs(q);

            const fetchedPosts = [];
            querySnapshot.forEach((doc) => {
                fetchedPosts.push({ id: doc.id, ...doc.data() });
            });

            const sorted = fetchedPosts.sort(
                (a, b) => getBlogDateValue(b.date ?? b.createdAt) - getBlogDateValue(a.date ?? a.createdAt)
            );
            setPosts(sorted);
        } catch (error) {
            console.error("Error fetching posts:", error);
            try {
                const q = query(collection(db, "blogs"));
                const querySnapshot = await getDocs(q);
                const fetchedPosts = [];
                querySnapshot.forEach((doc) => {
                    fetchedPosts.push({ id: doc.id, ...doc.data() });
                });
                const sorted = fetchedPosts.sort(
                    (a, b) => getBlogDateValue(b.date ?? b.createdAt) - getBlogDateValue(a.date ?? a.createdAt)
                );
                setPosts(sorted);
            } catch (e) {
                console.error("Retry failed", e);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>블로그 | 베리굿초콜릿</title>
                <meta name="description" content="베리굿초콜릿의 초콜릿 이야기, 레시피, 이벤트 소식을 확인하세요." />
            </Helmet>

            <main className="blog-page">
                <h1 style={{ fontFamily: "'Addington CF', Georgia, serif", fontSize: "2rem", color: "#3E2512", marginBottom: "40px", textAlign: "center" }}>BLOG</h1>
                <div className="blog-grid">
                    {loading ? (
                        <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>Loading...</div>
                    ) : posts.length === 0 ? (
                        <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>등록된 글이 없습니다.</p>
                    ) : (
                        posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))
                    )}
                </div>
            </main>
        </>
    );
}

export default BlogPage;
