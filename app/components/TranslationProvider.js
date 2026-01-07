'use client';

import { createContext, useContext } from 'react';

const TranslationContext = createContext(null);

export function TranslationProvider({ children, messages }) {
  return (
    <TranslationContext.Provider value={messages}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const messages = useContext(TranslationContext);
  if (!messages) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }

  const translate = (key, params = {}) => {
    let message = messages;
    const path = key.split('.');
    for (let i = 0; i < path.length; i++) {
      if (message && message[path[i]]) {
        message = message[path[i]];
      } else {
        return key; // Return the key if translation is not found
      }
    }

    let translatedString = message; // This is the string we'll replace placeholders in
    for (const paramKey in params) {
        translatedString = translatedString.replace(`{${paramKey}}`, params[paramKey]);
    }
    return translatedString;
  };

  return translate;
}

