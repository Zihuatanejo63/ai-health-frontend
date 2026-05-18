export const SETTINGS_STORAGE_KEY = "healthmatchai_settings";
export const HISTORY_STORAGE_KEY = "healthmatchai_history";
export const SYMPTOM_CHECKS_STORAGE_KEY = "healthmatchai_symptom_checks";
export const SUMMARIES_STORAGE_KEY = "healthmatchai_summaries";

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "nl", name: "Nederlands" },
  { code: "sv", name: "Svenska" },
  { code: "da", name: "Dansk" },
  { code: "no", name: "Norsk" },
  { code: "fi", name: "Suomi" }
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export type HealthMatchSettings = {
  language: LanguageCode;
  account: {
    name: string;
    email: string;
  };
  healthProfile: {
    age: string;
    sex: string;
    pregnancyStatus: string;
    chronicConditions: string[];
    allergies: string[];
    medications: string[];
  };
  insuranceProfile: {
    status: string;
    planType: string;
    urgentCareCopay: string;
    primaryCareCopay: string;
    copay: string;
    deductible: string;
    inNetworkPreference: string;
  };
  notifications: {
    symptomFollowUp: boolean;
    reportReady: boolean;
    tipsUpdates: boolean;
  };
  subscription: {
    plan: "Free" | "Premium";
  };
};

export type SymptomHistoryItem = {
  symptom: string;
  risk: string;
  care: string;
  date: string;
  tone?: "primary" | "teal" | "success" | "warning" | "danger" | "purple";
};

export type SavedSymptomCheck = {
  id: string;
  createdAt: string;
  input?: Record<string, unknown>;
  symptoms: string[];
  primarySymptom: string;
  duration: string;
  severity: string;
  redFlags: string[];
  healthBackground: Record<string, string | boolean | string[]>;
  result: {
    riskLevel: string;
    recommendedCare: string;
    score?: number;
    reasons?: string[];
    redFlagsFound?: string[];
    redFlagsChecked?: string[];
    possibleCauses: string[];
    whatToMonitor: string[];
    escalationAdvice?: string[];
    carePlan?: {
      titleKey: string;
      summaryKey: string;
      actionKeys: string[];
      avoidKeys: string[];
      seekCareNowKeys: string[];
      categorySpecificTipKeys: string[];
    };
    doctorReadySummary?: {
      primarySymptom: string;
      selectedSymptoms: string[];
      duration?: string;
      trend?: string;
      severity?: string;
      painScore?: number;
      redFlagsFound: string[];
      redFlagsChecked: string[];
      healthBackground: Record<string, unknown>;
      questionsToAsk: string[];
    };
    disclaimer?: string;
    why?: string;
    isCrisis?: boolean;
  };
};

export type SavedSummary = {
  id: string;
  createdAt: string;
  checkId: string;
  title: string;
  symptoms: string[];
  riskLevel: string;
  recommendedCare: string;
  carePlanTitleKey?: string;
  carePlanSummaryKey?: string;
  questionsToAsk?: string[];
};

export const defaultSettings: HealthMatchSettings = {
  language: "en",
  account: {
    name: "",
    email: ""
  },
  healthProfile: {
    age: "",
    sex: "",
    pregnancyStatus: "",
    chronicConditions: [],
    allergies: [],
    medications: []
  },
  insuranceProfile: {
    status: "",
    planType: "",
    urgentCareCopay: "",
    primaryCareCopay: "",
    copay: "",
    deductible: "",
    inNetworkPreference: ""
  },
  notifications: {
    symptomFollowUp: true,
    reportReady: true,
    tipsUpdates: true
  },
  subscription: {
    plan: "Free"
  }
};

export function isLanguageCode(value: string): value is LanguageCode {
  return LANGUAGES.some((language) => language.code === value);
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? ({ ...fallback, ...JSON.parse(stored) } as T) : fallback;
  } catch {
    return fallback;
  }
}

export function mergeSettings(value: Partial<HealthMatchSettings>): HealthMatchSettings {
  return {
    ...defaultSettings,
    ...value,
    account: { ...defaultSettings.account, ...value.account },
    healthProfile: { ...defaultSettings.healthProfile, ...value.healthProfile },
    insuranceProfile: { ...defaultSettings.insuranceProfile, ...value.insuranceProfile },
    notifications: { ...defaultSettings.notifications, ...value.notifications },
    subscription: { ...defaultSettings.subscription, ...value.subscription }
  };
}

export function readSettings(): HealthMatchSettings {
  const raw = readJson<Partial<HealthMatchSettings>>(SETTINGS_STORAGE_KEY, defaultSettings);
  return mergeSettings(raw);
}

export function writeSettings(settings: HealthMatchSettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export function readHistory(): SymptomHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function writeHistory(history: SymptomHistoryItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
}

export function readSymptomChecks(): SavedSymptomCheck[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(SYMPTOM_CHECKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function writeSymptomChecks(checks: SavedSymptomCheck[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SYMPTOM_CHECKS_STORAGE_KEY, JSON.stringify(checks));
}

export function readSummaries(): SavedSummary[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(SUMMARIES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function writeSummaries(summaries: SavedSummary[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SUMMARIES_STORAGE_KEY, JSON.stringify(summaries));
}
