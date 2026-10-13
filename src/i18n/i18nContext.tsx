import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from './en.json';
import bnTranslations from './bn.json';
import { Language } from '../types';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (keyPath: string) => string;
  speakText: (text: string, lang?: Language) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  lowBandwidthMode: boolean;
  setLowBandwidthMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

const translations: Record<Language, any> = {
  en: enTranslations,
  bn: bnTranslations,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bn'); // Default to Bengali as requested for coastal and rural Bangladesh target audience
  const [lowBandwidthMode, setLowBandwidthMode] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Sync document language attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let current: any = translations[language];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English if key missing in Bengali
        let fallback: any = translations.en;
        for (const fbKey of keys) {
          if (fallback && typeof fallback === 'object' && fbKey in fallback) {
            fallback = fallback[fbKey];
          } else {
            return keyPath;
          }
        }
        return typeof fallback === 'string' ? fallback : keyPath;
      }
    }
    return typeof current === 'string' ? current : keyPath;
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speakText = (text: string, lang?: Language) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    stopSpeaking();

    const targetLang = lang || language;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLang === 'bn' ? 'bn-BD' : 'en-US';
    utterance.rate = 0.9; // Slightly slower for clarity with children
    utterance.pitch = 1.1; // Friendly warm pitch

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        speakText,
        stopSpeaking,
        isSpeaking,
        lowBandwidthMode,
        setLowBandwidthMode,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
