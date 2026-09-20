"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navGroups = [
  {
    label: "Overview",
    links: [{ href: "/admin", label: "Dashboard" }],
  },
  {
    label: "Publishing",
    links: [
      { href: "/admin/content/editions", label: "Justice Bridge Index" },
      { href: "/admin/content/campaigns", label: "Advocacy & campaigns" },
      { href: "/admin/content/resources", label: "Know Your Rights" },
      { href: "/admin/media", label: "Media library" },
    ],
  },
  {
    label: "Inbox",
    links: [
      { href: "/admin/submissions/legal", label: "Legal-aid requests" },
      { href: "/admin/submissions/contact", label: "Contact messages" },
    ],
  },
  {
    label: "Settings",
    links: [
      { href: "/admin/settings", label: "Site settings" },
      { href: "/admin/audit", label: "Audit log" },
    ],
  },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation" className="admin-nav">
      {navGroups.map((group) => (
        <div className="admin-nav__group" key={group.label}>
          <p className="admin-nav__label">{group.label}</p>
          <ul className="admin-nav__list">
            {group.links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/admin" && pathname?.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`admin-nav__link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
