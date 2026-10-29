import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Symptom Checker | HealthMatchAI",
  description:
    "Use HealthMatchAI's structured symptom checker to organize your symptoms, understand possible care levels, and prepare a clear summary before you see a clinician. Not a diagnosis tool.",
  openGraph: {
    title: "AI Symptom Checker | HealthMatchAI",
    description:
      "A structured, step-by-step tool to help you organize symptoms, compare care options, and walk into your appointment with a doctor-ready summary.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Symptom Checker | HealthMatchAI",
    description:
      "A structured, step-by-step tool to help you organize symptoms, compare care options, and walk into your appointment with a doctor-ready summary.",
  },
};

export default function AISymptomCheckerPage() {
  return (
    <section className="app-page landing-page">

      {/* Hero */}
      <div className="hero-section">
        <h1>AI Symptom Checker</h1>
        <p>
          Organize your symptoms step by step, understand what level of care may be appropriate, and
          generate a clear summary you can share with a licensed clinician.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="panel disclaimer-box" style={{ marginTop: 24 }}>
        <strong>Educational purposes only.</strong> HealthMatchAI&apos;s symptom checker is not a
        diagnosis tool and does not provide medical advice. It does not replace a doctor, nurse
        practitioner, or any licensed healthcare professional. Always consult a qualified clinician
        about your symptoms.
        <br />
        <strong style={{ color: "var(--danger)" }}>
          If you are experiencing a medical emergency, call 911 (US) or your local emergency
          services immediately.
        </strong>
      </div>

      {/* What Is an AI Symptom Checker */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>What Is an AI Symptom Checker?</h2>
        <p>
          An AI symptom checker is a guided tool that walks you through a series of questions about
          what you are feeling, how long it has been going on, and whether anything makes it better
          or worse. Unlike a simple web search that can return alarming or irrelevant results,
          HealthMatchAI follows a structured clinical framework to help you organize what you know
          about your body into a coherent picture.
        </p>
        <p>
          HealthMatchAI is designed as a preparation and navigation aid. It does not tell you what
          disease you have, prescribe medication, or decide whether you need emergency care. Instead,
          it gives you language to describe your symptoms clearly, maps them to possible care
          settings, and produces a summary you can hand to a doctor, nurse, or telehealth provider.
        </p>
      </div>

      {/* How HealthMatchAI Helps */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>How HealthMatchAI&apos;s Symptom Checker Works</h2>
        <p>
          The HealthMatchAI symptom checker is organized into a sequence of focused steps.
        </p>
        <ul>
          <li>
            <strong>Step 1 &mdash; Choose your main concern.</strong> Select the area or issue that
            worries you most: fever, breathing trouble, chest pain, abdominal pain, neurological
            symptoms, skin issues, urinary concerns, mental health, or general unwellness.
          </li>
          <li>
            <strong>Step 2 &mdash; Add associated symptoms.</strong> Pick from a list of related
            symptoms. You also mark which one is your primary symptom so the follow-up questions
            stay relevant.
          </li>
          <li>
            <strong>Step 3 &mdash; Answer tailored questions.</strong> Based on your primary
            symptom, HealthMatchAI asks specific questions about timing, triggers, quality, and
            associated factors.
          </li>
          <li>
            <strong>Step 4 &mdash; Describe duration, trend, and severity.</strong> How long has
            it lasted? Is it getting better or worse? Rate your pain and note how it affects daily
            function.
          </li>
          <li>
            <strong>Step 5 &mdash; Check red-flag warnings.</strong> Review a list of serious signs
            (such as difficulty breathing, altered consciousness, or severe pain) so you have a
            safety check before moving on.
          </li>
          <li>
            <strong>Step 6 &mdash; Share health background.</strong> Add relevant history like age,
            chronic conditions, medications, allergies, and insurance status to give the full picture.
          </li>
          <li>
            <strong>Step 7 &mdash; Review and generate your summary.</strong> Confirm your inputs
            and get a structured report with a risk-level indication and a recommended care
            direction.
          </li>
        </ul>
        <p>
          At the end, you receive a doctor-ready summary that includes your organized symptoms,
          timeline, severity markers, and any red flags you flagged. You can take this with you to
          an appointment or share it during a telehealth visit.
        </p>
      </div>

      {/* What to Expect */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>What to Expect After Your Symptom Check</h2>
        <p>
          After completing the symptom checker, HealthMatchAI provides:
        </p>
        <ul>
          <li>
            <strong>A risk-level indication</strong> (Low, Moderate, High, or Emergency/Crisis)
            based on the combination of symptoms, red-flag items, and health background you entered.
          </li>
          <li>
            <strong>A recommended care setting</strong> such as self-care at home, a primary care
            visit, an urgent care center, or an emergency department. This recommendation is
            informational, not a medical order.
          </li>
          <li>
            <strong>A structured written summary</strong> formatted for sharing. It lists your
            primary symptom, associated symptoms, duration, severity, relevant health background,
            and any red-flag indicators in clear language.
          </li>
          <li>
            <strong>Care-option navigation.</strong> You can explore what each level of care
            typically offers, estimated costs, and questions to ask about insurance coverage before
            you go.
          </li>
        </ul>
      </div>

      {/* Why People Use a Symptom Checker First */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Why Use a Symptom Checker Before Seeing a Doctor?</h2>
        <p>
          Many people feel uncertain about whether to wait at home, schedule a primary care
          appointment, or go to urgent care. This uncertainty can lead to delayed care when
          something needs attention, or unnecessary emergency visits when a lower-acuity setting
          would be more appropriate and affordable.
        </p>
        <p>
          A structured symptom checker helps by:
        </p>
        <ul>
          <li>Reducing anxiety from vague, incomplete online searches.</li>
          <li>Giving you organized information to discuss with your provider.</li>
          <li>Helping you recognize red-flag symptoms that deserve faster attention.</li>
          <li>Making your in-person or telehealth visit shorter and more productive.</li>
        </ul>
        <p>
          Remember: the tool is a preparation aid. Only a licensed clinician can evaluate you in
          person, order tests, make a diagnosis, and recommend treatment.
        </p>
      </div>

      {/* FAQ */}
      <div className="faq-section" style={{ marginTop: 48 }}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details>
            <summary>Is the AI symptom checker a diagnostic tool?</summary>
            <p>
              No. HealthMatchAI does not diagnose any condition. It helps you organize symptoms
              and provides educational guidance about care levels. Diagnosis requires a licensed
              healthcare professional who can take a full history, perform a physical exam, and
              order tests if needed.
            </p>
          </details>
          <details>
            <summary>Can I use HealthMatchAI instead of going to the doctor?</summary>
            <p>
              No. HealthMatchAI is designed to help you prepare for a doctor visit, not replace one.
              If you have concerning symptoms, you should see a licensed clinician. This tool is
              especially useful for getting your thoughts organized before that visit.
            </p>
          </details>
          <details>
            <summary>What happens if the checker tells me to go to the emergency room?</summary>
            <p>
              If your inputs produce a high-risk or emergency indication, take it seriously as a
              prompt to seek in-person evaluation. The recommendation is based on the data you
              entered and known clinical warning signs, but only a qualified professional can
              determine the actual urgency of your situation.
            </p>
          </details>
          <details>
            <summary>Is my health information kept private?</summary>
            <p>
              HealthMatchAI takes data privacy seriously. Your symptom check data is stored locally
              in your browser session and is not sold or shared with third parties. Review our
              privacy policy for full details on how your information is handled.
            </p>
          </details>
          <details>
            <summary>Does the symptom checker cover mental health concerns?</summary>
            <p>
              Yes. The checker includes a mental health and emotional wellness category. If you
              indicate thoughts of self-harm, suicide, or immediate danger, the tool will display
              crisis resources and strongly encourage you to seek immediate professional help or
              call a crisis line. HealthMatchAI is not a crisis service.
            </p>
          </details>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{ marginTop: 48, textAlign: "center" }}>
        <h2>Ready to Organize Your Symptoms?</h2>
        <p>
          Start a structured symptom check in minutes and walk into your next appointment with
          clarity and confidence.
        </p>
        <a href="/symptom-check" className="btn-primary">
          Start Symptom Check
        </a>
      </div>

    
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Is the AI symptom checker a diagnostic tool?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"No. HealthMatchAI does not diagnose any condition. It helps you organize symptoms and provides educational guidance about care levels. Diagnosis requires a licensed healthcare professional who can take a full history, perform a physical exam, and order tests if needed.\"}}, {\"@type\": \"Question\", \"name\": \"Can I use HealthMatchAI instead of going to the doctor?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"No. HealthMatchAI is designed to help you prepare for a doctor visit, not replace one. If you have concerning symptoms, you should see a licensed clinician. This tool is especially useful for getting your thoughts organized before that visit.\"}}, {\"@type\": \"Question\", \"name\": \"What happens if the checker tells me to go to the emergency room?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"If your inputs produce a high-risk or emergency indication, take it seriously as a prompt to seek in-person evaluation. The recommendation is based on the data you entered and known clinical warning signs, but only a qualified professional can determine the actual urgency of your situation.\"}}, {\"@type\": \"Question\", \"name\": \"Is my health information kept private?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"HealthMatchAI takes data privacy seriously. Your symptom check data is stored locally in your browser session and is not sold or shared with third parties. Review our privacy policy for full details on how your information is handled.\"}}, {\"@type\": \"Question\", \"name\": \"Does the symptom checker cover mental health concerns?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Yes. The checker includes a mental health and emotional wellness category. If you indicate thoughts of self-harm, suicide, or immediate danger, the tool will display crisis resources and strongly encourage you to seek immediate professional help or call a crisis line. HealthMatchAI is not a crisis service.\"}}]}" }}
      />
    </section>
  );
}
