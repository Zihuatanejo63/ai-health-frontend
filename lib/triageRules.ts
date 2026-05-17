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

const riskOrder: RiskLevel[] = ["Low", "Moderate", "High", "Emergency"];

function hasBackgroundRisk(input: TriageInput) {
  const values = Object.values(input.healthBackground).map((value) => String(value).toLowerCase());
  return values.some((value) => {
    if (!value || value === "no" || value === "none" || value === "false") return false;
    return (
      value.includes("pregnan") ||
      value.includes("chronic") ||
      value.includes("diabetes") ||
      value.includes("heart") ||
      value.includes("lung") ||
      value.includes("kidney") ||
      value.includes("cancer") ||
      value.includes("immune") ||
      value.includes("immunocompromised") ||
      value.includes("yes")
    );
  });
}

function applyBackgroundRisk(result: TriageResult, input: TriageInput): TriageResult {
  if (result.isCrisis || result.riskLevel === "Emergency" || !hasBackgroundRisk(input)) return result;
  const nextRisk = riskOrder[Math.min(riskOrder.indexOf(result.riskLevel as RiskLevel) + 1, riskOrder.length - 1)];
  const nextCare: RecommendedCare =
    result.recommendedCare === "Self-care"
      ? "Telehealth"
      : result.recommendedCare === "Telehealth"
        ? "Primary Care"
        : result.recommendedCare === "Primary Care"
          ? "Urgent Care"
          : result.recommendedCare;
  return {
    ...result,
    riskLevel: nextRisk,
    recommendedCare: nextCare,
    why: "Your health background may make follow-up more important."
  };
}

export function evaluateTriage(input: TriageInput): TriageResult {
  const symptoms = input.symptoms;
  const redFlags = input.redFlags;
  const severity = input.severity.toLowerCase();
  const duration = input.duration.toLowerCase();
  const trend = String(input.details?.trend ?? "").toLowerCase();
  const allSignals = [...symptoms, ...redFlags];

  if (hasAny(allSignals, ["suicidal-thoughts", "self-harm-thoughts", "Suicidal thoughts", "Self-harm thoughts"])) {
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
    (hasAny(symptoms, ["chest-pain", "Chest pain"]) && hasAny(allSignals, ["trouble-breathing", "shortness-of-breath", "Trouble breathing", "Shortness of breath"])) ||
    hasAny(redFlags, ["confusion", "seizure", "fainting", "stroke-like-symptoms", "Confusion", "Seizure", "Fainting", "Stroke-like symptoms"])
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

  if (hasAny(allSignals, ["blood-in-stool-or-vomit", "Blood in stool or vomit"]) && hasAny(allSignals, ["severe-abdominal-pain", "Severe abdominal pain"])) {
    return applyBackgroundRisk({
      riskLevel: "Emergency",
      recommendedCare: "Emergency",
      possibleCauses: ["Emergency condition requiring urgent evaluation"],
      whatToMonitor: ["Pain location", "Vomiting", "Hydration", "Blood in stool or vomit"],
      why: "Severe abdominal pain with bleeding signals may need emergency evaluation.",
      isCrisis: false
    }, input);
  }

  if (
    hasAny(redFlags, ["blood-in-stool-or-vomit", "severe-abdominal-pain", "Blood in stool or vomit", "Severe abdominal pain"]) ||
    (hasAny(symptoms, ["abdominal-pain", "stomach-pain", "Abdominal pain", "Stomach pain"]) && severity === "severe")
  ) {
    return applyBackgroundRisk({
      riskLevel: "High",
      recommendedCare: "Urgent Care",
      possibleCauses: ["Digestive infection", "Inflammation", "Other abdominal condition"],
      whatToMonitor: ["Pain location", "Fever", "Vomiting", "Hydration", "Blood in stool or vomit"],
      why: "Severe abdominal symptoms or bleeding signals need same-day clinical review.",
      isCrisis: false
    }, input);
  }

  if (hasAny(symptoms, ["shortness-of-breath", "Shortness of breath"]) && severity === "severe") {
    return applyBackgroundRisk({
      riskLevel: "High",
      recommendedCare: "Urgent Care",
      possibleCauses: ["Respiratory infection", "Asthma-like flare", "Other breathing concern"],
      whatToMonitor: ["Breathing effort", "Chest tightness", "Wheezing", "Fever"],
      why: "Severe breathing symptoms should be assessed promptly.",
      isCrisis: false
    }, input);
  }

  if (hasAny(symptoms, ["fever", "Fever"]) && (duration.includes("more than 7") || trend.includes("worse"))) {
    return applyBackgroundRisk({
      riskLevel: "Moderate",
      recommendedCare: trend.includes("worse") ? "Urgent Care" : "Primary Care",
      possibleCauses: ["Viral illness", "Flu-like illness", "Other infection"],
      whatToMonitor: ["Temperature", "Hydration", "Breathing", "Worsening fatigue", "Symptom duration"],
      why: "Fever that lasts longer or is worsening should be reviewed by a clinician.",
      isCrisis: false
    }, input);
  }

  if (hasAny(symptoms, ["runny-nose", "nasal-congestion", "Runny nose", "Nasal congestion"]) && severity === "mild" && redFlags.length === 0) {
    return applyBackgroundRisk({
      riskLevel: "Low",
      recommendedCare: "Self-care",
      possibleCauses: ["Common cold", "Seasonal allergies", "Mild viral respiratory illness"],
      whatToMonitor: ["Fever", "Breathing", "Hydration", "Symptoms lasting more than 7 days"],
      why: "Mild upper respiratory symptoms without red flags often improve with home monitoring.",
      isCrisis: false
    }, input);
  }

  if (redFlags.length > 0 || severity === "severe") {
    return applyBackgroundRisk({
      riskLevel: "High",
      recommendedCare: "Urgent Care",
      possibleCauses: ["Infection", "Inflammation", "Condition needing prompt review"],
      whatToMonitor: ["Worsening symptoms", "Hydration", "Pain level", "New warning signs"],
      why: "Your answers include higher-risk symptoms or warning signs.",
      isCrisis: false
    }, input);
  }

  return applyBackgroundRisk({
    riskLevel: severity === "moderate" ? "Moderate" : "Low",
    recommendedCare: severity === "moderate" ? "Primary Care" : "Self-care",
    possibleCauses: ["Common illness", "Mild infection", "Non-urgent condition"],
    whatToMonitor: ["Symptoms getting worse", "Fever", "Hydration", "Duration longer than expected"],
    why: "Your answers do not include emergency warning signs, but follow-up may help if symptoms persist.",
    isCrisis: false
  }, input);
}
