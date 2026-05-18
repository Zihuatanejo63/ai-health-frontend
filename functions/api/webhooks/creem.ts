type PagesFunctionContext = {
  request: Request;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequest(context: PagesFunctionContext) {
  if (context.request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  // TODO: Verify Creem webhook signature before trusting the payload.
  // TODO: Read event type and checkout/subscription identifiers.
  // TODO: Mark one-time report purchases as paid in the backend database.
  // TODO: Mark Plus subscriptions active after verified subscription events.
  // TODO: Handle subscription cancellation, refunds, and chargebacks.
  // TODO: Update durable user entitlements server-side, not from localStorage.
  await context.request.text();

  return json({ received: true });
}
