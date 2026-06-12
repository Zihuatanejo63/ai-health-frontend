import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chest Pain Symptom Checklist | HealthMatchAI",
  description:
    "A structured checklist to help you track chest pain symptoms, triggers, and associated signs. Know when chest pain is an emergency and how to describe it to a doctor.",
  openGraph: {
    title: "Chest Pain Symptom Checklist | HealthMatchAI",
    description:
      "Track your chest pain symptoms systematically. Learn the difference between cardiac and non-cardiac chest pain and know what information your doctor needs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chest Pain Symptom Checklist | HealthMatchAI",
    description:
      "Track your chest pain symptoms systematically. Learn the difference between cardiac and non-cardiac chest pain and know what information your doctor needs.",
  },
};

export default function ChestPainSymptomChecklistPage() {
  return (
    <section className="app-page landing-page">

      {/* Hero */}
      <div className="hero-section">
        <h1>Chest Pain Symptom Checklist</h1>
        <p>
          A practical guide to tracking chest pain symptoms, understanding potential causes, and
          knowing when to seek emergency care. Chest pain should always be taken seriously.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="panel disclaimer-box" style={{ marginTop: 24 }}>
        <strong>Educational purposes only.</strong> This checklist is a self-assessment and
        communication tool. It does not diagnose the cause of chest pain and does not provide
        medical advice. Chest pain can be a symptom of life-threatening conditions including heart
        attack, pulmonary embolism, and aortic dissection. Only a licensed clinician can determine
        the cause through examination and testing.
        <br />
        <strong style={{ color: "var(--danger)" }}>
          If you are experiencing chest pain or pressure that is new, severe, or accompanied by
          shortness of breath, sweating, nausea, dizziness, or pain radiating to the arm, jaw, neck,
          or back, call 911 (US) or your local emergency services immediately. Do not drive yourself
          to the hospital. Every minute matters.
        </strong>
      </div>

      {/* Understanding Chest Pain */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Understanding Chest Pain</h2>
        <p>
          Chest pain is one of the most concerning symptoms a person can experience, and for good
          reason: it can signal a heart attack or other life-threatening condition. However, chest
          pain can also arise from less dangerous causes such as muscle strain, acid reflux, anxiety,
          or inflammation of the cartilage connecting the ribs to the breastbone (costochondritis).
        </p>
        <p>
          The challenge is that even clinicians cannot always distinguish between cardiac and
          non-cardiac chest pain based on description alone. That is why chest pain should always be
          evaluated by a medical professional, and why certain features warrant an immediate call to
          emergency services. The purpose of this checklist is to help you organize what you are
          feeling so you can communicate it clearly -- not to decide whether to seek care.
        </p>
        <p>
          Chest pain related to the heart (cardiac chest pain) can feel like pressure, squeezing,
          fullness, or a heavy weight on the chest. It may radiate to the shoulders, arms, neck,
          jaw, or back. It is often accompanied by shortness of breath, sweating, nausea, or a sense
          of impending doom. Non-cardiac chest pain may be sharp, stabbing, brief, or clearly
          related to movement, eating, or breathing -- but these features do not rule out a heart
          problem.
        </p>
      </div>

      {/* Symptom Tracking Checklist */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Chest Pain Symptom Tracking Checklist</h2>
        <p>
          Use this checklist while waiting for help or before you speak with a healthcare provider.
          Write down or mentally note what you can. Do not delay calling 911 to fill out a list.
        </p>
        <ul>
          <li>
            <strong>Type of sensation.</strong> Is it pressure, squeezing, tightness, burning,
            sharp/stabbing, dull ache, or a heavy weight? Does it feel like something is tearing?
          </li>
          <li>
            <strong>Location.</strong> Where is the pain? Center of the chest, left side, right
            side, upper chest, or lower chest? Can you point to it with one finger, or is it a
            larger area?
          </li>
          <li>
            <strong>Radiation.</strong> Does the pain travel anywhere else? To the left arm, right
            arm, both arms, jaw, neck, upper back (between the shoulder blades), or stomach?
          </li>
          <li>
            <strong>Onset and duration.</strong> Did it start suddenly or gradually? How long has it
            lasted? Is it constant or does it come and go?
          </li>
          <li>
            <strong>Triggers.</strong> Did the pain start during physical activity, emotional
            stress, at rest, after eating, with deep breathing, or with movement of the chest or
            arms?
          </li>
          <li>
            <strong>Associated symptoms.</strong> Are you experiencing shortness of breath, cold
            sweats, nausea or vomiting, dizziness or lightheadedness, palpitations or a racing
            heart, or a feeling of doom or extreme anxiety?
          </li>
          <li>
            <strong>Pain severity.</strong> On a 0 to 10 scale, how bad is it? Has it gotten
            better, worse, or stayed the same since it started?
          </li>
          <li>
            <strong>Relevant history.</strong> Do you have a history of heart disease, high blood
            pressure, high cholesterol, diabetes, or a family history of early heart attacks? Are
            you a smoker? Have you recently had surgery, been on a long flight, or been immobile
            for an extended period?
          </li>
        </ul>
      </div>

      {/* Heart Attack Warning Signs */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Heart Attack Warning Signs</h2>
        <p>
          Heart attacks do not always look like the dramatic scenes on television. Symptoms can be
          subtle and may differ between men and women. Any of the following with chest discomfort
          warrants an immediate call to 911:
        </p>
        <ul>
          <li>Chest pressure, squeezing, fullness, or pain in the center of the chest lasting more than a few minutes or that comes and goes.</li>
          <li>Pain or discomfort in one or both arms, the back, neck, jaw, or stomach.</li>
          <li>Shortness of breath with or without chest discomfort.</li>
          <li>Breaking out in a cold sweat, nausea, vomiting, or lightheadedness.</li>
          <li>Extreme fatigue, especially in women, which may be the most prominent symptom.</li>
        </ul>
        <p>
          Women are more likely than men to experience atypical heart attack symptoms such as
          unusual fatigue, nausea, indigestion, and pain in the back or jaw rather than crushing
          chest pain. Do not dismiss these symptoms because they seem mild. Trust your instincts and
          seek help.
        </p>
      </div>

      {/* Other Serious Causes */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>Other Serious Causes of Chest Pain</h2>
        <p>
          Not all serious chest pain comes from the heart. Other conditions requiring emergency
          evaluation include:
        </p>
        <ul>
          <li>
            <strong>Pulmonary embolism:</strong> A blood clot in the lungs, often causing sharp
            chest pain that worsens with deep breathing, along with sudden shortness of breath and
            rapid heart rate. Risk is higher after surgery, long flights, or prolonged immobility.
          </li>
          <li>
            <strong>Aortic dissection:</strong> A tear in the wall of the aorta, causing sudden,
            severe tearing or ripping pain in the chest or back that may move as the tear extends.
            This is a medical emergency requiring immediate surgery.
          </li>
          <li>
            <strong>Pneumothorax:</strong> A collapsed lung, often causing sudden sharp chest pain
            and shortness of breath, sometimes after trauma or spontaneously in tall, thin young
            people.
          </li>
        </ul>
        <p>
          These conditions cannot be diagnosed at home. They require imaging studies and expert
          evaluation in an emergency department.
        </p>
      </div>

      {/* How HealthMatchAI Helps */}
      <div className="content-section" style={{ marginTop: 48 }}>
        <h2>How HealthMatchAI Helps with Chest Pain Concerns</h2>
        <p>
          Chest pain is one of the highest-priority symptoms in the HealthMatchAI symptom checker.
          When you select chest pain in the chest and cardiovascular category, the tool immediately
          presents red-flag screening questions designed to identify features that may indicate a
          cardiac emergency.
        </p>
        <p>The tool guides you through:</p>
        <ul>
          <li>Questions about the nature, location, and radiation of chest pain.</li>
          <li>Associated cardiovascular and respiratory symptoms.</li>
          <li>Key history items including heart disease risk factors and recent immobility.</li>
          <li>Emergency-level alerts when your inputs match patterns associated with heart attack, pulmonary embolism, or other urgent conditions.</li>
        </ul>
        <p>
          If your responses indicate potential emergency features, the tool will strongly
          recommend immediate emergency evaluation. It does not clear you for any condition by
          indicating a lower risk level, because no digital tool can rule out a heart attack.
        </p>
      </div>

      {/* FAQ */}
      <div className="faq-section" style={{ marginTop: 48 }}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details>
            <summary>Can chest pain be from anxiety?</summary>
            <p>
              Yes, anxiety and panic attacks can cause chest pain, often described as sharp,
              stabbing, or accompanied by a racing heart, shortness of breath, and a sense of
              doom. However, you cannot tell the difference between anxiety-related chest pain and
              cardiac chest pain on your own. If you have new or unexplained chest pain, seek
              medical evaluation. A clinician can help distinguish between the two.
            </p>
          </details>
          <details>
            <summary>What is the difference between heartburn and heart attack pain?</summary>
            <p>
              Heartburn typically causes a burning sensation behind the breastbone, often after
              eating, and may be relieved by antacids. Heart attack pain is more often described as
              pressure, squeezing, or heaviness and may be accompanied by shortness of breath,
              sweating, and nausea. Because the symptoms can overlap, any chest pain that is new,
              severe, or accompanied by other concerning symptoms should be evaluated in an
              emergency setting.
            </p>
          </details>
          <details>
            <summary>Do young people need to worry about heart attacks?</summary>
            <p>
              Heart attacks are less common in young adults but can occur, especially in people with
              risk factors such as smoking, diabetes, high blood pressure, or a family history of
              early heart disease. Chest pain in a young person should still be taken seriously,
              particularly if it occurs during exertion or is accompanied by other warning signs.
            </p>
          </details>
          <details>
            <summary>What should I do while waiting for an ambulance?</summary>
            <p>
              If you suspect a heart attack and have called 911, sit or lie down in a comfortable
              position. Loosen tight clothing. If you have been prescribed nitroglycerin, take it as
              directed. If aspirin is recommended by the 911 operator and you are not allergic, you
              may be advised to chew one adult-strength aspirin. Do not take any medication without
              instruction from emergency personnel. Unlock your door so paramedics can reach you.
            </p>
          </details>
          <details>
            <summary>Can HealthMatchAI tell me if my chest pain is a heart attack?</summary>
            <p>
              No. HealthMatchAI cannot diagnose or rule out a heart attack or any other condition.
              It provides educational guidance based on the symptoms you report. If you have chest
              pain, especially if it is new or accompanied by other symptoms, do not rely on any
              digital tool. Call 911 or go to the nearest emergency department immediately.
            </p>
          </details>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{ marginTop: 48, textAlign: "center" }}>
        <h2>Organize Your Chest Pain Information</h2>
        <p>
          Use HealthMatchAI to organize your chest pain symptoms and health background into a clear
          summary you can share with emergency responders or your healthcare provider.
        </p>
        <a href="/symptom-check" className="btn-primary">
          Start Symptom Check
        </a>
      </div>

    
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"Can chest pain be from anxiety?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Yes, anxiety and panic attacks can cause chest pain, often described as sharp, stabbing, or accompanied by a racing heart, shortness of breath, and a sense of doom. However, you cannot tell the difference between anxiety-related chest pain and cardiac chest pain on your own. If you have new or unexplained chest pain, seek medical evaluation. A clinician can help distinguish between the two.\"}}, {\"@type\": \"Question\", \"name\": \"What is the difference between heartburn and heart attack pain?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Heartburn typically causes a burning sensation behind the breastbone, often after eating, and may be relieved by antacids. Heart attack pain is more often described as pressure, squeezing, or heaviness and may be accompanied by shortness of breath, sweating, and nausea. Because the symptoms can overlap, any chest pain that is new, severe, or accompanied by other concerning symptoms should be evaluated in an emergency setting.\"}}, {\"@type\": \"Question\", \"name\": \"Do young people need to worry about heart attacks?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"Heart attacks are less common in young adults but can occur, especially in people with risk factors such as smoking, diabetes, high blood pressure, or a family history of early heart disease. Chest pain in a young person should still be taken seriously, particularly if it occurs during exertion or is accompanied by other warning signs.\"}}, {\"@type\": \"Question\", \"name\": \"What should I do while waiting for an ambulance?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"If you suspect a heart attack and have called 911, sit or lie down in a comfortable position. Loosen tight clothing. If you have been prescribed nitroglycerin, take it as directed. If aspirin is recommended by the 911 operator and you are not allergic, you may be advised to chew one adult-strength aspirin. Do not take any medication without instruction from emergency personnel. Unlock your door so paramedics can reach you.\"}}, {\"@type\": \"Question\", \"name\": \"Can HealthMatchAI tell me if my chest pain is a heart attack?\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"No. HealthMatchAI cannot diagnose or rule out a heart attack or any other condition. It provides educational guidance based on the symptoms you report. If you have chest pain, especially if it is new or accompanied by other symptoms, do not rely on any digital tool. Call 911 or go to the nearest emergency department immediately.\"}}]}" }}
      />
    </section>
  );
}
