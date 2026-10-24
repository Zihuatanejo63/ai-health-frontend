"use client";
import { useState } from "react";
import {
  evaluate,
  EMERGENCY_TEXT,
  redFlagQuestion,
} from "../../shared/health-rules";
import { emptyWorkspace } from "../../shared/health";
export function PublicSafety() {
  const [marker, setMarker] = useState("Potassium"),
    [value, setValue] = useState(""),
    [question, setQuestion] = useState("");
  const units: Record<string, string> = {
    Potassium: "mmol/L",
    Glucose: "mg/dL",
    Hemoglobin: "g/dL",
  };
  const urgent =
    redFlagQuestion(question) ||
    (value !== "" &&
      evaluate(
        {
          id: "public",
          marker,
          value: Number(value),
          unit: units[marker],
          low: null,
          high: null,
          confidence: 1,
          source: "unsaved visitor entry",
          comparator: "=",
          reviewed: false,
        },
        emptyWorkspace().profile,
      ).severity === "critical");
  return (
    <section className="hm-card hp-form">
      <h2>Urgent warnings, without signing in</h2>
      <p>
        These limited checks run in your browser. Nothing entered here is saved
        or sent to a model. They cannot rule out an emergency or replace the
        laboratory’s instructions.
      </p>
      {urgent && (
        <div role="alert" className="hp-emergency">
          <strong>{EMERGENCY_TEXT}</strong>
          <p>
            A supported critical-value or symptom rule matched your entry. Check
            the original result and seek help now.
          </p>
        </div>
      )}
      <div className="hp-field-grid">
        <label>
          Result to check
          <select
            value={marker}
            onChange={(e) => {
              setMarker(e.target.value);
              setValue("");
            }}
          >
            {Object.keys(units).map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label>
          Value ({units[marker]})
          <input
            type="number"
            min="0"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      </div>
      <label>
        Urgent concern (English or 中文)
        <input
          value={question}
          maxLength={2000}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Chest pain / 胸痛"
        />
      </label>
      {!urgent && (value || question) && (
        <p>
          No supported rule matched this entry. This is not an all-clear. If you
          feel unsafe or unwell, seek professional help.
        </p>
      )}
    </section>
  );
}
