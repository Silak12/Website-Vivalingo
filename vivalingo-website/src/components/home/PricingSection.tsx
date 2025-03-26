import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';
import AnimatedText from '../shared/AnimatedText';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const PricingSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly' | 'lifetime'>('yearly');
  
  // Refs for animation elements
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Helper function to safely get translated arrays
  const getTranslatedArray = (key: string): string[] => {
    const translation = t(key, { returnObjects: true });
    return Array.isArray(translation) ? translation : [];
  };

  // Dynamic pricing content based on active tab
  const getPricingDetails = () => {
    switch(activeTab) {
      case 'monthly':
        return {
          price: t('pricingSection.cards.monthly.price'),
          period: t('pricingSection.cards.monthly.period'),
          savings: t('pricingSection.cards.monthly.savings'),
          features: getTranslatedArray('pricingSection.features.monthly'),
          freeTrialAvailable: true
        };
      case 'yearly':
        return {
          price: t('pricingSection.cards.yearly.price'),
          period: t('pricingSection.cards.yearly.period'),
          savings: t('pricingSection.cards.yearly.savings'),
          features: getTranslatedArray('pricingSection.features.yearly'),
          freeTrialAvailable: true
        };
      case 'lifetime':
        return {
          price: t('pricingSection.cards.lifetime.price'),
          period: t('pricingSection.cards.lifetime.period'),
          savings: t('pricingSection.cards.lifetime.savings'),
          features: getTranslatedArray('pricingSection.features.lifetime'),
          freeTrialAvailable: false
        };
      default:
        return {
          price: t('pricingSection.cards.monthly.price'),
          period: t('pricingSection.cards.monthly.period'),
          savings: t('pricingSection.cards.monthly.savings'),
          features: [],
          freeTrialAvailable: true
        };
    }
  };

  const details = getPricingDetails();

  // Enhanced background effects
  useEffect(() => {
    if (circleRef.current) {
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
    }
  }, []);
  
  // Create floating particles
  useEffect(() => {
    if (particlesRef.current) {
      // Create particles
      const particlesContainer = particlesRef.current;
      const numberOfParticles = window.innerWidth < 768 ? 4 : 8;
      
      // Clear existing particles
      particlesContainer.innerHTML = '';
      
      for (let i = 0; i < numberOfParticles; i++) {
        // Create a particle
        const particle = document.createElement('div');
        
        // Random size
        const size = Math.random() * 10 + 3;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Apply styles with pointer-events-none
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.pointerEvents = 'none';
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Animate with GSAP
        gsap.to(particle, {
          y: '-=30',
          x: `+=${Math.random() * 20 - 10}`,
          opacity: 0,
          duration: 6 + Math.random() * 6,
          ease: 'power1.out',
          repeat: -1,
          repeatRefresh: true,
          delay: Math.random() * 4
        });
      }
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="pricing" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Enhanced background with subtle gradient */}
      <div className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(10,10,30,0.95), rgba(30,30,80,0.9), rgba(10,10,30,0.95))`,
          transform: 'scale(1.02)'
        }}
      ></div>
      
      {/* Background Circle Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div 
          ref={circleRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-300/20 to-secondary-300/20 blur-3xl"
        />
      </div>
      
      {/* Floating Particles */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 z-1 overflow-hidden pointer-events-none"
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <AnimatedText
            text={t('pricingSection.title')}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            as="h2"
          />
          <AnimatedText
            text={t('pricingSection.subtitle')}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            as="p"
            delay={0.2}
          />
        </div>
        
        {/* Pricing Tabs - Glassmorphism styling */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-full flex items-center border border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`flex-1 py-2.5 rounded-full text-center transition-all duration-300 ${
                activeTab === 'monthly' ? 'bg-primary-500 text-white shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              {t('pricingSection.tabs.monthly')}
            </button>
            <button
              onClick={() => setActiveTab('yearly')}
              className={`flex-1 py-2.5 rounded-full text-center transition-all duration-300 relative ${
                activeTab === 'yearly' ? 'bg-primary-500 text-white shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="flex flex-col items-center justify-center">
                <span>{t('pricingSection.tabs.yearly')}</span>
                <span className={`text-xs font-medium ${activeTab === 'yearly' ? 'text-white/80' : 'text-green-300'}`}>
                  {t('pricingSection.tabs.yearlySavings')}
                </span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('lifetime')}
              className={`flex-1 py-2.5 rounded-full text-center transition-all duration-300 relative ${
                activeTab === 'lifetime' ? 'bg-primary-500 text-white shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="flex flex-col items-center justify-center">
                <span>{t('pricingSection.tabs.lifetime')}</span>
                <span className={`text-xs font-medium ${activeTab === 'lifetime' ? 'text-white/80' : 'text-yellow-300'}`}>
                  {t('pricingSection.tabs.lifetimeBestValue')}
                </span>
              </span>
            </button>
          </div>
        </div>
        
        {/* Main Pricing Card - Glassmorphism styling */}
        <motion.div
          key={activeTab} // This forces re-render and animation when tab changes
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 mb-12"
        >
          {/* Card Header */}
          <div className="relative bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-8 text-white">
            {activeTab === 'lifetime' && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-primary-900 font-bold px-4 py-2 rounded-bl-lg flex items-center">
                <span className="mr-1">👑</span> {t('pricingSection.cards.lifetime.tag')}
              </div>
            )}
            {activeTab === 'yearly' && (
              <div className="absolute top-0 right-0 bg-green-400 text-green-900 font-bold px-4 py-2 rounded-bl-lg flex items-center">
                <span className="mr-1">⭐</span> {t('pricingSection.cards.yearly.tag')}
              </div>
            )}
            
            <h3 className="text-xl font-bold mb-2 flex items-center">
              {activeTab === 'monthly' && t('pricingSection.cards.monthly.title')}
              {activeTab === 'yearly' && t('pricingSection.cards.yearly.title')}
              {activeTab === 'lifetime' && t('pricingSection.cards.lifetime.title')}
            </h3>
            
            <div className="flex items-baseline">
              <span className="text-5xl font-bold">€{details.price}</span>
              <span className="ml-2 text-lg opacity-90">/{details.period}</span>
            </div>
            
            {details.savings && (
              <div className="mt-2 inline-block bg-white/20 rounded-full px-3 py-1 text-sm">
                {details.savings}
              </div>
            )}
          </div>
          
          {/* Card Body */}
          <div className="p-8">
            <div className="mb-6">
              <div className="text-lg font-semibold mb-4 text-white">{t('pricingSection.features.title')}</div>
              <motion.ul 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {details.features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    variants={itemVariants}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-500/30 flex items-center justify-center mt-0.5">
                      <svg className="h-3 w-3 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-200">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            {details.freeTrialAvailable && (
              <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg mb-8 border border-white/5">
                <div className="font-medium text-white mb-2 flex items-center">
                  <span className="mr-2">🎁</span> {t('pricingSection.freeTrial.title')}
                </div>
                <p className="text-sm text-gray-300">
                  {t('pricingSection.freeTrial.description')}
                </p>
              </div>
            )}
            
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1 flex items-center justify-center bg-white/5 border-white/20 text-white hover:bg-white/10"
                  icon={<span className="mr-2">🍎</span>}
                >
                  {t('pricingSection.buttons.appStore')}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1 flex items-center justify-center bg-white/5 border-white/20 text-white hover:bg-white/10"
                  icon={<span className="mr-2">🤖</span>}
                >
                  {t('pricingSection.buttons.playStore')}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section - Similar to download section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mt-16"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;