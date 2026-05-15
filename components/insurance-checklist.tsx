type InsuranceChecklistProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: string[];
  cta?: string;
  href?: string;
};

export const DEFAULT_INSURANCE_CHECKLIST = [
  "Is urgent care covered?",
  "Is the provider in-network?",
  "What is your copay?",
  "Does your deductible apply?",
  "Is telehealth covered?"
];

export function InsuranceChecklist({
  eyebrow = "Insurance Navigation",
  title = "Insurance Checklist",
  description = "Educational checklist only. For plan-specific decisions, speak with a licensed insurance agent or broker.",
  items = DEFAULT_INSURANCE_CHECKLIST,
  cta = "Understand My Coverage Options",
  href = "/insurance-guide"
}: InsuranceChecklistProps) {
  return (
    <article className="panel insurance-checklist">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a className="btn-secondary insurance-cta" href={href}>
        {cta}
      </a>
    </article>
  );
}
