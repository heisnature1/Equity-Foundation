import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const collections = {
  pages: {
    title: "Website pages",
    table: "pages",
    fields: ["title", "slug", "status", "content"] as const,
    columns: "id, title, slug, status, content, updated_at",
  },
  articles: {
    title: "News & insights",
    table: "articles",
    fields: ["title", "slug", "category", "status", "excerpt", "content", "tags", "sources", "featured_image_id", "scheduled_for"] as const,
    columns: "id, title, slug, category, status, excerpt, content, tags, sources, featured_image_id, scheduled_for, updated_at",
  },
  editions: {
    title: "Justice Bridge Index",
    table: "justice_bridge_editions",
    fields: ["title", "quarter", "status", "description", "web_content", "pdf_path", "is_featured"] as const,
    columns: "id, title, quarter, status, description, web_content, pdf_path, is_featured, updated_at",
  },
  resources: {
    title: "Know Your Rights",
    table: "rights_resources",
    fields: ["title", "slug", "category", "status", "summary", "content", "last_updated", "last_reviewed", "sources"] as const,
    columns: "id, title, slug, category, status, summary, content, last_updated, last_reviewed, sources, updated_at",
  },
  campaigns: {
    title: "Advocacy & campaigns",
    table: "campaigns",
    fields: ["title", "slug", "status", "summary", "content", "image_id", "resource_ids"] as const,
    columns: "id, title, slug, status, summary, content, image_id, resource_ids, updated_at",
  },
} as const;

type CollectionKey = keyof typeof collections;

export default async function AdminCollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const { collection } = await params;
  const config = collections[collection as CollectionKey];
  if (!config) redirect("/admin");

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const adminUser = user;

  const { edit } = await searchParams;
  const { data: rawRecords, error } = await supabase
    .from(config.table)
    .select(config.columns)
    .order("updated_at", { ascending: false });
  const records = (rawRecords ?? []) as unknown as Array<Record<string, string>>;
  const record = records.find((item) => item.id === edit) as Record<string, unknown> | undefined;
  const homepageTemplate = {
    title: "Homepage",
    slug: "home",
    status: "published",
    content: JSON.stringify({
      heroEyebrow: "Equity Bridge Foundation",
      heroTitle: "Bridging the Gap Between Rights and Justice.",
      heroDescription: "Supporting communities in Ghana through legal aid, advocacy, and public legal education.",
      missionTitle: "A practical response to access-to-justice barriers.",
      missionDescription: "We work to strengthen rights awareness and access to justice.",
    }, null, 2),
  };
  const statusOptions = config.table === "articles"
    ? ["draft", "published", "scheduled", "archived"]
    : ["draft", "published", "archived"];

  async function saveRecord(formData: FormData) {
    "use server";
    const client = await createSupabaseServerClient();
    const values: Record<string, unknown> = Object.fromEntries(config.fields.map((field) => [field, String(formData.get(field) ?? "").trim()]));
    const id = String(formData.get("id") ?? "");
    if (config.fields.includes("status")) {
      values.status = values.status || "draft";
    }
    if (config.table === "pages") {
      try {
        values.content = JSON.parse(String(values.content ?? "") || "{}");
      } catch {
        throw new Error("Page content must be valid JSON.");
      }
    }
    if (config.table === "rights_resources") {
      try {
        values.sources = JSON.parse(String(values.sources ?? "[]") || "[]");
      } catch {
        throw new Error("Sources must be valid JSON.");
      }
      values.last_updated = values.last_updated || new Date().toISOString().slice(0, 10);
    }
    for (const field of ["tags", "sources", "related_resource_ids", "resource_ids"]) {
      if (field in values) {
        try {
          values[field] = JSON.parse(String(values[field] || "[]"));
        } catch {
          throw new Error(`${field} must be valid JSON.`);
        }
      }
    }
    if ("is_featured" in values) {
      values.is_featured = values.is_featured === "true";
    }
    for (const field of ["featured_image_id", "image_id"]) {
      if (field in values && values[field] === "") {
        values[field] = null;
      }
    }
    const insertValues = config.table === "articles"
      ? { ...values, created_by: adminUser.id }
      : values;
    let savedId = id || null;
    let result;

    if (id) {
      result = await client.from(config.table).update(values).eq("id", id);
    } else if ("slug" in values && values.slug) {
      const { data: existing } = await client
        .from(config.table)
        .select("id")
        .eq("slug", values.slug)
        .maybeSingle();

      if (existing?.id) {
        savedId = existing.id;
        result = await client.from(config.table).update(values).eq("id", existing.id);
      } else {
        result = await client.from(config.table).insert(insertValues);
      }
    } else {
      result = await client.from(config.table).insert(insertValues);
    }
    if (result.error) throw new Error(result.error.message);
    await client.from("audit_logs").insert({ actor_id: adminUser.id, action: savedId ? "content.updated" : "content.created", entity_type: config.table, entity_id: savedId });
    revalidatePath(`/admin/content/${collection}`);
  }

  async function deleteRecord(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    const client = await createSupabaseServerClient();
    const result = await client.from(config.table).delete().eq("id", id);
    if (result.error) throw new Error(result.error.message);
    await client.from("audit_logs").insert({ actor_id: adminUser.id, action: "content.deleted", entity_type: config.table, entity_id: id });
    revalidatePath(`/admin/content/${collection}`);
  }

  return (
    <main className="admin-shell">
      <div className="container">
        <div className="admin-heading">
          <div><p className="eyebrow">Content management</p><h1 className="section-title">{config.title}</h1><p>Create, edit, publish, archive, and remove public content.</p></div>
          <a className="button button--secondary" href={`/admin/content/${collection}`}>New item</a>
        </div>

        <div className="admin-content-grid">
          <section className="page-card">
            <h2>{record ? "Edit item" : "Create item"}</h2>
            <form className="form-shell" action={saveRecord}>
              {record ? <input type="hidden" name="id" value={String(record.id)} /> : null}
              {config.fields.map((field) => (
                <label key={field}>
                  {field.replaceAll("_", " ")}
                  {field === "status" ? <select name={field} defaultValue={String(record?.[field] ?? (config.table === "pages" && !record ? homepageTemplate.status : "draft"))}>{statusOptions.map((status) => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}</select> : field === "is_featured" ? <select name={field} defaultValue={String(record?.[field] ?? "false")}><option value="false">Not featured</option><option value="true">Featured</option></select> : field === "last_updated" || field === "last_reviewed" || field === "scheduled_for" ? <input type={field === "scheduled_for" ? "datetime-local" : "date"} name={field} defaultValue={String(record?.[field] ?? "")} /> : ["content", "web_content", "sources", "tags", "related_resource_ids", "resource_ids"].includes(field) ? <textarea name={field} rows={8} defaultValue={["sources", "tags", "related_resource_ids", "resource_ids"].includes(field) ? JSON.stringify(record?.[field] ?? [], null, 2) : field === "content" ? String(record?.[field] ? (typeof record[field] === "object" ? JSON.stringify(record[field], null, 2) : record[field]) : (config.table === "pages" && !record ? homepageTemplate.content : "")) : String(record?.[field] ?? "")} /> : <input name={field} defaultValue={String(record?.[field] ?? (config.table === "pages" && !record ? homepageTemplate[field as keyof typeof homepageTemplate] : ""))} required={field === "title" || field === "slug"} />}
                </label>
              ))}
              <button className="button button--primary" type="submit">{record ? "Save changes" : "Create item"}</button>
            </form>
          </section>

          <section className="page-card">
            <h2>Existing items ({records?.length ?? 0})</h2>
            {error ? <p className="form-error">Could not load this collection. Run the latest Supabase schema first.</p> : null}
            <ul className="admin-list">
              {(records ?? []).map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.status ?? "draft"}</span>
                  <div className="admin-list__actions"><a className="text-link" href={`/admin/content/${collection}?edit=${item.id}`}>Edit</a><form action={deleteRecord}><input type="hidden" name="id" value={item.id} /><button className="text-button text-button--danger" type="submit">Delete</button></form></div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
