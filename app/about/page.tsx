import { PageHeader } from "@/components/page-shell";
import { getPublishedPageContent } from "@/lib/public-content";

export const dynamic = "force-dynamic";

type AboutContent = {
  description?: string;
  missionTitle?: string;
  missionDescription?: string;
  whoWeServeTitle?: string;
  whoWeServeDescription?: string;
  areasTitle?: string;
  areas?: string[];
  approachTitle?: string;
  approachDescription?: string;
  legalStatusTitle?: string;
  legalStatusDescription?: string;
};

const areas = [
  "Free legal aid",
  "Advocacy",
  "Public legal education",
  "Rights awareness",
  "Evidence-based research",
  "Access to legal remedies and institutions",
];

export default async function AboutPage() {
  const content = await getPublishedPageContent<AboutContent>("about");
  const areas = content.areas ?? [];
  return (
    <>
      <PageHeader
        title="About"
        description={content.description || "Public information about Equity Bridge Foundation will be published here once approved."}
      />

      <section className="page-section">
        <div className="container page-section__grid">
          <article className="page-card">
            <p className="eyebrow">Mission</p>
            <h3>{content.missionTitle || "Mission information not yet published."}</h3>
            <p>{content.missionDescription || "Verified mission information will appear here when published by the Foundation."}</p>
          </article>

          <article className="page-card">
            <p className="eyebrow">Who we serve</p>
            <h3>{content.whoWeServeTitle || "Who we serve information not yet published."}</h3>
            <p>{content.whoWeServeDescription || "Verified information about the communities served will appear here when published."}</p>
          </article>
        </div>
      </section>

      <section className="page-section section--soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Areas of work</p>
            <h2 className="section-title">{content.areasTitle || "Areas of work"}</h2>
          </div>

          <div className="resource-grid">
            {areas.map((area) => (
              <div key={area} className="tag-card">
                {area}
              </div>
            ))}
            {!areas.length ? <div className="notice-box">No areas of work have been published yet.</div> : null}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container page-section__grid">
          <article className="copy-block">
            <p className="eyebrow">Research & advocacy approach</p>
            <h3>{content.approachTitle || "Research and advocacy information not yet published."}</h3>
            <p>{content.approachDescription || "Verified information about the Foundation's approach will appear here when published."}</p>
          </article>

          <article className="copy-block">
            <p className="eyebrow">Legal status</p>
            <h3>{content.legalStatusTitle || "Legal status information not yet published."}</h3>
            <p>{content.legalStatusDescription || "Legal status and governance information will appear here only after official verification."}</p>
          </article>
        </div>
      </section>
    </>
  );
}
