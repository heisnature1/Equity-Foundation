import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const footerLinks = {
  explore: [
    ["/about", "About"],
    ["/justice-bridge-index", "Justice Bridge Index"],
    ["/know-your-rights", "Know Your Rights"],
    ["/advocacy", "Advocacy"],
    ["/resources", "Resources"],
    ["/support", "Support Our Work"],
    ["/contact", "Contact"],
  ],
  legal: [
    ["/privacy-policy", "Privacy Policy"],
    ["/terms-of-use", "Terms of Use"],
    ["/legal-aid-disclaimer", "Legal Aid Disclaimer"],
    ["/accessibility-statement", "Accessibility Statement"],
  ],
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-sm text-base leading-7 text-[color:var(--muted)]">
            Equity Bridge Foundation works to close the access-to-justice gap for women and underprivileged communities in Ghana through legal aid, advocacy, and public legal education.
          </p>
        </div>

        <div>
          <h3 className="footer-heading">Explore</h3>
          <ul className="footer-list">
            {footerLinks.explore.map(([href, label]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-heading">Legal</h3>
          <ul className="footer-list">
            {footerLinks.legal.map(([href, label]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-heading">Connect</h3>
          <ul className="footer-list">
            <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://wa.me/0000000000">WhatsApp</a></li>
            <li><a href="mailto:hello@equitybridgefoundation.org">Email</a></li>
            <li><a href="tel:+233000000000">Phone</a></li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© {year} Equity Bridge Foundation</p>
        <p className="text-[0.8rem] text-[color:var(--muted)]">[CONTACT DETAILS TO BE VERIFIED]</p>
      </div>
    </footer>
  );
}
