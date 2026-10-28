"use client";

import Link from "next/link";
import { Card, PageHeader } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";

export default function ForgotPasswordPage() {
  const { t } = useI18n();

  return (
    <section className="app-page auth-page">
      <PageHeader title={t("auth.forgotPassword")} description="" />
      <Card className="auth-card">
        <p>
          HealthMatchAI uses passwordless sign-in. Enter your email on the login page
          and we will send you a magic link to sign in instantly.
        </p>
        <Link className="btn-primary" href="/login">
          Go to Login
        </Link>
      </Card>
    </section>
  );
}
