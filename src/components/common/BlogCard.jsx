import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { withLocale } from '../../utils/pathUtils';
import './BlogCard.css';

function BlogCard({ post }) {
    const { isKr } = useLanguage();
    const locale = isKr ? 'ko' : 'en';

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        if (typeof timestamp === 'string') return timestamp;
        if (timestamp?.toDate) {
            return timestamp.toDate().toLocaleDateString(isKr ? 'ko-KR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return '';
    };

    const getSummary = () => {
        if (isKr && post.summary_ko) return post.summary_ko;
        if (post.summary) return post.summary;
        if (post.content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = (isKr && post.content_ko) ? post.content_ko : post.content;
            return tempDiv.textContent.substring(0, 80) + '...';
        }
        return '';
    };

    const imageUrl = post.imageUrl || post.thumbnail || 'https://via.placeholder.com/400x300?text=No+Image';
    const title = isKr && post.title_ko ? post.title_ko : post.title;

    return (
        <Link to={withLocale(`/blog/${post.id}`, locale)} className="blog-card-link">
            <div className="blog-card">
                <div className="blog-thumb-wrapper">
                    <img src={imageUrl} alt={title} className="blog-thumb" loading="lazy" />
                </div>
                <div className="blog-content">
                    <h3 className="blog-title">{title}</h3>
                    <div className="blog-date">{formatDate(post.date || post.createdAt)}</div>
                    <p className="blog-summary">{getSummary()}</p>
                </div>
            </div>
        </Link>
    );
}

export default BlogCard;
