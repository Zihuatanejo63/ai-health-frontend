import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cough Symptom Checklist | HealthMatchAI",
  description:
    "A structured checklist to help you track cough symptoms, duration, triggers, and associated signs. Know what to tell your doctor about your cough.",
  openGraph: {
    title: "Cough Symptom Checklist | HealthMatchAI",
    description:
      "Track your cough symptoms systematically. Learn when a cough warrants medical attention and how to describe it clearly to your healthcare provider.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cough Symptom Checklist | HealthMatchAI",
    description:
      "Track your cough symptoms systematically. Learn when a cough warrants medical attention and how to describe it clearly to your healthcare provider.",
  },
};

export default function CoughSymptomChecklistPage() {
  return (
    <section className="app-page landing-page">

      {/* Hero */}
      <div className="hero-section">
        <h1>Cough Symptom Checklist</h1>
        <p>
          A practical guide to tracking cough symptoms, understanding possible causes, and
          preparing a clear description for your healthcare provider.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="panel disclaimer-box" style={{ marginTop: 24 }}>
        <strong>Educational purposes only.</strong> This checklist is a self-assessment and
        communication tool. It does not diagnose the cause of a cough and does not provide medical
        advice. A cough can be a symptom of many conditions, from allergies and mild infections to
        chronic lung disease or heart problems. Only a licensed clinician can determine the cause
        and recommend appropriate treatment.
        <br />
        <strong style={{ color: "var(--danger)" }}>
          If you are coughing up blood, have severe difficulty breathing, have blue or gray lips or
          face, or feel like your airway is closing, seek emergency medical attention immediately.
          Call 911 (US) or your local emergency services.
        </strong>
      </div>

      {/* Understanding Cough Types */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Understanding Your Cough</h2>
        <p>
          A cough is a reflex that clears your airways of irritants, mucus, and foreign particles.
          While annoying, a cough serves a protective function. However, the characteristics of your
          cough -- when it started, what it sounds like, what triggers it, and what other symptoms
          accompany it -- provide important clues that help a clinician identify the underlying
          cause.
        </p>
        <p>Coughs are generally categorized by duration:</p>
        <ul>
          <li>
            <strong>Acute cough:</strong> Lasts less than three weeks. Often caused by viral
            respiratory infections such as the common cold, influenza, or COVID-19.
          </li>
          <li>
            <strong>Subacute cough:</strong> Lasts three to eight weeks. May follow an infection
            that has otherwise resolved (post-infectious cough) or be triggered by persistent
            irritation.
          </li>
          <li>
            <strong>Chronic cough:</strong> Lasts more than eight weeks. May be related to asthma,
            allergies, acid reflux (GERD), chronic bronchitis, certain medications, or other
            underlying conditions requiring medical evaluation.
          </li>
        </ul>
        <p>
          The type of cough also matters. A dry, hacking cough feels different from a wet,
          productive cough that brings up mucus. A cough that worsens at night, after eating, or
          during exercise each points in different directions clinically.
        </p>
      </div>

      {/* Symptom Tracking Checklist */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Cough Symptom Tracking Checklist</h2>
        <p>
          Use this checklist to organize what you know about your cough before speaking with a
          healthcare provider. Being able to answer these questions clearly makes your appointment
          more productive.
        </p>
        <ul>
          <li>
            <strong>Type of cough.</strong> Is it dry and tickly, or wet and productive? If
            productive, what color is the mucus (clear, white, yellow, green, brown, or
            blood-tinged)?
          </li>
          <li>
            <strong>Duration.</strong> When did the cough start? Has it lasted less than 24 hours,
            1 to 3 days, 4 to 7 days, 1 to 3 weeks, or longer than 3 weeks?
          </li>
          <li>
            <strong>Triggers.</strong> Does anything make the cough start or worsen? Consider
            exercise, cold air, lying down, eating, talking, exposure to dust or smoke, or being
            near animals.
          </li>
          <li>
            <strong>Timing.</strong> Is the cough worse at a particular time of day, such as early
            morning or at night when lying down?
          </li>
          <li>
            <strong>Associated symptoms.</strong> Are you also experiencing fever, chills, sore
            throat, runny nose, nasal congestion, shortness of breath, wheezing, chest pain or
            tightness, fatigue, body aches, or heartburn?
          </li>
          <li>
            <strong>Severity and impact.</strong> Does the cough wake you up at night? Does it
            interfere with work or daily activities? Does it cause chest pain, headaches, or
            vomiting?
          </li>
          <li>
            <strong>What you have tried.</strong> Have you taken any over-the-counter cough
            medicine, antihistamines, inhalers, or home remedies? Did anything help?
          </li>
          <li>
            <strong>Relevant history.</strong> Do you smoke or vape? Do you have a history of
            asthma, allergies, acid reflux, or chronic lung disease? Have you recently traveled or
            been exposed to anyone with a known respiratory illness?
          </li>
        </ul>
      </div>

      {/* When to Seek Care */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>When to Seek Medical Care for a Cough</h2>
        <p>
          Many coughs resolve with rest, hydration, and time. However, seek medical attention if:
        </p>
        <ul>
          <li>Your cough has lasted more than three weeks without improvement.</li>
          <li>You are coughing up blood or rust-colored mucus.</li>
          <li>You have a fever above 101 degrees Fahrenheit (38.3 degrees Celsius) for more than 3 days.</li>
          <li>You experience shortness of breath or wheezing that is new or worsening.</li>
          <li>You have chest pain when coughing or breathing deeply.</li>
          <li>You feel like you cannot catch your breath, even at rest.</li>
          <li>You have unexplained weight loss along with a chronic cough.</li>
          <li>You have a weakened immune system due to medication or a medical condition.</li>
        </ul>
        <p>
          For children, seek care if the cough is accompanied by labored breathing, high fever,
          inability to eat or drink, or signs of dehydration. Infants under 3 months with a cough
          should be evaluated promptly.
        </p>
      </div>

      {/* How HealthMatchAI Helps */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>How HealthMatchAI Helps with Cough Concerns</h2>
        <p>
          HealthMatchAI&apos;s symptom checker includes cough as a primary symptom within the
          breathing and respiratory category. When you select cough, the tool guides you through:
        </p>
        <ul>
          <li>Detailed questions about cough type, duration, triggers, and timing.</li>
          <li>Associated respiratory symptoms such as shortness of breath, wheezing, and chest tightness.</li>
          <li>Red-flag screening for serious conditions like pneumonia, pulmonary embolism, or airway obstruction.</li>
          <li>Assessment of how the cough affects your sleep, work, and daily activities.</li>
          <li>A structured summary you can share with your primary care provider, urgent care, or pulmonologist.</li>
        </ul>
        <p>
          The tool does not diagnose the cause of your cough. It organizes your observations so your
          clinician can assess the situation more efficiently.
        </p>
      </div>

      {/* FAQ */}
      <div className="faq-section" style={{ marginTop: 48 }}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details>
            <summary>When does a cough become an emergency?</summary>
            <p>
              A cough becomes an emergency when accompanied by severe difficulty breathing,
              coughing up significant amounts of blood, blue or gray discoloration of the lips or
              face, confusion, or a sensation that your throat is closing. Any of these signs
              warrant an immediate call to 911 or a visit to the nearest emergency department.
            </p>
          </details>
          <details>
            <summary>Should I suppress my cough with medicine?</summary>
            <p>
              It depends on the cause and type of cough. A productive cough that clears mucus is
              serving a purpose and should not always be suppressed. A dry, irritating cough that
              prevents sleep may benefit from a suppressant. Ask your pharmacist or clinician before
              using cough medicine, especially if you have other health conditions or take other
              medications.
            </p>
          </details>
          <details>
            <summary>Why does my cough get worse at night?</summary>
            <p>
              Nighttime coughing can have several causes: postnasal drip from allergies or sinus
              issues pooling in the throat when lying down, acid reflux triggered by a horizontal
              position, or asthma that is often worse at night. Propping yourself up with pillows
              and avoiding eating within a few hours of bedtime may help. Mention this pattern to
              your clinician, as it is a useful diagnostic clue.
            </p>
          </details>
          <details>
            <summary>Can a cough last for weeks after a cold is gone?</summary>
            <p>
              Yes. A post-infectious cough can persist for several weeks after the initial viral
              illness has resolved. This is often due to lingering airway inflammation. However, a
              cough lasting more than eight weeks should be evaluated by a clinician to rule out
              other causes such as asthma, allergies, or reflux.
            </p>
          </details>
          <details>
            <summary>Can HealthMatchAI tell me if my cough is from allergies or an infection?</summary>
            <p>
              No. HealthMatchAI cannot determine the cause of a cough. Distinguishing between
              allergic, infectious, and other causes often requires a physical exam and possibly
              tests. Use the tool to organize your information, then share it with a licensed
              clinician who can make a proper assessment.
            </p>
          </details>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{ marginTop: 48, textAlign: "center" }}>
        <h2>Track Your Cough Symptoms with Structure</h2>
        <p>
          Use HealthMatchAI to organize your cough-related symptoms and generate a shareable summary
          before your next medical visit.
        </p>
        <a href="/symptom-check" className="btn-primary">
          Start Symptom Check
        </a>
      </div>

    
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"When does a cough become an emergency?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"A cough becomes an emergency when accompanied by severe difficulty breathing, coughing up significant amounts of blood, blue or gray discoloration of the lips or face, confusion, or a sensation that your throat is closing. Any of these signs warrant an immediate call to 911 or a visit to the nearest emergency department.\"}}, {\"@type\": \"Question\", \"name\": \"Should I suppress my cough with medicine?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"It depends on the cause and type of cough. A productive cough that clears mucus is serving a purpose and should not always be suppressed. A dry, irritating cough that prevents sleep may benefit from a suppressant. Ask your pharmacist or clinician before using cough medicine, especially if you have other health conditions or take other medications.\"}}, {\"@type\": \"Question\", \"name\": \"Why does my cough get worse at night?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Nighttime coughing can have several causes: postnasal drip from allergies or sinus issues pooling in the throat when lying down, acid reflux triggered by a horizontal position, or asthma that is often worse at night. Propping yourself up with pillows and avoiding eating within a few hours of bedtime may help. Mention this pattern to your clinician, as it is a useful diagnostic clue.\"}}, {\"@type\": \"Question\", \"name\": \"Can a cough last for weeks after a cold is gone?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Yes. A post-infectious cough can persist for several weeks after the initial viral illness has resolved. This is often due to lingering airway inflammation. However, a cough lasting more than eight weeks should be evaluated by a clinician to rule out other causes such as asthma, allergies, or reflux.\"}}, {\"@type\": \"Question\", \"name\": \"Can HealthMatchAI tell me if my cough is from allergies or an infection?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"No. HealthMatchAI cannot determine the cause of a cough. Distinguishing between allergic, infectious, and other causes often requires a physical exam and possibly tests. Use the tool to organize your information, then share it with a licensed clinician who can make a proper assessment.\"}}]}" }}
      />
    </section>
  );
}
