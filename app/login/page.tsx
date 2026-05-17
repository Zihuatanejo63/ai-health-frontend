"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, PageHeader } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { authenticateMockAccount, createMockUser, writeUser } from "@/lib/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordIsWeak(password: string) {
  return !/[A-Za-z]/.test(password) || !/\d/.test(password);
}

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!email.trim()) next.email = "auth.errors.emailRequired";
    else if (!emailPattern.test(email.trim())) next.email = "auth.errors.invalidEmail";
    if (!password.trim()) next.password = "auth.errors.passwordRequired";
    else if (password.trim().length < 8) next.password = "auth.errors.passwordTooShort";
    else if (passwordIsWeak(password.trim())) next.password = "auth.errors.passwordWeak";
    return next;
  }, [email, password]);

  const isValid = Object.keys(errors).length === 0;

  function showError(field: string) {
    return touched[field] && errors[field] ? <span className="inline-error">{t(errors[field])}</span> : null;
  }

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ email: true, password: true });
    setSubmitError("");
    if (!isValid) return;
    setLoading(true);
    const result = authenticateMockAccount(email, password);
    setLoading(false);
    if (!result.ok) {
      setSubmitError(result.reason === "not_found" ? "auth.errors.accountNotFound" : "auth.errors.invalidCredentials");
      return;
    }
    router.push("/");
  }

  function guestMode() {
    writeUser(createMockUser("", "Guest", true));
    router.push("/");
  }

  return (
    <section className="app-page auth-page">
      <PageHeader title={t("auth.loginTitle")} description={t("auth.loginSubtitle")} />
      <Card className="auth-card">
        <p className="login-save-prompt">{t("auth.localDemoNotice")}</p>
        <form className="settings-form" noValidate onSubmit={signIn}>
          <label>
            {t("auth.email")}
            <input
              autoComplete="email"
              value={email}
              onBlur={() => setTouched((current) => ({ ...current, email: true }))}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubmitError("");
              }}
              type="email"
            />
            {showError("email")}
          </label>
          <label>
            {t("auth.password")}
            <input
              autoComplete="current-password"
              value={password}
              onBlur={() => setTouched((current) => ({ ...current, password: true }))}
              onChange={(event) => {
                setPassword(event.target.value);
                setSubmitError("");
              }}
              placeholder="••••••••"
              type="password"
            />
            {showError("password")}
          </label>
          {submitError ? <p className="inline-error">{t(submitError)}</p> : null}
          <button className="btn-primary" disabled={!isValid || loading} type="submit">
            {loading ? `${t("auth.signIn")}...` : t("auth.signIn")}
          </button>
        </form>
        <div className="auth-actions">
          <button className="btn-secondary" disabled type="button">{t("auth.continueWithGoogle")}</button>
          <button className="btn-secondary" disabled type="button">{t("auth.magicLink")}</button>
          <button className="btn-secondary" onClick={guestMode} type="button">{t("auth.continueAsGuest")}</button>
        </div>
        <p><Link href="/forgot-password">{t("auth.forgotPassword")}</Link> · <Link href="/signup">{t("auth.createAccount")}</Link></p>
      </Card>
    </section>
  );
}
