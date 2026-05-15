"use client";

import { CareLevelCard } from "@/components/care-level-card";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { FeatureCard } from "@/components/feature-card";
import { ImageFeatureSection } from "@/components/image-feature-section";
import { useLanguage } from "@/components/language-provider";
import { PricingCard } from "@/components/pricing-card";
import { SectionHeader } from "@/components/section-header";
import { SymptomButton } from "@/components/symptom-button";
import { VisualCard } from "@/components/visual-card";
import { getCopy } from "@/lib/i18n";

const CARE_TONES = ["danger", "warning", "primary", "secondary", "success"] as const;

const symptomFeatures = [
  ["Guided symptom questions", "Smart & private"],
  ["Red flag screening", "Actionable safety checks"],
  ["Risk level guidance", "Clear next steps"],
  ["Private and secure", "Your health data stays protected"]
];

const summaryFeatures = [
  "Symptom timeline",
  "Red flags checked",
  "Medications taken",
  "Questions to ask",
  "Save as PDF"
];

const insuranceCards = [
  "Urgent care vs ER",
  "Copay",
  "Deductible",
  "Out-of-pocket maximum",
  "In-network vs out-of-network",
  "Questions to ask your insurer"
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    features: ["Basic symptom check", "Risk level", "Care level guidance"],
    href: "/symptom-check",
    cta: "Start Symptom Check"
  },
  {
    name: "One-time Report",
    price: "$4.99",
    features: ["Doctor-ready PDF", "Symptom timeline", "Red flags checked", "Questions to ask"],
    href: "/payment-success",
    cta: "Create Report",
    featured: true
  },
  {
    name: "Plus",
    price: "$9.99/month",
    features: ["Unlimited reports", "Family profiles", "Saved health records", "Insurance checklist history"],
    href: "/pricing",
    cta: "View Plus"
  }
];

export default function HomePage() {
  const { languageCode } = useLanguage();
  const copy = getCopy(languageCode);
  const home = copy.home;

  return (
    <section className="home-page">
      <section className="hero-section">
        <div className="hero-orb hero-orb-left" />
        <div className="hero-orb hero-orb-right" />
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">{home.eyebrow}</p>
            <h1>{home.title}</h1>
            <p>{home.subtitle}</p>
            <div className="hero-actions">
              <a className="btn-primary" href="/symptom-check">
                {home.start}
              </a>
              <a className="btn-secondary" href="/care-options">
                {home.careCta}
              </a>
            </div>
          </div>

          <VisualCard
            priority
            src="/images/hero-care-dashboard.png"
            alt="HealthMatchAI dashboard with risk level, recommended care, red flags, insurance note, and doctor-ready summary"
          />
        </div>
      </section>

      <ImageFeatureSection
        id="symptom-check"
        eyebrow="Symptom Triage"
        title={home.symptomTitle}
        description={home.symptomDescription}
        imageSrc="/images/illustration-symptom-triage.png"
        imageAlt="Symptom triage interface with guided symptom questions"
      >
        <div className="feature-list">
          {symptomFeatures.map(([title, description], index) => (
            <FeatureCard
              key={title}
              title={title}
              description={description}
              icon={["Q", "!", "R", "P"][index]}
              tone={index === 1 ? "secondary" : index === 3 ? "success" : "primary"}
            />
          ))}
        </div>
        <div className="symptom-grid">
          {home.symptoms.map((symptom) => (
            <SymptomButton key={symptom} label={symptom} />
          ))}
        </div>
        <a className="btn-primary section-cta" href="/symptom-check">
          {home.start}
        </a>
      </ImageFeatureSection>

      <section className="home-section care-finder-section" id="care-options">
        <SectionHeader
          eyebrow="Care Level Finder"
          title={home.careTitle}
          description={home.careDescription}
        />
        <VisualCard
          src="/images/illustration-care-levels.png"
          alt="Five care level path cards for emergency, urgent care, primary care, telehealth, and self-care"
        />
        <div className="care-card-grid">
          {home.careLevels.map(([title, description], index) => (
            <CareLevelCard
              key={title}
              active={title === "Primary Care"}
              title={title}
              description={description}
              tone={CARE_TONES[index] ?? "primary"}
            />
          ))}
        </div>
      </section>

      <ImageFeatureSection
        id="health-records"
        eyebrow="Doctor-ready Summary"
        title={home.prepTitle}
        description={home.prepDescription}
        imageSrc="/images/illustration-doctor-summary.png"
        imageAlt="Doctor-ready PDF summary showing symptoms, timeline, red flags, medications, and questions"
        reverse
      >
        <div className="feature-list compact-feature-list">
          {summaryFeatures.map((feature, index) => (
            <FeatureCard
              key={feature}
              title={feature}
              icon={["T", "!", "M", "?", "PDF"][index]}
              tone={index === 1 ? "success" : index === 4 ? "secondary" : "primary"}
            />
          ))}
        </div>
        <a className="btn-primary section-cta" href="/payment-success">
          {copy.summary.cta}
        </a>
      </ImageFeatureSection>

      <ImageFeatureSection
        id="insurance-guide"
        eyebrow="Insurance Navigation"
        title={home.insuranceTitle}
        description={home.insuranceDescription}
        imageSrc="/images/illustration-insurance-checklist.png"
        imageAlt="Insurance checklist, insurance card, medical bill, copay, deductible, and in-network cards"
      >
        <div className="insurance-topic-grid">
          {insuranceCards.map((topic) => (
            <article className="insurance-topic-card" key={topic}>
              {topic}
            </article>
          ))}
        </div>
        <p className="fine-print">
          Insurance information is educational only. HealthMatchAI does not sell insurance or recommend a specific plan.
        </p>
        <a className="btn-secondary section-cta" href="/insurance-guide">
          {copy.insurance.cta}
        </a>
      </ImageFeatureSection>

      <section className="home-section" id="pricing-preview">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple tools for clearer care decisions."
          description="Paid options unlock more complete reports, saved records, and shareable summaries."
        />
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <SectionHeader title={home.safetyTitle} />
        <DisclaimerBox
          text={`${copy.safety} Insurance information is educational only and does not constitute insurance advice. For insurance enrollment, speak with a licensed insurance agent or broker.`}
        />
      </section>
    </section>
  );
}
