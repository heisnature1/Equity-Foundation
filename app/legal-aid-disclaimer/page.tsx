import { PageHeader } from "@/components/page-shell";

export default function LegalAidDisclaimerPage() {
  return (
    <>
      <PageHeader
        title="Legal Aid Disclaimer"
        description="Important notice about the scope of the Foundation’s public information and intake process."
      />

      <section className="page-section">
        <div className="container page-card" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Important</p>
          <h3>General information only</h3>
          <p>
            The legal help request form and public legal information do not guarantee representation, advice, or an attorney-client relationship. The website is not an emergency service.
          </p>
          <ul className="list-block">
            <li>Submission of a legal-aid request does not necessarily create legal representation.</li>
            <li>Information may be reviewed and actioned by Foundation staff only after triage.</li>
            <li>Urgent dangers or emergencies should be directed to the appropriate emergency services or local authorities.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
