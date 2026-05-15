type RiskTone = "low" | "moderate" | "high" | "emergency";

type RiskLevelCardProps = {
  level: string;
  description?: string;
};

function getRiskTone(level: string): RiskTone {
  const normalized = level.toLowerCase();
  if (normalized === "low") return "low";
  if (normalized === "high") return "high";
  if (normalized === "emergency") return "emergency";
  return "moderate";
}

export function RiskLevelCard({ level, description }: RiskLevelCardProps) {
  const tone = getRiskTone(level);

  return (
    <article className={`risk-level-card risk-${tone}`}>
      <span>Risk level</span>
      <strong>{level}</strong>
      {description ? <p>{description}</p> : null}
    </article>
  );
}
