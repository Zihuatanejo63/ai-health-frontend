type InsuranceChecklistProps = {
  title?: string;
  description?: string;
  items?: string[];
  cta?: string;
};

export const DEFAULT_INSURANCE_CHECKLIST = [
  "Is urgent care covered?",
  "Is the provider in-network?",
  "What is your copay?",
  "Does your deductible apply?",
  "Is telehealth covered?"
];

export function InsuranceChecklist({
  title = "Insurance Checklist",
  description = "Educational checklist only. For plan-specific decisions, speak with a licensed insurance agent or broker.",
  items = DEFAULT_INSURANCE_CHECKLIST,
  cta = "Understand My Coverage Options"
}: InsuranceChecklistProps) {
  return (
    <article className="panel insurance-checklist">
      <div>
        <p className="eyebrow">Insurance Navigation</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a className="btn-secondary insurance-cta" href="/payment-success">
        {cta}
      </a>
    </article>
  );
}
