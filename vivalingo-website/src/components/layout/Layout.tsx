import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

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
  
  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Mobile-specific optimizations
    if (isMobile) {
      // Optimieren von Animationen für Mobilgeräte
      document.documentElement.classList.add('mobile-device');
      
      // Passive scroll listeners für bessere Scrolling-Performance
      const script = document.createElement('script');
      script.textContent = `
        // Add passive listener option to improve scroll performance
        jQuery.event.special.touchstart = {
          setup: function(_, ns, handle) {
            this.addEventListener('touchstart', handle, { passive: true });
          }
        };
        jQuery.event.special.touchmove = {
          setup: function(_, ns, handle) {
            this.addEventListener('touchmove', handle, { passive: true });
          }
        };
      `;
      document.head.appendChild(script);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (isMobile) {
        document.documentElement.classList.remove('mobile-device');
      }
    };
  }, [isMobile]);
  
  // Add device-specific class to body
  useEffect(() => {
    if (isMobile) {
      document.body.classList.add('is-mobile');
    } else {
      document.body.classList.remove('is-mobile');
    }
  }, [isMobile]);
  
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