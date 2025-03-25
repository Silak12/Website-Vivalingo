import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Button from '../components/shared/Button';
import AnimatedText from '../components/shared/AnimatedText';

const Method: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Animation for phase circles
  const phasesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (phasesRef.current) {
      const phases = phasesRef.current.querySelectorAll('.phase-circle');
      
      gsap.fromTo(phases, 
        { 
          scale: 0.8, 
          opacity: 0.7 
        },
        { 
          scale: 1, 
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: phasesRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);
  
  // Phases content
  const phases = [
    {
      number: 1,
      title: "Dekodieren",
      description: "Der Text wird wortwörtlich übersetzt, sodass du den Inhalt direkt erfassen kannst.",
      color: "bg-primary-500",
      image: "https://via.placeholder.com/400x300?text=Decode+Phase",
      delay: 0.1
    },
    {
      number: 2,
      title: "Aktives Hören",
      description: "Höre den fremdsprachlichen Text, während du die Übersetzung liest und verstehst.",
      color: "bg-secondary-500",
      image: "https://via.placeholder.com/400x300?text=Active+Listening",
      delay: 0.2
    },
    {
      number: 3,
      title: "Passives Hören",
      description: "Lass die Sprache im Hintergrund laufen, während du anderen Tätigkeiten nachgehst.",
      color: "bg-accent-500",
      image: "https://via.placeholder.com/400x300?text=Passive+Listening",
      delay: 0.3
    },
    {
      number: 4,
      title: "Anwenden",
      description: "Probiere die Sprache aktiv aus, sei es im Gespräch oder beim Medienkonsum.",
      color: "bg-purple-500",
      image: "https://via.placeholder.com/400x300?text=Apply+Phase",
      delay: 0.4
    }
  ];
  
  return (
    <>
      {/* Hero Header */}
      <motion.div 
        ref={headerRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          opacity: headerOpacity,
          y: headerY
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-primary-900 z-0"></div>
        
        {/* Animated background circles */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-primary-500/20 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-secondary-500/20 blur-3xl"></div>
          <div className="absolute top-2/3 left-2/3 w-40 h-40 rounded-full bg-accent-500/20 blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <AnimatedText
            text="Die Birkenbihl-Methode"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            as="h1"
          />
          
          <AnimatedText
            text="Entdecke die effektivste Art, Sprachen zu lernen, wie dein Gehirn es liebt."
            className="text-xl text-gray-200 max-w-2xl mx-auto mb-8"
            as="p"
            delay={0.2}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="shadow-lg shadow-primary-500/30"
            >
              Jetzt testen
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Method Introduction */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 md:pr-10 mb-10 md:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Wer war Vera F. Birkenbihl?</h2>
              <p className="text-gray-600 mb-4">
                Vera F. Birkenbihl (1946-2011) war eine renommierte deutsche Managementtrainerin, 
                Sachbuchautorin und Expertin für hirngerechtes Lernen und Lehren. Sie ist vor allem 
                bekannt für ihre innovative Sprachlernmethode, die völlig anders funktioniert als 
                herkömmliche Lehrmethoden.
              </p>
              <p className="text-gray-600 mb-4">
                Ihre Methode basiert auf dem Verständnis, wie das menschliche Gehirn Sprachen 
                natürlich erlernt – nämlich durch Verstehen und Kontext, nicht durch Grammatikregeln 
                und stures Auswendiglernen.
              </p>
              <p className="text-gray-600">
                Vivalingo bringt diese revolutionäre Methode in eine moderne App, die dir hilft, 
                Sprachen auf die natürlichste und effektivste Weise zu erlernen.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <img 
                src="https://via.placeholder.com/600x400?text=Vera+F.+Birkenbihl" 
                alt="Vera F. Birkenbihl" 
                className="rounded-xl shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* The 4 Phases */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Die 4 Phasen der Birkenbihl-Methode
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Ein strukturierter Ansatz zum natürlichen Sprachenlernen, der mit deinem Gehirn arbeitet, nicht gegen es.
            </motion.p>
          </div>
          
          {/* Phase Timeline */}
          <div 
            ref={phasesRef}
            className="relative max-w-5xl mx-auto mb-16"
          >
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 z-0"></div>
            
            {/* Timeline circles */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-20 sm:space-x-40">
                {phases.map((phase) => (
                  <div 
                    key={phase.number}
                    className={`phase-circle ${phase.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10`}
                  >
                    {phase.number}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Phase blocks */}
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: phase.delay }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-lg p-6 mb-12 max-w-3xl mx-auto ${index % 2 === 0 ? 'md:ml-0' : 'md:mr-0'}`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">
                      Phase {phase.number}: {phase.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {phase.description}
                    </p>
                    <div className={`w-16 h-1 ${phase.color} mb-4`}></div>
                    
                    {phase.number === 1 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">In der Vivalingo-App:</h4>
                        <p className="text-gray-600 text-sm">
                          Texte werden bereits wortgetreu übersetzt und farbkodiert, damit du direkt mit dem Lernen beginnen kannst.
                        </p>
                      </div>
                    )}
                    
                    {phase.number === 2 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">In der Vivalingo-App:</h4>
                        <p className="text-gray-600 text-sm">
                          Wiederhole Audioabschnitte beliebig oft und passe die Geschwindigkeit an deine Bedürfnisse an.
                        </p>
                      </div>
                    )}
                    
                    {phase.number === 3 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">In der Vivalingo-App:</h4>
                        <p className="text-gray-600 text-sm">
                          Die App ermöglicht das Abspielen im Hintergrund, selbst wenn dein Bildschirm gesperrt ist.
                        </p>
                      </div>
                    )}
                    
                    {phase.number === 4 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">In der Vivalingo-App:</h4>
                        <p className="text-gray-600 text-sm">
                          Nutze die erlernten Phrasen und Vokabeln in eigenen Konversationen oder beim Medienkonsum.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <img 
                      src={phase.image} 
                      alt={`Phase ${phase.number}: ${phase.title}`} 
                      className="rounded-lg shadow-md w-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-primary-900 to-primary-800 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Vorteile der Birkenbihl-Methode
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-200 max-w-2xl mx-auto"
            >
              Warum diese Methode effektiver ist als traditionelles Sprachenlernen
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Natürliches Lernen",
                description: "Lerne wie ein Kind – durch Verstehen und Anwendung, nicht durch Regeln und Auswendiglernen.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                delay: 0.1
              },
              {
                title: "Gehirngerecht",
                description: "Die Methode nutzt die natürliche Funktionsweise deines Gehirns, was zu schnelleren und länger anhaltenden Ergebnissen führt.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                delay: 0.2
              },
              {
                title: "Stressfrei",
                description: "Lerne ohne Druck und Prüfungsangst – in deinem eigenen Tempo und mit Freude statt Frustration.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ),
                delay: 0.3
              },
              {
                title: "Nachhaltiges Lernen",
                description: "Durch multisensorische Stimulation wird das Gelernte tief im Langzeitgedächtnis verankert.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                delay: 0.4
              },
              {
                title: "Kein Grammatikbüffeln",
                description: "Verstehe Grammatik intuitiv durch Kontext statt durch abstrakte Regeln.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                delay: 0.5
              },
              {
                title: "Für jeden geeignet",
                description: "Ob Kind oder Erwachsener, Sprachtalent oder nicht – die Methode ist für alle zugänglich.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                delay: 0.6
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: benefit.delay }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="text-primary-300 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-white mb-4"
                >
                  Bereit, Sprachen auf natürliche Weise zu lernen?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-white/90 mb-6"
                >
                  Mit Vivalingo erlebst du die Birkenbihl-Methode in einer modernen, benutzerfreundlichen App. 
                  Einmalige Zahlung. Kein Abo. Starte jetzt deine Sprachlernreise!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className="shadow-lg"
                  >
                    Jetzt herunterladen
                  </Button>
                </motion.div>
              </div>
              <div className="w-full md:w-1/3">
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  src="https://via.placeholder.com/300x600.png/0a0a0a/ffffff?text=Vivalingo+App"
                  alt="Vivalingo App"
                  className="rounded-xl shadow-lg mx-auto max-w-[200px] md:max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Method;