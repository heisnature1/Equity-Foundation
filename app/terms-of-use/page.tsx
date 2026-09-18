import { PageHeader } from "@/components/page-shell";

export default function TermsOfUsePage() {
  return (
    <>
      <PageHeader
        title="Terms of Use"
        description="Website terms for public information and lawful use of the Equity Bridge Foundation website."
      />

      <section className="page-section">
        <div className="container page-card" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Standard notice</p>
          <h3>Public information</h3>
          <p>
            Public website content is provided for informational purposes. The website does not replace legal advice, and general educational information should not be treated as individualized legal advice.
          </p>
          <ul className="list-block">
            <li>Users should verify information with official sources where necessary.</li>
            <li>Legal-aid requests are managed through secure intake channels and are not public content.</li>
            <li>Information may change as verified updates are issued by the Foundation.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
