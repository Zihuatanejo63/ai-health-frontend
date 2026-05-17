import { getSymptomCategory } from "@/lib/symptomLibrary";

export type RiskLevel = "Low" | "Moderate" | "High" | "Emergency" | "Crisis";
export type RecommendedCare =
  | "Self-care and monitoring"
  | "Telehealth may be appropriate"
  | "Primary Care within 24–72 hours"
  | "Urgent Care today"
  | "Emergency care now"
  | "Crisis support now";

export type SymptomCheckInput = {
  selectedSymptoms?: string[];
  symptoms?: string[];
  primarySymptom?: string;
  details?: Record<string, unknown>;
  duration?: string;
  trend?: string;
  severity?: string;
  painScore?: number | string;
  functionImpact?: Record<string, boolean>;
  redFlags?: Record<string, boolean> | string[];
  healthBackground?: Record<string, unknown>;
};

export type DoctorReadySummary = {
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

export type TriageResult = {
  riskLevel: RiskLevel;
  recommendedCare: RecommendedCare;
  score: number;
  reasons: string[];
  redFlagsFound: string[];
  redFlagsChecked: string[];
  possibleCauses: string[];
  whatToMonitor: string[];
  escalationAdvice: string[];
  doctorReadySummary: DoctorReadySummary;
  disclaimer: string;
  why: string;
  isCrisis: boolean;
};

const DISCLAIMER = "This is not a diagnosis. This tool supports care guidance and does not replace professional medical care.";

const redFlagKeys = [
  "chestPainOrPressure",
  "troubleBreathing",
  "confusion",
  "hardToWake",
  "seizure",
  "fainting",
  "strokeLikeSymptoms",
  "severeBleeding",
  "severeAllergicReaction",
  "blueOrGrayLips",
  "stiffNeck",
  "rashWithFever",
  "severeDehydration",
  "persistentVomiting",
  "bloodInVomit",
  "bloodInStool",
  "blackStool",
  "severeAbdominalPain",
  "notUrinating",
  "suicidalThoughts",
  "selfHarmThoughts"
];

const aliases: Record<string, string> = {
  "chest-pain": "chestPain",
  "shortness-of-breath": "shortnessOfBreath",
  "trouble-breathing": "troubleBreathing",
  "suicidal-thoughts": "suicidalThoughts",
  "self-harm-thoughts": "selfHarmThoughts",
  "sore-throat": "soreThroat",
  "runny-nose": "runnyNose",
  "abdominal-pain": "abdominalPain",
  "stomach-pain": "stomachPain",
  "black-stool": "blackStool",
  "blood-in-stool": "bloodInStool",
  "severe-abdominal-pain": "severeAbdominalPain",
  "stroke-like-symptoms": "strokeLikeSymptoms",
  "stiff-neck": "stiffNeck",
  "severe-dehydration": "severeDehydration",
  "persistent-vomiting": "persistentVomiting",
  "blood-in-stool-or-vomit": "bloodInStoolOrVomit",
  "flank-pain": "flankPain"
};

function canonical(value: string) {
  return aliases[value] ?? value;
}

function toBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return ["yes", "true", "1", "y"].includes(value.toLowerCase());
  return Boolean(value);
}

function toNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function normalize(input: SymptomCheckInput) {
  const selectedSymptoms = (input.selectedSymptoms ?? input.symptoms ?? []).map(canonical);
  const details = input.details ?? {};
  const detailsTrue = Object.fromEntries(Object.entries(details).map(([key, value]) => [key, toBoolean(value)]));
  const redFlagsInput = input.redFlags ?? {};
  const redFlags: Record<string, boolean> = Array.isArray(redFlagsInput)
    ? Object.fromEntries(redFlagsInput.map((item) => [canonical(item), true]))
    : Object.fromEntries(Object.entries(redFlagsInput).map(([key, value]) => [canonical(key), toBoolean(value)]));
  const parsedImpact =
    typeof details.functionImpact === "string"
      ? (() => {
          try {
            return JSON.parse(details.functionImpact as string) as Record<string, boolean>;
          } catch {
            return {};
          }
        })()
      : {};
  const functionImpact = { ...parsedImpact, ...(input.functionImpact ?? {}) };
  const healthBackground = input.healthBackground ?? {};
  const primarySymptom = canonical(input.primarySymptom ?? selectedSymptoms[0] ?? "");
  return {
    selectedSymptoms,
    primarySymptom,
    details,
    detailsTrue,
    duration: String(input.duration ?? details.duration ?? ""),
    trend: String(input.trend ?? details.trend ?? ""),
    severity: String(input.severity ?? "mild").toLowerCase(),
    painScore: toNumber(input.painScore ?? details.painScore),
    functionImpact,
    redFlags,
    healthBackground
  };
}

function has(symptoms: string[], symptom: string) {
  return symptoms.includes(canonical(symptom));
}

function anyTrue(record: Record<string, boolean>, keys: string[]) {
  return keys.some((key) => record[key]);
}

function buildChecked(redFlags: Record<string, boolean>, detailsTrue: Record<string, boolean>) {
  const checked = new Set<string>();
  redFlagKeys.forEach((key) => {
    if (key in redFlags) checked.add(key);
  });
  ["troubleBreathing", "chestPainOrPressure", "confusion", "seizure", "fainting", "suicidalThoughts", "selfHarmThoughts"].forEach((key) => {
    if (key in detailsTrue) checked.add(key);
  });
  return Array.from(checked);
}

function buildFound(redFlags: Record<string, boolean>, detailsTrue: Record<string, boolean>, selectedSymptoms: string[]) {
  const found = new Set<string>();
  redFlagKeys.forEach((key) => {
    if (redFlags[key] || detailsTrue[key]) found.add(key);
  });
  if (has(selectedSymptoms, "chest-pain")) found.add("chestPainOrPressure");
  if (has(selectedSymptoms, "shortness-of-breath")) found.add("troubleBreathing");
  if (has(selectedSymptoms, "confusion")) found.add("confusion");
  if (has(selectedSymptoms, "seizure")) found.add("seizure");
  if (has(selectedSymptoms, "fainting")) found.add("fainting");
  if (has(selectedSymptoms, "suicidal-thoughts")) found.add("suicidalThoughts");
  if (has(selectedSymptoms, "self-harm-thoughts")) found.add("selfHarmThoughts");
  return Array.from(found);
}

function hasBackgroundFlag(background: Record<string, unknown>, key: string) {
  return toBoolean(background[key]);
}

function possibleCauses(primarySymptom: string, selectedSymptoms: string[], riskLevel: RiskLevel) {
  const category = getSymptomCategory(primarySymptom);
  if (riskLevel === "Crisis" || category === "mental") return ["Safety support"];
  if (category === "respiratory") return ["Common cold", "Flu-like illness", "COVID-like respiratory infection", "Throat infection", "Bronchitis-like illness"];
  if (category === "digestive") return ["Viral gastroenteritis", "Food-related stomach upset", "Acid reflux", "Constipation", "Other digestive irritation"];
  if (category === "urinary") return ["Urinary tract infection-like symptoms", "Bladder irritation", has(selectedSymptoms, "flank-pain") ? "Kidney stone-like pain if flank pain is present" : "Other urinary irritation"];
  if (category === "neurological") return ["Migraine-like symptoms", "Dehydration-related dizziness", "Neurological symptoms that may require care if warning signs are present"];
  if (category === "pain") return ["Muscle strain", "Tension-type headache", "Migraine-like headache", "Injury-related pain", "Other non-specific pain causes"];
  return ["Common illness", "Mild infection", "Other non-specific symptom causes"];
}

function whatToMonitor(primarySymptom: string) {
  const category = getSymptomCategory(primarySymptom);
  const common = [
    "Fever or temperature changes",
    "Breathing difficulty",
    "Hydration and urination",
    "Worsening fatigue or weakness",
    "Symptoms lasting longer than expected",
    "Symptoms that improve and then worsen again"
  ];
  if (category === "respiratory") return [...common, "Breathing", "Chest discomfort", "Fever pattern", "Oxygen-related warning signs if available"];
  if (category === "digestive") return [...common, "Vomiting frequency", "Blood in stool or black stool", "Severe or worsening abdominal pain"];
  if (category === "neurological") return [...common, "Speech changes", "One-sided weakness or numbness", "Confusion", "Vision changes", "Fainting or seizure"];
  return common;
}

function escalationAdvice(riskLevel: RiskLevel) {
  if (riskLevel === "Crisis") {
    return [
      "If you may hurt yourself or someone else, seek immediate help now.",
      "Contact local emergency services or a crisis hotline in your country."
    ];
  }
  if (riskLevel === "Emergency") return ["Seek emergency medical help now.", "Do not delay care if symptoms are severe or rapidly worsening."];
  if (riskLevel === "High") return ["Consider urgent care today, especially if symptoms are worsening or you have higher-risk health background."];
  if (riskLevel === "Moderate") return ["Consider contacting a clinician if symptoms persist, worsen, or interfere with daily activities."];
  return ["Seek care if symptoms worsen, last longer than expected, or new warning signs appear."];
}

function questionsToAsk(riskLevel: RiskLevel) {
  if (riskLevel === "Crisis") return ["Seek immediate crisis support now."];
  if (riskLevel === "Emergency") return ["Seek emergency care now."];
  if (riskLevel === "High") return ["Should I go to urgent care today?", "What warning signs require emergency care?", "Should I avoid waiting for a routine appointment?"];
  if (riskLevel === "Moderate") return ["Do I need an in-person visit?", "Are any tests recommended?", "What symptoms would make this urgent?"];
  return ["What symptoms should I monitor?", "When should I seek care if things change?"];
}

function makeResult(
  input: ReturnType<typeof normalize>,
  riskLevel: RiskLevel,
  recommendedCare: RecommendedCare,
  score: number,
  reasons: string[],
  redFlagsFound: string[]
): TriageResult {
  const redFlagsChecked = buildChecked(input.redFlags, input.detailsTrue);
  const doctorReadySummary: DoctorReadySummary = {
    primarySymptom: input.primarySymptom,
    selectedSymptoms: input.selectedSymptoms,
    duration: input.duration,
    trend: input.trend,
    severity: input.severity,
    painScore: input.painScore,
    redFlagsFound,
    redFlagsChecked,
    healthBackground: input.healthBackground,
    questionsToAsk: questionsToAsk(riskLevel)
  };
  return {
    riskLevel,
    recommendedCare,
    score,
    reasons,
    redFlagsFound,
    redFlagsChecked,
    possibleCauses: possibleCauses(input.primarySymptom, input.selectedSymptoms, riskLevel),
    whatToMonitor: whatToMonitor(input.primarySymptom),
    escalationAdvice: escalationAdvice(riskLevel),
    doctorReadySummary,
    disclaimer: DISCLAIMER,
    why: reasons[0] ?? DISCLAIMER,
    isCrisis: riskLevel === "Crisis"
  };
}

function addScore(reasons: string[], reason: string, score: number, amount: number) {
  if (amount > 0) reasons.push(reason);
  return score + amount;
}

export function evaluateTriage(rawInput: SymptomCheckInput): TriageResult {
  const input = normalize(rawInput);
  const { selectedSymptoms, redFlags, detailsTrue, healthBackground } = input;
  const found = buildFound(redFlags, detailsTrue, selectedSymptoms);
  const reasonSet = new Set<string>();

  const crisis =
    detailsTrue.suicidalThoughts ||
    detailsTrue.selfHarmThoughts ||
    detailsTrue.immediateDanger ||
    redFlags.suicidalThoughts ||
    redFlags.selfHarmThoughts ||
    has(selectedSymptoms, "suicidal-thoughts") ||
    has(selectedSymptoms, "self-harm-thoughts");
  if (crisis) {
    return makeResult(input, "Crisis", "Crisis support now", 99, [
      "You reported thoughts of self-harm or suicide.",
      "This requires immediate support rather than a standard symptom assessment."
    ], found);
  }

  const chestAndBreathing =
    (detailsTrue.chestPainOrPressure || redFlags.chestPainOrPressure || has(selectedSymptoms, "chest-pain")) &&
    (detailsTrue.troubleBreathing || redFlags.troubleBreathing || has(selectedSymptoms, "shortness-of-breath"));
  const emergencyFlags = ["confusion", "hardToWake", "seizure", "fainting", "strokeLikeSymptoms", "oneSidedWeaknessOrNumbness", "troubleSpeaking", "severeAllergicReaction", "blueOrGrayLips", "severeBleeding"];
  if (chestAndBreathing || anyTrue({ ...redFlags, ...detailsTrue }, emergencyFlags)) {
    const reasons = ["You reported warning signs that may require emergency care."];
    if (chestAndBreathing) reasons.push("Chest pain with trouble breathing can be serious and should be evaluated urgently.");
    return makeResult(input, "Emergency", "Emergency care now", 99, reasons, found);
  }

  const fever = has(selectedSymptoms, "fever");
  const severe = input.severity === "severe";
  if (fever && (redFlags.stiffNeck || detailsTrue.stiffNeck)) {
    return makeResult(input, "Emergency", "Emergency care now", 98, ["Fever with a stiff neck can be an emergency warning sign."], found);
  }
  if (fever && redFlags.rashWithFever && severe) {
    return makeResult(input, "Emergency", "Emergency care now", 98, ["Fever with rash and severe symptoms can require emergency evaluation."], found);
  }
  if ((redFlags.severeAbdominalPain || detailsTrue.suddenSeverePain) && (redFlags.bloodInStool || redFlags.blackStool || redFlags.bloodInVomit || detailsTrue.bloodInStoolOrBlackStool)) {
    return makeResult(input, "Emergency", "Emergency care now", 98, ["Severe abdominal pain with bleeding signs may require emergency evaluation."], found);
  }

  const pregnancyConcern =
    (detailsTrue.pregnancyPossible || hasBackgroundFlag(healthBackground, "pregnantOrPossiblyPregnant")) &&
    (has(selectedSymptoms, "abdominal-pain") || has(selectedSymptoms, "stomach-pain") || has(selectedSymptoms, "vaginal-bleeding") || detailsTrue.suddenSeverePain);
  if (pregnancyConcern) {
    return makeResult(input, "High", "Urgent Care today", 8, ["Pregnancy or possible pregnancy with abdominal pain, bleeding, or severe pain should be reviewed promptly."], found);
  }
  if (fever && redFlags.rashWithFever) {
    return makeResult(input, "High", "Urgent Care today", 8, ["Fever with rash may need same-day medical review."], found);
  }
  if (redFlags.persistentVomiting && redFlags.severeDehydration) {
    return makeResult(input, "High", "Urgent Care today", 8, ["Persistent vomiting with dehydration can require same-day care."], found);
  }
  if (redFlags.notUrinating || input.functionImpact.notUrinatingOrVeryLittle) {
    return makeResult(input, "High", "Urgent Care today", 8, ["Very little or no urination can be a sign of dehydration or another urgent problem."], found);
  }
  if ((has(selectedSymptoms, "shortness-of-breath") || detailsTrue.troubleBreathing) && severe) {
    return makeResult(input, "High", "Urgent Care today", 8, ["Severe breathing symptoms should be assessed promptly."], found);
  }

  const reasons: string[] = [];
  let score = 0;
  const durationScores: Record<string, number> = { lessThan24h: 0, oneToThreeDays: 0, fourToSevenDays: 1, moreThanSevenDays: 2, moreThanTwoWeeks: 3 };
  score = addScore(reasons, "Your symptoms have lasted longer than a short, self-limited episode.", score, durationScores[input.duration] ?? 0);
  const trendScores: Record<string, number> = { gettingBetter: 0, unchanged: 1, gettingWorse: 2, improvedThenWorsened: 3 };
  score = addScore(reasons, "Your symptoms are not clearly improving or have worsened.", score, trendScores[input.trend] ?? 0);
  const severityScores: Record<string, number> = { mild: 0, moderate: 1, severe: 3 };
  score = addScore(reasons, "You reported moderate or severe symptoms.", score, severityScores[input.severity] ?? 0);
  const painScore = input.painScore ?? 0;
  score = addScore(reasons, "Your pain score increases the need for clinical review.", score, painScore >= 7 ? 3 : painScore >= 4 ? 1 : 0);
  const impactScores: Record<string, number> = { sleepAffected: 1, eatingDrinkingAffected: 2, unableToWorkOrWalkNormally: 2, hardToStayAwake: 3, veryWeakOrUnsteady: 2, notUrinatingOrVeryLittle: 3 };
  Object.entries(impactScores).forEach(([key, amount]) => {
    score = addScore(reasons, "Your symptoms are affecting important daily function.", score, input.functionImpact[key] ? amount : 0);
  });
  const backgroundScores: Record<string, number> = { pregnantOrPossiblyPregnant: 2, child: 2, olderAdult: 2, immunocompromised: 3, heartDisease: 2, diabetes: 2, asthmaOrChronicLungDisease: 2, kidneyDisease: 2, recentSurgery: 2 };
  Object.entries(backgroundScores).forEach(([key, amount]) => {
    score = addScore(reasons, "Your health background may make follow-up more important.", score, hasBackgroundFlag(healthBackground, key) ? amount : 0);
  });
  if (fever && (has(selectedSymptoms, "cough") || has(selectedSymptoms, "sore-throat") || has(selectedSymptoms, "runny-nose"))) {
    score = addScore(reasons, "Fever with respiratory symptoms can need monitoring or follow-up if it persists.", score, 1);
  }
  if (fever && input.duration === "moreThanSevenDays") score = addScore(reasons, "Fever lasting more than 7 days should be reviewed.", score, 2);
  if (has(selectedSymptoms, "shortness-of-breath")) score = addScore(reasons, "Shortness of breath raises the care priority.", score, 2);
  if (has(selectedSymptoms, "chest-pain")) score = addScore(reasons, "Chest pain raises the care priority.", score, 3);
  if ((has(selectedSymptoms, "abdominal-pain") || has(selectedSymptoms, "stomach-pain")) && has(selectedSymptoms, "vomiting")) score = addScore(reasons, "Abdominal pain with vomiting may need closer follow-up.", score, 1);
  if ((has(selectedSymptoms, "abdominal-pain") || has(selectedSymptoms, "stomach-pain")) && has(selectedSymptoms, "diarrhea")) score = addScore(reasons, "Abdominal pain with diarrhea may need hydration monitoring.", score, 1);
  if (has(selectedSymptoms, "dizziness") && has(selectedSymptoms, "weakness")) score = addScore(reasons, "Dizziness with weakness raises concern for dehydration or other causes.", score, 2);

  let riskLevel: RiskLevel = "Low";
  let recommendedCare: RecommendedCare = "Self-care and monitoring";
  if (score >= 9) {
    riskLevel = found.length ? "Emergency" : "High";
    recommendedCare = found.length ? "Emergency care now" : "Urgent Care today";
  } else if (score >= 6) {
    riskLevel = "High";
    recommendedCare = "Urgent Care today";
  } else if (score >= 3) {
    riskLevel = "Moderate";
    recommendedCare = input.duration === "moreThanSevenDays" || input.trend === "gettingWorse" ? "Primary Care within 24–72 hours" : "Telehealth may be appropriate";
  }

  if (riskLevel === "Low") {
    reasonSet.add("You reported mild symptoms without emergency warning signs.");
    reasonSet.add("Your symptoms have not been reported as worsening rapidly.");
  } else if (riskLevel === "Moderate") {
    reasonSet.add("Your symptoms have lasted several days or are not clearly improving.");
    reasonSet.add("You did not report emergency warning signs such as chest pain, trouble breathing, confusion, or severe dehydration.");
  } else if (riskLevel === "High") {
    reasonSet.add("Your symptoms include factors that may require same-day care.");
    reasonSet.add("You reported worsening symptoms or significant functional impact.");
  }
  reasons.forEach((reason) => reasonSet.add(reason));
  return makeResult(input, riskLevel, recommendedCare, score, Array.from(reasonSet).slice(0, 5), found);
}
