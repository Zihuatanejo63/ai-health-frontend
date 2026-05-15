"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CareLevelCard } from "@/components/care-level-card";
import { DisclaimerBox, SAFETY_DISCLAIMER } from "@/components/disclaimer-box";
import { DoctorSummaryPreview } from "@/components/doctor-summary-preview";
import { InsuranceChecklist } from "@/components/insurance-checklist";
import { RiskLevelCard } from "@/components/risk-level-card";
import { SectionHeader } from "@/components/section-header";
import type { AnalyzeSymptomsResponse, RiskLevel } from "@/lib/types";

const SESSION_RESULT_KEY = "ai-health-match-result";

type StoredAnalysis = {
  response: AnalyzeSymptomsResponse;
};

const CARE_LEVEL_DESCRIPTIONS: Record<string, string> = {
  Emergency: "Seek emergency care now",
  "Urgent Care": "Get care today",
  "Primary Care": "See a clinician soon",
  Telehealth: "Start with virtual care",
  "Pharmacy/Self-care": "Ask a pharmacist or use self-care when appropriate",
  "Monitor at home": "Track symptoms and reassess if things change"
};

const INSURANCE_ITEMS = [
  "Is urgent care covered?",
  "Is the provider in-network?",
  "What is your copay?",
  "Does your deductible apply?",
  "Is telehealth covered?"
];

function formatRiskLevel(riskLevel: RiskLevel, recommendedCareLevel?: string): string {
  if (recommendedCareLevel === "Emergency") return "Emergency";
  if (riskLevel === "low") return "Low";
  if (riskLevel === "high") return "High";
  return "Moderate";
}

function explainResult(result: AnalyzeSymptomsResponse): string {
  const risk = formatRiskLevel(result.riskLevel, result.recommendedCareLevel).toLowerCase();
  const care = result.recommendedCareLevel;
  return `This ${risk} result is based on the symptoms, severity, duration, red flags, and care level signals you provided. The recommended care level is ${care}, but a licensed clinician should make care decisions with your full history and exam.`;
}

function formatPossibleCause(item: string): string {
  const trimmed = item.trim();
  if (trimmed.toLowerCase().startsWith("your symptoms may be consistent with")) {
    return trimmed;
  }
  return `Your symptoms may be consistent with ${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}.`;
}

export default function ResultPage() {
  const [analysis, setAnalysis] = useState<StoredAnalysis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.sessionStorage) return;
    const rawValue = window.sessionStorage.getItem(SESSION_RESULT_KEY);
    if (!rawValue) return;

    try {
      const parsed = JSON.parse(rawValue) as StoredAnalysis;
      if (parsed.response) setAnalysis(parsed);
    } catch {
      setAnalysis(null);
    }
  }, []);

  const result = analysis?.response;
  const disclaimer = useMemo(() => result?.disclaimer || SAFETY_DISCLAIMER, [result?.disclaimer]);

  if (!result) {
    return (
      <section className="panel legal-page">
        <h1 className="page-title">Your symptom check result</h1>
        <p className="page-subtitle">
          Start a symptom check first to create your care level, Doctor-ready Summary, and insurance
          checklist.
        </p>
        <div style={{ marginTop: 18 }}>
          <Link className="btn-primary" href="/#symptom-check">
            Start Symptom Check
          </Link>
        </div>
      </section>
    );
  }

  const displayedRisk = formatRiskLevel(result.riskLevel, result.recommendedCareLevel);
  const careDescription =
    CARE_LEVEL_DESCRIPTIONS[result.recommendedCareLevel] ?? "Choose the care setting that matches your symptoms.";

  return (
    <section className="result-page">
      <p className="eyebrow">Symptom Triage</p>
      <h1 className="page-title">Your symptom check result</h1>
      <p className="page-subtitle">
        Reference ID: <strong>{result.referenceId}</strong>
      </p>

      <div className="risk-band">
        {["Low", "Moderate", "High", "Emergency"].map((level) => (
          <RiskLevelCard
            key={level}
            level={level}
            description={level === displayedRisk ? "Current result" : undefined}
          />
        ))}
      </div>

      <section className="result-section">
        <SectionHeader title="Recommended Care Level" />
        <CareLevelCard
          active
          title={result.recommendedCareLevel}
          description={careDescription}
          tone={displayedRisk === "Emergency" ? "danger" : displayedRisk === "High" ? "warning" : "primary"}
        />
      </section>

      <section className="result-section">
        <SectionHeader title="Why this result?" />
        <article className="panel result-card">
          <p>{explainResult(result)}</p>
        </article>
      </section>

      <section className="result-section">
        <SectionHeader title="Red Flags Checked" />
        <article className="panel result-card">
          <ul>
            {result.redFlags.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="result-section">
        <SectionHeader title="Possible Causes" />
        <article className="panel result-card">
          <ul>
            {result.possibleCauses.map((item) => (
              <li key={item}>{formatPossibleCause(item)}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="result-section">
        <SectionHeader title="What to Monitor" />
        <article className="panel result-card">
          <ul>
            {result.whatToMonitor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="result-section">
        <SectionHeader
          title="Doctor-ready Summary"
          description="Free preview. Download the full PDF report when you want a shareable visit note."
        />
        <DoctorSummaryPreview
          cta="Download Full PDF Report"
          previewOnly
          summary={result.doctorReadySummary}
        />
      </section>

      <section className="result-section">
        <SectionHeader title="Insurance Checklist" />
        <InsuranceChecklist items={INSURANCE_ITEMS} cta="Understand My Coverage Options" />
      </section>

      <section className="result-section">
        <DisclaimerBox text={disclaimer} />
      </section>
    </section>
  );
}
