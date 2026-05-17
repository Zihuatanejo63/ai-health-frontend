export type DetailGroup = "respiratory" | "chestPain" | "digestive" | "neurological" | "mental" | "general";

export type SymptomItem = {
  id: string;
  value: string;
  labelKey: string;
  category: string;
  relatedDetailGroup?: DetailGroup;
  redFlagWeight?: number;
};

export type SymptomCategory = {
  id: string;
  labelKey: string;
  symptoms: SymptomItem[];
};

export type DetailOption = {
  value: string;
  labelKey: string;
};

export type DetailQuestion = {
  id: string;
  labelKey: string;
  type: "choice" | "text";
  options?: DetailOption[];
};

export type RedFlagGroup = {
  id: string;
  labelKey: string;
  items: SymptomItem[];
};

const symptom = (
  id: string,
  labelKey: string,
  category: string,
  relatedDetailGroup?: DetailGroup,
  redFlagWeight?: number
): SymptomItem => ({ id, value: id, labelKey, category, relatedDetailGroup, redFlagWeight });

const yesNoOptions: DetailOption[] = [
  { value: "no", labelKey: "common.no" },
  { value: "yes", labelKey: "common.yes" }
];

export const symptomCategories: SymptomCategory[] = [
  {
    id: "respiratory",
    labelKey: "symptom.categories.respiratory",
    symptoms: [
      symptom("fever", "symptom.items.fever", "respiratory", "respiratory"),
      symptom("cough", "symptom.items.cough", "respiratory", "respiratory"),
      symptom("sore-throat", "symptom.items.soreThroat", "respiratory", "respiratory"),
      symptom("runny-nose", "symptom.items.runnyNose", "respiratory", "respiratory"),
      symptom("nasal-congestion", "symptom.items.nasalCongestion", "respiratory", "respiratory"),
      symptom("shortness-of-breath", "symptom.items.shortnessOfBreath", "respiratory", "respiratory", 3),
      symptom("chest-tightness", "symptom.items.chestTightness", "respiratory", "respiratory", 2),
      symptom("wheezing", "symptom.items.wheezing", "respiratory", "respiratory"),
      symptom("loss-of-smell-or-taste", "symptom.items.lossOfSmellOrTaste", "respiratory", "respiratory"),
      symptom("hoarseness", "symptom.items.hoarseness", "respiratory", "respiratory")
    ]
  },
  {
    id: "pain",
    labelKey: "symptom.categories.pain",
    symptoms: [
      symptom("headache", "symptom.items.headache", "pain", "neurological"),
      symptom("chest-pain", "symptom.items.chestPain", "pain", "chestPain", 4),
      symptom("abdominal-pain", "symptom.items.abdominalPain", "pain", "digestive", 2),
      symptom("back-pain", "symptom.items.backPain", "pain", "general"),
      symptom("neck-pain", "symptom.items.neckPain", "pain", "general"),
      symptom("joint-pain", "symptom.items.jointPain", "pain", "general"),
      symptom("muscle-pain", "symptom.items.musclePain", "pain", "general"),
      symptom("tooth-pain", "symptom.items.toothPain", "pain", "general"),
      symptom("ear-pain", "symptom.items.earPain", "pain", "general"),
      symptom("eye-pain", "symptom.items.eyePain", "pain", "general")
    ]
  },
  {
    id: "digestive",
    labelKey: "symptom.categories.digestive",
    symptoms: [
      symptom("nausea", "symptom.items.nausea", "digestive", "digestive"),
      symptom("vomiting", "symptom.items.vomiting", "digestive", "digestive"),
      symptom("diarrhea", "symptom.items.diarrhea", "digestive", "digestive"),
      symptom("constipation", "symptom.items.constipation", "digestive", "digestive"),
      symptom("stomach-pain", "symptom.items.stomachPain", "digestive", "digestive"),
      symptom("bloating", "symptom.items.bloating", "digestive", "digestive"),
      symptom("loss-of-appetite", "symptom.items.lossOfAppetite", "digestive", "digestive"),
      symptom("acid-reflux", "symptom.items.acidReflux", "digestive", "digestive"),
      symptom("blood-in-stool", "symptom.items.bloodInStool", "digestive", "digestive", 3),
      symptom("black-stool", "symptom.items.blackStool", "digestive", "digestive", 3)
    ]
  },
  {
    id: "neurological",
    labelKey: "symptom.categories.neurological",
    symptoms: [
      symptom("dizziness", "symptom.items.dizziness", "neurological", "neurological"),
      symptom("confusion", "symptom.items.confusion", "neurological", "neurological", 4),
      symptom("fainting", "symptom.items.fainting", "neurological", "neurological", 4),
      symptom("numbness", "symptom.items.numbness", "neurological", "neurological", 3),
      symptom("weakness", "symptom.items.weakness", "neurological", "neurological", 3),
      symptom("seizure", "symptom.items.seizure", "neurological", "neurological", 4),
      symptom("vision-changes", "symptom.items.visionChanges", "neurological", "neurological", 3),
      symptom("severe-headache", "symptom.items.severeHeadache", "neurological", "neurological", 3),
      symptom("trouble-speaking", "symptom.items.troubleSpeaking", "neurological", "neurological", 4),
      symptom("balance-problems", "symptom.items.balanceProblems", "neurological", "neurological", 3)
    ]
  },
  {
    id: "skin",
    labelKey: "symptom.categories.skin",
    symptoms: [
      symptom("rash", "symptom.items.rash", "skin", "general"),
      symptom("itching", "symptom.items.itching", "skin", "general"),
      symptom("hives", "symptom.items.hives", "skin", "general"),
      symptom("swelling", "symptom.items.swelling", "skin", "general"),
      symptom("skin-redness", "symptom.items.skinRedness", "skin", "general"),
      symptom("blister", "symptom.items.blister", "skin", "general"),
      symptom("wound", "symptom.items.wound", "skin", "general"),
      symptom("burn", "symptom.items.burn", "skin", "general"),
      symptom("bruising", "symptom.items.bruising", "skin", "general"),
      symptom("skin-infection-concern", "symptom.items.skinInfectionConcern", "skin", "general")
    ]
  },
  {
    id: "urinary",
    labelKey: "symptom.categories.urinary",
    symptoms: [
      symptom("painful-urination", "symptom.items.painfulUrination", "urinary", "general"),
      symptom("frequent-urination", "symptom.items.frequentUrination", "urinary", "general"),
      symptom("blood-in-urine", "symptom.items.bloodInUrine", "urinary", "general", 2),
      symptom("lower-abdominal-pain", "symptom.items.lowerAbdominalPain", "urinary", "digestive"),
      symptom("flank-pain", "symptom.items.flankPain", "urinary", "general", 2),
      symptom("urinary-urgency", "symptom.items.urinaryUrgency", "urinary", "general"),
      symptom("difficulty-urinating", "symptom.items.difficultyUrinating", "urinary", "general")
    ]
  },
  {
    id: "general",
    labelKey: "symptom.categories.general",
    symptoms: [
      symptom("fatigue", "symptom.items.fatigue", "general", "general"),
      symptom("body-aches", "symptom.items.bodyAches", "general", "general"),
      symptom("chills", "symptom.items.chills", "general", "general"),
      symptom("sweating", "symptom.items.sweating", "general", "general"),
      symptom("weight-loss", "symptom.items.weightLoss", "general", "general"),
      symptom("sleep-problems", "symptom.items.sleepProblems", "general", "general"),
      symptom("dehydration", "symptom.items.dehydration", "general", "general", 2),
      symptom("feeling-very-unwell", "symptom.items.feelingVeryUnwell", "general", "general", 2)
    ]
  },
  {
    id: "mental",
    labelKey: "symptom.categories.mental",
    symptoms: [
      symptom("anxiety", "symptom.items.anxiety", "mental", "mental"),
      symptom("panic-feeling", "symptom.items.panicFeeling", "mental", "mental"),
      symptom("low-mood", "symptom.items.lowMood", "mental", "mental"),
      symptom("stress", "symptom.items.stress", "mental", "mental"),
      symptom("suicidal-thoughts", "symptom.items.suicidalThoughts", "mental", "mental", 5),
      symptom("self-harm-thoughts", "symptom.items.selfHarmThoughts", "mental", "mental", 5)
    ]
  },
  {
    id: "femaleHealth",
    labelKey: "symptom.categories.femaleHealth",
    symptoms: [
      symptom("pelvic-pain", "symptom.items.pelvicPain", "femaleHealth", "digestive", 2),
      symptom("vaginal-bleeding", "symptom.items.vaginalBleeding", "femaleHealth", "general", 3),
      symptom("pregnancy-concern", "symptom.items.pregnancyConcern", "femaleHealth", "general", 2),
      symptom("missed-period", "symptom.items.missedPeriod", "femaleHealth", "general")
    ]
  },
  {
    id: "special",
    labelKey: "symptom.categories.special",
    symptoms: [
      symptom("recent-injury", "symptom.items.recentInjury", "special", "general", 2),
      symptom("recent-surgery-concern", "symptom.items.recentSurgeryConcern", "special", "general", 2),
      symptom("medication-reaction-concern", "symptom.items.medicationReactionConcern", "special", "general", 2),
      symptom("severe-allergic-reaction", "symptom.items.severeAllergicReaction", "special", "general", 5)
    ]
  }
];

export const detailQuestionsByGroup: Record<DetailGroup, DetailQuestion[]> = {
  respiratory: [
    { id: "coughType", labelKey: "symptom.detail.coughType", type: "choice", options: [
      { value: "dry", labelKey: "symptom.option.dry" },
      { value: "productive", labelKey: "symptom.option.productive" },
      { value: "blood", labelKey: "symptom.option.blood" },
      { value: "none", labelKey: "common.none" }
    ] },
    { id: "troubleBreathing", labelKey: "symptom.detail.troubleBreathing", type: "choice", options: yesNoOptions },
    { id: "chestPainOrPressure", labelKey: "symptom.detail.chestPainOrPressure", type: "choice", options: yesNoOptions },
    { id: "wheezing", labelKey: "symptom.detail.wheezing", type: "choice", options: yesNoOptions },
    { id: "feverLevel", labelKey: "symptom.detail.feverLevel", type: "choice", options: [
      { value: "normal", labelKey: "symptom.temperature.normal" },
      { value: "lowGrade", labelKey: "symptom.temperature.lowGrade" },
      { value: "moderate", labelKey: "symptom.temperature.moderate" },
      { value: "high", labelKey: "symptom.temperature.high" },
      { value: "dontKnow", labelKey: "symptom.temperature.dontKnow" }
    ] },
    { id: "symptomsImprovedThenWorsened", labelKey: "symptom.detail.symptomsImprovedThenWorsened", type: "choice", options: yesNoOptions },
    { id: "recentExposure", labelKey: "symptom.detail.recentExposure", type: "choice", options: [
      { value: "flu", labelKey: "symptom.option.flu" },
      { value: "covid", labelKey: "symptom.option.covid" },
      { value: "none", labelKey: "common.none" },
      { value: "unknown", labelKey: "symptom.option.unknown" }
    ] }
  ],
  chestPain: [
    { id: "suddenOnset", labelKey: "symptom.detail.suddenOnset", type: "choice", options: yesNoOptions },
    { id: "troubleBreathing", labelKey: "symptom.detail.troubleBreathing", type: "choice", options: yesNoOptions },
    { id: "radiatingPain", labelKey: "symptom.detail.radiatingPain", type: "choice", options: [
      { value: "arm", labelKey: "symptom.option.arm" },
      { value: "jaw", labelKey: "symptom.option.jaw" },
      { value: "back", labelKey: "symptom.option.back" },
      { value: "none", labelKey: "common.none" }
    ] },
    { id: "sweatingOrNausea", labelKey: "symptom.detail.sweatingOrNausea", type: "choice", options: yesNoOptions },
    { id: "dizziness", labelKey: "symptom.detail.dizziness", type: "choice", options: yesNoOptions },
    { id: "heartDiseaseHistory", labelKey: "symptom.detail.heartDiseaseHistory", type: "choice", options: yesNoOptions }
  ],
  digestive: [
    { id: "painLocation", labelKey: "symptom.detail.painLocation", type: "choice", options: [
      { value: "upper", labelKey: "symptom.option.upper" },
      { value: "lower", labelKey: "symptom.option.lower" },
      { value: "rightLower", labelKey: "symptom.option.rightLower" },
      { value: "leftLower", labelKey: "symptom.option.leftLower" },
      { value: "general", labelKey: "symptom.option.general" }
    ] },
    { id: "suddenSeverePain", labelKey: "symptom.detail.suddenSeverePain", type: "choice", options: yesNoOptions },
    { id: "worseningPain", labelKey: "symptom.detail.worseningPain", type: "choice", options: yesNoOptions },
    { id: "vomiting", labelKey: "symptom.detail.vomiting", type: "choice", options: yesNoOptions },
    { id: "bloodInStoolOrBlackStool", labelKey: "symptom.detail.bloodInStoolOrBlackStool", type: "choice", options: yesNoOptions },
    { id: "abdominalRigidity", labelKey: "symptom.detail.abdominalRigidity", type: "choice", options: yesNoOptions },
    { id: "pregnancyPossible", labelKey: "symptom.detail.pregnancyPossible", type: "choice", options: yesNoOptions }
  ],
  neurological: [
    { id: "suddenSevereHeadache", labelKey: "symptom.detail.suddenSevereHeadache", type: "choice", options: yesNoOptions },
    { id: "oneSidedWeaknessOrNumbness", labelKey: "symptom.detail.oneSidedWeaknessOrNumbness", type: "choice", options: yesNoOptions },
    { id: "troubleSpeaking", labelKey: "symptom.detail.troubleSpeaking", type: "choice", options: yesNoOptions },
    { id: "visionChanges", labelKey: "symptom.detail.visionChanges", type: "choice", options: yesNoOptions },
    { id: "confusion", labelKey: "symptom.detail.confusion", type: "choice", options: yesNoOptions },
    { id: "seizure", labelKey: "symptom.detail.seizure", type: "choice", options: yesNoOptions },
    { id: "fainting", labelKey: "symptom.detail.fainting", type: "choice", options: yesNoOptions }
  ],
  mental: [
    { id: "suicidalThoughts", labelKey: "symptom.detail.suicidalThoughts", type: "choice", options: yesNoOptions },
    { id: "selfHarmThoughts", labelKey: "symptom.detail.selfHarmThoughts", type: "choice", options: yesNoOptions },
    { id: "immediateDanger", labelKey: "symptom.detail.immediateDanger", type: "choice", options: yesNoOptions }
  ],
  general: [
    { id: "mainConcern", labelKey: "symptom.detail.mainConcern", type: "text" },
    { id: "whatMakesItWorse", labelKey: "symptom.detail.whatMakesItWorse", type: "text" },
    { id: "whatHelps", labelKey: "symptom.detail.whatHelps", type: "text" }
  ]
};

const redFlag = (id: string, labelKey: string) => symptom(id, labelKey, "redFlags", "general", 5);

export const redFlagGroups: RedFlagGroup[] = [
  {
    id: "emergency",
    labelKey: "symptom.redFlagGroups.emergency",
    items: [
      redFlag("chestPainOrPressure", "symptom.redFlags.chestPainOrPressure"),
      redFlag("troubleBreathing", "symptom.redFlags.troubleBreathing"),
      redFlag("confusion", "symptom.redFlags.confusion"),
      redFlag("hardToWake", "symptom.redFlags.hardToWake"),
      redFlag("seizure", "symptom.redFlags.seizure"),
      redFlag("fainting", "symptom.redFlags.fainting"),
      redFlag("strokeLikeSymptoms", "symptom.redFlags.strokeLikeSymptoms"),
      redFlag("severeBleeding", "symptom.redFlags.severeBleeding"),
      redFlag("severeAllergicReaction", "symptom.redFlags.severeAllergicReaction"),
      redFlag("blueOrGrayLips", "symptom.redFlags.blueOrGrayLips")
    ]
  },
  {
    id: "infection",
    labelKey: "symptom.redFlagGroups.infection",
    items: [
      redFlag("stiffNeck", "symptom.redFlags.stiffNeck"),
      redFlag("rashWithFever", "symptom.redFlags.rashWithFever"),
      redFlag("severeDehydration", "symptom.redFlags.severeDehydration"),
      redFlag("persistentVomiting", "symptom.redFlags.persistentVomiting"),
      redFlag("notUrinating", "symptom.redFlags.notUrinating")
    ]
  },
  {
    id: "digestive",
    labelKey: "symptom.redFlagGroups.digestive",
    items: [
      redFlag("bloodInVomit", "symptom.redFlags.bloodInVomit"),
      redFlag("bloodInStool", "symptom.redFlags.bloodInStool"),
      redFlag("blackStool", "symptom.redFlags.blackStool"),
      redFlag("severeAbdominalPain", "symptom.redFlags.severeAbdominalPain")
    ]
  },
  {
    id: "safety",
    labelKey: "symptom.redFlagGroups.safety",
    items: [
      redFlag("suicidalThoughts", "symptom.redFlags.suicidalThoughts"),
      redFlag("selfHarmThoughts", "symptom.redFlags.selfHarmThoughts")
    ]
  }
];

export const redFlagSymptoms: SymptomItem[] = redFlagGroups.flatMap((group) => group.items);

export function getSymptomCategory(symptomValue: string) {
  return symptomCategories.find((category) => category.symptoms.some((item) => item.value === symptomValue))?.id ?? "general";
}

export function getSymptomItem(symptomValue: string) {
  return symptomCategories.flatMap((category) => category.symptoms).find((item) => item.value === symptomValue);
}

export function getDetailGroup(symptomValue: string): DetailGroup {
  return getSymptomItem(symptomValue)?.relatedDetailGroup ?? "general";
}

export function getDetailQuestionsForPrimary(symptomValue: string) {
  return detailQuestionsByGroup[getDetailGroup(symptomValue)];
}

export function getDetailQuestions(category: string) {
  return detailQuestionsByGroup[(category as DetailGroup) in detailQuestionsByGroup ? (category as DetailGroup) : "general"].map((question) => question.id);
}
