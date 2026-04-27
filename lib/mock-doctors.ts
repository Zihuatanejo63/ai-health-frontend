import type { Doctor } from "./types";

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Jenkins, MD",
    specialty: "Dermatology",
    country: "United States",
    languages: ["English", "Spanish"],
    rating: 4.9,
    feeUsd: 120,
    available: true,
    tags: ["Skin rash", "Allergy", "Telehealth"]
  },
  {
    id: "doc-2",
    name: "Dr. Michael Chen, FACP",
    specialty: "Internal Medicine",
    country: "United States",
    languages: ["English", "Mandarin"],
    rating: 4.8,
    feeUsd: 140,
    available: true,
    tags: ["General symptoms", "Follow-up", "Preventive care"]
  },
  {
    id: "doc-3",
    name: "Dr. Emily Rivera, DO",
    specialty: "Family Medicine",
    country: "Mexico",
    languages: ["English", "Spanish"],
    rating: 4.7,
    feeUsd: 100,
    available: false,
    tags: ["Primary care", "Urgent consult", "Women health"]
  },
  {
    id: "doc-4",
    name: "Dr. James Patel, MD",
    specialty: "Cardiology",
    country: "United Kingdom",
    languages: ["English", "Hindi"],
    rating: 4.9,
    feeUsd: 180,
    available: true,
    tags: ["Chest pain triage", "Heart monitoring", "Second opinion"]
  },
  {
    id: "doc-5",
    name: "Dr. Amina Haddad, MD",
    specialty: "Pediatrics",
    country: "United Arab Emirates",
    languages: ["Arabic", "English", "French"],
    rating: 4.8,
    feeUsd: 130,
    available: true,
    tags: ["Child fever", "Family consult", "Telehealth"]
  },
  {
    id: "doc-6",
    name: "Dr. Hana Mori, MD",
    specialty: "Dermatology",
    country: "Japan",
    languages: ["Japanese", "English"],
    rating: 4.6,
    feeUsd: 110,
    available: false,
    tags: ["Skin irritation", "Acne", "Allergy"]
  }
];
