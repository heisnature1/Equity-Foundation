import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminAuditPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: logs, error } = await supabase.from("audit_logs").select("id, action, entity_type, entity_id, created_at").order("created_at", { ascending: false }).limit(100);

  return <main className="admin-shell"><div className="container"><p className="eyebrow">Accountability</p><h1 className="section-title">Audit log</h1><p className="section-description">Important administrative actions are recorded here for operational accountability.</p><div className="page-card"><h2>Recent actions</h2>{error ? <p className="form-error">Run the latest Supabase schema to enable audit logging.</p> : <ul className="admin-list">{(logs ?? []).map((log) => <li key={log.id}><strong>{log.action}</strong><span>{log.entity_type}{log.entity_id ? ` · ${log.entity_id}` : ""}</span><small>{new Date(log.created_at).toLocaleString("en-GB")}</small></li>)}</ul>}</div></div></main>;
}
