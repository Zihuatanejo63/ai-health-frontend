import Link from "next/link";

type PricingCardProps = {
  name: string;
  price: string;
  features: string[];
  href: string;
  cta: string;
  featured?: boolean;
};

export function PricingCard({
  name,
  price,
  features,
  href,
  cta,
  featured = false
}: PricingCardProps) {
  return (
    <article className={`panel pricing-panel${featured ? " pricing-featured" : ""}`}>
      <div>
        <h2>{name}</h2>
        <strong>{price}</strong>
      </div>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <Link className={featured ? "btn-primary" : "btn-secondary"} href={href}>
        {cta}
      </Link>
    </article>
  );
}
