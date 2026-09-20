"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type InboxField = { label: string; value: string };

export type InboxRecord = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  createdAt: string;
  message: string;
  fields: InboxField[];
  internalNotes: string | null;
  notesFieldName: string;
};

export function AdminInbox({
  records,
  statuses,
  type,
  updateSubmission,
  archiveSubmission,
}: {
  records: InboxRecord[];
  statuses: readonly string[];
  type: string;
  updateSubmission: (formData: FormData) => Promise<void>;
  archiveSubmission: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Keep the selected message in the URL (?open=<id>) so the detail view is
  // shareable and survives a refresh, like an email client's permalink.
  const openId = searchParams.get("open");
  const [selectedId, setSelectedId] = useState<string | null>(openId ?? records[0]?.id ?? null);
  const [filter, setFilter] = useState<string>("all");

  function select(recordId: string) {
    setSelectedId(recordId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("open", recordId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const filtered = useMemo(
    () => (filter === "all" ? records : records.filter((r) => r.status === filter)),
    [records, filter],
  );

  const selected = records.find((r) => r.id === selectedId) ?? filtered[0] ?? null;

  function statusLabel(status: string) {
    return status.replaceAll("_", " ");
  }

  if (!records.length) {
    return <div className="notice-box">No records match this view.</div>;
  }

  return (
    <div className="admin-inbox">
      {/* Left: the list of messages */}
      <div className="admin-inbox__list" role="list">
        <div className="admin-inbox__filters" role="tablist" aria-label="Filter by status">
          <button
            type="button"
            className={`admin-inbox__filter${filter === "all" ? " is-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({records.length})
          </button>
          {statuses.map((status) => {
            const count = records.filter((r) => r.status === status).length;
            if (!count) return null;
            return (
              <button
                key={status}
                type="button"
                className={`admin-inbox__filter${filter === status ? " is-active" : ""}`}
                onClick={() => setFilter(status)}
              >
                {statusLabel(status)} ({count})
              </button>
            );
          })}
        </div>

        {filtered.map((record) => (
          <button
            key={record.id}
            type="button"
            className={`admin-inbox__item${selected?.id === record.id ? " is-selected" : ""}`}
            onClick={() => select(record.id)}
            aria-current={selected?.id === record.id ? "true" : undefined}
          >
            <div className="admin-inbox__item-top">
              <strong>{record.title}</strong>
              <span className={`admin-chip admin-chip--${record.status.toLowerCase()}`}>
                {statusLabel(record.status)}
              </span>
            </div>
            <span className="admin-inbox__item-sub">{record.subtitle}</span>
            <span className="admin-inbox__item-preview">{record.message}</span>
            <small>{record.createdAt}</small>
          </button>
        ))}

        {!filtered.length ? <p className="admin-empty">No messages with this status.</p> : null}
      </div>

      {/* Right: the side detail panel for the selected message */}
      <aside className="admin-inbox__detail" aria-label="Message detail">
        {selected ? (
          <>
            <header className="admin-detail__head">
              <div>
                <p className="eyebrow">Message detail</p>
                <h2>{selected.title}</h2>
                <p className="admin-detail__sub">{selected.subtitle}</p>
              </div>
              <span className={`admin-chip admin-chip--${selected.status.toLowerCase()}`}>
                {statusLabel(selected.status)}
              </span>
            </header>

            <dl className="admin-detail__fields">
              <div className="admin-detail__row">
                <dt>Received</dt>
                <dd>{selected.createdAt}</dd>
              </div>
              {selected.fields.map((field) => (
                <div className="admin-detail__row" key={field.label}>
                  <dt>{field.label}</dt>
                  <dd>{field.value || "—"}</dd>
                </div>
              ))}
            </dl>

            <div className="admin-detail__message">
              <h3 className="admin-record__section-title">The message</h3>
              <p>{selected.message}</p>
            </div>

            <form className="admin-record__form" action={updateSubmission}>
              <input type="hidden" name="id" value={selected.id} />
              <input type="hidden" name="type" value={type} />
              <label>
                Status
                <select name="status" defaultValue={selected.status}>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {statusLabel(status)}
                    </option>
                  ))}
                </select>
              </label>
              {selected.notesFieldName ? (
                <label>
                  Internal notes
                  <textarea
                    name={selected.notesFieldName}
                    rows={3}
                    defaultValue={selected.internalNotes ?? ""}
                    placeholder="Notes for your team — never shown to the visitor."
                  />
                </label>
              ) : null}
              <div className="admin-detail__actions">
                <button className="button button--primary" type="submit">Save</button>
              </div>
            </form>

            <form action={archiveSubmission}>
              <input type="hidden" name="id" value={selected.id} />
              <input type="hidden" name="type" value={type} />
              <button className="text-button text-button--danger" type="submit">Archive this message</button>
            </form>
          </>
        ) : (
          <p className="admin-empty">Select a message to see its details.</p>
        )}
      </aside>
    </div>
  );
}
