import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';

// Interface für ein Feature
interface AppFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  example?: string;
}

const DownloadCTA: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenContentRef = useRef<HTMLDivElement>(null);
  const appUIRef = useRef<HTMLDivElement>(null);
  
  // State für aktuelles Feature
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  
  // App Features
  const features: AppFeature[] = [
    {
      id: 1,
      icon: '🧠',
      title: 'Sprachen lernen wie die Muttersprache',
      description: 'Dein Gehirn lernt durch Mustererkennung, nicht durch Regeln. Genau wie Kinder ihre erste Sprache lernen.',
      color: 'bg-purple-500',
      example: 'Die Birkenbihl-Methode nutzt die natürliche Fähigkeit deines Gehirns, Muster zu erkennen'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Intuitives Sprachgefühl',
      description: 'Du wirst Sätze bilden, ohne nachzudenken. Die Grammatik kommt automatisch.',
      color: 'bg-blue-500',
      example: 'Durch 1:1 Dekodierung verstehst du die Struktur der Sprache intuitiv, ohne Regeln auswendig zu lernen'
    },
    {
      id: 3,
      icon: '🔊',
      title: 'Automatisch gute Aussprache',
      description: 'Durch wiederholtes Hören und Nachsprechen entwickelst du eine natürliche Aussprache.',
      color: 'bg-green-500',
      example: 'Du trainierst dein Ohr, die Feinheiten der Aussprache zu erfassen und natürlich wiederzugeben'
    },
    {
      id: 4,
      icon: '🚀',
      title: 'Schnelle Erfolge',
      description: 'Schon nach wenigen Stunden beginnst du, erste Sätze zu verstehen und zu sprechen.',
      color: 'bg-red-500',
      example: 'Der Fokus liegt auf praktischer Anwendung statt theoretischem Wissen, was zu schnellen Fortschritten führt'
    }
  ];
  
  // Aktuelles Feature
  const currentFeature = features[currentFeatureIndex];
  
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
      // Schwebende Animation mit verbessertem Float-Effekt
      gsap.to(phoneRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      
      // Shadow-Animation synchron mit schwebendem Handy
      gsap.to(phoneRef.current, {
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        yoyoEase: "sine.inOut"
      });
      
      // Neigungseffekt bei Mausbewegung
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Berechne Neigungswinkel basierend auf Mausposition mit sanfteren Werten
        const tiltX = (clientY - windowHeight / 2) / 30;
        const tiltY = (windowWidth / 2 - clientX) / 30;
        
        gsap.to(phoneRef.current, {
          rotateX: tiltX,
          rotateY: tiltY,
          duration: 1.5,
          ease: "power2.out"
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);
  
  // Feature-Wechsel-Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 6000); // Wechsle alle 6 Sekunden das Feature
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  // Animiere UI-Elemente bei Feature-Wechsel
  useEffect(() => {
    if (appUIRef.current && screenContentRef.current) {
      // Kleine Glüheffekte für das aktuelle Feature
      const createGlowEffect = () => {
        const glow = document.createElement('div');
        glow.className = `absolute rounded-full ${currentFeature.color}`;
        
        // Position in der Nähe des Icons
        const iconContainer = appUIRef.current?.querySelector('.feature-icon') as HTMLElement;
        if (iconContainer) {
          const rect = iconContainer.getBoundingClientRect();
          const screenRect = screenContentRef.current!.getBoundingClientRect();
          
          const startX = rect.left - screenRect.left + rect.width / 2;
          const startY = rect.top - screenRect.top + rect.height / 2;
          
          glow.style.left = `${startX}px`;
          glow.style.top = `${startY}px`;
          glow.style.width = '4px';
          glow.style.height = '4px';
          glow.style.opacity = '0.8';
          
          screenContentRef.current!.appendChild(glow);
          
          // Animation
          gsap.to(glow, {
            width: '100px',
            height: '100px',
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out',
            onComplete: () => {
              screenContentRef.current?.removeChild(glow);
            }
          });
        }
      };
      
      // Erstelle ein paar Glüheffekte
      createGlowEffect();
      setTimeout(createGlowEffect, 500);
      setTimeout(createGlowEffect, 1000);
    }
  }, [currentFeatureIndex, currentFeature.color]);
  
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
  
  // Beispielsätze für verschiedene Sprachen
  const phrases = [
    { lang: 'Spanisch', original: 'Me gusta aprender idiomas', translation: 'Mir gefällt Sprachen lernen' },
    { lang: 'Französisch', original: 'Je parle sans réfléchir', translation: 'Ich spreche ohne nachzudenken' },
    { lang: 'Italienisch', original: 'Imparo in modo naturale', translation: 'Ich lerne auf natürliche Weise' },
    { lang: 'Japanisch', original: '私は毎日練習します', translation: 'Ich übe jeden Tag' }
  ];
  
  // Aktueller Beispielsatz basierend auf Feature
  const currentPhrase = phrases[currentFeatureIndex % phrases.length];
  
  return (
    <section id="download" className="py-32 min-h-screen relative overflow-hidden flex items-center">
      {/* Hintergrund mit Parallax-Effekt */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `linear-gradient(150deg, rgba(0,0,0,0.9), rgba(20,20,60,0.8), rgba(0,0,0,0.9))`,
          transform: 'scale(1.1)' // Extra Größe um Bewegungsspielraum zu geben
        }}
      ></div>
      
      {/* Schwebende Partikel */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 z-0 overflow-hidden"
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
                Revolutioniere <br />
                <span className="text-primary-400">dein Sprachenlernen</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Mit Vivalingo lernst du Sprachen auf die natürlichste Weise. Genau wie du deine Muttersprache gelernt hast - intuitiv und ohne Regelbüffelei.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center md:justify-start gap-4 mb-12"
            >
              <Button 
                variant="primary" 
                size="lg"
                className="min-w-40 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                iOS App herunterladen
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                className="min-w-40 flex items-center justify-center gap-2 shadow-lg shadow-secondary-500/30"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 20.5V3.5c0-.85.44-1.59 1.1-2.02L14.5 12 4.1 22.52c-.66-.43-1.1-1.17-1.1-2.02zM18.77 12L7 3.78l8.49 8.49-8.49 8.49L18.77 12zm-4.31 0l-1.65 9.71L5.21 12l7.6-9.71L14.46 12z" />
                </svg>
                Android App herunterladen
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                  <div className="text-yellow-400 text-lg">★★★★★</div>
                  <span className="text-white">4.8/5 im App Store</span>
                </div>
                
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                  <span className="text-white font-semibold">100k+</span>
                  <span className="text-gray-300">zufriedene Nutzer</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Smartphone-Mockup mit verbesserten Effekten */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center perspective-1000"
          >
            <div
              ref={phoneRef}
              className="relative w-[320px] h-[640px] transform-gpu shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Phone Frame mit verbessertem Design */}
              <div className="absolute inset-0 bg-gray-800 rounded-[40px] border-[12px] border-gray-900 shadow-2xl transform-gpu overflow-hidden">
                {/* Phone Screen mit Reflexionseffekt */}
                <div 
                  ref={screenContentRef}
                  className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black rounded-[30px] overflow-hidden"
                >
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-b-xl z-20 flex justify-center items-end pb-1">
                    <div className="w-20 h-1.5 bg-gray-800 rounded-full"></div>
                  </div>
                  
                  {/* Status Bar mit Zeit und Batteriestand */}
                  <div className="absolute top-2 left-0 right-0 px-6 flex justify-between text-xs text-white z-10">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                      <div className="h-2.5 w-6 rounded-sm border border-white ml-1 relative">
                        <div className="absolute inset-0.5 right-auto w-4 bg-white rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* App UI mit Feature-Highlights */}
                  <div 
                    ref={appUIRef}
                    className="absolute inset-0 pt-12 pb-6 px-4 flex flex-col"
                  >
                    {/* App Header */}
                    <div className="h-14 flex items-center justify-center mb-4">
                      <div className="text-white text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                        Vivalingo
                      </div>
                    </div>
                    
                    {/* Feature Showcase */}
                    <div className="flex-grow flex flex-col justify-center">
                      {/* Feature Card mit Animation */}
                      <motion.div
                        key={currentFeature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-5 border border-gray-800 shadow-xl mb-5"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`feature-icon w-12 h-12 ${currentFeature.color} rounded-full flex items-center justify-center text-2xl`}>
                            {currentFeature.icon}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-base mb-1">
                              {currentFeature.title}
                            </h3>
                            <p className="text-gray-300 text-xs leading-relaxed">
                              {currentFeature.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Einfaches Beispiel statt komplexer UI */}
                      <motion.div
                        key={`example-${currentFeature.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`rounded-2xl overflow-hidden border border-gray-800 shadow-xl bg-opacity-60 ${currentFeature.color.replace('bg-', 'bg-')}/10 backdrop-blur-md p-5`}
                      >
                        {/* Kurze Erklärung */}
                        <p className="text-gray-200 text-sm mb-4">
                          {currentFeature.example}
                        </p>
                        
                        {/* Beispielsatz */}
                        <div className="rounded-xl bg-black/30 p-4 mb-2">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs mr-2">
                              {currentPhrase.lang.substring(0, 2)}
                            </div>
                            <span className="text-gray-300 text-xs">{currentPhrase.lang}</span>
                          </div>
                          <p className="text-white text-sm mb-2">{currentPhrase.original}</p>
                          <p className="text-gray-400 text-xs">{currentPhrase.translation}</p>
                        </div>
                        
                        {/* Icons, die den spezifischen Vorteil visualisieren */}
                        <div className="flex justify-center mt-4 space-x-2">
                          {currentFeature.id === 1 && (
                            <>
                              <span className="text-xl">🧠</span>
                              <span className="text-xl">→</span>
                              <span className="text-xl">💬</span>
                            </>
                          )}
                          {currentFeature.id === 2 && (
                            <>
                              <span className="text-xl">📚</span>
                              <span className="text-xl">❌</span>
                              <span className="text-xl">🎯</span>
                            </>
                          )}
                          {currentFeature.id === 3 && (
                            <>
                              <span className="text-xl">👂</span>
                              <span className="text-xl">→</span>
                              <span className="text-xl">🗣️</span>
                            </>
                          )}
                          {currentFeature.id === 4 && (
                            <>
                              <span className="text-xl">🔄</span>
                              <span className="text-xl">→</span>
                              <span className="text-xl">🚀</span>
                            </>
                          )}
                        </div>
                      </motion.div>
                      
                      {/* Feature Indicator Dots */}
                      <div className="flex justify-center gap-1.5 mt-8">
                        {features.map((feature, index) => (
                          <div 
                            key={feature.id} 
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              index === currentFeatureIndex 
                                ? `${feature.color.replace('bg-', 'bg-')} w-3`
                                : 'bg-gray-600'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* App Navbar */}
                    <div className="h-16 mt-auto pt-2">
                      <div className="h-1 w-32 bg-gray-700 mx-auto rounded-full mb-3"></div>
                      <div className="flex justify-around">
                        <button className="w-12 h-12 flex flex-col items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                            <span className="text-white text-xs">🏠</span>
                          </div>
                          <span className="text-gray-400 text-[10px] mt-1">Home</span>
                        </button>
                        <button className="w-12 h-12 flex flex-col items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                            <span className="text-white text-xs">📚</span>
                          </div>
                          <span className="text-gray-400 text-[10px] mt-1">Lernen</span>
                        </button>
                        <button className="w-12 h-12 flex flex-col items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                            <span className="text-white text-xs">👤</span>
                          </div>
                          <span className="text-gray-400 text-[10px] mt-1">Profil</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dynamischer Lichtreflexeffekt */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-20 pointer-events-none"></div>
                </div>
              </div>
              
              {/* Verbesserte Reflektionseffekte - Subtile Highlights */}
              <div className="absolute top-1/4 left-1/3 w-1/3 h-1/4 bg-white/5 rounded-full blur-sm"></div>
              <div className="absolute bottom-1/3 right-1/4 w-1/5 h-1/5 bg-primary-400/10 rounded-full blur-md"></div>
              
              {/* Pulse-Effekt um das Handy */}
              <div className="absolute inset-[-10px] rounded-[50px] bg-primary-500/5 animate-pulse"></div>
            </div>
            
            {/* Zusätzliche schwebende Elemente um das Telefon */}
            <div className="absolute top-1/4 -right-4 w-12 h-12 bg-primary-400/20 rounded-full blur-sm animate-float"></div>
            <div className="absolute bottom-1/3 -left-6 w-16 h-16 bg-secondary-400/20 rounded-full blur-md animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-accent-400/20 rounded-full blur-sm animate-float" style={{animationDelay: '2s'}}></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;