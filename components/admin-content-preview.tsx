"use client";

import { useEffect, useState } from "react";

const STATUS_LABELS: Record<string, { label: string; tone: string }> = {
  published: { label: "Live to the public", tone: "live" },
  draft: { label: "Draft — hidden from the public", tone: "draft" },
  scheduled: { label: "Scheduled — publishes automatically", tone: "scheduled" },
  archived: { label: "Archived — removed from the public site", tone: "archived" },
};

export function AdminContentPreview({
  formId,
  routeLabel,
  routePath,
  titleName = "title",
  summaryName = "summary",
  contentName = "content",
  statusName = "status",
  defaultTitle = "Untitled item",
  defaultSummary = "This content has no summary yet.",
  defaultContent = "No content entered yet.",
  defaultStatus = "draft",
  publicUrl,
}: {
  formId: string;
  routeLabel: string;
  routePath: string;
  titleName?: string;
  summaryName?: string;
  contentName?: string;
  statusName?: string;
  defaultTitle?: string;
  defaultSummary?: string;
  defaultContent?: string;
  defaultStatus?: string;
  publicUrl?: string;
}) {
  const [title, setTitle] = useState(defaultTitle);
  const [summary, setSummary] = useState(defaultSummary);
  const [content, setContent] = useState(defaultContent);
  const [status, setStatus] = useState(defaultStatus);

  useEffect(() => {
    const form = document.getElementById(formId);
    if (!form) return;

    const syncPreview = () => {
      const formElement = form as HTMLFormElement;
      const titleInput = formElement.querySelector<HTMLInputElement>(`input[name="${titleName}"]`);
      const summaryInput = formElement.querySelector<HTMLElement>(`[name="${summaryName}"]`);
      const contentInput = formElement.querySelector<HTMLTextAreaElement>(`textarea[name="${contentName}"]`);
      const statusInput = formElement.querySelector<HTMLSelectElement>(`select[name="${statusName}"]`);

      setTitle(titleInput?.value?.trim() || defaultTitle);
      setSummary(summaryInput instanceof HTMLTextAreaElement || summaryInput instanceof HTMLInputElement
        ? (summaryInput.value || defaultSummary)
        : defaultSummary);
      setContent(contentInput?.value?.trim() || defaultContent);
      setStatus(statusInput?.value || defaultStatus);
    };

    syncPreview();

    const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select");
    inputs.forEach((element) => {
      element.addEventListener("input", syncPreview);
      element.addEventListener("change", syncPreview);
    });

    return () => {
      inputs.forEach((element) => {
        element.removeEventListener("input", syncPreview);
        element.removeEventListener("change", syncPreview);
      });
    };
  }, [contentName, defaultContent, defaultStatus, defaultSummary, defaultTitle, formId, statusName, summaryName, titleName]);

  const previewText = content.replace(/\s+/g, " ").trim();
  const statusMeta = STATUS_LABELS[status] ?? STATUS_LABELS.draft;
  const isLive = status === "published";

  return (
    <aside className="page-card admin-preview">
      <div className="admin-preview__head">
        <div>
          <p className="eyebrow">Public preview</p>
          <h3>{routeLabel}</h3>
        </div>
        <span className={`admin-status admin-status--${statusMeta.tone}`}>{statusMeta.label}</span>
      </div>

      <div className="admin-routing">
        <span className="admin-routing__label">Where this appears on the public site</span>
        <span className="admin-routing__path">{routePath}</span>
        {publicUrl ? (
          <a className="text-link" href={publicUrl} target="_blank" rel="noreferrer">
            Open the live public page ↗
          </a>
        ) : null}
      </div>

      <div className="admin-preview__mockup">
        <p className="admin-preview__chrome">equitybridgefoundation.org{routePath}</p>
        <div className="admin-preview__canvas">
          <p className="eyebrow">Preview</p>
          <h4>{title}</h4>
          {summary ? <p className="admin-preview__summary">{summary}</p> : null}
          <div className="admin-preview__body">
            {previewText ? <p>{previewText}</p> : <p>No content yet.</p>}
          </div>
        </div>
      </div>

      <p className="admin-preview__hint">
        {isLive
          ? "This is how visitors see the item right now. Any saved change goes live immediately."
          : "Visitors cannot see this yet. Set the status to Published to push it to the public page."}
      </p>
    </aside>
  );
}

