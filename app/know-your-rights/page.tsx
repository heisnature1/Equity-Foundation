import { Metadata } from "next";
import { createSupabasePublicServerClient } from "@/lib/supabase-public-server";
import KnowYourRightsPortal from "@/components/know-your-rights-portal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Know Your Rights | Plain-Language Legal Guides Ghana",
  description:
    "Authoritative statutory guides, emergency bail procedures, tenancy rules, and institutional contact directories designed to help citizens, families, and workers understand their rights across Ghana.",
};

type RightsResource = {
  id: string;
  title: string;
  summary: string | null;
  category: string | null;
  last_updated: string | null;
  last_reviewed: string | null;
  sources: Array<{ title?: string; url?: string }> | null;
};

export default async function KnowYourRightsPage() {
  const supabase = createSupabasePublicServerClient();
  const { data } = supabase
    ? await supabase
        .from("rights_resources")
        .select(
          "id, title, summary, category, last_updated, last_reviewed, sources",
        )
        .eq("status", "published")
        .order("last_updated", { ascending: false, nullsFirst: false })
    : { data: null };
  const _resources = (data ?? []) as RightsResource[];

  return <KnowYourRightsPortal />;
}
