"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Smartphone,
  HeartHandshake,
  ShieldCheck,
  Copy,
  Check,
  ArrowUpRight,
  ArrowRight,
  Lock,
  FileCheck,
} from "lucide-react";

interface SupportPortalProps {
  initialSettings?: {
    support_details?: {
      bank?: {
        name?: string;
        accountName?: string;
        accountNumber?: string;
        branch?: string;
        swift?: string;
      };
      momo?: {
        network?: string;
        number?: string;
        recipient?: string;
      };
    };
  };
}

export function SupportPortal({ initialSettings }: SupportPortalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const bank = initialSettings?.support_details?.bank || {
    name: "Stanbic Bank Ghana",
    accountName: "Equity Bridge Foundation Ghana",
    accountNumber: "9040008741295",
    branch: "High Street / Ridge Branch, Accra",
    swift: "SBICGHAC",
  };

  const momo = initialSettings?.support_details?.momo || {
    network: "MTN Mobile Money / Telecel Cash",
    number: "059 876 5432",
    recipient: "Equity Bridge Foundation",
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setToastMessage(`Copied ${label} to clipboard`);
    setTimeout(() => setCopiedKey(null), 2500);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="support-page-root">
      <div className="container relative z-10 w-full support-container">
        {/* Header Area */}
        <div className="support-header">
          <div className="pillar-header__badge">
            <span>CIVIC PARTNERSHIP & SUPPORT</span>
          </div>

          <h1 className="support-title">
            Support the Movement for <em>Equal Justice</em> in Ghana.
          </h1>

          <p className="support-lede">
            100% of public donations and philanthropic contributions directly fund pro bono legal
            triage for indigent citizens, police station oversight, and plain-language rights handbooks.
          </p>
        </div>

        {/* 3 Support Channel Cards */}
        <div className="support-grid">
          {/* Card 1: Bank Transfer */}
          <article className="support-card">
            <div className="support-card__header">
              <div className="support-card__icon-wrap">
                <Building2 size={20} aria-hidden="true" />
              </div>
              <span className="support-card__tag">BANK WIRE (LOCAL & INT.)</span>
            </div>

            <div className="support-card__body">
              <h2 className="support-card__title">Direct Bank Transfer</h2>
              <p className="support-card__desc">
                For direct wire transfers from all commercial banks in Ghana and international correspondent wires.
              </p>

              <div className="detail-list">
                <div className="detail-row">
                  <span className="detail-label">Bank:</span>
                  <span className="detail-value">{bank.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Account Name:</span>
                  <span className="detail-value">{bank.accountName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Account No:</span>
                  <div className="copy-action-wrap">
                    <span className="detail-value detail-value--highlight">
                      {bank.accountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(bank.accountNumber || "", "Account Number")
                      }
                      className="copy-btn"
                      aria-label="Copy Account Number"
                    >
                      {copiedKey === "Account Number" ? (
                        <Check size={13} aria-hidden="true" />
                      ) : (
                        <Copy size={13} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Branch:</span>
                  <span className="detail-value">{bank.branch}</span>
                </div>
              </div>
            </div>

            <div className="support-card__footer">
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    `Bank: ${bank.name}\nAccount: ${bank.accountName}\nNo: ${bank.accountNumber}\nBranch: ${bank.branch}`,
                    "Full Bank Details"
                  )
                }
                className="support-card__action"
              >
                <span>{copiedKey === "Full Bank Details" ? "Copied to Clipboard" : "Copy Bank Details"}</span>
                <Copy size={14} aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Card 2: Mobile Money (MoMo) */}
          <article className="support-card">
            <div className="support-card__header">
              <div className="support-card__icon-wrap">
                <Smartphone size={20} aria-hidden="true" />
              </div>
              <span className="support-card__tag">INSTANT LOCAL MOMO</span>
            </div>

            <div className="support-card__body">
              <h2 className="support-card__title">Mobile Money Transfer</h2>
              <p className="support-card__desc">
                Instant support via MTN Mobile Money, Telecel Cash, and AT Money merchant channels.
              </p>

              <div className="detail-list">
                <div className="detail-row">
                  <span className="detail-label">Networks:</span>
                  <span className="detail-value">{momo.network}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Merchant / Recipient:</span>
                  <span className="detail-value">{momo.recipient}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">MoMo Number:</span>
                  <div className="copy-action-wrap">
                    <span className="detail-value detail-value--highlight">
                      {momo.number}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(momo.number || "", "MoMo Number")
                      }
                      className="copy-btn"
                      aria-label="Copy MoMo Number"
                    >
                      {copiedKey === "MoMo Number" ? (
                        <Check size={13} aria-hidden="true" />
                      ) : (
                        <Copy size={13} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Reference Note:</span>
                  <span className="detail-value">&quot;Legal Aid Support&quot;</span>
                </div>
              </div>
            </div>

            <div className="support-card__footer">
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    `MoMo Number: ${momo.number}\nRecipient: ${momo.recipient}`,
                    "MoMo Details"
                  )
                }
                className="support-card__action"
              >
                <span>{copiedKey === "MoMo Details" ? "Copied to Clipboard" : "Copy MoMo Number"}</span>
                <Copy size={14} aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Card 3: In-Kind & Institutional Partnerships */}
          <article className="support-card">
            <div className="support-card__header">
              <div className="support-card__icon-wrap">
                <HeartHandshake size={20} aria-hidden="true" />
              </div>
              <span className="support-card__tag">INSTITUTIONAL & IN-KIND</span>
            </div>

            <div className="support-card__body">
              <h2 className="support-card__title">In-Kind & Fellowships</h2>
              <p className="support-card__desc">
                Support our operations through professional legal services, townhall venues, or regional print material sponsorship.
              </p>

              <div className="detail-list">
                <div className="detail-row">
                  <span className="detail-label">Pro Bono Counsel:</span>
                  <span className="detail-value">Volunteer for 1–2 cases/yr</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Venue Sponsorship:</span>
                  <span className="detail-value">Host community townhalls</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Print Sponsorship:</span>
                  <span className="detail-value">Fund 1,000 rights handbooks</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Auditing:</span>
                  <span className="detail-value">Annual financial reporting</span>
                </div>
              </div>
            </div>

            <div className="support-card__footer">
              <Link href="/contact?type=partnership" className="support-card__action">
                <span>Contact Partnerships Desk</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>

        {/* Security & Ethical Guarantee Banner */}
        <div className="support-security-banner">
          <div className="security-banner__icon-wrap">
            <ShieldCheck size={22} aria-hidden="true" />
          </div>
          <div className="security-banner__content">
            <h3 className="security-banner__title">
              Anti-Fraud & Institutional Security Guarantee
            </h3>
            <p className="security-banner__desc">
              The Foundation strictly adheres to non-profit financial compliance. We never request PINs, passwords, or personal banking credentials. All official transfers must match the exact entity name <strong>&quot;Equity Bridge Foundation&quot;</strong>.
            </p>
          </div>
          <Link href="/legal-aid-disclaimer" className="security-banner__link">
            <span>Read Governance Policy</span>
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage ? (
        <div className="feedback-toast feedback-toast--dark" role="status">
          <Check size={16} className="toast-icon" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      ) : null}
    </div>
  );
}
