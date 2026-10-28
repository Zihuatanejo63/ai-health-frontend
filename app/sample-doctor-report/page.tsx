import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sample Doctor-Ready Visit Summary | HealthMatchAI",
  description:
    "See a sample of HealthMatchAI's doctor-ready visit summary — a structured report that organizes your symptoms, history, and questions for your next appointment.",
  openGraph: {
    title: "Sample Doctor-Ready Visit Summary | HealthMatchAI",
    description:
      "Preview a structured, doctor-ready summary that helps you communicate clearly during medical appointments. Organizes symptoms, timeline, medications, and questions in one page.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sample Doctor-Ready Visit Summary | HealthMatchAI",
    description:
      "Preview a structured, doctor-ready summary for your next medical appointment.",
  },
};

export default function SampleDoctorReportPage() {
  return (
    <section className="app-page landing-page">
      <div className="hero-section">
        <p className="eyebrow">Sample Report</p>
        <h1>Doctor-Ready Visit Summary</h1>
        <p>
          Below is a sample of the structured summary HealthMatchAI generates to help you
          communicate clearly with your clinician. This is an educational example — your actual
          report will reflect the symptoms and history you provide.
        </p>
      </div>

      <div
        className="disclaimer-section"
        style={{
          background: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "8px",
          padding: "16px 20px",
          margin: "0 0 32px 0",
        }}
      >
        <strong>Educational Use Only:</strong> This sample report is for informational purposes.
        It is <strong>not a diagnosis</strong>, does not replace a licensed clinician, and should
        not be used as medical advice.{" "}
        <strong>
          If you are experiencing a medical emergency, call 911 (US) or your local emergency
          services immediately.
        </strong>
      </div>

      <div className="content-section">
        {/* Sample Report Card */}
        <div
          className="report-sample"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "32px",
            maxWidth: "780px",
            margin: "0 auto",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          {/* Header */}
          <div
            style={{
              borderBottom: "2px solid var(--primary)",
              paddingBottom: "16px",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--primary)",
                margin: "0 0 4px 0",
              }}
            >
              HealthMatchAI Visit Summary
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "14px", margin: 0 }}>
              Generated for your appointment &middot;{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Patient Summary */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
              Reason for Visit
            </h3>
            <p style={{ lineHeight: 1.7, color: "var(--text)" }}>
              Persistent headache with nausea over the past 4 days. Patient reports moderate to
              severe pain (6/10), worsening in the afternoon, located behind both eyes and at the
              temples. Over-the-counter ibuprofen provides partial relief for 2–3 hours.
            </p>
          </section>

          {/* Symptom Timeline */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
              Symptom Timeline
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "8px 4px", fontWeight: 600 }}>
                    Symptom
                  </th>
                  <th style={{ textAlign: "left", padding: "8px 4px", fontWeight: 600 }}>
                    Onset
                  </th>
                  <th style={{ textAlign: "left", padding: "8px 4px", fontWeight: 600 }}>
                    Frequency
                  </th>
                  <th style={{ textAlign: "left", padding: "8px 4px", fontWeight: 600 }}>
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "8px 4px" }}>Headache (bilateral, temples)</td>
                  <td style={{ padding: "8px 4px" }}>4 days ago</td>
                  <td style={{ padding: "8px 4px" }}>Daily, afternoon onset</td>
                  <td style={{ padding: "8px 4px" }}>6/10</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "8px 4px" }}>Nausea</td>
                  <td style={{ padding: "8px 4px" }}>3 days ago</td>
                  <td style={{ padding: "8px 4px" }}>Intermittent, with headache peaks</td>
                  <td style={{ padding: "8px 4px" }}>4/10</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "8px 4px" }}>Light sensitivity</td>
                  <td style={{ padding: "8px 4px" }}>2 days ago</td>
                  <td style={{ padding: "8px 4px" }}>Constant during headache</td>
                  <td style={{ padding: "8px 4px" }}>5/10</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* What Helps / What Worsens */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
              What Helps &amp; What Worsens
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <p style={{ fontWeight: 600, color: "#16a34a", margin: "0 0 4px 0" }}>
                  Helps
                </p>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--text)", lineHeight: 1.7 }}>
                  <li>Ibuprofen 400mg (temporary, ~2–3 hrs)</li>
                  <li>Dark, quiet room</li>
                  <li>Cold compress on forehead</li>
                  <li>Sleep</li>
                </ul>
              </div>
              <div>
                <p style={{ fontWeight: 600, color: "#dc2626", margin: "0 0 4px 0" }}>
                  Worsens
                </p>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--text)", lineHeight: 1.7 }}>
                  <li>Bright lights and screens</li>
                  <li>Loud noises</li>
                  <li>Physical activity</li>
                  <li>Missing meals</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Health Background */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
              Relevant Health Background
            </h3>
            <div
              style={{
                background: "var(--surface-blue)",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              <p style={{ margin: "0 0 4px 0" }}>
                <strong>Age:</strong> 34 &middot; <strong>Sex:</strong> Female
              </p>
              <p style={{ margin: "0 0 4px 0" }}>
                <strong>Allergies:</strong> Penicillin
              </p>
              <p style={{ margin: "0 0 4px 0" }}>
                <strong>Medications:</strong> Ibuprofen (as needed), Levothyroxine 50mcg daily
              </p>
              <p style={{ margin: "0 0 4px 0" }}>
                <strong>Chronic conditions:</strong> Hypothyroidism (managed)
              </p>
              <p style={{ margin: 0 }}>
                <strong>Relevant history:</strong> Occasional migraines in past (1–2 per year),
                but current episode is longer and more persistent than usual.
              </p>
            </div>
          </section>

          {/* Questions for the Doctor */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
              Questions to Ask Your Clinician
            </h3>
            <ol style={{ paddingLeft: "20px", color: "var(--text)", lineHeight: 1.8 }}>
              <li>Could these headaches be migraines, tension headaches, or something else?</li>
              <li>Is a preventive medication appropriate given the increasing frequency?</li>
              <li>Should I get imaging (CT or MRI) to rule out other causes?</li>
              <li>Are there lifestyle changes or triggers I should track?</li>
              <li>Is it safe to continue using ibuprofen at this frequency?</li>
            </ol>
          </section>

          {/* Care Recommendation */}
          <section style={{ marginBottom: "0" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
              HealthMatchAI Care Navigation Suggestion
            </h3>
            <div
              style={{
                background: "var(--surface-teal)",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "14px",
                lineHeight: 1.7,
                border: "1px solid var(--secondary)",
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>Recommended:</strong> Schedule a primary care visit within the next 3–5
                days. Your symptoms suggest a pattern that warrants clinical evaluation. This is
                an educational suggestion only — your clinician will determine the appropriate
                course of action.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom disclaimer */}
      <div
        style={{
          maxWidth: "780px",
          margin: "32px auto 0",
          padding: "16px 20px",
          background: "#f8fafc",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          fontSize: "13px",
          color: "var(--muted)",
          lineHeight: 1.6,
        }}
      >
        <strong>Reminder:</strong> HealthMatchAI is an educational tool that helps you prepare for
        medical appointments. It does <strong>not</strong> diagnose conditions, prescribe
        treatments, or replace professional medical judgment. Always consult a licensed clinician
        about your health concerns.{" "}
        <strong>
          If you have chest pain, difficulty breathing, sudden confusion, severe bleeding, or
          other emergency symptoms, call 911 or go to the nearest emergency department immediately.
        </strong>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Create Your Own Visit Summary</h2>
        <p style={{ color: "var(--muted)", maxWidth: "520px", margin: "0 auto 20px" }}>
          Answer a few questions about your symptoms, and HealthMatchAI will generate a structured
          summary you can bring to your appointment.
        </p>
        <a href="/symptom-check" className="btn-primary">
          Start Symptom Check &rarr;
        </a>
      </div>
    </section>
  );
}
