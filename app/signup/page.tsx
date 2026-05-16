"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, PageHeader } from "@/components/app-ui";
import { createMockUser, writeUser } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@email.com");

  function signup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeUser(createMockUser(email, name));
    router.push("/onboarding");
  }

  return (
    <section className="app-page auth-page">
      <PageHeader title="Create your free account" description="Save health history and doctor-ready summaries on this device." />
      <Card className="auth-card">
        <form className="settings-form" onSubmit={signup}>
          <label>Name<input value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" /></label>
          <label>Password<input placeholder="••••••••" type="password" /></label>
          <button className="btn-primary" type="submit">Create account</button>
        </form>
        <p>Already have an account? <Link href="/login">Sign in</Link></p>
      </Card>
    </section>
  );
}
