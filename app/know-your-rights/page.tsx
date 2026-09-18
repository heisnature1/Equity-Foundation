import { PageHeader } from "@/components/page-shell";
import { createSupabasePublicServerClient } from "@/lib/supabase-public-server";

export const dynamic = "force-dynamic";

type RightsResource = {
  id: string;
  title: string;
  summary: string | null;
  category: string | null;
  last_updated: string | null;
  last_reviewed: string | null;
  sources: Array<{ title?: string; url?: string }> | null;
};

function formatDate(value: string | null) {
  if (!value) return "Not specified";
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
    new Date(`${value}T00:00:00`),
  );
}

export default async function KnowYourRightsPage() {
  const supabase = createSupabasePublicServerClient();
  const { data } = supabase
    ? await supabase
        .from("rights_resources")
        .select(
          "id, title, summary, category, last_updated, last_reviewed, sources",
        )
        .eq("status", "published")
        .order("last_updated", { ascending: false, nullsFirst: false })
    : { data: null };
  const resources = (data ?? []) as RightsResource[];

  return (
    <>
      <PageHeader
        title="Know Your Rights"
        description="Plain-language legal information designed to help people understand rights, institutions, and where to seek appropriate support."
      />

      <section className="page-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Featured topics</p>
            <h2 className="section-title">
              Practical legal information for everyday questions.
            </h2>
          </div>

          {resources.length === 0 ? (
            <div className="notice-box">
              No Know Your Rights resources have been published yet. Please
              check back as verified legal-information resources are approved.
            </div>
          ) : (
            <div className="resource-grid">
              {resources.map((resource) => (
                <article key={resource.id} className="resource-box">
                  <p className="eyebrow">Resource</p>
                  <h3>{resource.title}</h3>
                  {resource.category ? (
                    <p className="article-card__tag">{resource.category}</p>
                  ) : null}
                  <p>
                    {resource.summary || "Verified legal-information resource."}
                  </p>
                  <ul className="resource-list">
                    <li>Last updated: {formatDate(resource.last_updated)}</li>
                    <li>Last reviewed: {formatDate(resource.last_reviewed)}</li>
                    <li>
                      Sources:{" "}
                      {resource.sources?.length
                        ? resource.sources
                            .map((source) => source.title || source.url)
                            .filter(Boolean)
                            .join(", ")
                        : "Not specified"}
                    </li>
                  </ul>
                  <p className="muted-note">
                    This content is general information only and is not
                    individualized legal advice. Laws and official guidance may
                    change.
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
