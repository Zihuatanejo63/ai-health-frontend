import type { Doctor } from "./types";

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Jenkins, MD",
    specialty: "Dermatology",
    rating: 4.9,
    feeUsd: 120,
    available: true,
    tags: ["Skin rash", "Allergy", "Telehealth"]
  },
  {
    id: "doc-2",
    name: "Dr. Michael Chen, FACP",
    specialty: "Internal Medicine",
    rating: 4.8,
    feeUsd: 140,
    available: true,
    tags: ["General symptoms", "Follow-up", "Preventive care"]
  },
  {
    id: "doc-3",
    name: "Dr. Emily Rivera, DO",
    specialty: "Family Medicine",
    rating: 4.7,
    feeUsd: 100,
    available: false,
    tags: ["Primary care", "Urgent consult", "Women health"]
  },
  {
    id: "doc-4",
    name: "Dr. James Patel, MD",
    specialty: "Cardiology",
    rating: 4.9,
    feeUsd: 180,
    available: true,
    tags: ["Chest pain triage", "Heart monitoring", "Second opinion"]
  }
];
