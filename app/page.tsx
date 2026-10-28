import Link from "next/link";
import { marketing } from "@/lib/marketing-content";
import { ReportPreview, Plans, Disclaimer } from "@/components/marketing";
export default function HomePage() {
  return (
    <div className="hm-page hm-editorial">
      <section className="hm-hero">
        <div>
          <p className="hm-overline">MEET YOUR LONG-TERM HEALTH COMPANION</p>
          <h1>{marketing.hero}</h1>
          <p className="hm-lead">{marketing.subtitle}</p>
          <div className="hm-actions">
            <Link className="hm-button" href="/dashboard">
              Upload a report <span aria-hidden="true">↗</span>
            </Link>
            <Link className="hm-text-link" href="/sample-report">
              See a sample report →
            </Link>
          </div>
          <p className="hm-small">
            Upload, confirm, understand · Sample and manual entry always
            available
          </p>
        </div>
        <ReportPreview />
      </section>
      <section className="hm-strip">
        <span>Understand each result.</span>
        <span>Notice the pattern.</span>
        <span>Remember the follow-up.</span>
      </section>
      <section className="hm-section">
        <p className="hm-overline">FROM A REPORT TO A ROUTINE</p>
        <h2>Three steps. A longer view.</h2>
        <div className="hm-grid">
          {marketing.steps.map(([n, t, d]) => (
            <article className="hm-step" key={n}>
              <span className="hm-step-number">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="hm-section">
        <p className="hm-overline">THE NUMBERS THAT TELL YOUR STORY</p>
        <h2>From individual markers to the bigger picture.</h2>
        <div className="hm-categories">
          {marketing.categories.map(([n, t, d]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <p className="hm-small">
          Planned categories, not detection promises. Coverage varies by marker;
          tumor markers cannot independently establish or rule out cancer.
          Unsupported markers will be clearly labeled.
        </p>
      </section>
      <section className="hm-section hm-split">
        <div>
          <p className="hm-overline">CHANGES DESERVE CONTEXT</p>
          <h2>
            A result is a moment.
            <br />A trend tells you more.
          </h2>
          <p className="hm-lead">
            Keep the small shifts in sight. See what’s new, what persists, and
            what has moved back into range.
          </p>
          <p>
            Each alert will show the result, its source, the rule behind it, and
            a suggested next conversation with your clinician.
          </p>
          <Link className="hm-text-link" href="/sample-report#trends">
            Follow the sample’s three-year trend →
          </Link>
        </div>
        <ReportPreview />
      </section>
      <section className="hm-safety">
        <p className="hm-overline">CLEAR INFORMATION. CLEAR BOUNDARIES.</p>
        <h2>Your clinician stays at the center.</h2>
        <Disclaimer />
        <p>
          Rules will determine severity, red flags, and follow-up intervals. AI
          will help with extraction and language. Critical alerts will never sit
          behind a paywall.
        </p>
        <Link className="hm-text-link" href="/safety">
          Read Safety &amp; Limits →
        </Link>
      </section>
      <section className="hm-section">
        <p className="hm-overline">A PLAN FOR YOUR NEXT CHAPTER</p>
        <h2>Start with one report. Build from there.</h2>
        <p>
          Preview pricing only. Plans are not on sale; final pricing will be
          confirmed before launch.
        </p>
        <Plans />
      </section>
      <section className="hm-section" id="upload-preview">
        <p className="hm-overline">WHAT’S NEXT</p>
        <h2>Your first report is the beginning.</h2>
        <p>
          Upload a PDF or image, review the extracted values, and keep the
          changes in view. Manual entry and a separate fictional Sample
          workspace are always available.
        </p>
        <Link className="hm-button" href="/dashboard">
          Open my health workspace ↗
        </Link>
      </section>
      <section className="hm-section hm-faq">
        <h2>A few things you might be wondering.</h2>
        {marketing.faqs.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
