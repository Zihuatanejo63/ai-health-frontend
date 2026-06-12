import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stomach Pain Symptom Checklist | HealthMatchAI",
  description:
    "A structured checklist to help you track stomach pain symptoms, location, triggers, and associated signs. Know what to tell your doctor about abdominal pain.",
  openGraph: {
    title: "Stomach Pain Symptom Checklist | HealthMatchAI",
    description:
      "Track your stomach and abdominal pain symptoms systematically. Learn when abdominal pain warrants urgent care and how to describe it clearly to a clinician.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stomach Pain Symptom Checklist | HealthMatchAI",
    description:
      "Track your stomach and abdominal pain symptoms systematically. Learn when abdominal pain warrants urgent care and how to describe it clearly to a clinician.",
  },
};

export default function StomachPainSymptomChecklistPage() {
  return (
    <section className="app-page landing-page">

      {/* Hero */}
      <div className="hero-section">
        <h1>Stomach Pain Symptom Checklist</h1>
        <p>
          A practical guide to tracking abdominal and stomach pain, understanding possible causes,
          and preparing a clear description for your healthcare provider.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="panel disclaimer-box" style={{ marginTop: 24 }}>
        <strong>Educational purposes only.</strong> This checklist is a self-assessment and
        communication tool. It does not diagnose the cause of stomach pain and does not provide
        medical advice. Abdominal pain can range from mild and self-limiting to a sign of a serious
        condition requiring urgent surgical evaluation. Only a licensed clinician can determine the
        cause and appropriate treatment.
        <br />
        <strong style={{ color: "var(--danger)" }}>
          If you have severe or worsening abdominal pain, especially if accompanied by fever,
          vomiting blood, passing black or bloody stools, a rigid or board-like abdomen, inability to
          pass gas or have a bowel movement, or if you are pregnant and experiencing abdominal pain,
          seek emergency medical attention immediately. Call 911 (US) or your local emergency
          services.
        </strong>
      </div>

      {/* Understanding Stomach Pain */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Understanding Abdominal Pain</h2>
        <p>
          Abdominal pain is one of the most common reasons people seek medical care. The abdomen
          contains many organs -- the stomach, intestines, liver, gallbladder, pancreas, kidneys,
          and more -- so pain in this area can arise from a wide variety of sources. The location,
          character, and timing of the pain, along with associated symptoms, help narrow down the
          possible causes.
        </p>
        <p>
          Clinicians often think about abdominal pain by quadrant. Pain in the upper right could
          involve the gallbladder or liver. Pain in the upper left might involve the stomach or
          pancreas. Lower right pain could be the appendix. Lower left pain could involve the colon.
          Pain that is diffuse, cramping, and comes in waves often points to the intestines. Being
          able to point to the specific location and describe what the pain feels like is incredibly
          helpful.
        </p>
        <p>
          Not all abdominal pain originates in the abdomen. Conditions like pneumonia, heart attack,
          and even shingles can sometimes present with abdominal discomfort. This is another reason
          why a thorough clinical evaluation matters.
        </p>
      </div>

      {/* Symptom Tracking Checklist */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Stomach Pain Symptom Tracking Checklist</h2>
        <p>
          Use this checklist to organize what you know about your abdominal pain before speaking
          with a healthcare provider.
        </p>
        <ul>
          <li>
            <strong>Location.</strong> Where exactly is the pain? Point to it with one finger if
            possible. Is it upper right, upper middle, upper left, lower right, lower middle, lower
            left, or all over? Does the pain move or radiate to your back, shoulder, or chest?
          </li>
          <li>
            <strong>Quality of pain.</strong> Is it sharp and stabbing, dull and achy, cramping and
            wave-like, burning, or a constant pressure? Does it feel like something is tearing?
          </li>
          <li>
            <strong>Intensity.</strong> On a scale of 0 to 10, how severe is the pain at its worst?
            Does it stop you from standing up straight, walking, eating, or sleeping?
          </li>
          <li>
            <strong>Onset and duration.</strong> Did the pain start suddenly or gradually? Hours
            ago, days ago, or longer? Is it constant or does it come and go?
          </li>
          <li>
            <strong>Triggers and relievers.</strong> Does eating make the pain better or worse? Does
            lying in a certain position help? Have you taken antacids, pain relievers, or other
            medications, and did they help?
          </li>
          <li>
            <strong>Associated symptoms.</strong> Are you also experiencing nausea, vomiting,
            diarrhea, constipation, bloating, gas, fever, chills, loss of appetite, unexplained
            weight loss, or painful urination?
          </li>
          <li>
            <strong>Bowel and stool changes.</strong> Have your bowel movements changed in
            frequency, consistency, or color? Is there blood in your stool (bright red, dark, or
            black)? Is your stool pale, greasy, or unusually foul-smelling?
          </li>
          <li>
            <strong>Relevant context.</strong> For women and people with female reproductive
            anatomy: could you be pregnant? When was your last menstrual period? Is the pain related
            to your cycle? Have you had any gynecological conditions diagnosed?
          </li>
          <li>
            <strong>Diet and exposure.</strong> Have you eaten anything unusual, undercooked, or
            potentially spoiled? Have you traveled recently? Has anyone else you ate with become ill?
          </li>
        </ul>
      </div>

      {/* When to Seek Care */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>When to Seek Medical Care for Abdominal Pain</h2>
        <p>
          Abdominal pain should be evaluated promptly or emergently in these situations:
        </p>
        <ul>
          <li>Pain that is severe, sudden in onset, or worsening rapidly.</li>
          <li>Pain that makes it impossible to find a comfortable position or that wakes you from sleep.</li>
          <li>A rigid, board-like abdomen that is tender to the touch.</li>
          <li>Vomiting blood or material that looks like coffee grounds.</li>
          <li>Passing blood in your stool (bright red, maroon, or black and tarry).</li>
          <li>Inability to pass gas or have a bowel movement, especially with a swollen abdomen and vomiting.</li>
          <li>Abdominal pain after a recent injury or accident.</li>
          <li>Abdominal pain with fever above 101 degrees Fahrenheit (38.3 degrees Celsius) and chills.</li>
          <li>Abdominal pain during pregnancy, especially if accompanied by bleeding.</li>
          <li>Yellowing of the skin or eyes (jaundice) with abdominal pain.</li>
        </ul>
        <p>
          These signs can indicate conditions such as appendicitis, bowel obstruction,
          pancreatitis, gallbladder inflammation, perforated ulcer, ectopic pregnancy, or other
          serious problems that require urgent evaluation.
        </p>
      </div>

      {/* How HealthMatchAI Helps */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>How HealthMatchAI Helps with Abdominal Pain Concerns</h2>
        <p>
          HealthMatchAI&apos;s symptom checker includes abdominal pain as a primary concern
          category. When you select stomach or abdominal pain, the tool guides you through:
        </p>
        <ul>
          <li>Associated gastrointestinal symptoms such as nausea, vomiting, diarrhea, and constipation.</li>
          <li>Detailed questions about pain location, quality, onset, and what makes it better or worse.</li>
          <li>Red-flag screening for serious abdominal conditions requiring urgent evaluation.</li>
          <li>Assessment of bowel habits, stool characteristics, and dietary context.</li>
          <li>A structured summary you can share with your primary care provider, urgent care, or gastroenterologist.</li>
        </ul>
        <p>
          The tool does not diagnose the cause of your abdominal pain. It organizes your observations
          into a coherent clinical narrative for your healthcare provider.
        </p>
      </div>

      {/* FAQ */}
      <div className="faq-section" style={{ marginTop: 48 }}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details>
            <summary>How do I know if abdominal pain is appendicitis?</summary>
            <p>
              Appendicitis typically starts with pain around the belly button that migrates to the
              lower right abdomen over several hours. The pain worsens with movement, coughing, or
              pressing on the area. It is often accompanied by loss of appetite, nausea, vomiting,
              and low-grade fever. If you suspect appendicitis, seek emergency care immediately.
              Only a clinician can confirm the diagnosis, usually with imaging.
            </p>
          </details>
          <details>
            <summary>Can stress cause stomach pain?</summary>
            <p>
              Yes. The gut and brain are closely connected through the gut-brain axis. Stress and
              anxiety can cause a range of gastrointestinal symptoms, including stomach cramps,
              nausea, diarrhea, and constipation. However, you should not assume stress is the cause
              without ruling out other possibilities with your clinician, especially if the pain is
              severe or persistent.
            </p>
          </details>
          <details>
            <summary>What does it mean if my stool is black?</summary>
            <p>
              Black, tarry stool (melena) can indicate bleeding in the upper gastrointestinal
              tract, such as from a stomach ulcer. This is a serious finding that warrants prompt
              medical evaluation. However, certain foods (like black licorice) and supplements (like
              iron or bismuth-containing medications) can also darken stool. A clinician can help
              distinguish between these possibilities.
            </p>
          </details>
          <details>
            <summary>Is it safe to take pain relievers for stomach pain?</summary>
            <p>
              Not always. Some over-the-counter pain relievers, particularly nonsteroidal
              anti-inflammatory drugs (NSAIDs) like ibuprofen or naproxen, can irritate the stomach
              lining and worsen certain conditions. Acetaminophen may be safer for some types of
              abdominal pain but does not reduce inflammation. Ask your clinician or pharmacist
              before taking any medication for undiagnosed abdominal pain.
            </p>
          </details>
          <details>
            <summary>Can HealthMatchAI tell me if my stomach pain is from something I ate?</summary>
            <p>
              No. HealthMatchAI cannot determine the cause of abdominal pain. Foodborne illness,
              indigestion, gastritis, ulcers, gallbladder disease, and many other conditions can
              cause similar symptoms. Use the tool to organize your information, then consult a
              licensed clinician who can perform an exam and order tests if needed.
            </p>
          </details>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{ marginTop: 48, textAlign: "center" }}>
        <h2>Track Your Abdominal Pain with Structure</h2>
        <p>
          Use HealthMatchAI to organize your stomach pain symptoms and generate a shareable summary
          before your next medical visit.
        </p>
        <a href="/symptom-check" className="btn-primary">
          Start Symptom Check
        </a>
      </div>

    </section>
  );
}
