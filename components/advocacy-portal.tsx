"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  Landmark,
  ArrowUpRight,
  Check,
  CheckCircle2,
  FileText,
  Building2,
  Scale,
  X,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import DottedSurface from "@/components/ui/dotted-surface";

interface CampaignItem {
  id: string;
  tag: string;
  icon: typeof ShieldAlert;
  title: string;
  status: string;
  summary: string;
  fullScope: string;
  metrics: string;
  statutoryBasis: string;
  keyOutcomes: string[];
}

const defaultCampaigns: CampaignItem[] = [
  {
    id: "police-conduct",
    tag: "CONSTITUTIONAL SAFEGUARDS",
    icon: ShieldAlert,
    title: "Police Conduct & 48-Hour Bail Monitoring",
    status: "ACTIVE OVERSIGHT",
    summary:
      "Systematic monitoring of constitutional 48-hour detention limits under Article 14(3), station legal triage, and emergency bail intervention across high-density divisions.",
    fullScope:
      "This initiative actively audits police detention practices across Greater Accra, Ashanti, and Central regions. Foundation legal fellows and accredited paralegals conduct unannounced oversight visits, verify suspect intake books, enforce free police enquiry bail, and file Habeas Corpus applications when citizens are held unlawfully without charge.",
    metrics: "14 Police Divisions Audited · 340+ Detainees Released or Bailed",
    statutoryBasis: "1992 Constitution Article 14(3) & Criminal Procedure Code (Act 30)",
    keyOutcomes: [
      "Secured immediate bail for over 340 unlawfully detained citizens",
      "Published the 2025 Police Station Detention Compliance Scorecard",
      "Conducted rights training for 85 community station officers and paralegals",
    ],
  },
  {
    id: "grassroots-townhalls",
    tag: "COMMUNITY LEGAL LITERACY",
    icon: Users,
    title: "Grassroots Rights Clinics & Townhalls",
    status: "COMMUNITY OUTREACH",
    summary:
      "Delivering plain-language rights workshops in Twi, Ga, Ewe, and English for market associations, informal transport workers, and youth cooperatives.",
    fullScope:
      "Bridging the divide between formal courtroom jargon and daily citizen realities. The Foundation organizes localized rights townhalls at major market hubs, fishing communities, and lorry stations. Topics include tenancy advance caps, domestic violence protection orders, fair wage disputes, and resolving conflicts through lawful state channels rather than mob action.",
    metrics: "24 Community Townhalls · 1,850+ Participants Reached",
    statutoryBasis: "Domestic Violence Act 732 & Rent Act 220",
    keyOutcomes: [
      "Distributed 5,000+ plain-language rights toolkits in local languages",
      "Established 12 community referral desks for domestic violence mediation",
      "Trained 40 local market executives as community rights focal points",
    ],
  },
  {
    id: "legal-aid-reform",
    tag: "INSTITUTIONAL REFORM",
    icon: Landmark,
    title: "State Legal Aid Expansion & Court Reform",
    status: "POLICY REFORM",
    summary:
      "Empirical research submissions to Parliamentary Select Committees advocating for expanded budgetary funding and rural presence for the Legal Aid Commission.",
    fullScope:
      "Under Act 977, every indigent Ghanaian is constitutionally entitled to state-appointed defense for severe criminal allegations. However, severe budgetary deficits leave millions unrepresented. Equity Bridge Foundation monitors district magistrates, gathers empirical caseload data, and lobbies Parliament for dedicated statutory funding for civil pro bono schemes.",
    metrics: "16 Regions Monitored · 3 Parliamentary Briefs Delivered",
    statutoryBasis: "Legal Aid Commission Act 2018 (Act 977)",
    keyOutcomes: [
      "Delivered empirical submission to Parliamentary Select Committee on Justice",
      "Partnered with Ghana Bar Association on regional pro bono accreditation",
      "Formulated proposed policy reforms for expedited court fee waivers",
    ],
  },
];

export function AdvocacyPortal() {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(
    null
  );

  return (
    <div className="advocacy-page-root">
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

      <div className="container relative z-10 w-full advocacy-container">
        {/* Header Area */}
        <div className="advocacy-header">
          <div className="jbi-pill-badge">
            <span className="jbi-pill-badge__dot" aria-hidden="true" />
            <span>PUBLIC-INTEREST REFORM · GHANA</span>
          </div>

          <h1 className="advocacy-title">
            Defending Rights & Institutional Accountability.
          </h1>

          <p className="advocacy-lede">
            Evidence-driven advocacy, constitutional rights defense, and public legal education
            monitoring institutional compliance across all 16 administrative regions of Ghana.
          </p>

          {/* 4 Empirical Benchmark Badges */}
          <div className="advocacy-benchmarks" aria-label="Empirical advocacy benchmarks">
            <div className="advocacy-stat">
              <span className="advocacy-stat__number">14</span>
              <span className="advocacy-stat__label">Divisions Monitored</span>
            </div>
            <div className="advocacy-stat">
              <span className="advocacy-stat__number">24</span>
              <span className="advocacy-stat__label">Rights Townhalls</span>
            </div>
            <div className="advocacy-stat">
              <span className="advocacy-stat__number">16</span>
              <span className="advocacy-stat__label">Regions Reached</span>
            </div>
            <div className="advocacy-stat">
              <span className="advocacy-stat__number">100%</span>
              <span className="advocacy-stat__label">Non-Partisan Civic Aid</span>
            </div>
          </div>
        </div>

        {/* 3-Column Campaign Grid */}
        <div className="advocacy-grid">
          {defaultCampaigns.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.id} className="advocacy-card">
                <div className="advocacy-card__header">
                  <div className="advocacy-card__icon-wrap" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                  <span className="advocacy-card__status">{item.status}</span>
                </div>

                <div className="advocacy-card__body">
                  <span className="advocacy-card__tag">{item.tag}</span>
                  <h2 className="advocacy-card__title">{item.title}</h2>
                  <p className="advocacy-card__desc">{item.summary}</p>

                  <div className="advocacy-card__metrics">
                    <span className="advocacy-card__dot" aria-hidden="true" />
                    <span>{item.metrics}</span>
                  </div>
                </div>

                <div className="advocacy-card__footer">
                  <button
                    type="button"
                    onClick={() => setSelectedCampaign(item)}
                    className="advocacy-card__trigger"
                  >
                    <span>Read Campaign Dossier</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Intake / Partnership Strip */}
        <div className="advocacy-bottom-strip">
          <div className="advocacy-bottom-strip__content">
            <h3 className="advocacy-bottom-strip__title">
              Have a public-interest violation or systemic reform to report?
            </h3>
            <p className="advocacy-bottom-strip__desc">
              We collaborate with civic groups, community paralegals, and legal researchers to submit verified policy briefs.
            </p>
          </div>
          <div className="advocacy-bottom-strip__actions">
            <Link href="/contact?type=advocacy" className="button button--secondary kyr-banner-btn">
              <span>Submit Public Memo</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/legal-help" className="button button--primary kyr-banner-btn">
              <span>Request Legal Help</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Campaign Deep-Dive Modal */}
      {selectedCampaign ? (
        <div
          className="advocacy-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="campaign-modal-title"
          onClick={() => setSelectedCampaign(null)}
        >
          <div
            className="advocacy-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="advocacy-modal-header">
              <div className="modal-badge-group">
                <span className="modal-status-badge">{selectedCampaign.status}</span>
                <span className="modal-tag-badge">{selectedCampaign.tag}</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                aria-label="Close dossier modal"
                onClick={() => setSelectedCampaign(null)}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <h2 id="campaign-modal-title" className="advocacy-modal-title">
              {selectedCampaign.title}
            </h2>

            <p className="advocacy-modal-statutory">
              <strong>Statutory Foundation:</strong> {selectedCampaign.statutoryBasis}
            </p>

            <div className="advocacy-modal-body">
              <h3 className="modal-section-title">Operational Scope & Methodology</h3>
              <p className="modal-text">{selectedCampaign.fullScope}</p>

              <h3 className="modal-section-title">Verified Field Outcomes</h3>
              <ul className="modal-outcomes-list">
                {selectedCampaign.keyOutcomes.map((outcome) => (
                  <li key={outcome}>
                    <CheckCircle2 size={15} className="modal-check" aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="advocacy-modal-footer">
              <Link
                href={`/contact?subject=${encodeURIComponent(selectedCampaign.title)}`}
                className="button button--primary modal-action-btn"
              >
                <span>Support This Campaign</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="button button--secondary modal-action-btn"
                onClick={() => setSelectedCampaign(null)}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
