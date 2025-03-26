import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedText from '../components/shared/AnimatedText';
import Layout from '../components/layout/Layout';

const Datenschutz: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Background animation effects
  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        {
          scale: 0.9,
          opacity: 0.6,
        },
        {
          scale: 1.05,
          opacity: 0.8,
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
    }
  }, []);
  
  // Subtle floating particles
  useEffect(() => {
    if (particlesRef.current) {
      const particlesContainer = particlesRef.current;
      const numberOfParticles = window.innerWidth < 768 ? 3 : 6;
      
      particlesContainer.innerHTML = '';
      
      for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        
        const size = Math.random() * 8 + 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.pointerEvents = 'none';
        
        particlesContainer.appendChild(particle);
        
        gsap.to(particle, {
          y: '-=30',
          x: `+=${Math.random() * 20 - 10}`,
          opacity: 0,
          duration: 8 + Math.random() * 6,
          ease: 'power1.out',
          repeat: -1,
          repeatRefresh: true,
          delay: Math.random() * 5
        });
      }
    }
  }, []);
  
  // Date formating
  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  return (
    <Layout>
      <div ref={pageRef} className="relative min-h-screen py-20">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `linear-gradient(135deg, rgba(10,10,30,0.95), rgba(30,30,80,0.9), rgba(10,10,30,0.95))`,
            transform: 'scale(1.02)'
          }}
        ></div>
        
        {/* Background Circle Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
          <div 
            ref={circleRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary-300/10 to-secondary-300/10 blur-3xl"
          />
        </div>
        
        {/* Subtle Floating Particles */}
        <div 
          ref={particlesRef}
          className="absolute inset-0 z-1 overflow-hidden pointer-events-none"
        ></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-3xl">
          <div className="text-center mb-12">
            <AnimatedText
              text="Datenschutzerklärung"
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              as="h1"
            />
          </div>
          
          {/* Datenschutz content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10 mb-12"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-sm text-gray-400 mb-6">
                Stand: {formatDate()}
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">1. Einleitung</h2>
              <p className="text-gray-300 mb-6">
                Wir bei Viva La Lingo ("wir", "uns", "unsere") respektieren deine Privatsphäre und verpflichten uns, deine personenbezogenen Daten zu schützen. Diese Datenschutzerklärung informiert dich darüber, wie wir mit den Daten umgehen, die wir durch deine Nutzung unserer Sprachlern-App Viva La Lingo (die "App") und unserer Website www.Viva La Lingo.app (die "Website") sammeln, und erklärt deine Datenschutzrechte.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">2. Verantwortlicher für die Datenverarbeitung</h2>
              <p className="text-gray-300 mb-6">
                Verantwortlich für die Erhebung und Verarbeitung deiner personenbezogenen Daten ist:<br /><br />
                
                Leonard Marx<br />
                Musterstraße 14<br />
                14527 Deutschland<br /><br />
                
                E-Mail: <a href="mailto:kontakt@Viva La Lingo.app" className="text-primary-300 hover:text-primary-200">
                  kontakt@Viva La Lingo.app
                </a>
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">3. Von uns erhobene Daten</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.1. Kontodaten</h3>
              <p className="text-gray-300 mb-4">
                Wenn du ein Konto erstellst, erheben wir deine E-Mail-Adresse und ein von dir gewähltes Passwort. Diese Daten sind notwendig, um dir Zugang zu deinem persönlichen Bereich und den von dir erworbenen Inhalten zu gewähren.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.2. Nutzungsdaten</h3>
              <p className="text-gray-300 mb-4">
                Die App speichert Daten über deinen Lernfortschritt, wie abgeschlossene Lektionen, Übungsstreaks und Prüfungsergebnisse. Diese Daten werden primär lokal auf deinem Gerät gespeichert und dienen dazu, deinen Fortschritt zu verfolgen und dir eine personalisierte Lernerfahrung zu bieten.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.3. Audiodaten</h3>
              <p className="text-gray-300 mb-4">
                Für die Spracherkennungsfunktion nimmt die App temporär deine Stimme auf, wenn du die Übungs- oder Prüfungsfunktion aktivierst. Diese Aufnahmen werden ausschließlich lokal auf deinem Gerät mit der Spracherkennungstechnologie deines Smartphones verarbeitet, um deine Aussprache zu überprüfen. Die Audiodaten werden nicht an unsere Server übertragen oder dauerhaft gespeichert.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.4. Zahlungsdaten</h3>
              <p className="text-gray-300 mb-4">
                Bei In-App-Käufen werden die Zahlungen über den Apple App Store oder Google Play Store abgewickelt. Wir erhalten keine vollständigen Zahlungsinformationen, sondern lediglich eine Bestätigung über den erfolgreichen Abschluss der Transaktion, um dir Zugang zu den erworbenen Inhalten zu gewähren.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.5. Automatisch erfasste Daten</h3>
              <p className="text-gray-300 mb-4">
                Wenn du unsere App oder Website nutzt, werden automatisch technische Daten wie IP-Adresse, Gerätetyp, Betriebssystemversion und Spracheinstellungen erfasst. Diese Daten helfen uns, die Funktionalität unserer Dienste zu gewährleisten und zu verbessern.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">4. Zwecke der Datenverarbeitung</h2>
              <p className="text-gray-300 mb-4">
                Wir verarbeiten deine Daten zu folgenden Zwecken:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                <li className="mb-2">Um dir Zugang zu deinem Konto und den erworbenen Inhalten zu gewähren</li>
                <li className="mb-2">Um deinen Lernfortschritt zu speichern und dir eine personalisierte Lernerfahrung zu bieten</li>
                <li className="mb-2">Um deine Aussprache mit Hilfe der Spracherkennungsfunktion zu bewerten</li>
                <li className="mb-2">Um die Funktionalität und Leistung unserer App zu überwachen und zu verbessern</li>
                <li className="mb-2">Um Zahlungen für Abonnements und In-App-Käufe zu verarbeiten</li>
                <li>Um dich über wichtige Änderungen oder Updates zu informieren</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mb-4">5. Rechtsgrundlagen der Datenverarbeitung</h2>
              <p className="text-gray-300 mb-6">
                Die Rechtsgrundlagen für die Verarbeitung deiner personenbezogenen Daten sind:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                <li className="mb-2">Erfüllung des Nutzungsvertrags (Art. 6 Abs. 1 lit. b DSGVO) für die Bereitstellung der App und ihrer Funktionen</li>
                <li className="mb-2">Deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) für bestimmte Verarbeitungszwecke, z.B. die Nutzung der Spracherkennungsfunktion</li>
                <li>Unser berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO) an der Verbesserung und Sicherung unserer Dienste</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mb-4">6. Datenweitergabe an Dritte</h2>
              <p className="text-gray-300 mb-4">
                Wir geben deine Daten nur in folgenden Fällen an Dritte weiter:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                <li className="mb-2">An Dienstleister, die uns bei der Bereitstellung unserer Dienste unterstützen (z.B. Cloud-Hosting-Anbieter wie Firebase)</li>
                <li className="mb-2">An App Stores für die Abwicklung von Zahlungen</li>
                <li>Wenn wir gesetzlich dazu verpflichtet sind oder zum Schutz unserer Rechte</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1. Verwendete Dienste von Drittanbietern</h3>
              
              <h4 className="text-lg font-semibold text-white mb-2">Google Firebase</h4>
              <p className="text-gray-300 mb-4">
                Wir verwenden Google Firebase für Authentifizierung, Datenspeicherung und Cloud-Dienste. Firebase sammelt bestimmte Geräteinformationen und Nutzungsdaten. Weitere Informationen findest du in der Datenschutzerklärung von Google: 
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 ml-1">
                  https://policies.google.com/privacy
                </a>
              </p>
              
              <h4 className="text-lg font-semibold text-white mb-2">RevenueCat</h4>
              <p className="text-gray-300 mb-4">
                Für die Verwaltung von Abonnements und In-App-Käufen nutzen wir den Dienst RevenueCat. RevenueCat verarbeitet Informationen zu deinen Käufen und deinem Abonnementstatus, um die korrekte Bereitstellung der von dir erworbenen Inhalte zu ermöglichen. Weitere Informationen findest du in der Datenschutzerklärung von RevenueCat: 
                <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 ml-1">
                  https://www.revenuecat.com/privacy
                </a>
              </p>
              
              <h4 className="text-lg font-semibold text-white mb-2">App Store & Google Play</h4>
              <p className="text-gray-300 mb-6">
                Bei In-App-Käufen werden Zahlungen über den Apple App Store oder Google Play Store abgewickelt. Diese Plattformen verarbeiten deine Zahlungsinformationen gemäß ihren eigenen Datenschutzrichtlinien:
                <br />
                <a href="https://www.apple.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 block mt-2">
                  Apple: https://www.apple.com/legal/privacy
                </a>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-200 block mt-1">
                  Google: https://policies.google.com/privacy
                </a>
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">7. Deine Rechte</h2>
              <p className="text-gray-300 mb-4">
                Nach der Datenschutz-Grundverordnung (DSGVO) hast du folgende Rechte:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                <li className="mb-2">Recht auf Auskunft über die zu deiner Person gespeicherten Daten</li>
                <li className="mb-2">Recht auf Berichtigung unrichtiger Daten</li>
                <li className="mb-2">Recht auf Löschung deiner Daten</li>
                <li className="mb-2">Recht auf Einschränkung der Verarbeitung</li>
                <li className="mb-2">Recht auf Datenübertragbarkeit</li>
                <li className="mb-2">Recht auf Widerspruch gegen die Verarbeitung</li>
                <li>Recht auf Widerruf einer erteilten Einwilligung</li>
              </ul>
              <p className="text-gray-300 mb-6">
                Um eines dieser Rechte auszuüben, kontaktiere uns bitte unter 
                <a href="mailto:kontakt@Viva La Lingo.app" className="text-primary-300 hover:text-primary-200 mx-1">
                  kontakt@Viva La Lingo.app
                </a>.
                Du hast außerdem das Recht, eine Beschwerde bei einer Datenschutzaufsichtsbehörde einzureichen.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">8. Datenschutz von Kindern und Jugendlichen</h2>
              <p className="text-gray-300 mb-6">
                Unsere Dienste richten sich an Nutzer ab 16 Jahren. Wir erheben wissentlich keine personenbezogenen Daten von Kindern unter 16 Jahren ohne die nachweisliche Zustimmung der Eltern oder Erziehungsberechtigten. Wenn du unter 16 Jahre alt bist, darfst du unsere Dienste nur mit Zustimmung deiner Eltern oder Erziehungsberechtigten nutzen. Wenn wir Kenntnis davon erlangen, dass wir personenbezogene Daten von einem Kind unter 16 Jahren ohne überprüfbare elterliche Zustimmung gesammelt haben, werden wir Maßnahmen ergreifen, um diese Daten zu löschen.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">9. Datensicherheit</h2>
              <p className="text-gray-300 mb-6">
                Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um deine personenbezogenen Daten gegen zufällige oder vorsätzliche Manipulation, Verlust, Zerstörung oder gegen den Zugriff unberechtigter Personen zu schützen. Unsere Sicherheitsverfahren werden regelmäßig überprüft und an den technologischen Fortschritt angepasst.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">10. Speicherdauer</h2>
              <p className="text-gray-300 mb-6">
                Wir speichern deine personenbezogenen Daten nur so lange, wie es für die Zwecke, für die sie erhoben wurden, erforderlich ist oder wie es gesetzlich vorgeschrieben ist. Kontodaten werden für die Dauer deines Nutzungsverhältnisses gespeichert und nach Beendigung deines Kontos gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">11. Cookies und ähnliche Technologien</h2>
              <p className="text-gray-300 mb-6">
                Unsere Website verwendet Cookies und ähnliche Technologien, um die Benutzerfreundlichkeit zu verbessern und bestimmte Funktionen zu ermöglichen. Du kannst deinen Browser so einstellen, dass Cookies abgelehnt werden, was jedoch die Funktionalität unserer Website einschränken kann.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">12. Änderungen dieser Datenschutzerklärung</h2>
              <p className="text-gray-300 mb-6">
                Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern. Die jeweils aktuelle Version ist auf unserer Website verfügbar. Bei wesentlichen Änderungen werden wir dich über die App oder per E-Mail informieren.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">13. Kontakt</h2>
              <p className="text-gray-300">
                Bei Fragen oder Anliegen zu unserer Datenschutzerklärung oder der Verarbeitung deiner personenbezogenen Daten kontaktiere uns bitte unter:
                <br /><br />
                Leonard Marx<br />
                Musterstraße 14<br />
                14527 Deutschland<br />
                <a href="mailto:kontakt@Viva La Lingo.app" className="text-primary-300 hover:text-primary-200">
                  kontakt@Viva La Lingo.app
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Datenschutz;