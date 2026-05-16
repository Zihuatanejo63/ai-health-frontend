"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { LANGUAGES, type LanguageCode } from "@/lib/settings";
import { getTranslation } from "@/lib/translations";
import { useSettings } from "@/components/settings-provider";

type I18nContextValue = {
  language: LanguageCode;
  languages: typeof LANGUAGES;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { settings, setLanguage } = useSettings();

  const value = useMemo<I18nContextValue>(
    () => ({
      language: settings.language,
      languages: LANGUAGES,
      setLanguage,
      t(key) {
        return getTranslation(settings.language, key);
      }
    }),
    [settings.language, setLanguage]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider.");
  return context;
}
