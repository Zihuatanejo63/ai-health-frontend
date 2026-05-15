import { CareLevelCard } from "@/components/care-level-card";
import { DisclaimerBox } from "@/components/disclaimer-box";
import { SectionHeader } from "@/components/section-header";
import { VisualCard } from "@/components/visual-card";

const options = [
  {
    title: "Emergency",
    tone: "danger" as const,
    bestFor: "Severe symptoms, chest pain, trouble breathing, confusion, major injury, or signs of stroke.",
    notFor: "Mild symptoms that can wait for routine clinical guidance.",
    ask: "What symptoms make this an emergency right now?",
    insurance: "ER care may have higher cost sharing; do not delay emergency care because of cost questions."
  },
  {
    title: "Urgent Care",
    tone: "warning" as const,
    bestFor: "Same-day non-emergency needs, worsening fever, minor injuries, dehydration concerns, or persistent symptoms.",
    notFor: "Life-threatening symptoms or ongoing primary care management.",
    ask: "Can this clinic evaluate my symptom and refer me if needed?",
    insurance: "Check urgent care copay, deductible rules, and in-network status before going when possible."
  },
  {
    title: "Primary Care",
    tone: "primary" as const,
    bestFor: "Symptoms that need follow-up soon, chronic condition context, medication questions, and preventive care.",
    notFor: "Symptoms that need immediate emergency evaluation.",
    ask: "What should I monitor before the visit?",
    insurance: "Primary care may have a lower copay, but network rules still matter."
  },
  {
    title: "Telehealth",
    tone: "secondary" as const,
    bestFor: "Virtual first step for many mild to moderate symptoms, refills, simple questions, and triage.",
    notFor: "Symptoms needing an exam, imaging, urgent procedures, or emergency care.",
    ask: "Can this be handled virtually or should I be seen in person?",
    insurance: "Confirm telehealth coverage and whether the virtual provider is in-network."
  },
  {
    title: "Pharmacy / Self-care",
    tone: "success" as const,
    bestFor: "Mild symptoms, over-the-counter guidance, monitoring at home, and basic symptom support.",
    notFor: "Red flags, severe symptoms, or symptoms that persist or worsen.",
    ask: "Which non-prescription options are appropriate for my situation?",
    insurance: "Some pharmacy items may not count toward medical benefits; ask before assuming coverage."
  }
];

export default function CareOptionsPage() {
  return (
    <section className="stack-page">
      <div className="page-hero-grid">
        <SectionHeader
          eyebrow="Care Level Finder"
          title="Care Guidance"
          description="Compare emergency care, urgent care, primary care, telehealth, and self-care before choosing where to go."
        />
        <VisualCard src="/images/illustration-care-levels.png" alt="Five care level paths" />
      </div>

      <div className="care-detail-grid">
        {options.map((option) => (
          <article className="panel detail-card" key={option.title}>
            <CareLevelCard title={option.title} description={option.bestFor} tone={option.tone} />
            <dl>
              <dt>Best for</dt>
              <dd>{option.bestFor}</dd>
              <dt>Not for</dt>
              <dd>{option.notFor}</dd>
              <dt>What to ask</dt>
              <dd>{option.ask}</dd>
              <dt>Insurance / cost note</dt>
              <dd>{option.insurance}</dd>
            </dl>
          </article>
        ))}
      </div>

      <DisclaimerBox text="This page is educational and does not replace professional medical advice." />
    </section>
  );
}
