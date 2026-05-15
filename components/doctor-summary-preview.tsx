type DoctorSummaryPreviewProps = {
  title?: string;
  summary?: string;
  cta?: string;
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
  title = "Doctor-ready Summary",
  summary,
  cta = "Download full PDF report",
  previewOnly = false
}: DoctorSummaryPreviewProps) {
  return (
    <article className="panel summary-preview">
      <div>
        <p className="eyebrow">Doctor Visit Prep</p>
        <h3>{title}</h3>
        {summary ? <p className={previewOnly ? "summary-fade" : undefined}>{summary}</p> : null}
      </div>
      <div className="summary-field-grid">
        {SUMMARY_FIELDS.map((field) => (
          <span key={field}>{field}</span>
        ))}
      </div>
      <a className="btn-primary summary-cta" href="/payment-success">
        {cta}
      </a>
    </article>
  );
}
