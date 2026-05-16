"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { VisualCard } from "@/components/visual-card";

const SESSION_RESULT_KEY = "ai-health-match-result";

const symptoms = [
  ["Fever", "symptom.fever"],
  ["Cough", "symptom.cough"],
  ["Headache", "symptom.headache"],
  ["Sore throat", "symptom.soreThroat"],
  ["Fatigue", "symptom.fatigue"],
  ["Body aches", "symptom.bodyAches"],
  ["Nausea", "symptom.nausea"],
  ["Shortness of breath", "symptom.shortnessBreath"],
  ["Runny nose", "symptom.runnyNose"]
];

const durations = [["Less than 24 hours", "symptom.less24"], ["1–3 days", "symptom.oneThree"], ["4–7 days", "symptom.fourSeven"], ["More than 7 days", "symptom.moreSeven"]];
const temperatures = [["Normal", "symptom.normal"], ["99–100°F", "symptom.tempLow"], ["100–102°F", "symptom.tempMedium"], ["Above 102°F", "symptom.tempHigh"], ["Don’t know", "symptom.dontKnow"]];
const severity = [["Mild", "symptom.mild"], ["Moderate", "common.moderate"], ["Severe", "symptom.severe"]];
const redFlags = [
  ["Chest pain", "symptom.chestPain"],
  ["Trouble breathing", "symptom.troubleBreathing"],
  ["Confusion", "symptom.confusion"],
  ["Severe dehydration", "symptom.severeDehydration"],
  ["Stiff neck", "symptom.stiffNeck"],
  ["Persistent vomiting", "symptom.persistentVomiting"],
  ["Rash with fever", "symptom.rashWithFever"]
];

export default function SymptomCheckPage() {
  const router = useRouter();
  const { language, t } = useI18n();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedSymptoms = symptoms.map(([value]) => value).filter((item) => formData.get(`symptom-${item}`));
    const selectedRedFlags = redFlags.map(([value]) => value).filter((item) => formData.get(`red-${item}`));
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
            languageCode: language,
            languageName: language
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
          <p className="eyebrow">{t("symptom.eyebrow")}</p>
          <h1>{t("symptom.title")}</h1>
          <p>{t("symptom.step")}</p>
        </div>
        <VisualCard
          src="/images/illustration-symptom-triage-doctor.png"
          alt="Doctor reviewing symptom triage icons"
        />
      </div>

      <form className="triage-workflow" onSubmit={onSubmit}>
        <article className="panel workflow-step">
          <span>{t("symptom.step")}</span>
          <h2>{t("symptom.question")}</h2>
          <p>{t("symptom.selectAll")}</p>
          <div className="choice-grid">
            {symptoms.map(([value, labelKey]) => (
              <label key={value} className="choice-pill">
                <input type="checkbox" name={`symptom-${value}`} /> {t(labelKey)}
              </label>
            ))}
          </div>
        </article>

        <article className="panel workflow-step">
          <h2>{t("symptom.durationQuestion")}</h2>
          <div className="choice-grid compact-choice-grid">
            {durations.map(([value, labelKey]) => (
              <label key={value} className="choice-pill">
                <input type="radio" name="duration" value={value} /> {t(labelKey)}
              </label>
            ))}
          </div>
        </article>

        <article className="panel workflow-step">
          <h2>{t("symptom.temperatureQuestion")}</h2>
          <div className="choice-grid compact-choice-grid">
            {temperatures.map(([value, labelKey]) => (
              <label key={value} className="choice-pill">
                <input type="radio" name="temperature" value={value} /> {t(labelKey)}
              </label>
            ))}
          </div>
        </article>

        <article className="panel workflow-step">
          <h2>{t("symptom.severityQuestion")}</h2>
          <div className="choice-grid compact-choice-grid">
            {severity.map(([value, labelKey]) => (
              <label key={value} className="choice-card">
                <input type="radio" name="severity" value={value} /> <strong>{t(labelKey)}</strong>
              </label>
            ))}
          </div>
        </article>

        <article className="panel workflow-step">
          <h2>{t("symptom.redFlags")}</h2>
          <div className="choice-grid">
            {redFlags.map(([value, labelKey]) => (
              <label key={value} className="choice-pill danger-choice">
                <input type="checkbox" name={`red-${value}`} /> {t(labelKey)}
              </label>
            ))}
          </div>
        </article>

        <div className="workflow-actions">
          <button className="btn-secondary" type="button">
            {t("common.back")}
          </button>
          <button className="btn-primary" type="submit">
            {t("common.continue")}
          </button>
        </div>
      </form>

      <DisclaimerBox text={t("safety.medical")} />
    </section>
  );
}
