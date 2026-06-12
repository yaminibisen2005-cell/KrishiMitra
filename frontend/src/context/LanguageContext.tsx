/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en, TranslationsType } from '../translations/en';
import { hi } from '../translations/hi';
import { mr } from '../translations/mr';

export type LanguageType = 'en' | 'hi' | 'mr';

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: keyof TranslationsType) => string;
}

const translations: Record<LanguageType, TranslationsType> = {
  en,
  hi,
  mr
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    const saved = localStorage.getItem('krishimitra_language');
    if (saved === 'en' || saved === 'hi' || saved === 'mr') {
      return saved as LanguageType;
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem('krishimitra_language', lang);
  };

  const t = (key: keyof TranslationsType): string => {
    const currentTranslated = translations[language]?.[key];
    if (currentTranslated !== undefined) {
      return currentTranslated;
    }
    // Fallback to English
    return translations['en']?.[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
