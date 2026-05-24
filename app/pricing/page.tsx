"use client";

import { useEffect, useState } from "react";
import { Card, PageHeader, PrimaryButton, SecondaryButton, StatusBadge } from "@/components/app-ui";
import { PricingCard } from "@/components/pricing-card";
import { startCheckout, type CheckoutPlan } from "@/lib/checkout";
import { useI18n } from "@/components/i18n-provider";

const notProvided = [
  "pricing.no.medicalDiagnosis",
  "pricing.no.medicationOrders",
  "pricing.no.emergency",
  "pricing.no.replacement",
  "pricing.no.insuranceSales"
];

const faqs = [
  ["pricing.faq.diagnosis.q", "pricing.faq.diagnosis.a"],
  ["pricing.faq.emergency.q", "pricing.faq.emergency.a"],
  ["pricing.faq.insuranceHow.q", "pricing.faq.insuranceHow.a"],
  ["pricing.faq.cancel.q", "pricing.faq.cancel.a"],
] as const;

export default function PricingPage() {
  const { t } = useI18n();
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutPlan, setCheckoutPlan] = useState<CheckoutPlan | null>(null);
  const [checkoutConfigured, setCheckoutConfigured] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/checkout-status")
      .then((res) => res.ok ? res.json() : { configured: false })
      .then((data: { configured?: boolean }) => {
        if (active) setCheckoutConfigured(Boolean(data.configured));
      })
      .catch(() => {
        if (active) setCheckoutConfigured(false);
      });
    return () => {
      active = false;
    };
  }, []);

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
        t("pricing.structuredSymptomCheck"),
        t("pricing.basicRiskLevel"),
        t("pricing.recommendedCareLevel"),
        t("pricing.safetyWarnings")
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
        t("pricing.carePlan"),
        t("pricing.redFlags"),
        t("pricing.coverageQuestions"),
        t("pricing.exportableReport")
      ],
      cta: checkoutPlan === "one_time_report" ? t("pricing.openingCheckout") : t("pricing.createReportCreem"),
      onClick: () => handleCheckout("one_time_report"),
      disabled: checkoutPlan !== null,
      featured: true
    },
    {
      name: t("pricing.plus"),
      price: t("pricing.comingSoonPrice"),
      audience: t("pricing.plusAudience"),
      features: [
        t("pricing.savedRecords"),
        t("pricing.family"),
        t("pricing.repeatedReports"),
        t("pricing.insuranceHistory")
      ],
      cta: t("pricing.comingSoon"),
      onClick: () => undefined,
      disabled: true
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
        <StatusBadge tone="primary">
          {checkoutConfigured ? t("pricing.creemBillingTitle") : t("pricing.creemConfiguringTitle")}
        </StatusBadge>
        <p>{checkoutConfigured ? t("pricing.creemBillingText") : t("pricing.creemConfiguringText")}</p>
      </Card>

      {checkoutError ? (
        <Card className="notice-card checkout-error">
          <StatusBadge tone="warning">{t("pricing.checkoutNotice")}</StatusBadge>
          <p>{checkoutError}</p>
        </Card>
      ) : null}

      <div className="pricing-grid">
        {plans.map((plan) => (
          <PricingCard key={plan.name} excludedLabel={t("pricing.notIncluded")} {...plan} />
        ))}
      </div>

      <Card className="tool-section">
        <p className="eyebrow">{t("pricing.boundaryEyebrow")}</p>
        <h2>{t("pricing.boundaryTitle")}</h2>
        <div className="tag-grid">
          {notProvided.map((key) => <StatusBadge key={key} tone="primary">{t(key)}</StatusBadge>)}
        </div>
      </Card>

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
