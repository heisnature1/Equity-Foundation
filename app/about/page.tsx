import { Metadata } from "next";
import { getPublishedPageContent } from "@/lib/public-content";
import AboutPortal from "@/components/about-portal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Institutional Profile & Mandate | Equity Bridge Foundation",
  description:
    "Learn about Equity Bridge Foundation: our pro bono legal clinic, constitutional advocacy, empirical Justice Bridge Index research, and institutional governance across Ghana.",
};

type AboutContent = {
  description?: string;
  missionTitle?: string;
  missionDescription?: string;
  whoWeServeTitle?: string;
  whoWeServeDescription?: string;
  areasTitle?: string;
  areas?: string[];
  approachTitle?: string;
  approachDescription?: string;
  legalStatusTitle?: string;
  legalStatusDescription?: string;
};

export default async function AboutPage() {
  const content = await getPublishedPageContent<AboutContent>("about");

  return <AboutPortal cmsContent={content} />;
}
