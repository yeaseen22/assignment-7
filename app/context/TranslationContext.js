'use client';

import { createContext, useContext } from 'react';

const TranslationContext = createContext(null);

export function TranslationProvider({ dictionary, children }) {
  return (
    <TranslationContext.Provider value={dictionary}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
