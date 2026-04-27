export type Severity = "mild" | "moderate" | "severe";
export type DurationUnit = "hours" | "days" | "weeks" | "months";
export type RiskLevel = "low" | "medium" | "high";

export type AnalyzeSymptomsRequest = {
  symptoms: string;
  severity: Severity;
  durationValue: number;
  durationUnit: DurationUnit;
  outputLanguage?: string;
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
  country: string;
  languages: string[];
  rating: number;
  feeUsd: number;
  available: boolean;
  tags: string[];
};

export type CreateCheckoutRequest = {
  doctorId: string;
  doctorName: string;
  amountUsd: number;
  patientEmail?: string;
  caseReferenceId?: string;
};

export type CreateCheckoutResponse = {
  checkoutUrl: string;
  sessionId: string;
};
