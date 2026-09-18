import { PageHeader } from "@/components/page-shell";
import { getPublishedPageContent } from "@/lib/public-content";

export const dynamic = "force-dynamic";

type LegalHelpContent = {
  description?: string;
  eligibilityTitle?: string;
  eligibilityPoints?: string[];
  urgentTitle?: string;
  urgentDescription?: string;
};

export default async function LegalHelpPage() {
  const content = await getPublishedPageContent<LegalHelpContent>("legal-help");
  const eligibilityPoints = content.eligibilityPoints ?? [];
  return (
    <>
      <PageHeader
        title="Legal Help"
        description={content.description || "The legal-help request process is designed for intake and triage. It does not guarantee representation, legal advice, or immediate assistance."}
      />

      <section className="page-section">
        <div className="container page-section__grid">
          <article className="copy-block">
            <p className="eyebrow">Eligibility / triage</p>
            <h3>{content.eligibilityTitle || "Before you submit"}</h3>
            {eligibilityPoints.length ? <ul className="list-block">{eligibilityPoints.map((point) => <li key={point}>{point}</li>)}</ul> : <p>Legal-help intake guidance has not been published yet.</p>}
          </article>

          <article className="copy-block">
            <p className="eyebrow">Urgent matters</p>
            <h3>{content.urgentTitle || "Emergency guidance"}</h3>
            <p>{content.urgentDescription || "People facing immediate danger or crisis situations should contact appropriate emergency services and urgent support channels. The legal-aid intake form is not intended for emergencies."}</p>
          </article>
        </div>
      </section>

      <section className="page-section section--soft">
        <div className="container">
          <div className="page-card" style={{ maxWidth: 900, margin: "0 auto" }}>
            <p className="eyebrow">Secure intake form</p>
            <h2 className="section-title">Request legal assistance</h2>

            <form className="form-shell" aria-label="Legal help intake form" action="/api/legal-help" method="post">
              <div className="form-grid">
                <label>
                  Full name
                  <input type="text" name="fullName" placeholder="Your full name" autoComplete="name" required />
                </label>
                <label>
                  Phone number
                  <input type="tel" name="phone" placeholder="Preferred contact number" autoComplete="tel" required />
                </label>
                <label>
                  Email address
                  <input type="email" name="email" placeholder="Email address" autoComplete="email" />
                </label>
                <label>
                  Preferred contact method
                  <select name="contactMethod" required>
                    <option value="">Select one</option>
                    <option>Phone</option>
                    <option>WhatsApp</option>
                    <option>Email</option>
                  </select>
                </label>
              </div>

              <label>
                Topic or issue
                <input type="text" name="issue" placeholder="Brief description of the issue" required />
              </label>

              <label>
                Tell us what happened
                <textarea name="details" rows={6} placeholder="Please provide a concise summary of your concern and any relevant context." required />
              </label>

              <label>
                Preferred language
                <input type="text" name="language" placeholder="English" required />
              </label>

              <div className="notice-box">
                <strong>Important:</strong> This form is for intake and triage only. Your request does not guarantee representation, legal advice, or an attorney-client relationship.
              </div>

              <button type="submit" className="button button--primary">
                Submit request
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
