import { PricingCard } from "@/components/pricing-card";
import { PageHeader } from "@/components/app-ui";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["Basic symptom check", "Risk level", "Care level guidance"],
    cta: "Start Symptom Check",
    href: "/symptom-check"
  },
  {
    name: "One-time Report",
    price: "$4.99",
    features: ["Doctor-ready PDF", "Symptom timeline", "Red flags checked", "Questions to ask"],
    cta: "Create Report",
    href: "/payment-success",
    featured: true
  },
  {
    name: "Plus",
    price: "$9.99/month",
    features: ["Unlimited reports", "Family profiles", "Saved health records", "Insurance checklist history"],
    cta: "View Plus",
    href: "/payment-success"
  }
];

export default function PricingPage() {
  return (
    <section className="app-page">
      <PageHeader
        eyebrow="Pricing"
        title="Choose the support level you need"
        description="Paid options unlock more complete reports, saved records, and shareable summaries."
      />

      <div className="pricing-grid">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
    </section>
  );
}
