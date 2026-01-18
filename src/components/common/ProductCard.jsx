import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductCard({ product }) {
    const { isKr, lang } = useLanguage();

    return (
        <article className="card product">
            <div className="thumb">
                <img src={product.mainImage} alt={product.name} loading="lazy" />
            </div>
            <div className="body">
                <div className="title">
                    {isKr && product.name_ko ? product.name_ko : product.name}
                </div>
                <div className="meta">
                    <div className="price">{product.priceStr}</div>
                    <div className="pills">
                        {product.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="mini">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="btns">
                    <Link
                        className="btn primary"
                        to={`/product/${product.id}`}
                    >
                        {isKr ? '상세보기' : 'more info'}
                    </Link>
                </div>
            </div>
        </article>
    );
}
