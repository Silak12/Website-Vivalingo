import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';
import WaveDivider from '../shared/WaveDivider';

const DownloadCTA: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  // Parallax-Effekt für Hintergrund
  useEffect(() => {
    if (bgRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const moveX = (clientX - windowWidth / 2) / 50;
        const moveY = (clientY - windowHeight / 2) / 50;
        
        gsap.to(bgRef.current, {
          x: moveX,
          y: moveY,
          duration: 1,
          ease: "power2.out"
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);
  
  // Smartphone schwebt und tilt bei Mausbewegung
  useEffect(() => {
    if (phoneRef.current) {
      // Schwebende Animation
      gsap.to(phoneRef.current, {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      
      // Neigungseffekt bei Mausbewegung
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Berechne Neigungswinkel basierend auf Mausposition
        const tiltX = (clientY - windowHeight / 2) / 20;
        const tiltY = (windowWidth / 2 - clientX) / 20;
        
        gsap.to(phoneRef.current, {
          rotateX: tiltX,
          rotateY: tiltY,
          duration: 1,
          ease: "power2.out"
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);
  
  // Erstelle schwebende Partikel
  useEffect(() => {
    if (particlesRef.current) {
      // Erstelle Partikel
      const particlesContainer = particlesRef.current;
      const numberOfParticles = window.innerWidth < 768 ? 10 : 20;
      
      // Lösche bestehende Partikel
      particlesContainer.innerHTML = '';
      
      for (let i = 0; i < numberOfParticles; i++) {
        // Erstelle ein Partikel
        const particle = document.createElement('div');
        
        // Zufällige Größe
        const size = Math.random() * 15 + 5;
        
        // Zufällige Position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Wende Stile an
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Zum Container hinzufügen
        particlesContainer.appendChild(particle);
        
        // Mit GSAP animieren
        gsap.to(particle, {
          y: '-=50',
          x: `+=${Math.random() * 40 - 20}`,
          opacity: 0,
          duration: 4 + Math.random() * 6,
          ease: 'power1.out',
          repeat: -1,
          repeatRefresh: true,
          delay: Math.random() * 5
        });
      }
    }
  }, []);
  
  return (
    <section id="download" className="py-24 relative overflow-hidden">
      {/* Top Wave */}
      <WaveDivider 
        position="top" 
        color="#ffffff" 
        height={80}
        style="gentle-wave" // Or any other style you prefer
        opacity={0.2} // Optional: control transparency
      />
      
      {/* Hintergrund mit Parallax-Effekt */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://via.placeholder.com/1600x900?text=Vivalingo+Download+BG')`,
          transform: 'scale(1.1)' // Extra Größe um Bewegungsspielraum zu geben
        }}
      ></div>
      
      {/* Schwebende Partikel */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 z-0 overflow-hidden"
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Starte jetzt!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 mb-10"
            >
              Lade Vivalingo herunter und lerne neue Sprachen so, wie du deine Muttersprache gelernt hast.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              <Button 
                variant="primary" 
                size="lg"
                className="min-w-40 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                className="min-w-40 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 20.5V3.5c0-.85.44-1.59 1.1-2.02L14.5 12 4.1 22.52c-.66-.43-1.1-1.17-1.1-2.02zM18.77 12L7 3.78l8.49 8.49-8.49 8.49L18.77 12zm-4.31 0l-1.65 9.71L5.21 12l7.6-9.71L14.46 12z" />
                </svg>
                Google Play
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-10 flex justify-center md:justify-start"
            >
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white">4.8/5 Bewertung</span>
                </div>
                
                <div className="flex items-center bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-primary-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Einmalige Zahlung</span>
                </div>
                
                <div className="flex items-center bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Zufriedenheitsgarantie</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Smartphone-Mockup mit 3D-Neigungseffekt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center perspective-1000"
          >
            <div
              ref={phoneRef}
              className="relative w-64 h-[500px] transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gray-800 rounded-[40px] border-8 border-gray-900 shadow-2xl transform-gpu">
                {/* Phone Screen */}
                <div className="absolute inset-0 p-2 bg-black rounded-[32px] overflow-hidden">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-20 flex justify-center items-end pb-1">
                    <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
                  </div>
                  
                  {/* Screen Content - App UI */}
                  <div className="absolute inset-0 pt-6 pb-4 rounded-[28px] overflow-hidden">
                    {/* App header */}
                    <div className="h-12 bg-primary-600 flex items-center justify-center text-white font-bold">
                      Vivalingo
                    </div>
                    
                    {/* App content */}
                    <div className="flex flex-col h-full bg-gray-100">
                      {/* Language selection */}
                      <div className="flex justify-around py-3 bg-white shadow">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                            ES
                          </div>
                          <span className="text-xs mt-1">Spanisch</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            FR
                          </div>
                          <span className="text-xs mt-1">Französisch</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                            IT
                          </div>
                          <span className="text-xs mt-1">Italienisch</span>
                        </div>
                      </div>
                      
                      {/* Lesson text */}
                      <div className="p-4 flex-grow">
                        <div className="bg-white p-3 rounded-lg shadow mb-3">
                          <div className="text-xs text-gray-800">Hola, ¿cómo estás?</div>
                          <div className="text-xs text-gray-500">Hallo, wie geht es dir?</div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg shadow mb-3">
                          <div className="text-xs text-gray-800">Estoy muy bien, gracias.</div>
                          <div className="text-xs text-gray-500">Mir geht es sehr gut, danke.</div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg shadow">
                          <div className="text-xs text-gray-800">¿Y tú? ¿Qué tal?</div>
                          <div className="text-xs text-gray-500">Und Du? Wie geht's?</div>
                        </div>
                      </div>
                      
                      {/* Playback controls */}
                      <div className="bg-white p-2 flex justify-around items-center">
                        <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <div className="w-3 h-3 border-l-2 border-gray-700 border-solid ml-1"></div>
                        </button>
                        
                        <button className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-white ml-1"></div>
                        </button>
                        
                        <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <div className="w-3 h-3 border-r-2 border-gray-700 border-solid mr-1"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Reflections */}
              <div className="absolute top-1/4 left-1/3 w-1/3 h-1/4 bg-white/5 rounded-full blur-sm transform -rotate-30"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;