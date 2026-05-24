"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, PageHeader } from "@/components/app-ui";
import { useI18n } from "@/components/i18n-provider";
import { useSettings } from "@/components/settings-provider";
import { loginWithPassword, registerWithPassword } from "@/lib/auth-client";

type Tab = "login" | "register";

function getInitialTab(): Tab {
  if (typeof window === "undefined") return "login";
  const params = new URLSearchParams(window.location.search);
  return params.get("tab") === "register" ? "register" : "login";
}

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const { refreshAuth } = useSettings();

  const [tab, setTab] = useState<Tab>("login");

  useEffect(() => {
    setTab(getInitialTab());
  }, []);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register form
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");

    const email = loginEmail.trim();
    if (!email || !email.includes("@")) {
      setLoginError("Please enter a valid email address.");
      return;
    }
    if (!loginPassword) {
      setLoginError("Please enter your password.");
      return;
    }

    setLoginLoading(true);
    const result = await loginWithPassword(email, loginPassword);
    setLoginLoading(false);

    if (result.ok) {
      await refreshAuth();
      router.push("/");
    } else {
      setLoginError(result.message);
    }
  }

  const [regSuccess, setRegSuccess] = useState("");

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegError("");
    setRegSuccess("");

    const email = regEmail.trim();
    if (!email || !email.includes("@")) {
      setRegError("Please enter a valid email address.");
      return;
    }
    if (!regPassword || regPassword.length < 8) {
      setRegError("Password must be at least 8 characters.");
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match.");
      return;
    }

    setRegLoading(true);
    const result = await registerWithPassword(email, regPassword, email);
    setRegLoading(false);

    if (result.ok) {
      setRegSuccess(result.message || "Account created successfully.");
      // Navigate after a brief delay so user can see success message
      setTimeout(() => {
        refreshAuth().finally(() => {
          router.push("/");
        });
      }, 800);
    } else {
      setRegError(result.message);
    }
  }

  return (
    <section className="app-page auth-page">
      <PageHeader
        title={tab === "login" ? t("auth.loginTitle") : t("auth.signupTitle")}
        description={tab === "login" ? t("auth.loginSubtitle") : t("auth.signupSubtitle")}
      />

      <Card className="auth-card">
        {/* Tabs */}
        <div className="tab-row" style={{ display: "flex", gap: 0, marginBottom: 24 }}>
          <button
            className={`tab-btn ${tab === "login" ? "active" : ""}`}
            onClick={() => setTab("login")}
            type="button"
          >
            {t("auth.login")}
          </button>
          <button
            className={`tab-btn ${tab === "register" ? "active" : ""}`}
            onClick={() => setTab("register")}
            type="button"
          >
            {t("auth.createAccount")}
          </button>
        </div>

        {/* Login form */}
        {tab === "login" ? (
          <form className="settings-form" noValidate onSubmit={handleLogin}>
            <label>
              {t("auth.email")}
              <input
                autoComplete="email"
                value={loginEmail}
                onChange={(e) => { setLoginEmail(e.target.value); setLoginError(""); }}
                placeholder="you@example.com"
                type="email"
              />
            </label>
            <label>
              {t("auth.password")}
              <input
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => { setLoginPassword(e.target.value); setLoginError(""); }}
                placeholder="••••••••"
                type="password"
              />
            </label>
            {loginError ? <p className="inline-error">{loginError}</p> : null}
            <button className="btn-primary" disabled={loginLoading} type="submit">
              {loginLoading ? t("auth.loading") : t("auth.login")}
            </button>
          </form>
        ) : (
          /* Register form */
          <form className="settings-form" noValidate onSubmit={handleRegister}>
            <label>
              {t("auth.email")}
              <input
                autoComplete="email"
                value={regEmail}
                onChange={(e) => { setRegEmail(e.target.value); setRegError(""); }}
                placeholder="you@example.com"
                type="email"
              />
            </label>
            <label>
              {t("auth.password")}
              <input
                autoComplete="new-password"
                value={regPassword}
                onChange={(e) => { setRegPassword(e.target.value); setRegError(""); }}
                placeholder="••••••••"
                type="password"
              />
            </label>
            <label>
              {t("auth.confirmPassword")}
              <input
                autoComplete="new-password"
                value={regConfirm}
                onChange={(e) => { setRegConfirm(e.target.value); setRegError(""); }}
                placeholder="••••••••"
                type="password"
              />
            </label>
            {regError ? <p className="inline-error">{regError}</p> : null}
            {regSuccess ? <p className="inline-success">{regSuccess}</p> : null}
            <button className="btn-primary" disabled={regLoading} type="submit">
              {regLoading ? t("auth.loading") : t("auth.createAccount")}
            </button>
          </form>
        )}

        {/* Passwordless sign-in — coming soon */}
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          <p className="help-text">
            {t("auth.magicLinkComingSoon")}
          </p>
        </div>
      </Card>
    </section>
  );
}
