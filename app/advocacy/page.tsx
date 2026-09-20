import { Metadata } from "next";
import { AdvocacyPortal, type DbCampaign } from "@/components/advocacy-portal";
import { getPublishedCollection } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Advocacy & Systemic Reform | Equity Bridge Foundation",
  description:
    "Evidence-based advocacy, public-interest campaigns, and constitutional monitoring protecting fundamental rights in Ghana.",
};

export default async function AdvocacyPage() {
  // Only rows with status = 'published' are returned; RLS enforces that too.
  const dbCampaigns = await getPublishedCollection<DbCampaign>(
    "campaigns",
    "id, slug, title, summary, content, status, published_at",
  );

  return <AdvocacyPortal dbCampaigns={dbCampaigns} />;
}
