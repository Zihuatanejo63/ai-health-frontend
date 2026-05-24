/**
 * API client for backend calls.
 * All requests include credentials for HttpOnly session cookie.
 */

import type { TriageApiResponse } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  (typeof window !== "undefined" && window.location.hostname === "healthmatchai.com"
    ? "https://api.healthmatchai.com"
    : "");

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = "Request failed.";
    try {
      const data = (await res.json()) as {
        error?: { code?: string; message?: string };
        code?: string;
        message?: string;
        creemStatus?: number;
        creemResponse?: string;
      };
      // Use the most specific message available
      message = data.error?.message || data.message || message;
      // Append Creem context for debugging
      if (data.creemStatus && data.creemResponse) {
        const lower = data.creemResponse.toLowerCase();
        if (lower.includes("account") || lower.includes("store") || lower.includes("merchant") ||
            lower.includes("onboarding") || lower.includes("verification") || lower.includes("review") ||
            lower.includes("not approved")) {
          message = "Creem account review is not completed yet.";
        } else if (data.creemStatus === 401 || data.creemStatus === 403) {
          message = "Creem API key or account review is not ready.";
        }
      }
    } catch { /* use default */ }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

// ---- Triage ----

export interface TriageInput {
  symptoms: string[];
  primarySymptom: string;
  duration: string;
  trend: string;
  severity: string;
  painScore: number | string;
  redFlags: string[];
  functionImpact: string[];
  healthBackground: Record<string, string | boolean | string[]>;
  details?: Record<string, string>;
  primaryConcern?: string;
  outputLanguage?: string;
}

export async function submitTriage(input: TriageInput): Promise<TriageApiResponse> {
  return apiFetch<TriageApiResponse>("/api/triage", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// ---- Checkout ----

export async function createCheckout(plan: "plus_monthly"): Promise<{ checkoutUrl: string }> {
  return apiFetch<{ checkoutUrl: string }>("/api/create-checkout-session", {
    method: "POST",
    body: JSON.stringify({ plan }),
  });
}

// ---- Data ----

export async function getSymptomChecks(): Promise<{ checks: Array<{ id: string; risk_level: string; recommended_care: string; primary_concern: string; created_at: string }> }> {
  return apiFetch("/api/symptom-checks");
}

export async function getSymptomCheck(id: string): Promise<unknown> {
  return apiFetch(`/api/symptom-checks/${encodeURIComponent(id)}`);
}

export async function deleteSymptomCheck(id: string): Promise<void> {
  await apiFetch(`/api/symptom-checks/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function getHealthProfile(): Promise<{ profile: unknown }> {
  return apiFetch("/api/health-profile");
}

export async function putHealthProfile(profile: unknown): Promise<void> {
  await apiFetch("/api/health-profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
}

export async function getInsuranceProfile(): Promise<{ profile: unknown }> {
  return apiFetch("/api/insurance-profile");
}

export async function putInsuranceProfile(profile: unknown): Promise<void> {
  await apiFetch("/api/insurance-profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
}

export async function exportData(): Promise<unknown> {
  return apiFetch("/api/data/export");
}

export async function deleteData(): Promise<void> {
  await apiFetch("/api/data/delete", { method: "DELETE" });
}
