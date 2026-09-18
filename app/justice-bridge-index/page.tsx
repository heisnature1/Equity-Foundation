import Link from "next/link";
import { PageHeader } from "@/components/page-shell";
import { getPublishedCollection } from "@/lib/public-content";

export const dynamic = "force-dynamic";

type Edition = { id: string; title: string; description: string | null; quarter: string | null; web_content: string; pdf_path: string | null; };

export default async function JusticeBridgeIndexPage() {
  const editions = await getPublishedCollection<Edition>("justice_bridge_editions", "id, title, description, quarter, web_content, pdf_path");
  const latest = editions[0];
  return (
    <>
      <PageHeader
        title="Justice Bridge Index"
        description="A public-facing research and advocacy publication focused on access-to-justice issues in Ghana."
      />

      <section className="page-section">
        <div className="container page-section__grid">
          <article className="page-card">
            <p className="eyebrow">Latest edition</p>
            {latest ? <><h3>{latest.title}</h3><p>{latest.description || latest.web_content}</p><div className="research-panel__actions"><Link href="#editions" className="button button--primary">Read online</Link>{latest.pdf_path ? <a href={latest.pdf_path} className="button button--secondary">Download PDF</a> : null}</div></> : <p>No published edition is available yet.</p>}
          </article>

          <article className="page-card">
            <p className="eyebrow">Research overview</p>
            <ul className="list-block">
              <li>Evidence-based quarterly publication</li>
              <li>Public legal education and rights awareness focus</li>
              <li>Published with verified dates and summaries</li>
              <li>Previous editions will be archived here as they are confirmed</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="page-section section--soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Previous editions</p>
            <h2 className="section-title">Browse the archive.</h2>
          </div>

          <div id="editions" className="card-grid card-grid--three">
            {editions.map((edition) => (
              <article key={edition.id} className="article-card">
                <span className="article-card__tag">Published edition</span>
                <h3>{edition.title}</h3>
                <p>{edition.description || edition.web_content}</p>
                {edition.quarter ? <p><strong>{edition.quarter}</strong></p> : null}
              </article>
            ))}
            {!editions.length ? <div className="notice-box">No published editions are available yet.</div> : null}
          </div>
        </div>
      </section>
    </>
  );
}
