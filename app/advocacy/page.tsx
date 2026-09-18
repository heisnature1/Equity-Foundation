import { PageHeader } from "@/components/page-shell";
import { getPublishedCollection } from "@/lib/public-content";

export const dynamic = "force-dynamic";

type Campaign = { id: string; title: string; summary: string | null; content: string; };

export default async function AdvocacyPage() {
  const campaigns = await getPublishedCollection<Campaign>("campaigns", "id, title, summary, content");
  return (
    <>
      <PageHeader
        title="Advocacy"
        description="Public-interest advocacy work focused on rights awareness, legal literacy, and access to justice in Ghana."
      />

      <section className="page-section">
        <div className="container">
          {campaigns.length ? <div className="card-grid card-grid--three">
            {campaigns.map((item) => (
              <article key={item.id} className="feature-card feature-card--plain">
                <span className="feature-card__kicker">Published campaign</span>
                <h3>{item.title}</h3>
                <p>{item.summary || item.content}</p>
              </article>
            ))}
          </div> : <div className="notice-box">No advocacy campaigns have been published yet.</div>}
        </div>
      </section>
    </>
  );
}
