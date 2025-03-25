import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Button from '../shared/Button';

interface Phrase {
  original: string;
  translation: string;
  audioUrl?: string;
}

const MethodDemo: React.FC = () => {
  // Demo-Phrasen
  const phrases: Phrase[] = [
    {
      original: "Hola, ¿cómo estás?",
      translation: "Hallo, wie geht es dir?",
      audioUrl: "#" // Würde auf eine echte Audio-Datei verweisen
    },
    {
      original: "Estoy muy bien, gracias.",
      translation: "Mir geht es sehr gut, danke.",
      audioUrl: "#"
    },
    {
      original: "Me gusta aprender español.",
      translation: "Ich lerne gerne Spanisch.",
      audioUrl: "#"
    },
    {
      original: "El método Birkenbihl es fantástico.",
      translation: "Die Birkenbihl-Methode ist fantastisch.",
      audioUrl: "#"
    }
  ];
  
  // State für aktuelle Phase und Phrase
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
  const [showTranslation, setShowTranslation] = useState(true);
  
  // Refs
  const demoRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const highlightTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Aktuelle Phrase
  const currentPhrase = phrases[currentPhraseIndex];
  
  // Wörter aufteilen
  const originalWords = currentPhrase.original.split(/\s+/);
  const translationWords = currentPhrase.translation.split(/\s+/);
  
  // Simuliert das Abspielen der Audio-Datei
  const playAudio = () => {
    setIsPlaying(true);
    
    // Simuliere Wort-Highlighting während des Abspielens
    let wordIndex = 0;
    
    // Bereinige vorherigen Timer wenn vorhanden
    if (highlightTimerRef.current) {
      clearInterval(highlightTimerRef.current);
    }
    
    // Setze den ersten Wortindex
    setHighlightedWordIndex(wordIndex);
    
    // Timer für jedes Wort
    highlightTimerRef.current = setInterval(() => {
      wordIndex++;
      
      if (wordIndex >= originalWords.length) {
        // Audio beendet
        clearInterval(highlightTimerRef.current!);
        setHighlightedWordIndex(-1);
        setIsPlaying(false);
      } else {
        setHighlightedWordIndex(wordIndex);
      }
    }, 800); // Angenommen, jedes Wort dauert etwa 800ms
    
    // In einer realen App würde hier die Audio abgespielt werden
    // if (audioRef.current) {
    //   audioRef.current.play();
    // }
  };
  
  // Simuliert das Pausieren der Audio-Datei
  const pauseAudio = () => {
    setIsPlaying(false);
    
    if (highlightTimerRef.current) {
      clearInterval(highlightTimerRef.current);
    }
    
    // In einer realen App
    // if (audioRef.current) {
    //   audioRef.current.pause();
    // }
  };
  
  // Nächste Phrase
  const nextPhrase = () => {
    pauseAudio();
    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
  };
  
  // Vorherige Phrase
  const prevPhrase = () => {
    pauseAudio();
    setCurrentPhraseIndex((prev) => (prev - 1 + phrases.length) % phrases.length);
  };
  
  // Wechselt zur nächsten Lernphase
  const nextPhase = () => {
    pauseAudio();
    setCurrentPhase((prev) => Math.min(prev + 1, 4));
  };
  
  // Wechselt zur vorherigen Lernphase
  const prevPhase = () => {
    pauseAudio();
    setCurrentPhase((prev) => Math.max(prev - 1, 1));
  };
  
  // Behandelt Klick auf ein Wort
  const handleWordClick = (index: number) => {
    setHighlightedWordIndex(index);
    
    // In einer realen App würde hier die Audio ab dem Wort abgespielt werden
  };
  
  // Beschreibungen für jede Phase
  const phaseDescriptions = [
    "", // Dummy für Index 0
    "In der Dekodierungsphase wird jedes Wort übersetzt, damit du die Bedeutung sofort erfassen kannst.",
    "Beim aktiven Hören hörst du den Text und liest gleichzeitig die Übersetzung.",
    "Beim passiven Hören läuft die Audio im Hintergrund, während du andere Aktivitäten ausführst.",
    "In der Anwendungsphase verwendest du die gelernten Wörter und Phrasen aktiv."
  ];
  
  // Bereinigt beim Unmounten
  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        clearInterval(highlightTimerRef.current);
      }
    };
  }, []);
  
  // Schwebende Gehirnwellen
  useEffect(() => {
    if (demoRef.current) {
      // Gehirnwellen-Animation
      const createBrainWave = () => {
        const wave = document.createElement('div');
        wave.className = 'absolute w-8 h-8 rounded-full bg-primary-400/10 backdrop-blur-sm';
        
        // Zufällige Startposition
        const startX = 80 + Math.random() * 40; // Etwa in der Mitte
        const startY = 40 + Math.random() * 60; // Mehr in Richtung Oben
        
        wave.style.left = `${startX}%`;
        wave.style.top = `${startY}%`;
        
        demoRef.current!.appendChild(wave);
        
        // Animation
        gsap.fromTo(
          wave,
          { 
            scale: 0, 
            opacity: 0.7 
          },
          {
            scale: 4,
            opacity: 0,
            duration: 4 + Math.random() * 3,
            ease: 'power1.out',
            onComplete: () => {
              demoRef.current?.removeChild(wave);
            }
          }
        );
      };
      
      // Erstelle regelmäßig neue Wellen
      const waveInterval = setInterval(() => {
        if (currentPhase >= 2) { // Nur in Phasen 2-4 zeigen
          createBrainWave();
        }
      }, 2000);
      
      return () => {
        clearInterval(waveInterval);
      };
    }
  }, [currentPhase]);
  
  // Anpassungen für Phasen
  const getPhaseModeStyles = () => {
    switch (currentPhase) {
      case 1: // Dekodieren
        return "bg-white";
      case 2: // Aktives Hören
        return "bg-primary-50";
      case 3: // Passives Hören
        return "bg-primary-100";
      case 4: // Anwenden
        return "bg-accent-50";
      default:
        return "bg-white";
    }
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Erlebe die Birkenbihl-Methode
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Interaktive Demo: Probiere selbst aus, wie die Methode funktioniert.
          </motion.p>
        </div>
        
        {/* Methoden-Demo */}
        <div 
          ref={demoRef}
          className={`max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden relative ${getPhaseModeStyles()}`}
        >
          {/* Phasen-Auswahl */}
          <div className="flex justify-between border-b border-gray-200">
            {[1, 2, 3, 4].map((phase) => (
              <button
                key={phase}
                className={`flex-1 py-4 text-center transition-colors font-medium relative ${
                  currentPhase === phase ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setCurrentPhase(phase)}
              >
                Phase {phase}
                {currentPhase === phase && (
                  <motion.div
                    layoutId="phaseIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          
          {/* Phase Beschreibung */}
          <div className="p-4 bg-gray-50 text-center text-gray-600 text-sm">
            {phaseDescriptions[currentPhase]}
          </div>
          
          {/* Demo Content */}
          <div className="p-6 md:p-8">
            {/* Original Text mit hervorgehobenen Wörtern */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Spanisch:</h3>
              <div className="p-4 rounded-lg bg-white shadow-sm">
                {originalWords.map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block cursor-pointer px-1 py-0.5 rounded ${
                      highlightedWordIndex === index ? 'bg-primary-200' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleWordClick(index)}
                  >
                    {word}{' '}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Übersetzungstext (in Phase 3 ausblenden) */}
            <AnimatePresence>
              {(showTranslation || currentPhase !== 3) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold mb-2">Deutsch:</h3>
                  <div className="p-4 rounded-lg bg-white/80 shadow-sm">
                    {translationWords.map((word, index) => (
                      <span
                        key={index}
                        className={`inline-block px-1 py-0.5 rounded ${
                          highlightedWordIndex === index ? 'bg-secondary-200' : ''
                        }`}
                      >
                        {word}{' '}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Audio Controls */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  onClick={prevPhrase}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  className={`p-2 rounded-full ${
                    isPlaying 
                      ? 'bg-primary-500 hover:bg-primary-600 text-white' 
                      : 'bg-primary-100 hover:bg-primary-200 text-primary-700'
                  } transition-colors`}
                  onClick={isPlaying ? pauseAudio : playAudio}
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
                
                <button
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  onClick={nextPhrase}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex gap-2">
                {currentPhase === 3 && (
                  <button
                    className={`text-sm px-4 py-1 rounded-full ${
                      showTranslation
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        : 'bg-primary-100 hover:bg-primary-200 text-primary-700'
                    }`}
                    onClick={() => setShowTranslation(!showTranslation)}
                  >
                    {showTranslation ? 'Übersetzung ausblenden' : 'Übersetzung anzeigen'}
                  </button>
                )}
                
                <div className="relative group">
                  <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  
                  {/* Einstellungs-Popup */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div className="p-3">
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Geschwindigkeit</label>
                        <input type="range" min="0.5" max="1.5" step="0.1" className="w-full" defaultValue="1" />
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Wiederholungen</label>
                        <select className="w-full text-sm rounded border border-gray-300 p-1">
                          <option value="1">Keine</option>
                          <option value="2">2x wiederholen</option>
                          <option value="3">3x wiederholen</option>
                          <option value="-1">Endlos</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between">
            <Button variant="secondary" size="sm" onClick={() => window.location.href = '/#pricing'}>
              Jetzt für 4,99€ kaufen
            </Button>
            
            <div className="flex gap-2">
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={prevPhase}
                disabled={currentPhase <= 1}
              >
                Vorherige Phase
              </button>
              <button
                className="text-sm text-primary-600 hover:text-primary-700"
                onClick={nextPhase}
                disabled={currentPhase >= 4}
              >
                Nächste Phase &rarr;
              </button>
            </div>
          </div>
          
          {/* Unsichtbares Audio-Element */}
          <audio ref={audioRef} src={currentPhrase.audioUrl} />
        </div>
      </div>
    </section>
  );
};

export default MethodDemo;