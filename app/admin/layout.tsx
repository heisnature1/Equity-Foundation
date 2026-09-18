import Link from "next/link";

const adminLinks = [
  ["/admin", "Overview"],
  ["/admin/content/pages", "Website pages"],
  ["/admin/content/articles", "News & insights"],
  ["/admin/content/editions", "Justice Bridge Index"],
  ["/admin/content/resources", "Know Your Rights"],
  ["/admin/content/campaigns", "Advocacy & campaigns"],
  ["/admin/submissions/legal", "Legal-aid requests"],
  ["/admin/submissions/contact", "Contact messages"],
  ["/admin/media", "Media library"],
  ["/admin/settings", "Site settings"],
  ["/admin/audit", "Audit log"],
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-sidebar__title">Admin workspace</Link>
        <nav aria-label="Admin navigation" className="admin-sidebar__nav">
          {adminLinks.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
      </aside>
      <div className="admin-layout__content">{children}</div>
    </div>
  );
}
