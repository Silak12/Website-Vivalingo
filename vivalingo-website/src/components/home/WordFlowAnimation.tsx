import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WordFlowAnimation: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordListRef = useRef<HTMLUListElement>(null);
  const staticTextRef = useRef<HTMLDivElement>(null);
  
  const words = [
    'innovativ.',
    'effizient.',
    'einfach.',
    'schnell.',
    'modern.',
    'kreativ.',
    'intuitiv.',
    'praktisch.',
    'flexibel.',
    'zukunftsweisend.',
    'effektiv.',
    'inspirierend.',
    'zugänglich.',
    'spaßig.',
    'besser.',
    'als.',
    'Duolingo.',
    'günstiger.',
    'als.',
    'Duolingo.',
    'effektiver.',
    'als.',
    '...',
    'Du.',
    'weißt.',
    'schon.',
    '...',
    'Duolingo.',
  ];
  
  // Setup scroll-based animation using framer-motion for smoother performance
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  
  // Setup GSAP animations for the static text
  useEffect(() => {
    if (sectionRef.current && staticTextRef.current && wordListRef.current) {
      // GSAP animation for the static text
      gsap.fromTo(
        staticTextRef.current,
        { opacity: 0.5, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );
      
      // Highlight effect for words
      const wordItems = wordListRef.current.querySelectorAll('li');
      wordItems.forEach((word, index) => {
        gsap.fromTo(
          word,
          { color: 'rgba(75, 85, 99, 1)' }, // text-gray-600
          {
            color: 'rgba(14, 152, 240, 1)', // text-primary-500
            duration: 0.5,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: word,
              start: "top 55%",
              end: "top 45%",
              toggleActions: "play reverse play reverse",
              // markers: true, // for debugging
            }
          }
        );
      });
    }
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-white/70 backdrop-blur-sm"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          {/* Static Vivalingo Text */}
          <div 
            ref={staticTextRef}
            className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0"
          >
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-600"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Vivalingo<span className="text-primary-400">.</span>
            </motion.h2>
            <motion.p
              className="text-gray-600 mt-4 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Deine Sprachlernanwendung, die wirklich anders ist. Kein Abonnement, kein Stress, nur Erfolg.
            </motion.p>
          </div>
          
          {/* Animated Word Flow */}
          <div className="w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden relative">
            <div className="word-flow-container h-full">
              <motion.ul
                ref={wordListRef}
                style={{ y }}
                className="space-y-8 px-4"
              >
                {words.map((word, index) => (
                  <li
                    key={`${word}-${index}`}
                    className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-600 transition-colors duration-300"
                  >
                    {word}
                  </li>
                ))}
              </motion.ul>
            </div>
            
            {/* Gradient overlays for smooth transitions */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/70 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/70 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordFlowAnimation;