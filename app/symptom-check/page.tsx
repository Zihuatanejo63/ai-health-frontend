"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { SectionHeader } from "@/components/section-header";
import { VisualCard } from "@/components/visual-card";

const SESSION_RESULT_KEY = "ai-health-match-result";

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
  const [mainSymptom, setMainSymptom] = useState("Fever + cough");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const symptom = String(formData.get("mainSymptom") || mainSymptom || "Fever + cough");
    const checkedRedFlags = redFlags.filter((item) => formData.get(item));

    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(
        SESSION_RESULT_KEY,
        JSON.stringify({
          request: {
            symptoms: symptom,
            severity: "moderate",
            durationValue: Number(formData.get("durationValue") || 2),
            durationUnit: "days",
            languageCode: "en",
            languageName: "English"
          },
          response: {
            referenceId: "HM-DEMO-TRIAGE",
            riskLevel: checkedRedFlags.length > 0 ? "high" : "medium",
            redFlags: checkedRedFlags.length > 0 ? checkedRedFlags : ["No emergency red flags selected in this demo"],
            recommendedCareLevel: checkedRedFlags.length > 0 ? "Urgent Care" : "Primary Care",
            possibleCauses: ["a viral respiratory infection", "seasonal flu or COVID-like illness", "another short-term infection that needs clinical review if worsening"],
            whatToMonitor: ["Breathing changes", "Fever over time", "Hydration", "New chest discomfort", "Symptoms lasting longer than expected"],
            doctorReadySummary: `${symptom}. Duration: ${formData.get("durationValue") || "2"} days. Temperature: ${formData.get("temperature") || "101"}°F. Pain score: ${formData.get("painScore") || "3"}/10. Red flags checked: ${checkedRedFlags.length ? checkedRedFlags.join(", ") : "none selected"}.`,
            insuranceNavigation: ["Check urgent care vs ER coverage", "Confirm in-network status", "Ask whether deductible applies"],
            disclaimer: "HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care. Insurance information is educational only."
          }
        })
      );
    }

    router.push("/result");
  }

  return (
    <section className="stack-page">
      <div className="page-hero-grid">
        <SectionHeader
          eyebrow="Symptom Triage"
          title="Start your symptom check"
          description="Answer a few structured questions to understand your risk level and care options."
        />
        <VisualCard
          src="/images/illustration-symptom-triage.png"
          alt="Symptom triage product interface"
        />
      </div>

      <form className="multi-step-form" onSubmit={onSubmit}>
        <article className="panel form-step">
          <span>Step 1 Basic info</span>
          <div className="grid-2">
            <label>
              Age
              <input name="age" type="number" min={0} placeholder="34" />
            </label>
            <label>
              Main symptom
              <input
                name="mainSymptom"
                value={mainSymptom}
                onChange={(event) => setMainSymptom(event.target.value)}
                placeholder="Fever + cough"
              />
            </label>
          </div>
        </article>

        <article className="panel form-step">
          <span>Step 2 Main symptoms</span>
          <div className="checkbox-grid">
            {["Fever", "Cough", "Headache", "Stomach pain", "Rash", "Urinary pain"].map((item) => (
              <label key={item} className="check-row">
                <input type="checkbox" name={`symptom-${item}`} /> {item}
              </label>
            ))}
          </div>
        </article>

        <article className="panel form-step">
          <span>Step 3 Duration and severity</span>
          <div className="grid-2">
            <label>
              Temperature
              <input name="temperature" placeholder="101°F" />
            </label>
            <label>
              Pain score
              <input name="painScore" type="number" min={0} max={10} placeholder="3" />
            </label>
            <label>
              Duration
              <input name="durationValue" type="number" min={1} placeholder="2" />
            </label>
          </div>
        </article>

        <article className="panel form-step">
          <span>Step 4 Red flag symptoms</span>
          <div className="checkbox-grid">
            {redFlags.map((item) => (
              <label key={item} className="check-row">
                <input type="checkbox" name={item} /> {item}
              </label>
            ))}
          </div>
        </article>

        <article className="panel form-step">
          <span>Step 5 Health background</span>
          <div className="checkbox-grid">
            {["Pregnancy", "Chronic disease", "Immunocompromised"].map((item) => (
              <label key={item} className="check-row">
                <input type="checkbox" name={item} /> {item}
              </label>
            ))}
          </div>
        </article>

        <button className="btn-primary form-submit" type="submit">
          Get My Care Guidance
        </button>
      </form>

      <DisclaimerBox text="HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care. For urgent or severe symptoms, seek medical help now." />
    </section>
  );
}
