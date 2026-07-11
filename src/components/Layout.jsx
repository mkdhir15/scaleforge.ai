import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ContactDock from './ContactDock';
import Footer from './Footer';

/** Scroll to top on every route change */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/**
 * Layout — wraps every page.
 * Navbar (top) + page content (Outlet) + ContactDock (fixed bottom-right) + Footer (bottom).
 */
const Layout = () => (
  <>
    <ScrollToTop />
    <Navbar />
    <main>
      <Outlet />
    </main>
    <ContactDock />
    <Footer />
  </>
);

export default Layout;
