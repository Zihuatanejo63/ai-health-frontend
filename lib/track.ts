/**
 * First-party, fire-and-forget funnel events.
 * Sends only an allowlisted event type and a short label — never symptom or
 * personal data. Failures are silently ignored; tracking must never affect UX.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "https://api.healthmatchai.com";

export type TrackEventType = "result_viewed" | "partner_click" | "report_print" | "check_started";

export function trackEvent(type: TrackEventType, label?: string): void {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({ type, label });
    const url = `${API_BASE}/api/events`;
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(url, { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
    }
  } catch {
    // never let tracking break the page
  }
}
