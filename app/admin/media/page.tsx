import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminMediaPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: media, error } = await supabase.from("media").select("id, filename, path, mime_type, alt_text, created_at").order("created_at", { ascending: false });

  return <main className="admin-shell"><div className="container"><p className="eyebrow">Assets</p><h1 className="section-title">Media library</h1><p className="section-description">Images and PDFs can be catalogued here with filenames and accessible alt text. Storage upload controls are the next media slice.</p><div className="page-card"><h2>Uploaded media ({media?.length ?? 0})</h2>{error ? <p className="form-error">Run the latest Supabase schema to enable the media library.</p> : <ul className="admin-list">{(media ?? []).map((item) => <li key={item.id}><strong>{item.filename}</strong><span>{item.mime_type} · {item.alt_text || "Alt text not set"}</span></li>)}</ul>}</div></div></main>;
}
