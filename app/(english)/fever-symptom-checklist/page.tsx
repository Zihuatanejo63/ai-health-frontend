import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fever Symptom Checklist | HealthMatchAI",
  description:
    "A structured checklist to help you track fever symptoms, duration, severity, and associated signs. Use this guide before visiting your doctor or urgent care.",
  openGraph: {
    title: "Fever Symptom Checklist | HealthMatchAI",
    description:
      "Track your fever symptoms systematically. Know what to tell your doctor about fever duration, severity, and associated red-flag signs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fever Symptom Checklist | HealthMatchAI",
    description:
      "Track your fever symptoms systematically. Know what to tell your doctor about fever duration, severity, and associated red-flag signs.",
  },
};

export default function FeverSymptomChecklistPage() {
  return (
    <section className="app-page landing-page">

      {/* Hero */}
      <div className="hero-section">
        <h1>Fever Symptom Checklist</h1>
        <p>
          A practical guide to tracking fever symptoms, understanding when to seek care, and
          preparing a clear summary for your healthcare provider.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="panel disclaimer-box" style={{ marginTop: 24 }}>
        <strong>Educational purposes only.</strong> This checklist is a self-assessment and
        communication tool. It is not a diagnosis tool and does not provide medical advice. Fever
        can be a sign of many conditions, from mild viral infections to serious bacterial illnesses.
        Only a licensed clinician can evaluate the cause and recommend treatment.
        <br />
        <strong style={{ color: "var(--danger)" }}>
          If you or someone you are caring for has a fever above 104 degrees Fahrenheit (40 degrees
          Celsius), a fever lasting more than three days, a fever with a stiff neck, confusion,
          difficulty breathing, or a seizure, seek emergency medical attention immediately. Call 911
          (US) or your local emergency services.
        </strong>
      </div>

      {/* What Is a Fever */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>What Counts as a Fever?</h2>
        <p>
          A fever is a temporary rise in body temperature, usually a sign that your body is fighting
          an infection. In adults, a temperature of 100.4 degrees Fahrenheit (38 degrees Celsius) or
          higher measured orally is generally considered a fever. Normal body temperature varies by
          person, time of day, and measurement method, but it typically hovers around 98.6 degrees
          Fahrenheit (37 degrees Celsius).
        </p>
        <p>Fever itself is a symptom, not a disease. It is your body&apos;s natural defense mechanism.
          The underlying cause could range from a mild cold to something requiring prompt medical
          attention. That is why tracking additional details beyond the thermometer number is so
          important.
        </p>
      </div>

      {/* Symptom Tracking Checklist */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Symptom Tracking Checklist for Fever</h2>
        <p>
          Use this checklist to organize information before you call a doctor, visit an urgent care
          center, or complete a symptom check with HealthMatchAI. Being able to answer these
          questions clearly helps your clinician assess the situation faster.
        </p>
        <ul>
          <li>
            <strong>Temperature reading.</strong> What is your current temperature, and how did you
            measure it (oral, ear, forehead, underarm, rectal)?
          </li>
          <li>
            <strong>Highest temperature.</strong> What has been the highest reading, and when did
            it occur?
          </li>
          <li>
            <strong>Duration.</strong> When did the fever start? Has it been less than 24 hours, 1
            to 3 days, 4 to 7 days, or longer?
          </li>
          <li>
            <strong>Pattern.</strong> Is the fever constant, or does it come and go? Does it spike
            at certain times of day?
          </li>
          <li>
            <strong>Response to medication.</strong> Have you taken acetaminophen, ibuprofen, or
            another fever reducer? Did it bring the temperature down?
          </li>
          <li>
            <strong>Associated symptoms.</strong> Are you also experiencing chills, sweats, cough,
            sore throat, runny nose, body aches, headache, fatigue, rash, nausea, vomiting,
            diarrhea, or abdominal pain?
          </li>
          <li>
            <strong>Hydration status.</strong> Are you drinking fluids? Are you urinating normally?
            Dry mouth, dark urine, or very little urine can indicate dehydration.
          </li>
          <li>
            <strong>Recent exposures.</strong> Have you been in contact with anyone who is sick?
            Have you traveled recently? Have you been in areas with known infectious disease
            outbreaks?
          </li>
        </ul>
      </div>

      {/* When to Seek Care */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>When to Seek Medical Care for a Fever</h2>
        <p>
          Many fevers resolve on their own with rest and fluids. However, certain situations call
          for medical attention. Contact your healthcare provider or visit an urgent care center if:
        </p>
        <ul>
          <li>Your fever is 103 degrees Fahrenheit (39.4 degrees Celsius) or higher in an adult.</li>
          <li>Your fever has lasted more than three days without improvement.</li>
          <li>You have a fever along with a severe headache, stiff neck, or sensitivity to light.</li>
          <li>You have a fever with confusion, irritability, or extreme lethargy.</li>
          <li>You have a fever with a new rash, especially one that does not fade when pressed.</li>
          <li>You have a fever with difficulty breathing or chest pain.</li>
          <li>You have a fever and are unable to keep fluids down.</li>
          <li>You have a fever and a weakened immune system due to medication or a medical condition.</li>
          <li>You have recently traveled to an area with known infectious disease concerns.</li>
        </ul>
        <p>
          For infants and young children, fever thresholds and warning signs are different. Infants
          under 3 months with any fever should be evaluated promptly. Consult your pediatrician for
          age-specific guidance.
        </p>
      </div>

      {/* How HealthMatchAI Helps */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>How HealthMatchAI Helps with Fever Concerns</h2>
        <p>
          HealthMatchAI&apos;s symptom checker includes fever as a primary concern category. When you
          select fever as your main symptom, the tool walks you through:
        </p>
        <ul>
          <li>Associated symptoms such as cough, sore throat, chills, fatigue, and body aches.</li>
          <li>Detailed questions about fever patterns, duration, and response to medication.</li>
          <li>Red-flag screening for serious conditions like meningitis, sepsis, or pneumonia.</li>
          <li>Severity assessment including how the fever affects your daily function.</li>
          <li>A structured summary you can share with your doctor or urgent care provider.</li>
        </ul>
        <p>
          The tool does not diagnose the cause of your fever. It helps you get your information in
          order so your clinician can make an informed assessment more efficiently.
        </p>
      </div>

      {/* FAQ */}
      <div className="faq-section" style={{ marginTop: 48 }}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details>
            <summary>At what temperature should an adult go to the emergency room?</summary>
            <p>
              A temperature of 104 degrees Fahrenheit (40 degrees Celsius) or higher warrants
              emergency evaluation, especially if accompanied by confusion, stiff neck, difficulty
              breathing, or an inability to keep fluids down. However, a lower fever with severe
              symptoms can also be an emergency. Trust your instincts and err on the side of
              caution.
            </p>
          </details>
          <details>
            <summary>Is it safe to alternate acetaminophen and ibuprofen for fever?</summary>
            <p>
              Some clinicians recommend alternating acetaminophen and ibuprofen for high fevers,
              but this should only be done under the guidance of a healthcare professional.
              Incorrect dosing or timing can lead to accidental overdose or side effects. Ask your
              doctor or pharmacist before combining or alternating medications.
            </p>
          </details>
          <details>
            <summary>Why does my fever come back after the medicine wears off?</summary>
            <p>
              Fever reducers lower your temperature temporarily but do not treat the underlying
              cause of the fever. When the medication wears off, your temperature may rise again if
              your body is still fighting an infection. This is normal. Focus on rest, hydration,
              and monitoring for worsening symptoms.
            </p>
          </details>
          <details>
            <summary>Should I go to work with a fever?</summary>
            <p>
              If you have a fever, you are likely contagious and should stay home to rest and avoid
              spreading illness to others. Most public health guidelines recommend staying home
              until you have been fever-free (without medication) for at least 24 hours.
            </p>
          </details>
          <details>
            <summary>Can HealthMatchAI tell me if my fever is from a virus or bacteria?</summary>
            <p>
              No. HealthMatchAI cannot determine the cause of a fever. Distinguishing between viral
              and bacterial infections often requires lab tests and a physical exam by a licensed
              clinician. Use the tool to organize your symptoms, then consult a healthcare provider
              for a proper evaluation.
            </p>
          </details>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{ marginTop: 48, textAlign: "center" }}>
        <h2>Track Your Fever Symptoms with Structure</h2>
        <p>
          Use HealthMatchAI to organize your fever-related symptoms and generate a shareable summary
          before your next medical visit.
        </p>
        <a href="/symptom-check" className="btn-primary">
          Start Symptom Check
        </a>
      </div>

    
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"At what temperature should an adult go to the emergency room?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"A temperature of 104 degrees Fahrenheit (40 degrees Celsius) or higher warrants emergency evaluation, especially if accompanied by confusion, stiff neck, difficulty breathing, or an inability to keep fluids down. However, a lower fever with severe symptoms can also be an emergency. Trust your instincts and err on the side of caution.\"}}, {\"@type\": \"Question\", \"name\": \"Is it safe to alternate acetaminophen and ibuprofen for fever?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Some clinicians recommend alternating acetaminophen and ibuprofen for high fevers, but this should only be done under the guidance of a healthcare professional. Incorrect dosing or timing can lead to accidental overdose or side effects. Ask your doctor or pharmacist before combining or alternating medications.\"}}, {\"@type\": \"Question\", \"name\": \"Why does my fever come back after the medicine wears off?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Fever reducers lower your temperature temporarily but do not treat the underlying cause of the fever. When the medication wears off, your temperature may rise again if your body is still fighting an infection. This is normal. Focus on rest, hydration, and monitoring for worsening symptoms.\"}}, {\"@type\": \"Question\", \"name\": \"Should I go to work with a fever?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"If you have a fever, you are likely contagious and should stay home to rest and avoid spreading illness to others. Most public health guidelines recommend staying home until you have been fever-free (without medication) for at least 24 hours.\"}}, {\"@type\": \"Question\", \"name\": \"Can HealthMatchAI tell me if my fever is from a virus or bacteria?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"No. HealthMatchAI cannot determine the cause of a fever. Distinguishing between viral and bacterial infections often requires lab tests and a physical exam by a licensed clinician. Use the tool to organize your symptoms, then consult a healthcare provider for a proper evaluation.\"}}]}" }}
      />
    </section>
  );
}
