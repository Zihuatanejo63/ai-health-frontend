"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";
import { getDetailQuestions, getSymptomCategory, redFlagSymptoms, symptomCategories } from "@/lib/symptomLibrary";
import { evaluateTriage } from "@/lib/triageRules";
import { readSymptomChecks, writeSymptomChecks, type SavedSymptomCheck } from "@/lib/settings";

const SESSION_RESULT_KEY = "ai-health-match-result";

const durations = ["Less than 24 hours", "1–3 days", "4–7 days", "More than 7 days"];
const temperatures = ["Normal", "99–100°F", "100–102°F", "Above 102°F", "Don’t know"];
const severities = ["Mild", "Moderate", "Severe"];
const trends = ["Getting better", "Worse", "Unchanged"];

export default function SymptomCheckPage() {
  const router = useRouter();
  const { language, t } = useI18n();
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [primarySymptom, setPrimarySymptom] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [duration, setDuration] = useState("1–3 days");
  const [painScore, setPainScore] = useState("3");
  const [temperature, setTemperature] = useState("Normal");
  const [severity, setSeverity] = useState("Moderate");
  const [trend, setTrend] = useState("Unchanged");
  const [redFlags, setRedFlags] = useState<string[]>([]);
  const [background, setBackground] = useState({
    age: "",
    sex: "",
    pregnancy: "No",
    chronicConditions: "",
    medications: "",
    allergies: "",
    insuranceStatus: "Active",
    countryRegion: ""
  });

  const primaryCategory = useMemo(() => getSymptomCategory(primarySymptom), [primarySymptom]);
  const detailQuestions = useMemo(() => getDetailQuestions(primaryCategory), [primaryCategory]);
  const isCrisisSelected = symptoms.includes("Suicidal thoughts") || symptoms.includes("Self-harm thoughts") || redFlags.includes("Suicidal thoughts");

  function toggleValue(value: string, values: string[], setter: (next: string[]) => void) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  function goNext() {
    if (step === 1 && symptoms.length > 0 && !primarySymptom) setPrimarySymptom(symptoms[0]);
    setStep((current) => Math.min(5, current + 1));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = evaluateTriage({
      symptoms,
      primarySymptom,
      duration,
      severity,
      redFlags,
      details: { ...details, painScore, temperature, trend },
      healthBackground: background
    });
    const saved: SavedSymptomCheck = {
      id: `check_${Date.now()}`,
      createdAt: new Date().toISOString(),
      symptoms,
      primarySymptom,
      duration,
      severity,
      redFlags,
      healthBackground: background,
      result
    };
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_RESULT_KEY, JSON.stringify(saved));
      writeSymptomChecks([saved, ...readSymptomChecks()]);
    }
    router.push("/result");
  }

  return (
    <section className="app-page symptom-app-page">
      <div className="intro-card app-page-header">
        <div>
          <p className="eyebrow">{t("symptom.eyebrow")}</p>
          <h1>{t("symptom.title")}</h1>
          <p>Step {step} of 5</p>
        </div>
        <IllustrationImage variant="section" src="/images/illustration-symptom-triage-doctor.png" alt="Doctor reviewing symptom triage icons" />
      </div>

      {isCrisisSelected ? (
        <section className="panel crisis-card">
          <h2>Crisis safety support</h2>
          <p>
            If you may hurt yourself or someone else, contact local emergency services now or reach a crisis hotline in your country.
            If you are in the U.S. or Canada, call or text 988 for immediate crisis support.
          </p>
          <button className="btn-secondary" onClick={() => setStep(1)} type="button">Review answers</button>
        </section>
      ) : null}

      <form className="triage-workflow" onSubmit={onSubmit}>
        {step === 1 ? (
          <article className="panel workflow-step">
            <span>Step 1: Choose symptoms</span>
            <h2>{t("symptom.question")}</h2>
            <p>Select all symptoms and choose one primary symptom.</p>
            <div className="symptom-category-grid">
              {symptomCategories.map((category) => (
                <section className="symptom-category-card" key={category.name}>
                  <h3>{category.name}</h3>
                  <div className="choice-grid">
                    {category.symptoms.map((symptom) => (
                      <label key={symptom} className={`choice-pill${symptom.includes("Suicidal") || symptom.includes("Self-harm") ? " danger-choice" : ""}`}>
                        <input
                          checked={symptoms.includes(symptom)}
                          onChange={() => toggleValue(symptom, symptoms, setSymptoms)}
                          type="checkbox"
                        />
                        {symptom}
                      </label>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <label className="form-field">
              Primary symptom
              <select value={primarySymptom} onChange={(event) => setPrimarySymptom(event.target.value)}>
                <option value="">Choose primary symptom</option>
                {symptoms.map((symptom) => <option key={symptom}>{symptom}</option>)}
              </select>
            </label>
          </article>
        ) : null}

        {step === 2 ? (
          <article className="panel workflow-step">
            <span>Step 2: Symptom details</span>
            <h2>{primarySymptom || "Primary symptom"} details</h2>
            <p>Questions are tailored to the primary symptom category: {primaryCategory}.</p>
            <div className="form-grid-two">
              {detailQuestions.map((question) => (
                <label className="form-field" key={question}>
                  {question}
                  <input value={details[question] ?? ""} onChange={(event) => setDetails({ ...details, [question]: event.target.value })} />
                </label>
              ))}
            </div>
          </article>
        ) : null}

        {step === 3 ? (
          <article className="panel workflow-step">
            <span>Step 3: Duration & severity</span>
            <h2>How long and how severe?</h2>
            <div className="choice-grid compact-choice-grid">
              {durations.map((item) => <label className="choice-pill" key={item}><input checked={duration === item} onChange={() => setDuration(item)} type="radio" /> {item}</label>)}
            </div>
            <label className="form-field">
              Pain score: {painScore}
              <input min="0" max="10" value={painScore} onChange={(event) => setPainScore(event.target.value)} type="range" />
            </label>
            <div className="choice-grid compact-choice-grid">
              {temperatures.map((item) => <label className="choice-pill" key={item}><input checked={temperature === item} onChange={() => setTemperature(item)} type="radio" /> {item}</label>)}
            </div>
            <div className="choice-grid compact-choice-grid">
              {severities.map((item) => <label className="choice-card" key={item}><input checked={severity === item} onChange={() => setSeverity(item)} type="radio" /> <strong>{item}</strong></label>)}
            </div>
            <div className="choice-grid compact-choice-grid">
              {trends.map((item) => <label className="choice-pill" key={item}><input checked={trend === item} onChange={() => setTrend(item)} type="radio" /> {item}</label>)}
            </div>
          </article>
        ) : null}

        {step === 4 ? (
          <article className="panel workflow-step">
            <span>Step 4: Red flags</span>
            <h2>{t("symptom.redFlags")}</h2>
            <div className="choice-grid">
              {redFlagSymptoms.map((item) => (
                <label className="choice-pill danger-choice" key={item}>
                  <input checked={redFlags.includes(item)} onChange={() => toggleValue(item, redFlags, setRedFlags)} type="checkbox" /> {item}
                </label>
              ))}
            </div>
          </article>
        ) : null}

        {step === 5 ? (
          <article className="panel workflow-step">
            <span>Step 5: Health background</span>
            <h2>Health background</h2>
            <div className="form-grid-two">
              {Object.entries(background).map(([key, value]) => (
                <label className="form-field" key={key}>
                  {key.replace(/([A-Z])/g, " $1")}
                  <input value={value} onChange={(event) => setBackground({ ...background, [key]: event.target.value })} />
                </label>
              ))}
            </div>
          </article>
        ) : null}

        <div className="workflow-actions">
          <button className="btn-secondary" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))} type="button">
            {t("common.back")}
          </button>
          {step < 5 ? (
            <button className="btn-primary" disabled={step === 1 && symptoms.length === 0} onClick={goNext} type="button">
              {t("common.continue")}
            </button>
          ) : (
            <button className="btn-primary" type="submit">
              Get My Care Guidance
            </button>
          )}
        </div>
      </form>

      <DisclaimerBox text={t("safety.medical")} />
    </section>
  );
}
