import Link from "next/link";
import type { ReactNode } from "react";

export function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div style={{ maxWidth: "42rem" }}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <div>
          <p className="eyebrow">Equity Bridge Foundation</p>
          <h1 className="page-title">{title}</h1>
          {description ? <p className="page-subtitle">{description}</p> : null}
        </div>
        {actions ? <div className="page-hero__actions">{actions}</div> : null}
      </div>
    </section>
  );
}

export function InfoCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) {
  const content = (
    <>
      <h3 className="info-card__title">{title}</h3>
      <p>{description}</p>
      {href ? <span className="info-card__link">Learn more</span> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="info-card">
        {content}
      </Link>
    );
  }

  return <article className="info-card">{content}</article>;
}
