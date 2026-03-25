import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLocaleFromPath, swapLocaleInPath } from '../../utils/pathUtils';

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        const nextLocale = lng === 'en' ? 'en' : 'ko';
        const currentLocale = getLocaleFromPath(location.pathname);

        if (nextLocale !== currentLocale) {
            navigate(`${swapLocaleInPath(location.pathname, nextLocale)}${location.search}${location.hash}`);
        }

        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const currentLocale = getLocaleFromPath(location.pathname);
    const currentFlag = currentLocale === 'ko' ? '🇰🇷' : '🇺🇸';

    return (
        <div className="language-selector" ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={toggleDropdown}
                className="lang-btn"
                aria-label="Select Language"
            >
                <span className="flag">{currentFlag}</span>
                <span className="arrow" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
            </button>

            {isOpen && (
                <div
                    className="lang-dropdown"
                    style={{
                        position: 'absolute',
                        top: '120%',
                        right: 0,
                        backgroundColor: 'white',
                        border: '1px solid #eee',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        zIndex: 1000,
                        minWidth: '120px'
                    }}
                >
                    <button
                        onClick={() => changeLanguage('en')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            padding: '10px 16px',
                            border: 'none',
                            background: currentLocale === 'en' ? '#f5f5f5' : 'white',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '14px',
                            color: '#333'
                        }}
                    >
                        <span style={{ fontSize: '16px' }}>🇺🇸</span> English
                    </button>
                    <button
                        onClick={() => changeLanguage('ko')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            padding: '10px 16px',
                            border: 'none',
                            background: currentLocale === 'ko' ? '#f5f5f5' : 'white',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '14px',
                            color: '#333'
                        }}
                    >
                        <span style={{ fontSize: '16px' }}>🇰🇷</span> Korean
                    </button>
                </div>
            )}
        </div>
    );
}
