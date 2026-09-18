import { PageHeader } from "@/components/page-shell";
import { getPublishedCollection } from "@/lib/public-content";

export const dynamic = "force-dynamic";

type Resource = { id: string; title: string; excerpt: string | null; category: string | null; };

export default async function ResourcesPage() {
  const resources = await getPublishedCollection<Resource>("articles", "id, title, excerpt, category");
  return (
    <>
      <PageHeader
        title="Resources"
        description="A public library of legal education, advocacy, and rights-awareness materials published by Equity Bridge Foundation."
      />

      <section className="page-section">
        <div className="container">
          {resources.length ? <div className="resource-grid">
            {resources.map((resource) => (
              <article key={resource.id} className="resource-box">
                <p className="eyebrow">Public resource</p>
                <h3>{resource.title}</h3>
                {resource.category ? <p className="article-card__tag">{resource.category}</p> : null}
                <p>{resource.excerpt || "Published public material."}</p>
              </article>
            ))}
          </div> : <div className="notice-box">No public resources have been published yet.</div>}
        </div>
      </section>
    </>
  );
}
