import type { Workspace, Space, Evaluation, Action } from "../../shared/health";
export type HealthState = {
  workspace: Workspace;
  space: Space;
  evaluations: Evaluation[];
  latest: Evaluation[];
  actions: Action[];
  modelConfigured: boolean;
  model: string;
  ruleVersion: string;
  ruleReview: string;
  emailStatus: string;
};
export type Answer = {
  answer: string;
  urgent: boolean;
  channel: string;
  citations: {
    marker: string;
    value: number | string;
    unit: string;
    date: string;
  }[];
  ruleVersion: string;
};
export async function healthApi<T>(
  space: Space,
  path = "",
  method = "GET",
  body?: unknown,
): Promise<T> {
  const response = await fetch(`/api/health${path}?space=${space}`, {
    method,
    credentials: "include",
    cache: "no-store",
    headers:
      body instanceof FormData ? {} : { "Content-Type": "application/json" },
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({
    error: {
      message:
        "The local service did not respond. Start npm run local and retry.",
    },
  }));
  if (!response.ok)
    throw Object.assign(new Error(data.error?.message || "Request failed"), {
      status: response.status,
    });
  return data as T;
}
export async function downloadHealth(space: Space, kind: "pdf" | "export") {
  const response = await fetch(`/api/health/${kind}?space=${space}`, {
    credentials: "include",
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error?.message || "Export failed");
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `healthmatch-${space}.${kind === "pdf" ? "pdf" : "json"}`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
