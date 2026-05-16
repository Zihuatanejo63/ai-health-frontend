"use client";

import { useEffect, useState } from "react";
import { Card, PageHeader, PrimaryButton } from "@/components/app-ui";
import { readUser, type HealthMatchUser } from "@/lib/auth";

export default function OnboardingPage() {
  const [user, setUser] = useState<HealthMatchUser | null>(null);

  useEffect(() => {
    setUser(readUser());
  }, []);

  return (
    <section className="app-page auth-page">
      <PageHeader title={`Welcome${user?.name ? `, ${user.name}` : ""}`} description="Your workspace is ready." />
      <div className="paid-tool-grid">
        <Card className="paid-tool-card"><h2>Start symptom check</h2><p>Use structured questions to understand care options.</p><PrimaryButton href="/symptom-check">Start Symptom Check</PrimaryButton></Card>
        <Card className="paid-tool-card"><h2>Complete profile</h2><p>Add health and insurance details for better organization.</p><PrimaryButton href="/settings">Open Settings</PrimaryButton></Card>
      </div>
    </section>
  );
}
