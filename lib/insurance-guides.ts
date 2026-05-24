export interface InsuranceGuide {
  country: string;
  publicSystem: string;
  whoItHelps: string[];
  officialLinks: { label: string; url: string }[];
  steps: string[];
  emergency: string;
  disclaimer: string;
  howWeHelp: string;
}

export const insuranceGuides: Record<string, InsuranceGuide> = {
  US: {
    country: "United States",
    publicSystem: "Health Insurance Marketplace, Medicaid, Medicare, CHIP",
    whoItHelps: [
      "People who need individual or family health coverage",
      "People who lost employer coverage",
      "People checking Medicaid or CHIP eligibility",
      "People turning 26 and losing parent's plan",
    ],
    officialLinks: [
      { label: "Healthcare.gov Marketplace", url: "https://www.healthcare.gov/" },
      { label: "Browse plans and estimated prices", url: "https://www.healthcare.gov/see-plans/" },
      { label: "Find local help", url: "https://www.healthcare.gov/find-assistance/" },
    ],
    steps: [
      "Check whether you can enroll now or qualify for a Special Enrollment Period",
      "Prepare household income, ZIP code, household size, and current coverage information",
      "Compare premiums, deductible, network, and prescription coverage",
      "Apply through the official Marketplace or your state marketplace",
    ],
    emergency: "For emergencies in the United States, call 911.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official government resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a doctor, licensed insurance advisor, or official service representative.",
  },

  UK: {
    country: "United Kingdom",
    publicSystem: "National Health Service (NHS)",
    whoItHelps: [
      "UK residents eligible for NHS care",
      "Visitors who may need to pay the NHS surcharge",
      "People registering with a GP for the first time",
      "Those exploring private insurance as a supplement",
    ],
    officialLinks: [
      { label: "Register with a GP", url: "https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/" },
      { label: "NHS visitor guidance", url: "https://www.nhs.uk/using-the-nhs/nhs-services/visitors/" },
      { label: "NHS services overview", url: "https://www.nhs.uk/" },
    ],
    steps: [
      "Register with a local GP surgery — this is your main entry point for NHS care",
      "Check if you need to pay the immigration health surcharge as part of your visa",
      "Understand that NHS covers most care; private insurance may speed up specialist access",
      "If using private insurance, check whether GP referral is required",
    ],
    emergency: "For emergencies in the United Kingdom, call 999 or go to A&E.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official NHS resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a GP, NHS service, or private insurance advisor.",
  },

  CA: {
    country: "Canada",
    publicSystem: "Provincial / Territorial Health Insurance",
    whoItHelps: [
      "Canadian citizens and permanent residents",
      "New residents applying for provincial health cards",
      "People checking coverage for services not included in public plans",
      "Those looking at private insurance for dental, vision, or prescriptions",
    ],
    officialLinks: [
      { label: "Learn about provincial health cards", url: "https://www.canada.ca/en/health-canada/services/canada-health-care-system.html" },
      { label: "Check your province or territory", url: "https://www.canada.ca/en/health-canada/services/provincial-territorial-health-care-resources.html" },
    ],
    steps: [
      "Apply for a health insurance card from your province or territory",
      "Note that there is a waiting period in some provinces (up to 3 months)",
      "Public plans cover medically necessary hospital and doctor services",
      "Private insurance can cover dental, prescription drugs, and other services not in the public plan",
    ],
    emergency: "For emergencies in Canada, call 911.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. Coverage rules vary by province and territory.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a doctor or provincial health service representative.",
  },

  AU: {
    country: "Australia",
    publicSystem: "Medicare",
    whoItHelps: [
      "Australian citizens and permanent residents",
      "People from countries with a Reciprocal Health Care Agreement",
      "Those considering private health insurance for hospital or extras cover",
    ],
    officialLinks: [
      { label: "Enrol in Medicare", url: "https://www.servicesaustralia.gov.au/medicare" },
      { label: "Learn about Medicare card", url: "https://www.servicesaustralia.gov.au/medicare-card" },
      { label: "Private health insurance information", url: "https://www.privatehealth.gov.au/" },
    ],
    steps: [
      "Enrol in Medicare through Services Australia",
      "Get your Medicare card — you will need it for GP visits and public hospital care",
      "Medicare covers public hospital treatment and subsidised out-of-hospital services",
      "Private health insurance can cover hospital as a private patient and extras like dental",
    ],
    emergency: "For emergencies in Australia, call 000.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official Australian government resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a GP, specialist, or Medicare service centre.",
  },

  DE: {
    country: "Germany",
    publicSystem: "Statutory Health Insurance (Gesetzliche Krankenversicherung) / Private Health Insurance (Private Krankenversicherung)",
    whoItHelps: [
      "Employees under the income threshold (automatically in statutory insurance)",
      "Self-employed and freelancers choosing between statutory and private",
      "Students, job-seekers, and pensioners with specific coverage rules",
      "New residents who must have health insurance from day one",
    ],
    officialLinks: [
      { label: "Learn about statutory health insurance", url: "https://www.bundesgesundheitsministerium.de/english-version.html" },
      { label: "Information for EU residents", url: "https://www.bundesgesundheitsministerium.de/themen/internationale-gesundheitspolitik.html" },
    ],
    steps: [
      "Health insurance is mandatory in Germany — you must have coverage",
      "Employees earning below the threshold are automatically in the statutory system (GKV)",
      "Higher earners and self-employed can choose private insurance (PKV)",
      "Register with a Krankenkasse (sickness fund) of your choice for statutory coverage",
    ],
    emergency: "For emergencies in Germany, call 112.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official German government resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a doctor (Arzt) or your Krankenkasse.",
  },

  FR: {
    country: "France",
    publicSystem: "Assurance Maladie / Carte Vitale / Complémentaire santé",
    whoItHelps: [
      "Residents and workers in France",
      "People registering with Assurance Maladie for the first time",
      "Those looking for complementary private insurance (mutuelle)",
    ],
    officialLinks: [
      { label: "French Health Insurance guidance", url: "https://www.ameli.fr/" },
      { label: "Information for foreign residents", url: "https://www.service-public.fr/" },
    ],
    steps: [
      "Register with Assurance Maladie to get your Carte Vitale",
      "The public system covers a percentage of most medical costs",
      "Most people also get a mutuelle (complementary insurance) to cover the remaining portion",
      "Your employer may provide a mutuelle; check your contract",
    ],
    emergency: "For emergencies in France, call 112 or 15 (SAMU).",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official French government resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a médecin traitant or your mutuelle advisor.",
  },

  JP: {
    country: "Japan",
    publicSystem: "National Health Insurance / Employee Health Insurance",
    whoItHelps: [
      "All residents of Japan (mandatory enrollment)",
      "Employees enrolled through their workplace",
      "Self-employed and others enrolled in National Health Insurance",
      "Long-term residents who need to join the public system",
    ],
    officialLinks: [
      { label: "National Health Insurance guide", url: "https://www.mhlw.go.jp/english/" },
      { label: "Japan Healthcare Info", url: "https://www.japanhealthcareinfo.com/" },
    ],
    steps: [
      "Enroll in health insurance at your local city/ward office within 14 days of moving in",
      "Employee Health Insurance is arranged by your employer; National Health Insurance is for others",
      "You will receive a health insurance card — bring it to every medical visit",
      "The public system covers 70% of costs; you pay 30% at the point of care",
    ],
    emergency: "For emergencies in Japan, call 119 for ambulance.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official Japanese government resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a doctor or your local city office.",
  },

  KR: {
    country: "South Korea",
    publicSystem: "National Health Insurance Service (NHIS)",
    whoItHelps: [
      "All residents of South Korea (mandatory enrollment)",
      "Employees automatically enrolled through workplace",
      "Self-employed and others registering individually",
      "Foreign residents staying 6 months or longer",
    ],
    officialLinks: [
      { label: "National Health Insurance Service", url: "https://www.nhis.or.kr/english/" },
    ],
    steps: [
      "Most residents are automatically enrolled through their employer",
      "Self-employed individuals register with NHIS directly",
      "The system covers a percentage of medical, dental, and prescription costs",
      "Many people also get private insurance to cover remaining out-of-pocket costs",
    ],
    emergency: "For emergencies in South Korea, call 119 for ambulance.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official Korean government resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a doctor or NHIS service centre.",
  },

  SG: {
    country: "Singapore",
    publicSystem: "MediShield Life / MediSave / Integrated Shield Plans",
    whoItHelps: [
      "Singapore citizens and permanent residents (automatic MediShield Life)",
      "People considering private Integrated Shield Plans for additional coverage",
      "Workers contributing to MediSave through CPF",
    ],
    officialLinks: [
      { label: "Ministry of Health Singapore", url: "https://www.moh.gov.sg/" },
      { label: "MediShield Life information", url: "https://www.moh.gov.sg/healthcare-schemes-subsidies/medishield-life" },
    ],
    steps: [
      "All citizens and PRs are automatically covered by MediShield Life for large hospital bills",
      "MediSave (your CPF health account) can be used for outpatient care and premiums",
      "Private Integrated Shield Plans can provide additional coverage on top of MediShield Life",
      "Check with your employer about any additional health benefits",
    ],
    emergency: "For emergencies in Singapore, call 995 for ambulance.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official Singapore government resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a doctor at a polyclinic, hospital, or your insurer.",
  },

  NL: {
    country: "Netherlands",
    publicSystem: "Mandatory basic health insurance (Zorgverzekeringswet)",
    whoItHelps: [
      "All residents and workers in the Netherlands (mandatory)",
      "People choosing a basic insurance package from private insurers",
      "International students and workers checking their insurance obligation",
    ],
    officialLinks: [
      { label: "Dutch healthcare information", url: "https://www.government.nl/topics/health-insurance" },
      { label: "Zorgverzekeringslijn (information line)", url: "https://www.rijksoverheid.nl/onderwerpen/zorgverzekering" },
    ],
    steps: [
      "Everyone living or working in the Netherlands must take out basic health insurance within 4 months",
      "Basic insurance covers GP visits, hospital care, and prescription medication",
      "You choose from private insurers but the basic package is standardised by law",
      "You may also add supplementary insurance for dental, physiotherapy, or alternative care",
    ],
    emergency: "For emergencies in the Netherlands, call 112.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official Dutch government resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a huisarts (GP) or your zorgverzekeraar.",
  },

  SE: {
    country: "Sweden",
    publicSystem: "Public healthcare by region (Region) / Private insurance supplemental",
    whoItHelps: [
      "All residents registered in Sweden (personnummer required)",
      "EU/EEA citizens with a European Health Insurance Card",
      "People waiting for specialist care who may consider private options",
    ],
    officialLinks: [
      { label: "Swedish healthcare information", url: "https://www.1177.se/en/" },
      { label: "Försäkringskassan (Social Insurance)", url: "https://www.forsakringskassan.se/english" },
    ],
    steps: [
      "Register with your local region to access public healthcare",
      "Public healthcare fees are capped annually (högkostnadsskydd)",
      "Primary care is accessed through vårdcentral (health centre)",
      "Private health insurance can provide faster access to specialist care",
    ],
    emergency: "For emergencies in Sweden, call 112.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official Swedish government resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a doctor at your vårdcentral or your insurer.",
  },

  NZ: {
    country: "New Zealand",
    publicSystem: "Publicly funded healthcare / Private health insurance",
    whoItHelps: [
      "New Zealand citizens and permanent residents",
      "Work visa holders eligible for publicly funded care",
      "People considering private insurance for faster specialist access",
    ],
    officialLinks: [
      { label: "Te Whatu Ora — Health New Zealand", url: "https://www.tewhatuora.govt.nz/" },
      { label: "Eligibility for publicly funded healthcare", url: "https://www.tewhatuora.govt.nz/for-health-professionals/eligibility/" },
    ],
    steps: [
      "Most hospital care and specialist visits are free for eligible residents",
      "GP visits and prescriptions have subsidised costs but are not free",
      "ACC (Accident Compensation Corporation) covers injury-related care for everyone in NZ",
      "Private insurance can reduce wait times for elective surgery and specialist appointments",
    ],
    emergency: "For emergencies in New Zealand, call 111.",
    disclaimer: "HealthMatchAI does not sell insurance or determine eligibility. All links are to official New Zealand government resources.",
    howWeHelp: "You can use your HealthMatchAI medical summary when speaking with a GP, specialist, or ACC provider.",
  },
};

export const countryList = Object.entries(insuranceGuides).map(([code, guide]) => ({
  code,
  name: guide.country,
}));
