"use client";

import { CareLevelCard } from "@/components/care-level-card";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { useI18n } from "@/components/i18n-provider";
import { SectionHeader } from "@/components/section-header";
import { IllustrationImage } from "@/components/visual-card";
import { careDetailKey } from "@/lib/i18n-display";

const options = [
  {
    title: "care.emergency",
    tone: "danger" as const,
    bestFor: "care.emergencyBest",
    notFor: "Mild symptoms that can wait for routine clinical guidance.",
    ask: "What symptoms make this an emergency right now?",
    insurance: "ER care may have higher cost sharing; do not delay emergency care because of cost questions."
  },
  {
    title: "care.urgent",
    tone: "warning" as const,
    bestFor: "care.urgentBest",
    notFor: "Life-threatening symptoms or ongoing primary care management.",
    ask: "Can this clinic evaluate my symptom and refer me if needed?",
    insurance: "Check urgent care copay, deductible rules, and in-network status before going when possible."
  },
  {
    title: "common.primaryCare",
    tone: "primary" as const,
    bestFor: "care.primaryBest",
    notFor: "Symptoms that need immediate emergency evaluation.",
    ask: "What should I monitor before the visit?",
    insurance: "Primary care may have a lower copay, but network rules still matter."
  },
  {
    title: "care.telehealth",
    tone: "secondary" as const,
    bestFor: "care.telehealthBest",
    notFor: "Symptoms needing an exam, imaging, urgent procedures, or emergency care.",
    ask: "Can this be handled virtually or should I be seen in person?",
    insurance: "Confirm telehealth coverage and whether the virtual provider is in-network."
  },
  {
    title: "care.selfCare",
    tone: "success" as const,
    bestFor: "care.selfBest",
    notFor: "Red flags, severe symptoms, or symptoms that persist or worsen.",
    ask: "Which non-prescription options are appropriate for my situation?",
    insurance: "Some pharmacy items may not count toward medical benefits; ask before assuming coverage."
  }
];

function metaKeys(tone: (typeof options)[number]["tone"]) {
  if (tone === "danger") return ["care.meta.24.7", "care.meta.highest.cost"];
  if (tone === "warning") return ["care.meta.today", "care.meta.plan.dependent"];
  if (tone === "primary") return ["care.meta.within.days", "care.meta.plan.dependent"];
  if (tone === "success") return ["care.meta.anytime", "care.meta.lowest.cost"];
  return ["care.meta.anytime", "care.meta.plan.dependent"];
}

export default function CareOptionsPage() {
  const { t } = useI18n();

  return (
    <section className="stack-page">
      <div className="intro-card page-hero-grid">
        <SectionHeader
          eyebrow={t("care.eyebrow")}
          title={t("care.title")}
          description={t("care.description")}
        />
        <IllustrationImage
          variant="section"
          src="/images/illustration-care-guidance-doctor.png"
          alt="Doctor discussing care guidance with a patient"
        />
      </div>

      <div className="care-detail-grid">
        {options.map((option) => (
          <article className="panel detail-card care-compact-card" key={option.title}>
            <CareLevelCard title={t(option.title)} description={t(option.bestFor)} tone={option.tone} />
            <div className="care-card-meta">
              {metaKeys(option.tone).map((key) => <span key={key}>{t(key)}</span>)}
            </div>
            <details className="care-details">
              <summary>{t("common.viewDetails")}</summary>
              <dl>
                <dt>{t("care.bestFor")}</dt>
                <dd>{t(option.bestFor)}</dd>
                <dt>{t("care.notFor")}</dt>
                <dd>{t(careDetailKey(option.notFor))}</dd>
                <dt>{t("care.whatAsk")}</dt>
                <dd>{t(careDetailKey(option.ask))}</dd>
                <dt>{t("care.costNote")}</dt>
                <dd>{t(careDetailKey(option.insurance))}</dd>
              </dl>
            </details>
          </article>
        ))}
      </div>

      <DisclaimerBox text={t("care.disclaimer")} />
    </section>
  );
}
