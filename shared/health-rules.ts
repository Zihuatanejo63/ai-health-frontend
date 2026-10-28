import { qualitativeValue, QUALITATIVE_VALUES } from "./health";
import type {
  Evaluation,
  LabResult,
  Profile,
  Report,
  Severity,
  Action,
  Workspace,
} from "./health";
// All judgments live here, never in model output. Review status is deliberately explicit.
export const RULE_VERSION = "hm-labs-2026-10-26.4";
export const RULE_REVIEW =
  "Local pilot policy; clinical sign-off pending. Confirm timing with your clinician.";
const MAYO =
  "https://www.mayocliniclabs.com/-/media/it-mmfiles/Special-Instructions/8/A/6/DLMP_Critical_Values_-_Critical_Results_List";
const NIDDK =
  "https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test";
const MEDLINE =
  "https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/";
const ABIM =
  "https://www.abim.org/media/e2wdwdqu/laboratory-reference-ranges.pdf";
const NBME =
  "https://www.nbme.org/sites/default/files/2024-12/Laboratory_Reference_Values.pdf";
// References establish analyte/unit context; classification ALWAYS uses the patient's report interval.
// Follow-up days remain pilot review targets, never guideline repeat-test recommendations.
interface LabRule {
  id: string;
  name: string;
  aliases: readonly string[];
  unit: string;
  criticalLow: number | null;
  criticalHigh: number | null;
  significantHigh: number | null;
  description: string;
  causes: string;
  source: string;
  followUp: number;
  department: string;
  kind?: "qualitative";
}
function panelRule(
  id: string,
  name: string,
  aliases: string[],
  unit: string,
  source: string,
  criticalLow: number | null = null,
  criticalHigh: number | null = null,
): LabRule {
  return {
    id,
    name,
    aliases: [name.toLowerCase(), ...aliases],
    unit,
    source,
    criticalLow,
    criticalHigh,
    significantHigh: null,
    description: `${name} is interpreted against the reference interval printed on this report.`,
    causes:
      "Collection conditions, medicines and personal context can affect results. This value alone does not establish a cause or diagnosis.",
    followUp: 30,
    department: "Primary care",
  };
}
const URINALYSIS =
  "https://mlabs.umich.edu/tests/point-care-urinalysis-manual-siemens-multistix-10-sg";
function urineRule(id: string, name: string, aliases: string[]): LabRule {
  return {
    ...panelRule(id, name, aliases, "qualitative", URINALYSIS),
    kind: "qualitative",
  };
}
export const RULES: readonly LabRule[] = [
  {
    id: "hba1c",
    name: "HbA1c",
    aliases: ["hba1c", "a1c", "糖化血红蛋白"],
    unit: "%",
    criticalLow: null,
    criticalHigh: null,
    significantHigh: 6.5,
    description:
      "HbA1c reflects average blood glucose over about three months.",
    causes:
      "Blood glucose patterns can affect HbA1c; altered red-cell turnover can affect its accuracy. A clinician must assess the cause.",
    source: NIDDK,
    followUp: 90,
    department: "Primary care / endocrinology",
  },
  {
    id: "glucose",
    name: "Glucose",
    aliases: [
      "glucose",
      "fasting glucose",
      "blood glucose",
      "血糖",
      "空腹血糖",
    ],
    unit: "mg/dL",
    criticalLow: 50,
    criticalHigh: 400,
    significantHigh: null,
    description:
      "Glucose measures the sugar in your blood at the time of collection.",
    causes:
      "Meals, illness, stress and medicines can influence glucose. Fasting status matters; a single value cannot establish a condition.",
    source: MAYO,
    followUp: 7,
    department: "Primary care / endocrinology",
  },
  {
    id: "potassium",
    name: "Potassium",
    aliases: ["potassium", "k", "钾", "血钾"],
    unit: "mmol/L",
    criticalLow: 2.5,
    criticalHigh: 6,
    significantHigh: null,
    description:
      "Potassium is an electrolyte involved in muscle and heart function.",
    causes:
      "Kidney handling, medicines and sample damage can affect potassium. Only a clinician can establish the reason.",
    source: MAYO,
    followUp: 1,
    department: "Primary care / urgent care",
  },
  {
    id: "alt",
    name: "ALT",
    aliases: [
      "alt",
      "alanine aminotransferase",
      "丙氨酸氨基转移酶",
      "谷丙转氨酶",
    ],
    unit: "U/L",
    criticalLow: null,
    criticalHigh: null,
    significantHigh: null,
    description: "ALT is an enzyme commonly measured in liver panels.",
    causes:
      "Liver inflammation, medicines, alcohol and other factors may affect ALT. This result does not identify a cause.",
    source: "https://medlineplus.gov/lab-tests/alt-blood-test/",
    followUp: 30,
    department: "Primary care / hepatology",
  },
  {
    id: "hemoglobin",
    name: "Hemoglobin",
    aliases: ["hemoglobin", "haemoglobin", "hgb", "hb", "血红蛋白"],
    unit: "g/dL",
    criticalLow: 6,
    criticalHigh: 20,
    significantHigh: null,
    description:
      "Hemoglobin is the oxygen-carrying protein in red blood cells.",
    causes:
      "Iron status, bleeding, hydration and other factors may affect hemoglobin. Reference intervals depend on personal and laboratory context.",
    source: MAYO,
    followUp: 14,
    department: "Primary care / hematology",
  },
  panelRule(
    "rbc",
    "Red blood cell count",
    ["rbc", "erythrocyte count", "红细胞", "红细胞计数"],
    "10^12/L",
    ABIM,
  ),
  panelRule(
    "wbc",
    "White blood cell count",
    ["wbc", "leukocytes", "白细胞", "白细胞计数"],
    "10^9/L",
    MAYO,
    null,
    100,
  ),
  panelRule(
    "platelets",
    "Platelets",
    ["plt", "platelet count", "血小板", "血小板计数"],
    "10^9/L",
    MAYO,
    40,
    1000,
  ),
  panelRule(
    "hematocrit",
    "Hematocrit",
    ["hct", "红细胞压积", "血细胞比容"],
    "%",
    NBME,
  ),
  panelRule(
    "mcv",
    "MCV",
    ["mean corpuscular volume", "平均红细胞体积"],
    "fL",
    NBME,
  ),
  panelRule(
    "mch",
    "MCH",
    ["mean corpuscular hemoglobin", "平均红细胞血红蛋白量"],
    "pg",
    NBME,
  ),
  panelRule(
    "mchc",
    "MCHC",
    ["mean corpuscular hemoglobin concentration", "平均红细胞血红蛋白浓度"],
    "g/dL",
    ABIM,
  ),
  panelRule(
    "neutrophils",
    "Absolute neutrophil count",
    ["anc", "neut#", "中性粒细胞绝对值", "中性粒细胞计数"],
    "10^9/L",
    MAYO,
    0.5,
    null,
  ),
  panelRule(
    "lymphocytes",
    "Absolute lymphocyte count",
    ["lymph#", "淋巴细胞绝对值", "淋巴细胞计数"],
    "10^9/L",
    ABIM,
  ),
  panelRule(
    "monocytes",
    "Absolute monocyte count",
    ["mono#", "单核细胞绝对值", "单核细胞计数"],
    "10^9/L",
    ABIM,
  ),
  panelRule(
    "eosinophils",
    "Absolute eosinophil count",
    ["eos#", "嗜酸性粒细胞绝对值"],
    "10^9/L",
    ABIM,
  ),
  panelRule(
    "basophils",
    "Absolute basophil count",
    ["baso#", "嗜碱性粒细胞绝对值"],
    "10^9/L",
    ABIM,
  ),
  panelRule(
    "cholesterol",
    "Total cholesterol",
    ["tc", "cholesterol", "总胆固醇"],
    "mg/dL",
    NBME,
  ),
  panelRule(
    "hdl",
    "HDL cholesterol",
    ["hdl", "hdl-c", "高密度脂蛋白胆固醇"],
    "mg/dL",
    NBME,
  ),
  panelRule(
    "ldl",
    "LDL cholesterol",
    ["ldl", "ldl-c", "低密度脂蛋白胆固醇"],
    "mg/dL",
    NBME,
  ),
  panelRule(
    "triglycerides",
    "Triglycerides",
    ["tg", "甘油三酯"],
    "mg/dL",
    NBME,
  ),
  panelRule(
    "ast",
    "AST",
    ["aspartate aminotransferase", "谷草转氨酶", "天门冬氨酸氨基转移酶"],
    "U/L",
    ABIM,
  ),
  panelRule("alp", "Alkaline phosphatase", ["alp", "碱性磷酸酶"], "U/L", ABIM),
  panelRule(
    "ggt",
    "GGT",
    ["gamma-glutamyl transferase", "γ-谷氨酰转移酶", "谷氨酰转肽酶"],
    "U/L",
    ABIM,
  ),
  panelRule(
    "bilirubin_total",
    "Total bilirubin",
    ["tbil", "总胆红素"],
    "mg/dL",
    ABIM,
  ),
  panelRule(
    "bilirubin_direct",
    "Direct bilirubin",
    ["dbil", "直接胆红素"],
    "mg/dL",
    ABIM,
  ),
  panelRule(
    "bilirubin_indirect",
    "Indirect bilirubin",
    ["ibil", "间接胆红素"],
    "mg/dL",
    ABIM,
  ),
  panelRule("albumin", "Albumin", ["alb", "白蛋白"], "g/dL", ABIM),
  panelRule("total_protein", "Total protein", ["tp", "总蛋白"], "g/dL", NBME),
  panelRule(
    "creatinine",
    "Creatinine",
    ["crea", "scr", "肌酐", "血肌酐"],
    "mg/dL",
    NBME,
  ),
  panelRule(
    "bun",
    "Blood urea nitrogen",
    ["bun", "urea nitrogen", "尿素氮"],
    "mg/dL",
    NBME,
  ),
  panelRule(
    "urea",
    "Urea",
    ["尿素"],
    "mmol/L",
    "https://www.gloshospitals.nhs.uk/our-services/services-we-offer/pathology/tests-and-investigations/urea/",
  ),
  panelRule(
    "uric_acid",
    "Uric acid",
    ["urate", "尿酸", "血尿酸"],
    "mg/dL",
    NBME,
  ),
  panelRule(
    "egfr",
    "eGFR",
    ["estimated glomerular filtration rate", "估算肾小球滤过率"],
    "mL/min/1.73m2",
    "https://www.kidney.org/kidney-topics/estimated-glomerular-filtration-rate-egfr",
  ),
  panelRule("sodium", "Sodium", ["na", "钠", "血钠"], "mmol/L", MAYO, 120, 160),
  panelRule("chloride", "Chloride", ["cl", "氯", "血氯"], "mmol/L", NBME),
  panelRule("bicarbonate", "Bicarbonate", ["hco3", "碳酸氢根"], "mmol/L", NBME),
  panelRule(
    "calcium",
    "Total calcium",
    ["calcium", "总钙", "血钙"],
    "mg/dL",
    MAYO,
    6.5,
    13,
  ),
  panelRule(
    "magnesium",
    "Magnesium",
    ["mg", "镁", "血镁"],
    "mg/dL",
    MAYO,
    1,
    9,
  ),
  panelRule(
    "phosphorus",
    "Phosphorus",
    ["phosphate", "无机磷", "血磷"],
    "mg/dL",
    MAYO,
    1,
    null,
  ),
  panelRule(
    "tsh",
    "TSH",
    ["thyroid stimulating hormone", "促甲状腺激素"],
    "mIU/L",
    NBME,
  ),
  panelRule(
    "ft4",
    "FT4",
    ["free t4", "free thyroxine", "游离甲状腺素"],
    "ng/dL",
    MAYO,
    null,
    7.8,
  ),
  panelRule(
    "urine_ph",
    "Urine pH",
    ["尿ph", "尿液ph"],
    "pH",
    "https://www.ucsfhealth.org/care/medical-tests/urine-ph-test",
  ),
  panelRule(
    "urine_sg",
    "Urine specific gravity",
    ["尿比重", "尿液比重"],
    "1",
    "https://www.ucsfhealth.org/care/medical-tests/urine-specific-gravity-test",
  ),
  panelRule(
    "urine_rbc",
    "Urine RBC",
    ["尿红细胞", "尿红细胞计数"],
    "/HPF",
    "https://www.ucsfhealth.org/care/medical-tests/rbc-urine-test",
  ),
  panelRule(
    "uacr",
    "Urine albumin-creatinine ratio",
    ["uacr", "urine acr", "尿白蛋白肌酐比", "尿白蛋白/肌酐比值"],
    "mg/g",
    ABIM,
  ),
  urineRule("urine_protein", "Urine protein", ["尿蛋白", "尿蛋白定性"]),
  urineRule("urine_glucose", "Urine glucose", ["尿糖", "尿葡萄糖"]),
  urineRule("urine_ketones", "Urine ketones", ["尿酮体", "酮体", "ketones"]),
  urineRule("urine_nitrite", "Urine nitrite", [
    "尿亚硝酸盐",
    "亚硝酸盐",
    "nitrite",
    "nitrites",
  ]),
  urineRule("urine_le", "Urine leukocyte esterase", [
    "白细胞酯酶",
    "尿白细胞酯酶",
    "leukocyte esterase",
  ]),
  urineRule("urine_urobilinogen", "Urine urobilinogen", [
    "尿胆原",
    "urobilinogen",
  ]),
  urineRule("urine_bilirubin", "Urine bilirubin", ["尿胆红素"]),
  urineRule("urine_blood", "Urine occult blood", [
    "尿隐血",
    "尿潜血",
    "隐血",
    "urine blood",
  ]),
  panelRule(
    "vitamin_d_25oh",
    "25-OH vitamin D",
    ["25-hydroxyvitamin d", "25(oh)d", "25羟维生素d", "25-羟维生素d"],
    "ng/mL",
    ABIM,
  ),
  panelRule("ferritin", "Ferritin", ["铁蛋白"], "ng/mL", ABIM),
  panelRule("serum_iron", "Serum iron", ["iron", "血清铁"], "ug/dL", ABIM),
  panelRule(
    "tsat",
    "Transferrin saturation",
    ["tsat", "转铁蛋白饱和度"],
    "%",
    ABIM,
  ),
  panelRule(
    "homocysteine",
    "Homocysteine",
    ["hcy", "同型半胱氨酸"],
    "umol/L",
    ABIM,
  ),
  panelRule(
    "crp",
    "CRP",
    ["c-reactive protein", "c反应蛋白", "c-反应蛋白"],
    "mg/L",
    ABIM,
  ),
  panelRule(
    "esr",
    "ESR",
    ["erythrocyte sedimentation rate", "血沉", "红细胞沉降率"],
    "mm/h",
    ABIM,
  ),
  panelRule("pt", "PT", ["prothrombin time", "凝血酶原时间"], "s", ABIM),
  panelRule(
    "aptt",
    "APTT",
    ["activated partial thromboplastin time", "活化部分凝血活酶时间"],
    "s",
    MAYO,
    null,
    150,
  ),
  panelRule(
    "inr",
    "INR",
    ["international normalized ratio", "国际标准化比值"],
    "1",
    MAYO,
    null,
    5,
  ),
  panelRule(
    "fibrinogen",
    "Fibrinogen",
    ["fib", "纤维蛋白原"],
    "mg/dL",
    MAYO,
    60,
    null,
  ),
];
export const POLICY = {
  significantDeviationFraction: 0.5,
  significantReviewDays: 7,
  criticalDays: 0,
  trendTolerance: 0.000001,
  missingContextReviewDays: 7,
};
// Follow-up days are a local pilot clinician-review schedule, NOT universal repeat-test intervals.
// At the visit, ask whether/when to repeat the named test. Clinical approval pending.
export const EMERGENCY_TEXT =
  "Seek emergency medical care now / 请立即就医或前往急诊。 Contact local emergency services if you are in immediate danger. Do not wait for this app or a reply.";
export const RED_FLAG_TERMS = [
  "chest pain",
  "chest pressure",
  "difficulty breathing",
  "shortness of breath",
  "cannot breathe",
  "can't breathe",
  "suicid",
  "kill myself",
  "end my life",
  "self harm",
  "self-harm",
  "胸痛",
  "胸口痛",
  "呼吸困难",
  "喘不过气",
  "自杀",
  "轻生",
  "不想活",
  "自残",
];
export function redFlagQuestion(text: string) {
  const normalized = text.toLowerCase().replace(/\s+/g, " ");
  return RED_FLAG_TERMS.some((t) => normalized.includes(t));
}
export function canonical(marker: string) {
  return RULES.find((r) =>
    r.aliases.some((a) => a.toLowerCase() === marker.trim().toLowerCase()),
  );
}
// Factors convert BOTH values and printed bounds to the canonical unit.
// Molecular conversions: https://www.labcorp.com/test-menu/resources/si-unit-conversion-table
// FT4: https://www.mayocliniclabs.com/order-tests/si-unit-conversion.html
// Urea uses molecular mass 60.06 g/mol; UACR uses creatinine molecular mass 113.12 g/mol.
// SI notation: NBME reference table above. No conversion between microscopy /HPF and /uL.
function unitKey(unit: string) {
  return unit
    .trim()
    .toLowerCase()
    .replace(/[µμ]/g, "u")
    .replace(/10¹²/g, "10^12")
    .replace(/10⁹/g, "10^9")
    .replace(/²/g, "2")
    .replace(/×/g, "x")
    .replace(/\s/g, "");
}
const counts = {
  "10^3/ul": 1,
  "x10^9/l": 1,
  "10*9/l": 1,
  "10^9/l": 1,
  "k/ul": 1,
  "/ul": 0.001,
  "cells/ul": 0.001,
  "/mm3": 0.001,
};
export const UNIT_FACTORS: Record<string, Record<string, number>> = {
  vitamin_d_25oh: { "nmol/l": 1 / 2.496 },
  ferritin: { "ug/l": 1 },
  serum_iron: { "umol/l": 1 / 0.179 },
  tsat: { "1": 100 },
  crp: { "mg/dl": 10 },
  esr: { "mm/hr": 1 },
  pt: { sec: 1, seconds: 1 },
  aptt: { sec: 1, seconds: 1 },
  inr: { ratio: 1 },
  fibrinogen: { "g/l": 100 },
  glucose: { "mmol/l": 18.0182 },
  hemoglobin: { "g/l": 0.1 },
  potassium: { "meq/l": 1 },
  sodium: { "meq/l": 1 },
  chloride: { "meq/l": 1 },
  bicarbonate: { "meq/l": 1 },
  alt: { "iu/l": 1 },
  ast: { "iu/l": 1 },
  alp: { "iu/l": 1 },
  ggt: { "iu/l": 1 },
  rbc: {
    "10^6/ul": 1,
    "million/ul": 1,
    "x10^12/l": 1,
    "10*12/l": 1,
    "/ul": 0.000001,
  },
  wbc: counts,
  platelets: counts,
  neutrophils: counts,
  lymphocytes: counts,
  monocytes: counts,
  eosinophils: counts,
  basophils: counts,
  hematocrit: { "l/l": 100 },
  mch: { "pg/cell": 1 },
  mchc: { "g/l": 0.1 },
  cholesterol: { "mmol/l": 1 / 0.0259 },
  hdl: { "mmol/l": 1 / 0.0259 },
  ldl: { "mmol/l": 1 / 0.0259 },
  triglycerides: { "mmol/l": 1 / 0.0113 },
  bilirubin_total: { "umol/l": 1 / 17.1 },
  bilirubin_direct: { "umol/l": 1 / 17.1 },
  bilirubin_indirect: { "umol/l": 1 / 17.1 },
  albumin: { "g/l": 0.1 },
  total_protein: { "g/l": 0.1 },
  creatinine: { "umol/l": 1 / 88.4 },
  bun: { "mmol/l": 1 / 0.357 },
  urea: { "mg/dl": 0.1665 },
  uric_acid: { "umol/l": 1 / 59, "mmol/l": 1000 / 59 },
  calcium: { "mmol/l": 1 / 0.25 },
  magnesium: { "mmol/l": 1 / 0.4114 },
  phosphorus: { "mmol/l": 1 / 0.323 },
  tsh: { "uiu/ml": 1, "mu/l": 1 },
  ft4: { "pmol/l": 1 / 12.87 },
  egfr: { "ml/min/1.73m^2": 1 },
  urine_ph: { "1": 1 },
  urine_sg: { sg: 1 },
  urine_rbc: { "rbc/hpf": 1, "cells/hpf": 1 },
  uacr: { "mg/mmol": 1 / 0.11312, "ug/mg": 1 },
};
export function normalized(r: LabResult) {
  const rule = canonical(r.marker);
  const u = unitKey(r.unit);
  const conversion = rule ? UNIT_FACTORS[rule.id]?.[u] : undefined;
  const factor = conversion ?? 1;
  const compatible = Boolean(
    rule && (u === unitKey(rule.unit) || conversion !== undefined),
  );
  return {
    rule,
    compatible,
    value: typeof r.value === "number" ? r.value * factor : NaN,
    low: r.low === null ? null : r.low * factor,
    high: r.high === null ? null : r.high * factor,
    unit: compatible ? rule!.unit : r.unit,
  };
}
export function evaluate(
  r: LabResult,
  profile: Profile,
): Omit<Evaluation, "trend" | "date" | "reportId" | "history"> {
  const found = canonical(r.marker);
  if (typeof r.value === "string" || found?.kind === "qualitative")
    return evaluateText(r, found);
  const n = normalized(r);
  const rule = n.rule;
  let severity: Severity = "unclassified";
  const above =
      n.high !== null &&
      (r.comparator === "="
        ? n.value > n.high
        : r.comparator === ">" && n.value >= n.high),
    below =
      n.low !== null &&
      (r.comparator === "="
        ? n.value < n.low
        : r.comparator === "<" && n.value <= n.low);
  const distance = above ? n.value - n.high! : below ? n.low! - n.value : 0;
  const rangeKnown = n.low !== null && n.high !== null;
  // Mayo FT4 is age-dependent; unknown age uses 6.0 conservatively, pending review.
  const criticalHigh =
    rule?.id === "ft4" && (profile.age === null || profile.age >= 50)
      ? 6
      : rule?.criticalHigh;
  // Critical alerts are conservative and never blocked by missing profile or reference range.
  const critical =
    n.compatible &&
    rule &&
    ((rule.criticalLow !== null &&
      n.value <= rule.criticalLow &&
      r.comparator !== ">") ||
      (criticalHigh !== null &&
        criticalHigh !== undefined &&
        n.value >= criticalHigh &&
        r.comparator !== "<"));
  if (critical) severity = "critical";
  else if (
    n.compatible &&
    r.comparator === "=" &&
    profile.age !== null &&
    profile.age >= 18 &&
    rangeKnown
  ) {
    severity = above || below ? "mild" : "normal";
    if (
      rule?.significantHigh !== null &&
      rule?.significantHigh !== undefined &&
      n.value >= rule.significantHigh
    )
      severity = "significant";
    const boundary = above ? n.high : below ? n.low : null;
    if (
      boundary !== null &&
      Math.abs(boundary) > 0 &&
      distance / Math.abs(boundary) >= POLICY.significantDeviationFraction
    )
      severity = "significant";
  }
  const abnormal =
    severity === "critical" ||
    severity === "significant" ||
    severity === "mild" ||
    above ||
    below;
  const deviation =
    r.comparator !== "="
      ? "a bounded result; exact deviation is unknown"
      : above
        ? `${Number(distance.toFixed(3))} ${n.unit} above the report upper limit`
        : below
          ? `${Number(distance.toFixed(3))} ${n.unit} below the report lower limit`
          : rangeKnown
            ? "within the report interval"
            : "reference interval incomplete";
  let explanation = `${rule?.description || "This marker is not yet covered by the interpretation library."} ${r.marker}: ${r.comparator === "=" ? "" : r.comparator}${Number(n.value.toFixed(3))} ${n.unit}; ${deviation}.`;
  if (severity === "unclassified")
    explanation +=
      " Severity is not classified: check age, unit, comparator and report ranges with your clinician. This does not mean normal.";
  return {
    result: r,
    marker: rule?.name || r.marker,
    value: n.value,
    unit: n.unit,
    low: n.low,
    high: n.high,
    severity,
    abnormal,
    distance,
    ruleId: rule ? `${rule.id}:${severity}` : "unsupported",
    ruleVersion: RULE_VERSION,
    explanation,
    causes:
      rule?.causes || "No cause can be inferred for this unsupported marker.",
    followUpDays: !abnormal
      ? null
      : severity === "critical"
        ? 0
        : severity === "unclassified"
          ? POLICY.missingContextReviewDays
          : severity === "significant"
            ? Math.min(rule?.followUp || 7, POLICY.significantReviewDays)
            : rule?.followUp || 7,
    department: rule?.department || "Primary care",
    questions: [
      `Should I repeat ${rule?.name || r.marker}, and when?`,
      "Could collection conditions or my history affect this result?",
      "What changes should prompt earlier attention?",
    ],
    sourceUrl: rule?.source || MEDLINE,
  };
}
function evaluateText(
  r: LabResult,
  rule: LabRule | undefined,
): Omit<Evaluation, "trend" | "date" | "reportId" | "history"> {
  const value = qualitativeValue(r.value);
  const reference = r.qualitativeReference
    ? qualitativeValue(r.qualitativeReference)
    : rule?.id === "urine_urobilinogen"
      ? undefined
      : "Negative";
  const recognized = rule?.kind === "qualitative" && value !== undefined;
  // Urobilinogen can be physiologically present: never assume its baseline is negative.
  const comparable =
    recognized && reference !== undefined && r.comparator === "=";
  const order = (v: (typeof QUALITATIVE_VALUES)[number]) =>
    QUALITATIVE_VALUES.indexOf(v);
  const above = comparable && order(value!) > order(reference!);
  const severity: Severity = !comparable
    ? "unclassified"
    : above
      ? "review"
      : "normal";
  return {
    result: r,
    marker: rule?.name || r.marker,
    value: r.value,
    unit: r.unit,
    low: null,
    high: null,
    severity,
    abnormal: Boolean(above),
    distance: comparable ? Math.max(0, order(value!) - order(reference!)) : 0,
    ruleId: rule ? `${rule.id}:${severity}` : "unsupported",
    ruleVersion: RULE_VERSION,
    explanation: `${r.marker}: ${r.value}. ${above ? "Worth rechecking / consult a clinician（值得复查/咨询医生）; a qualitative signal is not a diagnosis." : comparable ? "At or below the qualitative reference category; this does not rule out illness." : "Not classified. Check the original report, method and qualitative reference with a clinician."}`,
    causes:
      "Dipstick results can be affected by collection, contamination and method. No cause is inferred.",
    followUpDays: above ? rule!.followUp : null,
    department: rule?.department || "Primary care",
    questions: [
      "Should this finding be rechecked, and when?",
      "Could sample collection affect this result?",
    ],
    sourceUrl: rule?.source || MEDLINE,
  };
}
function comparisonGroup(marker: string, unit: string, report: Report) {
  const lab = report.lab.trim().toLowerCase(),
    method = report.method.trim().toLowerCase();
  const known = lab && method && lab !== "unknown" && method !== "unknown";
  return [
    canonical(marker)?.id || marker.toLowerCase(),
    unit,
    lab,
    method,
    ...(known ? [] : [report.id]),
  ].join("|");
}
export function evaluateReports(
  reports: Report[],
  profile: Profile,
): Evaluation[] {
  const sorted = [...reports].sort(
    (a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id),
  );
  const byMarker = new Map<string, Evaluation[]>();
  for (const report of sorted)
    for (const r of report.results) {
      const base = evaluate(r, profile);
      const key = comparisonGroup(
        r.marker,
        `${base.unit}:${typeof r.value}:${r.qualitativeReference || ""}`,
        report,
      );
      const prior = byMarker.get(key) || [];
      const prev = prior.at(-1);
      let trend: Evaluation["trend"] = "insufficient_history";
      // Same-day duplicates, changed ranges, and unknown context are not trend evidence.
      if (
        prev &&
        prev.date !== report.date &&
        base.severity !== "unclassified" &&
        prev.severity !== "unclassified" &&
        base.low === prev.low &&
        base.high === prev.high
      ) {
        trend =
          !prev.abnormal && base.abnormal
            ? "new"
            : prev.abnormal && !base.abnormal
              ? "resolved"
              : !base.abnormal
                ? "stable"
                : base.distance > prev.distance + POLICY.trendTolerance
                  ? "worsening"
                  : base.distance < prev.distance - POLICY.trendTolerance
                    ? "improving"
                    : "persistent";
      }
      const entry: Evaluation = {
        ...base,
        trend,
        date: report.date,
        reportId: report.id,
        history: [
          ...prior.map((p) => ({ date: p.date, value: p.value, unit: p.unit })),
          { date: report.date, value: base.value, unit: base.unit },
        ],
      };
      prior.push(entry);
      byMarker.set(key, prior);
    }
  return [...byMarker.values()].flat();
}
export function latestEvaluations(reports: Report[], profile: Profile) {
  const all = evaluateReports(reports, profile);
  const groups = new Map<string, Evaluation>();
  for (const e of all) {
    const report = reports.find((r) => r.id === e.reportId)!;
    const key = comparisonGroup(
      e.marker,
      `${e.unit}:${typeof e.result.value}:${e.result.qualitativeReference || ""}`,
      report,
    );
    groups.set(key, e);
  }
  return [...groups.values()];
}
export function actionsFor(w: Workspace): Action[] {
  return latestEvaluations(w.reports, w.profile)
    .filter((e) => e.abnormal && e.followUpDays !== null)
    .map((e) => {
      const due = new Date(`${e.date}T12:00:00Z`);
      due.setUTCDate(due.getUTCDate() + e.followUpDays!);
      const date = due.toISOString().slice(0, 10);
      const id = `${e.reportId}:${e.result.id}:${RULE_VERSION}`;
      return {
        id,
        marker: e.marker,
        value: e.value,
        unit: e.unit,
        due: date,
        done: w.completed.includes(id),
        overdue: date <= new Date().toISOString().slice(0, 10),
        days: e.followUpDays!,
        department: e.department,
        questions: e.questions,
        severity: e.severity,
        reportId: e.reportId,
      };
    });
}
export function rank(e: Evaluation) {
  return {
    critical: 4,
    significant: 3,
    mild: 2,
    unclassified: 1,
    review: 2,
    normal: 0,
  }[e.severity];
}
