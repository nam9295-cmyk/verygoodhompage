import { useEffect } from 'react';
import i18n from '../../i18n';
import Layout from './Layout';

export default function LocaleLayout({ locale }) {
    useEffect(() => {
        if (i18n.resolvedLanguage !== locale) {
            i18n.changeLanguage(locale);
        }
    }, [locale]);

    return <Layout />;
}
