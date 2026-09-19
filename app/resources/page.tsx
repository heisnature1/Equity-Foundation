import { Metadata } from "next";
import { ResourcesPortal } from "@/components/resources-portal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resources & Legal Handbooks | Equity Bridge Foundation",
  description:
    "Open-access digital legal library of plain-language rights handbooks, empirical research reports, and compliance toolkits in Ghana.",
};

export default function ResourcesPage() {
  return <ResourcesPortal />;
}
