import type { Metadata } from "next";
import { getPublishedCollection } from "@/lib/public-content";
import { JusticeBridgePortal, type Edition } from "@/components/justice-bridge-portal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Justice Bridge Index — Empirical Research & Civic Data | Equity Bridge Foundation",
  description:
    "An empirical quarterly research publication examining institutional remedies, public legal literacy, and systemic access to justice across all 16 administrative regions of Ghana.",
};

export default async function JusticeBridgeIndexPage() {
  const dbEditions = await getPublishedCollection<Edition>(
    "justice_bridge_editions",
    "id, title, description, quarter, web_content, pdf_path"
  );

  return <JusticeBridgePortal dbEditions={dbEditions} />;
}
