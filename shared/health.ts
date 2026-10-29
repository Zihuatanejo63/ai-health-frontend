export type LabValue = number | string;
export const QUALITATIVE_VALUES = [
  "Negative",
  "Trace",
  "+",
  "++",
  "+++",
] as const;
export function qualitativeValue(
  value: unknown,
): (typeof QUALITATIVE_VALUES)[number] | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.trim().toLowerCase().replace(/\s/g, "");
  if (["negative", "neg", "阴性", "(-)", "-", "阴"].includes(text))
    return "Negative";
  if (["trace", "tr", "微量", "痕量", "±", "+/-"].includes(text))
    return "Trace";
  if (["+", "1+", "+1", "(+)"].includes(text)) return "+";
  if (["++", "2+", "+2", "(++)"].includes(text)) return "++";
  if (["+++", "3+", "+3", "(+++)"].includes(text)) return "+++";
  // "Positive" alone does not imply 1+; ambiguous or out-of-domain text stays unclassified.
  return undefined;
}
export function displayValue(value: LabValue, digits = 3): string {
  return typeof value === "number"
    ? Number(value.toFixed(digits)).toString()
    : value;
}
export type Space = "personal" | "sample";
export type Profile = {
  age: number | null;
  sex: "female" | "male" | "unspecified";
  heightCm: number | null;
  weightKg: number | null;
  history: string;
  familyHistory: string;
};
export type LabResult = {
  id: string;
  marker: string;
  value: LabValue;
  comparator: "=" | "<" | ">";
  unit: string;
  low: number | null;
  high: number | null;
  confidence: number | null;
  source: string;
  reviewed: boolean;
  qualitativeReference?: string;
};
export type Report = {
  id: string;
  date: string;
  lab: string;
  method: string;
  title: string;
  results: LabResult[];
  confirmedAt?: string;
  ruleVersion?: string;
  original?: string;
};
export type Draft = {
  id: string;
  space: Space;
  source: "sample" | "manual" | "gemini";
  reports: Report[];
  createdAt: string;
};
export type Workspace = {
  profile: Profile;
  reports: Report[];
  drafts: Draft[];
  completed: string[];
  revision: number;
  reminders?: {
    enabled: boolean;
    deliveries: {
      key: string;
      status: "pending" | "sent" | "failed";
      at: string;
      transport: string;
      messageId?: string;
      actionIds: string[];
      envelope?: { to: string; subject: string; text: string };
    }[];
  };
};
export const emptyWorkspace = (): Workspace => ({
  profile: {
    age: null,
    sex: "unspecified",
    heightCm: null,
    weightKg: null,
    history: "",
    familyHistory: "",
  },
  reports: [],
  drafts: [],
  completed: [],
  revision: 0,
});
export type Severity =
  | "normal"
  | "mild"
  | "significant"
  | "critical"
  | "unclassified"
  | "review";
export type Trend =
  | "new"
  | "persistent"
  | "worsening"
  | "improving"
  | "resolved"
  | "stable"
  | "insufficient_history";
export type Evaluation = {
  result: LabResult;
  marker: string;
  value: LabValue;
  unit: string;
  low: number | null;
  high: number | null;
  severity: Severity;
  abnormal: boolean;
  distance: number;
  ruleId: string;
  ruleVersion: string;
  explanation: string;
  causes: string;
  followUpDays: number | null;
  department: string;
  questions: string[];
  sourceUrl: string;
  trend: Trend;
  date: string;
  reportId: string;
  history: { date: string; value: LabValue; unit: string }[];
};
export type Action = {
  id: string;
  marker: string;
  value: LabValue;
  unit: string;
  due: string;
  done: boolean;
  overdue: boolean;
  days: number;
  department: string;
  questions: string[];
  severity: Severity;
  reportId: string;
};
