"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, PageHeader } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { createMockUser, writeUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [email, setEmail] = useState("alex.johnson@email.com");

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeUser(createMockUser(email));
    router.push("/onboarding");
  }

  function guestMode() {
    writeUser(createMockUser("", "Guest", true));
    router.push("/symptom-check");
  }

  return (
    <section className="app-page auth-page">
      <PageHeader title={t("auth.loginTitle")} description={t("auth.loginSubtitle")} />
      <Card className="auth-card">
        <form className="settings-form" onSubmit={signIn}>
          <label>{t("auth.email")}<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" /></label>
          <label>{t("auth.password")}<input placeholder="••••••••" type="password" /></label>
          <button className="btn-primary" type="submit">{t("common.signIn")}</button>
        </form>
        <div className="auth-actions">
          <button className="btn-secondary" onClick={() => { writeUser(createMockUser(email)); router.push("/onboarding"); }} type="button">{t("auth.google")}</button>
          <button className="btn-secondary" onClick={() => { writeUser(createMockUser(email)); router.push("/onboarding"); }} type="button">{t("auth.magicLink")}</button>
          <button className="btn-secondary" onClick={guestMode} type="button">{t("auth.guest")}</button>
        </div>
        <p><Link href="/forgot-password">{t("auth.forgot")}</Link> · <Link href="/signup">{t("auth.createAccount")}</Link></p>
      </Card>
    </section>
  );
}
