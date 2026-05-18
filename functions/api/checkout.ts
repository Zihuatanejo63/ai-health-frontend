type CheckoutPlan = "one_time_report" | "plus_monthly";

type PagesFunctionContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

type CreemCheckoutResponse = {
  id?: string;
  checkout_url?: string;
  checkoutUrl?: string;
  url?: string;
};

const supportedPlans: CheckoutPlan[] = ["one_time_report", "plus_monthly"];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

function getPlanProductId(plan: CheckoutPlan, env: PagesFunctionContext["env"]) {
  return plan === "one_time_report"
    ? env.CREEM_ONE_TIME_REPORT_PRODUCT_ID
    : env.CREEM_PLUS_MONTHLY_PRODUCT_ID;
}

function getAppUrl(request: Request, env: PagesFunctionContext["env"]) {
  return env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
}

export async function onRequest(context: PagesFunctionContext) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  let plan: unknown;
  try {
    const body = await request.json() as { plan?: unknown };
    plan = body.plan;
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  if (typeof plan !== "string" || !supportedPlans.includes(plan as CheckoutPlan)) {
    return json({ error: "Invalid plan." }, 400);
  }

  if (!env.CREEM_API_KEY) {
    return json({ error: "Checkout is not configured yet." }, 500);
  }

  const productId = getPlanProductId(plan as CheckoutPlan, env);
  if (!productId) {
    return json({ error: "Checkout is not configured yet." }, 500);
  }

  const appUrl = getAppUrl(request, env);
  const apiBaseUrl = env.CREEM_API_BASE_URL || "https://api.creem.io";

  const creemResponse = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/v1/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.CREEM_API_KEY
    },
    body: JSON.stringify({
      product_id: productId,
      request_id: `healthmatchai_${plan}_${crypto.randomUUID()}`,
      success_url: `${appUrl}/payment-success?plan=${encodeURIComponent(plan)}`,
      metadata: {
        plan,
        cancel_url: `${appUrl}/pricing?checkout=cancelled`
      }
    })
  });

  const data = await creemResponse.json().catch(() => ({})) as CreemCheckoutResponse & { error?: string };

  if (!creemResponse.ok) {
    return json({ error: data.error || "Checkout failed." }, creemResponse.status);
  }

  const checkoutUrl = data.checkout_url || data.checkoutUrl || data.url;
  if (!checkoutUrl) {
    return json({ error: "Missing checkout URL." }, 502);
  }

  return json({
    checkoutUrl,
    checkoutSessionId: data.id
  });
}
