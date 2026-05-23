"use client";

import { useEffect, useState } from "react";
import {
  Card,
  IconCircle,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
} from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { IllustrationImage } from "@/components/visual-card";
import { readSymptomChecks, type SavedSymptomCheck } from "@/lib/settings";

const steps = [
  { step: "1", titleKey: "home.step1Title", descKey: "home.step1Desc", icon: "☤" },
  { step: "2", titleKey: "home.step2Title", descKey: "home.step2Desc", icon: "♡" },
  { step: "3", titleKey: "home.step3Title", descKey: "home.step3Desc", icon: "▣" },
  { step: "4", titleKey: "home.step4Title", descKey: "home.step4Desc", icon: "♢" },
];

const actionCards = [
  { titleKey: "nav.symptomCheck", descKey: "home.actionSymptomDesc", href: "/symptom-check", icon: "☤", tone: "primary" as const },
  { titleKey: "nav.findCare", descKey: "home.actionFindCareDesc", href: "/care-options", icon: "♡", tone: "teal" as const },
  { titleKey: "nav.coverageProtection", descKey: "home.actionCoverageDesc", href: "/insurance-guide", icon: "♢", tone: "purple" as const },
];

export default function HomePage() {
  const { t } = useI18n();
  const [latestCheck, setLatestCheck] = useState<SavedSymptomCheck | null>(null);

  useEffect(() => {
    setLatestCheck(readSymptomChecks()[0] ?? null);
  }, []);

  return (
    <section className="app-page dashboard-page">
      {/* Hero */}
      <PageHeader
        title={t("home.title")}
        description={t("home.description")}
      />

      <Card className="symptom-command-card">
        <div>
          <h2>{t("home.heroQuestion")}</h2>
          <p>{t("home.heroSubtitle")}</p>
          <PrimaryButton href="/symptom-check">{t("home.start")}</PrimaryButton>
          <SecondaryButton href="#how-it-works">{t("home.howItWorks")}</SecondaryButton>
        </div>
        <IllustrationImage
          priority
          variant="hero"
          src="/images/hero-doctor-care.png"
          alt="Care pathway illustration"
        />
      </Card>

      {/* 4-step care pathway */}
      <div id="how-it-works" className="scroll-anchor">
        <h2 className="section-title">{t("home.pathwayTitle")}</h2>
        <p className="section-description">{t("home.pathwayDesc")}</p>
        <div className="stepper-grid">
          {steps.map((s) => (
            <div className="step-card" key={s.step}>
              <IconCircle tone="primary">{s.icon}</IconCircle>
              <h3>{t(s.titleKey)}</h3>
              <p>{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action cards */}
      <div className="care-detail-grid" style={{ marginTop: 32 }}>
        {actionCards.map((card) => (
          <article className="panel detail-card care-compact-card" key={card.href}>
            <div className="care-card-heading">
              <IconCircle tone={card.tone}>{card.icon}</IconCircle>
              <div>
                <h2>{t(card.titleKey)}</h2>
                <p>{t(card.descKey)}</p>
              </div>
            </div>
            <div className="care-card-meta">
              <PrimaryButton href={card.href}>{t(card.titleKey)}</PrimaryButton>
            </div>
          </article>
        ))}
      </div>

      {/* Latest check summary, if exists */}
      {latestCheck ? (
        <div style={{ marginTop: 32 }}>
        <Card className="recent-activity-card">
          <h2>{t("home.recentActivity")}</h2>
          <p>
            {t("common.riskLevel")}: <strong>{t(latestCheck.result.riskLevel)}</strong>
            {" · "}
            {t("home.recommendedCare")}: <strong>{t(latestCheck.result.recommendedCare)}</strong>
          </p>
          <time>{new Date(latestCheck.createdAt).toLocaleString()}</time>
          <div className="button-pair" style={{ marginTop: 12 }}>
            <PrimaryButton href="/result">{t("home.viewLatestResult")}</PrimaryButton>
            <SecondaryButton href="/history">{t("home.viewAll")}</SecondaryButton>
          </div>
        </Card>
        </div>
      ) : null}
    </section>
  );
}
