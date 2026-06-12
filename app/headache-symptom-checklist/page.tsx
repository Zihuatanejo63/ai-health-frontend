import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Headache Symptom Checklist | HealthMatchAI",
  description:
    "A structured checklist to help you track headache symptoms, patterns, triggers, and severity. Know what to tell your doctor about your headaches.",
  openGraph: {
    title: "Headache Symptom Checklist | HealthMatchAI",
    description:
      "Track your headache symptoms systematically. Learn when a headache may signal something more serious and how to describe your pain clearly to a clinician.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Headache Symptom Checklist | HealthMatchAI",
    description:
      "Track your headache symptoms systematically. Learn when a headache may signal something more serious and how to describe your pain clearly to a clinician.",
  },
};

export default function HeadacheSymptomChecklistPage() {
  return (
    <section className="app-page landing-page">

      {/* Hero */}
      <div className="hero-section">
        <h1>Headache Symptom Checklist</h1>
        <p>
          A practical guide to tracking headache symptoms, recognizing patterns and triggers, and
          preparing a clear description for your healthcare provider.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="panel disclaimer-box" style={{ marginTop: 24 }}>
        <strong>Educational purposes only.</strong> This checklist is a self-assessment and
        communication tool. It does not diagnose the cause of a headache and does not provide
        medical advice. While most headaches are benign, some can be signs of serious conditions
        requiring urgent evaluation. Only a licensed clinician can determine the cause.
        <br />
        <strong style={{ color: "var(--danger)" }}>
          If you have a sudden, severe headache unlike any you have had before (often described as a
          &ldquo;thunderclap&rdquo; headache), a headache with fever and stiff neck, a headache
          after a head injury, or a headache accompanied by confusion, weakness, vision loss, or
          difficulty speaking, seek emergency medical attention immediately. Call 911 (US) or your
          local emergency services.
        </strong>
      </div>

      {/* Understanding Headache Types */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Understanding Your Headache</h2>
        <p>
          Headaches are among the most common health complaints worldwide. Most are tension-type
          headaches or migraines and are not dangerous, but the way a headache feels, where it is
          located, and what other symptoms come with it can point toward very different underlying
          causes. Describing your headache clearly is one of the most helpful things you can do for
          your clinician.
        </p>
        <p>Common headache types include:</p>
        <ul>
          <li>
            <strong>Tension-type headache:</strong> A dull, steady ache on both sides of the head
            or across the forehead. Often described as a tight band or pressure. Usually mild to
            moderate, not disabling, and not worsened by routine physical activity.
          </li>
          <li>
            <strong>Migraine:</strong> Moderate to severe throbbing or pulsing pain, often on one
            side, though it can affect both. May be accompanied by nausea, vomiting, and sensitivity
            to light, sound, or smells. Some people experience warning signs called aura (visual
            disturbances, tingling, or speech changes) before the pain starts.
          </li>
          <li>
            <strong>Cluster headache:</strong> Intense burning or piercing pain around or behind one
            eye, occurring in groups or &ldquo;clusters&rdquo; over weeks or months. Attacks are
            relatively short but extremely painful and may be accompanied by a drooping eyelid,
            tearing, or nasal congestion on the affected side.
          </li>
          <li>
            <strong>Sinus headache:</strong> Deep, constant pain in the forehead, cheekbones, or
            bridge of the nose, often with nasal congestion and facial pressure. Usually related to
            a sinus infection or inflammation.
          </li>
        </ul>
      </div>

      {/* Symptom Tracking Checklist */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Headache Symptom Tracking Checklist</h2>
        <p>
          Use this checklist to organize what you know about your headaches before speaking with a
          healthcare provider. The more detail you can provide, the better.
        </p>
        <ul>
          <li>
            <strong>Location.</strong> Where is the pain? One side or both? Forehead, temples, back
            of the head, behind one eye, or all over?
          </li>
          <li>
            <strong>Quality of pain.</strong> Is it throbbing, dull and pressing, sharp and
            stabbing, burning, or like an electric shock?
          </li>
          <li>
            <strong>Intensity.</strong> On a scale of 0 to 10, how bad is the pain? Does it stop
            you from working, sleeping, or doing daily activities?
          </li>
          <li>
            <strong>Onset and duration.</strong> Did the pain start suddenly (reaching peak in
            seconds or minutes) or gradually over hours? How long does a typical headache last?
          </li>
          <li>
            <strong>Frequency.</strong> How often do headaches occur? Daily, a few times a week,
            monthly, or less often?
          </li>
          <li>
            <strong>Timing.</strong> Do headaches occur at a specific time of day, such as upon
            waking or in the late afternoon? Are they related to your menstrual cycle?
          </li>
          <li>
            <strong>Triggers.</strong> Do any of these bring on a headache: stress, certain foods
            or drinks (caffeine, alcohol, chocolate, aged cheese), skipped meals, lack of sleep or
            oversleeping, bright lights, loud noises, strong smells, weather changes, or screen
            time?
          </li>
          <li>
            <strong>Associated symptoms.</strong> Do you experience nausea, vomiting, sensitivity
            to light or sound, visual changes (blurred vision, flashing lights, blind spots),
            dizziness, numbness or tingling, or difficulty speaking?
          </li>
          <li>
            <strong>What helps or worsens it.</strong> Does rest in a dark quiet room help? Do
            over-the-counter pain relievers work? Does physical activity make it worse?
          </li>
        </ul>
      </div>

      {/* When to Seek Care */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>When to Seek Medical Care for a Headache</h2>
        <p>
          While most headaches are not dangerous, certain features warrant prompt medical attention.
          Seek care if:
        </p>
        <ul>
          <li>You experience a sudden, extremely severe headache that peaks within seconds or minutes (&ldquo;thunderclap&rdquo; headache).</li>
          <li>Your headache is accompanied by fever, stiff neck, confusion, seizures, double vision, weakness, numbness, or difficulty speaking.</li>
          <li>Your headache follows a head injury, fall, or accident.</li>
          <li>Your headache is getting progressively worse over days or weeks and does not respond to your usual treatments.</li>
          <li>Your headache is triggered by coughing, sneezing, bending over, or physical exertion.</li>
          <li>You are over 50 and experiencing a new type of headache for the first time.</li>
          <li>You have a headache along with a weakened immune system or a history of cancer.</li>
        </ul>
        <p>
          These warning signs do not necessarily mean something serious is happening, but they
          warrant prompt evaluation by a healthcare professional to rule out conditions such as
          meningitis, stroke, aneurysm, or elevated intracranial pressure.
        </p>
      </div>

      {/* How HealthMatchAI Helps */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>How HealthMatchAI Helps with Headache Concerns</h2>
        <p>
          HealthMatchAI&apos;s symptom checker includes headache as a primary symptom within the
          neurological category. When you select headache, the tool walks you through:
        </p>
        <ul>
          <li>Associated neurological symptoms such as dizziness, vision changes, numbness, weakness, and confusion.</li>
          <li>Detailed questions about headache onset, quality, location, and triggers.</li>
          <li>Red-flag screening for serious conditions including meningitis, stroke, and brain injury.</li>
          <li>Assessment of how headaches affect your sleep, work, and quality of life.</li>
          <li>A structured summary you can share with your primary care provider or neurologist.</li>
        </ul>
        <p>
          The tool does not diagnose the type or cause of your headaches. It organizes your
          experience into a clear, clinical format that helps your healthcare provider work more
          efficiently.
        </p>
      </div>

      {/* FAQ */}
      <div className="faq-section" style={{ marginTop: 48 }}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details>
            <summary>What is a thunderclap headache and why is it an emergency?</summary>
            <p>
              A thunderclap headache is a sudden, extremely severe headache that reaches maximum
              intensity within 60 seconds. It can be a sign of a life-threatening condition such as
              a ruptured aneurysm (subarachnoid hemorrhage), arterial tear, or blood clot. Anyone
              experiencing a thunderclap headache should go to the emergency department immediately.
            </p>
          </details>
          <details>
            <summary>How is a migraine different from a regular headache?</summary>
            <p>
              Migraines are a neurological condition, not just a bad headache. They typically
              involve throbbing pain, often on one side, and are accompanied by symptoms like
              nausea, vomiting, and extreme sensitivity to light and sound. Migraines can last
              hours to days and often interfere significantly with daily life. Many people with
              migraine also experience warning symptoms called aura before the pain starts.
            </p>
          </details>
          <details>
            <summary>Can dehydration cause a headache?</summary>
            <p>
              Yes. Dehydration is a common headache trigger. When your body loses more fluid than
              it takes in, the brain can temporarily shrink from fluid loss, pulling on the
              membranes that connect it to the skull and causing pain. Drinking water steadily
              throughout the day can help prevent dehydration-related headaches.
            </p>
          </details>
          <details>
            <summary>When should I see a neurologist for headaches?</summary>
            <p>
              Consider seeing a neurologist if your headaches are frequent (more than a few times
              per month), severe enough to interfere with your life, not responding to
              over-the-counter treatments, or changing in pattern or intensity. Your primary care
              provider can help you decide if a specialist referral is appropriate.
            </p>
          </details>
          <details>
            <summary>Can HealthMatchAI tell me if my headache is serious?</summary>
            <p>
              No. HealthMatchAI cannot determine the cause or seriousness of a headache. It helps
              you organize information about your symptoms and will flag red-flag items for your
              awareness, but only a licensed clinician can assess you in person, order imaging if
              needed, and make a diagnosis.
            </p>
          </details>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{ marginTop: 48, textAlign: "center" }}>
        <h2>Track Your Headache Symptoms with Structure</h2>
        <p>
          Use HealthMatchAI to organize your headache-related symptoms and generate a shareable
          summary before your next medical visit.
        </p>
        <a href="/symptom-check" className="btn-primary">
          Start Symptom Check
        </a>
      </div>

    </section>
  );
}
