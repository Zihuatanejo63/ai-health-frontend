export type RiskLevel = "Low" | "Moderate" | "High" | "Emergency" | "Crisis";
export type RecommendedCare = "Self-care" | "Telehealth" | "Primary Care" | "Urgent Care" | "Emergency" | "Crisis support";

export type TriageInput = {
  symptoms: string[];
  primarySymptom: string;
  duration: string;
  severity: string;
  redFlags: string[];
  healthBackground: Record<string, string | boolean | string[]>;
  details?: Record<string, string>;
};

export type TriageResult = {
  riskLevel: RiskLevel;
  recommendedCare: RecommendedCare;
  possibleCauses: string[];
  whatToMonitor: string[];
  why: string;
  isCrisis: boolean;
};

function hasAny(values: string[], targets: string[]) {
  const normalized = values.map((value) => value.toLowerCase());
  return targets.some((target) => normalized.includes(target.toLowerCase()));
}

export function evaluateTriage(input: TriageInput): TriageResult {
  const symptoms = input.symptoms;
  const redFlags = input.redFlags;
  const severity = input.severity.toLowerCase();
  const duration = input.duration.toLowerCase();
  const trend = String(input.details?.trend ?? "").toLowerCase();
  const allSignals = [...symptoms, ...redFlags];

  if (hasAny(allSignals, ["Suicidal thoughts", "Self-harm thoughts"])) {
    return {
      riskLevel: "Crisis",
      recommendedCare: "Crisis support",
      possibleCauses: ["Emotional distress", "Acute safety concern"],
      whatToMonitor: ["Immediate safety", "Access to means of self-harm", "Support person availability"],
      why: "You selected a safety concern that should not be handled as a routine symptom check.",
      isCrisis: true
    };
  }

  if (
    (hasAny(symptoms, ["Chest pain"]) && hasAny(allSignals, ["Trouble breathing", "Shortness of breath"])) ||
    hasAny(redFlags, ["Confusion", "Seizure", "Fainting", "Stroke-like symptoms"])
  ) {
    return {
      riskLevel: "Emergency",
      recommendedCare: "Emergency",
      possibleCauses: ["Emergency condition requiring urgent evaluation"],
      whatToMonitor: ["Breathing", "Chest symptoms", "Confusion", "Weakness", "Speech changes"],
      why: "Your answers include emergency warning signs that need urgent evaluation.",
      isCrisis: false
    };
  }

  if (
    hasAny(redFlags, ["Blood in stool or vomit", "Severe abdominal pain"]) ||
    (hasAny(symptoms, ["Abdominal pain", "Stomach pain"]) && severity === "severe")
  ) {
    return {
      riskLevel: "High",
      recommendedCare: "Urgent Care",
      possibleCauses: ["Digestive infection", "Inflammation", "Other abdominal condition"],
      whatToMonitor: ["Pain location", "Fever", "Vomiting", "Hydration", "Blood in stool or vomit"],
      why: "Severe abdominal symptoms or bleeding signals need same-day clinical review.",
      isCrisis: false
    };
  }

  if (hasAny(symptoms, ["Shortness of breath"]) && severity === "severe") {
    return {
      riskLevel: "High",
      recommendedCare: "Urgent Care",
      possibleCauses: ["Respiratory infection", "Asthma-like flare", "Other breathing concern"],
      whatToMonitor: ["Breathing effort", "Chest tightness", "Wheezing", "Fever"],
      why: "Severe breathing symptoms should be assessed promptly.",
      isCrisis: false
    };
  }

  if (hasAny(symptoms, ["Fever"]) && (duration.includes("more than 7") || trend === "worse")) {
    return {
      riskLevel: "Moderate",
      recommendedCare: trend === "worse" ? "Urgent Care" : "Primary Care",
      possibleCauses: ["Viral illness", "Flu-like illness", "Other infection"],
      whatToMonitor: ["Temperature", "Hydration", "Breathing", "Worsening fatigue", "Symptom duration"],
      why: "Fever that lasts longer or is worsening should be reviewed by a clinician.",
      isCrisis: false
    };
  }

  if (hasAny(symptoms, ["Runny nose", "Nasal congestion"]) && severity === "mild" && redFlags.length === 0) {
    return {
      riskLevel: "Low",
      recommendedCare: "Self-care",
      possibleCauses: ["Common cold", "Seasonal allergies", "Mild viral respiratory illness"],
      whatToMonitor: ["Fever", "Breathing", "Hydration", "Symptoms lasting more than 7 days"],
      why: "Mild upper respiratory symptoms without red flags often improve with home monitoring.",
      isCrisis: false
    };
  }

  if (redFlags.length > 0 || severity === "severe") {
    return {
      riskLevel: "High",
      recommendedCare: "Urgent Care",
      possibleCauses: ["Infection", "Inflammation", "Condition needing prompt review"],
      whatToMonitor: ["Worsening symptoms", "Hydration", "Pain level", "New warning signs"],
      why: "Your answers include higher-risk symptoms or warning signs.",
      isCrisis: false
    };
  }

  return {
    riskLevel: severity === "moderate" ? "Moderate" : "Low",
    recommendedCare: severity === "moderate" ? "Primary Care" : "Telehealth",
    possibleCauses: ["Common illness", "Mild infection", "Non-urgent condition"],
    whatToMonitor: ["Symptoms getting worse", "Fever", "Hydration", "Duration longer than expected"],
    why: "Your answers do not include emergency warning signs, but follow-up may help if symptoms persist.",
    isCrisis: false
  };
}
