import { Metadata } from "next";
import { LegalHelpPortal } from "@/components/legal-help-portal";
import { getPublishedPageContent } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Legal Help & Pro Bono Intake | Equity Bridge Foundation",
  description:
    "Confidential pro bono legal aid and triage intake for women, indigent citizens, and vulnerable communities across Ghana.",
};

type LegalHelpContent = {
  description?: string;
  eligibilityTitle?: string;
  eligibilityPoints?: string[];
  urgentTitle?: string;
  urgentDescription?: string;
};

export default async function LegalHelpPage() {
  const content = await getPublishedPageContent<LegalHelpContent>("legal-help");

  return <LegalHelpPortal initialContent={content || undefined} />;
}
