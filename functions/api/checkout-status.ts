type PagesFunctionContext = {
  env: Record<string, string | undefined>;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequest(context: PagesFunctionContext) {
  const { env } = context;
  const configured = Boolean(
    env.CREEM_API_KEY &&
      env.CREEM_ONE_TIME_REPORT_PRODUCT_ID
  );

  return json({ configured });
}
