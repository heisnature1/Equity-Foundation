import { PageHeader } from "@/components/page-shell";
import { getPublicSiteSettings } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const settings = await getPublicSiteSettings();
  const support = (settings?.support_details || {}) as { bank?: { name?: string; accountName?: string; accountNumber?: string; branch?: string }; momo?: { network?: string; number?: string; recipient?: string } };
  const bank = support.bank;
  const momo = support.momo;
  return (
    <>
      <PageHeader
        title="Support Our Work"
        description="Verified support details will be published here only when officially confirmed by the Foundation."
      />

      <section className="page-section">
        <div className="container page-section__grid">
          <article className="page-card">
            <p className="eyebrow">Bank transfer</p>
            <h3>Bank details</h3>
            {bank ? <ul className="list-block"><li>Bank name: {bank.name}</li><li>Account name: {bank.accountName}</li><li>Account number: {bank.accountNumber}</li><li>Branch/details: {bank.branch}</li></ul> : <p>Bank support details have not been published yet.</p>}
          </article>

          <article className="page-card">
            <p className="eyebrow">MoMo</p>
            <h3>Mobile money details</h3>
            {momo ? <ul className="list-block"><li>Network: {momo.network}</li><li>MoMo number: {momo.number}</li><li>Recipient/account name: {momo.recipient}</li></ul> : <p>Mobile money support details have not been published yet.</p>}
          </article>
        </div>
      </section>

      <section className="page-section section--soft">
        <div className="container">
          <div className="page-card" style={{ maxWidth: 780 }}>
            <p className="eyebrow">Security reminder</p>
            <h3>Do not share banking credentials.</h3>
            <p>
              The Foundation does not request PINs, OTPs, passwords, card credentials, or banking login information. Please only use verified details published by the Foundation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
