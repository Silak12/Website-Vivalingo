import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../shared/Button';
import MobileSidebar from './MobileSidebar';
import LanguageSelector from '../shared/LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  
  // Handle scroll effect - nur noch für den Schatteneffekt
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Updated navigation items
  const navItems = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.features'), path: '/#features' },
    { name: t('navbar.method'), path: '/method' },
    { name: t('navbar.pricing'), path: '/#pricing' },
  ];

  // Navbar ist jetzt immer weiß, nur der Schatten ändert sich
  const navbarClasses = `fixed w-full z-50 transition-all duration-300 bg-white ${
    scrolled ? 'shadow-md py-2' : 'py-4'
  }`;

  // Textfarben sind jetzt immer gleich
  const logoTextColor = 'text-primary-600';
  const navLinkColor = 'text-gray-700 hover:text-primary-600';

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container-custom flex justify-between items-center">
          {/* Logo - vergrößert von h-10 w-10 auf h-14 w-14 */}
          <Link to="/" className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <img 
                src="/images/logo2.png" 
                alt="Viva La Lingo Logo"
                className="h-14 w-14 mr-2"
              />
              <span className={`font-bold text-xl ${logoTextColor}`}>Viva La Lingo</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link 
                  to={item.path}
                  className={`${navLinkColor} font-medium transition-colors duration-300`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            
            {/* Language Selector */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <LanguageSelector />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Link to="/#download">
                <Button 
                  variant="primary" 
                  size="sm"
                >
                  {t('navbar.downloadApp')}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden touch-target flex items-center space-x-2">
            {/* Mobile Language Selector */}
            <LanguageSelector />
            
            <button
              onClick={() => setIsMenuOpen(true)}
              className="touch-target flex items-center justify-center"
              aria-label="Open menu"
            >
              <svg
                className="w-7 h-7 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;