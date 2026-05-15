import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <section className="panel paid-tools-page">
      <p className="eyebrow">Paid tools</p>
      <h1 className="page-title">Your paid tools are ready</h1>
      <p className="page-subtitle">
        Paid tools do not include clinician care, medication orders, diagnosis, or insurance
        recommendations.
      </p>
      <div className="paid-action-grid">
        <Link className="btn-primary" href="/result">
          Download Doctor-ready PDF
        </Link>
        <Link className="btn-secondary" href="/insurance-guide">
          View Insurance Checklist
        </Link>
        <Link className="btn-secondary" href="/result">
          Save Symptom Timeline
        </Link>
        <Link className="btn-secondary" href="/result">
          Back to Result
        </Link>
      </div>
    </section>
  );
}
