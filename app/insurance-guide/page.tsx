"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  IconCircle,
  InsuranceConceptCard,
  PageHeader,
  PrimaryButton,
  StatusBadge,
  type Tone
} from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { useSettings } from "@/components/settings-provider";
import { IllustrationImage } from "@/components/visual-card";

const STORAGE_KEY = "healthmatchai_insurance_checklists";

type SavedChecklist = {
  id: string;
  careType: string;
  questions: string[];
  createdAt: string;
};

const concepts = [
  ["insurance.copay", "insurance.copayDesc", "warning"],
  ["insurance.deductible", "insurance.deductibleDesc", "primary"],
  ["insurance.coinsurance", "insurance.coinsuranceDesc", "teal"],
  ["insurance.outOfPocket", "insurance.outOfPocketDesc", "purple"],
  ["insurance.inNetwork", "insurance.inNetworkDesc", "success"],
  ["insurance.outOfNetwork", "insurance.outOfNetworkDesc", "danger"],
  ["insurance.priorAuthorization", "insurance.priorAuthorizationDesc", "warning"],
  ["insurance.eob", "insurance.eobDesc", "primary"],
  ["insurance.itemizedBill", "insurance.itemizedBillDesc", "teal"]
] as const;

const careSettingTips = [
  ["insurance.tip.emergency.title", ["insurance.tip.emergency.1", "insurance.tip.emergency.2", "insurance.tip.emergency.3"], "danger"],
  ["insurance.tip.urgent.title", ["insurance.tip.urgent.1", "insurance.tip.urgent.2", "insurance.tip.urgent.3", "insurance.tip.urgent.4"], "warning"],
  ["insurance.tip.primary.title", ["insurance.tip.primary.1", "insurance.tip.primary.2", "insurance.tip.primary.3"], "primary"],
  ["insurance.tip.telehealth.title", ["insurance.tip.telehealth.1", "insurance.tip.telehealth.2", "insurance.tip.telehealth.3"], "teal"],
  ["care.selfCare", ["insurance.tip.self.1", "insurance.tip.self.2"], "success"]
] as const;

const careTypes = [
  "insurance.careType.emergency",
  "insurance.careType.urgent",
  "insurance.careType.primary",
  "insurance.careType.telehealth",
  "insurance.careType.lab",
  "insurance.careType.pharmacy",
  "insurance.careType.followUp"
] as const;

const checklistMap: Record<string, string[]> = {
  "insurance.careType.emergency": [
    "insurance.checklist.emergency.1",
    "insurance.checklist.emergency.2",
    "insurance.checklist.emergency.3",
    "insurance.checklist.emergency.4"
  ],
  "insurance.careType.urgent": [
    "insurance.checklist.urgent.1",
    "insurance.checklist.urgent.2",
    "insurance.checklist.urgent.3",
    "insurance.checklist.urgent.4",
    "insurance.checklist.urgent.5",
    "insurance.checklist.urgent.6"
  ],
  "insurance.careType.primary": [
    "insurance.checklist.primary.1",
    "insurance.checklist.primary.2",
    "insurance.checklist.primary.3",
    "insurance.checklist.primary.4"
  ],
  "insurance.careType.telehealth": [
    "insurance.checklist.telehealth.1",
    "insurance.checklist.telehealth.2",
    "insurance.checklist.telehealth.3",
    "insurance.checklist.telehealth.4"
  ],
  "insurance.careType.lab": [
    "insurance.checklist.lab.1",
    "insurance.checklist.lab.2",
    "insurance.checklist.lab.3",
    "insurance.checklist.lab.4"
  ],
  "insurance.careType.pharmacy": [
    "insurance.checklist.pharmacy.1",
    "insurance.checklist.pharmacy.2",
    "insurance.checklist.pharmacy.3",
    "insurance.checklist.pharmacy.4"
  ],
  "insurance.careType.followUp": [
    "insurance.checklist.followUp.1",
    "insurance.checklist.followUp.2",
    "insurance.checklist.followUp.3",
    "insurance.checklist.followUp.4"
  ]
};

const redFlags = [
  "insurance.redFlag.chestPain",
  "insurance.redFlag.breathing",
  "insurance.redFlag.stroke",
  "insurance.redFlag.allergic",
  "insurance.redFlag.bleeding",
  "insurance.redFlag.consciousness",
  "insurance.redFlag.selfHarm"
];

const generalQuestions = [
  "insurance.generalQuestion.network",
  "insurance.generalQuestion.copay",
  "insurance.generalQuestion.deductible",
  "insurance.generalQuestion.separateBilling",
  "insurance.generalQuestion.priorAuth",
  "insurance.generalQuestion.telehealth",
  "insurance.generalQuestion.documents"
];

export default function InsuranceGuidePage() {
  const { t } = useI18n();
  const { settings } = useSettings();
  const insurance = settings.insuranceProfile;
  const [selectedCareType, setSelectedCareType] = useState<string>("insurance.careType.urgent");
  const [generatedType, setGeneratedType] = useState<string>("insurance.careType.urgent");
  const [message, setMessage] = useState("");
  const [savedChecklists, setSavedChecklists] = useState<SavedChecklist[]>([]);
  const [viewChecklistId, setViewChecklistId] = useState<string | null>(null);
  const hasInsuranceProfile = Boolean(
    insurance.status ||
      insurance.planType ||
      insurance.urgentCareCopay ||
      insurance.primaryCareCopay ||
      insurance.copay ||
      insurance.deductible ||
      insurance.inNetworkPreference
  );
  const generatedKeys = useMemo(() => checklistMap[generatedType] ?? checklistMap["insurance.careType.urgent"], [generatedType]);
  const generatedQuestions = useMemo(() => generatedKeys.map((key) => t(key)), [generatedKeys, t]);
  const viewedChecklist = savedChecklists.find((item) => item.id === viewChecklistId);

  useEffect(() => {
    setSavedChecklists(readSavedChecklists());
  }, []);

  function readSavedChecklists(): SavedChecklist[] {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  function writeSavedChecklists(next: SavedChecklist[]) {
    setSavedChecklists(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function displayValue(value: string) {
    return value || t("insurance.notRecorded");
  }

  function checklistPayload() {
    return {
      id: crypto.randomUUID?.() ?? `${Date.now()}`,
      createdAt: new Date().toISOString(),
      careType: t(generatedType),
      questions: generatedQuestions
    };
  }

  function generateChecklist() {
    setGeneratedType(selectedCareType);
    setMessage(t("insurance.checklistGenerated"));
  }

  function saveChecklist() {
    const payload = checklistPayload();
    writeSavedChecklists([payload, ...savedChecklists]);
    setMessage(t("insurance.checklistSaved"));
  }

  async function copyQuestions() {
    await navigator.clipboard?.writeText(generatedQuestions.map((question) => `- ${question}`).join("\n"));
    setMessage(t("insurance.questionsCopied"));
  }

  function downloadChecklist(payload: SavedChecklist, filename = "healthmatchai-insurance-checklist.json") {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportChecklist() {
    downloadChecklist(checklistPayload());
    setMessage(t("insurance.checklistExported"));
  }

  function clearChecklist() {
    setGeneratedType(selectedCareType);
    setMessage(t("insurance.checklistCleared"));
  }

  async function copySavedChecklist(item: SavedChecklist) {
    await navigator.clipboard?.writeText(item.questions.map((question) => `- ${question}`).join("\n"));
    setMessage(t("insurance.questionsCopied"));
  }

  function deleteSavedChecklist(id: string) {
    writeSavedChecklists(savedChecklists.filter((item) => item.id !== id));
    if (viewChecklistId === id) setViewChecklistId(null);
    setMessage(t("insurance.checklistDeleted"));
  }

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("insurance.title")}
        title={t("insurance.title")}
        description={t("insurance.description")}
      />

      <Card className="notice-card">
        <IconCircle tone="primary">i</IconCircle>
        <p>{t("insurance.boundaryStatement")}</p>
      </Card>

      <Card className="notice-card red-flag-card">
        <IconCircle tone="danger">!</IconCircle>
        <p><strong>{t("insurance.doNotDelayTitle")}</strong> {t("insurance.doNotDelayText")}</p>
      </Card>

      <div className="insurance-dashboard-grid">
        <Card className="insurance-hero-card">
          <div>
            <IconCircle tone="teal">I</IconCircle>
            <h2>{t("insurance.coverageClear")}</h2>
            <p>{t("insurance.coverageText")}</p>
            <div className="intro-copy-actions">
              <a className="btn-primary" href="#checklist-builder">{t("insurance.createChecklist")}</a>
            </div>
          </div>
          <IllustrationImage variant="section" src="/images/illustration-insurance-checklist.png" alt={t("insurance.imageAlt")} />
        </Card>

        <Card className="coverage-snapshot">
          <h2>{t("insurance.snapshot")}</h2>
          {!hasInsuranceProfile ? (
            <div className="snapshot-empty">
              <p>{t("insurance.addProfilePrompt")}</p>
              <PrimaryButton href="/settings#insurance-profile">{t("insurance.addProfile")}</PrimaryButton>
            </div>
          ) : [
            [t("settings.insuranceStatus"), displayValue(insurance.status)],
            [t("settings.planType"), displayValue(insurance.planType)],
            [t("insurance.primaryCopay"), displayValue(insurance.primaryCareCopay)],
            [t("insurance.urgentCopay"), displayValue(insurance.urgentCareCopay || insurance.copay)],
            [t("settings.deductible"), displayValue(insurance.deductible)],
            [t("settings.inNetworkPreference"), displayValue(insurance.inNetworkPreference)],
            [t("insurance.lastUpdated"), t("insurance.notRecorded")]
          ].map(([label, value]) => (
            <div className="snapshot-row" key={label}>
              <span>{label}</span>
              <StatusBadge tone={value === t("insurance.notRecorded") ? "primary" : "success"}>
                {value}
              </StatusBadge>
            </div>
          )).concat([
            <PrimaryButton key="edit-profile" href="/settings#insurance-profile">{t("insurance.editProfile")}</PrimaryButton>
          ])}
        </Card>
      </div>

      <div id="checklist-builder" className="scroll-anchor">
      <Card className="insurance-checklist-builder tool-section">
        <div className="card-title-row">
          <div>
            <p className="eyebrow">{t("insurance.checklistBuilderEyebrow")}</p>
            <h2>{t("insurance.beforeCareAsk")}</h2>
          </div>
          {message ? <StatusBadge tone="success">{message}</StatusBadge> : null}
        </div>
        <div className="stepper-grid">
          <div className="step-card">
            <StatusBadge tone="primary">{t("insurance.step1")}</StatusBadge>
            <label>
              {t("insurance.chooseCareType")}
              <select value={selectedCareType} onChange={(event) => setSelectedCareType(event.target.value)}>
                {careTypes.map((careType) => <option key={careType} value={careType}>{t(careType)}</option>)}
              </select>
            </label>
            <button className="btn-primary" onClick={generateChecklist} type="button">{t("insurance.generateChecklist")}</button>
          </div>
          <div className="step-card">
            <StatusBadge tone="teal">{t("insurance.step2")}</StatusBadge>
            <p>{t("insurance.checklistReadyText")}</p>
          </div>
          <div className="step-card">
            <StatusBadge tone="success">{t("insurance.step3")}</StatusBadge>
            <p>{t("insurance.saveCopyExportText")}</p>
          </div>
        </div>
        <div className="check-list">
          {generatedQuestions.map((question) => <span key={question}>□ {question}</span>)}
        </div>
        <div className="button-pair">
          <button className="btn-primary" onClick={saveChecklist} type="button">{t("insurance.saveChecklist")}</button>
          <button className="btn-secondary" onClick={copyQuestions} type="button">{t("insurance.copyQuestions")}</button>
          <button className="btn-secondary" onClick={exportChecklist} type="button">{t("insurance.exportChecklist")}</button>
          <button className="btn-secondary" onClick={clearChecklist} type="button">{t("insurance.clearChecklist")}</button>
        </div>
      </Card>
      </div>

      <Card className="tool-section">
        <div className="card-title-row">
          <div>
            <p className="eyebrow">{t("insurance.savedEyebrow")}</p>
            <h2>{t("insurance.savedTitle")}</h2>
          </div>
        </div>
        {savedChecklists.length === 0 ? (
          <div className="empty-inline">{t("insurance.noSavedChecklists")}</div>
        ) : (
          <div className="saved-list">
            {savedChecklists.map((item) => (
              <article className="saved-row" key={item.id}>
                <div>
                  <strong>{item.careType}</strong>
                  <span>{t("insurance.questionCount").replace("{count}", `${item.questions.length}`)} · {new Date(item.createdAt).toLocaleString()}</span>
                </div>
                <div className="button-pair">
                  <button className="btn-secondary" onClick={() => setViewChecklistId(viewChecklistId === item.id ? null : item.id)} type="button">{t("insurance.viewChecklist")}</button>
                  <button className="btn-secondary" onClick={() => copySavedChecklist(item)} type="button">{t("insurance.copyQuestions")}</button>
                  <button className="btn-secondary" onClick={() => downloadChecklist(item)} type="button">{t("insurance.exportChecklist")}</button>
                  <button className="btn-secondary danger-button" onClick={() => deleteSavedChecklist(item.id)} type="button">{t("common.delete")}</button>
                </div>
                {viewedChecklist?.id === item.id ? (
                  <div className="check-list saved-question-list">
                    {item.questions.map((question) => <span key={question}>□ {question}</span>)}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </Card>

      <Card className="tool-section">
        <p className="eyebrow">{t("insurance.conceptsEyebrow")}</p>
        <h2>{t("insurance.conceptsTitle")}</h2>
        <div className="concept-grid">
          {concepts.map(([title, description, tone]) => (
            <InsuranceConceptCard key={title} title={t(title)} description={`${t(description)} ${t(`${title}.example`)} ${t("insurance.costDepends")}`} tone={tone} />
          ))}
        </div>
      </Card>

      <Card className="tool-section">
        <p className="eyebrow">{t("insurance.afterVisitEyebrow")}</p>
        <h2>{t("insurance.afterVisitTitle")}</h2>
        <ul className="tool-check-list">
          {["insurance.afterVisit.1", "insurance.afterVisit.2", "insurance.afterVisit.3", "insurance.afterVisit.4"].map((key) => <li key={key}>{t(key)}</li>)}
        </ul>
        <p className="fine-print">{t("insurance.afterVisitNote")}</p>
      </Card>

      <Card className="tool-section">
        <p className="eyebrow">{t("insurance.settingEyebrow")}</p>
        <h2>{t("insurance.settingTitle")}</h2>
        <div className="care-setting-grid">
          {careSettingTips.map(([title, tips, tone]) => (
            <article className="care-setting-card" key={title}>
              <IconCircle tone={tone as Tone}>{t(title).charAt(0)}</IconCircle>
              <h3>{t(title)}</h3>
              <ul className="tool-check-list">
                {tips.map((tip) => <li key={tip}>{t(tip)}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Card>

      <div className="decision-grid">
        <Card className="tool-section red-flag-card">
          <p className="eyebrow">{t("insurance.redFlagsEyebrow")}</p>
          <h2>{t("insurance.redFlagsTitle")}</h2>
          <p>{t("insurance.redFlagsBody")}</p>
          <div className="tag-grid">
            {redFlags.map((key) => <StatusBadge key={key} tone="danger">{t(key)}</StatusBadge>)}
          </div>
        </Card>

        <Card className="tool-section">
          <p className="eyebrow">{t("insurance.generalQuestionsEyebrow")}</p>
          <h2>{t("insurance.generalQuestionsTitle")}</h2>
          <ul className="tool-check-list">
            {generalQuestions.map((key) => <li key={key}>{t(key)}</li>)}
          </ul>
        </Card>
      </div>

      <Card className="tool-section cta-panel">
        <h2>{t("insurance.summaryCtaTitle")}</h2>
        <div className="button-pair">
          <PrimaryButton href="/result">{t("care.createSummary")}</PrimaryButton>
          <a className="btn-secondary" href="/symptom-check">{t("home.start")}</a>
          <a className="btn-secondary" href="/pricing">{t("nav.pricing")}</a>
        </div>
      </Card>

      <DisclaimerBox text={t("insurance.boundaryStatement")} />
    </section>
  );
}
