import { Metadata } from "next";
import { createSupabasePublicServerClient } from "@/lib/supabase-public-server";
import KnowYourRightsPortal, {
  type DbRightsResource,
} from "@/components/know-your-rights-portal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Know Your Rights | Plain-Language Legal Guides Ghana",
  description:
    "Authoritative statutory guides, emergency bail procedures, tenancy rules, and institutional contact directories designed to help citizens, families, and workers understand their rights across Ghana.",
};

export default async function KnowYourRightsPage() {
  // Only rows with status = 'published' are returned; RLS enforces that too.
  const supabase = createSupabasePublicServerClient();
  const { data } = supabase
    ? await supabase
        .from("rights_resources")
        .select(
          "id, slug, title, summary, content, category, last_updated, last_reviewed, sources",
        )
        .eq("status", "published")
        .order("last_updated", { ascending: false, nullsFirst: false })
    : { data: null };
  const dbResources = (data ?? []) as DbRightsResource[];

  return <KnowYourRightsPortal dbResources={dbResources} />;
}
