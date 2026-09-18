import { PageHeader } from "@/components/page-shell";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="A public privacy notice for the website and related public-information processes."
      />

      <section className="page-section">
        <div className="container page-card" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Notice</p>
          <h3>Privacy and data handling</h3>
          <p>
            This website is designed to minimize collection of personal information and to protect sensitive legal-aid data from public exposure. Legal-aid submissions are treated as confidential information and are not indexed for public search.
          </p>
          <ul className="list-block">
            <li>Only the minimum information needed for the purpose is collected.</li>
            <li>Public website content is separated from sensitive legal-aid information.</li>
            <li>General contact submissions are managed separately from legal-aid requests.</li>
            <li>Official privacy requirements and retention practices will be confirmed before production deployment.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
