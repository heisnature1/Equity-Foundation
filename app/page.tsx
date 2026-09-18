import Link from "next/link";
import Image from "next/image";
import { getPublicSiteSettings, getPublishedPageContent, type HomeContent } from "@/lib/public-content";

const pillars = [
  {
    title: "Legal Aid",
    description: "Helping underserved people navigate access to justice.",
    href: "/legal-help",
  },
  {
    title: "Advocacy",
    description: "Advancing awareness and action around rights and access to justice.",
    href: "/advocacy",
  },
  {
    title: "Public Legal Education",
    description: "Making important legal information understandable and accessible.",
    href: "/know-your-rights",
  },
];

const rightsTopics = [
  "Arrest & Police Rights",
  "Gender-Based Violence",
  "Employment Rights",
  "Housing & Tenancy",
  "Family & Domestic Rights",
  "Access to Legal Representation",
  "Where to Seek Help",
  "Constitutional Rights",
];

const campaigns = [
  {
    title: "Rights awareness and access to justice",
    label: "Current public-interest work",
    description: "Advocacy and public legal education work focused on rights awareness and access to justice in Ghana.",
  },
  {
    title: "Public legal education resources",
    label: "Resources",
    description: "Plain-language materials and briefing resources designed for underserved communities and rights holders.",
  },
  {
    title: "Institutional engagement and legal literacy",
    label: "Advocacy updates",
    description: "Evidence-based advocacy and community engagement work supporting legal literacy and informed action.",
  },
];

const insights = [
  {
    title: "Justice Bridge Index preview",
    category: "Research",
    summary: "A public-facing look at the next research and rights-awareness publication from Equity Bridge Foundation.",
    href: "/justice-bridge-index",
  },
  {
    title: "Know your rights: access to legal support",
    category: "Legal education",
    summary: "Plain-language guidance on how communities can better understand rights and where help may be available.",
    href: "/know-your-rights",
  },
  {
    title: "Advocacy and rights education",
    category: "Advocacy",
    summary: "Public-interest work that supports legal literacy, access to institutions, and informed rights awareness.",
    href: "/advocacy",
  },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  const [homeContent, siteSettings] = await Promise.all([
    getPublishedPageContent<HomeContent>("home"),
    getPublicSiteSettings(),
  ]);

  const organizationName = siteSettings?.organization_name || "Equity Bridge Foundation";
  const heroEyebrow = homeContent.heroEyebrow || organizationName;
  const heroTitle = homeContent.heroTitle || "Bridging the Gap Between Rights and Justice.";
  const heroDescription = homeContent.heroDescription || siteSettings?.mission || "Equity Bridge Foundation works to improve access to justice for women and underprivileged communities in Ghana through legal aid, advocacy, and public legal education.";

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="eyebrow">{heroEyebrow}</p>
            <h1>{heroTitle}</h1>
            <p className="hero__lede">
              {heroDescription}
            </p>
            <div className="hero__actions">
              <Link href="/legal-help" className="button button--primary">
                Get Legal Help
              </Link>
              <Link href="/justice-bridge-index" className="button button--secondary">
                Explore the Justice Bridge Index
              </Link>
            </div>
            <div className="hero__meta" aria-label="Foundation focus areas">
              <span>Legal aid</span>
              <span>Advocacy</span>
              <span>Rights education</span>
            </div>
          </div>

          <div className="hero__visual" aria-label="Ghanaian community and advocacy photography">
            <Image
              className="hero__visual-image"
              src="/images/ghanaian-community.jpg"
              alt="Ghanaian community members participating in advocacy work"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="hero__visual-card">
              <span className="hero__visual-tag">Rights • Justice • Access</span>
              <p>Working alongside communities to strengthen access to justice.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Our work"
            title={homeContent.missionTitle || "A practical response to access-to-justice barriers."}
            description={homeContent.missionDescription || "Equity Bridge Foundation focuses on legal aid, advocacy, and public legal education as part of a broader effort to support rights awareness and access to remedies."}
          />

          <div className="card-grid card-grid--three">
            {pillars.map((pillar) => (
              <Link key={pillar.title} href={pillar.href} className="feature-card">
                <span className="feature-card__kicker">{pillar.title}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <span className="feature-card__link">Learn more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="split-layout">
            <div>
              <p className="eyebrow">Justice Bridge Index</p>
              <h2 className="section-title">Evidence-based research on access to justice in Ghana.</h2>
              <p className="section-description">
                The Justice Bridge Index is an evidence-based quarterly publication examining access-to-justice issues in Ghana. The latest available edition and public material will be published here as verified information becomes available.
              </p>
            </div>

            <div className="research-panel">
              <p className="research-panel__label">Latest edition</p>
              <h3>Justice Bridge Index — Q1: Rights Awareness Baseline</h3>
              <p>
                A planned baseline publication focused on public awareness of rights, legal institutions, and access to remedies.
              </p>
              <div className="research-panel__actions">
                <Link href="/justice-bridge-index" className="button button--primary">
                  Read online
                </Link>
                <button type="button" className="button button--secondary" aria-label="Download PDF placeholder">
                  Download PDF
                </button>
              </div>
              <Link href="/justice-bridge-index" className="text-link">Browse previous editions</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Know your rights"
            title="Plain-language legal information for everyday decisions."
            description="These practical topic areas help the public understand basic rights and where they can begin to seek help or guidance."
          />

          <div className="resource-grid">
            {rightsTopics.map((topic) => (
              <div key={topic} className="tag-card">
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionIntro
            eyebrow="Advocacy & campaigns"
            title="Verified initiatives and public-interest work."
            description="Only verified advocacy and campaign work is published here. A full campaign list will be added as official initiatives are confirmed."
          />

          <div className="card-grid card-grid--three">
            {campaigns.map((campaign) => (
              <article key={campaign.title} className="feature-card feature-card--plain">
                <span className="feature-card__kicker">{campaign.label}</span>
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Get involved"
            title="Support rights, legal literacy, and access to justice."
            description="People can support the Foundation through advocacy, collaboration, volunteering, and strategic engagement where appropriate and verified."
          />

          <div className="card-grid card-grid--three">
            <article className="feature-card feature-card--plain">
              <span className="feature-card__kicker">Support</span>
              <h3>Support the Foundation</h3>
              <p>Explore verified support opportunities and ways to contribute to legal-aid and advocacy work.</p>
            </article>
            <article className="feature-card feature-card--plain">
              <span className="feature-card__kicker">Volunteer</span>
              <h3>Volunteer</h3>
              <p>Community participation and support opportunities will be published when confirmed by the Foundation.</p>
            </article>
            <article className="feature-card feature-card--plain">
              <span className="feature-card__kicker">Collaborate</span>
              <h3>Collaborate</h3>
              <p>Partnership opportunities will only be published where the relationship has been formally confirmed.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionIntro
            eyebrow="Latest insights"
            title="Editorial updates, research, education, and advocacy."
            description="Professional public-facing updates will appear here as content is reviewed and published."
          />

          <div className="card-grid card-grid--three">
            {insights.map((item) => (
              <article key={item.title} className="article-card">
                <span className="article-card__tag">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <Link href={item.href}>Read more</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <p className="eyebrow">Need help understanding your rights?</p>
              <h2 className="section-title section-title--compact">Start a Legal Help Request</h2>
            </div>
            <p className="cta-banner__text">
              The online legal-aid request form is for intake and triage only and does not guarantee representation or immediate legal assistance.
            </p>
            <div className="cta-banner__actions">
              <Link href="/legal-help" className="button button--primary">
                Start a Legal Help Request
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  );
}
