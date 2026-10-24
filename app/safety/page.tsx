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
          This preview does not assess results or monitor anyone.
        </p>
      </section>
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
          The planned application will use versioned, auditable rules for four
          severity levels: normal, mild deviation, significant abnormality, and
          critical. Separate red-flag rules will show critical-value warnings at
          the top of the first screen, immediately and without a paywall.
        </p>
        <p>
          AI will only extract report information and express rule outputs in
          plain language. You must confirm extracted values before they enter
          your health record. Generated explanations must pass checks against
          the rule outputs before display; a safe template will replace an
          explanation that fails validation.
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
          an assurance of health. The static sample shows the format only, not
          an approved clinical rule set.
        </p>
      </section>
      <section>
        <h2>Health data deserves careful handling.</h2>
        <p>
          This phase has no health upload or subscription collection. Before the
          app opens, it must provide encryption in transit and at rest, private
          storage with short-lived signed access, minimal retention, and
          one-click export and complete deletion. Health data must not be sold
          or used for advertising.
        </p>
        <p>
          Processing regions, subprocessors, retention periods, and deletion
          arrangements are not finalized. They must be documented publicly, and
          the GDPR basics reviewed for European users, before real uploads are
          enabled. These are release requirements, not claims that this preview
          implements a health-data service.
        </p>
        <Link className="hm-text-link" href="/privacy">
          Read the preview privacy notice →
        </Link>
      </section>
    </div>
  );
}
