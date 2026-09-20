import { Suspense } from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { hasSupabaseConfig } from "@/lib/supabase-env";
import { getAdminAccess } from "@/lib/admin-access";
import { selectRowsResilient } from "@/lib/resilient-select";
import { AdminInbox, type InboxRecord } from "@/components/admin-inbox";

type DetailField = { label: string; key: string };

const submissionConfig = {
  contact: {
    title: "Contact messages",
    table: "contact_submissions",
    destination: "Contact form",
    destinationPath: "/contact",
    visibility: "These are private enquiries. They are never shown on the public site — only the contact page that collects them is public, and your reply goes back to the sender's email.",
    statuses: ["new", "read", "reviewing", "resolved", "archived"],
    columns: "id, name, email, subject, message, status, created_at",
    titleKey: "subject",
    subtitleKeys: ["name", "email"] as const,
    messageKey: "message",
    notesFieldName: null,
    detailFields: [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Subject", key: "subject" },
    ] as DetailField[],
  },
  legal: {
    title: "Legal-aid requests",
    table: "legal_help_requests",
    destination: "Legal-aid intake form",
    destinationPath: "/legal-help",
    visibility: "These are private, confidential requests. They are never shown on the public site — only the intake form is public, and case notes stay internal.",
    statuses: ["new", "under_review", "contacted", "referred", "closed", "archived"],
    columns: "id, full_name, phone, email, contact_method, issue, region, details, language, status, internal_notes, created_at",
    titleKey: "issue",
    subtitleKeys: ["full_name", "phone"] as const,
    messageKey: "details",
    notesFieldName: "internal_notes",
    detailFields: [
      { label: "Full name", key: "full_name" },
      { label: "Phone", key: "phone" },
      { label: "Email", key: "email" },
      { label: "Preferred channel", key: "contact_method" },
      { label: "Legal issue", key: "issue" },
      { label: "Region", key: "region" },
      { label: "Preferred language", key: "language" },
    ] as DetailField[],
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
  // Without this guard an unconfigured project throws inside
  // createSupabaseServerClient and this inbox renders as a 500 error page.
  // The dashboard already explains a missing configuration, so send the
  // visitor there instead.
  if (!hasSupabaseConfig()) redirect("/admin");
  const { q = "" } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const adminUser = user;
  // Tolerates a database that is missing an optional column (e.g. `region` on a
  // project created before that `alter table` was added), so one absent column
  // cannot blank the whole inbox.
  const { rows, error, droppedColumns } = await selectRowsResilient(
    supabase,
    config.table,
    config.columns,
    "created_at",
  );
  const searched = rows.filter((record) => {
    if (!q.trim()) return true;
    return Object.values(record).some((value) => String(value ?? "").toLowerCase().includes(q.toLowerCase()));
  });
  // Reuse the user fetched above; a second getUser() here is an extra auth
  // round-trip and is what trips Supabase's auth rate limit.
  const access = await getAdminAccess(user);

  // Shape each row into everything the detail panel needs: a heading, a
  // subtitle, the visitor's message, and the full list of submitted fields.
  const records: InboxRecord[] = searched.map((record) => ({
    id: String(record.id),
    title: String(record[config.titleKey] ?? "Untitled"),
    subtitle: config.subtitleKeys
      .map((key) => String(record[key] ?? ""))
      .filter(Boolean)
      .join(" · "),
    status: String(record.status ?? "new"),
    createdAt: new Date(record.created_at).toLocaleString("en-GB"),
    message: String(record[config.messageKey] ?? ""),
    fields: config.detailFields.map((field) => ({
      label: field.label,
      value: String(record[field.key] ?? ""),
    })),
    internalNotes: config.notesFieldName ? (record[config.notesFieldName] ?? null) : null,
    notesFieldName: config.notesFieldName ?? "",
  }));

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
       <div className="admin-heading"><div><p className="eyebrow">Protected records</p><h1 className="section-title">{config.title}</h1><p>Pick a message from the list to read the full submission in the panel beside it.</p></div><form className="admin-search" method="get"><input name="q" defaultValue={q} placeholder="Search records" aria-label="Search records" /><button className="button button--secondary" type="submit">Search</button></form></div>

       <div className="admin-routing admin-routing--banner">
         <div className="admin-routing__col">
           <span className="admin-routing__label">Messages arrive from</span>
           <span className="admin-routing__path">{config.destination} <span className="admin-routing__arrow">→</span> {config.destinationPath}</span>
         </div>
         <div className="admin-routing__col">
           <span className="admin-routing__label">Where they end up</span>
           <span className="admin-routing__note">Private inbox — visible to your admin team only</span>
         </div>
         <p className="admin-routing__explain">{config.visibility}</p>
       </div>

       {access.checked && !access.isRegisteredAdmin ? (
         <div className="admin-access-warning" role="alert">
           <strong>This account is not registered as an admin.</strong>
           <p>
             You are signed in, but <strong>{user.email}</strong> is not listed in the
             <code> admin_users</code> table, so this inbox is hidden from you even when
             submissions exist. Run the admin_users seed at the bottom of
             <code> supabase/schema.sql</code> with this email to restore access.
           </p>
         </div>
       ) : null}
       {error ? (
         <div className="notice-box">
           These records could not be loaded: {error}. Re-run the current schema in Supabase.
         </div>
       ) : null}
       {!error && droppedColumns.length > 0 ? (
         <div className="notice-box">
           Your database does not have the following column(s) yet, so those values are hidden:{' '}
           <strong>{droppedColumns.join(", ")}</strong>. Run the current
           <code> supabase/schema.sql</code> to add them.
         </div>
       ) : null}

       <Suspense fallback={<div className="notice-box">Loading inbox…</div>}>
         <AdminInbox
           records={records}
           statuses={config.statuses}
           type={type}
           updateSubmission={updateSubmission}
           archiveSubmission={archiveSubmission}
         />
       </Suspense>
   </div></main>;
}
