import { createContext, useContext, useSyncExternalStore, useCallback, type ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: Record<Language, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'fr';
  const saved = localStorage.getItem('i18nextLng') ?? 'en';
  return (saved === 'en' || saved === 'fr') ? saved : 'fr';
}

const languageListeners = new Set<() => void>();
function subscribeToLanguage(cb: () => void) {
  languageListeners.add(cb);
  return () => languageListeners.delete(cb);
}

function getServerSnapshot(): Language {
  return 'fr';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getStoredLanguage,
    getServerSnapshot
  );

  const setLanguage = useCallback((lang: Language) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18nextLng', lang);
      languageListeners.forEach((l) => l());
    }
  }, []);

  const t = useCallback((translations: Record<Language, string>) => {
    return translations[language];
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
