import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <section className="panel legal-page">
      <p className="page-subtitle">Hosted payment</p>
      <h1 className="page-title">Paid Tool Access Started</h1>
      <p className="page-subtitle">
        If this was a live hosted checkout, your payment status will be confirmed by the payment
        provider. Paid tools may include a doctor-ready PDF report, insurance coverage checklist, or
        saved symptom timeline. They do not include clinician care, medication orders, or insurance
        recommendations.
      </p>
      <div style={{ marginTop: 18 }}>
        <Link className="btn-secondary" href="/result">
          Back to care summary
        </Link>
      </div>
    </section>
  );
}
