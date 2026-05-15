"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CareLevelCard } from "@/components/care-level-card";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { DoctorSummaryPreview } from "@/components/doctor-summary-preview";
import { InsuranceChecklist } from "@/components/insurance-checklist";
import { useLanguage } from "@/components/language-provider";
import { RiskLevelCard } from "@/components/risk-level-card";
import { SectionHeader } from "@/components/section-header";
import { getCopy } from "@/lib/i18n";
import type { AnalyzeSymptomsResponse, RiskLevel } from "@/lib/types";

const SESSION_RESULT_KEY = "ai-health-match-result";

type StoredAnalysis = {
  response: AnalyzeSymptomsResponse;
};

const demoResult: AnalyzeSymptomsResponse = {
  referenceId: "HM-DEMO-RESULT",
  riskLevel: "medium",
  redFlags: ["Chest pain: not selected", "Trouble breathing: not selected", "Confusion: not selected", "Severe dehydration: not selected"],
  recommendedCareLevel: "Primary Care",
  possibleCauses: ["a viral respiratory infection", "seasonal flu or COVID-like illness", "an irritation or infection that should be reviewed if symptoms worsen"],
  whatToMonitor: ["Breathing effort", "Fever trend", "Hydration", "Chest discomfort", "Symptoms lasting longer than expected"],
  doctorReadySummary: "Fever and cough for 2 days. Temperature around 101°F. Pain score 3/10. No emergency red flags selected in this demo. Questions to ask: when to seek urgent care, what tests may be useful, and what symptoms should trigger reassessment.",
  insuranceNavigation: ["Is urgent care covered?", "Is the provider in-network?", "What is your copay?", "Does your deductible apply?", "Is telehealth covered?"],
  disclaimer: "HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care. Insurance information is educational only."
};

function formatRiskKey(riskLevel: RiskLevel, recommendedCareLevel?: string): "Low" | "Moderate" | "High" | "Emergency" {
  if (recommendedCareLevel === "Emergency") return "Emergency";
  if (riskLevel === "low") return "Low";
  if (riskLevel === "high") return "High";
  return "Moderate";
}

function formatPossibleCause(item: string, prefix: string): string {
  const trimmed = item.trim();
  if (trimmed.toLowerCase().startsWith("your symptoms may be consistent with")) {
    return trimmed;
  }
  return `${prefix} ${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}.`;
}

export default function ResultPage() {
  const { languageCode } = useLanguage();
  const copy = getCopy(languageCode);
  const resultCopy = copy.result;
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

  const hasStoredResult = Boolean(analysis?.response);
  const result = analysis?.response ?? demoResult;
  const disclaimer = useMemo(() => result?.disclaimer || copy.safety, [copy.safety, result?.disclaimer]);

  const displayedRisk = formatRiskKey(result.riskLevel, result.recommendedCareLevel);
  const careDescription =
    resultCopy.careDescriptions[result.recommendedCareLevel as keyof typeof resultCopy.careDescriptions] ??
    resultCopy.fallbackCare;
  const whyText = resultCopy.whyText
    .replace("{risk}", resultCopy.risk[displayedRisk])
    .replace("{care}", result.recommendedCareLevel);

  return (
    <section className="result-page">
      <p className="eyebrow">Symptom Triage</p>
      <h1 className="page-title">{resultCopy.title}</h1>
      <p className="page-subtitle">
        {resultCopy.reference}: <strong>{result.referenceId}</strong>
      </p>

      {!hasStoredResult ? (
        <article className="panel empty-state-card">
          <div>
            <h2>Start a symptom check first</h2>
            <p>{resultCopy.unavailableText}</p>
          </div>
          <Link className="btn-primary" href="/symptom-check">
            {copy.home.start}
          </Link>
        </article>
      ) : null}

      <div className="risk-band">
        {["Low", "Moderate", "High", "Emergency"].map((level) => (
          <RiskLevelCard
            key={level}
            level={resultCopy.risk[level as keyof typeof resultCopy.risk]}
            tone={level.toLowerCase() as "low" | "moderate" | "high" | "emergency"}
            description={level === displayedRisk ? resultCopy.current : undefined}
          />
        ))}
      </div>

      <section className="result-section">
        <SectionHeader title={resultCopy.recommended} />
        <CareLevelCard
          active
          title={result.recommendedCareLevel}
          description={careDescription}
          tone={displayedRisk === "Emergency" ? "danger" : displayedRisk === "High" ? "warning" : "primary"}
        />
      </section>

      <section className="result-section">
        <SectionHeader title={resultCopy.why} />
        <article className="panel result-card">
          <p>{whyText}</p>
        </article>
      </section>

      <section className="result-section">
        <SectionHeader title={resultCopy.redFlags} />
        <article className="panel result-card">
          <ul>
            {result.redFlags.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="result-section">
        <SectionHeader title={resultCopy.causes} />
        <article className="panel result-card">
          <ul>
            {result.possibleCauses.map((item) => (
              <li key={item}>{formatPossibleCause(item, resultCopy.possiblePrefix)}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="result-section">
        <SectionHeader title={resultCopy.monitor} />
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
          title={copy.summary.title}
          description={resultCopy.summaryDescription}
        />
        <DoctorSummaryPreview
          eyebrow={copy.summary.eyebrow}
          title={copy.summary.title}
          fields={[...copy.summary.fields]}
          cta={copy.summary.fullCta}
          previewOnly
          summary={result.doctorReadySummary}
        />
        <div className="result-actions">
          <Link className="btn-primary" href="/payment-success">
            Download Full PDF Report
          </Link>
          <Link className="btn-secondary" href="/payment-success">
            Save Symptom Timeline
          </Link>
        </div>
      </section>

      <section className="result-section">
        <SectionHeader title={resultCopy.insurance} />
        <InsuranceChecklist
          eyebrow={copy.insurance.eyebrow}
          title={copy.insurance.title}
          description={copy.insurance.description}
          items={[...copy.insurance.items]}
          cta={copy.insurance.cta}
          href="/insurance-guide"
        />
      </section>

      <section className="result-section">
        <DisclaimerBox text={disclaimer} />
      </section>
    </section>
  );
}
