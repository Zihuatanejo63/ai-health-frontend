"use client";

import { useEffect, useState } from "react";
import {
  Card,
  IconCircle,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
} from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { useSettings } from "@/components/settings-provider";
import { readSymptomChecks, readSummaries, writeSettings, type SavedSymptomCheck, type SavedSummary } from "@/lib/settings";
import { careLevelKey, riskLevelKey, symptomItemKey } from "@/lib/i18n-display";

export default function HealthRecordsPage() {
  const { t } = useI18n();
  const { settings } = useSettings();
  const [latestCheck, setLatestCheck] = useState<SavedSymptomCheck | null>(null);
  const [summaries, setSummaries] = useState<SavedSummary[]>([]);
  const [checks, setChecks] = useState<SavedSymptomCheck[]>([]);
  const [savedProfile, setSavedProfile] = useState(false);

  useEffect(() => {
    setLatestCheck(readSymptomChecks()[0] ?? null);
    setSummaries(readSummaries());
    setChecks(readSymptomChecks());
  }, []);

  function saveAsHealthProfile() {
    if (!latestCheck) return;
    const bg = latestCheck.healthBackground as Record<string, string> | undefined;
    if (!bg) return;
    writeSettings({
      ...settings,
      healthProfile: {
        age: bg.age || settings.healthProfile.age,
        sex: bg.sex || settings.healthProfile.sex,
        pregnancyStatus: bg.pregnancyStatus || settings.healthProfile.pregnancyStatus,
        chronicConditions: bg.chronicConditions ? bg.chronicConditions.split(",").map((s: string) => s.trim()).filter(Boolean) : settings.healthProfile.chronicConditions,
        medications: bg.medications ? bg.medications.split(",").map((s: string) => s.trim()).filter(Boolean) : settings.healthProfile.medications,
        allergies: bg.allergies ? bg.allergies.split(",").map((s: string) => s.trim()).filter(Boolean) : settings.healthProfile.allergies,
        countryRegion: bg.countryRegion || settings.healthProfile.countryRegion,
        insuranceStatus: bg.insuranceStatus || settings.healthProfile.insuranceStatus,
        highRiskConditions: settings.healthProfile.highRiskConditions,
        recentSurgery: settings.healthProfile.recentSurgery,
      },
    });
    setSavedProfile(true);
  }

  const profile = settings.healthProfile;
  const hasProfile = Boolean(profile.age || profile.sex || profile.chronicConditions.length || profile.medications.length);
  const hasLatestCheck = Boolean(latestCheck);
  const hasSummaries = summaries.length > 0;
  const hasTimeline = checks.length > 0;

  const result = latestCheck?.result as Record<string, unknown> | undefined;
  const aiReviewStatus = result?.aiReviewStatus as string | undefined;

  return (
    <section className="app-page">
      <PageHeader
        title={t("nav.healthRecords")}
        description={t("healthRecords.description")}
      />

      {/* Health Profile Snapshot */}
      <Card className="tool-section">
        <h2>{t("healthRecords.healthProfile")}</h2>
        {hasProfile ? (
          <div className="summary-mini-grid">
            {profile.age ? <span>{t("healthRecords.age")} <strong>{profile.age}</strong></span> : null}
            {profile.sex ? <span>{t("healthRecords.sex")} <strong>{profile.sex}</strong></span> : null}
            {profile.countryRegion ? <span>{t("healthRecords.countryRegion")} <strong>{profile.countryRegion}</strong></span> : null}
            {profile.insuranceStatus ? <span>{t("healthRecords.insuranceStatus")} <strong>{profile.insuranceStatus}</strong></span> : null}
            {profile.pregnancyStatus ? <span>{t("healthRecords.pregnancyStatus")} <strong>{profile.pregnancyStatus}</strong></span> : null}
            {profile.chronicConditions.length > 0 ? <span>{t("healthRecords.chronicConditions")} <strong>{profile.chronicConditions.join(", ")}</strong></span> : null}
            {profile.medications.length > 0 ? <span>{t("healthRecords.medications")} <strong>{profile.medications.join(", ")}</strong></span> : null}
            {profile.allergies.length > 0 ? <span>{t("healthRecords.allergies")} <strong>{profile.allergies.join(", ")}</strong></span> : null}
            {profile.highRiskConditions.length > 0 ? <span>{t("healthRecords.highRiskBackground")} <strong>{profile.highRiskConditions.join(", ")}</strong></span> : null}
          </div>
        ) : (
          <p className="help-text">{t("healthRecords.noProfile")}</p>
        )}
        <div className="button-pair" style={{ marginTop: 16 }}>
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
          <SecondaryButton href="/settings">{t("healthRecords.editProfile")}</SecondaryButton>
        </div>
        {hasLatestCheck && !savedProfile ? (
          <div style={{ marginTop: 12 }}>
            <button className="btn-secondary" onClick={saveAsHealthProfile} type="button">
              {t("healthRecords.saveAsProfile")}
            </button>
          </div>
        ) : null}
        {savedProfile ? <StatusBadge tone="success">{t("settings.saved")}</StatusBadge> : null}
      </Card>

      {/* Latest Symptom Check */}
      {hasLatestCheck ? (
        <Card className="tool-section">
          <h2>{t("healthRecords.latestCheck")}</h2>
          <div className="summary-mini-grid">
            <span>{t("healthRecords.mainConcern")} <strong>{latestCheck!.primarySymptom ? t(symptomItemKey(latestCheck!.primarySymptom)) : t("common.notSelected")}</strong></span>
            <span>{t("healthRecords.associatedSymptoms")} <strong>{latestCheck!.symptoms.map((s) => t(symptomItemKey(s))).join(", ")}</strong></span>
            <span>{t("result.duration")} <strong>{latestCheck!.duration}</strong></span>
            <span>{t("symptom.trend")} <strong>{latestCheck!.trend || t("common.notSelected")}</strong></span>
            <span>{t("common.riskLevel")} <strong>{t(riskLevelKey(result?.riskLevel as string))}</strong></span>
            <span>{t("home.recommendedCare")} <strong>{t(careLevelKey(result?.recommendedCare as string))}</strong></span>
            <span>{t("home.redFlags")} <strong>{latestCheck!.redFlags?.length ? latestCheck!.redFlags.join(", ") : t("healthRecords.noneFound")}</strong></span>
            <span>{t("healthRecords.aiReviewStatus")} <strong>{aiReviewStatus ? t(`healthRecords.ai.${aiReviewStatus}`) : t("common.notSelected")}</strong></span>
            <span>{t("healthRecords.createdDate")} <strong>{new Date(latestCheck!.createdAt).toLocaleString()}</strong></span>
          </div>
          <div className="button-pair" style={{ marginTop: 16 }}>
            <PrimaryButton href="/result">{t("healthRecords.viewResult")}</PrimaryButton>
            <SecondaryButton href="/symptom-check">{t("home.start")}</SecondaryButton>
          </div>
        </Card>
      ) : (
        <Card className="tool-section">
          <h2>{t("healthRecords.latestCheck")}</h2>
          <p className="help-text">{t("healthRecords.noChecks")}</p>
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
        </Card>
      )}

      {/* Saved Doctor-ready Summaries */}
      {hasSummaries ? (
        <Card className="tool-section">
          <h2>{t("healthRecords.savedSummaries")}</h2>
          <div className="saved-list">
            {summaries.map((s) => (
              <article className="saved-row" key={s.id}>
                <div>
                  <strong>{s.title}</strong>
                  <span>{t(riskLevelKey(s.riskLevel))} · {t(careLevelKey(s.recommendedCare))} · {new Date(s.createdAt).toLocaleString()}</span>
                </div>
                <div className="button-pair">
                  <SecondaryButton href={`/result?id=${s.checkId}`}>{t("common.viewDetails")}</SecondaryButton>
                </div>
              </article>
            ))}
          </div>
        </Card>
      ) : null}

      {/* Health Timeline */}
      {hasTimeline ? (
        <Card className="tool-section">
          <h2>{t("healthRecords.timeline")}</h2>
          <p className="help-text">{t("healthRecords.timelineDesc")}</p>
          <div className="saved-list">
            {checks.slice(0, 10).map((c) => {
              const r = c.result as Record<string, unknown> | undefined;
              return (
                <article className="saved-row" key={c.id}>
                  <div>
                    <strong>{c.primarySymptom ? t(symptomItemKey(c.primarySymptom)) : c.symptoms.map((s) => t(symptomItemKey(s))).join(", ")}</strong>
                    <span>
                      {t(riskLevelKey(r?.riskLevel as string))} · {t(careLevelKey(r?.recommendedCare as string))} · {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="button-pair">
                    <SecondaryButton href="/result">{t("healthRecords.viewSummary")}</SecondaryButton>
                  </div>
                </article>
              );
            })}
          </div>
        </Card>
      ) : null}

      {!hasLatestCheck && !hasProfile ? (
        <Card className="history-empty-card">
          <div className="empty-icon">▣</div>
          <h2>{t("healthRecords.emptyTitle")}</h2>
          <p>{t("healthRecords.emptyText")}</p>
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
        </Card>
      ) : null}
    </section>
  );
}
