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
    chronicConditions: string[];
    allergies: string[];
    medications: string[];
  };
  insuranceProfile: {
    status: string;
    planType: string;
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
    chronicConditions: [],
    allergies: [],
    medications: []
  },
  insuranceProfile: {
    status: "Active",
    planType: "PPO",
    copay: "$35",
    deductible: "$1,250 / $2,000",
    inNetworkPreference: "Preferred"
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

export const defaultHistory: SymptomHistoryItem[] = [
  { symptom: "Fever + cough", risk: "Moderate", care: "Primary Care", date: "May 19, 2025 10:24 AM", tone: "warning" },
  { symptom: "Headache", risk: "Low", care: "Self Care", date: "May 16, 2025 08:15 PM", tone: "success" },
  { symptom: "Stomach pain", risk: "Moderate", care: "Primary Care", date: "May 14, 2025 11:47 AM", tone: "warning" },
  { symptom: "Sore throat", risk: "Low", care: "Self Care", date: "May 10, 2025 09:02 AM", tone: "teal" },
  { symptom: "Fatigue", risk: "Moderate", care: "Primary Care", date: "May 7, 2025 04:30 PM", tone: "warning" }
];

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
