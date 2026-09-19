"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  BookOpen,
  Search,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  X,
  Scale,
  Sparkles,
  Landmark,
} from "lucide-react";
import DottedSurface from "@/components/ui/dotted-surface";

interface ResourceDoc {
  id: string;
  category: string;
  type: string;
  title: string;
  pages: string;
  edition: string;
  description: string;
  highlights: string[];
  downloadUrl: string;
  onlineUrl: string;
}

const defaultResources: ResourceDoc[] = [
  {
    id: "everyday-rights-handbook",
    category: "Rights Handbooks",
    type: "COMPREHENSIVE GUIDE",
    title: "Know Your Rights: Everyday Citizen's Legal Handbook",
    pages: "48 Pages · PDF & Print",
    edition: "2026 Edition",
    description:
      "A complete plain-language guide translating Ghana's 1992 Constitution, Criminal Procedure Code, and Domestic Violence Act into actionable citizen advice.",
    highlights: [
      "48-hour police detention limits & step-by-step bail guide",
      "Domestic violence emergency protection orders (Act 732)",
      "Employment termination rules & Labour Commission filing",
    ],
    downloadUrl: "#download-rights-handbook",
    onlineUrl: "/know-your-rights",
  },
  {
    id: "justice-bridge-index-q1",
    category: "Empirical Research",
    type: "RESEARCH PUBLICATION",
    title: "Justice Bridge Index: Baseline Rights Awareness",
    pages: "38 Pages · PDF & Online",
    edition: "Q1 2026 Edition",
    description:
      "A peer-reviewed quarterly empirical study examining institutional trust, legal aid awareness, and justice access hurdles across all 16 Ghanaian regions.",
    highlights: [
      "Representative survey of 4,200+ Ghanaian citizens",
      "Regional breakdown of tenancy & customary land disputes",
      "Policy recommendations for state Legal Aid funding",
    ],
    downloadUrl: "#download-jbi-q1",
    onlineUrl: "/justice-bridge-index",
  },
  {
    id: "tenant-rights-compliance",
    category: "Toolkits & Compliance",
    type: "COMPLIANCE TOOLKIT",
    title: "Tenant Rights & Rent Advance Compliance Toolkit",
    pages: "18 Pages · PDF & Forms",
    edition: "Updated March 2026",
    description:
      "Practical toolkit for tenants and landlords detailing statutory rent advance caps under Rent Act 220, unlawful lockouts, and Rent Control complaint forms.",
    highlights: [
      "Statutory maximum 6-month rent advance explanations",
      "Prohibition of self-help lockouts & eviction notices",
      "Downloadable dispute complaint form for Rent Control",
    ],
    downloadUrl: "#download-tenancy-toolkit",
    onlineUrl: "/know-your-rights#housing-tenancy",
  },
];

const categories = [
  "All Resources",
  "Rights Handbooks",
  "Empirical Research",
  "Toolkits & Compliance",
];

export function ResourcesPortal() {
  const [activeCategory, setActiveCategory] = useState("All Resources");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    return defaultResources.filter((res) => {
      const matchesCategory =
        activeCategory === "All Resources" || res.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        res.title.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const handleDownload = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    setToastMessage(`Downloaded "${title}" (CC BY 4.0 Open Access)`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="resources-page-root">
      {/* 3D Dotted Surface Ground Plane */}
      <div className="portal-dots-container" aria-hidden="true">
        <DottedSurface
          size={10}
          opacity={0.85}
          sizeAttenuation={true}
          vertexColors={true}
          waveAmplitude={10}
          waveSpeed={0.016}
          pointsY={-260}
          className="portal-dots-canvas"
        />
      </div>

      <div className="container relative z-10 w-full resources-container">
        {/* Header */}
        <div className="resources-header">
          <div className="jbi-pill-badge">
            <span className="jbi-pill-badge__dot" aria-hidden="true" />
            <span>OPEN ACCESS CIVIC KNOWLEDGEBASE</span>
          </div>

          <h1 className="resources-title">
            Plain-Language Legal Resources & Handbooks.
          </h1>

          <p className="resources-lede">
            Open-access toolkits, empirical research publications, and plain-language civic
            handbooks published to make Ghanaian law understandable and accessible to everyone.
          </p>

          {/* Search & Filter Bar */}
          <div className="resources-controls">
            <div className="resources-search-box">
              <Search size={16} className="search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search publications, rights guides, toolkits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search resources"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="resources-filter-pills" role="tablist" aria-label="Resource Categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-pill ${activeCategory === cat ? "filter-pill--active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3-Column Resource Grid */}
        <div className="resources-grid">
          {filteredResources.length > 0 ? (
            filteredResources.map((item) => (
              <article key={item.id} className="resource-card">
                <div className="resource-card__header">
                  <span className="resource-card__type">{item.type}</span>
                  <span className="resource-card__pages">{item.pages}</span>
                </div>

                <div className="resource-card__body">
                  <h2 className="resource-card__title">{item.title}</h2>
                  <p className="resource-card__desc">{item.description}</p>

                  <ul className="resource-card__highlights" aria-label="Key document highlights">
                    {item.highlights.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={14} className="highlight-icon" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="resource-card__footer">
                  <a
                    href={item.downloadUrl}
                    onClick={(e) => handleDownload(e, item.title)}
                    className="button button--secondary resource-btn"
                  >
                    <Download size={14} aria-hidden="true" />
                    <span>Download PDF</span>
                  </a>

                  <Link
                    href={item.onlineUrl}
                    className="button button--primary resource-btn"
                  >
                    <span>Read online</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="resources-empty-state">
              <BookOpen size={32} className="empty-icon" aria-hidden="true" />
              <h3>No resources found matching &quot;{searchQuery}&quot;</h3>
              <p>Try searching for different terms or reset your filters.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All Resources");
                  setSearchQuery("");
                }}
                className="button button--secondary"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="resources-bottom-banner">
          <div className="resources-bottom-banner__content">
            <h3 className="resources-bottom-banner__title">
              Need custom rights handbooks for your school, church, or community?
            </h3>
            <p className="resources-bottom-banner__desc">
              We provide free bulk printed educational handbooks and local dialect digital copies for verified community organizations.
            </p>
          </div>
          <div className="resources-bottom-banner__actions">
            <Link href="/contact?type=resources" className="button button--secondary kyr-banner-btn">
              <span>Request Educational Materials</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/know-your-rights" className="button button--primary kyr-banner-btn">
              <span>Explore Online Guides</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage ? (
        <div className="feedback-toast" role="status">
          <CheckCircle2 size={16} className="toast-icon" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      ) : null}
    </div>
  );
}
