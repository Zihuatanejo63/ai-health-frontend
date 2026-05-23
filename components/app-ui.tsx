import Link from "next/link";
import { ReactNode } from "react";

export type Tone = "primary" | "teal" | "success" | "warning" | "danger" | "purple";

export function AppLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="app-content-header">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="app-header-action">{action}</div> : null}
    </header>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`panel app-card ${className}`}>{children}</article>;
}

export function IconCircle({ children, tone = "primary" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`icon-circle icon-${tone}`} aria-hidden="true">
      {children}
    </span>
  );
}

export function StatusBadge({ children, tone = "primary" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`status-badge badge-${tone}`}>{children}</span>;
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="btn-primary" href={href}>
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="btn-secondary" href={href}>
      {children}
    </Link>
  );
}

export function StatCard({
  label,
  value,
  detail,
  tone = "primary"
}: {
  label: string;
  value: string;
  detail: string;
  tone?: Tone;
}) {
  return (
    <Card className={`stat-card stat-${tone}`}>
      <IconCircle tone={tone}>{label.charAt(0)}</IconCircle>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </Card>
  );
}

export function ChoiceChip({
  children,
  selected = false,
  danger = false
}: {
  children: ReactNode;
  selected?: boolean;
  danger?: boolean;
}) {
  return (
    <label className={`choice-chip${selected ? " selected" : ""}${danger ? " danger" : ""}`}>
      <input type="checkbox" defaultChecked={selected} /> {children}
    </label>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-bar" aria-label={`Progress ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

export function InsuranceConceptCard({
  title,
  description,
  tone = "primary"
}: {
  title: string;
  description: string;
  tone?: Tone;
}) {
  return (
    <Card className="concept-card">
      <IconCircle tone={tone}>{title.charAt(0)}</IconCircle>
      <h2>{title}</h2>
      <p>{description}</p>
    </Card>
  );
}

export function SummaryPreview({
  generated = "Generated on May 19, 2025 · 10:24 AM",
  rows = ["Patient Overview", "Symptoms", "Timeline", "Red Flags Checked", "Medications Taken", "Questions to Ask"],
  ready = "Ready"
}: {
  generated?: string;
  rows?: string[];
  ready?: string;
}) {
  return (
    <Card className="summary-preview-card">
      <div className="summary-preview-brand">HealthMatchAI</div>
      <p>{generated}</p>
      {rows.map((item) => (
        <div className="summary-preview-row" key={item}>
          <strong>{item}</strong>
          <span>{ready}</span>
        </div>
      ))}
    </Card>
  );
}

export function HistoryItem({
  symptom,
  risk,
  care,
  date,
  riskLabel = "Risk Level",
  careLabel = "Recommended Care",
  tone = "warning"
}: {
  symptom: string;
  risk: string;
  care: string;
  date: string;
  riskLabel?: string;
  careLabel?: string;
  tone?: Tone;
}) {
  return (
    <Card className="history-item">
      <IconCircle tone={tone}>{symptom.charAt(0)}</IconCircle>
      <div>
        <h2>{symptom}</h2>
        <div className="history-meta">
          <span>{riskLabel}</span>
          <strong>{risk}</strong>
          <span>{careLabel}</span>
          <strong>{care}</strong>
        </div>
      </div>
      <time>{date}</time>
      <span className="chevron">›</span>
    </Card>
  );
}

export function SettingsSection({
  title,
  subtitle,
  icon,
  children,
  tone = "primary"
}: {
  title: string;
  subtitle: string;
  icon: string;
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <Card className="settings-section-card">
      <IconCircle tone={tone}>{icon}</IconCircle>
      <div className="settings-section-copy">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="settings-section-control">{children}</div>
    </Card>
  );
}
