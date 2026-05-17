"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import {
  HISTORY_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  SUMMARIES_STORAGE_KEY,
  SYMPTOM_CHECKS_STORAGE_KEY,
  defaultSettings,
  mergeSettings,
  readSettings,
  writeSettings,
  type HealthMatchSettings,
  type LanguageCode
} from "@/lib/settings";

type SettingsContextValue = {
  settings: HealthMatchSettings;
  updateSettings: (updater: Partial<HealthMatchSettings> | ((current: HealthMatchSettings) => HealthMatchSettings)) => void;
  setLanguage: (language: LanguageCode) => void;
  resetAll: () => void;
  clearHistory: () => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<HealthMatchSettings>(defaultSettings);

  useEffect(() => {
    const next = readSettings();
    setSettings(next);
    document.documentElement.lang = next.language;
  }, []);

  const commit = useCallback((next: HealthMatchSettings) => {
    setSettings(next);
    writeSettings(next);
    document.documentElement.lang = next.language;
  }, []);

  const updateSettings = useCallback(
    (updater: Partial<HealthMatchSettings> | ((current: HealthMatchSettings) => HealthMatchSettings)) => {
      setSettings((current) => {
        const next = typeof updater === "function" ? updater(current) : mergeSettings({ ...current, ...updater });
        writeSettings(next);
        document.documentElement.lang = next.language;
        return next;
      });
    },
    []
  );

  const setLanguage = useCallback(
    (language: LanguageCode) => {
      updateSettings((current) => ({ ...current, language }));
    },
    [updateSettings]
  );

  const resetAll = useCallback(() => {
    if (typeof window !== "undefined") {
          window.localStorage.removeItem(SETTINGS_STORAGE_KEY);
          window.localStorage.removeItem(HISTORY_STORAGE_KEY);
          window.localStorage.removeItem(SYMPTOM_CHECKS_STORAGE_KEY);
          window.localStorage.removeItem(SUMMARIES_STORAGE_KEY);
          window.localStorage.removeItem("healthmatchai_user");
          window.localStorage.removeItem("healthmatchai_accounts");
          window.localStorage.removeItem("healthmatchai_auth_accounts");
    }
    commit(defaultSettings);
  }, [commit]);

  const clearHistory = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([]));
      window.localStorage.setItem(SYMPTOM_CHECKS_STORAGE_KEY, JSON.stringify([]));
    }
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({
      settings,
      updateSettings,
      setLanguage,
      resetAll,
      clearHistory
    }),
    [settings, updateSettings, setLanguage, resetAll, clearHistory]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider.");
  return context;
}
