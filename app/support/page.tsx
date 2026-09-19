import { Metadata } from "next";
import { SupportPortal } from "@/components/support-portal";
import { getPublicSiteSettings } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Support Our Work | Equity Bridge Foundation",
  description:
    "Support verified pro bono legal aid, constitutional rights oversight, and public legal education across Ghana.",
};

export default async function SupportPage() {
  const settings = await getPublicSiteSettings();

  return <SupportPortal initialSettings={settings || undefined} />;
}
