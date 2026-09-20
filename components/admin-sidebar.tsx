"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/admin-nav";
import { BrandMark } from "@/components/brand-mark";

/**
 * The admin workspace sidebar. It is hidden on the sign-in screen, which is
 * unauthenticated and should not expose the workspace navigation.
 */
export function AdminSidebar() {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) return null;

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__head">
        <Link href="/admin" className="admin-sidebar__brand" aria-label="Equity Bridge Foundation admin workspace">
          <BrandMark />
        </Link>
        <span className="admin-sidebar__tag">Admin workspace</span>
      </div>

      <AdminNav />

      <div className="admin-sidebar__footer">
        <Link href="/" className="admin-sidebar__site-link" target="_blank" rel="noreferrer">
          View public site ↗
        </Link>
        <form action="/auth/signout" method="post">
          <button type="submit" className="admin-sidebar__signout">Sign out</button>
        </form>
      </div>
    </aside>
  );
}
