import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle anchor link scrolling
  useEffect(() => {
    // Check if the URL contains a hash
    if (location.hash) {
      // Get the element by id
      const element = document.getElementById(location.hash.substring(1));
      
      // If the element exists, scroll to it
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 100, // Offset for navbar
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, [location]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;