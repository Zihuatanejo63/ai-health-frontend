"use client";

import { FormEvent, useState } from "react";
import { Card, PageHeader } from "@/components/app-ui";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="app-page auth-page">
      <PageHeader title="Reset your password" description="Mock reset flow for the current frontend build." />
      <Card className="auth-card">
        <form className="settings-form" onSubmit={submit}>
          <label>Email<input defaultValue="alex.johnson@email.com" type="email" /></label>
          <button className="btn-primary" type="submit">Send reset link</button>
        </form>
        {sent ? <p className="login-save-prompt">Reset link sent in demo mode.</p> : null}
      </Card>
    </section>
  );
}
