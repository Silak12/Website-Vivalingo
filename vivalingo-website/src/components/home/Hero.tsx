import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';
import AnimatedText from '../shared/AnimatedText';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface Word {
  original: string;
  decoded: string[];  // Array für 1:1-Übersetzungen, kann mehrere Wörter enthalten
  highlightIndices: number[];  // Zu welchen Indices im Zielsatz gehört dieses Wort
}

interface Phrase {
  sourceLanguage: string;
  sourceLanguageCode: string;
  sourceColor: string;
  targetLanguage: string;
  targetLanguageCode: string;
  targetColor: string;
  originalSentence: string;
  decodedWords: Word[];
  targetSentence: string;
}

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const phoneContentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // States for the language learning animation
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);
  const [animationTimer, setAnimationTimer] = useState<NodeJS.Timeout | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // Demo phrases for the phone app animation with Birkenbihl's decoding approach
  const phrases: Phrase[] = [
    {
      sourceLanguage: t('hero.languagePhrases.japanese.lang'),
      sourceLanguageCode: "JA",
      sourceColor: "bg-red-500",
      targetLanguage: t('hero.languagePhrases.spanish.lang') === "Spanisch" ? "Deutsch" : "English",
      targetLanguageCode: t('hero.languagePhrases.spanish.lang') === "Spanisch" ? "DE" : "EN",
      targetColor: "bg-yellow-600",
      originalSentence: "私は毎日日本語を勉強します",
      decodedWords: [
        { original: "私は", decoded: [t('hero.languagePhrases.spanish.lang') === "Spanisch" ? "Ich" : "I"], highlightIndices: [0] },
        { original: "毎日", decoded: t('hero.languagePhrases.spanish.lang') === "Spanisch" ? ["jeden", "Tag"] : ["every", "day"], highlightIndices: [1, 2] },
        { original: "日本語を", decoded: [t('hero.languagePhrases.japanese.lang')], highlightIndices: [3] },
        { original: "勉強します", decoded: [t('hero.languagePhrases.spanish.lang') === "Spanisch" ? "studiere" : "study"], highlightIndices: [4] }
      ],
      targetSentence: t('hero.languagePhrases.spanish.lang') === "Spanisch" 
        ? "Ich jeden Tag Japanisch studiere" 
        : "I every day Japanese study"
    },
    {
      sourceLanguage: t('hero.languagePhrases.spanish.lang'),
      sourceLanguageCode: "ES",
      sourceColor: "bg-yellow-600",
      targetLanguage: t('hero.languagePhrases.spanish.lang') === "Spanisch" ? "Englisch" : "English",
      targetLanguageCode: "EN",
      targetColor: "bg-blue-500",
      originalSentence: "Me gusta aprender sin reglas gramaticales",
      decodedWords: [
        { original: "Me", decoded: ["I"], highlightIndices: [0] },
        { original: "gusta", decoded: ["like"], highlightIndices: [1] },
        { original: "aprender", decoded: ["to learn"], highlightIndices: [2, 3] },
        { original: "sin", decoded: ["without"], highlightIndices: [4] },
        { original: "reglas", decoded: ["rules"], highlightIndices: [5] },
        { original: "gramaticales", decoded: ["grammatical"], highlightIndices: [6] }
      ],
      targetSentence: "I like to learn without rules grammatical"
    },
    {
      sourceLanguage: t('hero.languagePhrases.french.lang'),
      sourceLanguageCode: "FR",
      sourceColor: "bg-blue-600",
      targetLanguage: t('hero.languagePhrases.spanish.lang'),
      targetLanguageCode: "ES",
      targetColor: "bg-red-600",
      originalSentence: "J'apprends naturellement avec cette méthode",
      decodedWords: [
        { original: "J'", decoded: ["Yo"], highlightIndices: [0] },
        { original: "apprends", decoded: ["aprendo"], highlightIndices: [1] },
        { original: "naturellement", decoded: ["naturalmente"], highlightIndices: [2] },
        { original: "avec", decoded: ["con"], highlightIndices: [3] },
        { original: "cette", decoded: ["este"], highlightIndices: [4] },
        { original: "méthode", decoded: ["método"], highlightIndices: [5] }
      ],
      targetSentence: "Yo aprendo naturalmente con este método"
    }
  ];

  // Current phrase
  const currentPhrase = phrases[currentPhraseIndex];

  // Start the animation - fixed to properly track state
  const startAnimation = () => {
    setIsPlaying(true);
    setAnimationCompleted(false);
    let wordIndex = 0;
    
    // Clear any existing animation
    if (animationTimer) {
      clearInterval(animationTimer);
      setAnimationTimer(null);
    }
    
    // Set first word
    setHighlightedWordIndex(wordIndex);
    
    // Create interval to highlight words one by one
    const timer = setInterval(() => {
      wordIndex++;
      
      if (wordIndex >= currentPhrase.decodedWords.length) {
        // End of phrase - all words have been highlighted
        clearInterval(timer);
        setAnimationTimer(null);
        setAnimationCompleted(true);
        
        // Move to next phrase after a delay only if still playing
        const nextPhraseTimer = setTimeout(() => {
          // Only proceed if we're still in playing state
          if (isPlaying) {
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
            setHighlightedWordIndex(0);
            setAnimationCompleted(false);
            startAnimation();
          }
        }, 3000); // Longer delay before switching phrases
        
        // Store the timeout in a ref or state if needed to clear it
        return () => clearTimeout(nextPhraseTimer);
      } else {
        // Move to next word
        setHighlightedWordIndex(wordIndex);
      }
    }, 1200); // Longer time per word
    
    setAnimationTimer(timer);
  };

  // Pause the animation - completely stops all animations
  const pauseAnimation = () => {
    setIsPlaying(false);
    
    // Clear the word highlighting interval
    if (animationTimer) {
      clearInterval(animationTimer);
      setAnimationTimer(null);
    }
    
    // Also clear any GSAP animations related to the phone content
    if (phoneContentRef.current) {
      // Kill all animations on the phone content and its children
      gsap.killTweensOf(phoneContentRef.current.children);
    }
  };
  
  // Toggle play/pause - improved with better state management
  const togglePlayPause = () => {
    if (isPlaying) {
      // If currently playing, pause everything
      pauseAnimation();
    } else {
      // If currently paused, resume or restart
      if (animationCompleted) {
        // If animation was completed, start a new phrase
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setHighlightedWordIndex(0);
        setAnimationCompleted(false);
        startAnimation();
      } else {
        // Otherwise, continue from where we left off
        startAnimation();
      }
    }
    
    // Force update of isPlaying state to ensure UI consistency
    setIsPlaying(!isPlaying);
  };
  
  // Enhanced background effects and parallax
  useEffect(() => {
    if (heroRef.current && circleRef.current) {
      const heroElement = heroRef.current;
      
      // Initialize enhanced GSAP animation for background circles
      gsap.fromTo(
        circleRef.current,
        {
          scale: 0.9,
          opacity: 0.6,
        },
        {
          scale: 1.1,
          opacity: 0.8,
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
      
      // Create follow effect on mouse move with improved sensitivity
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = heroElement.getBoundingClientRect();
        
        const x = clientX - left;
        const y = clientY - top;
        
        // More subtle parallax movement
        const moveX = (x - width / 2) / 40;
        const moveY = (y - height / 2) / 40;
        
        gsap.to(circleRef.current, {
          x: moveX,
          y: moveY,
          duration: 1.2,
          ease: 'power2.out',
        });
      };
      
      heroElement.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        gsap.killTweensOf(circleRef.current);
      };
    }
  }, []);
  
  // Smartphone shadow effect only - complete removal of movement animation
  useEffect(() => {
    if (phoneRef.current) {
      // Removed all movement animation to prevent any wackling
      // Only keeping a subtle static shadow
      phoneRef.current.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25)';
      
      return () => {
        // Nothing to clean up since we're not using animations anymore
      };
    }
  }, []);
  
  // Create floating particles - reduced number and with slower animations to prevent flashing
  useEffect(() => {
    if (particlesRef.current) {
      // Create particles
      const particlesContainer = particlesRef.current;
      const numberOfParticles = window.innerWidth < 768 ? 4 : 8; // Even fewer particles to reduce GPU load
      
      // Clear existing particles
      particlesContainer.innerHTML = '';
      
      for (let i = 0; i < numberOfParticles; i++) {
        // Create a particle
        const particle = document.createElement('div');
        
        // Random size (smaller)
        const size = Math.random() * 10 + 3;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Apply styles with pointer-events-none to ensure they don't interfere with interactions
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.pointerEvents = 'none'; // Ensure particles don't block interaction
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Animate with GSAP - slower animations to reduce CPU/GPU load
        gsap.to(particle, {
          y: '-=30',
          x: `+=${Math.random() * 20 - 10}`,
          opacity: 0,
          duration: 6 + Math.random() * 6, // Slower animations
          ease: 'power1.out',
          repeat: -1,
          repeatRefresh: true,
          delay: Math.random() * 4
        });
      }
    }
  }, []);
  
  // Brain wave animation effects - fixed to respect play/pause state
  useEffect(() => {
    let waveInterval: NodeJS.Timeout | null = null;
    
    if (phoneContentRef.current && isPlaying) {
      // Create brain wave effect
      const createBrainWave = () => {
        // Only proceed if still playing
        if (!isPlaying) return;
        
        const wave = document.createElement('div');
        wave.className = 'absolute w-6 h-6 rounded-full bg-primary-400/20 backdrop-blur-sm pointer-events-none';
        
        // Position near the bottom of the phone screen
        const startX = 40 + Math.random() * 20;
        const startY = 60 + Math.random() * 20;
        
        wave.style.left = `${startX}%`;
        wave.style.top = `${startY}%`;
        
        if (phoneContentRef.current) {
          phoneContentRef.current.appendChild(wave);
          
          // Animation
          gsap.fromTo(
            wave,
            { 
              scale: 0, 
              opacity: 0.7 
            },
            {
              scale: 3,
              opacity: 0,
              duration: 3 + Math.random() * 2,
              ease: 'power1.out',
              onComplete: () => {
                if (phoneContentRef.current && phoneContentRef.current.contains(wave)) {
                  phoneContentRef.current.removeChild(wave);
                }
              }
            }
          );
        }
      };
      
      // Create brain waves at intervals
      waveInterval = setInterval(createBrainWave, 2000);
    }
    
    return () => {
      if (waveInterval) {
        clearInterval(waveInterval);
      }
    };
  }, [isPlaying]);
  
  // Start the animation when component mounts
  useEffect(() => {
    startAnimation();
    
    return () => {
      if (animationTimer) {
        clearInterval(animationTimer);
      }
    };
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20"
    >
      {/* Enhanced background with subtle gradient - fixed to prevent flashing */}
      <div className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(10,10,30,0.95), rgba(30,30,80,0.9), rgba(10,10,30,0.95))`,
          transform: 'scale(1.02)'
        }}
      ></div>
      
      {/* Background Circle Animation - Enhanced with pointer-events none to fix interaction issues */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div 
          ref={circleRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-300/20 to-secondary-300/20 blur-3xl"
        />
      </div>
      
      {/* Floating Particles - Less intense than DownloadCTA, with pointer-events none */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 z-1 overflow-hidden pointer-events-none"
      ></div>
      
      <div className="container-custom relative z-10">
        {/* Mobile Layout (Column): Title → Phone → Subtitle → Benefits → Metrics → Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Mobile Title (Only shown on mobile) */}
          <div className="w-full md:hidden text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <AnimatedText
                text={t('hero.title')}
                className="text-4xl font-bold text-white mb-4"
                as="h1"
                once={true}
              />
            </motion.div>
          </div>
          
          {/* Phone Mockup - On mobile appears after the title */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative perspective-1000 z-10" 
            >
              {/* Phone mockup component */}
              <div 
                ref={phoneRef}
                className="relative mx-auto w-[300px] h-[600px] shadow-[0_15px_35px_rgba(0,0,0,0.3)]"
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0)' }}
              >
                {/* Phone Frame - fixed to ensure content is interactive */}
                <div className="absolute inset-0 bg-gray-800 rounded-[35px] border-[10px] border-gray-900 shadow-xl overflow-hidden z-10">
                  {/* Phone content */}
                  <div 
                    ref={phoneContentRef}
                    className="absolute inset-0 bg-gray-900 overflow-hidden z-20"
                  >
                    {/* App Header */}
                    <div className="h-14 bg-primary-600 flex items-center justify-center">
                      <div className="text-white font-bold text-lg">VivaLaLingo</div>
                    </div>
                    
                    {/* Language UI */}
                    <div className="p-4 h-[calc(100%-4.5rem)] bg-gray-50 overflow-y-auto">
                      {/* Language Selection */}
                      <div className="flex justify-between mb-6">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full ${currentPhrase.sourceColor} flex items-center justify-center text-white font-bold text-xs`}>
                            {currentPhrase.sourceLanguageCode}
                          </div>
                          <span className="ml-2 text-gray-800 text-sm">{currentPhrase.sourceLanguage}</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full ${currentPhrase.targetColor} flex items-center justify-center text-white font-bold text-xs`}>
                            {currentPhrase.targetLanguageCode}
                          </div>
                          <span className="ml-2 text-gray-800 text-sm">{currentPhrase.targetLanguage}</span>
                        </div>
                      </div>
                      
                      {/* Language Learning Animation - Birkenbihl Method */}
                      <div className="bg-white rounded-xl shadow-md p-4 mb-3">
                        {/* Original language sentence */}
                        <div className="text-xs text-gray-500 mb-1">Original ({currentPhrase.sourceLanguage}):</div>
                        <div className="mb-3 min-h-[50px] break-words">
                          {currentPhrase.decodedWords.map((word, index) => (
                            <span
                              key={`original-${index}`}
                              className={`inline-block text-sm mr-1 rounded px-1 ${
                                highlightedWordIndex === index ? `${currentPhrase.sourceColor} text-white` : 'text-gray-800'
                              }`}
                            >
                              {word.original}
                            </span>
                          ))}
                        </div>
                        
                        {/* Decoded (1:1 translation) */}
                        <div className="text-xs text-gray-500 mb-1">
                          Dekodiert ({currentPhrase.targetLanguage} 1:1):
                        </div>
                        <div className="min-h-[50px] mb-2 break-words">
                          {currentPhrase.targetSentence.split(' ').map((word, index) => {
                            // Check if this word should be highlighted
                            const shouldHighlight = highlightedWordIndex >= 0 && 
                              highlightedWordIndex < currentPhrase.decodedWords.length && 
                              currentPhrase.decodedWords[highlightedWordIndex].highlightIndices.includes(index);
                            
                            return (
                              <span
                                key={`decoded-${index}`}
                                className={`inline-block text-sm mr-1 rounded px-1 ${
                                  shouldHighlight ? `${currentPhrase.targetColor} text-white` : 'text-gray-800'
                                }`}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </div>
                        
                        {/* Progress indicator */}
                        <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary-500 transition-all duration-300"
                            style={{ 
                              width: `${(highlightedWordIndex / (currentPhrase.decodedWords.length - 1)) * 100}%`,
                            }}
                          ></div>
                        </div>
                        
                        {/* Small explanation */}
                        <div className="text-xs text-gray-500 italic mt-2">
                          Die Wörter werden wörtlich übersetzt, ohne grammatische Anpassung.
                        </div>
                      </div>
                      
                      {/* Birkenbihl Method Explanation */}
                      <div className="bg-gray-100 rounded-xl p-4 text-xs text-gray-800">
                        <div className="mb-2 font-semibold">{t('hero.birkenbihlMethod.title')}</div>
                        <ol className="space-y-2 list-decimal pl-4">
                          <li className="text-xs">
                            <span className="font-medium">{t('hero.birkenbihlMethod.decoding').split(':')[0]}:</span> {t('hero.birkenbihlMethod.decoding').split(':')[1]}
                          </li>
                          <li className="text-xs">
                            <span className="font-medium">{t('hero.birkenbihlMethod.activeListening').split(':')[0]}:</span> {t('hero.birkenbihlMethod.activeListening').split(':')[1]}
                          </li>
                          <li className="text-xs">
                            <span className="font-medium">{t('hero.birkenbihlMethod.passiveListening').split(':')[0]}:</span> {t('hero.birkenbihlMethod.passiveListening').split(':')[1]}
                          </li>
                          <li className="text-xs">
                            <span className="font-medium">{t('hero.birkenbihlMethod.activation').split(':')[0]}:</span> {t('hero.birkenbihlMethod.activation').split(':')[1]}
                          </li>
                        </ol>
                      </div>
                    </div>
                    
                    {/* Audio Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-center">
                      <button 
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isPlaying ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Reflection effect with pointer-events-none to ensure interactions work */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-20 pointer-events-none z-30"></div>
                </div>
                
                {/* Enhanced Reflection Effects - All with pointer-events-none */}
                <div className="absolute top-1/4 left-1/3 w-1/3 h-1/4 bg-white/5 rounded-full blur-sm pointer-events-none"></div>
                <div className="absolute bottom-1/3 right-1/4 w-1/5 h-1/5 bg-primary-400/10 rounded-full blur-md pointer-events-none"></div>
                
                {/* Subtle Pulse Effect with pointer-events-none */}
                <div className="absolute inset-[-8px] rounded-[45px] bg-primary-500/5 animate-pulse pointer-events-none"></div>
              </div>
              
              {/* Floating elements with pointer-events-none to prevent interference with interactions */}
              <div className="absolute top-1/4 -right-4 w-10 h-10 bg-primary-400/15 rounded-full blur-sm animate-float pointer-events-none"></div>
              <div className="absolute bottom-1/3 -left-6 w-12 h-12 bg-secondary-400/15 rounded-full blur-md animate-float pointer-events-none" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute top-1/2 -left-4 w-8 h-8 bg-accent-400/15 rounded-full blur-sm animate-float pointer-events-none" style={{animationDelay: '2.5s'}}></div>
            </motion.div>
          </div>
          
          {/* Text Content - Adjusted for mobile order */}
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Desktop title - hidden on mobile */}
              <div className="hidden md:block">
                <AnimatedText
                  text={t('hero.title')}
                  className="text-5xl lg:text-6xl font-bold text-white mb-4"
                  as="h1"
                  once={true}
                />
              </div>
              
              {/* Subtitle */}
              <AnimatedText
                text={t('hero.subtitle')}
                className="text-lg text-white/80 mb-8 max-w-xl mx-auto md:mx-0"
                as="p"
                delay={0.3}
                once={true}
              />
              
              {/* Benefits Checklist */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 text-white/80 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('hero.benefits.noGrammarRules')}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('hero.benefits.fromListenerToSpeaker')}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{t('hero.benefits.naturalLanguageFeel')}</span>
                </div>
              </div>
              
              {/* App Ratings and User Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                    <div className="text-yellow-400 text-lg">★★★★★</div>
                    <span className="text-white">{t('hero.appStoreRating')}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                    <span className="text-white font-semibold">100k+</span>
                    <span className="text-gray-300">{t('hero.satisfiedUsers')}</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Single CTA Button with App/Play Store Icon */}
              <div className="flex justify-center md:justify-start">
                {/* Updated Link to scroll to download section with combined store icon */}
                <Link to="/#download">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="shadow-lg shadow-primary-500/30 flex items-center gap-3 px-6 py-3"
                  >
                    {/* Custom App/Play Store combined icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24" fill="none">
                      {/* Apple half */}
                      <path d="M10.5 4.5C11.1 3.5 11.4 2.5 11.1 1.5C10.2 1.6 9.1 2.1 8.4 3.1C7.8 4 7.4 5 7.8 6C8.7 6.1 9.8 5.6 10.5 4.5Z" fill="currentColor"/>
                      <path d="M11.4 6.2C10.4 6.2 9.5 6.7 8.9 6.7C8.2 6.7 7.4 6.2 6.6 6.2C5.3 6.2 3.9 7.2 3.9 9.2C3.9 10.2 4.1 11.2 4.5 12.2C5 13.4 6.6 16.1 8.3 16C9.1 16 9.6 15.5 10.6 15.5C11.6 15.5 12 16 12.9 16C14.6 16 16 13.5 16.5 12.3C14.5 11.3 14 8.3 16 7.2C15.3 6.1 14.2 5.6 13.2 5.6C12.3 5.7 11.8 6.2 11.4 6.2Z" fill="currentColor"/>
                      {/* Play Store */}
                      <path d="M19 6.5L19 17.5L25 12L19 6.5Z" fill="currentColor"/>
                      <path d="M18 7.9V17.1L22.5 12.5L18 7.9Z" fill="white"/>
                    </svg>
                    {t('hero.startLearning')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Subtle Wave Divider at bottom - with pointer-events-none */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none z-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-16">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="rgba(255,255,255,0.05)"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="rgba(255,255,255,0.03)"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;