/**
 * DEPRECATED: LocalStorage-based entitlement system.
 * Replaced by server-side entitlements via /api/me.
 *
 * This file is kept only for migration/cleanup purposes.
 * All entitlement checks must go through auth-client.ts → /api/me.
 *
 * Do NOT trust localStorage for access control.
 */

export const ENTITLEMENT_STORAGE_KEY = "healthmatchai_entitlement";

// Legacy type kept for reference only
export type Entitlement = {
  userId: string;
  plan: "free" | "one_time_report" | "plus";
  status: "pending" | "active" | "cancelled" | "refunded" | "chargeback";
  provider: "creem";
  checkoutSessionId?: string;
  customerId?: string;
  subscriptionId?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
};

/**
 * Clean up any localStorage entitlements.
 * Called during app initialization.
 */
export function cleanLegacyEntitlements(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(ENTITLEMENT_STORAGE_KEY);
  }
}
