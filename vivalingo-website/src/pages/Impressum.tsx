import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedText from '../components/shared/AnimatedText';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';

const Impressum: React.FC = () => {
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
              text={t('impressum.title')}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              as="h1"
            />
          </div>
          
          {/* Impressum content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10 mb-12"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-6">{t('impressum.companyInfo.title')}</h2>
              
              <p className="text-gray-300 mb-4">
                {t('impressum.companyInfo.name')}<br />
                {t('impressum.companyInfo.street')}<br />
                {t('impressum.companyInfo.location')}
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-4 mt-8">{t('impressum.contact.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('impressum.contact.email')}: <a href={`mailto:${t('impressum.contact.emailAddress')}`} className="text-primary-300 hover:text-primary-200">
                  {t('impressum.contact.emailAddress')}
                </a><br />
                {t('impressum.contact.website')}: <a href={t('impressum.contact.websiteUrl')} target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200">
                  {t('impressum.contact.websiteUrl')}
                </a>
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-4 mt-8">{t('impressum.vatId.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('impressum.vatId.description')}<br />
                {t('impressum.vatId.number')}
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-4 mt-8">{t('impressum.responsible.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('impressum.responsible.name')}<br />
                {t('impressum.responsible.street')}<br />
                {t('impressum.responsible.location')}
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-4 mt-8">{t('impressum.disputeResolution.euTitle')}</h3>
              <p className="text-gray-300 mb-4">
                {t('impressum.disputeResolution.euDescription')} 
                <a href={t('impressum.disputeResolution.euLink')} target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200">
                  {t('impressum.disputeResolution.euLink')}
                </a>.
                {t('impressum.disputeResolution.emailNote')}
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-4 mt-8">{t('impressum.disputeResolution.generalTitle')}</h3>
              <p className="text-gray-300">
                {t('impressum.disputeResolution.generalDescription')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Impressum;