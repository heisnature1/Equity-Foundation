import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/justice-bridge-index", label: "Justice Bridge Index" },
  { href: "/legal-help", label: "Legal Help" },
  { href: "/know-your-rights", label: "Know Your Rights" },
  { href: "/advocacy", label: "Advocacy" },
  { href: "/resources", label: "Resources" },
  { href: "/support", label: "Support Our Work" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand" aria-label="Equity Bridge Foundation home">
          <BrandMark />
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="site-header__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link href="/legal-help" className="button button--primary">
            Get Legal Help
          </Link>
        </div>

        <details className="site-header__mobile-nav">
          <summary aria-label="Open menu">Menu</summary>
          <nav aria-label="Mobile navigation" className="site-header__mobile-menu">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/legal-help" className="button button--primary button--full">
              Get Legal Help
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
