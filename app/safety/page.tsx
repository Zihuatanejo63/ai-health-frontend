import { PublicSafety } from "@/components/public-safety";
import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/marketing";
export const metadata: Metadata = {
  title: "Safety & Limits",
  description:
    "The boundaries, interpretation approach, and privacy requirements for HealthMatch AI.",
};
export default function Safety() {
  return (
    <div className="hm-page hm-prose">
      <header className="hm-page-heading">
        <p className="hm-overline">SAFETY & LIMITS</p>
        <h1>
          Useful context.
          <br />
          Honest boundaries.
        </h1>
        <Disclaimer />
      </header>
      <section className="hm-safety">
        <h2>Do not wait for an app in an emergency.</h2>
        <p>
          If a laboratory or clinician tells you a result is critical, seek
          urgent medical attention and follow their instructions. If you believe
          you are having a medical emergency, contact local emergency services.
          This app is not continuously monitored.
        </p>
      </section>
      <PublicSafety />
      <section>
        <h2>Information, not a diagnosis</h2>
        <p>
          HealthMatch AI is designed to help you understand reports and manage
          follow-ups. It will not provide diagnostic conclusions, prescriptions,
          medication advice, symptom triage, or access to a doctor marketplace.
          It cannot guarantee early detection or rule out illness.
        </p>
      </section>
      <section>
        <h2>Rules decide. AI explains.</h2>
        <p>
          The local application uses versioned, auditable rules for four
          severity levels: normal, mild deviation, significant abnormality, and
          critical. Separate red-flag rules show critical-value warnings at the
          top of the first screen, immediately and without a paywall.
        </p>
        <p>
          AI extracts report information or selects relevant evidence and a
          question topic. Answers use validated, report-specific templates. You
          must confirm extracted values before they enter your health record.
          Generated explanations must pass checks against the rule outputs
          before display; a safe template will replace an explanation that fails
          validation.
        </p>
      </section>
      <section>
        <h2>The basis of a reading</h2>
        <p>
          Readings will use the report’s own reference intervals and applicable
          thresholds from public guidelines. Each rule must include a source,
          version, population, unit, and review record. Reference intervals vary
          by laboratory and context; incomplete or incompatible results must not
          be labeled normal by default.
        </p>
        <p>
          Uncovered markers will show the original report value and
          “interpretation not yet covered.” A normal result or no alert is not
          an assurance of health. Five markers currently have local pilot rules:
          HbA1c, glucose, potassium, ALT and hemoglobin. Clinical sign-off is
          pending. Follow-up intervals are clinician-review targets, not
          universal repeat-test instructions.
        </p>
      </section>
      <section>
        <h2>Health data deserves careful handling.</h2>
        <p>
          The local app encrypts saved health payloads and separates fictional
          samples from personal reports. Upload extraction sends files to the
          configured Gemini endpoint with consent; manual entry and sample
          import need no model access.
        </p>
        <p>
          Local connections use loopback HTTP. Active workspace data can be
          exported or deleted, but device backups, SQLite journals and
          provider-retained copies are outside this control. Production privacy
          and deletion requirements are not complete.
        </p>
        <Link className="hm-text-link" href="/privacy">
          Read actual local privacy controls and limits →
        </Link>
      </section>
    </div>
  );
}
