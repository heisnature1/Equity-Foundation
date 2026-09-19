"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Scale,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import DottedSurface from "@/components/ui/dotted-surface";

interface ContactPortalProps {
  initialSettings?: {
    phone?: string | null;
    whatsapp?: string | null;
    email?: string | null;
    address?: string | null;
  };
}

export function ContactPortal({ initialSettings }: ContactPortalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
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

      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Message could not be sent. Please try again.");
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

  const phone = initialSettings?.phone || "+233 302 669 220";
  const whatsapp = initialSettings?.whatsapp || "+233 50 123 4567";
  const email = initialSettings?.email || "info@equitybridgefoundation.org";
  const address =
    initialSettings?.address ||
    "Ridge / High Street Administrative District, Accra, Ghana";

  return (
    <div className="contact-page-root">
      {/* 3D Dotted Surface Ground Plane */}
      <div className="portal-dots-container" aria-hidden="true">
        <DottedSurface
          size={10}
          opacity={0.88}
          sizeAttenuation={true}
          vertexColors={true}
          waveAmplitude={10}
          waveSpeed={0.016}
          pointsY={-260}
          className="portal-dots-canvas"
        />
      </div>

      <div className="container relative z-10 w-full contact-container">
        <div className="contact-grid">
          {/* Left Column: Office Directory & Quick Links */}
          <div className="contact-info">
            <div className="jbi-pill-badge">
              <span className="jbi-pill-badge__dot" aria-hidden="true" />
              <span>OFFICIAL DIRECTORY · ACCRA, GHANA</span>
            </div>

            <h1 className="contact-title">
              Get in Touch with Equity Bridge Foundation.
            </h1>

            <p className="contact-lede">
              For general administrative inquiries, research collaborations, media requests, and civic partnerships.
            </p>

            {/* 4 Directory Points */}
            <div className="contact-points" aria-label="Official contact details">
              <div className="contact-point-item">
                <div className="point-icon">
                  <MapPin size={16} aria-hidden="true" />
                </div>
                <div>
                  <strong>Headquarters</strong>
                  <p>{address}</p>
                </div>
              </div>

              <div className="contact-point-item">
                <div className="point-icon">
                  <Phone size={16} aria-hidden="true" />
                </div>
                <div>
                  <strong>Telephone & WhatsApp</strong>
                  <p>
                    <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a> ·{" "}
                    <a
                      href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Support
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-point-item">
                <div className="point-icon">
                  <Mail size={16} aria-hidden="true" />
                </div>
                <div>
                  <strong>Official Email</strong>
                  <p>
                    <a href={`mailto:${email}`}>{email}</a>
                  </p>
                </div>
              </div>

              <div className="contact-point-item">
                <div className="point-icon">
                  <Clock size={16} aria-hidden="true" />
                </div>
                <div>
                  <strong>Public Hours</strong>
                  <p>Monday – Friday: 8:30 AM – 5:00 PM GMT</p>
                </div>
              </div>
            </div>

            {/* Dedicated Legal-Aid Intake Callout Card */}
            <div className="contact-legal-callout">
              <div className="callout-header">
                <Scale size={18} className="callout-icon" aria-hidden="true" />
                <span className="callout-title">Seeking Free Legal Aid or Casework?</span>
              </div>
              <p className="callout-desc">
                Please do not send confidential legal case files through this general form. Use our dedicated secure triage portal:
              </p>
              <Link href="/legal-help" className="button button--dark callout-btn">
                <span>Go to Legal Aid Intake</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: General Inquiry Form Card */}
          <div className="contact-form-wrap">
            <div className="contact-card-box">
              <div className="contact-card-box__header">
                <span className="card-kicker">GENERAL INQUIRY DESK</span>
                <h2 className="card-heading">Send a Message</h2>
              </div>

              {submitted ? (
                <div className="submission-success" role="status">
                  <div className="success-icon">
                    <CheckCircle2 size={36} aria-hidden="true" />
                  </div>
                  <h3 className="success-title">Message Sent Successfully</h3>
                  <p className="success-desc">
                    Thank you, <strong>{formData.name}</strong>. Your message has been received by our administrative secretariat. We will respond to{" "}
                    <strong>{formData.email}</strong> within 1–2 business days.
                  </p>
                  <div className="success-actions">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="button button--secondary"
                    >
                      Send Another Message
                    </button>
                    <Link href="/" className="button button--primary">
                      <span>Return to Home</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form className="intake-form" onSubmit={handleSubmit} noValidate>
                  {errorMessage ? (
                    <div className="form-error-alert" role="alert">
                      <AlertCircle size={16} aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </div>
                  ) : null}

                  <div className="form-row form-row--two">
                    <div className="form-field">
                      <label htmlFor="name">Full Name <span className="req">*</span></label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="email">Email Address <span className="req">*</span></label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="subject">Subject / Inquiry Type <span className="req">*</span></label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="General Inquiry">General Administrative Inquiry</option>
                      <option value="Civic Partnership">Civic & Institutional Partnership</option>
                      <option value="Research Collaboration">Research & Data Collaboration</option>
                      <option value="Educational Handbooks">Request Educational Handbooks</option>
                      <option value="Media & Press">Media, Press & Interview Requests</option>
                      <option value="Other">Other Matters</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">Your Message <span className="req">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Please write your inquiry or partnership proposal here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-footer">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button button--primary submit-btn"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <span className="privacy-micro">
                      We respond to all verified public inquiries within 24–48 hours.
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
