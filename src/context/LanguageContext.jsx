import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('EN');

    const toggle = () => setLang(prev => prev === 'EN' ? 'KR' : 'EN');
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
