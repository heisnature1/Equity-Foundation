"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * Renders the public site header and footer, but never inside the admin
 * workspace. Admin pages have their own chrome (the admin sidebar) and must not
 * show the public navigation, the "Ready to stand for justice?" call-to-action
 * banner, or the public footer.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // Admin pages supply their own chrome (sidebar) and their own <main>
  // landmark, and must not show the public header, CTA banner, or footer.
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
