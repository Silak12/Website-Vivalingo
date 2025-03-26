import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedText from '../components/shared/AnimatedText';
import Layout from '../components/layout/Layout';

const AGB: React.FC = () => {
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
              text="Allgemeine Geschäftsbedingungen"
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              as="h1"
            />
          </div>
          
          {/* AGB content */}
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
              
              <h2 className="text-2xl font-semibold text-white mb-4">1. Anwendungsbereich</h2>
              <p className="text-gray-300 mb-6">
                Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der Vivalingo Sprachlern-App und der Website www.vivalingo.app ("Dienste") durch Sie als Nutzer. Vivalingo wird betrieben von Leonard Marx, Musterstraße 14, 14527 Deutschland ("wir", "uns"). Mit dem Zugriff auf oder der Nutzung unserer Dienste erklären Sie sich mit diesen AGB einverstanden. Wenn Sie mit diesen Bedingungen nicht einverstanden sind, nutzen Sie unsere Dienste bitte nicht.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">2. Leistungsbeschreibung</h2>
              <p className="text-gray-300 mb-4">
                Vivalingo ist eine Sprachlern-App, die die Birkenbihl-Methode nutzt, um Nutzern das Erlernen von Fremdsprachen zu erleichtern. Die App bietet:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                <li className="mb-2">Sprachlektionen in verschiedenen Sprachen</li>
                <li className="mb-2">KI-generierte Audiodialoge zum Sprachenlernen</li>
                <li className="mb-2">Spracherkennungsfunktionen zur Ausspracheverbesserung</li>
                <li className="mb-2">Fortschrittsverfolgung</li>
                <li>Verschiedene Abo-Modelle und In-App-Käufe</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mb-4">3. Registrierung und Nutzerkonto</h2>
              <p className="text-gray-300 mb-6">
                Für die volle Nutzung unserer Dienste ist die Erstellung eines Benutzerkontos erforderlich. Sie sind verpflichtet, genaue und vollständige Informationen bei der Registrierung anzugeben und diese Informationen aktuell zu halten. Sie sind für die Sicherheit Ihres Passworts verantwortlich und dürfen Ihr Konto nicht an Dritte weitergeben. Sie sind für alle Aktivitäten verantwortlich, die über Ihr Konto stattfinden.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">4. Altersbeschränkung</h2>
              <p className="text-gray-300 mb-6">
                Unsere Dienste richten sich an Nutzer ab 16 Jahren. Wenn du jünger als 16 Jahre bist, darfst du unsere Dienste nur mit Zustimmung deiner Eltern oder Erziehungsberechtigten nutzen. Wir behalten uns das Recht vor, zusätzliche Maßnahmen zu ergreifen, um das Alter der Nutzer zu überprüfen und den Zugang zu unseren Diensten einzuschränken.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">5. Preise und Zahlungsbedingungen</h2>
              <p className="text-gray-300 mb-4">
                Wir bieten verschiedene Abonnement-Optionen und In-App-Käufe an:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li className="mb-2">Monatliches Abonnement: 2,99 € pro Monat</li>
                <li className="mb-2">Jährliches Abonnement: 12,99 € pro Jahr (entspricht einer Ersparnis von 64% gegenüber dem monatlichen Abonnement)</li>
                <li className="mb-2">Lifetime-Zugang: Einmalzahlung von 49,99 €</li>
              </ul>
              <p className="text-gray-300 mb-6">
                Alle Zahlungen werden über den App Store (iOS) oder Google Play Store (Android) abgewickelt. Die Abrechnung erfolgt entsprechend der Bestimmungen dieser Plattformen. Abonnements verlängern sich automatisch zum jeweils gültigen Preis, sofern sie nicht mindestens 24 Stunden vor Ende der aktuellen Laufzeit gekündigt werden. Die Kündigung erfolgt über Ihren App Store oder Google Play Account.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">6. Testphasen und Rückerstattungen</h2>
              <p className="text-gray-300 mb-6">
                Neue Nutzer erhalten beim Abschluss eines monatlichen oder jährlichen Abonnements eine 7-tägige kostenlose Testphase. Bei Lifetime-Käufen ist keine Testphase vorgesehen. Rückerstattungsanfragen müssen an den jeweiligen App Store (iOS) oder Google Play Store (Android) gerichtet werden und unterliegen deren Richtlinien. Für iOS-Nutzer können Rückerstattungen über die Apple-Website oder direkt im App Store unter "Kaufverlauf" beantragt werden. Android-Nutzer können Rückerstattungen über den Google Play Store im Bereich "Bestellverlauf" innerhalb von 48 Stunden nach dem Kauf beantragen. Bei späteren Anfragen muss der Google Play Support kontaktiert werden. Wir selbst bieten keine direkten Rückerstattungen an, unterstützen Sie aber gerne bei Fragen zum Rückerstattungsprozess.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">7. Widerrufsrecht</h2>
              <p className="text-gray-300 mb-6">
                Bei digitalen Inhalten erlischt das Widerrufsrecht mit Beginn der Ausführung des Vertrags, wenn der Nutzer ausdrücklich zugestimmt hat, dass mit der Ausführung vor Ablauf der Widerrufsfrist begonnen wird, und seine Kenntnis davon bestätigt hat, dass durch seine Zustimmung das Widerrufsrecht erlischt. Bei Abonnements können Sie Ihr Widerrufsrecht innerhalb von 14 Tagen nach Vertragsschluss ausüben, sofern Sie die Dienste noch nicht in Anspruch genommen haben.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">8. Nutzungsbedingungen</h2>
              <p className="text-gray-300 mb-4">
                Bei der Nutzung unserer Dienste verpflichten Sie sich:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-6">
                <li className="mb-2">Unsere Dienste nicht für illegale oder unerlaubte Zwecke zu nutzen</li>
                <li className="mb-2">Keine Viren oder schädlichen Code zu verbreiten</li>
                <li className="mb-2">Die App nicht zu reverse-engineeren, zu dekompilieren oder zu disassemblieren</li>
                <li className="mb-2">Die Inhalte der App nicht zu extrahieren, zu kopieren oder zu verbreiten</li>
                <li className="mb-2">Keine Maßnahmen zu ergreifen, die die Infrastruktur unserer Dienste übermäßig belasten könnten</li>
                <li>Die KI-generierten Audiodialoge ausschließlich für Ihr persönliches Sprachenlernen zu verwenden</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mb-4">9. KI-generierte Inhalte</h2>
              <p className="text-gray-300 mb-6">
                Die in unserer App enthaltenen Audiodialoge und Sprachbeispiele werden mit Hilfe von KI-Technologie erstellt. Wir möchten ausdrücklich darauf hinweisen, dass diese Audioinhalte künstlich erzeugt sind und nicht von realen Muttersprachlern stammen, auch wenn sie natürlich klingen. Diese Inhalte sind ausschließlich für deine persönliche Nutzung zum Sprachenlernen bestimmt und dürfen nicht reproduziert, verbreitet oder für andere Zwecke verwendet werden. Wir halten die Rechte an allen KI-generierten Inhalten in unserer App.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">10. Geistiges Eigentum</h2>
              <p className="text-gray-300 mb-6">
                Alle Rechte an der App und ihren Inhalten, einschließlich aber nicht beschränkt auf Software, Texte, Grafiken, Audiomaterialien und KI-generierte Inhalte, sind unser Eigentum oder das Eigentum unserer Lizenzgeber und durch Urheberrechts- und andere Gesetze zum Schutz geistigen Eigentums geschützt. Die Nutzung unserer Dienste gewährt Ihnen keine Eigentumsrechte an den Inhalten oder der Software.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">11. Datenschutz</h2>
              <p className="text-gray-300 mb-6">
                Der Schutz Ihrer Daten ist uns wichtig. Informationen darüber, wie wir Ihre personenbezogenen Daten erheben, verarbeiten und nutzen, finden Sie in unserer Datenschutzerklärung, die einen integralen Bestandteil dieser AGB darstellt.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">12. Verfügbarkeit und Änderungen der Dienste</h2>
              <p className="text-gray-300 mb-6">
                Wir bemühen uns, unsere Dienste rund um die Uhr verfügbar zu halten, können jedoch keine ununterbrochene Verfügbarkeit garantieren. Wir behalten uns das Recht vor, jederzeit und ohne vorherige Ankündigung Funktionen der App zu ändern, zu aktualisieren oder einzustellen. Wir können auch den Zugang zu unseren Diensten aus technischen, rechtlichen oder geschäftlichen Gründen vorübergehend oder dauerhaft einschränken.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">13. Haftungsbeschränkung</h2>
              <p className="text-gray-300 mb-6">
                Wir haften nicht für indirekte Schäden, Folgeschäden oder besondere Schäden, die aus der Nutzung oder der Unmöglichkeit der Nutzung unserer Dienste entstehen. Unsere Haftung ist auf den Betrag beschränkt, den Sie für die Nutzung unserer Dienste gezahlt haben. Diese Haftungsbeschränkung gilt nicht für Schäden, die durch Vorsatz oder grobe Fahrlässigkeit unsererseits verursacht wurden, oder für Verletzungen des Lebens, des Körpers oder der Gesundheit.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">14. Kündigung</h2>
              <p className="text-gray-300 mb-6">
                Sie können Ihr Abonnement jederzeit über die Einstellungen Ihres App Store oder Google Play Kontos kündigen. Die Kündigung wird zum Ende der aktuellen Abrechnungsperiode wirksam. Wir können Ihr Konto oder Ihren Zugang zu unseren Diensten jederzeit aus wichtigem Grund kündigen oder aussetzen, insbesondere bei Verstößen gegen diese AGB.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">15. Änderungen der AGB</h2>
              <p className="text-gray-300 mb-6">
                Wir behalten uns das Recht vor, diese AGB jederzeit zu ändern. Die geänderten Bedingungen werden auf unserer Website veröffentlicht und treten mit ihrer Veröffentlichung in Kraft. Ihre fortgesetzte Nutzung unserer Dienste nach der Veröffentlichung der geänderten AGB stellt Ihre Zustimmung zu diesen Änderungen dar.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">16. Anwendbares Recht und Gerichtsstand</h2>
              <p className="text-gray-300 mb-6">
                Diese AGB unterliegen dem Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis unser Geschäftssitz.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">17. Schlussbestimmungen</h2>
              <p className="text-gray-300 mb-6">
                Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle der unwirksamen Bestimmung tritt die gesetzlich zulässige Regelung, die dem Zweck der unwirksamen Bestimmung am nächsten kommt.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mb-4">18. Kontakt</h2>
              <p className="text-gray-300">
                Bei Fragen zu diesen AGB kontaktieren Sie uns bitte unter:
                <br /><br />
                Leonard Marx<br />
                Musterstraße 14<br />
                14527 Deutschland<br />
                <a href="mailto:kontakt@vivalingo.app" className="text-primary-300 hover:text-primary-200">
                  kontakt@vivalingo.app
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AGB;