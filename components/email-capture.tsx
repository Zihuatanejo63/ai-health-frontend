"use client";

import { FormEvent, useState } from "react";
import { useI18n } from "@/components/i18n-provider";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "https://api.healthmatchai.com";

export function EmailCapture({ source }: { source: string }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) return;
    setState("sending");
    try {
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="email-capture-done">{t("emailCapture.done")}</p>;
  }

  return (
    <form className="email-capture" onSubmit={handleSubmit}>
      <div>
        <h3>{t("emailCapture.title")}</h3>
        <p>{t("emailCapture.subtitle")}</p>
      </div>
      <div className="email-capture-row">
        <input
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailCapture.placeholder")}
          required
          type="email"
          value={email}
        />
        <button className="btn-primary" disabled={state === "sending"} type="submit">
          {state === "sending" ? t("emailCapture.sending") : t("emailCapture.cta")}
        </button>
      </div>
      {state === "error" ? <p className="inline-error">{t("emailCapture.error")}</p> : null}
      <p className="help-text">{t("emailCapture.privacy")}</p>
    </form>
  );
}
