"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import DottedSurface from "@/components/ui/dotted-surface";
import {
  ShieldAlert,
  HeartHandshake,
  Briefcase,
  Home as HomeIcon,
  Users,
  Scale,
  HelpCircle,
  Landmark,
  Search,
  X,
  ArrowUpRight,
  Check,
  FileText,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Download,
  AlertCircle,
  Clock,
  BookOpen,
} from "lucide-react";

export interface LegalTopic {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  statute: string;
  iconName: string;
  summary: string;
  keyPoints: string[];
  actionSteps: string[];
  commonMyth: { myth: string; reality: string };
  officialContacts: Array<{ name: string; contact: string; note: string }>;
  citation: string;
}

const TOPICS_DATA: LegalTopic[] = [
  {
    id: "arrest-police-rights",
    slug: "arrest-police-rights",
    title: "Arrest & Police Rights",
    category: "criminal-procedure",
    categoryLabel: "Criminal Procedure",
    statute: "1992 Constitution (Art. 14) & Criminal Procedure Act (Act 30)",
    iconName: "ShieldAlert",
    summary:
      "Statutory protections regarding constitutional detention limits, mandatory legal representation, and lawful bail procedures across Ghana.",
    keyPoints: [
      "Mandatory right to be informed immediately, in a language you understand, of the exact reason for your arrest.",
      "The constitutional 48-hour limit: you must be brought before a court of competent jurisdiction within 48 hours of detention.",
      "Right to remain silent: you cannot be coerced into making any confessional statement without your chosen legal counsel present.",
      "Police bail is free by law: no fee or monetary payment should be made to police officers for granting police enquiry bail.",
    ],
    actionSteps: [
      "Remain calm, identify yourself truthfully, but refrain from answering substantive questions without legal representation.",
      "Politely request to contact a family member, trusted friend, or counsel immediately (guaranteed under Act 30, Section 9).",
      "Do not endorse, sign, or thumbprint any cautioned statement until you have consulted an advocate or paralegal.",
      "If detained beyond 48 hours without court arraignment, your counsel can file an immediate Habeas Corpus application.",
    ],
    commonMyth: {
      myth: "Police officers can detain a suspect over the weekend without accounting for the 48-hour constitutional clock.",
      reality:
        "The Supreme Court of Ghana ruled in Martin Kpebu v. Attorney-General that the 48-hour rule applies on weekends and public holidays; courts must sit to address bail.",
    },
    officialContacts: [
      {
        name: "Police Emergency Desk",
        contact: "191 / 112",
        note: "Toll-free national emergency line",
      },
      {
        name: "Legal Aid Commission Counsel",
        contact: "+233 302 669 220",
        note: "Court-appointed defense for indigent suspects",
      },
      {
        name: "CHRAJ Human Rights Desk",
        contact: "+233 302 662 150",
        note: "Unlawful detention and police abuse complaints",
      },
    ],
    citation: "Constitution of Ghana (1992), Art. 14(2)–(3); Criminal Procedure Code, 1960 (Act 30).",
  },
  {
    id: "gender-based-violence",
    slug: "gender-based-violence",
    title: "Gender-Based Violence",
    category: "protection-safety",
    categoryLabel: "Protection & Safety",
    statute: "Domestic Violence Act, 2007 (Act 732)",
    iconName: "HeartHandshake",
    summary:
      "Statutory protections under Act 732, emergency court protection orders, DOVVSU reporting mechanisms, and free medical care provisions.",
    keyPoints: [
      "Domestic violence encompasses physical, sexual, emotional, verbal, psychological, and economic abuse within family or domestic relationships.",
      "Free medical care: Police Medical Examination Forms for domestic violence survivors must be filled by public healthcare officers without charging fees.",
      "Court Protection Orders: Judges can issue restraining orders barring an abuser from entering the residence or approaching the survivor.",
      "Mandatory police duty: Police officers are legally mandated under Act 732 to assist the victim with medical attention and safe shelter arrangements.",
    ],
    actionSteps: [
      "Prioritize physical safety: move to a secure location with dependants if in immediate danger.",
      "Report without delay to the nearest DOVVSU (Domestic Violence & Victim Support Unit) station or police desk.",
      "Request a Police Medical Form before medical treatment to preserve forensic and medical evidence.",
      "Apply through DOVVSU or the District Court registrar for an expedited Interim Protection Order.",
    ],
    commonMyth: {
      myth: "Domestic violence is a private matrimonial matter that traditional family elders must resolve internally.",
      reality:
        "Act 732 classifies domestic violence as a public crime against the state; family settlement cannot extinguish criminal liability.",
    },
    officialContacts: [
      {
        name: "DOVVSU Toll-Free Helpline",
        contact: "0800 111 222",
        note: "24/7 dedicated domestic violence unit",
      },
      {
        name: "Social Welfare Dept Emergency",
        contact: "+233 302 684 498",
        note: "Shelter referrals and child protection",
      },
      {
        name: "Equity Foundation Crisis Intake",
        contact: "+233 302 900 120",
        note: "Pro bono litigation and legal support",
      },
    ],
    citation: "Domestic Violence Act, 2007 (Act 732), Sections 1–25; Criminal Offences Act, 1960 (Act 29).",
  },
  {
    id: "employment-rights",
    slug: "employment-rights",
    title: "Employment Rights",
    category: "labour-law",
    categoryLabel: "Labour Act 651",
    statute: "Labour Act, 2003 (Act 651)",
    iconName: "Briefcase",
    summary:
      "Protections concerning lawful termination, redundancy entitlements, written employment contracts, and National Labour Commission filings.",
    keyPoints: [
      "Right to written employment particulars within two months of commencing work for any engagement exceeding six months.",
      "Protection from unfair termination: an employer must demonstrate valid, lawful grounds related to capacity, conduct, or operational requirements.",
      "Statutory notice: minimum of one month notice (or pay in lieu) for contracts exceeding three years; two weeks for contracts between six months and three years.",
      "Maternity protections: 12 weeks paid maternity leave, with guaranteed right to return to the same position without loss of benefits.",
    ],
    actionSteps: [
      "Collect and securely store all employment letters, payslips, email directives, and appraisal records.",
      "If facing disciplinary action, submit written responses and request representation by a union official or colleague.",
      "In cases of unlawful salary deduction or termination, lodge an internal grievance through designated workplace channels.",
      "If unresolved, file a formal complaint with the National Labour Commission (NLC) within six months of the dispute.",
    ],
    commonMyth: {
      myth: "Employers in Ghana can dismiss staff at will without stating any reasons as long as they pay one month salary.",
      reality:
        "The Supreme Court affirmed in standard labour jurisprudence that termination must be substantiated by fair grounds under Act 651 Section 62.",
    },
    officialContacts: [
      {
        name: "National Labour Commission (NLC)",
        contact: "+233 302 777 024",
        note: "Statutory mediation & arbitration body",
      },
      {
        name: "Labour Department Head Office",
        contact: "+233 302 664 926",
        note: "Inspection and workplace standards",
      },
    ],
    citation: "Labour Act, 2003 (Act 651), Sections 10–78.",
  },
  {
    id: "housing-tenancy",
    slug: "housing-tenancy",
    title: "Housing & Tenancy",
    category: "property-tenancy",
    categoryLabel: "Rent Act 220",
    statute: "Rent Act, 1963 (Act 220) & Rent Regulations (L.I. 369)",
    iconName: "HomeIcon",
    summary:
      "Lawful advance rent caps, protection against self-help evictions, notice-to-quit regulations, and Rent Control dispute resolution.",
    keyPoints: [
      "Statutory advance rent limit: it is an offense under Act 220 Section 25 for a landlord to demand or receive rent advance exceeding six months.",
      "Illegal ejections: landlords cannot disconnect electricity, remove roofing, change door locks, or seize tenant property without court order.",
      "Mandatory notice to quit: a tenant is entitled to statutory written notice (between one to six months depending on tenancy periodicity).",
      "Rent Control jurisdiction: all tenancy disputes regarding ejection, arrears, or rent hikes must first be mediated at Rent Control.",
    ],
    actionSteps: [
      "Always insist on written rent tenancy agreements and official signed rent payment receipts for every installment.",
      "If a landlord demands excessive multi-year rent advance, politely reference Section 25 of Rent Act 220.",
      "If facing threats of forceful eviction, file an urgent petition with the nearest municipal Rent Control Department.",
      "Never vacate premises under duress; only a valid Court Order executed by judicial bailiffs can legally effect an eviction.",
    ],
    commonMyth: {
      myth: "A landlord who owns the house can eject any tenant anytime by giving 24 hours notice or changing the padlock.",
      reality:
        "Self-help eviction is a criminal offense under Ghanaian law; only a competent court can order eviction after Rent Control certification.",
    },
    officialContacts: [
      {
        name: "Rent Control Dept (Kinbu, Accra)",
        contact: "+233 302 662 052",
        note: "Primary adjudication for tenancy disputes",
      },
      {
        name: "Kumasi Regional Rent Office",
        contact: "+233 322 023 118",
        note: "Ashanti Region rent mediation desk",
      },
    ],
    citation: "Rent Act, 1963 (Act 220), Sections 17–28; Rent Regulations, 1964 (L.I. 369).",
  },
  {
    id: "family-domestic-rights",
    slug: "family-domestic-rights",
    title: "Family & Domestic Rights",
    category: "family-law",
    categoryLabel: "Family Law",
    statute: "Children's Act (Act 560) & Intestate Succession Law (PNDC Law 111)",
    iconName: "Users",
    summary:
      "Child maintenance obligations, legal custody determination, customary marriage validity, and spousal inheritance rules under PNDC Law 111.",
    keyPoints: [
      "Child welfare principle: every judicial decision regarding custody, schooling, or maintenance must treat the child's best interests as paramount.",
      "Mandatory parental maintenance: both parents share non-negotiable legal responsibilities to provide food, shelter, healthcare, and education.",
      "Customary marriage validity: customary marriages celebrated under customary law are recognized legal marriages and should be registered (CAP 127).",
      "Spousal inheritance under PNDC Law 111: surviving spouses and biological children have automatic statutory shares in the matrimonial estate.",
    ],
    actionSteps: [
      "If a parent neglects financial maintenance, file an application at the District Court Family Tribunal or Department of Social Welfare.",
      "Maintain documented logs of school fees, medical receipts, and child sustenance costs to substantiate assessment hearings.",
      "Register customary marriages at the relevant Municipal Assembly to secure conclusive legal documentation.",
      "In succession disputes following intestate death, apply for Letters of Administration at court before distributing property.",
    ],
    commonMyth: {
      myth: "When an individual passes away without a will, the extended maternal or paternal family automatically inherit all properties.",
      reality:
        "PNDC Law 111 guarantees that the surviving spouse and children inherit the matrimonial home, household chattels, and the majority estate share.",
    },
    officialContacts: [
      {
        name: "Family Tribunal Registries",
        contact: "+233 302 776 142",
        note: "District Court family & maintenance divisions",
      },
      {
        name: "Dept of Social Welfare Child Desk",
        contact: "+233 302 684 498",
        note: "Mediation and welfare assessments",
      },
    ],
    citation: "Children's Act, 1998 (Act 560); Intestate Succession Law, 1985 (PNDC Law 111); Matrimonial Causes Act, 1971 (Act 367).",
  },
  {
    id: "legal-representation",
    slug: "legal-representation",
    title: "Access to Legal Representation",
    category: "state-aid",
    categoryLabel: "State Aid & Pro Bono",
    statute: "Legal Aid Commission Act, 2018 (Act 977)",
    iconName: "Scale",
    summary:
      "Means testing qualifications for state-funded legal defense, civic paralegal advice, and pro bono foundation casework across all 16 regions.",
    keyPoints: [
      "Constitutional entitlement: anyone facing charges carrying life imprisonment or capital punishment is entitled to state-funded counsel.",
      "Means-tested legal aid: citizens earning below the national minimum living benchmark qualify for free legal representation in civil and criminal matters.",
      "Paralegal advice: accredited civic paralegals can assist with dispute mediation, bail documentation, and filing institutional complaints.",
      "No discrimination: access to legal aid is guaranteed regardless of gender, regional origin, religious faith, or political affiliation.",
    ],
    actionSteps: [
      "Visit the nearest Regional or District Legal Aid Commission office to complete a standard legal aid application form.",
      "Provide proof of income, salary slips, or an affidavit of indigence demonstrating qualification under the means test.",
      "If detained, notify the presiding magistrate or court registrar during first appearance that you require legal aid assignment.",
      "Connect with accredited foundation pro bono desks for swift emergency casework and representation support.",
    ],
    commonMyth: {
      myth: "Legal aid in Ghana only covers murder and treason trials in the High Court.",
      reality:
        "Act 977 empowers the Legal Aid Commission to handle civil cases including tenancy, family maintenance, and land rights for qualified applicants.",
    },
    officialContacts: [
      {
        name: "Legal Aid Commission Secretariat",
        contact: "+233 302 669 220",
        note: "Ministries, Accra — National headquarters",
      },
      {
        name: "Ghana Bar Association Legal Clinic",
        contact: "+233 302 226 211",
        note: "Pro bono lawyer referral program",
      },
    ],
    citation: "1992 Constitution Article 19(2)(f); Legal Aid Commission Act, 2018 (Act 977).",
  },
  {
    id: "where-to-seek-help",
    slug: "where-to-seek-help",
    title: "Where to Seek Help",
    category: "institutional-directory",
    categoryLabel: "Institutional Directory",
    statute: "Statutory & Civic Redress Bodies in Ghana",
    iconName: "HelpCircle",
    summary:
      "Direct directory, physical locations, and operating hours for CHRAJ ombudsmen, DOVVSU units, Legal Aid clinics, and municipal desks.",
    keyPoints: [
      "CHRAJ (Commission on Human Rights and Administrative Justice): investigating public service injustice, corruption, and human rights violations.",
      "DOVVSU (Ghana Police Service): specialized policing for domestic abuse, sexual harassment, defilement, and child neglect cases.",
      "Rent Control Department: government mediation and statutory determination for rent disputes, eviction notices, and illegal rent rates.",
      "Social Welfare Department: welfare monitoring, adoption procedures, orphan care, and community family reconciliation.",
    ],
    actionSteps: [
      "Identify the exact government department or commission with statutory authority over your dispute.",
      "Draft a concise factual statement: include dates, names of involved parties, and attach photocopies of all relevant receipts or documents.",
      "File your complaint in duplicate at the registry and request an official stamped acknowledgement copy with a case reference number.",
      "Attend scheduled conciliation or mediation sessions with all original documentation ready for inspection.",
    ],
    commonMyth: {
      myth: "Filing a petition or human rights complaint at CHRAJ requires hiring an expensive private attorney.",
      reality:
        "Filing a petition at CHRAJ is completely free of charge and citizens can present their cases in person without an attorney.",
    },
    officialContacts: [
      {
        name: "CHRAJ Head Office",
        contact: "+233 302 662 150",
        note: "Old Parliament House, High Street, Accra",
      },
      {
        name: "National DOVVSU HQ",
        contact: "+233 302 773 906",
        note: "CID Headquarters Complex, Ring Road East, Accra",
      },
      {
        name: "Rent Control Department",
        contact: "+233 302 662 052",
        note: "Kinbu Road, Central Business District, Accra",
      },
    ],
    citation: "CHRAJ Act, 1993 (Act 456); Police Service Act, 1970 (Act 350).",
  },
  {
    id: "constitutional-rights",
    slug: "constitutional-rights",
    title: "Constitutional Rights",
    category: "constitutional-law",
    categoryLabel: "1992 Constitution",
    statute: "1992 Constitution of Ghana, Chapter 5 (Arts. 12–33)",
    iconName: "Landmark",
    summary:
      "Chapter 5 fundamental human rights, non-discrimination protections, fair trial guarantees, and invoking Supreme Court remedies.",
    keyPoints: [
      "Inviolability of human dignity: no person shall be subjected to torture or cruel, inhuman or degrading treatment or punishment.",
      "Equality before the law: prohibition of discrimination on grounds of gender, race, color, ethnic origin, religion, creed, or economic status.",
      "Fair trial guarantees (Article 19): presumption of innocence until proven guilty according to law; right to adequate time and facilities for defense.",
      "Enforcement remedies (Article 33): any citizen who alleges that a fundamental human right has been infringed can apply directly to the High Court for redress.",
    ],
    actionSteps: [
      "Identify the specific clause under Chapter 5 (Articles 12 to 33) that has been infringed by state action or private parties.",
      "Document the chronological timeline of rights violations with photographic, audio, or written witness corroboration.",
      "Engage human rights counsel or CHRAJ ombudsmen to file an enforcement motion under Article 33 at the High Court.",
      "Where constitutional interpretation or invalidation of a statute is needed, initiate an action in the Supreme Court under Article 130.",
    ],
    commonMyth: {
      myth: "Fundamental constitutional rights can be suspended arbitrarily by state officials or private employers.",
      reality:
        "Chapter 5 rights are entrenched in the Constitution; they bind the Executive, Legislature, Judiciary, and all corporate entities.",
    },
    officialContacts: [
      {
        name: "Supreme & High Court Registry",
        contact: "+233 302 663 951",
        note: "Supreme Court Complex, High Street, Accra",
      },
      {
        name: "CHRAJ Constitutional Ombudsman",
        contact: "+233 302 662 150",
        note: "Free investigative ombudsman for citizens",
      },
    ],
    citation: "Constitution of the Republic of Ghana (1992), Articles 12, 14, 17, 19, 21, and 33.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Rights Guides", count: 8 },
  { id: "criminal-procedure", label: "Criminal Procedure", count: 1 },
  { id: "protection-safety", label: "Protection & Safety", count: 1 },
  { id: "labour-law", label: "Labour Law", count: 1 },
  { id: "property-tenancy", label: "Housing & Tenancy", count: 1 },
  { id: "family-law", label: "Family & Domestic", count: 1 },
  { id: "state-aid", label: "Legal Aid & Defense", count: 1 },
  { id: "institutional-directory", label: "Where to Seek Help", count: 1 },
  { id: "constitutional-law", label: "1992 Constitution", count: 1 },
];

function getTopicIcon(iconName: string) {
  switch (iconName) {
    case "ShieldAlert":
      return ShieldAlert;
    case "HeartHandshake":
      return HeartHandshake;
    case "Briefcase":
      return Briefcase;
    case "HomeIcon":
      return HomeIcon;
    case "Users":
      return Users;
    case "Scale":
      return Scale;
    case "HelpCircle":
      return HelpCircle;
    case "Landmark":
      return Landmark;
    default:
      return BookOpen;
  }
}

export default function KnowYourRightsPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState<LegalTopic | null>(null);

  // Filter topics based on search & category
  const filteredTopics = useMemo(() => {
    return TOPICS_DATA.filter((topic) => {
      const matchesCategory =
        activeCategory === "all" || topic.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.categoryLabel.toLowerCase().includes(q) ||
        topic.statute.toLowerCase().includes(q) ||
        topic.keyPoints.some((p) => p.toLowerCase().includes(q)) ||
        topic.actionSteps.some((s) => s.toLowerCase().includes(q)) ||
        topic.commonMyth.myth.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="kyr-portal">
      {/* =====================================================================
          HERO SECTION WITH ORGANIZED 3D DOT MATRIX ANCHORED BELOW CONTENT
          ===================================================================== */}
      <section className="kyr-hero relative overflow-hidden">
        {/* 3D Dot Matrix: Positioned below the content with organized depth wave */}
        <div className="kyr-hero__dots-layer" aria-hidden="true">
          <DottedSurface
            size={9}
            opacity={0.85}
            sizeAttenuation={true}
            vertexColors={true}
            waveAmplitude={11}
            waveSpeed={0.018}
            pointsY={-280}
            cameraY={340}
            cameraZ={690}
            lookAtY={-150}
            className="kyr-hero__dots-canvas"
          />
        </div>

        <div className="container relative z-10 kyr-hero__content">
          <div className="kyr-hero__badge">
            <span className="kyr-hero__badge-dot" aria-hidden="true" />
            <span>LEGAL EMPOWERMENT & CIVIC RIGHTS · GHANA</span>
          </div>

          <h1 className="kyr-hero__title">
            Plain-language legal information for everyday decisions.
          </h1>

          <p className="kyr-hero__lede">
            These practical topic areas help the public understand basic rights, statutory
            protections, and where they can begin to seek immediate help or guidance across Ghana.
          </p>

          {/* Quick Emergency Hotlines Bar */}
          <div className="kyr-hero__hotlines" aria-label="Key national legal hotlines">
            <div className="kyr-hero__hotline-item">
              <Phone size={14} className="kyr-hero__hotline-icon" aria-hidden="true" />
              <span className="kyr-hero__hotline-label">Police Emergency:</span>
              <span className="kyr-hero__hotline-number">191 / 112</span>
            </div>
            <div className="kyr-hero__hotline-divider" aria-hidden="true" />
            <div className="kyr-hero__hotline-item">
              <ShieldAlert size={14} className="kyr-hero__hotline-icon" aria-hidden="true" />
              <span className="kyr-hero__hotline-label">DOVVSU Toll-Free:</span>
              <span className="kyr-hero__hotline-number">0800 111 222</span>
            </div>
            <div className="kyr-hero__hotline-divider" aria-hidden="true" />
            <div className="kyr-hero__hotline-item">
              <Scale size={14} className="kyr-hero__hotline-icon" aria-hidden="true" />
              <span className="kyr-hero__hotline-label">Legal Aid Commission:</span>
              <span className="kyr-hero__hotline-number">+233 302 669 220</span>
            </div>
          </div>

          {/* Search & Topic Filters */}
          <div className="kyr-search-box">
            <div className="kyr-search-input-wrap">
              <Search size={18} className="kyr-search-icon" aria-hidden="true" />
              <input
                type="text"
                id="kyr-search-input"
                className="kyr-search-input"
                placeholder="Search rights topics, statutory acts (Act 30, Act 732, Rent Act), bail, eviction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search legal rights topics"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="kyr-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="kyr-category-tabs" role="tablist" aria-label="Rights categories">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`kyr-category-tab ${isActive ? "kyr-category-tab--active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          TOPIC GUIDES GRID
          ===================================================================== */}
      <section className="kyr-grid-section">
        <div className="container">
          <div className="kyr-results-bar">
            <p className="kyr-results-count">
              Showing <strong>{filteredTopics.length}</strong> of {TOPICS_DATA.length} practical
              legal guides
            </p>
            {searchQuery && (
              <button
                type="button"
                className="kyr-reset-search"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredTopics.length === 0 ? (
            <div className="kyr-empty-state">
              <AlertCircle size={40} className="kyr-empty-icon" aria-hidden="true" />
              <h3 className="kyr-empty-title">No matching rights guide found</h3>
              <p className="kyr-empty-desc">
                We couldn&apos;t find any guides matching &ldquo;{searchQuery}&rdquo;. Try
                searching for broad keywords like &ldquo;bail&rdquo;, &ldquo;landlord&rdquo;,
                &ldquo;police&rdquo;, or &ldquo;violence&rdquo;.
              </p>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                View all 8 legal topics
              </button>
            </div>
          ) : (
            <div className="kyr-cards-layout">
              {filteredTopics.map((topic) => {
                const IconComponent = getTopicIcon(topic.iconName);
                return (
                  <article
                    key={topic.id}
                    id={topic.slug}
                    className="kyr-guide-card"
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <div className="kyr-guide-card__header">
                      <div className="kyr-guide-card__icon-wrap">
                        <IconComponent size={22} aria-hidden="true" />
                      </div>
                      <span className="kyr-guide-card__badge">{topic.categoryLabel}</span>
                    </div>

                    <h2 className="kyr-guide-card__title">{topic.title}</h2>
                    <p className="kyr-guide-card__statute">{topic.statute}</p>
                    <p className="kyr-guide-card__summary">{topic.summary}</p>

                    <div className="kyr-guide-card__highlights">
                      <p className="kyr-guide-card__highlights-heading">Key Protections:</p>
                      <ul className="kyr-guide-card__highlights-list">
                        {topic.keyPoints.slice(0, 2).map((point, idx) => (
                          <li key={idx}>
                            <Check size={14} className="kyr-guide-card__check" aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="kyr-guide-card__footer">
                      <button
                        type="button"
                        className="kyr-guide-card__cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTopic(topic);
                        }}
                      >
                        <span>Open full legal guide</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Bottom Pro Bono Helpline Banner */}
          <div className="kyr-bottom-cta">
            <div className="kyr-bottom-cta__inner">
              <div className="kyr-bottom-cta__text">
                <div className="kyr-bottom-cta__badge">
                  <span className="kyr-bottom-cta__badge-dot" aria-hidden="true" />
                  <span>PRO BONO LEGAL INTAKE</span>
                </div>
                <h3 className="kyr-bottom-cta__title">
                  Facing an active rights dispute or need legal representation?
                </h3>
                <p className="kyr-bottom-cta__desc">
                  Our foundation legal desk evaluates cases for free legal assistance, court
                  representation, and human rights ombudsman petitions for qualified individuals.
                </p>
              </div>
              <div className="kyr-bottom-cta__actions">
                <Link href="/legal-help" className="button button--primary kyr-bottom-cta__btn">
                  <span>Apply for legal help</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href="/justice-bridge-index"
                  className="button button--secondary kyr-bottom-cta__btn"
                >
                  <BookOpen size={15} aria-hidden="true" />
                  <span>Read research reports</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          DETAILED TOPIC MODAL / DEEP DIVE DRAWER
          ===================================================================== */}
      {selectedTopic && (
        <div
          className="kyr-modal-backdrop"
          onClick={() => setSelectedTopic(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="kyr-modal-title"
        >
          <div
            className="kyr-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="kyr-modal__header">
              <div className="kyr-modal__badge-group">
                <span className="kyr-modal__badge">{selectedTopic.categoryLabel}</span>
                <span className="kyr-modal__statute">{selectedTopic.statute}</span>
              </div>
              <button
                type="button"
                className="kyr-modal__close-btn"
                onClick={() => setSelectedTopic(null)}
                aria-label="Close guide"
              >
                <X size={18} />
              </button>
            </div>

            <div className="kyr-modal__body">
              <h2 id="kyr-modal-title" className="kyr-modal__title">
                {selectedTopic.title}
              </h2>
              <p className="kyr-modal__lede">{selectedTopic.summary}</p>

              {/* Core Statutory Rights */}
              <div className="kyr-modal__section">
                <h3 className="kyr-modal__section-title">
                  <Check size={18} className="kyr-modal__section-icon" aria-hidden="true" />
                  <span>Statutory Rights & Guarantees</span>
                </h3>
                <ul className="kyr-modal__rights-list">
                  {selectedTopic.keyPoints.map((point, i) => (
                    <li key={i} className="kyr-modal__right-item">
                      <span className="kyr-modal__bullet" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Steps */}
              <div className="kyr-modal__section">
                <h3 className="kyr-modal__section-title">
                  <FileText size={18} className="kyr-modal__section-icon" aria-hidden="true" />
                  <span>What to Do: Step-by-Step Action Plan</span>
                </h3>
                <div className="kyr-modal__steps">
                  {selectedTopic.actionSteps.map((step, i) => (
                    <div key={i} className="kyr-modal__step-card">
                      <div className="kyr-modal__step-num">{i + 1}</div>
                      <p className="kyr-modal__step-text">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Myth vs Reality */}
              <div className="kyr-modal__section kyr-modal__myth-box">
                <div className="kyr-modal__myth-header">
                  <AlertCircle size={16} aria-hidden="true" />
                  <span>Common Legal Misconception</span>
                </div>
                <div className="kyr-modal__myth-body">
                  <p className="kyr-modal__myth-line">
                    <strong>Myth:</strong> &ldquo;{selectedTopic.commonMyth.myth}&rdquo;
                  </p>
                  <p className="kyr-modal__reality-line">
                    <strong>Legal Reality:</strong> {selectedTopic.commonMyth.reality}
                  </p>
                </div>
              </div>

              {/* Verified Institutional Contact Points */}
              <div className="kyr-modal__section">
                <h3 className="kyr-modal__section-title">
                  <MapPin size={18} className="kyr-modal__section-icon" aria-hidden="true" />
                  <span>Verified Redress Points</span>
                </h3>
                <div className="kyr-modal__contacts-grid">
                  {selectedTopic.officialContacts.map((contact, i) => (
                    <div key={i} className="kyr-modal__contact-card">
                      <p className="kyr-modal__contact-name">{contact.name}</p>
                      <p className="kyr-modal__contact-val">{contact.contact}</p>
                      <p className="kyr-modal__contact-note">{contact.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citation & Legal Disclaimer */}
              <div className="kyr-modal__citation-box">
                <p className="kyr-modal__citation-text">
                  <strong>Statutory Citation:</strong> {selectedTopic.citation}
                </p>
                <p className="kyr-modal__disclaimer">
                  This guide is published for public legal education only and does not constitute
                  formal advocate-client legal advice. If you face active proceedings, consult an
                  accredited legal practitioner or the Legal Aid Commission.
                </p>
              </div>
            </div>

            <div className="kyr-modal__footer">
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setSelectedTopic(null)}
              >
                Close guide
              </button>
              <Link href="/legal-help" className="button button--primary">
                <span>Request legal assistance</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
