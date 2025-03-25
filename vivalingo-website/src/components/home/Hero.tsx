import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';
import AnimatedText from '../shared/AnimatedText';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current && circleRef.current) {
      const heroElement = heroRef.current;
      const circleElement = circleRef.current;
      
      // Initialize GSAP animation
      gsap.fromTo(
        circleElement,
        {
          scale: 0.8,
          opacity: 0.7,
        },
        {
          scale: 1.05,
          opacity: 0.9,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
      
      // Create follow effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = heroElement.getBoundingClientRect();
        
        const x = clientX - left;
        const y = clientY - top;
        
        const moveX = (x - width / 2) / 20;
        const moveY = (y - height / 2) / 20;
        
        gsap.to(circleElement, {
          x: moveX,
          y: moveY,
          duration: 1,
          ease: 'power1.out',
        });
      };
      
      heroElement.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        gsap.killTweensOf(circleElement);
      };
    }
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20"
    >
      {/* Background Circle Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          ref={circleRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-200/30 to-secondary-200/30 blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedText
                text="Learn Languages Naturally"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                as="h1"
                once={true}
              />
              
              <AnimatedText
                text="Experience the power of the Birkenbihl method with Vivalingo. Learn without grammar rules, intuitively. Just like you learned your first language."
                className="text-lg text-white/80 mb-8 max-w-xl mx-auto md:mx-0"
                as="p"
                delay={0.3}
                once={true}
              />
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="shadow-lg shadow-primary-500/30"
                >
                  Start Learning Now
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  See How It Works
                </Button>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 text-white/80">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>One-time purchase</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No subscription</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Just 4,99€</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* App mockup */}
              <div className="relative mx-auto w-[300px] h-[600px] rounded-[40px] overflow-hidden border-8 border-gray-800 shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-[30px] bg-gray-800 z-10">
                  <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-[100px] h-[10px] bg-gray-700 rounded-full"></div>
                </div>
                
                <img 
                  src="https://via.placeholder.com/300x600.png/0a0a0a/ffffff?text=Vivalingo+App" 
                  alt="Vivalingo App" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* App UI elements */}
                <div className="absolute bottom-10 left-4 right-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-white text-sm mb-2">Hola, ¿cómo estás?</div>
                  <div className="text-white/70 text-xs">Hello, how are you?</div>
                  <div className="mt-3 flex justify-between">
                    <button className="p-2 bg-white/20 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 15.536L9.879 21.192M3.879 15.192L9.536 9.535M15.535 9.535L3.878 21.192M21.192 3.877L9.536 15.535" />
                      </svg>
                    </button>
                    <button className="p-2 bg-primary-500 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-white/20 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-1/4 -left-10 w-20 h-20 bg-accent-400/20 rounded-full backdrop-blur-md animate-float"></div>
              <div className="absolute top-1/2 -right-6 w-16 h-16 bg-primary-400/20 rounded-full backdrop-blur-md animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-1/4 -left-14 w-24 h-24 bg-secondary-400/20 rounded-full backdrop-blur-md animate-float" style={{ animationDelay: '1s' }}></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;