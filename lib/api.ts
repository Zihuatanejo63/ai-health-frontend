import type {
  AnalyzeSymptomsRequest,
  AnalyzeSymptomsResponse,
  CreateCheckoutRequest,
  CreateCheckoutResponse
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "https://api.healthmatchai.com";

export async function analyzeSymptoms(
  payload: AnalyzeSymptomsRequest
): Promise<AnalyzeSymptomsResponse> {
  const response = await fetch(`${API_BASE_URL}/api/analyze-symptoms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let detail = "Unable to analyze symptoms right now.";
    try {
      const data = (await response.json()) as { error?: { message?: string } };
      detail = data.error?.message ?? detail;
    } catch {
      // Keep default message for non-json errors.
    }
    throw new Error(detail);
  }

  return (await response.json()) as AnalyzeSymptomsResponse;
}

export async function createCheckoutSession(
  payload: CreateCheckoutRequest
): Promise<CreateCheckoutResponse> {
  const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let detail = "Unable to start checkout right now.";
    try {
      const data = (await response.json()) as { error?: { message?: string } };
      detail = data.error?.message ?? detail;
    } catch {
      // Keep default message for non-json errors.
    }
    throw new Error(detail);
  }

  return (await response.json()) as CreateCheckoutResponse;
}
