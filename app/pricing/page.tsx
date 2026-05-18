"use client";

import { Fragment, useState } from "react";
import { Card, PageHeader, PrimaryButton, SecondaryButton, StatusBadge } from "@/components/app-ui";
import { PricingCard } from "@/components/pricing-card";
import { startCheckout, type CheckoutPlan } from "@/lib/checkout";
import { useI18n } from "@/components/i18n-provider";

const comparisonGroups = [
  {
    titleKey: "pricing.group.symptom",
    rows: [
      ["pricing.feature.guided", true, true, true],
      ["pricing.feature.riskLevel", true, true, true],
      ["pricing.feature.recommendedCare", true, true, true],
      ["pricing.feature.carePlan", false, true, true],
      ["pricing.feature.redFlag", true, true, true]
    ]
  },
  {
    titleKey: "pricing.group.records",
    rows: [
      ["pricing.feature.summary", false, true, true],
      ["pricing.feature.export", false, true, true],
      ["pricing.feature.saveHistory", false, false, true],
      ["pricing.feature.healthRecords", false, false, true],
      ["pricing.feature.familyProfiles", false, false, true]
    ]
  },
  {
    titleKey: "pricing.group.insurance",
    rows: [
      ["pricing.feature.insuranceChecklist", false, true, true],
      ["pricing.feature.savedInsurance", false, false, true],
      ["pricing.feature.checklistHistory", false, false, true],
      ["pricing.feature.costQuestions", false, true, true]
    ]
  }
] as const;

const notProvided = [
  "pricing.no.medicalAssessment",
  "pricing.no.medicationOrders",
  "pricing.no.emergency",
  "pricing.no.replacement",
  "pricing.no.insuranceSales"
];

const planChoices = [
  ["pricing.free", "pricing.choose.free"],
  ["pricing.oneTime", "pricing.choose.report"],
  ["pricing.plus", "pricing.choose.plus"]
] as const;

const faqs = [
  ["pricing.faq.medicalService.q", "pricing.faq.medicalService.a"],
  ["pricing.faq.guidance.q", "pricing.faq.guidance.a"],
  ["pricing.faq.doctor.q", "pricing.faq.doctor.a"],
  ["pricing.faq.emergency.q", "pricing.faq.emergency.a"],
  ["pricing.faq.insurance.q", "pricing.faq.insurance.a"],
  ["pricing.faq.refund.q", "pricing.faq.refund.a"],
  ["pricing.faq.data.q", "pricing.faq.data.a"],
  ["pricing.faq.cancel.q", "pricing.faq.cancel.a"],
  ["pricing.faq.processor.q", "pricing.faq.processor.a"],
  ["pricing.faq.taxes.q", "pricing.faq.taxes.a"],
  ["pricing.faq.subscription.q", "pricing.faq.subscription.a"]
] as const;

const checkoutPlans = [
  ["pricing.oneTime", ["pricing.after.report.1", "pricing.after.report.2", "pricing.after.report.3"]],
  ["pricing.plus", ["pricing.after.plus.1", "pricing.after.plus.2", "pricing.after.plus.3", "pricing.after.plus.4"]]
] as const;

export default function PricingPage() {
  const { t } = useI18n();
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutPlan, setCheckoutPlan] = useState<CheckoutPlan | null>(null);

  async function handleCheckout(plan: CheckoutPlan) {
    setCheckoutError("");
    setCheckoutPlan(plan);

    try {
      await startCheckout(plan);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : t("pricing.checkoutFailed"));
      setCheckoutPlan(null);
    }
  }

  const plans = [
    {
      name: t("pricing.free"),
      price: "$0",
      audience: t("pricing.freeAudience"),
      features: [
        t("pricing.guidedSymptomCheck"),
        t("pricing.basicRiskLevel"),
        t("pricing.recommendedCareLevel"),
        t("pricing.safetyWarnings"),
        t("pricing.limitedHistory")
      ],
      excluded: [
        t("pricing.savedSummaries"),
        t("pricing.exportableReports"),
        t("pricing.insuranceChecklistHistory"),
        t("pricing.familyProfiles")
      ],
      cta: t("pricing.startFree"),
      href: "/symptom-check"
    },
    {
      name: t("pricing.oneTime"),
      price: "$4.99",
      audience: t("pricing.reportAudience"),
      features: [
        t("pricing.doctorReadySummary"),
        t("pricing.timeline"),
        t("pricing.redFlags"),
        t("pricing.carePlan"),
        t("pricing.questions"),
        t("pricing.insuranceChecklist"),
        t("pricing.exportableReport")
      ],
      cta: checkoutPlan === "one_time_report" ? t("pricing.openingCheckout") : t("pricing.createReportCreem"),
      onClick: () => handleCheckout("one_time_report"),
      disabled: checkoutPlan !== null,
      featured: true
    },
    {
      name: t("pricing.plus"),
      price: "$9.99/month",
      audience: t("pricing.plusAudience"),
      features: [
        t("pricing.unlimited"),
        t("pricing.savedRecords"),
        t("pricing.family"),
        t("pricing.insuranceHistory"),
        t("pricing.multiLanguage"),
        t("pricing.exportableSummaries"),
        t("pricing.savedInsurance"),
        t("pricing.historySearch"),
        t("pricing.priorityAccess")
      ],
      cta: checkoutPlan === "plus_monthly" ? t("pricing.openingCheckout") : t("pricing.subscribeCreem"),
      onClick: () => handleCheckout("plus_monthly"),
      disabled: checkoutPlan !== null
    }
  ];

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("nav.pricing")}
        title={t("pricing.title")}
        description={t("pricing.description")}
      />

      <Card className="notice-card billing-banner">
        <StatusBadge tone="primary">{t("pricing.creemBillingTitle")}</StatusBadge>
        <p>{t("pricing.creemBillingText")}</p>
        <small>{t("pricing.paymentNoteText")}</small>
      </Card>

      {checkoutError ? (
        <Card className="notice-card checkout-error">
          <StatusBadge tone="warning">{t("pricing.checkoutNotice")}</StatusBadge>
          <p>{checkoutError}</p>
        </Card>
      ) : null}

      <div className="pricing-grid">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>

      <Card className="tool-section">
        <p className="eyebrow">{t("pricing.comparisonEyebrow")}</p>
        <h2>{t("pricing.comparisonTitle")}</h2>
        <div className="table-scroll">
          <table className="tool-table pricing-comparison-table">
            <thead>
              <tr>
                <th>{t("pricing.feature")}</th>
                <th>{t("pricing.free")}</th>
                <th>{t("pricing.oneTime")}</th>
                <th>{t("pricing.plus")}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonGroups.map((group) => (
                <Fragment key={group.titleKey}>
                  <tr className="table-group-row" key={group.titleKey}>
                    <th colSpan={4}>{t(group.titleKey)}</th>
                  </tr>
                  {group.rows.map(([feature, free, report, plus]) => (
                    <tr key={feature}>
                      <th scope="row">{t(feature)}</th>
                      <td>{free ? t("pricing.included") : t("pricing.notIncluded")}</td>
                      <td>{report ? t("pricing.included") : t("pricing.notIncluded")}</td>
                      <td>{plus ? t("pricing.included") : t("pricing.notIncluded")}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="tool-section">
        <p className="eyebrow">{t("pricing.afterCheckoutEyebrow")}</p>
        <h2>{t("pricing.afterCheckoutTitle")}</h2>
        <p>{t("pricing.afterCheckoutCreem")}</p>
        <div className="decision-grid">
          {checkoutPlans.map(([plan, items]) => (
            <article className="care-setting-card" key={plan}>
              <h3>{t(plan)}</h3>
              <ul className="tool-check-list">
                {items.map((item) => <li key={item}>{t(item)}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Card>

      <div className="decision-grid">
        <Card className="tool-section">
          <p className="eyebrow">{t("pricing.boundaryEyebrow")}</p>
          <h2>{t("pricing.boundaryTitle")}</h2>
          <div className="tag-grid">
            {notProvided.map((key) => <StatusBadge key={key} tone="primary">{t(key)}</StatusBadge>)}
          </div>
        </Card>

        <Card className="tool-section">
          <p className="eyebrow">{t("pricing.chooseEyebrow")}</p>
          <h2>{t("pricing.chooseTitle")}</h2>
          <div className="plan-choice-list">
            {planChoices.map(([plan, copy]) => (
              <div className="plan-choice-row" key={plan}>
                <strong>{t(plan)}</strong>
                <span>{t(copy)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="tool-section">
        <p className="eyebrow">{t("pricing.faqEyebrow")}</p>
        <h2>{t("pricing.faqTitle")}</h2>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{t(question)}</summary>
              <p>{t(answer)}</p>
            </details>
          ))}
        </div>
      </Card>

      <Card className="tool-section cta-panel">
        <h2>{t("pricing.nextStepTitle")}</h2>
        <div className="button-pair">
          <PrimaryButton href="/symptom-check">{t("pricing.startFree")}</PrimaryButton>
          <SecondaryButton href="/insurance-guide">{t("insurance.createChecklist")}</SecondaryButton>
        </div>
      </Card>
    </section>
  );
}
