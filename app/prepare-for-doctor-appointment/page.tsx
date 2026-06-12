import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prepare for Doctor Appointment | HealthMatchAI",
  description:
    "Learn how to prepare for a doctor appointment, what questions to ask, what to bring, and how HealthMatchAI helps you walk in organized and confident.",
  openGraph: {
    title: "How to Prepare for a Doctor Appointment | HealthMatchAI",
    description:
      "Practical tips for preparing for your next medical visit, including questions to ask, information to bring, and how a symptom summary can make the difference.",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Prepare for a Doctor Appointment | HealthMatchAI",
    description:
      "Practical tips for preparing for your next medical visit, including questions to ask, information to bring, and how a symptom summary can make the difference.",
  },
};

export default function PrepareForDoctorAppointmentPage() {
  return (
    <section className="app-page landing-page">

      {/* Hero */}
      <div className="hero-section">
        <h1>Prepare for Your Doctor Appointment</h1>
        <p>
          Get the most out of every medical visit. Learn what to bring, what to ask, and how to
          organize your thoughts so your doctor can help you more effectively.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="panel disclaimer-box" style={{ marginTop: 24 }}>
        <strong>Educational purposes only.</strong> This preparation guide is designed to help you
        communicate more effectively with your healthcare provider. It is not medical advice,
        diagnosis, or a substitute for clinical evaluation. Always follow your clinician&apos;s
        recommendations.
        <br />
        <strong style={{ color: "var(--danger)" }}>
          If you are experiencing a medical emergency, call 911 (US) or your local emergency
          services immediately.
        </strong>
      </div>

      {/* Why Preparation Matters */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Why Preparation Matters</h2>
        <p>
          The average primary care appointment in the United States lasts around 15 to 20 minutes.
          In that short window, you and your clinician need to cover your current symptoms, relevant
          history, any medications or allergies, and a plan for what comes next. If you arrive
          unprepared, important details can easily slip through the cracks.
        </p>
        <p>
          Preparing ahead of time helps you make the most of those minutes. When you can describe
          your symptoms clearly, share a timeline, list your medications accurately, and ask focused
          questions, your clinician can spend less time gathering basic information and more time
          addressing your actual health concerns.
        </p>
      </div>

      {/* How HealthMatchAI Helps */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>How HealthMatchAI Helps You Prepare</h2>
        <p>
          HealthMatchAI streamlines appointment preparation by guiding you through a structured
          symptom check and generating a doctor-ready summary that you can bring to your visit.
        </p>
        <p>Here is what the tool helps you compile:</p>
        <ul>
          <li>
            <strong>A clear primary concern.</strong> Instead of a vague &ldquo;I don&apos;t feel
            well,&rdquo; you identify the symptom that worries you most and describe it in specific
            terms.
          </li>
          <li>
            <strong>An organized symptom list.</strong> All associated symptoms are listed and
            categorized so your clinician sees the full clinical picture at a glance.
          </li>
          <li>
            <strong>A symptom timeline.</strong> You note when each symptom started, whether it is
            getting better or worse, and anything that triggers or relieves it.
          </li>
          <li>
            <strong>Severity and functional impact.</strong> You rate your pain, note whether you
            can sleep, eat, work, or walk normally, and flag any major disruptions to your daily
            life.
          </li>
          <li>
            <strong>Red-flag awareness.</strong> You review a checklist of serious warning signs so
            that if any apply, they are front and center for your clinician to evaluate.
          </li>
          <li>
            <strong>Health background.</strong> Age, chronic conditions, current medications,
            allergies, pregnancy status, and insurance situation are all captured in one place.
          </li>
        </ul>
      </div>

      {/* What to Bring */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>What to Bring to Your Appointment</h2>
        <p>In addition to your HealthMatchAI summary, consider bringing these items:</p>
        <ul>
          <li>
            <strong>Photo ID and insurance card.</strong> Required at check-in for most practices.
          </li>
          <li>
            <strong>A list of all medications you currently take,</strong> including over-the-counter
            drugs, supplements, and herbal remedies. Include the dose and how often you take each
            one.
          </li>
          <li>
            <strong>A list of allergies,</strong> especially to medications, latex, or contrast dye.
          </li>
          <li>
            <strong>Recent test results or imaging reports</strong> from other providers, if
            relevant.
          </li>
          <li>
            <strong>A notebook or your phone</strong> to write down the clinician&apos;s
            instructions, follow-up steps, and any new prescriptions or referrals.
          </li>
          <li>
            <strong>A trusted family member or friend</strong> if you want a second set of ears.
            This is especially helpful for complex visits or if you are feeling anxious.
          </li>
        </ul>
      </div>

      {/* Questions to Ask */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Questions to Ask During Your Appointment</h2>
        <p>
          Good questions turn a one-way lecture into a productive conversation. Consider asking some
          of the following, depending on your situation:
        </p>
        <ul>
          <li>What do you think is causing my symptoms, and what else could it be?</li>
          <li>What tests, if any, do you recommend, and what will they tell us?</li>
          <li>What treatment options are available, and what are the pros and cons of each?</li>
          <li>Are there lifestyle changes I can make that would help?</li>
          <li>What symptoms or changes should prompt me to come back sooner or seek urgent care?</li>
          <li>When should I expect to feel better, and what is the follow-up plan?</li>
          <li>Can you write down the key points or give me an after-visit summary?</li>
        </ul>
        <p>
          Do not be shy about asking for clarification. If a term is unfamiliar or you do not
          understand a recommendation, speak up. A good clinician wants you to leave the visit with
          a clear understanding of your health and next steps.
        </p>
      </div>

      {/* After the Visit */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>After Your Appointment: Next Steps</h2>
        <p>
          The work does not end when you walk out the door. Following through on your
          clinician&apos;s plan is where the real progress happens.
        </p>
        <ul>
          <li>
            <strong>Fill prescriptions promptly</strong> and take medications exactly as directed.
            If you experience side effects, call the office.
          </li>
          <li>
            <strong>Schedule follow-up appointments and referrals</strong> before you leave the
            parking lot if possible. Specialist wait times can be long.
          </li>
          <li>
            <strong>Complete recommended lab work or imaging</strong> as soon as you can. Results
            often guide the next clinical decision.
          </li>
          <li>
            <strong>Save your HealthMatchAI summary</strong> in your history. When you return for a
            follow-up, you can compare old and new symptoms to track progress or changes.
          </li>
          <li>
            <strong>Note any new or worsening symptoms</strong> and do not hesitate to call your
            provider&apos;s office if something concerns you between visits.
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="faq-section" style={{ marginTop: 48 }}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details>
            <summary>Will my doctor be offended if I bring a printed summary?</summary>
            <p>
              Most clinicians welcome it. A concise, well-organized summary saves them time and
              reduces the risk of miscommunication. Approach it as a helpful tool: &ldquo;I wrote
              this down so I would not forget anything.&rdquo;
            </p>
          </details>
          <details>
            <summary>What if I have too many symptoms to list?</summary>
            <p>
              Focus on the symptoms that concern you most and the ones that have changed recently.
              HealthMatchAI&apos;s structured workflow helps you prioritize a primary symptom and
              organize the rest. If you have a long history, note the most relevant or recent issues
              and be ready to summarize the rest verbally.
            </p>
          </details>
          <details>
            <summary>Should I bring someone with me to the appointment?</summary>
            <p>
              If you are comfortable doing so, yes. A companion can help you remember instructions,
              ask questions you might not think of, and provide emotional support. For appointments
              involving serious news or complex treatment decisions, having a second person is
              strongly recommended.
            </p>
          </details>
          <details>
            <summary>Can I use this guide for a telehealth appointment?</summary>
            <p>
              Absolutely. Telehealth visits benefit even more from preparation because the provider
              cannot perform a physical exam. Sending your HealthMatchAI summary ahead of time
              through your patient portal gives the clinician context before the call begins.
            </p>
          </details>
          <details>
            <summary>How often should I update my summary?</summary>
            <p>
              Run a new symptom check whenever your symptoms change significantly, when a new
              symptom appears, or before a scheduled appointment. Keeping your summary current
              ensures your clinician has the most accurate picture.
            </p>
          </details>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{ marginTop: 48, textAlign: "center" }}>
        <h2>Prepare for Your Next Visit in Minutes</h2>
        <p>
          Walk through a structured symptom check and generate a doctor-ready summary you can share
          at your appointment.
        </p>
        <a href="/symptom-check" className="btn-primary">
          Start My Symptom Check
        </a>
      </div>

    </section>
  );
}
