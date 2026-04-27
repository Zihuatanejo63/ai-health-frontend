import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          <strong>AI Health Match</strong> · MVP for AI-assisted triage and doctor matching.
        </span>
        <nav className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/medical-disclaimer">Medical Disclaimer</Link>
          <Link href="/emergency">Emergency Notice</Link>
          <Link href="/cookies">Cookie Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
