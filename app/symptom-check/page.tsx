"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { VisualCard } from "@/components/visual-card";

const SESSION_RESULT_KEY = "ai-health-match-result";

const symptoms = [
  "Fever",
  "Cough",
  "Headache",
  "Sore throat",
  "Fatigue",
  "Body aches",
  "Nausea",
  "Shortness of breath",
  "Runny nose"
];

const durations = ["Less than 24 hours", "1–3 days", "4–7 days", "More than a week"];
const temperatures = ["Normal", "99–100°F", "100–102°F", "Above 102°F", "Don’t know"];
const severity = ["Mild", "Moderate", "Severe"];
const redFlags = [
  "Chest pain",
  "Trouble breathing",
  "Confusion",
  "Severe dehydration",
  "Stiff neck",
  "Persistent vomiting",
  "Rash with fever"
];

export default function SymptomCheckPage() {
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedSymptoms = symptoms.filter((item) => formData.get(`symptom-${item}`));
    const selectedRedFlags = redFlags.filter((item) => formData.get(`red-${item}`));
    const duration = String(formData.get("duration") || "1–3 days");
    const temperature = String(formData.get("temperature") || "100–102°F");
    const level = String(formData.get("severity") || "Moderate");

    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(
        SESSION_RESULT_KEY,
        JSON.stringify({
          request: {
            symptoms: selectedSymptoms.join(", ") || "Fever, cough",
            severity: level.toLowerCase(),
            durationValue: 3,
            durationUnit: "days",
            languageCode: "en",
            languageName: "English"
          },
          response: {
            referenceId: "HM-APP-TRIAGE",
            riskLevel: selectedRedFlags.length > 0 ? "high" : "medium",
            redFlags:
              selectedRedFlags.length > 0
                ? selectedRedFlags
                : [
                    "No chest pain reported",
                    "No trouble breathing reported",
                    "No confusion reported",
                    "No severe dehydration reported",
                    "No stiff neck reported"
                  ],
            recommendedCareLevel: selectedRedFlags.length > 0 ? "Urgent Care" : "Primary Care",
            possibleCauses: ["Common cold", "Flu-like illness", "COVID-like respiratory infection", "Throat infection"],
            whatToMonitor: ["Monitor temperature, breathing, hydration, worsening fatigue, and symptom duration."],
            doctorReadySummary: `${selectedSymptoms.join(", ") || "Fever, cough"}. Duration: ${duration}. Highest temperature: ${temperature}. Overall severity: ${level}. Red flags checked: ${selectedRedFlags.length ? selectedRedFlags.join(", ") : "none selected"}.`,
            insuranceNavigation: ["Is urgent care covered?", "Is the provider in-network?", "What is your copay?", "Does your deductible apply?", "Is telehealth covered?"],
            disclaimer: "HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care. Insurance information is educational only."
          }
        })
      );
    }

    router.push("/result");
  }

  return (
    <section className="app-page symptom-app-page">
      <div className="app-page-header">
        <div>
          <p className="eyebrow">Symptom Triage</p>
          <h1>Symptom Check</h1>
          <p>Step 1 of 5</p>
        </div>
        <VisualCard
          src="/images/illustration-symptom-triage.png"
          alt="Symptom triage app screen"
        />
      </div>

      <form className="triage-workflow" onSubmit={onSubmit}>
        <article className="panel workflow-step">
          <span>Step 1 of 5</span>
          <h2>What symptoms are you experiencing?</h2>
          <div className="choice-grid">
            {symptoms.map((item) => (
              <label key={item} className="choice-pill">
                <input type="checkbox" name={`symptom-${item}`} /> {item}
              </label>
            ))}
          </div>
        </article>

        <article className="panel workflow-step">
          <h2>How long have you had these symptoms?</h2>
          <div className="choice-grid compact-choice-grid">
            {durations.map((item) => (
              <label key={item} className="choice-pill">
                <input type="radio" name="duration" value={item} /> {item}
              </label>
            ))}
          </div>
        </article>

        <article className="panel workflow-step">
          <h2>What is your highest temperature?</h2>
          <div className="choice-grid compact-choice-grid">
            {temperatures.map((item) => (
              <label key={item} className="choice-pill">
                <input type="radio" name="temperature" value={item} /> {item}
              </label>
            ))}
          </div>
        </article>

        <article className="panel workflow-step">
          <h2>Overall severity</h2>
          <div className="choice-grid compact-choice-grid">
            {severity.map((item) => (
              <label key={item} className="choice-card">
                <input type="radio" name="severity" value={item} /> <strong>{item}</strong>
              </label>
            ))}
          </div>
        </article>

        <article className="panel workflow-step">
          <h2>Red flag symptoms</h2>
          <div className="choice-grid">
            {redFlags.map((item) => (
              <label key={item} className="choice-pill">
                <input type="checkbox" name={`red-${item}`} /> {item}
              </label>
            ))}
          </div>
        </article>

        <div className="workflow-actions">
          <button className="btn-secondary" type="button">
            Back
          </button>
          <button className="btn-secondary" type="button">
            Continue
          </button>
          <button className="btn-primary" type="submit">
            Get My Care Guidance
          </button>
        </div>
      </form>

      <DisclaimerBox text="HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care." />
    </section>
  );
}
