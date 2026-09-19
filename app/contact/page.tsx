import { Metadata } from "next";
import { ContactPortal } from "@/components/contact-portal";
import { getPublicSiteSettings } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact & Office Directory | Equity Bridge Foundation",
  description:
    "Official directory, administrative inquiries, partnership desk, and office contact for Equity Bridge Foundation in Accra, Ghana.",
};

export default async function ContactPage() {
  const settings = await getPublicSiteSettings();

  return <ContactPortal initialSettings={settings || undefined} />;
}
