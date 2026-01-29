import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import TopBanner from './TopBanner';

export default function Layout() {
    return (
        <>
            <TopBanner />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
