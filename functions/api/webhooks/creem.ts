type PagesFunctionContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

type CreemWebhookEvent = {
  id?: string;
  eventType?: string;
  type?: string;
  created_at?: number;
  object?: {
    id?: string;
    customer?: { id?: string };
    customer_id?: string;
    subscription?: { id?: string };
    subscription_id?: string;
    metadata?: Record<string, unknown>;
  };
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return mismatch === 0;
}

async function createSignature(rawBody: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  return toHex(signature);
}

async function verifyCreemSignature(rawBody: string, signature: string, secret: string) {
  const computed = await createSignature(rawBody, secret);
  return timingSafeEqual(computed, signature);
}

function normalizeEventType(event: CreemWebhookEvent) {
  return event.eventType || event.type || "unknown";
}

function pendingEntitlementAction(event: CreemWebhookEvent) {
  const eventType = normalizeEventType(event);
  const object = event.object || {};
  const metadata = object.metadata || {};
  const plan = metadata.plan === "plus_monthly" || metadata.plan === "plus_yearly"
    ? "plus"
    : metadata.plan === "one_time_report"
      ? "one_time_report"
      : "free";

  return {
    eventId: event.id,
    eventType,
    plan,
    checkoutSessionId: object.id,
    customerId: object.customer?.id || object.customer_id,
    subscriptionId: object.subscription?.id || object.subscription_id,
    receivedAt: new Date().toISOString()
  };
}

export async function onRequest(context: PagesFunctionContext) {
  if (context.request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  const signature = context.request.headers.get("creem-signature");
  const rawBody = await context.request.text();

  if (!context.env.CREEM_WEBHOOK_SECRET) {
    console.warn("Creem webhook received but CREEM_WEBHOOK_SECRET is not configured.");
    return json({ error: "Webhook is not configured yet." }, 500);
  }

  if (!signature) {
    return json({ error: "Missing Creem signature." }, 401);
  }

  const verified = await verifyCreemSignature(rawBody, signature, context.env.CREEM_WEBHOOK_SECRET);
  if (!verified) {
    return json({ error: "Invalid Creem signature." }, 401);
  }

  let event: CreemWebhookEvent;
  try {
    event = JSON.parse(rawBody) as CreemWebhookEvent;
  } catch {
    return json({ error: "Invalid webhook payload." }, 400);
  }

  const action = pendingEntitlementAction(event);

  switch (action.eventType) {
    case "checkout.completed":
      console.info("Verified Creem checkout completion. Persist entitlement after database integration.", action);
      break;
    case "subscription.active":
    case "subscription.paid":
      console.info("Verified Creem active subscription event. Persist Plus entitlement after database integration.", action);
      break;
    case "subscription.canceled":
    case "subscription.expired":
    case "subscription.paused":
      console.info("Verified Creem subscription inactive event. Revoke entitlement after database integration.", action);
      break;
    case "refund.created":
      console.info("Verified Creem refund event. Mark entitlement refunded after database integration.", action);
      break;
    case "dispute.created":
      console.info("Verified Creem dispute event. Mark entitlement chargeback after database integration.", action);
      break;
    default:
      console.info("Verified Creem webhook event with no entitlement action yet.", action);
      break;
  }

  // TODO: Persist entitlement updates in a backend database.
  // TODO: Map metadata.userId/referenceId to a HealthMatchAI user account.
  // TODO: Mark one-time report purchases as active after checkout.completed.
  // TODO: Mark Plus subscriptions active after subscription.active/subscription.paid.
  // TODO: Mark subscriptions cancelled after subscription.canceled/subscription.expired.
  // TODO: Mark purchases refunded after refund.created.
  // TODO: Mark accounts chargeback/review after dispute.created.
  // TODO: Never grant durable access from localStorage or URL parameters.

  return json({ received: true });
}
