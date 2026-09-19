"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  ArrowUpRight,
  Lock,
  AlertCircle,
  FileText,
} from "lucide-react";

interface LegalHelpPortalProps {
  initialContent?: {
    description?: string;
    eligibilityTitle?: string;
    eligibilityPoints?: string[];
    urgentTitle?: string;
    urgentDescription?: string;
  };
}

export function LegalHelpPortal({ initialContent }: LegalHelpPortalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    contactMethod: "Phone",
    issue: "Police Detention & Bail",
    details: "",
    language: "English",
    region: "Greater Accra",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));

      const res = await fetch("/api/legal-help", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Submission failed. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="legal-help-page-root">
      <div className="container relative z-10 w-full legal-help-container">
        <div className="legal-help-grid">
          {/* Left Column: Triage Guidance & Emergency Hotlines */}
          <div className="legal-help-info">
            <div className="jbi-pill-badge">
              <span className="jbi-pill-badge__dot" aria-hidden="true" />
              <span>CONFIDENTIAL PRO BONO TRIAGE</span>
            </div>

            <h1 className="legal-help-title">
              Free Legal Aid &amp; Case Triage Intake.
            </h1>

            <p className="legal-help-lede">
              {initialContent?.description ||
                "Equity Bridge Foundation provides free, confidential legal triage and pro bono casework assistance for women, indigent citizens, and vulnerable families navigating justice barriers across Ghana."}
            </p>

            {/* 3 Streamlined Trust Pillars */}
            <div className="legal-help-trust-strip" aria-label="Legal aid intake guarantees">
              <div className="trust-pill">
                <div className="trust-pill__icon">
                  <Scale size={15} aria-hidden="true" />
                </div>
                <div className="trust-pill__text">
                  <strong>100% Free Pro Bono</strong>
                  <span>Zero fees for indigent clients</span>
                </div>
              </div>

              <div className="trust-pill">
                <div className="trust-pill__icon">
                  <Lock size={15} aria-hidden="true" />
                </div>
                <div className="trust-pill__text">
                  <strong>Strict Confidentiality</strong>
                  <span>Protected triage records</span>
                </div>
              </div>

              <div className="trust-pill">
                <div className="trust-pill__icon">
                  <Clock size={15} aria-hidden="true" />
                </div>
                <div className="trust-pill__text">
                  <strong>48-Hour Response</strong>
                  <span>Timely review by intake team</span>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Alert Card */}
            <div className="legal-help-emergency-card" role="alert">
              <div className="emergency-card__top">
                <span className="emergency-badge">URGENT INTERVENTION</span>
                <span className="emergency-card__title">Facing Immediate Danger or Detention?</span>
              </div>
              <p className="emergency-card__desc">
                If you are facing unlawful police detention exceeding 48 hours or immediate physical harm, contact emergency hotlines directly:
              </p>
              <div className="emergency-card__numbers">
                <a href="tel:191" className="emergency-pill">
                  <Phone size={12} aria-hidden="true" />
                  <span>Police: 191 / 112</span>
                </a>
                <a href="tel:0800111222" className="emergency-pill">
                  <Phone size={12} aria-hidden="true" />
                  <span>DOVVSU: 0800 111 222</span>
                </a>
                <a href="tel:+233302669220" className="emergency-pill">
                  <Phone size={12} aria-hidden="true" />
                  <span>Legal Aid: 0302 669 220</span>
                </a>
              </div>
            </div>

            <p className="legal-help-statutory-note">
              Governed under the Legal Aid Commission Act (Act 977) &amp; 1992 Constitution. Triage evaluates means eligibility and does not establish a formal court retainer until verified.
            </p>
          </div>

          {/* Right Column: Elevated Intake Card */}
          <div className="legal-help-form-wrap">
            <div className="legal-help-card">
              <div className="legal-help-card__header">
                <div>
                  <span className="card-kicker">PRO BONO INTAKE</span>
                  <h2 className="card-heading">Request Legal Assistance</h2>
                </div>
                <div className="security-badge" aria-label="SSL Encrypted Triage">
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>SSL Encrypted</span>
                </div>
              </div>

              {submitted ? (
                <div className="submission-success" role="status">
                  <div className="success-icon">
                    <CheckCircle2 size={36} aria-hidden="true" />
                  </div>
                  <h3 className="success-title">Intake Submitted Successfully</h3>
                  <p className="success-desc">
                    Thank you. Your inquiry has been securely logged. An intake officer will contact you via{" "}
                    <strong>{formData.contactMethod}</strong> at <strong>{formData.phone}</strong> within 48 hours.
                  </p>
                  <div className="success-actions">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="button button--secondary"
                    >
                      Submit Another Request
                    </button>
                    <Link href="/know-your-rights" className="button button--primary">
                      <span>Browse Rights Guides</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form className="intake-form" onSubmit={handleSubmit} noValidate>
                  {errorMessage ? (
                    <div className="form-error-alert" role="alert">
                      <AlertCircle size={15} aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </div>
                  ) : null}

                  <div className="form-row form-row--two">
                    <div className="form-field">
                      <label htmlFor="fullName">Full Name <span className="req">*</span></label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        placeholder="Kwame Mensah"
                        value={formData.fullName}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="phone">Phone Number <span className="req">*</span></label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="024 XXX XXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row form-row--two">
                    <div className="form-field">
                      <label htmlFor="email">Email Address <span className="opt">(Optional)</span></label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="kwame@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="contactMethod">Preferred Channel <span className="req">*</span></label>
                      <select
                        id="contactMethod"
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleChange}
                        required
                      >
                        <option value="Phone">Phone Call</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Email">Email</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row form-row--two">
                    <div className="form-field">
                      <label htmlFor="issue">Legal Issue Category <span className="req">*</span></label>
                      <select
                        id="issue"
                        name="issue"
                        value={formData.issue}
                        onChange={handleChange}
                        required
                      >
                        <option value="Police Detention & Bail">Police Detention &amp; Bail (Act 30)</option>
                        <option value="Gender-Based Violence & Safety">Domestic Violence (Act 732)</option>
                        <option value="Housing & Tenancy Disputes">Tenancy &amp; Rent Dispute (Act 220)</option>
                        <option value="Employment & Unfair Dismissal">Labour &amp; Employment (Act 651)</option>
                        <option value="Family Law & Child Custody">Family Law &amp; Custody</option>
                        <option value="Constitutional Rights Violation">Constitutional Violation</option>
                        <option value="Other">Other Legal Matter</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="region">Administrative Region <span className="req">*</span></label>
                      <select
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        required
                      >
                        <option value="Greater Accra">Greater Accra</option>
                        <option value="Ashanti">Ashanti</option>
                        <option value="Central">Central</option>
                        <option value="Eastern">Eastern</option>
                        <option value="Western">Western</option>
                        <option value="Northern">Northern</option>
                        <option value="Volta">Volta</option>
                        <option value="Other Regions">Other Regions</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="details">
                      Summary of Legal Concern <span className="req">*</span>
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows={2}
                      placeholder="Briefly state key facts, dates, and any urgent court or police deadlines..."
                      value={formData.details}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-row form-row--two">
                    <div className="form-field">
                      <label htmlFor="language">Preferred Language <span className="req">*</span></label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        required
                      >
                        <option value="English">English</option>
                        <option value="Twi">Twi</option>
                        <option value="Ga">Ga</option>
                        <option value="Ewe">Ewe</option>
                        <option value="Hausa">Hausa</option>
                      </select>
                    </div>

                    <div className="form-security-note">
                      <FileText size={13} className="note-icon" aria-hidden="true" />
                      <span>Intake evaluated under Act 977 pro bono criteria.</span>
                    </div>
                  </div>

                  <div className="form-footer">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button button--primary legal-submit-btn"
                    >
                      {isSubmitting ? (
                        <span>Processing secure intake...</span>
                      ) : (
                        <>
                          <span>Submit Confidential Triage</span>
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <span className="privacy-micro">
                      Protected under Attorney-Client Confidentiality · 100% Free Pro Bono
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
