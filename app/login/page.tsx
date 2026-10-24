"use client";
import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { fetchMe, requestMagicLink } from "@/lib/auth-client";
export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [localUrl, setLocalUrl] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    fetchMe().then((me) => {
      if (me.user) window.location.assign("/dashboard");
    });
  }, []);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setLocalUrl("");
    const result = await requestMagicLink(email);
    setMessage(result.message);
    setLocalUrl(result.localUrl || "");
    setBusy(false);
  }
  return (
    <div className="hm-page hm-prose">
      <header className="hm-page-heading">
        <p className="hm-overline">YOUR HEALTH, OVER TIME</p>
        <h1>Start with your report.</h1>
        <p>
          Sign in or create an account with an email link. Your confirmed
          reports stay with your account.
        </p>
      </header>
      <form className="hm-card hp-form" onSubmit={submit}>
        <label>
          Email address
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <button className="hm-button" disabled={busy}>
          {busy ? "Requesting link…" : "Send sign-in link"}
        </button>
        <p role="status">{message}</p>
        {localUrl && (
          <div className="hp-notice">
            <strong>Local development mailbox</strong>
            <p>
              No email was sent. This local-only link uses the existing one-time
              magic-link flow; it does not verify ownership of the email
              address. Use fictional data for local testing.
            </p>
            <a className="hm-button" href={localUrl}>
              Open local sign-in link →
            </a>
          </div>
        )}
      </form>
      <p>
        <Link className="hm-text-link" href="/sample-report">
          Preview a fictional report without signing in →
        </Link>
      </p>
      <p className="hp-emergency">
        If you have chest pain, difficulty breathing, or thoughts of harming
        yourself, seek emergency medical care now. Do not wait to log in.{" "}
        <Link href="/safety">Safety &amp; Limits</Link>
      </p>
    </div>
  );
}
