import Link from "next/link";
import { marketing } from "@/lib/marketing-content";
export function SampleBadge() {
  return <span className="hm-badge">Sample · fictional data</span>;
}
export function ReportPreview() {
  return (
    <article className="hm-preview">
      <div className="hm-row">
        <span className="hm-overline">YOUR HEALTH, OVER TIME</span>
        <SampleBadge />
      </div>
      <h2>
        A little change.
        <br />A clearer picture.
      </h2>
      <p>HbA1c · Blood glucose</p>
      <div className="hm-row">
        <strong className="hm-number">
          6.0<span>%</span>
        </strong>
        <span className="hm-flag">↑ Worsening · Sample</span>
      </div>
      <svg
        viewBox="0 0 400 150"
        role="img"
        aria-label="Sample HbA1c: 5.4 percent in 2024, 5.8 in 2025, 6.0 in 2026. Truncated vertical scale, 5.0 to 6.2 percent."
      >
        <path
          d="M35 25H370 M35 75H370 M35 125H370"
          stroke="#dbe5df"
          fill="none"
        />
        <path d="M40 85L200 45L360 25L360 125L40 125Z" fill="#e0ede6" />
        <path
          d="M40 85L200 45L360 25"
          fill="none"
          stroke="#146b55"
          strokeWidth="3"
        />
        {[
          [40, 85, "5.4"],
          [200, 45, "5.8"],
          [360, 25, "6.0"],
        ].map(([x, y, v]) => (
          <g key={v}>
            <circle cx={x} cy={y} r="5" fill="#146b55" />
            <text
              x={x}
              y={Number(y) - 14}
              textAnchor="middle"
              fill="#26453b"
              fontSize="13"
            >
              {v}
            </text>
          </g>
        ))}
        <text x="40" y="147" textAnchor="middle" fontSize="12">
          2024
        </text>
        <text x="200" y="147" textAnchor="middle" fontSize="12">
          2025
        </text>
        <text x="360" y="147" textAnchor="middle" fontSize="12">
          2026
        </text>
      </svg>
      <div className="hm-preview-note">
        <strong>A pattern worth a conversation</strong>
        <p>
          This sample is above its report’s reference range. Bring the trend to
          your clinician.
        </p>
      </div>
      <Link className="hm-text-link" href="/sample-report">
        Explore the full sample <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
export function Plans() {
  return (
    <div className="hm-grid hm-plans">
      {marketing.plans.map((p, i) => (
        <article
          className={`hm-card ${i === 1 ? "hm-featured" : ""}`}
          key={p.name}
        >
          <div className="hm-row">
            <h3>{p.name}</h3>
            {i === 1 && <span className="hm-badge">For ongoing tracking</span>}
          </div>
          <p className="hm-price">
            {p.price}
            <span>{p.period}</span>
          </p>
          <p>{p.note}</p>
          <ul>
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link
            className={i === 1 ? "hm-button" : "hm-button hm-secondary"}
            href="/sample-report"
          >
            Explore the sample <span aria-hidden="true">↗</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
export function Disclaimer() {
  return (
    <p className="hm-disclaimer">
      HealthMatch AI provides health information and self-management support. It
      is not a diagnosis and does not replace a clinician. Do not delay care
      because of a result, an explanation, or the absence of an alert.
    </p>
  );
}
