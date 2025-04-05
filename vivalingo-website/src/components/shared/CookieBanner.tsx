import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { useLanguage } from '../../contexts/LanguageContext';

// Define cookie consent options
type ConsentOption = 'necessary' | 'analytics' | 'marketing';
type ConsentState = Record<ConsentOption, boolean>;

// Type for storing consent in localStorage
interface StoredConsent {
  preferences: ConsentState;
  timestamp: number;
}

const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  
  // State to track if banner should be shown
  const [showBanner, setShowBanner] = useState<boolean>(false);
  
  // State to track if detailed settings are open
  const [showSettings, setShowSettings] = useState<boolean>(false);
  
  // Consent preferences
  const [consentState, setConsentState] = useState<ConsentState>({
    necessary: true, // Always required
    analytics: false,
    marketing: false
  });
  
  // Check if consent is already stored in localStorage
  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    
    if (!storedConsent) {
      // No consent stored, show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed: StoredConsent = JSON.parse(storedConsent);
        
        // Check if consent is older than 6 months (180 days)
        const sixMonthsInMs = 180 * 24 * 60 * 60 * 1000;
        const isExpired = Date.now() - parsed.timestamp > sixMonthsInMs;
        
        if (isExpired) {
          // Consent has expired, show banner again
          setShowBanner(true);
        } else {
          // Apply stored preferences
          setConsentState(parsed.preferences);
          
          // Actually apply the consent state to tracking scripts
          applyConsentState(parsed.preferences);
        }
      } catch (error) {
        // If parsing fails, show banner
        console.error('Error parsing stored cookie consent', error);
        setShowBanner(true);
      }
    }
  }, []);
  
  // Function to apply the consent state (e.g., initializing analytics if approved)
  const applyConsentState = (state: ConsentState) => {
    // Always apply necessary cookies (nothing to do, they're always allowed)
    
    // Apply analytics cookies if consent given
    if (state.analytics) {
      // Initialize analytics here
      // Example: initAnalytics();
      console.log('Analytics consent given, would initialize analytics');
    }
    
    // Apply marketing cookies if consent given
    if (state.marketing) {
      // Initialize marketing tracking here
      // Example: initMarketingTrackers();
      console.log('Marketing consent given, would initialize marketing trackers');
    }
  };
  
  // Save consent to localStorage
  const saveConsent = (state: ConsentState) => {
    const consentData: StoredConsent = {
      preferences: state,
      timestamp: Date.now()
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    applyConsentState(state);
    setShowBanner(false);
  };
  
  // Handle "Accept All" button
  const handleAcceptAll = () => {
    const allAccepted: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    
    setConsentState(allAccepted);
    saveConsent(allAccepted);
  };
  
  // Handle "Reject All" button (except necessary)
  const handleRejectAll = () => {
    const allRejected: ConsentState = {
      necessary: true, // Always required
      analytics: false,
      marketing: false
    };
    
    setConsentState(allRejected);
    saveConsent(allRejected);
  };
  
  // Handle "Save Preferences" (from settings panel)
  const handleSavePreferences = () => {
    saveConsent(consentState);
  };
  
  // Toggle individual consent options
  const toggleConsent = (option: ConsentOption) => {
    if (option === 'necessary') return; // Can't toggle necessary cookies
    
    setConsentState(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };
  
  // Animation variants
  const bannerVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      y: '100%', 
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const settingsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  };
  
  // If banner shouldn't be shown, don't render anything
  if (!showBanner) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        key="cookie-banner"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={bannerVariants}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="container-custom mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Main Banner Content */}
            <div className="p-6">
              <div className="flex items-start">
                <div className="text-2xl mr-4 flex-shrink-0">🍪</div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('cookieBanner.title')}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {t('cookieBanner.description')}
                    {' '}
                    <button 
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-primary-600 hover:text-primary-700 font-medium underline focus:outline-none"
                    >
                      {showSettings ? t('cookieBanner.hideDetails') : t('cookieBanner.showDetails')}
                    </button>
                  </p>
                  
                  {/* Settings Panel */}
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        key="settings-panel"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={settingsVariants}
                        className="mb-4"
                      >
                        <div className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200">
                          {/* Necessary Cookies - Always enabled */}
                          <div className="mb-3 pb-3 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-800">{t('cookieBanner.necessary.title')}</h4>
                                <p className="text-sm text-gray-600">{t('cookieBanner.necessary.description')}</p>
                              </div>
                              <div className="bg-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-800">
                                {t('cookieBanner.required')}
                              </div>
                            </div>
                          </div>
                          
                          {/* Analytics Cookies */}
                          <div className="mb-3 pb-3 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-800">{t('cookieBanner.analytics.title')}</h4>
                                <p className="text-sm text-gray-600">{t('cookieBanner.analytics.description')}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={consentState.analytics}
                                  onChange={() => toggleConsent('analytics')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                              </label>
                            </div>
                          </div>
                          
                          {/* Marketing Cookies */}
                          <div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-800">{t('cookieBanner.marketing.title')}</h4>
                                <p className="text-sm text-gray-600">{t('cookieBanner.marketing.description')}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={consentState.marketing}
                                  onChange={() => toggleConsent('marketing')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          {t('cookieBanner.dataProcessingInfo')}
                          {' '}
                          <a href="#/datenschutz" className="text-primary-600 hover:text-primary-700 underline">
                            {t('cookieBanner.privacyPolicy')}
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {showSettings ? (
                      <>
                        <Button 
                          variant="primary"
                          size="sm"
                          onClick={handleSavePreferences}
                        >
                          {t('cookieBanner.savePreferences')}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="primary"
                          size="sm"
                          onClick={handleAcceptAll}
                        >
                          {t('cookieBanner.acceptAll')}
                        </Button>
                        
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={handleRejectAll}
                        >
                          {t('cookieBanner.rejectAll')}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;