import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminSettingsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const adminUser = user;
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", true).maybeSingle();

  async function saveSettings(formData: FormData) {
    "use server";
    const client = await createSupabaseServerClient();
    const values = {
      id: true,
      organization_name: String(formData.get("organization_name") ?? "").trim(),
      tagline: String(formData.get("tagline") ?? "").trim(),
      mission: String(formData.get("mission") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      whatsapp: String(formData.get("whatsapp") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      address: String(formData.get("address") ?? "").trim(),
      updated_at: new Date().toISOString(),
    };
    const { error } = await client.from("site_settings").upsert(values);
    if (error) throw new Error(error.message);
    await client.from("audit_logs").insert({ actor_id: adminUser.id, action: "settings.updated", entity_type: "site_settings" });
    revalidatePath("/admin/settings");
  }

  return (
    <main className="admin-shell"><div className="container">
      <p className="eyebrow">Configuration</p><h1 className="section-title">Site settings</h1>
      <p className="section-description">Manage the public organisation identity and contact details used across the site.</p>
      <div className="page-card admin-settings-card">
        <form className="form-shell" action={saveSettings}>
          {(["organization_name", "tagline", "mission", "phone", "whatsapp", "email", "address"] as const).map((field) => (
            <label key={field}>{field.replaceAll("_", " ")}{field === "mission" ? <textarea name={field} rows={5} defaultValue={settings?.[field] ?? ""} /> : <input name={field} defaultValue={settings?.[field] ?? ""} required={field === "organization_name"} />}</label>
          ))}
          <button type="submit" className="button button--primary">Save site settings</button>
        </form>
      </div>
    </div></main>
  );
}
