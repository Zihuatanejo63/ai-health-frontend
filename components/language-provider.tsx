"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode
} from "react";
import { type LanguageCode } from "@/lib/settings";
import { useSettings } from "@/components/settings-provider";

type LanguageContextValue = {
  languageCode: LanguageCode;
  setLanguageCode: (languageCode: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { settings, setLanguage } = useSettings();

  const value = useMemo<LanguageContextValue>(
    () => ({
      languageCode: settings.language,
      setLanguageCode: setLanguage
    }),
    [settings.language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider.");
  }
  return context;
}
