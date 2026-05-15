"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HiddenLegacyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <section className="panel legal-page">
      <h1 className="page-title">HealthMatchAI has moved</h1>
      <p className="page-subtitle">
        HealthMatchAI now focuses on AI symptom triage, care level guidance, doctor visit
        preparation, and educational insurance navigation.
      </p>
      <div style={{ marginTop: 18 }}>
        <Link className="btn-primary" href="/">
          Go to Symptom Triage
        </Link>
      </div>
    </section>
  );
}
