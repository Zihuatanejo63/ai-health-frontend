type FeatureCardProps = {
  title: string;
  description?: string;
  icon?: string;
  tone?: "primary" | "secondary" | "success" | "warning" | "danger" | "purple";
};

export function FeatureCard({
  title,
  description,
  icon = "✓",
  tone = "primary"
}: FeatureCardProps) {
  return (
    <article className={`feature-card feature-card-${tone}`}>
      <span className="feature-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
    </article>
  );
}
