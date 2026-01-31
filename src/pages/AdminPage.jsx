import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import './AdminPage.css';
import { getBlogDateValue } from '../utils/formatBlogDate';

function AdminPage() {
    const [posts, setPosts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        imageUrl: '',
        summary: '',
        mode: 'regular' // 'regular' (default) or 'editorial'
    });
    const [editingId, setEditingId] = useState(null);

    // Use environment variable for password
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'verygood2026';

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    };

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
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchPosts();
        }
    }, [isAuthenticated]);

    const handleAddPost = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                // Update existing post
                const postRef = doc(db, "blogs", editingId);
                await updateDoc(postRef, {
                    ...newPost,
                    updatedAt: serverTimestamp()
                });
                alert('글이 수정되었습니다.');
            } else {
                // Create new post
                await addDoc(collection(db, "blogs"), {
                    ...newPost,
                    date: serverTimestamp(),
                    createdAt: serverTimestamp()
                });
                alert('글이 등록되었습니다.');
            }

            setNewPost({ title: '', content: '', imageUrl: '', summary: '', mode: 'regular' });
            setEditingId(null);
            fetchPosts();
        } catch (error) {
            console.error("Error saving post:", error);
            alert('저장에 실패했습니다.');
        }
    };

    const handleEditClick = (post) => {
        setEditingId(post.id);
        setNewPost({
            title: post.title || '',
            content: post.content || '',
            imageUrl: post.imageUrl || '',
            summary: post.summary || '',
            mode: post.mode || 'regular'
        });
        window.scrollTo(0, 0); // Scroll to top to see form
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setNewPost({ title: '', content: '', imageUrl: '', summary: '', mode: 'regular' });
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await deleteDoc(doc(db, "blogs", postId));
            fetchPosts();
            alert('삭제되었습니다.');

            // If deleting the post currently being edited, cancel edit mode
            if (editingId === postId) {
                handleCancelEdit();
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert('삭제에 실패했습니다.');
        }
    };

    if (!isAuthenticated) {
        return (
            <main className="admin-page">
                <div className="login-box">
                    <h1>관리자 로그인</h1>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <button onClick={handleLogin}>로그인</button>
                </div>
            </main>
        );
    }

    return (
        <>
            <Helmet>
                <title>관리자 | 베리굿초콜릿</title>
            </Helmet>

            <main className="admin-page">
                <h1>블로그 관리</h1>

                <section className="add-post-section">
                    <h2>{editingId ? '글 수정' : '새 글 작성'}</h2>
                    <form onSubmit={handleAddPost}>
                        <input
                            type="text"
                            placeholder="제목"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="이미지 URL"
                            value={newPost.imageUrl}
                            onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="요약"
                            value={newPost.summary}
                            onChange={(e) => setNewPost({ ...newPost, summary: e.target.value })}
                        />
                        <textarea
                            placeholder="내용 (HTML 지원)"
                            rows="10"
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            required
                        ></textarea>
                        <div style={{ margin: '10px 0' }}>
                            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>게시글 모드: </label>
                            <select
                                value={newPost.mode}
                                onChange={(e) => setNewPost({ ...newPost, mode: e.target.value })}
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                <option value="regular">일반 글 (자동 이미지 배치)</option>
                                <option value="editorial">에디토리얼 (HTML/CSS 유지)</option>
                            </select>
                            <p style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
                                * 일반 글: 텍스트와 이미지가 지그재그로 자동 배치됩니다.<br />
                                * 에디토리얼: 작성한 HTML 코드가 그대로 적용됩니다 (CSS 포함).
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="submit">{editingId ? '수정하기' : '등록'}</button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    style={{ background: '#6c757d' }}
                                >
                                    취소
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                <section className="posts-list-section">
                    <h2>게시글 목록</h2>
                    <div className="posts-table">
                        {posts.map(post => (
                            <div key={post.id} className="post-item">
                                <span className="post-title" style={{ flexGrow: 1 }}>{post.title}</span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => handleEditClick(post)}
                                        className="delete-btn" // Reusing button style but override color
                                        style={{ background: '#007bff' }}
                                    >
                                        수정
                                    </button>
                                    <button onClick={() => handleDeletePost(post.id)} className="delete-btn">삭제</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export default AdminPage;
