"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CareLevelCard } from "@/components/care-level-card";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { DoctorSummaryPreview } from "@/components/doctor-summary-preview";
import { useLanguage } from "@/components/language-provider";
import { SectionHeader } from "@/components/section-header";
import { SymptomButton } from "@/components/symptom-button";
import { VisualCard } from "@/components/visual-card";
import { analyzeSymptoms } from "@/lib/api";
import { getCopy } from "@/lib/i18n";
import type { DurationUnit, Severity } from "@/lib/types";

const SESSION_RESULT_KEY = "ai-health-match-result";

const CARE_TONES = ["danger", "warning", "primary", "secondary", "success"] as const;

export default function HomePage() {
  const router = useRouter();
  const { languageCode } = useLanguage();
  const copy = getCopy(languageCode);
  const home = copy.home;
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
      setError(home.errors.symptoms);
      return;
    }
    if (!Number.isFinite(durationValue) || durationValue <= 0) {
      setError(home.errors.duration);
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeSymptoms({
        symptoms: trimmedSymptoms,
        severity,
        durationValue,
        durationUnit,
        outputLanguage: copy.languageName
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
              languageCode,
              languageName: copy.languageName
            },
            response: result
          })
        );
      }
      router.push("/result");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : home.errors.unexpected;
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="home-page">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1>{home.title}</h1>
          <p>{home.subtitle}</p>
          <div className="hero-actions">
            <a className="btn-primary" href="/symptom-check">
              {home.start}
            </a>
            <a className="btn-secondary" href="/care-options">
              {home.careCta}
            </a>
          </div>
        </div>

        <VisualCard
          src="/images/hero-care-dashboard.png"
          alt="Health decision dashboard showing risk level, recommended care, red flags, insurance note, and doctor-ready summary"
        />
      </div>

      <section className="home-section" id="symptom-check">
        <div className="section-media-grid">
          <div>
            <SectionHeader
              eyebrow={copy.nav[0]}
              title={home.symptomTitle}
              description={home.symptomDescription}
            />

            <div className="symptom-grid">
              {home.symptoms.map((symptom) => (
                <SymptomButton key={symptom} label={symptom} onClick={addSymptom} />
              ))}
            </div>
          </div>
          <VisualCard
            src="/images/illustration-symptom-triage.png"
            alt="Product illustration of common symptom buttons including fever, cough, and headache"
          />
        </div>

        <form className="panel triage-form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="symptoms">{home.symptomsLabel}</label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(event) => setSymptoms(event.target.value)}
              placeholder={home.symptomsPlaceholder}
            />
          </div>

          <div className="grid-2">
            <div>
              <label htmlFor="severity">{home.severityLabel}</label>
              <select
                id="severity"
                value={severity}
                onChange={(event) => setSeverity(event.target.value as Severity)}
              >
                <option value="mild">{home.severity.mild}</option>
                <option value="moderate">{home.severity.moderate}</option>
                <option value="severe">{home.severity.severe}</option>
              </select>
            </div>
            <div>
              <label htmlFor="durationValue">{home.durationLabel}</label>
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
                  <option value="hours">{home.units.hours}</option>
                  <option value="days">{home.units.days}</option>
                  <option value="weeks">{home.units.weeks}</option>
                  <option value="months">{home.units.months}</option>
                </select>
              </div>
            </div>
          </div>

          {error && <p className="inline-error">{error}</p>}

          <button className="btn-primary" disabled={loading} type="submit">
            {loading ? home.analyzing : home.start}
          </button>
        </form>
      </section>

      <section className="home-section" id="care-options">
        <div className="section-media-grid">
          <SectionHeader
            eyebrow={copy.nav[1]}
            title={home.careTitle}
            description={home.careDescription}
          />
          <VisualCard
            src="/images/illustration-care-levels.png"
            alt="Product illustration showing emergency, urgent care, primary care, telehealth, and self-care paths"
          />
        </div>
        <div className="care-card-grid">
          {home.careLevels.map(([title, description], index) => (
            <CareLevelCard
              key={title}
              title={title}
              description={description}
              tone={CARE_TONES[index] ?? "primary"}
            />
          ))}
        </div>
      </section>

      <section className="home-section" id="health-records">
        <div className="section-media-grid">
          <div>
            <SectionHeader
              eyebrow={copy.summary.eyebrow}
              title={home.prepTitle}
              description={home.prepDescription}
            />
            <DoctorSummaryPreview
              eyebrow={copy.summary.eyebrow}
              title={copy.summary.title}
              fields={[...copy.summary.fields]}
              cta={copy.summary.cta}
            />
          </div>
          <VisualCard
            src="/images/illustration-doctor-summary.png"
            alt="Product illustration of a doctor-ready PDF report with symptoms, timeline, red flags, and questions"
          />
        </div>
      </section>

      <section className="home-section" id="insurance-guide">
        <div className="section-media-grid">
          <div>
            <SectionHeader
              eyebrow={copy.insurance.eyebrow}
              title={home.insuranceTitle}
              description={home.insuranceDescription}
            />
            <div className="insurance-topic-grid">
              {home.insuranceTopics.map((topic) => (
                <article className="insurance-topic-card" key={topic}>
                  {topic}
                </article>
              ))}
            </div>
          </div>
          <VisualCard
            src="/images/illustration-insurance-checklist.png"
            alt="Product illustration of insurance card, medical bill, copay, deductible, and in-network checklist"
          />
        </div>
        <a className="btn-secondary section-cta" href="/insurance-guide">
          {copy.insurance.cta}
        </a>
      </section>

      <section className="home-section">
        <SectionHeader eyebrow={copy.legal[2]} title={home.safetyTitle} />
        <DisclaimerBox text={copy.safety} />
      </section>
    </section>
  );
}
