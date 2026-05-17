export function toI18nSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

export function symptomItemKey(value: string) {
  const itemKeys: Record<string, string> = {
    "Fever": "symptom.items.fever",
    "Cough": "symptom.items.cough",
    "Sore throat": "symptom.items.soreThroat",
    "Runny nose": "symptom.items.runnyNose",
    "Nasal congestion": "symptom.items.nasalCongestion",
    "Shortness of breath": "symptom.items.shortnessOfBreath",
    "Chest tightness": "symptom.items.chestTightness",
    "Wheezing": "symptom.items.wheezing",
    "Loss of smell or taste": "symptom.items.lossOfSmellOrTaste",
    "Hoarseness": "symptom.items.hoarseness",
    "Headache": "symptom.items.headache",
    "Chest pain": "symptom.items.chestPain",
    "Abdominal pain": "symptom.items.abdominalPain",
    "Back pain": "symptom.items.backPain",
    "Neck pain": "symptom.items.neckPain",
    "Joint pain": "symptom.items.jointPain",
    "Muscle pain": "symptom.items.musclePain",
    "Tooth pain": "symptom.items.toothPain",
    "Ear pain": "symptom.items.earPain",
    "Eye pain": "symptom.items.eyePain",
    "Nausea": "symptom.items.nausea",
    "Vomiting": "symptom.items.vomiting",
    "Diarrhea": "symptom.items.diarrhea",
    "Constipation": "symptom.items.constipation",
    "Stomach pain": "symptom.items.stomachPain",
    "Bloating": "symptom.items.bloating",
    "Loss of appetite": "symptom.items.lossOfAppetite",
    "Acid reflux": "symptom.items.acidReflux",
    "Blood in stool": "symptom.items.bloodInStool",
    "Black stool": "symptom.items.blackStool",
    "Dizziness": "symptom.items.dizziness",
    "Confusion": "symptom.items.confusion",
    "Fainting": "symptom.items.fainting",
    "Numbness": "symptom.items.numbness",
    "Weakness": "symptom.items.weakness",
    "Seizure": "symptom.items.seizure",
    "Vision changes": "symptom.items.visionChanges",
    "Severe headache": "symptom.items.severeHeadache",
    "Trouble speaking": "symptom.items.troubleSpeaking",
    "Balance problems": "symptom.items.balanceProblems",
    "Rash": "symptom.items.rash",
    "Itching": "symptom.items.itching",
    "Hives": "symptom.items.hives",
    "Swelling": "symptom.items.swelling",
    "Skin redness": "symptom.items.skinRedness",
    "Blister": "symptom.items.blister",
    "Wound": "symptom.items.wound",
    "Burn": "symptom.items.burn",
    "Bruising": "symptom.items.bruising",
    "Skin infection concern": "symptom.items.skinInfectionConcern",
    "Painful urination": "symptom.items.painfulUrination",
    "Frequent urination": "symptom.items.frequentUrination",
    "Blood in urine": "symptom.items.bloodInUrine",
    "Lower abdominal pain": "symptom.items.lowerAbdominalPain",
    "Flank pain": "symptom.items.flankPain",
    "Urinary urgency": "symptom.items.urinaryUrgency",
    "Difficulty urinating": "symptom.items.difficultyUrinating",
    "Fatigue": "symptom.items.fatigue",
    "Body aches": "symptom.items.bodyAches",
    "Chills": "symptom.items.chills",
    "Sweating": "symptom.items.sweating",
    "Weight loss": "symptom.items.weightLoss",
    "Sleep problems": "symptom.items.sleepProblems",
    "Dehydration": "symptom.items.dehydration",
    "Feeling very unwell": "symptom.items.feelingVeryUnwell",
    "Anxiety": "symptom.items.anxiety",
    "Panic feeling": "symptom.items.panicFeeling",
    "Low mood": "symptom.items.lowMood",
    "Stress": "symptom.items.stress",
    "Suicidal thoughts": "symptom.items.suicidalThoughts",
    "Self-harm thoughts": "symptom.items.selfHarmThoughts",
    "Blood in stool or vomit": "symptom.items.bloodInStoolOrVomit",
    "Severe abdominal pain": "symptom.items.severeAbdominalPain",
    "Stroke-like symptoms": "symptom.items.strokeLikeSymptoms"
  };
  return itemKeys[value] ?? `symptom.item.${toI18nSlug(value)}`;
}

export function symptomCategoryKey(value: string) {
  const categoryKeys: Record<string, string> = {
    Respiratory: "symptom.categories.respiratory",
    Pain: "symptom.categories.pain",
    Digestive: "symptom.categories.digestive",
    Neurological: "symptom.categories.neurological",
    Skin: "symptom.categories.skin",
    Urinary: "symptom.categories.urinary",
    General: "symptom.categories.general",
    "Mental / Emotional": "symptom.categories.mental"
  };
  return categoryKeys[value] ?? `symptom.category.${toI18nSlug(value)}`;
}

export function detailQuestionKey(value: string) {
  return `symptom.detail.${toI18nSlug(value)}`;
}

export function backgroundFieldKey(value: string) {
  const backgroundKeys: Record<string, string> = {
    age: "symptom.background.age",
    sex: "symptom.background.sex",
    pregnancy: "symptom.background.pregnancy",
    "chronic Conditions": "symptom.background.chronicConditions",
    chronicConditions: "symptom.background.chronicConditions",
    immunocompromised: "symptom.background.immunocompromised",
    medications: "symptom.background.medications",
    allergies: "symptom.background.allergies",
    "insurance Status": "symptom.background.insuranceStatus",
    insuranceStatus: "symptom.background.insuranceStatus",
    "country Region": "symptom.background.countryRegion",
    countryRegion: "symptom.background.countryRegion"
  };
  return backgroundKeys[value] ?? `symptom.background.${toI18nSlug(value)}`;
}

export function riskLevelKey(value: string) {
  return `risk.${toI18nSlug(value)}`;
}

export function careLevelKey(value: string) {
  return `careLevel.${toI18nSlug(value)}`;
}

export function triageTextKey(value: string) {
  return `triage.${toI18nSlug(value)}`;
}

export function careDetailKey(value: string) {
  return `care.detail.${toI18nSlug(value)}`;
}
