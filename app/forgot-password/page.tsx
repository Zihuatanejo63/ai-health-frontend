"use client";

import { FormEvent, useMemo, useState } from "react";
import { Card, PageHeader } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);
  const { t } = useI18n();

  const error = useMemo(() => {
    if (!email.trim()) return "auth.errors.emailRequired";
    if (!emailPattern.test(email.trim())) return "auth.errors.invalidEmail";
    return "";
  }, [email]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (error) return;
    setSent(true);
  }

  return (
    <section className="app-page auth-page">
      <PageHeader title={t("auth.resetTitle")} description={t("auth.resetSubtitle")} />
      <Card className="auth-card">
        <form className="settings-form" noValidate onSubmit={submit}>
          <label>
            {t("auth.email")}
            <input
              autoComplete="email"
              type="email"
              value={email}
              onBlur={() => setTouched(true)}
              onChange={(event) => {
                setEmail(event.target.value);
                setSent(false);
              }}
            />
            {touched && error ? <span className="inline-error">{t(error)}</span> : null}
          </label>
          <button className="btn-primary" disabled={Boolean(error)} type="submit">{t("auth.magicLink")}</button>
        </form>
        {sent ? <p className="login-save-prompt">{t("auth.resetSent")}</p> : null}
      </Card>
    </section>
  );
}
