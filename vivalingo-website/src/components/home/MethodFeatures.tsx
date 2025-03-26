import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';
import { useLanguage } from '../../contexts/LanguageContext';

const MethodFeatures: React.FC = () => {
  const { t } = useLanguage();
  const featureRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featureRef, { once: true, amount: 0.3 });
  
  // Features data using translations
  const features = [
    {
      id: 1,
      title: t('methodFeatures.phases.0.title'),
      description: t('methodFeatures.phases.0.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      color: "from-primary-500 to-primary-600",
      delay: 0.1,
    },
    {
      id: 2,
      title: t('methodFeatures.phases.1.title'),
      description: t('methodFeatures.phases.1.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 011.414 1.414" />
        </svg>
      ),
      color: "from-secondary-500 to-secondary-600",
      delay: 0.2,
    },
    {
      id: 3,
      title: t('methodFeatures.phases.2.title'),
      description: t('methodFeatures.phases.2.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      color: "from-accent-500 to-accent-600",
      delay: 0.3,
    },
    {
      id: 4,
      title: t('methodFeatures.phases.3.title'),
      description: t('methodFeatures.phases.3.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
      delay: 0.4,
    },
  ];
  
  // Brain animation
  const brainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (brainRef.current) {
      const synapses = brainRef.current.querySelectorAll('.synapse');
      
      synapses.forEach((synapse) => {
        // Random delay
        const delay = Math.random() * 4;
        
        gsap.fromTo(
          synapse,
          { 
            opacity: 0.3,
            scale: 0.8,
          },
          { 
            opacity: 1,
            scale: 1.2,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: delay,
          }
        );
      });
    }
  }, []);
  
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('methodFeatures.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t('methodFeatures.subtitle')}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" ref={featureRef}>
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 flex items-start">
                <div className={`flex-shrink-0 rounded-lg p-3 mr-4 bg-gradient-to-r ${feature.color} text-white`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Brain visualization */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl overflow-hidden shadow-xl p-8 mt-16">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-4"
            >
              {t('methodFeatures.brainLearning.title')}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-600 mb-4"
            >
              {t('methodFeatures.brainLearning.description1')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 mb-6"
            >
              {t('methodFeatures.brainLearning.description2')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button variant="primary">{t('methodFeatures.brainLearning.button')}</Button>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div 
              ref={brainRef}
              className="aspect-square max-w-md mx-auto relative"
            >
              {/* Brain outline SVG */}
              <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 180C145.228 180 182 143.228 182 98C182 52.7715 145.228 16 100 16C54.7715 16 18 52.7715 18 98C18 143.228 54.7715 180 100 180Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M100 16C100 16 120 42 120 98C120 154 100 180 100 180" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M100 16C100 16 80 42 80 98C80 154 100 180 100 180" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M42 48C42 48 70 58 100 58C130 58 158 48 158 48" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M42 148C42 148 70 138 100 138C130 138 158 148 158 148" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M54 30C54 30 64 66 64 98C64 130 54 166 54 166" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M146 30C146 30 136 66 136 98C136 130 146 166 146 166" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {/* Brain synapses */}
              <div className="synapse absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary-500 opacity-80"></div>
              <div className="synapse absolute top-1/3 left-2/3 w-2 h-2 rounded-full bg-secondary-500 opacity-80"></div>
              <div className="synapse absolute top-2/3 left-1/3 w-4 h-4 rounded-full bg-accent-500 opacity-80"></div>
              <div className="synapse absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-purple-500 opacity-80"></div>
              <div className="synapse absolute top-1/5 left-1/2 w-2 h-2 rounded-full bg-primary-400 opacity-80"></div>
              <div className="synapse absolute top-3/4 left-3/4 w-3 h-3 rounded-full bg-secondary-400 opacity-80"></div>
              <div className="synapse absolute top-2/5 left-2/5 w-2 h-2 rounded-full bg-accent-400 opacity-80"></div>
              <div className="synapse absolute top-3/5 left-4/5 w-4 h-4 rounded-full bg-purple-400 opacity-80"></div>
              
              {/* Brain connections */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 50L100 100" stroke="rgba(14, 152, 240, 0.4)" strokeWidth="1" strokeDasharray="2 2"/>
                <path d="M150 50L100 100" stroke="rgba(240, 58, 106, 0.4)" strokeWidth="1" strokeDasharray="2 2"/>
                <path d="M50 150L100 100" stroke="rgba(188, 188, 35, 0.4)" strokeWidth="1" strokeDasharray="2 2"/>
                <path d="M150 150L100 100" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" strokeDasharray="2 2"/>
                <path d="M40 100L160 100" stroke="rgba(14, 152, 240, 0.3)" strokeWidth="1" strokeDasharray="3 3"/>
                <path d="M100 40L100 160" stroke="rgba(240, 58, 106, 0.3)" strokeWidth="1" strokeDasharray="3 3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodFeatures;