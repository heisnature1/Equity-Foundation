import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const submissionConfig = {
  contact: {
    title: "Contact messages",
    table: "contact_submissions",
    statuses: ["new", "read", "reviewing", "resolved", "archived"],
    columns: "id, name, email, subject, message, status, created_at",
  },
  legal: {
    title: "Legal-aid requests",
    table: "legal_help_requests",
    statuses: ["new", "under_review", "contacted", "referred", "closed"],
    columns: "id, full_name, phone, email, issue, details, language, status, internal_notes, created_at",
  },
} as const;

type SubmissionType = keyof typeof submissionConfig;

export default async function AdminSubmissionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { type } = await params;
  const config = submissionConfig[type as SubmissionType];
  if (!config) redirect("/admin");
  const { q = "" } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const adminUser = user;
  const { data, error } = await supabase.from(config.table).select(config.columns).order("created_at", { ascending: false });
  const records = ((data ?? []) as unknown as Array<Record<string, string>>).filter((record) => {
    if (!q.trim()) return true;
    return Object.values(record).some((value) => String(value ?? "").toLowerCase().includes(q.toLowerCase()));
  });

  async function updateSubmission(formData: FormData) {
    "use server";
    const client = await createSupabaseServerClient();
    const id = String(formData.get("id") ?? "");
    const status = String(formData.get("status") ?? "");
    const internalNotes = String(formData.get("internal_notes") ?? "").trim();
    const values: Record<string, string> = { status };
    if (config.table === "legal_help_requests") values.internal_notes = internalNotes;
    const result = await client.from(config.table).update(values).eq("id", id);
    if (result.error) throw new Error(result.error.message);
    await client.from("audit_logs").insert({ actor_id: adminUser.id, action: "submission.updated", entity_type: config.table, entity_id: id });
    revalidatePath(`/admin/submissions/${type}`);
    revalidatePath("/admin");
  }

  async function archiveSubmission(formData: FormData) {
    "use server";
    const client = await createSupabaseServerClient();
    const id = String(formData.get("id") ?? "");
    const result = await client.from(config.table).update({ status: "archived" }).eq("id", id);
    if (result.error) throw new Error(result.error.message);
    await client.from("audit_logs").insert({ actor_id: adminUser.id, action: "submission.archived", entity_type: config.table, entity_id: id });
    revalidatePath(`/admin/submissions/${type}`);
    revalidatePath("/admin");
  }

  return <main className="admin-shell"><div className="container">
    <div className="admin-heading"><div><p className="eyebrow">Protected records</p><h1 className="section-title">{config.title}</h1><p>Search, review, update status, add internal notes, and archive records.</p></div><form className="admin-search" method="get"><input name="q" defaultValue={q} placeholder="Search records" aria-label="Search records" /><button className="button button--secondary" type="submit">Search</button></form></div>
    {error ? <div className="notice-box">The submission table could not be loaded. Run the current schema in Supabase.</div> : null}
    <div className="admin-record-list">{records.map((record) => <article className="page-card admin-record" key={record.id}>
      <div className="admin-record__header"><div><p className="eyebrow">{record.status}</p><h2>{record.subject || record.issue}</h2><p>{record.name || record.full_name} · {record.email || record.phone}</p></div><small>{new Date(record.created_at).toLocaleString("en-GB")}</small></div>
      <p>{record.message || record.details}</p>
      <form className="admin-record__form" action={updateSubmission}><input type="hidden" name="id" value={record.id} /><label>Status<select name="status" defaultValue={record.status}>{config.statuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select></label>{config.table === "legal_help_requests" ? <label>Internal notes<textarea name="internal_notes" rows={3} defaultValue={record.internal_notes || ""} /></label> : null}<button className="button button--primary" type="submit">Save record</button></form>
      <form action={archiveSubmission}><input type="hidden" name="id" value={record.id} /><button className="text-button text-button--danger" type="submit">Archive</button></form>
    </article>)}{!records.length ? <div className="notice-box">No records match this view.</div> : null}</div>
  </div></main>;
}
