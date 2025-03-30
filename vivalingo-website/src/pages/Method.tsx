import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Button from '../components/shared/Button';
import AnimatedText from '../components/shared/AnimatedText';
import { useLanguage } from '../contexts/LanguageContext';

const Method: React.FC = () => {
  const { t } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const methodContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  const [activePhase, setActivePhase] = useState(1);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Enhanced background effects and parallax
  useEffect(() => {
    if (methodContainerRef.current && circleRef.current) {
      const methodElement = methodContainerRef.current;
      
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
      
      // Create subtle follow effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = methodElement.getBoundingClientRect();
        
        const x = clientX - left;
        const y = clientY - top;
        
        // Subtle parallax movement
        const moveX = (x - width / 2) / 40;
        const moveY = (y - height / 2) / 40;
        
        gsap.to(circleRef.current, {
          x: moveX,
          y: moveY,
          duration: 1.2,
          ease: 'power2.out',
        });
      };
      
      methodElement.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        methodElement.removeEventListener('mousemove', handleMouseMove);
        gsap.killTweensOf(circleRef.current);
      };
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
        
        // Apply styles with pointer-events-none to ensure they don't interfere with interactions
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
  
  // Animation for timeline and phases
  useEffect(() => {
    if (timelineRef.current) {
      const timeline = timelineRef.current;
      const phases = timeline.querySelectorAll('.phase-circle');
      
      // Set up a scroll trigger for each phase
      phases.forEach((phase, index) => {
        gsap.to(phase, {
          scrollTrigger: {
            trigger: phase,
            start: "top 70%",
            onEnter: () => setActivePhase(index + 1),
            onEnterBack: () => setActivePhase(index + 1)
          }
        });
      });
    }
  }, []);
  
  // Phases content - expanded with more details and using translations
  const phases = [
    {
      number: 1,
      title: t('method.phases.items.0.title'),
      description: t('method.phases.items.0.description'),
      color: "bg-primary-500",
      textColor: "text-primary-500",
      shadowColor: "shadow-primary-500/20",
      icon: "🧠",
      appFeature: t('method.phases.items.0.appFeature')
    },
    {
      number: 2,
      title: t('method.phases.items.1.title'),
      description: t('method.phases.items.1.description'),
      color: "bg-secondary-500",
      textColor: "text-secondary-500",
      shadowColor: "shadow-secondary-500/20",
      icon: "🔊",
      appFeature: t('method.phases.items.1.appFeature')
    },
    {
      number: 3,
      title: t('method.phases.items.2.title'),
      description: t('method.phases.items.2.description'),
      color: "bg-accent-500",
      textColor: "text-accent-500",
      shadowColor: "shadow-accent-500/20",
      icon: "👂",
      appFeature: t('method.phases.items.2.appFeature')
    },
    {
      number: 4,
      title: t('method.phases.items.3.title'),
      description: t('method.phases.items.3.description'),
      color: "bg-purple-500",
      textColor: "text-purple-500",
      shadowColor: "shadow-purple-500/20",
      icon: "🎯",
      appFeature: t('method.phases.items.3.appFeature')
    }
  ];
  
  // Benefits data using translations
  const benefits = [
    {
      title: t('method.benefits.items.0.title'),
      description: t('method.benefits.items.0.description'),
      icon: "🧠",
      color: "bg-primary-400/20",
      borderColor: "border-primary-400/30",
      delay: 0.1
    },
    {
      title: t('method.benefits.items.1.title'),
      description: t('method.benefits.items.1.description'),
      icon: "💡",
      color: "bg-secondary-400/20",
      borderColor: "border-secondary-400/30",
      delay: 0.2
    },
    {
      title: t('method.benefits.items.2.title'),
      description: t('method.benefits.items.2.description'),
      icon: "😌",
      color: "bg-accent-400/20",
      borderColor: "border-accent-400/30",
      delay: 0.3
    },
    {
      title: t('method.benefits.items.3.title'),
      description: t('method.benefits.items.3.description'),
      icon: "🔄",
      color: "bg-primary-400/20",
      borderColor: "border-primary-400/30",
      delay: 0.4
    },
    {
      title: t('method.benefits.items.4.title'),
      description: t('method.benefits.items.4.description'),
      icon: "📚",
      color: "bg-secondary-400/20",
      borderColor: "border-secondary-400/30",
      delay: 0.5
    },
    {
      title: t('method.benefits.items.5.title'),
      description: t('method.benefits.items.5.description'),
      icon: "👨‍👩‍👧‍👦",
      color: "bg-accent-400/20",
      borderColor: "border-accent-400/30",
      delay: 0.6
    }
  ];
  
  return (
    <div ref={methodContainerRef} className="relative overflow-hidden">
      {/* Hero Header with enhanced design */}
      <motion.div 
        ref={headerRef}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          opacity: headerOpacity,
          y: headerY
        }}
      >
        {/* Enhanced background with subtle gradient */}
        <div className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `linear-gradient(135deg, rgba(10,10,40,0.95), rgba(40,40,100,0.9), rgba(10,10,40,0.95))`,
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
        
        <div className="container-custom relative z-10 text-center">
          <AnimatedText
            text={t('method.hero.title')}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            as="h1"
          />
          
          <AnimatedText
            text={t('method.hero.subtitle')}
            className="text-xl text-gray-200 max-w-2xl mx-auto mb-8"
            as="p"
            delay={0.2}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
          </motion.div>
          
          {/* Added ratings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8"
          >
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <span className="text-white">{t('method.hero.ratings.enthusiasts')}</span>
              </div>
              
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                <span className="text-white font-semibold">{t('method.hero.ratings.scientific')}</span>
                <span className="text-gray-300">{t('method.hero.ratings.foundedOn')}</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/70 text-sm mb-2">{t('method.hero.scrollDown')}</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </motion.div>
      
      {/* Introduction with enhanced design */}
      <section className="py-20 relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-white/95 z-0"></div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 md:pr-10 mb-10 md:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t('method.intro.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('method.intro.paragraphs.0')}
              </p>
              <p className="text-gray-700 mb-4">
                {t('method.intro.paragraphs.1')}
              </p>
              
              {/* Added callout box */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-l-4 border-primary-500 p-4 rounded-r-lg shadow-sm my-6">
                <p className="text-gray-700 italic">
                  {t('method.intro.quote')}
                </p>
              </div>
              
              <p className="text-gray-700">
                {t('method.intro.appDescription')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* The 4 Phases with enhanced timeline and cards */}
      <section className="py-20 relative overflow-hidden">
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 z-0"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              {t('method.phases.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              {t('method.phases.subtitle')}
            </motion.p>
          </div>
          
          {/* Enhanced Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline line - Behind everything with z-0 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 via-secondary-200 to-purple-200 z-0 rounded-full opacity-70"></div>
            
            {/* Timeline phases */}
            <div 
              ref={timelineRef}
              className="relative z-10 space-y-24"
            >
              {phases.map((phase, index) => (
                <div key={phase.number} className="relative">
                  {/* Phase circle on timeline */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`phase-circle ${phase.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white font-bold shadow-lg ${phase.shadowColor} border-4 border-white transition-all duration-500 ${activePhase === phase.number ? 'scale-110' : 'scale-90 opacity-70'}`}>
                      {phase.icon}
                    </div>
                  </div>
                  
                  {/* Phase content card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                    className={`bg-white rounded-xl shadow-xl overflow-hidden max-w-3xl mx-auto ${index % 2 === 0 ? 'md:ml-auto md:mr-24' : 'md:mr-auto md:ml-24'} relative z-20`}
                  >
                    <div className={`h-2 ${phase.color} w-full`}></div>
                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 rounded-full ${phase.color} flex items-center justify-center text-white text-lg mr-4`}>
                          {phase.number}
                        </div>
                        <h3 className={`text-2xl font-bold ${phase.textColor}`}>
                          {phase.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {phase.description}
                      </p>
                      
                      {/* App feature highlight */}
                      <div className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-5 border-l-4 ${phase.color} shadow-md`}>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {t('method.phases.appFeatureTitle')}
                        </h4>
                        <p className="text-gray-600">
                          {phase.appFeature}
                        </p>
                        
                        {/* Phase 2 specific additions */}
                        {phase.number === 2 && (
                          <div className="mt-4 flex items-center space-x-4">
                            <div className="flex items-center bg-secondary-100 p-2 rounded-lg">
                              <span className="text-lg mr-2">🐢</span>
                              <span className="text-sm text-gray-700">{t('method.phases.items.1.slow')}</span>
                            </div>
                            <div className="flex items-center bg-secondary-100 p-2 rounded-lg">
                              <span className="text-lg mr-2">🐇</span>
                              <span className="text-sm text-gray-700">{t('method.phases.items.1.fast')}</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Phase 4 specific additions */}
                        {phase.number === 4 && (
                          <div className="mt-4 p-3 bg-purple-50 rounded-md border border-purple-100">
                            <p className="text-sm text-gray-600 italic">
                              {t('method.phases.items.3.practiceNote')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section with enhanced gradient background */}
      <section className="py-20 relative overflow-hidden">
        {/* Enhanced background with gradient and subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-800 to-primary-900 z-0">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              {t('method.benefits.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-200 max-w-2xl mx-auto"
            >
              {t('method.benefits.subtitle')}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: benefit.delay }}
                viewport={{ once: true }}
                className={`${benefit.color} backdrop-blur-sm rounded-xl p-6 border ${benefit.borderColor} transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <div className="text-4xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - enhanced with similar design to download section */}
      <section className="py-16 relative overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white z-0"></div>
        
        <div className="container-custom relative z-10">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-xl overflow-hidden relative">
            {/* Floating elements similar to download section */}
            <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
            <div className="absolute bottom-1/3 left-1/5 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
            
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center relative z-10">
              <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-white mb-4"
                >
                  {t('method.cta.title')}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-white/90 mb-6"
                >
                  {t('method.cta.description')}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-4"
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className="shadow-lg shadow-secondary-500/20 flex items-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    {t('method.cta.iosDownload')}
                  </Button>
                  
                  <Button
                    variant="white"
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-white/90 shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 20.5V3.5c0-.85.44-1.59 1.1-2.02L14.5 12 4.1 22.52c-.66-.43-1.1-1.17-1.1-2.02zM18.77 12L7 3.78l8.49 8.49-8.49 8.49L18.77 12zm-4.31 0l-1.65 9.71L5.21 12l7.6-9.71L14.46 12z" />
                    </svg>
                    {t('method.cta.androidDownload')}
                  </Button>
                </motion.div>
              </div>
              <div className="w-full md:w-1/3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Glow effect around the phone */}
                  <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl"></div>
                  
                  {/* Phone mockup */}
                  <div className="relative w-[200px] h-[400px] mx-auto rounded-[30px] border-[10px] border-gray-800 bg-gray-900 shadow-2xl overflow-hidden">
                    <img
                      src="https://via.placeholder.com/300x600.png/0a0a0a/ffffff?text=VivaLaLingo+App"
                      alt="VivaLaLingo App"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Method;