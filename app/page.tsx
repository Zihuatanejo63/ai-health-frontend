"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CareLevelCard } from "@/components/care-level-card";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { DoctorSummaryPreview } from "@/components/doctor-summary-preview";
import { SectionHeader } from "@/components/section-header";
import { SymptomButton } from "@/components/symptom-button";
import { analyzeSymptoms } from "@/lib/api";
import type { DurationUnit, Severity } from "@/lib/types";

const SESSION_RESULT_KEY = "ai-health-match-result";

const COMMON_SYMPTOMS = [
  "Fever",
  "Cough",
  "Headache",
  "Stomach pain",
  "Rash",
  "Chest discomfort",
  "Urinary pain",
  "Diarrhea"
];

const CARE_LEVELS = [
  { title: "Emergency", description: "Seek emergency care now", tone: "danger" as const },
  { title: "Urgent Care", description: "Get care today", tone: "warning" as const },
  { title: "Primary Care", description: "See a clinician soon", tone: "primary" as const },
  { title: "Telehealth", description: "Start with virtual care", tone: "secondary" as const },
  { title: "Self-care", description: "Monitor at home", tone: "success" as const }
];

const INSURANCE_TOPICS = [
  "Urgent care vs ER",
  "Deductible",
  "Copay",
  "Out-of-pocket maximum",
  "In-network vs out-of-network",
  "Talk to a licensed insurance partner"
];

const COPY = {
  title: "Know what care you need — and how to pay for it.",
  subtitle:
    "Check your symptoms, understand your risk level, choose the right care option, and prepare a clear summary for a clinician.",
  symptomsLabel: "Primary symptoms",
  symptomsPlaceholder:
    "Example: fever and cough for 2 days, temperature 101°F, worse at night.",
  severityLabel: "Current severity",
  durationLabel: "Duration",
  analyze: "Start Symptom Check",
  analyzing: "Checking symptoms...",
  careCta: "Find My Care Option",
  errors: {
    symptoms: "Please provide symptom details.",
    duration: "Duration must be greater than 0.",
    unexpected: "Unexpected error."
  },
  severity: { mild: "Mild", moderate: "Moderate", severe: "Severe" },
  units: { hours: "Hours", days: "Days", weeks: "Weeks", months: "Months" }
};

export default function HomePage() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState<Severity>("mild");
  const [durationValue, setDurationValue] = useState<number>(1);
  const [durationUnit, setDurationUnit] = useState<DurationUnit>("days");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addSymptom(label: string) {
    setSymptoms((current) => {
      const separator = current.trim().length > 0 ? ", " : "";
      return `${current}${separator}${label}`;
    });
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const trimmedSymptoms = symptoms.trim();
    if (!trimmedSymptoms) {
      setError(COPY.errors.symptoms);
      return;
    }
    if (!Number.isFinite(durationValue) || durationValue <= 0) {
      setError(COPY.errors.duration);
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeSymptoms({
        symptoms: trimmedSymptoms,
        severity,
        durationValue,
        durationUnit,
        outputLanguage: "English"
      });

      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(
          SESSION_RESULT_KEY,
          JSON.stringify({
            request: {
              symptoms: trimmedSymptoms,
              severity,
              durationValue,
              durationUnit,
              languageCode: "en",
              languageName: "English"
            },
            response: result
          })
        );
      }
      router.push("/result");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : COPY.errors.unexpected;
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="home-page">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Symptom Triage · Care Level Finder · Insurance Navigation</p>
          <h1>{COPY.title}</h1>
          <p>{COPY.subtitle}</p>
          <div className="hero-actions">
            <a className="btn-primary" href="#symptom-check">
              {COPY.analyze}
            </a>
            <a className="btn-secondary" href="#care-options">
              {COPY.careCta}
            </a>
          </div>
        </div>

        <aside className="triage-preview-card" aria-label="AI triage result preview">
          <div>
            <span className="preview-kicker">AI triage result preview</span>
            <h2>Symptom: Fever + cough</h2>
          </div>
          <div className="preview-row">
            <span>Risk level</span>
            <strong className="preview-risk">Moderate</strong>
          </div>
          <div className="preview-row">
            <span>Recommended care</span>
            <strong>Primary care / urgent care if worsening</strong>
          </div>
          <div className="preview-note">
            Insurance note: Check urgent care vs ER coverage before going
          </div>
        </aside>
      </div>

      <section className="home-section" id="symptom-check">
        <SectionHeader
          eyebrow="Symptom Triage"
          title="Start with what you feel"
          description="Choose common symptoms or describe your own. The result helps you think through risk level, possible causes, and care options."
        />

        <div className="symptom-grid">
          {COMMON_SYMPTOMS.map((symptom) => (
            <SymptomButton key={symptom} label={symptom} onClick={addSymptom} />
          ))}
        </div>

        <form className="panel triage-form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="symptoms">{COPY.symptomsLabel}</label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(event) => setSymptoms(event.target.value)}
              placeholder={COPY.symptomsPlaceholder}
            />
          </div>

          <div className="grid-2">
            <div>
              <label htmlFor="severity">{COPY.severityLabel}</label>
              <select
                id="severity"
                value={severity}
                onChange={(event) => setSeverity(event.target.value as Severity)}
              >
                <option value="mild">{COPY.severity.mild}</option>
                <option value="moderate">{COPY.severity.moderate}</option>
                <option value="severe">{COPY.severity.severe}</option>
              </select>
            </div>
            <div>
              <label htmlFor="durationValue">{COPY.durationLabel}</label>
              <div className="grid-2 compact-grid">
                <input
                  id="durationValue"
                  type="number"
                  min={1}
                  value={durationValue}
                  onChange={(event) => setDurationValue(Number(event.target.value))}
                />
                <select
                  value={durationUnit}
                  onChange={(event) => setDurationUnit(event.target.value as DurationUnit)}
                >
                  <option value="hours">{COPY.units.hours}</option>
                  <option value="days">{COPY.units.days}</option>
                  <option value="weeks">{COPY.units.weeks}</option>
                  <option value="months">{COPY.units.months}</option>
                </select>
              </div>
            </div>
          </div>

          {error && <p className="inline-error">{error}</p>}

          <button className="btn-primary" disabled={loading} type="submit">
            {loading ? COPY.analyzing : COPY.analyze}
          </button>
        </form>
      </section>

      <section className="home-section" id="care-options">
        <SectionHeader
          eyebrow="Care Level Finder"
          title="Choose the right care setting"
          description="Compare common care routes before you spend time or money in the wrong place."
        />
        <div className="care-card-grid">
          {CARE_LEVELS.map((level) => (
            <CareLevelCard
              key={level.title}
              title={level.title}
              description={level.description}
              tone={level.tone}
            />
          ))}
        </div>
      </section>

      <section className="home-section" id="health-records">
        <SectionHeader
          eyebrow="Doctor Visit Prep"
          title="Prepare a clearer clinician conversation"
          description="Turn scattered symptom notes into a structured Doctor-ready Summary."
        />
        <DoctorSummaryPreview />
      </section>

      <section className="home-section" id="insurance-guide">
        <SectionHeader
          eyebrow="Insurance Navigation"
          title="Know what coverage questions to ask"
          description="Educational guidance only. HealthMatchAI does not sell insurance or recommend a specific plan."
        />
        <div className="insurance-topic-grid">
          {INSURANCE_TOPICS.map((topic) => (
            <article className="insurance-topic-card" key={topic}>
              {topic}
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" id="pricing">
        <SectionHeader
          eyebrow="Pricing"
          title="Paid tools when you need a shareable record"
          description="Start free, then download structured reports or coverage checklists when useful."
        />
        <div className="pricing-panel panel">
          <span>Free symptom check</span>
          <strong>Optional paid PDF reports and insurance checklists</strong>
          <a className="btn-secondary" href="/payment-success">
            View paid tools
          </a>
        </div>
      </section>

      <section className="home-section">
        <SectionHeader eyebrow="Safety Disclaimer" title="Use this as a guide, not a final answer" />
        <DisclaimerBox />
      </section>
    </section>
  );
}
