"use client";

import { FormEvent, useState } from "react";
import { Card, PageHeader } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { t } = useI18n();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="app-page auth-page">
      <PageHeader title={t("auth.resetTitle")} description={t("auth.resetSubtitle")} />
      <Card className="auth-card">
        <form className="settings-form" onSubmit={submit}>
          <label>{t("auth.email")}<input type="email" /></label>
          <button className="btn-primary" type="submit">{t("auth.magicLink")}</button>
        </form>
        {sent ? <p className="login-save-prompt">{t("auth.resetSent")}</p> : null}
      </Card>
    </section>
  );
}
