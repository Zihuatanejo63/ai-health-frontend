type CareLevelCardProps = {
  title: string;
  description: string;
  tone?: "danger" | "warning" | "primary" | "secondary" | "success";
  active?: boolean;
};

export function CareLevelCard({
  title,
  description,
  tone = "primary",
  active = false
}: CareLevelCardProps) {
  return (
    <article className={`care-card care-card-${tone}${active ? " active" : ""}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
