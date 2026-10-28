import {alternates} from "@/lib/public-i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { SampleBadge, ReportPreview, Disclaimer } from "@/components/marketing";
import { sampleResults, sampleDates } from "@/lib/marketing-content";
export const metadata: Metadata = {
  alternates: alternates("/sample-report"),
  title: "Sample Report & Trends",
  description:
    "Explore a complete fictional checkup reading with three years of results and a sample follow-up plan. No account required.",
};
export default function SampleReport() {
  return (
    <div className="hm-page hm-editorial">
      <header className="hm-page-heading">
        <SampleBadge />
        <h1>
          Your numbers,
          <br />
          with a little perspective.
        </h1>
        <p className="hm-lead">
          A complete reading of a fictional three-marker report, with three
          years of context.
        </p>
        <p>
          No real person, laboratory, or medical record is represented. All
          values, flags, and actions below are static illustrations, not a
          clinical rules engine.
        </p>
      </header>
      <nav className="hm-tabs" aria-label="Sample report sections">
        <a href="#overview">Overview</a>
        <a href="#results">All results</a>
        <a href="#trends">Trends</a>
        <a href="#follow-up">Follow-up</a>
        <a href="#basis">Reading basis</a>
      </nav>
      <section className="hm-section" id="overview">
        <div className="hm-row">
          <h2>Report overview</h2>
          <SampleBadge />
        </div>
        <div className="hm-grid">
          <article className="hm-card">
            <p className="hm-overline">SAMPLE PROFILE</p>
            <h3>Adult · born 1982</h3>
            <p>Female reference context · Sample Lab A</p>
            <p>
              Latest collection: September 18, 2026
              <br />3 reports · 3 comparable markers
            </p>
          </article>
          <article className="hm-card">
            <p className="hm-overline">AT A GLANCE · SAMPLE</p>
            <h3>1 marker above range</h3>
            <p>
              HbA1c increased across the three sample dates. ALT returned to
              range. Hemoglobin remained within range.
            </p>
          </article>
          <article className="hm-card">
            <p className="hm-overline">EXTRACTION REVIEW · SAMPLE</p>
            <h3>All 3 values reviewed</h3>
            <p>
              Illustration of the required confirmation step. In the app, you
              will compare each value with its source before saving it.
            </p>
          </article>
        </div>
      </section>
      <section className="hm-section" id="results">
        <h2>Every result, explained.</h2>
        <p>
          Sample report reference intervals only. Laboratories, methods, and
          personal context can change the appropriate range.
        </p>
        <div
          className="hm-table-wrap"
          tabIndex={0}
          role="region"
          aria-label="Sample results table, scroll horizontally to see all columns"
        >
          <table className="hm-table">
            <caption>Sample · September 18, 2026 · all results</caption>
            <thead>
              <tr>
                <th scope="col">Marker</th>
                <th scope="col">Result</th>
                <th scope="col">Report range</th>
                <th scope="col">Sample flag</th>
              </tr>
            </thead>
            <tbody>
              {sampleResults.map((r) => (
                <tr key={r.name}>
                  <th scope="row">{r.name}</th>
                  <td>
                    {r.values[2]} {r.unit}
                  </td>
                  <td>
                    {r.range} {r.unit}
                  </td>
                  <td><span className="hm-result-flag" data-attention={r.flag === "Above sample range"}>{r.flag}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="hm-grid">
          {sampleResults.map((r) => (
            <article className="hm-card" key={r.name}>
              <SampleBadge />
              <h3>{r.name}</h3>
              <p>{r.explanation}</p>
              <span className="hm-badge">{r.status}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="hm-section hm-split" id="trends">
        <div>
          <p className="hm-overline">THREE REPORTS. ONE TIMELINE.</p>
          <h2>Follow the direction of change.</h2>
          <p>
            HbA1c rose by 0.6 percentage points from the first sample to the
            latest. ALT returned to the sample range. A trend is context to
            discuss, not a conclusion about a condition.
          </p>
          <p className="hm-small">
            Sample assumes the same laboratory, methods, units, and reference
            intervals at all three dates. Chart scale: 5.0–6.2%; the vertical
            axis does not start at zero.
          </p>
        </div>
        <ReportPreview />
      </section>
      <div
        className="hm-table-wrap"
        tabIndex={0}
        role="region"
        aria-label="Sample results table, scroll horizontally to see all columns"
      >
        <table className="hm-table">
          <caption>Sample · full longitudinal values</caption>
          <thead>
            <tr>
              <th scope="col">Marker / unit</th>
              {sampleDates.map((d) => (
                <th scope="col" key={d}>
                  {d}
                </th>
              ))}
              <th scope="col">Latest trend</th>
            </tr>
          </thead>
          <tbody>
            {sampleResults.map((r) => (
              <tr key={r.name}>
                <th scope="row">
                  {r.name} ({r.unit})
                </th>
                {r.values.map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="hm-section" id="follow-up">
        <div className="hm-row">
          <h2>Turn a question into a conversation.</h2>
          <SampleBadge />
        </div>
        <div className="hm-grid">
          <article className="hm-card">
            <p className="hm-overline">DISCUSS</p>
            <h3>Bring the glucose trend</h3>
            <p>
              Ask your primary care clinician: “How should we interpret this
              change in my context? Could anything affect the accuracy of the
              result? When should I repeat the test?”
            </p>
          </article>
          <article className="hm-card">
            <p className="hm-overline">PLAN · SAMPLE ONLY</p>
            <h3>A follow-up to keep in view</h3>
            <p>
              Illustrative reminder: December 18, 2026. This three-month date
              demonstrates the interface; it is not a recommended interval.
              Actual timing requires a reviewed rule and clinical context.
            </p>
            <p>No email is scheduled or sent.</p>
          </article>
          <article className="hm-card">
            <p className="hm-overline">SHARE</p>
            <h3>A summary for your clinician</h3>
            <p>
              HbA1c: 5.4 → 5.8 → 6.0%. ALT: 48 → 42 → 30 U/L. Hemoglobin: stable
              within the sample range.
            </p>
            <p>One-page PDF export is planned for the app.</p>
          </article>
        </div>
      </section>
      <section className="hm-safety" id="basis">
        <h2>Know where the reading comes from.</h2>
        <p>
          The sample intervals are fictional report values, not universal
          thresholds. The HbA1c explanation draws on{" "}
          <a href="https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test">
            NIDDK’s A1C overview
          </a>
          . See{" "}
          <a href="https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/">
            MedlinePlus on reference ranges
          </a>{" "}
          for why lab context matters.
        </p>
        <p>
          Sample fixture: sample-2026-10-v1. It has no validated clinical
          severity rules. In the planned app, each classification, red flag, and
          follow-up interval must show its rule ID, version, source, and
          applicable context. AI cannot override those outputs.
        </p>
        <Disclaimer />
        <Link className="hm-text-link" href="/safety">
          Safety &amp; Limits →
        </Link>
      </section>
    </div>
  );
}
