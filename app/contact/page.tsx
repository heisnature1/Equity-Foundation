import Link from "next/link";
import { PageHeader } from "@/components/page-shell";
import { getPublicSiteSettings } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getPublicSiteSettings();
  return (
    <>
      <PageHeader
        title="Contact"
        description="For general enquiries, use the public contact form below. For legal-aid requests, start the separate intake process."
      />

      <section className="page-section">
        <div className="container page-section__grid">
          <article className="contact-card">
            <p className="eyebrow">Legal Help</p>
            <h3>Secure legal-aid intake</h3>
            <p>Use the dedicated legal-help request process to provide information for Foundation review.</p>
            <Link href="/legal-help" className="button button--primary" style={{ marginTop: "1rem" }}>
              Go to legal help
            </Link>
          </article>

          <article className="contact-card">
            <p className="eyebrow">General enquiries</p>
            <h3>Contact the Foundation</h3>
            <ul className="list-block">
              {settings?.phone ? <li>Phone: {settings.phone}</li> : null}
              {settings?.whatsapp ? <li>WhatsApp: {settings.whatsapp}</li> : null}
              {settings?.email ? <li>Email: {settings.email}</li> : null}
              {settings?.address ? <li>Address: {settings.address}</li> : null}
              {!settings?.phone && !settings?.whatsapp && !settings?.email && !settings?.address ? <li>Contact details have not been published yet.</li> : null}
            </ul>
          </article>
        </div>
      </section>

      <section className="page-section section--soft">
        <div className="container">
          <div className="page-card" style={{ maxWidth: 900, margin: "0 auto" }}>
            <p className="eyebrow">General contact form</p>
            <h2 className="section-title">Send a general message</h2>
            <div className="notice-box" style={{ marginBottom: "1rem" }}>
              Please do not submit confidential legal case details through this general enquiry form.
            </div>

            <form className="form-shell" aria-label="General contact form" action="/api/contact" method="post">
              <div className="form-grid">
                <label>
                  Full name
                  <input type="text" name="name" placeholder="Your full name" autoComplete="name" required />
                </label>
                <label>
                  Email address
                  <input type="email" name="email" placeholder="Your email" autoComplete="email" required />
                </label>
              </div>

              <label>
                Subject
                <input type="text" name="subject" placeholder="How can we help?" required />
              </label>

              <label>
                Message
                <textarea name="message" rows={6} placeholder="Write your message here." required />
              </label>

              <button type="submit" className="button button--primary">Send message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
