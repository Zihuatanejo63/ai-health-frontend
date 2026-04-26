"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DisclaimerBanner, DEFAULT_DISCLAIMER } from "@/components/disclaimer-banner";
import type { AnalyzeSymptomsResponse, RiskLevel } from "@/lib/types";

const SESSION_RESULT_KEY = "ai-health-match-result";

type StoredAnalysis = {
  response: AnalyzeSymptomsResponse;
};

function riskClassName(riskLevel: RiskLevel): string {
  if (riskLevel === "low") return "chip risk-low";
  if (riskLevel === "high") return "chip risk-high";
  return "chip risk-medium";
}

export default function ResultPage() {
  const [analysis, setAnalysis] = useState<StoredAnalysis | null>(null);

  useEffect(() => {
    const rawValue = sessionStorage.getItem(SESSION_RESULT_KEY);
    if (!rawValue) return;

    try {
      const parsed = JSON.parse(rawValue) as StoredAnalysis;
      if (parsed.response) setAnalysis(parsed);
    } catch {
      setAnalysis(null);
    }
  }, []);

  const result = analysis?.response;
  const disclaimer = useMemo(
    () => result?.disclaimer || DEFAULT_DISCLAIMER,
    [result?.disclaimer]
  );

  if (!result) {
    return (
      <section className="panel" style={{ padding: 18 }}>
        <h1 className="page-title" style={{ fontSize: 28 }}>
          AI result unavailable
        </h1>
        <p className="page-subtitle" style={{ marginBottom: 14 }}>
          Submit your symptoms on the home page first to generate an assessment summary.
        </p>
        <Link className="btn-primary" href="/" style={{ display: "inline-block" }}>
          Go to Symptom Input
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-title">AI Assessment Summary</h1>
      <p className="page-subtitle">
        Reference ID: <strong>{result.referenceId}</strong>
      </p>

      <div className="panel" style={{ marginTop: 18, padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className={riskClassName(result.riskLevel)}>
            Risk Level: {result.riskLevel.toUpperCase()}
          </span>
        </div>

        <h2 style={{ marginTop: 16, marginBottom: 6, fontSize: 22 }}>Clinical understanding</h2>
        <p style={{ marginTop: 0, lineHeight: 1.7 }}>{result.summary}</p>

        <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: 18 }}>Recommended departments</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          {result.recommendedDepartments.map((department) => (
            <li key={department}>{department}</li>
          ))}
        </ul>

        <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: 18 }}>Suggested next steps</h3>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          {result.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>

        <DisclaimerBanner text={disclaimer} />

        <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
          <Link className="btn-primary" href="/doctors">
            Find Matching Doctors
          </Link>
          <Link className="btn-secondary" href="/">
            Start New Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
