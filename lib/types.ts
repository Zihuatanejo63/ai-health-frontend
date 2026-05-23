export type Severity = "mild" | "moderate" | "severe";
export type DurationUnit = "hours" | "days" | "weeks" | "months";
export type RiskLevel = "low" | "medium" | "high";
export type CareLevel =
  | "Emergency"
  | "Urgent Care"
  | "Primary Care"
  | "Telehealth"
  | "Pharmacy/Self-care"
  | "Monitor at home";

export type AnalyzeSymptomsRequest = {
  symptoms: string;
  severity: Severity;
  durationValue: number;
  durationUnit: DurationUnit;
  outputLanguage?: string;
};

export type AnalyzeSymptomsResponse = {
  riskLevel: RiskLevel;
  redFlags: string[];
  recommendedCareLevel: CareLevel;
  possibleCauses: string[];
  whatToMonitor: string[];
  doctorReadySummary: string;
  insuranceNavigation: string[];
  disclaimer: string;
  referenceId: string;
};

export type CreateCheckoutRequest = {
  toolId: "doctor-ready-pdf" | "insurance-checklist" | "symptom-timeline";
  toolName: string;
  amountUsd: number;
  patientEmail?: string;
  caseReferenceId?: string;
};

export type CreateCheckoutResponse = {
  checkoutUrl: string;
  sessionId: string;
  accounting: {
    grossAmountUsd: number;
    platformFeeRateBps: number;
    platformFeeUsd: number;
    productDeliveryReserveUsd: number;
  };
};

// Backend triage response
export type TriageRiskLevel = "Low" | "Moderate" | "High" | "Emergency" | "Crisis";
export type TriageRecommendedCare =
  | "Self-care and monitoring"
  | "Telehealth may be appropriate"
  | "Primary Care within 24–72 hours"
  | "Urgent Care today"
  | "Emergency care now"
  | "Crisis support now";

export interface TriageApiResponse {
  riskLevel: TriageRiskLevel;
  recommendedCare: TriageRecommendedCare;
  score: number;
  reasons: string[];
  redFlagsFound: string[];
  possibleCauses: string[];
  whatToMonitor: string[];
  escalationAdvice: string[];
  doctorReadySummary: string;
  plainLanguageExplanation: string;
  questionsToAskClinician: string[];
  coverageQuestions: string[];
  disclaimer: string;
  referenceId: string;
  aiReviewStatus: "generated" | "fallback" | "unavailable";
}
