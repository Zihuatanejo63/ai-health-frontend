/**
 * Partner / affiliate configuration for the care action panel.
 *
 * Compliance rules enforced by this module and the panel component:
 * - Links are flat-fee advertising placements (FTC disclosure rendered with the panel),
 *   never a share of medical fees.
 * - Outbound URLs must never carry symptom or health data — paste plain affiliate
 *   URLs only (anonymous click IDs from the network are fine).
 * - Emergency / Crisis results never render commercial content (the result page
 *   skips the panel entirely for those tones).
 *
 * To activate a partner after affiliate approval, paste the tracking URL into
 * `url` and rebuild. Entries with an empty `url` are hidden automatically, so
 * this file can ship before any program is approved.
 */

export type PartnerCategory =
  | "telehealth"
  | "mentalHealth"
  | "rxDiscount"
  | "labs"
  | "insurance";

export interface PartnerLink {
  id: string;
  category: PartnerCategory;
  labelKey: string;
  descKey: string;
  url: string;
}

export const partnerLinks: PartnerLink[] = [
  {
    id: "telehealth-visit",
    category: "telehealth",
    labelKey: "action.partner.telehealth",
    descKey: "action.partner.telehealthDesc",
    url: ""
  },
  {
    id: "mental-health",
    category: "mentalHealth",
    labelKey: "action.partner.mentalHealth",
    descKey: "action.partner.mentalHealthDesc",
    url: ""
  },
  {
    id: "rx-discount",
    category: "rxDiscount",
    labelKey: "action.partner.rxDiscount",
    descKey: "action.partner.rxDiscountDesc",
    url: ""
  },
  {
    id: "lab-tests",
    category: "labs",
    labelKey: "action.partner.labs",
    descKey: "action.partner.labsDesc",
    url: ""
  },
  {
    id: "insurance-compare",
    category: "insurance",
    labelKey: "action.partner.insurance",
    descKey: "action.partner.insuranceDesc",
    url: ""
  }
];

/** Care-setting cost comparison rows (national average cash prices, no insurance). */
export interface CostRow {
  id: string;
  labelKey: string;
  cost: string;
  waitKey: string;
}

export const costRows: CostRow[] = [
  { id: "er", labelKey: "action.option.er", cost: "$1,500–$3,000+", waitKey: "action.wait.er" },
  { id: "urgent", labelKey: "action.option.urgent", cost: "$150–$250", waitKey: "action.wait.urgent" },
  { id: "primary", labelKey: "action.option.primary", cost: "$100–$200", waitKey: "action.wait.primary" },
  { id: "telehealth", labelKey: "action.option.telehealth", cost: "$29–$89", waitKey: "action.wait.telehealth" },
  { id: "self", labelKey: "action.option.self", cost: "$0", waitKey: "action.wait.self" }
];

/** Maps a triage `recommendedCare` value to the cost row to highlight. */
export function recommendedCostRowId(recommendedCare: string): string | null {
  if (recommendedCare === "Self-care and monitoring") return "self";
  if (recommendedCare === "Telehealth may be appropriate") return "telehealth";
  if (recommendedCare === "Primary Care within 24–72 hours") return "primary";
  if (recommendedCare === "Urgent Care today") return "urgent";
  return null;
}

/** Partner categories worth showing for a given non-emergency care level. */
export function partnerCategoriesForCare(recommendedCare: string): PartnerCategory[] {
  if (recommendedCare === "Self-care and monitoring") {
    return ["rxDiscount", "telehealth"];
  }
  if (recommendedCare === "Telehealth may be appropriate") {
    return ["telehealth", "mentalHealth", "rxDiscount"];
  }
  if (recommendedCare === "Primary Care within 24–72 hours") {
    return ["telehealth", "rxDiscount", "labs", "insurance"];
  }
  if (recommendedCare === "Urgent Care today") {
    return ["telehealth", "rxDiscount"];
  }
  return [];
}

/** Active (configured) partner links for a care level, in category order. */
export function activePartnersForCare(recommendedCare: string): PartnerLink[] {
  const categories = partnerCategoriesForCare(recommendedCare);
  return categories
    .map((category) => partnerLinks.find((link) => link.category === category))
    .filter((link): link is PartnerLink => Boolean(link && link.url));
}
