import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { blogs as staticBlogs } from '../data/blogs';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { formatBlogDate } from '../utils/formatBlogDate';

// CSS for blog detail with zigzag image layout
const blogStyles = `
  .blog-detail-page {
    max-width: 900px;
    margin: 140px auto 120px;
    padding: 0 24px;
    background-color: #FAFAFA;
  }

  .bd-header {
    text-align: center;
    margin-bottom: 56px;
    border-bottom: 1px solid #E0E0E0;
    padding-bottom: 48px;
  }

  .bd-meta {
    font-family: 'Merriweather', 'Noto Serif KR', Georgia, serif;
    font-size: 13px;
    color: #555;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 400;
  }

  .bd-title {
    font-family: 'Merriweather', 'Noto Serif KR', Georgia, serif;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.4;
    margin-bottom: 0;
    color: #2D2D2D;
    letter-spacing: -0.02em;
  }

  .bd-content {
    font-family: 'Merriweather', 'Noto Serif KR', Georgia, serif;
    font-size: 17px;
    line-height: 1.8;
    color: #2D2D2D;
    text-align: justify;
    letter-spacing: -0.02em;
    word-break: keep-all;
  }

  .bd-content::after {
    content: "";
    display: table;
    clear: both;
  }

  .bd-content p {
    margin-bottom: 1.6em;
    text-indent: 0;
  }

  .bd-content h2 {
    font-family: 'Merriweather', 'Noto Serif KR', Georgia, serif;
    font-size: 24px;
    font-weight: 700;
    margin-top: 2.5em;
    margin-bottom: 1em;
    color: #2D2D2D;
    letter-spacing: -0.02em;
    text-align: left;
    border-bottom: 1px solid #E0E0E0;
    padding-bottom: 0.5em;
  }

  .bd-content h3 {
    font-family: 'Merriweather', 'Noto Serif KR', Georgia, serif;
    font-size: 20px;
    font-weight: 700;
    margin-top: 2em;
    margin-bottom: 0.8em;
    color: #2D2D2D;
    letter-spacing: -0.01em;
    text-align: left;
  }

  /* Magazine-Style Zigzag Image Layout (Regular Mode Only) */
  .zigzag-mode img {
    width: 50%;
    max-width: 420px;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    margin-bottom: 1.2em;
    transition: box-shadow 0.3s ease;
  }

  .zigzag-mode img:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }

  /* First image: Full-width Hero */
  .zigzag-mode img.img-hero {
    float: none;
    width: 100%;
    max-width: 100%;
    display: block;
    margin: 0 auto 2em auto;
    border-radius: 6px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  }

  /* Zigzag layout classes */
  .zigzag-mode img.img-left {
    float: left;
    margin-right: 1.5em;
    margin-left: 0;
    margin-top: 0.3em;
  }

  .zigzag-mode img.img-right {
    float: right;
    margin-left: 1.5em;
    margin-right: 0;
    margin-top: 0.3em;
  }
  
  /* Editorial Mode / HTML Mode */
  .editorial-mode img {
      max-width: 100%;
      height: auto;
  }

  .bd-footer {
    margin-top: 64px;
    padding-top: 32px;
    border-top: 1px solid #E0E0E0;
    text-align: center;
  }

  .btn-text {
    display: inline-block;
    font-family: 'Merriweather', 'Noto Serif KR', Georgia, serif;
    text-decoration: none;
    color: #555;
    border-bottom: 1px solid #555;
    padding-bottom: 2px;
    font-size: 14px;
    letter-spacing: 0.02em;
  }

  .btn-text:hover {
    opacity: 0.6;
  }

  /* Mobile: Reset float, full-width centered images */
  @media (max-width: 768px) {
    .blog-detail-page {
      padding: 0 20px;
      margin-top: 100px;
    }

    .bd-title {
      font-size: 26px;
      line-height: 1.35;
    }

    .bd-content {
      font-size: 16px;
      line-height: 1.75;
      text-align: left;
    }

    .zigzag-mode img,
    .zigzag-mode img.img-hero,
    .zigzag-mode img.img-left,
    .zigzag-mode img.img-right {
      float: none;
      width: 100%;
      max-width: 100%;
      margin: 1.5em auto;
      margin-left: 0;
      margin-right: 0;
      display: block;
    }
  }
`;

export default function BlogDetailPage() {
  const { id } = useParams();
  const { isKr } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    async function fetchPost() {
      let foundPost = staticBlogs.find(b => b.id === id);

      if (!foundPost && id) {
        try {
          const docRef = doc(db, "blogs", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            foundPost = { id: docSnap.id, ...docSnap.data() };
          }
        } catch (e) {
          console.log("Firestore fetch skipped or failed", e);
        }
      }

      setPost(foundPost);
      setLoading(false);
    }

    fetchPost();
  }, [id]);

  // Apply zigzag image layout ONLY if mode is 'regular' (or undefined for backward compatibility)
  useEffect(() => {
    if (post && contentRef.current) {
      // If mode is explicit 'editorial', skip zigzag usage
      if (post.mode === 'editorial') return;

      // Regular mode logic
      const images = contentRef.current.querySelectorAll('img');
      images.forEach((img, index) => {
        img.classList.remove('img-hero', 'img-left', 'img-right');

        if (index === 0) {
          img.classList.add('img-hero');
        } else {
          if (index % 2 === 1) {
            img.classList.add('img-left');
          } else {
            img.classList.add('img-right');
          }
        }
      });
    }
  }, [post, isKr]);

  if (loading) {
    return (
      <>
        <style>{blogStyles}</style>
        <main className="blog-detail-page">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <p>Loading...</p>
          </div>
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Post Not Found - Very Good Chocolate</title>
        </Helmet>
        <style>{blogStyles}</style>
        <main className="blog-detail-page">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2>{isKr ? '글을 찾을 수 없습니다' : 'Post not found'}</h2>
            <Link to="/blog" className="btn-text">
              {isKr ? '목록으로 돌아가기' : 'Back to List'}
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Handle both old schema (title_ko) and new schema (title)
  const title = isKr && post.title_ko ? post.title_ko : post.title;
  const content = isKr && post.content_ko ? post.content_ko : post.content;
  const summary = isKr && post.summary_ko ? post.summary_ko : post.summary;

  // Determine container class based on mode
  const contentClass = post.mode === 'editorial' ? 'bd-content editorial-mode' : 'bd-content zigzag-mode';

  // Date formatting
  const displayDate = formatBlogDate(post.date ?? post.createdAt);

  return (
    <>
      <Helmet>
        <title>{title} - Very Good Chocolate</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={`https://verygood-chocolate.com/blog/${id}`} />
      </Helmet>

      <style>{blogStyles}</style>

      <main className="blog-detail-page">
        <article>
          <div className="bd-header">
            <div className="bd-meta">{displayDate}</div>
            <h1 className="bd-title">{title}</h1>
          </div>
          <div
            className={contentClass}
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="bd-footer">
            <Link to="/blog" className="btn-text">
              {isKr ? '목록으로 돌아가기' : 'Back to List'}
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
