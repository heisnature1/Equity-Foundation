import { Metadata } from "next";
import { AdvocacyPortal } from "@/components/advocacy-portal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Advocacy & Systemic Reform | Equity Bridge Foundation",
  description:
    "Evidence-based advocacy, public-interest campaigns, and constitutional monitoring protecting fundamental rights in Ghana.",
};

export default function AdvocacyPage() {
  return <AdvocacyPortal />;
}
