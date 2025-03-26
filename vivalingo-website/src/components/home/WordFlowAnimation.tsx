import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';

interface WordPair {
  original: string;
  translation?: string;
}

const WordFlowAnimation: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordListRef = useRef<HTMLDivElement>(null);
  const staticTextRef = useRef<HTMLDivElement>(null);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  
  // Word pairs highlighting intuitive learning methods - using translations
  const wordPairs: WordPair[] = [
    { original: t('wordFlow.words.0.original'), translation: t('wordFlow.words.0.translation') },
    { original: t('wordFlow.words.1.original'), translation: t('wordFlow.words.1.translation') },
    { original: t('wordFlow.words.2.original'), translation: t('wordFlow.words.2.translation') },
    { original: t('wordFlow.words.3.original'), translation: t('wordFlow.words.3.translation') },
    { original: t('wordFlow.words.4.original'), translation: t('wordFlow.words.4.translation') },
    { original: t('wordFlow.words.5.original'), translation: t('wordFlow.words.5.translation') },
    { original: t('wordFlow.words.6.original'), translation: t('wordFlow.words.6.translation') },
  ];
  
  // IMPROVED SCROLL DETECTION with smoother progression and better end visibility
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Start showing words when section starts entering viewport
        // FIXED: Extended detection range to ensure all words are shown
        if (rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.1) {
          // Calculate how far through we've scrolled - SLOWED DOWN progression
          // This ensures a more gradual transition between words
          const scrollProgress = Math.min(1, Math.max(0, 
            1 - ((rect.bottom - windowHeight * 0.8) / (rect.height * 0.8))
          ));
          
          // Calculate the active word index - SLOWED DOWN the progression
          // FIXED: Removed the multiplier to slow down transitions
          const newIndex = Math.min(
            Math.floor(scrollProgress * wordPairs.length),
            wordPairs.length - 1
          );
          
          if (newIndex !== activeWordIndex && newIndex >= 0) {
            setActiveWordIndex(newIndex);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeWordIndex, wordPairs.length]);
  
  // GSAP Animation for the static text
  useEffect(() => {
    if (staticTextRef.current) {
      gsap.fromTo(
        staticTextRef.current,
        { opacity: 0.5, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
    }
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-white/80 backdrop-blur-sm"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          {/* Static Viva La Lingo Text */}
          <div 
            ref={staticTextRef}
            className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0"
          >
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-600"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t('wordFlow.title')}
            </motion.h2>
            <motion.p
              className="text-gray-600 mt-4 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('wordFlow.subtitle')}
            </motion.p>
          </div>
          
          {/* Word Flow Animation */}
          <div className="w-full md:w-1/2 h-[350px] md:h-[400px] relative">
            {/* FIXED: Larger speech bubble to accommodate longer text */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-4/5 h-32 bg-gradient-to-r from-primary-50/50 via-primary-100/50 to-primary-50/50 rounded-full backdrop-blur-sm z-0"></div>
            
            {/* Words are rendered individually and animated with keyframes */}
            {/* FIXED: Added max-width and text-wrap to handle longer phrases */}
            <div ref={wordListRef} className="absolute inset-0 flex flex-col justify-center items-center">
              {wordPairs.map((pair, index) => (
                <div
                  key={index}
                  className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out w-full text-center ${
                    index === activeWordIndex 
                      ? 'opacity-100 top-1/2 -translate-y-1/2 scale-100 z-10' 
                      : index < activeWordIndex
                        ? 'opacity-0 top-[20%] -translate-y-1/2 scale-90 z-0' 
                        : 'opacity-0 top-[80%] -translate-y-1/2 scale-90 z-0'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center max-w-[80%] mx-auto">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 break-words hyphens-auto">
                      {pair.original}
                    </h3>
                    
                    {/* Translation (only visible when active) */}
                    {pair.translation && (
                      <div 
                        className={`text-lg md:text-xl text-primary-500 mt-2 transition-all duration-500 max-w-full break-words ${
                          index === activeWordIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {pair.translation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Word Progress Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {wordPairs.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeWordIndex 
                      ? 'bg-primary-500 scale-125' 
                      : index < activeWordIndex
                        ? 'bg-primary-300'
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {/* Scroll indicator - only shown when not at last word */}
            {activeWordIndex < wordPairs.length - 1 && (
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 animate-pulse">
                <div className="flex flex-col items-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span>{t('wordFlow.scrollToSee')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* FIXED: Added larger spacer to ensure last word visibility */}
      <div className="h-32 md:h-48 invisible">Spacer</div>
    </section>
  );
};

export default WordFlowAnimation;