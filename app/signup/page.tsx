"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Card, PageHeader, StatusBadge } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { requestMagicLink } from "@/lib/auth-client";

export default function SignupPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const result = await requestMagicLink(trimmedEmail);
    setLoading(false);

    if (result.ok) {
      setSent(true);
    } else {
      setSubmitError(result.message);
    }
  }

  return (
    <section className="app-page auth-page">
      <PageHeader title={t("auth.signupTitle")} description={t("auth.signupSubtitle")} />
      <Card className="auth-card">
        {sent ? (
          <div className="auth-success">
            <StatusBadge tone="success">Email Sent</StatusBadge>
            <h2>Check your inbox</h2>
            <p>
              We sent a sign-in link to <strong>{email.trim()}</strong>.
              Click the link to create your account and sign in. The link expires in 15 minutes.
            </p>
            <p className="help-text">
              No account is created until you click the link. Did not receive it?{" "}
              <button className="link-button" onClick={() => setSent(false)} type="button">
                try again
              </button>
              .
            </p>
          </div>
        ) : (
          <form className="settings-form" noValidate onSubmit={handleSubmit}>
            <label>
              {t("auth.email")}
              <input
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubmitError("");
                }}
                placeholder="you@example.com"
                type="email"
              />
            </label>
            {submitError ? <p className="inline-error">{submitError}</p> : null}
            <button className="btn-primary" disabled={!email.trim() || loading} type="submit">
              {loading ? "Sending..." : "Send Sign-in Link"}
            </button>
          </form>
        )}
        <p>
          {t("auth.alreadyHaveAccount")} <Link href="/login">{t("auth.signIn")}</Link>
        </p>
      </Card>
    </section>
  );
}
