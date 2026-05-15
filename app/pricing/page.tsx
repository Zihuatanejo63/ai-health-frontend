import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

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
    href: "/payment-success"
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
    <section className="stack-page">
      <SectionHeader
        eyebrow="Pricing"
        title="Choose the support level you need"
        description="Paid options unlock more complete reports, saved records, and shareable summaries."
      />

      <div className="pricing-grid">
        {plans.map((plan) => (
          <article className="panel pricing-panel" key={plan.name}>
            <h2>{plan.name}</h2>
            <strong>{plan.price}</strong>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link className="btn-primary" href={plan.href}>
              {plan.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
