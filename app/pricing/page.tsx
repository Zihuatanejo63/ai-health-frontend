"use client";

import { PricingCard } from "@/components/pricing-card";
import { PageHeader } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";

export default function PricingPage() {
  const { t } = useI18n();
  const plans = [
    {
      name: t("pricing.free"),
      price: "$0",
      features: [t("pricing.basic"), t("pricing.risk"), t("pricing.care")],
      cta: t("home.start"),
      href: "/symptom-check"
    },
    {
      name: t("pricing.oneTime"),
      price: "$4.99",
      features: [t("pricing.pdf"), t("pricing.timeline"), t("pricing.redFlags"), t("pricing.questions")],
      cta: t("pricing.createReport"),
      href: "/payment-success",
      featured: true
    },
    {
      name: t("pricing.plus"),
      price: "$9.99/month",
      features: [t("pricing.unlimited"), t("pricing.family"), t("pricing.savedRecords"), t("pricing.insuranceHistory")],
      cta: t("pricing.viewPlus"),
      href: "/payment-success"
    }
  ];

  return (
    <section className="app-page">
      <PageHeader
        eyebrow={t("nav.pricing")}
        title={t("pricing.title")}
        description={t("pricing.description")}
      />

      <div className="pricing-grid">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
    </section>
  );
}
