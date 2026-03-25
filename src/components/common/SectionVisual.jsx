export default function SectionVisual({ asset, alt, className = '' }) {
    if (!asset) {
        return null;
    }

    if (asset.type === 'image') {
        return (
            <div className={`section-visual section-visual-image ${asset.fit ? `is-${asset.fit}` : ''} ${className}`.trim()}>
                <img src={asset.src} alt={alt || asset.alt || ''} />
            </div>
        );
    }

    return (
        <div className={`section-visual section-visual-graphic is-${asset.theme || 'default'} ${className}`.trim()}>
            <div className="section-visual-badge">{asset.title}</div>
            {asset.logos?.length > 0 && (
                <div className="section-visual-logos">
                    {asset.logos.map((logo) => (
                        <div key={logo} className="section-visual-logo-chip">
                            <img src={logo} alt="" aria-hidden="true" />
                        </div>
                    ))}
                </div>
            )}
            {asset.chips?.length > 0 && (
                <div className="section-visual-chips">
                    {asset.chips.map((chip) => (
                        <span key={chip}>{chip}</span>
                    ))}
                </div>
            )}
        </div>
    );
}
