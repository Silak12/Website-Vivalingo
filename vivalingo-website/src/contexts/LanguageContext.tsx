import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Importiere lokale Übersetzungsdateien
import enTranslations from '../locales/en.json';
import deTranslations from '../locales/de.json';
import esTranslations from '../locales/es.json';
import idTranslations from '../locales/id.json';
import frTranslations from '../locales/fr.json';
import itTranslations from '../locales/it.json';



// Unterstützte Sprachen
export type Language = 'en' | 'de' | 'es' | 'id' | 'fr' | 'it' | 'pt' | 'nl' | 'pl' | 'ru' | 'tr' | 'zh';

// Interface für den Kontext
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

// Erstelle den Kontext mit Standardwerten
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

interface LanguageProviderProps {
  children: ReactNode;
}

// Translations Objekt Typ
type Translations = {
  [key: string]: any;
};

// Provider-Komponente
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Versuche die Sprache aus dem localStorage zu holen, Standard ist 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de') 
      ? savedLanguage 
      : 'en';
  });

  // Translations Map
  const translations: Record<Language, Translations> = {
    en: enTranslations,
    de: deTranslations,
    es: esTranslations,
    id: idTranslations,
    fr: frTranslations,
    it: itTranslations,
  };

  // Update html lang attribute when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Split the key by dots
    const keys = key.split('.');
    let value: any = translations[language];
    
    // Navigate through the nested keys
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // If key is not found in current language, try English
        if (language !== 'en') {
          let fallbackValue = translations.en;
          let fallbackFound = true;
          
          // Try to find the key in English translations
          for (const fk of keys) {
            if (fallbackValue && fallbackValue[fk] !== undefined) {
              fallbackValue = fallbackValue[fk];
            } else {
              fallbackFound = false;
              break;
            }
          }
          
          // If found in English, return that
          if (fallbackFound && typeof fallbackValue === 'string') {
            console.log(`Key ${key} not found in ${language}, using English fallback`);
            value = fallbackValue;
            break;
          }
        }
        
        // Return the key if not found
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // Handle if the value is not a string (object, array)
    if (typeof value !== 'string') {
      console.warn(`Translation key ${key} is not a string but ${typeof value}`);
      return key;
    }

    // Replace parameters if any
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(`{${paramKey}}`, String(paramValue));
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook für einfachen Zugriff auf den Sprachkontext
export const useLanguage = () => useContext(LanguageContext);