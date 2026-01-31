import { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(i18n.language?.startsWith('ko') ? 'KR' : 'EN');

    useEffect(() => {
        const handleLanguageChanged = (lng) => {
            setLang(lng?.startsWith('ko') ? 'KR' : 'EN');
        };

        i18n.on('languageChanged', handleLanguageChanged);

        // Initial sync handled by state initializer or event listener logic
        // setLang(i18n.language?.startsWith('ko') ? 'KR' : 'EN'); // Removed to avoid set-state-in-effect warning

        return () => {
            i18n.off('languageChanged', handleLanguageChanged);
        };
    }, []);

    const toggle = () => {
        const newLang = lang === 'EN' ? 'ko' : 'en';
        i18n.changeLanguage(newLang);
    };

    const isKr = lang === 'KR';

    return (
        <LanguageContext.Provider value={{ lang, toggle, isKr }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
