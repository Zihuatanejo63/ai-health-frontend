import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About HealthMatchAI | How Our Symptom Guidance Works",
  description:
    "How HealthMatchAI's symptom guidance works: a rule-based safety engine plus AI-assisted summaries, AES-256 encrypted health data, and strict educational boundaries. Not a diagnosis tool.",
};

export default function AboutPage() {
  return (
    <section className="app-page landing-page">
      <div className="hero-section">
        <p className="eyebrow">About HealthMatchAI</p>
        <h1>Built to make the next step obvious</h1>
        <p>
          HealthMatchAI helps people who are unsure what to do about a symptom: how urgent it might
          be, what level of care fits, what it may cost without insurance, and how to walk into an
          appointment prepared. We are a navigation and preparation tool — never a replacement for
          a clinician.
        </p>
      </div>

      <div className="content-section" style={{ marginTop: 40 }}>
        <h2>How the guidance is generated</h2>
        <p>
          Every symptom check runs through two layers. First, a deterministic rule engine screens
          for red-flag symptom combinations using published triage conventions from sources such as
          the CDC, NHS, and major US health systems — emergency signals always take priority and are
          never softened by any other logic. Second, an AI model drafts a plain-language summary and
          visit-preparation questions, which are constrained by the rule engine&apos;s result: the AI can
          explain, but it can never downgrade a risk level or contradict a safety rule.
        </p>
        <p>
          The output is educational guidance about <em>care levels</em> — self-care, telehealth,
          primary care, urgent care, or emergency — not a diagnosis, prescription, or treatment plan.
        </p>
      </div>

      <div className="content-section" style={{ marginTop: 32 }}>
        <h2>How your data is protected</h2>
        <ul>
          <li>Symptom checks and health profiles are encrypted at rest with AES-256-GCM.</li>
          <li>Your health answers are never sold and never shared with advertisers.</li>
          <li>No advertising pixels run on symptom or result pages.</li>
          <li>Outbound partner links never carry your symptom or health data.</li>
          <li>
            You can export or permanently delete your data at any time from Settings, whether or not
            you keep an account.
          </li>
        </ul>
      </div>

      <div className="content-section" style={{ marginTop: 32 }}>
        <h2>How we make money</h2>
        <p>
          HealthMatchAI is free to use. Some outbound links — for example to telehealth platforms,
          prescription discount cards, or licensed insurance marketplaces — are advertising
          placements that may pay us a flat fee. Compensation never changes your risk level, your
          recommended care, or the order of safety information. Emergency and crisis results never
          show commercial content of any kind.
        </p>
      </div>

      <div className="content-section" style={{ marginTop: 32 }}>
        <h2>What we will not do</h2>
        <ul>
          <li>Diagnose conditions, prescribe medication, or provide treatment.</li>
          <li>Sell, broker, or recommend specific insurance plans.</li>
          <li>Delay anyone from emergency care — call 911 first, always.</li>
          <li>Trade your trust for a commission.</li>
        </ul>
      </div>

      <div className="panel disclaimer-box" style={{ marginTop: 40 }}>
        HealthMatchAI does not diagnose, prescribe, treat, or replace professional medical care.
        If you are experiencing a medical emergency, call 911 (US) or your local emergency services
        immediately. Questions? Reach us at support@healthmatchai.com.
      </div>
    </section>
  );
}
