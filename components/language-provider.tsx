"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { LANGUAGE_STORAGE_KEY, type LanguageCode, isLanguageCode } from "@/lib/language";

type LanguageContextValue = {
  languageCode: LanguageCode;
  setLanguageCode: (languageCode: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [languageCode, setLanguageCodeState] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && isLanguageCode(stored)) setLanguageCodeState(stored);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      languageCode,
      setLanguageCode(nextLanguageCode) {
        setLanguageCodeState(nextLanguageCode);
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguageCode);
        document.documentElement.lang = nextLanguageCode;
      }
    }),
    [languageCode]
  );

  useEffect(() => {
    document.documentElement.lang = languageCode;
  }, [languageCode]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider.");
  }
  return context;
}
