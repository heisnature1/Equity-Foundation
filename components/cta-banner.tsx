import Link from "next/link";

export function CtaBanner({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__inner">
        <div>
          <p className="eyebrow">Need support?</p>
          <h2 className="section-title section-title--compact">{title}</h2>
        </div>
        <p className="cta-banner__text">{description}</p>
        <div className="cta-banner__actions">
          <Link href={primaryHref} className="button button--primary">
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link href={secondaryHref} className="button button--secondary">
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
