import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedText from '../components/shared/AnimatedText';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';

const Datenschutz: React.FC = () => {
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
  
  // Define data purposes array
  const dataPurposes = [
    t('privacy.purposes.items.0'),
    t('privacy.purposes.items.1'),
    t('privacy.purposes.items.2'),
    t('privacy.purposes.items.3'),
    t('privacy.purposes.items.4'),
    t('privacy.purposes.items.5')
  ];
  
  // Define legal basis array
  const legalBases = [
    t('privacy.legalBasis.items.0'),
    t('privacy.legalBasis.items.1'),
    t('privacy.legalBasis.items.2')
  ];
  
  // Define data sharing array
  const dataSharing = [
    t('privacy.dataSharing.items.0'),
    t('privacy.dataSharing.items.1'),
    t('privacy.dataSharing.items.2')
  ];
  
  // Define user rights array
  const userRights = [
    t('privacy.userRights.items.0'),
    t('privacy.userRights.items.1'),
    t('privacy.userRights.items.2'),
    t('privacy.userRights.items.3'),
    t('privacy.userRights.items.4'),
    t('privacy.userRights.items.5'),
    t('privacy.userRights.items.6')
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
              text={t('privacy.title')}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              as="h1"
            />
          </div>
          
          {/* Datenschutz content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10 mb-12"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-sm text-gray-400 mb-6">
                {t('privacy.lastUpdated')}: {formatDate()}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.introduction.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('privacy.introduction.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.dataController.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('privacy.dataController.content')}
                <br /><br />
                
                {t('privacy.dataController.name')}<br />
                {t('privacy.dataController.street')}<br />
                {t('privacy.dataController.location')}<br /><br />
                
                {t('privacy.dataController.email')}: <a href={`mailto:${t('privacy.dataController.emailAddress')}`} className="text-primary-300 hover:text-primary-200">
                  {t('privacy.dataController.emailAddress')}
                </a>
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.collectedData.title')}</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">{t('privacy.collectedData.account.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('privacy.collectedData.account.content')}
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">{t('privacy.collectedData.usage.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('privacy.collectedData.usage.content')}
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">{t('privacy.collectedData.audio.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('privacy.collectedData.audio.content')}
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">{t('privacy.collectedData.payment.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('privacy.collectedData.payment.content')}
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">{t('privacy.collectedData.automatic.title')}</h3>
              <p className="text-gray-300 mb-4">
                {t('privacy.collectedData.automatic.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">{t('privacy.purposes.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.purposes.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                {dataPurposes.map((purpose, index) => (
                  <li key={index} className="mb-2">{purpose}</li>
                ))}
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.legalBasis.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('privacy.legalBasis.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                {legalBases.map((basis, index) => (
                  <li key={index} className="mb-2">{basis}</li>
                ))}
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.dataSharing.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.dataSharing.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                {dataSharing.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-semibold text-white mb-3">{t('privacy.dataSharing.thirdParty.title')}</h3>
              
              <h4 className="text-lg font-semibold text-white mb-2">{t('privacy.dataSharing.thirdParty.firebase.title')}</h4>
              <p className="text-gray-300 mb-4">
                {t('privacy.dataSharing.thirdParty.firebase.content')} 
                <a href={t('privacy.dataSharing.thirdParty.firebase.policyUrl')} target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 ml-1">
                  {t('privacy.dataSharing.thirdParty.firebase.policyUrl')}
                </a>
              </p>
              
              <h4 className="text-lg font-semibold text-white mb-2">{t('privacy.dataSharing.thirdParty.revenueCat.title')}</h4>
              <p className="text-gray-300 mb-4">
                {t('privacy.dataSharing.thirdParty.revenueCat.content')}
                <a href={t('privacy.dataSharing.thirdParty.revenueCat.policyUrl')} target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 ml-1">
                  {t('privacy.dataSharing.thirdParty.revenueCat.policyUrl')}
                </a>
              </p>
              
              <h4 className="text-lg font-semibold text-white mb-2">{t('privacy.dataSharing.thirdParty.appStores.title')}</h4>
              <p className="text-gray-300 mb-6">
                {t('privacy.dataSharing.thirdParty.appStores.content')}
                <br />
                <a href={t('privacy.dataSharing.thirdParty.appStores.applePolicyUrl')} target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 block mt-2">
                  {t('privacy.dataSharing.thirdParty.appStores.appleLabel')}: {t('privacy.dataSharing.thirdParty.appStores.applePolicyUrl')}
                </a>
                <a href={t('privacy.dataSharing.thirdParty.appStores.googlePolicyUrl')} target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 block mt-1">
                  {t('privacy.dataSharing.thirdParty.appStores.googleLabel')}: {t('privacy.dataSharing.thirdParty.appStores.googlePolicyUrl')}
                </a>
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.userRights.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('privacy.userRights.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                {userRights.map((right, index) => (
                  <li key={index} className="mb-2">{right}</li>
                ))}
              </ul>
              <p className="text-gray-300 mb-6">
                {t('privacy.userRights.exerciseRights')}
                <a href={`mailto:${t('privacy.userRights.email')}`} className="text-primary-300 hover:text-primary-200 mx-1">
                  {t('privacy.userRights.email')}
                </a>.
                {t('privacy.userRights.complaint')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.childrenPrivacy.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('privacy.childrenPrivacy.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.dataSecurity.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('privacy.dataSecurity.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.dataRetention.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('privacy.dataRetention.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.cookies.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('privacy.cookies.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.changes.title')}</h2>
              <p className="text-gray-300 mb-6">
                {t('privacy.changes.content')}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">{t('privacy.contact.title')}</h2>
              <p className="text-gray-300">
                {t('privacy.contact.content')}
                <br /><br />
                {t('privacy.contact.name')}<br />
                {t('privacy.contact.street')}<br />
                {t('privacy.contact.location')}<br />
                <a href={`mailto:${t('privacy.contact.email')}`} className="text-primary-300 hover:text-primary-200">
                  {t('privacy.contact.email')}
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Datenschutz;