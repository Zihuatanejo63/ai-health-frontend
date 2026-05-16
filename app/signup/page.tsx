"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, PageHeader } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { createMockUser, writeUser } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@email.com");

  function signup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeUser(createMockUser(email, name));
    router.push("/onboarding");
  }

  return (
    <section className="app-page auth-page">
      <PageHeader title={t("auth.signupTitle")} description={t("auth.signupSubtitle")} />
      <Card className="auth-card">
        <form className="settings-form" onSubmit={signup}>
          <label>{t("auth.name")}<input value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label>{t("auth.email")}<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" /></label>
          <label>{t("auth.password")}<input placeholder="••••••••" type="password" /></label>
          <button className="btn-primary" type="submit">{t("auth.createAccount")}</button>
        </form>
        <p>{t("auth.already")} <Link href="/login">{t("common.signIn")}</Link></p>
      </Card>
    </section>
  );
}
