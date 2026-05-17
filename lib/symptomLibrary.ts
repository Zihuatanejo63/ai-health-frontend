export type SymptomItem = {
  id: string;
  value: string;
  labelKey: string;
};

export type SymptomCategory = {
  id: string;
  labelKey: string;
  symptoms: SymptomItem[];
};

const symptom = (id: string, labelKey: string): SymptomItem => ({ id, value: id, labelKey });

export const symptomCategories: SymptomCategory[] = [
  {
    id: "respiratory",
    labelKey: "symptom.categories.respiratory",
    symptoms: [
      symptom("fever", "symptom.items.fever"),
      symptom("cough", "symptom.items.cough"),
      symptom("sore-throat", "symptom.items.soreThroat"),
      symptom("runny-nose", "symptom.items.runnyNose"),
      symptom("nasal-congestion", "symptom.items.nasalCongestion"),
      symptom("shortness-of-breath", "symptom.items.shortnessOfBreath"),
      symptom("chest-tightness", "symptom.items.chestTightness"),
      symptom("wheezing", "symptom.items.wheezing"),
      symptom("loss-of-smell-or-taste", "symptom.items.lossOfSmellOrTaste"),
      symptom("hoarseness", "symptom.items.hoarseness")
    ]
  },
  {
    id: "pain",
    labelKey: "symptom.categories.pain",
    symptoms: [
      symptom("headache", "symptom.items.headache"),
      symptom("chest-pain", "symptom.items.chestPain"),
      symptom("abdominal-pain", "symptom.items.abdominalPain"),
      symptom("back-pain", "symptom.items.backPain"),
      symptom("neck-pain", "symptom.items.neckPain"),
      symptom("joint-pain", "symptom.items.jointPain"),
      symptom("muscle-pain", "symptom.items.musclePain"),
      symptom("tooth-pain", "symptom.items.toothPain"),
      symptom("ear-pain", "symptom.items.earPain"),
      symptom("eye-pain", "symptom.items.eyePain")
    ]
  },
  {
    id: "digestive",
    labelKey: "symptom.categories.digestive",
    symptoms: [
      symptom("nausea", "symptom.items.nausea"),
      symptom("vomiting", "symptom.items.vomiting"),
      symptom("diarrhea", "symptom.items.diarrhea"),
      symptom("constipation", "symptom.items.constipation"),
      symptom("stomach-pain", "symptom.items.stomachPain"),
      symptom("bloating", "symptom.items.bloating"),
      symptom("loss-of-appetite", "symptom.items.lossOfAppetite"),
      symptom("acid-reflux", "symptom.items.acidReflux"),
      symptom("blood-in-stool", "symptom.items.bloodInStool"),
      symptom("black-stool", "symptom.items.blackStool")
    ]
  },
  {
    id: "neurological",
    labelKey: "symptom.categories.neurological",
    symptoms: [
      symptom("dizziness", "symptom.items.dizziness"),
      symptom("confusion", "symptom.items.confusion"),
      symptom("fainting", "symptom.items.fainting"),
      symptom("numbness", "symptom.items.numbness"),
      symptom("weakness", "symptom.items.weakness"),
      symptom("seizure", "symptom.items.seizure"),
      symptom("vision-changes", "symptom.items.visionChanges"),
      symptom("severe-headache", "symptom.items.severeHeadache"),
      symptom("trouble-speaking", "symptom.items.troubleSpeaking"),
      symptom("balance-problems", "symptom.items.balanceProblems")
    ]
  },
  {
    id: "skin",
    labelKey: "symptom.categories.skin",
    symptoms: [
      symptom("rash", "symptom.items.rash"),
      symptom("itching", "symptom.items.itching"),
      symptom("hives", "symptom.items.hives"),
      symptom("swelling", "symptom.items.swelling"),
      symptom("skin-redness", "symptom.items.skinRedness"),
      symptom("blister", "symptom.items.blister"),
      symptom("wound", "symptom.items.wound"),
      symptom("burn", "symptom.items.burn"),
      symptom("bruising", "symptom.items.bruising"),
      symptom("skin-infection-concern", "symptom.items.skinInfectionConcern")
    ]
  },
  {
    id: "urinary",
    labelKey: "symptom.categories.urinary",
    symptoms: [
      symptom("painful-urination", "symptom.items.painfulUrination"),
      symptom("frequent-urination", "symptom.items.frequentUrination"),
      symptom("blood-in-urine", "symptom.items.bloodInUrine"),
      symptom("lower-abdominal-pain", "symptom.items.lowerAbdominalPain"),
      symptom("flank-pain", "symptom.items.flankPain"),
      symptom("urinary-urgency", "symptom.items.urinaryUrgency"),
      symptom("difficulty-urinating", "symptom.items.difficultyUrinating")
    ]
  },
  {
    id: "general",
    labelKey: "symptom.categories.general",
    symptoms: [
      symptom("fatigue", "symptom.items.fatigue"),
      symptom("body-aches", "symptom.items.bodyAches"),
      symptom("chills", "symptom.items.chills"),
      symptom("sweating", "symptom.items.sweating"),
      symptom("weight-loss", "symptom.items.weightLoss"),
      symptom("sleep-problems", "symptom.items.sleepProblems"),
      symptom("dehydration", "symptom.items.dehydration"),
      symptom("feeling-very-unwell", "symptom.items.feelingVeryUnwell")
    ]
  },
  {
    id: "mental",
    labelKey: "symptom.categories.mental",
    symptoms: [
      symptom("anxiety", "symptom.items.anxiety"),
      symptom("panic-feeling", "symptom.items.panicFeeling"),
      symptom("low-mood", "symptom.items.lowMood"),
      symptom("stress", "symptom.items.stress"),
      symptom("suicidal-thoughts", "symptom.items.suicidalThoughts"),
      symptom("self-harm-thoughts", "symptom.items.selfHarmThoughts")
    ]
  }
];

export const redFlagSymptoms: SymptomItem[] = [
  symptom("chest-pain", "symptom.items.chestPain"),
  symptom("trouble-breathing", "symptom.items.troubleBreathing"),
  symptom("confusion", "symptom.items.confusion"),
  symptom("fainting", "symptom.items.fainting"),
  symptom("seizure", "symptom.items.seizure"),
  symptom("severe-dehydration", "symptom.items.severeDehydration"),
  symptom("stiff-neck", "symptom.items.stiffNeck"),
  symptom("persistent-vomiting", "symptom.items.persistentVomiting"),
  symptom("blood-in-stool-or-vomit", "symptom.items.bloodInStoolOrVomit"),
  symptom("severe-abdominal-pain", "symptom.items.severeAbdominalPain"),
  symptom("stroke-like-symptoms", "symptom.items.strokeLikeSymptoms"),
  symptom("suicidal-thoughts", "symptom.items.suicidalThoughts")
];

export function getSymptomCategory(symptomValue: string) {
  return symptomCategories.find((category) => category.symptoms.some((item) => item.value === symptomValue))?.id ?? "general";
}

export function getDetailQuestions(category: string) {
  if (category === "respiratory") return ["cough-type", "shortness-of-breath", "chest-pain"];
  if (category === "digestive") return ["vomiting", "diarrhea", "blood-in-stool", "pain-location"];
  if (category === "pain") return ["pain-location", "pain-score", "sudden-onset"];
  if (category === "neurological") return ["numbness", "weakness", "speech-trouble", "vision-changes"];
  if (category === "mental") return ["current-safety", "support-available", "recent-stressors"];
  return ["main-concern", "what-makes-it-worse", "what-helps"];
}
