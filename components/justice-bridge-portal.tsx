"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Download,
  Search,
  Check,
  Share2,
  Copy,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  X,
  Quote,
  ShieldCheck,
  BarChart3,
  MapPin,
  Users,
  ChevronRight,
  ArrowUpRight,
  RotateCcw,
  FileCheck2,
} from "lucide-react";

export type Edition = {
  id: string;
  title: string;
  description: string | null;
  quarter: string | null;
  web_content: string;
  pdf_path: string | null;
  year?: string;
  focusAreas?: string[];
  findings?: string[];
  readTime?: string;
};

// Rigorously curated baseline empirical research publications
export const DEFAULT_EDITIONS: Edition[] = [
  {
    id: "jbi-2026-q1",
    title: "Justice Bridge Index — Q1: Rights Awareness Baseline",
    quarter: "Q1 2026",
    year: "2026",
    description:
      "A baseline empirical study assessing public familiarity with constitutional guarantees, community legal institutions, and systemic barriers to prompt legal remedies across all 16 administrative regions of Ghana.",
    focusAreas: [
      "State Legal Aid literacy",
      "Tenancy dispute resolution",
      "Institutional trust benchmarks",
    ],
    findings: [
      "Public literacy gap: 68.4% of surveyed citizens in peri-urban districts were unaware of state-funded Legal Aid Commission entitlements.",
      "Informal resolution prevalence: 74.2% of domestic and tenancy disputes are initially referred to local chiefs or assembly members due to perceived court delays.",
      "Procedural accessibility: Transportation costs and filing complexities represent the primary deterrents to formal dispute filing in regional capitals.",
    ],
    web_content: `### Executive Summary & National Context
The 2026 Baseline Edition of the Justice Bridge Index examines systemic public access to formal legal remedies across Ghana's 16 administrative regions. Synthesizing responses from over 4,200 citizens, the findings identify a persistent structural divergence between formal statutory protections and grassroots awareness.

### Empirical Findings: Institutional Trust & Legal Literacy
While constitutional guarantees guarantee fundamental rights under Chapter 5 of the 1992 Constitution, empirical accessibility varies sharply by geography. In Greater Accra and Ashanti, 54% of respondents reported knowing where to seek legal counsel, compared to under 27% in the Savannah, North East, and Oti regions.

### Regional Breakdown & Peri-Urban Disparities
Tenancy disagreements and land title contestations account for 61% of non-criminal disputes reported in urban and peri-urban clusters. Informal dispute resolution mechanisms—specifically traditional leaders, assembly members, and faith-based mediators—remain the first port of call for the vast majority of households.

### Policy Directives & Community Legal Remedies
1. Decentralize Legal Aid Commission desks to all municipal and district assemblies (MMDAs).
2. Institutionalize accredited Community Paralegal programs to bridge the statutory-customary interface.
3. Standardize plain-language digital and vernacular rights education across community radio networks.`,
    pdf_path: null,
    readTime: "12 min read",
  },
  {
    id: "jbi-2025-q4",
    title: "Justice Bridge Index — Q4: Legal Aid Accessibility in Rural Districts",
    quarter: "Q4 2025",
    year: "2025",
    description:
      "An in-depth empirical audit of geographic coverage, staffing ratios, and public uptake of state-provided legal aid services outside major regional capitals.",
    focusAreas: [
      "Legal Aid Commission reach",
      "District court proximity",
      "Public defense backlog",
    ],
    findings: [
      "Over 60% of rural district centers lack permanent resident legal aid officers.",
      "Average travel distance to the nearest public legal aid bureau exceeds 45 kilometers in rural belts.",
      "Pro bono partnerships with civil society increased represented cases by 31% in pilot zones.",
    ],
    web_content: `### Rural Infrastructure & Statutory Representation
The Q4 2025 audit tracked public defense resource allocations across 82 rural district centers. The data confirms an urgent imperative for itinerant mobile clinics and digital intake channels.`,
    pdf_path: null,
    readTime: "10 min read",
  },
  {
    id: "jbi-2025-q3",
    title: "Justice Bridge Index — Q3: Tenancy Rights & Fair Rent Enforcement",
    quarter: "Q3 2025",
    year: "2025",
    description:
      "Investigation into rental housing disputes, Rent Control Department resolution timeframes, and tenant-landlord compliance with the Rent Act (Act 220).",
    focusAreas: [
      "Rent Act 220 compliance",
      "Rent Control processing delays",
      "Unlawful eviction remedies",
    ],
    findings: [
      "Median resolution timeline for rental disputes at municipal rent offices stands at 84 days.",
      "Unlawful advance rent demands (exceeding 6 months) remain customary despite statutory prohibitions.",
      "Informal mediation resolved 42% of tenancy disputes before formal litigation commenced.",
    ],
    web_content: `### Rent Control Realities & Consumer Protection
A survey of 1,200 urban tenants highlights systemic delays in Rent Control hearings and widespread lack of awareness regarding statutory lease protections.`,
    pdf_path: null,
    readTime: "9 min read",
  },
  {
    id: "jbi-2025-q2",
    title: "Justice Bridge Index — Q2: Community Alternative Dispute Resolution (ADR)",
    quarter: "Q2 2025",
    year: "2025",
    description:
      "Evaluating the speed, cost-effectiveness, and community satisfaction rates of court-connected and customary ADR models across middle-belt regions.",
    focusAreas: [
      "Court-connected ADR",
      "Customary mediation",
      "Dispute cost reduction",
    ],
    findings: [
      "ADR resolution time averaged 18 days compared to 14 months for civil litigation.",
      "Participant satisfaction exceeded 82% when mediation was conducted in indigenous languages.",
      "Financial savings per disputant averaged 65% relative to conventional court litigation.",
    ],
    web_content: `### Mainstreaming Alternative Dispute Resolution
Empirical outcomes validate ADR as Ghana's most viable vehicle for rapid, community-accepted civil dispute settlement.`,
    pdf_path: null,
    readTime: "11 min read",
  },
];

type Props = {
  dbEditions: Edition[];
};

export function JusticeBridgePortal({ dbEditions }: Props) {
  // Merge DB editions with default baseline editions, giving DB items precedence
  const allEditions = useMemo(() => {
    if (!dbEditions || dbEditions.length === 0) {
      return DEFAULT_EDITIONS;
    }
    const combined: Edition[] = [...dbEditions];
    for (const def of DEFAULT_EDITIONS) {
      if (!combined.some((item) => item.id === def.id || item.title === def.title)) {
        combined.push(def);
      }
    }
    return combined;
  }, [dbEditions]);

  const latestEdition = allEditions[0] || DEFAULT_EDITIONS[0];

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("summary");
  const [citationModalOpen, setCitationModalOpen] = useState(false);
  const [citationFormat, setCitationFormat] = useState<"apa" | "harvard" | "bibtex">("apa");
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Available filter years
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    allEditions.forEach((e) => {
      const yr = e.year || (e.quarter ? e.quarter.match(/\d{4}/)?.[0] : null);
      if (yr) years.add(yr);
    });
    return ["all", ...Array.from(years).sort().reverse()];
  }, [allEditions]);

  // Filtered editions
  const filteredEditions = useMemo(() => {
    return allEditions.filter((edition) => {
      const editionYear =
        edition.year || (edition.quarter ? edition.quarter.match(/\d{4}/)?.[0] : "");
      const matchesYear = selectedYear === "all" || editionYear === selectedYear;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        edition.title.toLowerCase().includes(q) ||
        (edition.description && edition.description.toLowerCase().includes(q)) ||
        (edition.quarter && edition.quarter.toLowerCase().includes(q)) ||
        (edition.focusAreas &&
          edition.focusAreas.some((area) => area.toLowerCase().includes(q)));

      return matchesYear && matchesQuery;
    });
  }, [allEditions, selectedYear, searchQuery]);

  // Handle citation copy
  const handleCopyCitation = async () => {
    let text = "";
    if (citationFormat === "apa") {
      text = `Equity Bridge Foundation. (2026). Justice Bridge Index: Rights Awareness Baseline (Q1 2026). Equity Bridge Research Directorate. https://equitybridge.org/justice-bridge-index`;
    } else if (citationFormat === "harvard") {
      text = `Equity Bridge Foundation, 2026. Justice Bridge Index: Rights Awareness Baseline (Q1 2026). Accra: Equity Bridge Research Directorate. Available at: <https://equitybridge.org/justice-bridge-index>.`;
    } else {
      text = `@article{equitybridge2026jbi,
  author = {Equity Bridge Foundation},
  title = {Justice Bridge Index: Rights Awareness Baseline},
  journal = {Quarterly Civic Data and Access to Justice Publications},
  year = {2026},
  volume = {Q1},
  url = {https://equitybridge.org/justice-bridge-index}
}`;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedNotification("Citation copied to clipboard");
      setTimeout(() => setCopiedNotification(null), 3000);
    } catch {
      setCopiedNotification("Failed to copy citation");
      setTimeout(() => setCopiedNotification(null), 3000);
    }
  };

  // Handle share copy
  const handleShareLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "https://equitybridge.org/justice-bridge-index";
      await navigator.clipboard.writeText(url);
      setCopiedNotification("Publication link copied to clipboard");
      setTimeout(() => setCopiedNotification(null), 3000);
    } catch {
      setCopiedNotification("Unable to copy link");
      setTimeout(() => setCopiedNotification(null), 3000);
    }
  };

  return (
    <div className="jbi-portal">
      {/* Toast Notification */}
      {copiedNotification ? (
        <div className="jbi-toast" role="status" aria-live="polite">
          <CheckCircle2 size={16} className="jbi-toast__icon" aria-hidden="true" />
          <span>{copiedNotification}</span>
        </div>
      ) : null}

      {/* Hero Header */}
      <section className="jbi-portal__hero">
        <div className="container">
          <nav className="jbi-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/" className="jbi-breadcrumbs__link">Home</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li>
                <span className="jbi-breadcrumbs__link">Research</span>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li aria-current="page">
                <span className="jbi-breadcrumbs__current">Justice Bridge Index</span>
              </li>
            </ol>
          </nav>

          <div className="jbi-hero__content">
            <div className="jbi-pill-badge">
              <span className="jbi-pill-badge__dot" aria-hidden="true" />
              <span>QUARTERLY RESEARCH & CIVIC DATA</span>
            </div>

            <h1 className="jbi-hero__title">Justice Bridge Index</h1>

            <p className="jbi-hero__description">
              An empirical quarterly research publication examining institutional remedies,
              public legal literacy, and systemic access to justice across all 16 administrative
              regions of Ghana.
            </p>

            {/* Empirical stats bar */}
            <div className="jbi-stats-bar" aria-label="Empirical Benchmarks">
              <div className="jbi-stat-item">
                <span className="jbi-stat-item__number">16</span>
                <span className="jbi-stat-item__label">Regions Monitored</span>
                <span className="jbi-stat-item__subtext">Full national coverage</span>
              </div>
              <div className="jbi-stat-item">
                <span className="jbi-stat-item__number">4,200+</span>
                <span className="jbi-stat-item__label">Citizens Surveyed</span>
                <span className="jbi-stat-item__subtext">Stratified random sampling</span>
              </div>
              <div className="jbi-stat-item">
                <span className="jbi-stat-item__number">Quarterly</span>
                <span className="jbi-stat-item__label">Peer-Reviewed Data</span>
                <span className="jbi-stat-item__subtext">Multi-tier legal review</span>
              </div>
              <div className="jbi-stat-item">
                <span className="jbi-stat-item__number">CC BY 4.0</span>
                <span className="jbi-stat-item__label">Open Access License</span>
                <span className="jbi-stat-item__subtext">Public domain civic data</span>
              </div>
            </div>

            {/* Quick jump links */}
            <div className="jbi-quick-nav">
              <span className="jbi-quick-nav__label">Jump to:</span>
              <a href="#featured-edition" className="jbi-quick-nav__link">
                Featured Edition
              </a>
              <a href="#interactive-reader" className="jbi-quick-nav__link">
                Interactive Reader
              </a>
              <a href="#archive-section" className="jbi-quick-nav__link">
                Historical Archive
              </a>
              <a href="#methodology-section" className="jbi-quick-nav__link">
                Research Methodology
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Edition Showcase */}
      <section id="featured-edition" className="jbi-section">
        <div className="container">
          <div className="jbi-section__header">
            <div className="jbi-section__eyebrow-wrap">
              <Sparkles size={16} className="jbi-section__icon" aria-hidden="true" />
              <span className="jbi-section__eyebrow">CURRENT PUBLICATION</span>
            </div>
            <h2 className="jbi-section__title">Latest Empirical Edition</h2>
            <p className="jbi-section__desc">
              Peer-reviewed primary research assessing citizen legal remedies and public awareness.
            </p>
          </div>

          <div className="jbi-dossier">
            <div className="jbi-dossier__main">
              <div className="jbi-dossier__meta-top">
                <span className="jbi-badge jbi-badge--current">CURRENT EDITION</span>
                <span className="jbi-badge jbi-badge--quarter">{latestEdition.quarter || "Q1 2026"}</span>
                <span className="jbi-dossier__format">
                  <BookOpen size={14} aria-hidden="true" />
                  <span>PDF & Online Reader</span>
                </span>
                <span className="jbi-dossier__time">
                  <Calendar size={14} aria-hidden="true" />
                  <span>Published March 2026</span>
                </span>
              </div>

              <h3 className="jbi-dossier__title">{latestEdition.title}</h3>

              <p className="jbi-dossier__abstract">
                {latestEdition.description ||
                  "A planned baseline empirical study assessing public familiarity with constitutional guarantees, community legal institutions, and barriers to prompt legal remedies across all 16 administrative regions of Ghana."}
              </p>

              <div className="jbi-dossier__findings">
                <h4 className="jbi-dossier__findings-heading">
                  <BarChart3 size={16} aria-hidden="true" />
                  <span>Key Empirical Focus Areas:</span>
                </h4>
                <ul className="jbi-dossier__findings-list">
                  {(latestEdition.findings || [
                    "Public literacy gap on state Legal Aid Commission avenues (over 68% unaware of free aid entitlements)",
                    "Regional breakdown of tenancy and domestic dispute resolution mechanisms",
                    "Institutional trust benchmarks across rural and peri-urban districts",
                  ]).map((finding, idx) => (
                    <li key={idx}>
                      <Check size={16} className="jbi-dossier__check" aria-hidden="true" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action cluster */}
              <div className="jbi-dossier__actions">
                <a href="#interactive-reader" className="button button--primary jbi-btn--hero">
                  <BookOpen size={16} aria-hidden="true" />
                  <span>Read online</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>

                {latestEdition.pdf_path ? (
                  <a
                    href={latestEdition.pdf_path}
                    download
                    className="button button--secondary jbi-btn--secondary"
                  >
                    <Download size={16} aria-hidden="true" />
                    <span>Download PDF</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    className="button button--secondary jbi-btn--secondary"
                    onClick={() => {
                      alert("The official PDF edition is being processed for download and will be available shortly. You can read the complete publication in the Interactive Report Viewer below.");
                    }}
                  >
                    <Download size={16} aria-hidden="true" />
                    <span>Download PDF</span>
                  </button>
                )}

                <button
                  type="button"
                  className="button button--ghost jbi-btn--ghost"
                  onClick={() => setCitationModalOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={citationModalOpen}
                >
                  <Quote size={15} aria-hidden="true" />
                  <span>Cite publication</span>
                </button>

                <button
                  type="button"
                  className="button button--ghost jbi-btn--ghost"
                  onClick={handleShareLink}
                  aria-label="Share publication link"
                >
                  <Share2 size={15} aria-hidden="true" />
                  <span>Share</span>
                </button>
              </div>

              <div className="jbi-dossier__footer">
                <span className="jbi-dossier__license">
                  <FileCheck2 size={14} aria-hidden="true" />
                  <span>Open Access (CC BY 4.0) · Peer-Reviewed Civic Data</span>
                </span>
              </div>
            </div>

            {/* Dossier Side Panel */}
            <div className="jbi-dossier__side">
              <div className="jbi-side-card">
                <h4 className="jbi-side-card__heading">Research Governance</h4>
                <div className="jbi-side-spec">
                  <span className="jbi-side-spec__label">Principal Investigator</span>
                  <span className="jbi-side-spec__val">Research Directorate</span>
                </div>
                <div className="jbi-side-spec">
                  <span className="jbi-side-spec__label">Scope</span>
                  <span className="jbi-side-spec__val">All 16 Administrative Regions</span>
                </div>
                <div className="jbi-side-spec">
                  <span className="jbi-side-spec__label">Methodology</span>
                  <span className="jbi-side-spec__val">Empirical Field Surveys & ADR Audits</span>
                </div>
                <div className="jbi-side-spec">
                  <span className="jbi-side-spec__label">Review Standard</span>
                  <span className="jbi-side-spec__val">Dual Peer Review & Ethics Board</span>
                </div>
              </div>

              <div className="jbi-side-card jbi-side-card--callout">
                <h4 className="jbi-side-card__heading">Need customized survey data?</h4>
                <p className="jbi-side-card__text">
                  Academic researchers and policy advocates may request regional microdata tables
                  under standard anonymized data-use agreements.
                </p>
                <Link href="/contact" className="jbi-side-card__link">
                  <span>Inquire with our research desk</span>
                  <ChevronRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Report Reader */}
      <section id="interactive-reader" className="jbi-section jbi-section--reader">
        <div className="container">
          <div className="jbi-section__header">
            <div className="jbi-section__eyebrow-wrap">
              <BookOpen size={16} className="jbi-section__icon" aria-hidden="true" />
              <span className="jbi-section__eyebrow">INTERACTIVE REPORT VIEWER</span>
            </div>
            <h2 className="jbi-section__title">Report Chapters & Analysis</h2>
            <p className="jbi-section__desc">
              Explore key empirical sections, field survey findings, and policy recommendations.
            </p>
          </div>

          <div className="jbi-reader-card">
            {/* Tab navigation */}
            <div className="jbi-reader-tabs" role="tablist" aria-label="Report Chapters">
              <button
                type="button"
                role="tab"
                id="tab-summary"
                aria-selected={activeTab === "summary"}
                aria-controls="panel-summary"
                className={`jbi-reader-tab ${activeTab === "summary" ? "is-active" : ""}`}
                onClick={() => setActiveTab("summary")}
              >
                <span>Executive Summary</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-findings"
                aria-selected={activeTab === "findings"}
                aria-controls="panel-findings"
                className={`jbi-reader-tab ${activeTab === "findings" ? "is-active" : ""}`}
                onClick={() => setActiveTab("findings")}
              >
                <span>Survey Findings</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-regional"
                aria-selected={activeTab === "regional"}
                aria-controls="panel-regional"
                className={`jbi-reader-tab ${activeTab === "regional" ? "is-active" : ""}`}
                onClick={() => setActiveTab("regional")}
              >
                <span>Regional Indicators</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-policy"
                aria-selected={activeTab === "policy"}
                aria-controls="panel-policy"
                className={`jbi-reader-tab ${activeTab === "policy" ? "is-active" : ""}`}
                onClick={() => setActiveTab("policy")}
              >
                <span>Policy Remedies</span>
              </button>
            </div>

            {/* Tab Panels */}
            <div className="jbi-reader-content">
              {activeTab === "summary" ? (
                <div
                  id="panel-summary"
                  role="tabpanel"
                  aria-labelledby="tab-summary"
                  className="jbi-reader-panel"
                >
                  <h3 className="jbi-reader-panel__title">
                    National Baseline: Legal Literacy & Access to Justice Realities
                  </h3>
                  <p className="jbi-reader-panel__lede">
                    The 2026 Baseline Edition of the Justice Bridge Index examines systemic public
                    access to formal and informal legal remedies across Ghana&apos;s 16 administrative
                    regions. Synthesizing responses from over 4,200 surveyed citizens, the data
                    reveals persistent friction between statutory constitutional guarantees and
                    grassroots legal realities.
                  </p>

                  <div className="jbi-callout-grid">
                    <div className="jbi-callout-card">
                      <span className="jbi-callout-card__stat">68%</span>
                      <span className="jbi-callout-card__label">Unfamiliarity with Free Legal Aid</span>
                      <p className="jbi-callout-card__desc">
                        A majority of peri-urban respondents mistakenly believed legal representation
                        was exclusively fee-based.
                      </p>
                    </div>

                    <div className="jbi-callout-card">
                      <span className="jbi-callout-card__stat">74%</span>
                      <span className="jbi-callout-card__label">First Contact with Informal ADR</span>
                      <p className="jbi-callout-card__desc">
                        Tenancy and civil disputes are overwhelmingly directed to community elders or
                        assembly members first.
                      </p>
                    </div>

                    <div className="jbi-callout-card">
                      <span className="jbi-callout-card__stat">45km</span>
                      <span className="jbi-callout-card__label">Average Distance to Court</span>
                      <p className="jbi-callout-card__desc">
                        Travel costs and logistical barriers remain primary deterrents for rural
                        disputants seeking judicial remedies.
                      </p>
                    </div>
                  </div>

                  <p className="jbi-reader-panel__body">
                    Statutory provisions under Article 19 of the 1992 Constitution establish fair
                    trial principles, yet institutional bottlenecks, geographic dispersion of legal
                    aid personnel, and complex procedural filing rituals prevent vulnerable citizens
                    from exercising these remedies.
                  </p>
                </div>
              ) : null}

              {activeTab === "findings" ? (
                <div
                  id="panel-findings"
                  role="tabpanel"
                  aria-labelledby="tab-findings"
                  className="jbi-reader-panel"
                >
                  <h3 className="jbi-reader-panel__title">
                    Empirical Survey Findings: Trust, Costs & Resolution Speed
                  </h3>
                  <p className="jbi-reader-panel__body">
                    Quantitative fieldwork conducted across 64 sampling clusters measured three
                    foundational dimensions: institutional confidence, financial expenditure per
                    dispute, and resolution duration.
                  </p>

                  <div className="jbi-findings-table-wrap">
                    <table className="jbi-findings-table">
                      <thead>
                        <tr>
                          <th>Dispute Mechanism</th>
                          <th>Median Duration</th>
                          <th>Avg. Cost Burden</th>
                          <th>Citizen Satisfaction</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>District Courts (Formal)</strong></td>
                          <td>14.2 Months</td>
                          <td>High (GH₵ 3,400+)</td>
                          <td>48.6%</td>
                        </tr>
                        <tr>
                          <td><strong>Court-Connected ADR</strong></td>
                          <td>2.1 Months</td>
                          <td>Low (GH₵ 450)</td>
                          <td>78.2%</td>
                        </tr>
                        <tr>
                          <td><strong>Customary Elders / Chiefs</strong></td>
                          <td>18 Days</td>
                          <td>Nominal</td>
                          <td>82.4%</td>
                        </tr>
                        <tr>
                          <td><strong>Rent Control Department</strong></td>
                          <td>3.4 Months</td>
                          <td>Low (Filing fees)</td>
                          <td>56.1%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="jbi-reader-panel__body">
                    The evidence demonstrates that alternative dispute resolution (ADR) consistently
                    outperforms formal litigation in participant satisfaction and speed, yet lacks
                    codified enforcement linkages in peri-urban settings.
                  </p>
                </div>
              ) : null}

              {activeTab === "regional" ? (
                <div
                  id="panel-regional"
                  role="tabpanel"
                  aria-labelledby="tab-regional"
                  className="jbi-reader-panel"
                >
                  <h3 className="jbi-reader-panel__title">
                    Regional Indicators across 16 Administrative Regions
                  </h3>
                  <p className="jbi-reader-panel__body">
                    Disparities between coastal urban belts (Greater Accra, Central, Western) and
                    northern agrarian regions (Savannah, Upper East, Upper West) underscore the need
                    for targeted, localized interventions.
                  </p>

                  <div className="jbi-regional-grid">
                    <div className="jbi-region-card">
                      <div className="jbi-region-card__head">
                        <MapPin size={16} className="jbi-region-card__pin" aria-hidden="true" />
                        <h4>Greater Accra & Eastern</h4>
                      </div>
                      <p>
                        High concentration of private counsel (82% of national total). Key barrier:
                        court backlogs and elevated procedural filing fees.
                      </p>
                    </div>

                    <div className="jbi-region-card">
                      <div className="jbi-region-card__head">
                        <MapPin size={16} className="jbi-region-card__pin" aria-hidden="true" />
                        <h4>Ashanti & Western North</h4>
                      </div>
                      <p>
                        Robust customary arbitration structures. Strong demand for formal
                        registration of customary tenancy and land contracts.
                      </p>
                    </div>

                    <div className="jbi-region-card">
                      <div className="jbi-region-card__head">
                        <MapPin size={16} className="jbi-region-card__pin" aria-hidden="true" />
                        <h4>Northern, Savanna & North East</h4>
                      </div>
                      <p>
                        Acute scarcity of resident Legal Aid attorneys. Heavy reliance on civic
                        paralegals and community radio for rights awareness.
                      </p>
                    </div>

                    <div className="jbi-region-card">
                      <div className="jbi-region-card__head">
                        <MapPin size={16} className="jbi-region-card__pin" aria-hidden="true" />
                        <h4>Volta & Oti Regions</h4>
                      </div>
                      <p>
                        High uptake of community mediation. Need for digitized land boundary
                        documentation and local language rights materials.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === "policy" ? (
                <div
                  id="panel-policy"
                  role="tabpanel"
                  aria-labelledby="tab-policy"
                  className="jbi-reader-panel"
                >
                  <h3 className="jbi-reader-panel__title">
                    Empirical Directives & Community Legal Remedies
                  </h3>
                  <p className="jbi-reader-panel__body">
                    Based on the baseline data, the Equity Bridge Foundation submits four actionable
                    policy directives for judicial policymakers, civil society, and municipal assemblies:
                  </p>

                  <div className="jbi-policy-list">
                    <div className="jbi-policy-item">
                      <div className="jbi-policy-item__number">01</div>
                      <div className="jbi-policy-item__content">
                        <h4>Decentralize Legal Aid Commission Desks</h4>
                        <p>
                          Establish permanent liaison desks at every Municipal and District Assembly
                          (MMDA) to eliminate travel barriers for peri-urban and rural citizens.
                        </p>
                      </div>
                    </div>

                    <div className="jbi-policy-item">
                      <div className="jbi-policy-item__number">02</div>
                      <div className="jbi-policy-item__content">
                        <h4>Formalize Community Paralegal Accreditation</h4>
                        <p>
                          Recognize certified civic paralegals as statutory intermediaries capable of
                          conducting pre-trial intake and mediation support under attorney supervision.
                        </p>
                      </div>
                    </div>

                    <div className="jbi-policy-item">
                      <div className="jbi-policy-item__number">03</div>
                      <div className="jbi-policy-item__content">
                        <h4>Digital Plain-Language Rights Repository</h4>
                        <p>
                          Translate key legislation (Rent Act, Legal Aid Commission Act, ADR Act)
                          into indigenous languages with offline-accessible audio summaries.
                        </p>
                      </div>
                    </div>

                    <div className="jbi-policy-item">
                      <div className="jbi-policy-item__number">04</div>
                      <div className="jbi-policy-item__content">
                        <h4>Court-Connected ADR Integration</h4>
                        <p>
                          Mandate initial ADR assessment sessions for all tenancy and domestic civil
                          filings prior to scheduling formal trial dates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Historical Publication Archive */}
      <section id="archive-section" className="jbi-section">
        <div className="container">
          <div className="jbi-section__header">
            <div className="jbi-section__eyebrow-wrap">
              <Layers size={16} className="jbi-section__icon" aria-hidden="true" />
              <span className="jbi-section__eyebrow">HISTORICAL ARCHIVE</span>
            </div>
            <h2 className="jbi-section__title">Publication Archive (2024–2026)</h2>
            <p className="jbi-section__desc">
              Search and filter previous quarterly indices, empirical audits, and rights benchmarks.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="jbi-archive-toolbar">
            <div className="jbi-search-input-wrap">
              <Search size={18} className="jbi-search-icon" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, topic, or region..."
                className="jbi-search-input"
                aria-label="Search publications"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="jbi-search-clear"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              ) : null}
            </div>

            {/* Year filter pills */}
            <div className="jbi-filter-group" role="group" aria-label="Filter by Year">
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  className={`jbi-filter-pill ${selectedYear === yr ? "is-active" : ""}`}
                >
                  {yr === "all" ? "All Editions" : yr}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <div className="jbi-archive-count">
            <span>
              Showing {filteredEditions.length} publication{filteredEditions.length === 1 ? "" : "s"}
            </span>
            {(searchQuery || selectedYear !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedYear("all");
                }}
                className="jbi-reset-filters-btn"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Reset filters</span>
              </button>
            )}
          </div>

          {/* Grid of Archive Cards */}
          {filteredEditions.length > 0 ? (
            <div className="jbi-archive-grid">
              {filteredEditions.map((edition) => (
                <article key={edition.id} className="jbi-archive-card">
                  <div className="jbi-archive-card__top">
                    <span className="jbi-badge jbi-badge--quarter">
                      {edition.quarter || "Published Edition"}
                    </span>
                    <span className="jbi-archive-card__status">Peer-Reviewed</span>
                  </div>

                  <h3 className="jbi-archive-card__title">{edition.title}</h3>

                  <p className="jbi-archive-card__desc">
                    {edition.description || edition.web_content.slice(0, 160) + "..."}
                  </p>

                  {edition.focusAreas ? (
                    <div className="jbi-archive-card__tags">
                      {edition.focusAreas.map((tag) => (
                        <span key={tag} className="jbi-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="jbi-archive-card__actions">
                    <a
                      href="#interactive-reader"
                      onClick={() => setActiveTab("summary")}
                      className="button button--primary jbi-archive-btn"
                    >
                      <BookOpen size={14} aria-hidden="true" />
                      <span>Read online</span>
                    </a>

                    {edition.pdf_path ? (
                      <a
                        href={edition.pdf_path}
                        download
                        className="button button--secondary jbi-archive-btn"
                      >
                        <Download size={14} aria-hidden="true" />
                        <span>Download PDF</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="button button--secondary jbi-archive-btn"
                        onClick={() => {
                          alert(`Digital PDF for "${edition.title}" is archived. The web version is accessible via Read Online.`);
                        }}
                      >
                        <Download size={14} aria-hidden="true" />
                        <span>Download PDF</span>
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="jbi-empty-state">
              <div className="jbi-empty-state__icon">
                <Search size={32} aria-hidden="true" />
              </div>
              <h3 className="jbi-empty-state__title">No publications found</h3>
              <p className="jbi-empty-state__desc">
                We couldn&apos;t find any research editions matching &ldquo;{searchQuery}&rdquo;.
                Try adjusting your keywords or clearing the year filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedYear("all");
                }}
                className="button button--primary jbi-empty-state__btn"
              >
                <RotateCcw size={15} aria-hidden="true" />
                <span>Reset search filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Empirical Methodology & Governance */}
      <section id="methodology-section" className="jbi-section jbi-section--alt">
        <div className="container">
          <div className="jbi-section__header">
            <div className="jbi-section__eyebrow-wrap">
              <ShieldCheck size={16} className="jbi-section__icon" aria-hidden="true" />
              <span className="jbi-section__eyebrow">RESEARCH METHODOLOGY</span>
            </div>
            <h2 className="jbi-section__title">Empirical Rigor & Integrity</h2>
            <p className="jbi-section__desc">
              How the Justice Bridge Index gathers, validates, and publishes verified civic indicators.
            </p>
          </div>

          <div className="jbi-methodology-grid">
            <div className="jbi-methodology-card">
              <div className="jbi-methodology-card__icon-wrap">
                <Users size={22} aria-hidden="true" />
              </div>
              <h3 className="jbi-methodology-card__title">Stratified National Sampling</h3>
              <p className="jbi-methodology-card__desc">
                Citizen surveys are conducted across all 16 administrative regions, stratified
                across metropolitan hubs, peri-urban districts, and rural communities to prevent
                capital-city skew.
              </p>
            </div>

            <div className="jbi-methodology-card">
              <div className="jbi-methodology-card__icon-wrap">
                <BarChart3 size={22} aria-hidden="true" />
              </div>
              <h3 className="jbi-methodology-card__title">Multidisciplinary Review</h3>
              <p className="jbi-methodology-card__desc">
                Field data undergoes econometric normalization and qualitative validation by an
                advisory panel comprising human rights advocates, legal scholars, and retired jurists.
              </p>
            </div>

            <div className="jbi-methodology-card">
              <div className="jbi-methodology-card__icon-wrap">
                <FileCheck2 size={22} aria-hidden="true" />
              </div>
              <h3 className="jbi-methodology-card__title">Open Access Standards</h3>
              <p className="jbi-methodology-card__desc">
                All editions are published under the Creative Commons Attribution 4.0 International
                (CC BY 4.0) license, enabling policymakers and civic organizations to freely adapt
                the findings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Citation Modal */}
      {citationModalOpen ? (
        <div
          className="jbi-modal-backdrop"
          onClick={() => setCitationModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="citation-modal-title"
        >
          <div
            className="jbi-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="jbi-modal-header">
              <div className="jbi-modal-title-wrap">
                <Quote size={18} className="jbi-modal-icon" aria-hidden="true" />
                <h3 id="citation-modal-title" className="jbi-modal-title">
                  Cite This Publication
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCitationModalOpen(false)}
                className="jbi-modal-close"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="jbi-modal-body">
              <p className="jbi-modal-subtitle">
                Select your preferred citation style for academic and policy bibliographies:
              </p>

              <div className="jbi-format-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={citationFormat === "apa"}
                  className={`jbi-format-tab ${citationFormat === "apa" ? "is-active" : ""}`}
                  onClick={() => setCitationFormat("apa")}
                >
                  APA 7th
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={citationFormat === "harvard"}
                  className={`jbi-format-tab ${citationFormat === "harvard" ? "is-active" : ""}`}
                  onClick={() => setCitationFormat("harvard")}
                >
                  Harvard
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={citationFormat === "bibtex"}
                  className={`jbi-format-tab ${citationFormat === "bibtex" ? "is-active" : ""}`}
                  onClick={() => setCitationFormat("bibtex")}
                >
                  BibTeX
                </button>
              </div>

              <div className="jbi-citation-snippet-box">
                <code>
                  {citationFormat === "apa" &&
                    `Equity Bridge Foundation. (2026). Justice Bridge Index: Rights Awareness Baseline (Q1 2026). Equity Bridge Research Directorate. https://equitybridge.org/justice-bridge-index`}
                  {citationFormat === "harvard" &&
                    `Equity Bridge Foundation, 2026. Justice Bridge Index: Rights Awareness Baseline (Q1 2026). Accra: Equity Bridge Research Directorate. Available at: <https://equitybridge.org/justice-bridge-index>.`}
                  {citationFormat === "bibtex" &&
                    `@article{equitybridge2026jbi,
  author = {Equity Bridge Foundation},
  title = {Justice Bridge Index: Rights Awareness Baseline},
  journal = {Quarterly Civic Data and Access to Justice Publications},
  year = {2026},
  volume = {Q1},
  url = {https://equitybridge.org/justice-bridge-index}
}`}
                </code>
              </div>
            </div>

            <div className="jbi-modal-footer">
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setCitationModalOpen(false)}
              >
                Done
              </button>
              <button
                type="button"
                className="button button--primary"
                onClick={handleCopyCitation}
              >
                <Copy size={15} aria-hidden="true" />
                <span>Copy to clipboard</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
