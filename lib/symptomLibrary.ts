export const symptomCategories = [
  {
    name: "Respiratory",
    symptoms: ["Fever", "Cough", "Sore throat", "Runny nose", "Nasal congestion", "Shortness of breath", "Chest tightness", "Wheezing", "Loss of smell or taste", "Hoarseness"]
  },
  {
    name: "Pain",
    symptoms: ["Headache", "Chest pain", "Abdominal pain", "Back pain", "Neck pain", "Joint pain", "Muscle pain", "Tooth pain", "Ear pain", "Eye pain"]
  },
  {
    name: "Digestive",
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Constipation", "Stomach pain", "Bloating", "Loss of appetite", "Acid reflux", "Blood in stool", "Black stool"]
  },
  {
    name: "Neurological",
    symptoms: ["Dizziness", "Confusion", "Fainting", "Numbness", "Weakness", "Seizure", "Vision changes", "Severe headache", "Trouble speaking", "Balance problems"]
  },
  {
    name: "Skin",
    symptoms: ["Rash", "Itching", "Hives", "Swelling", "Skin redness", "Blister", "Wound", "Burn", "Bruising", "Skin infection concern"]
  },
  {
    name: "Urinary",
    symptoms: ["Painful urination", "Frequent urination", "Blood in urine", "Lower abdominal pain", "Flank pain", "Urinary urgency", "Difficulty urinating"]
  },
  {
    name: "General",
    symptoms: ["Fatigue", "Body aches", "Chills", "Sweating", "Weight loss", "Sleep problems", "Dehydration", "Feeling very unwell"]
  },
  {
    name: "Mental / Emotional",
    symptoms: ["Anxiety", "Panic feeling", "Low mood", "Trouble sleeping", "Stress", "Suicidal thoughts", "Self-harm thoughts"]
  }
];

export const redFlagSymptoms = [
  "Chest pain",
  "Trouble breathing",
  "Confusion",
  "Fainting",
  "Seizure",
  "Severe dehydration",
  "Stiff neck",
  "Persistent vomiting",
  "Blood in stool or vomit",
  "Severe abdominal pain",
  "Stroke-like symptoms",
  "Suicidal thoughts"
];

export function getSymptomCategory(symptom: string) {
  return symptomCategories.find((category) => category.symptoms.includes(symptom))?.name ?? "General";
}

export function getDetailQuestions(category: string) {
  if (category === "Respiratory") return ["Cough pattern", "Breathing difficulty", "Chest symptoms"];
  if (category === "Digestive") return ["Vomiting frequency", "Diarrhea frequency", "Pain location"];
  if (category === "Pain") return ["Pain location", "Pain score", "Sudden onset"];
  if (category === "Mental / Emotional") return ["Current safety", "Support available", "Recent stressors"];
  return ["Main concern", "What makes it worse", "What helps"];
}
