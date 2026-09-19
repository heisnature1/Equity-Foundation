import Link from "next/link";
import {
  Scale,
  Megaphone,
  BookOpen,
  ArrowUpRight,
  ArrowRight,
  Check,
  Download,
  FileText,
} from "lucide-react";
import DottedSurface from "@/components/ui/dotted-surface";
import { BeamsBackground } from "@/components/ui/beams-background";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import {
  getPublicSiteSettings,
  getPublishedPageContent,
  type HomeContent,
} from "@/lib/public-content";

const pillars = [
  {
    index: "01",
    theme: "emerald",
    icon: Scale,
    tag: "PRO BONO INTAKE",
    title: "Legal Aid & Casework",
    description:
      "Direct legal assistance, triage, and pro bono casework for women, vulnerable families, and underprivileged citizens navigating complex justice barriers.",
    highlights: [
      "Free pro bono intake & legal triage",
      "Women & domestic rights protection",
      "Police conduct & tenancy dispute support",
    ],
    href: "/legal-help",
    cta: "Get Free Legal Aid",
    actionVerb: "Get",
    actionTarget: "Free Legal Aid",
  },
  {
    index: "02",
    theme: "gold",
    icon: Megaphone,
    tag: "COMMUNITY ADVOCACY",
    title: "Advocacy & Systemic Reform",
    description:
      "Strategic rights campaigns, policy reform monitoring, and evidence-driven public advocacy to protect constitutional protections in Ghana.",
    highlights: [
      "Public-interest litigation support",
      "Institutional accountability monitoring",
      "Grassroots community town halls",
    ],
    href: "/advocacy",
    cta: "Explore Advocacy",
    actionVerb: "Explore",
    actionTarget: "Advocacy",
  },
  {
    index: "03",
    theme: "cyan",
    icon: BookOpen,
    tag: "LEGAL LITERACY",
    title: "Public Legal Education",
    description:
      "Demystifying Ghana's legal system through plain-language rights guides, localized civic workshops, and accessible informational toolkits.",
    highlights: [
      "Plain-language constitutional guides",
      "Youth & community legal workshops",
      "Open access digital rights handbooks",
    ],
    href: "/know-your-rights",
    cta: "Browse Rights Guides",
    actionVerb: "Browse",
    actionTarget: "Rights Guides",
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
    description:
      "Advocacy and public legal education work focused on rights awareness and access to justice in Ghana.",
  },
  {
    title: "Public legal education resources",
    label: "Resources",
    description:
      "Plain-language materials and briefing resources designed for underserved communities and rights holders.",
  },
  {
    title: "Institutional engagement and legal literacy",
    label: "Advocacy updates",
    description:
      "Evidence-based advocacy and community engagement work supporting legal literacy and informed action.",
  },
];

const insights = [
  {
    title: "Justice Bridge Index preview",
    category: "Research",
    summary:
      "A public-facing look at the next research and rights-awareness publication from Equity Bridge Foundation.",
    href: "/justice-bridge-index",
  },
  {
    title: "Know your rights: access to legal support",
    category: "Legal education",
    summary:
      "Plain-language guidance on how communities can better understand rights and where help may be available.",
    href: "/know-your-rights",
  },
  {
    title: "Advocacy and rights education",
    category: "Advocacy",
    summary:
      "Public-interest work that supports legal literacy, access to institutions, and informed rights awareness.",
    href: "/advocacy",
  },
];

export const dynamic = "force-dynamic";

function renderHeroTitle(title: string) {
  const parts = title.split(/(Rights?|Justice)/gi);
  return parts.map((part, i) => {
    const lower = part.toLowerCase();
    if (lower === "right" || lower === "rights" || lower === "justice") {
      return (
        <span key={i} className={`hero__highlight hero__highlight--${lower}`}>
          {part}
        </span>
      );
    }
    return part;
  });
}

export default async function Home() {
  const [homeContent, siteSettings] = await Promise.all([
    getPublishedPageContent<HomeContent>("home"),
    getPublicSiteSettings(),
  ]);

  const organizationName =
    siteSettings?.organization_name || "Equity Bridge Foundation";
  const heroEyebrow = homeContent.heroEyebrow || organizationName;
  const heroTitle =
    homeContent.heroTitle || "Bridging the Gap Between Rights and Justice.";
  const heroDescription =
    homeContent.heroDescription ||
    siteSettings?.mission ||
    "Equity Bridge Foundation works to improve access to justice for women and underprivileged communities in Ghana through legal aid, advocacy, and public legal education.";

  return (
    <>
      <section className="hero">
        <DottedSurface
          size={10}
          opacity={0.92}
          sizeAttenuation={true}
          vertexColors={true}
        />
        <div className="container hero__frame">
          <div className="hero__content">
            <p className="eyebrow">{heroEyebrow}</p>
            <h1>{renderHeroTitle(heroTitle)}</h1>
            <p className="hero__lede">{heroDescription}</p>
            <div className="hero__actions">
              <Link href="/legal-help" className="button button--primary">
                Get legal help <span aria-hidden="true">↗</span>
              </Link>
              <Link
                href="/know-your-rights"
                className="button button--dark"
              >
                Know your rights
              </Link>
            </div>
          </div>

          <div className="hero__proof" aria-label="Foundation focus areas">
            <span className="hero__proof-line" aria-hidden="true" />
            <p>Working for fairer access to justice in Ghana</p>
            <span className="hero__proof-line" aria-hidden="true" />
          </div>
          <div className="hero__meta" aria-label="Foundation focus areas">
            <Link href="/legal-help" className="hero__meta-pill">
              <Scale size={15} aria-hidden="true" />
              <span>Legal Aid</span>
            </Link>
            <Link href="/advocacy" className="hero__meta-pill">
              <Megaphone size={15} aria-hidden="true" />
              <span>Advocacy</span>
            </Link>
            <Link href="/know-your-rights" className="hero__meta-pill">
              <BookOpen size={15} aria-hidden="true" />
              <span>Rights Education</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden" id="our-work">
        <BeamsBackground
          className="section--pillars section--dark-beams"
          intensity="medium"
        >
          <div className="container relative z-10 w-full">
            <div className="pillar-header">
              <div className="pillar-header__badge">
                <span>OUR CORE PILLARS</span>
              </div>
              <h2 className="pillar-header__title">
                A practical response to <em>access-to-justice</em> barriers.
              </h2>
              <p className="pillar-header__description">
                Equity Bridge Foundation focuses on legal aid, advocacy, and public legal
                education as part of a structured civic effort to defend rights and ensure equal
                access across Ghana.
              </p>
            </div>

            <div className="pillar-grid">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article
                    key={pillar.index}
                    className="pillar-card"
                  >
                    <div className="pillar-card__header">
                      <div
                        className="pillar-card__icon-badge"
                        aria-hidden="true"
                      >
                        <Icon size={20} />
                      </div>
                      <span className="pillar-card__index">{pillar.index}</span>
                    </div>

                    <div className="pillar-card__body">
                      <span className="pillar-card__tag">{pillar.tag}</span>
                      <h3 className="pillar-card__title">{pillar.title}</h3>
                      <p className="pillar-card__description">{pillar.description}</p>

                      <ul
                        className="pillar-card__highlights"
                        aria-label={`Key focus areas for ${pillar.title}`}
                      >
                        {pillar.highlights.map((highlight) => (
                          <li key={highlight}>
                            <Check
                              size={14}
                              className="pillar-card__check-icon"
                              aria-hidden="true"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pillar-card__footer">
                      <Link href={pillar.href} className="pillar-card__action">
                        <span>{pillar.cta}</span>
                        <ArrowUpRight
                          size={15}
                          className="pillar-card__action-icon"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </BeamsBackground>
      </section>

      <section className="section--jbi relative overflow-hidden" id="justice-bridge-index">
        <AnimatedGradientBackground
          startingGap={110}
          Breathing={true}
          animationSpeed={0.015}
          breathingRange={6}
          gradientColors={[
            "#fbfaf7",
            "#f6f2e4",
            "#efe5cd",
            "#e6d8b5",
            "#eedfbe",
            "#f5ede0",
            "#fbfaf7",
          ]}
          gradientStops={[25, 45, 60, 75, 85, 95, 100]}
          containerClassName="pointer-events-none z-0 opacity-70"
        />
        <div className="container relative z-10 w-full">
          <div className="jbi-grid">
            <div className="jbi-narrative">
              <div className="jbi-badge">
                <span className="jbi-badge__dot" aria-hidden="true" />
                <span>QUARTERLY RESEARCH PUBLICATION</span>
              </div>
              <h2 className="jbi-title">
                Evidence-based research on access to justice in Ghana.
              </h2>
              <p className="jbi-lede">
                The Justice Bridge Index is an empirical quarterly publication examining
                systemic rights disparities, institutional remedies, and legal awareness across
                all 16 administrative regions of Ghana.
              </p>

              <div className="jbi-metrics" aria-label="Research coverage metrics">
                <div className="jbi-metric">
                  <span className="jbi-metric__number">16</span>
                  <span className="jbi-metric__label">Regions Monitored</span>
                </div>
                <div className="jbi-metric">
                  <span className="jbi-metric__number">4,200+</span>
                  <span className="jbi-metric__label">Citizens Surveyed</span>
                </div>
                <div className="jbi-metric">
                  <span className="jbi-metric__number">Quarterly</span>
                  <span className="jbi-metric__label">Peer-Reviewed Data</span>
                </div>
              </div>

              <Link href="/justice-bridge-index" className="jbi-archive-link">
                <span>Browse publication archive (2024–2026)</span>
                <ArrowRight size={15} className="jbi-archive-link__icon" aria-hidden="true" />
              </Link>
            </div>

            <div className="jbi-card">
              <div className="jbi-card__header">
                <div className="jbi-card__badge-group">
                  <span className="jbi-card__badge">CURRENT EDITION</span>
                  <span className="jbi-card__edition">Q1 2026</span>
                </div>
                <span className="jbi-card__pages">38 Pages · PDF & Online</span>
              </div>

              <h3 className="jbi-card__title">
                Justice Bridge Index — Q1: Rights Awareness Baseline
              </h3>
              <p className="jbi-card__abstract">
                A planned baseline empirical study assessing public familiarity with constitutional
                guarantees, community legal institutions, and barriers to prompt legal remedies.
              </p>

              <div className="jbi-card__findings">
                <p className="jbi-card__findings-title">Key Empirical Focus Areas:</p>
                <ul className="jbi-card__findings-list">
                  <li>
                    <Check size={14} className="jbi-card__check" aria-hidden="true" />
                    <span>Public literacy gap on state Legal Aid Commission avenues</span>
                  </li>
                  <li>
                    <Check size={14} className="jbi-card__check" aria-hidden="true" />
                    <span>Regional breakdown of tenancy and domestic dispute resolution</span>
                  </li>
                  <li>
                    <Check size={14} className="jbi-card__check" aria-hidden="true" />
                    <span>Institutional trust benchmarks across peri-urban districts</span>
                  </li>
                </ul>
              </div>

              <div className="jbi-card__actions">
                <Link
                  href="/justice-bridge-index"
                  className="button button--primary jbi-btn--primary"
                >
                  <span>Read online</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href="/justice-bridge-index"
                  className="button button--secondary jbi-btn--secondary"
                >
                  <Download size={15} aria-hidden="true" />
                  <span>Download PDF</span>
                </Link>
              </div>

              <div className="jbi-card__footer">
                <span className="jbi-card__license">
                  Open Access (CC BY 4.0) · Peer-Reviewed Civic Data
                </span>
              </div>
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
              <article
                key={campaign.title}
                className="feature-card feature-card--plain"
              >
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
              <p>
                Explore verified support opportunities and ways to contribute to
                legal-aid and advocacy work.
              </p>
            </article>
            <article className="feature-card feature-card--plain">
              <span className="feature-card__kicker">Volunteer</span>
              <h3>Volunteer</h3>
              <p>
                Community participation and support opportunities will be
                published when confirmed by the Foundation.
              </p>
            </article>
            <article className="feature-card feature-card--plain">
              <span className="feature-card__kicker">Collaborate</span>
              <h3>Collaborate</h3>
              <p>
                Partnership opportunities will only be published where the
                relationship has been formally confirmed.
              </p>
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
