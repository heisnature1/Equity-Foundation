"use client";

import Link from "next/link";
import DottedSurface from "@/components/ui/dotted-surface";
import {
  Scale,
  Shield,
  BookOpen,
  Users,
  Compass,
  FileCheck,
  Building2,
  Landmark,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  BarChart3,
  Sparkles,
} from "lucide-react";

interface AboutPortalProps {
  cmsContent?: {
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
}

export default function AboutPortal({ cmsContent }: AboutPortalProps) {
  const missionText =
    cmsContent?.missionDescription ||
    "Equity Bridge Foundation is dedicated to closing the systemic access-to-justice gap in Ghana. We provide free, high-caliber legal aid to indigent citizens, publish rigorous empirical research on rights disparities, and conduct nationwide public legal education so that every person can invoke their constitutional protections with dignity.";

  const whoWeServeText =
    cmsContent?.whoWeServeDescription ||
    "Our clinic prioritizes underprivileged women, survivors of domestic and gender-based violence, indigent criminal defendants subjected to unlawful pre-trial detention, vulnerable tenants facing predatory eviction, and casual workers denied statutory employment protections across Ghana.";

  return (
    <div className="about-portal">
      {/* =====================================================================
          1. HERO SECTION WITH ORGANIZED 3D DOT SURFACE ANCHORED BELOW
          ===================================================================== */}
      <section className="about-hero relative overflow-hidden">
        <div className="about-hero__dots-layer" aria-hidden="true">
          <DottedSurface
            size={9}
            opacity={0.88}
            sizeAttenuation={true}
            vertexColors={true}
            waveAmplitude={11}
            waveSpeed={0.018}
            pointsY={-280}
            cameraY={340}
            cameraZ={690}
            lookAtY={-150}
            className="about-hero__dots-canvas"
          />
        </div>

        <div className="container relative z-10 about-hero__content">
          <div className="about-hero__badge">
            <span className="about-hero__badge-dot" aria-hidden="true" />
            <span>INSTITUTIONAL PROFILE · GHANA</span>
          </div>

          <h1 className="about-hero__title">
            Defending Constitutional Rights. Bridging the Gap to Justice.
          </h1>

          <p className="about-hero__lede">
            Equity Bridge Foundation is an independent human-rights organization, public-interest legal
            clinic, and empirical research initiative dedicated to ensuring equal protection under
            the law for underprivileged communities across all 16 regions of Ghana.
          </p>

          <div className="about-hero__metrics" aria-label="Key institutional benchmarks">
            <div className="about-hero__metric">
              <span className="about-hero__metric-num">100%</span>
              <span className="about-hero__metric-label">Pro Bono Casework</span>
            </div>
            <div className="about-hero__metric-sep" aria-hidden="true" />
            <div className="about-hero__metric">
              <span className="about-hero__metric-num">16</span>
              <span className="about-hero__metric-label">Regions Monitored</span>
            </div>
            <div className="about-hero__metric-sep" aria-hidden="true" />
            <div className="about-hero__metric">
              <span className="about-hero__metric-num">4,200+</span>
              <span className="about-hero__metric-label">Citizens Surveyed</span>
            </div>
            <div className="about-hero__metric-sep" aria-hidden="true" />
            <div className="about-hero__metric">
              <span className="about-hero__metric-num">Quarterly</span>
              <span className="about-hero__metric-label">Peer-Reviewed Index</span>
            </div>
          </div>

          <div className="about-hero__actions">
            <Link href="/legal-help" className="button button--primary about-btn">
              <span>Get Free Legal Help</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/justice-bridge-index" className="button button--dark about-btn">
              <BarChart3 size={15} aria-hidden="true" />
              <span>Read Research Publications</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. MISSION, VISION & ETHICAL MANDATE
          ===================================================================== */}
      <section className="about-section about-section--mission">
        <div className="container">
          <div className="about-section-header">
            <div className="about-pill-badge">
              <Compass size={14} aria-hidden="true" />
              <span>OUR PURPOSE & VALUES</span>
            </div>
            <h2 className="about-section-title">
              Why Equity Bridge Foundation exists.
            </h2>
            <p className="about-section-lede">
              In Ghana, while the 1992 Constitution guarantees comprehensive fundamental human rights,
              the practical ability to enforce those rights remains out of reach for millions due to
              financial barriers, geographical distance to courts, and institutional complexity.
            </p>
          </div>

          <div className="about-purpose-grid">
            <article className="about-purpose-card about-purpose-card--primary">
              <div className="about-purpose-card__icon-wrap">
                <Scale size={24} aria-hidden="true" />
              </div>
              <span className="about-purpose-card__tag">CORE MISSION</span>
              <h3 className="about-purpose-card__title">Defending the Defenseless</h3>
              <p className="about-purpose-card__text">{missionText}</p>
              <ul className="about-purpose-card__checklist">
                <li>
                  <CheckCircle2 size={16} className="about-check" aria-hidden="true" />
                  <span>Direct pro bono courtroom litigation & bail advocacy</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="about-check" aria-hidden="true" />
                  <span>Administrative petitions before CHRAJ & ombudsman desks</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="about-check" aria-hidden="true" />
                  <span>Free crisis mediation for family, tenancy, and labour disputes</span>
                </li>
              </ul>
            </article>

            <article className="about-purpose-card">
              <div className="about-purpose-card__icon-wrap">
                <Globe2 size={24} aria-hidden="true" />
              </div>
              <span className="about-purpose-card__tag">INSTITUTIONAL VISION</span>
              <h3 className="about-purpose-card__title">Equal Justice for Every Ghanaian</h3>
              <p className="about-purpose-card__text">
                A Ghana where access to justice is never determined by wealth, gender, or social
                status. We envision transparent state legal institutions, empowered citizens who know
                their constitutional rights, and systemic accountability across all districts.
              </p>
              <div className="about-vision-metrics">
                <div className="about-vision-metric">
                  <span className="about-vision-metric__val">Art. 14</span>
                  <span className="about-vision-metric__desc">Constitutional liberty protection</span>
                </div>
                <div className="about-vision-metric">
                  <span className="about-vision-metric__val">Art. 17</span>
                  <span className="about-vision-metric__desc">Equality before the law</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. OUR THREE OPERATIONAL PILLARS
          ===================================================================== */}
      <section className="about-section about-section--pillars">
        <div className="container">
          <div className="about-section-header">
            <div className="about-pill-badge">
              <Building2 size={14} aria-hidden="true" />
              <span>CORE OPERATIONS</span>
            </div>
            <h2 className="about-section-title">
              Our tripartite framework for legal reform.
            </h2>
            <p className="about-section-lede">
              We do not treat symptoms in isolation. Our work combines direct legal aid with systemic
              data collection and widespread civic education to transform how justice is delivered.
            </p>
          </div>

          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <div className="about-pillar-card__top">
                <span className="about-pillar-card__number">01</span>
                <div className="about-pillar-card__icon">
                  <HeartHandshake size={22} aria-hidden="true" />
                </div>
              </div>
              <h3 className="about-pillar-card__title">Pro Bono Legal Aid Clinic</h3>
              <p className="about-pillar-card__desc">
                Our licensed volunteer advocates and legal officers handle active criminal, domestic,
                tenancy, and labour cases for qualified applicants who cannot afford private counsel.
              </p>
              <div className="about-pillar-card__footer">
                <span className="about-pillar-card__stat">100% Free Representation</span>
                <Link href="/legal-help" className="about-pillar-card__link">
                  <span>Inquire</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="about-pillar-card about-pillar-card--highlight">
              <div className="about-pillar-card__top">
                <span className="about-pillar-card__number">02</span>
                <div className="about-pillar-card__icon">
                  <BarChart3 size={22} aria-hidden="true" />
                </div>
              </div>
              <h3 className="about-pillar-card__title">Justice Bridge Index</h3>
              <p className="about-pillar-card__desc">
                An empirical, quarterly publication analyzing court turnaround times, public trust in
                institutions, and regional rights disparities through rigorous stratified sampling.
              </p>
              <div className="about-pillar-card__footer">
                <span className="about-pillar-card__stat">Peer-Reviewed Open Data</span>
                <Link href="/justice-bridge-index" className="about-pillar-card__link">
                  <span>Explore</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="about-pillar-card">
              <div className="about-pillar-card__top">
                <span className="about-pillar-card__number">03</span>
                <div className="about-pillar-card__icon">
                  <BookOpen size={22} aria-hidden="true" />
                </div>
              </div>
              <h3 className="about-pillar-card__title">Public Legal Education</h3>
              <p className="about-pillar-card__desc">
                Translating complex Ghanaian statutes into plain-language guides, community radio
                broadcasts, and paralegal workshops to stop rights violations before they happen.
              </p>
              <div className="about-pillar-card__footer">
                <span className="about-pillar-card__stat">8 Plain-Language Guides</span>
                <Link href="/know-your-rights" className="about-pillar-card__link">
                  <span>Read Guides</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. WHO WE SERVE & WHERE WE WORK
          ===================================================================== */}
      <section className="about-section about-section--serve">
        <div className="container">
          <div className="about-serve-layout">
            <div className="about-serve-narrative">
              <div className="about-pill-badge">
                <Users size={14} aria-hidden="true" />
                <span>BENEFICIARY COMMUNITIES</span>
              </div>
              <h2 className="about-section-title">
                Prioritizing those most vulnerable to legal exclusion.
              </h2>
              <p className="about-serve-desc">{whoWeServeText}</p>

              <div className="about-beneficiaries-list">
                <div className="about-beneficiary-item">
                  <div className="about-beneficiary-bullet" aria-hidden="true" />
                  <div>
                    <h4 className="about-beneficiary-title">Women & GBV Survivors</h4>
                    <p className="about-beneficiary-desc">
                      Expedited court protection orders under Act 732, free medical documentation,
                      and shelter assistance coordination.
                    </p>
                  </div>
                </div>

                <div className="about-beneficiary-item">
                  <div className="about-beneficiary-bullet" aria-hidden="true" />
                  <div>
                    <h4 className="about-beneficiary-title">Unlawfully Detained Citizens</h4>
                    <p className="about-beneficiary-desc">
                      Enforcing the 48-hour constitutional arraignment rule, filing emergency Habeas
                      Corpus petitions, and securing bail.
                    </p>
                  </div>
                </div>

                <div className="about-beneficiary-item">
                  <div className="about-beneficiary-bullet" aria-hidden="true" />
                  <div>
                    <h4 className="about-beneficiary-title">Displaced Low-Income Tenants</h4>
                    <p className="about-beneficiary-desc">
                      Defending against predatory multi-year rent demands and illegal landlord lockouts
                      under Rent Act 220.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-governance-box">
              <div className="about-governance-box__header">
                <ShieldCheck size={26} className="about-gov-icon" aria-hidden="true" />
                <div>
                  <h3 className="about-governance-box__title">Legal Status & Governance</h3>
                  <span className="about-governance-box__badge">Verified Civic Organization</span>
                </div>
              </div>

              <div className="about-governance-box__content">
                <div className="about-gov-field">
                  <span className="about-gov-field__label">Entity Registration</span>
                  <span className="about-gov-field__val">
                    Non-Governmental Organization registered in the Republic of Ghana
                  </span>
                </div>
                <div className="about-gov-field">
                  <span className="about-gov-field__label">Ethical Standard</span>
                  <span className="about-gov-field__val">
                    Ghana Bar Association professional ethics & Legal Aid Commission guidelines
                  </span>
                </div>
                <div className="about-gov-field">
                  <span className="about-gov-field__label">Data & Research Ethics</span>
                  <span className="about-gov-field__val">
                    Creative Commons Attribution 4.0 International (CC BY 4.0) Open Access
                  </span>
                </div>
                <div className="about-gov-field">
                  <span className="about-gov-field__label">Funding Transparency</span>
                  <span className="about-gov-field__val">
                    Civic grants, charitable donations, and pro bono legal practitioner hours
                  </span>
                </div>
              </div>

              <div className="about-governance-box__footer">
                <p className="about-gov-note">
                  Equity Bridge Foundation operates independently of any political party, state
                  prosecution office, or commercial enterprise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. CALL TO ACTION BANNER
          ===================================================================== */}
      <section className="about-section about-section--cta">
        <div className="container">
          <div className="about-cta-card">
            <div className="about-cta-card__content">
              <div className="about-cta-badge">
                <Sparkles size={13} aria-hidden="true" />
                <span>PARTNER WITH US</span>
              </div>
              <h2 className="about-cta-card__title">
                Join our mission for accessible justice in Ghana.
              </h2>
              <p className="about-cta-card__desc">
                Whether you are a citizen needing pro bono defense, a legal professional looking to
                volunteer counsel hours, or a researcher analyzing our empirical data, there is a place
                for you in our coalition.
              </p>
            </div>
            <div className="about-cta-card__actions">
              <Link href="/legal-help" className="button button--primary about-cta-btn">
                <span>Apply for Legal Help</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="button button--secondary about-cta-btn">
                <span>Contact Foundation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
