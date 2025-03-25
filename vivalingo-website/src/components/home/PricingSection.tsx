import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../shared/Button';
import DiscountCode from '../shared/DiscountCode';

const PricingSection: React.FC = () => {
  const [activeCode, setActiveCode] = useState('VIVA100');
  const [isCodeUsed, setIsCodeUsed] = useState(false);
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState('23:59:59');
  
  // Sample discount codes
  const discountCodes = [
    'VIVA100', 'LEARN50', 'SPEECH25', 'BIRKEN20', 'LANG10',
    'FLUENT5', 'TALK15', 'WORLD30', 'SPEAK40', 'HELLO60',
    'LINGUA70', 'WORDS80', 'BABEL90', 'GLOBE45', 'START35'
  ];
  
  const handleCodeClick = (code: string) => {
    if (code === activeCode && !isCodeUsed) {
      setIsCodeUsed(true);
      
      // Reset after 24 hours (just for demo)
      setTimeout(() => {
        setIsCodeUsed(false);
        const newCodeIndex = Math.floor(Math.random() * discountCodes.length);
        setActiveCode(discountCodes[newCodeIndex]);
      }, 5000); // Set to 5 seconds for demo purposes
    }
  };
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
    alert(`Danke für deine Anmeldung mit ${email}! Du wirst benachrichtigt, wenn ein neuer Rabattcode verfügbar ist.`);
    setEmail('');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Einfache & Transparente Preise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-xl mx-auto"
          >
            Keine monatlichen Abonnements. Nur einmalig 4,99 €.
          </motion.p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">Free Tier</h3>
              <div className="text-4xl font-bold text-primary-500 mb-4">
                0 €
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Basis-Lektionen</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Tägliche Quiz</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Community-Zugang</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Jetzt ausprobieren
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-primary-500 relative"
          >
            {/* Popular badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Beliebt</div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-primary-600 mb-2">Full Access</h3>
              <div className="text-4xl font-bold text-primary-500 mb-4">
                4,99 €
                <span className="text-lg font-normal text-gray-600 ml-1">/ einmalig</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Alle Birkenbihl-Features</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Uneingeschränkte Audio-Kontrolle</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Alle Sprachen & Updates</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Lebenslanger Zugang</span>
                </li>
              </ul>
              <Button variant="primary" className="w-full">
                Alles freischalten
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Discount Codes Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h3 className="text-2xl font-bold mb-3">Finde den 100% Rabattcode!</h3>
            <div className="mb-2">
              <span className="font-medium text-green-600">
                {isCodeUsed ? 'Code wurde verwendet!' : 'Code nicht verwendet'}
              </span>
            </div>
            
            {isCodeUsed && (
              <div className="text-center mt-4 mb-2">
                <p className="font-bold">
                  Der Code wurde verwendet!
                  <br />
                  Nächster Code wird aktiv in:
                  <span className="text-red-600 ml-2">{countdown}</span>
                </p>
              </div>
            )}
            
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Wir haben 150 Codes versteckt, aber nur EINER ist derzeit aktiv für 100% Rabatt. 
              Wenn er benutzt wird, siehst du einen 24-Stunden-Countdown.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-3 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {discountCodes.map((code, index) => (
              <motion.div key={code} variants={itemVariants}>
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
      </div>
    </section>
  );
};

export default PricingSection;