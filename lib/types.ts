export type Severity = "mild" | "moderate" | "severe";
export type DurationUnit = "hours" | "days" | "weeks" | "months";
export type RiskLevel = "low" | "medium" | "high";

export type AnalyzeSymptomsRequest = {
  symptoms: string;
  severity: Severity;
  durationValue: number;
  durationUnit: DurationUnit;
};

export type AnalyzeSymptomsResponse = {
  riskLevel: RiskLevel;
  summary: string;
  recommendedDepartments: string[];
  nextSteps: string[];
  disclaimer: string;
  referenceId: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  feeUsd: number;
  available: boolean;
  tags: string[];
};
