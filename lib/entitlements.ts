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

export const ENTITLEMENT_STORAGE_KEY = "healthmatchai_entitlement";

