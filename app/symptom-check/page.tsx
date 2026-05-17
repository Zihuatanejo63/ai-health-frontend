"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";
import { getDetailQuestions, getSymptomCategory, redFlagSymptoms, symptomCategories } from "@/lib/symptomLibrary";
import { evaluateTriage } from "@/lib/triageRules";
import { readSymptomChecks, writeSymptomChecks, type SavedSymptomCheck } from "@/lib/settings";
import { backgroundFieldKey, detailQuestionKey, symptomItemKey } from "@/lib/i18n-display";

const SESSION_RESULT_KEY = "ai-health-match-result";

const durations = ["Less than 24 hours", "1–3 days", "4–7 days", "More than 7 days"];
const temperatures = ["Normal", "99–100°F", "100–102°F", "Above 102°F", "Don’t know"];
const severities = ["Mild", "Moderate", "Severe"];
const trends = ["Getting better", "Getting worse", "Unchanged"];

const optionKeyMap: Record<string, string> = {
  "Less than 24 hours": "symptom.duration.lessThan24h",
  "1–3 days": "symptom.duration.oneToThreeDays",
  "4–7 days": "symptom.duration.fourToSevenDays",
  "More than 7 days": "symptom.duration.moreThanSevenDays",
  Normal: "symptom.temperature.normal",
  "99–100°F": "symptom.temperature.lowGrade",
  "100–102°F": "symptom.temperature.moderate",
  "Above 102°F": "symptom.temperature.high",
  "Don’t know": "symptom.temperature.dontKnow",
  Mild: "symptom.severity.mild",
  Moderate: "symptom.severity.moderate",
  Severe: "symptom.severity.severe",
  "Getting better": "symptom.trend.gettingBetter",
  "Getting worse": "symptom.trend.gettingWorse",
  Unchanged: "symptom.trend.unchanged"
};

export default function SymptomCheckPage() {
  const router = useRouter();
  const { t } = useI18n();
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
  const [formError, setFormError] = useState("");
  const [background, setBackground] = useState({
    age: "",
    sex: "",
    pregnancy: "No",
    chronicConditions: "",
    immunocompromised: "No",
    medications: "",
    allergies: "",
    insuranceStatus: "Active",
    countryRegion: ""
  });

  const primaryCategory = useMemo(() => getSymptomCategory(primarySymptom), [primarySymptom]);
  const detailQuestions = useMemo(() => getDetailQuestions(primaryCategory), [primaryCategory]);
  const isCrisisSelected = symptoms.includes("suicidal-thoughts") || symptoms.includes("self-harm-thoughts") || redFlags.includes("suicidal-thoughts");

  function toggleSymptom(symptom: string) {
    const nextSymptoms = symptoms.includes(symptom) ? symptoms.filter((item) => item !== symptom) : [...symptoms, symptom];
    setSymptoms(nextSymptoms);
    if (primarySymptom === symptom && !nextSymptoms.includes(symptom)) setPrimarySymptom("");
    setFormError("");
  }

  function toggleValue(value: string, values: string[], setter: (next: string[]) => void) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
    setFormError("");
  }

  function validateStep(currentStep = step) {
    if (currentStep === 1 && symptoms.length === 0) return "symptom.errors.selectAtLeastOneSymptom";
    if (currentStep === 1 && !primarySymptom) return "symptom.errors.selectPrimarySymptom";
    if (currentStep === 5 && background.age.trim()) {
      const age = Number(background.age);
      if (!Number.isInteger(age) || age < 0 || age > 120) return "symptom.errors.invalidAge";
    }
    return "";
  }

  function goNext() {
    const error = validateStep();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError("");
    setStep((current) => Math.min(5, current + 1));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = validateStep(5);
    if (error) {
      setFormError(error);
      return;
    }
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
          <p>{t("symptom.subtitle")}</p>
          <p>{t("symptom.stepOf").replace("{step}", String(step)).replace("{total}", "5")}</p>
        </div>
        <IllustrationImage variant="section" src="/images/illustration-symptom-triage-doctor.png" alt="Doctor reviewing symptom triage icons" />
      </div>

      {isCrisisSelected ? (
        <section className="panel crisis-card">
          <h2>{t("symptom.crisis.title")}</h2>
          <p>{t("symptom.crisis.description")}</p>
          <p><strong>{t("symptom.crisis.seekImmediateHelp")}</strong></p>
          <p>{t("symptom.crisis.localEmergency")}</p>
          <p>{t("symptom.crisis.notAlone")}</p>
          <button
            className="btn-secondary"
            onClick={() => {
              setSymptoms((current) => current.filter((item) => item !== "suicidal-thoughts" && item !== "self-harm-thoughts"));
              setRedFlags((current) => current.filter((item) => item !== "suicidal-thoughts"));
              setPrimarySymptom("");
              setStep(1);
            }}
            type="button"
          >
            {t("symptom.reviewAnswers")}
          </button>
        </section>
      ) : null}

      {!isCrisisSelected ? (
      <form className="triage-workflow" onSubmit={onSubmit}>
        {step === 1 ? (
          <article className="panel workflow-step">
            <span>{t("symptom.chooseSymptoms")}</span>
            <h2>{t("symptom.question")}</h2>
            <p>{t("symptom.subtitle")}</p>
            <div className="symptom-category-grid">
              {symptomCategories.map((category) => (
                <section className="symptom-category-card" key={category.id}>
                  <h3>{t(category.labelKey)}</h3>
                  <div className="choice-grid">
                    {category.symptoms.map((symptom) => (
                      <label key={symptom.id} className={`choice-pill${symptom.id.includes("suicidal") || symptom.id.includes("self-harm") ? " danger-choice" : ""}`}>
                        <input
                          checked={symptoms.includes(symptom.value)}
                          onChange={() => toggleSymptom(symptom.value)}
                          type="checkbox"
                        />
                        {t(symptom.labelKey)}
                      </label>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <label className="form-field">
              {t("symptom.primarySymptom")}
              <select value={primarySymptom} onChange={(event) => setPrimarySymptom(event.target.value)}>
                <option value="">{t("symptom.primarySymptomRequired")}</option>
                {symptoms.map((symptom) => <option key={symptom} value={symptom}>{t(symptomItemKey(symptom))}</option>)}
              </select>
            </label>
          </article>
        ) : null}

        {step === 2 ? (
          <article className="panel workflow-step">
            <span>{t("symptom.symptomDetails")}</span>
            <h2>{t("symptom.primaryDetails").replace("{symptom}", primarySymptom ? t(symptomItemKey(primarySymptom)) : t("symptom.primarySymptom"))}</h2>
            <p>{t("symptom.tailoredQuestions").replace("{category}", t(`symptom.categories.${primaryCategory}`))}</p>
            <div className="form-grid-two">
              {detailQuestions.map((question) => (
                <label className="form-field" key={question}>
                  {t(detailQuestionKey(question))}
                  <input value={details[question] ?? ""} onChange={(event) => setDetails({ ...details, [question]: event.target.value })} />
                </label>
              ))}
            </div>
          </article>
        ) : null}

        {step === 3 ? (
          <article className="panel workflow-step">
            <span>{t("symptom.stepDuration")}</span>
            <h2>{t("symptom.durationSeverityPrompt")}</h2>
            <p>{t("symptom.durationQuestion")}</p>
            <div className="choice-grid compact-choice-grid">
              {durations.map((item) => <label className="choice-pill" key={item}><input checked={duration === item} onChange={() => setDuration(item)} type="radio" /> {t(optionKeyMap[item])}</label>)}
            </div>
            <label className="form-field">
              {t("symptom.painScore")}: {painScore}
              <input min="0" max="10" value={painScore} onChange={(event) => setPainScore(event.target.value)} type="range" />
            </label>
            <p>{t("symptom.temperatureQuestion")}</p>
            <div className="choice-grid compact-choice-grid">
              {temperatures.map((item) => <label className="choice-pill" key={item}><input checked={temperature === item} onChange={() => setTemperature(item)} type="radio" /> {t(optionKeyMap[item])}</label>)}
            </div>
            <p>{t("symptom.severityQuestion")}</p>
            <div className="choice-grid compact-choice-grid">
              {severities.map((item) => <label className="choice-card" key={item}><input checked={severity === item} onChange={() => setSeverity(item)} type="radio" /> <strong>{t(optionKeyMap[item])}</strong></label>)}
            </div>
            <p>{t("symptom.trendQuestion")}</p>
            <div className="choice-grid compact-choice-grid">
              {trends.map((item) => <label className="choice-pill" key={item}><input checked={trend === item} onChange={() => setTrend(item)} type="radio" /> {t(optionKeyMap[item])}</label>)}
            </div>
          </article>
        ) : null}

        {step === 4 ? (
          <article className="panel workflow-step">
            <span>{t("symptom.stepRedFlags")}</span>
            <h2>{t("symptom.redFlags")}</h2>
            <p>{t("symptom.redFlagQuestion")}</p>
            <div className="choice-grid">
              {redFlagSymptoms.map((item) => (
                <label className="choice-pill danger-choice" key={item.id}>
                  <input checked={redFlags.includes(item.value)} onChange={() => toggleValue(item.value, redFlags, setRedFlags)} type="checkbox" /> {t(item.labelKey)}
                </label>
              ))}
            </div>
          </article>
        ) : null}

        {step === 5 ? (
          <article className="panel workflow-step">
            <span>{t("symptom.stepBackground")}</span>
            <h2>{t("symptom.healthBackground")}</h2>
            <div className="form-grid-two">
              {Object.entries(background).map(([key, value]) => (
                <label className="form-field" key={key}>
                  {t(backgroundFieldKey(key.replace(/([A-Z])/g, " $1")))}
                  <input value={value} onChange={(event) => setBackground({ ...background, [key]: event.target.value })} />
                </label>
              ))}
            </div>
          </article>
        ) : null}

        <div className="workflow-actions">
          {formError ? <p className="inline-error">{t(formError)}</p> : null}
          <button className="btn-secondary" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))} type="button">
            {t("symptom.back")}
          </button>
          {step < 5 ? (
            <button className="btn-primary" onClick={goNext} type="button">
              {t("symptom.continue")}
            </button>
          ) : (
            <button className="btn-primary" type="submit">
              {t("symptom.getCareGuidance")}
            </button>
          )}
        </div>
      </form>
      ) : null}

      <DisclaimerBox text={t("safety.medical")} />
    </section>
  );
}
