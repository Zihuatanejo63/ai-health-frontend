import Link from "next/link";

export default function PaymentCancelledPage() {
  return (
    <section className="panel legal-page">
      <p className="page-subtitle">Hosted payment</p>
      <h1 className="page-title">Payment Cancelled</h1>
      <p className="page-subtitle">
        No paid tool access was completed. You can return to your care summary and choose another
        option.
      </p>
      <div style={{ marginTop: 18 }}>
        <Link className="btn-secondary" href="/result">
          Back to care summary
        </Link>
      </div>
    </section>
  );
}
