/**
 * Checkout flow — uses server-side API, not localStorage.
 * All checkout sessions are created server-side and bound to the logged-in user.
 */

import { createCheckout } from "./api-client";

export type CheckoutPlan = "plus_monthly";

export async function startCheckout(plan: CheckoutPlan): Promise<void> {
  const result = await createCheckout(plan);

  if (!result.checkoutUrl) {
    throw new Error("Missing checkout URL.");
  }

  window.location.href = result.checkoutUrl;
}
