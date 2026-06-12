import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urgent Care or Primary Care | HealthMatchAI",
  description:
    "Not sure whether to visit urgent care or your primary care provider? Learn the differences, typical costs, and when each option makes sense.",
  openGraph: {
    title: "Urgent Care or Primary Care: How to Decide | HealthMatchAI",
    description:
      "Understand the key differences between urgent care and primary care so you can make an informed choice about where to seek treatment.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Urgent Care or Primary Care: How to Decide | HealthMatchAI",
    description:
      "Understand the key differences between urgent care and primary care so you can make an informed choice about where to seek treatment.",
  },
};

export default function UrgentOrPrimaryCarePage() {
  return (
    <section className="app-page landing-page">

      {/* Hero */}
      <div className="hero-section">
        <h1>Urgent Care or Primary Care: How to Decide</h1>
        <p>
          Learn the differences between urgent care centers and primary care offices so you can
          choose the right setting for your situation and avoid unnecessary costs.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="panel disclaimer-box" style={{ marginTop: 24 }}>
        <strong>Educational purposes only.</strong> This page explains general differences between
        care settings. It does not tell you where you must go. Your decision should be guided by
        your specific symptoms, your clinician&apos;s advice, and your personal circumstances.
        <br />
        <strong style={{ color: "var(--danger)" }}>
          If you are experiencing a medical emergency, call 911 (US) or your local emergency
          services immediately.
        </strong>
      </div>

      {/* Understanding the Two Options */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Understanding Your Care Options</h2>
        <p>
          When you have a health concern that is not a life-threatening emergency, you typically
          face two main choices: visit your primary care provider (PCP) or go to an urgent care
          center. Each setting serves a different purpose, operates on a different schedule, and
          comes with different costs. Knowing the difference can save you time, money, and
          frustration.
        </p>
        <p>
          HealthMatchAI helps by giving you a structured way to assess your symptoms first so you
          have a clearer sense of what level of care may be appropriate. It does not make the
          decision for you, but it gives you organized information to discuss with your provider or
          use when weighing your options.
        </p>
      </div>

      {/* Primary Care */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Primary Care: Ongoing Relationship, Whole-Person Focus</h2>
        <p>
          A primary care provider is a doctor, nurse practitioner, or physician assistant whom you
          see regularly for preventive care, chronic condition management, and non-urgent health
          issues. Primary care is built around a long-term relationship: your PCP knows your medical
          history, your medications, your risk factors, and your personal health goals.
        </p>
        <p>Primary care is typically the best choice when:</p>
        <ul>
          <li>You need a routine check-up, physical, or wellness visit.</li>
          <li>You have a chronic condition like diabetes, high blood pressure, or asthma that needs regular monitoring.</li>
          <li>You have mild symptoms that have been present for several days and are not worsening rapidly.</li>
          <li>You need medication refills, lab work, or referrals to specialists.</li>
          <li>You want continuity of care from someone who knows your full history.</li>
        </ul>
        <p>
          Primary care visits are usually scheduled in advance during regular business hours. Same-day
          appointments can be hard to get, especially with a specific provider. Costs are generally
          lower than urgent care visits, especially when you have insurance with a reasonable copay.
        </p>
      </div>

      {/* Urgent Care */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Urgent Care: Walk-In Convenience for Non-Emergency Needs</h2>
        <p>
          Urgent care centers fill the gap between primary care and the emergency room. They are
          designed for problems that need attention within 24 hours but are not life-threatening.
          Most urgent care centers accept walk-ins, offer extended evening and weekend hours, and can
          handle a wide range of common illnesses and injuries.
        </p>
        <p>Urgent care may be appropriate when:</p>
        <ul>
          <li>You have a non-life-threatening issue that cannot wait for a primary care appointment.</li>
          <li>You need care outside of regular business hours or on weekends.</li>
          <li>You have a minor injury like a sprain, strain, small cut, or minor burn.</li>
          <li>You have symptoms of a common infection (urinary tract, sinus, ear) that need prompt evaluation.</li>
          <li>You need basic lab tests, X-rays, or stitches on a walk-in basis.</li>
          <li>You do not have an established relationship with a primary care provider.</li>
        </ul>
        <p>
          Urgent care visits typically cost more than a primary care copay but far less than an
          emergency room visit. Wait times are generally shorter than the ER, and many centers
          publish estimated wait times online.
        </p>
      </div>

      {/* Key Differences */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Key Differences at a Glance</h2>
        <div style={{ display: "grid", gap: 16 }}>
          <div className="panel" style={{ padding: 18 }}>
            <h3>Continuity of Care</h3>
            <p>
              <strong>Primary care:</strong> Your PCP knows your history and follows you over time.
            </p>
            <p>
              <strong>Urgent care:</strong> You will likely see a provider who does not know your
              history. Bring relevant information with you.
            </p>
          </div>
          <div className="panel" style={{ padding: 18 }}>
            <h3>Availability</h3>
            <p>
              <strong>Primary care:</strong> Typically weekday business hours. Appointments may take
              days or weeks.
            </p>
            <p>
              <strong>Urgent care:</strong> Extended hours including evenings and weekends. Walk-ins
              welcome.
            </p>
          </div>
          <div className="panel" style={{ padding: 18 }}>
            <h3>Cost</h3>
            <p>
              <strong>Primary care:</strong> Usually the lowest out-of-pocket cost with insurance. A
              typical copay in the US ranges from $15 to $40.
            </p>
            <p>
              <strong>Urgent care:</strong> Higher than primary care but much lower than the ER. A
              typical copay ranges from $35 to $75, and visits without insurance may range from
              $100 to $200.
            </p>
          </div>
          <div className="panel" style={{ padding: 18 }}>
            <h3>Scope of Services</h3>
            <p>
              <strong>Primary care:</strong> Preventive care, chronic disease management, referrals,
              routine labs, vaccinations, and medication management.
            </p>
            <p>
              <strong>Urgent care:</strong> Acute illness and injury treatment, on-site X-rays,
              lab tests, stitches, splinting, and IV fluids for dehydration.
            </p>
          </div>
        </div>
      </div>

      {/* When NOT to Use Either */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>When Neither Option Is Appropriate</h2>
        <p>
          Certain symptoms require immediate evaluation in an emergency department. Do not try to
          decide between primary care and urgent care if you or someone near you is experiencing:
        </p>
        <ul>
          <li>Difficulty breathing or shortness of breath that is severe or worsening.</li>
          <li>Chest pain, pressure, or a squeezing sensation, especially with sweating or nausea.</li>
          <li>Sudden weakness or numbness, especially on one side of the body.</li>
          <li>Sudden confusion, difficulty speaking, or trouble understanding speech.</li>
          <li>Severe bleeding that does not stop with direct pressure.</li>
          <li>Loss of consciousness, even if brief.</li>
          <li>Severe burns, deep wounds, or major fractures.</li>
          <li>Thoughts of harming yourself or someone else.</li>
        </ul>
        <p>
          If any of these apply, call 911 (US) or your local emergency number immediately. Do not
          drive yourself to the hospital if you are in serious distress.
        </p>
      </div>

      {/* FAQ */}
      <div className="faq-section" style={{ marginTop: 48 }}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details>
            <summary>Can I go to urgent care if I don&apos;t have insurance?</summary>
            <p>
              Yes. Urgent care centers treat patients regardless of insurance status. Many offer
              self-pay rates that are published in advance. It is a good idea to call ahead and ask
              about the estimated cost for an uninsured visit. HealthMatchAI&apos;s insurance
              guidance section also provides questions to ask before you go.
            </p>
          </details>
          <details>
            <summary>Will urgent care send records to my primary care doctor?</summary>
            <p>
              Many urgent care centers can forward a visit summary to your primary care provider
              with your permission. Ask the front-desk staff or provider to send the records, and
              provide your PCP&apos;s name and office contact information. It is also wise to bring a
              copy of your HealthMatchAI summary so you can share it yourself.
            </p>
          </details>
          <details>
            <summary>Can urgent care prescribe medication?</summary>
            <p>
              Yes. Urgent care providers can prescribe medications for acute conditions. However,
              they are unlikely to prescribe long-term controlled substances or manage complex
              chronic medication regimens. Those are better handled by a primary care provider or
              specialist who knows your full history.
            </p>
          </details>
          <details>
            <summary>Is a telehealth visit a third option?</summary>
            <p>
              Yes. Many primary care practices and standalone telehealth companies now offer virtual
              visits for certain conditions. Telehealth can be a good middle ground when you need
              timely advice but do not require a physical exam. HealthMatchAI&apos;s doctor-ready
              summary is especially helpful for telehealth visits.
            </p>
          </details>
          <details>
            <summary>What if I go to urgent care and they send me to the ER?</summary>
            <p>
              This happens when the urgent care provider determines your condition is more serious
              than their facility can handle. If this occurs, follow their guidance. They may
              arrange transport or direct you to the nearest emergency department. Your
              HealthMatchAI summary can help you communicate what has already been evaluated.
            </p>
          </details>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{ marginTop: 48, textAlign: "center" }}>
        <h2>Start with a Symptom Check to Clarify Your Next Step</h2>
        <p>
          Use HealthMatchAI&apos;s structured symptom checker to organize your symptoms and get a
          clearer picture before deciding where to go.
        </p>
        <a href="/symptom-check" className="btn-primary">
          Start Symptom Check
        </a>
      </div>

    </section>
  );
}
