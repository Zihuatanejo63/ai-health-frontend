"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, PageHeader } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { registerMockAccount } from "@/lib/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordIsWeak(password: string) {
  return !/[A-Za-z]/.test(password) || !/\d/.test(password);
}

export default function SignupPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedName) next.name = "auth.errors.nameRequired";
    else if (trimmedName.length < 2) next.name = "auth.errors.nameTooShort";
    if (!trimmedEmail) next.email = "auth.errors.emailRequired";
    else if (!emailPattern.test(trimmedEmail)) next.email = "auth.errors.invalidEmail";
    if (!trimmedPassword) next.password = "auth.errors.passwordRequired";
    else if (trimmedPassword.length < 8) next.password = "auth.errors.passwordTooShort";
    else if (passwordIsWeak(trimmedPassword)) next.password = "auth.errors.passwordWeak";
    if (!confirmPassword.trim()) next.confirmPassword = "auth.errors.confirmPasswordRequired";
    else if (confirmPassword !== password) next.confirmPassword = "auth.errors.passwordMismatch";
    if (!acceptTerms) next.acceptTerms = "auth.errors.acceptTermsRequired";
    return next;
  }, [acceptTerms, confirmPassword, email, name, password]);

  const isValid = Object.keys(errors).length === 0;

  function showError(field: string) {
    return touched[field] && errors[field] ? <span className="inline-error">{t(errors[field])}</span> : null;
  }

  function touch(field: string) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function signup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true, acceptTerms: true });
    if (!isValid) return;
    setLoading(true);
    const result = registerMockAccount({ name, email, password: password.trim() });
    setLoading(false);
    if (!result.ok) {
      setSubmitError("auth.errors.duplicateEmail");
      return;
    }
    router.push("/onboarding");
  }

  return (
    <section className="app-page auth-page">
      <PageHeader title={t("auth.signupTitle")} description={t("auth.signupSubtitle")} />
      <Card className="auth-card">
        <form className="settings-form" noValidate onSubmit={signup}>
          <label>
            {t("auth.name")}
            <input
              autoComplete="name"
              value={name}
              onBlur={() => touch("name")}
              onChange={(event) => setName(event.target.value)}
            />
            {showError("name")}
          </label>
          <label>
            {t("auth.email")}
            <input
              autoComplete="email"
              value={email}
              onBlur={() => touch("email")}
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
              autoComplete="new-password"
              value={password}
              onBlur={() => touch("password")}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              type="password"
            />
            {showError("password")}
          </label>
          <label>
            {t("auth.confirmPassword")}
            <input
              autoComplete="new-password"
              value={confirmPassword}
              onBlur={() => touch("confirmPassword")}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              type="password"
            />
            {showError("confirmPassword")}
          </label>
          <label className="checkbox-row">
            <input
              checked={acceptTerms}
              onBlur={() => touch("acceptTerms")}
              onChange={(event) => {
                setAcceptTerms(event.target.checked);
                touch("acceptTerms");
              }}
              type="checkbox"
            />
            <span>{t("auth.acceptTerms")}</span>
          </label>
          {showError("acceptTerms")}
          {submitError ? <p className="inline-error">{t(submitError)}</p> : null}
          <button className="btn-primary" disabled={!isValid || loading} type="submit">
            {loading ? `${t("auth.signUp")}...` : t("auth.signUp")}
          </button>
        </form>
        <p>
          {t("auth.alreadyHaveAccount")} <Link href="/login">{t("auth.signIn")}</Link>
        </p>
      </Card>
    </section>
  );
}
