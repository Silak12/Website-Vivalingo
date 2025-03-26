import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedText from '../components/shared/AnimatedText';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';

const AGB: React.FC = () => {
  const { t } = useLanguage();
  const pageRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Background animation effects
  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        {
          scale: 0.9,
          opacity: 0.6,
        },
        {
          scale: 1.05,
          opacity: 0.8,
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
    }
  }, []);
  
  // Subtle floating particles
  useEffect(() => {
    if (particlesRef.current) {
      const particlesContainer = particlesRef.current;
      const numberOfParticles = window.innerWidth < 768 ? 3 : 6;
      
      particlesContainer.innerHTML = '';
      
      for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        
        const size = Math.random() * 8 + 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.pointerEvents = 'none';
        
        particlesContainer.appendChild(particle);
        
        gsap.to(particle, {
          y: '-=30',
          x: `+=${Math.random() * 20 - 10}`,
          opacity: 0,
          duration: 8 + Math.random() * 6,
          ease: 'power1.out',
          repeat: -1,
          repeatRefresh: true,
          delay: Math.random() * 5
        });
      }
    }
  }, []);
  
  // Date formating
  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Define features array for section 2
  const featuresSection2 = [
    t('agb.sections.2.features.0'),
    t('agb.sections.2.features.1'),
    t('agb.sections.2.features.2'),
    t('agb.sections.2.features.3'),
    t('agb.sections.2.features.4')
  ];
  
  // Define plans array for section 5
  const plansSection5 = [
    t('agb.sections.5.plans.0'),
    t('agb.sections.5.plans.1'),
    t('agb.sections.5.plans.2')
  ];
  
  // Define obligations array for section 8
  const obligationsSection8 = [
    t('agb.sections.8.obligations.0'),
    t('agb.sections.8.obligations.1'),
    t('agb.sections.8.obligations.2'),
    t('agb.sections.8.obligations.3'),
    t('agb.sections.8.obligations.4'),
    t('agb.sections.8.obligations.5')
  ];
  
  return (
    <Layout>
      <div ref={pageRef} className="relative min-h-screen py-20">
        {/* Background with subtle gradient */}
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
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary-300/10 to-secondary-300/10 blur-3xl"
          />
        </div>
        
        {/* Subtle Floating Particles */}
        <div 
          ref={particlesRef}
          className="absolute inset-0 z-1 overflow-hidden pointer-events-none"
        ></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-3xl">
          <div className="text-center mb-12">
            <AnimatedText
              text={t('agb.title')}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              as="h1"
            />
          </div>
          
          {/* AGB content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10 mb-12"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-sm text-gray-400 mb-6">
                {t('agb.lastUpdated')}: {formatDate()}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.1.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.1.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.2.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.sections.2.content')}
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                {featuresSection2.map((feature, index) => (
                  <li key={index} className="mb-2">{feature}</li>
                ))}
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.3.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.3.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.4.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.4.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.5.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.sections.5.content')}
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                {plansSection5.map((plan, index) => (
                  <li key={index} className="mb-2">{plan}</li>
                ))}
              </ul>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.5.payment')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.6.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.6.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.7.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.7.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.8.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('agb.sections.8.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                {obligationsSection8.map((obligation, index) => (
                  <li key={index} className="mb-2">{obligation}</li>
                ))}
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.9.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.9.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.10.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.10.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.11.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.11.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.12.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.12.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.13.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.13.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.14.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.14.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.15.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.15.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.16.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.16.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.17.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('agb.sections.17.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('agb.sections.18.title')}</h2>
              <p className="text-gray-300">
                {t('agb.sections.18.content')}
                <br /><br />
                {t('agb.sections.18.contactInfo.name')}<br />
                {t('agb.sections.18.contactInfo.street')}<br />
                {t('agb.sections.18.contactInfo.location')}<br />
                <a href={`mailto:${t('agb.sections.18.contactInfo.email')}`} className="text-primary-300 hover:text-primary-200">
                  {t('agb.sections.18.contactInfo.email')}
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AGB;