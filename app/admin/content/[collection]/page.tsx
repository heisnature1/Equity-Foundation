import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AdminContentPreview } from "@/components/admin-content-preview";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { hasSupabaseConfig } from "@/lib/supabase-env";
import { selectRowsResilient } from "@/lib/resilient-select";

// Each field declares how it should be shown to an admin: a friendly label,
// an optional hint, and a simple input kind. Nothing here asks the admin to
// hand-write JSON — list fields accept one value per line and are converted on
// save.
type FieldKind = "text" | "textarea" | "select" | "date" | "list";

type FieldConfig = {
  name: string;
  label: string;
  kind: FieldKind;
  hint?: string;
  options?: readonly string[];
  required?: boolean;
  placeholder?: string;
};

const STATUS_OPTIONS = ["draft", "published", "archived"] as const;

const collections = {
  editions: {
    title: "Justice Bridge Index",
    intro: "Publish a new quarterly edition of the index.",
    table: "justice_bridge_editions",
    destinationLabel: "Justice Bridge Index page",
    destinationPath: "/justice-bridge-index",
    publicBase: "/justice-bridge-index",
    howTo: "Each published edition is listed on the public Justice Bridge Index page. Mark one as Featured to highlight it at the top of that page.",
    summaryField: "description",
    contentField: "web_content",
    fields: [
      { name: "title", label: "Edition title", kind: "text", required: true, placeholder: "e.g. Justice Bridge Index — Q1 2026" },
      { name: "quarter", label: "Quarter", kind: "text", placeholder: "e.g. Q1 2026" },
      { name: "status", label: "Visibility", kind: "select", options: STATUS_OPTIONS, hint: "Only Published editions appear on the public site." },
      { name: "description", label: "Short summary", kind: "textarea", hint: "One or two sentences shown in listings." },
      { name: "web_content", label: "Full edition content", kind: "textarea", hint: "The main body shown on the edition page." },
      { name: "pdf_path", label: "PDF link", kind: "text", placeholder: "/files/edition.pdf", hint: "Optional. Path or URL to the downloadable PDF." },
      { name: "is_featured", label: "Feature this edition", kind: "select", options: ["false", "true"] as const, hint: "Featured editions are highlighted at the top of the page." },
    ] as FieldConfig[],
    columns: "id, title, quarter, status, description, web_content, pdf_path, is_featured, updated_at",
  },
  resources: {
    title: "Know Your Rights",
    intro: "Add a plain-language rights guide.",
    table: "rights_resources",
    destinationLabel: "Rights resource",
    destinationPath: "/know-your-rights",
    publicBase: "/know-your-rights",
    howTo: "Published resources appear as guide cards on the public Know Your Rights page. The category groups them.",
    summaryField: "summary",
    contentField: "content",
    fields: [
      { name: "title", label: "Guide title", kind: "text", required: true, placeholder: "e.g. Your rights when arrested" },
      { name: "slug", label: "Web address (slug)", kind: "text", required: true, placeholder: "your-rights-when-arrested", hint: "Short, lowercase, hyphenated. Used in the page link." },
      { name: "category", label: "Category", kind: "text", placeholder: "e.g. Police & Arrest" },
      { name: "status", label: "Visibility", kind: "select", options: STATUS_OPTIONS, hint: "Only Published guides appear on the public site." },
      { name: "summary", label: "Short summary", kind: "textarea", hint: "One or two sentences shown on the guide card." },
      { name: "content", label: "Guide content", kind: "textarea", hint: "The full guide text." },
      { name: "last_reviewed", label: "Last reviewed", kind: "date", hint: "The date the legal content was last checked." },
      { name: "last_updated", label: "Last updated", kind: "date", hint: "Leave blank to set today automatically." },
      { name: "sources", label: "Sources", kind: "list", hint: "One source per line (e.g. a law or publication)." },
    ] as FieldConfig[],
    columns: "id, title, slug, category, status, summary, content, last_updated, last_reviewed, sources, updated_at",
  },
  campaigns: {
    title: "Advocacy & campaigns",
    intro: "Create an advocacy campaign.",
    table: "campaigns",
    destinationLabel: "Advocacy & campaigns page",
    destinationPath: "/advocacy",
    publicBase: "/advocacy",
    howTo: "Published campaigns appear on the public Advocacy & campaigns page. Drafts stay private until you publish them.",
    summaryField: "summary",
    contentField: "content",
    fields: [
      { name: "title", label: "Campaign title", kind: "text", required: true, placeholder: "e.g. End unlawful detention" },
      { name: "slug", label: "Web address (slug)", kind: "text", required: true, placeholder: "end-unlawful-detention", hint: "Short, lowercase, hyphenated. Used in the page link." },
      { name: "status", label: "Visibility", kind: "select", options: STATUS_OPTIONS, hint: "Only Published campaigns appear on the public site." },
      { name: "summary", label: "Short summary", kind: "textarea", hint: "One or two sentences shown on the campaign card." },
      { name: "content", label: "Campaign content", kind: "textarea", hint: "The full campaign description." },
      { name: "image_id", label: "Image ID", kind: "text", hint: "Optional. The ID of a media item to use as the campaign image." },
      { name: "resource_ids", label: "Linked resources", kind: "list", hint: "Optional. One resource ID per line." },
    ] as FieldConfig[],
    columns: "id, title, slug, status, summary, content, image_id, resource_ids, updated_at",
  },
} as const;

type CollectionKey = keyof typeof collections;

function destinationLabelForItem(
  publicBase: string,
  destinationPath: string,
  item: Record<string, unknown>,
) {
  const slug = item.slug ? String(item.slug) : "";
  if (destinationPath.includes("{slug}")) {
    return slug ? `${publicBase}${slug}` : "Add a slug to set the public URL";
  }
  return destinationPath;
}

// Turns a stored list value (array of strings, or array of source objects)
// into the one-value-per-line text an admin edits in a plain textarea.
function toListText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => {
      if (item && typeof item === "object") {
        const source = item as Record<string, unknown>;
        return String(source.title ?? source.label ?? source.name ?? source.url ?? "");
      }
      return String(item ?? "");
    })
    .filter((line) => line.length > 0)
    .join("\n");
}

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
  // Guard before touching the client: an unconfigured project would throw here
  // and turn the content manager into a 500 error page.
  if (!hasSupabaseConfig()) redirect("/admin");

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const adminUser = user;

  const { edit } = await searchParams;
  // Tolerates a database missing an optional column, so one absent column
  // cannot blank the whole collection list.
  const { rows: records, error, droppedColumns } = await selectRowsResilient(
    supabase,
    config.table,
    config.columns,
    "updated_at",
  );
  const record = records.find((item) => item.id === edit) as Record<string, unknown> | undefined;

  async function saveRecord(formData: FormData) {
    "use server";
    const client = await createSupabaseServerClient();
    const values: Record<string, unknown> = {};
    const id = String(formData.get("id") ?? "");

    for (const field of config.fields) {
      const raw = String(formData.get(field.name) ?? "").trim();
      if (field.kind === "list") {
        values[field.name] = raw
          ? raw.split("\n").map((line) => line.trim()).filter(Boolean)
          : [];
      } else if (field.kind === "date" && !raw) {
        // A blank date input submits "", and Postgres rejects that for a real
        // `date` column (22007 invalid input syntax for type date). Send null
        // so leaving an optional date empty saves instead of failing the form.
        values[field.name] = null;
      } else {
        values[field.name] = raw;
      }
    }

    if (config.fields.some((field) => field.name === "status")) {
      values.status = values.status || "draft";
      // Stamp the publish time so ordering on the public site is correct and
      // the item carries a real publication date the moment it goes live.
      if (values.status === "published") {
        values.published_at = new Date().toISOString();
      }
    }
    if (config.table === "rights_resources") {
      values.last_updated = values.last_updated || new Date().toISOString().slice(0, 10);
    }
    if ("is_featured" in values) {
      values.is_featured = values.is_featured === "true";
    }
    for (const field of ["featured_image_id", "image_id"]) {
      if (field in values && values[field] === "") {
        values[field] = null;
      }
    }
    const insertValues = values;
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
          <div><p className="eyebrow">Content management</p><h1 className="section-title">{config.title}</h1><p>{config.intro}</p></div>
          <a className="button button--secondary" href={`/admin/content/${collection}`}>+ New item</a>
        </div>

        <div className="admin-destination-banner">
          <strong>Where this goes:</strong> {config.howTo} Public route: <strong>{config.destinationPath}</strong>.
        </div>

        <div className="admin-content-grid">
          <section className="page-card">
            <p className="eyebrow">Publishing flow</p>
            <h2>{record ? "Edit item" : "Create a new item"}</h2>
            <form id={`content-form-${collection}`} className="admin-form" action={saveRecord}>
              {record ? <input type="hidden" name="id" value={String(record.id)} /> : null}
              {config.fields.map((field) => (
                <label key={field.name} className="admin-field">
                  <span className="admin-field__label">
                    {field.label}
                    {field.required ? <span className="admin-field__required"> *</span> : null}
                  </span>
                  {field.kind === "select" ? (
                    <select name={field.name} defaultValue={String(record?.[field.name] ?? field.options?.[0] ?? "")}>
                      {(field.options ?? []).map((option) => (
                        <option key={option} value={option}>
                          {option === "true" ? "Featured" : option === "false" ? "Not featured" : option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) : field.kind === "textarea" ? (
                    <textarea name={field.name} rows={field.name === "content" || field.name === "web_content" ? 10 : 3} defaultValue={String(record?.[field.name] ?? "")} placeholder={field.placeholder} />
                  ) : field.kind === "list" ? (
                    <textarea name={field.name} rows={4} defaultValue={toListText(record?.[field.name])} placeholder={field.placeholder} />
                  ) : (
                    <input type={field.kind === "date" ? "date" : "text"} name={field.name} defaultValue={String(record?.[field.name] ?? "")} placeholder={field.placeholder} required={field.required} />
                  )}
                  {field.hint ? <span className="admin-field__hint">{field.hint}</span> : null}
                </label>
              ))}
              <div className="admin-form__actions">
                <button className="button button--primary" type="submit">{record ? "Save changes" : "Create item"}</button>
                {record ? <a className="button button--secondary" href={`/admin/content/${collection}`}>Cancel</a> : null}
              </div>
            </form>
          </section>

          <AdminContentPreview
            formId={`content-form-${collection}`}
            routeLabel={config.destinationLabel}
            routePath={config.destinationPath}
            publicUrl={config.publicBase}
            titleName="title"
            summaryName={config.summaryField}
            contentName={config.contentField}
            statusName="status"
            defaultTitle={record?.title ? String(record.title) : "Untitled item"}
            defaultSummary={record?.[config.summaryField] ? String(record[config.summaryField]) : "This content has no summary yet."}
            defaultContent={record?.[config.contentField] ? String(record[config.contentField]) : "No content entered yet."}
            defaultStatus={record?.status ? String(record.status) : "draft"}
          />

          <section className="page-card admin-list-panel">
            <h2>Existing items ({records?.length ?? 0})</h2>
            <p className="section-description">Each item shows its publish state and the public page it feeds. Use Edit to open it in the form for a live preview.</p>
            {error ? <p className="form-error">Could not load this collection: {error}</p> : null}
            {!error && droppedColumns.length > 0 ? (
              <p className="form-error">
                Your database is missing the following column(s), so those values are hidden:{' '}
                <strong>{droppedColumns.join(", ")}</strong>. Run the latest Supabase schema to add them.
              </p>
            ) : null}
            {!error && !(records?.length) ? (
              <p className="admin-empty">No items yet. Use the form above to create the first one.</p>
            ) : null}
            <ul className="admin-list admin-list--routed">
              {(records ?? []).map((item) => (
                <li key={item.id}>
                  <div className="admin-list__main">
                    <strong>{item.title}</strong>
                    <small className={`admin-chip admin-chip--${String(item.status ?? "draft").toLowerCase()}`}>{item.status ?? "draft"}</small>
                  </div>
                  <span className="admin-list__route">{destinationLabelForItem(config.publicBase, config.destinationPath, item)}</span>
                  <div className="admin-list__actions"><a className="text-link" href={`/admin/content/${collection}?edit=${item.id}`}>Edit &amp; preview</a><form action={deleteRecord}><input type="hidden" name="id" value={item.id} /><button className="text-button text-button--danger" type="submit">Delete</button></form></div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
