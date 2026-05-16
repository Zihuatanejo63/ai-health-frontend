"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, PageHeader, PrimaryButton } from "@/components/app-ui";
import { createMockUser, writeUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
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
      <PageHeader title="Welcome to HealthMatchAI" description="Sign in to save symptom checks, summaries, and health records." />
      <Card className="auth-card">
        <form className="settings-form" onSubmit={signIn}>
          <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" /></label>
          <label>Password<input placeholder="••••••••" type="password" /></label>
          <button className="btn-primary" type="submit">Sign in</button>
        </form>
        <div className="auth-actions">
          <button className="btn-secondary" onClick={() => { writeUser(createMockUser(email)); router.push("/onboarding"); }} type="button">Continue with Google</button>
          <button className="btn-secondary" onClick={() => { writeUser(createMockUser(email)); router.push("/onboarding"); }} type="button">Send magic link</button>
          <button className="btn-secondary" onClick={guestMode} type="button">Continue as guest</button>
        </div>
        <p><Link href="/forgot-password">Forgot password?</Link> · <Link href="/signup">Create account</Link></p>
      </Card>
    </section>
  );
}
