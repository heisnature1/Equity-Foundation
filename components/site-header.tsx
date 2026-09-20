import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/justice-bridge-index", label: "Justice Bridge Index" },
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

        {/*
          All navigation lives inside the Menu dropdown so nothing crowds or
          overlaps the top bar at any screen width. The same Menu works on
          desktop and mobile.
        */}
        <div className="site-header__menu-wrap">
          <Link href="/legal-help" className="button button--primary site-header__cta">
            Get Legal Help
          </Link>

          <details className="site-header__menu">
            <summary aria-label="Open navigation menu">
              <span className="site-header__menu-label">Menu</span>
              <span className="site-header__menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </summary>
            <nav aria-label="Main navigation" className="site-header__menu-panel">
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
      </div>
    </header>
  );
}
