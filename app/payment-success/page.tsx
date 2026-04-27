import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <section className="panel legal-page">
      <p className="page-subtitle">Hosted payment</p>
      <h1 className="page-title">Payment Started</h1>
      <p className="page-subtitle">
        If this was a live hosted checkout, your payment status will be confirmed by the payment
        provider. This MVP still requires scheduling, provider verification, and follow-up workflows
        before real medical consultations are offered.
      </p>
      <div style={{ marginTop: 18 }}>
        <Link className="btn-secondary" href="/doctors">
          Back to doctors
        </Link>
      </div>
    </section>
  );
}
