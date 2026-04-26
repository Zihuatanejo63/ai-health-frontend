"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeSymptoms } from "@/lib/api";
import type { DurationUnit, Severity } from "@/lib/types";

const SESSION_RESULT_KEY = "ai-health-match-result";

export default function HomePage() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState<Severity>("mild");
  const [durationValue, setDurationValue] = useState<number>(1);
  const [durationUnit, setDurationUnit] = useState<DurationUnit>("days");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const trimmedSymptoms = symptoms.trim();
    if (!trimmedSymptoms) {
      setError("Please provide symptom details.");
      return;
    }
    if (!Number.isFinite(durationValue) || durationValue <= 0) {
      setError("Duration must be greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeSymptoms({
        symptoms: trimmedSymptoms,
        severity,
        durationValue,
        durationUnit
      });

      sessionStorage.setItem(
        SESSION_RESULT_KEY,
        JSON.stringify({
          request: {
            symptoms: trimmedSymptoms,
            severity,
            durationValue,
            durationUnit
          },
          response: result
        })
      );
      router.push("/result");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Unexpected error.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1 className="page-title">Smart triage for faster care</h1>
      <p className="page-subtitle">
        Describe your symptoms and get AI-assisted risk stratification plus a recommended department.
      </p>

      <form className="panel" onSubmit={onSubmit} style={{ marginTop: 18, padding: 18 }}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="symptoms">Primary symptoms</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(event) => setSymptoms(event.target.value)}
            placeholder="Example: sharp pain in lower right abdomen for 12 hours, worse when moving."
          />
        </div>

        <div className="grid-2">
          <div>
            <label htmlFor="severity">Current severity</label>
            <select
              id="severity"
              value={severity}
              onChange={(event) => setSeverity(event.target.value as Severity)}
            >
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
          <div>
            <label htmlFor="durationValue">Duration</label>
            <div className="grid-2" style={{ gap: 8 }}>
              <input
                id="durationValue"
                type="number"
                min={1}
                value={durationValue}
                onChange={(event) => setDurationValue(Number(event.target.value))}
              />
              <select
                value={durationUnit}
                onChange={(event) => setDurationUnit(event.target.value as DurationUnit)}
              >
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, color: "#475467", fontSize: 13 }}>
          Upload reports is planned for a future version (Coming soon).
        </div>

        {error && <p className="inline-error">{error}</p>}

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button className="btn-primary" disabled={loading} type="submit">
            {loading ? "Analyzing..." : "Run AI Symptom Analysis"}
          </button>
          <button className="btn-secondary" onClick={() => router.push("/doctors")} type="button">
            Browse Doctors
          </button>
        </div>
      </form>
    </section>
  );
}
