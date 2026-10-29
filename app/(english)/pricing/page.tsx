import {alternates} from "@/lib/public-i18n";
import type { Metadata } from "next";
import { Plans, Disclaimer } from "@/components/marketing";
export const metadata: Metadata = {
  alternates: alternates("/pricing"),
  title: "Pricing",
  description:
    "Preview plans for report readings, longitudinal tracking, and follow-up reminders.",
};
export default function Pricing() {
  return (
    <div className="hm-page hm-editorial">
      <header className="hm-page-heading">
        <p className="hm-overline">PRICING PREVIEW</p>
        <h1>
          A clearer picture.
          <br />
          At your own pace.
        </h1>
        <p className="hm-lead">
          One report to begin. A longer view when you need it.
        </p>
        <p>
          Placeholder prices. No purchase or checkout is available in this
          preview.
        </p>
      </header>
      <Plans />
      <section className="hm-safety">
        <h2>Safety is part of every plan.</h2>
        <p>
          Critical-value alerts will always be visible without payment. Family
          profiles are planned for a later release; the first application
          release focuses on your own reports.
        </p>
        <Disclaimer />
      </section>
    </div>
  );
}
