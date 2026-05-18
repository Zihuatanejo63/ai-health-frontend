import Link from "next/link";

type PricingCardProps = {
  name: string;
  price: string;
  audience?: string;
  features: string[];
  excluded?: string[];
  href: string;
  cta: string;
  featured?: boolean;
};

export function PricingCard({
  name,
  price,
  audience,
  features,
  excluded = [],
  href,
  cta,
  featured = false
}: PricingCardProps) {
  return (
    <article className={`panel pricing-panel${featured ? " pricing-featured" : ""}`}>
      <div>
        <h2>{name}</h2>
        <strong>{price}</strong>
        {audience ? <span>{audience}</span> : null}
      </div>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {excluded.length ? (
        <div className="pricing-excluded">
          {excluded.map((item) => <span key={item}>{item}</span>)}
        </div>
      ) : null}
      <Link className={featured ? "btn-primary" : "btn-secondary"} href={href}>
        {cta}
      </Link>
    </article>
  );
}
