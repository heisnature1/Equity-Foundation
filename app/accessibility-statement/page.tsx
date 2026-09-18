import { PageHeader } from "@/components/page-shell";

export default function AccessibilityStatementPage() {
  return (
    <>
      <PageHeader
        title="Accessibility Statement"
        description="Equity Bridge Foundation is committed to making information and services accessible to the widest possible audience."
      />

      <section className="page-section">
        <div className="container page-card" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Access</p>
          <h3>Accessibility standards</h3>
          <p>
            This website is intended to support keyboard navigation, readable typography, legible contrast, and accessible form design. The Foundation may continue to improve accessibility in line with relevant standards and user needs.
          </p>
          <ul className="list-block">
            <li>Semantic HTML and accessible form labels are used throughout public content.</li>
            <li>Keyboard focus states are included for interactive elements.</li>
            <li>PDFs and other document formats will be made accessible where practical and required.</li>
            <li>Feedback about accessibility issues can be sent through the public contact channels.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
