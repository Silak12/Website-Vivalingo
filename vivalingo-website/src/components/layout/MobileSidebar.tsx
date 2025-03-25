import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  
  // Erstellt schwebende Sprachblasen im Hintergrund
  useEffect(() => {
    if (isOpen && bubblesRef.current) {
      const container = bubblesRef.current;
      const bubbleCount = 8;
      
      // Bereinige bestehende Bubbles
      container.innerHTML = '';
      
      // Erstelle neue Bubbles
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        
        // Zufällige Größe (15-40px)
        const size = 15 + Math.random() * 25;
        
        // Zufällige Position
        const left = Math.random() * 80 + 10; // 10-90%
        const top = Math.random() * 80 + 10; // 10-90%
        
        // Zufällige Farbe
        const colors = ['primary', 'secondary', 'accent', 'purple', 'blue', 'green'];
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        
        // Zufällige Opazität
        const opacity = 0.1 + Math.random() * 0.2;
        
        // Stile anwenden
        bubble.style.position = 'absolute';
        bubble.style.left = `${left}%`;
        bubble.style.top = `${top}%`;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.borderRadius = '50%';
        bubble.style.opacity = opacity.toString();
        
        // Füge Klasse basierend auf der Farbe hinzu
        bubble.className = `bg-${color}-400`;
        
        // Zum Container hinzufügen
        container.appendChild(bubble);
        
        // Animation mit GSAP
        gsap.to(bubble, {
          y: -30 - Math.random() * 70,
          x: Math.random() * 30 - 15,
          opacity: 0,
          scale: 2,
          duration: 5 + Math.random() * 10,
          ease: 'power1.out',
          repeat: -1,
          repeatRefresh: true,
          delay: Math.random() * 5,
        });
      }
      
      return () => {
        // Bereinige GSAP-Animationen
        gsap.killTweensOf(container.children);
      };
    }
  }, [isOpen]);
  
  // Verhindere Scrolling, wenn das Menü geöffnet ist
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Navigationspunkte
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Method', path: '/method' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/#pricing' },
  ];
  
  // Animationsvarianten
  const sidebarVariants = {
    hidden: { 
      x: '-100%',
      opacity: 0.5,
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    },
    exit: {
      x: '-100%',
      opacity: 0.5,
      transition: {
        ease: 'easeInOut',
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  };
  
  const navItemVariants = {
    hidden: { 
      x: -20, 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }
    },
    exit: { 
      x: -20, 
      opacity: 0,
      transition: {
        duration: 0.2,
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            ref={sidebarRef}
            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white z-50 shadow-xl overflow-hidden"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Hintergrund-Bubbles */}
            <div ref={bubblesRef} className="absolute inset-0 overflow-hidden z-0"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="p-6 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center">
                  <img 
                    src="/images/logo.svg" 
                    alt="Vivalingo Logo"
                    className="h-10 w-10 mr-2"
                  />
                  <span className="font-bold text-xl text-primary-600">Vivalingo</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation */}
              <nav className="flex-grow py-6 px-4 overflow-y-auto">
                <ul className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.li key={item.name} variants={navItemVariants}>
                      <Link
                        to={item.path}
                        className="block py-3 px-4 rounded-lg hover:bg-gray-100 text-lg font-medium transition-colors"
                        onClick={onClose}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Language Selector */}
                <motion.div 
                  variants={navItemVariants}
                  className="mt-8 p-4 bg-gray-50 rounded-lg"
                >
                  <h3 className="font-medium mb-2">Sprache ändern</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 rounded bg-primary-100 text-primary-700 font-medium">DE</button>
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-700">EN</button>
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-700">ES</button>
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-700">FR</button>
                  </div>
                </motion.div>
              </nav>
              
              {/* Footer */}
              <motion.div 
                variants={navItemVariants}
                className="p-6 border-t border-gray-200"
              >
                <Button variant="primary" className="w-full">
                  App herunterladen
                </Button>
                <div className="mt-4 text-center text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Vivalingo
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;