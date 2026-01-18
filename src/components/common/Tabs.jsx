export default function Tabs({ tabs, activeTab, onTabChange }) {
    return (
        <div className="tabs" role="tablist" aria-label="Shop categories">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    className={`tab ${activeTab === tab.key ? 'is-active' : ''}`}
                    role="tab"
                    aria-selected={activeTab === tab.key}
                    onClick={() => onTabChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
