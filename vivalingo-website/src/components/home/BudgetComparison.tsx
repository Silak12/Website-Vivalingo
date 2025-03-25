import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const BudgetComparison: React.FC = () => {
  // State for slider values
  const [vivalingoBudget, setVivalingoBudget] = useState(5);
  const [duolingoBudget, setDuolingoBudget] = useState(1000000);
  
  // Refs for labels
  const vivalingoLabelRef = useRef<HTMLDivElement>(null);
  const duolingoLabelRef = useRef<HTMLDivElement>(null);
  
  // Animation for the comparison containers
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Text descriptions based on budget values
  const getVivalingoDescription = (value: number) => {
    if (value < 10) return "eine Tasse Kaffee kaufen";
    if (value < 50) return "ein paar Stunden Entwicklung finanzieren";
    if (value < 100) return "kleine UI-Verbesserungen umsetzen";
    if (value < 200) return "neue Features entwickeln";
    return "unsere App dramatisch verbessern";
  };
  
  const getDuolingoDescription = (value: number) => {
    if (value < 1000000) return "regionale Werbekampagnen schalten";
    if (value < 10000000) return "nationale TV-Spots produzieren";
    if (value < 30000000) return "internationale Marketingkampagnen finanzieren";
    if (value < 50000000) return "Superbowl-Werbespots buchen";
    return "globale Marketing-Dominanz erreichen";
  };
  
  // Format numbers with thousand separators
  const formatNumber = (num: number) => {
    return num.toLocaleString('de-DE');
  };
  
  // Update slider label positions
  const updateSliderLabel = (
    value: number, 
    max: number, 
    labelRef: React.RefObject<HTMLDivElement>,
    sliderRef: React.RefObject<HTMLInputElement>
  ) => {
    if (labelRef.current && sliderRef.current) {
      const percent = value / max;
      const sliderWidth = sliderRef.current.offsetWidth;
      const thumbSize = 20; // Approximate thumb width
      const labelWidth = labelRef.current.offsetWidth;
      
      // Calculate position ensuring the label doesn't go out of bounds
      const rawPosition = percent * (sliderWidth - thumbSize) + thumbSize / 2;
      const minPosition = labelWidth / 2;
      const maxPosition = sliderWidth - labelWidth / 2;
      
      // Constrain position within bounds
      const position = Math.max(minPosition, Math.min(rawPosition, maxPosition));
      
      gsap.to(labelRef.current, {
        left: position,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };
  
  // Refs for sliders
  const vivalingoSliderRef = useRef<HTMLInputElement>(null);
  const duolingoSliderRef = useRef<HTMLInputElement>(null);
  
  // Update label positions
  useEffect(() => {
    updateSliderLabel(vivalingoBudget, 200, vivalingoLabelRef, vivalingoSliderRef);
  }, [vivalingoBudget]);
  
  useEffect(() => {
    updateSliderLabel(duolingoBudget, 70000000, duolingoLabelRef, duolingoSliderRef);
  }, [duolingoBudget]);
  
  // Initial positioning after mount
  useEffect(() => {
    const initialPositionTimer = setTimeout(() => {
      updateSliderLabel(vivalingoBudget, 200, vivalingoLabelRef, vivalingoSliderRef);
      updateSliderLabel(duolingoBudget, 70000000, duolingoLabelRef, duolingoSliderRef);
    }, 500);
    
    return () => clearTimeout(initialPositionTimer);
  }, []);
  
  return (
    <section id="budget-comparison" className="py-20 bg-gray-900 text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Marketing-Budget im Vergleich
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 max-w-xl mx-auto"
          >
            Vivalingo vs. Duolingo — sieh dir den Unterschied an.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vivalingo Budget */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Vivalingo</h3>
            <div className="relative mb-6 mt-10">
              <div 
                ref={vivalingoLabelRef}
                className="absolute -top-10 transform -translate-x-1/2 bg-primary-500 text-white px-3 py-1 rounded-lg z-10"
              >
                {formatNumber(vivalingoBudget)} €
              </div>
              <input 
                ref={vivalingoSliderRef}
                type="range" 
                min="0" 
                max="200" 
                step="1"
                value={vivalingoBudget}
                onChange={(e) => setVivalingoBudget(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
            </div>
            <p className="text-gray-300">
              Mit {formatNumber(vivalingoBudget)} € können wir {getVivalingoDescription(vivalingoBudget)}.
            </p>
            
            {/* Visual representation */}
            <div className="mt-6 bg-gray-700 h-4 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${(vivalingoBudget / 200) * 100}%` }}
              ></div>
            </div>
          </motion.div>
          
          {/* Duolingo Budget */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Duolingo</h3>
            <div className="relative mb-6 mt-10">
              <div 
                ref={duolingoLabelRef}
                className="absolute -top-10 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-lg z-10"
              >
                {formatNumber(duolingoBudget)} €
              </div>
              <input 
                ref={duolingoSliderRef}
                type="range" 
                min="0" 
                max="70000000" 
                step="100000"
                value={duolingoBudget}
                onChange={(e) => setDuolingoBudget(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>
            <p className="text-gray-300">
              Mit {formatNumber(duolingoBudget)} € können {getDuolingoDescription(duolingoBudget)}.
            </p>
            
            {/* Visual representation */}
            <div className="mt-6 bg-gray-700 h-4 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${(duolingoBudget / 70000000) * 100}%` }}
              ></div>
            </div>
          </motion.div>
        </div>
        
        {/* Comparison visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center mx-auto max-w-2xl"
        >
          <h3 className="text-xl font-semibold mb-6">Direkter Vergleich</h3>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-2">
              <div className="w-24 text-right pr-4 text-gray-400">Vivalingo</div>
              <div className="flex-grow h-8 bg-gray-700 rounded-r-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 transition-all duration-500"
                  style={{ 
                    width: duolingoBudget > 0 
                      ? `${(vivalingoBudget / duolingoBudget) * 100}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 text-right pr-4 text-gray-400">Duolingo</div>
              <div className="flex-grow h-8 bg-gray-700 rounded-r-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
            <p className="mt-6 text-gray-300 text-sm">
              {duolingoBudget > 0 ? (
                <>
                  Das Duolingo-Budget ist {formatNumber(Math.round(duolingoBudget / vivalingoBudget))}-mal 
                  höher als das von Vivalingo
                </>
              ) : (
                'Bewege die Slider, um den Vergleich zu sehen'
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BudgetComparison;