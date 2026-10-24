// English-first copy, separated from presentation for future zh-CN localization.
export const marketing = {
  hero: "Know your numbers. Catch changes early.",
  subtitle:
    "Upload any lab or checkup report. Get a plain-language reading of every result, track what changes year over year, and never miss a follow-up again.",
  steps: [
    [
      "01",
      "Upload your reports",
      "Bring a PDF or photo. Add past reports together to start building your personal baseline. You’ll review and correct every extracted result before it is saved.",
    ],
    [
      "02",
      "Understand your numbers",
      "See what each result means in plain language. Trace flags and follow-up suggestions to versioned rules, with AI helping explain the findings.",
    ],
    [
      "03",
      "Keep an eye on change",
      "See new, persistent, worsening, improving, or resolved abnormalities. Keep follow-ups in view and bring a clear trend summary to your clinician.",
    ],
  ],
  categories: [
    ["01", "Metabolic", "Blood glucose · HbA1c"],
    ["02", "Cardiovascular", "Cholesterol · Lipids"],
    ["03", "Liver & kidney", "Liver enzymes · Kidney markers"],
    ["04", "Blood count", "Red cells · White cells · Platelets"],
    ["05", "Other markers", "Thyroid · Tumor markers"],
  ],
  plans: [
    {
      name: "Free",
      price: "$0",
      period: "first report",
      note: "A clearer starting point.",
      features: [
        "1 report reading",
        "Review extracted results",
        "Plain-language explanations",
      ],
    },
    {
      name: "Plus",
      price: "$9.9",
      period: "/ month",
      note: "Or $79 / year. Planned for the MVP.",
      features: [
        "Unlimited reports",
        "Longitudinal tracking",
        "Follow-up reminders",
        "Doctor-ready PDF export",
      ],
    },
    {
      name: "Family",
      price: "$15",
      period: "/ month",
      note: "5 profiles. Planned for a later release.",
      features: [
        "Everything in Plus",
        "Up to 5 separate profiles",
        "Keep family reports organized",
      ],
    },
  ],
  faqs: [
    [
      "Can I upload a report today?",
      "Not yet. This is a preview of the new product. Explore the complete sample without creating an account. Uploads, accounts, reminders, and PDF export will come in the application phase.",
    ],
    [
      "Can it tell me whether I have a condition?",
      "No. HealthMatch AI is a health information and self-management tool, not a diagnostic service. A clinician must interpret results in the context of your health.",
    ],
    [
      "What if I only have one report?",
      "The planned first-report reading helps explain individual results. Comparable results from two or more dates will unlock longitudinal trends.",
    ],
    [
      "Who decides the severity and follow-up timing?",
      "Auditable, versioned rules will determine severity, red flags, and follow-up intervals. AI will extract results and explain those decisions; it will not make clinical judgments. You will confirm the extracted values first.",
    ],
    [
      "Will every marker be interpreted?",
      "The MVP is planned around roughly 120 common markers. Unsupported results will retain their original values and be labeled as not yet covered. Listing a category is not a promise to detect disease.",
    ],
    [
      "What happens to my data?",
      "This sample contains fictional data and accepts no health uploads. The planned app requires encryption in transit and at rest, minimal retention, export and complete deletion, and no sale or advertising use of health data. Processing regions and providers must be published before uploads open.",
    ],
  ],
};
export const sampleResults = [
  {
    name: "HbA1c",
    unit: "%",
    values: [5.4, 5.8, 6.0],
    range: "4.0–5.6",
    flag: "Above sample range",
    status: "Worsening",
    explanation:
      "A measure of average blood glucose over about three months. This sample is 0.4 percentage points above its report’s upper reference limit. Discuss the upward pattern with a clinician; this result alone is not a diagnosis.",
  },
  {
    name: "ALT",
    unit: "U/L",
    values: [48, 42, 30],
    range: "7–35",
    flag: "Within sample range",
    status: "Resolved",
    explanation:
      "An enzyme commonly included in liver panels. This fictional result has returned to the report’s range. A change alone cannot establish its cause or rule out a health problem.",
  },
  {
    name: "Hemoglobin",
    unit: "g/dL",
    values: [13.2, 13.4, 13.3],
    range: "12.0–15.5",
    flag: "Within sample range",
    status: "Stable",
    explanation:
      "A protein in red blood cells that carries oxygen. All three fictional values fall within this report’s range; interpretation depends on the person and the laboratory.",
  },
];
export const sampleDates = ["2024-09-12", "2025-09-15", "2026-09-18"];
