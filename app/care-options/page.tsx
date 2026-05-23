"use client";

import { useState } from "react";
import { Card, IconCircle, PrimaryButton, SecondaryButton, StatusBadge, type Tone } from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { SectionHeader } from "@/components/section-header";
import { IllustrationImage } from "@/components/visual-card";

type CareOption = {
  id: string;
  titleKey: string;
  shortKey: string;
  tone: Tone;
  icon: string;
  timingKey: string;
  costKey: string;
  bestKey: string;
  notForKey: string;
  askKeys: string[];
  insuranceKey: string;
  prepareKey: string;
  urgencyKey: string;
  waitKey: string;
  insuranceCheckKey: string;
  callAheadKey: string;
  nextStepKey: string;
  nextStepHref: string;
};

const careOptions: CareOption[] = [
  {
    id: "emergency",
    titleKey: "care.emergency",
    shortKey: "care.card.emergency.short",
    tone: "danger",
    icon: "!",
    timingKey: "care.timing.now",
    costKey: "care.cost.highest",
    bestKey: "care.compare.emergency.best",
    notForKey: "care.compare.emergency.notUse",
    askKeys: ["care.ask.emergency"],
    insuranceKey: "care.compare.emergency.insurance",
    prepareKey: "care.prepare.emergency",
    urgencyKey: "care.urgency.emergency",
    waitKey: "care.wait.emergency",
    insuranceCheckKey: "care.insuranceCheck.noDelay",
    callAheadKey: "care.callAhead.emergency",
    nextStepKey: "care.next.emergency",
    nextStepHref: "/emergency"
  },
  {
    id: "urgent",
    titleKey: "care.urgent",
    shortKey: "care.card.urgent.short",
    tone: "warning",
    icon: "U",
    timingKey: "care.timing.today",
    costKey: "care.cost.mediumHigh",
    bestKey: "care.compare.urgent.best",
    notForKey: "care.compare.urgent.notUse",
    askKeys: ["care.ask.urgent"],
    insuranceKey: "care.compare.urgent.insurance",
    prepareKey: "care.prepare.standard",
    urgencyKey: "care.urgency.urgent",
    waitKey: "care.wait.urgent",
    insuranceCheckKey: "care.insuranceCheck.yes",
    callAheadKey: "care.callAhead.urgent",
    nextStepKey: "care.next.urgent",
    nextStepHref: "/insurance-guide#checklist-builder"
  },
  {
    id: "primary",
    titleKey: "common.primaryCare",
    shortKey: "care.card.primary.short",
    tone: "primary",
    icon: "P",
    timingKey: "care.timing.scheduled",
    costKey: "care.cost.lowerMedium",
    bestKey: "care.compare.primary.best",
    notForKey: "care.compare.primary.notUse",
    askKeys: ["care.ask.primary"],
    insuranceKey: "care.compare.primary.insurance",
    prepareKey: "care.prepare.standard",
    urgencyKey: "care.urgency.primary",
    waitKey: "care.wait.primary",
    insuranceCheckKey: "care.insuranceCheck.yes",
    callAheadKey: "care.callAhead.primary",
    nextStepKey: "care.next.primary",
    nextStepHref: "/result"
  },
  {
    id: "telehealth",
    titleKey: "care.telehealth",
    shortKey: "care.card.telehealth.short",
    tone: "teal",
    icon: "T",
    timingKey: "care.timing.virtual",
    costKey: "care.cost.lowerMedium",
    bestKey: "care.compare.telehealth.best",
    notForKey: "care.compare.telehealth.notUse",
    askKeys: ["care.ask.telehealth"],
    insuranceKey: "care.compare.telehealth.insurance",
    prepareKey: "care.prepare.telehealth",
    urgencyKey: "care.urgency.telehealth",
    waitKey: "care.wait.telehealth",
    insuranceCheckKey: "care.insuranceCheck.yes",
    callAheadKey: "care.callAhead.telehealth",
    nextStepKey: "care.next.telehealth",
    nextStepHref: "/insurance-guide#checklist-builder"
  },
  {
    id: "self",
    titleKey: "care.selfCare",
    shortKey: "care.card.self.short",
    tone: "success",
    icon: "S",
    timingKey: "care.timing.monitoring",
    costKey: "care.cost.lowest",
    bestKey: "care.compare.self.best",
    notForKey: "care.compare.self.notUse",
    askKeys: ["care.ask.self.safe", "care.ask.self.stop"],
    insuranceKey: "care.compare.self.insurance",
    prepareKey: "care.prepare.self",
    urgencyKey: "care.urgency.self",
    waitKey: "care.wait.self",
    insuranceCheckKey: "care.insuranceCheck.noVisit",
    callAheadKey: "care.callAhead.self",
    nextStepKey: "care.next.self",
    nextStepHref: "/symptom-check"
  }
];

const comparisonColumns = [
  "care.table.option",
  "care.table.bestFor",
  "care.table.urgency",
  "care.table.timing",
  "care.table.wait",
  "care.table.cost",
  "care.table.insuranceCheck",
  "care.table.callAhead",
  "care.table.notUse"
];

const decisionQuestions = [
  ["emergency", "care.decision.tool.q1"],
  ["severeToday", "care.decision.tool.q2"],
  ["lasting", "care.decision.tool.q3"],
  ["mildStable", "care.decision.tool.q4"]
] as const;

const beforeYouGo = [
  "care.before.started",
  "care.before.medications",
  "care.before.summary",
  "care.before.insurance",
  "care.before.emergency"
];

export default function CareOptionsPage() {
  const { t } = useI18n();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [savedMessage, setSavedMessage] = useState("");

  function suggestedCareKey(nextAnswers = answers) {
    const notSureCount = Object.values(nextAnswers).filter((answer) => answer === "notSure").length;
    if (nextAnswers.emergency === "yes") return "care.suggest.emergency";
    if (nextAnswers.severeToday === "yes") return "care.suggest.urgent";
    if (nextAnswers.lasting === "yes") return "care.suggest.primaryTelehealth";
    if (nextAnswers.mildStable === "yes") return "care.suggest.self";
    if (notSureCount >= 2) return "care.suggest.symptomCheck";
    return "care.suggest.pending";
  }

  function chooseAnswer(questionId: string, answer: string) {
    const nextAnswers = { ...answers, [questionId]: answer };
    setAnswers(nextAnswers);
    const payload = {
      id: crypto.randomUUID?.() ?? `${Date.now()}`,
      answers: nextAnswers,
      suggestedCareLevel: t(suggestedCareKey(nextAnswers)),
      createdAt: new Date().toISOString()
    };
    window.localStorage.setItem("healthmatchai_care_decision", JSON.stringify(payload));
    setSavedMessage(t("care.decision.saved"));
  }

  return (
    <section className="stack-page">
      <div className="intro-card page-hero-grid">
        <div>
          <SectionHeader
            eyebrow={t("care.eyebrow")}
            title={t("care.title")}
            description={t("care.description")}
          />
          <div className="button-pair">
            <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
            <a className="btn-secondary" href="#care-comparison">{t("care.compareOptions")}</a>
          </div>
        </div>
        <IllustrationImage
          variant="section"
          src="/images/illustration-care-levels.png"
          alt={t("care.imageAlt")}
        />
      </div>

      <Card className="notice-card">
        <IconCircle tone="primary">?</IconCircle>
        <div>
          <h2>{t("care.notSureTitle")}</h2>
          <p>{t("care.notSureText")}</p>
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
          <small>{t("care.supportFinePrint")}</small>
        </div>
      </Card>

      <div id="care-comparison" className="scroll-anchor">
      <Card className="tool-section">
        <details>
          <summary>{t("care.detailedComparison")}</summary>
          <div className="table-scroll care-table-scroll">
            <table className="tool-table">
              <thead>
                <tr>{comparisonColumns.map((column) => <th key={column}>{t(column)}</th>)}</tr>
              </thead>
              <tbody>
                {careOptions.map((option) => (
                  <tr key={option.id}>
                    <th scope="row">{t(option.titleKey)}</th>
                    <td>{t(option.bestKey)}</td>
                    <td>{t(option.urgencyKey)}</td>
                    <td>{t(option.timingKey)}</td>
                    <td>{t(option.waitKey)}</td>
                    <td>{t(option.costKey)}</td>
                    <td>{t(option.insuranceCheckKey)}</td>
                    <td>{t(option.callAheadKey)}</td>
                    <td>{t(option.notForKey)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </Card>
      </div>

      <div className="decision-grid">
        <Card className="tool-section">
          <p className="eyebrow">{t("care.decisionEyebrow")}</p>
          <h2>{t("care.decisionTitle")}</h2>
          <p>{t("care.decisionEducationalNote")}</p>
          {savedMessage ? <StatusBadge tone="success">{savedMessage}</StatusBadge> : null}
          <div className="decision-question-list">
            {decisionQuestions.map(([id, question]) => (
              <div className="decision-question-card" key={id}>
                <p>{t(question)}</p>
                <div className="segmented-actions">
                  {["yes", "no", "notSure"].map((answer) => (
                    <button
                      className={answers[id] === answer ? "segment-button active" : "segment-button"}
                      key={answer}
                      onClick={() => chooseAnswer(id, answer)}
                      type="button"
                    >
                      {t(`care.answer.${answer}`)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="suggestion-card">
            <span>{t("care.suggestedLabel")}</span>
            <strong>{t(suggestedCareKey())}</strong>
            {suggestedCareKey() === "care.suggest.symptomCheck" ? <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton> : null}
          </div>
        </Card>

        <Card className="tool-section">
          <p className="eyebrow">{t("care.beforeEyebrow")}</p>
          <h2>{t("care.beforeTitle")}</h2>
          <ul className="tool-check-list">
            {beforeYouGo.map((item) => <li key={item}>{t(item)}</li>)}
          </ul>
          <SecondaryButton href="/insurance-guide">{t("insurance.title")}</SecondaryButton>
        </Card>
      </div>

      <div className="care-detail-grid">
        {careOptions.map((option) => (
          <article className="panel detail-card care-compact-card" key={option.id}>
            <div className="care-card-heading">
              <IconCircle tone={option.tone}>{option.icon}</IconCircle>
              <div>
                <h2>{t(option.titleKey)}</h2>
                <p>{t(option.shortKey)}</p>
              </div>
            </div>
            <div className="care-card-meta">
              <StatusBadge tone={option.tone}>{t(option.timingKey)}</StatusBadge>
              <span>{t(option.costKey)}</span>
            </div>
              <div className="care-details">
                <dl>
                  <dt>{t("care.bestFor")}</dt>
                  <dd>{t(option.bestKey)}</dd>
                  <dt>{t("care.avoidThisWhen")}</dt>
                  <dd>{t(option.notForKey)}</dd>
                  <dt>{t("care.prepareBefore")}</dt>
                  <dd>{t(option.prepareKey)}</dd>
                </dl>
              </div>
          </article>
        ))}
      </div>

      <Card className="tool-section cta-panel">
        <h2>{t("care.stillUnsure")}</h2>
        <div className="button-pair">
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
          <SecondaryButton href="/result">{t("care.createSummary")}</SecondaryButton>
          <SecondaryButton href="/insurance-guide">{t("insurance.understandCoverage")}</SecondaryButton>
        </div>
      </Card>

      <DisclaimerBox text={t("care.disclaimer")} />
    </section>
  );
}
