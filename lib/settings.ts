export const SETTINGS_STORAGE_KEY = "healthmatchai_settings";
export const HEALTH_PROFILE_STORAGE_KEY = "healthmatchai_health_profile";
export const INSURANCE_PROFILE_STORAGE_KEY = "healthmatchai_insurance_profile";
export const HISTORY_STORAGE_KEY = "healthmatchai_history";
export const SYMPTOM_CHECKS_STORAGE_KEY = "healthmatchai_symptom_checks";
export const SUMMARIES_STORAGE_KEY = "healthmatchai_summaries";

export const ALL_LANGUAGES = [
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

export type LanguageCode = (typeof ALL_LANGUAGES)[number]["code"];

// Only show languages with >95% translation coverage in the language selector
export const LANGUAGES = ALL_LANGUAGES.filter((l) => l.code === "en" || l.code === "zh");

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
    recentSurgery: string;
    highRiskConditions: string[];
  };
  insuranceProfile: {
    status: string;
    planType: string;
    urgentCareCopay: string;
    primaryCareCopay: string;
    copay: string;
    deductible: string;
    inNetworkPreference: string;
    lastUpdated: string;
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
    medications: [],
    recentSurgery: "",
    highRiskConditions: []
  },
  insuranceProfile: {
    status: "",
    planType: "",
    urgentCareCopay: "",
    primaryCareCopay: "",
    copay: "",
    deductible: "",
    inNetworkPreference: "",
    lastUpdated: ""
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
  const merged = {
    ...defaultSettings,
    ...value,
    account: { ...defaultSettings.account, ...value.account },
    healthProfile: { ...defaultSettings.healthProfile, ...value.healthProfile },
    insuranceProfile: { ...defaultSettings.insuranceProfile, ...value.insuranceProfile },
    notifications: { ...defaultSettings.notifications, ...value.notifications },
    subscription: { ...defaultSettings.subscription, ...value.subscription }
  };
  return normalizeLegacyDefaults(merged);
}

export function isLegacyDemoInsuranceProfile(profile: HealthMatchSettings["insuranceProfile"]) {
  const status = profile.status.trim().toLowerCase();
  const planType = profile.planType.trim().toLowerCase();
  const urgentCopay = profile.urgentCareCopay.trim();
  const fallbackCopay = profile.copay.trim();
  const deductible = profile.deductible.trim().replace(/\s+/g, " ");
  const preference = profile.inNetworkPreference.trim().toLowerCase();
  const primaryCopay = profile.primaryCareCopay.trim().toLowerCase();
  const compactValues = Object.values(profile).join(" ").toLowerCase();
  const exactLegacyDefault =
    status === "active" &&
    planType === "ppo" &&
    (urgentCopay === "$35" || fallbackCopay === "$35") &&
    (deductible.includes("$1,250") || deductible.includes("1250")) &&
    preference === "preferred" &&
    (!primaryCopay || primaryCopay === "not recorded" || primaryCopay === "未记录");
  const looseLegacyDefault =
    compactValues.includes("active") &&
    compactValues.includes("ppo") &&
    compactValues.includes("$35") &&
    (compactValues.includes("$1,250") || compactValues.includes("1250")) &&
    compactValues.includes("preferred");
  return exactLegacyDefault || looseLegacyDefault;
}

export function hasUsableInsuranceProfile(profile: HealthMatchSettings["insuranceProfile"]) {
  if (isLegacyDemoInsuranceProfile(profile)) return false;
  return Boolean(
    profile.status.trim() ||
      profile.planType.trim() ||
      profile.urgentCareCopay.trim() ||
      profile.primaryCareCopay.trim() ||
      profile.copay.trim() ||
      profile.deductible.trim() ||
      profile.inNetworkPreference.trim()
  );
}

function hasVerifiedPlusEntitlement() {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem("healthmatchai_entitlement");
    if (!raw) return false;
    const entitlement = JSON.parse(raw) as { plan?: string; status?: string };
    return entitlement.plan === "plus" && entitlement.status === "active";
  } catch {
    return false;
  }
}

function normalizeLegacyDefaults(settings: HealthMatchSettings): HealthMatchSettings {
  return {
    ...settings,
    insuranceProfile: isLegacyDemoInsuranceProfile(settings.insuranceProfile)
      ? defaultSettings.insuranceProfile
      : settings.insuranceProfile,
    subscription:
      settings.subscription.plan === "Premium" && !hasVerifiedPlusEntitlement()
        ? defaultSettings.subscription
        : settings.subscription
  };
}

export function readSettings(): HealthMatchSettings {
  const raw = readJson<Partial<HealthMatchSettings>>(SETTINGS_STORAGE_KEY, defaultSettings);
  const separateHealthProfile = readJson<Partial<HealthMatchSettings["healthProfile"]>>(HEALTH_PROFILE_STORAGE_KEY, {});
  const separateInsuranceProfile = readJson<Partial<HealthMatchSettings["insuranceProfile"]>>(INSURANCE_PROFILE_STORAGE_KEY, {});
  return mergeSettings({
    ...raw,
    healthProfile: { ...defaultSettings.healthProfile, ...raw.healthProfile, ...separateHealthProfile },
    insuranceProfile: { ...defaultSettings.insuranceProfile, ...raw.insuranceProfile, ...separateInsuranceProfile }
  });
}

export function writeSettings(settings: HealthMatchSettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  window.localStorage.setItem(HEALTH_PROFILE_STORAGE_KEY, JSON.stringify(settings.healthProfile));
  window.localStorage.setItem(INSURANCE_PROFILE_STORAGE_KEY, JSON.stringify(settings.insuranceProfile));
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
