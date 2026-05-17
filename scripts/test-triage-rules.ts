import { evaluateTriage, type RecommendedCare, type RiskLevel, type SymptomCheckInput } from "../lib/triageRules";

type TriageCase = {
  name: string;
  input: SymptomCheckInput;
  riskLevel: RiskLevel;
  recommendedCare?: RecommendedCare;
  redFlagsFound?: string[];
  minRisk?: RiskLevel[];
};

const cases: TriageCase[] = [
  {
    name: "Low: mild respiratory symptoms without red flags",
    input: {
      selectedSymptoms: ["runny-nose", "sore-throat"],
      primarySymptom: "runny-nose",
      severity: "mild",
      duration: "oneToThreeDays",
      redFlags: {}
    },
    riskLevel: "Low",
    recommendedCare: "Self-care and monitoring"
  },
  {
    name: "Moderate: fever and cough worsening for several days",
    input: {
      selectedSymptoms: ["fever", "cough"],
      primarySymptom: "fever",
      duration: "fourToSevenDays",
      trend: "gettingWorse",
      severity: "moderate",
      redFlags: {}
    },
    riskLevel: "Moderate",
    recommendedCare: "Primary Care within 24–72 hours"
  },
  {
    name: "Emergency: chest pain and trouble breathing",
    input: {
      selectedSymptoms: ["chest-pain", "shortness-of-breath"],
      primarySymptom: "chest-pain",
      redFlags: { chestPainOrPressure: true, troubleBreathing: true }
    },
    riskLevel: "Emergency",
    recommendedCare: "Emergency care now",
    redFlagsFound: ["chestPainOrPressure", "troubleBreathing"]
  },
  {
    name: "Emergency: fever with stiff neck",
    input: {
      selectedSymptoms: ["fever", "headache"],
      primarySymptom: "fever",
      redFlags: { stiffNeck: true }
    },
    riskLevel: "Emergency",
    recommendedCare: "Emergency care now",
    redFlagsFound: ["stiffNeck"]
  },
  {
    name: "Emergency: abdominal pain with black stool and severe abdominal pain",
    input: {
      selectedSymptoms: ["abdominal-pain", "black-stool"],
      primarySymptom: "abdominal-pain",
      redFlags: { severeAbdominalPain: true, blackStool: true },
      severity: "severe"
    },
    riskLevel: "Emergency",
    recommendedCare: "Emergency care now",
    redFlagsFound: ["blackStool", "severeAbdominalPain"]
  },
  {
    name: "Crisis: suicidal thoughts",
    input: {
      selectedSymptoms: ["suicidal-thoughts"],
      primarySymptom: "suicidal-thoughts"
    },
    riskLevel: "Crisis",
    recommendedCare: "Crisis support now",
    redFlagsFound: ["suicidalThoughts"]
  },
  {
    name: "High: severe shortness of breath",
    input: {
      selectedSymptoms: ["shortness-of-breath"],
      primarySymptom: "shortness-of-breath",
      severity: "severe",
      redFlags: {}
    },
    riskLevel: "High",
    recommendedCare: "Urgent Care today"
  },
  {
    name: "Background escalation: immunocompromised fever is not low",
    input: {
      selectedSymptoms: ["fever"],
      primarySymptom: "fever",
      severity: "moderate",
      healthBackground: { immunocompromised: true },
      redFlags: {}
    },
    riskLevel: "Moderate",
    minRisk: ["Moderate", "High", "Emergency"]
  }
];

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

for (const testCase of cases) {
  const result = evaluateTriage(testCase.input);
  const allowedRisks = testCase.minRisk ?? [testCase.riskLevel];
  assert(allowedRisks.includes(result.riskLevel), `${testCase.name}: expected risk ${allowedRisks.join(" or ")}, got ${result.riskLevel}`);
  if (testCase.recommendedCare) {
    assert(result.recommendedCare === testCase.recommendedCare, `${testCase.name}: expected care ${testCase.recommendedCare}, got ${result.recommendedCare}`);
  }
  assert(result.reasons.length > 0, `${testCase.name}: reasons should not be empty`);
  assert(result.possibleCauses.length > 0, `${testCase.name}: possible causes should not be empty`);
  assert(Boolean(result.disclaimer), `${testCase.name}: disclaimer should exist`);
  for (const flag of testCase.redFlagsFound ?? []) {
    assert(result.redFlagsFound.includes(flag), `${testCase.name}: expected red flag ${flag}`);
  }
  console.log(`✓ ${testCase.name}: ${result.riskLevel} / ${result.recommendedCare}`);
}

console.log(`\n${cases.length} triage rule cases passed.`);
