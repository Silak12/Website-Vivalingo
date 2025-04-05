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
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
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

  // Google Analytics Pageview Tracking
  useEffect(() => {
    const pagePath = location.pathname + location.hash;
    if (window.gtag) {
      window.gtag('config', 'G-ZE75QCKT3V', { page_path: pagePath });
    }
  }, [location]);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) {
      document.documentElement.classList.add('mobile-device');
      const script = document.createElement('script');
      script.textContent = `
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
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
