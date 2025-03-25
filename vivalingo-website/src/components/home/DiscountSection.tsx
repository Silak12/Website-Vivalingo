import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';
import DiscountCode from '../shared/DiscountCode';
import { 
  generateDiscountCodes, 
  selectRandomCode, 
  shuffleCodes,
  formatCountdown
} from '../../utils/discountCodeGenerator';

const DiscountSection: React.FC = () => {
  // Anzahl der anzuzeigenden Codes
  const CODES_COUNT = 150;
  // Countdown-Zeit in Sekunden (24 Stunden)
  const COUNTDOWN_TIME = 24 * 60 * 60;
  
  // State für Rabattcodes und aktiven Code
  const [discountCodes, setDiscountCodes] = useState<string[]>([]);
  const [activeCode, setActiveCode] = useState<string>('');
  const [isCodeUsed, setIsCodeUsed] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const [email, setEmail] = useState('');
  
  // Verweise für Animationen
  const sectionRef = useRef<HTMLDivElement>(null);
  const codesGridRef = useRef<HTMLDivElement>(null);

  // Generiere Codes beim ersten Rendern
  useEffect(() => {
    const codes = generateDiscountCodes(CODES_COUNT, 6, 'VIVA');
    const shuffledCodes = shuffleCodes(codes);
    const selectedActiveCode = selectRandomCode(codes);
    
    setDiscountCodes(shuffledCodes);
    setActiveCode(selectedActiveCode);
  }, []);

  // Countdown-Timer, wenn Code verwendet wurde
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCodeUsed && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    
    // Wenn Countdown abgelaufen ist, setze zurück
    if (countdown === 0) {
      setIsCodeUsed(false);
      setCountdown(COUNTDOWN_TIME);
      
      // Wähle einen neuen aktiven Code
      const newActiveCode = selectRandomCode(
        discountCodes.filter(code => code !== activeCode)
      );
      setActiveCode(newActiveCode);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCodeUsed, countdown, activeCode, discountCodes]);

  // Konfetti-Animation für den aktiven Code
  useEffect(() => {
    if (sectionRef.current && codesGridRef.current) {
      // Confetti-ähnliche Animation, wenn ein Code aktiviert wird
      const createConfetti = () => {
        const confettiCount = 100;
        const colors = ['#0e98f0', '#f03a6a', '#bcbc23', '#8B5CF6'];
        
        for (let i = 0; i < confettiCount; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.position = 'absolute';
          
          // Startposition
          const startX = window.innerWidth / 2;
          const startY = sectionRef.current!.offsetTop + 200;
          
          // Setze Startposition
          confetti.style.left = `${startX}px`;
          confetti.style.top = `${startY}px`;
          
          // Füge zum DOM hinzu
          document.body.appendChild(confetti);
          
          // Zufällige Richtung, Größe und Rotation
          const angle = Math.random() * Math.PI * 2;
          const distance = 100 + Math.random() * 300;
          const destX = startX + Math.cos(angle) * distance;
          const destY = startY + Math.sin(angle) * distance;
          
          // Animiere mit GSAP
          gsap.to(confetti, {
            x: destX - startX,
            y: destY - startY,
            rotation: Math.random() * 520,
            opacity: 0,
            duration: 1 + Math.random() * 2,
            ease: 'power1.out',
            onComplete: () => {
              // Entferne nach Animation
              document.body.removeChild(confetti);
            }
          });
        }
      };
      
      // Effekt beim Verwenden des Codes
      if (isCodeUsed) {
        createConfetti();
      }
    }
  }, [isCodeUsed]);

  // Behandle Klick auf einen Code
  const handleCodeClick = (code: string) => {
    if (code === activeCode && !isCodeUsed) {
      setIsCodeUsed(true);
      
      // Scrolle zum aktiven Code
      const activeCodeElement = document.getElementById(`code-${code}`);
      if (activeCodeElement) {
        activeCodeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Behandle Abonnieren-Formular
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hier würde normalerweise die Logik für das Abonnement stehen
    alert(`Danke für deine Anmeldung mit ${email}! Du wirst benachrichtigt, wenn ein neuer Rabattcode verfügbar ist.`);
    setEmail('');
  };

  // Animationsvarianten für Container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01
      }
    }
  };
  
  // Animationsvarianten für einzelne Codes
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div ref={sectionRef} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl font-bold mb-3">Finde den 100% Rabattcode!</h3>
        <div className="mb-2 flex items-center justify-center">
          <span className={`font-medium px-3 py-1 rounded-full inline-flex items-center ${
            isCodeUsed ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
          }`}>
            {isCodeUsed ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Code wurde verwendet!
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Code nicht verwendet
              </>
            )}
          </span>
        </div>
        
        {isCodeUsed && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-4 mb-2 bg-red-50 p-3 rounded-lg inline-block"
            >
              <p className="font-bold">
                Der Code wurde verwendet!
                <br />
                Nächster Code wird aktiv in:
                <span className="text-red-600 ml-2">{formatCountdown(countdown)}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        )}
        
        <p className="text-gray-600 max-w-2xl mx-auto mt-3">
          Wir haben 150 Codes versteckt, aber nur EINER ist derzeit aktiv für 100% Rabatt. 
          Wenn er benutzt wird, siehst du einen 24-Stunden-Countdown.
        </p>
      </motion.div>
      
      <motion.div 
        ref={codesGridRef}
        className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {discountCodes.map((code, index) => (
          <motion.div 
            key={code} 
            variants={itemVariants}
            id={`code-${code}`}
            className={code === activeCode && isCodeUsed ? 'animate-pulse' : ''}
          >
            <DiscountCode 
              code={code} 
              isActive={code === activeCode && !isCodeUsed} 
              onClick={handleCodeClick}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <p className="text-gray-600 mb-3">Willst du benachrichtigt werden, wenn ein neuer Code online ist?</p>
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Deine E-Mail-Adresse"
            className="px-4 py-2 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-primary-400"
            required
          />
          <Button type="submit" variant="primary">
            Abonnieren
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default DiscountSection;