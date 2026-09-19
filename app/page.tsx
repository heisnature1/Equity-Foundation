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
  ShieldAlert,
  HeartHandshake,
  Briefcase,
  Home as HomeIcon,
  Users,
  HelpCircle,
  Landmark,
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
  {
    title: "Arrest & Police Rights",
    slug: "arrest-police-rights",
    tag: "Criminal Procedure",
    icon: ShieldAlert,
    description:
      "Detention time limits, right to legal representation, and constitutional bail procedures under Act 30.",
  },
  {
    title: "Gender-Based Violence",
    slug: "gender-based-violence",
    tag: "Protection & Safety",
    icon: HeartHandshake,
    description:
      "Statutory protections under the Domestic Violence Act (Act 732), court protection orders, and emergency aid.",
  },
  {
    title: "Employment Rights",
    slug: "employment-rights",
    tag: "Labour Act 651",
    icon: Briefcase,
    description:
      "Fair remuneration, lawful termination procedures, redundancy entitlements, and Labour Commission filings.",
  },
  {
    title: "Housing & Tenancy",
    slug: "housing-tenancy",
    tag: "Rent Act 220",
    icon: HomeIcon,
    description:
      "Lawful rent advance caps, notice-to-quit regulations, and dispute resolution via Rent Control offices.",
  },
  {
    title: "Family & Domestic Rights",
    slug: "family-domestic-rights",
    tag: "Family Law",
    icon: Users,
    description:
      "Custody arrangements, spousal maintenance, customary marriage validity, and PNDC Law 111 inheritance rules.",
  },
  {
    title: "Access to Legal Representation",
    slug: "legal-representation",
    tag: "State Aid & Pro Bono",
    icon: Scale,
    description:
      "Eligibility guidelines for state Legal Aid Commission counsel, civic paralegals, and foundation casework.",
  },
  {
    title: "Where to Seek Help",
    slug: "where-to-seek-help",
    tag: "Institutional Directory",
    icon: HelpCircle,
    description:
      "Verified contact points for CHRAJ ombudsmen, DOVVSU police units, Legal Aid clinics, and mediation desks.",
  },
  {
    title: "Constitutional Rights",
    slug: "constitutional-rights",
    tag: "1992 Constitution",
    icon: Landmark,
    description:
      "Chapter 5 fundamental freedoms, protection against discrimination, and invoking Supreme Court remedies.",
  },
];

const campaigns = [
  {
    icon: ShieldAlert,
    tag: "ACTIVE CAMPAIGN",
    title: "Police Conduct & 48-Hour Bail Monitoring",
    description:
      "Systematic monitoring of constitutional detention limits, pro bono station visits, and legal triage across high-density police divisions.",
    metrics: "14 Divisions Monitored · 320+ Citizens Aided",
    href: "/advocacy",
    cta: "Explore Campaign",
  },
  {
    icon: Users,
    tag: "COMMUNITY LITERACY",
    title: "Grassroots Legal Education & Townhalls",
    description:
      "Plain-language rights workshops conducted in Twi, Ga, Ewe, and English for market associations, youth groups, and informal transport unions.",
    metrics: "24 Community Clinics · 1,800+ Participants",
    href: "/advocacy",
    cta: "View Outreach",
  },
  {
    icon: Landmark,
    tag: "POLICY REFORM",
    title: "State Legal Aid Expansion & Court Access",
    description:
      "Submitting empirical research to Parliamentary Committees and the Legal Aid Commission to advocate for expanded funding for indigent representation.",
    metrics: "16 Regions Monitored · Policy Brief Active",
    href: "/advocacy",
    cta: "Read Policy Agenda",
  },
];

const involvementPathways = [
  {
    icon: Scale,
    tag: "LEGAL PROFESSIONALS",
    title: "Pro Bono Legal Network",
    description:
      "For practicing lawyers, pupil barristers, and licensed legal executives committed to providing verified pro bono casework for underprivileged citizens.",
    highlights: [
      "Verified indigent casework triage",
      "1–2 cases annually or monthly clinic duty",
      "Pro bono public recognition & CLE docket",
    ],
    href: "/contact?type=pro-bono",
    cta: "Join Legal Network",
  },
  {
    icon: HeartHandshake,
    tag: "COMMUNITY VOLUNTEERS",
    title: "Volunteer & Community Outreach",
    description:
      "Support local dialect translation, community townhall logistics, youth literacy workshops, and grassroots rights distribution in your district.",
    highlights: [
      "Local dialect translation (Twi, Ga, Ewe)",
      "Civic townhall & legal clinic coordination",
      "Digital rights education & peer advocacy",
    ],
    href: "/contact?type=volunteer",
    cta: "Volunteer With Us",
  },
  {
    icon: Briefcase,
    tag: "INSTITUTIONS & DONORS",
    title: "Strategic Partnerships",
    description:
      "Collaborate with Equity Bridge Foundation on joint research publications, donor-supported regional rights clinics, and national justice access reforms.",
    highlights: [
      "Joint empirical research & index publications",
      "Regional rights clinic sponsorship",
      "Transparent impact reporting & auditing",
    ],
    href: "/contact?type=partner",
    cta: "Partner With Us",
  },
];

const insights = [
  {
    title: "Justice Bridge Index: Baseline Findings on Legal Literacy",
    category: "RESEARCH PUBLICATION",
    date: "Q1 2026 · 6 min read",
    summary:
      "An empirical assessment of public familiarity with fundamental rights, court access hurdles, and statutory remedies across Ghana's 16 regions.",
    href: "/justice-bridge-index",
  },
  {
    title: "Tenancy Protections & Rent Advance Rules Under Act 220",
    category: "LEGAL EDUCATION",
    date: "March 2026 · 4 min read",
    summary:
      "A plain-language guide detailing lawful 6-month rent advance caps, notice-to-quit regulations, and dispute resolution via Rent Control offices.",
    href: "/know-your-rights#housing-tenancy",
  },
  {
    title: "Constitutional Safeguards in Police Custody & Bail",
    category: "ADVOCACY & REFORM",
    date: "February 2026 · 5 min read",
    summary:
      "Evaluating Article 14(3) protections, bail conditions, and institutional remedies when police detentions exceed the 48-hour statutory rule.",
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
          waveAmplitude={14}
          waveSpeed={0.02}
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

      <section className="section section--know-your-rights relative overflow-hidden" id="know-your-rights">
        {/* Organized 3D dot grid anchored strictly below the content cards */}
        <div className="kyr-dots-container" aria-hidden="true">
          <DottedSurface
            size={9}
            opacity={0.82}
            sizeAttenuation={true}
            vertexColors={true}
            waveAmplitude={10}
            waveSpeed={0.018}
            pointsY={-120}
            className="kyr-dots-canvas"
          />
        </div>
        <div className="container relative z-10">
          <div className="kyr-section-header">
            <div className="jbi-pill-badge">
              <span className="jbi-pill-badge__dot" aria-hidden="true" />
              <span>KNOW YOUR RIGHTS</span>
            </div>
            <h2 className="kyr-section-title">Plain-language legal information for everyday decisions.</h2>
            <p className="kyr-section-desc">
              These practical topic areas help the public understand basic rights, statutory protections,
              and where they can begin to seek immediate guidance across Ghana.
            </p>
          </div>

          <div className="kyr-card-grid">
            {rightsTopics.slice(0, 4).map((topic) => (
              <Link
                key={topic.title}
                href={`/know-your-rights#${topic.slug}`}
                className="kyr-topic-card"
              >
                <div className="kyr-topic-card__header">
                  <div className="kyr-topic-card__icon-wrap">
                    <topic.icon size={19} aria-hidden="true" />
                  </div>
                  <span className="kyr-topic-card__tag">{topic.tag}</span>
                </div>

                <div className="kyr-topic-card__body">
                  <h3 className="kyr-topic-card__title">{topic.title}</h3>
                  <p className="kyr-topic-card__desc">{topic.description}</p>
                </div>

                <div className="kyr-topic-card__footer">
                  <span className="kyr-topic-card__action">Read legal guide</span>
                  <ArrowUpRight size={14} className="kyr-topic-card__arrow" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>

          <div className="kyr-bottom-banner">
            <div className="kyr-bottom-banner__content">
              <h3 className="kyr-bottom-banner__title">
                Looking for guidance on family law, bail rights, or pro bono casework?
              </h3>
              <p className="kyr-bottom-banner__desc">
                Our open legal knowledgebase includes 8 full plain-language statutory guides and direct clinic intake.
              </p>
            </div>
            <div className="kyr-bottom-banner__actions">
              <Link href="/know-your-rights" className="button button--secondary kyr-banner-btn">
                <span>Browse all 8 guides</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/legal-help" className="button button--primary kyr-banner-btn">
                <span>Get free legal help</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ADVOCACY & CAMPAIGNS */}
      <section className="section--campaigns relative overflow-hidden" id="advocacy">
        <div className="container relative z-10 w-full">
          <div className="campaigns-header">
            <div className="jbi-pill-badge">
              <span className="jbi-pill-badge__dot" aria-hidden="true" />
              <span>ADVOCACY & REFORM</span>
            </div>
            <h2 className="campaigns-title">
              Evidence-driven advocacy, policy oversight, and rights defense.
            </h2>
            <p className="campaigns-description">
              Verified public-interest campaigns and community legal literacy initiatives led by
              Equity Bridge Foundation across all 16 regions of Ghana.
            </p>
          </div>

          <div className="campaigns-grid">
            {campaigns.map((campaign) => {
              const Icon = campaign.icon;
              return (
                <article key={campaign.title} className="campaign-card">
                  <div className="campaign-card__header">
                    <div className="campaign-card__icon-wrap" aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    <span className="campaign-card__tag">{campaign.tag}</span>
                  </div>

                  <div className="campaign-card__body">
                    <h3 className="campaign-card__title">{campaign.title}</h3>
                    <p className="campaign-card__desc">{campaign.description}</p>
                    
                    <div className="campaign-card__metric-badge">
                      <span className="campaign-card__metric-dot" aria-hidden="true" />
                      <span>{campaign.metrics}</span>
                    </div>
                  </div>

                  <div className="campaign-card__footer">
                    <Link href={campaign.href} className="campaign-card__link">
                      <span>{campaign.cta}</span>
                      <ArrowUpRight size={14} className="campaign-card__arrow" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="campaigns-footer">
            <Link href="/advocacy" className="campaigns-footer__link">
              <span>View all active advocacy agendas & institutional monitoring reports</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: GET INVOLVED (CIVIC ACTION & PRO BONO) */}
      <section className="section--get-involved relative overflow-hidden" id="get-involved">
        <div className="container relative z-10 w-full">
          <div className="get-involved-header">
            <div className="pillar-header__badge">
              <span>CIVIC PARTICIPATION</span>
            </div>
            <h2 className="get-involved-title">
              Be part of the movement for <em>equitable justice</em> in Ghana.
            </h2>
            <p className="get-involved-description">
              Join legal practitioners, community volunteers, and institutional partners working
              together to defend constitutional protections and support indigent citizens.
            </p>
          </div>

          <div className="get-involved-grid">
            {involvementPathways.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <article key={pathway.title} className="pathway-card">
                  <div className="pathway-card__header">
                    <div className="pathway-card__icon-wrap" aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    <span className="pathway-card__tag">{pathway.tag}</span>
                  </div>

                  <div className="pathway-card__body">
                    <h3 className="pathway-card__title">{pathway.title}</h3>
                    <p className="pathway-card__desc">{pathway.description}</p>

                    <ul className="pathway-card__highlights" aria-label={`Highlights for ${pathway.title}`}>
                      {pathway.highlights.map((item) => (
                        <li key={item}>
                          <Check size={14} className="pathway-card__check" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pathway-card__footer">
                    <Link href={pathway.href} className="pathway-card__action">
                      <span>{pathway.cta}</span>
                      <ArrowUpRight size={14} className="pathway-card__arrow" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: LATEST INSIGHTS & EDITORIAL DISPATCHES */}
      <section className="section--insights relative overflow-hidden" id="insights">
        <div className="container relative z-10 w-full">
          <div className="insights-header">
            <div className="jbi-pill-badge">
              <span className="jbi-pill-badge__dot" aria-hidden="true" />
              <span>EDITORIAL & DISPATCHES</span>
            </div>
            <h2 className="insights-title">
              Latest insights, legal commentaries, and field updates.
            </h2>
            <p className="insights-description">
              Timely research publications, statutory analyses, and plain-language rights
              commentaries published by our legal research fellows.
            </p>
          </div>

          <div className="insights-grid">
            {insights.map((item) => (
              <article key={item.title} className="insight-card">
                <div className="insight-card__header">
                  <span className="insight-card__tag">{item.category}</span>
                  <span className="insight-card__date">{item.date}</span>
                </div>

                <div className="insight-card__body">
                  <h3 className="insight-card__title">{item.title}</h3>
                  <p className="insight-card__summary">{item.summary}</p>
                </div>

                <div className="insight-card__footer">
                  <Link href={item.href} className="insight-card__link">
                    <span>Read publication</span>
                    <ArrowUpRight size={14} className="insight-card__arrow" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="insights-closing-banner">
            <div className="insights-closing-banner__content">
              <div className="insights-closing-banner__badge">FREE PRO BONO INTAKE</div>
              <h3 className="insights-closing-banner__title">
                Need immediate legal counsel or casework guidance?
              </h3>
              <p className="insights-closing-banner__desc">
                Our foundation clinic provides confidential pro bono intake and triage for qualifying indigent citizens.
              </p>
            </div>
            <div className="insights-closing-banner__actions">
              <Link href="/legal-help" className="button button--primary kyr-banner-btn">
                <span>Submit legal inquiry</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="button button--secondary kyr-banner-btn">
                <span>Contact our office</span>
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
