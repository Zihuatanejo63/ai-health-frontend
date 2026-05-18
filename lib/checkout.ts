export type CheckoutPlan = "one_time_report" | "plus_monthly";

export type Entitlement = {
  plan: "free" | "one_time_report" | "plus";
  status: "inactive" | "pending" | "active" | "cancelled";
  provider: "creem";
  checkoutSessionId?: string;
  createdAt: string;
  expiresAt?: string;
};

export const ENTITLEMENT_STORAGE_KEY = "healthmatchai_entitlement";

type CheckoutResponse = {
  checkoutUrl?: string;
  checkoutSessionId?: string;
  error?: string;
};

function pendingPlanForCheckout(plan: CheckoutPlan): Entitlement["plan"] {
  return plan === "plus_monthly" ? "plus" : "one_time_report";
}

function savePendingEntitlement(plan: CheckoutPlan, checkoutSessionId?: string) {
  if (typeof window === "undefined") return;

  const entitlement: Entitlement = {
    plan: pendingPlanForCheckout(plan),
    status: "pending",
    provider: "creem",
    checkoutSessionId,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem(ENTITLEMENT_STORAGE_KEY, JSON.stringify(entitlement));
}

export async function startCheckout(plan: CheckoutPlan) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan })
  });

  const data = (await res.json().catch(() => ({}))) as CheckoutResponse;

  if (!res.ok) {
    throw new Error(data.error || "Checkout failed.");
  }

  if (!data.checkoutUrl) {
    throw new Error("Missing checkout URL.");
  }

  savePendingEntitlement(plan, data.checkoutSessionId);
  window.location.href = data.checkoutUrl;
}
