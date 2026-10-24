import Link from "next/link";
export function SiteFooter() {
  return (
    <footer className="hm-footer">
      <div className="hm-footer-inner">
        <div>
          <Link href="/" className="hm-brand">
            HealthMatch <b>AI</b>
          </Link>
          <p>Know your numbers. Catch changes early.</p>
          <p className="hm-small">
            Health information and self-management. Not a substitute for
            professional care.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/sample-report">Sample Report</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/safety">Safety &amp; Limits</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
      <div className="hm-footer-bottom">
        © 2026 HealthMatch AI{" "}
        <span>Product preview · Built around a longer view.</span>
      </div>
    </footer>
  );
}
