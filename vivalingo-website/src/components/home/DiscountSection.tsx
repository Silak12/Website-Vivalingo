import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import DiscountCode from '../shared/DiscountCode';
import Button from '../shared/Button';
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
  // Initial number of codes to show on mobile
  const INITIAL_MOBILE_CODES_COUNT = 12;
  // Countdown time in seconds (24 hours)
  const COUNTDOWN_TIME = 24 * 60 * 60;
  
  // States for discount codes and active code
  const [discountCodes, setDiscountCodes] = useState<string[]>([]);
  const [activeCode, setActiveCode] = useState<string>('');
  const [isCodeUsed, setIsCodeUsed] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const [showAllCodes, setShowAllCodes] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const codesGridRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

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

  // Parallax effect for background
  useEffect(() => {
    if (bgRef.current && sectionRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = sectionRef.current!.getBoundingClientRect();
        
        // Only apply effect if mouse is within the section
        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          
          // More subtle parallax movement
          const moveX = (x - rect.width / 2) / 40;
          const moveY = (y - rect.height / 2) / 40;
          
          gsap.to(bgRef.current, {
            x: moveX,
            y: moveY,
            duration: 1.2,
            ease: 'power2.out',
          });
          
          // Move glow effect with cursor
          if (glowRef.current) {
            gsap.to(glowRef.current, {
              x: x - 150,
              y: y - 150,
              duration: 0.8,
              ease: 'power2.out',
            });
          }
        }
      };
      
      sectionRef.current.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        if (sectionRef.current) {
          sectionRef.current.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }
  }, []);

  // Create floating particles
  useEffect(() => {
    if (particlesRef.current) {
      // Create particles
      const particlesContainer = particlesRef.current;
      const numberOfParticles = window.innerWidth < 768 ? 8 : 15;
      
      // Clear existing particles
      particlesContainer.innerHTML = '';
      
      for (let i = 0; i < numberOfParticles; i++) {
        // Create a particle
        const particle = document.createElement('div');
        
        // Random size
        const size = Math.random() * 8 + 3;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Apply styles with pointer-events-none
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.pointerEvents = 'none';
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Animate with GSAP
        gsap.to(particle, {
          y: '-=50',
          x: `+=${Math.random() * 40 - 20}`,
          opacity: 0,
          duration: 8 + Math.random() * 12,
          ease: 'power1.out',
          repeat: -1,
          repeatRefresh: true,
          delay: Math.random() * 5
        });
      }
    }
  }, []);

  // Confetti animation for the active code
  useEffect(() => {
    if (sectionRef.current && codesGridRef.current && isCodeUsed) {
      // Confetti-like animation when a code is activated
      const createConfetti = () => {
        const confettiCount = 150;
        const colors = ['#0e98f0', '#f03a6a', '#bcbc23', '#8B5CF6', '#10B981', '#F59E0B'];
        
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
          const distance = 100 + Math.random() * 400;
          const destX = startX + Math.cos(angle) * distance;
          const destY = startY + Math.sin(angle) * distance;
          
          // Animate with GSAP
          gsap.to(confetti, {
            x: destX - startX,
            y: destY - startY,
            rotation: Math.random() * 520,
            opacity: 0,
            duration: 1.5 + Math.random() * 3,
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
      setShowAllCodes(true); // Show all codes when the active code is found
      
      // Scroll to the active code
      const activeCodeElement = document.getElementById(`code-${code}`);
      if (activeCodeElement) {
        setTimeout(() => {
          activeCodeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
    // Für nicht-aktive Codes wird kein Callback übergeben,
    // damit die eingebaute "click to copy"-Funktionalität in der DiscountCode-Komponente funktioniert
  };

  // Toggle showing all codes
  const handleToggleShowAllCodes = () => {
    const isExpanding = !showAllCodes;
    setShowAllCodes(!showAllCodes);
    
    // Reset animations for the grid when showing all codes
    if (isExpanding && codesGridRef.current) {
      // Force refresh of the grid by briefly hiding it
      codesGridRef.current.style.opacity = '0';
      setTimeout(() => {
        if (codesGridRef.current) {
          codesGridRef.current.style.opacity = '1';
        }
      }, 50);
    }
    
    setTimeout(() => {
      // Wenn wir ausblenden (von true auf false), zurück zum Anfang der Section scrollen
      if (!isExpanding && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } 
      // Wenn wir einblenden (von false auf true), etwas nach unten scrollen
      else if (isExpanding) {
        window.scrollBy({ top: 100, behavior: 'smooth' });
      }
    }, 100);
  };

  // Determine which codes to show based on mobile state and showAllCodes toggle
  const visibleCodes = !isMobile || showAllCodes 
    ? discountCodes 
    : discountCodes.slice(0, INITIAL_MOBILE_CODES_COUNT);

  return (
    <div 
      ref={sectionRef} 
      className="relative py-24 min-h-[600px] overflow-hidden"
    >
      {/* Enhanced background with subtle gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(10,10,30,0.95), rgba(30,30,80,0.9), rgba(10,10,30,0.95))`,
          transform: 'scale(1.02)'
        }}
      ></div>
      
      {/* Animated background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 overflow-hidden pointer-events-none z-1"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-300/20 to-secondary-300/20 blur-3xl"></div>
      </div>
      
      {/* Cursor follow glow effect */}
      <div 
        ref={glowRef}
        className="hidden md:block absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 blur-2xl pointer-events-none z-1"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      ></div>
      
      {/* Floating Particles */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 z-1 overflow-hidden pointer-events-none"
      ></div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            {t('discountSection.title')}
          </h3>
          
          <div className="mb-4 flex items-center justify-center">
            <span className={`font-medium px-4 py-2 rounded-full inline-flex items-center backdrop-blur-sm ${
              isCodeUsed ? 
                'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30' : 
                'bg-green-400/20 text-green-300 border border-green-400/30'
            }`}>
              {isCodeUsed ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {t('discountSection.codeUsed.label')}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="text-center mt-6 mb-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md p-4 rounded-lg inline-block border border-red-500/30"
              >
                <p className="font-bold text-white">
                  {t('discountSection.codeUsed.title')}
                  <br />
                  {t('discountSection.codeUsed.nextCode')}
                  <span className="text-red-400 ml-2 bg-red-500/20 px-3 py-1 rounded-md font-mono">
                    {formatCountdown(countdown)}
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>
          )}
          
          <p className="text-gray-300 max-w-2xl mx-auto mt-5 leading-relaxed">
            {t('discountSection.description')}
          </p>
        </motion.div>
        
        {/* Use AnimatePresence to properly handle animations when toggling codes */}
        <div 
          ref={codesGridRef}
          className="relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2 md:gap-3"
        >
          <AnimatePresence>
            {visibleCodes.map((code, index) => (
              <motion.div 
                key={code} 
                id={`code-${code}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.3,
                  delay: index < INITIAL_MOBILE_CODES_COUNT ? 0.03 * index : 0.01 * (index - INITIAL_MOBILE_CODES_COUNT)
                }}
                className={`${
                  code === activeCode && isCodeUsed ? 'animate-pulse z-10' : ''
                }`}
              >
                <DiscountCode 
                  code={code} 
                  isActive={code === activeCode && !isCodeUsed} 
                  onClick={code === activeCode && !isCodeUsed ? handleCodeClick : undefined}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Show all codes button - only on mobile */}
        {isMobile && discountCodes.length > INITIAL_MOBILE_CODES_COUNT && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <Button
              variant={showAllCodes ? "outline" : "primary"}
              size="md"
              className={`
                flex items-center gap-2 shadow-lg ${
                  showAllCodes ? 
                    'border-white/20 text-white hover:bg-white/10' : 
                    'shadow-primary-500/30'
                }
              `}
              onClick={handleToggleShowAllCodes}
            >
              {showAllCodes ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Weniger anzeigen
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Alle {CODES_COUNT} Codes anzeigen
                </>
              )}
            </Button>
          </motion.div>
        )}
        
        {/* Bottom info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10"
        >
          <div className="flex items-start md:items-center gap-3 md:gap-4">
            <div className="bg-primary-500/30 rounded-full p-3 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-lg mb-1">Wie funktioniert der Discount Code?</h4>
              <p className="text-gray-300 text-sm">
                Finde den aktiven Code unter den 150 versteckten Codes. Klicke darauf und teste ihn in der App, um 100% Rabatt zu erhalten. Jeder aktive Code kann nur einmal verwendet werden!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiscountSection;