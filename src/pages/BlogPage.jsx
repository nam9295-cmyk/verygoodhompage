import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import BlogCard from '../components/common/BlogCard';
import { fetchBlogs } from '../services/blogs';
import './BlogPage.css';

function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isKr } = useLanguage();

    useEffect(() => {
        let active = true;

        async function loadPosts() {
            try {
                const sorted = await fetchBlogs();
                if (active) {
                    setPosts(sorted);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadPosts();

        return () => {
            active = false;
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>{isKr ? '블로그 | 베리굿초콜릿' : 'Blog | Very Good Chocolate'}</title>
                <meta
                    name="description"
                    content={isKr
                        ? '베리굿초콜릿의 제품, 브랜드, 매장 이야기를 확인하세요.'
                        : 'Read stories from Very Good Chocolate across products, brand, and store life.'}
                />
            </Helmet>

            <main className="blog-page">
                <div className="hub-eyebrow" style={{ textAlign: 'center', marginBottom: '12px' }}>BLOG</div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#3E2512', marginBottom: '12px', textAlign: 'center' }}>
                    {isKr ? '베리굿의 기록과 장면' : 'Stories and scenes from Very Good'}
                </h1>
                <p style={{ maxWidth: '640px', margin: '0 auto 40px', textAlign: 'center', color: '#5b4635', lineHeight: 1.7 }}>
                    {isKr
                        ? '제품, 매장, 계절의 흐름을 짧고 차분한 문장으로 전합니다.'
                        : 'A calm journal of products, the store, and seasonal moments.'}
                </p>
                <div className="blog-grid">
                    {loading ? (
                        <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>Loading...</div>
                    ) : posts.length === 0 ? (
                        <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>{isKr ? '등록된 글이 없습니다.' : 'No posts have been published yet.'}</p>
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
