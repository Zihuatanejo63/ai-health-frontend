"use client";

import { useEffect, useState } from "react";
import { Card, IconCircle, PageHeader, PrimaryButton, SecondaryButton, StatusBadge, type Tone } from "@/components/app-ui";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { readSymptomChecks, type SavedSymptomCheck } from "@/lib/settings";
import { careLevelKey, riskLevelKey } from "@/lib/i18n-display";

const SESSION_RESULT_KEY = "ai-health-match-result";

type NearbyOption = {
  id: string;
  titleKey: string;
  descKey: string;
  btnKey: string;
  tone: Tone;
  icon: string;
  mapsQuery: string;
};

const nearbyOptions: NearbyOption[] = [
  {
    id: "urgent",
    titleKey: "care.nearbyUrgent",
    descKey: "care.nearbyUrgentDesc",
    btnKey: "care.findUrgentNearMe",
    tone: "warning",
    icon: "U",
    mapsQuery: "urgent+care+near+me"
  },
  {
    id: "primary",
    titleKey: "care.nearbyPrimary",
    descKey: "care.nearbyPrimaryDesc",
    btnKey: "care.findPrimaryNearMe",
    tone: "primary",
    icon: "P",
    mapsQuery: "primary+care+provider+near+me"
  },
  {
    id: "hospital",
    titleKey: "care.nearbyHospital",
    descKey: "care.nearbyHospitalDesc",
    btnKey: "care.findHospitalNearMe",
    tone: "danger",
    icon: "H",
    mapsQuery: "hospital+near+me"
  },
  {
    id: "telehealth",
    titleKey: "care.nearbyTelehealth",
    descKey: "care.nearbyTelehealthDesc",
    btnKey: "care.findTelehealthOptions",
    tone: "teal",
    icon: "T",
    mapsQuery: "telehealth+providers"
  }
];

function openMapsSearch(query: string) {
  if (typeof window === "undefined") return;
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        window.open(
          `https://www.google.com/maps/search/${query}/@${latitude},${longitude},13z`,
          "_blank"
        );
      },
      () => {
        window.open(`https://www.google.com/maps/search/${query}`, "_blank");
      }
    );
  } else {
    window.open(`https://www.google.com/maps/search/${query}`, "_blank");
  }
}

export default function CareOptionsPage() {
  const { t } = useI18n();
  const [check, setCheck] = useState<SavedSymptomCheck | null>(null);

  useEffect(() => {
    const session = window.sessionStorage.getItem(SESSION_RESULT_KEY);
    if (session) {
      setCheck(JSON.parse(session));
      return;
    }
    setCheck(readSymptomChecks()[0] ?? null);
  }, []);

  const result = check?.result as Record<string, unknown> | undefined;
  const recommendedCare = result?.recommendedCare as string | undefined;
  const riskLevel = result?.riskLevel as string | undefined;
  const isEmergency = riskLevel === "Emergency" || riskLevel === "Crisis";

  return (
    <section className="stack-page">
      <PageHeader
        eyebrow={t("care.eyebrow")}
        title={t("care.title")}
        description={t("care.description")}
      />

      {/* No result: prompt to start symptom check */}
      {!check ? (
        <Card className="notice-card">
          <IconCircle tone="primary">?</IconCircle>
          <div>
            <h2>{t("care.notSureTitle")}</h2>
            <p>{t("care.notSureText")}</p>
            <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
          </div>
        </Card>
      ) : null}

      {/* If result exists, show recommended next step */}
      {check && recommendedCare && !isEmergency ? (
        <Card className="tool-section result-linked-card">
          <div className="card-title-row">
            <div>
              <h2>{t("care.recommendedNextStep")}</h2>
              <p>
                <strong>{t(careLevelKey(recommendedCare))}</strong>
                {" — "}{t("result.recommendedNextStep")}
              </p>
            </div>
            <StatusBadge tone={riskLevel === "High" ? "warning" : riskLevel === "Low" ? "success" : "primary"}>
              {t(riskLevelKey(riskLevel || "Low"))}
            </StatusBadge>
          </div>
          <div className="button-pair">
            <SecondaryButton href="/result">{t("care.prepareDoctorSummary")}</SecondaryButton>
            <SecondaryButton href="/insurance-guide">{t("care.checkCoverageQuestions")}</SecondaryButton>
          </div>
        </Card>
      ) : null}

      {/* Emergency: only show emergency CTA */}
      {isEmergency ? (
        <Card className="crisis-card">
          <IconCircle tone="danger">!</IconCircle>
          <div>
            <h2>{t("care.emergencyWarningTitle")}</h2>
            <p>{t("care.emergencyWarningText")}</p>
            <PrimaryButton href="/emergency">{t("care.viewEmergencySigns")}</PrimaryButton>
          </div>
        </Card>
      ) : null}

      {/* Find care near you */}
      <div>
        <h2 className="section-title">{t("care.findCareNearYou")}</h2>
        <p className="section-description">{t("care.findCareNearYouDesc")}</p>
        <div className="care-detail-grid">
          {nearbyOptions.map((opt) => (
            <article className="panel detail-card care-compact-card" key={opt.id}>
              <div className="care-card-heading">
                <IconCircle tone={opt.tone}>{opt.icon}</IconCircle>
                <div>
                  <h2>{t(opt.titleKey)}</h2>
                  <p>{t(opt.descKey)}</p>
                </div>
              </div>
              <div className="care-card-meta">
                <button
                  className="btn-primary"
                  onClick={() => openMapsSearch(opt.mapsQuery)}
                  type="button"
                >
                  {t(opt.btnKey)}
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="help-text" style={{ marginTop: 16, textAlign: "center" }}>{t("care.licensedProviderComingSoon")}</p>
      </div>

      {/* Emergency warning card */}
      {!isEmergency ? (
        <Card className="notice-card red-flag-card">
          <IconCircle tone="danger">!</IconCircle>
          <div>
            <h2>{t("care.emergencyWarningTitle")}</h2>
            <p>{t("care.emergencyWarningText")}</p>
            <SecondaryButton href="/emergency">{t("care.viewEmergencySigns")}</SecondaryButton>
          </div>
        </Card>
      ) : null}

      <DisclaimerBox text={t("care.disclaimerV2")} />
    </section>
  );
}
