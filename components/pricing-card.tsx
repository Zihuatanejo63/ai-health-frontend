import Link from "next/link";

type PricingCardProps = {
  name: string;
  price: string;
  audience?: string;
  features: string[];
  excluded?: string[];
  excludedLabel?: string;
  href?: string;
  cta: string;
  featured?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export function PricingCard({
  name,
  price,
  audience,
  features,
  excluded = [],
  excludedLabel = "Not included",
  href,
  cta,
  featured = false,
  disabled = false,
  onClick
}: PricingCardProps) {
  const className = featured ? "btn-primary" : "btn-secondary";

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
          {excluded.map((item) => (
            <span key={item}>
              <strong>{excludedLabel}: </strong>
              {item}
            </span>
          ))}
        </div>
      ) : null}
      {onClick ? (
        <button className={className} disabled={disabled} onClick={onClick} type="button">
          {cta}
        </button>
      ) : (
        <Link className={className} href={href ?? "/pricing"}>
          {cta}
        </Link>
      )}
    </article>
  );
}
