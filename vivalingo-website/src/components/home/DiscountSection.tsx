import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import DiscountCode from '../shared/DiscountCode';
import { 
  generateDiscountCodes, 
  selectRandomCode, 
  shuffleCodes,
  formatCountdown
} from '../../utils/discountCodeGenerator';
import { useLanguage } from '../../contexts/LanguageContext';

const DiscountSection: React.FC = () => {
  const { t } = useLanguage();
  
  // Number of codes to display
  const CODES_COUNT = 150;
  // Countdown time in seconds (24 hours)
  const COUNTDOWN_TIME = 24 * 60 * 60;
  
  // States for discount codes and active code
  const [discountCodes, setDiscountCodes] = useState<string[]>([]);
  const [activeCode, setActiveCode] = useState<string>('');
  const [isCodeUsed, setIsCodeUsed] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  
  // Refs for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const codesGridRef = useRef<HTMLDivElement>(null);

  // Generate codes on first render
  useEffect(() => {
    const codes = generateDiscountCodes(CODES_COUNT, 6, 'VIVA');
    const shuffledCodes = shuffleCodes(codes);
    const selectedActiveCode = selectRandomCode(codes);
    
    setDiscountCodes(shuffledCodes);
    setActiveCode(selectedActiveCode);
  }, []);

  // Countdown timer when code is used
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCodeUsed && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    
    // When countdown expires, reset
    if (countdown === 0) {
      setIsCodeUsed(false);
      setCountdown(COUNTDOWN_TIME);
      
      // Choose a new active code
      const newActiveCode = selectRandomCode(
        discountCodes.filter(code => code !== activeCode)
      );
      setActiveCode(newActiveCode);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCodeUsed, countdown, activeCode, discountCodes]);

  // Confetti animation for the active code
  useEffect(() => {
    if (sectionRef.current && codesGridRef.current && isCodeUsed) {
      // Confetti-like animation when a code is activated
      const createConfetti = () => {
        const confettiCount = 100;
        const colors = ['#0e98f0', '#f03a6a', '#bcbc23', '#8B5CF6'];
        
        for (let i = 0; i < confettiCount; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.position = 'absolute';
          
          // Start position
          const startX = window.innerWidth / 2;
          const startY = sectionRef.current!.offsetTop + 200;
          
          // Set start position
          confetti.style.left = `${startX}px`;
          confetti.style.top = `${startY}px`;
          
          // Add to DOM
          document.body.appendChild(confetti);
          
          // Random direction, size and rotation
          const angle = Math.random() * Math.PI * 2;
          const distance = 100 + Math.random() * 300;
          const destX = startX + Math.cos(angle) * distance;
          const destY = startY + Math.sin(angle) * distance;
          
          // Animate with GSAP
          gsap.to(confetti, {
            x: destX - startX,
            y: destY - startY,
            rotation: Math.random() * 520,
            opacity: 0,
            duration: 1 + Math.random() * 2,
            ease: 'power1.out',
            onComplete: () => {
              // Remove after animation
              document.body.removeChild(confetti);
            }
          });
        }
      };
      
      createConfetti();
    }
  }, [isCodeUsed]);

  // Handle click on a code
  const handleCodeClick = (code: string) => {
    if (code === activeCode && !isCodeUsed) {
      setIsCodeUsed(true);
      
      // Scroll to the active code
      const activeCodeElement = document.getElementById(`code-${code}`);
      if (activeCodeElement) {
        activeCodeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01
      }
    }
  };
  
  // Animation variants for individual codes
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div ref={sectionRef} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl font-bold mb-3">{t('discountSection.title')}</h3>
        <div className="mb-2 flex items-center justify-center">
          <span className={`font-medium px-3 py-1 rounded-full inline-flex items-center ${
            isCodeUsed ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
          }`}>
            {isCodeUsed ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {t('discountSection.codeUsed.label')}
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {t('discountSection.codeAvailable.label')}
              </>
            )}
          </span>
        </div>
        
        {isCodeUsed && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-4 mb-2 bg-red-50 p-3 rounded-lg inline-block"
            >
              <p className="font-bold">
                {t('discountSection.codeUsed.title')}
                <br />
                {t('discountSection.codeUsed.nextCode')}
                <span className="text-red-600 ml-2">{formatCountdown(countdown)}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        )}
        
        <p className="text-gray-600 max-w-2xl mx-auto mt-3">
          {t('discountSection.description')}
        </p>
      </motion.div>
      
      <motion.div 
        ref={codesGridRef}
        className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {discountCodes.map((code, index) => (
          <motion.div 
            key={code} 
            variants={itemVariants}
            id={`code-${code}`}
            className={code === activeCode && isCodeUsed ? 'animate-pulse' : ''}
          >
            <DiscountCode 
              code={code} 
              isActive={code === activeCode && !isCodeUsed} 
              onClick={handleCodeClick}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DiscountSection;