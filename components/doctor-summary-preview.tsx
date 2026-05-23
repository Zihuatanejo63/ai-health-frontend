type DoctorSummaryPreviewProps = {
  eyebrow?: string;
  title?: string;
  summary?: string;
  cta?: string;
  fields?: string[];
  previewOnly?: boolean;
};

const SUMMARY_FIELDS = [
  "Main symptoms",
  "Timeline",
  "Temperature / pain level",
  "Medications taken",
  "Red flags checked",
  "Questions to ask"
];

export function DoctorSummaryPreview({
  eyebrow = "Doctor Visit Prep",
  title = "Doctor-ready Summary",
  summary,
  cta = "Download full PDF report",
  fields = SUMMARY_FIELDS,
  previewOnly = false
}: DoctorSummaryPreviewProps) {
  return (
    <article className="panel summary-preview">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        {summary ? <p className={previewOnly ? "summary-fade" : undefined}>{summary}</p> : null}
      </div>
      <div className="summary-field-grid">
        {fields.map((field) => (
          <span key={field}>{field}</span>
        ))}
      </div>
      <a className="btn-primary summary-cta" href="/pricing">
        {cta}
      </a>
    </article>
  );
}
